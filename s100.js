// s100 (Oct 18 #166, Oct 19 #213, #214, #216): auto-pause, auto quality, swipe path replay, backup save copy.
// Auto-pause (default ON): leaving the app / a call during a kick pauses it (the pause screen is already in game.js).
// Auto quality (default ON): if a kick screen runs slow for a few seconds, the canvas sharpness steps down (2x → 1.5x → 1x) once each, with one quiet toast.
// Swipe path replay (default OFF): after each kick, the line your finger drew fades out over about a second.
// Backup save: a copy of your save lives in IndexedDB (refreshed every minute and when you leave); if the main save is ever wiped, you get a "restore" card.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,BS,ROW,SUB,card}=U;
// ---- auto-pause ----
const ap=()=>{try{if(LS.fgfAutoPause!=='0'&&state==='play'&&!paused&&!(window.FGF_LGCEL&&FGF_LGCEL.on)){paused=true;swipe=null}}catch(e){}};
document.addEventListener('visibilitychange',()=>{if(document.hidden)ap()});addEventListener('pagehide',ap);
// ---- auto quality ----
let fr=[],lt=0,steps=0,cool=0;const oRAF=window.requestAnimationFrame.bind(window);
(function tick(t){try{if(lt&&state==='play'&&!paused&&!document.hidden&&LS.fgfAutoQ!=='0'&&LS.fgfBatt!=='1'){const d=t-lt;if(d<200)fr.push(d);if(fr.length>=150){fr.sort((a,b)=>a-b);const med=fr[75];fr=[];
 if(med>24&&t>cool){const cur=Math.min(window.FGF_DPRCAP||3,window.devicePixelRatio||1);const nx=cur>2?2:cur>1.5?1.5:cur>1?1:0;if(nx){window.FGF_DPRCAP=nx;resize();steps++;cool=t+8000;if(steps===1)toast('⚡ '+T_('Smoother mode on for this phone'))}}}}else fr=[];lt=t}catch(e){}oRAF(tick)})(0);
// ---- swipe path replay ----
let SL=null;const oK=kick;kick=function(s){try{if(LS.fgfSwipeLine==='1'&&s&&s.length>1)SL={p:s.map(q=>({x:q.x,y:q.y})),t:performance.now()}}catch(e){}return oK.apply(this,arguments)};
const oDB=drawBall;drawBall=function(){const r=oDB.apply(this,arguments);try{if(SL){const a=1-(performance.now()-SL.t)/1100;if(a<=0){SL=null}else{ctx.save();ctx.globalAlpha=a*0.85;ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=4;ctx.beginPath();SL.p.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.stroke();const e=SL.p[SL.p.length-1];ctx.fillStyle='#f2c230';ctx.beginPath();ctx.arc(e.x,e.y,6,0,7);ctx.fill();ctx.restore()}}}catch(e){}return r};
// ---- backup save (IndexedDB) ----
const keys=()=>Object.keys(localStorage).filter(k=>k.startsWith('fgf')&&!/^fgf(Bak|LastPlay|ProfCur)$/.test(k)&&!k.startsWith('fgfProf_'));
const snap=()=>{const o={};keys().forEach(k=>o[k]=localStorage.getItem(k));return o};
const val=o=>o&&((+o.fgfCoins||0)>0||(+o.fgfXP||0)>0);
const PK=()=>'main_'+(localStorage.getItem('fgfProfCur')||'0');let db=null;const DB=()=>new Promise(res=>{if(db)return res(db);try{const r=indexedDB.open('fgfBackup',1);r.onupgradeneeded=()=>r.result.createObjectStore('s');r.onsuccess=()=>{db=r.result;res(db)};r.onerror=()=>res(null)}catch(e){res(null)}});
const put=async()=>{try{if(window.TESTER||window.FGF_TRYING)return;const o=snap();if(!val(o))return;const d=await DB();if(!d)return;const tx=d.transaction('s','readwrite');tx.objectStore('s').put({t:Date.now(),o},PK())}catch(e){}};
const get=async()=>{try{const d=await DB();if(!d)return null;return await new Promise(res=>{const q=d.transaction('s').objectStore('s').get(PK());q.onsuccess=()=>res(q.result||null);q.onerror=()=>res(null)})}catch(e){return null}};
async function check(){const b=await get();const cur=snap();if(b&&val(b.o)&&!val(cur)&&(+b.o.fgfCoins||0)>(+cur.fgfCoins||0)){const dt=new Date(b.t);
 const d=card('💾 '+T_('RESTORE YOUR SAVE?'),`<div style="${ROW};text-align:center">${T_('We found a backup copy of your save on this device')}<div style="${SUB}">🪙 ${(+b.o.fgfCoins||0).toLocaleString()} · ${dt.toLocaleDateString()}</div></div><button id="rs" style="${BS};display:block;width:100%;margin-top:8px;background:#f2c230;color:#0b2a16;text-align:center">${T_('RESTORE')}</button>`,'fgfs100');
 d.querySelector('#rs').onclick=()=>{try{Object.keys(b.o).forEach(k=>localStorage.setItem(k,b.o[k]));location.reload()}catch(e){}}}else setTimeout(put,4000)}
setTimeout(check,2500);setInterval(put,60000);document.addEventListener('visibilitychange',()=>{if(document.hidden)put()});
window.FGF_BACKUP={put,get,check,snap};
})();
