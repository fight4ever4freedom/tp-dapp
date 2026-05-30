const INVITE_CODE = "TP2026";
const DB_SESSION_KEY = "tp_dapp_db_session";
const USERS_KEY = "tp_dapp_users";
const SESSION_KEY = "tp_dapp_session";
const QUIZ_REWARD = 3000;
const REFERRAL_REWARD = 599;
const REDEEM_COST = 3000;
const REDEEM_USDT = 3;
const MIN_WITHDRAW_USDT = 10;

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
  logoutBtn: document.querySelector("#logoutBtn"),
  userText: document.querySelector("#userText"),
  pointsText: document.querySelector("#pointsText"),
  usdtBalanceText: document.querySelector("#usdtBalanceText"),
  walletText: document.querySelector("#walletText"),
  inviteCodeText: document.querySelector("#inviteCodeText"),
  copyInviteBtn: document.querySelector("#copyInviteBtn"),
  inviteMessage: document.querySelector("#inviteMessage"),
  connectWalletBtn: document.querySelector("#connectWalletBtn"),
  walletMessage: document.querySelector("#walletMessage"),
  quizForm: document.querySelector("#quizForm"),
  quizProgress: document.querySelector("#quizProgress"),
  submitQuizBtn: document.querySelector("#submitQuizBtn"),
  quizMessage: document.querySelector("#quizMessage"),
  redeemBtn: document.querySelector("#redeemBtn"),
  redeemMessage: document.querySelector("#redeemMessage"),
  redeemList: document.querySelector("#redeemList"),
  withdrawBtn: document.querySelector("#withdrawBtn"),
  withdrawMessage: document.querySelector("#withdrawMessage"),
};

let currentUser = "";
let currentProfile = null;
let walletAddress = "";

const supabaseConfig = window.SUPABASE_CONFIG || {};
const dbClient =
  window.supabase && supabaseConfig.url && supabaseConfig.anonKey
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null;

function usingDatabase() {
  return Boolean(dbClient);
}

function provider() {
  return window.ethereum || window.tp?.ethereum || null;
}

function shortAddress(address) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "-";
}

