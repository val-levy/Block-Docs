import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import readline from "readline";

// Function to get user input
function askQuestion(query) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

async function setPrice() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    const fileIndex = await askQuestion("Enter the file index to set price for: ");
    const priceInMatic = await askQuestion("Enter the price in MATIC: ");

    // ✅ Ensure `ethers` is properly accessed
    const price = hardhat.ethers.parseEther(priceInMatic); 

    const tx = await Contract.setPrice(Number(fileIndex), price);
    await tx.wait();

    console.log(`✅ Price set to ${priceInMatic} MATIC for file #${fileIndex}!`);
}

// Run function
setPrice().catch(console.error);
