import hardhat from "hardhat";
import { getContractAddress, getStablecoinAddress } from "../config.js";
import readline from "readline";
import axios from "axios";
import fs from "fs";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/"; // Pinata IPFS gateway

function askQuestion(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve =>
    rl.question(query, answer => {
      rl.close();
      resolve(answer);
    })
  );
}

async function buyFile() {
  const contractAddress = getContractAddress();
  const stablecoinAddress = getStablecoinAddress();
  const [signer] = await hardhat.ethers.getSigners();
  const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);
  // Use the interface so that allowance is available
  const Stablecoin = await hardhat.ethers.getContractAt("IEncryptedStablecoin", stablecoinAddress, signer);

  const sellerAddress = await askQuestion("\nEnter the seller's Ethereum address: ");

  console.log(`\n🔍 Fetching files for sale by: ${sellerAddress}...\n`);
  const files = await Contract.getUserFiles(sellerAddress);

  // Map files with their original index from the seller's array
  const filesWithIndex = files.map((file, index) => ({ file, index }));

  // Filter files that have a nonzero priceETH or priceStablecoin
  const forSaleFiles = filesWithIndex.filter(obj =>
    BigInt(obj.file.priceETH) > 0n || BigInt(obj.file.priceStablecoin) > 0n
  );

  if (forSaleFiles.length === 0) {
    console.log("❌ No files available for sale.");
    return;
  }

  console.log("🛒 Files for Sale:");
  forSaleFiles.forEach((obj, idx) => {
    const file = obj.file;
    const priceETH = BigInt(file.priceETH) > 0n ? hardhat.ethers.formatEther(file.priceETH) : "N/A";
    const priceStablecoin = BigInt(file.priceStablecoin) > 0n ? hardhat.ethers.formatEther(file.priceStablecoin) : "N/A";
    console.log(`   ${idx + 1}. ${file.fileName} (${file.fileType}) - Price: ETH: ${priceETH}, Stablecoin: ${priceStablecoin}`);
  });

  const selectedFiles = await askQuestion("\nEnter the numbers of the files to buy (comma-separated, e.g., 1,3): ");
  const selectedIndices = selectedFiles.split(",").map(num => Number(num.trim()) - 1);

  // Ask for payment method first
  const paymentMethod = await askQuestion("\nChoose payment method: (1) ETH (2) Stablecoin (eUSD): ");
  if (paymentMethod !== "1" && paymentMethod !== "2") {
    console.log("❌ Invalid selection. Purchase cancelled.");
    return;
  }

  // Calculate total price based on payment method
  let totalPriceWei = 0n;
  for (const idx of selectedIndices) {
    const obj = forSaleFiles[idx];
    if (paymentMethod === "1") {
      totalPriceWei += BigInt(obj.file.priceETH);
    } else {
      totalPriceWei += BigInt(obj.file.priceStablecoin);
    }
  }

  console.log(`\n💰 Total Price: ${hardhat.ethers.formatEther(totalPriceWei)} ${paymentMethod === "1" ? "ETH" : "eUSD"}`);

  const confirm = await askQuestion("Confirm purchase? (yes/no): ");
  if (confirm.toLowerCase() !== "yes") {
    console.log("❌ Purchase cancelled.");
    return;
  }

  // If paying with stablecoin, check the buyer's token balance before processing purchases
  if (paymentMethod === "2") {
    const tokenBalance = await Stablecoin.balanceOf(signer.address);
    console.log("Buyer stablecoin balance:", tokenBalance.toString());
    if (BigInt(tokenBalance) < totalPriceWei) {
      console.log("❌ Insufficient stablecoin balance for this purchase.");
      return;
    }
  }

  // Create the MyFiles folder if it doesn't exist
  const myFilesDir = "MyFiles";
  if (!fs.existsSync(myFilesDir)) {
    fs.mkdirSync(myFilesDir);
  }

  // Process each selected file purchase
  for (const idx of selectedIndices) {
    const obj = forSaleFiles[idx];
    const file = obj.file;
    const fileIndex = obj.index; // Use the original file index from the seller's array

    if (paymentMethod === "1") {
      // Use priceETH for ETH payment
      const price = file.priceETH;
      console.log("🔄 Paying with ETH...");
      const tx = await Contract.buyFile(sellerAddress, fileIndex, { value: price });
      await tx.wait();
      console.log("✅ Paid with ETH.");
    } else {
      // For stablecoin, force a high approval before purchase
      const price = file.priceStablecoin;
      try {
          const desiredApproval = hardhat.ethers.parseUnits("1000", 18); // Approve 1000 eUSD
          console.log("🔄 Approving stablecoin transfer for amount:", desiredApproval.toString());
          const approveTx = await Stablecoin.approve(contractAddress, desiredApproval);
          await approveTx.wait();
        }
       catch (error) {
        return;
      }

      console.log("Purchasing file with original index:", fileIndex);
      console.log("🔄 Paying with stablecoin...");
      const tx = await Contract.buyFileWithStablecoin(sellerAddress, fileIndex);
      await tx.wait();
      console.log("✅ Paid with Stablecoin (eUSD).");
    }

    console.log(`✅ Purchased file: ${file.fileName}`);
    console.log(`🔗 IPFS Link: ${PINATA_GATEWAY}${file.cid}`);

    // Retrieve decryption key & IV from blockchain
    console.log("\n🔑 Retrieving decryption key...");
    try {
      const [decryptionKey, iv] = await Contract.getEncryptionKey(file.cid);

      if (!decryptionKey || !iv) {
        console.log("❌ Error: No decryption key found for this file. Contact the seller.");
        return;
      }

      console.log("🔑 Decryption Key:", decryptionKey);
      console.log("🛠 IV:", iv);

      // Download encrypted file from IPFS
      console.log("\n🔄 Downloading encrypted file from IPFS...");
      const response = await axios.get(`${PINATA_GATEWAY}${file.cid}`, { responseType: "arraybuffer" });

      if (!response.data) {
        console.log("❌ Error: Failed to download the file.");
        return;
      }

      const encryptedData = Buffer.from(response.data);

      // Decrypt the file
      console.log("\n🔓 Decrypting file...");
      const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(decryptionKey, "hex"), Buffer.from(iv, "hex"));
      let decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

      // Save the decrypted file to the MyFiles folder
      const outputFilePath = path.join(myFilesDir, `decrypted_${file.fileName}`);
      fs.writeFileSync(outputFilePath, decrypted);

      console.log(`✅ File decrypted successfully! Saved as: ${outputFilePath}\n`);
    } catch (error) {
      console.error("❌ Error retrieving decryption key or decrypting file:", error);
    }
  }
}

// Run function
buyFile().catch(console.error);
