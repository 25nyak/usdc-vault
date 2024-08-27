// Ensure you have web3.js included in your project

// Contract addresses
const vaultAddress = "0x4Be0933bB8d6C915e87E7B0dec723a20Bc2a119e";
const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // Replace with the actual USDC contract address on the Polygon network

// Contract ABIs (Ensure you have both Vault and USDC ABIs)
const vaultABI = [ /* Vault ABI here */ ];
const usdcABI = [ [{"inputs":[{"internalType":"address","name":"_proxyTo","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_new","type":"address"},{"indexed":false,"internalType":"address","name":"_old","type":"address"}],"name":"ProxyOwnerUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_new","type":"address"},{"indexed":true,"internalType":"address","name":"_old","type":"address"}],"name":"ProxyUpdated","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"IMPLEMENTATION_SLOT","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OWNER_SLOT","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxyOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxyType","outputs":[{"internalType":"uint256","name":"proxyTypeId","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferProxyOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newProxyTo","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"updateAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_newProxyTo","type":"address"}],"name":"updateImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}] ];

// Web3 setup
let web3;
let vaultContract;
let usdcContract;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            web3 = new Web3(window.ethereum);

            // Initialize contracts
            vaultContract = new web3.eth.Contract(vaultABI, vaultAddress);
            usdcContract = new web3.eth.Contract(usdcABI, usdcAddress);

            document.getElementById('walletAddress').innerText = `Connected: ${userAccount}`;
            console.log("Wallet connected: ", userAccount);
        } catch (error) {
            console.error("Failed to connect wallet: ", error);
            document.getElementById('walletAddress').innerText = `Connection failed: ${error.message}`;
        }
    } else {
        alert('Please install MetaMask to use this dApp!');
    }
}

async function depositUSDC() {
    const amount = document.getElementById('depositAmount').value;
    if (amount > 0) {
        const amountInWei = web3.utils.toWei(amount, "mwei"); // USDC uses 6 decimals
        try {
            document.getElementById('deposit-status').innerText = "Approving USDC transfer...";
            console.log("Approving USDC transfer for amount: ", amountInWei);
            await usdcContract.methods.approve(vaultAddress, amountInWei).send({ from: userAccount });

            document.getElementById('deposit-status').innerText = "Depositing USDC into the Vault...";
            console.log("Depositing USDC into the Vault, amount: ", amountInWei);
            await vaultContract.methods.deposit(amountInWei).send({ from: userAccount });

            document.getElementById('deposit-status').innerText = "Deposit successful!";
            console.log("Deposit successful!");
        } catch (error) {
            console.error("Deposit failed: ", error);
            document.getElementById('deposit-status').innerText = `Deposit failed: ${error.message}`;
        }
    } else {
        alert("Please enter a valid amount to deposit.");
    }
}

async function withdrawUSDC() {
    const amount = document.getElementById('withdrawAmount').value;
    if (amount > 0) {
        const amountInWei = web3.utils.toWei(amount, "mwei"); // USDC uses 6 decimals
        try {
            document.getElementById('withdraw-status').innerText = "Withdrawing USDC...";
            console.log("Withdrawing USDC, amount: ", amountInWei);
            await vaultContract.methods.withdraw(amountInWei).send({ from: userAccount });

            document.getElementById('withdraw-status').innerText = "Withdrawal successful!";
            console.log("Withdrawal successful!");
        } catch (error) {
            console.error("Withdrawal failed: ", error);
            document.getElementById('withdraw-status').innerText = `Withdrawal failed: ${error.message}`;
        }
    } else {
        alert("Please enter a valid amount to withdraw.");
    }
}

// Set up event listeners for buttons
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
document.getElementById('depositBtn').addEventListener('click', depositUSDC);
document.getElementById('withdrawBtn').addEventListener('click', withdrawUSDC);
	
