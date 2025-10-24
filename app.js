<<<<<<< HEAD
// ---------------- Produits (images Unsplash) ----------------
=======
// --- Produits avec images (Unsplash) ---
>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf
const products = [
  {id:1, name:'T‑shirt col rond', cat:'hauts', price:14.99, old:null, promo:false, img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop'},
  {id:2, name:'Chemise stretch', cat:'hauts', price:39.99, old:49.99, promo:true, img:'https://images.unsplash.com/photo-1520975922284-5c35d71359b1?q=80&w=1200&auto=format&fit=crop'},
  {id:3, name:'Jean regular', cat:'bas', price:59.99, old:null, promo:false, img:'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop'},
  {id:4, name:'Chino slim', cat:'bas', price:44.99, old:59.99, promo:true, img:'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1200&auto=format&fit=crop'},
  {id:5, name:'Costume 2 pièces', cat:'costumes', price:199.99, old:249.99, promo:true, img:'https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=1200&auto=format&fit=crop'},
  {id:6, name:'Blazer texturé', cat:'costumes', price:149.99, old:null, promo:false, img:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'},
  {id:7, name:'Ceinture cuir', cat:'accessoires', price:24.99, old:null, promo:false, img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop'},
  {id:8, name:'Écharpe laine', cat:'accessoires', price:19.99, old:24.99, promo:true, img:'https://images.unsplash.com/photo-1483986720358-4b1c5c83dff2?q=80&w=1200&auto=format&fit=crop'},
  {id:9, name:'Polo piqué', cat:'hauts', price:29.99, old:null, promo:false, img:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop'},
  {id:10,name:'Jogpant', cat:'bas', price:39.99, old:null, promo:false, img:'https://images.unsplash.com/photo-1541580621-cb68c67b3de9?q=80&w=1200&auto=format&fit=crop'},
  {id:11,name:'Derbies cuir', cat:'accessoires', price:99.99, old:129.99, promo:true, img:'https://images.unsplash.com/photo-1510942222433-0722c7a43a86?q=80&w=1200&auto=format&fit=crop'},
  {id:12,name:'Gilet mérinos', cat:'hauts', price:49.99, old:null, promo:false, img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop'},
];

<<<<<<< HEAD
// ---------------- Stripe links (placeholder) ----------------
const stripeLinks = {
  ts: "https://buy.stripe.com/test_123ts",
  chemises: "https://buy.stripe.com/test_123chem",
  jeans: "https://buy.stripe.com/test_123jean"
};

// ---------------- Panier (V4) ----------------
let page = 1;
const perPage = 8;
let cart = [];
const CART_KEY = 'jaisonshop_cart_v1';
=======
// Stripe Payment Links (remplacer par vos liens Stripe réels)
const stripeLinks = {
  ts: "https://buy.stripe.com/test_123ts",        // tee-shirts offre
  chemises: "https://buy.stripe.com/test_123chem", // chemises offre
  jeans: "https://buy.stripe.com/test_123jean"     // jeans offre
};

let page = 1;
const perPage = 8;
let cart = [];
>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf

const grid = document.getElementById('product-grid');
const filterCat = document.getElementById('filterCat');
const sortBy = document.getElementById('sortBy');
<<<<<<< HEAD
const cartCount = document.getElementById('cart-count');
const drawer = document.getElementById('cart-drawer');
const backdrop = document.getElementById('cart-backdrop');
const itemsWrap = document.getElementById('cart-items');
const totalEl = document.getElementById('cart-total');

function cartLoad(){ try{ cart = JSON.parse(localStorage.getItem(CART_KEY))||[]; }catch(e){ cart=[]; } cartBadge(); }
function cartSave(){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function cartBadge(){ cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0); }

function renderProducts(){
  let list = [...products];
  if(filterCat.value !== 'all') list = list.filter(p => p.cat === filterCat.value);
  if(sortBy.value === 'asc') list.sort((a,b)=>a.price-b.price);
  if(sortBy.value === 'desc') list.sort((a,b)=>b.price-a.price);
  const start = (page-1)*perPage;
  const pageItems = list.slice(start, start+perPage);
=======

function renderProducts(){
  let list = [...products];

  // filtre
  if(filterCat.value !== 'all'){
    list = list.filter(p => p.cat === filterCat.value);
  }
  // tri
  if(sortBy.value === 'asc') list.sort((a,b)=>a.price-b.price);
  if(sortBy.value === 'desc') list.sort((a,b)=>b.price-a.price);

  // pagination
  const start = (page-1)*perPage;
  const pageItems = list.slice(start, start+perPage);

>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf
  grid.innerHTML = '';
  pageItems.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card reveal-up';
    card.innerHTML = `
      <img class="thumb" src="${p.img}" alt="${p.name}" loading="lazy"/>
      <div class="card-body">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <strong>${p.name}</strong>
          ${p.promo ? '<span class="badge-promo">Promo</span>' : ''}
        </div>
        <div style="margin:8px 0;">
          <span class="price">€${p.price.toFixed(2)}</span>
          ${p.old ? '<span class="old">€'+p.old.toFixed(2)+'</span>' : ''}
        </div>
        <div style="display:flex; gap:8px;">
<<<<<<< HEAD
          <button class="btn btn-black" onclick="addToCart(${p.id})">Ajouter</button>
=======
          <button class="btn btn-black" onclick="addToCart(${p.id})">Panier</button>
>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf
          <button class="btn btn-outline" onclick="buyNow(${p.id})">Acheter</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
<<<<<<< HEAD
  document.getElementById('page-indicator').textContent = page;
  revealRefresh();
}
function nextPage(){ page++; renderProducts(); }
function prevPage(){ if(page>1){ page--; renderProducts(); } }

function addToCart(id, qty=1){
  const p = products.find(x=>x.id===id); if(!p) return;
  const i = cart.findIndex(x=>x.id===id);
  if(i>-1){ cart[i].qty += qty; } else { cart.push({id:p.id, name:p.name, price:p.price, img:p.img, qty}); }
  cartSave(); cartBadge(); cartRender(); cartOpen();
}
function cartInc(id){ const i = cart.findIndex(x=>x.id===id); if(i<0) return; cart[i].qty++; cartSave(); cartBadge(); cartRender(); }
function cartDec(id){ const i = cart.findIndex(x=>x.id===id); if(i<0) return; cart[i].qty--; if(cart[i].qty<=0) cart.splice(i,1); cartSave(); cartBadge(); cartRender(); }
function cartRemove(id){ const i = cart.findIndex(x=>x.id===id); if(i<0) return; cart.splice(i,1); cartSave(); cartBadge(); cartRender(); }
function cartClear(){ cart=[]; cartSave(); cartBadge(); cartRender(); }
function cartTotal(){ return cart.reduce((s,i)=>s + i.price*i.qty, 0); }
function cartRender(){
  if(cart.length===0){ itemsWrap.innerHTML = '<p class="hint">Votre panier est vide.</p>'; }
  else{
    itemsWrap.innerHTML = '';
    cart.forEach(it=>{
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${it.img}" alt="${it.name}">
        <div>
          <h4>${it.name}</h4>
          <div>€${it.price.toFixed(2)}</div>
          <div class="qty">
            <button onclick="cartDec(${it.id})">−</button>
            <span>${it.qty}</span>
            <button onclick="cartInc(${it.id})">+</button>
          </div>
        </div>
        <div><button class="remove" onclick="cartRemove(${it.id})">Supprimer</button></div>`;
      itemsWrap.appendChild(row);
    });
  }
  totalEl.textContent = '€' + cartTotal().toFixed(2);
}
function cartOpen(){ drawer.classList.add('open'); backdrop.classList.add('show'); drawer.setAttribute('aria-hidden','false'); }
function cartClose(){ drawer.classList.remove('open'); backdrop.classList.remove('show'); drawer.setAttribute('aria-hidden','true'); }
function cartCheckout(){
  if(cart.length===0) return alert('Votre panier est vide.');
  const freq = {hauts:0, bas:0, costumes:0, accessoires:0};
  cart.forEach(it=>{ const p = products.find(x=>x.id===it.id); if(p) freq[p.cat]=(freq[p.cat]||0)+it.qty; });
  let best='hauts',max=-1; for(const k in freq){ if(freq[k]>max){max=freq[k]; best=k;} }
  let link=null; if(best==='hauts') link=stripeLinks.ts; else if(best==='bas') link=stripeLinks.jeans; else if(best==='costumes') link=stripeLinks.chemises; else if(best==='accessoires') link=stripeLinks.ts;
  if(link) window.open(link,'_blank'); else alert('Lien Stripe non configuré.');
}
function buyNow(id){
  const item = products.find(p=>p.id===id); if(!item) return;
  let link=null; if(item.cat==='hauts') link=stripeLinks.ts; else if(item.cat==='bas') link=stripeLinks.jeans; else if(item.cat==='costumes') link=stripeLinks.chemises; else if(item.cat==='accessoires') link=stripeLinks.ts;
  if(link) window.open(link,'_blank'); else alert('Lien Stripe non configuré.');
}

// ---------------- Auth (V5) ----------------
const USERS_KEY = 'jaisonshop_users_v1';
const SESSION_KEY = 'jaisonshop_session_v1';
const authBackdrop = document.getElementById('auth-backdrop');
const authModal = document.getElementById('auth-modal');
const authCard = document.getElementById('auth-card');
const accountBtn = document.getElementById('account-btn');

function openAccount(){ authBackdrop.classList.add('show'); authModal.classList.add('show'); authModal.setAttribute('aria-hidden','false'); }
function closeAccount(){ authBackdrop.classList.remove('show'); authModal.classList.remove('show'); authModal.setAttribute('aria-hidden','true'); }

function flipTo(which){
  if(which==='register') authCard.classList.add('flipped');
  else authCard.classList.remove('flipped');
}
function togglePwd(id){
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
}

function usersLoad(){ try{ return JSON.parse(localStorage.getItem(USERS_KEY))||[]; }catch(e){ return []; } }
function usersSave(list){ localStorage.setItem(USERS_KEY, JSON.stringify(list)); }
function sessionSet(email, persist=true){ const data={email, ts:Date.now()}; localStorage.setItem(SESSION_KEY, JSON.stringify(data)); updateAccountUI(); }
function sessionGet(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); }catch(e){ return null; } }
function sessionClear(){ localStorage.removeItem(SESSION_KEY); updateAccountUI(); }

function registerSubmit(){
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const pass = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;
  if(pass !== pass2){ alert('Les mots de passe ne correspondent pas.'); return; }
  if(pass.length < 6){ alert('Mot de passe trop court (min 6).'); return; }
  const users = usersLoad();
  if(users.find(u=>u.email===email)){ alert('Un compte existe déjà avec cet email.'); return; }
  users.push({email, pass}); // Démo : stocké en clair (pour la production, utiliser un backend sécurisé)
  usersSave(users);
  alert('Compte créé ! Vous pouvez vous connecter.');
  flipTo('login');
}

function loginSubmit(){
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;
  const keep = document.getElementById('keep-login').checked;
  const users = usersLoad();
  const ok = users.find(u=>u.email===email && u.pass===pass);
  if(!ok){ alert('Email ou mot de passe incorrect.'); return; }
  sessionSet(email, keep);
  closeAccount();
  alert('Bienvenue ' + email + ' 👋');
}

function updateAccountUI(){
  const s = sessionGet();
  if(s && s.email){
    const name = s.email.split('@')[0];
    accountBtn.textContent = '👤 ' + name;
    accountBtn.onclick = () => {
      const confirmOut = confirm('Connecté en tant que ' + s.email + '\n\nSe déconnecter ?');
      if(confirmOut){ sessionClear(); accountBtn.textContent = '👤'; accountBtn.onclick = openAccount; }
    };
  }else{
    accountBtn.textContent = '👤';
    accountBtn.onclick = openAccount;
  }
}

// ---------------- Divers (hero, locator, reveal) ----------------
=======

  document.getElementById('page-indicator').textContent = page;
  revealRefresh();
}

