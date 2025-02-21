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
        uint256 price;  // Price in MATIC (0 = not for sale)
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

    function storeFile(string memory cid, string memory fileName, string memory fileType) public {
        File storage newFile = userFiles[msg.sender].push();
        newFile.cid = cid;
        newFile.fileName = fileName;
        newFile.fileType = fileType;
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


    function buyFile(address seller, uint256 fileIndex) public payable {
        require(fileIndex < userFiles[seller].length, "Invalid file index");
        File storage file = userFiles[seller][fileIndex];
        require(msg.value >= file.price, "Insufficient payment");
        require(file.price > 0, "File is not for sale");

        file.sharedWith[msg.sender] = true; // Grant access
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
                userFiles[user][i].timestamp,
                userFiles[user][i].owner,
                userFiles[user][i].price
            );
        }
        return fileList;
    }
}
