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
function persist() { save(db); }

function frozenSdgOf(u) { return Math.max(0, Number((u && u.frozenSdg) || 0)); }
function availableSdg(u) { return (u ? (u.sdgBalance || 0) : 0) - frozenSdgOf(u); }
function isFrozenAll(u) { return !!(u && u.frozenAll); }

function refFor(seq) {
  return 'WSL-' + String(1000 + (seq % 9000)) + '-' + String(Math.floor(100 + Math.random() * 900));
}

function accountNumber(seq, prefix) {
  // e.g. prefix "1001", seq 1 -> "1001 0000 0001"
  return prefix + ' 0000 ' + String(seq).padStart(4, '0');
}

module.exports = { load, get, persist, save, refFor, accountNumber, DB_PATH, emptyDb, frozenSdgOf, availableSdg, isFrozenAll };
