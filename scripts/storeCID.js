import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import { uploadToIPFS } from "../ipfs.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const FILE_PATH = process.env.FILE_PATH;
const DESCRIPTION = process.env.DESCRIPTION;

async function storeFile() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    // File to upload
    const filePath = FILE_PATH; // Get file path from .env
    const fileName = path.basename(filePath); // Extract file name
    const fileType = path.extname(filePath).substring(1); // Extract file extension
    const fileDesc = DESCRIPTION; // Get file description from .env

    console.log(`Uploading file: ${fileName} (${fileType})...`);

    // Upload to IPFS
    const cid = await uploadToIPFS(filePath);
    console.log("✅ IPFS CID:", cid);

    // Store file with ownership
    const tx = await Contract.storeFile(cid, fileName, fileType, fileDesc);
    await tx.wait();

    console.log(`✅ File "${fileName}" stored on blockchain by ${signer.address}!`);
}

// Run function
storeFile().catch(console.error);
