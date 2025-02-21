import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import { uploadToIPFS } from "../ipfs.js";
import path from "path";

async function storeFile() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    // File to upload
    const filePath = "/Users/finnfujimura/Downloads/r6_4.pdf"; // Replace with actual file path
    const fileName = path.basename(filePath); // Extract file name
    const fileType = path.extname(filePath).substring(1); // Extract file extension

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
