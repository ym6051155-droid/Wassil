# وصل — Wassil (demo)

Independent, deployable source code for the Wassil demo banking web app.
**Demo / fake data only. No real money, no real bank integration, no real
market prices.** All balances, card numbers, exchange rates and investment
prices in this app are invented demo values, labelled "تجريبي" (demo) in the UI.

Original Wassil teal branding only. No Bank of Khartoum / Bankak logo,
trade dress, or layout is used.

## Stack

- Node.js (>= 18) only — **no npm dependencies**. `node server.js` just works.
- Backend: `server.js` + `lib/db.js` (JSON file store), `lib/auth.js`
  (scrypt password hashing), `lib/webauthn.js` (minimal CBOR + real
  WebAuthn assertion-signature verification).
- Frontend: vanilla HTML/CSS/JS in `public/` (no build step).
- Database: `data/db.json`, created on first run. It starts empty and is
  intentionally excluded from any zip / git export.

## Run

```sh
# 1. (Optional, for the admin account) set an admin password in your shell.
#    Do NOT write it into any file in this repo.
export ADMIN_PASSWORD   # set to a strong password of your choosing, in your shell only
# 2. Start the server (default port 3000; set PORT to change it).
node server.js
# 3. Open http://localhost:3000
```

On first start with `ADMIN_PASSWORD` set, an admin account is auto-created:
email `admin@wassil.demo`, password = the value of `ADMIN_PASSWORD`.
If `ADMIN_PASSWORD` is not set, no admin account is created and the server
logs a warning (the password is never logged and never stored in a file).
To create an admin later, stop the server, set `ADMIN_PASSWORD`, and start
again — the admin is created once and is not overwritten afterwards.

## Create a test user

1. Open the app, choose **إنشاء حساب / Sign up**.
2. Enter an email, a 4-part Arabic name, a 4-part English name in Latin
   letters, and a password (3-part names are rejected with a clear message).
3. The demo activation code is shown **in the app** with an explicit
   "no real email sent" warning. Enter it to activate.
4. Activation issues an SDG account (1001 series) and an FX account
   (2002 series), both starting at 0, and the account appears in the
   admin dashboard automatically.
5. Log in as admin and fund the test account from the admin dashboard,
   then test transfers, FX funding, cards, deposits and investments.

## Features (all demo)

- Email signup (quadruple Arabic + English names), demo activation code,
  auto account numbers, admin dashboard (users, funding, transactions).
- SDG account + USD foreign-currency account per user. FX funding from SDG
  only at **1 USD = 10,000 SDG** with review; FX-to-FX transfers by FX number
  with name check + review; SDG user-to-user transfers by account number.
- Visa Cards ("فيزا كارت", not debit): request for 100,000 SDG, max 5 active
  cards, 5-year validity, USD-only balance, dedicated card page (card on top,
  icons below, card transaction history below the icons), masked details by
  default, eye icon toggles full details + copy button ("تم نسخ رقم البطاقة"),
  card-to-card transfers in USD only, card top-up **from the FX account only**
  (a direct SDG top-up is blocked with a clear FX-only message), freeze/unfreeze,
  CVV change (requires password), daily-limit change. Cancelling a card is
  final: the 100,000 SDG issuance fee is non-refundable, and any remaining USD
  balance stays locked on the cancelled card and does not return to the account
  (stated explicitly in the cancel confirmation in the UI).
- Term deposits: 24h / week / month / 3 / 6 months / year; annual fake rates
  <1,000,000 SDG = 12%, 1,000,000–<10,000,000 = 15%, 10,000,000–<1,000,000,000
  = 20%, >=1,000,000,000 = 30%; profit = principal × rate × (days ÷ 365);
  rate, duration, expected profit, maturity date and total shown on review.
- Demo investment (services list): currencies USD 10,000 / EUR 10,850 /
  AED 2,720 SDG, gold 185,000 SDG/gram, generic demo stocks STK-A/B/C — all
  fake announced prices. Buy from SDG, sell to SDG, review, portfolio
  (quantity, avg price, current demo price, value, profit/loss), buy/sell log.
- Full transaction receipts: tapping any history row opens a standalone
  receipt page (type, amount + currency, sender/recipient + accounts,
  date/time, reference, status, visible "تجريبي" badge + demo warning, back
  buttons) with a download icon that saves the receipt as a PNG named
  `wassil-receipt-<reference>.png` with the demo badge drawn into the image.
- Real WebAuthn fingerprint login: enroll from the security centre after
  password login; the key is bound to that account + device only; the
  fingerprint image is never stored and never leaves the device; a
  "تسجيل الدخول بالبصمة" button on the login screen; clear no-key /
  unsupported messages; password login always remains as a fallback;
  deactivation from settings.
- Full Arabic/English switch (toggle on login and in-app, LTR in English,
  RTL in Arabic, choice persisted, default Arabic). The services list
  contains **no** foreign-currency entry; the FX account is reachable from
  home, the accounts list, the profile and its dedicated page.
- Simple demo extras: bills, standing orders, savings goals, branches/ATMs
  list, support FAQ (stating it is not real bank support), notifications
  (recent transactions).

## Honest limitations

- WebAuthn: login assertion signatures **are** verified with the stored
  public key (challenge, type, origin host and signature). Registration
  attestation certificate chains are **not** validated in this demo build
  (the credential public key is extracted from authenticator data); a
  production deployment must use a full WebAuthn library with attestation
  validation.
- Investment demo prices are fixed announced prices, so profit/loss stays
  zero while prices do not move. The profit/loss formula itself
  (current value − purchase cost) is implemented correctly.
- The database is a single JSON file — fine for a demo, not for production
  concurrency. Passwords are scrypt-hashed; demo activation codes and card
  numbers are fake values stored for the demo only.

## Deploy

Any host that runs Node.js 18+ works: copy the folder, set `PORT` and
`ADMIN_PASSWORD` in the host environment (not in a file), run
`node server.js` (or a process manager such as `pm2 start server.js`).
No build step and no `npm install` are required because there are no
dependencies.
