// Password hashing + session tokens, using only Node's crypto.
const crypto = require('crypto');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return salt + ':' + hash;
}

function verifyPassword(password, stored) {
  try {
    const [salt, hash] = stored.split(':');
    const check = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
  } catch {
    return false;
  }
}

function newToken() {
  return crypto.randomBytes(32).toString('hex');
}

function publicUser(u) {
  if (!u) return null;
  return {
    id: u.id, email: u.email, fullNameAr: u.fullNameAr, fullNameEn: u.fullNameEn || null,
    role: u.role, status: u.status, sdgAccount: u.sdgAccount, fxAccount: u.fxAccount,
    sdgBalance: u.sdgBalance, fxBalanceCents: u.fxBalanceCents,
    fxBalanceUsd: (u.fxBalanceCents || 0) / 100, createdAt: u.createdAt,
    pinSet: !!u.pinHash, hasSecurityQuestions: Array.isArray(u.securityQuestions) && u.securityQuestions.length > 0,
    avatar: u.avatar || null,
    frozenSdg: Math.max(0, Number(u.frozenSdg || 0)), frozenAll: !!u.frozenAll,
  };
}

module.exports = { hashPassword, verifyPassword, newToken, publicUser };
