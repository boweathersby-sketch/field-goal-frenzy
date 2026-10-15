// s60 Batch 11a — Shop QoL: Shop Finder (search, Owned/Unowned/New/Wishlist filters, sort by price, hide finished
// categories), hold-to-buy, wishlist + "you can afford it" reminder, NEW badges, pinned favorites (one-tap equip from
// the title screen), Undo last equip, Rookie first pick. Coins only; uses the same buy/equip rules as the shop rows.
(function(){
const J2=(k,d)=>{try{return JSON.parse(LS[k]||'')||d}catch(e){return d}},S2=(k,v)=>LS[k]=JSON.stringify(v);
const CATS=()=>SHOP.filter(c=>Array.isArray(c[1])&&c[1].length&&c[1].some(m=>Array.isArray(m)&&typeof m[2]==='number'));
const owns=m=>Array.isArray(m)?(m[2]===0||own.includes(m[0])):(m.p===0||own.includes(m.id));
const all=()=>{const r=[];CATS().forEach(c=>c[1].forEach(m=>{if(Array.isArray(m)&&typeof m[2]==='number'&&m[2]>=0)r.push({c:c[0],id:m[0],n:m[1],p:m[2]})}));return r};
// NEW badges: first time an id is seen gets a date; anything first seen after the install day is NEW for 7 days
const today=()=>Math.floor(Date.now()/864e5);let SEEN=J2('fgfSeen2',null);
function seen(){const L=all();if(!SEEN){SEEN={_:today()};L.forEach(x=>SEEN[x.id]=0);S2('fgfSeen2',SEEN);return}let ch=0;L.forEach(x=>{if(!(x.id in SEEN)){SEEN[x.id]=today();ch=1}});if(ch)S2('fgfSeen2',SEEN)}
const isNew=id=>SEEN&&SEEN[id]>0&&today()-SEEN[id]<7;
let WISH=J2('fgfWish',[]),PIN=J2('fgfPin',[]);
const nm=x=>window.FGF_TR?FGF_TR(x.n):x.n;
function equip(id){const s=slot(id),on=eq[s]===id;eq[s]=on&&(s==='g'||s==='v')?'':id;SV('fgfEq',eq)}
function buy(x){if(owns(x))return equip(x.id);if(coins<x.p){toast('Need 🪙 '+x.p.toLocaleString());return}addCoins(-x.p);own.push(x.id);SV('fgfOwn',own);eq[slot(x.id)]=x.id;SV('fgfEq',eq);WISH=WISH.filter(i=>i!==x.id);S2('fgfWish',WISH);toast('✔ '+nm(x));try{sfx.cheer()}catch(e){}}
const rookie=()=>{if(LS.fgfRookie==='1'||own.some(i=>{const m=ITEM[i];return m&&m[2]>0}))return null;const L=all().filter(x=>!owns(x)&&x.p>0&&x.p<=Math.max(coins,300)&&(x.c==='TEES'||x.c==='BALLS'||x.c==='TRAILS')).sort((a,b)=>a.p-b.p);return L[0]?L[0].id:null};
// ---------- overlay ----------
const css=`.fgfov{position:fixed;inset:0;z-index:66;background:rgba(2,12,6,.96);color:#fff;font:14px system-ui;display:flex;flex-direction:column}
.fgfov .hd{padding:10px 10px 6px;display:flex;gap:6px;align-items:center}.fgfov input{flex:1;min-width:0;font:16px system-ui;padding:9px 10px;border-radius:10px;border:2px solid #f2c230;background:#05200f;color:#fff}
.fgfov .b{border:2px solid #f2c230;background:#05200f;color:#f2c230;border-radius:16px;padding:7px 10px;font:900 12px system-ui;white-space:nowrap}.fgfov .b.on{background:#f2c230;color:#000}
.fgfov .ch{display:flex;gap:6px;flex-wrap:wrap;padding:0 10px 6px}.fgfov select{font:13px system-ui;padding:6px;border-radius:10px;background:#05200f;color:#fff;border:2px solid #f2c230;max-width:46%}
.fgfov .ls{flex:1;overflow:auto;padding:4px 10px 10px;-webkit-overflow-scrolling:touch}.fgfov .r{display:flex;align-items:center;gap:8px;min-height:56px;margin:0 0 8px;padding:6px 8px;border:2px solid #f2c23066;border-radius:12px;background:#062a14}
.fgfov .r.rk{border-color:#7fff8a;box-shadow:0 0 10px #7fff8a88}.fgfov .t{flex:1;min-width:0}.fgfov .t b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fgfov .t i{font-style:normal;font-size:11px;color:#bcd}
.fgfov .ic{font-size:20px;background:none;border:0;color:#f2c230;width:36px;height:40px}.fgfov .buy{position:relative;overflow:hidden;min-width:96px;height:40px}.fgfov .buy span{position:absolute;left:0;top:0;bottom:0;width:0;background:#f2c23088}
.fgfov .ft{padding:8px 10px calc(10px + env(safe-area-inset-bottom));display:flex;gap:8px;justify-content:center}.fgfov .nw{background:#ff6a3d;color:#000;border-radius:7px;padding:0 5px;font:900 9px system-ui;margin-left:4px}`;
let F={q:'',f:'all',s:'def',c:'',hide:LS.fgfHideDone==='1'};
function open(){if(document.getElementById('fgffind'))return;seen();if(!document.getElementById('fgfovcss')){const s=document.createElement('style');s.id='fgfovcss';s.textContent=css;document.head.appendChild(s)}
 const d=document.createElement('div');d.className='fgfov';d.id='fgffind';d.innerHTML=`<div class="hd"><input id="ffq" placeholder="🔎 Search the shop" autocomplete="off"><span id="ffc" style="color:#f2c230;font-weight:900"></span></div>
 <div class="ch" id="fff"></div><div class="ch"><select id="ffcat"></select><select id="ffs"><option value="def">Shop order</option><option value="lo">Cheapest first</option><option value="hi">Priciest first</option><option value="az">A–Z</option></select><button class="b" id="ffh"></button></div>
 <div class="ch" id="ffpin"></div><div class="ls" id="ffl"></div><div class="ft"><button class="b" id="ffx" style="min-width:160px;padding:11px">◀ BACK TO SHOP</button></div>`;document.body.appendChild(d);d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',350);
 const $=i=>d.querySelector('#'+i);$('ffq').value=F.q;$('ffq').oninput=e=>{F.q=e.target.value;draw()};$('ffs').value=F.s;$('ffs').onchange=e=>{F.s=e.target.value;draw()};$('ffcat').onchange=e=>{F.c=e.target.value;draw()};
 $('ffh').onclick=()=>{F.hide=!F.hide;LS.fgfHideDone=F.hide?'1':'0';draw()};$('ffx').onclick=close;
 [['all','All'],['un','Unowned'],['own','Owned'],['new','NEW'],['wish','☆ Wishlist']].forEach(([k,t])=>{const b=document.createElement('button');b.className='b';b.textContent=t;b.dataset.k=k;b.onclick=()=>{F.f=k;draw()};$('fff').appendChild(b)});draw()}
function close(){const d=document.getElementById('fgffind');if(d)d.remove()}
function draw(){const d=document.getElementById('fgffind');if(!d)return;const $=i=>d.querySelector('#'+i);const L=all(),rk=rookie();
 const done=c=>{const C=SHOP.find(x=>x[0]===c);return C&&C[1].every(m=>!Array.isArray(m)||typeof m[2]!=='number'||m[2]<0||owns(m))};
 const cats=CATS().map(c=>c[0]).filter(c=>!F.hide||!done(c));if(F.c&&!cats.includes(F.c))F.c='';
 $('ffcat').innerHTML='<option value="">All categories</option>'+cats.map(c=>`<option ${c===F.c?'selected':''} value="${c}">${c}${done(c)?' ✓':''}</option>`).join('');
 $('ffh').textContent=F.hide?'Show finished':'Hide finished';$('ffh').classList.toggle('on',F.hide);d.querySelectorAll('#fff .b').forEach(b=>b.classList.toggle('on',b.dataset.k===F.f));$('ffc').textContent='🪙 '+coins.toLocaleString();
 const q=F.q.trim().toLowerCase();let R=L.filter(x=>cats.includes(x.c)&&(!F.c||x.c===F.c)&&(!q||nm(x).toLowerCase().includes(q)||x.c.toLowerCase().includes(q)));
 R=R.filter(x=>F.f==='all'||(F.f==='un'&&!owns(x))||(F.f==='own'&&owns(x))||(F.f==='new'&&isNew(x.id))||(F.f==='wish'&&WISH.includes(x.id)));
 if(F.s==='lo')R.sort((a,b)=>(owns(a)-owns(b))||a.p-b.p);else if(F.s==='hi')R.sort((a,b)=>(owns(a)-owns(b))||b.p-a.p);else if(F.s==='az')R.sort((a,b)=>nm(a).localeCompare(nm(b)));
 if(rk&&F.f==='all'&&!q){const i=R.findIndex(x=>x.id===rk);if(i>0)R.unshift(R.splice(i,1)[0])}
 const P=PIN.map(i=>L.find(x=>x.id===i)).filter(Boolean);$('ffpin').innerHTML=P.length?'<span style="font-size:11px;color:#bcd;align-self:center">📌 Pinned:</span>':'';P.forEach(x=>{const b=document.createElement('button');b.className='b'+(eq[slot(x.id)]===x.id?' on':'');b.textContent=nm(x);b.onclick=()=>{equip(x.id);draw()};$('ffpin').appendChild(b)});
 const ls=$('ffl');ls.innerHTML='';if(!R.length){ls.innerHTML='<div style="text-align:center;color:#bcd;padding:30px 10px">'+(F.f==='wish'?'No wishlist items yet. Tap ☆ on any item to add it.':F.f==='new'?'Nothing new this week. New items get a NEW badge for 7 days.':'No items match.')+'</div>';return}
 R.slice(0,250).forEach(x=>{const o=owns(x),on=eq[slot(x.id)]===x.id,r=document.createElement('div');r.className='r'+(x.id===rk?' rk':'');
  r.innerHTML=`<button class="ic" data-a="w">${WISH.includes(x.id)?'★':'☆'}</button><div class="t"><b>${nm(x).replace(/</g,'&lt;')}${isNew(x.id)?'<span class="nw">NEW</span>':''}</b><i>${x.c}${x.id===rk?' · ⭐ Rookie pick: a great first buy':''}${o?'':x.p>coins?' · need '+(x.p-coins).toLocaleString()+' more':''}</i></div>${o?`<button class="ic" data-a="p">${PIN.includes(x.id)?'📌':'📍'}</button>`:''}<button class="b buy ${on?'on':''}" data-a="b"><span></span>${on?'EQUIPPED':o?'EQUIP':'HOLD 🪙 '+x.p.toLocaleString()}</button>`;
  r.querySelector('[data-a=w]').onclick=()=>{WISH=WISH.includes(x.id)?WISH.filter(i=>i!==x.id):[...WISH,x.id];S2('fgfWish',WISH);draw()};
  const pb=r.querySelector('[data-a=p]');if(pb)pb.onclick=()=>{PIN=PIN.includes(x.id)?PIN.filter(i=>i!==x.id):[...PIN,x.id].slice(-4);S2('fgfPin',PIN);draw()};
  const bb=r.querySelector('[data-a=b]');if(o)bb.onclick=()=>{equip(x.id);draw()};else{let t=null,s=0;const bar=bb.querySelector('span');const st=e=>{e.preventDefault();s=performance.now();const f=()=>{const k=Math.min(1,(performance.now()-s)/650);bar.style.width=k*100+'%';if(k>=1){t=null;bar.style.width=0;if(x.id===rk)LS.fgfRookie='1';buy(x);draw();return}t=requestAnimationFrame(f)};t=requestAnimationFrame(f)},en=()=>{if(t){cancelAnimationFrame(t);t=null;bar.style.width=0;if(performance.now()-s<650)toast('Hold to buy')}};
   bb.addEventListener('pointerdown',st);bb.addEventListener('pointerup',en);bb.addEventListener('pointerleave',en);bb.addEventListener('pointercancel',en)}
  ls.appendChild(r)})}
// ---------- hooks ----------
const oDS=drawShop;drawShop=function(){const r=oDS.apply(this,arguments);try{bx(W*0.96-70,H*0.075+6,70,28,'🔎 FIND',open,false,11)}catch(e){}return r};
// pinned favorites on the title screen + wishlist reminder
let lastSt='',remD=LS.fgfWishRem||'';
const oSc=S3.screen;S3.screen=function(){const r=oSc.apply(this,arguments);try{if(state!==lastSt){lastSt=state;if(state==='title'&&WISH.length&&remD!==String(today())){const L=all().filter(x=>WISH.includes(x.id)&&!owns(x)&&x.p<=coins).sort((a,b)=>a.p-b.p);if(L[0]){remD=LS.fgfWishRem=String(today());toast('☆ You can afford '+nm(L[0])+' from your wishlist!')}}}
 if(state==='title'&&PIN.length&&!document.querySelector('.fgfov:not(#fgfscrchip):not(#fgfundo):not(#fgfcoinbd)'))bx(6,44,58,26,'📌 PINS',pinPop,false,9)}catch(e){}return r};
// Undo last equip: watch eq for changes and offer a 5 s Undo
let snap=JSON.stringify(eq),ut=0;
function undoBar(prev){let b=document.getElementById('fgfundo');if(!b){b=document.createElement('div');b.id='fgfundo';b.className='fgfov';b.style.cssText='position:fixed;inset:auto;left:50%;transform:translateX(-50%);bottom:calc(70px + env(safe-area-inset-bottom));z-index:67;background:#05200f;border:2px solid #f2c230;border-radius:20px;padding:6px 8px 6px 14px;display:flex;flex-direction:row;align-items:center;gap:10px;font:700 13px system-ui;color:#fff;white-space:nowrap';document.body.appendChild(b)}
 b.innerHTML='Equipped · <button class="b" style="border:2px solid #f2c230;background:#f2c230;color:#000;border-radius:14px;padding:5px 12px;font:900 12px system-ui">UNDO</button>';b.querySelector('button').onclick=()=>{Object.keys(eq).forEach(k=>delete eq[k]);Object.assign(eq,prev);SV('fgfEq',eq);snap=JSON.stringify(eq);b.remove();toast('↩ Equip undone')};clearTimeout(ut);ut=setTimeout(()=>b.remove(),5000)}
setInterval(()=>{const s=JSON.stringify(eq);if(s!==snap){const prev=JSON.parse(snap);snap=s;if(state!=='play')undoBar(prev)}},250);
function pinPop(){const L=all(),P=PIN.map(i=>L.find(x=>x.id===i)).filter(x=>x&&owns(x));const o=document.getElementById('fgfpins');if(o)o.remove();const d=document.createElement('div');d.id='fgfpins';d.className='fgfov';d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:66;display:flex;align-items:flex-start;justify-content:flex-start;padding:76px 8px';d.onclick=e=>{if(e.target===d)d.remove()};
 const box=document.createElement('div');box.style.cssText='background:#062a14;border:2px solid #f2c230;border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:8px;min-width:200px';box.innerHTML='<div style="color:#f2c230;font:900 13px system-ui">📌 PINNED · tap to equip</div>';P.forEach(x=>{const b=document.createElement('button');b.className='b'+(eq[slot(x.id)]===x.id?' on':'');b.style.cssText='text-align:left;padding:10px 12px';b.textContent=(eq[slot(x.id)]===x.id?'✔ ':'')+nm(x)+' · '+x.c;b.onclick=()=>{equip(x.id);d.remove();toast((eq[slot(x.id)]===x.id?'Equipped ':'Unequipped ')+nm(x))};box.appendChild(b)});if(!P.length)box.innerHTML+='<div style="color:#bcd">Pin owned items with 📍 in 🔎 FIND</div>';d.appendChild(box);document.body.appendChild(d)}
window.FGF_FINDER={pinPop,open,close,all,rookie,isNew,get WISH(){return WISH},get PIN(){return PIN}};
})();
