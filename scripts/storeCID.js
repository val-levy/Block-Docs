import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import { uploadToIPFS } from "../ipfs.js";
import dotenv from "dotenv";
import path from "path";
import readline from "readline";

dotenv.config();
const FILE_PATH = process.env.FILE_PATH;

// ✅ Function to get user input
function askQuestion(query) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

async function storeFile() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    // ✅ File info from .env
    const filePath = FILE_PATH;
    const fileName = path.basename(filePath);
    const fileType = path.extname(filePath).substring(1);

    console.log(`\n📤 Uploading file: ${fileName} (${fileType})...`);

    // ✅ Upload to IPFS
    const cid = await uploadToIPFS(filePath);
    console.log("✅ IPFS CID:", cid);

    // ✅ Store file on blockchain
    const tx = await Contract.storeFile(cid, fileName, fileType);
    await tx.wait();

    console.log(`✅ File "${fileName}" stored on blockchain by ${signer.address}!\n`);

    // ✅ Ask user if they want to sell the file
    const sellFile = await askQuestion("Do you want to put this file up for sale? (yes/no): ");

    if (sellFile.toLowerCase() === "yes") {
        const priceInETH = await askQuestion("Enter the price in ETH: ");
        const priceInWei = BigInt(hardhat.ethers.parseEther(priceInETH).toString());

        // ✅ Fetch the user's file count to get the last added file index
        const fileCount = await Contract.getUserFileCount(signer.address);
        const fileIndex = fileCount - 1n; // Last added file

        // ✅ Set the price on blockchain
        const tx2 = await Contract.setPrice(fileIndex, priceInWei.toString());
        await tx2.wait();
        console.log(`💰 File "${fileName}" is now listed for sale at ${priceInETH} ETH!`);
    } else {
        console.log(`✅ File "${fileName}" stored but not listed for sale.`);
    }
}

// Run function
storeFile().catch(console.error);
