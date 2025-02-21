#!/bin/bash

# Exit script if any command fails
set -e

echo "Installing dependencies..."
npm install

echo "Creating .env file..."
touch .env

# Prompt user for Ganache mnemonic
read -p "Enter your Ganache mnemonic: " mnemonic

# Prompt user for Pinata JWT
read -p "Enter your Pinata JWT: " pinata_jwt

# Prompt user for path to file to upload
echo "Select the file you want to upload..."
file_path=$(python3 -c "import tkinter as tk; from tkinter import filedialog; tk.Tk().withdraw(); print(filedialog.askopenfilename())")

# Prompt user for file description
read -p "Enter a description for the file: " description

# Write the variables to .env
echo "Saving credentials to .env..."
echo "MNEMONIC=\"$mnemonic\"" > .env
echo "PINATA_JWT=\"$pinata_jwt\"" >> .env
echo "FILE_PATH=\"$file_path\"" >> .env
echo "DESCRIPTION=\"$description\"" >> .env

echo "Cleaning previous builds..."
npx hardhat clean

echo "Compiling smart contracts..."
npx hardhat compile

echo "Deploying smart contracts..."
npx hardhat run scripts/deploy.js --network ganache

echo "Uploading file to IPFS..."
npx hardhat run scripts/storeCID.js --network ganache

echo "Retrieving stored CIDs..."
npx hardhat run scripts/getUserCIDs.js --network ganache

echo "All steps completed successfully!"