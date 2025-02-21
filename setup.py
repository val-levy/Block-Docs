import subprocess
import os
import tkinter as tk
from tkinter import filedialog

# Function to load .env values if they exist
def load_env():
    jwt = ""
    mnemonic = ""
    if os.path.exists(".env"):
        with open(".env", "r") as env_file:
            for line in env_file:
                if "PINATA_JWT=" in line:
                    jwt = line.split("=", 1)[1].strip().strip('"')
                elif "MNEMONIC=" in line:
                    mnemonic = line.split("=", 1)[1].strip().strip('"')
    return jwt, mnemonic

def run_setup() -> tuple:
    # Try to load existing values
    jwt, mnemonic = load_env()
    if jwt and mnemonic:
        print("Found existing credentials.")
    else:
        print("No existing credentials found. Please enter them:")
        jwt = input("Enter your Pinata JWT: ")
        mnemonic = input("Enter your Ganache Mnemonic: ")
    
    subprocess.run("npm install", shell=True)
    # Write the credentials to .env (this will overwrite .env with new credentials)
    with open('.env', 'w') as env_file:
        env_file.write(f'FILE_PATH="{os.getenv("FILE_PATH", "")}"\n')
        env_file.write(f'DESCRIPTION="{os.getenv("DESCRIPTION", "")}"\n')
        env_file.write(f'PINATA_JWT="{jwt}"\n')
        env_file.write(f'MNEMONIC="{mnemonic}"\n')
    
    return jwt, mnemonic

def store_file(pinata_jwt, mnemonic):
    file_path = filedialog.askopenfilename()
    fileDescription = input("Enter a description for the file: ")

    # Update .env with the file details (keep the existing JWT and MNEMONIC)
    with open('.env', 'w') as env_file:
        env_file.write(f'FILE_PATH="{file_path}"\n')
        env_file.write(f'DESCRIPTION="{fileDescription}"\n')
        env_file.write(f'PINATA_JWT="{pinata_jwt}"\n')
        env_file.write(f'MNEMONIC="{mnemonic}"\n')
    
    #subprocess.run("npx hardhat clean", shell=True)
    #subprocess.run("npx hardhat compile", shell=True)
    #subprocess.run("npx hardhat run scripts/deploy.js --network ganache", shell=True)
    #subprocess.run("npx hardhat run scripts/deployStablecoin.js --network ganache", shell=True)
    subprocess.run("npx hardhat run scripts/storeCID.js --network ganache", shell=True)

def retrieve_files():
    subprocess.run("npx hardhat run scripts/getUserCIDs.js --network ganache", shell=True)

def buy_files():
    subprocess.run("npx hardhat run scripts/buyFile.js --network ganache", shell=True)

def share_files():
    subprocess.run("npx hardhat run scripts/grantAccess.js --network ganache", shell=True)

def redeploy_contract():
    subprocess.run("npx hardhat run scripts/deploy.js --network ganache", shell=True)
    subprocess.run("npx hardhat run scripts/deployStablecoin.js --network ganache", shell=True)
if __name__ == "__main__":
    working = True
    pinata_jwt = ""
    mnemonic = ""

    print("-----------------------------")
    print("          BLOCKDOCS          ")
    print("-----------------------------")

    # Load existing credentials if available
    pinata_jwt, mnemonic = load_env()

    while working:
        MODE = 0

        print("\n")
        print("1. Setup")
        print("2. Store File")
        print("3. Retrieve My Files")
        print("4. Buy Files")
        print("5. Share Files")
        print("6. Redeploy Contract")
        print("7. Exit")
        print("\n")
        print("-----------------------------")
        print("\n")
        MODE = input("> ")

        if int(MODE) == 1:
            pinata_jwt, mnemonic = run_setup()
            subprocess.run("npx hardhat clean", shell=True)
            subprocess.run("npx hardhat compile", shell=True)
            subprocess.run("npx hardhat run scripts/deploy.js --network ganache", shell=True)
            subprocess.run("npx hardhat run scripts/deployStablecoin.js --network ganache", shell=True)

        elif int(MODE) == 2:
            store_file(pinata_jwt, mnemonic)
        elif int(MODE) == 3:
            retrieve_files()
        elif int(MODE) == 4:
            buy_files()
        elif int(MODE) == 5:
            share_files()
        elif int(MODE) == 6:
            redeploy_contract()
        elif int(MODE) == 7:
            working = False
            exit()
        else:
            print("Invalid Input")
        
        print("\n")
        print("-----------------------------")
