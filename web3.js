// web3.js

let web3;
let vaultContract;
let userAccount;
const vaultAddress = "0x4Be0933bB8d6C915e87E7B0dec723a20Bc2a119e"; // Your contract address

const vaultABI = [
    // Your contract ABI goes here...
    // Example: Add only a few entries for clarity:
    {
        "inputs": [],
        "name": "applyVault",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // ... rest of the ABI
];

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Get the user's account
            const accounts = await web3.eth.getAccounts();
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            document.getElementById('wallet-address').innerText = userAccount;

            // Show deposit and withdraw sections
            document.getElementById('deposit-section').style.display = 'block';
            document.getElementById('withdraw-section').style.display = 'block';

            // Initialize the contract
            vaultContract = new web3.eth.Contract(vaultABI, vaultAddress);
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
}

async function depositUSDC() {
    const amount = document.getElementById('depositAmount').value;
    if (amount > 0) {
        try {
            await vaultContract.methods.deposit(web3.utils.toWei(amount, "ether")).send({ from: userAccount });
            document.getElementById('deposit-status').innerText = "Deposit successful!";
        } catch (error) {
            console.error("Deposit failed", error);
            document.getElementById('deposit-status').innerText = "Deposit failed. Check console for details.";
        }
    } else {
        alert("Please enter a valid amount to deposit.");
    }
}

async function withdrawUSDC() {
    const amount = document.getElementById('withdrawAmount').value;
    if (amount > 0) {
        try {
            await vaultContract.methods.withdraw(web3.utils.toWei(amount, "ether")).send({ from: userAccount });
            document.getElementById('withdraw-status').innerText = "Withdrawal successful!";
        } catch (error) {
            console.error("Withdrawal failed", error);
            document.getElementById('withdraw-status').innerText = "Withdrawal failed. Check console for details.";
        }
    } else {
        alert("Please enter a valid amount to withdraw.");
    }
}

// Event listeners
document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('depositButton').addEventListener('click', depositUSDC);
document.getElementById('withdrawButton').addEventListener('click', withdrawUSDC);
