// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CIDStorage {
    address public admin;
    mapping(address => bool) public approvedUsers;
    mapping(address => string[]) private userCIDs;

    event CIDStored(address indexed user, string cid);
    event UserApproved(address indexed user);
    event UserRevoked(address indexed user);

    constructor() {
        admin = msg.sender; // Set deployer as admin
    }

    // 🔹 Only admin can approve new users
    function approveUser(address _user) public {
        require(msg.sender == admin, "Only admin can approve users");
        approvedUsers[_user] = true;
        emit UserApproved(_user);
    }

    // 🔹 Only admin can revoke user access
    function revokeUser(address _user) public {
        require(msg.sender == admin, "Only admin can revoke users");
        approvedUsers[_user] = false;
        emit UserRevoked(_user);
    }

    // 🔹 Only approved users can store a CID
    function storeCID(string memory _cid) public {
        require(approvedUsers[msg.sender], "You are not authorized to store CIDs");
        userCIDs[msg.sender].push(_cid);
        emit CIDStored(msg.sender, _cid);
    }

    // 🔹 Only the owner of the CIDs can retrieve them
    function getUserCIDs() public view returns (string[] memory) {
        require(approvedUsers[msg.sender], "You are not authorized to retrieve CIDs");
        return userCIDs[msg.sender];
    }
}
