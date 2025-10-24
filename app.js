// --- Produits avec images (Unsplash) ---
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

// Stripe Payment Links (remplacer par vos liens Stripe réels)
const stripeLinks = {
  ts: "https://buy.stripe.com/test_123ts",        // tee-shirts offre
  chemises: "https://buy.stripe.com/test_123chem", // chemises offre
  jeans: "https://buy.stripe.com/test_123jean"     // jeans offre
};

let page = 1;
const perPage = 8;
let cart = [];

const grid = document.getElementById('product-grid');
const filterCat = document.getElementById('filterCat');
const sortBy = document.getElementById('sortBy');

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
          <button class="btn btn-black" onclick="addToCart(${p.id})">Panier</button>
          <button class="btn btn-outline" onclick="buyNow(${p.id})">Acheter</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

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
const map = document.getElementById('map');
document.querySelectorAll('.store-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const lat = parseFloat(btn.dataset.lat), lon = parseFloat(btn.dataset.lon);
    const bbox = `${(lon-0.02).toFixed(2)}%2C${(lat-0.02).toFixed(2)}%2C${(lon+0.02).toFixed(2)}%2C${(lat+0.02).toFixed(2)}`;
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  });
});

// ---------- Reveal on scroll ----------
let observer;
function revealRefresh(){
  if(observer) observer.disconnect();
  observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); observer.unobserve(e.target); } });
  }, {threshold:0.08});
  document.querySelectorAll('.reveal-up').forEach(el=>observer.observe(el));
}

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
