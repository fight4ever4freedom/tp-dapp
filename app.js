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
const DB_SESSION_KEY = "tp_dapp_db_session";
const QUIZ_REWARD = 3000;
const REDEEM_COST = 3000;
const REDEEM_USDT = 3;

const quizQuestions = [
  {
    q: "\u533a\u5757\u94fe\u6700\u6838\u5fc3\u7684\u7279\u70b9\u662f\u4ec0\u4e48\uff1f",
    options: ["\u53bb\u4e2d\u5fc3\u5316\u548c\u6570\u636e\u96be\u4ee5\u7be1\u6539", "\u53ea\u80fd\u5b58\u50a8\u56fe\u7247", "\u4e0d\u9700\u8981\u4efb\u4f55\u7f51\u7edc"],
  },
  {
    q: "TP \u94b1\u5305\u7684 DApp \u6d4f\u89c8\u5668\u4e3b\u8981\u7528\u6765\u505a\u4ec0\u4e48\uff1f",
    options: ["\u6253\u5f00\u5e76\u8fde\u63a5\u94fe\u4e0a\u5e94\u7528", "\u4fee\u6539\u94f6\u884c\u5361\u5bc6\u7801", "\u5173\u95ed\u6240\u6709\u533a\u5757\u94fe"],
  },
  {
    q: "\u8fde\u63a5 DApp \u65f6\uff0c\u7528\u6237\u9700\u8981\u6ce8\u610f\u4ec0\u4e48\uff1f",
    options: ["\u786e\u8ba4\u7f51\u7ad9\u5730\u5740\u548c\u6388\u6743\u5185\u5bb9", "\u968f\u610f\u8f93\u5165\u52a9\u8bb0\u8bcd", "\u628a\u5bc6\u7801\u53d1\u7ed9\u5ba2\u670d"],
  },
  {
    q: "\u79c1\u94a5\u6216\u52a9\u8bb0\u8bcd\u5e94\u8be5\u5982\u4f55\u4fdd\u7ba1\uff1f",
    options: ["\u79bb\u7ebf\u59a5\u5584\u4fdd\u7ba1\uff0c\u4e0d\u544a\u8bc9\u4efb\u4f55\u4eba", "\u53d1\u5230\u7fa4\u91cc\u5907\u4efd", "\u653e\u5728\u516c\u5f00\u7f51\u9875"],
  },
  {
    q: "\u94fe\u4e0a\u4ea4\u6613\u4e00\u65e6\u786e\u8ba4\uff0c\u901a\u5e38\u80fd\u5426\u76f4\u63a5\u64a4\u56de\uff1f",
    options: ["\u901a\u5e38\u4e0d\u80fd", "\u4e00\u5b9a\u80fd", "\u53ea\u8981\u5173\u673a\u5c31\u80fd"],
  },
  {
    q: "Gas \u8d39\u901a\u5e38\u662f\u4ec0\u4e48\uff1f",
    options: ["\u6267\u884c\u94fe\u4e0a\u4ea4\u6613\u9700\u8981\u652f\u4ed8\u7684\u7f51\u7edc\u8d39", "\u624b\u673a\u6d41\u91cf\u8d39", "\u94b1\u5305\u6ce8\u518c\u8d39"],
  },
  {
    q: "\u5728 BNB Chain \u4e0a\u53d1\u9001\u4ea4\u6613\u901a\u5e38\u9700\u8981\u54ea\u79cd\u539f\u751f\u5e01\u4ed8 Gas\uff1f",
    options: ["BNB", "BTC", "DOGE"],
  },
  {
    q: "\u5982\u679c DApp \u8981\u6c42\u4f60\u8f93\u5165\u52a9\u8bb0\u8bcd\uff0c\u6b63\u786e\u505a\u6cd5\u662f\u4ec0\u4e48\uff1f",
    options: ["\u7acb\u5373\u505c\u6b62\u64cd\u4f5c\u5e76\u5173\u95ed\u9875\u9762", "\u8f93\u5165\u52a9\u8bb0\u8bcd", "\u622a\u56fe\u53d1\u7ed9\u964c\u751f\u4eba"],
  },
  {
    q: "\u94b1\u5305\u5730\u5740\u901a\u5e38\u53ef\u4ee5\u7528\u6765\u505a\u4ec0\u4e48\uff1f",
    options: ["\u63a5\u6536\u8d44\u4ea7\u548c\u67e5\u8be2\u94fe\u4e0a\u8bb0\u5f55", "\u76f4\u63a5\u627e\u56de\u79c1\u94a5", "\u4fee\u6539\u533a\u5757\u94fe\u6570\u636e"],
  },
  {
    q: "\u5207\u6362\u7f51\u7edc\u524d\u9700\u8981\u786e\u8ba4\u4ec0\u4e48\uff1f",
    options: ["DApp \u652f\u6301\u7684\u94fe\u548c\u5f53\u524d\u8d44\u4ea7\u6240\u5728\u94fe", "\u624b\u673a\u4eae\u5ea6", "\u804a\u5929\u8bb0\u5f55"],
  },
  {
    q: "TokenPocket \u662f\u4ec0\u4e48\u7c7b\u578b\u7684\u5de5\u5177\uff1f",
    options: ["\u591a\u94fe\u6570\u5b57\u94b1\u5305", "\u4f20\u7edf\u94f6\u884c\u7f51\u70b9", "\u89c6\u9891\u526a\u8f91\u8f6f\u4ef6"],
  },
  {
    q: "\u7b7e\u540d\u6d88\u606f\u4e00\u822c\u7528\u4e8e\u4ec0\u4e48\uff1f",
    options: ["\u8bc1\u660e\u4f60\u63a7\u5236\u8be5\u94b1\u5305\u5730\u5740", "\u76f4\u63a5\u8f6c\u8d70\u6240\u6709\u8d44\u4ea7", "\u5220\u9664\u533a\u5757\u94fe"],
  },
  {
    q: "\u6388\u6743 Token \u65f6\u5e94\u8be5\u6ce8\u610f\u4ec0\u4e48\uff1f",
    options: ["\u6388\u6743\u5bf9\u8c61\u548c\u6388\u6743\u6570\u91cf", "\u9875\u9762\u989c\u8272", "\u624b\u673a\u58c1\u7eb8"],
  },
  {
    q: "\u67e5\u770b\u4ea4\u6613\u8be6\u60c5\u901a\u5e38\u53ef\u4ee5\u7528\u4ec0\u4e48\uff1f",
    options: ["\u533a\u5757\u6d4f\u89c8\u5668", "\u97f3\u4e50\u64ad\u653e\u5668", "\u5929\u6c14\u9884\u62a5"],
  },
  {
    q: "\u540c\u4e00\u4e2a\u94b1\u5305\u5730\u5740\u5728\u4e0d\u540c\u94fe\u4e0a\u7684\u8d44\u4ea7\u662f\u5426\u4e00\u5b9a\u76f8\u540c\uff1f",
    options: ["\u4e0d\u4e00\u5b9a", "\u4e00\u5b9a\u76f8\u540c", "\u548c\u7f51\u901f\u6709\u5173"],
  },
  {
    q: "\u5982\u679c\u8f6c\u8d26\u5230\u9519\u8bef\u5730\u5740\uff0c\u901a\u5e38\u4f1a\u600e\u6837\uff1f",
    options: ["\u53ef\u80fd\u65e0\u6cd5\u627e\u56de", "\u7cfb\u7edf\u81ea\u52a8\u9000\u56de", "\u94b1\u5305\u4f1a\u81ea\u52a8\u4fee\u6539"],
  },
  {
    q: "\u4ec0\u4e48\u662f\u667a\u80fd\u5408\u7ea6\uff1f",
    options: ["\u90e8\u7f72\u5728\u533a\u5757\u94fe\u4e0a\u7684\u7a0b\u5e8f", "\u624b\u673a\u5145\u7535\u5668", "\u94f6\u884c\u67dc\u5458"],
  },
  {
    q: "\u4f7f\u7528 DApp \u65f6\uff0c\u4e3a\u4ec0\u4e48\u8981\u770b\u6e05\u94b1\u5305\u5f39\u7a97\uff1f",
    options: ["\u56e0\u4e3a\u5f39\u7a97\u4f1a\u663e\u793a\u8bf7\u6c42\u7684\u6743\u9650\u548c\u4ea4\u6613\u5185\u5bb9", "\u56e0\u4e3a\u5f39\u7a97\u4f1a\u8ba9\u5c4f\u5e55\u66f4\u4eae", "\u56e0\u4e3a\u53ef\u4ee5\u8df3\u8fc7\u6240\u6709\u98ce\u9669"],
  },
  {
    q: "\u4e0b\u5217\u54ea\u4e2a\u662f\u66f4\u5b89\u5168\u7684\u4e60\u60ef\uff1f",
    options: ["\u5b9a\u671f\u68c0\u67e5\u6388\u6743\u5e76\u53ea\u8fde\u63a5\u53ef\u4fe1 DApp", "\u770b\u5230\u94fe\u63a5\u5c31\u7acb\u5373\u6388\u6743", "\u628a\u52a9\u8bb0\u8bcd\u5b58\u5728\u516c\u5171\u7f51\u76d8"],
  },
  {
    q: "\u5b8c\u6210\u672c\u95ee\u5377\u540e\u53ef\u4ee5\u83b7\u5f97\u591a\u5c11\u79ef\u5206\uff1f",
    options: ["3000 \u79ef\u5206", "30 \u79ef\u5206", "0 \u79ef\u5206"],
  },
];

