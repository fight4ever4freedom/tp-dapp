const chainConfigs = {
  "0x1": {
    chainName: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://ethereum.publicnode.com"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  "0x38": {
    chainName: "BNB Smart Chain",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  "0x89": {
    chainName: "Polygon",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  "0xa4b1": {
    chainName: "Arbitrum One",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io"],
  },
};

const els = {
  connectBtn: document.querySelector("#connectBtn"),
  walletStatus: document.querySelector("#walletStatus"),
  accountText: document.querySelector("#accountText"),
  networkText: document.querySelector("#networkText"),
  balanceText: document.querySelector("#balanceText"),
  signForm: document.querySelector("#signForm"),
  sendForm: document.querySelector("#sendForm"),
  clearLogBtn: document.querySelector("#clearLogBtn"),
  logBox: document.querySelector("#logBox"),
};

let account = "";
let chainId = "";

function provider() {
  return window.ethereum || window.tp?.ethereum || null;
}

function shortAddress(address) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "-";
}

function log(message, payload) {
  const time = new Date().toLocaleTimeString();
  const body = payload ? `\n${JSON.stringify(payload, null, 2)}` : "";
  els.logBox.textContent = `[${time}] ${message}${body}`;
}

function hexToDecimal(hex) {
  return BigInt(hex || "0x0");
}

function decimalToHex(value) {
  return `0x${value.toString(16)}`;
}

function parseUnits(value, decimals = 18) {
  const normalized = String(value).trim();
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error("Invalid amount");
  }

  const [whole, fraction = ""] = normalized.split(".");
  const padded = `${fraction}${"0".repeat(decimals)}`.slice(0, decimals);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(padded);
}

function formatUnits(value, decimals = 18) {
  const base = 10n ** BigInt(decimals);
  const whole = value / base;
  const fraction = String(value % base).padStart(decimals, "0").slice(0, 6);
  return `${whole}.${fraction}`.replace(/\.?0+$/, "");
}

async function request(method, params) {
  const walletProvider = provider();
  if (!walletProvider) {
    throw new Error("Wallet provider not found. Open this page inside TokenPocket.");
  }
  return walletProvider.request({ method, params });
}

async function refreshWallet() {
  const walletProvider = provider();
  if (!walletProvider) {
    els.walletStatus.textContent = "No wallet";
    els.accountText.textContent = "Open in TP Wallet";
    return;
  }

  const accounts = await request("eth_accounts");
  account = accounts[0] || "";
  chainId = await request("eth_chainId");

  els.walletStatus.textContent = account ? "Connected" : "Not connected";
  els.walletStatus.classList.toggle("is-ok", Boolean(account));
  els.accountText.textContent = account ? shortAddress(account) : "-";
  els.networkText.textContent = chainConfigs[chainId]?.chainName || chainId || "-";
  els.connectBtn.textContent = account ? "Refresh wallet" : "Connect wallet";

  if (account) {
    const balanceHex = await request("eth_getBalance", [account, "latest"]);
    const symbol = chainConfigs[chainId]?.nativeCurrency.symbol || "ETH";
    els.balanceText.textContent = `${formatUnits(hexToDecimal(balanceHex))} ${symbol}`;
  } else {
    els.balanceText.textContent = "-";
  }
}

async function connectWallet() {
  const accounts = await request("eth_requestAccounts");
  account = accounts[0] || "";
  await refreshWallet();
  log("Wallet connected", { account, chainId });
}

async function switchChain(targetChainId) {
  try {
    await request("wallet_switchEthereumChain", [{ chainId: targetChainId }]);
  } catch (error) {
    if (error.code === 4902 && chainConfigs[targetChainId]) {
      await request("wallet_addEthereumChain", [
        { chainId: targetChainId, ...chainConfigs[targetChainId] },
      ]);
    } else {
      throw error;
    }
  }

  await refreshWallet();
  log("Network switched", { chainId: targetChainId, name: chainConfigs[targetChainId]?.chainName });
}

async function signMessage(message) {
  if (!account) {
    await connectWallet();
  }
  const signature = await request("personal_sign", [message, account]);
  log("Message signed", { account, message, signature });
}

async function sendNativeToken(to, amount) {
  if (!account) {
    await connectWallet();
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(to)) {
    throw new Error("Invalid recipient address");
  }

  const value = decimalToHex(parseUnits(amount));
  const txHash = await request("eth_sendTransaction", [{ from: account, to, value }]);
  log("Transaction submitted", { txHash });
}

els.connectBtn.addEventListener("click", () => {
  connectWallet().catch((error) => log("Connect failed", { message: error.message, code: error.code }));
});

document.querySelectorAll(".chain-btn").forEach((button) => {
  button.addEventListener("click", () => {
    switchChain(button.dataset.chain).catch((error) => {
      log("Network switch failed", { message: error.message, code: error.code });
    });
  });
});

els.signForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signMessage(new FormData(els.signForm).get("message")).catch((error) => {
    log("Sign failed", { message: error.message, code: error.code });
  });
});

els.sendForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(els.sendForm);
  sendNativeToken(data.get("to"), data.get("amount")).catch((error) => {
    log("Send failed", { message: error.message, code: error.code });
  });
});

els.clearLogBtn.addEventListener("click", () => {
  els.logBox.textContent = "Waiting...";
});

const walletProvider = provider();
if (walletProvider) {
  walletProvider.on?.("accountsChanged", refreshWallet);
  walletProvider.on?.("chainChanged", refreshWallet);
}

refreshWallet().catch((error) => log("Init failed", { message: error.message }));
