// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CIDStorage {
    struct File {
        string cid;
        string fileName;
        string fileType;
        uint256 timestamp;
        address owner;
        mapping(address => bool) sharedWith;
        uint256 price;  // Price in ETH (0 = not for sale)
    }

    struct FileView {
        string cid;
        string fileName;
        string fileType;
        uint256 timestamp;
        address owner;
        uint256 price;
    }

    mapping(address => File[]) private userFiles;

    event FileUploaded(address indexed owner, string cid, string fileName);
    event FilePurchased(address indexed buyer, address indexed seller, string cid, uint256 price);
    event PriceUpdated(address indexed owner, string cid, uint256 newPrice);
    event AccessGranted(address indexed owner, address indexed user, uint256 fileIndex);
    event AccessRevoked(address indexed owner, address indexed user, uint256 fileIndex);

    // ✅ Upload File (Files are NOT for sale by default)
    function storeFile(string memory cid, string memory fileName, string memory fileType) public {
        userFiles[msg.sender].push(); // Push empty struct
        File storage newFile = userFiles[msg.sender][userFiles[msg.sender].length - 1];

        newFile.cid = cid;
        newFile.fileName = fileName;
        newFile.fileType = fileType;
        newFile.timestamp = block.timestamp;
        newFile.owner = msg.sender;
        newFile.price = 0; // Default: not for sale

        emit FileUploaded(msg.sender, cid, fileName);
    }

    // ✅ Set Price for File (Only then will it appear for sale)
    function setPrice(uint256 fileIndex, uint256 price) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        userFiles[msg.sender][fileIndex].price = price;
        emit PriceUpdated(msg.sender, userFiles[msg.sender][fileIndex].cid, price);
    }

    // ✅ Grant Access to a File
    function grantAccess(address user, uint256 fileIndex) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        require(user != msg.sender, "Cannot grant access to yourself");

        File storage file = userFiles[msg.sender][fileIndex];
        require(!file.sharedWith[user], "User already has access");

        file.sharedWith[user] = true;
        emit AccessGranted(msg.sender, user, fileIndex);
    }

    // ✅ Revoke Access from a File
    function revokeAccess(address user, uint256 fileIndex) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        require(userFiles[msg.sender][fileIndex].sharedWith[user], "User does not have access");

        userFiles[msg.sender][fileIndex].sharedWith[user] = false;
        emit AccessRevoked(msg.sender, user, fileIndex);
    }

    // ✅ Buy a File (Gets CID but NOT permanent access)
    function buyFile(address seller, uint256 fileIndex) public payable {
        require(fileIndex < userFiles[seller].length, "Invalid file index");
        File storage file = userFiles[seller][fileIndex];
        require(msg.value >= file.price, "Insufficient payment");
        require(file.price > 0, "File is not for sale");

        payable(seller).transfer(msg.value); // Send payment to seller

        emit FilePurchased(msg.sender, seller, file.cid, file.price);
    }

    // ✅ Get Only Files That Are for Sale
    function getUserFiles(address user) public view returns (FileView[] memory) {
        uint256 fileCount = userFiles[user].length;
        uint256 sellableCount = 0;

        // Count how many files have a price > 0
        for (uint256 i = 0; i < fileCount; i++) {
            if (userFiles[user][i].price > 0) {
                sellableCount++;
            }
        }

        // Create a new array for only sellable files
        FileView[] memory fileList = new FileView[](sellableCount);
        uint256 index = 0;

        for (uint256 i = 0; i < fileCount; i++) {
            if (userFiles[user][i].price > 0) {
                fileList[index] = FileView(
                    userFiles[user][i].cid,
                    userFiles[user][i].fileName,
                    userFiles[user][i].fileType,
                    userFiles[user][i].timestamp,
                    userFiles[user][i].owner,
                    userFiles[user][i].price
                );
                index++;
            }
        }

        return fileList;
    }
}
