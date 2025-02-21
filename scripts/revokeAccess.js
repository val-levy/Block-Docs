import hardhat from "hardhat";
import { getContractAddress } from "../config.js";
import readline from "readline";

async function revokeAccess() {
    const contractAddress = getContractAddress();
    const [signer] = await hardhat.ethers.getSigners();
    const Contract = await hardhat.ethers.getContractAt("CIDStorage", contractAddress, signer);

    const userToRemove = await askQuestion("Enter the Ethereum address to revoke access from: ");
    const fileIndex = await askQuestion("Enter the file index to revoke access for: ");

    const tx = await Contract.revokeAccess(userToRemove, Number(fileIndex));
    await tx.wait();

    console.log(`✅ Revoked access for ${userToRemove} on file #${fileIndex}!`);
}

revokeAccess().catch(console.error);
