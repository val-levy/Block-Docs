# BlockDocs
A program designed to hash and upload secure documents to the blockchain
## Dependencies
1. NodeJS
2. Ganache (CLI or GUI)
3. Pinata API Key

---

## Setup Instructions

```sh
# 1. Clone the repository
git clone https://github.com/val-levy/Block-Docs.git

# 2. Navigate into the project directory
cd Block-Docs/

# 3. Install dependencies
npm install

# 4. Create a .env file
touch .env

# 5. Open .env and add your Pinata API Key
echo "PINATA_JWT=your_pinata_jwt_here" >> .env

# 6. Start a local blockchain:
# Using Ganache CLI:
ganache-cli -d
# Or open Ganache GUI and start a new workspace.
# Find your mnemonic phrase and paste it into hardhat.config.js

# 7. Clean previous builds
npx hardhat clean

# 8. Compile smart contracts
npx hardhat compile

# 9. Deploy smart contracts
npx hardhat run scripts/deploy.js --network ganache

# 11. Approve a user
npx hardhat run scripts/approveUser.js --network ganache

# 12. Upload a file to IPFS (replace 'filePath' with your actual file path)
npx hardhat run scripts/storeCID.js --network ganache

# 13. Retrieve stored CIDs
npx hardhat run scripts/getUserCIDs.js --network ganache

# 14. Copy the output link and open it in your browser.