// Achat direct (redirige vers Stripe Payment Link générique par catégorie)
function buyNow(id){
  const item = products.find(p=>p.id===id);
  const cat = item.cat;
  let link = null;
  if(cat === 'hauts') link = stripeLinks.ts;
  else if(cat === 'bas') link = stripeLinks.jeans;
  else if(cat === 'costumes') link = stripeLinks.chemises; // exemple
  else if(cat === 'accessoires') link = stripeLinks.ts; // exemple
  if(link){
    window.open(link, '_blank');
  }else{
    alert('Lien de paiement non configuré.');
  }
}

function nextPage(){ page++; renderProducts(); }
function prevPage(){ if(page>1){ page--; renderProducts(); } }

function addToCart(id){
  const item = products.find(p=>p.id===id);
  cart.push(item);
  document.getElementById('cart-count').textContent = cart.length;
  alert(item.name + ' ajouté au panier (démo)');
}

function openCart(){
  if(cart.length===0) return alert('Panier vide');
  const lines = cart.map(p=>`• ${p.name} — €${p.price.toFixed(2)}`).join('\n');
  const total = cart.reduce((s,p)=>s+p.price,0).toFixed(2);
  alert('Panier:\n'+lines+'\n\nTotal: €'+total);
}

function openSearch(){ alert('Recherche à implémenter (démo)'); }
function subscribe(){ alert('Merci ! Vous êtes inscrit.'); }
function sendContact(){ alert('Message envoyé !'); }

