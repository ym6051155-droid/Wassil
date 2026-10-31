// Wassil demo frontend (vanilla JS, no build step).
const I18N = {
  login:{ar:'تسجيل الدخول',en:'Login'}, signup:{ar:'إنشاء حساب',en:'Sign up'},
  email:{ar:'البريد الإلكتروني',en:'Email'}, password:{ar:'كلمة المرور',en:'Password'},
  nameAr:{ar:'الاسم الرباعي بالعربية',en:'Full name (Arabic, 4 parts)'},
  nameEn:{ar:'الاسم الرباعي بالإنجليزية',en:'Full name (English, 4 parts)'},
  home:{ar:'الرئيسية',en:'Home'}, services:{ar:'الخدمات',en:'Services'},
  transfer:{ar:'تحويل',en:'Transfer'}, cards:{ar:'بطاقاتي',en:'My cards'},
  fx:{ar:'الحساب الأجنبي',en:'FX account'}, deposits:{ar:'الودائع',en:'Deposits'},
  invest:{ar:'استثمار',en:'Investment'}, admin:{ar:'لوحة الأدمن',en:'Admin dashboard'},
  security:{ar:'مركز الأمان',en:'Security centre'}, back:{ar:'رجوع',en:'Back'},
  logout:{ar:'خروج',en:'Logout'}, send:{ar:'إرسال',en:'Submit'},
  toAccount:{ar:'رقم حساب المستلم',en:'Recipient account number'},
  amount:{ar:'المبلغ',en:'Amount'}, review:{ar:'مراجعة',en:'Review'},
  confirm:{ar:'تأكيد',en:'Confirm'}, cancel:{ar:'إلغاء',en:'Cancel'},
  freeze:{ar:'تجميد',en:'Freeze'}, unfreeze:{ar:'إلغاء التجميد',en:'Unfreeze'},
  cancelCard:{ar:'إلغاء البطاقة',en:'Cancel card'}, changeCvv:{ar:'تغيير CVV',en:'Change CVV'},
  topup:{ar:'شحن البطاقة',en:'Top up card'}, cardTransfer:{ar:'تحويل بين البطاقات',en:'Card-to-card transfer'},
  dailyLimit:{ar:'تغيير الحد اليومي',en:'Change daily limit'},
  viewDetails:{ar:'عرض التفاصيل',en:'View details'}, copyNum:{ar:'نسخ رقم البطاقة',en:'Copy card number'},
  copied:{ar:'تم نسخ رقم البطاقة',en:'Card number copied'},
  receipt:{ar:'إشعار المعاملة',en:'Transaction receipt'},
  downloadReceipt:{ar:'تحميل صورة الإشعار',en:'Download receipt image'},
  downloaded:{ar:'تم تحميل صورة الإشعار',en:'Receipt image downloaded'},
  fundFx:{ar:'شحن الحساب الأجنبي',en:'Fund FX account'},
  fxTransfer:{ar:'تحويل أجنبي',en:'FX transfer'},
  newCard:{ar:'طلب بطاقة جديدة',en:'Request new card'},
  history:{ar:'سجل المعاملات',en:'Transaction history'},
  cardHistory:{ar:'سجل معاملات البطاقة',en:'Card transaction history'},
  bills:{ar:'الفواتير',en:'Bills'}, goals:{ar:'أهداف الادخار',en:'Savings goals'},
  orders:{ar:'الأوامر المستديمة',en:'Standing orders'}, branches:{ar:'الفروع',en:'Branches'},
  faq:{ar:'الأسئلة الشائعة',en:'FAQ'}, notifications:{ar:'الإشعارات',en:'Notifications'},
  fingerprintLogin:{ar:'تسجيل الدخول بالبصمة',en:'Fingerprint login'},
  enableFingerprint:{ar:'تفعيل الدخول بالبصمة',en:'Enable fingerprint login'},
  disableFingerprint:{ar:'إلغاء تفعيل البصمة',en:'Disable fingerprint login'},
  welcome:{ar:'مرحباً بك في وصل',en:'Welcome to Wassil'},
  bankServices:{ar:'خدمات مصرفية',en:'Banking services'},
  tagline:{ar:'قروشك توصل... بساهلة',en:'Your money arrives... easily'},
  demoNote:{ar:'نموذج للتعلم — بيانات للتجربة، ولا توجد أي أموال حقيقية.',en:'Learning model only — trial data, no real money.'},
  fpUnavailable:{ar:'البصمة غير متاحة على هذا الجهاز/المتصفح — لا يمكن تسجيل الدخول بالبصمة هنا. سجّل الدخول بكلمة المرور كالمعتاد.',en:'Fingerprint is not available on this device/browser — fingerprint login is not possible here. Sign in with your password as usual.'},
  availableBalance:{ar:'الرصيد المتاح — الحساب الجاري',en:'Available balance — Current account'},
  fxLabel:{ar:'الحساب الأجنبي — بالدولار فقط',en:'FX account — USD only'},
  cardsBalance:{ar:'رصيد بطاقاتك',en:'Your cards balance'},
  latestOps:{ar:'آخر العمليات',en:'Latest operations'},
  showAll:{ar:'عرض الكل',en:'Show all'},
  myAccount:{ar:'حسابي',en:'My account'},
  bankServicesPage:{ar:'خدمات البنك',en:'Bank services'},
  allServicesInOne:{ar:'كل وحدات وصل في مكان واحد.',en:'All Wassil units in one place.'},
  beneficiaries:{ar:'المستفيدون',en:'Beneficiaries'},
  demoClient:{ar:'عميل — وصل',en:'Client — Wassil'},
  statement:{ar:'كشف حساب',en:'Statement'},
  qrShare:{ar:'شارك رمز وصل',en:'Share Wassil code'},
  cannotLogin:{ar:'لا تستطيع تسجيل الدخول؟',en:"Can't sign in?"},
  newSignup:{ar:'تسجيل جديد؟',en:'New sign up?'},
  about:{ar:'عن وصل',en:'About Wassil'},
  locations:{ar:'مواقعنا',en:'Our locations'},
  support:{ar:'المساعدة',en:'Help'},
  active:{ar:'مفعّل',en:'Active'},
  loanCalc:{ar:'محاكاة تمويل',en:'Loan simulator'},
  qrNote:{ar:'رمز حقيقي: مسحه بيفتح تحويل لهذا الحساب.',en:'A real code: scanning it opens a transfer to this account.'},
  backHome:{ar:'رجوع للرئيسية',en:'Back to home'},
  backServices:{ar:'رجوع للخدمات',en:'Back to services'},
  backCards:{ar:'رجوع لبطاقاتي',en:'Back to my cards'},
  backStatement:{ar:'رجوع إلى السجل',en:'Back to statement'},
  receiptTitle:{ar:'إشعار العملية',en:'Transaction receipt'},
  receiptSub:{ar:'صورة إشعار كاملة لعملية التحويل أو العملية المحددة — بكل تفاصيلها كما سجّلتها في وصل.',en:'A full receipt image for the selected transfer or operation, with every detail as recorded in Wassil.'},
  statementSub:{ar:'ملخص عمليات حسابك المحفوظ.',en:'A summary of your saved account operations.'},
  downloadText:{ar:'تنزيل الكشف كنص',en:'Download statement as text'},
  totalIn:{ar:'إجمالي الوارد',en:'Total inbound'},
  totalOut:{ar:'إجمالي الصادر',en:'Total outbound'},
  opsCount:{ar:'عدد العمليات',en:'Operations count'},
  depositsTitle:{ar:'ودائع لأجل',en:'Term deposits'},
  depositsIntro:{ar:'افتح وديعة من رصيدك بالجنيه. نسبة الأرباح السنوية تزداد حسب مبلغ الوديعة، وتُحسب الأرباح بالتناسب مع المدة:',en:'Open a deposit from your SDG balance. The annual profit rate rises with the deposit amount and is prorated by duration:'},
  openDeposit:{ar:'فتح الوديعة',en:'Open deposit'},
  myDeposits:{ar:'ودائعي',en:'My deposits'},
  fxIntro:{ar:'حسابك بالدولار الأمريكي (USD) فقط — له رقم حساب خاص يختلف عن رقم حسابك بالجنيه، ولا يظهر رصيده بالجنيه أبداً.',en:'Your US Dollar (USD) account only — it has its own account number, different from your SDG account, and its balance is never shown in SDG.'},
  fxDetails:{ar:'تفاصيل الحساب الأجنبي',en:'FX account details'},
  fundFxShort:{ar:'شحن الحساب الأجنبي',en:'Fund FX account'},
  fxTransferShort:{ar:'تحويل من الحساب الأجنبي',en:'FX transfer'},
  topupFromFx:{ar:'شحن بطاقة من الأجنبي',en:'Top up card from FX'},
  registeredUsers:{ar:'المستخدمون المسجلون',en:'Registered users'},
  savedBeneficiaries:{ar:'المستفيدون المحفوظون',en:'Saved beneficiaries'},
  fxHistory:{ar:'سجل الحساب الأجنبي',en:'FX account history'},
  cardTopupTitle:{ar:'شحن البطاقة من الحساب الأجنبي',en:'Top up card from FX account'},
  cardTopupIntro:{ar:'البطاقة تُشحن من حسابك الأجنبي فقط، والمبلغ بالدولار: ينقص حسابك الأجنبي ويزيد رصيد بطاقتك بالدولار — رصيد البطاقة بالدولار فقط، ولا تُشحن من حساب الجنيه مباشرة.',en:'A card is topped up from your FX account only, in USD: your FX account decreases and your card balance in USD increases — card balances are USD only and are never topped up directly from the SDG account.'},
  cardTransferTitle:{ar:'تحويل من بطاقة إلى بطاقة',en:'Card-to-card transfer'},
  cardTransferIntro:{ar:'التحويل هنا من بطاقة إلى بطاقة فقط (لا إلى حساب بنكي)، والمبلغ بالدولار لأن أرصدة البطاقات بالدولار فقط.',en:'Transfers here are card-to-card only (not to a bank account), and the amount is in USD because card balances are USD only.'},
  reviewTopup:{ar:'مراجعة الشحن',en:'Review top-up'},
  reviewTransfer:{ar:'مراجعة التحويل',en:'Review transfer'},
  cardsIntro:{ar:'بطاقات محفوظة — رصيد كل بطاقة بالدولار الأمريكي (USD) فقط، وتفاصيلها مخفية ومقفلة. افتح صفحة البطاقة، واضغط أيقونة العين لعرضها كاملة ونسخ رقمها.',en:'Saved cards — each card balance is in US Dollars (USD) only, and its details are hidden and locked. Open a card page and tap the eye icon to show its full details and copy its number.'},
  fpNoticeTitle:{ar:'البصمة لعرض التفاصيل',en:'Fingerprint for details'},
  newCardTitle:{ar:'طلب بطاقة فيزا كارت جديدة',en:'Request a new Visa Card'},
  newCardDesc:{ar:'بطاقة فيزا كارت برصيد بالدولار فقط، صالحة 5 سنوات من تاريخ الإصدار. سعر الإصدار يُخصم من حسابك بالجنيه عند الطلب، وهو غير مسترد عند إلغاء البطاقة.',en:'A Visa Card with a USD-only balance, valid for 5 years from issuance. The issuance fee is debited from your SDG account on request and is non-refundable if the card is cancelled.'},
  issueFee:{ar:'سعر الإصدار',en:'Issuance fee'},
  validity:{ar:'الصلاحية',en:'Validity'},
  yourBalance:{ar:'رصيد حسابك',en:'Your balance'},
  activeCards:{ar:'بطاقاتك النشطة',en:'Your active cards'},
  cardPageTitle:{ar:'صفحة البطاقة',en:'Card page'},
  cardOptions:{ar:'خيارات البطاقة',en:'Card options'},
  cardHistoryTitle:{ar:'سجل معاملات البطاقة',en:'Card transaction history'},
  cancelCardBtn:{ar:'إلغاء البطاقة',en:'Cancel card'},
  transferTitle:{ar:'تحويل الأموال',en:'Money transfer'},
  transferIntro:{ar:'تحويل بين حسابات وصل المسجّلة — اختر مستخدماً مسجلاً أو اكتب رقم حسابه.',en:'Transfer between registered Wassil accounts — pick a registered user or type their account number.'},
  beneficiary:{ar:'المستفيد',en:'Beneficiary'},
  chooseUser:{ar:'— اختر مستخدماً مسجلاً —',en:'— Pick a registered user —'},
  otherAccount:{ar:'حساب آخر (اكتب الرقم)',en:'Other account (type the number)'},
  sourceBalance:{ar:'رصيد بطاقة المصدر',en:'Source card balance'},
  recipientCard:{ar:'رقم بطاقة المستلم الكامل',en:'Recipient full card number'},
  noteOptional:{ar:'ملاحظة (اختياري)',en:'Note (optional)'},
  sourceCard:{ar:'بطاقتك (المصدر)',en:'Your card (source)'},
  topupSource:{ar:'مصدر الشحن',en:'Top-up source'},
  cardToTopup:{ar:'البطاقة المراد شحنها',en:'Card to top up'},
  topupAmount:{ar:'مبلغ الشحن (USD)',en:'Top-up amount (USD)'},
  amountUsd:{ar:'المبلغ (USD)',en:'Amount (USD)'},
  amountSdg:{ar:'المبلغ (ج.س)',en:'Amount (SDG)'},
  operationOnAccount:{ar:'عملية على حسابك',en:'Operation on your account'},
  demoReceiptNote:{ar:'إشعار من وصل — العملية داخل النموذج التعليمي ولا تمثّل تحويلاً حقيقياً أو أموالاً حقيقية.',en:'Receipt from Wassil — the operation is inside the learning model and does not represent a real transfer or real money.'},
};

