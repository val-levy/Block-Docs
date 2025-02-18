import hardhat from "hardhat";

const { ethers } = hardhat;

async function getUserCIDs() {
    const contractAddress = "0xe1FE382c3fb8aA386396FAc5777be7CE8D5F0C81"; // Replace with actual deployed contract address
    // Get wallet signer
    const [signer] = await ethers.getSigners();
    console.log("Fetching stored CIDs for user:", signer.address);

    // Retrieve contract and ensure it's connected to the signer
    const Contract = await ethers.getContractAt("CIDStorage", contractAddress, signer);

    // Call smart contract function to get stored CIDs
    const cids = await Contract.getUserCIDs();

    if (cids.length === 0) {
        console.log("No files stored on blockchain for this user.");
        return;
    }

    console.log("\n🔹 User's stored files:");
    cids.forEach(cid => {
        console.log(`🔗 File URL: https://gateway.pinata.cloud/ipfs/${cid}`);
    });
}

// Run the function
getUserCIDs().catch(console.error);
