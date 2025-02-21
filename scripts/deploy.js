import hardhat from "hardhat";
import { saveContractAddress, getStablecoinAddress } from "../config.js";

async function main() {
  const [deployer] = await hardhat.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await deployer.provider.getBalance(deployerAddress);
  console.log("Deploying from:", deployerAddress);
  console.log("Balance:", hardhat.ethers.formatEther(balance), "ETH");

  // Retrieve the stablecoin address from config
  const stablecoinAddress = getStablecoinAddress();
  if (!stablecoinAddress) {
    throw new Error("Stablecoin address not found in config. Deploy or set it first.");
  }

  // Pass the stablecoin address as a constructor argument
  const Contract = await hardhat.ethers.deployContract("CIDStorage", [stablecoinAddress]);
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
