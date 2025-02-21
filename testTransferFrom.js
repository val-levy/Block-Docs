import hardhat from "hardhat";
import { getStablecoinAddress } from "./config.js"; // Adjust the path as needed

async function main() {
  // Use two signers: owner (who holds tokens) and spender (approved to transfer tokens)
  const [owner, spender] = await hardhat.ethers.getSigners();
  const stablecoinAddress = getStablecoinAddress();

  // Get the stablecoin contract instance using the IEncryptedStablecoin interface
  const Stablecoin = await hardhat.ethers.getContractAt("IEncryptedStablecoin", stablecoinAddress, owner);

  console.log("Owner address:", await owner.getAddress());
  console.log("Spender address:", await spender.getAddress());

  // Check owner's stablecoin balance
  const ownerBalance = await Stablecoin.balanceOf(await owner.getAddress());
  console.log("Owner stablecoin balance:", ownerBalance.toString());

  // Define the amount to test (e.g., 1 token, assuming 18 decimals)
  const amount = hardhat.ethers.parseUnits("1", 18);
  console.log("Approving transfer of amount:", amount.toString());

  // Owner approves the spender to spend the specified amount
  const approveTx = await Stablecoin.approve(await spender.getAddress(), amount);
  await approveTx.wait();
  console.log("Approval successful.");

  // As the spender, call transferFrom to transfer tokens from owner to a test recipient address
  const testRecipient = "0x000000000000000000000000000000000000dEaD"; // A common "burn" address for testing
  // Get the stablecoin contract instance from the spender's perspective
  const StablecoinAsSpender = await hardhat.ethers.getContractAt("IEncryptedStablecoin", stablecoinAddress, spender);
  
  console.log("Attempting transferFrom from owner to test recipient...");
  const transferTx = await StablecoinAsSpender.transferFrom(await owner.getAddress(), testRecipient, amount);
  await transferTx.wait();
  console.log("Transfer successful!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
