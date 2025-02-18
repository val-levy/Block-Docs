const hre = require("hardhat");

async function main() {
    const ContractFactory = await hre.ethers.getContractFactory("CIDStorage"); // Replace with your actual contract name
    const contract = await ContractFactory.deploy(); // Deploy the contract

    await contract.waitForDeployment(); // Wait for deployment

    console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
