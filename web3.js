// web3.js

let web3;
let vaultContract;
let userAccount;

// Vault contract address on Polygon
const vaultAddress = "0x4Be0933bB8d6C915e87E7B0dec723a20Bc2a119e";  // Your deployed contract address

// Vault contract ABI
const vaultABI = [
    // ... (The ABI you provided)
   [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "Deposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldVault",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newVault",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "VaultChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "interest",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DELAY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "INTEREST_RATE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "applyVault",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "delayVault",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depositTimestamps",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "deposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getDepositTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pendingVault",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_vault",
				"type": "address"
			}
		],
		"name": "setPendingVault",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdc",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vault",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
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
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
].
];

// Connect to MetaMask wallet
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        document.getElementById("wallet-address").innerText = `Connected: ${userAccount}`;
        vaultContract = new web3.eth.Contract(vaultABI, vaultAddress);
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}

// Deposit USDC into the vault
async function depositUSDC(amount) {
    const amountInWei = web3.utils.toWei(amount, 'mwei'); // USDC uses 6 decimal places
    try {
        await vaultContract.methods.deposit(amountInWei).send({ from: userAccount });
        alert("Deposit successful!");
    } catch (error) {
        console.error("Deposit failed:", error);
        alert("Deposit failed. Please try again.");
    }
}

// Withdraw USDC from the vault
async function withdrawUSDC(amount) {
    const amountInWei = web3.utils.toWei(amount, 'mwei'); // USDC uses 6 decimal places
    try {
        await vaultContract.methods.withdraw(amountInWei).send({ from: userAccount });
        alert("Withdrawal successful!");
    } catch (error) {
        console.error("Withdrawal failed:", error);
        alert("Withdrawal failed. Please try again.");
    }
}

// Get the user's deposit amount
async function getUserDeposit() {
    try {
        const deposit = await vaultContract.methods.getDeposit(userAccount).call();
        document.getElementById("user-deposit").innerText = `Your Deposit: ${web3.utils.fromWei(deposit, 'mwei')} USDC`;
    } catch (error) {
        console.error("Failed to fetch deposit:", error);
    }
}

// Get the user's deposit timestamp
async function getUserDepositTimestamp() {
    try {
        const timestamp = await vaultContract.methods.getDepositTimestamp(userAccount).call();
        document.getElementById("deposit-timestamp").innerText = `Deposit Timestamp: ${new Date(timestamp * 1000).toLocaleString()}`;
    } catch (error) {
        console.error("Failed to fetch deposit timestamp:", error);
    }
}

// Listen to Deposit and Withdraw events
vaultContract.events.Deposited({ fromBlock: 'latest' })
    .on('data', (event) => {
        console.log('Deposited Event:', event);
    })
    .on('error', console.error);

vaultContract.events.Withdrawn({ fromBlock: 'latest' })
    .on('data', (event) => {
        console.log('Withdrawn Event:', event);
    })
    .on('error', console.error);
