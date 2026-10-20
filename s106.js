// s106 (ideas #99, #100, #109, #159): Rivalry week crowd, record-kick photos, Weekly Kick Challenge team picks, gold button check.
// All free and local. Nothing here changes scoring or kick physics.
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on)return;const {T_,J2,S2,DK,hash,esc,BS,ROW,SUB,H2,card,WEEK}=U;
const coin=n=>{try{n&&addCoins(n)}catch(e){}};const say=t=>{try{toast(t)}catch(e){}};
// ---------- #99 Rivalry week: louder rival fans ----------
const isRiv=()=>{try{return mode==='career'&&CAR&&CAR.sched&&CAR.sched[CAR.wk]&&CAR.sched[CAR.wk].rv}catch(e){return false}};
let rivOn=false,rivN=0;
const rivH=e=>{try{
 if(e.t==='start'){rivOn=!!isRiv();rivN=0;if(rivOn){setTimeout(()=>say('🔥 '+T_('RIVALRY WEEK')+' · '+T_('their fans came loud')),700);try{sfx.crowd()}catch(x){}}return}
 if(!rivOn||!isRiv())return;
 if(e.t==='make'){try{sfx.crowd();setTimeout(()=>{try{sfx.crowd()}catch(x){}},260)}catch(x){}}
 if(e.t==='miss'){rivN++;try{sfx.crowd()}catch(x){}if(rivN===1||rivN%3===0)say('📣 '+T_('Rival fans roar!'))}
 if(e.t==='end')rivOn=false}catch(x){}};on(rivH);
// ---------- #100 Record-kick photos (stored on this phone in IndexedDB, newest 8) ----------
const DB=()=>new Promise((ok,no)=>{try{const r=indexedDB.open('fgfPhotos',1);r.onupgradeneeded=()=>r.result.createObjectStore('p',{keyPath:'t'});r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)}catch(e){no(e)}});
async function putP(o){const d=await DB();await new Promise(r=>{const tx=d.transaction('p','readwrite');tx.objectStore('p').put(o);tx.oncomplete=r;tx.onerror=r});const all=await getP();if(all.length>8){const tx=d.transaction('p','readwrite');all.slice(8).forEach(x=>tx.objectStore('p').delete(x.t))}}
async function getP(){const d=await DB();return new Promise(r=>{const q=d.transaction('p').objectStore('p').getAll();q.onsuccess=()=>r((q.result||[]).sort((a,b)=>b.t-a.t));q.onerror=()=>r([])})}
function snap(){try{const c=document.getElementById('c');if(!c)return null;const w=300,h=Math.round(w*c.height/c.width),t=document.createElement('canvas');t.width=w;t.height=h;t.getContext('2d').drawImage(c,0,0,w,h);return t.toDataURL('image/jpeg',0.72)}catch(e){return null}}
const recH=e=>{try{if(e.t!=='make'||!e.d||/^xm_|^tut|^range/.test(String(e.m||'')))return;const best=+(LS.fgfRecPh||0);if(e.d<=best||e.d<30)return;LS.fgfRecPh=e.d;
 setTimeout(()=>{const im=snap();if(!im)return;putP({t:Date.now(),d:e.d,m:String(e.m||''),im}).then(()=>say('📸 '+T_('Record photo saved')+' · '+e.d+' '+T_('yds')),()=>{})},350)}catch(x){}};on(recH);
