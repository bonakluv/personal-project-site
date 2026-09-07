// opportunities.js — filters and shows items targeted to children and teens
const DATA_URL = 'data/activities.json';
let activities = [];

function loadAndRender(){
  fetch(DATA_URL).then(r=>r.json()).then(d=>{ activities=d; render(); }).catch(e=>console.error(e));
}

function render(){
  const q = document.getElementById('search').value.trim().toLowerCase();
  const price = document.getElementById('price').value;
  const availability = document.getElementById('availability').value.trim().toLowerCase();
  let items = activities.filter(a=> a.age_groups.includes('children') || a.age_groups.includes('teens'));
  if(q){ items = items.filter(a=> (a.title+' '+a.city+' '+a.state+' '+a.description).toLowerCase().includes(q)); }
  if(price!=='any'){ if(price==='free') items = items.filter(a=>a.price===0); else items = items.filter(a=>a.price>0); }
  if(availability){ items = items.filter(a=> a.availability.toLowerCase().includes(availability)); }
  const el = document.getElementById('results'); el.innerHTML='';
  if(items.length===0){ el.innerHTML='<p>No matching youth opportunities.</p>'; return; }
  items.forEach(a=>{
    const d = document.createElement('div'); d.className='item';
    d.innerHTML = `<h3>${a.title}</h3><div>${a.city}, ${a.state} — ${a.category} — ${a.price===0? 'Free': '$'+a.price}</div><p>${a.description}</p><div><a href='${a.url}' target='_blank'>Details</a> • ${a.availability}</div>`;
    el.appendChild(d);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadAndRender();
  ['search','price','availability'].forEach(id=>{ const el=document.getElementById(id); if(el) el.addEventListener('input', debounce(render,300)); });
  document.getElementById('clear').addEventListener('click', ()=>{ document.getElementById('search').value=''; document.getElementById('price').value='any'; document.getElementById('availability').value=''; render(); });
});

function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; }