const els = {
  authScreen: document.querySelector("#authScreen"),
  showLoginBtn: document.querySelector("#showLoginBtn"),
  showRegisterBtn: document.querySelector("#showRegisterBtn"),
  loginForm: document.querySelector("#loginForm"),
  registerForm: document.querySelector("#registerForm"),
  authMessage: document.querySelector("#authMessage"),
  userText: document.querySelector("#userText"),
  pointsText: document.querySelector("#pointsText"),
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
  quizForm: document.querySelector("#quizForm"),
  quizProgress: document.querySelector("#quizProgress"),
  submitQuizBtn: document.querySelector("#submitQuizBtn"),
  quizMessage: document.querySelector("#quizMessage"),
  boundWalletText: document.querySelector("#boundWalletText"),
  bindWalletBtn: document.querySelector("#bindWalletBtn"),
  redeemBtn: document.querySelector("#redeemBtn"),
  redeemMessage: document.querySelector("#redeemMessage"),
  redeemList: document.querySelector("#redeemList"),
  logBox: document.querySelector("#logBox"),
};

let account = "";
let chainId = "";
let currentUser = "";
let currentProfile = null;

const supabaseConfig = window.SUPABASE_CONFIG || {};
const dbClient =
  window.supabase && supabaseConfig.url && supabaseConfig.anonKey
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null;

