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
  bankServices:{ar:'خدمات مصرفية تجريبية',en:'Demo banking services'},
  tagline:{ar:'قروشك توصل... بساهلة',en:'Your money arrives... easily'},
  demoNote:{ar:'نموذج تجريبي للتعلم — بيانات وهمية، ولا توجد أي أموال حقيقية.',en:'Learning demo only — fake data, no real money.'},
  fpUnavailable:{ar:'البصمة غير متاحة على هذا الجهاز/المتصفح — لا يمكن تسجيل الدخول بالبصمة هنا. سجّل الدخول بكلمة المرور كالمعتاد.',en:'Fingerprint is not available on this device/browser — fingerprint login is not possible here. Sign in with your password as usual.'},
  availableBalance:{ar:'الرصيد المتاح — الحساب الجاري',en:'Available balance — Current account'},
  fxLabel:{ar:'الحساب الأجنبي — بالدولار فقط',en:'FX account — USD only'},
  cardsBalance:{ar:'رصيد بطاقاتك',en:'Your cards balance'},
  latestOps:{ar:'آخر العمليات',en:'Latest operations'},
  showAll:{ar:'عرض الكل',en:'Show all'},
  myAccount:{ar:'حسابي',en:'My account'},
  bankServicesPage:{ar:'خدمات البنك',en:'Bank services'},
  allServicesInOne:{ar:'كل وحدات وصل التجريبية في مكان واحد.',en:'All Wassil demo units in one place.'},
  beneficiaries:{ar:'المستفيدون',en:'Beneficiaries'},
  demoClient:{ar:'عميل تجريبي — وصل',en:'Demo client — Wassil'},
  statement:{ar:'كشف حساب',en:'Statement'},
  qrShare:{ar:'شارك رمز وصل التجريبي',en:'Share Wassil demo code'},
  cannotLogin:{ar:'لا تستطيع تسجيل الدخول؟',en:"Can't sign in?"},
  newSignup:{ar:'تسجيل جديد؟',en:'New sign up?'},
  about:{ar:'عن وصل',en:'About Wassil'},
  locations:{ar:'مواقعنا',en:'Our locations'},
  support:{ar:'المساعدة',en:'Help'},
  active:{ar:'مفعّل',en:'Active'},
  loanCalc:{ar:'محاكاة تمويل',en:'Loan simulator'},
  qrNote:{ar:'رمز عرض تجريبي فقط — لا يُمسح لتحويل حقيقي.',en:'Display-only demo code — it does not scan for a real transfer.'},
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
  depositsIntro:{ar:'افتح وديعة وهمية من رصيدك بالجنيه. نسبة الأرباح السنوية تجريبية وتزداد حسب مبلغ الوديعة، وتُحسب الأرباح بالتناسب مع المدة:',en:'Open a demo deposit from your SDG balance. The annual demo profit rate rises with the deposit amount and is prorated by duration:'},
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
  cardsIntro:{ar:'بطاقات وهمية محفوظة — رصيد كل بطاقة بالدولار الأمريكي (USD) فقط، وتفاصيلها مخفية ومقفلة. افتح صفحة البطاقة، واضغط أيقونة العين لعرضها كاملة ونسخ رقمها.',en:'Saved demo cards — each card balance is in US Dollars (USD) only, and its details are hidden and locked. Open a card page and tap the eye icon to show its full details and copy its number.'},
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
  transferIntro:{ar:'تحويل تجريبي بين حسابات وصل المسجّلة — اختر مستخدماً مسجلاً أو اكتب رقم حسابه.',en:'Demo transfer between registered Wassil accounts — pick a registered user or type their account number.'},
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
  demoReceiptNote:{ar:'هذا إشعار تجريبي من وصل — العملية وهمية داخل النموذج التعليمي ولا تمثّل تحويلاً حقيقياً أو أموالاً حقيقية.',en:'This is a demo receipt from Wassil — the operation is fake inside the learning model and does not represent a real transfer or real money.'},
};

