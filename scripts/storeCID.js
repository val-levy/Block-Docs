import hardhat from "hardhat";
import { uploadToIPFS } from "../ipfs.js";

const { ethers } = hardhat;

async function storeCID(filePath) {
    const contractAddress = "0xe1FE382c3fb8aA386396FAc5777be7CE8D5F0C81"; // Replace this

    // Get signer (wallet)
    const [signer] = await ethers.getSigners();

    // Retrieve contract and ensure it's connected to the signer
    const Contract = await ethers.getContractAt("CIDStorage", contractAddress, signer);

    // Upload file to IPFS and get CID
    const cid = await uploadToIPFS(filePath);
    console.log("Uploaded CID:", cid);

    // Store CID in blockchain
    const tx = await Contract.storeCID(cid);
    await tx.wait();

    console.log("CID stored on blockchain:", cid);
}

// Run the function
storeCID("C:/Users/finnf/obg upenn hackathon.pdf").catch(console.error);
