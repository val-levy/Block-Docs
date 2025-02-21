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

async function grantAccess() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    console.log(`🔹 Fetching files uploaded by: ${signer.address}...`);

    // Get user's uploaded files
    const files = await Contract.getUserFiles(signer.address);

    if (files.length === 0) {
        console.log("❌ You have no files stored on-chain.");
        return;
    }

    console.log("\n📂 Your Uploaded Files:");
    files.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.fileName} (${file.fileType}) - CID: ${file.cid}`);
    });

    // Ask user to select a file index
    const fileIndex = await askQuestion("\nEnter the number of the file to share: ");
    const selectedIndex = Number(fileIndex) - 1;

    if (selectedIndex < 0 || selectedIndex >= files.length) {
        console.log("❌ Invalid file selection.");
        return;
    }

    // Ask for the Ethereum address to share with
    const userToShare = await askQuestion("Enter the Ethereum address to share the file with: ");

    const tx = await Contract.grantAccess(userToShare, selectedIndex);
    await tx.wait();

    console.log(`✅ Granted access to ${userToShare} for file: ${files[selectedIndex].fileName}!`);
}

// Run function
grantAccess().catch(console.error);