let lang = localStorage.getItem('wassil-lang') || 'ar';
let token = localStorage.getItem('wassil-token') || '';
let me = null;
let view = 'login';
let selCard = null, selTx = null, dash = null;
let transferTab = 'users', fxAction = 'fund', ctCardId = null, ccFromId = null;
function backLink(label, v){ return `<button type="button" class="back-link" onclick="go('${v}')">${esc(label)} ›</button>`; }
function detailRow(label, value){ return `<div class="detail-row"><span class="detail-label">${esc(label)}</span><b class="detail-value">${value}</b></div>`; }
function qrCells(seed){
  let cells = '';
  for (let i = 0; i < 441; i++) { const ch = (seed || '').charCodeAt(i % Math.max(1, (seed || '').length)) || 0; const on = ((ch * (i + 7)) % 3) !== 0; cells += `<span class="qr-cell ${on ? 'on' : ''}"></span>`; }
  return cells;
}
function durationLabel(days){
  const d = Number(days);
  return lang === 'en'
    ? ({1:'24 hours (1 day)',7:'Week (7 days)',30:'Month (30 days)',90:'3 months (90 days)',180:'6 months (180 days)',365:'Year (365 days)'})[d] || (d + ' days')
    : ({1:'24 ساعة (يوم واحد)',7:'أسبوع (7 أيام)',30:'شهر (30 يوماً)',90:'3 أشهر (90 يوماً)',180:'6 أشهر (180 يوماً)',365:'سنة (365 يوماً)'})[d] || (d + ' يوم');
}
function statusLabel(s){ if (s === 'active') return lang === 'en' ? 'Active' : 'نشطة'; if (s === 'frozen') return lang === 'en' ? 'Frozen' : 'مجمّدة'; return esc(s || ''); }
const $ = (s) => document.querySelector(s);
const app = () => document.getElementById('app');
function t(k){ const v = I18N[k]; return v ? (lang === 'en' ? v.en : v.ar) : k; }
function nameOf(u){ return lang === 'en' && u && u.fullNameEn ? u.fullNameEn : (u ? u.fullNameAr : ''); }
function toast(msg){ const el = $('#toast'); el.textContent = msg; el.classList.remove('hidden'); setTimeout(()=>el.classList.add('hidden'), 3000); }
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
function go(v){ view = v; render(); }
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
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 19c1-3 3.5-4.5 6.5-4.5s5.5 1.5 6.5 4.5"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.5c2.5.3 4.5 1.6 5.5 4"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  repeat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
  trend:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  calc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2M8 19h2M12 19h2M16 19h2"/></svg>',
};
const WAVE = '<svg viewBox="0 0 64 64" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 30c6-7 12-7 18 0s12 7 18 0" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity=".85"/><path d="M10 44c6-7 12-7 18 0s12 7 18 0" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/><circle cx="48" cy="14" r="5" fill="#ffffff"/></svg>';
function userbar(){
  const n = (dash?.transactions || []).length;
  const letter = (nameOf(me) || 'و').trim().charAt(0) || 'و';
  return `<div class="userbar"><div class="userbar-main"><div class="avatar">${esc(letter)}</div><div style="min-width:0"><div class="welcome">${t('welcome')} <span class="badge-outline">تجريبي</span></div><div class="user-name">${esc(nameOf(me))}</div></div></div>
  <div class="userbar-actions"><button type="button" class="icon-pill lang" id="langBtn" onclick="toggleLang()">${lang === 'en' ? 'عربي' : 'EN'}</button><button type="button" class="icon-pill" aria-label="${t('notifications')}" onclick="go('statement')">${IC.bell}${n ? `<span class="bell-dot">${n > 99 ? '99+' : n}</span>` : ''}</button><button type="button" class="icon-pill" aria-label="${t('logout')}" onclick="doLogout()">${IC.logout}</button></div></div>`;
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
  return `<div class="auth-page"><div class="auth-hero-teal"><div class="auth-hero-top"><button type="button" class="icon-pill lang" id="langBtn" onclick="toggleLang()">${lang === 'en' ? 'عربي' : 'EN'}</button><span class="badge-outline" style="border-color:rgba(255,255,255,.6);color:#fff;background:transparent">تجريبي</span></div>
  <div class="auth-hero-brand" style="margin-top:22px"><div class="auth-logo-sm">${WAVE}</div><div><div class="auth-hero-name">${brandName()}</div><div class="auth-hero-sub">${t('bankServices')}</div></div></div></div>
  <div class="auth-card"><h2>${t('login')}</h2>
  <label>${t('email')}</label><div class="input-wrap">${IC.mail}<input id="li-email" type="email" placeholder="name@example.com"></div>
  <label>${t('password')}</label><div class="input-wrap">${IC.lock}<input id="li-pass" type="password"><button type="button" class="eye-btn" onclick="const e=document.getElementById('li-pass');e.type=e.type==='password'?'text':'password';">${IC.eye}</button></div>
  <button class="btn" onclick="doLogin()">${t('login')}</button>
  <div class="divider-or">${lang === 'en' ? 'or' : 'أو'}</div>
  ${fp}
  <div id="li-err" class="err"></div>
  <button type="button" class="qr-btn" onclick="go('qr')">${IC.qr} ${t('qrShare')}</button>
  <div class="link-row"><button type="button" onclick="go('signup')">${t('newSignup')}</button><button type="button" onclick="go('faq')">${t('cannotLogin')}</button></div></div>
  <div class="auth-footer"><div>${t('demoNote')}</div><div class="auth-links">
  <button type="button" class="auth-link" onclick="go('faq')"><span class="auth-link-ic">${IC.info}</span>${t('about')}</button>
  <button type="button" class="auth-link" onclick="go('branches')"><span class="auth-link-ic">${IC.pin}</span>${t('locations')}</button>
  <button type="button" class="auth-link" onclick="go('faq')"><span class="auth-link-ic">${IC.headset}</span>${t('support')}</button></div></div></div>`;
}
function signupView(){
  return `<div class="auth-page"><div class="auth-hero-teal"><div class="auth-hero-top"><button type="button" class="icon-pill lang" id="langBtn" onclick="toggleLang()">${lang === 'en' ? 'عربي' : 'EN'}</button><span class="badge-outline" style="border-color:rgba(255,255,255,.6);color:#fff;background:transparent">تجريبي</span></div>
  <div class="auth-hero-brand" style="margin-top:22px"><div class="auth-logo-sm">${WAVE}</div><div><div class="auth-hero-name">${brandName()}</div><div class="auth-hero-sub">${t('bankServices')}</div></div></div></div>
  <div class="auth-card">${backLink(t('login'), 'login')}<h2>${t('signup')}</h2>
  <p class="muted">كود التفعيل تجريبي يظهر داخل التطبيق — لم يُرسل أي بريد حقيقي. / Demo activation code is shown in-app — no real email is sent.</p>
  <label>${t('email')}</label><div class="input-wrap">${IC.mail}<input id="su-email" type="email"></div>
  <label>${t('nameAr')}</label><input id="su-ar">
  <label>${t('nameEn')}</label><input id="su-en">
  <label>${t('password')}</label><div class="input-wrap">${IC.lock}<input id="su-pass" type="password"></div>
  <button class="btn" onclick="doSignup()">${t('signup')}</button>
  <div id="su-err" class="err"></div><div id="su-ok" class="ok"></div>
  <div id="su-activate" class="hidden"><label>Activation code / كود التفعيل</label><input id="su-code"><button class="btn" onclick="doActivate()">${t('confirm')}</button></div>
  <div class="link-row"><button type="button" onclick="go('login')">${t('login')}</button></div></div>
  <div class="auth-footer"><div>${t('demoNote')}</div></div></div>`;
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
  const L = (a, e) => lang === 'en' ? e : a;
  const items = [
    [IC.card, t('cards'), L('رصيد بالدولار فقط، عرض التفاصيل بأيقونة العين ونسخ الرقم، تجميد وحدود', 'USD balance only, eye-icon details and number copy, freeze and limits'), "go('cards')"],
    [IC.card, t('topup'), L('من الحساب الأجنبي فقط، بالدولار — اشحن الأجنبي من الجنيه بسعر 10,000', 'From the FX account only, in USD — fund FX from SDG at 10,000'), "go('cardTopup')"],
    [IC.transfer, t('cardTransfer'), L('من بطاقة إلى بطاقة فقط — بالدولار', 'USD transfer between Wassil cards only'), "go('cardTransfer')"],
    [IC.bank, t('deposits'), L('أرباح سنوية 12%–30% حسب المبلغ والمدة', 'Term deposits from 24h to a year — 12% to 30% by amount'), "go('deposits')"],
    [IC.trend, t('invest'), L('عملات وذهب وأسهم تجريبية بأسعار وهمية معلنة', 'Demo currencies, gold and stocks at announced fake prices'), "go('invest')"],
    [IC.calc, t('loanCalc'), L('حاسبة أقساط افتراضية 10%', 'Demo instalment calculator at 10% — demo only'), "go('loan')"],
    [IC.repeat, t('orders'), L('تحويلات متكررة مجدولة وهمياً', 'Saved recurring transfers that run automatically'), "go('orders')"],
    [IC.target, t('goals'), L('ادخر نحو هدفك خطوة بخطوة', 'Save towards a goal with a set amount and term'), "go('goals')"],
    [IC.chart, t('statement'), L('الوارد والصادر وكل العمليات', 'All your operations with reference and date'), "go('statement')"],
    [IC.shield, t('security'), L('الرمز، أسئلة الأمان، الأجهزة', 'Fingerprint, password and trusted devices'), "go('security')"],
    [IC.pin, t('branches'), L('قائمة وهمية قابلة للبحث', 'Branch locations and opening hours'), "go('branches')"],
    [IC.headset, t('faq'), L('أسئلة شائعة عن النموذج التجريبي', 'FAQ and demo support'), "go('faq')"],
  ];
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('bankServicesPage')}</div><p class="page-sub">${t('allServicesInOne')}</p>
  <div class="svc-grid">${items.map(([ic, ti, de, act]) => `<button type="button" class="svc-card" onclick="${act}"><span class="svc-ic">${ic}</span><span class="svc-title" style="display:block">${ti}</span><span class="svc-desc" style="display:block">${de}</span></button>`).join('')}</div>`;
}
function accountView(){
  if (!me) return loginView();
  const letter = (nameOf(me) || 'و').trim().charAt(0) || 'و';
  const others = (dash?.directory || []).filter(u => u.id !== me.id);
  const ben = others.map(u => `<button type="button" class="menu-row" onclick="go('transfer')"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${esc(nameOf(u))}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">${esc(u.sdgAccount || '')}</span></span><span>›</span></button>`).join('') || `<p class="muted">${lang === 'en' ? 'No beneficiaries yet' : 'لا يوجد مستفيدون بعد'}</p>`;
  return `<div class="page-title">${t('myAccount')}</div><p class="page-sub">${lang === 'en' ? 'Your saved demo account data and settings.' : 'بيانات حسابك التجريبي المحفوظ وإعداداته.'}</p>
  <div class="profile-card"><div class="profile-top"><div class="profile-avatar">${esc(letter)}</div><div><div class="profile-name">${esc(nameOf(me))}</div><div class="profile-role">${me.role === 'admin' ? (lang === 'en' ? 'Admin account — Wassil' : 'حساب الأدمن — وصل') : t('demoClient')}</div></div></div>
  <div class="acct-row"><span class="acct-ic">${IC.bank}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'SDG account' : 'الحساب بالجنيه (SDG)'}</span><span class="acct-row-sub" style="display:block">${esc(me.sdgAccount || '')}</span></span><span class="acct-row-amt">${moneySdg(me.sdgBalance)}</span></div>
  <div class="acct-row"><span class="acct-ic">${IC.dollar}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'FX account' : 'الحساب الأجنبي'}</span><span class="acct-row-sub" style="display:block">${esc(me.fxAccount || '')}</span></span><span class="acct-row-amt">${moneyUsd(me.fxBalanceCents)}</span></div>
  <div class="acct-row"><span class="acct-ic">${IC.mail}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${t('email')}</span><span class="acct-row-sub" style="display:block">${esc(me.email)}</span></span><span class="pill-active">${me.status === 'active' ? t('active') : esc(me.status || '')}</span></div></div>
  ${me.frozenAll ? `<div class="profile-card" style="border:1.5px solid var(--danger)"><div class="page-title" style="margin:0 0 6px">${lang === 'en' ? 'All assets frozen' : 'كل الأصول مجمدة'}</div><p class="muted" style="margin:0">${lang === 'en' ? 'The admin has frozen all your assets — no outgoing operations are possible until the admin releases the freeze.' : 'الأدمن جمّد كل أصولك — لا يمكن إجراء أي عملية صادرة حتى يفك الأدمن التجميد.'}</p></div>` : ((me.frozenSdg || 0) > 0 ? `<div class="profile-card" style="border:1.5px solid var(--danger)"><div class="page-title" style="margin:0 0 6px">${lang === 'en' ? 'Amount frozen' : 'مبلغ مجمد'}</div><p class="muted" style="margin:0">${lang === 'en' ? `Frozen by admin: ${moneySdg(me.frozenSdg)} — your usable balance is your balance minus the frozen amount.` : `مبلغ مجمد من الأدمن: ${moneySdg(me.frozenSdg)} — رصيدك المتاح هو رصيدك ناقص المبلغ المجمد.`}</p></div>` : '')}
  <div class="profile-card"><div class="menu-row" style="cursor:default"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title">${t('beneficiaries')}</span></span></div>${ben}</div>
  <div class="profile-card"><button type="button" class="menu-row" onclick="go('statement')"><span class="acct-ic">${IC.bell}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${t('notifications')}</span><span class="menu-row-sub">${lang === 'en' ? 'Your operations and updates' : 'عملياتك وتحديثاتك'}</span></span><span>›</span></button>
  <button type="button" class="menu-row" onclick="go('security')"><span class="acct-ic">${IC.shield}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${t('security')}</span><span class="menu-row-sub">${lang === 'en' ? 'Fingerprint and password' : 'البصمة وكلمة المرور'}</span></span><span>›</span></button></div>
  ${me.role === 'admin' ? `<div class="profile-card" style="border:1.5px solid var(--teal)"><div class="page-title" style="margin:0 0 6px">${lang === 'en' ? 'Admin mode active' : 'وضع الأدمن مفعّل'}</div><p class="muted" style="margin:0 0 12px">${lang === 'en' ? 'Fund user accounts and review registrations from the admin dashboard.' : 'مؤّل حسابات المستخدمين وراجع التسجيلات من لوحة الأدمن.'}</p><button class="btn" onclick="go('admin')">${lang === 'en' ? 'Open admin dashboard' : 'فتح لوحة الأدمن'}</button></div>` : ''}
  <button class="logout-btn" onclick="doLogout()">${t('logout')}</button>
  <div class="demo-foot">${t('demoNote')}</div>`;
}
function statementView(){
  const txs = dash?.transactions || [];
  let inSdg = 0, outSdg = 0;
  txs.forEach(tx => { const a = tx.amountSdg || 0; if (a > 0) inSdg += a; if (a < 0) outSdg += -a; });
  const rows = txs.map(opRow).join('') || `<p class="muted">—</p>`;
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('statement')}</div><p class="page-sub">${t('statementSub')}</p>
  <div class="summary-row">
    <div class="summary-card"><b class="pos">${moneySdg(inSdg)}</b><span>${t('totalIn')} (${lang === 'en' ? 'SDG' : 'ج.س'})</span></div>
    <div class="summary-card"><b class="neg">${moneySdg(outSdg)}</b><span>${t('totalOut')} (${lang === 'en' ? 'SDG' : 'ج.س'})</span></div>
    <div class="summary-card"><b>${txs.length}</b><span>${t('opsCount')}</span></div>
  </div>
  <button type="button" class="btn-outline" onclick="downloadStatementText()">${t('downloadText')}</button>
  <div class="card">${rows}</div>`;
}
function downloadStatementText(){
  const txs = dash?.transactions || [];
  const lines = txs.map(tx => `${txTitle(tx)} | ${txAmount(tx)} | ${new Date(tx.createdAt).toLocaleString()} | ${tx.ref || ''}`);
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'wassil-statement.txt'; a.click();
  toast(lang === 'en' ? 'Statement downloaded' : 'تم تنزيل الكشف');
}
function qrView(){
  if (!me) return `${backLink(t('login'), 'login')}
  <div class="page-title">${t('qrShare')}</div><div class="card" style="text-align:center"><div class="qr-grid">${qrCells('wassil-demo')}</div>
  <div style="font-weight:900;font-size:17px">${brandName()}</div>
  <p class="muted">${t('qrNote')}</p>
  <p class="muted">${t('demoNote')}</p>
  <button class="btn secondary" onclick="go('login')">${t('login')}</button></div>`;
  const cells = qrCells((me.sdgAccount || '') + nameOf(me));
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('qrShare')}</div><div class="card" style="text-align:center"><div class="qr-grid">${cells}</div>
  <div style="font-weight:900;font-size:17px">${esc(nameOf(me))}</div>
  <div class="muted" style="direction:ltr">${esc(me.sdgAccount || '')}</div>
  <p class="muted">${t('qrNote')}</p>
  <button class="btn secondary" onclick="copyAccount()">${lang === 'en' ? 'Copy account number' : 'نسخ رقم الحساب'}</button></div>`;
}
async function copyAccount(){
  try { await navigator.clipboard.writeText(me.sdgAccount || ''); } catch { const ta = document.createElement('textarea'); ta.value = me.sdgAccount || ''; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
  toast(lang === 'en' ? 'Account number copied' : 'تم نسخ رقم الحساب');
}
function loanView(){
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('loanCalc')}</div><p class="page-sub">${lang === 'en' ? 'Demo instalment calculator at 10% per year — demo only, not real financing.' : 'حاسبة أقساط افتراضية بنسبة 10% سنوياً — تجريبي فقط، ليس تمويلاً حقيقياً.'}</p><div class="card">
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
function transferView(){
  const others = (dash?.directory || []).filter(u => u.id !== me?.id);
  const opts = others.map(u => `<option value="${esc(u.sdgAccount || '')}">${esc(nameOf(u))} — ${esc(u.sdgAccount || '')}</option>`).join('');
  const list = others.map(u => `<button type="button" class="menu-row" onclick="pickTransferUser('${esc(u.sdgAccount || '')}')"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${esc(nameOf(u))}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">${esc(u.sdgAccount || '')}</span></span><span>›</span></button>`).join('') || `<p class="muted">${lang === 'en' ? 'No registered users yet' : 'لا يوجد مستخدمون مسجلون بعد'}</p>`;
  return `<div class="page-title">${t('transferTitle')}</div><p class="page-sub">${t('transferIntro')}</p>
  <div class="card">
  <label>${t('beneficiary')}</label>
  <select id="tr-user-select" onchange="onTransferUserChange(this.value)"><option value="">${t('chooseUser')}</option>${opts}<option value="__other__">${t('otherAccount')}</option></select>
  <label>${t('toAccount')}</label><input id="tr-to" placeholder="1001 0000 0002">
  <label>${t('amountSdg')}</label><input id="tr-amt" type="number" min="1" value="0">
  <label>${t('noteOptional')}</label><input id="tr-note" placeholder="${lang === 'en' ? 'Example: monthly expenses' : 'مثال: مصاريف الشهر'}">
  <div id="tr-name" class="muted"></div><button class="btn secondary" onclick="lookupAcc()">Check / تحقق</button>
  <button class="btn" onclick="doTransfer()">${t('review')}</button><div id="tr-err" class="err"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>
  <div class="tabs"><button type="button" class="tab-btn ${transferTab === 'users' ? 'active' : ''}" onclick="setTransferTab('users')">${t('registeredUsers')}</button><button type="button" class="tab-btn ${transferTab === 'saved' ? 'active' : ''}" onclick="setTransferTab('saved')">${t('savedBeneficiaries')}</button></div>
  <div class="card">${list}</div>`;
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
  const others = (dash?.directory || []).filter(u => u.id !== me.id);
  const users = others.map(u => `<button type="button" class="menu-row" onclick="pickFxUser('${esc(u.fxAccount || '')}')"><span class="acct-ic">${IC.users}</span><span class="menu-row-main"><span class="menu-row-title" style="display:block">${esc(nameOf(u))}</span><span class="menu-row-sub" style="direction:ltr;display:block;text-align:start">${lang === 'en' ? 'FX account: ' : 'رقم الحساب الأجنبي: '}${esc(u.fxAccount || '')}</span></span><span>›</span></button>`).join('') || `<p class="muted">—</p>`;
  const fxTxs = (dash?.transactions || []).filter(tx => (tx.type || '').startsWith('fx_'));
  const fxRows = fxTxs.map(opRow).join('') || `<p class="muted">—</p>`;
  const fundForm = fxAction === 'fund' ? `<div class="card"><h3>${t('fundFx')}</h3><label>${t('amountSdg')}</label><input id="fx-amt" type="number" min="1">
  <button class="btn" onclick="doFxFund()">${t('fundFx')}</button></div>` : '';
  const transferForm = fxAction === 'transfer' ? `<div class="card"><h3>${t('fxTransfer')}</h3><label>FX account / رقم الحساب الأجنبي</label><input id="fx-to" placeholder="2002 0000 0002">
  <label>${t('amountUsd')}</label><input id="fx-usd" type="number" step="0.01" min="0.01">
  <button class="btn" onclick="doFxTransfer()">${t('fxTransfer')}</button></div>` : '';
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('fx')}</div><p class="page-sub">${t('fxIntro')}</p>
  <div class="balance"><div class="balance-top"><span>${lang === 'en' ? 'FX account (USD)' : 'الحساب الأجنبي (USD)'}</span></div>
  <div class="big">${moneyUsd(me.fxBalanceCents)}</div>
  <div class="acct-num">${me.fxAccount || ''}</div></div>
  <div class="card">${detailRow(lang === 'en' ? 'FX account number' : 'رقم الحساب الأجنبي', esc(me.fxAccount || ''))}${detailRow(lang === 'en' ? 'SDG account (SDG)' : 'الحساب بالجنيه (SDG)', esc(me.sdgAccount || ''))}${detailRow(lang === 'en' ? 'Your SDG balance' : 'رصيد حسابك (ج.س)', moneySdg(me.sdgBalance))}</div>
  <div class="action-row">
    <button type="button" class="action-btn ${fxAction === 'fund' ? 'active' : ''}" onclick="setFxAction('fund')"><span class="action-ic">${IC.dollar}</span>${t('fundFxShort')}</button>
    <button type="button" class="action-btn ${fxAction === 'transfer' ? 'active' : ''}" onclick="setFxAction('transfer')"><span class="action-ic">${IC.transfer}</span>${t('fxTransferShort')}</button>
    <button type="button" class="action-btn" onclick="go('cardTopup')"><span class="action-ic">${IC.card}</span>${t('topupFromFx')}</button>
  </div>
  ${fundForm}${transferForm}<div id="fx-err" class="err"></div>
  <div class="page-title" style="font-size:18px">${t('registeredUsers')}</div>
  <div class="card">${users}</div>
  <div class="page-title" style="font-size:18px">${t('fxHistory')}</div>
  <div class="card">${fxRows}</div>`;
}
function setFxAction(a){ fxAction = a; render(); }
function pickFxUser(acct){ fxAction = 'transfer'; render(); const inp = $('#fx-to'); if (inp) inp.value = acct; }
function cardTopupView(){
  if (!me) return loginView();
  const cards = dash?.cards || [];
  if (ctCardId == null && cards.length) ctCardId = cards[0].id;
  const opts = cards.map(c => `<option value="${c.id}" ${c.id === ctCardId ? 'selected' : ''}>${esc(c.kind || 'Visa')} — ${esc(c.masked)} — ${moneyUsd(c.balanceCents)}</option>`).join('');
  return `${backLink(t('backCards'), 'cards')}
  <div class="page-title">${t('cardTopupTitle')}</div><p class="page-sub">${t('cardTopupIntro')}</p>
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
  if (!confirm((lang === 'en' ? 'Review top-up\nAmount: ' : 'مراجعة الشحن\nالمبلغ: ') + amt + ' USD')) return;
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
  <div class="page-title">${t('cardTransferTitle')}</div><p class="page-sub">${t('cardTransferIntro')}</p>
  <div class="card">
  <label>${t('sourceCard')}</label><select id="cc-from" onchange="ccFromId=Number(this.value);const n=document.getElementById('cc-bal');if(n)n.textContent='${lang === 'en' ? 'Source card balance: ' : 'رصيد بطاقة المصدر: '}' + (this.options[this.selectedIndex].dataset.bal || '');">${cards.map(c => `<option value="${c.id}" data-bal="${moneyUsd(c.balanceCents)}" ${c.id === ccFromId ? 'selected' : ''}>${esc(c.kind || 'Visa')} — ${esc(c.masked)}</option>`).join('')}</select>
  <label>${t('recipientCard')}</label><input id="cc-to" placeholder="0000 0000 0000 0000">
  <label>${t('amountUsd')}</label><input id="cc-amt" type="number" step="0.01" min="0.01" value="10.00">
  <div id="cc-bal" class="muted">${lang === 'en' ? 'Source card balance: ' : 'رصيد بطاقة المصدر: '}${src ? moneyUsd(src.balanceCents) : ''}</div>
  <label>${t('noteOptional')}</label><input id="cc-note">
  <button class="btn" onclick="doCardTransfer()">${t('reviewTransfer')}</button><div id="cc-err" class="err"></div>
  <button class="btn secondary" onclick="go('cards')">${t('back')}</button></div>`;
}
async function doCardTransfer(){
  const from = Number($('#cc-from') ? $('#cc-from').value : ccFromId);
  const to = $('#cc-to') ? $('#cc-to').value : ''; const amt = $('#cc-amt') ? $('#cc-amt').value : '';
  if (!from || !to || !amt) { const el = $('#cc-err'); if (el) el.textContent = lang === 'en' ? 'Fill in card, recipient and amount' : 'أكمل البطاقة والمستلم والمبلغ'; return; }
  // Review step; the optional note is shown on the form only — the card-transfer API takes no note field, so it is not sent or stored.
  if (!confirm((lang === 'en' ? 'Review card transfer\nAmount: ' : 'مراجعة التحويل\nالمبلغ: ') + amt + ' USD')) return;
  try { const j = await api('/api/cards/transfer', { method:'POST', body: JSON.stringify({ fromCardId: from, toCardNumber: to, amountUsd: amt }) }); toast('OK — ' + j.ref); await loadDash(); openCard(from); }
  catch(e){ const el = $('#cc-err'); if (el) el.textContent = e.message; }
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
  <div class="page-title">${t('cards')}</div><p class="page-sub">${t('cardsIntro')}</p>
  <div class="card"><div style="font-weight:900;margin-bottom:6px">${t('fpNoticeTitle')}</div><p class="muted" style="margin:0">${fpNote}</p></div>
  ${list}
  <div class="card"><div style="font-weight:900">${t('newCardTitle')}</div><p class="muted">${t('newCardDesc')}</p>
  ${detailRow(t('issueFee'), moneySdg(100000))}${detailRow(t('validity'), lang === 'en' ? '5 years from issuance' : '5 سنوات من تاريخ الإصدار')}${detailRow(t('yourBalance'), moneySdg(me ? me.sdgBalance : 0))}${detailRow(t('activeCards'), lang === 'en' ? `${active.length} of 5 max` : `${active.length} من 5 كحد أقصى`)}
  <button class="btn" onclick="requestCard()">${t('newCard')} — 100,000 SDG</button><div id="cd-err" class="err"></div></div>
  <p class="muted">${lang === 'en' ? 'Card balances are USD only. Cards are topped up from the FX account only — fund your FX account from your SDG account first, then top up a card, and card-to-card transfers are card-to-card only in USD.' : 'أرصدة البطاقات بالدولار فقط. البطاقة تُشحن من الحساب الأجنبي فقط — اشحن حسابك الأجنبي من حساب الجنيه أولاً ثم اشحن البطاقة، وتحويلات البطاقات تتم من بطاقة إلى بطاقة فقط بالدولار.'}</p>`;
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
  <div class="page-title">${t('depositsTitle')}</div><p class="page-sub">${t('depositsIntro')}</p>
  <div class="card"><div style="font-weight:900;margin-bottom:8px">${lang === 'en' ? 'Annual profit rate tiers by deposit amount' : 'شرائح نسبة الأرباح السنوية حسب مبلغ الوديعة'}</div>
  <p class="muted" style="margin:4px 0">${lang === 'en' ? 'Under 1,000,000 SDG — 12% per year' : 'أقل من 1,000,000 ج.س — 12% سنوياً'}</p>
  <p class="muted" style="margin:4px 0">${lang === 'en' ? 'From 1,000,000 to under 10,000,000 SDG — 15% per year' : 'من 1,000,000 إلى أقل من 10,000,000 ج.س — 15% سنوياً'}</p>
  <p class="muted" style="margin:4px 0">${lang === 'en' ? 'From 10,000,000 to under 1,000,000,000 SDG — 20% per year' : 'من 10,000,000 إلى أقل من 1,000,000,000 ج.س — 20% سنوياً'}</p>
  <p class="muted" style="margin:4px 0">${lang === 'en' ? 'From 1,000,000,000 SDG and above — 30% per year' : 'من 1,000,000,000 ج.س فأكثر — 30% سنوياً'}</p>
  <p class="muted" style="margin:10px 0 0">${lang === 'en' ? 'Profit = deposit amount × annual rate × (days ÷ 365) — maturity date = deposit date + days.' : 'الربح = مبلغ الوديعة × النسبة السنوية × (عدد أيام المدة ÷ 365) — وتاريخ الاستحقاق = تاريخ الإيداع + أيام المدة.'}</p></div>
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
  <div class="page-title">${t('invest')}</div><p class="page-sub">${lang === 'en' ? 'Demo currencies, gold and stocks at announced fake prices.' : 'عملات وذهب وأسهم تجريبية بأسعار وهمية معلنة.'}</p>
  <div class="card"><h2>${t('invest')} — <span class="badge">تجريبي</span></h2><p class="muted">Demo only — fake announced prices, no real trading or real money. / تجريبي فقط — أسعار وهمية معلنة، لا تداول حقيقي ولا أموال حقيقية.</p>
  <div id="inv-assets"></div><div id="inv-port"></div><div id="inv-err" class="err"></div>
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
    <div class="receipt-head"><div class="receipt-logo">${WAVE}</div><div><div class="receipt-name">${brandName()}</div><div class="receipt-sub">${t('receiptTitle')}</div></div><span class="badge">تجريبي</span></div>
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
    <div class="qr-block"><div class="qr-grid qr-small">${qrCells(tx.ref || String(tx.id))}</div>
    <p class="muted" style="text-align:center;margin:8px 0 0">${t('demoReceiptNote')}</p></div>
  </div>
  <button class="btn" onclick="downloadReceipt()">↓ ${t('downloadReceipt')}</button>
  <button class="btn-outline" onclick="go('statement')">${t('backStatement')}</button>`;
}
function adminView(){
  const all = dash?.allUsers || [];
  const active = (dash?.directory || []);
  const opts = active.map(u => `<option value="${u.id}">${esc(nameOf(u))} — ${esc(u.sdgAccount || '')}</option>`).join('');
  const users = all.map(u =>
    `<div class="profile-card"><div class="profile-top"><div class="profile-avatar">${esc((nameOf(u) || 'و').trim().charAt(0) || 'و')}</div><div><div class="profile-name">${esc(nameOf(u))}</div><div class="profile-role" style="direction:ltr;text-align:start">${esc(u.email)}</div></div><span class="pill-active">${u.status === 'banned' ? (lang === 'en' ? 'Banned' : 'محظور') : (u.status === 'active' ? t('active') : esc(u.status || ''))}</span></div>
    <div class="acct-row"><span class="acct-ic">${IC.bank}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'SDG account' : 'الحساب بالجنيه (SDG)'}</span><span class="acct-row-sub" style="display:block">${esc(u.sdgAccount || '')}</span></span><span class="acct-row-amt">${moneySdg(u.sdgBalance)}</span></div>
    <div class="acct-row"><span class="acct-ic">${IC.dollar}</span><span class="acct-row-main"><span class="acct-row-title" style="display:block">${lang === 'en' ? 'FX account' : 'الحساب الأجنبي'}</span><span class="acct-row-sub" style="display:block">${esc(u.fxAccount || '')}</span></span><span class="acct-row-amt">${moneyUsd(u.fxBalanceCents)}</span></div>
    ${u.role === 'admin' ? '' : `<p class="muted">${u.frozenAll ? (lang === 'en' ? 'All assets frozen' : 'كل الأصول مجمدة') : ((u.frozenSdg || 0) > 0 ? (lang === 'en' ? `Frozen: ${moneySdg(u.frozenSdg)}` : `مبلغ مجمد: ${moneySdg(u.frozenSdg)}`) : (lang === 'en' ? 'No freeze' : 'لا يوجد تجميد'))}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><input id="fz-${u.id}" type="number" min="1" placeholder="${lang === 'en' ? 'Freeze amount (SDG)' : 'مبلغ التجميد (ج.س)'}" style="flex:1;min-width:120px"><button class="btn secondary" style="width:auto" onclick="adminFreeze(${u.id})">${lang === 'en' ? 'Freeze amount' : 'تجميد مبلغ'}</button></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn secondary" style="width:auto" onclick="adminFreezeAll(${u.id})">${lang === 'en' ? 'Freeze all' : 'تجميد الكل'}</button><button class="btn secondary" style="width:auto" onclick="adminUnfreeze(${u.id})">${lang === 'en' ? 'Unfreeze' : 'فك التجميد'}</button>${u.status === 'banned' ? `<button class="btn" style="width:auto" onclick="adminUnban(${u.id})">${lang === 'en' ? 'Approve reopen' : 'الموافقة على إعادة الفتح'}</button>` : `<button class="btn-outline-danger" style="width:auto" onclick="adminBan(${u.id})">${lang === 'en' ? 'Ban' : 'حظر'}</button>`}</div>`}</div>`).join('') || `<p class="muted">${lang === 'en' ? 'No registered users yet' : 'لا يوجد مستخدمون مسجلون بعد'}</p>`;
  const txRows = (dash?.allTransactions || []).map(opRow).join('') || `<p class="muted">—</p>`;
  return `${backLink(t('backHome'), 'home')}
  <div class="page-title">${t('admin')}</div><p class="page-sub">${lang === 'en' ? 'Demo admin account from Wassil — fund user accounts and review their operations.' : 'حساب إداري تجريبي من وصل — موّل حسابات المستخدمين وراجع عملياتهم.'}</p>
  <div class="card"><h2>${lang === 'en' ? 'Fund a user account' : 'تمويل حساب مستخدم'}</h2>
  <label>${lang === 'en' ? 'Activated user account' : 'حساب المستخدم'}</label>
  <select id="ad-user"><option value="">${lang === 'en' ? '— Pick an activated user —' : '— اختر مستخدماً مفعلاً —'}</option>${opts}</select>
  <label>${t('amount')} (SDG)</label><input id="ad-amt" type="number" min="1">
  <button class="btn" onclick="adminFund()">${lang === 'en' ? 'Fund now' : 'تمويل الآن'}</button><div id="ad-err" class="err"></div></div>
  <div class="page-title" style="margin-top:18px">${lang === 'en' ? `All registered accounts (${all.length})` : `كل الحسابات المسجلة (${all.length})`}</div>${users}
  <div class="page-title" style="margin-top:18px">${lang === 'en' ? 'Transfer and transaction log' : 'سجل التحويل والمعاملات'}</div>
  <div class="card">${txRows}</div>
  <div class="demo-foot">${t('demoNote')}</div>`;
}
function securityView(){
  return `${backLink(t('backServices'), 'services')}
  <div class="page-title">${t('security')}</div><p class="page-sub">${lang === 'en' ? 'Fingerprint, password and trusted devices.' : 'الرمز، أسئلة الأمان، الأجهزة.'}</p>
  <div class="card"><h2>${t('security')}</h2>
  <p class="muted">${lang === 'en' ? 'Fingerprint key is bound to this account and this device only. The fingerprint image is never stored and never leaves the device.' : 'مفتاح البصمة مربوط بهذا الحساب وهذا الجهاز فقط. صورة البصمة لا تُحفظ أبداً ولا تغادر الجهاز.'}</p>
  <button class="btn" onclick="enableFp()">${t('enableFingerprint')}</button>
  <button class="btn secondary" onclick="disableFp()">${t('disableFingerprint')}</button><div id="sec-err" class="err"></div><div id="sec-ok" class="ok"></div>
  <button class="btn secondary" onclick="go('services')">${t('backServices')}</button></div>`;
}
function simpleView(title, body, backView, subtitle){
  const bv = backView || 'home';
  const bl = bv === 'services' ? t('backServices') : (bv === 'login' ? t('login') : t('backHome'));
  return `${backLink(bl, bv)}
  <div class="page-title">${esc(title)}</div>${subtitle ? `<p class="page-sub">${subtitle}</p>` : ''}
  <div class="card">${body}</div>
  <div class="demo-foot">${t('demoNote')}</div>`;
}
function render(){
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
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
  else if (view === 'qr') html = qrView();
  else if (view === 'loan') html = loanView();
  else if (view === 'cardTopup') html = cardTopupView();
  else if (view === 'cardTransfer') html = cardTransferView();
  else if (view === 'bills') html = simpleView(t('bills'), `<div id="bills-list"></div>`, 'home', lang === 'en' ? 'Pay your demo bills from your balance.' : 'ادفع فواتيرك التجريبية من رصيدك.');
  else if (view === 'goals') html = simpleView(t('goals'), `<label>Name / الاسم</label><input id="goal-name"><label>Target (SDG)</label><input id="goal-tgt" type="number"><button class="btn" onclick="addGoal()">${t('send')}</button><div id="goals-list"></div>`, 'services', lang === 'en' ? 'Save towards a goal with a set amount and term.' : 'ادخر نحو هدفك خطوة بخطوة.');
  else if (view === 'orders') html = simpleView(t('orders'), `<label>${t('toAccount')}</label><input id="ord-to"><label>${t('amount')} (SDG)</label><input id="ord-amt" type="number"><button class="btn" onclick="addOrder()">${t('send')}</button><div id="orders-list"></div>`, 'services', lang === 'en' ? 'Saved recurring demo transfers.' : 'تحويلات متكررة مجدولة وهمياً.');
  else if (view === 'branches') html = simpleView(t('branches'), `<div id="branches-list"></div>`, 'home', lang === 'en' ? 'Demo branch list.' : 'قائمة وهمية قابلة للبحث.');
  else if (view === 'faq') html = simpleView(t('faq'), `<p>Demo only — this is not real bank support. / تجريبي فقط — ليس دعماً بنكياً حقيقياً.</p><p>Q: Is this real money? / هل هذه أموال حقيقية؟<br>A: No — all balances and prices are fake demo data. / لا — كل الأرصدة والأسعار بيانات تجريبية وهمية.</p>`, 'home', lang === 'en' ? 'FAQ about the demo model.' : 'أسئلة شائعة عن النموذج التجريبي.');
  else html = homeView();
  const logged = !!me && view !== 'login' && view !== 'signup';
  if (logged) html = userbar() + html;
  app().innerHTML = html;
  const nav = document.getElementById('bottomNav');
  if (nav) {
    nav.classList.toggle('hidden', !logged);
    document.body.classList.toggle('nav-on', logged);
    const activeFor = { home: 'home', transfer: 'transfer', bills: 'bills', services: 'services', account: 'account' }[view];
    document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === activeFor));
    const navLabels = { home: lang === 'en' ? 'Home' : 'الرئيسية', transfer: lang === 'en' ? 'Transfer' : 'تحويل', bills: lang === 'en' ? 'Bills' : 'فواتير', services: lang === 'en' ? 'Services' : 'الخدمات', account: lang === 'en' ? 'My account' : 'حسابي' };
    document.querySelectorAll('[data-nav]').forEach(b => { const sp = b.querySelector('span'); if (sp && navLabels[b.dataset.nav]) sp.textContent = navLabels[b.dataset.nav]; });
  }
  if (view === 'invest') loadInvest();
  if (view === 'deposits') loadDeposits();
  if (view === 'bills') loadBills();
  if (view === 'goals') loadGoals();
  if (view === 'orders') loadOrders();
  if (view === 'branches') loadBranches();
}

// ---------- actions ----------
async function doLogin(){
  try { const j = await api('/api/login', { method:'POST', body: JSON.stringify({ email: $('#li-email').value, password: $('#li-pass').value }) });
    token = j.token; localStorage.setItem('wassil-token', token); await loadDash(); go('home'); }
  catch(e){ $('#li-err').textContent = e.message; }
}
async function doSignup(){
  try { const j = await api('/api/register', { method:'POST', body: JSON.stringify({ email: $('#su-email').value, fullNameAr: $('#su-ar').value, fullNameEn: $('#su-en').value, password: $('#su-pass').value }) });
    $('#su-ok').textContent = 'Activation code (demo, no real email sent): ' + j.activationCode + ' / كود التفعيل التجريبي: ' + j.activationCode;
    $('#su-activate').classList.remove('hidden'); window._actEmail = j.email; window._actCode = j.activationCode; }
  catch(e){ $('#su-err').textContent = e.message; }
}
async function doActivate(){
  try { const j = await api('/api/activate', { method:'POST', body: JSON.stringify({ email: window._actEmail, code: $('#su-code').value }) });
    $('#su-ok').textContent = 'Activated! Account: ' + j.user.sdgAccount + ' / تم التفعيل! رقم الحساب: ' + j.user.sdgAccount; go('login'); }
  catch(e){ $('#su-err').textContent = e.message; }
}
function doLogout(){ token=''; localStorage.removeItem('wassil-token'); me=null; go('login'); }
async function lookupAcc(){
  try { const j = await api('/api/lookup', { method:'POST', body: JSON.stringify({ account: $('#tr-to').value }) });
    $('#tr-name').textContent = (lang==='en' ? j.nameEn : j.nameAr) + ' — ' + j.sdgAccount; } catch { $('#tr-name').textContent = 'Not found / غير موجود'; }
}
async function doTransfer(){
  // Review step matching the screenshot's review button: confirm the summary first.
  // The optional note is shown on the form only; the transfer API takes no note field, so it is not sent or stored.
  const to = $('#tr-to') ? $('#tr-to').value : ''; const amt = $('#tr-amt') ? $('#tr-amt').value : '';
  const name = $('#tr-name') ? $('#tr-name').textContent : '';
  if (!confirm((lang === 'en' ? 'Review transfer\nTo: ' : 'مراجعة التحويل\nإلى: ') + (name || to) + '\n' + (lang === 'en' ? 'Amount: ' : 'المبلغ: ') + amt + ' SDG')) return;
  try { await loadDash(); const j = await api('/api/transfer', { method:'POST', body: JSON.stringify({ toAccount: to, amount: amt }) });
    toast('OK — ' + j.ref); await loadDash(); go('home'); } catch(e){ $('#tr-err').textContent = e.message; }
}
async function doFxFund(){
  try { const j = await api('/api/fx/fund', { method:'POST', body: JSON.stringify({ amountSdg: $('#fx-amt').value }) });
    toast('OK — ' + j.ref); await loadDash(); go('home'); } catch(e){ $('#fx-err').textContent = e.message; }
}
async function doFxTransfer(){
  try { const j = await api('/api/fx/transfer', { method:'POST', body: JSON.stringify({ toFxAccount: $('#fx-to').value, amountUsd: $('#fx-usd').value }) });
    toast('OK — ' + j.ref); await loadDash(); go('home'); } catch(e){ $('#fx-err').textContent = e.message; }
}
async function requestCard(){
  try { const j = await api('/api/cards/request', { method:'POST', body: '{}' }); toast('Card requested / تم طلب البطاقة'); await loadDash(); go('cards'); }
  catch(e){ $('#cd-err').textContent = e.message; }
}
async function openCard(id){
  try { const j = await api('/api/cards/' + id); selCard = { ...j.card, history: j.history }; go('cardPage'); } catch(e){ toast(e.message); }
}
async function openTx(id){
  try { const j = await api('/api/transactions/' + id); selTx = j.transaction; go('receipt'); } catch(e){ toast(e.message); }
}
async function toggleEye(){
  const el = $('#cardDetails');
  if (!el.classList.contains('hidden')) { el.classList.add('hidden'); return; }
  try { const j = await api('/api/cards/' + selCard.id + '/details');
    el.innerHTML = `<p>${t('viewDetails')}: ${esc(j.fullNumber)} — ${esc(j.exp)} — CVV ${esc(j.cvv)} — ${esc(lang==='en' ? j.holderEn : j.holderAr)}</p>
    <button class="btn small" onclick="copyCardNum('${esc(j.fullNumber)}')">${t('copyNum')}</button>`;
    el.classList.remove('hidden'); } catch(e){ toast(e.message); }
}
async function copyCardNum(num){
  try { await navigator.clipboard.writeText(num); } catch { const ta = document.createElement('textarea'); ta.value = num; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
  toast(t('copied'));
}
async function freezeCard(){ try { const j = await api('/api/cards/' + selCard.id + '/freeze', { method:'POST', body:'{}' }); selCard = { ...j.card, history: selCard.history }; render(); } catch(e){ toast(e.message); } }
async function unfreezeCard(){ try { const j = await api('/api/cards/' + selCard.id + '/unfreeze', { method:'POST', body:'{}' }); selCard = { ...j.card, history: selCard.history }; render(); } catch(e){ toast(e.message); } }
async function cancelCard(){
  if (!confirm(t('cancelCard') + ' — 100,000 SDG issuance fee is NON-REFUNDABLE and final. Any remaining USD balance stays locked on the cancelled card and does not return to the account. / رسوم الإصدار 100,000 جنيه غير مستردة ونهائية، وأي رصيد دولار متبقٍّ يبقى مقفلاً على البطاقة الملغاة ولا يعود للحساب.')) return;
  try { const j = await api('/api/cards/' + selCard.id + '/cancel', { method:'POST', body:'{}' }); toast(j.noteAr || 'Cancelled'); await loadDash(); go('cards'); } catch(e){ toast(e.message); }
}
async function changeCvv(){
  const pw = prompt(t('password')); const nv = prompt('New CVV (3 digits) / رمز CVV الجديد (3 أرقام)');
  if (!pw || !nv) return;
  try { await api('/api/cards/' + selCard.id + '/change-cvv', { method:'POST', body: JSON.stringify({ password: pw, newCvv: nv }) }); toast('OK'); } catch(e){ toast(e.message); }
}
async function topupCard(){
  const amt = prompt('Amount in USD (from FX account only) / المبلغ بالدولار (من الحساب الأجنبي فقط)');
  if (!amt) return;
  try { const j = await api('/api/cards/' + selCard.id + '/topup', { method:'POST', body: JSON.stringify({ amountUsd: amt }) }); toast('OK'); await loadDash(); openCard(selCard.id); } catch(e){ toast(e.message + ' — Cards can only be topped up from the FX account / البطاقة لا تُشحن إلا من الحساب الأجنبي'); }
}
async function cardTransfer(){
  const to = prompt('Recipient card number (full) / رقم بطاقة المستلم كاملاً'); const amt = prompt('Amount in USD / المبلغ بالدولار');
  if (!to || !amt) return;
  try { const j = await api('/api/cards/transfer', { method:'POST', body: JSON.stringify({ fromCardId: selCard.id, toCardNumber: to, amountUsd: amt }) }); toast('OK — ' + j.ref); await loadDash(); openCard(selCard.id); } catch(e){ toast(e.message); }
}
async function changeLimit(){
  const lim = prompt('New daily limit in USD / الحد اليومي الجديد بالدولار');
  if (!lim) return;
  try { await api('/api/cards/' + selCard.id + '/limit', { method:'POST', body: JSON.stringify({ dailyLimitUsd: lim }) }); toast('OK'); } catch(e){ toast(e.message); }
}
async function doDeposit(){
  try { const j = await api('/api/deposits', { method:'POST', body: JSON.stringify({ principal: $('#dp-amt').value, durationDays: $('#dp-days').value }) });
    $('#dp-ok').textContent = `Rate ${Math.round(j.deposit.rate*100)}% — Profit ${j.deposit.profit} SDG — Maturity ${new Date(j.deposit.maturityDate).toLocaleDateString()} — Total ${j.deposit.total}`; await loadDash(); }
  catch(e){ $('#dp-err').textContent = e.message; }
}
async function loadInvest(){
  try { const a = await api('/api/investments/assets'); const p = await api('/api/investments/portfolio');
    $('#inv-assets').innerHTML = a.assets.map(x => `<div class="row"><span>${lang==='en'?x.nameEn:x.nameAr} — ${x.priceSdg} SDG / ${x.unitEn}</span><button class="btn small" onclick="buyAsset('${x.id}')">Buy / شراء</button></div>`).join('');
    $('#inv-port').innerHTML = '<h3>Portfolio / المحفظة</h3>' + (p.holdings.map(h => `<div class="row"><span>${h.assetId} × ${h.quantity} — value ${h.valueSdg} — P/L ${h.profitSdg}</span><button class="btn small" onclick="sellAsset('${h.assetId}')">Sell / بيع</button></div>`).join('') || '<p class="muted">—</p>');
  } catch(e){ const el = $('#inv-err'); if (el) el.textContent = e.message; }
}
async function buyAsset(id){
  const q = prompt('Quantity / الكمية'); if (!q) return;
  try { await api('/api/investments/buy', { method:'POST', body: JSON.stringify({ assetId: id, quantity: q }) }); toast('OK'); await loadDash(); loadInvest(); } catch(e){ toast(e.message); }
}
async function sellAsset(id){
  const q = prompt('Quantity / الكمية'); if (!q) return;
  try { await api('/api/investments/sell', { method:'POST', body: JSON.stringify({ assetId: id, quantity: q }) }); toast('OK'); await loadDash(); loadInvest(); } catch(e){ toast(e.message); }
}
async function adminFund(){
  const target = $('#ad-user') ? $('#ad-user').value : ($('#ad-id') ? $('#ad-id').value : '');
  if (!target) { $('#ad-err').textContent = lang === 'en' ? 'Pick an activated user' : 'اختر مستخدماً مفعلاً'; return; }
  try { await api('/api/admin/fund', { method:'POST', body: JSON.stringify({ targetUserId: target, amount: $('#ad-amt').value }) }); toast('OK'); await loadDash(); go('admin'); } catch(e){ $('#ad-err').textContent = e.message; }
}
async function adminAction(path, body){
  try { await api(path, { method:'POST', body: JSON.stringify(body) }); toast('OK'); await loadDash(); go('admin'); } catch(e){ const el = $('#ad-err'); if (el) el.textContent = e.message; else toast(e.message); }
}
async function adminFreeze(id){ const el = document.getElementById('fz-' + id); await adminAction('/api/admin/freeze', { targetUserId: id, amountSdg: el ? el.value : 0 }); }
async function adminFreezeAll(id){ await adminAction('/api/admin/freeze-all', { targetUserId: id }); }
async function adminUnfreeze(id){ await adminAction('/api/admin/unfreeze', { targetUserId: id }); }
async function adminBan(id){ await adminAction('/api/admin/ban', { targetUserId: id }); }
async function adminUnban(id){ await adminAction('/api/admin/unban', { targetUserId: id }); }
async function loadBills(){
  try { const j = await api('/api/bills'); $('#bills-list').innerHTML = j.bills.map(b => `<div class="row"><span>${lang==='en'?b.nameEn:b.nameAr} — ${b.amountSdg}</span><button class="btn small" onclick="payBill('${b.id}')">Pay / دفع</button></div>`).join(''); } catch {}
}
async function payBill(id){ try { await api('/api/bills/pay', { method:'POST', body: JSON.stringify({ billId: id }) }); toast('OK'); await loadDash(); } catch(e){ toast(e.message); } }
async function loadGoals(){
  try { const j = await api('/api/goals'); $('#goals-list').innerHTML = j.goals.map(g => `<div class="row"><span>${esc(g.name)} — ${g.savedSdg}/${g.targetSdg}</span></div>`).join(''); } catch {}
}
async function addGoal(){ try { await api('/api/goals', { method:'POST', body: JSON.stringify({ name: $('#goal-name').value, targetSdg: $('#goal-tgt').value }) }); loadGoals(); } catch(e){ toast(e.message); } }
async function loadOrders(){
  try { const j = await api('/api/orders'); $('#orders-list').innerHTML = j.orders.map(o => `<div class="row"><span>${esc(o.toAccount)} — ${o.amountSdg}</span></div>`).join(''); } catch {}
}
async function addOrder(){ try { await api('/api/orders', { method:'POST', body: JSON.stringify({ toAccount: $('#ord-to').value, amountSdg: $('#ord-amt').value, frequency: 'monthly' }) }); loadOrders(); } catch(e){ toast(e.message); } }
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
async function disableFp(){ try { await api('/api/webauthn/disable', { method:'POST', body:'{}' }); toast('Disabled / تم الإلغاء'); } catch(e){ toast(e.message); } }
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
  const c = document.createElement('canvas'); c.width = 900; c.height = 1100;
  const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0,0,900,1100);
  x.fillStyle = '#0f766e'; x.fillRect(0,0,900,140);
  x.fillStyle = '#ffffff'; x.font = 'bold 44px sans-serif'; x.fillText(brandName(), 40, 85);
  x.fillStyle = '#f59e0b'; x.fillRect(700, 45, 150, 50); x.fillStyle = '#111827'; x.font = 'bold 26px sans-serif'; x.fillText('تجريبي', 735, 80);
  x.fillStyle = '#111827'; x.font = '28px sans-serif';
  const rows = [[ 'Type / النوع', txTitle(tx)], ['Amount / المبلغ', txAmount(tx)], ['From / من', (tx.fromName||'')+' — '+(tx.fromAccount||'')], ['To / إلى', (tx.toName||'')+' — '+(tx.toAccount||'')], ['Date / التاريخ', new Date(tx.createdAt).toLocaleString()], ['Reference / المرجع', tx.ref||''], ['Status / الحالة', 'completed / مكتملة']];
  let y = 210;
  for (const [k,v] of rows) { x.fillText(k, 40, y); x.fillText(String(v), 40, y+38); y += 95; }
  x.font = '22px sans-serif'; x.fillStyle = '#6b7280'; x.fillText('Demo receipt — تجريبي فقط، ليس تحويلاً حقيقياً.', 40, y+20);
  c.toBlob((blob) => {
    if (!blob) { alert('Download failed / فشل التحميل'); return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'wassil-receipt-' + (tx.ref || tx.id) + '.png'; a.click();
    toast(t('downloaded'));
  }, 'image/png');
}
(async () => {
  const splash = document.getElementById('splash');
  if (splash && lang === 'en') { const sn = splash.querySelector('.splash-name'); if (sn) sn.textContent = 'Wassil'; const st = splash.querySelector('.splash-tag'); if (st) st.textContent = 'Your money arrives... easily'; }
  setTimeout(async () => { if (splash) splash.classList.add('hidden'); if (token) { await loadDash(); if (me) view = 'home'; } render(); }, 1200);
})();
