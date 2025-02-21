import hardhat from "hardhat";
import { getContractAddress } from "../config.js";

async function getSharedFiles() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    console.log(`\n🔍 Fetching files shared with: ${signer.address}...`);

    try {
        const files = await Contract.getSharedFiles(signer.address);

        if (files.length === 0) {
            console.log("❌ No files shared with you.");
            return;
        }

        console.log("\n📂 Shared Files:");
        files.forEach((file, index) => {
            console.log(`\n🔹 File ${index + 1}:`);
            console.log(`   📂 Name: ${file.fileName} (${file.fileType})`);
            console.log(`   👤 Owner: ${file.owner}`);
            console.log(`   🔗 IPFS Link: https://gateway.pinata.cloud/ipfs/${file.cid}`);
        });
    } catch (error) {
        console.error("❌ Error retrieving shared files:", error);
    }
}

// Run function
getSharedFiles().catch(console.error);
