import hardhat from "hardhat";

const { ethers } = hardhat;

async function approveUser() {
    const contractAddress = "0x0"; // Replace this
    const userAddress = "0x0"; // Replace with the user you want to approve

    const [admin] = await ethers.getSigners(); // Get the admin wallet

    console.log("Admin Address:", admin.address);
    console.log("User to Approve:", userAddress);

    // Manually fetch the contract ABI
    const contractABI = (await hardhat.artifacts.readArtifact("CIDStorage")).abi;

    // Connect to the contract using ethers.Contract instead of getContractAt
    const Contract = new ethers.Contract(contractAddress, contractABI, admin);

    // Call the approveUser function
    const tx = await Contract.approveUser(userAddress);
    await tx.wait();

    console.log(`✅ User ${userAddress} is now approved to store files!`);
}

// Run the function
approveUser().catch(console.error);
