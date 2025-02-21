import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import fs from "fs";
import path from "path";

async function getSharedFiles() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    console.log(`\n🔍 Fetching files shared with: ${signer.address}...`);

    try {
        const sharedFiles = await Contract.getSharedFiles(signer.address);

        if (sharedFiles.length === 0) {
            console.log("❌ No files shared with you.");
            return;
        }

        console.log("\n📂 Shared Files:");
        const keysFile = path.resolve("encryption_keys.json");
        let keysData = fs.existsSync(keysFile) ? JSON.parse(fs.readFileSync(keysFile, "utf8")) : {};

        sharedFiles.forEach((file, index) => {
            console.log(`\n📁 File ${index + 1}: ${file.fileName} (${file.fileType})`);
            console.log(`   👤 Owner: ${file.owner}`);
            console.log(`   🔗 IPFS Link: https://gateway.pinata.cloud/ipfs/${file.cid}`);

            // Check if decryption keys exist
            if (keysData[file.cid] && keysData[file.cid][signer.address]) {
                console.log(`   🔑 Decryption Key: ${keysData[file.cid][signer.address].encryptionKey}`);
                console.log(`   🛠 IV: ${keysData[file.cid][signer.address].iv}`);
            } else {
                console.log("   ❌ No decryption key found. Contact the owner for access.");
            }
        });
    } catch (error) {
        console.error("❌ Error retrieving shared files:", error);
    }
}

// Run function
getSharedFiles().catch(console.error);
