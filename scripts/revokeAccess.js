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

async function revokeAccess() {
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
    console.log("\n📄 Your Files:");
    files.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.fileName} (${file.fileType}) - CID: ${file.cid}`);
    });

    const fileIndex = await askQuestion("\nEnter the number of the file to manage access: ");
    const selectedFileIndex = Number(fileIndex) - 1;

    if (selectedFileIndex < 0 || selectedFileIndex >= files.length) {
        console.log("❌ Invalid file selection.");
        return;
    }

    // ✅ Step 3: Get Shared Wallets
    const sharedWallets = await Contract.getSharedWallets(selectedFileIndex);

    if (sharedWallets.length === 0) {
        console.log("❌ No wallets have access to this file.");
        return;
    }

    console.log("\n👤 Wallets with access:");
    sharedWallets.forEach((wallet, index) => {
        console.log(`   ${index + 1}. ${wallet}`);
    });

    // ✅ Step 4: User selects wallets to revoke access from
    const revokeSelection = await askQuestion("\nEnter numbers of wallets to revoke (comma-separated, e.g., 1,3,5): ");
    const revokeIndexes = revokeSelection.split(",").map(num => Number(num.trim()) - 1);

    if (revokeIndexes.some(index => index < 0 || index >= sharedWallets.length)) {
        console.log("❌ Invalid selection.");
        return;
    }

    console.log("\n⏳ Revoking access...");
    for (const index of revokeIndexes) {
        const walletToRevoke = sharedWallets[index];
        try {
            const tx = await Contract.revokeAccess(walletToRevoke, selectedFileIndex);
            await tx.wait();
            console.log(`✅ Revoked access from ${walletToRevoke}!`);
        } catch (error) {
            console.error(`❌ Failed to revoke access from ${walletToRevoke}:`, error.reason || error);
        }
    }

    console.log("✅ Access revocation complete.");
}

// Run function
revokeAccess().catch(console.error);
