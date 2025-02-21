import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import { uploadToIPFS } from "../ipfs.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const FILE_PATH = process.env.FILE_PATH;

async function storeFile() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    // File to upload
    const filePath = FILE_PATH; // Get file path from .env
    console.log("📂 File Path:", filePath);
    const fileName = path.basename(filePath); // Extract file name
    console.log("📝 File Name:", fileName);
    const fileType = path.extname(filePath).substring(1); // Extract file extension
    console.log("📎 File Type:", fileType);

    console.log(`Uploading file: ${fileName} (${fileType})...`);

    // Upload to IPFS
    const cid = await uploadToIPFS(filePath);
    console.log("✅ IPFS CID:", cid);

    // Store file with ownership
    const tx = await Contract.storeFile(cid, fileName, fileType);
    await tx.wait();

    console.log(`✅ File "${fileName}" stored on blockchain by ${signer.address}!`);
}

// Run function
storeFile().catch(console.error);
