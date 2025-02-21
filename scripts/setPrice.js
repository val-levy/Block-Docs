import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import readline from "readline";

// ✅ Function to get user input
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

    console.log(`🔹 Connected to contract at: ${contractAddress}`);
    console.log(`👤 Current signer: ${signer.address}`);

    // ✅ Step 1: Retrieve User's Files
    const files = await Contract.getUserFiles(signer.address);

    if (files.length === 0) {
        console.log("❌ No files found.");
        return;
    }

    // ✅ Step 2: Display Files
    console.log("\n📄 Your Uploaded Files:");
    files.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.fileName} (${file.fileType}) - CID: ${file.cid} - Price: ${hardhat.ethers.formatEther(file.price)} ETH`);
    });

    const fileIndex = await askQuestion("\nEnter the number of the file to set price: ");
    const selectedFileIndex = Number(fileIndex) - 1;

    if (selectedFileIndex < 0 || selectedFileIndex >= files.length) {
        console.log("❌ Invalid file selection.");
        return;
    }

    const priceInEth = await askQuestion("\nEnter the price in ETH: ");
    const priceInWei = hardhat.ethers.parseEther(priceInEth);

    console.log(`\n⏳ Setting price for file ${files[selectedFileIndex].fileName} to ${priceInEth} ETH...`);
    
    try {
        const tx = await Contract.setPrice(selectedFileIndex, priceInWei);
        await tx.wait();
        console.log(`✅ Price updated successfully to ${priceInEth} ETH!`);
    } catch (error) {
        console.error("❌ Failed to set price:", error.reason || error);
    }
}

// Run function
setPrice().catch(console.error);