function usingDatabase() {
  return Boolean(dbClient);
}

function dbSessionToken() {
  return localStorage.getItem(DB_SESSION_KEY);
}

function saveDbSession(token) {
  localStorage.setItem(DB_SESSION_KEY, token);
}

function clearDbSession() {
  localStorage.removeItem(DB_SESSION_KEY);
}

function normalizeProfile(profile) {
  if (!profile) {
    return null;
  }

  return {
    username: profile.username,
    points: Number(profile.points || 0),
    quizCompleted: Boolean(profile.quizCompleted),
    boundWallet: profile.boundWallet || "",
    redeemRequests: profile.redeemRequests || [],
  };
}

async function callRpc(name, params) {
  const { data, error } = await dbClient.rpc(name, params);
  if (error) {
    throw new Error(error.message || "Database request failed");
  }
  return data;
}

async function dbRegister(username, password, invite) {
  const data = await callRpc("app_register", {
    input_username: username,
    input_password: password,
    input_invite: invite,
  });
  saveDbSession(data.sessionToken);
  return normalizeProfile(data.profile);
}

async function dbLogin(username, password) {
  const data = await callRpc("app_login", {
    input_username: username,
    input_password: password,
  });
  saveDbSession(data.sessionToken);
  return normalizeProfile(data.profile);
}

async function dbLoadProfile() {
  const token = dbSessionToken();
  if (!token) {
    return null;
  }
  return normalizeProfile(await callRpc("app_profile", { session_token: token }));
}

async function dbClaimQuizReward() {
  return normalizeProfile(await callRpc("app_claim_quiz", { session_token: dbSessionToken() }));
}

async function dbBindWallet(wallet) {
  return normalizeProfile(
    await callRpc("app_bind_wallet", {
      session_token: dbSessionToken(),
      wallet,
    })
  );
}

async function dbCreateRedeemRequest() {
  return normalizeProfile(await callRpc("app_create_redeem", { session_token: dbSessionToken() }));
}

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