async function photos(){let L=[];try{L=await getP()}catch(e){}
 const cells=L.length?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${L.map(p=>`<div style="${ROW};padding:6px;margin:0"><img src="${p.im}" alt="" style="width:100%;border-radius:8px;display:block"><div style="font:900 13px system-ui;color:#f2c230;margin-top:5px">${p.d} ${T_('yds')}</div><div style="${SUB}">${new Date(p.t).toLocaleDateString()}</div></div>`).join('')}</div>`:`<div style="${ROW};text-align:center;color:#9fb8aa">${T_('Beat your longest kick to take your first photo.')}</div>`;
 card('📸 '+T_('RECORD PHOTOS'),`<div style="${SUB};text-align:center;margin-bottom:8px">${T_('A photo is saved each time you beat your longest kick. Kept on this phone only.')}</div>`+cells,'fgfs106')}
// ---------- #109 Weekly Kick Challenge: rep a team ----------
const TN=()=>{try{return TEAMS.map(t=>t.n)}catch(e){return[]}};
const KS=()=>{try{return window.FGF_S72TEST&&FGF_S72TEST.KSEED()}catch(e){return null}};
const par=i=>2+hash('par-'+WEEK()+'-'+i)%3;// 2-4 of 5
const pick=()=>{const p=J2('fgfWkPick',null);return p&&p.w===WEEK()?p:null};
function pickRow(){const p=pick(),N=TN();if(!N.length)return '';
 return `<div id="wkpick" style="${ROW};margin-top:10px"><div style="color:#e9d27a;font:900 12px system-ui;margin-bottom:6px">🏈 ${T_('REP A TEAM THIS WEEK')}</div>`+
 (p?`<div style="font:800 13px system-ui">${esc(N[p.i])} · ${T_('target')} ${par(p.i)}/5 ${p.ok?'· ✅ 🪙 +30':''}</div><div style="${SUB}">${T_('Beat the target on this week\'s code for 🪙 30 (once a week).')}</div>`
 :`<div style="${SUB};margin-bottom:6px">${T_('Pick a team. Beat its target on this week\'s code for 🪙 30.')}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${N.map((n,i)=>`<button data-tp="${i}" style="${BS};padding:7px 8px;min-height:40px;font-size:12px">${esc(n)} · ${par(i)}/5</button>`).join('')}</div>`)+`</div>`}
new MutationObserver(()=>{const d=document.getElementById('fgfs72');if(!d||d.__s106||!d.querySelector('#kp'))return;d.__s106=1;const box=d.querySelector('#kp').parentElement;const w=document.createElement('div');w.innerHTML=pickRow();box.insertAdjacentElement('afterend',w);
 const bind=()=>w.querySelectorAll('[data-tp]').forEach(b=>b.onclick=()=>{S2('fgfWkPick',{w:WEEK(),i:+b.dataset.tp,ok:0});w.innerHTML=pickRow();bind()});bind()}).observe(document.body,{childList:true,subtree:true});
setInterval(()=>{try{const X=window.FGF_XM&&FGF_XM(),K=KS(),p=pick();if(!X||!X.done||X.t!=='code'||!K||X.code!==K||X.__wp||!p)return;X.__wp=1;if(!p.ok&&X.made>=par(p.i)){p.ok=1;S2('fgfWkPick',p);coin(30);say('🏈 '+esc(TN()[p.i])+' '+T_('target beaten')+' · 🪙 +30')}}catch(e){}},500);
// ---------- hub row ----------
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{L.push(['📸','RECORD PHOTOS',T_('A photo of every new longest kick'),()=>photos(),false])}catch(e){}return L};
// ---------- #159 gold button check: every solid gold button in a card gets the same size and shape ----------
const GOLD=/rgb\(\s*(242,\s*194,\s*48|255,\s*210,\s*63|245,\s*197,\s*66|233,\s*210,\s*122)\s*\)/;
function fix(root){try{root.querySelectorAll('button').forEach(b=>{if(b.__g)return;const bg=getComputedStyle(b).backgroundColor;if(!GOLD.test(bg))return;b.__g=1;Object.assign(b.style,{background:'#f2c230',color:'#062a14',borderRadius:'12px',minHeight:'44px',fontWeight:'900',border:'0',boxShadow:'0 2px 0 #9c7a12'})})}catch(e){}}
new MutationObserver(m=>{for(const r of m)for(const n of r.addedNodes)if(n.nodeType===1&&(n.classList.contains('fgfov')||n.closest&&n.closest('.fgfov')))fix(n.closest('.fgfov')||n)}).observe(document.body,{childList:true,subtree:true});
window.FGF_S106={photos,par,fix,recH,rivH};
})();
