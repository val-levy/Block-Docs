# Only-Chains
Project for UPenn Hackathon by Val Levy, Finley Fujimura, and Armaan Hajaar
Dependencies
  1). NodeJS
  2). Ganache
  3). Pinata API Key
  4). 


1). git clone https://github.com/val-levy/Only-Chains.git
2). cd Only-Chains/
3). npm install
4). touch .env  # Create .env file
5). nano .env   # Add PINATA_JWT=your_pinata_jwt_here
6). ganache-cli -d  # Start local blockchain, or open ganache GUI
7). npx hardhat clean
8). npx hardhat compile
9). npx hardhat run scripts/deploy.js --network ganache # Replace contactaddress variable with deployed address in storeCID.js, getUserCID.js, and approveUser.js
npx hardhat run scripts/approveUser.js --network ganache # Replace userAddress with any ganache wallet address
npx hardhat run scripts/storeCID.js --network ganache # Replace file path at bottom with your desired files path
npx hardhat run scripts/getUserCIDs.js --network ganache # Put link into browser