// Account modal
const acc = document.getElementById('account-modal');
function openAccount(){ acc.showModal(); }

// menu mobile
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('mainmenu');
toggle?.addEventListener('click', ()=>{
  const shown = menu.style.display === 'block';
  menu.style.display = shown ? 'none' : 'block';
  toggle.setAttribute('aria-expanded', String(!shown));
});

filterCat.addEventListener('change', ()=>{ page=1; renderProducts(); });
sortBy.addEventListener('change', ()=>{ page=1; renderProducts(); });

// ---------- Carousel Hero ----------
>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.querySelector('.dots');
let idx = 0;
slides.forEach((_, i)=>{
  const b = document.createElement('button');
  if(i===0) b.classList.add('active');
  b.addEventListener('click', ()=>goTo(i));
  dotsWrap.appendChild(b);
});
function goTo(i){
  slides[idx].classList.remove('active');
  dotsWrap.children[idx].classList.remove('active');
  idx = i;
  slides[idx].classList.add('active');
  dotsWrap.children[idx].classList.add('active');
}
document.querySelector('.c-next').addEventListener('click', ()=> goTo((idx+1)%slides.length));
document.querySelector('.c-prev').addEventListener('click', ()=> goTo((idx-1+slides.length)%slides.length));
setInterval(()=>goTo((idx+1)%slides.length), 6000);

