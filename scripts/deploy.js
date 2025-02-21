import hardhat from "hardhat";
import { saveContractAddress } from "../config.js";

async function main() {
    const [deployer] = await hardhat.ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    const balance = await deployer.provider.getBalance(deployerAddress);
    console.log("Deploying from:", deployerAddress);
    console.log("Balance:", hardhat.ethers.formatEther(balance), "ETH");

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
