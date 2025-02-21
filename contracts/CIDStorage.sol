// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CIDStorage {
    struct File {
        string cid;
        string fileName;
        string fileType;
        string fileDesc;
        uint256 timestamp;
        address owner;
        mapping(address => bool) sharedWith;
        uint256 price;  // Price in ETH (0 = not for sale)
    }

    struct FileView {
        string cid;
        string fileName;
        string fileType;
        string fileDesc;
        uint256 timestamp;
        address owner;
        uint256 price;
    }

    mapping(address => File[]) private userFiles;
    mapping(address => bool) private registeredUsers;
    address[] private allUsers;

    event FileUploaded(address indexed owner, string cid, string fileName);
    event FilePurchased(address indexed buyer, address indexed seller, string cid, uint256 price);
    event PriceUpdated(address indexed owner, string cid, uint256 newPrice);
    event AccessGranted(address indexed owner, address indexed user, uint256 fileIndex);
    event AccessRevoked(address indexed owner, address indexed user, uint256 fileIndex);

    function storeFile(string memory cid, string memory fileName, string memory fileType) public {
        File storage newFile = userFiles[msg.sender].push();
        newFile.cid = cid;
        newFile.fileName = fileName;
        newFile.fileType = fileType;
        newFile.fileDesc = fileDesc;
        newFile.timestamp = block.timestamp;
        newFile.owner = msg.sender;
        newFile.price = 0; // Default: not for sale

        emit FileUploaded(msg.sender, cid, fileName);
    }

    function setPrice(uint256 fileIndex, uint256 price) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        require(userFiles[msg.sender].length > 0, "No files found for this user");
        userFiles[msg.sender][fileIndex].price = price;
        emit PriceUpdated(msg.sender, userFiles[msg.sender][fileIndex].cid, price);
    }

    function grantAccess(address user, uint256 fileIndex) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        userFiles[msg.sender][fileIndex].sharedWith[user] = true;
        emit AccessGranted(msg.sender, user, fileIndex);
    }

    function revokeAccess(address user, uint256 fileIndex) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        require(userFiles[msg.sender][fileIndex].sharedWith[user], "User does not have access");
        userFiles[msg.sender][fileIndex].sharedWith[user] = false;
        emit AccessRevoked(msg.sender, user, fileIndex);
    }

    function buyFile(address seller, uint256 fileIndex) public payable {
        require(fileIndex < userFiles[seller].length, "Invalid file index");
        File storage file = userFiles[seller][fileIndex];
        require(msg.value >= file.price, "Insufficient payment");
        require(file.price > 0, "File is not for sale");

        file.sharedWith[msg.sender] = false; // Buyer gets file but not automatic access
        payable(seller).transfer(msg.value); // Send payment to the seller

        emit FilePurchased(msg.sender, seller, file.cid, file.price);
    }

    function getUserFiles(address user) public view returns (FileView[] memory) {
        uint256 fileCount = userFiles[user].length;

        FileView[] memory fileList = new FileView[](fileCount);

        for (uint256 i = 0; i < fileCount; i++) {
            fileList[i] = FileView(
                userFiles[user][i].cid,
                userFiles[user][i].fileName,
                userFiles[user][i].fileType,
                userFiles[user][i].fileDesc,
                userFiles[user][i].timestamp,
                userFiles[user][i].owner,
                userFiles[user][i].price
            );
        }

        return fileList;
    }

    function getUserFileCount(address user) public view returns (uint256) {
        return userFiles[user].length;
    }

    function getAllUsers() public view returns (address[] memory) {
        return allUsers;
    }

    function isSharedWith(address fileOwner, uint256 fileIndex, address user) public view returns (bool) {
        require(fileIndex < userFiles[fileOwner].length, "Invalid file index");
        return userFiles[fileOwner][fileIndex].sharedWith[user];
    }

    function getSharedFiles(address user) public view returns (FileView[] memory) {
        uint256 sharedCount = 0;

        for (uint256 i = 0; i < allUsers.length; i++) {
            address owner = allUsers[i];
            for (uint256 j = 0; j < userFiles[owner].length; j++) {
                if (userFiles[owner][j].sharedWith[user]) {
                    sharedCount++;
                }
            }
        }

        FileView[] memory sharedList = new FileView[](sharedCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allUsers.length; i++) {
            address owner = allUsers[i];
            for (uint256 j = 0; j < userFiles[owner].length; j++) {
                if (userFiles[owner][j].sharedWith[user]) {
                    sharedList[index] = FileView(
                        userFiles[owner][j].cid,
                        userFiles[owner][j].fileName,
                        userFiles[owner][j].fileType,
                        userFiles[owner][j].timestamp,
                        userFiles[owner][j].owner,
                        userFiles[owner][j].price
                    );
                    index++;
                }
            }
        }

        return sharedList;
    }
}
