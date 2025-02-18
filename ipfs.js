import fs from "fs";
import axios from "axios";
import FormData from "form-data"; // ✅ Required for proper file uploads
import dotenv from "dotenv";

dotenv.config(); // Load API key from .env

const PINATA_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"; // ✅ Correct Pinata API endpoint

export async function uploadToIPFS(filePath) {
    console.log("Uploading file:", filePath);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData(); // ✅ Create a form-data object
    formData.append("file", fileStream); // ✅ Append the file

    const response = await axios.post(PINATA_API_URL, formData, {
        headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`, // ✅ Ensure JWT is loaded correctly
            ...formData.getHeaders(), // ✅ Ensures proper form-data headers
        },
    });

    console.log("IPFS CID:", response.data.IpfsHash);
    return response.data.IpfsHash;
}