function setMessage(el, message, ok = false) {
  el.textContent = message;
  el.classList.toggle("ok", ok);
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
  return profile
    ? {
        username: profile.username,
        points: Number(profile.points || 0),
        usdtBalance: Number(profile.usdtBalance || 0),
        quizCompleted: Boolean(profile.quizCompleted),
        boundWallet: profile.boundWallet || "",
        inviteCode: profile.inviteCode || "",
        redeemRequests: profile.redeemRequests || [],
      }
    : null;
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

async function dbCreateWithdrawalRequest() {
  return normalizeProfile(await callRpc("app_create_withdrawal", { session_token: dbSessionToken() }));
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
  return usingDatabase() ? currentProfile : readUsers()[currentUser];
}

function createInviteCode(username) {
  const random = createSalt().slice(0, 6).toUpperCase();
  return `${username.slice(0, 3).toUpperCase()}${random}`;
}

async function hashPassword(password, salt) {
  const input = new TextEncoder().encode(`${salt}:${password}`);
  const bytes = await crypto.subtle.digest("SHA-256", input);
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function createSalt() {
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
  setMessage(els.authMessage, "");
}

function showApp(profile) {
  currentProfile = profile;
  currentUser = profile.username;
  walletAddress = profile.boundWallet || "";
  els.authScreen.classList.add("hidden");
  renderQuiz();
  renderProfile();
}

async function requireAuth() {
  if (usingDatabase()) {
    try {
      const profile = await dbLoadProfile();
      if (profile?.username) {
        showApp(profile);
        return;
      }
    } catch {
      clearDbSession();
    }
  } else {
    const username = localStorage.getItem(SESSION_KEY);
    const user = username ? readUsers()[username] : null;
    if (user) {
      showApp({ username, ...user });
      return;
    }
  }

  els.authScreen.classList.remove("hidden");
}

function renderProfile() {
  const profile = currentUserRecord();
  els.userText.textContent = currentUser || "-";
  els.pointsText.textContent = String(profile?.points || 0);
  els.usdtBalanceText.textContent = `${Number(profile?.usdtBalance || 0).toFixed(2)} USDT`;
  els.walletText.textContent = shortAddress(profile?.boundWallet || walletAddress);
  els.inviteCodeText.textContent = profile?.inviteCode || "-";

  if (profile?.quizCompleted) {
    els.submitQuizBtn.disabled = true;
    els.submitQuizBtn.textContent = "Questionnaire submitted";
    setMessage(els.quizMessage, "Questionnaire completed. 3000 points claimed.", true);
  } else {
    els.submitQuizBtn.disabled = false;
    els.submitQuizBtn.textContent = "Submit questionnaire and claim 3000 points";
    setMessage(els.quizMessage, "");
  }

  renderRedeemHistory();
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
  const formData = new FormData(els.quizForm);
  const answered = quizQuestions.filter((_, index) => Boolean(formData.get(`q${index}`))).length;
  els.quizProgress.textContent = `${answered} / ${quizQuestions.length}`;
}

function renderRedeemHistory() {
  const records = currentUserRecord()?.redeemRequests || [];
  if (!records.length) {
    els.redeemList.innerHTML = '<div class="record"><span>No USDT payout request yet.</span></div>';
    return;
  }

  els.redeemList.innerHTML = records
    .slice()
    .reverse()
    .map(
      (record) => `
        <article class="record">
          <strong>${record.status || "pending"} - ${record.usdtAmount || 3} USDT</strong>
          <span>Wallet: ${record.wallet}</span>
          <span>Request ID: ${record.id}</span>
          <span>Time: ${new Date(record.createdAt).toLocaleString()}</span>
        </article>
      `
    )
    .join("");
}

async function connectAndBindWallet() {
  const walletProvider = provider();
  if (!walletProvider) {
    throw new Error("Open this page inside TP Wallet DApp browser.");
  }

  const accounts = await walletProvider.request({ method: "eth_requestAccounts" });
  walletAddress = accounts[0] || "";
  if (!walletAddress) {
    throw new Error("Wallet connection failed.");
  }

  if (usingDatabase()) {
    currentProfile = await dbBindWallet(walletAddress);
  } else {
    const users = readUsers();
    users[currentUser].boundWallet = walletAddress;
    users[currentUser].redeemRequests = users[currentUser].redeemRequests || [];
    writeUsers(users);
    currentProfile = { username: currentUser, ...users[currentUser] };
  }

  renderProfile();
}

async function claimQuizReward() {
  const formData = new FormData(els.quizForm);
  const answered = quizQuestions.filter((_, index) => Boolean(formData.get(`q${index}`))).length;
  if (answered < quizQuestions.length) {
    throw new Error(`Please answer all 20 questions. Current progress: ${answered} / ${quizQuestions.length}.`);
  }

  if (usingDatabase()) {
    currentProfile = await dbClaimQuizReward();
  } else {
    const users = readUsers();
    const user = users[currentUser];
    if (user.quizCompleted) {
      throw new Error("Questionnaire reward already claimed.");
    }
    user.points = Number(user.points || 0) + QUIZ_REWARD;
    user.quizCompleted = true;
    user.redeemRequests = user.redeemRequests || [];
    writeUsers(users);
    currentProfile = { username: currentUser, ...user };
  }

  renderProfile();
}

async function redeemPointsToPageUsdt() {
  const profile = currentUserRecord();
  if (Number(profile.points || 0) < REDEEM_COST) {
    throw new Error(`Insufficient points. Need ${REDEEM_COST} points.`);
  }

  if (usingDatabase()) {
    currentProfile = await dbCreateRedeemRequest();
  } else {
    const users = readUsers();
    const user = users[currentUser];
    user.points = Number(user.points || 0) - REDEEM_COST;
    user.usdtBalance = Number(user.usdtBalance || 0) + REDEEM_USDT;
    user.redeemRequests = user.redeemRequests || [];
    writeUsers(users);
    currentProfile = { username: currentUser, ...user };
  }

  renderProfile();
}

async function createWithdrawalRequest() {
  const profile = currentUserRecord();
  if (!profile?.boundWallet) {
    throw new Error("Please connect and bind your TP wallet first.");
  }

  if (Number(profile.usdtBalance || 0) < MIN_WITHDRAW_USDT) {
    throw new Error(`Insufficient page USDT. Need at least ${MIN_WITHDRAW_USDT} USDT.`);
  }

  if (usingDatabase()) {
    currentProfile = await dbCreateWithdrawalRequest();
  } else {
    const users = readUsers();
    const user = users[currentUser];
    const withdrawAmount = Number(user.usdtBalance || 0);
    user.usdtBalance = 0;
    user.redeemRequests = user.redeemRequests || [];
    user.redeemRequests.push({
      id: `R${Date.now()}`,
      status: "pending",
      pointsCost: 0,
      usdtAmount: withdrawAmount,
      wallet: user.boundWallet,
      createdAt: new Date().toISOString(),
    });
    writeUsers(users);
    currentProfile = { username: currentUser, ...user };
  }

  renderProfile();
}

els.showLoginBtn.addEventListener("click", () => setAuthMode("login"));
els.showRegisterBtn.addEventListener("click", () => setAuthMode("register"));

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(els.loginForm);
  const username = String(data.get("username")).trim().toLowerCase();
  const password = String(data.get("password"));

  try {
    if (usingDatabase()) {
      showApp(await dbLogin(username, password));
    } else {
      const user = readUsers()[username];
      if (!user || (await hashPassword(password, user.salt)) !== user.passwordHash) {
        throw new Error("Wrong username or password.");
      }
      localStorage.setItem(SESSION_KEY, username);
      showApp({ username, ...user });
    }
    els.loginForm.reset();
  } catch (error) {
    setMessage(els.authMessage, error.message);
  }
});