let lang = localStorage.getItem('wassil-lang') || 'ar';
let token = localStorage.getItem('wassil-token') || '';
let me = null;
let view = 'login';
let selCard = null, selTx = null, dash = null;
let transferTab = 'users', fxAction = 'fund', ctCardId = null, ccFromId = null;
function backLink(label, v){ return `<button type="button" class="back-link" onclick="go('${v}')">${esc(label)} ›</button>`; }
function detailRow(label, value){ return `<div class="detail-row"><span class="detail-label">${esc(label)}</span><b class="detail-value">${value}</b></div>`; }
function qrPayloadForAccount(acct){ return window.location.origin + '/?to=' + encodeURIComponent(acct || ''); }
function renderRealQrs(){
  document.querySelectorAll('[data-qr]').forEach(el => {
    if (el.dataset.qrDone) return; el.dataset.qrDone = '1';
    const text = el.dataset.qr || ''; const size = parseInt(el.dataset.qrSize || '220', 10);
    try {
      if (window.QRCode) { new QRCode(el, { text, width: size, height: size, correctLevel: QRCode.CorrectLevel.M }); }
      else { const img = document.createElement('img'); img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&margin=8&qzone=1&data=' + encodeURIComponent(text); img.alt = 'QR'; img.style.width = size + 'px'; img.style.height = size + 'px'; el.appendChild(img); }
    } catch (e) { el.textContent = lang === 'en' ? 'QR unavailable' : 'الرمز غير متاح'; }
  });
}
let scanStream = null, scanRaf = null;
function stopScan(){ if (scanRaf) cancelAnimationFrame(scanRaf); scanRaf = null; if (scanStream) { scanStream.getTracks().forEach(t => t.stop()); scanStream = null; } }
async function startScan(){
  const st = $('#scan-status'); if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { if (st) st.textContent = lang === 'en' ? 'Camera is not available on this device/browser.' : 'الكاميرا غير متاحة على هذا الجهاز/المتصفح.'; return; }
  try {
    scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const v = $('#scan-video'); if (!v) return; v.srcObject = scanStream; await v.play();
    const loop = () => {
      if (!scanStream) return;
      if (v.readyState === v.HAVE_ENOUGH_DATA) {
        const cv = $('#scan-canvas'); if (cv) { cv.width = v.videoWidth; cv.height = v.videoHeight; const ctx = cv.getContext('2d'); ctx.drawImage(v, 0, 0); if (window.jsQR) { const code = jsQR(ctx.getImageData(0, 0, cv.width, cv.height).data, cv.width, cv.height); if (code && code.data) { stopScan(); onQrScanned(code.data); return; } } }
      }
      scanRaf = requestAnimationFrame(loop);
    };
    loop();
  } catch (e) { if (st) st.textContent = lang === 'en' ? 'Camera permission was denied or unavailable.' : 'تم رفض إذن الكاميرا أو هي غير متاحة.'; }
}
function onQrScanned(data){
  const s = String(data || '').trim();
  let to = '';
  try { const u = new URL(s); to = u.searchParams.get('to') || ''; } catch {}
  if (!to && /^\d{4}$/.test(s)) to = s;
  if (to) { window._pendingTo = to; toast(lang === 'en' ? 'QR scanned — opening transfer' : 'تم مسح الرمز — فتح التحويل'); go(me ? 'transfer' : 'login'); return; }
  toast(lang === 'en' ? 'This QR is not a Wassil transfer code.' : 'هذا الرمز ليس رمز تحويل وصل.', 'err');
}
function durationLabel(days){
  const d = Number(days);
  return lang === 'en'
    ? ({1:'24 hours (1 day)',7:'Week (7 days)',30:'Month (30 days)',90:'3 months (90 days)',180:'6 months (180 days)',365:'Year (365 days)'})[d] || (d + ' days')
    : ({1:'24 ساعة (يوم واحد)',7:'أسبوع (7 أيام)',30:'شهر (30 يوماً)',90:'3 أشهر (90 يوماً)',180:'6 أشهر (180 يوماً)',365:'سنة (365 يوماً)'})[d] || (d + ' يوم');
}
function statusLabel(s){ if (s === 'active') return lang === 'en' ? 'Active' : 'نشطة'; if (s === 'frozen') return lang === 'en' ? 'Frozen' : 'مجمّدة'; return esc(s || ''); }
const $ = (s) => document.querySelector(s);
function getDeviceId(){ let id = localStorage.getItem('wassil-device-id'); if (!id) { id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('dev-' + Date.now() + '-' + Math.random().toString(36).slice(2)); localStorage.setItem('wassil-device-id', id); } return id; }
const app = () => document.getElementById('app');
function t(k){ const v = I18N[k]; return v ? (lang === 'en' ? v.en : v.ar) : k; }
function nameOf(u){ return lang === 'en' && u && u.fullNameEn ? u.fullNameEn : (u ? u.fullNameAr : ''); }
function toast(msg, kind){ const el = $('#toast'); el.textContent = msg; el.classList.toggle('err', kind === 'err'); el.classList.remove('hidden'); setTimeout(()=>el.classList.add('hidden'), 3000); }
const SECURITY_QUESTIONS = [
  { id: 'school', ar: 'ما اسم مدرستك الابتدائية؟', en: 'What was your primary school?' },
  { id: 'pet', ar: 'ما اسم أول حيوان أليف لك؟', en: "What was your first pet's name?" },
  { id: 'birthcity', ar: 'في أي مدينة وُلدت؟', en: 'In which city were you born?' },
  { id: 'friend', ar: 'ما اسم صديق طفولتك المقرب؟', en: "What is your childhood best friend's name?" },
  { id: 'fatherjob', ar: 'ما مهنة والدك؟', en: "What is your father's profession?" },
  { id: 'teacher', ar: 'ما اسم أول معلم تتذكره؟', en: 'What is the first teacher you remember?' },
];
function qText(q){ return lang === 'en' ? q.en : q.ar; }
function friendlyErr(m){
  const map = {
    pin_required: lang === 'en' ? 'Enter your 4-digit PIN' : 'أدخل رمز PIN المكون من 4 أرقام',
    pin_incorrect: lang === 'en' ? 'Wrong PIN — try again' : 'رمز PIN غير صحيح — حاول مجدداً',
    pin_locked: lang === 'en' ? 'PIN checks are locked for 5 minutes after repeated wrong attempts' : 'تم قفل التحقق بالـ PIN لمدة 5 دقائق بعد محاولات خاطئة متكررة',
    reset_failed: lang === 'en' ? 'The answers did not match' : 'الإجابات غير مطابقة',
    no_pin: lang === 'en' ? 'No PIN set yet' : 'لم يتم ضبط رمز PIN بعد',
    pin_exists: lang === 'en' ? 'A PIN is already set — change it instead' : 'رمز PIN مضبوط بالفعل — غيّره بدلاً من ذلك',
    bad_proof: lang === 'en' ? 'Current PIN or password is wrong' : 'رمز PIN الحالي أو كلمة المرور غير صحيحة',
    bad_password: lang === 'en' ? 'Password is wrong' : 'كلمة المرور غير صحيحة',
    bad_pin: lang === 'en' ? 'PIN must be exactly 4 digits' : 'رمز PIN يجب أن يكون 4 أرقام بالضبط',
    bad_beneficiary: lang === 'en' ? 'Account not found' : 'الحساب غير موجود',
    cannot_add_self: lang === 'en' ? 'You cannot add yourself' : 'لا يمكنك إضافة نفسك',
    beneficiary_exists: lang === 'en' ? 'Already a beneficiary' : 'مضاف بالفعل كمستفيد',
  };
  return map[m] || m;
}
function pinSheet(title){
  return new Promise((resolve) => {
    const back = document.createElement('div'); back.className = 'sheet-back';
    back.innerHTML = `<div class="sheet"><div class="sheet-title">${esc(title)}</div>
    <input id="pin-inp" type="password" inputmode="numeric" maxlength="4" autocomplete="off" style="font-size:24px;letter-spacing:12px;text-align:center">
    <div class="sheet-actions"><button type="button" class="btn secondary" id="sheet-cancel">${esc(lang === 'en' ? 'Cancel' : 'إلغاء')}</button><button type="button" class="btn" id="sheet-ok">${esc(lang === 'en' ? 'Confirm' : 'تأكيد')}</button></div></div>`;
    const done = (v) => { back.remove(); resolve(v); };
    back.querySelector('#sheet-ok').onclick = () => { const v = back.querySelector('#pin-inp').value.trim(); if (!/^\d{4}$/.test(v)) { back.querySelector('#pin-inp').style.borderColor = '#dc2626'; return; } done(v); };
    back.querySelector('#sheet-cancel').onclick = () => done(null);
    back.onclick = (e) => { if (e.target === back) done(null); };
    document.body.appendChild(back);
    const inp = back.querySelector('#pin-inp'); setTimeout(() => inp.focus(), 50);
  });
}
function qtySheet(title){
  return new Promise((resolve) => {
    const back = document.createElement('div'); back.className = 'sheet-back';
    back.innerHTML = `<div class="sheet"><div class="sheet-title">${esc(title)}</div>
    <input id="qty-inp" type="number" inputmode="decimal" min="0" step="any" autocomplete="off" style="font-size:22px;text-align:center">
    <div class="sheet-actions"><button type="button" class="btn secondary" id="sheet-cancel">${esc(lang === 'en' ? 'Cancel' : 'إلغاء')}</button><button type="button" class="btn" id="sheet-ok">${esc(lang === 'en' ? 'Confirm' : 'تأكيد')}</button></div></div>`;
    const done = (v) => { back.remove(); resolve(v); };
    back.querySelector('#sheet-ok').onclick = () => { const v = back.querySelector('#qty-inp').value.trim(); if (!(Number(v) > 0)) { back.querySelector('#qty-inp').style.borderColor = '#dc2626'; return; } done(v); };
    back.querySelector('#sheet-cancel').onclick = () => done(null);
    back.onclick = (e) => { if (e.target === back) done(null); };
    document.body.appendChild(back);
    const inp = back.querySelector('#qty-inp'); setTimeout(() => inp.focus(), 50);
  });
}
// In-app confirmation sheet (Wassil design) — replaces the browser's native
// confirm() dialog, whose title bar showed the site URL and clashed with the app.
function confirmSheet({ title, lines = [], note = '', confirmLabel, cancelLabel, danger = false }) {
  return new Promise((resolve) => {
    const back = document.createElement('div'); back.className = 'sheet-back';
    const rows = lines.map(([l, v]) => `<div class="sheet-row"><span class="sheet-label">${esc(l)}</span><span class="sheet-value">${esc(v)}</span></div>`).join('');
    back.innerHTML = `<div class="sheet"><div class="sheet-title">${esc(title)}</div>${rows}${note ? `<p class="sheet-note">${esc(note)}</p>` : ''}<div class="sheet-actions"><button type="button" class="btn secondary" id="sheet-cancel">${esc(cancelLabel || (lang === 'en' ? 'Cancel' : 'إلغاء'))}</button><button type="button" class="btn" id="sheet-ok" ${danger ? 'style="background:#dc2626"' : ''}>${esc(confirmLabel || (lang === 'en' ? 'Confirm' : 'تأكيد'))}</button></div></div>`;
    const done = (v) => { back.remove(); resolve(v); };
    back.querySelector('#sheet-ok').onclick = () => done(true);
    back.querySelector('#sheet-cancel').onclick = () => done(false);
    back.onclick = (e) => { if (e.target === back) done(false); };
    document.body.appendChild(back);
  });
}
function setLang(l){ lang = l; localStorage.setItem('wassil-lang', l); document.documentElement.lang = l; document.documentElement.dir = l === 'en' ? 'ltr' : 'rtl'; const lb = $('#langBtn'); if (lb) lb.textContent = l === 'en' ? 'عربي' : 'EN'; render(); }
async function api(path, opts={}) {
  const r = await fetch(path, { ...opts, headers: { 'Content-Type':'application/json', ...(token?{Authorization:'Bearer '+token}:{}), ...(opts.headers||{}) } });
  const j = await r.json().catch(()=>({}));
  if (!r.ok) throw new Error(j.error || 'error');
  return j;
}
function esc(s){ return String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function moneySdg(n){ return (n||0).toLocaleString('en-US') + (lang === 'en' ? ' SDG' : ' ج.س'); }
function brandName(){ return lang === 'en' ? 'Wassil' : 'وصّل'; }
function moneyUsd(cents){ return ((cents||0)/100).toFixed(2) + ' USD'; }
function txTitle(tx){ return lang === 'en' ? (tx.titleEn || tx.titleAr) : (tx.titleAr || tx.titleEn); }
function txAmount(tx){
  if (tx.currency === 'USD' && tx.amountUsdCents != null) return (tx.amountUsdCents >= 0 ? '+' : '') + moneyUsd(tx.amountUsdCents);
  return (tx.amountSdg >= 0 ? '+' : '') + moneySdg(tx.amountSdg);
}
function go(v){ if (view === 'scan' && v !== 'scan') stopScan(); if (view === 'statement' && v !== 'statement') { stopStmtPoll(); stmtTxs = null; } view = v; render(); }
async function loadDash(){ try { dash = await api('/api/dashboard'); me = dash.user; } catch { me = null; } }
let showBal = true;
function toggleBal(){ showBal = !showBal; render(); }
function toggleLang(){ setLang(lang === 'en' ? 'ar' : 'en'); }
const IC = {
  transfer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15"/><path d="M14 6l6 6-6 6"/></svg>',
  receipt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  qr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14h-3"/></svg>',
  card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h4"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></svg>',
  bank:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6M4 10v9M20 10v9M8 14v5M16 14v5M2 19h20"/></svg>',
  dollar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1.4-1.3-2-3-2s-3 .7-3 2c0 3 6 1 6 4 0 1.3-1.3 2-3 2s-3-.6-3-2"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 9a6 6 0 10-12 0c0 6-2 7-2 7h16s-2-1-2-7"/><path d="M10 20a2 2 0 004 0"/></svg>',
  logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7v.5"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  headset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0116 0"/><rect x="3" y="13" width="4" height="6" rx="2"/><rect x="17" y="13" width="4" height="6" rx="2"/></svg>',
  policy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 19c1-3 3.5-4.5 6.5-4.5s5.5 1.5 6.5 4.5"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.5c2.5.3 4.5 1.6 5.5 4"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  repeat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
  trend:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  calc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2M8 19h2M12 19h2M16 19h2"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
};
const ADMIN_WHATSAPP = '819043493101'; // wa.me digits for the number given as 00819043493101
const ADMIN_WHATSAPP_DISPLAY = '00819043493101';
function contactAdminLink(){ return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(lang === 'en' ? 'Hello, I need help with Wassil.' : 'مرحباً، أحتاج مساعدة في تطبيق وصل.')}`; }
function contactAdminRow(){ return `<a class="menu-row" style="text-decoration:none;color:inherit" href="${contactAdminLink()}" target="_blank" rel="noopener"><span class="acct-ic">${IC.whatsapp}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${lang === 'en' ? 'Contact management' : 'تواصل مع الإدارة'}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">WhatsApp ${ADMIN_WHATSAPP_DISPLAY}</span></span><span>›</span></a>`; }
const WAVE = '<svg viewBox="0 0 64 64" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 30c6-7 12-7 18 0s12 7 18 0" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity=".85"/><path d="M10 44c6-7 12-7 18 0s12 7 18 0" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/><circle cx="48" cy="14" r="5" fill="#ffffff"/></svg>';
const NOTIF_TYPES = ['transfer_in', 'fx_transfer_in', 'card_transfer_in', 'welcome_bonus', 'invite_bonus', 'invite_reward'];
function notifItems(txs){ return (txs || []).filter(t => NOTIF_TYPES.includes(t.type)); }
function notifSeenId(){ try { const v = localStorage.getItem('wassil-notif-seen'); return v === null ? null : Number(v); } catch { return null; } }
function notificationsView(){
  loadStmtTxs();
  const items = notifItems(stmtBaseTxs());
  const maxId = items.reduce((m, t) => Math.max(m, t.id || 0), 0);
  if (maxId) { try { localStorage.setItem('wassil-notif-seen', String(maxId)); } catch {} }
  const rows = items.map(opRow).join('') || `<p class="muted">${lang === 'en' ? 'No notifications yet' : 'لا توجد إشعارات بعد'}</p>`;
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('notifications')}</div><p class="page-sub">${lang === 'en' ? 'Your incoming money and bonuses — tap any notification to open its receipt.' : 'واردك والمكافآت — اضغط على أي إشعار لفتح إيصاله.'}</p>
  <div class="card">${rows}</div>`;
}
function userbar(){
  const seen = notifSeenId();
  const n = seen === null ? 0 : (dash?.transactions || []).filter(t => NOTIF_TYPES.includes(t.type) && (t.id || 0) > seen).length;
  const letter = (nameOf(me) || 'و').trim().charAt(0) || 'و';
  return `<div class="userbar"><div class="userbar-main"><div class="avatar">${esc(letter)}</div><div style="min-width:0"><div class="welcome">${t('welcome')}</div><div class="user-name">${esc(nameOf(me))}</div></div></div>
  <div class="userbar-actions"><button type="button" class="icon-pill lang" id="langBtn" onclick="toggleLang()">${lang === 'en' ? 'عربي' : 'EN'}</button><button type="button" class="icon-pill" aria-label="${t('notifications')}" onclick="go('notifications')">${IC.bell}${n ? `<span class="bell-dot">${n > 99 ? '99+' : n}</span>` : ''}</button><button type="button" class="icon-pill" aria-label="${t('logout')}" onclick="doLogout()">${IC.logout}</button></div></div>`;
}
function opRow(tx){
  const neg = (tx.currency === 'USD' ? (tx.amountUsdCents || 0) : (tx.amountSdg || 0)) < 0;
  const d = new Date(tx.createdAt);
  const dt = isNaN(d) ? '' : d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `<button type="button" class="op-row" onclick="openTx(${tx.id})"><span class="op-ic ${neg ? 'up' : 'down'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 ${neg ? '19' : '5'}V${neg ? '5' : '19'}"/><path d="M5 12l7 ${neg ? '-7' : '7'} 7 ${neg ? '7' : '-7'}"/></svg></span><span class="op-main"><span class="op-title" style="display:block">${esc(txTitle(tx))}</span><span class="op-meta" style="display:block">${dt} · ${esc(tx.ref || '')}</span></span><span class="op-amt ${neg ? 'neg' : 'pos'}">${esc(txAmount(tx))}</span></button>`;
}
function fmtDate(x){ const d = new Date(x); return isNaN(d) ? '' : d.toLocaleDateString('en-GB'); }


// ---------- views ----------
function loginView(){
  const fp = window.PublicKeyCredential
    ? `<button class="btn secondary" id="fpLoginBtn" onclick="doFpLogin()">${t('fingerprintLogin')}</button>`
    : `<div class="notice-amber">${t('fpUnavailable')}</div>`;
  return `<div class="auth-page"><div class="auth-hero-teal"><div class="auth-hero-top"><button type="button" class="icon-pill lang" id="langBtn" onclick="toggleLang()">${lang === 'en' ? 'عربي' : 'EN'}</button></div>
  <div class="auth-hero-brand" style="margin-top:22px"><div class="auth-logo-sm">${WAVE}</div><div><div class="auth-hero-name">${brandName()}</div><div class="auth-hero-sub">${t('bankServices')}</div></div></div></div>
  <div class="auth-card"><h2>${t('login')}</h2>
  <label>${lang === 'en' ? 'Email or account number' : 'البريد الإلكتروني أو رقم الحساب'}</label><div class="input-wrap">${IC.mail}<input id="li-email" type="text" placeholder="${lang === 'en' ? 'name@example.com or 1002' : 'name@example.com أو 1002'}"></div>
  <label>${t('password')}</label><div class="input-wrap">${IC.lock}<input id="li-pass" type="password"><button type="button" class="eye-btn" onclick="const e=document.getElementById('li-pass');e.type=e.type==='password'?'text':'password';">${IC.eye}</button></div>
  <button class="btn" onclick="doLogin()">${t('login')}</button>
  <div class="divider-or">${lang === 'en' ? 'or' : 'أو'}</div>
  ${fp}
  <div id="li-err" class="err"></div>
  <button type="button" class="qr-btn" onclick="go('qr')">${IC.qr} ${t('qrShare')}</button>
  <div class="link-row"><button type="button" onclick="go('signup')">${t('newSignup')}</button><button type="button" onclick="go('forgot')">${lang === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟'}</button></div></div>
  <div class="auth-footer"><div class="auth-links"><button type="button" class="auth-link" onclick="window._policyReturn='login';go('policies')"><span class="auth-link-ic">${IC.policy}</span>${lang === 'en' ? 'Site policy' : 'سياسة الموقع'}</button>
  <button type="button" class="auth-link" onclick="go('faq')"><span class="auth-link-ic">${IC.info}</span>${t('about')}</button>
  <button type="button" class="auth-link" onclick="go('branches')"><span class="auth-link-ic">${IC.pin}</span>${t('locations')}</button>
  <button type="button" class="auth-link" onclick="go('faq')"><span class="auth-link-ic">${IC.headset}</span>${t('support')}</button>
  <a class="auth-link" style="text-decoration:none" href="${contactAdminLink()}" target="_blank" rel="noopener"><span class="auth-link-ic">${IC.whatsapp}</span>${lang === 'en' ? 'Contact management' : 'تواصل مع الإدارة'}</a></div></div></div>`;
}
function signupView(){
  const policyAgreed = localStorage.getItem('wassil-policy-agreed') === '1';
  return `<div class="auth-page"><div class="auth-hero-teal"><div class="auth-hero-top"><button type="button" class="icon-pill lang" id="langBtn" onclick="toggleLang()">${lang === 'en' ? 'عربي' : 'EN'}</button></div>
  <div class="auth-hero-brand" style="margin-top:22px"><div class="auth-logo-sm">${WAVE}</div><div><div class="auth-hero-name">${brandName()}</div><div class="auth-hero-sub">${t('bankServices')}</div></div></div></div>
  <div class="auth-card">${backLink(t('login'), 'login')}<h2>${t('signup')}</h2>
  <p class="muted">${lang === 'en' ? 'Welcome bonus: 15,000 SDG on your first account per device.' : 'مكافأة ترحيبية: 15,000 ج.س على أول حساب من كل جهاز.'}</p>
  <label>${t('email')}</label><div class="input-wrap">${IC.mail}<input id="su-email" type="email"></div>
  <label>${t('nameAr')}</label><input id="su-ar">
  <label>${t('nameEn')}</label><input id="su-en">
  <label>${t('password')}</label><div class="input-wrap">${IC.lock}<input id="su-pass" type="password"></div>
  <label>${lang === 'en' ? 'Invite code (optional)' : 'رمز الدعوة (اختياري)'}</label><input id="su-invite" placeholder="WSL1002">
  ${policyAgreed ? `<button class="btn" onclick="doSignup()">${t('signup')}</button>` : `<p class="muted">${lang === 'en' ? 'Read the site policy and agree before creating an account.' : 'اقرأ سياسة الموقع ووافق عليها قبل إنشاء الحساب.'}</p><button class="btn" onclick="window._policyReturn='signup';go('policies')">${lang === 'en' ? 'Read site policy' : 'قراءة سياسة الموقع'}</button>`}
  <div id="su-err" class="err"></div><div id="su-ok" class="ok"></div>
  <div id="su-activate" class="hidden"><label>Activation code / كود التفعيل</label><input id="su-code"><button class="btn" onclick="doActivate()">${t('confirm')}</button></div>
  <div class="link-row"><button type="button" onclick="go('login')">${t('login')}</button></div></div>
  <div class="auth-footer"><button type="button" class="auth-link" onclick="window._policyReturn='signup';go('policies')"><span class="auth-link-ic">${IC.policy}</span>${lang === 'en' ? 'Site policy' : 'سياسة الموقع'}</button></div></div>`;
}
function homeView(){
  if (!me) return loginView();
  const txs = dash?.transactions || [];
  const rows = txs.slice(0, 10).map(opRow).join('') || `<p class="muted">—</p>`;
  const cardsTotal = (dash?.cards || []).reduce((a, c) => a + (c.balanceCents || 0), 0);
  const nCards = (dash?.cards || []).length;
  return `<div class="balance"><div class="balance-top"><span>${t('availableBalance')}</span><button type="button" onclick="toggleBal()" aria-label="toggle balance">${IC.eye}</button></div>
  <div class="big">${showBal ? moneySdg(me.sdgBalance) : '••••••••'}</div>
  <div class="acct-num">${me.sdgAccount || ''}</div></div>
  <button type="button" class="mini-card" onclick="go('fx')"><span><span class="mini-label" style="display:block">${t('fxLabel')}</span><span class="mini-sub" style="direction:ltr;display:block;text-align:start">${me.fxAccount || ''}</span></span><span class="mini-amt">${moneyUsd(me.fxBalanceCents)}</span></button>
  <button type="button" class="mini-card" onclick="go('cards')"><span><span class="mini-label" style="display:block">${t('cardsBalance')} (${nCards})</span><span class="mini-sub">${lang === 'en' ? 'USD only' : 'بالدولار فقط'}</span></span><span class="mini-amt">${moneyUsd(cardsTotal)}</span></button>
  <div class="card"><div class="grid">
    <button type="button" class="tile" onclick="go('transfer')"><span class="tile-ic">${IC.transfer}</span>${t('transfer')}</button>
    <button type="button" class="tile" onclick="go('bills')"><span class="tile-ic">${IC.receipt}</span>${t('bills')}</button>
    <button type="button" class="tile" onclick="go('qr')"><span class="tile-ic">${IC.qr}</span>${lang === 'en' ? 'QR' : 'رمز QR'}</button>
    <button type="button" class="tile" onclick="go('cards')"><span class="tile-ic">${IC.card}</span>${t('cards')}</button>
    <button type="button" class="tile" onclick="go('statement')"><span class="tile-ic">${IC.chart}</span>${t('statement')}</button>
    <button type="button" class="tile" onclick="go('deposits')"><span class="tile-ic">${IC.bank}</span>${t('deposits')}</button>
    <button type="button" class="tile" onclick="go('fx')"><span class="tile-ic">${IC.dollar}</span>${lang === 'en' ? 'Currencies' : 'عملات'}</button>
    <button type="button" class="tile" onclick="go('services')"><span class="tile-ic">${IC.grid}</span>${lang === 'en' ? 'All services' : 'كل الخدمات'}</button>
  </div></div>
  <div class="card"><div class="ops-head"><h2>${t('latestOps')}</h2><button type="button" class="link-btn" onclick="go('statement')">${t('showAll')}</button></div>${rows}</div>`;
}
function servicesView(){
  const items = [
    [IC.card, t('cards'), "go('cards')"],
    [IC.card, t('topup'), "go('cardTopup')"],
    [IC.transfer, t('cardTransfer'), "go('cardTransfer')"],
    [IC.bank, t('deposits'), "go('deposits')"],
    [IC.trend, t('invest'), "go('invest')"],
    [IC.calc, t('loanCalc'), "go('loan')"],
    [IC.repeat, t('orders'), "go('orders')"],
    [IC.target, t('goals'), "go('goals')"],
    [IC.chart, t('statement'), "go('statement')"],
    [IC.shield, t('security'), "go('security')"],
    [IC.pin, t('branches'), "go('branches')"],
    [IC.headset, t('faq'), "go('faq')"],
  ];
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('bankServicesPage')}</div>
  <div class="svc-grid">${items.map(([ic, ti, act]) => `<button type="button" class="svc-card" onclick="${act}"><span class="svc-ic">${ic}</span><span class="svc-title" style="display:block">${ti}</span></button>`).join('')}</div>`;
}
function accountView(){
  if (!me) return loginView();
  if (me.role === 'admin') return `<div class="page-title">${lang === 'en' ? 'Admin account' : 'حساب الأدمن'}</div><p class="page-sub">${lang === 'en' ? 'This is not an ordinary user account. It only administers other accounts.' : 'هذا ليس حساب مستخدم عادي. هو حساب إداري فقط لإدارة حسابات الآخرين.'}</p>
  <div class="profile-card"><div class="profile-top"><div class="profile-avatar">${esc((nameOf(me) || 'و').trim().charAt(0) || 'و')}</div><div><div class="profile-name">${esc(nameOf(me))}</div><div class="profile-role">${lang === 'en' ? 'Admin account — Wassil' : 'حساب الأدمن — وصل'}</div></div></div>
  <div class="acct-row"><span class="acct-ic">${IC.mail}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${t('email')}</span><span class="acct-row-sub" style="display:block">${esc(me.email)}</span></span><span class="pill-active">${t('active')}</span></div></div>
  <div class="profile-card"><div class="menu-row" style="cursor:default"><span class="acct-ic">${IC.shield}</span><span class="menu-row-main"><span class="menu-row-title">${lang === 'en' ? 'Admin powers' : 'صلاحيات الأدمن'}</span></span></div>
  <p class="muted">${lang === 'en' ? '• Fund any account in SDG or USD, unlimited, without deduction from the admin balance.' : '• تمويل أي حساب بالجنيه أو بالدولار، بلا حد، ومن غير خصم من رصيد الأدمن.'}</p>
  <p class="muted">${lang === 'en' ? '• Freeze a specific amount, freeze all assets, ban an account, and release freezes and bans.' : '• تجميد مبلغ معين، تجميد كل الأصول، حظر حساب، وفك التجميد والحظر.'}</p>
  <p class="muted">${lang === 'en' ? '• Stop (freeze) and restart any user card.' : '• إيقاف (تجميد) أي بطاقة مستخدم وإعادة تشغيلها.'}</p>
  <p class="muted">${lang === 'en' ? 'The admin cannot transfer, pay bills, or trade for itself — those are ordinary-user operations.' : 'الأدمن لا يحول ولا يدفع فواتير ولا يتداول لنفسه — دي عمليات المستخدم العادي فقط.'}</p></div>
  <button class="btn" onclick="go('admin')">${lang === 'en' ? 'Open admin dashboard' : 'فتح لوحة الأدمن'}</button>
  <button class="logout-btn" onclick="doLogout()">${t('logout')}</button>
  `;
  const letter = (nameOf(me) || 'و').trim().charAt(0) || 'و';
  const others = (dash?.beneficiaries || []).filter(u => u.id !== me.id);
  const ben = others.map(u => `<button type="button" class="menu-row" onclick="go('transfer')"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${esc(nameOf(u))}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">${esc(u.sdgAccount || '')}</span></span><span>›</span></button>`).join('') || `<p class="muted">${lang === 'en' ? 'No beneficiaries yet' : 'لا يوجد مستفيدون بعد'}</p>`;
  return `<div class="page-title">${t('myAccount')}</div>
  <div class="profile-card"><div class="profile-top"><div class="profile-avatar">${esc(letter)}</div><div><div class="profile-name">${esc(nameOf(me))}</div><div class="profile-role">${me.role === 'admin' ? (lang === 'en' ? 'Admin account — Wassil' : 'حساب الأدمن — وصل') : t('demoClient')}</div></div></div>
  <div class="acct-row"><span class="acct-ic">${IC.bank}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'SDG account' : 'الحساب بالجنيه (SDG)'}</span><span class="acct-row-sub" style="display:block">${esc(me.sdgAccount || '')}</span></span><span class="acct-row-amt">${moneySdg(me.sdgBalance)}</span></div>
  <div class="acct-row"><span class="acct-ic">${IC.dollar}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'FX account' : 'الحساب الأجنبي'}</span><span class="acct-row-sub" style="display:block">${esc(me.fxAccount || '')}</span></span><span class="acct-row-amt">${moneyUsd(me.fxBalanceCents)}</span></div>
  <div class="acct-row"><span class="acct-ic">${IC.mail}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${t('email')}</span><span class="acct-row-sub" style="display:block">${esc(me.email)}</span></span><span class="pill-active">${me.status === 'active' ? t('active') : esc(me.status || '')}</span></div></div>
  ${me.frozenAll ? `<div class="profile-card" style="border:1.5px solid var(--danger)"><div class="page-title" style="margin:0 0 6px">${lang === 'en' ? 'All assets frozen' : 'كل الأصول مجمدة'}</div><p class="muted" style="margin:0">${lang === 'en' ? 'The admin has frozen all your assets — no outgoing operations are possible until the admin releases the freeze.' : 'الأدمن جمّد كل أصولك — لا يمكن إجراء أي عملية صادرة حتى يفك الأدمن التجميد.'}</p></div>` : ((me.frozenSdg || 0) > 0 ? `<div class="profile-card" style="border:1.5px solid var(--danger)"><div class="page-title" style="margin:0 0 6px">${lang === 'en' ? 'Amount frozen' : 'مبلغ مجمد'}</div><p class="muted" style="margin:0">${lang === 'en' ? `Frozen by admin: ${moneySdg(me.frozenSdg)} — your usable balance is your balance minus the frozen amount.` : `مبلغ مجمد من الأدمن: ${moneySdg(me.frozenSdg)} — رصيدك المتاح هو رصيدك ناقص المبلغ المجمد.`}</p></div>` : '')}
  <div class="profile-card"><div class="menu-row" style="cursor:default"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title">${lang === 'en' ? 'Your invite code' : 'رمز الدعوة الخاص بك'}</span></span></div>
  <p class="muted" style="direction:ltr;text-align:center;font-weight:900;font-size:18px;color:#0f766e">WSL${esc(me.sdgAccount || '')}</p>
  <p class="muted">${lang === 'en' ? 'Share it: any new account that enters this code at activation gets a 50,000 SDG invite bonus — and you get 50,000 SDG too for each person who activates with it.' : 'شاركه: أي حساب جديد يكتب هذا الرمز عند التفعيل بياخد مكافأة دعوة 50,000 ج.س — وأنت بتاخد 50,000 ج.س عن كل شخص يفعّل برمزك.'}</p>
  <button class="btn secondary" onclick="copyInvite()">${lang === 'en' ? 'Copy invite code' : 'نسخ رمز الدعوة'}</button></div>
  <div class="profile-card"><div class="menu-row" style="cursor:default"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title">${t('beneficiaries')}</span></span></div>${ben}</div>
  <div class="profile-card"><button type="button" class="menu-row" onclick="go('notifications')"><span class="acct-ic">${IC.bell}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${t('notifications')}</span><span class="menu-row-sub">${lang === 'en' ? 'Incoming money and bonuses' : 'واردك والمكافآت'}</span></span><span>›</span></button>
  <button type="button" class="menu-row" onclick="go('statement')"><span class="acct-ic">${IC.chart}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${t('statement')}</span><span class="menu-row-sub">${lang === 'en' ? 'Your full history' : 'سجل عملياتك الكامل'}</span></span><span>›</span></button>
  <button type="button" class="menu-row" onclick="go('security')"><span class="acct-ic">${IC.shield}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${t('security')}</span><span class="menu-row-sub">${lang === 'en' ? 'Fingerprint and password' : 'البصمة وكلمة المرور'}</span></span><span>›</span></button>
  <button type="button" class="menu-row" onclick="window._policyReturn='account';go('policies')"><span class="acct-ic">${IC.info}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${lang === 'en' ? 'Site policy' : 'سياسة الموقع'}</span></span><span>›</span></button>
  ${contactAdminRow()}</div>
  ${me.role === 'admin' ? `<div class="profile-card" style="border:1.5px solid var(--teal)"><div class="page-title" style="margin:0 0 6px">${lang === 'en' ? 'Admin mode active' : 'وضع الأدمن مفعّل'}</div><p class="muted" style="margin:0 0 12px">${lang === 'en' ? 'Fund user accounts and review registrations from the admin dashboard.' : 'مؤّل حسابات المستخدمين وراجع التسجيلات من لوحة الأدمن.'}</p><button class="btn" onclick="go('admin')">${lang === 'en' ? 'Open admin dashboard' : 'فتح لوحة الأدمن'}</button></div>` : ''}
  <button class="logout-btn" onclick="doLogout()">${t('logout')}</button>
  `;
}
let stmtQ = '', stmtRange = 'all', stmtLast5 = false, stmtTxs = null, stmtTxsLoading = false;
function stmtBaseTxs(){ return stmtTxs || dash?.transactions || []; }
function filterStmtTx(txs, q, range, last5){
  const qq = (q || '').trim().toLowerCase();
  let list = txs;
  if (qq) { list = txs.filter(t => String(t.ref || '').toLowerCase().includes(qq)); }
  else if (range === 'today') { const now = new Date(); list = txs.filter(t => { const d = new Date(t.createdAt); return !isNaN(d) && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate(); }); }
  else if (range === 'week') { const cut = Date.now() - 7 * 24 * 60 * 60 * 1000; list = txs.filter(t => new Date(t.createdAt).getTime() >= cut); }
  else if (range === 'month') { const cut = Date.now() - 30 * 24 * 60 * 60 * 1000; list = txs.filter(t => new Date(t.createdAt).getTime() >= cut); }
  if (last5) list = list.slice(0, 5);
  return list;
}
function applyStmtFilter(){
  const el = document.getElementById('stmtList'); if (!el) return;
  const list = filterStmtTx(stmtBaseTxs(), stmtQ, stmtRange, stmtLast5);
  el.innerHTML = list.map(opRow).join('') || `<p class="muted">${lang === 'en' ? 'No matching results' : 'لا توجد نتائج مطابقة'}</p>`;
  const c = document.getElementById('stmtCount'); if (c) c.textContent = lang === 'en' ? `${list.length} operations` : `${list.length} عملية`;
  document.querySelectorAll('.flt-btn[data-range]').forEach(b => b.classList.toggle('on', b.dataset.range === stmtRange));
  const l5 = document.getElementById('stmtLast5Btn'); if (l5) l5.classList.toggle('on', stmtLast5);
}
function loadStmtTxs(){ if (stmtTxs || stmtTxsLoading) return; stmtTxsLoading = true; api('/api/transactions').then(d => { stmtTxs = d.transactions || []; stmtTxsLoading = false; if (view === 'statement' || view === 'notifications') render(); }).catch(() => { stmtTxsLoading = false; }); }
function stopStmtPoll(){ if (window._stmtPoll) { clearInterval(window._stmtPoll); window._stmtPoll = null; } }
function startStmtPoll(){
  if (window._stmtPoll) return;
  window._stmtPoll = setInterval(async () => {
    if (view !== 'statement') { stopStmtPoll(); return; }
    try {
      const d = await api('/api/transactions');
      const fresh = d.transactions || [];
      const old = stmtTxs || [];
      const changed = fresh.length !== old.length || (fresh[0] && old[0] && fresh[0].id !== old[0].id) || (!fresh[0] !== !old[0]);
      if (!changed) return;
      stmtTxs = fresh;
      const txs = stmtBaseTxs();
      let inSdg = 0, outSdg = 0;
      txs.forEach(tx => { const a = tx.amountSdg || 0; if (a > 0) inSdg += a; if (a < 0) outSdg += -a; });
      const elIn = document.getElementById('stmt-sum-in'), elOut = document.getElementById('stmt-sum-out'), elCnt = document.getElementById('stmt-sum-count');
      if (elIn) elIn.textContent = moneySdg(inSdg);
      if (elOut) elOut.textContent = moneySdg(outSdg);
      if (elCnt) elCnt.textContent = String(txs.length);
      applyStmtFilter();
    } catch {}
  }, 20000);
}
function statementView(){
  loadStmtTxs(); startStmtPoll();
  const txs = stmtBaseTxs();
  let inSdg = 0, outSdg = 0;
  txs.forEach(tx => { const a = tx.amountSdg || 0; if (a > 0) inSdg += a; if (a < 0) outSdg += -a; });
  const list = filterStmtTx(txs, stmtQ, stmtRange, stmtLast5);
  const rows = list.map(opRow).join('') || `<p class="muted">${lang === 'en' ? 'No matching results' : 'لا توجد نتائج مطابقة'}</p>`;
  const flt = (r, ar, en) => `<button type="button" class="flt-btn${stmtRange === r ? ' on' : ''}" data-range="${r}" onclick="stmtRange=this.dataset.range;applyStmtFilter()">${lang === 'en' ? en : ar}</button>`;
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('statement')}</div><p class="page-sub">${t('statementSub')}</p>
  <div class="summary-row">
    <div class="summary-card"><b class="pos" id="stmt-sum-in">${moneySdg(inSdg)}</b><span>${t('totalIn')} (${lang === 'en' ? 'SDG' : 'ج.س'})</span></div>
    <div class="summary-card"><b class="neg" id="stmt-sum-out">${moneySdg(outSdg)}</b><span>${t('totalOut')} (${lang === 'en' ? 'SDG' : 'ج.س'})</span></div>
    <div class="summary-card"><b id="stmt-sum-count">${txs.length}</b><span>${t('opsCount')}</span></div>
  </div>
  <button type="button" class="btn-outline" onclick="downloadStatementText()">${t('downloadText')}</button>
  <button type="button" class="btn" onclick="downloadStatementPdf()">${lang === 'en' ? 'Download statement as PDF' : 'تنزيل الكشف PDF'}</button>
  <div class="card">
  <label>${lang === 'en' ? 'Search by reference' : 'بحث بالرقم المرجعي'}</label>
  <div class="input-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input id="stmtSearch" type="text" style="direction:ltr;text-align:start" value="${esc(stmtQ)}" placeholder="${lang === 'en' ? 'WSL-XXXX-XXX or part of it' : 'WSL-XXXX-XXX أو جزء منه'}" oninput="stmtQ=this.value;applyStmtFilter()"></div>
  <div class="flt-row">${flt('all', 'الكل', 'All')}${flt('today', 'اليوم', 'Today')}${flt('week', 'الأسبوع', 'Week')}${flt('month', 'الشهر', 'Month')}<button type="button" id="stmtLast5Btn" class="flt-btn${stmtLast5 ? ' on' : ''}" onclick="stmtLast5=!stmtLast5;applyStmtFilter()">${lang === 'en' ? 'Last 5' : 'آخر 5 معاملات'}</button></div>
  <p class="muted" id="stmtCount">${lang === 'en' ? `${list.length} operations` : `${list.length} عملية`}</p>
  <div id="stmtList">${rows}</div></div>`;
}
function downloadStatementText(){
  const txs = dash?.transactions || [];
  const lines = txs.map(tx => `${txTitle(tx)} | ${txAmount(tx)} | ${new Date(tx.createdAt).toLocaleString()} | ${tx.ref || ''}`);
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'wassil-statement.txt'; a.click();
  toast(lang === 'en' ? 'Statement downloaded' : 'تم تنزيل الكشف');
}
async function downloadStatementPdf(){
  try {
    const txs = dash?.transactions || [];
    const W = 800, ROWH = 46, PER = 16, HEAD = 170, FOOT = 56;
    const pages = [];
    for (let i = 0; i < Math.max(1, Math.ceil(txs.length / PER)); i++) pages.push(txs.slice(i * PER, (i + 1) * PER));
    const jpegs = [];
    for (let pi = 0; pi < pages.length; pi++) {
      const rows = pages[pi];
      const H = HEAD + rows.length * ROWH + FOOT;
      const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      const c = cv.getContext('2d');
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#0d7a5f'; c.fillRect(0, 0, W, 110);
      c.fillStyle = '#ffffff'; c.font = 'bold 30px sans-serif'; c.textAlign = 'start';
      c.fillText(lang === 'en' ? 'Wassil' : 'وصل', 28, 48);
      c.font = '16px sans-serif'; c.fillText(lang === 'en' ? 'Account statement' : 'كشف حساب', 28, 78);
      c.fillStyle = '#ffffff'; c.font = '14px sans-serif'; c.fillText(new Date().toLocaleDateString(), W - 28, 78);
      c.fillStyle = '#222222'; c.font = '16px sans-serif'; c.textAlign = 'start';
      c.fillText((lang === 'en' ? 'Account: ' : 'الحساب: ') + (me?.sdgAccount || ''), 28, 140);
      c.fillText((lang === 'en' ? 'Name: ' : 'الاسم: ') + nameOf(me), 28, 164);
      rows.forEach((tx, ri) => {
        const y = HEAD + ri * ROWH;
        if (ri % 2 === 0) { c.fillStyle = '#f4f7f6'; c.fillRect(0, y, W, ROWH); }
        c.fillStyle = '#222222'; c.font = '15px sans-serif'; c.textAlign = 'start';
        c.fillText(txTitle(tx), 28, y + 20);
        c.font = '13px sans-serif'; c.fillStyle = '#666666';
        c.fillText(new Date(tx.createdAt).toLocaleString() + '  |  ' + (tx.ref || ''), 28, y + 38);
        c.fillStyle = '#222222'; c.font = 'bold 15px sans-serif'; c.textAlign = 'end';
        c.fillText(txAmount(tx), W - 28, y + 28);
      });
      c.fillStyle = '#666666'; c.font = '13px sans-serif'; c.textAlign = 'center';
      c.fillText((lang === 'en' ? 'Page ' : 'صفحة ') + (pi + 1) + ' / ' + pages.length, W / 2, H - 10);
      const blob = await new Promise(res => cv.toBlob(res, 'image/jpeg', 0.9));
      jpegs.push(new Uint8Array(await blob.arrayBuffer()));
    }
    // Minimal PDF: one page per JPEG image (DCTDecode), no external library.
    const enc = new TextEncoder();
    const chunks = []; let off = 0;
    const push = (b) => { chunks.push(b); off += b.length; };
    const pushStr = (s) => push(enc.encode(s));
    const offsets = [0];
    pushStr('%PDF-1.4\n');
    const n = pages.length;
    const pageObj = (i) => 3 + i * 3, imgObj = (i) => 4 + i * 3, contObj = (i) => 5 + i * 3;
    const totalObjs = 2 + n * 3;
    const obj = (id, body) => { offsets[id] = off; pushStr(id + ' 0 obj\n' + body + '\nendobj\n'); };
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [' + pages.map((_, i) => pageObj(i) + ' 0 R').join(' ') + '] /Count ' + n + ' >>');
    for (let i = 0; i < n; i++) {
      const H = HEAD + pages[i].length * ROWH + FOOT;
      const ph = Math.round(595 * H / W);
      obj(pageObj(i), '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 ' + ph + '] /Resources << /XObject << /Im' + i + ' ' + imgObj(i) + ' 0 R >> >> /Contents ' + contObj(i) + ' 0 R >>');
      offsets[imgObj(i)] = off;
      pushStr(imgObj(i) + ' 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + W + ' /Height ' + H + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpegs[i].length + ' >>\nstream\n');
      push(jpegs[i]); pushStr('\nendstream\nendobj\n');
      const content = 'q 595 0 0 ' + ph + ' 0 0 cm /Im' + i + ' Do Q';
      obj(contObj(i), '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream');
    }
    const xrefAt = off;
    let xref = 'xref\n0 ' + (totalObjs + 1) + '\n0000000000 65535 f \n';
    for (let id = 1; id <= totalObjs; id++) xref += String(offsets[id]).padStart(10, '0') + ' 00000 n \n';
    pushStr(xref + 'trailer\n<< /Size ' + (totalObjs + 1) + ' /Root 1 0 R >>\nstartxref\n' + xrefAt + '\n%%EOF');
    const blob = new Blob(chunks, { type: 'application/pdf' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'wassil-statement-' + String(me?.sdgAccount || 'account').replace(/[\s-]/g, '') + '.pdf'; a.click();
    toast(lang === 'en' ? 'Statement PDF downloaded' : 'تم تنزيل الكشف PDF');
  } catch (e) {
    toast(lang === 'en' ? 'PDF failed, try the text download' : 'تعذر إنشاء PDF، جرب تنزيل النص', 'err');
  }
}
function qrView(){
  if (!me) return `${backLink(t('login'), 'login')}
  <div class="page-title">${t('qrShare')}</div><div class="card" style="text-align:center"><div class="qr-real" data-qr="${esc(window.location.origin + '/')}" data-qr-size="220"></div>
  <div style="font-weight:900;font-size:17px">${brandName()}</div>
  <p class="muted">${lang === 'en' ? 'A real QR code: scanning it with any phone camera opens Wassil.' : 'رمز حقيقي: مسحه بأي كاميرا تلفون بيفتح وصل.'}</p>
  <p class="muted">${t('demoNote')}</p>
  <button class="btn secondary" onclick="go('login')">${t('login')}</button></div>`;
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('qrShare')}</div><div class="card" style="text-align:center"><div class="qr-real" data-qr="${esc(qrPayloadForAccount(me.sdgAccount))}" data-qr-size="220"></div>
  <div style="font-weight:900;font-size:17px">${esc(nameOf(me))}</div>
  <div class="muted" style="direction:ltr">${esc(me.sdgAccount || '')}</div>
  <p class="muted">${lang === 'en' ? 'A real QR code: scanning it with any phone camera opens a transfer straight to this account.' : 'رمز حقيقي: مسحه بأي كاميرا تلفون بيفتح تحويل مباشرة لهذا الحساب.'}</p>
  <button class="btn secondary" onclick="copyAccount()">${lang === 'en' ? 'Copy account number' : 'نسخ رقم الحساب'}</button>
  <button class="btn" onclick="go('scan')" style="margin-top:10px">${lang === 'en' ? 'Scan a QR code' : 'مسح رمز'}</button></div>`;
}
function scanView(){
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${lang === 'en' ? 'Scan QR code' : 'مسح رمز QR'}</div>
  <div class="card" style="text-align:center"><video id="scan-video" playsinline muted style="width:100%;max-width:420px;border-radius:16px;background:#000"></video><canvas id="scan-canvas" style="display:none"></canvas>
  <p class="muted" id="scan-status">${lang === 'en' ? 'Starting camera…' : 'جاري تشغيل الكاميرا…'}</p>
  <button class="btn secondary" onclick="stopScan(); go('home');">${lang === 'en' ? 'Stop camera' : 'إيقاف الكاميرا'}</button></div>`;
}
async function copyInvite(){
  const code = 'WSL' + (me?.sdgAccount || '');
  try { await navigator.clipboard.writeText(code); } catch { const ta = document.createElement('textarea'); ta.value = code; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
  toast(lang === 'en' ? 'Invite code copied' : 'تم نسخ رمز الدعوة');
}
async function copyAccount(){
  try { await navigator.clipboard.writeText(me.sdgAccount || ''); } catch { const ta = document.createElement('textarea'); ta.value = me.sdgAccount || ''; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
  toast(lang === 'en' ? 'Account number copied' : 'تم نسخ رقم الحساب');
}
function loanView(){
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('loanCalc')}</div><div class="card">
  <label>${t('amount')} (SDG)</label><input id="loan-amt" type="number" min="1">
  <label>${lang === 'en' ? 'Months' : 'عدد الأشهر'}</label><input id="loan-months" type="number" min="1" value="12">
  <button class="btn" onclick="calcLoan()">${t('confirm')}</button><div id="loan-out" class="ok"></div></div>`;
}
function calcLoan(){
  const p = parseFloat($('#loan-amt').value || 0); const m = parseFloat($('#loan-months').value || 0);
  if (!p || !m) { $('#loan-out').textContent = lang === 'en' ? 'Enter amount and months' : 'أدخل المبلغ وعدد الأشهر'; return; }
  const total = p * (1 + 0.10 * m / 12); const monthly = total / m;
  $('#loan-out').textContent = (lang === 'en' ? 'Total: ' : 'الإجمالي: ') + moneySdg(Math.round(total)) + ' — ' + (lang === 'en' ? 'Monthly: ' : 'القسط الشهري: ') + moneySdg(Math.round(monthly));
}
function beneficiariesBlock(){
  const bens = dash?.beneficiaries || [];
  const rows = bens.map(u => `<div class="menu-row"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${esc(nameOf(u))}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">${esc(u.sdgAccount || '')} · ${esc(u.fxAccount || '')}</span></span><button type="button" class="link-btn" onclick="doBenRemove(${u.id})">${lang === 'en' ? 'Remove' : 'حذف'}</button></div>`).join('') || `<p class="muted">${lang === 'en' ? 'No beneficiaries yet — add someone below and they will appear here.' : 'لا يوجد مستفيدون بعد — أضف شخصاً بالأسفل وسيظهر هنا.'}</p>`;
  return `<div class="page-title" style="font-size:18px">${lang === 'en' ? 'Manage beneficiaries' : 'إدارة المستفيدين'}</div><div class="card">${rows}<label>${lang === 'en' ? 'Account number (SDG or FX)' : 'رقم الحساب (جنيه أو أجنبي)'}</label><input id="ben-acct" placeholder="1002"><button class="btn secondary" onclick="doBenLookup()">${lang === 'en' ? 'Check' : 'تحقق'}</button><div id="ben-lookup" class="muted"></div><div id="ben-err" class="err"></div></div>`;
}
async function doBenLookup(){
  const acct = $('#ben-acct').value.trim();
  try { const j = await api('/api/lookup', { method:'POST', body: JSON.stringify({ account: acct }) }); window._benCandidate = acct; $('#ben-lookup').innerHTML = `${esc(lang === 'en' ? (j.nameEn || j.nameAr) : j.nameAr)} — <button type="button" class="btn" onclick="doBenAdd()">${lang === 'en' ? 'Add beneficiary' : 'إضافة كمستفيد'}</button>`; }
  catch(e){ $('#ben-err').textContent = lang === 'en' ? 'Account not found' : 'الحساب غير موجود'; }
}
async function doBenAdd(){
  try { await api('/api/beneficiaries/add', { method:'POST', body: JSON.stringify({ account: window._benCandidate }) }); toast(lang === 'en' ? 'Beneficiary added' : 'تمت إضافة المستفيد'); await loadDash(); render(); }
  catch(e){ $('#ben-err').textContent = friendlyErr(e.message); }
}
async function doBenRemove(id){
  await api('/api/beneficiaries/remove', { method:'POST', body: JSON.stringify({ userId: id }) }); await loadDash(); render();
}
async function maybeSuggestBeneficiary(j){
  const sg = j?.suggestBeneficiary; if (!sg) return;
  const name = lang === 'en' ? (sg.nameEn || sg.nameAr) : sg.nameAr;
  const ok = await confirmSheet({ title: lang === 'en' ? 'Add to beneficiaries?' : 'إضافة إلى المستفيدين؟', lines: [[lang === 'en' ? 'Account' : 'الحساب', name + ' — ' + (sg.sdgAccount || sg.fxAccount)], [lang === 'en' ? 'Note' : 'ملاحظة', lang === 'en' ? 'You have transferred to this account more than 3 times.' : 'لقد حوّلت إلى هذا الحساب أكثر من 3 مرات.']], confirmLabel: lang === 'en' ? 'Agree' : 'موافقة' });
  if (ok) { try { await api('/api/beneficiaries/add', { method:'POST', body: JSON.stringify({ account: sg.sdgAccount }) }); toast(lang === 'en' ? 'Beneficiary added' : 'تمت إضافة المستفيد'); await loadDash(); } catch(e){} }
  else { try { await api('/api/beneficiaries/decline', { method:'POST', body: JSON.stringify({ userId: sg.userId }) }); } catch(e){} }
}
function transferView(){
  const others = (dash?.beneficiaries || []).filter(u => u.id !== me?.id);
  const opts = others.map(u => `<option value="${esc(u.sdgAccount || '')}">${esc(nameOf(u))} — ${esc(u.sdgAccount || '')}</option>`).join('');
  const list = others.map(u => `<button type="button" class="menu-row" onclick="pickTransferUser('${esc(u.sdgAccount || '')}')"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${esc(nameOf(u))}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">${esc(u.sdgAccount || '')}</span></span><span>›</span></button>`).join('') || `<p class="muted">${lang === 'en' ? 'No beneficiaries yet — add one below.' : 'لا يوجد مستفيدون بعد — أضف واحداً بالأسفل.'}</p>`;
  return `<div class="page-title">${t('transferTitle')}</div>
  <div class="card">
  <label>${t('beneficiary')}</label>
  <select id="tr-user-select" onchange="onTransferUserChange(this.value)"><option value="">${t('chooseUser')}</option>${opts}<option value="__other__">${t('otherAccount')}</option></select>
  <label>${t('toAccount')}</label><input id="tr-to" placeholder="1002" oninput="lookupDebounced('tr-to','tr-name')">
  <label>${t('amountSdg')}</label><input id="tr-amt" type="number" min="1" value="0">
  <label>${t('noteOptional')}</label><input id="tr-note" placeholder="${lang === 'en' ? 'Example: monthly expenses' : 'مثال: مصاريف الشهر'}">
  <div id="tr-name" class="muted"></div><button class="btn secondary" onclick="lookupAcc()">Check / تحقق</button>
  <button class="btn" onclick="doTransfer()">${t('review')}</button><div id="tr-err" class="err"></div>
  ${(!me?.pinSet) ? `<p class="muted">${lang === 'en' ? 'No transfer PIN set yet — set one in the Security Centre so every transfer asks for confirmation.' : 'لم تضبط رمز PIN للتحويل بعد — اضبطه من مركز الأمان ليطلب منك تأكيد كل تحويل.'} <button type="button" class="link-btn" onclick="go('security')">${lang === 'en' ? 'Security Centre' : 'مركز الأمان'}</button></p>` : ''}
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>
  <div class="tabs"><button type="button" class="tab-btn ${transferTab === 'users' ? 'active' : ''}" onclick="setTransferTab('users')">${lang === 'en' ? 'Beneficiaries' : 'المستفيدون'}</button><button type="button" class="tab-btn ${transferTab === 'saved' ? 'active' : ''}" onclick="setTransferTab('saved')">${t('savedBeneficiaries')}</button></div>
  <div class="card">${list}</div>${beneficiariesBlock()}`;
}
function onTransferUserChange(v){
  const inp = $('#tr-to'); if (!inp) return;
  if (v === '__other__') { inp.value = ''; inp.focus(); return; }
  inp.value = v; lookupAcc();
}
function pickTransferUser(acct){ const sel = $('#tr-user-select'); if (sel) sel.value = acct; onTransferUserChange(acct); }
function setTransferTab(tab){ transferTab = tab; render(); }
function fxView(){
  if (!me) return loginView();
  const others = (dash?.beneficiaries || []).filter(u => u.id !== me.id);
  const users = others.map(u => `<button type="button" class="menu-row" onclick="pickFxUser('${esc(u.fxAccount || '')}')"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${esc(nameOf(u))}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">${lang === 'en' ? 'FX account: ' : 'رقم الحساب الأجنبي: '}${esc(u.fxAccount || '')}</span></span><span>›</span></button>`).join('') || `<p class="muted">—</p>`;
  const fxTxs = (dash?.transactions || []).filter(tx => (tx.type || '').startsWith('fx_'));
  const fxRows = fxTxs.map(opRow).join('') || `<p class="muted">—</p>`;
  const fundForm = fxAction === 'fund' ? `<div class="card"><h3>${t('fundFx')}</h3><label>${t('amountSdg')}</label><input id="fx-amt" type="number" min="1">
  <button class="btn" onclick="doFxFund()">${t('fundFx')}</button></div>` : '';
  const transferForm = fxAction === 'transfer' ? `<div class="card"><h3>${t('fxTransfer')}</h3><label>FX account / رقم الحساب الأجنبي</label><input id="fx-to" placeholder="2002 0000 0002" oninput="lookupDebounced('fx-to','fx-name')"><div id="fx-name" class="muted"></div>
  <label>${t('amountUsd')}</label><input id="fx-usd" type="number" step="0.01" min="0.01">
  <button class="btn" onclick="doFxTransfer()">${t('fxTransfer')}</button>
  ${(!me?.pinSet) ? `<p class="muted">${lang === 'en' ? 'No transfer PIN set yet — set one in the Security Centre.' : 'لم تضبط رمز PIN للتحويل بعد — اضبطه من مركز الأمان.'}</p>` : ''}</div>` : '';
  const sellForm = fxAction === 'sell' ? `<div class="card"><h3>${lang === 'en' ? 'Convert to SDG' : 'تحويل إلى الجنيه'}</h3><p class="muted">${lang === 'en' ? 'Same rate as funding: 1 USD = ' : 'بنفس سعر الشحن: 1 دولار = '}${dash?.usdRate || 10000} ${lang === 'en' ? 'SDG' : 'ج.س'}</p><label>${t('amountUsd')}</label><input id="fx-sell-usd" type="number" step="0.01" min="0.01">
  <button class="btn" onclick="doFxSell()">${lang === 'en' ? 'Convert to SDG' : 'تحويل إلى الجنيه'}</button></div>` : '';
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('fx')}</div>
  <div class="balance"><div class="balance-top"><span>${lang === 'en' ? 'FX account (USD)' : 'الحساب الأجنبي (USD)'}</span></div>
  <div class="big">${moneyUsd(me.fxBalanceCents)}</div>
  <div class="acct-num">${me.fxAccount || ''}</div></div>
  <div class="card">${detailRow(lang === 'en' ? 'FX account number' : 'رقم الحساب الأجنبي', esc(me.fxAccount || ''))}${detailRow(lang === 'en' ? 'SDG account (SDG)' : 'الحساب بالجنيه (SDG)', esc(me.sdgAccount || ''))}${detailRow(lang === 'en' ? 'Your SDG balance' : 'رصيد حسابك (ج.س)', moneySdg(me.sdgBalance))}</div>
  <div class="action-row">
    <button type="button" class="action-btn ${fxAction === 'fund' ? 'active' : ''}" onclick="setFxAction('fund')"><span class="action-ic">${IC.dollar}</span>${t('fundFxShort')}</button>
    <button type="button" class="action-btn ${fxAction === 'transfer' ? 'active' : ''}" onclick="setFxAction('transfer')"><span class="action-ic">${IC.transfer}</span>${t('fxTransferShort')}</button>
    <button type="button" class="action-btn ${fxAction === 'sell' ? 'active' : ''}" onclick="setFxAction('sell')"><span class="action-ic">${IC.bank}</span>${lang === 'en' ? 'To SDG' : 'إلى الجنيه'}</button>
    <button type="button" class="action-btn" onclick="go('cardTopup')"><span class="action-ic">${IC.card}</span>${t('topupFromFx')}</button>
  </div>
  ${fundForm}${transferForm}${sellForm}<div id="fx-err" class="err"></div>
  <div class="page-title" style="font-size:18px">${lang === 'en' ? 'Beneficiaries' : 'المستفيدون'}</div>
  <div class="card">${users}</div>${beneficiariesBlock()}
  <div class="page-title" style="font-size:18px">${t('fxHistory')}</div>
  <div class="card">${fxRows}</div>`;
}
function setFxAction(a){ fxAction = a; render(); }
function pickFxUser(acct){ fxAction = 'transfer'; render(); const inp = $('#fx-to'); if (inp) { inp.value = acct; doLookupInto('fx-to', 'fx-name'); } }
function cardTopupView(){
  if (!me) return loginView();
  const cards = dash?.cards || [];
  if (ctCardId == null && cards.length) ctCardId = cards[0].id;
  const opts = cards.map(c => `<option value="${c.id}" ${c.id === ctCardId ? 'selected' : ''}>${esc(c.kind || 'Visa')} — ${esc(c.masked)} — ${moneyUsd(c.balanceCents)}</option>`).join('');
  return `${backLink(t('backCards'), 'cards')}
  <div class="page-title">${t('cardTopupTitle')}</div>
  <div class="card">${detailRow(lang === 'en' ? 'FX account (USD)' : 'الحساب الأجنبي (USD)', moneyUsd(me.fxBalanceCents))}${detailRow(lang === 'en' ? 'FX account number' : 'رقم الحساب الأجنبي', esc(me.fxAccount || ''))}</div>
  <div class="card">
  <label>${t('topupSource')}</label><select id="ct-source"><option>${lang === 'en' ? 'FX account (USD)' : 'الحساب الأجنبي (USD)'} — ${moneyUsd(me.fxBalanceCents)}</option></select>
  <label>${t('cardToTopup')}</label><select id="ct-card" onchange="ctCardId=Number(this.value)">${opts}</select>
  <label>${t('topupAmount')}</label><input id="ct-amt" type="number" step="0.01" min="0.01" value="10.00">
  <button class="btn" onclick="doCardTopup()">${t('reviewTopup')}</button><div id="ct-err" class="err"></div>
  <button class="btn secondary" onclick="go('cards')">${t('back')}</button></div>`;
}
async function doCardTopup(){
  const id = Number($('#ct-card') ? $('#ct-card').value : ctCardId);
  const amt = $('#ct-amt') ? $('#ct-amt').value : '';
  if (!id || !amt) { const el = $('#ct-err'); if (el) el.textContent = lang === 'en' ? 'Pick a card and amount' : 'اختر بطاقة ومبلغاً'; return; }
  if (!(await confirmSheet({ title: lang === 'en' ? 'Review top-up' : 'مراجعة الشحن', lines: [[lang === 'en' ? 'Amount' : 'المبلغ', amt + ' USD']] }))) return;
  try { await api('/api/cards/' + id + '/topup', { method:'POST', body: JSON.stringify({ amountUsd: amt }) }); toast('OK'); await loadDash(); openCard(id); }
  catch(e){ const el = $('#ct-err'); if (el) el.textContent = e.message; }
}
function cardTransferView(){
  if (!me) return loginView();
  const cards = dash?.cards || [];
  if (ccFromId == null && cards.length) ccFromId = cards[0].id;
  const src = cards.find(c => c.id === ccFromId) || cards[0];
  const opts = cards.map(c => `<option value="${c.id}" ${c.id === ccFromId ? 'selected' : ''}>${esc(c.kind || 'Visa')} — ${esc(c.masked)}</option>`).join('');
  return `${backLink(t('backCards'), 'cards')}
  <div class="page-title">${t('cardTransferTitle')}</div>
  <div class="card">
  <label>${t('sourceCard')}</label><select id="cc-from" onchange="ccFromId=Number(this.value);const n=document.getElementById('cc-bal');if(n)n.textContent='${lang === 'en' ? 'Source card balance: ' : 'رصيد بطاقة المصدر: '}' + (this.options[this.selectedIndex].dataset.bal || '');">${cards.map(c => `<option value="${c.id}" data-bal="${moneyUsd(c.balanceCents)}" ${c.id === ccFromId ? 'selected' : ''}>${esc(c.kind || 'Visa')} — ${esc(c.masked)}</option>`).join('')}</select>
  <label>${t('recipientCard')}</label><input id="cc-to" placeholder="0000 0000 0000 0000" oninput="lookupDebounced('cc-to','cc-name')"><div id="cc-name" class="muted"></div>
  <label>${t('amountUsd')}</label><input id="cc-amt" type="number" step="0.01" min="0.01" value="10.00">
  <div id="cc-bal" class="muted">${lang === 'en' ? 'Source card balance: ' : 'رصيد بطاقة المصدر: '}${src ? moneyUsd(src.balanceCents) : ''}</div>
  <label>${t('noteOptional')}</label><input id="cc-note">
  <button class="btn" onclick="doCardTransfer()">${t('reviewTransfer')}</button><div id="cc-err" class="err"></div>
  ${(!me?.pinSet) ? `<p class="muted">${lang === 'en' ? 'No transfer PIN set yet — set one in the Security Centre.' : 'لم تضبط رمز PIN للتحويل بعد — اضبطه من مركز الأمان.'}</p>` : ''}
  <button class="btn secondary" onclick="go('cards')">${t('back')}</button></div>`;
}
async function doCardTransfer(){
  const from = Number($('#cc-from') ? $('#cc-from').value : ccFromId);
  const to = $('#cc-to') ? $('#cc-to').value : ''; const amt = $('#cc-amt') ? $('#cc-amt').value : '';
  if (!from || !to || !amt) { const el = $('#cc-err'); if (el) el.textContent = lang === 'en' ? 'Fill in card, recipient and amount' : 'أكمل البطاقة والمستلم والمبلغ'; return; }
  // Review step; the optional note is shown on the form only — the card-transfer API takes no note field, so it is not sent or stored.
  await loadDash();
  const ccName = $('#cc-name') ? $('#cc-name').textContent : '';
  const pinLine = me?.pinSet ? [lang === 'en' ? 'PIN' : 'رمز PIN', lang === 'en' ? 'Will be asked after review' : 'سيُطلب بعد المراجعة'] : [lang === 'en' ? 'PIN' : 'رمز PIN', lang === 'en' ? 'Not set — proceeds without PIN' : 'غير مضبوط — سيتم التحويل من غير PIN'];
  if (!(await confirmSheet({ title: lang === 'en' ? 'Review card transfer' : 'مراجعة التحويل من بطاقة', lines: [[lang === 'en' ? 'To card' : 'إلى البطاقة', ccName || to], [lang === 'en' ? 'Amount' : 'المبلغ', amt + ' USD'], [lang === 'en' ? 'Fee' : 'الرسوم', '0.50 USD'], [lang === 'en' ? 'Total debited' : 'الإجمالي المخصوم', (Number(amt) + 0.5).toFixed(2) + ' USD'], pinLine] }))) return;
  let pin = '';
  if (me?.pinSet) { pin = await pinSheet(lang === 'en' ? 'Enter your transfer PIN' : 'أدخل رمز PIN للتحويل'); if (pin === null) return; }
  const runCard = async (p) => api('/api/cards/transfer', { method:'POST', body: JSON.stringify({ fromCardId: from, toCardNumber: to, amountUsd: amt, pin: p }) });
  try { const j = await runCard(pin); toast((lang === 'en' ? 'Card transfer successful — ' : 'تم التحويل من البطاقة بنجاح — ') + j.ref); await loadDash(); openCard(from); }
  catch(e){ if (e.message === 'pin_required') { const p2 = await pinSheet(lang === 'en' ? 'Enter your transfer PIN' : 'أدخل رمز PIN للتحويل'); if (p2 === null) return; try { const j2 = await runCard(p2); toast((lang === 'en' ? 'Card transfer successful — ' : 'تم التحويل من البطاقة بنجاح — ') + j2.ref); await loadDash(); openCard(from); } catch(e2){ const el2 = $('#cc-err'); if (el2) el2.textContent = friendlyErr(e2.message); } } else { const el = $('#cc-err'); if (el) el.textContent = friendlyErr(e.message); } }
}
function cardsView(){
  const cards = dash?.cards || [];
  const active = cards.filter(c => c.status === 'active' || c.status === 'frozen');
  const fpNote = window.PublicKeyCredential
    ? (lang === 'en' ? 'Fingerprint is available on this device — open a card page and use the eye icon to show its full details.' : 'البصمة متاحة على هذا الجهاز — افتح صفحة أي بطاقة واستخدم أيقونة العين لعرض تفاصيلها كاملة.')
    : t('fpUnavailable');
  const list = cards.map(c =>
    `<div><div class="visa" onclick="openCard(${c.id})"><div style="display:flex;justify-content:space-between;gap:8px"><span>${brandName()}</span><span>VISA ${esc(c.kind || '')}</span></div><div class="num">${esc(c.masked)}</div><div style="display:flex;justify-content:space-between;gap:8px"><span>${lang === 'en' ? 'Balance: ' : 'الرصيد: '}${moneyUsd(c.balanceCents)}</span><span>${lang === 'en' ? 'Daily limit: ' : 'الحد اليومي: '}${moneyUsd((c.dailyLimitUsd || 0) * 100)}</span></div><div style="display:flex;justify-content:space-between;gap:8px;margin-top:6px"><span>${lang === 'en' ? 'Valid to: ' : 'صالحة حتى: '}${esc(c.exp || '')}</span><span>${lang === 'en' ? 'Tap to open card page' : 'اضغط لفتح صفحة البطاقة'} ›</span></div></div><div style="text-align:end;margin:-4px 0 14px"><span class="pill-active">${statusLabel(c.status)}</span></div></div>`).join('') || `<p class="muted">—</p>`;
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('cards')}</div>
  ${list}
  <div class="card"><div style="font-weight:900">${t('newCardTitle')}</div>
  ${detailRow(t('issueFee'), moneySdg(100000))}${detailRow(t('validity'), lang === 'en' ? '5 years from issuance' : '5 سنوات من تاريخ الإصدار')}${detailRow(t('yourBalance'), moneySdg(me ? me.sdgBalance : 0))}${detailRow(t('activeCards'), lang === 'en' ? `${active.length} of 5 max` : `${active.length} من 5 كحد أقصى`)}
  <button class="btn" onclick="requestCard()">${t('newCard')} — 100,000 SDG</button><div id="cd-err" class="err"></div></div>
`;
}
function cardPageView(){
  const c = selCard; if (!c) return cardsView();
  const hist = (c.history || []).map(opRow).join('') || `<p class="muted">—</p>`;
  const freezeTile = c.status === 'frozen'
    ? `<button type="button" class="svc-card" onclick="unfreezeCard()"><span class="svc-ic">${IC.shield}</span><span class="svc-title" style="display:block">${t('unfreeze')}</span></button>`
    : `<button type="button" class="svc-card" onclick="freezeCard()"><span class="svc-ic">${IC.shield}</span><span class="svc-title" style="display:block">${t('freeze')}</span></button>`;
  return `${backLink(t('backCards'), 'cards')}
  <div class="page-title">${t('cardPageTitle')}</div><p class="page-sub">${esc(c.kind || '')} · ${esc(c.masked)}</p>
  <div class="visa"><div style="display:flex;justify-content:space-between;gap:8px"><span>${brandName()}</span><span>VISA ${esc(c.kind || '')}</span></div>
  <div class="num" id="cardNum" style="display:flex;align-items:center;gap:10px;justify-content:space-between"><span>${esc(c.masked)}</span><button type="button" class="eye-btn" style="background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.35);border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer" onclick="toggleEye()">${IC.eye}</button></div>
  <div style="display:flex;justify-content:space-between;gap:8px"><span>${lang === 'en' ? 'Balance: ' : 'الرصيد: '}${moneyUsd(c.balanceCents)}</span><span>${lang === 'en' ? 'Daily limit: ' : 'الحد اليومي: '}${moneyUsd((c.dailyLimitUsd || 0) * 100)}</span></div>
  <div style="margin-top:6px">${lang === 'en' ? 'Valid to: ' : 'صالحة حتى: '}${esc(c.exp || '')}</div></div>
  <div style="text-align:end;margin:-4px 0 14px"><span class="pill-active">${statusLabel(c.status)}</span></div>
  <div id="cardDetails" class="card hidden"></div>
  <div class="page-title" style="font-size:18px">${t('cardOptions')}</div>
  <div class="svc-grid" style="margin-bottom:14px">
    <button type="button" class="svc-card" onclick="toggleEye()"><span class="svc-ic">${IC.eye}</span><span class="svc-title" style="display:block">${t('viewDetails')}</span></button>
    <button type="button" class="svc-card" onclick="ctCardId=${c.id};go('cardTopup')"><span class="svc-ic">${IC.dollar}</span><span class="svc-title" style="display:block">${t('topup')}</span></button>
    <button type="button" class="svc-card" onclick="ccFromId=${c.id};go('cardTransfer')"><span class="svc-ic">${IC.transfer}</span><span class="svc-title" style="display:block">${t('cardTransfer')}</span></button>
    ${freezeTile}
    <button type="button" class="svc-card" onclick="changeLimit()"><span class="svc-ic">${IC.calc}</span><span class="svc-title" style="display:block">${t('dailyLimit')}</span></button>
    <button type="button" class="svc-card" onclick="changeCvv()"><span class="svc-ic">${IC.lock}</span><span class="svc-title" style="display:block">${t('changeCvv')}</span></button>
  </div>
  <button type="button" class="btn-outline-danger" onclick="cancelCard()">${t('cancelCardBtn')}</button>
  <div class="page-title" style="font-size:18px;margin-top:18px">${t('cardHistoryTitle')}</div>
  <div class="card">${hist}</div>`;
}
function depositsView(){
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('depositsTitle')}</div>
  <div class="card">
  <label>${lang === 'en' ? 'Deposit amount (SDG)' : 'مبلغ الوديعة (ج.س)'}</label><input id="dp-amt" type="number" min="1" value="10000">
  <label>${lang === 'en' ? 'Duration' : 'المدة'}</label><select id="dp-days">
    <option value="1">${durationLabel(1)}</option><option value="7">${durationLabel(7)}</option>
    <option value="30" selected>${durationLabel(30)}</option><option value="90">${durationLabel(90)}</option>
    <option value="180">${durationLabel(180)}</option><option value="365">${durationLabel(365)}</option></select>
  <button class="btn" onclick="doDeposit()">${t('openDeposit')}</button><div id="dp-err" class="err"></div><div id="dp-ok" class="ok"></div></div>
  <div class="page-title" style="font-size:18px">${t('myDeposits')}</div>
  <div id="deposits-list" class="card"><p class="muted">…</p></div>`;
}
async function loadDeposits(){
  const el = $('#deposits-list'); if (!el) return;
  try {
    const j = await api('/api/deposits');
    el.innerHTML = (j.deposits || []).map(d => `<div class="dep-row"><div style="font-weight:800">${lang === 'en' ? 'Deposit' : 'وديعة'} ${moneySdg(d.principal)} — ${durationLabel(d.days)}</div>
    <div class="muted">${lang === 'en' ? 'Expected profit' : 'الربح الافتراضي'} (${Math.round(d.rate * 100)}% ${lang === 'en' ? 'per year' : 'سنوياً'}): ${moneySdg(d.profit)} · ${lang === 'en' ? 'Total at maturity' : 'الإجمالي عند الاستحقاق'}: ${moneySdg(d.total)} · ${lang === 'en' ? 'Maturity' : 'الاستحقاق'}: ${fmtDate(d.maturityDate)} · ${lang === 'en' ? 'Deposit' : 'المرجع'} #${d.id}</div></div>`).join('') || `<p class="muted">—</p>`;
  } catch(e){ el.innerHTML = `<p class="err">${esc(e.message)}</p>`; }
}
function investView(){
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('invest')}</div>
  <div class="card"><h2>${t('invest')}</h2><div id="inv-assets"></div><div id="inv-port"></div><div id="inv-err" class="err"></div>
  <button class="btn secondary" onclick="go('services')">${t('backServices')}</button></div>`;
}
function receiptView(){
  const tx = selTx; if (!tx) return homeView();
  const neg = (tx.currency === 'USD' ? (tx.amountUsdCents || 0) : (tx.amountSdg || 0)) < 0;
  const conv = tx.conversion || ((tx.currency === 'USD' && tx.amountUsdCents != null && tx.amountSdg)
    ? `${moneySdg(Math.abs(tx.amountSdg))} ← ${moneyUsd(Math.abs(tx.amountUsdCents))}` : '');
  const d = new Date(tx.createdAt);
  const dt = isNaN(d) ? '' : d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${backLink(t('backStatement'), 'statement')}
  <div class="page-title">${t('receiptTitle')}</div><p class="page-sub">${t('receiptSub')}</p>
  <div class="receipt" id="receiptCard">
    <div class="receipt-head"><div class="receipt-logo">${WAVE}</div><div><div class="receipt-name">${brandName()}</div><div class="receipt-sub">${t('receiptTitle')}</div></div></div>
    <div class="receipt-check"><span class="check-circle">✓</span><span class="pill-active">${lang === 'en' ? 'Completed' : 'مكتملة'}</span></div>
    <div class="receipt-amount ${neg ? 'neg' : 'pos'}">${esc(txAmount(tx))}</div>
    <div class="receipt-op">${t('operationOnAccount')}</div>
    ${detailRow(lang === 'en' ? 'Operation type' : 'نوع العملية', esc(txTitle(tx)))}
    ${detailRow(t('amount'), esc(txAmount(tx)))}
    ${detailRow(lang === 'en' ? 'Currency' : 'العملة', esc(tx.currency || ''))}
    ${detailRow(lang === 'en' ? 'Sender' : 'المرسل', esc(tx.fromName || ''))}
    ${detailRow(lang === 'en' ? 'Sender account' : 'حساب المرسل', esc(tx.fromAccount || ''))}
    ${detailRow(lang === 'en' ? 'Recipient' : 'المستلم', esc(tx.toName || ''))}
    ${detailRow(lang === 'en' ? 'Recipient account' : 'حساب المستلم', esc(tx.toAccount || ''))}
    ${conv ? detailRow(lang === 'en' ? 'Conversion details' : 'تفاصيل التحويل بين العملات', esc(conv)) : ''}
    ${detailRow(lang === 'en' ? 'Date and time' : 'التاريخ والوقت', esc(dt))}
    ${detailRow(lang === 'en' ? 'Reference number' : 'الرقم المرجعي', esc(tx.ref || ''))}
    ${detailRow(lang === 'en' ? 'Operation status' : 'حالة العملية', lang === 'en' ? 'Completed' : 'مكتملة')}
    <div class="qr-block"><div class="qr-real" data-qr="${esc(window.location.origin + '/?ref=' + encodeURIComponent(tx.ref || String(tx.id)))}" data-qr-size="180"></div>
</div>
  </div>
  <button class="btn" onclick="downloadReceipt()">↓ ${t('downloadReceipt')}</button>
  <button class="btn-outline" onclick="go('statement')">${t('backStatement')}</button>`;
}
function adminCardsHtml(u){
  const cards = (dash && dash.allCards ? dash.allCards : []).filter(c => c.userId === u.id);
  if (!cards.length) return '<p class="muted">' + (lang === 'en' ? 'No cards' : 'لا توجد بطاقات') + '</p>';
  return '<div>' + cards.map(c => {
    const st = c.status === 'frozen' ? (lang === 'en' ? 'Stopped' : 'متوقفة') : (c.status === 'active' ? t('active') : esc(c.status || ''));
    return '<div class="row"><span>' + esc(c.masked || '') + ' — ' + st + ' — ' + moneyUsd(c.balanceCents) + '</span><span><button class="btn secondary" style="width:auto;padding:8px 12px;min-height:0" onclick="adminCardFreeze(' + c.id + ')">' + (lang === 'en' ? 'Stop card' : 'إيقاف البطاقة') + '</button> <button class="btn secondary" style="width:auto;padding:8px 12px;min-height:0" onclick="adminCardUnfreeze(' + c.id + ')">' + (lang === 'en' ? 'Restart card' : 'إعادة تشغيل البطاقة') + '</button></span></div>';
  }).join('') + '</div>';
}
let adminSearch = '';
function normAcctJs(s){ return String(s || '').replace(/[\s-]/g, ''); }
function adminView(){
  const all = dash?.allUsers || [];
  const active = (dash?.allUsers || []).filter(u => u.status === 'active');
  const opts = active.map(u => `<option value="${u.id}">${esc(nameOf(u))} — ${esc(u.sdgAccount || '')}</option>`).join('');
  const shown = adminSearch ? all.filter(u => normAcctJs(u.sdgAccount) === normAcctJs(adminSearch) || normAcctJs(u.fxAccount) === normAcctJs(adminSearch) || String(u.email || '').toLowerCase().includes(String(adminSearch).toLowerCase())) : all;
  const users = shown.map(u =>
    `<div class="profile-card"><div class="profile-top"><div class="profile-avatar">${esc((nameOf(u) || 'و').trim().charAt(0) || 'و')}</div><div><div class="profile-name">${esc(nameOf(u))}</div><div class="profile-role" style="direction:ltr;text-align:start">${esc(u.email)}</div></div><span class="pill-active">${u.status === 'banned' ? (lang === 'en' ? 'Banned' : 'محظور') : (u.status === 'active' ? t('active') : esc(u.status || ''))}</span></div>
    <div class="acct-row"><span class="acct-ic">${IC.bank}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'SDG account' : 'الحساب بالجنيه (SDG)'}</span><span class="acct-row-sub" style="display:block">${esc(u.sdgAccount || '')}</span></span><span class="acct-row-amt">${moneySdg(u.sdgBalance)}</span></div>
    <div class="acct-row"><span class="acct-ic">${IC.dollar}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'FX account' : 'الحساب الأجنبي'}</span><span class="acct-row-sub" style="display:block">${esc(u.fxAccount || '')}</span></span><span class="acct-row-amt">${moneyUsd(u.fxBalanceCents)}</span></div>
    ${u.role === 'admin' ? '' : adminCardsHtml(u)}
    ${u.role === 'admin' ? '' : `<p class="muted">${u.frozenAll ? (lang === 'en' ? 'All assets frozen' : 'كل الأصول مجمدة') : ((u.frozenSdg || 0) > 0 ? (lang === 'en' ? `Frozen: ${moneySdg(u.frozenSdg)}` : `مبلغ مجمد: ${moneySdg(u.frozenSdg)}`) : (lang === 'en' ? 'No freeze' : 'لا يوجد تجميد'))}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><input id="fz-${u.id}" type="number" min="1" placeholder="${lang === 'en' ? 'Freeze amount (SDG)' : 'مبلغ التجميد (ج.س)'}" style="flex:1;min-width:120px"><button class="btn secondary" style="width:auto" onclick="adminFreeze(${u.id})">${lang === 'en' ? 'Freeze amount' : 'تجميد مبلغ'}</button></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn secondary" style="width:auto" onclick="adminFreezeAll(${u.id})">${lang === 'en' ? 'Freeze all' : 'تجميد الكل'}</button><button class="btn secondary" style="width:auto" onclick="adminUnfreeze(${u.id})">${lang === 'en' ? 'Unfreeze' : 'فك التجميد'}</button>${u.status === 'banned' ? `<button class="btn" style="width:auto" onclick="adminUnban(${u.id})">${lang === 'en' ? 'Approve reopen' : 'الموافقة على إعادة الفتح'}</button>` : `<button class="btn-outline-danger" style="width:auto" onclick="adminBan(${u.id})">${lang === 'en' ? 'Ban' : 'حظر'}</button>`}</div>`}</div>`).join('') || `<p class="muted">${lang === 'en' ? 'No registered users yet' : 'لا يوجد مستخدمون مسجلون بعد'}</p>`;
  const txRows = (dash?.allTransactions || []).map(opRow).join('') || `<p class="muted">—</p>`;
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('admin')}</div><p class="page-sub">${lang === 'en' ? 'Admin account — manage user accounts.' : 'حساب إداري لإدارة حسابات المستخدمين.'}</p>
  <div class="card"><h2>${lang === 'en' ? '1 — Find an account' : '١ — ابحث عن حساب'}</h2>
  <label>${lang === 'en' ? 'Account number (4 digits) or email' : 'رقم الحساب (٤ أرقام) أو البريد الإلكتروني'}</label>
  <input id="ad-search" inputmode="numeric" placeholder="1002" value="${esc(adminSearch)}">
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" style="width:auto" onclick="adminSearch = document.getElementById('ad-search').value.trim(); go('admin');">${lang === 'en' ? 'Search' : 'بحث'}</button><button class="btn secondary" style="width:auto" onclick="adminSearch = ''; go('admin');">${lang === 'en' ? 'Show all' : 'عرض الكل'}</button></div>
  <p class="muted">${adminSearch ? (shown.length ? (lang === 'en' ? 'Showing the matching account below — fund, freeze, ban and card actions are on its card.' : 'الحساب المطابق ظاهر تحت — التمويل والتجميد والحظر وأزرار البطاقة على بطاقته.') : (lang === 'en' ? 'No account with this number.' : 'لا يوجد حساب بهذا الرقم.')) : (lang === 'en' ? 'Type an account number to jump straight to that account.' : 'اكتب رقم الحساب عشان توصل للحساب مباشرة.')}</p></div>
  <div class="page-title" style="margin-top:18px">${lang === 'en' ? '2 — Funding' : '٢ — التمويل'}</div>
  <div class="card"><h2>${lang === 'en' ? 'Fund a user account' : 'تمويل حساب مستخدم'}</h2>
  <label>${lang === 'en' ? 'Activated user account' : 'حساب المستخدم'}</label>
  <select id="ad-user"><option value="">${lang === 'en' ? '— Pick an activated user —' : '— اختر مستخدماً مفعلاً —'}</option>${opts}</select>
  <label>${lang === 'en' ? 'Or account number' : 'أو رقم الحساب'}</label><input id="ad-num" inputmode="numeric" placeholder="1002">
  <label>${t('amount')} (SDG)</label><input id="ad-amt" type="number" min="1">
  <button class="btn" onclick="adminFund()">${lang === 'en' ? 'Fund now' : 'تمويل الآن'}</button><div id="ad-err" class="err"></div></div>
  <div class="card"><h2>${lang === 'en' ? 'Fund in USD' : 'تمويل بالدولار'}</h2><p class="muted">${lang === 'en' ? 'Unlimited — not deducted from the admin balance.' : 'بلا حد — لا يخصم من رصيد الأدمن.'}</p>
  <label>${lang === 'en' ? 'Activated user account' : 'حساب المستخدم'}</label>
  <select id="ad-fx-user"><option value="">${lang === 'en' ? '— Pick an activated user —' : '— اختر مستخدماً مفعلاً —'}</option>${opts}</select>
  <label>${lang === 'en' ? 'Or account number' : 'أو رقم الحساب'}</label><input id="ad-fx-num" inputmode="numeric" placeholder="1002">
  <label>${t('amount')} (USD)</label><input id="ad-fx-amt" type="number" min="0.01" step="0.01">
  <button class="btn" onclick="adminFundFx()">${lang === 'en' ? 'Fund in USD now' : 'تمويل بالدولار الآن'}</button><div id="ad-fx-err" class="err"></div></div>
  <div class="page-title" style="margin-top:18px">${lang === 'en' ? `3 — Accounts (${shown.length} of ${all.length})` : `٣ — الحسابات (${shown.length} من ${all.length})`}</div>${users}
  <div class="page-title" style="margin-top:18px">${lang === 'en' ? '4 — Transfer and transaction log' : '٤ — سجل التحويل والمعاملات'}</div>
  <div class="card">${txRows}</div>
  `;
}
function securityView(){
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('security')}</div>
  <div class="card"><h2>${t('security')}</h2>
  <p class="muted">${lang === 'en' ? 'Fingerprint key is bound to this account and this device only. The fingerprint image is never stored and never leaves the device.' : 'مفتاح البصمة مربوط بهذا الحساب وهذا الجهاز فقط. صورة البصمة لا تُحفظ أبداً ولا تغادر الجهاز.'}</p>
  <button class="btn" onclick="enableFp()">${t('enableFingerprint')}</button>
  <button class="btn secondary" onclick="disableFp()">${t('disableFingerprint')}</button><div id="sec-err" class="err"></div><div id="sec-ok" class="ok"></div>
  <button class="btn secondary" onclick="go('services')">${t('backServices')}</button></div>
  <div class="card"><h2 style="font-size:17px">${lang === 'en' ? 'Security questions' : 'أسئلة الأمان'}</h2>
  <p class="muted">${lang === 'en' ? 'Set two questions now. If you forget your password or PIN, answering them lets you reset it. Answers are stored hashed, never shown.' : 'اضبط سؤالين الآن. إذا نسيت كلمة المرور أو رمز PIN، الإجابة عليهما تتيح لك إعادة التعيين. الإجابات محفوظة مشفرة ولا تظهر أبداً.'}</p>
  <p class="muted">${lang === 'en' ? 'Status: ' : 'الحالة: '}${me?.hasSecurityQuestions ? (lang === 'en' ? 'Set' : 'مضبوطة') : (lang === 'en' ? 'Not set' : 'غير مضبوطة')}</p>
  <label>${lang === 'en' ? 'Question 1' : 'السؤال الأول'}</label><select id="sq-1">${SECURITY_QUESTIONS.map(q => `<option value="${q.id}">${qText(q)}</option>`).join('')}</select>
  <label>${lang === 'en' ? 'Answer 1' : 'الإجابة الأولى'}</label><input id="sa-1">
  <label>${lang === 'en' ? 'Question 2' : 'السؤال الثاني'}</label><select id="sq-2">${SECURITY_QUESTIONS.map(q => `<option value="${q.id}">${qText(q)}</option>`).join('')}</select>
  <label>${lang === 'en' ? 'Answer 2' : 'الإجابة الثانية'}</label><input id="sa-2">
  <button class="btn" onclick="doSaveQuestions()">${lang === 'en' ? 'Save security questions' : 'حفظ أسئلة الأمان'}</button><div id="sq-err" class="err"></div><div id="sq-ok" class="ok"></div></div>
  <div class="card"><h2 style="font-size:17px">${lang === 'en' ? 'Transfer PIN (4 digits)' : 'رمز PIN للتحويل (4 أرقام)'}</h2>
  <p class="muted">${lang === 'en' ? 'Once set, every transfer asks for this PIN. After 5 wrong attempts, PIN checks lock for 5 minutes.' : 'بعد ضبطه، كل تحويل سيطلب هذا الرمز. بعد 5 محاولات خاطئة، يُقفل التحقق بالـ PIN لمدة 5 دقائق.'}</p>
  <p class="muted">${lang === 'en' ? 'Status: ' : 'الحالة: '}${me?.pinSet ? (lang === 'en' ? 'Set' : 'مضبوط') : (lang === 'en' ? 'Not set' : 'غير مضبوط')}</p>
  ${me?.pinSet ? `<label>${lang === 'en' ? 'Current PIN or password' : 'رمز PIN الحالي أو كلمة المرور'}</label><input id="pin-proof" type="password">` : `<label>${lang === 'en' ? 'Your password (to set the PIN)' : 'كلمة المرور (لضبط الرمز)'}</label><input id="pin-proof" type="password">`}
  <label>${lang === 'en' ? 'New 4-digit PIN' : 'رمز PIN الجديد (4 أرقام)'}</label><input id="pin-new" type="password" inputmode="numeric" maxlength="4">
  <button class="btn" onclick="doSavePin()">${me?.pinSet ? (lang === 'en' ? 'Change PIN' : 'تغيير رمز PIN') : (lang === 'en' ? 'Set PIN' : 'ضبط رمز PIN')}</button><div id="pin-err" class="err"></div><div id="pin-ok" class="ok"></div>
  <p class="muted">${lang === 'en' ? 'Forgot your PIN while logged out? Use "Forgot password?" on the login screen and answer your security questions to reset it.' : 'نسيت رمز PIN وأنت خارج الحساب؟ استخدم "نسيت كلمة المرور؟" في شاشة الدخول وأجب على أسئلة الأمان لإعادة تعيينه.'}</p></div>`;
}
function forgotView(){
  const qs = window._forgotQs || null; const em = window._forgotEmail || '';
  const qHtml = qs ? qs.map(q => `<label>${qText(q)}</label><input id="fq-${q.id}">`).join('') : '';
  return `<div class="auth-page"><div class="auth-hero-teal"><div class="auth-hero-top"><button type="button" class="icon-pill lang" id="langBtn" onclick="toggleLang()">${lang === 'en' ? 'عربي' : 'EN'}</button></div>
  <div class="auth-hero-brand" style="margin-top:22px"><div class="auth-logo-sm">${WAVE}</div><div><div class="auth-hero-name">${brandName()}</div><div class="auth-hero-sub">${t('bankServices')}</div></div></div></div>
  <div class="auth-card">${backLink(t('login'), 'login')}<h2>${lang === 'en' ? 'Forgot password / PIN' : 'نسيت كلمة المرور / رمز PIN'}</h2>
  <p class="muted">${lang === 'en' ? 'Answer your security questions to reset your password, your PIN, or both. If you never set security questions, this reset cannot work — contact the admin.' : 'أجب على أسئلة الأمان لإعادة تعيين كلمة المرور أو رمز PIN أو كليهما. إذا لم تضبط أسئلة أمان من قبل، لا تعمل هذه الطريقة — راجع الأدمن.'}</p>
  <label>${lang === 'en' ? 'Email or account number' : 'البريد الإلكتروني أو رقم الحساب'}</label><input id="fg-email" type="text" placeholder="${lang === 'en' ? 'name@example.com or 1002' : 'name@example.com أو 1002'}" value="${esc(em)}">
  ${qs ? '' : `<button class="btn" onclick="doForgotLoad()">${lang === 'en' ? 'Show my questions' : 'عرض أسئلتي'}</button>`}
  ${qs ? `<div>${qHtml}</div><label>${lang === 'en' ? 'New password (optional)' : 'كلمة المرور الجديدة (اختياري)'}</label><input id="fg-pass" type="password"><label>${lang === 'en' ? 'New 4-digit PIN (optional)' : 'رمز PIN الجديد (4 أرقام، اختياري)'}</label><input id="fg-pin" type="password" inputmode="numeric" maxlength="4"><button class="btn" onclick="doForgotReset()">${lang === 'en' ? 'Reset' : 'إعادة التعيين'}</button>` : ''}
  <div id="fg-err" class="err"></div><div id="fg-ok" class="ok"></div></div></div>`;
}
async function doForgotLoad(){
  const email = $('#fg-email').value.trim();
  try { const j = await api('/api/security/questions?email=' + encodeURIComponent(email)); window._forgotEmail = email; window._forgotQs = j.questions; render(); }
  catch(e){ $('#fg-err').textContent = lang === 'en' ? 'No security questions found for this email or account number' : 'لا توجد أسئلة أمان لهذا البريد أو رقم الحساب'; }
}
async function doForgotReset(){
  const answers = (window._forgotQs || []).map(q => ({ id: q.id, answer: document.getElementById('fq-' + q.id).value }));
  const newPassword = $('#fg-pass').value, newPin = $('#fg-pin').value.trim();
  if (!newPassword && !newPin) { $('#fg-err').textContent = lang === 'en' ? 'Enter a new password, a new PIN, or both' : 'أدخل كلمة مرور جديدة أو رمز PIN جديد أو كليهما'; return; }
  try { await api('/api/security/reset', { method:'POST', body: JSON.stringify({ email: window._forgotEmail, answers, newPassword, newPin }) }); $('#fg-ok').textContent = lang === 'en' ? 'Reset done — sign in with the new details' : 'تمت إعادة التعيين — سجّل دخول بالبيانات الجديدة'; window._forgotQs = null; setTimeout(() => go('login'), 1500); }
  catch(e){ $('#fg-err').textContent = friendlyErr(e.message); }
}
function policiesView(){
  const sec = (ttl, body) => `<div class="card"><h2 style="font-size:17px">${ttl}</h2><p class="muted">${body}</p></div>`;
  const back = window._policyReturn || (me ? 'home' : 'login');
  const agreed = localStorage.getItem('wassil-policy-agreed') === '1';
  return `${backLink(lang === 'en' ? 'Back' : 'رجوع', back)}
  <div class="page-title">${lang === 'en' ? 'Site policy' : 'سياسة الموقع'}</div>
  <p class="muted">${lang === 'en' ? 'Read this policy once and agree before creating an account. It holds everything that used to be explained on the screens.' : 'اقرأ هذه السياسة مرة واحدة ووافق عليها قبل إنشاء الحساب. فيها كل الشروحات التي كانت تظهر داخل الشاشات.'}</p>
  ${sec(lang === 'en' ? '1 — This is a learning demo, not a real bank' : '١ — هذا نموذج تعليمي، وليس بنكاً حقيقياً',
    lang === 'en' ? 'Wassil is a learning demo. All balances, cards, transfers, bills, deposits and investments are fake data. No real money ever moves, no real bank account is opened, and no real payment is made. The activation code is shown inside the app — no real email is sent. Passwords are stored as a salted hash, never in plain text. Do not treat any balance or receipt here as real money.' : 'وصل نموذج تعليمي. كل الأرصدة والبطاقات والتحويلات والفواتير والودائع والاستثمارات بيانات وهمية. لا تتحرك أي أموال حقيقية أبداً، ولا يُفتح حساب بنكي حقيقي، ولا يتم أي دفع حقيقي. كود التفعيل يظهر داخل التطبيق — لم يُرسل أي بريد حقيقي. كلمات المرور محفوظة مشفرة، وليست نصاً واضحاً. لا تتعامل مع أي رصيد أو إشعار هنا على أنه أموال حقيقية.')}
  ${sec(lang === 'en' ? '2 — Accounts and transfers' : '٢ — الحسابات والتحويلات',
    lang === 'en' ? 'Each account gets a 4-digit SDG account and a 4-digit FX account. Transfers between registered Wassil accounts need the recipient account number; the recipient name is checked before confirmation. A QR code opens a transfer to that account, and scanning it in the app fills in the recipient.' : 'لكل حساب رقم حساب بالجنيه من ٤ أرقام ورقم حساب أجنبي من ٤ أرقام. التحويل بين حسابات وصل المسجلة يحتاج رقم حساب المستلم، ويتم التأكد من اسمه قبل التأكيد. رمز QR يفتح تحويلاً لذلك الحساب، ومسحه داخل التطبيق يملأ المستلم تلقائياً.')}
  ${sec(lang === 'en' ? '3 — Visa cards' : '٣ — بطاقات فيزا',
    lang === 'en' ? 'A Visa card costs 100,000 SDG on issuance, is valid 5 years from issuance, and at most 5 active cards per user. The fee is non-refundable and cancellation is final; a cancelled card\'s remaining USD stays locked on the card and does not return to the account. Card balances are USD only. Cards are topped up from the FX account only, and card-to-card transfers are USD only. Cards can be frozen, unfrozen, and their daily limit and CVV changed; the eye icon shows the full card details.' : 'بطاقة فيزا سعر إصدارها ١٠٠٬٠٠٠ ج.س، وصالحة ٥ سنوات من تاريخ الإصدار، وبحد أقصى ٥ بطاقات نشطة لكل مستخدم. السعر غير مسترد والإلغاء نهائي؛ ورصيد البطاقة الملغاة بالدولار يبقى محبوساً فيها ولا يعود للحساب. أرصدة البطاقات بالدولار فقط. البطاقة تُشحن من الحساب الأجنبي فقط، وتحويلات البطاقات تتم من بطاقة إلى بطاقة بالدولار فقط. يمكن تجميد البطاقة وإلغاء تجميدها وتغيير حدها اليومي ورمز CVV، وأيقونة العين تعرض تفاصيل البطاقة كاملة.')}
  ${sec(lang === 'en' ? '4 — FX account' : '٤ — الحساب الأجنبي',
    lang === 'en' ? 'One USD account per user. It is funded from the SDG account only at the demo rate of 1 USD = 10,000 SDG, and FX transfers go to another user\'s FX account by its FX number with a name check. Historical conversion titles keep the rate recorded at their time.' : 'حساب دولاري واحد لكل مستخدم. يُشحن من حساب الجنيه فقط بالسعر التجريبي ١ دولار = ١٠٬٠٠٠ ج.س، وتحويلات الأجنبي تذهب لحساب أجنبي آخر برقمه مع التأكد من الاسم. عناوين التحويل القديمة تحتفظ بالسعر المسجل وقتها.')}
  ${sec(lang === 'en' ? '5 — Deposits and investments' : '٥ — الودائع والاستثمار',
    lang === 'en' ? 'Deposits: durations 24 hours, week, month, 3 months, 6 months, year. Annual profit rates: under 1,000,000 SDG — 12%; 1,000,000 to under 10,000,000 — 15%; 10,000,000 to under 1,000,000,000 — 20%; 1,000,000,000 and above — 30%. Profit = amount × annual rate × (days ÷ 365); maturity = deposit date + days. Investments: currencies, gold and company shares at announced demo prices. Prices move automatically: one global price per asset for all users, advancing one random step (max ±2%) per 5 minutes elapsed, within 50%–200% of the starting price. Your portfolio value rises and falls with the price, and selling realises the gain or loss in cash; this is not real trading.' : 'الودائع: المدد ٢٤ ساعة وأسبوع وشهر و٣ أشهر و٦ أشهر وسنة. النسب السنوية: أقل من ١٬٠٠٠٬٠٠٠ ج.س — ١٢٪؛ من ١٬٠٠٠٬٠٠٠ إلى أقل من ١٠٬٠٠٠٬٠٠٠ — ١٥٪؛ من ١٠٬٠٠٠٬٠٠٠ إلى أقل من ١٬٠٠٠٬٠٠٠٬٠٠٠ — ٢٠٪؛ من ١٬٠٠٠٬٠٠٠٬٠٠٠ فأكثر — ٣٠٪. الربح = المبلغ × النسبة السنوية × (الأيام ÷ ٣٦٥)؛ والاستحقاق = تاريخ الإيداع + الأيام. الاستثمار: عملات وذهب وأسهم شركات بأسعار تجريبية معلنة. الأسعار بتتحرك تلقائياً: سعر عالمي واحد لكل أصل لكل المستخدمين، بيتقدم خطوة عشوائية (بحد أقصى ±2%) عن كل 5 دقائق فاتت، وبين 50% و200% من السعر الأصلي. قيمة محفظتك بتزيد وبتنقص مع السعر، والبيع بيحوّل الربح أو الخسارة لكاش؛ وهذا ليس تداولاً حقيقياً.')}
  ${sec(lang === 'en' ? '6 — Bonuses' : '٦ — المكافآت',
    lang === 'en' ? 'Welcome bonus: 15,000 SDG on activation of your first account per device. Invite bonus: 50,000 SDG for the new account that enters a valid invite code (WSL + the inviter\'s SDG account, e.g. WSL1002) at activation — once per account and once per device. The inviter also gets 50,000 SDG for each person who activates with their code. An invalid code still activates without the invite bonus.' : 'المكافأة الترحيبية: ١٥٬٠٠٠ ج.س عند تفعيل أول حساب من كل جهاز. مكافأة الدعوة: ٥٠٬٠٠٠ ج.س للحساب الجديد الذي يكتب رمز دعوة صحيح (WSL + رقم حساب الداعي بالجنيه، مثلاً WSL1002) عند التفعيل — مرة واحدة للحساب ومرة واحدة للجهاز. والداعي بياخد 50,000 ج.س عن كل شخص يفعّل برمزه. الرمز غير الصحيح يفعّل الحساب من غير مكافأة الدعوة.')}
  ${sec(lang === 'en' ? '7 — Admin, freeze and ban' : '٧ — الأدمن والتجميد والحظر',
    lang === 'en' ? 'The admin account is not an ordinary user account: it cannot transfer, pay bills or hold cards. It funds user accounts in SDG and USD (unlimited), freezes a specific amount or all assets, unbans only with admin approval, bans users, and stops or restarts user cards. A banned account cannot log in; a frozen amount cannot be spent until the admin releases it. Fingerprint login is real device biometrics (WebAuthn) enrolled after password login; password login always remains as fallback.' : 'حساب الأدمن ليس حساب مستخدم عادياً: لا يحوّل ولا يدفع فواتير ولا يملك بطاقات. يموّل حسابات المستخدمين بالجنيه والدولار (من غير حد)، ويجمّد مبلغاً معيناً أو كل الأصول، ولا يُعاد فتح الحساب إلا بموافقة الأدمن، ويحظر المستخدمين، ويوقف بطاقاتهم أو يعيد تشغيلها. الحساب المحظور لا يستطيع الدخول، والمبلغ المجمّد لا يُصرف حتى يفكّه الأدمن. دخول البصمة بصمة جهاز حقيقية (WebAuthn) تُسجّل بعد دخول كلمة المرور؛ ودخول كلمة المرور يبقى دائماً كبديل.')}
  ${sec(lang === 'en' ? '8 — Security questions and transfer PIN' : '٨ — أسئلة الأمان ورمز PIN للتحويل',
    lang === 'en' ? 'In the Security Centre you can set two security questions and a 4-digit transfer PIN. Once a PIN is set, every SDG, FX and card-to-card transfer asks for it after the review screen, and the transfer is rejected without the correct PIN. After 5 wrong PIN attempts, PIN checks lock for 5 minutes. Change the PIN in the Security Centre with your current PIN or your password. If you forget your password or PIN, use "Forgot password?" on the login screen and answer your security questions to reset either or both — but only if you set the questions before forgetting. Answers are stored hashed and are never shown.' : 'في مركز الأمان يمكنك ضبط سؤالين للأمان ورمز PIN للتحويل من 4 أرقام. بعد ضبط الرمز، كل تحويل بالجنيه أو الأجنبي أو من بطاقة إلى بطاقة يطلب الرمز بعد شاشة المراجعة، ويُرفض التحويل من دون الرمز الصحيح. بعد 5 محاولات خاطئة، يُقفل التحقق بالـ PIN لمدة 5 دقائق. غيّر الرمز من مركز الأمان برمز PIN الحالي أو بكلمة المرور. إذا نسيت كلمة المرور أو الرمز، استخدم "نسيت كلمة المرور؟" في شاشة الدخول وأجب على أسئلة الأمان لإعادة تعيين أحدهما أو كليهما — لكن فقط إذا ضبطت الأسئلة قبل النسيان. الإجابات محفوظة مشفرة ولا تظهر أبداً.')}
  ${sec(lang === 'en' ? '9 — FX conversion and beneficiaries' : '٩ — التحويل الأجنبي والمستفيدون',
    lang === 'en' ? 'You can convert USD from your FX account back to your SDG account at the same rate (1 USD = 10,000 SDG). Recipient lists show only beneficiaries you added yourself — never all registered users. Add a beneficiary from the transfer or FX screen by account number, after checking the name. After more than 3 transfers to the same account, the app offers to add that account to your beneficiaries; pressing Agree adds it, declining means it will not be offered again for that account.' : 'يمكنك تحويل الدولار من حسابك الأجنبي إلى حساب الجنيه بنفس السعر (1 دولار = 10,000 ج.س). قوائم المستلمين تعرض فقط المستفيدين الذين أضفتهم بنفسك — وليس كل المستخدمين المسجلين. أضف مستفيداً من شاشة التحويل أو الأجنبي برقم الحساب بعد التحقق من الاسم. بعد أكثر من 3 تحويلات لنفس الحساب، يعرض التطبيق إضافة ذلك الحساب إلى مستفيديك؛ الضغط على موافقة يضيفه، والرفض يعني أنه لن يُعرض مجدداً لذلك الحساب.')}
  ${sec(lang === 'en' ? '10 — Transfer fees' : '١٠ — رسوم التحويل',
    lang === 'en' ? 'Every transfer carries a fee paid by the sender on top of the amount; the recipient receives the full amount. SDG transfers: 300 SDG per transfer. USD transfers (FX to FX, and card to card): 0.50 USD per transfer. The fee appears in the review screen before confirmation and as its own line in your history. Funding, conversions between your own accounts, bills, deposits and investments carry no transfer fee.' : 'كل تحويل عليه رسوم يدفعها المرسل فوق المبلغ؛ والمستلم يصله المبلغ كاملاً. تحويلات الجنيه: 300 ج.س لكل تحويلة. تحويلات الدولار (من أجنبي إلى أجنبي، ومن بطاقة إلى بطاقة): 0.50 دولار لكل تحويلة. الرسوم تظهر في شاشة المراجعة قبل التأكيد وكسطر مستقل في سجل معاملاتك. الشحن والتحويل بين حساباتك نفسها والفواتير والودائع والاستثمار ليس عليها رسوم تحويل.')}
  ${agreed ? `<button class="btn" onclick="agreePolicy()">${lang === 'en' ? 'Already agreed — continue' : 'تمت الموافقة سابقاً — متابعة'}</button>` : `<p class="muted" id="policy-timer">${lang === 'en' ? 'Read the policy — the agree button activates after 10 seconds.' : 'اقرأ السياسة — زر الموافقة يتفعل بعد 10 ثواني.'}</p><button class="btn" id="policy-agree-btn" disabled onclick="agreePolicy()"><span id="policy-check" style="opacity:.35">○</span> ${lang === 'en' ? 'I agree to the site policy' : 'موافق على سياسة الموقع'}</button>`}
  <p class="muted">${lang === 'en' ? 'Agreeing means you understood this is a demo with fake money, not a real bank.' : 'الموافقة تعني أنك فهمت أن هذا نموذج تجريبي بأموال وهمية، وليس بنكاً حقيقياً.'}</p>`;
}
function agreePolicy(){
  localStorage.setItem('wassil-policy-agreed', '1');
  toast(lang === 'en' ? 'Policy agreed — you can now create an account' : 'تمت الموافقة على السياسة — يمكنك الآن إنشاء حساب');
  go(window._policyReturn || 'signup');
}
function simpleView(title, body, backView, subtitle){
  const bv = backView || 'home';
  const bl = bv === 'services' ? t('backServices') : (bv === 'login' ? t('login') : t('backHome'));
  return `${backLink(bl, bv)}
  <div class="page-title">${esc(title)}</div>${subtitle ? `<p class="page-sub">${subtitle}</p>` : ''}
  <div class="card">${body}</div>
  `;
}
function render(){
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  // Admin lands only on admin views: the admin account is not an ordinary account.
  if (me && me.role === 'admin' && !['login', 'signup', 'admin', 'account', 'policies'].includes(view)) view = 'admin';
  if (view === 'home' && window._pendingTo && me) view = 'transfer';
  let html = '';
  if (view === 'login') html = loginView();
  else if (view === 'signup') html = signupView();
  else if (view === 'transfer') html = transferView();
  else if (view === 'fx') html = fxView();
  else if (view === 'cards') html = cardsView();
  else if (view === 'cardPage') html = cardPageView();
  else if (view === 'deposits') html = depositsView();
  else if (view === 'invest') html = investView();
  else if (view === 'receipt') html = receiptView();
  else if (view === 'admin') html = adminView();
  else if (view === 'security') html = securityView();
  else if (view === 'services') html = servicesView();
  else if (view === 'account') html = accountView();
  else if (view === 'statement') html = statementView();
  else if (view === 'notifications') html = notificationsView();
  else if (view === 'qr') html = qrView();
  else if (view === 'scan') html = scanView();
  else if (view === 'loan') html = loanView();
  else if (view === 'cardTopup') html = cardTopupView();
  else if (view === 'cardTransfer') html = cardTransferView();
  else if (view === 'bills') html = simpleView(t('bills'), `<div id="bills-list"></div>`, 'home', '');
  else if (view === 'goals') html = simpleView(t('goals'), `<label>Name / الاسم</label><input id="goal-name"><label>Target (SDG)</label><input id="goal-tgt" type="number"><button class="btn" onclick="addGoal()">${t('send')}</button><div id="goals-list"></div>`, 'services', '');
  else if (view === 'orders') html = simpleView(t('orders'), `<label>${t('toAccount')}</label><input id="ord-to"><label>${t('amount')} (SDG)</label><input id="ord-amt" type="number"><button class="btn" onclick="addOrder()">${t('send')}</button><div id="orders-list"></div>`, 'services', '');
  else if (view === 'branches') html = simpleView(t('branches'), `<div id="branches-list"></div>`, 'home', '');
  else if (view === 'faq') html = simpleView(t('faq'), `<button class="btn" onclick="window._policyReturn='faq';go('policies')">${lang === 'en' ? 'Site policy' : 'سياسة الموقع'}</button>`, 'home', '');
  else if (view === 'policies') html = policiesView();
  else if (view === 'forgot') html = forgotView();
  else html = homeView();
  const logged = !!me && view !== 'login' && view !== 'signup' && view !== 'forgot';
  if (logged) html = userbar() + html;
  app().innerHTML = html;
  // Policy reading timer: the agree button stays disabled for 10 seconds
  // of reading, then the check icon activates and agreement becomes possible.
  if (window._policyTimer) { clearInterval(window._policyTimer); window._policyTimer = null; }
  if (view === 'policies' && localStorage.getItem('wassil-policy-agreed') !== '1') {
    let left = 10;
    const tick = () => {
      const btn = document.getElementById('policy-agree-btn'); const tm = document.getElementById('policy-timer'); const ck = document.getElementById('policy-check');
      if (!btn || !tm) { clearInterval(window._policyTimer); window._policyTimer = null; return; }
      if (left <= 0) {
        btn.disabled = false;
        if (ck) { ck.textContent = '✓'; ck.style.opacity = '1'; ck.style.color = '#16a34a'; }
        tm.textContent = lang === 'en' ? 'You can now agree to the site policy.' : 'يمكنك الآن الموافقة على سياسة الموقع.';
        clearInterval(window._policyTimer); window._policyTimer = null; return;
      }
      tm.textContent = lang === 'en' ? 'Read the policy — the agree button activates in ' + left + ' seconds.' : 'اقرأ السياسة — زر الموافقة يتفعل بعد ' + left + ' ثواني.';
      left--;
    };
    tick(); window._policyTimer = setInterval(tick, 1000);
  }
  const nav = document.getElementById('bottomNav');
  if (nav) {
    nav.classList.toggle('hidden', !logged);
    document.body.classList.toggle('nav-on', logged);
    document.querySelectorAll('[data-nav]').forEach(b => { b.style.display = ''; });
    if (me && me.role === 'admin') document.querySelectorAll('[data-nav="transfer"], [data-nav="bills"], [data-nav="services"]').forEach(b => { b.style.display = 'none'; });
    const activeFor = { home: 'home', transfer: 'transfer', bills: 'bills', services: 'services', account: 'account', admin: 'home' }[view];
    document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === activeFor));
    const navLabels = { home: lang === 'en' ? 'Home' : 'الرئيسية', transfer: lang === 'en' ? 'Transfer' : 'تحويل', bills: lang === 'en' ? 'Bills' : 'فواتير', services: lang === 'en' ? 'Services' : 'الخدمات', account: lang === 'en' ? 'My account' : 'حسابي' };
    document.querySelectorAll('[data-nav]').forEach(b => { const sp = b.querySelector('span'); if (sp && navLabels[b.dataset.nav]) sp.textContent = navLabels[b.dataset.nav]; });
  }
  renderRealQrs();
  if (view === 'scan') startScan();
  if (view === 'transfer' && window._pendingTo) { const p = window._pendingTo; window._pendingTo = ''; const inp = $('#tr-to'); if (inp) { inp.value = p; lookupAcc(); } }
  if (view === 'invest') loadInvest();
  if (view === 'deposits') loadDeposits();
  if (view === 'bills') loadBills();
  if (view === 'goals') loadGoals();
  if (view === 'orders') loadOrders();
  if (view === 'branches') loadBranches();
}

