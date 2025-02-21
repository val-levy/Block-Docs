import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import axios from "axios";
import fs from "fs";
import crypto from "crypto";
import path from "path";

const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

// AES Decryption function
function decryptFile(encryptedFilePath, decryptionKey, iv, outputFilePath) {
  try {
    const keyBuffer = Buffer.from(decryptionKey, "hex");
    const ivBuffer = Buffer.from(iv, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, ivBuffer);
    const encryptedData = fs.readFileSync(encryptedFilePath);
    const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    fs.writeFileSync(outputFilePath, decryptedData);
    console.log(`✅ Decrypted file saved: ${outputFilePath}`);
  } catch (error) {
    console.error("❌ Error decrypting file:", error);
  }
}

async function getUserCIDs() {
  const contractAddress = getContractAddress();
  const [signer] = await hardhat.ethers.getSigners();
  const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

  console.log("🔍 Fetching stored files for:", signer.address);

  try {
    const files = await Contract.getUserFiles(signer.address);

    if (files.length === 0) {
      console.log("❌ No files stored on-chain.");
      return;
    }

    console.log("\n📂 Stored Files:");
    for (const file of files) {
      console.log(`\n🔹 File: ${file.fileName}`);
      console.log(`   📂 CID: ${file.cid}`);
      console.log(`   📎 Type: ${file.fileType}`);
      console.log(`   ⏳ Uploaded At: ${new Date(Number(file.timestamp) * 1000).toLocaleString()}`);
      console.log(`   👤 Owner: ${file.owner}`);
      // Use fallback 0 if priceETH or priceStablecoin is undefined or null
      const priceETH = file.priceETH ? file.priceETH : 0;
      const priceStablecoin = file.priceStablecoin ? file.priceStablecoin : 0;
      console.log(`   💰 Price (ETH): ${hardhat.ethers.formatEther(priceETH)} ETH`);
      console.log(`   💰 Price (Stablecoin): ${hardhat.ethers.formatEther(priceStablecoin)} eUSD`);
      console.log(`   🔗 IPFS Link: ${IPFS_GATEWAY}${file.cid}`);

      // 🔑 Retrieve encryption key & IV from smart contract
      console.log("\n🔑 Fetching decryption key...");
      const encryptionData = await Contract.getEncryptionKey(file.cid);
      const [decryptionKey, iv] = encryptionData;

      if (!decryptionKey || !iv) {
        console.log("❌ Decryption key not found. File will remain encrypted.");
        continue;
      }

      console.log("✅ Decryption key found. Downloading file...");

      // 📥 Download encrypted file from IPFS
      const fileUrl = `${IPFS_GATEWAY}${file.cid}`;
      const encryptedFilePath = path.join("MyFiles", `${file.fileName}.enc`);
      const decryptedFilePath = path.join("MyFiles", file.fileName);

      // Create the MyFiles folder if it doesn't exist
      if (!fs.existsSync("MyFiles")) {
        fs.mkdirSync("MyFiles");
      }

      const response = await axios({
        method: "GET",
        url: fileUrl,
        responseType: "arraybuffer",
      });

      fs.writeFileSync(encryptedFilePath, Buffer.from(response.data));
      console.log(`📥 Encrypted file downloaded: ${encryptedFilePath}`);

      // 🔓 Decrypt the file
      decryptFile(encryptedFilePath, decryptionKey, iv, decryptedFilePath);
    }
  } catch (error) {
    console.error("❌ Error retrieving files:", error);
  }
}

// Run function
getUserCIDs().catch(console.error);