els.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(els.registerForm);
  const username = String(data.get("username")).trim().toLowerCase();
  const password = String(data.get("password"));
  const invite = String(data.get("invite")).trim();

  try {
    if (usingDatabase()) {
      showApp(await dbRegister(username, password, invite));
    } else {
      const users = readUsers();
      if (users[username]) {
        throw new Error("Username already exists.");
      }
      const referrer = Object.entries(users).find(([, user]) => user.inviteCode === invite);
      if (invite !== INVITE_CODE && !referrer) {
        throw new Error("Invalid invite code.");
      }
      const salt = createSalt();
      users[username] = {
        salt,
        passwordHash: await hashPassword(password, salt),
        points: 0,
        usdtBalance: 0,
        quizCompleted: false,
        boundWallet: "",
        inviteCode: createInviteCode(username),
        redeemRequests: [],
      };
      if (invite !== INVITE_CODE) {
        users[referrer[0]].points = Number(users[referrer[0]].points || 0) + REFERRAL_REWARD;
      }
      writeUsers(users);
      localStorage.setItem(SESSION_KEY, username);
      showApp({ username, ...users[username] });
    }
    els.registerForm.reset();
  } catch (error) {
    setMessage(els.authMessage, error.message);
  }
});

els.logoutBtn.addEventListener("click", () => {
  clearDbSession();
  localStorage.removeItem(SESSION_KEY);
  currentUser = "";
  currentProfile = null;
  walletAddress = "";
  els.authScreen.classList.remove("hidden");
  setAuthMode("login");
});

els.copyInviteBtn.addEventListener("click", async () => {
  const inviteCode = currentUserRecord()?.inviteCode;
  if (!inviteCode) {
    setMessage(els.inviteMessage, "Invite code is not ready.");
    return;
  }
  await navigator.clipboard.writeText(inviteCode);
  setMessage(els.inviteMessage, "Invite code copied.", true);
});

els.connectWalletBtn.addEventListener("click", async () => {
  try {
    els.connectWalletBtn.disabled = true;
    await connectAndBindWallet();
    setMessage(els.walletMessage, "TP wallet connected and bound.", true);
  } catch (error) {
    setMessage(els.walletMessage, error.message);
  } finally {
    els.connectWalletBtn.disabled = false;
  }
});

els.quizForm.addEventListener("change", updateQuizProgress);

els.submitQuizBtn.addEventListener("click", async () => {
  try {
    els.submitQuizBtn.disabled = true;
    await claimQuizReward();
    setMessage(els.quizMessage, "Submitted successfully. 3000 points claimed.", true);
  } catch (error) {
    setMessage(els.quizMessage, error.message);
    renderProfile();
  }
});

els.redeemBtn.addEventListener("click", async () => {
  try {
    els.redeemBtn.disabled = true;
    await redeemPointsToPageUsdt();
    setMessage(els.redeemMessage, "3000 points redeemed to 3 page USDT.", true);
  } catch (error) {
    setMessage(els.redeemMessage, error.message);
  } finally {
    els.redeemBtn.disabled = false;
  }
});

els.withdrawBtn.addEventListener("click", async () => {
  try {
    els.withdrawBtn.disabled = true;
    await createWithdrawalRequest();
    setMessage(els.withdrawMessage, "Withdrawal request submitted. Waiting for backend approval.", true);
  } catch (error) {
    setMessage(els.withdrawMessage, error.message);
  } finally {
    els.withdrawBtn.disabled = false;
  }
});

requireAuth();
