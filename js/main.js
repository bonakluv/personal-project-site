// main.js — loads data, renders map and list, provides filters
const DATA_URL = 'data/activities.json';
let activities = [];
let map, markersLayer;

function initMap(){
  map = L.map('map', {preferCanvas:true}).setView([39.5, -98.35], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  markersLayer = L.layerGroup().addTo(map);
}

function loadData(){
  fetch(DATA_URL).then(r=>r.json()).then(d=>{
    activities = d;
    populateCategoryOptions();
    renderAll();
  }).catch(err=>console.error('Failed loading data',err));
}

function populateCategoryOptions(){
  const cats = Array.from(new Set(activities.map(a=>a.category))).sort();
  const sel = document.getElementById('category');
  cats.forEach(c=>{ const opt = document.createElement('option'); opt.value=c; opt.textContent=c; sel.appendChild(opt); });
}

function getFilters(){
  return {
    q: document.getElementById('search').value.trim().toLowerCase(),
    category: document.getElementById('category').value,
    price: document.getElementById('price').value,
    age: document.getElementById('age').value,
    availability: document.getElementById('availability').value.trim().toLowerCase(),
    state: document.getElementById('state') ? document.getElementById('state').value.trim().toUpperCase() : ''
  };
}

function applyFilters(items, f){
  return items.filter(a=>{
    if(f.q){ const hay = (a.title+' '+a.city+' '+a.state+' '+a.description).toLowerCase(); if(!hay.includes(f.q)) return false; }
    if(f.category && a.category!==f.category) return false;
    if(f.price!=='any'){ if(f.price==='free' && a.price>0) return false; if(f.price==='paid' && a.price===0) return false; }
    if(f.age){ if(!a.age_groups.includes(f.age)) return false; }
    if(f.availability){ if(!a.availability.toLowerCase().includes(f.availability)) return false; }
    if(f.state){ if(a.state.toUpperCase()!==f.state) return false; }
    return true;
  });
}

function renderAll(){
  const f = getFilters();
  const filtered = applyFilters(activities, f);
  renderList(filtered);
  renderMarkers(filtered);
}

function renderList(items){
  const el = document.getElementById('results'); el.innerHTML='';
  if(items.length===0){ el.innerHTML='<p>No results</p>'; return; }
  items.forEach(a=>{
    const d = document.createElement('div'); d.className='item';
    d.innerHTML = `<h3>${a.title}</h3><div>${a.city}, ${a.state} — ${a.category} — ${a.price===0? 'Free': '$'+a.price}</div><p>${a.description}</p><div><a href='${a.url}' target='_blank'>More</a> • ${a.availability}</div>`;
    d.addEventListener('click', ()=>{ map.setView([a.lat,a.lon],13); });
    el.appendChild(d);
  });
}

function renderMarkers(items){
  markersLayer.clearLayers();
  items.forEach(a=>{
    if(typeof a.lat!=='number' || typeof a.lon!=='number') return;
    const m = L.marker([a.lat,a.lon]).bindPopup(`<strong>${a.title}</strong><br>${a.city}, ${a.state}<br>${a.category} • ${a.price===0? 'Free': '$'+a.price}`);
    markersLayer.addLayer(m);
  });
}

function wireControls(){
  ['search','category','price','age','availability','state'].forEach(id=>{ const el = document.getElementById(id); if(!el) return; el.addEventListener('input', debounce(renderAll,300)); });
  document.getElementById('clear').addEventListener('click', ()=>{ document.getElementById('search').value=''; document.getElementById('category').value=''; document.getElementById('price').value='any'; document.getElementById('age').value=''; document.getElementById('availability').value=''; document.getElementById('state').value=''; renderAll(); });
}

function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }

document.addEventListener('DOMContentLoaded', ()=>{
  initMap(); loadData(); wireControls();
  // refresh data periodically (every 5 minutes)
  setInterval(loadData, 5*60*1000);
});
