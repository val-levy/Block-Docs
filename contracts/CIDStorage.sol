// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IEncryptedStablecoin {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract CIDStorage {
    struct File {
        string cid;
        string fileName;
        string fileType;
        string fileDesc;
        uint256 timestamp;
        address owner;
        mapping(address => bool) sharedWith;
        uint256 priceETH;
        uint256 priceStablecoin;
    }

    struct FileView {
        string cid;
        string fileName;
        string fileType;
        string fileDesc;
        uint256 timestamp;
        address owner;
        uint256 priceETH;
        uint256 priceStablecoin;
    }

    mapping(address => File[]) private userFiles;
    mapping(address => bool) private registeredUsers;
    address[] private allUsers;

    event FileUploaded(address indexed owner, string cid, string fileName);
    event FilePurchased(address indexed buyer, address indexed seller, string cid, uint256 price, string paymentMethod);
    event PriceUpdated(address indexed owner, string cid, uint256 newPrice, string currency);
    event AccessGranted(address indexed owner, address indexed user, uint256 fileIndex);
    event AccessRevoked(address indexed owner, address indexed user, uint256 fileIndex);

    // Mapping for encryption keys
    mapping(string => string) private encryptionKeys;  // CID => Encryption Key
    mapping(string => string) private ivs;  // CID => IV

    // Stablecoin contract address
    address public stablecoinAddress;
    IEncryptedStablecoin public stablecoin;

    constructor(address _stablecoinAddress) {
        stablecoinAddress = _stablecoinAddress;
        stablecoin = IEncryptedStablecoin(_stablecoinAddress);
    }

    // ✅ Store encryption key when uploading a file
    function storeFile(
        string memory cid,
        string memory fileName,
        string memory fileType,
        string memory fileDesc,
        string memory encryptionKey,
        string memory iv
    ) public {
        require(bytes(encryptionKeys[cid]).length == 0, "Encryption key already exists");

        File storage newFile = userFiles[msg.sender].push();
        newFile.cid = cid;
        newFile.fileName = fileName;
        newFile.fileType = fileType;
        newFile.fileDesc = fileDesc;
        newFile.timestamp = block.timestamp;
        newFile.owner = msg.sender;
        newFile.priceETH = 0;
        newFile.priceStablecoin = 0;

        encryptionKeys[cid] = encryptionKey;
        ivs[cid] = iv;

        if (!registeredUsers[msg.sender]) {
            registeredUsers[msg.sender] = true;
            allUsers.push(msg.sender);
        }

        emit FileUploaded(msg.sender, cid, fileName);
    }

    // ✅ Retrieve encryption key for authorized users
    function getEncryptionKey(string memory cid) public view returns (string memory, string memory) {
        address owner;
        bool hasAccess = false;

        for (uint256 i = 0; i < allUsers.length; i++) {
            address user = allUsers[i];
            for (uint256 j = 0; j < userFiles[user].length; j++) {
                if (keccak256(abi.encodePacked(userFiles[user][j].cid)) == keccak256(abi.encodePacked(cid))) {
                    owner = user;
                    hasAccess = (msg.sender == owner || userFiles[owner][j].sharedWith[msg.sender]);
                    break;
                }
            }
        }

        require(hasAccess, "Not authorized to access encryption key");
        return (encryptionKeys[cid], ivs[cid]);
    }

    // ✅ Set price for a file in ETH
    function setPrice(uint256 fileIndex, uint256 price) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        userFiles[msg.sender][fileIndex].priceETH = price;

        emit PriceUpdated(msg.sender, userFiles[msg.sender][fileIndex].cid, price, "ETH");
    }

    // ✅ Set price for a file in Stablecoin
    function setPriceStablecoin(uint256 fileIndex, uint256 price) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        require(price > 0, "Price must be greater than zero");

        userFiles[msg.sender][fileIndex].priceStablecoin = price;
        
        emit PriceUpdated(msg.sender, userFiles[msg.sender][fileIndex].cid, price, "Stablecoin");
    }

    // ✅ Grant access to a file
    function grantAccess(address user, uint256 fileIndex) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        userFiles[msg.sender][fileIndex].sharedWith[user] = true;
        emit AccessGranted(msg.sender, user, fileIndex);
    }

    // ✅ Revoke access from a user
    function revokeAccess(address user, uint256 fileIndex) public {
        require(fileIndex < userFiles[msg.sender].length, "Invalid file index");
        require(userFiles[msg.sender][fileIndex].sharedWith[user], "User does not have access");
        userFiles[msg.sender][fileIndex].sharedWith[user] = false;
        emit AccessRevoked(msg.sender, user, fileIndex);
    }

    // ✅ Buy a file using ETH
    function buyFile(address seller, uint256 fileIndex) public payable {
        require(fileIndex < userFiles[seller].length, "Invalid file index");
        File storage file = userFiles[seller][fileIndex];
        require(msg.value >= file.priceETH, "Insufficient payment");
        require(file.priceETH > 0, "File is not for sale");

        file.sharedWith[msg.sender] = true; // Buyer gets access to the file
        payable(seller).transfer(msg.value);

        emit FilePurchased(msg.sender, seller, file.cid, file.priceETH, "ETH");
    }

    // ✅ Buy a file using Stablecoin
    function buyFileWithStablecoin(address seller, uint256 fileIndex) public {
        require(fileIndex < userFiles[seller].length, "Invalid file index");
        File storage file = userFiles[seller][fileIndex];
        require(file.priceStablecoin > 0, "File is not for sale in stablecoin");

        uint256 priceInStablecoin = file.priceStablecoin;

        require(stablecoin.balanceOf(msg.sender) >= priceInStablecoin, "Insufficient stablecoin balance");

        // ✅ Transfer stablecoin from buyer to seller
        require(stablecoin.transferFrom(msg.sender, seller, priceInStablecoin), "Stablecoin transfer failed");

        file.sharedWith[msg.sender] = true; // Buyer gets access to the file
        emit FilePurchased(msg.sender, seller, file.cid, file.priceStablecoin, "Stablecoin");
    }

    // ✅ Retrieve a user's uploaded files
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
                userFiles[user][i].priceETH,
                userFiles[user][i].priceStablecoin
            );
        }

        return fileList;
    }

    // ✅ Get number of files a user has uploaded
    function getUserFileCount(address user) public view returns (uint256) {
        return userFiles[user].length;
    }

    // ✅ Get all users who have uploaded files
    function getAllUsers() public view returns (address[] memory) {
        return allUsers;
    }
}
