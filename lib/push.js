// Web Push (RFC 8291 aes128gcm + RFC 8292 VAPID), zero dependencies.
// Used for browser push notifications in Chrome: when the admin publishes a
// news item, every stored subscription gets a push with the title + snippet.
// The VAPID private key lives ONLY in the Render environment (never in code);
// the public key is embedded in public/app.js (it is public by design).

const crypto = require('crypto');

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function unb64url(s) {
  return Buffer.from(String(s).replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}
function hkdfExtract(salt, ikm) {
  return crypto.createHmac('sha256', salt).update(ikm).digest();
}
function hkdfExpand(prk, info, len) {
  const out = [];
  let t = Buffer.alloc(0);
  for (let i = 1; Buffer.concat(out).length < len; i++) {
    t = crypto.createHmac('sha256', prk).update(Buffer.concat([t, info, Buffer.from([i])])).digest();
    out.push(t);
  }
  return Buffer.concat(out).slice(0, len);
}

// Encrypt a payload for one subscription (aes128gcm content encoding).
// Returns the raw request body: salt(16) || recordSize(4) || keyIdLen(1) ||
// localPublicKey(65) || ciphertext+authTag.
function encryptPush(subscription, payload) {
  const userPub = unb64url(subscription.keys.p256dh);
  const auth = unb64url(subscription.keys.auth);
  const ecdh = crypto.createECDH('prime256v1');
  ecdh.generateKeys();
  const shared = ecdh.computeSecret(userPub);
  const prk = hkdfExtract(auth, shared);
  const cek = hkdfExpand(prk, Buffer.from('Content-Encoding: aes128gcm\0'), 16);
  const nonce = hkdfExpand(prk, Buffer.from('Content-Encoding: nonce\0'), 12);
  const salt = crypto.randomBytes(16);
  const localPub = ecdh.getPublicKey();
  const plaintext = Buffer.concat([Buffer.from(payload, 'utf8'), Buffer.from([2])]);
  const cipher = crypto.createCipheriv('aes-128-gcm', cek, nonce);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
  const rs = Buffer.alloc(4);
  rs.writeUInt32BE(4096, 0);
  return Buffer.concat([salt, rs, Buffer.from([localPub.length]), localPub, ciphertext]);
}

// VAPID JWT (ES256, raw R||S signature) for one push-service origin.
function vapidJwt(aud, subject, privateKeyB64, publicKeyB64) {
  const pub = unb64url(publicKeyB64);
  const priv = unb64url(privateKeyB64);
  const jwk = {
    kty: 'EC', crv: 'P-256',
    x: b64url(pub.slice(1, 33)), y: b64url(pub.slice(33, 65)),
    d: b64url(priv),
  };
  const key = crypto.createPrivateKey({ key: jwk, format: 'jwk' });
  const header = b64url(Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = b64url(Buffer.from(JSON.stringify({
    aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: subject,
  })));
  const data = header + '.' + payload;
  const sig = crypto.sign('sha256', Buffer.from(data), { key, dsaEncoding: 'ieee-p1363' });
  return data + '.' + b64url(sig);
}

// Send one push. Resolves to the HTTP status (404/410 mean the subscription
// is gone and the caller should delete it).
async function sendPush(subscription, payload, vapid) {
  const body = encryptPush(subscription, payload);
  const aud = new URL(subscription.endpoint).origin;
  const jwt = vapidJwt(aud, vapid.subject, vapid.privateKey, vapid.publicKey);
  const res = await fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'aes128gcm',
      Authorization: 'vapid t=' + jwt + ', k=' + vapid.publicKey,
      TTL: '86400',
    },
    body,
  });
  return res.status;
}

module.exports = { b64url, unb64url, encryptPush, vapidJwt, sendPush };
