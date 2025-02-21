import pkg from 'hardhat';
const { ethers } = pkg;
import { saveStablecoinAddress } from "../config.js"; // Save the address

async function main() {
    console.log("🚀 Deploying EncryptedStablecoin...");

    const [deployer] = await ethers.getSigners();
    console.log("🔹 Deployer Address:", deployer.address);

    const initialSupply = ethers.parseUnits("1000000", 18); // 1,000,000 eUSD

    // ✅ Deploy the contract
    const Stablecoin = await ethers.getContractFactory("EncryptedStablecoin");
    const stablecoin = await Stablecoin.deploy(initialSupply);
    await stablecoin.waitForDeployment();

    const contractAddress = await stablecoin.getAddress();
    console.log("✅ EncryptedStablecoin deployed at:", contractAddress);

    // ✅ Verify total supply
    const totalSupply = await stablecoin.totalSupply();
    console.log(`💰 Total Supply: ${ethers.formatUnits(totalSupply, 18)} eUSD`);

    // ✅ Save the contract address for later use
    saveStablecoinAddress(contractAddress);

}

// Execute deployment
main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});
