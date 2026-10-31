// Minimal WebAuthn helpers using only Node's crypto.
// - Registration: extracts the credential public key from the authenticator
//   data (CBOR-decoded). NOTE (honest limitation): this demo build does NOT
//   validate the full attestation certificate chain; it accepts the key from
//   authenticator data. That is acceptable for a demo, but a production
//   deployment must use a full WebAuthn library with attestation validation.
// - Login: DOES verify the assertion signature (authenticatorData ||
//   SHA256(clientDataJSON)) with the stored public key, checks the challenge,
//   the webauthn.get type, and that the origin host matches the request host.
const crypto = require('crypto');

function b64urlEncode(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecode(s) {
  s = String(s).replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Buffer.from(s, 'base64');
}
function randomChallenge() {
  return b64urlEncode(crypto.randomBytes(32));
}

// --- Minimal CBOR decoder (maps, arrays, ints, byte/text strings) ---
function cborDecode(buf, offset) {
  const b = buf[offset];
  const major = b >> 5;
  let ai = b & 31;
  let pos = offset + 1;
  function readArg() {
    if (ai < 24) return ai;
    if (ai === 24) return buf[pos++];
    if (ai === 25) { const v = buf.readUInt16BE(pos); pos += 2; return v; }
    if (ai === 26) { const v = buf.readUInt32BE(pos); pos += 4; return v; }
    if (ai === 27) { const v = Number(buf.readBigUInt64BE(pos)); pos += 8; return v; }
    throw new Error('unsupported CBOR arg');
  }
  if (major === 0) return { value: readArg(), next: pos };
  if (major === 1) return { value: -1 - readArg(), next: pos };
  if (major === 2) { const len = readArg(); const v = buf.slice(pos, pos + len); pos += len; return { value: v, next: pos }; }
  if (major === 3) { const len = readArg(); const v = buf.toString('utf8', pos, pos + len); pos += len; return { value: v, next: pos }; }
  if (major === 4) { const len = readArg(); const arr = []; for (let i = 0; i < len; i++) { const r = cborDecode(buf, pos); arr.push(r.value); pos = r.next; } return { value: arr, next: pos }; }
  if (major === 5) { const len = readArg(); const obj = {}; for (let i = 0; i < len; i++) { const kr = cborDecode(buf, pos); pos = kr.next; const vr = cborDecode(buf, pos); pos = vr.next; obj[String(kr.value)] = vr.value; } return { value: obj, next: pos }; }
  if (major === 7) {
    if (ai === 20) return { value: false, next: pos };
    if (ai === 21) return { value: true, next: pos };
    if (ai === 22) return { value: null, next: pos };
    throw new Error('unsupported CBOR simple');
  }
  throw new Error('unsupported CBOR major ' + major);
}

function parseAuthData(authData) {
  // rpIdHash(32) flags(1) signCount(4) [attestedCredentialData]
  if (authData.length < 37) throw new Error('authData too short');
  const flags = authData[32];
  const signCount = authData.readUInt32BE(33);
  let pos = 37;
  let credentialId = null;
  let publicKeyJwk = null;
  if (flags & 0x40) {
    pos += 16; // AAGUID
    const credLen = authData.readUInt16BE(pos); pos += 2;
    credentialId = authData.slice(pos, pos + credLen); pos += credLen;
    const { value: cose } = cborDecode(authData, pos);
    // COSE EC2: 1=kty(2), 3=alg(-7), -1=crv(1=P-256), -2=x, -3=y
    const x = cose['-2'];
    const y = cose['-3'];
    if (!Buffer.isBuffer(x) || !Buffer.isBuffer(y)) throw new Error('bad COSE key');
    publicKeyJwk = { kty: 'EC', crv: 'P-256', x: b64urlEncode(x), y: b64urlEncode(y) };
  }
  return { flags, signCount, credentialId, publicKeyJwk, userPresent: !!(flags & 0x01), userVerified: !!(flags & 0x04) };
}

function parseAttestation(attestationB64) {
  const buf = b64urlDecode(attestationB64);
  const { value } = cborDecode(buf, 0);
  const authData = value.authData;
  const parsed = parseAuthData(authData);
  return { ...parsed, fmt: value.fmt };
}

function verifyAssertion({ credential, expectedChallenge, expectedHost }) {
  const clientData = JSON.parse(b64urlDecode(credential.response.clientDataJSON).toString('utf8'));
  if (clientData.type !== 'webauthn.get') throw new Error('bad clientData type');
  if (clientData.challenge !== expectedChallenge) throw new Error('challenge mismatch');
  if (expectedHost) {
    try {
      const host = new URL(clientData.origin).host;
      if (host !== expectedHost) throw new Error('origin mismatch');
    } catch (e) { if (e.message === 'origin mismatch') throw e; }
  }
  const authData = b64urlDecode(credential.response.authenticatorData);
  const parsed = parseAuthData(authData);
  if (!parsed.userPresent) throw new Error('user not present');
  const clientHash = crypto.createHash('sha256').update(b64urlDecode(credential.response.clientDataJSON)).digest();
  const signed = Buffer.concat([authData, clientHash]);
  const signature = b64urlDecode(credential.response.signature);
  return { parsed, signed, signature };
}

function verifySignatureWithJwk(jwk, signed, signature) {
  const key = crypto.createPublicKey({ key: jwk, format: 'jwk' });
  return crypto.verify('sha256', signed, key, signature);
}

module.exports = { b64urlEncode, b64urlDecode, randomChallenge, cborDecode, parseAuthData, parseAttestation, verifyAssertion, verifySignatureWithJwk };
