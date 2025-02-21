import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import readline from "readline";

function askQuestion(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve =>
    rl.question(query, answer => {
      rl.close();
      resolve(answer);
    })
  );
}

async function grantAccess() {
  const contractAddress = getContractAddress();
  const [signer] = await hardhat.ethers.getSigners();
  const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

  console.log(`🔹 Fetching files uploaded by: ${signer.address}...`);

  // Get user's uploaded files from the contract
  const files = await Contract.getUserFiles(signer.address);

  if (files.length === 0) {
    console.log("❌ You have no files stored on-chain.");
    return;
  }

  console.log("\n📂 Your Uploaded Files:");
  files.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file.fileName} (${file.fileType}) - CID: ${file.cid}`);
  });

  // Ask user to select a file index
  const fileIndexInput = await askQuestion("\nEnter the number of the file to share: ");
  const selectedIndex = Number(fileIndexInput) - 1;

  if (selectedIndex < 0 || selectedIndex >= files.length) {
    console.log("❌ Invalid file selection.");
    return;
  }

  // Ask for the Ethereum address to share with
  const userToShare = await askQuestion("Enter the Ethereum address to share the file with: ");

  // Retrieve the encryption key and IV from the contract on-chain
  console.log("🔑 Fetching decryption key from on-chain storage...");
  const [decryptionKey, iv] = await Contract.getEncryptionKey(files[selectedIndex].cid);

  if (!decryptionKey || !iv) {
    console.log("❌ Decryption key not found for this file. Cannot share securely.");
    return;
  }

  // Grant access on the blockchain
  const tx = await Contract.grantAccess(userToShare, selectedIndex);
  await tx.wait();

  console.log(`✅ Granted access to ${userToShare} for file: ${files[selectedIndex].fileName}!`);

  // Provide decryption details to share securely
  console.log("\n🔐 Share the following details securely with the recipient:");
  console.log(`🔑 Decryption Key: ${decryptionKey}`);
  console.log(`🛠 IV: ${iv}`);
  console.log(`🔗 IPFS Link: https://gateway.pinata.cloud/ipfs/${files[selectedIndex].cid}`);
}

grantAccess().catch(console.error);
