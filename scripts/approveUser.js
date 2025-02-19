import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import readline from "readline";

// Function to prompt user input
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

async function approveUser() {
    const contractAddress = getContractAddress(); // Load the saved contract address
    const [admin] = await hardhat.ethers.getSigners();

    console.log("\nAdmin Address:", admin.address);
    console.log("Contract Address:", contractAddress);

    // Prompt user for the Ethereum address they want to approve
    const userAddress = await askQuestion("Enter the Ethereum address to approve: ");

    if (!/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
        console.error("\n❌ Invalid Ethereum address format. Please enter a valid address.");
        process.exit(1);
    }

    console.log("\nApproving user:", userAddress);

    const contractABI = (await hardhat.artifacts.readArtifact("CIDStorage")).abi;
    const Contract = new hardhat.ethers.Contract(contractAddress, contractABI, admin);

    try {
        const tx = await Contract.approveUser(userAddress);
        await tx.wait();
        console.log(`✅ User ${userAddress} is now approved to store files!`);
    } catch (error) {
        console.error("❌ Error approving user:", error);
    }
}

// Run the function
approveUser().catch(console.error);
