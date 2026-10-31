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
};
let lang = localStorage.getItem('wassil-lang') || 'ar';
let token = localStorage.getItem('wassil-token') || '';
let me = null;
let view = 'login';
let selCard = null, selTx = null, dash = null;
const $ = (s) => document.querySelector(s);
const app = () => document.getElementById('app');
function t(k){ const v = I18N[k]; return v ? (lang === 'en' ? v.en : v.ar) : k; }
function nameOf(u){ return lang === 'en' && u && u.fullNameEn ? u.fullNameEn : (u ? u.fullNameAr : ''); }
function toast(msg){ const el = $('#toast'); el.textContent = msg; el.classList.remove('hidden'); setTimeout(()=>el.classList.add('hidden'), 3000); }
function setLang(l){ lang = l; localStorage.setItem('wassil-lang', l); document.documentElement.lang = l; document.documentElement.dir = l === 'en' ? 'ltr' : 'rtl'; $('#langBtn').textContent = l === 'en' ? 'عربي' : 'EN'; render(); }
async function api(path, opts={}) {
  const r = await fetch(path, { ...opts, headers: { 'Content-Type':'application/json', ...(token?{Authorization:'Bearer '+token}:{}), ...(opts.headers||{}) } });
  const j = await r.json().catch(()=>({}));
  if (!r.ok) throw new Error(j.error || 'error');
  return j;
}
function esc(s){ return String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function moneySdg(n){ return (n||0).toLocaleString('en-US') + ' ج.س'; }
function moneyUsd(cents){ return ((cents||0)/100).toFixed(2) + ' USD'; }
function txTitle(tx){ return lang === 'en' ? (tx.titleEn || tx.titleAr) : (tx.titleAr || tx.titleEn); }
function txAmount(tx){
  if (tx.currency === 'USD' && tx.amountUsdCents != null) return (tx.amountUsdCents >= 0 ? '+' : '') + moneyUsd(tx.amountUsdCents);
  return (tx.amountSdg >= 0 ? '+' : '') + moneySdg(tx.amountSdg);
}
function go(v){ view = v; render(); }
async function loadDash(){ try { dash = await api('/api/dashboard'); me = dash.user; } catch { me = null; } }

// ---------- views ----------
function loginView(){
  return `<div class="auth-hero"><div class="auth-logo">و</div><div class="auth-name">وصل <span style="font-size:15px;opacity:.75">Wassil</span></div><div class="auth-tag">تجريبي — Demo only</div></div><div class="card"><h2>${t('login')}</h2>
  <p class="muted">تجريبي — Demo only. No real email is sent and no real money moves.</p>
  <label>${t('email')}</label><input id="li-email" type="email">
  <label>${t('password')}</label><input id="li-pass" type="password">
  <button class="btn" onclick="doLogin()">${t('login')}</button>
  <button class="btn secondary" id="fpLoginBtn" onclick="doFpLogin()">${t('fingerprintLogin')}</button>
  <div id="li-err" class="err"></div>
  <button class="btn secondary" onclick="go('signup')">${t('signup')}</button></div>`;
}
function signupView(){
  return `<div class="auth-hero"><div class="auth-logo">و</div><div class="auth-name">وصل <span style="font-size:15px;opacity:.75">Wassil</span></div><div class="auth-tag">تجريبي — Demo only</div></div><div class="card"><h2>${t('signup')}</h2>
  <p class="muted">كود التفعيل تجريبي يظهر داخل التطبيق — لم يُرسل أي بريد حقيقي. / Demo activation code is shown in-app — no real email is sent.</p>
  <label>${t('email')}</label><input id="su-email" type="email">
  <label>${t('nameAr')}</label><input id="su-ar">
  <label>${t('nameEn')}</label><input id="su-en">
  <label>${t('password')}</label><input id="su-pass" type="password">
  <button class="btn" onclick="doSignup()">${t('signup')}</button>
  <div id="su-err" class="err"></div><div id="su-ok" class="ok"></div>
  <div id="su-activate" class="hidden"><label>Activation code / كود التفعيل</label><input id="su-code"><button class="btn" onclick="doActivate()">${t('confirm')}</button></div>
  <button class="btn secondary" onclick="go('login')">${t('login')}</button></div>`;
}
function homeView(){
  if (!me) return loginView();
  const rows = (dash?.transactions || []).slice(0, 10).map(tx =>
    `<div class="row" onclick="openTx(${tx.id})"><span>${esc(txTitle(tx))}</span><b>${esc(txAmount(tx))}</b></div>`).join('') || `<p class="muted">—</p>`;
  return `<div class="balance"><div class="acct-label">${nameOf(me)} — ${t('home')}</div><div class="big">${moneySdg(me.sdgBalance)}</div>
  <div class="acct-num">${me.sdgAccount || ''}</div></div>
  <div class="fx-card" onclick="go('fx')"><div><div class="fx-label">${t('fx')}</div><div class="fx-num">${me.fxAccount || ''}</div></div><div style="text-align:end"><div class="fx-amount">${moneyUsd(me.fxBalanceCents)}</div><div class="fx-label">›</div></div></div>
  <div class="card"><h2>${t('services')}</h2><div class="grid">
    <div class="icon-btn" onclick="go('transfer')">💸<br>${t('transfer')}</div>
    <div class="icon-btn" onclick="go('cards')">💳<br>${t('cards')}</div>
    <div class="icon-btn" onclick="go('deposits')">🏦<br>${t('deposits')}</div>
    <div class="icon-btn" onclick="go('invest')">📈<br>${t('invest')}</div>
    <div class="icon-btn" onclick="go('bills')">🧾<br>${t('bills')}</div>
    <div class="icon-btn" onclick="go('goals')">🎯<br>${t('goals')}</div>
    <div class="icon-btn" onclick="go('orders')">🔁<br>${t('orders')}</div>
    <div class="icon-btn" onclick="go('branches')">🏧<br>${t('branches')}</div>
    <div class="icon-btn" onclick="go('security')">🔒<br>${t('security')}</div>
    <div class="icon-btn" onclick="go('faq')">❓<br>${t('faq')}</div>
    ${me.role === 'admin' ? `<div class="icon-btn" onclick="go('admin')">🛡️<br>${t('admin')}</div>` : ''}
  </div></div>
  <div class="card"><h2>${t('history')}</h2>${rows}</div>
  <button class="btn secondary" onclick="doLogout()">${t('logout')}</button>`;
}
function transferView(){
  return `<div class="card"><h2>${t('transfer')}</h2>
  <label>${t('toAccount')}</label><input id="tr-to" placeholder="1001 0000 0002">
  <label>${t('amount')} (SDG)</label><input id="tr-amt" type="number" min="1">
  <div id="tr-name" class="muted"></div><button class="btn secondary" onclick="lookupAcc()">Check / تحقق</button>
  <button class="btn" onclick="doTransfer()">${t('send')}</button><div id="tr-err" class="err"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function fxView(){
  return `<div class="card"><h2>${t('fx')}</h2><p>${me.fxAccount || ''} — ${moneyUsd(me.fxBalanceCents)}</p>
  <p class="muted">1 USD = 10,000 SDG (demo rate)</p>
  <h3>${t('fundFx')}</h3><label>${t('amount')} (SDG)</label><input id="fx-amt" type="number" min="1">
  <button class="btn" onclick="doFxFund()">${t('fundFx')}</button>
  <h3>${t('fxTransfer')}</h3><label>FX account / رقم الحساب الأجنبي</label><input id="fx-to" placeholder="2002 0000 0002">
  <label>${t('amount')} (USD)</label><input id="fx-usd" type="number" step="0.01" min="0.01">
  <button class="btn" onclick="doFxTransfer()">${t('fxTransfer')}</button><div id="fx-err" class="err"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function cardsView(){
  const list = (dash?.cards || []).map(c =>
    `<div class="visa" onclick="openCard(${c.id})"><div>${c.kind} — ${c.status}</div><div class="num">${esc(c.masked)}</div><div>${moneyUsd(c.balanceCents)} — ${esc(c.exp || '')}</div></div>`).join('') || `<p class="muted">—</p>`;
  return `<div class="card"><h2>${t('cards')}</h2>${list}
  <button class="btn" onclick="requestCard()">${t('newCard')} — 100,000 SDG</button><div id="cd-err" class="err"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function cardPageView(){
  const c = selCard; if (!c) return cardsView();
  const hist = (c.history || []).map(tx => `<div class="row" onclick="openTx(${tx.id})"><span>${esc(txTitle(tx))}</span><b>${esc(txAmount(tx))}</b></div>`).join('') || `<p class="muted">—</p>`;
  return `<div class="visa"><div>${c.kind} — ${c.status}</div><div class="num" id="cardNum">${esc(c.masked)}</div>
  <div>${moneyUsd(c.balanceCents)} — ${esc(c.exp || '')}</div>
  <button class="btn small" onclick="toggleEye()">👁 ${t('viewDetails')}</button></div>
  <div id="cardDetails" class="card hidden"></div>
  <div class="card"><div class="grid">
    <div class="icon-btn" onclick="freezeCard()">${t('freeze')}</div>
    <div class="icon-btn" onclick="unfreezeCard()">${t('unfreeze')}</div>
    <div class="icon-btn" onclick="cancelCard()">${t('cancelCard')}</div>
    <div class="icon-btn" onclick="changeCvv()">${t('changeCvv')}</div>
    <div class="icon-btn" onclick="topupCard()">${t('topup')}</div>
    <div class="icon-btn" onclick="cardTransfer()">${t('cardTransfer')}</div>
    <div class="icon-btn" onclick="changeLimit()">${t('dailyLimit')}</div>
  </div></div>
  <div class="card"><h2>${t('cardHistory')}</h2>${hist}</div>
  <button class="btn secondary" onclick="go('cards')">${t('back')}</button>`;
}
function depositsView(){
  return `<div class="card"><h2>${t('deposits')}</h2>
  <label>${t('amount')} (SDG)</label><input id="dp-amt" type="number" min="1">
  <label>Duration / المدة</label><select id="dp-days">
    <option value="1">24h — 24 ساعة</option><option value="7">Week — أسبوع</option>
    <option value="30">Month — شهر</option><option value="90">3 months — 3 أشهر</option>
    <option value="180">6 months — 6 أشهر</option><option value="365">Year — سنة</option></select>
  <p class="muted">Rates (annual, demo): &lt;1,000,000 = 12% · 1,000,000+ = 15% · 10,000,000+ = 20% · 1,000,000,000+ = 30%. Profit = principal × rate × days ÷ 365.</p>
  <button class="btn" onclick="doDeposit()">${t('confirm')}</button><div id="dp-err" class="err"></div><div id="dp-ok" class="ok"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function investView(){
  return `<div class="card"><h2>${t('invest')} — <span class="badge">تجريبي</span></h2><p class="muted">Demo only — fake announced prices, no real trading or real money.</p>
  <div id="inv-assets"></div><div id="inv-port"></div><div id="inv-err" class="err"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function receiptView(){
  const tx = selTx; if (!tx) return homeView();
  return `<div class="receipt" id="receiptCard"><div class="head">وصل Wassil <span class="badge">تجريبي</span></div>
  <p><b>${esc(txTitle(tx))}</b></p>
  <p>${t('amount')}: ${esc(txAmount(tx))}</p>
  <p>From / من: ${esc(tx.fromName || '')} — ${esc(tx.fromAccount || '')}</p>
  <p>To / إلى: ${esc(tx.toName || '')} — ${esc(tx.toAccount || '')}</p>
  ${tx.conversion ? `<p>${esc(tx.conversion)}</p>` : ''}
  <p>Date / التاريخ: ${esc(new Date(tx.createdAt).toLocaleString())}</p>
  <p>Reference / المرجع: ${esc(tx.ref || '')}</p>
  <p>Status / الحالة: completed / مكتملة</p>
  <p class="muted">Demo receipt — تجريبي فقط، ليس تحويلاً حقيقياً.</p></div>
  <button class="btn" onclick="downloadReceipt()">⬇ ${t('downloadReceipt')}</button>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button>`;
}
function adminView(){
  const users = (dash?.allUsers || []).map(u =>
    `<div class="row"><span>${esc(nameOf(u))} — ${esc(u.sdgAccount || '')}</span><span>${moneySdg(u.sdgBalance)}</span></div>`).join('');
  return `<div class="card"><h2>${t('admin')}</h2>${users}
  <label>User ID / رقم المستخدم</label><input id="ad-id" type="number">
  <label>${t('amount')} (SDG)</label><input id="ad-amt" type="number" min="1">
  <button class="btn" onclick="adminFund()">Fund / تمويل</button><div id="ad-err" class="err"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function securityView(){
  return `<div class="card"><h2>${t('security')}</h2>
  <p class="muted">Fingerprint key is bound to this account and this device only. The fingerprint image is never stored and never leaves the device.</p>
  <button class="btn" onclick="enableFp()">${t('enableFingerprint')}</button>
  <button class="btn secondary" onclick="disableFp()">${t('disableFingerprint')}</button><div id="sec-err" class="err"></div><div id="sec-ok" class="ok"></div>
  <button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function simpleView(title, body){
  return `<div class="card"><h2>${esc(title)}</h2>${body}<button class="btn secondary" onclick="go('home')">${t('back')}</button></div>`;
}
function render(){
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  $('#langBtn').textContent = lang === 'en' ? 'عربي' : 'EN';
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
  else if (view === 'bills') html = simpleView(t('bills'), `<div id="bills-list"></div>`);
  else if (view === 'goals') html = simpleView(t('goals'), `<label>Name / الاسم</label><input id="goal-name"><label>Target (SDG)</label><input id="goal-tgt" type="number"><button class="btn" onclick="addGoal()">${t('send')}</button><div id="goals-list"></div>`);
  else if (view === 'orders') html = simpleView(t('orders'), `<label>${t('toAccount')}</label><input id="ord-to"><label>${t('amount')} (SDG)</label><input id="ord-amt" type="number"><button class="btn" onclick="addOrder()">${t('send')}</button><div id="orders-list"></div>`);
  else if (view === 'branches') html = simpleView(t('branches'), `<div id="branches-list"></div>`);
  else if (view === 'faq') html = simpleView(t('faq'), `<p>Demo only — this is not real bank support. / تجريبي فقط — ليس دعماً بنكياً حقيقياً.</p><p>Q: Is this real money? / هل هذه أموال حقيقية؟<br>A: No — all balances and prices are fake demo data. / لا — كل الأرصدة والأسعار بيانات تجريبية وهمية.</p>`);
  else html = homeView();
  app().innerHTML = html;
  if (view === 'invest') loadInvest();
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
  try { await loadDash(); const j = await api('/api/transfer', { method:'POST', body: JSON.stringify({ toAccount: $('#tr-to').value, amount: $('#tr-amt').value }) });
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
  try { await api('/api/admin/fund', { method:'POST', body: JSON.stringify({ targetUserId: $('#ad-id').value, amount: $('#ad-amt').value }) }); toast('OK'); await loadDash(); go('admin'); } catch(e){ $('#ad-err').textContent = e.message; }
}
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
  x.fillStyle = '#ffffff'; x.font = 'bold 44px sans-serif'; x.fillText('Wassil  وصل', 40, 85);
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
document.getElementById('langBtn').addEventListener('click', () => setLang(lang === 'en' ? 'ar' : 'en'));
(async () => { if (token) { await loadDash(); if (me) view = 'home'; } render(); })();
