import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import { getStablecoinAddress } from "../config.js";
import { uploadToIPFS } from "../ipfs.js";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import readline from "readline";
import fs from "fs";

dotenv.config();
const FILE_PATH = process.env.FILE_PATH;
const DESCRIPTION = process.env.DESCRIPTION;

function askQuestion(query) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

async function storeFile() {
    const contractAddress = getContractAddress();
    const stablecoinAddress = getStablecoinAddress();
    console.log("Retrieved contract address:", contractAddress, stablecoinAddress);
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);
    
    // ✅ Get file details
    const filePath = FILE_PATH;
    const fileName = path.basename(filePath);
    const fileType = path.extname(filePath).substring(1);
    const fileDesc = DESCRIPTION;

    console.log(`\n📤 Encrypting file: ${fileName} (${fileType})...`);

    // ✅ Generate encryption key & IV
    const encryptionKey = crypto.randomBytes(32).toString("hex");
    const iv = crypto.randomBytes(16).toString("hex");

    // ✅ Encrypt file
    const inputFile = fs.readFileSync(filePath);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), Buffer.from(iv, "hex"));
    let encryptedData = Buffer.concat([cipher.update(inputFile), cipher.final()]);

    // ✅ Save encrypted file
    const encryptedFilePath = `${filePath}.enc`;
    fs.writeFileSync(encryptedFilePath, encryptedData);
    console.log(`🔒 File encrypted successfully: ${encryptedFilePath}`);

    // ✅ Upload encrypted file to IPFS
    console.log(`\n📤 Uploading encrypted file: ${fileName}.enc...`);
    const cid = await uploadToIPFS(encryptedFilePath);
    console.log("✅ Encrypted IPFS CID:", cid);

    // ✅ Store file with ownership & encryption data
    console.log(`Calling storeFile with: ${cid}, ${fileName}, ${fileType}, ${fileDesc}, encryptionKey, iv`);
    const tx = await Contract.storeFile(cid, fileName, fileType, fileDesc, encryptionKey, iv);
    await tx.wait();
    console.log(`✅ File "${fileName}" stored on blockchain by ${signer.address}!\n`);

    console.log("\n🔑 Decryption Key:", encryptionKey);
    console.log("🛠 IV:", iv);

    // ✅ Ask user if they want to sell the file
    const sellFile = await askQuestion("\nDo you want to put this file up for sale? (yes/no): ");

    if (sellFile.toLowerCase() === "yes") {
        const paymentMethod = await askQuestion("Sell for (1) ETH or (2) Stablecoin? Enter 1 or 2: ");
        const price = await askQuestion("Enter the price: ");

        const fileCount = await Contract.getUserFileCount(signer.address);
        const fileIndex = fileCount - 1n;

        if (paymentMethod === "1") {
            const priceInWei = BigInt(hardhat.ethers.parseEther(price).toString());
            const tx2 = await Contract.setPrice(fileIndex, priceInWei.toString());
            await tx2.wait();
            console.log(`💰 File "${fileName}" is now listed for sale at ${price} ETH!`);
        } else if (paymentMethod === "2") {
            const stablecoinAddress = process.env.STABLECOIN_CONTRACT;
            const priceInStablecoin = BigInt(hardhat.ethers.parseUnits(price, 18).toString());
            const tx3 = await Contract.setPriceStablecoin(fileIndex, priceInStablecoin);
            await tx3.wait();

            console.log(`💰 File "${fileName}" is now listed for sale at ${price} eUSD!`);
        }

    } else {
        console.log(`✅ File "${fileName}" stored but not listed for sale.`);
    }
}

// ✅ Run function
storeFile().catch(console.error);
