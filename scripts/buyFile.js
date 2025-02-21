import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import readline from "readline";

async function buyFile() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    const sellerAddress = await askQuestion("Enter the seller's Ethereum address: ");
    const fileIndex = await askQuestion("Enter the file index to buy: ");

    const files = await Contract.getUserFiles(sellerAddress);
    const price = files[fileIndex].price;

    if (price === "0") {
        console.log("❌ This file is not for sale.");
        return;
    }

    const tx = await Contract.buyFile(sellerAddress, Number(fileIndex), { value: price });
    await tx.wait();

    console.log(`✅ Successfully purchased file #${fileIndex} from ${sellerAddress}!`);
}

// Run function
buyFile().catch(console.error);
