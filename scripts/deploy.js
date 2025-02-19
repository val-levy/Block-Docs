import hardhat from "hardhat";
import { saveContractAddress } from "../config.js";

async function main() {
    const Contract = await hardhat.ethers.deployContract("CIDStorage");
    await Contract.waitForDeployment();

    const contractAddress = await Contract.getAddress();
    console.log("✅ Contract deployed at:", contractAddress);

    // Save the contract address to a file
    saveContractAddress(contractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
