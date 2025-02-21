import fs from "fs";
import axios from "axios";
import FormData from "form-data"; 
import dotenv from "dotenv";
import crypto from "crypto"; // ✅ Import cryptographic library

dotenv.config(); 

const PINATA_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"; 

// ✅ Encrypt File before Uploading to IPFS
export async function encryptFile(filePath) {
    const algorithm = "aes-256-cbc";
    const key = crypto.randomBytes(32).toString("hex"); // Generate 256-bit key
    const iv = crypto.randomBytes(16).toString("hex");  // Generate IV

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    const input = fs.createReadStream(filePath);
    const outputPath = `${filePath}.enc`;
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    return new Promise((resolve, reject) => {
        output.on("finish", () => resolve({ outputPath, key, iv }));
        output.on("error", reject);
    });
}

// ✅ Upload File to IPFS
export async function uploadToIPFS(filePath) {
    console.log("Uploading file:", filePath);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append("file", fileStream);

    const response = await axios.post(PINATA_API_URL, formData, {
        headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
            ...formData.getHeaders(), 
        },
    });

    return response.data.IpfsHash;
}
