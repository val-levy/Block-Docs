import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File path to store the contract address
const CONTRACT_ADDRESS_FILE = path.join(__dirname, "contractAddress.json");

// Function to save contract address
export function saveContractAddress(address) {
    fs.writeFileSync(CONTRACT_ADDRESS_FILE, JSON.stringify({ contractAddress: address }, null, 2));
}

// Function to load contract address
export function getContractAddress() {
    if (!fs.existsSync(CONTRACT_ADDRESS_FILE)) {
        throw new Error("❌ Contract address not found. Deploy the contract first.");
    }
    return JSON.parse(fs.readFileSync(CONTRACT_ADDRESS_FILE)).contractAddress;
}
