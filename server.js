// Wassil demo banking web app — independent source build.
// Demo / fake data only. No real money, no real bank integration.
// Run:  set ADMIN_PASSWORD in your shell, then: node server.js
// Then open http://localhost:3000  (or $PORT)
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const dbmod = require('./lib/db');
const { hashPassword, verifyPassword, newToken, publicUser } = require('./lib/auth');
const wa = require('./lib/webauthn');

const PORT = parseInt(process.env.PORT || '3000', 10);
const USD_RATE = 10000; // 1 USD = 10,000 SDG (demo rate, change here to change it everywhere server-side)
const CARD_PRICE_SDG = 100000;
const TRANSFER_FEE_SDG = 300; // charged to the sender on every SDG transfer, on top of the amount
const TRANSFER_FEE_USD_CENTS = 50; // 0.50 USD, charged to the sender on every USD transfer (FX or card), on top of the amount
const MAX_ACTIVE_CARDS = 5;

const ASSETS = [
  { id: 'USD', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', category: 'currency', priceSdg: 10000, unitAr: 'دولار', unitEn: 'USD' },
  { id: 'EUR', nameAr: 'يورو', nameEn: 'Euro', category: 'currency', priceSdg: 10850, unitAr: 'يورو', unitEn: 'EUR' },
  { id: 'AED', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', category: 'currency', priceSdg: 2720, unitAr: 'درهم', unitEn: 'AED' },
  { id: 'GOLD', nameAr: 'ذهب', nameEn: 'Gold', category: 'gold', priceSdg: 185000, unitAr: 'غرام', unitEn: 'gram' },
  { id: 'STK-A', nameAr: 'سهم تجريبي أ', nameEn: 'Demo Stock A', category: 'stock', priceSdg: 2500, unitAr: 'سهم', unitEn: 'share' },
  { id: 'STK-B', nameAr: 'سهم تجريبي ب', nameEn: 'Demo Stock B', category: 'stock', priceSdg: 4000, unitAr: 'سهم', unitEn: 'share' },
  { id: 'STK-C', nameAr: 'سهم تجريبي ج', nameEn: 'Demo Stock C', category: 'stock', priceSdg: 1750, unitAr: 'سهم', unitEn: 'share' },
];

const BILLS = [
  { id: 'elec', nameAr: 'الكهرباء', nameEn: 'Electricity', amountSdg: 15000 },
  { id: 'water', nameAr: 'المياه', nameEn: 'Water', amountSdg: 8000 },
  { id: 'telecom', nameAr: 'الاتصالات', nameEn: 'Telecom', amountSdg: 12000 },
];
const BRANCHES = [
  { id: 1, nameAr: 'فرع الخرطوم الرئيسي (تجريبي)', nameEn: 'Khartoum Main Branch (demo)', cityAr: 'الخرطوم', cityEn: 'Khartoum' },
  { id: 2, nameAr: 'فرع أم درمان (تجريبي)', nameEn: 'Omdurman Branch (demo)', cityAr: 'أم درمان', cityEn: 'Omdurman' },
  { id: 3, nameAr: 'فرع مدني (تجريبي)', nameEn: 'Wad Madani Branch (demo)', cityAr: 'ود مدني', cityEn: 'Wad Madani' },
];

function db() { return dbmod.get(); }
function save() { dbmod.persist(); }

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
  });
}
function authUser(req) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return null;
  const s = db().sessions.find((x) => x.token === token);
  if (!s) return null;
  return db().users.find((u) => u.id === s.userId) || null;
}
function isQuadruple(name) {
  if (typeof name !== 'string') return false;
  return name.trim().split(/\s+/).filter(Boolean).length >= 4;
}
function isLatin(name) { return /^[A-Za-z\s'’.-]+$/.test(name || ''); }
function isEmail(e) { return typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function addTx(tx) {
  const d = db();
  tx.id = d.nextTxSeq++;
  tx.createdAt = new Date().toISOString();
  tx.status = tx.status || 'completed';
  if (!tx.ref) tx.ref = dbmod.refFor(tx.id);
  d.transactions.push(tx);
  return tx;
}
function availableSdg(u) { return dbmod.availableSdg(u); }
function isFrozenAll(u) { return dbmod.isFrozenAll(u); }
const normAcct = dbmod.normAcct;
function findBySdg(acct) { const n = normAcct(acct); return db().users.find((u) => normAcct(u.sdgAccount) === n); }
function findByFx(acct) { const n = normAcct(acct); return db().users.find((u) => normAcct(u.fxAccount) === n); }
function findCardByNumber(num) {
  const clean = String(num).replace(/\s|-/g, '');
  return db().cards.find((c) => c.fullNumber.replace(/\s/g, '') === clean);
}
function masked(num) {
  const parts = String(num).split(' ');
  return parts[0] + ' •••• •••• ' + parts[parts.length - 1];
}
function newCardNumber() {
  // Demo-only fake Visa-style number, 5312 prefix.
  let n = '5312';
  for (let i = 0; i < 3; i++) n += String(Math.floor(1000 + Math.random() * 9000));
  return n.replace(/(\d{4})(?=\d)/g, '$1 ');
}
function depositRate(principal) {
  if (principal >= 1000000000) return 0.30;
  if (principal >= 10000000) return 0.20;
  if (principal >= 1000000) return 0.15;
  return 0.12;
}
function ensureAdmin() {
  const d = db();
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@wassil.demo';
  if (d.users.some((u) => u.role === 'admin')) return;
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) {
    console.log('[wassil] No admin yet. Set ADMIN_PASSWORD and restart to auto-create admin@wassil.demo (password is never logged or stored in files).');
    return;
  }
  const seq = d.nextUserSeq++;
  const admin = {
    id: seq, email: adminEmail, passwordHash: hashPassword(pw),
    fullNameAr: 'مدير وصل التجريبي العام', fullNameEn: 'Wassil Demo Manager',
    role: 'admin', status: 'active',
    sdgAccount: dbmod.accountNumber(seq, 1000), fxAccount: dbmod.accountNumber(seq, 2000),
    sdgBalance: 0, fxBalanceCents: 0, frozenSdg: 0, frozenAll: false, createdAt: new Date().toISOString(),
  };
  d.users.push(admin); save();
  console.log('[wassil] Admin account auto-created for ' + adminEmail + ' (first use).');
}

async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  const method = req.method;

  // ---- static files ----
  if (method === 'GET' && !p.startsWith('/api/')) {
    let file = p === '/' ? '/index.html' : p;
    const full = path.join(__dirname, 'public', file);
    if (!full.startsWith(path.join(__dirname, 'public')) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
      return sendFile(res, path.join(__dirname, 'public', 'index.html'));
    }
    return sendFile(res, full);
  }

  const body = method === 'POST' ? await readBody(req) : {};
  const me = p.startsWith('/api/webauthn/login') ? null : authUser(req);

  try {
    // Banned accounts do not open at all, except through an admin unban.
    // A token issued before the ban is therefore useless until unbanned.
    if (me && me.status === 'banned' && p !== '/api/login' && !p.startsWith('/api/webauthn/login')) {
      return sendJson(res, 403, { ok: false, error: 'banned' });
    }
    // ---- auth / signup ----
    if (p === '/api/register' && method === 'POST') {
      const { email, fullNameAr, fullNameEn, password } = body;
      const pendingInviteCode = String(body.inviteCode || '').trim().toUpperCase().slice(0, 20);
      if (!isEmail(email)) return sendJson(res, 400, { ok: false, error: 'invalid_email' });
      if (!isQuadruple(fullNameAr)) return sendJson(res, 400, { ok: false, error: 'name_must_be_quadruple_ar' });
      if (!isQuadruple(fullNameEn) || !isLatin(fullNameEn)) return sendJson(res, 400, { ok: false, error: 'name_must_be_quadruple_en' });
      if (!password || password.length < 4) return sendJson(res, 400, { ok: false, error: 'password_too_short' });
      // Signup gate: the user must have read + agreed the site policy (which
      // states this is a demo with fake money) before an account is created.
      if (body.policyAgreed !== true && body.policyAgreed !== 'true') return sendJson(res, 400, { ok: false, error: 'policy_not_agreed' });
      const d = db();
      if (d.users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) return sendJson(res, 400, { ok: false, error: 'email_exists' });
      const code = String(Math.floor(100000 + Math.random() * 900000));
      const user = {
        id: d.nextUserSeq++, email, passwordHash: hashPassword(password),
        fullNameAr: fullNameAr.trim(), fullNameEn: fullNameEn.trim(),
        role: 'user', status: 'pending', activationCode: code, pendingInviteCode,
        sdgAccount: null, fxAccount: null, sdgBalance: 0, fxBalanceCents: 0,
        frozenSdg: 0, frozenAll: false,
        createdAt: new Date().toISOString(),
      };
      d.users.push(user); save();
      // Demo activation code is returned so the UI can show it in-app.
      // In a real app this would be emailed; here no real email is sent.
      return sendJson(res, 200, { ok: true, userId: user.id, email: user.email, activationCode: code });
    }
    if (p === '/api/activate' && method === 'POST') {
      const d = db();
      const u = d.users.find((x) => x.email === body.email);
      if (!u || u.activationCode !== String(body.code)) return sendJson(res, 400, { ok: false, error: 'bad_code' });
      if (u.status === 'banned') return sendJson(res, 403, { ok: false, error: 'banned' });
      let bonusGranted = false, inviteBonusGranted = false, inviteInvalid = false, inviteDeviceClaimed = false;
      if (u.status !== 'active') {
        u.status = 'active';
        u.sdgAccount = dbmod.accountNumber(u.id, 1000);
        u.fxAccount = dbmod.accountNumber(u.id, 2000);
        addTx({ userId: u.id, type: 'account_open', titleAr: 'فتح الحساب وتفعيله — مرحباً بك في وصّل', titleEn: 'Account opened and activated — welcome to Wassil', amountSdg: 0, currency: 'SDG', fromName: u.fullNameAr, fromAccount: u.sdgAccount, toName: u.fullNameAr, toAccount: u.sdgAccount });
        // Welcome bonus: 15,000 SDG for a new account, but only once per device.
        // The device is the browser's stored device id (see frontend getDeviceId);
        // clearing browser storage or using another browser counts as another device in this demo.
        const devId = String(body.deviceId || '').trim();
        if (devId) {
          if (!d.usedBonusDevices) d.usedBonusDevices = [];
          if (!d.usedBonusDevices.includes(devId)) {
            d.usedBonusDevices.push(devId);
            u.sdgBalance += 15000;
            bonusGranted = true;
            addTx({ userId: u.id, type: 'welcome_bonus', titleAr: 'مكافأة ترحيبية — 15,000 ج.س', titleEn: 'Welcome bonus — 15,000 SDG', amountSdg: 15000, currency: 'SDG', fromName: 'وصل', fromAccount: 'Wassil', toName: u.fullNameAr, toAccount: u.sdgAccount });
          }
        }
        // Invite bonus: 50,000 SDG EACH for the NEW account that enters a
        // valid invite code at activation AND for the inviter (the code's
        // owner) — full 50,000 for each side, not split. The code is WSL +
        // the inviter's SDG account number (e.g. WSL1002), or just the
        // account number itself. Once per new account (activation runs
        // once) and once per device, so one device cannot farm the bonus
        // with many accounts; the inviter earns 50,000 per person who
        // successfully activates with their code. Each side gets its own
        // history row so the bonus is visible in both accounts.
        const rawCode = String(u.pendingInviteCode || body.inviteCode || '').trim().toUpperCase();
        if (rawCode) {
          const digits = rawCode.startsWith('WSL') ? rawCode.slice(3) : rawCode;
          const inviter = d.users.find((x) => x.status === 'active' && x.id !== u.id && normAcct(x.sdgAccount) === normAcct(digits));
          const devId2 = String(body.deviceId || '').trim();
          if (!inviter) inviteInvalid = true;
          else if (devId2 && (d.usedInviteDevices || []).includes(devId2)) inviteDeviceClaimed = true;
          else if (devId2) {
            if (!d.usedInviteDevices) d.usedInviteDevices = [];
            d.usedInviteDevices.push(devId2);
            u.sdgBalance += 50000;
            inviter.sdgBalance += 50000;
            inviteBonusGranted = true;
            addTx({ userId: u.id, type: 'invite_bonus', titleAr: 'مكافأة رمز دعوة — 50,000 ج.س', titleEn: 'Invite code bonus — 50,000 SDG', amountSdg: 50000, currency: 'SDG', fromName: inviter.fullNameAr, fromAccount: inviter.sdgAccount, toName: u.fullNameAr, toAccount: u.sdgAccount });
            addTx({ userId: inviter.id, type: 'invite_reward', titleAr: 'مكافأة دعوة صديق — 50,000 ج.س', titleEn: 'Friend invite reward — 50,000 SDG', amountSdg: 50000, currency: 'SDG', fromName: u.fullNameAr, fromAccount: u.sdgAccount, toName: inviter.fullNameAr, toAccount: inviter.sdgAccount });
          }
        }
        save();
      }
      return sendJson(res, 200, { ok: true, user: publicUser(u), bonusGranted, bonusSdg: bonusGranted ? 15000 : 0, inviteBonusGranted, inviterBonusGranted: inviteBonusGranted, inviteInvalid, inviteDeviceClaimed });
    }
    if (p === '/api/login' && method === 'POST') {
      const ident = String(body.email || body.identifier || '').trim();
      const u = db().users.find((x) => x.email.toLowerCase() === ident.toLowerCase() || normAcct(x.sdgAccount) === normAcct(ident) || normAcct(x.fxAccount) === normAcct(ident));
      if (!u || !verifyPassword(body.password || '', u.passwordHash)) return sendJson(res, 401, { ok: false, error: 'bad_login' });
      if (u.status === 'banned') return sendJson(res, 403, { ok: false, error: 'banned' });
      if (u.status !== 'active') return sendJson(res, 403, { ok: false, error: 'not_activated' });
      const token = newToken();
      db().sessions.push({ token, userId: u.id, createdAt: new Date().toISOString() }); save();
      return sendJson(res, 200, { ok: true, token, user: publicUser(u) });
    }
    if (p === '/api/me' && method === 'GET') {
      if (!me) return sendJson(res, 401, { ok: false, error: 'unauthorized' });
      return sendJson(res, 200, { ok: true, user: publicUser(me), usdRate: USD_RATE });
    }
    if (p === '/api/dashboard' && method === 'GET') {
      if (!me) return sendJson(res, 401, { ok: false, error: 'unauthorized' });
      const d = db();
      const mine = d.transactions.filter((t) => t.userId === me.id).slice(-50).reverse();
      const cards = d.cards.filter((c) => c.userId === me.id).map((c) => ({ ...c, fullNumber: undefined, cvv: undefined, masked: masked(c.fullNumber) }));
      const out = { ok: true, user: publicUser(me), transactions: mine, cards, usdRate: USD_RATE,
        allUsers: me.role === 'admin' ? d.users.map(publicUser) : undefined,
        allTransactions: me.role === 'admin' ? d.transactions.slice(-100).reverse() : undefined,
        allCards: me.role === 'admin' ? d.cards.map((c) => ({ ...c, fullNumber: undefined, cvv: undefined, masked: masked(c.fullNumber) })) : undefined,
        beneficiaries: (me.beneficiaries || []).map((id) => d.users.find((u) => u.id === id)).filter(Boolean).map(publicUser) };
      return sendJson(res, 200, out);
    }
    if (p === '/api/admin/fund' && method === 'POST') {
      if (!me || me.role !== 'admin') return sendJson(res, 403, { ok: false, error: 'forbidden' });
      const target = db().users.find((u) => u.id === Number(body.targetUserId));
      const amount = Math.floor(Number(body.amount));
      if (!target || !(amount > 0)) return sendJson(res, 400, { ok: false, error: 'bad_fund' });
      target.sdgBalance += amount;
      addTx({ userId: target.id, type: 'admin_fund', titleAr: 'تمويل من الأدمن', titleEn: 'Funding from admin', amountSdg: amount, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: target.fullNameAr, toAccount: target.sdgAccount });
      save();
      return sendJson(res, 200, { ok: true, user: publicUser(target) });
    }
    // ---- admin freeze / ban (admin only; ordinary users get nothing here) ----
    // Freeze a specific SDG amount, freeze ALL assets, or ban the account.
    // A banned account does not open until the admin unbans it; only the
    // admin can unfreeze assets or unban — there is no self-service unlock.
    if (p.startsWith('/api/admin/') && method === 'POST') {
      if (!me || me.role !== 'admin') return sendJson(res, 403, { ok: false, error: 'forbidden' });
      const target = db().users.find((u) => u.id === Number(body.targetUserId));
      const isCardOp = p === '/api/admin/card-freeze' || p === '/api/admin/card-unfreeze';
      if (!isCardOp && (!target || target.role === 'admin')) return sendJson(res, 400, { ok: false, error: 'bad_target' });
      const note = (type, titleAr, titleEn) => addTx({ userId: target.id, type, titleAr, titleEn, amountSdg: 0, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: target.fullNameAr, toAccount: target.sdgAccount });
      if (p === '/api/admin/freeze' ) {
        const amount = Math.floor(Number(body.amountSdg));
        if (!(amount > 0)) return sendJson(res, 400, { ok: false, error: 'bad_amount' });
        if (amount > target.sdgBalance) return sendJson(res, 400, { ok: false, error: 'freeze_exceeds_balance' });
        target.frozenSdg = amount; target.frozenAll = false;
        note('admin_freeze', `تجميد مبلغ من الأدمن — ${amount} ج.س`, `Admin freeze — ${amount} SDG`);
      } else if (p === '/api/admin/freeze-all') {
        target.frozenSdg = 0; target.frozenAll = true;
        note('admin_freeze_all', 'تجميد كل الأصول من الأدمن', 'Admin freeze — all assets');
      } else if (p === '/api/admin/unfreeze') {
        target.frozenSdg = 0; target.frozenAll = false;
        note('admin_unfreeze', 'فك تجميد الأصول من الأدمن', 'Admin unfreeze — assets released');
      } else if (p === '/api/admin/ban') {
        target.status = 'banned';
        note('admin_ban', 'حظر الحساب من الأدمن', 'Admin ban — account blocked');
      } else if (p === '/api/admin/unban') {
        if (target.status !== 'banned') return sendJson(res, 400, { ok: false, error: 'not_banned' });
        target.status = 'active';
        note('admin_unban', 'إعادة فتح الحساب بموافقة الأدمن', 'Admin unban — account reopened by admin');
      } else if (p === '/api/admin/fund-fx') {
        // USD funding, unlimited, and NOT deducted from the admin's own FX balance.
        const cents = Math.floor(Number(body.amountUsd) * 100);
        if (!(cents > 0)) return sendJson(res, 400, { ok: false, error: 'bad_amount' });
        target.fxBalanceCents += cents;
        addTx({ userId: target.id, type: 'admin_fund_fx', titleAr: 'تمويل بالدولار من الأدمن', titleEn: 'USD funding from admin', amountUsdCents: cents, currency: 'USD', fromName: me.fullNameAr, fromAccount: me.fxAccount, toName: target.fullNameAr, toAccount: target.fxAccount });
        save();
        return sendJson(res, 200, { ok: true, user: publicUser(target) });
      } else if (p === '/api/admin/card-freeze' || p === '/api/admin/card-unfreeze') {
        const card = db().cards.find((c) => c.id === Number(body.cardId));
        const owner = card ? db().users.find((u) => u.id === card.userId) : null;
        if (!card || !owner || owner.role === 'admin') return sendJson(res, 400, { ok: false, error: 'bad_card' });
        if (p === '/api/admin/card-freeze') {
          if (card.status !== 'active') return sendJson(res, 400, { ok: false, error: 'card_not_active' });
          card.status = 'frozen';
        } else {
          if (card.status !== 'frozen') return sendJson(res, 400, { ok: false, error: 'card_not_frozen' });
          card.status = 'active';
        }
        save();
        return sendJson(res, 200, { ok: true, card: { id: card.id, userId: card.userId, status: card.status, balanceCents: card.balanceCents, masked: masked(card.fullNumber) } });
      } else {
        return sendJson(res, 404, { ok: false, error: 'not_found' });
      }
      save();
      return sendJson(res, 200, { ok: true, user: publicUser(target) });
    }

    // WebAuthn login runs without a session token (it creates one).
    if (p === '/api/webauthn/login/options' && method === 'POST') {
      const u = db().users.find((x) => x.email === body.email);
      if (!u || u.status !== 'active') return sendJson(res, 404, { ok: false, error: 'no_key' });
      const creds = db().webauthn.filter((c) => c.userId === u.id);
      if (!creds.length) return sendJson(res, 404, { ok: false, error: 'no_key' });
      const challenge = wa.randomChallenge();
      db().challenges.push({ token: 'login-' + u.id, challenge, type: 'login', userId: u.id, createdAt: Date.now() }); save();
      const host = (req.headers.host || 'localhost').split(':')[0];
      return sendJson(res, 200, { ok: true, challenge, rpId: host,
        allowCredentials: creds.map((c) => ({ type: 'public-key', id: c.credentialId, transports: ['internal'] })) });
    }
    if (p === '/api/webauthn/login/verify' && method === 'POST') {
      const u = db().users.find((x) => x.email === body.email);
      const cred = body.credential;
      if (!u || !cred) return sendJson(res, 400, { ok: false, error: 'bad_credential' });
      const ch = db().challenges.filter((c) => c.type === 'login' && c.userId === u.id).pop();
      if (!ch || Date.now() - ch.createdAt > 5 * 60 * 1000) return sendJson(res, 400, { ok: false, error: 'challenge_expired' });
      const stored = db().webauthn.find((c) => c.credentialId === cred.id && c.userId === u.id);
      if (!stored) return sendJson(res, 400, { ok: false, error: 'unknown_credential' });
      try {
        const { parsed, signed, signature } = wa.verifyAssertion({ credential: cred, expectedChallenge: ch.challenge, expectedHost: req.headers.host });
        if (!wa.verifySignatureWithJwk(stored.publicKeyJwk, signed, signature)) throw new Error('bad signature');
        if (parsed.signCount > 0 && stored.counter > 0 && parsed.signCount <= stored.counter) throw new Error('counter regression');
        if (parsed.signCount > 0) stored.counter = parsed.signCount;
        db().challenges = db().challenges.filter((c) => c !== ch);
        const token = newToken();
        db().sessions.push({ token, userId: u.id, createdAt: new Date().toISOString() }); save();
        return sendJson(res, 200, { ok: true, token, user: publicUser(u) });
      } catch (e) { return sendJson(res, 401, { ok: false, error: 'webauthn_failed', detail: e.message }); }
    }

    // All remaining endpoints require auth, except the two public security
    // recovery routes (fetching one's own question texts, and resetting by
    // answering them) — they must work while logged out.
    const isPublicRecovery = (p === '/api/security/questions' && method === 'GET') || (p === '/api/security/reset' && method === 'POST');
    if (!me && !isPublicRecovery) return sendJson(res, 401, { ok: false, error: 'unauthorized' });
    // The admin account is NOT an ordinary user account: it cannot perform
    // ordinary operations for itself (transfers, FX, bills, cards, deposits,
    // investments, goals, orders). It only administers other accounts through
    // /api/admin/* and views data through /api/dashboard and /api/transactions.
    if (me && me.role === 'admin') {
      const ordinaryBlocked = p === '/api/transfer' || p === '/api/fx/fund' || p === '/api/fx/transfer' || p === '/api/fx/sell' || p === '/api/bills/pay' || p.startsWith('/api/cards') || p.startsWith('/api/beneficiaries') || (p === '/api/deposits' && method === 'POST') || p === '/api/investments/buy' || p === '/api/investments/sell' || p === '/api/investments/portfolio' || (p === '/api/goals' && method === 'POST') || (p === '/api/orders' && method === 'POST');
      if (ordinaryBlocked) return sendJson(res, 403, { ok: false, error: 'admin_no_ordinary' });
    }

    if (p === '/api/transfer' && method === 'POST') {
      const to = findBySdg(String(body.toAccount));
      const amount = Math.floor(Number(body.amount));
      if (!to || to.id === me.id || to.status === 'banned' || !(amount > 0)) return sendJson(res, 400, { ok: false, error: 'bad_recipient' });
      if (!checkPin(me, body.pin, res)) return;
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (availableSdg(me) < amount + TRANSFER_FEE_SDG) return sendJson(res, 400, { ok: false, error: 'insufficient' });
      const ref = dbmod.refFor(db().nextTxSeq);
      me.sdgBalance -= (amount + TRANSFER_FEE_SDG); to.sdgBalance += amount;
      addTx({ userId: me.id, type: 'transfer_out', titleAr: 'تحويل إلى ' + to.fullNameAr, titleEn: 'Transfer to ' + (to.fullNameEn || to.fullNameAr), amountSdg: -amount, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: to.fullNameAr, toAccount: to.sdgAccount, ref });
      addTx({ userId: me.id, type: 'transfer_fee', titleAr: 'رسوم تحويل — ' + TRANSFER_FEE_SDG + ' ج.س', titleEn: 'Transfer fee — ' + TRANSFER_FEE_SDG + ' SDG', amountSdg: -TRANSFER_FEE_SDG, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: me.fullNameAr, toAccount: me.sdgAccount, ref });
      addTx({ userId: to.id, type: 'transfer_in', titleAr: 'تحويل وارد من ' + me.fullNameAr, titleEn: 'Incoming transfer from ' + (me.fullNameEn || me.fullNameAr), amountSdg: amount, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: to.fullNameAr, toAccount: to.sdgAccount, ref });
      save();
      return sendJson(res, 200, { ok: true, ref, user: publicUser(me), feeSdg: TRANSFER_FEE_SDG, suggestBeneficiary: suggestBeneficiary(me, to) });
    }
    // ---- security questions + 4-digit transfer PIN ----
    // Answers are stored only as salted hashes (same scrypt scheme as
    // passwords) — never in plain text, never returned by any endpoint.
    const SECURITY_QUESTIONS = [
      { id: 'school', ar: 'ما اسم مدرستك الابتدائية؟', en: 'What was your primary school?' },
      { id: 'pet', ar: 'ما اسم أول حيوان أليف لك؟', en: 'What was your first pet\'s name?' },
      { id: 'birthcity', ar: 'في أي مدينة وُلدت؟', en: 'In which city were you born?' },
      { id: 'friend', ar: 'ما اسم صديق طفولتك المقرب؟', en: 'What is your childhood best friend\'s name?' },
      { id: 'fatherjob', ar: 'ما مهنة والدك؟', en: 'What is your father\'s profession?' },
      { id: 'teacher', ar: 'ما اسم أول معلم تتذكره؟', en: 'What is the first teacher you remember?' },
    ];
    const normAnswer = (a) => String(a || '').trim().toLowerCase();
    function verifySecurityAnswers(user, answers) {
      const stored = user.securityQuestions || [];
      if (!stored.length || !Array.isArray(answers)) return false;
      return stored.every((sq) => {
        const given = (answers || []).find((x) => x.id === sq.id);
        return given && verifyPassword(normAnswer(given.answer), sq.aHash);
      });
    }
    function checkPin(user, pin, res) {
      // No PIN set yet: transfers proceed as before (the app nudges the user
      // to set a PIN from the Security Centre). Once set, it is enforced.
      if (!user.pinHash) return true;
      if (user.pinLockedUntil && Date.now() < user.pinLockedUntil) { sendJson(res, 403, { ok: false, error: 'pin_locked' }); return false; }
      if (!pin) { sendJson(res, 400, { ok: false, error: 'pin_required' }); return false; }
      if (!verifyPassword(String(pin), user.pinHash)) {
        user.pinFailCount = (user.pinFailCount || 0) + 1;
        if (user.pinFailCount >= 5) { user.pinLockedUntil = Date.now() + 5 * 60 * 1000; user.pinFailCount = 0; }
        save();
        sendJson(res, 400, { ok: false, error: 'pin_incorrect' }); return false;
      }
      user.pinFailCount = 0; user.pinLockedUntil = 0;
      return true;
    }
    if (p === '/api/security/questions' && method === 'GET') {
      const ident = String(url.searchParams.get('email') || '').trim();
      const u = db().users.find((x) => x.status === 'active' && (x.email.toLowerCase() === ident.toLowerCase() || normAcct(x.sdgAccount) === normAcct(ident) || normAcct(x.fxAccount) === normAcct(ident)));
      if (!u || !(u.securityQuestions || []).length) return sendJson(res, 404, { ok: false, error: 'not_found' });
      const qs = (u.securityQuestions || []).map((sq) => SECURITY_QUESTIONS.find((q) => q.id === sq.id)).filter(Boolean);
      return sendJson(res, 200, { ok: true, questions: qs });
    }
    if (p === '/api/security/questions' && method === 'POST') {
      const qs = body.questions || [];
      if (!Array.isArray(qs) || qs.length !== 2) return sendJson(res, 400, { ok: false, error: 'need_two_questions' });
      const ids = qs.map((q) => q.id);
      if (new Set(ids).size !== 2 || !ids.every((id) => SECURITY_QUESTIONS.some((q) => q.id === id))) return sendJson(res, 400, { ok: false, error: 'bad_question' });
      if (!qs.every((q) => normAnswer(q.answer).length >= 2)) return sendJson(res, 400, { ok: false, error: 'answer_too_short' });
      me.securityQuestions = qs.map((q) => ({ id: q.id, aHash: hashPassword(normAnswer(q.answer)) }));
      save();
      return sendJson(res, 200, { ok: true, count: 2, user: publicUser(me) });
    }
    if (p === '/api/security/reset' && method === 'POST') {
      const ident = String(body.email || '').trim();
      const u = db().users.find((x) => x.email.toLowerCase() === ident.toLowerCase() || normAcct(x.sdgAccount) === normAcct(ident) || normAcct(x.fxAccount) === normAcct(ident));
      if (!u || u.status === 'banned' || !(u.securityQuestions || []).length) return sendJson(res, 400, { ok: false, error: 'reset_failed' });
      if (!verifySecurityAnswers(u, body.answers)) return sendJson(res, 400, { ok: false, error: 'reset_failed' });
      const newPassword = String(body.newPassword || '');
      const newPin = String(body.newPin || '');
      if (!newPassword && !newPin) return sendJson(res, 400, { ok: false, error: 'nothing_to_reset' });
      if (newPassword && newPassword.length < 4) return sendJson(res, 400, { ok: false, error: 'password_too_short' });
      if (newPin && !/^\d{4}$/.test(newPin)) return sendJson(res, 400, { ok: false, error: 'bad_pin' });
      if (newPassword) u.passwordHash = hashPassword(newPassword);
      if (newPin) { u.pinHash = hashPassword(newPin); u.pinFailCount = 0; u.pinLockedUntil = 0; }
      // A reset by questions logs the account out everywhere.
      db().sessions = db().sessions.filter((s) => s.userId !== u.id);
      save();
      return sendJson(res, 200, { ok: true, passwordReset: !!newPassword, pinReset: !!newPin });
    }
    if (p === '/api/security/pin/set' && method === 'POST') {
      if (me.pinHash) return sendJson(res, 400, { ok: false, error: 'pin_exists' });
      if (!/^\d{4}$/.test(String(body.pin || ''))) return sendJson(res, 400, { ok: false, error: 'bad_pin' });
      if (!verifyPassword(String(body.password || ''), me.passwordHash)) return sendJson(res, 400, { ok: false, error: 'bad_password' });
      me.pinHash = hashPassword(String(body.pin)); me.pinFailCount = 0; me.pinLockedUntil = 0;
      save();
      return sendJson(res, 200, { ok: true, user: publicUser(me) });
    }
    if (p === '/api/security/pin/change' && method === 'POST') {
      if (!me.pinHash) return sendJson(res, 400, { ok: false, error: 'no_pin' });
      if (!/^\d{4}$/.test(String(body.newPin || ''))) return sendJson(res, 400, { ok: false, error: 'bad_pin' });
      const byPin = body.currentPin && verifyPassword(String(body.currentPin), me.pinHash);
      const byPassword = body.password && verifyPassword(String(body.password), me.passwordHash);
      if (!byPin && !byPassword) return sendJson(res, 400, { ok: false, error: 'bad_proof' });
      me.pinHash = hashPassword(String(body.newPin)); me.pinFailCount = 0; me.pinLockedUntil = 0;
      save();
      return sendJson(res, 200, { ok: true, user: publicUser(me) });
    }
    // ---- beneficiaries (user-managed recipients) ----
    // The recipients lists show ONLY users this user added himself — never
    // the whole registered directory.
    function suggestBeneficiary(me, to) {
      if (!to) return undefined;
      if ((me.beneficiaries || []).includes(to.id)) return undefined;
      if ((me.beneficiaryDeclined || []).includes(to.id)) return undefined;
      const count = db().transactions.filter((t) => t.userId === me.id && (t.type === 'transfer_out' || t.type === 'fx_transfer_out') && (t.toAccount === to.sdgAccount || t.toAccount === to.fxAccount)).length;
      // "More than three transfers" to the same account: offer on the 4th.
      if (count <= 3) return undefined;
      return { userId: to.id, nameAr: to.fullNameAr, nameEn: to.fullNameEn, sdgAccount: to.sdgAccount, fxAccount: to.fxAccount };
    }
    if (p === '/api/beneficiaries/add' && method === 'POST') {
      const u = findBySdg(String(body.account)) || findByFx(String(body.account));
      if (!u || u.status === 'banned') return sendJson(res, 400, { ok: false, error: 'bad_beneficiary' });
      if (u.id === me.id) return sendJson(res, 400, { ok: false, error: 'cannot_add_self' });
      if ((me.beneficiaries || []).includes(u.id)) return sendJson(res, 400, { ok: false, error: 'beneficiary_exists' });
      if (!me.beneficiaries) me.beneficiaries = [];
      me.beneficiaries.push(u.id);
      me.beneficiaryDeclined = (me.beneficiaryDeclined || []).filter((id) => id !== u.id);
      save();
      return sendJson(res, 200, { ok: true, beneficiary: publicUser(u) });
    }
    if (p === '/api/beneficiaries/remove' && method === 'POST') {
      me.beneficiaries = (me.beneficiaries || []).filter((id) => id !== Number(body.userId));
      save();
      return sendJson(res, 200, { ok: true });
    }
    if (p === '/api/beneficiaries/decline' && method === 'POST') {
      if (!me.beneficiaryDeclined) me.beneficiaryDeclined = [];
      if (!me.beneficiaryDeclined.includes(Number(body.userId))) me.beneficiaryDeclined.push(Number(body.userId));
      save();
      return sendJson(res, 200, { ok: true });
    }
    if (p === '/api/lookup' && method === 'POST') {
      const u = findBySdg(String(body.account)) || findByFx(String(body.account));
      if (!u) return sendJson(res, 404, { ok: false, error: 'not_found' });
      return sendJson(res, 200, { ok: true, nameAr: u.fullNameAr, nameEn: u.fullNameEn, sdgAccount: u.sdgAccount, fxAccount: u.fxAccount });
    }
    if (p === '/api/fx/fund' && method === 'POST') {
      const amountSdg = Math.floor(Number(body.amountSdg));
      if (!(amountSdg > 0)) return sendJson(res, 400, { ok: false, error: 'bad_amount' });
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (availableSdg(me) < amountSdg) return sendJson(res, 400, { ok: false, error: 'insufficient' });
      const usdCents = Math.floor(amountSdg / USD_RATE * 100);
      if (usdCents <= 0) return sendJson(res, 400, { ok: false, error: 'amount_too_small' });
      const ref = dbmod.refFor(db().nextTxSeq);
      me.sdgBalance -= amountSdg; me.fxBalanceCents += usdCents;
      addTx({ userId: me.id, type: 'fx_fund', titleAr: `شحن الحساب الأجنبي من حساب الجنيه — ${amountSdg} ج.س ← ${(usdCents / 100).toFixed(2)} USD (سعر ${USD_RATE})`, titleEn: `Fund FX account from SDG account — ${amountSdg} SDG → ${(usdCents / 100).toFixed(2)} USD (rate ${USD_RATE})`, amountSdg: -amountSdg, amountUsdCents: usdCents, currency: 'USD', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: me.fullNameAr, toAccount: me.fxAccount, ref });
      save();
      return sendJson(res, 200, { ok: true, ref, usdCents, usdRate: USD_RATE, user: publicUser(me) });
    }
    if (p === '/api/fx/sell' && method === 'POST') {
      // Convert USD from the FX account back to the SDG account, at the same
      // demo rate. This is a conversion between the user's own accounts (like
      // fx/fund in reverse), so no transfer PIN is required.
      const usdCents = Math.floor(Number(body.amountUsd) * 100);
      if (!(usdCents > 0)) return sendJson(res, 400, { ok: false, error: 'bad_amount' });
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (me.fxBalanceCents < usdCents) return sendJson(res, 400, { ok: false, error: 'insufficient_fx' });
      const sdgAmount = usdCents * (USD_RATE / 100);
      const ref = dbmod.refFor(db().nextTxSeq);
      me.fxBalanceCents -= usdCents; me.sdgBalance += sdgAmount;
      addTx({ userId: me.id, type: 'fx_sell', titleAr: `تحويل من الحساب الأجنبي إلى حساب الجنيه — ${(usdCents / 100).toFixed(2)} USD ← ${sdgAmount} ج.س (سعر ${USD_RATE})`, titleEn: `Convert FX account to SDG account — ${(usdCents / 100).toFixed(2)} USD → ${sdgAmount} SDG (rate ${USD_RATE})`, amountSdg: sdgAmount, amountUsdCents: -usdCents, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.fxAccount, toName: me.fullNameAr, toAccount: me.sdgAccount, ref });
      save();
      return sendJson(res, 200, { ok: true, ref, sdgAmount, user: publicUser(me) });
    }
    if (p === '/api/fx/transfer' && method === 'POST') {
      const to = findByFx(String(body.toFxAccount));
      const usdCents = Math.floor(Number(body.amountUsd) * 100);
      if (!to || to.id === me.id || to.status === 'banned' || !(usdCents > 0)) return sendJson(res, 400, { ok: false, error: 'bad_recipient' });
      if (!checkPin(me, body.pin, res)) return;
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (me.fxBalanceCents < usdCents + TRANSFER_FEE_USD_CENTS) return sendJson(res, 400, { ok: false, error: 'insufficient_fx' });
      const ref = dbmod.refFor(db().nextTxSeq);
      me.fxBalanceCents -= (usdCents + TRANSFER_FEE_USD_CENTS); to.fxBalanceCents += usdCents;
      addTx({ userId: me.id, type: 'fx_transfer_out', titleAr: 'تحويل أجنبي إلى ' + to.fullNameAr, titleEn: 'FX transfer to ' + (to.fullNameEn || to.fullNameAr), amountUsdCents: -usdCents, currency: 'USD', fromName: me.fullNameAr, fromAccount: me.fxAccount, toName: to.fullNameAr, toAccount: to.fxAccount, ref });
      addTx({ userId: me.id, type: 'fx_transfer_fee', titleAr: 'رسوم تحويل أجنبي — 0.50 USD', titleEn: 'FX transfer fee — 0.50 USD', amountUsdCents: -TRANSFER_FEE_USD_CENTS, currency: 'USD', fromName: me.fullNameAr, fromAccount: me.fxAccount, toName: me.fullNameAr, toAccount: me.fxAccount, ref });
      addTx({ userId: to.id, type: 'fx_transfer_in', titleAr: 'تحويل أجنبي وارد من ' + me.fullNameAr, titleEn: 'Incoming FX transfer from ' + (me.fullNameEn || me.fullNameAr), amountUsdCents: usdCents, currency: 'USD', fromName: me.fullNameAr, fromAccount: me.fxAccount, toName: to.fullNameAr, toAccount: to.fxAccount, ref });
      save();
      return sendJson(res, 200, { ok: true, ref, user: publicUser(me), feeUsdCents: TRANSFER_FEE_USD_CENTS, suggestBeneficiary: suggestBeneficiary(me, to) });
    }
    if (p === '/api/transactions' && method === 'GET') {
      const d = db();
      const list = me.role === 'admin' ? d.transactions : d.transactions.filter((t) => t.userId === me.id);
      return sendJson(res, 200, { ok: true, transactions: [...list].reverse() });
    }
    const txMatch = p.match(/^\/api\/transactions\/(\d+)$/);
    if (txMatch && method === 'GET') {
      const t = db().transactions.find((x) => x.id === Number(txMatch[1]));
      if (!t || (me.role !== 'admin' && t.userId !== me.id)) return sendJson(res, 404, { ok: false, error: 'not_found' });
      return sendJson(res, 200, { ok: true, transaction: t });
    }
    if (p === '/api/branches' && method === 'GET') return sendJson(res, 200, { ok: true, branches: BRANCHES });
    if (p === '/api/bills' && method === 'GET') return sendJson(res, 200, { ok: true, bills: BILLS });
    if (p === '/api/bills/pay' && method === 'POST') {
      const bill = BILLS.find((b) => b.id === body.billId);
      if (!bill) return sendJson(res, 400, { ok: false, error: 'bad_bill' });
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (availableSdg(me) < bill.amountSdg) return sendJson(res, 400, { ok: false, error: 'insufficient' });
      me.sdgBalance -= bill.amountSdg;
      const tx = addTx({ userId: me.id, type: 'bill_pay', titleAr: 'دفع فاتورة ' + bill.nameAr, titleEn: 'Bill payment ' + bill.nameEn, amountSdg: -bill.amountSdg, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: bill.nameAr, toAccount: bill.nameAr, });
      save();
      return sendJson(res, 200, { ok: true, transaction: tx, user: publicUser(me) });
    }
    if (p === '/api/goals' && method === 'GET') return sendJson(res, 200, { ok: true, goals: db().goals.filter((g) => g.userId === me.id) });
    if (p === '/api/goals' && method === 'POST') {
      const g = { id: Date.now(), userId: me.id, name: String(body.name || ''), targetSdg: Math.floor(Number(body.targetSdg) || 0), savedSdg: 0, createdAt: new Date().toISOString() };
      db().goals.push(g); save();
      return sendJson(res, 200, { ok: true, goal: g });
    }
    if (p === '/api/orders' && method === 'GET') return sendJson(res, 200, { ok: true, orders: db().standingOrders.filter((o) => o.userId === me.id) });
    if (p === '/api/orders' && method === 'POST') {
      const o = { id: Date.now(), userId: me.id, toAccount: String(body.toAccount || ''), amountSdg: Math.floor(Number(body.amountSdg) || 0), frequencyAr: String(body.frequency || ''), createdAt: new Date().toISOString() };
      db().standingOrders.push(o); save();
      return sendJson(res, 200, { ok: true, order: o });
    }

    // ---- cards ----
    function cardView(c) { return { ...c, fullNumber: undefined, cvv: undefined, masked: masked(c.fullNumber) }; }
    function cardHistory(cardId) { return db().transactions.filter((t) => t.cardId === cardId).slice(-50).reverse(); }
    if (p === '/api/cards' && method === 'GET') return sendJson(res, 200, { ok: true, cards: db().cards.filter((c) => c.userId === me.id).map(cardView) });
    if (p === '/api/cards/request' && method === 'POST') {
      const active = db().cards.filter((c) => c.userId === me.id && (c.status === 'active' || c.status === 'frozen'));
      if (active.length >= MAX_ACTIVE_CARDS) return sendJson(res, 400, { ok: false, error: 'card_limit' });
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (availableSdg(me) < CARD_PRICE_SDG) return sendJson(res, 400, { ok: false, error: 'insufficient' });
      me.sdgBalance -= CARD_PRICE_SDG;
      const now = new Date(); const exp = new Date(now); exp.setFullYear(exp.getFullYear() + 5);
      const fullNumber = newCardNumber();
      const card = { id: db().nextCardSeq++, userId: me.id, kind: 'فيزا كارت', kindEn: 'Visa Card', fullNumber,
        last4: fullNumber.split(' ').pop(), status: 'active', balanceCents: 0, dailyLimitUsd: 1000,
        cvv: String(Math.floor(100 + Math.random() * 900)), issuedAt: now.toISOString(), expiresAt: exp.toISOString(),
        exp: String(exp.getMonth() + 1).padStart(2, '0') + ' / ' + String(exp.getFullYear()).slice(2) };
      db().cards.push(card);
      addTx({ userId: me.id, type: 'card_issue', titleAr: `طلب بطاقة فيزا كارت ${masked(fullNumber)} — رسوم إصدار ${CARD_PRICE_SDG} ج.س (غير مستردة)`, titleEn: `Visa Card request ${masked(fullNumber)} — issuance fee ${CARD_PRICE_SDG} SDG (non-refundable)`, amountSdg: -CARD_PRICE_SDG, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: me.fullNameAr, toAccount: me.sdgAccount, cardId: card.id });
      save();
      return sendJson(res, 200, { ok: true, card: cardView(card), user: publicUser(me) });
    }
    if (p === '/api/cards/transfer' && method === 'POST') {
      const from = db().cards.find((c) => c.id === Number(body.fromCardId) && c.userId === me.id);
      const to = findCardByNumber(String(body.toCardNumber || ''));
      const cents = Math.floor(Number(body.amountUsd) * 100);
      if (!from || !to || !(cents > 0)) return sendJson(res, 400, { ok: false, error: 'bad_card' });
      if (from.status !== 'active') return sendJson(res, 400, { ok: false, error: 'card_not_active' });
      if (to.status !== 'active') return sendJson(res, 400, { ok: false, error: 'card_not_active' });
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if ((db().users.find((u) => u.id === to.userId) || {}).status === 'banned') return sendJson(res, 400, { ok: false, error: 'bad_card' });
      if (!checkPin(me, body.pin, res)) return;
      if (from.balanceCents < cents + TRANSFER_FEE_USD_CENTS) return sendJson(res, 400, { ok: false, error: 'insufficient_card' });
      const ref = dbmod.refFor(db().nextTxSeq);
      from.balanceCents -= (cents + TRANSFER_FEE_USD_CENTS); to.balanceCents += cents;
      addTx({ userId: me.id, type: 'card_transfer_out', titleAr: 'تحويل من بطاقة إلى بطاقة', titleEn: 'Card-to-card transfer', amountUsdCents: -cents, currency: 'USD', fromName: me.fullNameAr, fromAccount: masked(from.fullNumber), toName: (db().users.find((u) => u.id === to.userId) || {}).fullNameAr || '', toAccount: masked(to.fullNumber), cardId: from.id, ref });
      addTx({ userId: me.id, type: 'card_transfer_fee', titleAr: 'رسوم تحويل بطاقة — 0.50 USD', titleEn: 'Card transfer fee — 0.50 USD', amountUsdCents: -TRANSFER_FEE_USD_CENTS, currency: 'USD', fromName: me.fullNameAr, fromAccount: masked(from.fullNumber), toName: me.fullNameAr, toAccount: masked(from.fullNumber), cardId: from.id, ref });
      addTx({ userId: to.userId, type: 'card_transfer_in', titleAr: 'تحويل وارد من بطاقة', titleEn: 'Incoming card-to-card transfer', amountUsdCents: cents, currency: 'USD', fromName: me.fullNameAr, fromAccount: masked(from.fullNumber), toName: (db().users.find((u) => u.id === to.userId) || {}).fullNameAr || '', toAccount: masked(to.fullNumber), cardId: to.id, ref });
      save();
      return sendJson(res, 200, { ok: true, ref, card: cardView(from), feeUsdCents: TRANSFER_FEE_USD_CENTS });
    }
    const cardIdMatch = p.match(/^\/api\/cards\/(\d+)(?:\/(details|freeze|unfreeze|cancel|change-cvv|topup|limit|history))?$/);
    if (cardIdMatch) {
      const card = db().cards.find((c) => c.id === Number(cardIdMatch[1]) && c.userId === me.id);
      if (!card) return sendJson(res, 404, { ok: false, error: 'card_not_found' });
      const action = cardIdMatch[2];
      if (method === 'GET' && !action) return sendJson(res, 200, { ok: true, card: cardView(card), history: cardHistory(card.id) });
      if (method === 'GET' && action === 'history') return sendJson(res, 200, { ok: true, history: cardHistory(card.id) });
      if (method === 'GET' && action === 'details') return sendJson(res, 200, { ok: true, fullNumber: card.fullNumber, cvv: card.cvv, exp: card.exp, holderAr: me.fullNameAr, holderEn: me.fullNameEn });
      if (method === 'POST' && action === 'freeze') { if (card.status !== 'active') return sendJson(res, 400, { ok: false, error: 'card_not_active' }); card.status = 'frozen'; save(); return sendJson(res, 200, { ok: true, card: cardView(card) }); }
      if (method === 'POST' && action === 'unfreeze') { if (card.status !== 'frozen') return sendJson(res, 400, { ok: false, error: 'card_not_frozen' }); card.status = 'active'; save(); return sendJson(res, 200, { ok: true, card: cardView(card) }); }
      if (method === 'POST' && action === 'cancel') {
        if (card.status === 'cancelled') return sendJson(res, 400, { ok: false, error: 'already_cancelled' });
        card.status = 'cancelled'; save();
        return sendJson(res, 200, { ok: true, card: cardView(card), noteAr: 'تم إلغاء البطاقة نهائياً. رسوم الإصدار 100,000 جنيه غير مستردة، وأي رصيد دولار متبقٍّ يبقى مقفلاً على البطاقة الملغاة ولا يعود للحساب.', noteEn: 'Card cancelled permanently. The 100,000 SDG issuance fee is non-refundable, and any remaining USD balance stays locked on the cancelled card and does not return to the account.' });
      }
      if (method === 'POST' && action === 'change-cvv') {
        if (!verifyPassword(body.password || '', me.passwordHash)) return sendJson(res, 401, { ok: false, error: 'bad_password' });
        const nv = String(body.newCvv || '');
        if (!/^\d{3}$/.test(nv)) return sendJson(res, 400, { ok: false, error: 'bad_cvv' });
        if (nv === card.cvv) return sendJson(res, 400, { ok: false, error: 'same_cvv' });
        card.cvv = nv; save();
        return sendJson(res, 200, { ok: true, card: cardView(card) });
      }
      if (method === 'POST' && action === 'topup') {
        // FX account ONLY. A direct SDG top-up is blocked by design.
        if (body.source === 'SDG') return sendJson(res, 400, { ok: false, error: 'fx_only_topup', messageAr: 'البطاقة لا تُشحن إلا من الحساب الأجنبي', messageEn: 'Cards can only be topped up from the foreign-currency account' });
        const cents = Math.floor(Number(body.amountUsd) * 100);
        if (card.status !== 'active') return sendJson(res, 400, { ok: false, error: 'card_not_active' });
        if (!(cents > 0)) return sendJson(res, 400, { ok: false, error: 'bad_amount' });
        if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
        if (me.fxBalanceCents < cents) return sendJson(res, 400, { ok: false, error: 'insufficient_fx' });
        me.fxBalanceCents -= cents; card.balanceCents += cents;
        const tx = addTx({ userId: me.id, type: 'card_topup', titleAr: `شحن بطاقة ${masked(card.fullNumber)} — ${(cents / 100).toFixed(2)} USD من الحساب الأجنبي`, titleEn: `Card top-up ${masked(card.fullNumber)} — ${(cents / 100).toFixed(2)} USD from FX account`, amountUsdCents: cents, currency: 'USD', fromName: me.fullNameAr, fromAccount: me.fxAccount, toName: me.fullNameAr, toAccount: masked(card.fullNumber), cardId: card.id });
        save();
        return sendJson(res, 200, { ok: true, card: cardView(card), transaction: tx, user: publicUser(me) });
      }
      if (method === 'POST' && action === 'limit') {
        const lim = Math.floor(Number(body.dailyLimitUsd));
        if (!(lim > 0)) return sendJson(res, 400, { ok: false, error: 'bad_limit' });
        card.dailyLimitUsd = lim; save();
        return sendJson(res, 200, { ok: true, card: cardView(card) });
      }
    }

    // ---- deposits ----
    if (p === '/api/deposits' && method === 'GET') return sendJson(res, 200, { ok: true, deposits: db().deposits.filter((d) => d.userId === me.id).slice().reverse() });
    if (p === '/api/deposits' && method === 'POST') {
      const principal = Math.floor(Number(body.principal));
      const days = Math.floor(Number(body.durationDays));
      const allowed = [1, 7, 30, 90, 180, 365];
      if (!(principal > 0) || !allowed.includes(days)) return sendJson(res, 400, { ok: false, error: 'bad_deposit' });
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (availableSdg(me) < principal) return sendJson(res, 400, { ok: false, error: 'insufficient' });
      const rate = depositRate(principal);
      const profit = Math.round(principal * rate * days / 365);
      const maturity = new Date(Date.now() + days * 86400000).toISOString();
      me.sdgBalance -= principal;
      const dep = { id: db().nextDepositSeq++, userId: me.id, principal, rate, days, profit, total: principal + profit, maturityDate: maturity, status: 'active', createdAt: new Date().toISOString() };
      db().deposits.push(dep);
      addTx({ userId: me.id, type: 'deposit_open', titleAr: `فتح وديعة لأجل — ${days} يوم بنسبة ${Math.round(rate * 100)}%`, titleEn: `Term deposit opened — ${days} days at ${Math.round(rate * 100)}%`, amountSdg: -principal, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: me.fullNameAr, toAccount: me.sdgAccount });
      save();
      return sendJson(res, 200, { ok: true, deposit: dep, user: publicUser(me) });
    }

    // ---- investment price movement: one GLOBAL live price per asset, ----
    // ---- same for every user. Lazy hourly tick (the free host sleeps, so
    // ---- no background cron is reliable): on each investments request the
    // ---- price advances one random step (max +/-2%) per whole hour elapsed
    // ---- since the last tick, capped at 24 steps, and clamped to 50%-200%
    // ---- of the base price. First tick only initialises (no jump), so
    // ---- existing holdings keep their base prices until movement starts.
    // ---- Portfolio profit/loss follows automatically because it is valued
    // ---- at the live price; buy/sell execute at the live price, so a sale
    // ---- realises the gain or loss in cash.
    const PRICE_TICK_MS = 60 * 60 * 1000, PRICE_MAX_STEP = 0.02, PRICE_MAX_STEPS = 24;
    function liveAssets(){
      const d = db();
      if (!d.investPrices) { d.investPrices = {}; ASSETS.forEach(a => { d.investPrices[a.id] = a.priceSdg; }); }
      if (!d.priceLastTick) d.priceLastTick = Date.now();
      return ASSETS.map(a => ({ ...a, basePriceSdg: a.priceSdg, priceSdg: d.investPrices[a.id] }));
    }
    function tickPrices(){
      const d = db();
      if (!d.investPrices) { d.investPrices = {}; ASSETS.forEach(a => { d.investPrices[a.id] = a.priceSdg; }); }
      if (!d.priceLastTick) { d.priceLastTick = Date.now(); save(); return; }
      const steps = Math.min(Math.floor((Date.now() - d.priceLastTick) / PRICE_TICK_MS), PRICE_MAX_STEPS);
      if (steps <= 0) return;
      for (let k = 0; k < steps; k++) {
        ASSETS.forEach(a => {
          const lo = Math.round(a.priceSdg * 0.5), hi = Math.round(a.priceSdg * 2);
          const next = Math.round(d.investPrices[a.id] * (1 + (Math.random() * 2 - 1) * PRICE_MAX_STEP));
          d.investPrices[a.id] = Math.min(hi, Math.max(lo, next));
        });
      }
      d.priceLastTick += steps * PRICE_TICK_MS;
      save();
    }
    // ---- investments ----
    if (p === '/api/investments/assets' && method === 'GET') { tickPrices(); return sendJson(res, 200, { ok: true, assets: liveAssets() }); }
    if (p === '/api/investments/portfolio' && method === 'GET') {
      tickPrices();
      const holdings = db().investments.filter((h) => h.userId === me.id).map((h) => {
        const a = liveAssets().find((x) => x.id === h.assetId);
        const value = Math.round(h.quantity * a.priceSdg);
        return { ...h, asset: a, currentPriceSdg: a.priceSdg, valueSdg: value, profitSdg: value - Math.round(h.quantity * h.avgPriceSdg) };
      });
      return sendJson(res, 200, { ok: true, holdings, log: db().investmentLog.filter((l) => l.userId === me.id).slice(-50).reverse() });
    }
    if ((p === '/api/investments/buy' || p === '/api/investments/sell') && method === 'POST') {
      tickPrices();
      const isBuy = p.endsWith('/buy');
      const asset = liveAssets().find((a) => a.id === body.assetId);
      const qty = Number(body.quantity);
      if (!asset || !(qty > 0)) return sendJson(res, 400, { ok: false, error: 'bad_asset' });
      const total = Math.round(qty * asset.priceSdg);
      let holding = db().investments.find((h) => h.userId === me.id && h.assetId === asset.id);
      if (isFrozenAll(me)) return sendJson(res, 403, { ok: false, error: 'frozen_all' });
      if (isBuy) {
        if (availableSdg(me) < total) return sendJson(res, 400, { ok: false, error: 'insufficient' });
        me.sdgBalance -= total;
        if (!holding) { holding = { userId: me.id, assetId: asset.id, quantity: 0, avgPriceSdg: asset.priceSdg }; db().investments.push(holding); }
        holding.avgPriceSdg = Math.round((holding.avgPriceSdg * holding.quantity + total) / (holding.quantity + qty));
        holding.quantity += qty;
      } else {
        if (!holding || holding.quantity < qty) return sendJson(res, 400, { ok: false, error: 'sell_more_than_owned' });
        holding.quantity -= qty;
        me.sdgBalance += total;
        if (holding.quantity === 0) db().investments = db().investments.filter((h) => h !== holding);
      }
      const log = { userId: me.id, assetId: asset.id, side: isBuy ? 'buy' : 'sell', quantity: qty, priceSdg: asset.priceSdg, totalSdg: total, createdAt: new Date().toISOString() };
      db().investmentLog.push(log);
      addTx({ userId: me.id, type: isBuy ? 'invest_buy' : 'invest_sell', titleAr: (isBuy ? 'شراء استثمار ' : 'بيع استثمار ') + asset.nameAr, titleEn: (isBuy ? 'Investment buy ' : 'Investment sell ') + asset.nameEn, amountSdg: isBuy ? -total : total, currency: 'SDG', fromName: me.fullNameAr, fromAccount: me.sdgAccount, toName: me.fullNameAr, toAccount: me.sdgAccount });
      save();
      return sendJson(res, 200, { ok: true, user: publicUser(me) });
    }

    // ---- WebAuthn register / status ----
    if (p === '/api/webauthn/register/options' && method === 'POST') {
      const challenge = wa.randomChallenge();
      db().challenges.push({ token: 'reg-' + me.id, challenge, type: 'register', userId: me.id, createdAt: Date.now() }); save();
      const host = (req.headers.host || 'localhost').split(':')[0];
      return sendJson(res, 200, { ok: true, challenge, rp: { name: 'Wassil Demo', id: host }, user: { id: wa.b64urlEncode(Buffer.from(String(me.id))), name: me.email, displayName: me.fullNameAr } });
    }
    if (p === '/api/webauthn/register/verify' && method === 'POST') {
      const cred = body.credential;
      if (!cred) return sendJson(res, 400, { ok: false, error: 'bad_credential' });
      const ch = db().challenges.filter((c) => c.type === 'register' && c.userId === me.id).pop();
      if (!ch || Date.now() - ch.createdAt > 5 * 60 * 1000) return sendJson(res, 400, { ok: false, error: 'challenge_expired' });
      try {
        const clientData = JSON.parse(wa.b64urlDecode(cred.response.clientDataJSON).toString('utf8'));
        if (clientData.type !== 'webauthn.create') throw new Error('bad type');
        if (clientData.challenge !== ch.challenge) throw new Error('challenge mismatch');
        const parsed = wa.parseAttestation(cred.response.attestationObject);
        if (!parsed.publicKeyJwk) throw new Error('no public key');
        db().webauthn.push({ userId: me.id, credentialId: cred.id, publicKeyJwk: parsed.publicKeyJwk, counter: parsed.signCount || 0 });
        db().challenges = db().challenges.filter((c) => c !== ch); save();
        return sendJson(res, 200, { ok: true });
      } catch (e) { return sendJson(res, 400, { ok: false, error: 'webauthn_failed', detail: e.message }); }
    }
    if (p === '/api/webauthn/status' && method === 'GET') {
      const count = db().webauthn.filter((c) => c.userId === me.id).length;
      return sendJson(res, 200, { ok: true, enrolled: count > 0, count });
    }
    if (p === '/api/webauthn/disable' && method === 'POST') {
      db().webauthn = db().webauthn.filter((c) => c.userId !== me.id); save();
      return sendJson(res, 200, { ok: true });
    }
    return sendJson(res, 404, { ok: false, error: 'not_found' });
  } catch (e) {
    console.error(e);
    return sendJson(res, 500, { ok: false, error: 'server_error' });
  }
}

function sendFile(res, full) {
  const ext = path.extname(full);
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png' }[ext] || 'application/octet-stream';
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

(async () => {
  await dbmod.initRemote();
  ensureAdmin();
  http.createServer(handle).listen(PORT, () => {
    console.log('[wassil] Demo app listening on http://localhost:' + PORT);
    console.log('[wassil] Supabase remote store: ' + (dbmod.isRemoteEnabled() ? 'ENABLED' : 'disabled — local file only, data will be wiped on deploy/restart'));
    console.log('[wassil] Demo only — fake data, no real money. Admin: admin@wassil.demo (password from ADMIN_PASSWORD env var, if set).');
  });
})();
