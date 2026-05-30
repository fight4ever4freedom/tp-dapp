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

const INVITE_CODE = "TP2026";
const USERS_KEY = "tp_dapp_users";
const SESSION_KEY = "tp_dapp_session";

const els = {
  authScreen: document.querySelector("#authScreen"),
  showLoginBtn: document.querySelector("#showLoginBtn"),
  showRegisterBtn: document.querySelector("#showRegisterBtn"),
  loginForm: document.querySelector("#loginForm"),
  registerForm: document.querySelector("#registerForm"),
  authMessage: document.querySelector("#authMessage"),
  connectBtn: document.querySelector("#connectBtn"),
  logoutBtn: document.querySelector("#logoutBtn"),
  notice: document.querySelector("#notice"),
  walletStatus: document.querySelector("#walletStatus"),
  accountText: document.querySelector("#accountText"),
  networkText: document.querySelector("#networkText"),
  balanceText: document.querySelector("#balanceText"),
  copyAddressBtn: document.querySelector("#copyAddressBtn"),
  signForm: document.querySelector("#signForm"),
  sendForm: document.querySelector("#sendForm"),
  sendBtn: document.querySelector("#sendBtn"),
  clearLogBtn: document.querySelector("#clearLogBtn"),
  logBox: document.querySelector("#logBox"),
};

let account = "";
let chainId = "";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function hashPassword(password, salt) {
  const input = new TextEncoder().encode(`${salt}:${password}`);
  const bytes = await crypto.subtle.digest("SHA-256", input);
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function createSalt() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function setAuthMode(mode) {
  const isLogin = mode === "login";
  els.loginForm.classList.toggle("hidden", !isLogin);
  els.registerForm.classList.toggle("hidden", isLogin);
  els.showLoginBtn.classList.toggle("active", isLogin);
  els.showRegisterBtn.classList.toggle("active", !isLogin);
  setAuthMessage("");
}

function setAuthMessage(message, ok = false) {
  els.authMessage.textContent = message;
  els.authMessage.classList.toggle("ok", ok);
}

function showAppFor(username) {
  els.authScreen.classList.add("hidden");
  setNotice(`Signed in as ${username}. Connect your wallet to continue.`, "ok");
  refreshWallet().catch((error) => log("Init failed", { message: error.message }));
}

function requireAuth() {
  const username = localStorage.getItem(SESSION_KEY);
  if (username && readUsers()[username]) {
    showAppFor(username);
  } else {
    localStorage.removeItem(SESSION_KEY);
    els.authScreen.classList.remove("hidden");
  }
}

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

function setNotice(message, tone = "") {
  els.notice.textContent = message;
  els.notice.className = `notice ${tone}`.trim();
}

function setBusy(isBusy, text) {
  els.connectBtn.disabled = isBusy;
  if (text) {
    els.connectBtn.textContent = text;
  } else if (!isBusy) {
    els.connectBtn.textContent = account ? "Refresh wallet" : "Connect wallet";
  }
}

function setTransactionBusy(isBusy) {
  els.connectBtn.disabled = isBusy;
  els.sendBtn.disabled = isBusy;
  els.sendBtn.textContent = isBusy ? "Confirm in wallet" : "Send transaction";
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
    setNotice("No wallet provider found. Open this URL inside TokenPocket DApp browser.", "warn");
    els.walletStatus.textContent = "No wallet";
    els.accountText.textContent = "Open in TP Wallet";
    els.copyAddressBtn.disabled = true;
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
  els.copyAddressBtn.disabled = !account;
  setNotice(
    account ? "Wallet connected. You can sign messages or send native token now." : "Wallet detected. Tap Connect wallet to continue.",
    account ? "ok" : ""
  );

  document.querySelectorAll(".chain-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.chain === chainId);
  });

  if (account) {
    const balanceHex = await request("eth_getBalance", [account, "latest"]);
    const symbol = chainConfigs[chainId]?.nativeCurrency.symbol || "ETH";
    els.balanceText.textContent = `${formatUnits(hexToDecimal(balanceHex))} ${symbol}`;
  } else {
    els.balanceText.textContent = "-";
  }
}

async function connectWallet() {
  setBusy(true, "Connecting...");
  try {
    const accounts = await request("eth_requestAccounts");
    account = accounts[0] || "";
    await refreshWallet();
    log("Wallet connected", { account, chainId });
  } finally {
    setBusy(false);
  }
}

async function switchChain(targetChainId) {
  setNotice(`Switching to ${chainConfigs[targetChainId]?.chainName || targetChainId}...`);
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
  setTransactionBusy(true);
  try {
    const txHash = await request("eth_sendTransaction", [{ from: account, to, value }]);
    const explorer = chainConfigs[chainId]?.blockExplorerUrls?.[0];
    log("Transaction submitted", { txHash, explorer: explorer ? `${explorer}/tx/${txHash}` : null });
    setNotice("Transaction submitted. Check the hash in the result box.", "ok");
  } finally {
    setTransactionBusy(false);
  }
}

els.connectBtn.addEventListener("click", () => {
  connectWallet().catch((error) => log("Connect failed", { message: error.message, code: error.code }));
});

els.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(SESSION_KEY);
  account = "";
  chainId = "";
  els.authScreen.classList.remove("hidden");
  setAuthMode("login");
  log("Signed out");
});

els.showLoginBtn.addEventListener("click", () => setAuthMode("login"));
els.showRegisterBtn.addEventListener("click", () => setAuthMode("register"));

els.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(els.registerForm);
  const username = String(data.get("username")).trim().toLowerCase();
  const password = String(data.get("password"));
  const invite = String(data.get("invite")).trim();

  if (invite !== INVITE_CODE) {
    setAuthMessage("Invalid invite code.");
    return;
  }

  const users = readUsers();
  if (users[username]) {
    setAuthMessage("Username already exists.");
    return;
  }

  const salt = createSalt();
  users[username] = {
    salt,
    passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, username);
  setAuthMessage("Registered successfully.", true);
  els.registerForm.reset();
  showAppFor(username);
});

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(els.loginForm);
  const username = String(data.get("username")).trim().toLowerCase();
  const password = String(data.get("password"));
  const user = readUsers()[username];

  if (!user || (await hashPassword(password, user.salt)) !== user.passwordHash) {
    setAuthMessage("Wrong username or password.");
    return;
  }

  localStorage.setItem(SESSION_KEY, username);
  els.loginForm.reset();
  showAppFor(username);
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

els.copyAddressBtn.addEventListener("click", async () => {
  if (!account) {
    return;
  }
  await navigator.clipboard.writeText(account);
  log("Address copied", { account });
});

const walletProvider = provider();
if (walletProvider) {
  walletProvider.on?.("accountsChanged", refreshWallet);
  walletProvider.on?.("chainChanged", refreshWallet);
}

requireAuth();
