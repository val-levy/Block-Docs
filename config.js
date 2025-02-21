import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File path to store the contract address
const CONTRACT_ADDRESS_FILE = path.join(__dirname, "contractAddress.json");
const CONFIG_PATH = path.resolve("contractAddress.json");

// Function to save contract address
export function saveContractAddress(address) {
    let config = {};
    // If the file exists, load its current content
    if (fs.existsSync(CONFIG_PATH)) {
      config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    }
    // Update only the contract address
    config.contractAddress = address;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    console.log(`✅ Contract address saved: ${address}`);
  }

// Function to load contract address
export function getContractAddress() {
    if (!fs.existsSync(CONTRACT_ADDRESS_FILE)) {
        throw new Error("❌ Contract address not found. Deploy the contract first.");
    }
    return JSON.parse(fs.readFileSync(CONTRACT_ADDRESS_FILE)).contractAddress;
}

// ✅ Function to Save Stablecoin Address
export function saveStablecoinAddress(address) {
    let config = {};

    // ✅ Load existing config if it exists
    if (fs.existsSync(CONFIG_PATH)) {
        config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    }

    config.stablecoinAddress = address; // Save the new stablecoin address
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

    console.log(`✅ Stablecoin contract address saved: ${address}`);
}

// ✅ Function to Get Stablecoin Address
export function getStablecoinAddress() {
    if (!fs.existsSync(CONFIG_PATH)) {
        throw new Error("Stablecoin contract address not found! Deploy it first.");
    }

    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    return config.stablecoinAddress;
}