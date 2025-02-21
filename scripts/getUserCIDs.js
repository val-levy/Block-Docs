import hardhat from "hardhat";
import { getContractAddress } from "../config.js";

async function getUserFiles() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    console.log("Fetching stored files for:", signer.address);

    try {
        const files = await Contract.getUserFiles(signer.address);

        if (files.length === 0) {
            console.log("❌ No files stored on-chain.");
            return;
        }

        console.log("\n📄 Stored Files:");
        files.forEach((file, index) => {
            console.log(`\n🔹 File ${index + 1}:`);
            console.log(`   📂 CID: ${file.cid}`);
            console.log(`   📝 Name: ${file.fileName}`);
            console.log(`   📎 Type: ${file.fileType}`);
            console.log(`   ⏳ Uploaded At: ${new Date(Number(file.timestamp) * 1000).toLocaleString()}`);
            console.log(`   👤 Owner: ${file.owner}`);
        });
    } catch (error) {
        console.error("❌ Error retrieving files:", error);
    }
}

// Run function
getUserFiles().catch(console.error);
