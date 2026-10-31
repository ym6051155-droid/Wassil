// Simple JSON file store for the Wassil demo app.
// The database file is created on first run and is intentionally NOT
// shipped in the source zip. It starts empty (no users, no cards, no
// transactions). An admin account is created on startup only when the
// ADMIN_PASSWORD environment variable is set (see server.js).
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'db.json');

function emptyDb() {
  return {
    nextUserSeq: 1,
    nextTxSeq: 1,
    nextCardSeq: 1,
    nextDepositSeq: 1,
    users: [],
    cards: [],
    deposits: [],
    goals: [],
    standingOrders: [],
    investments: [], // { userId, assetId, quantity, avgPriceSdg }
    investmentLog: [],
    transactions: [],
    sessions: [], // { token, userId, createdAt }
    usedBonusDevices: [], // device ids that already claimed the 15,000 SDG welcome bonus (one per device)
    usedInviteDevices: [], // device ids that already claimed the 50,000 SDG invite bonus (one per device)
    webauthn: [], // { userId, credentialId, publicKeyJwk, counter }
    challenges: [], // { token, challenge, type, userId, createdAt } short-lived, in file for simplicity
  };
}

function load() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      const db = JSON.parse(raw);
      // Backfill fields for forward compatibility.
      const base = emptyDb();
      for (const k of Object.keys(base)) if (db[k] === undefined) db[k] = base[k];
      return db;
    }
  } catch (e) {
    console.error('DB load failed, starting empty:', e.message);
  }
  const db = emptyDb();
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  return db;
}

let db = load();

function save(d) {
  db = d;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function get() { return db; }
// ---- Supabase-backed persistence (document store, no npm dependency) ----
// When SUPABASE_URL + SUPABASE_KEY (service_role, server-side only, never
// sent to the browser) are set, the whole state document is mirrored to the
// public.wassil_state table (id = 1) via Supabase REST (built-in fetch).
// The local JSON file is still written on every save as a fallback/cache, so
// if Supabase is unreachable the app keeps working locally. Without those
// env vars the app is local-file only — which is exactly why Render's
// ephemeral filesystem wipes demo data on every deploy/restart.
const SUPA_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPA_KEY = process.env.SUPABASE_KEY || '';
const remoteEnabled = !!(SUPA_URL && SUPA_KEY);
let saveChain = Promise.resolve();
async function initRemote() {
  if (!remoteEnabled) return false;
  try {
    const r = await fetch(SUPA_URL + '/rest/v1/wassil_state?id=eq.1', { headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY, Accept: 'application/json' } });
    if (!r.ok) { console.log('[wassil] Supabase load failed (HTTP ' + r.status + '), using local file.'); return false; }
    const rows = await r.json();
    if (rows && rows[0] && rows[0].data) {
      const base = emptyDb(); const remote = rows[0].data;
      for (const k of Object.keys(base)) if (remote[k] === undefined) remote[k] = base[k];
      db = remote; console.log('[wassil] State loaded from Supabase.'); return true;
    }
    console.log('[wassil] Supabase table is empty; local state will be upserted on first save.'); return false;
  } catch (e) { console.log('[wassil] Supabase load error, using local file: ' + e.message); return false; }
}
function queueRemoteSave() {
  if (!remoteEnabled) return;
  const snapshot = JSON.parse(JSON.stringify(db));
  saveChain = saveChain.then(async () => {
    try {
      const r = await fetch(SUPA_URL + '/rest/v1/wassil_state?on_conflict=id', { method: 'POST', headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' }, body: JSON.stringify([{ id: 1, data: snapshot }]) });
      if (!r.ok) console.log('[wassil] Supabase save failed (HTTP ' + r.status + ').');
    } catch (e) { console.log('[wassil] Supabase save error: ' + e.message); }
  }).catch(() => {});
}
function isRemoteEnabled() { return remoteEnabled; }
function persist() { save(db); queueRemoteSave(); }

function frozenSdgOf(u) { return Math.max(0, Number((u && u.frozenSdg) || 0)); }
function availableSdg(u) { return (u ? (u.sdgBalance || 0) : 0) - frozenSdgOf(u); }
function isFrozenAll(u) { return !!(u && u.frozenAll); }

function refFor(seq) {
  return 'WSL-' + String(1000 + (seq % 9000)) + '-' + String(Math.floor(100 + Math.random() * 900));
}

function accountNumber(seq, base) {
  // Easy 4-digit numbers: SDG base 1000 -> seq 1 = "1001", seq 2 = "1002";
  // FX base 2000 -> seq 1 = "2001", seq 2 = "2002".
  return String(base + seq);
}
function normAcct(v) { return String(v || '').replace(/[\s-]/g, ''); }

module.exports = { load, get, persist, save, refFor, accountNumber, normAcct, DB_PATH, emptyDb, frozenSdgOf, availableSdg, isFrozenAll, initRemote, isRemoteEnabled };