<<<<<<< HEAD
function scrollOffers(){ const el=document.getElementById('catalogue'); el&&el.scrollIntoView({behavior:'smooth'}); }

=======
function scrollOffers(){ document.getElementById('offres').scrollIntoView({behavior:'smooth'}); }

// ---------- Highlight Product Carousel (horiz. scroll) ----------
const pc = document.getElementById('prod-carousel');
function renderHighlight(){
  pc.innerHTML = '';
  products.slice(0,8).forEach(p=>{
    const item = document.createElement('div');
    item.className = 'pitem reveal-up';
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="body">
        <strong>${p.name}</strong>
        <div><span class="price">€${p.price.toFixed(2)}</span> ${p.old?'<span class="old">€'+p.old.toFixed(2)+'</span>':''}</div>
        <div style="margin-top:6px; display:flex; gap:6px;">
          <button class="btn btn-black" onclick="addToCart(${p.id})">Panier</button>
          <button class="btn btn-outline" onclick="buyNow(${p.id})">Acheter</button>
        </div>
      </div>
    `;
    pc.appendChild(item);
  });
}
document.getElementById('pc-prev').addEventListener('click', ()=> pc.scrollBy({left:-320, behavior:'smooth'}));
document.getElementById('pc-next').addEventListener('click', ()=> pc.scrollBy({left:320, behavior:'smooth'}));

// ---------- Locator ----------
>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf
const map = document.getElementById('map');
document.querySelectorAll('.store-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const lat = parseFloat(btn.dataset.lat), lon = parseFloat(btn.dataset.lon);
    const bbox = `${(lon-0.02).toFixed(2)}%2C${(lat-0.02).toFixed(2)}%2C${(lon+0.02).toFixed(2)}%2C${(lat+0.02).toFixed(2)}`;
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  });
});

<<<<<<< HEAD
=======
// ---------- Reveal on scroll ----------
>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf
let observer;
function revealRefresh(){
  if(observer) observer.disconnect();
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); observer.unobserve(e.target); } });
  }, {threshold:0.08});
  document.querySelectorAll('.reveal-up').forEach(el=>observer.observe(el));
}

<<<<<<< HEAD
function openSearch(){ alert('Recherche à implémenter (démo)'); }
function subscribe(){ alert('Merci ! Vous êtes inscrit.'); }
function sendContact(){ alert('Message envoyé !'); }

// ---------------- Boot ----------------
cartLoad(); cartRender(); renderProducts(); revealRefresh(); updateAccountUI();
=======
// ---------- Stripe buttons (offres) ----------
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-stripe]');
  if(!btn) return;
  const key = btn.getAttribute('data-stripe');
  const link = stripeLinks[key];
  if(link) window.open(link, '_blank');
  else alert('Lien Stripe non configuré.');
});

// init render
renderProducts();
renderHighlight();
revealRefresh();
>>>>>>> 8b3ee964e30697230dea8e20d3b88417de95d3cf
