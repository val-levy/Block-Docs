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

    const userToShare = await askQuestion("Enter the Ethereum address to share the file with: ");
    const fileIndex = await askQuestion("Enter the file index to share: ");

    const tx = await Contract.grantAccess(userToShare, Number(fileIndex));
    await tx.wait();

    console.log(`✅ Granted access to ${userToShare} for file #${fileIndex}!`);
}

grantAccess().catch(console.error);
