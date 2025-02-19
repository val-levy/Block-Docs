import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import { uploadToIPFS } from "../ipfs.js";

async function storeCID() {
    const contractAddress = getContractAddress(); // Load saved contract address
    const [signer] = await hardhat.ethers.getSigners(); // Get wallet signer

    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    // Upload a file to IPFS
    const cid = await uploadToIPFS("C:/Users/finnf/obg upenn hackathon.pdf");

    // Store CID on the blockchain
    const tx = await Contract.storeCID(cid);
    await tx.wait();

    console.log("✅ CID stored on blockchain:", cid);
}

// Run the function
storeCID().catch(console.error);
