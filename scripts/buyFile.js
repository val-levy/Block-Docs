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

async function buyFile() {
    const contractAddress = getContractAddress();
    const [_, buyer] = await hardhat.ethers.getSigners(); // Use second wallet as buyer
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, buyer);

    console.log(`🔹 Connected to contract at: ${contractAddress}`);
    console.log(`👤 Current signer (buyer): ${buyer.address}`);

    // ✅ Step 1: Get Seller's Address
    const sellerAddress = await askQuestion("\nEnter the seller's Ethereum address: ");

    // ✅ Step 2: Fetch Seller's Files
    const files = await Contract.getUserFiles(sellerAddress);

    if (files.length === 0) {
        console.log("❌ This seller has no files listed.");
        return;
    }

    // ✅ Step 3: Display Seller's Files
    console.log("\n📄 Seller's Available Files:");
    let availableFiles = [];
    files.forEach((file, index) => {
        const priceInEth = hardhat.ethers.formatEther(file.price);
        if (priceInEth !== "0.0") {
            console.log(`   ${index + 1}. ${file.fileName} (${file.fileType}) - Price: ${priceInEth} ETH`);
            availableFiles.push({ index, price: file.price, cid: file.cid });
        }
    });

    if (availableFiles.length === 0) {
        console.log("❌ This seller has no files for sale.");
        return;
    }

    // ✅ Step 4: Select Files to Purchase
    const fileSelection = await askQuestion("\nEnter the numbers of the files to buy (comma-separated, e.g., 1,3): ");
    const selectedIndexes = fileSelection.split(",").map(num => Number(num.trim()) - 1);

    let totalPrice = hardhat.ethers.parseEther("0"); // Total price in Wei
    let filesToBuy = [];

    for (let i of selectedIndexes) {
        if (i < 0 || i >= files.length || hardhat.ethers.formatEther(files[i].price) === "0.0") {
            console.log(`❌ Invalid selection: File #${i + 1} is either not found or not for sale.`);
            return;
        }
        totalPrice = totalPrice + files[i].price;
        filesToBuy.push({ index: i, cid: files[i].cid });
    }

    const totalPriceInEth = hardhat.ethers.formatEther(totalPrice);

    // ✅ Step 5: Confirm Purchase
    console.log(`\n💰 Total cost: ${totalPriceInEth} ETH`);
    const confirmation = await askQuestion("Do you want to proceed? (yes/no): ");

    if (confirmation.toLowerCase() !== "yes") {
        console.log("❌ Purchase cancelled.");
        return;
    }

    // ✅ Step 6: Execute Transactions for Selected Files
    console.log("\n⏳ Processing purchase...");

    for (let file of filesToBuy) {
        try {
            const tx = await Contract.buyFile(sellerAddress, file.index, { value: files[file.index].price });
            await tx.wait();
            console.log(`✅ Successfully purchased file #${file.index + 1} from ${sellerAddress}!`);
            console.log(`📂 Your download link: https://gateway.pinata.cloud/ipfs/${file.cid}`);
        } catch (error) {
            console.error(`❌ Failed to buy file #${file.index + 1}:`, error.reason || error);
        }
    }

    console.log("\n✅ Purchase completed!");
}

// Run function
buyFile().catch(console.error);