// ---------- actions ----------
async function doLogin(){
  try { const j = await api('/api/login', { method:'POST', body: JSON.stringify({ identifier: $('#li-email').value, email: $('#li-email').value, password: $('#li-pass').value }) });
    token = j.token; localStorage.setItem('wassil-token', token); await loadDash(); go('home'); }
  catch(e){ $('#li-err').textContent = e.message; }
}
async function doSignup(){
  try { const j = await api('/api/register', { method:'POST', body: JSON.stringify({ email: $('#su-email').value, fullNameAr: $('#su-ar').value, fullNameEn: $('#su-en').value, password: $('#su-pass').value, inviteCode: $('#su-invite') ? $('#su-invite').value : '', policyAgreed: localStorage.getItem('wassil-policy-agreed') === '1' }) });
    $('#su-ok').textContent = 'Activation code (shown in-app, no real email sent): ' + j.activationCode + ' / كود التفعيل (يظهر داخل التطبيق، لم يُرسل بريد حقيقي): ' + j.activationCode;
    $('#su-activate').classList.remove('hidden'); window._actEmail = j.email; window._actCode = j.activationCode; }
  catch(e){ $('#su-err').textContent = e.message; }
}
async function doActivate(){
  try { const j = await api('/api/activate', { method:'POST', body: JSON.stringify({ email: window._actEmail, code: $('#su-code').value, deviceId: getDeviceId() }) });
    $('#su-ok').textContent = 'Activated! Account: ' + j.user.sdgAccount + ' / تم التفعيل! رقم الحساب: ' + j.user.sdgAccount + (j.bonusGranted ? ' — Welcome bonus: 15,000 SDG / مكافأة ترحيبية: 15,000 ج.س' : '') + (j.inviteBonusGranted ? ' — Invite bonus: 50,000 SDG / مكافأة دعوة: 50,000 ج.س' : '') + (j.inviteInvalid ? ' — Invite code was invalid, activated without invite bonus / رمز الدعوة غير صحيح، تم التفعيل بدون مكافأة الدعوة' : '') + (j.inviteDeviceClaimed ? ' — Invite bonus already claimed on this device / مكافأة الدعوة مستخدمة من قبل على هذا الجهاز' : ''); go('login'); }
  catch(e){ $('#su-err').textContent = e.message; }
}
function doLogout(){ token=''; localStorage.removeItem('wassil-token'); me=null; go('login'); }
async function lookupAcc(){ await doLookupInto('tr-to', 'tr-name'); }
async function doLookupInto(inputId, nameId){
  const inp = document.getElementById(inputId), el = document.getElementById(nameId);
  if (!inp || !el) return;
  try { const j = await api('/api/lookup', { method:'POST', body: JSON.stringify({ account: inp.value }) });
    el.textContent = (lang==='en' ? (j.nameEn || j.nameAr) : j.nameAr) + ' — ' + (j.cardMasked || j.sdgAccount); }
  catch { el.textContent = lang === 'en' ? 'Not found' : 'غير موجود'; }
}
let _lookupTimer = null;
function lookupDebounced(inputId, nameId){
  const inp = document.getElementById(inputId), el = document.getElementById(nameId);
  if (!inp || !el) return;
  if (inp.value.trim().length < 4) { el.textContent = ''; return; }
  clearTimeout(_lookupTimer);
  _lookupTimer = setTimeout(() => doLookupInto(inputId, nameId), 400);
}
async function doTransfer(){
  // Review step: elegant in-app sheet with the transfer summary.
  // The optional note is shown on the form only; the transfer API takes no note field, so it is not sent or stored.
  const to = $('#tr-to') ? $('#tr-to').value : ''; const amt = $('#tr-amt') ? $('#tr-amt').value : '';
  const name = $('#tr-name') ? $('#tr-name').textContent : '';
  await loadDash();
  const pinLine = me?.pinSet ? [lang === 'en' ? 'PIN' : 'رمز PIN', lang === 'en' ? 'Will be asked after review' : 'سيُطلب بعد المراجعة'] : [lang === 'en' ? 'PIN' : 'رمز PIN', lang === 'en' ? 'Not set — proceeds without PIN' : 'غير مضبوط — سيتم التحويل من غير PIN'];
  if (!(await confirmSheet({ title: lang === 'en' ? 'Review transfer' : 'مراجعة التحويل', lines: [[lang === 'en' ? 'To' : 'إلى', name || to], [lang === 'en' ? 'Amount' : 'المبلغ', amt + ' SDG'], [lang === 'en' ? 'Fee' : 'الرسوم', '300 SDG'], [lang === 'en' ? 'Total debited' : 'الإجمالي المخصوم', (Number(amt) + 300) + ' SDG'], pinLine], confirmLabel: lang === 'en' ? 'Confirm transfer' : 'تأكيد التحويل' }))) return;
  let pin = '';
  if (me?.pinSet) { pin = await pinSheet(lang === 'en' ? 'Enter your transfer PIN' : 'أدخل رمز PIN للتحويل'); if (pin === null) return; }
  const runTransfer = async (p) => api('/api/transfer', { method:'POST', body: JSON.stringify({ toAccount: to, amount: amt, pin: p }) });
  try { const j = await runTransfer(pin);
    toast((lang === 'en' ? 'Transfer successful — ' : 'تم التحويل بنجاح — ') + j.ref); await loadDash(); await maybeSuggestBeneficiary(j); go('home'); }
  catch(e){ if (e.message === 'pin_required') { const p2 = await pinSheet(lang === 'en' ? 'Enter your transfer PIN' : 'أدخل رمز PIN للتحويل'); if (p2 === null) return; try { const j2 = await runTransfer(p2); toast((lang === 'en' ? 'Transfer successful — ' : 'تم التحويل بنجاح — ') + j2.ref); await loadDash(); await maybeSuggestBeneficiary(j2); go('home'); } catch(e2){ $('#tr-err').textContent = friendlyErr(e2.message); } } else $('#tr-err').textContent = friendlyErr(e.message); }
}
async function doFxFund(){
  try { const j = await api('/api/fx/fund', { method:'POST', body: JSON.stringify({ amountSdg: $('#fx-amt').value }) });
    toast('OK — ' + j.ref); await loadDash(); go('home'); } catch(e){ $('#fx-err').textContent = e.message; }
}
async function doFxSell(){
  const amt = $('#fx-sell-usd').value;
  if (!(Number(amt) > 0)) { $('#fx-err').textContent = lang === 'en' ? 'Enter an amount' : 'أدخل المبلغ'; return; }
  const rate = dash?.usdRate || 10000; const sdg = Math.floor(Number(amt) * rate);
  if (!(await confirmSheet({ title: lang === 'en' ? 'Review conversion' : 'مراجعة التحويل', lines: [[lang === 'en' ? 'From FX' : 'من الأجنبي', amt + ' USD'], [lang === 'en' ? 'To SDG' : 'إلى الجنيه', sdg + ' SDG']], confirmLabel: lang === 'en' ? 'Confirm conversion' : 'تأكيد التحويل' }))) return;
  try { const j = await api('/api/fx/sell', { method:'POST', body: JSON.stringify({ amountUsd: amt }) }); toast((lang === 'en' ? 'Converted successfully — ' : 'تم التحويل بنجاح — ') + j.ref); await loadDash(); go('home'); } catch(e){ $('#fx-err').textContent = friendlyErr(e.message); }
}
async function doFxTransfer(){
  const to = $('#fx-to').value, amt = $('#fx-usd').value;
  const fxName = $('#fx-name') ? $('#fx-name').textContent : '';
  await loadDash();
  const pinLine = me?.pinSet ? [lang === 'en' ? 'PIN' : 'رمز PIN', lang === 'en' ? 'Will be asked after review' : 'سيُطلب بعد المراجعة'] : [lang === 'en' ? 'PIN' : 'رمز PIN', lang === 'en' ? 'Not set — proceeds without PIN' : 'غير مضبوط — سيتم التحويل من غير PIN'];
  if (!(await confirmSheet({ title: lang === 'en' ? 'Review FX transfer' : 'مراجعة التحويل الأجنبي', lines: [[lang === 'en' ? 'To FX account' : 'إلى الحساب الأجنبي', fxName || to], [lang === 'en' ? 'Amount' : 'المبلغ', amt + ' USD'], [lang === 'en' ? 'Fee' : 'الرسوم', '0.50 USD'], [lang === 'en' ? 'Total debited' : 'الإجمالي المخصوم', (Number(amt) + 0.5).toFixed(2) + ' USD'], pinLine], confirmLabel: lang === 'en' ? 'Confirm transfer' : 'تأكيد التحويل' }))) return;
  let pin = '';
  if (me?.pinSet) { pin = await pinSheet(lang === 'en' ? 'Enter your transfer PIN' : 'أدخل رمز PIN للتحويل'); if (pin === null) return; }
  const runFx = async (p) => api('/api/fx/transfer', { method:'POST', body: JSON.stringify({ toFxAccount: to, amountUsd: amt, pin: p }) });
  try { const j = await runFx(pin);
    toast((lang === 'en' ? 'Transfer successful — ' : 'تم التحويل بنجاح — ') + j.ref); await loadDash(); await maybeSuggestBeneficiary(j); go('home'); }
  catch(e){ if (e.message === 'pin_required') { const p2 = await pinSheet(lang === 'en' ? 'Enter your transfer PIN' : 'أدخل رمز PIN للتحويل'); if (p2 === null) return; try { const j2 = await runFx(p2); toast((lang === 'en' ? 'Transfer successful — ' : 'تم التحويل بنجاح — ') + j2.ref); await loadDash(); await maybeSuggestBeneficiary(j2); go('home'); } catch(e2){ $('#fx-err').textContent = friendlyErr(e2.message); } } else $('#fx-err').textContent = friendlyErr(e.message); }
}
async function requestCard(){
  try { const j = await api('/api/cards/request', { method:'POST', body: '{}' }); toast(lang === 'en' ? 'Card requested successfully' : 'تم طلب البطاقة بنجاح'); await loadDash(); go('cards'); }
  catch(e){ $('#cd-err').textContent = e.message; }
}
async function openCard(id){
  try { const j = await api('/api/cards/' + id); selCard = { ...j.card, history: j.history }; go('cardPage'); } catch(e){ toast(e.message, 'err'); }
}
async function openTx(id){
  try { const j = await api('/api/transactions/' + id); selTx = j.transaction; go('receipt'); } catch(e){ toast(e.message, 'err'); }
}
async function toggleEye(){
  const el = $('#cardDetails');
  if (!el.classList.contains('hidden')) { el.classList.add('hidden'); return; }
  try { const j = await api('/api/cards/' + selCard.id + '/details');
    el.innerHTML = `<p>${t('viewDetails')}: ${esc(j.fullNumber)} — ${esc(j.exp)} — CVV ${esc(j.cvv)} — ${esc(lang==='en' ? j.holderEn : j.holderAr)}</p>
    <button class="btn small" onclick="copyCardNum('${esc(j.fullNumber)}')">${t('copyNum')}</button>`;
    el.classList.remove('hidden'); } catch(e){ toast(e.message, 'err'); }
}
async function copyCardNum(num){
  try { await navigator.clipboard.writeText(num); } catch { const ta = document.createElement('textarea'); ta.value = num; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
  toast(t('copied'));
}
async function freezeCard(){ try { const j = await api('/api/cards/' + selCard.id + '/freeze', { method:'POST', body:'{}' }); selCard = { ...j.card, history: selCard.history }; render(); } catch(e){ toast(e.message, 'err'); } }
async function unfreezeCard(){ try { const j = await api('/api/cards/' + selCard.id + '/unfreeze', { method:'POST', body:'{}' }); selCard = { ...j.card, history: selCard.history }; render(); } catch(e){ toast(e.message, 'err'); } }
async function cancelCard(){
  if (!(await confirmSheet({ title: t('cancelCard'), note: '100,000 SDG issuance fee is NON-REFUNDABLE and final. Any remaining USD balance stays locked on the cancelled card and does not return to the account. / رسوم الإصدار 100,000 جنيه غير مستردة ونهائية، وأي رصيد دولار متبقٍّ يبقى مقفلاً على البطاقة الملغاة ولا يعود للحساب.', confirmLabel: t('cancelCard'), danger: true }))) return;
  try { const j = await api('/api/cards/' + selCard.id + '/cancel', { method:'POST', body:'{}' }); toast(j.noteAr || 'Cancelled'); await loadDash(); go('cards'); } catch(e){ toast(e.message, 'err'); }
}
async function changeCvv(){
  const pw = prompt(t('password')); const nv = prompt('New CVV (3 digits) / رمز CVV الجديد (3 أرقام)');
  if (!pw || !nv) return;
  try { await api('/api/cards/' + selCard.id + '/change-cvv', { method:'POST', body: JSON.stringify({ password: pw, newCvv: nv }) }); toast('OK'); } catch(e){ toast(e.message, 'err'); }
}
async function topupCard(){
  const amt = prompt('Amount in USD (from FX account only) / المبلغ بالدولار (من الحساب الأجنبي فقط)');
  if (!amt) return;
  try { const j = await api('/api/cards/' + selCard.id + '/topup', { method:'POST', body: JSON.stringify({ amountUsd: amt }) }); toast('OK'); await loadDash(); openCard(selCard.id); } catch(e){ toast(e.message + ' — Cards can only be topped up from the FX account / البطاقة لا تُشحن إلا من الحساب الأجنبي'); }
}

async function changeLimit(){
  const lim = prompt('New daily limit in USD / الحد اليومي الجديد بالدولار');
  if (!lim) return;
  try { await api('/api/cards/' + selCard.id + '/limit', { method:'POST', body: JSON.stringify({ dailyLimitUsd: lim }) }); toast('OK'); } catch(e){ toast(e.message, 'err'); }
}
async function doDeposit(){
  try { const j = await api('/api/deposits', { method:'POST', body: JSON.stringify({ principal: $('#dp-amt').value, durationDays: $('#dp-days').value }) });
    $('#dp-ok').textContent = `Rate ${Math.round(j.deposit.rate*100)}% — Profit ${j.deposit.profit} SDG — Maturity ${new Date(j.deposit.maturityDate).toLocaleDateString()} — Total ${j.deposit.total}`; await loadDash(); }
  catch(e){ $('#dp-err').textContent = e.message; }
}
async function loadInvest(){
  try { const a = await api('/api/investments/assets'); const p = await api('/api/investments/portfolio');
    $('#inv-assets').innerHTML = a.assets.map(x => { const base = x.basePriceSdg || x.priceSdg; const diff = x.priceSdg - base; const pct = base ? (diff / base * 100) : 0; const col = diff > 0 ? '#047857' : diff < 0 ? '#dc2626' : '#64748b'; const arrow = diff > 0 ? '▲' : diff < 0 ? '▼' : '—'; const word = diff > 0 ? (lang==='en' ? 'Up' : 'ارتفع') : diff < 0 ? (lang==='en' ? 'Down' : 'انخفض') : (lang==='en' ? 'Steady' : 'ثابت'); const badge = `${arrow} ${word} ${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`; const wait = diff === 0 ? ` <span class="muted">${lang==='en' ? '— first move within 5 minutes' : '— أول حركة خلال 5 دقائق'}</span>` : ''; return `<div class="row"><span><b>${lang==='en'?x.nameEn:x.nameAr}</b> — ${x.priceSdg} SDG / ${lang==='en'?x.unitEn:x.unitAr}<br><span class="muted">${lang==='en' ? 'Starting price' : 'السعر الأصلي'}: ${base} SDG</span> <span style="color:${col};font-weight:800">${badge}</span>${wait}</span><button class="btn small" onclick="buyAsset('${x.id}')">Buy / شراء</button></div>`; }).join('');
    $('#inv-port').innerHTML = '<h3>Portfolio / المحفظة</h3>' + (p.holdings.map(h => { const nm = h.asset ? (lang==='en' ? h.asset.nameEn : h.asset.nameAr) : h.assetId; const arr = h.profitSdg > 0 ? '▲ ' : h.profitSdg < 0 ? '▼ ' : ''; return `<div class="row"><span>${nm} × ${h.quantity} — value ${h.valueSdg} — P/L <span style="color:${h.profitSdg >= 0 ? '#047857' : '#dc2626'};font-weight:800">${arr}${h.profitSdg}</span></span><button class="btn small" onclick="sellAsset('${h.assetId}')">Sell / بيع</button></div>`; }).join('') || '<p class="muted">—</p>');
  } catch(e){ const el = $('#inv-err'); if (el) el.textContent = e.message; }
}
async function buyAsset(id){
  const q = await qtySheet('الكمية / Quantity'); if (q === null) return;
  try { await api('/api/investments/buy', { method:'POST', body: JSON.stringify({ assetId: id, quantity: q }) }); toast('OK'); await loadDash(); loadInvest(); } catch(e){ toast(e.message, 'err'); }
}
async function sellAsset(id){
  const q = await qtySheet('الكمية / Quantity'); if (q === null) return;
  try { await api('/api/investments/sell', { method:'POST', body: JSON.stringify({ assetId: id, quantity: q }) }); toast('OK'); await loadDash(); loadInvest(); } catch(e){ toast(e.message, 'err'); }
}
function adminResolveByNumber(num){
  const n = normAcctJs(num);
  const pool = (dash?.allUsers || []);
  const u = pool.find(x => normAcctJs(x.sdgAccount) === n || normAcctJs(x.fxAccount) === n);
  return u ? u.id : '';
}
async function adminFund(){
  let target = $('#ad-user') ? $('#ad-user').value : ($('#ad-id') ? $('#ad-id').value : '');
  if (!target && $('#ad-num') && $('#ad-num').value.trim()) target = adminResolveByNumber($('#ad-num').value.trim());
  if (!target) { $('#ad-err').textContent = lang === 'en' ? 'Pick a user or enter an account number' : 'اختر مستخدماً أو اكتب رقم الحساب'; return; }
  try { await api('/api/admin/fund', { method:'POST', body: JSON.stringify({ targetUserId: target, amount: $('#ad-amt').value }) }); toast('OK'); await loadDash(); go('admin'); } catch(e){ $('#ad-err').textContent = e.message; }
}
async function adminAction(path, body){
  try { await api(path, { method:'POST', body: JSON.stringify(body) }); toast('OK'); await loadDash(); go('admin'); } catch(e){ const el = $('#ad-err'); if (el) el.textContent = e.message; else toast(e.message, 'err'); }
}
async function adminFreeze(id){ const el = document.getElementById('fz-' + id); await adminAction('/api/admin/freeze', { targetUserId: id, amountSdg: el ? el.value : 0 }); }
async function adminFreezeAll(id){ await adminAction('/api/admin/freeze-all', { targetUserId: id }); }
async function adminUnfreeze(id){ await adminAction('/api/admin/unfreeze', { targetUserId: id }); }
async function adminBan(id){ await adminAction('/api/admin/ban', { targetUserId: id }); }
async function adminFundFx(){
  let target = $('#ad-fx-user') ? $('#ad-fx-user').value : '';
  if (!target && $('#ad-fx-num') && $('#ad-fx-num').value.trim()) target = adminResolveByNumber($('#ad-fx-num').value.trim());
  if (!target) { const el = $('#ad-fx-err'); if (el) el.textContent = lang === 'en' ? 'Pick a user or enter an account number' : 'اختر مستخدماً أو اكتب رقم الحساب'; return; }
  try { await api('/api/admin/fund-fx', { method:'POST', body: JSON.stringify({ targetUserId: target, amountUsd: $('#ad-fx-amt').value }) }); toast('OK'); await loadDash(); go('admin'); } catch(e){ const el = $('#ad-fx-err'); if (el) el.textContent = e.message; }
}
async function adminCardFreeze(cardId){ await adminAction('/api/admin/card-freeze', { cardId }); }
async function adminCardUnfreeze(cardId){ await adminAction('/api/admin/card-unfreeze', { cardId }); }
async function adminUnban(id){ await adminAction('/api/admin/unban', { targetUserId: id }); }
async function loadBills(){
  try { const j = await api('/api/bills'); $('#bills-list').innerHTML = j.bills.map(b => `<div class="row"><span>${lang==='en'?b.nameEn:b.nameAr} — ${b.amountSdg}</span><button class="btn small" onclick="payBill('${b.id}')">Pay / دفع</button></div>`).join(''); } catch {}
}
async function payBill(id){ try { await api('/api/bills/pay', { method:'POST', body: JSON.stringify({ billId: id }) }); toast('OK'); await loadDash(); } catch(e){ toast(e.message, 'err'); } }
async function loadGoals(){
  try { const j = await api('/api/goals'); $('#goals-list').innerHTML = j.goals.map(g => `<div class="row"><span>${esc(g.name)} — ${g.savedSdg}/${g.targetSdg}</span></div>`).join(''); } catch {}
}
async function addGoal(){ try { await api('/api/goals', { method:'POST', body: JSON.stringify({ name: $('#goal-name').value, targetSdg: $('#goal-tgt').value }) }); loadGoals(); } catch(e){ toast(e.message, 'err'); } }
async function loadOrders(){
  try { const j = await api('/api/orders'); $('#orders-list').innerHTML = j.orders.map(o => `<div class="row"><span>${esc(o.toAccount)} — ${o.amountSdg}</span></div>`).join(''); } catch {}
}
async function addOrder(){ try { await api('/api/orders', { method:'POST', body: JSON.stringify({ toAccount: $('#ord-to').value, amountSdg: $('#ord-amt').value, frequency: 'monthly' }) }); loadOrders(); } catch(e){ toast(e.message, 'err'); } }
async function loadBranches(){
  try { const j = await api('/api/branches'); $('#branches-list').innerHTML = j.branches.map(b => `<div class="row"><span>${lang==='en'?b.nameEn:b.nameAr} — ${lang==='en'?b.cityEn:b.cityAr}</span></div>`).join(''); } catch {}
}
function b64url(buf){ return btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function b64urlToBuf(s){ s = s.replace(/-/g,'+').replace(/_/g,'/'); while (s.length % 4) s += '='; const bin = atob(s); const a = new Uint8Array(bin.length); for (let i=0;i<bin.length;i++) a[i] = bin.charCodeAt(i); return a.buffer; }
async function enableFp(){
  try {
    if (!window.PublicKeyCredential) throw new Error('Biometric not supported on this device/browser / البصمة غير متاحة على هذا الجهاز/المتصفح');
    const o = await api('/api/webauthn/register/options', { method:'POST', body:'{}' });
    const cred = await navigator.credentials.create({ publicKey: {
      challenge: b64urlToBuf(o.challenge), rp: o.rp, user: { id: b64urlToBuf(o.user.id), name: o.user.name, displayName: o.user.displayName },
      pubKeyCredParams: [{ type:'public-key', alg:-7 }], authenticatorSelection: { authenticatorAttachment:'platform', userVerification:'required', residentKey:'preferred' }, timeout: 60000, attestation: 'none' } });
    const payload = { id: cred.id, rawId: b64url(cred.rawId), type: cred.type, response: { attestationObject: b64url(cred.response.attestationObject), clientDataJSON: b64url(cred.response.clientDataJSON) } };
    await api('/api/webauthn/register/verify', { method:'POST', body: JSON.stringify({ credential: payload }) });
    $('#sec-ok').textContent = 'Fingerprint login enabled for this device / تم تفعيل الدخول بالبصمة لهذا الجهاز';
  } catch(e){ $('#sec-err').textContent = e.message; }
}
async function doSaveQuestions(){
  const q1 = $('#sq-1').value, a1 = $('#sa-1').value, q2 = $('#sq-2').value, a2 = $('#sa-2').value;
  if (q1 === q2) { $('#sq-err').textContent = lang === 'en' ? 'Pick two different questions' : 'اختر سؤالين مختلفين'; return; }
  try { await api('/api/security/questions', { method:'POST', body: JSON.stringify({ questions: [{ id: q1, answer: a1 }, { id: q2, answer: a2 }] }) }); $('#sq-ok').textContent = lang === 'en' ? 'Security questions saved' : 'تم حفظ أسئلة الأمان'; await loadDash(); render(); }
  catch(e){ $('#sq-err').textContent = friendlyErr(e.message); }
}
async function doSavePin(){
  const proof = $('#pin-proof').value, np = $('#pin-new').value.trim();
  if (!/^\d{4}$/.test(np)) { $('#pin-err').textContent = friendlyErr('bad_pin'); return; }
  try {
    if (me?.pinSet) await api('/api/security/pin/change', { method:'POST', body: JSON.stringify({ newPin: np, currentPin: /^\d{4}$/.test(proof) ? proof : '', password: proof }) });
    else await api('/api/security/pin/set', { method:'POST', body: JSON.stringify({ pin: np, password: proof }) });
    $('#pin-ok').textContent = lang === 'en' ? 'PIN saved' : 'تم حفظ رمز PIN'; await loadDash(); render();
  } catch(e){ $('#pin-err').textContent = friendlyErr(e.message); }
}
async function disableFp(){ try { await api('/api/webauthn/disable', { method:'POST', body:'{}' }); toast('Disabled / تم الإلغاء'); } catch(e){ toast(e.message, 'err'); } }
async function doFpLogin(){
  try {
    const email = $('#li-email').value;
    if (!email) { $('#li-err').textContent = 'Enter your email first / أدخل بريدك أولاً'; return; }
    if (!window.PublicKeyCredential) throw new Error('Biometric not supported on this device/browser / البصمة غير متاحة على هذا الجهاز/المتصفح');
    const o = await api('/api/webauthn/login/options', { method:'POST', body: JSON.stringify({ email }) });
    const allow = o.allowCredentials.map(c => ({ type:'public-key', id: b64urlToBuf(c.id), transports: c.transports }));
    const assertion = await navigator.credentials.get({ publicKey: { challenge: b64urlToBuf(o.challenge), rpId: o.rpId, allowCredentials: allow, userVerification: 'required', timeout: 60000 } });
    const payload = { id: assertion.id, rawId: b64url(assertion.rawId), type: assertion.type, response: { authenticatorData: b64url(assertion.response.authenticatorData), clientDataJSON: b64url(assertion.response.clientDataJSON), signature: b64url(assertion.response.signature), userHandle: assertion.response.userHandle ? b64url(assertion.response.userHandle) : null } };
    const j = await api('/api/webauthn/login/verify', { method:'POST', body: JSON.stringify({ email, credential: payload }) });
    token = j.token; localStorage.setItem('wassil-token', token); await loadDash(); go('home');
  } catch(e){ $('#li-err').textContent = e.message; }
}
function downloadReceipt(){
  const tx = selTx; if (!tx) return;
  (async () => {
  try {
    // Wait for the site font before drawing, so Arabic shapes render with
    // the real font instead of a fallback (this was the distortion cause).
    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch {} }
    const FONT = 'system-ui,-apple-system,"Segoe UI",Tahoma,"Noto Naskh Arabic",Arial,sans-serif';
    const W = 900, PAD = 44, rtl = lang === 'ar';
    const neg = (tx.currency === 'USD' ? (tx.amountUsdCents || 0) : (tx.amountSdg || 0)) < 0;
    const d = new Date(tx.createdAt);
    const dt = isNaN(d) ? '' : d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const conv = tx.conversion || ((tx.currency === 'USD' && tx.amountUsdCents != null && tx.amountSdg)
      ? `${moneySdg(Math.abs(tx.amountSdg))} ← ${moneyUsd(Math.abs(tx.amountUsdCents))}` : '');
    const rows = [
      [lang === 'en' ? 'Operation type' : 'نوع العملية', txTitle(tx)],
      [lang === 'en' ? 'Amount' : 'المبلغ', txAmount(tx)],
      [lang === 'en' ? 'Currency' : 'العملة', tx.currency || ''],
      [lang === 'en' ? 'Sender' : 'المرسل', tx.fromName || ''],
      [lang === 'en' ? 'Sender account' : 'حساب المرسل', tx.fromAccount || ''],
      [lang === 'en' ? 'Recipient' : 'المستلم', tx.toName || ''],
      [lang === 'en' ? 'Recipient account' : 'حساب المستلم', tx.toAccount || ''],
    ];
    if (conv) rows.push([lang === 'en' ? 'Conversion details' : 'تفاصيل التحويل بين العملات', conv]);
    rows.push([lang === 'en' ? 'Date and time' : 'التاريخ والوقت', dt]);
    rows.push([lang === 'en' ? 'Reference number' : 'الرقم المرجعي', tx.ref || '']);
    rows.push([lang === 'en' ? 'Operation status' : 'حالة العملية', lang === 'en' ? 'Completed' : 'مكتملة']);
    // Word-boundary wrapping: split on spaces, never mid-word unless a
    // single word is wider than the column (long refs/accounts).
    function wrap(ctx, text, maxW){
      const words = String(text).split(' ');
      const lines = []; let line = '';
      for (const w of words) {
        const trial = line ? line + ' ' + w : w;
        if (ctx.measureText(trial).width <= maxW || !line) {
          if (ctx.measureText(trial).width > maxW && !line) {
            let part = '';
            for (const ch of w) { if (ctx.measureText(part + ch).width > maxW && part) { lines.push(part); part = ch; } else part += ch; }
            line = part;
          } else line = trial;
        } else { lines.push(line); line = w; }
      }
      if (line) lines.push(line);
      return lines.length ? lines : [''];
    }
    function rr(ctx, x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    // Measure pass (same fonts as the draw pass) to get the exact height.
    const mc = document.createElement('canvas').getContext('2d');
    mc.font = '26px ' + FONT;
    const labelWs = rows.map(([k]) => mc.measureText(k).width);
    const labelCol = Math.max(...labelWs) + 8;
    const valMaxW = W - PAD * 2 - labelCol - 28;
    mc.font = '800 28px ' + FONT;
    const rowLines = rows.map(([, v]) => wrap(mc, v, valMaxW));
    const rowH = rowLines.map(ls => ls.length * 36 + 30);
    const qrSize = 360;
    const H = PAD + 150 + 40 + 147 + 58 + 20 + rowH.reduce((a, b) => a + b, 0) + 12 + 24 + qrSize + 40 + 24 + 40;
    const c = document.createElement('canvas'); c.width = W; c.height = Math.ceil(H);
    const x = c.getContext('2d');
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, H);
    x.strokeStyle = '#0f766e'; x.lineWidth = 4; rr(x, 2, 2, W - 4, H - 4, 44); x.stroke();
    // Header: same teal gradient as the on-screen card.
    const g = x.createLinearGradient(0, PAD, W - PAD, PAD + 150);
    g.addColorStop(0, '#0b4f49'); g.addColorStop(1, '#0f766e');
    x.fillStyle = g; rr(x, PAD, PAD, W - PAD * 2, 150, 32); x.fill();
    x.strokeStyle = 'rgba(255,255,255,.5)'; x.lineWidth = 3; rr(x, PAD + 26, PAD + 26, 98, 98, 26); x.stroke();
    try {
      const url = URL.createObjectURL(new Blob([WAVE], { type: 'image/svg+xml;charset=utf-8' }));
      const img = new Image();
      await new Promise((res) => { img.onload = res; img.onerror = res; img.src = url; });
      if (img.naturalWidth) x.drawImage(img, PAD + 26 + 13, PAD + 26 + 13, 72, 72);
      URL.revokeObjectURL(url);
    } catch {}
    x.fillStyle = '#ffffff'; x.textAlign = 'left'; x.textBaseline = 'alphabetic';
    x.font = '900 52px ' + FONT; x.fillText(brandName(), PAD + 150, PAD + 72);
    x.font = '26px ' + FONT; x.globalAlpha = .92; x.fillText(lang === 'en' ? 'Receipt' : 'إيصال', PAD + 150, PAD + 112); x.globalAlpha = 1;
    let y = PAD + 150 + 40;
    // Check row: green soft circle + Completed pill, centered like the card.
    const pillText = lang === 'en' ? 'Completed' : 'مكتملة';
    x.font = '800 26px ' + FONT; const pillW = x.measureText(pillText).width + 48;
    const checkY = y + 55;
    x.fillStyle = '#dcfce7'; x.beginPath(); x.arc(W / 2 - pillW / 2 - 14 - 44, checkY, 44, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#047857'; x.font = '900 56px ' + FONT; x.textAlign = 'center'; x.fillText('✓', W / 2 - pillW / 2 - 14 - 44, checkY + 20);
    x.fillStyle = '#dcfce7'; rr(x, W / 2 - pillW / 2 + 14, checkY - 26, pillW, 52, 26); x.fill();
    x.fillStyle = '#15803d'; x.font = '800 26px ' + FONT; x.fillText(pillText, W / 2 + 14, checkY + 9);
    y = checkY + 58 + 34;
    // Amount + operation line, centered like the card.
    x.textAlign = 'center'; x.fillStyle = neg ? '#dc2626' : '#047857'; x.font = '900 58px ' + FONT;
    x.fillText(txAmount(tx), W / 2, y); y += 58;
    x.fillStyle = '#64748b'; x.font = '26px ' + FONT;
    x.fillText(lang === 'en' ? 'Operation on account' : 'عملية على الحساب', W / 2, y); y += 20;
    // Detail rows: label/value columns mirrored in RTL, separators like the card.
    for (let i = 0; i < rows.length; i++) {
      const [k, v] = rows[i]; const lines = rowLines[i];
      const labelX = rtl ? W - PAD : PAD;
      const valueX = rtl ? PAD : W - PAD;
      x.font = '26px ' + FONT; x.fillStyle = '#64748b'; x.textAlign = rtl ? 'right' : 'left';
      x.fillText(k, labelX, y + 30);
      x.font = '800 28px ' + FONT; x.fillStyle = '#0f172a'; x.textAlign = rtl ? 'left' : 'right';
      lines.forEach((ln, li) => x.fillText(ln, valueX, y + 30 + li * 36));
      y += rowH[i];
      if (i < rows.length - 1) { x.strokeStyle = '#f1f5f9'; x.lineWidth = 2; x.beginPath(); x.moveTo(PAD, y - 6); x.lineTo(W - PAD, y - 6); x.stroke(); }
    }
    y += 12;
    // QR block: dashed separator + centered QR, same payload as the card.
    x.strokeStyle = '#cbd5e1'; x.lineWidth = 2; x.setLineDash([10, 8]); x.beginPath(); x.moveTo(PAD, y); x.lineTo(W - PAD, y); x.stroke(); x.setLineDash([]);
    y += 24;
    let qrCanvas = document.querySelector('#receiptCard .qr-real canvas');
    if (!qrCanvas && window.QRCode) {
      try {
        const tmp = document.createElement('div'); tmp.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden';
        document.body.appendChild(tmp);
        new QRCode(tmp, { text: window.location.origin + '/?ref=' + encodeURIComponent(tx.ref || String(tx.id)), width: qrSize, height: qrSize, correctLevel: QRCode.CorrectLevel.M });
        await new Promise(r => setTimeout(r, 50));
        qrCanvas = tmp.querySelector('canvas'); tmp.remove();
      } catch {}
    }
    if (qrCanvas) x.drawImage(qrCanvas, (W - qrSize) / 2, y, qrSize, qrSize);
    y += qrSize + 40;
    x.textAlign = 'left'; x.fillStyle = '#6b7280'; x.font = '24px ' + FONT;
    x.fillText('Wassil receipt — إشعار من وصل.', PAD, y);
    c.toBlob((blob) => {
      if (!blob) { alert('Download failed / فشل التحميل'); return; }
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'wassil-receipt-' + (tx.ref || tx.id) + '.png'; a.click();
      toast(t('downloaded'));
    }, 'image/png');
  } catch (e) { alert('Download failed / فشل التحميل'); }
  })();
}
(async () => {
  const splash = document.getElementById('splash');
  if (splash && lang === 'en') { const sn = splash.querySelector('.splash-name'); if (sn) sn.textContent = 'Wassil'; const st = splash.querySelector('.splash-tag'); if (st) st.textContent = 'Your money arrives... easily'; }
  try { const to = new URLSearchParams(window.location.search).get('to'); if (to) window._pendingTo = to; } catch {}
  setTimeout(async () => {
    if (splash) splash.classList.add('hidden');
    render(); // show the app immediately instead of waiting for the server (it may be waking from sleep)
    if (token) {
      await loadDash();
      // If the first attempt failed (e.g. the free server was still waking
      // up), retry once before giving up — otherwise a valid saved login
      // looks like a lost account.
      if (!me) { await new Promise(r => setTimeout(r, 3000)); await loadDash(); }
      if (me) { view = 'home'; render(); }
    }
  }, 1200);
})();
