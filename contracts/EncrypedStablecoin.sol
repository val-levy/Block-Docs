// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract EncryptedStablecoin {
    string public name = "EncryptedStablecoin";
    string public symbol = "eUSD";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;

    struct ShieldedBalance {
        uint256 encryptedBalance; // Encrypted balance amount
        bytes publicKey; // Public key used for decryption
    }

    mapping(address => ShieldedBalance) private shieldedBalances;
    mapping(address => bytes) private userKeys; // Store user's encryption keys

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event ShieldedTransfer(address indexed from, address indexed to, uint256 amount, bytes encryptedData);
    event ShieldedBalanceUpdated(address indexed user, bytes encryptedBalance);
    event EncryptionKeyUpdated(address indexed user, bytes publicKey);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply * 10**decimals;
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        require(balances[sender] >= amount, "Insufficient balance");
        require(allowances[sender][msg.sender] >= amount, "Allowance exceeded");
        balances[sender] -= amount;
        balances[recipient] += amount;
        allowances[sender][msg.sender] -= amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function setEncryptionKey(bytes memory publicKey) external {
        userKeys[msg.sender] = publicKey;
        emit EncryptionKeyUpdated(msg.sender, publicKey);
    }

    function getEncryptionKey(address user) public view returns (bytes memory) {
        return userKeys[user];
    }

    function shieldedTransfer(address recipient, uint256 amount, bytes memory encryptedData) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        shieldedBalances[recipient] = ShieldedBalance({
            encryptedBalance: shieldedBalances[recipient].encryptedBalance + amount,
            publicKey: userKeys[recipient]
        });

        emit ShieldedTransfer(msg.sender, recipient, amount, encryptedData);
    }

    function getShieldedBalance(address user) public view returns (bytes memory) {
        return abi.encodePacked(shieldedBalances[user].encryptedBalance, shieldedBalances[user].publicKey);
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return allowances[owner][spender];
    }

}
