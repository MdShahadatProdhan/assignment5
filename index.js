/* ---------------------------
  Data: list of services
----------------------------*/
const services = [
  { id: 'svc1', name_bn: 'জাতীয় জরুরি সেবা', name_en: 'National Emergency', number: '999', category: 'সারকারি', icon: '🚨' },
  { id: 'svc2', name_bn: 'পুলিশ', name_en: 'Police', number: '999', category: 'পুলিশ', icon: '👮' },
  { id: 'svc3', name_bn: 'ফায়ার সার্ভিস', name_en: 'Fire Service', number: '999', category: 'ফায়ার', icon: '🚒' },
  { id: 'svc4', name_bn: 'অ্যাম্বুলেন্স', name_en: 'Ambulance', number: '1994-999999', category: 'স্বাস্থ্য', icon: '🚑' },
  { id: 'svc5', name_bn: 'নারী ও শিশু সহায়তা', name_en: 'Women & Child Helpline', number: '109', category: 'সহায়তা', icon: '🤝' },
  { id: 'svc6', name_bn: 'দুর্নীতি', name_en: 'Anti-Corruption', number: '106', category: 'সরকারি', icon: '🛡️' },
  { id: 'svc7', name_bn: 'বিদ্যুৎ বিঘ্ন', name_en: 'Electricity Outage', number: '16216', category: 'বিদ্যুৎ', icon: '💡' },
  { id: 'svc8', name_bn: 'ব্র্যাক', name_en: 'BRAC', number: '16445', category: 'এনজিও', icon: '🏢' },
  { id: 'svc9', name_bn: 'বাংলাদেশ রেলওয়ে', name_en: 'Bangladesh Railway', number: '163', category: 'পরিবহন', icon: '🚆' }
];

/* ---------------------------
  State
----------------------------*/
let coinCount = 100;        // default coins
let copyCount = 0;         // default copy count
let favCount = 0;          // favorites count
let callHistory = [];      // {name, number, time}

/* ---------------------------
  Helpers: DOM references & updates
----------------------------*/
const cardsContainer = document.getElementById('cards-container');
const historyList = document.getElementById('history-list');
const navCoin = document.getElementById('nav-coin-count');
const navCopy = document.getElementById('nav-copy-count');
const navHeart = document.getElementById('nav-heart-count');
const clearHistoryBtn = document.getElementById('clear-history');

function updateNavUI(){
  navCoin.textContent = coinCount;
  navCopy.textContent = copyCount;
  navHeart.textContent = favCount;
}

function renderHistory(){
  historyList.innerHTML = '';
  if(callHistory.length === 0){
    historyList.innerHTML = '<div class="muted" style="padding:8px">No calls yet.</div>';
    return;
  }
  callHistory.slice().reverse().forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="meta">
        <div><strong>${escapeHtml(entry.name)}</strong></div>
        <div class="muted">${escapeHtml(entry.number)}</div>
      </div>
      <div class="time">${escapeHtml(entry.time)}</div>
    `;
    historyList.appendChild(item);
  });
}

/* small escape to avoid accidental HTML injection if data were external */
function escapeHtml(text){
  return String(text).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
}

/* ---------------------------
  Create card elements
----------------------------*/
function makeCard(svc){
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = svc.id;
  card.innerHTML = `
    <button class="heart-btn" title="Favorite" aria-label="Toggle favorite">💗</button>

    <div class="top">
      <div class="icon" aria-hidden="true">${svc.icon}</div>
      <div>
        <h3>${escapeHtml(svc.name_bn)}</h3>
        <div class="sub">${escapeHtml(svc.name_en)}</div>
        <div class="badge">${escapeHtml(svc.category)}</div>
      </div>
    </div>

    <div class="number">${escapeHtml(svc.number)}</div>

    <div class="card-actions">
      <button class="btn copy" data-action="copy" data-number="${escapeHtml(svc.number)}">
        <svg viewBox="0 0 24 24" fill="none"><path d="M9 12H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Copy
      </button>
      <button class="btn call" data-action="call" data-id="${svc.id}">
        <svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.19 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.36 1.7.72 2.5a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.36 1.64.6 2.5.72A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Call
      </button>
    </div>
  `;
  return card;
}

/* render all cards */
function renderCards(){
  cardsContainer.innerHTML = '';
  services.forEach(svc => {
    cardsContainer.appendChild(makeCard(svc));
  });
}

/* ---------------------------
  Event handling: delegation for cards
----------------------------*/
cardsContainer.addEventListener('click', async (ev) => {
  const btn = ev.target.closest('button');
  if(!btn) return;

  // HEART toggling
  if(btn.classList.contains('heart-btn')){
    btn.classList.toggle('fav');
    if(btn.classList.contains('fav')) favCount++;
    else favCount = Math.max(0, favCount-1);
    updateNavUI();
    // a tiny animation
    btn.style.transform = 'scale(1.08)';
    setTimeout(()=>btn.style.transform='',120);
    return;
  }

  // COPY action
  const action = btn.dataset.action;
  if(action === 'copy'){
    const num = btn.dataset.number;
    try{
      await navigator.clipboard.writeText(num);
      copyCount++;
      updateNavUI();
      alert(`Hotline number copied: ${num}`);
    }catch(e){
      // fallback: select and execCommand (older browsers)
      const ta = document.createElement('textarea');
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      try{
        document.execCommand('copy');
        copyCount++;
        updateNavUI();
        alert(`Hotline number copied (fallback): ${num}`);
      }catch(err){
        alert('Copy failed. Please select and copy manually.');
      } finally { ta.remove(); }
    }
    return;
  }

  // CALL action
  if(action === 'call' || btn.classList.contains('call')){
    const card = btn.closest('.card');
    const svcId = btn.dataset.id;
    const svc = services.find(s=>s.id === svcId);
    if(!svc) return;

    // check coins first
    if(coinCount < 20){
      alert('Insufficient coins to make a call. Each call costs 20 coins.');
      return;
    }

    // show calling alert
    alert(`Calling ${svc.name_en} (${svc.name_bn}) at ${svc.number} ...`);

    // deduct coins
    coinCount -= 20;
    updateNavUI();

    // add to call history with timestamp (local)
    const now = new Date();
    const timeStr = now.toLocaleString();
    callHistory.push({ name: svc.name_bn, number: svc.number, time: timeStr });
    renderHistory();
    return;
  }
});

/* Clear history */
clearHistoryBtn.addEventListener('click', ()=> {
  if(callHistory.length === 0){
    alert('History already empty.');
    return;
  }
  if(confirm('Clear all call history?')){
    callHistory = [];
    renderHistory();
  }
});

/* ---------------------------
  Initialize
----------------------------*/
renderCards();
updateNavUI();
renderHistory();

/* ---------------------------
  Small accessibility: handle keyboard activation on heart buttons
----------------------------*/
cardsContainer.addEventListener('keydown', (e)=>{
  const btn = e.target;
  if(btn && btn.classList && btn.classList.contains('heart-btn') && (e.key === 'Enter' || e.key === ' ')){
    e.preventDefault();
    btn.click();
  }
});