function currentUserRecord() {
  if (usingDatabase()) {
    return currentProfile;
  }
  return currentUser ? readUsers()[currentUser] : null;
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

function showAppFor(username, profile = null) {
  currentUser = username;
  currentProfile = profile || currentProfile;
  els.authScreen.classList.add("hidden");
  setNotice(
    usingDatabase()
      ? `Signed in as ${username}. Database sync is active.`
      : `Signed in as ${username}. Local demo mode is active.`,
    "ok"
  );
  updateUserStats();
  renderQuiz();
  refreshWallet().catch((error) => log("Init failed", { message: error.message }));
}

async function requireAuth() {
  if (usingDatabase()) {
    try {
      const profile = await dbLoadProfile();
      if (profile?.username) {
        showAppFor(profile.username, profile);
        return;
      }
    } catch (error) {
      clearDbSession();
      setAuthMessage(error.message);
    }
  } else {
    const username = localStorage.getItem(SESSION_KEY);
    if (username && readUsers()[username]) {
      showAppFor(username);
      return;
    }
    localStorage.removeItem(SESSION_KEY);
  }

  els.authScreen.classList.remove("hidden");
}

function provider() {
  return window.ethereum || window.tp?.ethereum || null;
}

function shortAddress(address) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "-";
}

function updateUserStats() {
  const user = currentUserRecord();
  els.userText.textContent = currentUser || "-";
  els.pointsText.textContent = String(user?.points || 0);
  els.boundWalletText.textContent = user?.boundWallet || "-";
  renderRedeemHistory();
  if (user?.quizCompleted) {
    els.submitQuizBtn.disabled = true;
    els.submitQuizBtn.textContent = "Reward claimed";
    setQuizMessage("Questionnaire completed. 3000 points claimed.", true);
  } else {
    els.submitQuizBtn.disabled = false;
    els.submitQuizBtn.textContent = "Submit questionnaire and claim 3000 points";
    setQuizMessage("");
  }
}

function setRedeemMessage(message, ok = false) {
  els.redeemMessage.textContent = message;
  els.redeemMessage.classList.toggle("ok", ok);
}

function redeemStatusLabel(status) {
  const labels = {
    pending: "Pending review",
    paid: "Paid",
    rejected: "Rejected",
  };
  return labels[status] || status;
}

function renderRedeemHistory() {
  const records = currentUserRecord()?.redeemRequests || [];
  if (!records.length) {
    els.redeemList.innerHTML = '<div class="redeem-record"><span>No redemption records yet.</span></div>';
    return;
  }

  els.redeemList.innerHTML = records
    .slice()
    .reverse()
    .map(
      (record) => `
        <article class="redeem-record">
          <strong>${redeemStatusLabel(record.status)} - ${record.usdtAmount} USDT</strong>
          <span>Wallet: ${record.wallet}</span>
          <span>Request ID: ${record.id}</span>
          <span>Time: ${new Date(record.createdAt).toLocaleString()}</span>
        </article>
      `
    )
    .join("");
}

function setQuizMessage(message, ok = false) {
  els.quizMessage.textContent = message;
  els.quizMessage.classList.toggle("ok", ok);
}

function renderQuiz() {
  els.quizForm.innerHTML = quizQuestions
    .map((item, index) => {
      const options = item.options
        .map(
          (option, optionIndex) => `
            <label>
              <input type="radio" name="q${index}" value="${optionIndex}" />
              <span>${option}</span>
            </label>
          `
        )
        .join("");

      return `
        <fieldset class="quiz-item">
          <p class="quiz-question">${index + 1}. ${item.q}</p>
          <div class="quiz-options">${options}</div>
        </fieldset>
      `;
    })
    .join("");
  updateQuizProgress();
}

function updateQuizProgress() {
  const answered = quizQuestions.filter((_, index) => {
    return Boolean(new FormData(els.quizForm).get(`q${index}`));
  }).length;
  els.quizProgress.textContent = `${answered} / ${quizQuestions.length}`;
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
  clearDbSession();
  account = "";
  chainId = "";
  currentUser = "";
  currentProfile = null;
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

  try {
    if (usingDatabase()) {
      const profile = await dbRegister(username, password, invite);
      setAuthMessage("Registered successfully.", true);
      els.registerForm.reset();
      showAppFor(profile.username, profile);
      return;
    }

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
      points: 0,
      quizCompleted: false,
      boundWallet: "",
      redeemRequests: [],
      createdAt: new Date().toISOString(),
    };
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, username);
    setAuthMessage("Registered successfully.", true);
    els.registerForm.reset();
    showAppFor(username);
  } catch (error) {
    setAuthMessage(error.message);
  }
});

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(els.loginForm);
  const username = String(data.get("username")).trim().toLowerCase();
  const password = String(data.get("password"));

  try {
    if (usingDatabase()) {
      const profile = await dbLogin(username, password);
      els.loginForm.reset();
      showAppFor(profile.username, profile);
      return;
    }

    const user = readUsers()[username];
    if (!user || (await hashPassword(password, user.salt)) !== user.passwordHash) {
      setAuthMessage("Wrong username or password.");
      return;
    }

    localStorage.setItem(SESSION_KEY, username);
    els.loginForm.reset();
    showAppFor(username);
  } catch (error) {
    setAuthMessage(error.message);
  }
});

