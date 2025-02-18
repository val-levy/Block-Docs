import { create } from 'ipfs-http-client';
import fs from 'fs';

// Connect to IPFS (you can use Infura, Pinata, or a local node)
const ipfs = create({ url: 'https://api.pinata.cloud' });

async function uploadToIPFS(filePath) {
    const file = fs.readFileSync(filePath); // Read the file
    const { cid } = await ipfs.add(file);  // Upload to IPFS
    console.log(`Uploaded to IPFS: ${cid}`);
    return cid.toString();
}

// Test the function
uploadToIPFS("path/to/your/file.pdf").then((cid) => {
    console.log(`File CID: ${cid}`);
}).catch(console.error);
