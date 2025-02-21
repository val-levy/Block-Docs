require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const MNEMONIC = process.env.MNEMONIC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: {
        mnemonic: MNEMONIC
      },
      gas: 6000000,
      gasPrice: 20000000000 // 20 Gwei
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 84532,
      gas: "auto",
    },
  },
  sourcify: {
    enabled: true, // ✅ Use Sourcify instead of Etherscan
  },
  etherscan: {
    apiKey: {
      baseSepolia: "DO_NOT_USE", // ✅ Fake key to suppress warning
    },
  },
};