els.quizForm.addEventListener("change", updateQuizProgress);

els.submitQuizBtn.addEventListener("click", () => {
  submitQuizReward().catch((error) => setQuizMessage(error.message));
});

async function submitQuizReward() {
  if (!currentUser) {
    setQuizMessage("Please sign in first.");
    return;
  }

  const formData = new FormData(els.quizForm);
  const answered = quizQuestions.filter((_, index) => Boolean(formData.get(`q${index}`))).length;
  if (answered < quizQuestions.length) {
    setQuizMessage(`Please answer all 20 questions. Current progress: ${answered} / ${quizQuestions.length}.`);
    return;
  }

  if (usingDatabase()) {
    currentProfile = await dbClaimQuizReward();
    updateUserStats();
    log("Questionnaire reward claimed", {
      username: currentUser,
      reward: QUIZ_REWARD,
      totalPoints: currentProfile.points,
      source: "supabase",
    });
    return;
  }

  const users = readUsers();
  const user = users[currentUser];
  if (!user) {
    setQuizMessage("User record not found. Please sign in again.");
    return;
  }

  if (user.quizCompleted) {
    setQuizMessage("You have already claimed this reward.", true);
    updateUserStats();
    return;
  }

  user.points = Number(user.points || 0) + QUIZ_REWARD;
  user.quizCompleted = true;
  user.quizCompletedAt = new Date().toISOString();
  users[currentUser] = user;
  writeUsers(users);
  updateUserStats();
  log("Questionnaire reward claimed", { username: currentUser, reward: QUIZ_REWARD, totalPoints: user.points });
}

els.bindWalletBtn.addEventListener("click", async () => {
  try {
    if (!currentUser) {
      setRedeemMessage("Please sign in first.");
      return;
    }

    if (!account) {
      await connectWallet();
    }

    if (!account) {
      setRedeemMessage("Wallet connection failed.");
      return;
    }

    if (usingDatabase()) {
      currentProfile = await dbBindWallet(account);
      updateUserStats();
      setRedeemMessage("Wallet bound successfully.", true);
      log("Wallet bound", { username: currentUser, wallet: account, source: "supabase" });
      return;
    }

    const users = readUsers();
    const user = users[currentUser];
    user.boundWallet = account;
    user.boundWalletAt = new Date().toISOString();
    users[currentUser] = user;
    writeUsers(users);
    updateUserStats();
    setRedeemMessage("Wallet bound successfully.", true);
    log("Wallet bound", { username: currentUser, wallet: account });
  } catch (error) {
    setRedeemMessage(error.message || "Wallet binding failed.");
  }
});

els.redeemBtn.addEventListener("click", () => {
  createRedeemRequest().catch((error) => setRedeemMessage(error.message));
});

async function createRedeemRequest() {
  if (!currentUser) {
    setRedeemMessage("Please sign in first.");
    return;
  }

  if (usingDatabase()) {
    currentProfile = await dbCreateRedeemRequest();
    updateUserStats();
    setRedeemMessage("Redemption request submitted. Please wait for manual review.", true);
    log("USDT redemption request submitted", {
      username: currentUser,
      source: "supabase",
      pointsCost: REDEEM_COST,
      usdtAmount: REDEEM_USDT,
    });
    return;
  }

  const users = readUsers();
  const user = users[currentUser];
  if (!user?.boundWallet) {
    setRedeemMessage("Please bind your TP wallet first.");
    return;
  }

  if (Number(user.points || 0) < REDEEM_COST) {
    setRedeemMessage(`Insufficient points. Need ${REDEEM_COST} points.`);
    return;
  }

  user.points = Number(user.points || 0) - REDEEM_COST;
  user.redeemRequests = user.redeemRequests || [];
  const request = {
    id: `R${Date.now()}`,
    status: "pending",
    pointsCost: REDEEM_COST,
    usdtAmount: REDEEM_USDT,
    wallet: user.boundWallet,
    createdAt: new Date().toISOString(),
  };
  user.redeemRequests.push(request);
  users[currentUser] = user;
  writeUsers(users);
  updateUserStats();
  setRedeemMessage("Redemption request submitted. Please wait for manual review.", true);
  log("USDT redemption request submitted", request);
}

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
