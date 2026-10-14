// s24: online-board initials (opt-in), light anti-cheat, low-end performance (DPR cap)
(function(){
// ---- initials prompt (once, remembered; decline = never post) ----
let asking=null;
window.FGF_ASKINI=function(force){if(asking)return asking;if(!force&&(LS.fgfOLIni||LS.fgfOLno==='1'))return Promise.resolve(LS.fgfOLIni||'');
 asking=new Promise(res=>{const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:19;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;font-family:system-ui';
  d.innerHTML='<div style="background:#0c1f12;border:2px solid #f2c230;border-radius:16px;padding:18px;width:min(320px,88vw);color:#fff;text-align:center"><div style="font:900 19px system-ui;color:#f2c230">🌐 POST TO THE ONLINE BOARD?</div><div style="font-size:13px;color:#cde;margin:8px 0 12px">Pick 3 initials to show next to your weekly best. Nothing else is shared.</div><input id="oli" maxlength="3" autocapitalize="characters" autocomplete="off" placeholder="ABC" style="width:120px;text-align:center;font:900 26px system-ui;letter-spacing:6px;padding:8px;border-radius:10px;border:2px solid #446;text-transform:uppercase"><div id="olm" style="min-height:16px;font-size:12px;color:#ff8a8a;margin:6px 0"></div><button id="oly" style="width:100%;font:900 16px system-ui;padding:12px;border-radius:12px;border:0;background:#f2c230;color:#063">POST MY SCORES</button><button id="oln" style="margin-top:10px;background:none;border:0;color:#8ab;font-size:13px">No thanks, keep scores private</button></div>';
  document.body.appendChild(d);d.addEventListener('pointerdown',e=>e.stopPropagation());const i=d.querySelector('#oli');i.value=LS.fgfOLIni||'';setTimeout(()=>i.focus(),50);
  const fin=v=>{d.remove();asking=null;res(v)};
  d.querySelector('#oly').onclick=()=>{const v=i.value.toUpperCase().replace(/[^A-Z]/g,'');if(v.length!==3){d.querySelector('#olm').textContent='Enter 3 letters (A–Z).';return}if(v==='FGF'){d.querySelector('#olm').textContent='Pick your own initials.';return}LS.fgfOLIni=v;LS.fgfOLno='0';try{if(typeof AZ!=='undefined')SV('fgfIni',[...v].map(c=>Math.max(0,AZ.indexOf(c))))}catch(e){}fin(v)};
  d.querySelector('#oln').onclick=()=>{if(!LS.fgfOLIni)LS.fgfOLno='1';fin(LS.fgfOLIni||'')}});return asking};
// ---- run tracking for anti-cheat ----
let run={t0:0,k:0},pst=state;
setInterval(()=>{if(state==='play'&&pst!=='play'&&!['cont','replay','pause','cpuk','cpukshot'].includes(pst))run={t0:performance.now(),k:0};pst=state},150);
const ok0=kick;kick=function(){if(state==='play')run.k++;return ok0.apply(this,arguments)};
const maxFor=k=>k*3300+25*k*(k-1)/2;
window.FGF_PLAUSIBLE=sc=>{const dur=(performance.now()-run.t0)/1000;if(!run.t0||dur<10)return false;if(run.k<1||sc>maxFor(run.k)||sc>2e6)return false;if(dur<run.k*1.2)return false;if(mode==='time'&&run.k>60)return false;return true};
const osub=FGF_ONLINE.submit.bind(FGF_ONLINE);
FGF_ONLINE.submit=function(sc){if(window.TESTER||window.FGF_NOSUBMIT||!this.enabled||!(sc>0))return Promise.resolve(false);if(!FGF_PLAUSIBLE(sc)){FGF_ONLINE.status='rejected';return Promise.resolve(false)}
 if(LS.fgfOLno==='1'&&!LS.fgfOLIni)return Promise.resolve(false);
 const go=()=>{const v=LS.fgfOLIni;if(!v||v==='FGF')return false;return osub(sc)};
 if(LS.fgfOLIni)return go();return new Promise(r=>setTimeout(()=>FGF_ASKINI().then(()=>r(go())),900))};
// ---- performance: cap canvas resolution on low-end / slow devices ----
const mem=navigator.deviceMemory||4,cores=navigator.hardwareConcurrency||4;
window.FGF_DPRCAP=Math.min(window.FGF_DPRCAP||3,(mem<=2||cores<=2)?1.5:2);try{resize()}catch(e){}
let n=0,t0=0,slow=0;const mon=t=>{if(!t0)t0=t;if(++n%90===0){const ft=(t-t0)/90;t0=t;if(state==='play'&&ft>24){if(++slow>=2&&window.FGF_DPRCAP>1.25){window.FGF_DPRCAP=Math.max(1.25,window.FGF_DPRCAP-0.5);try{resize()}catch(e){}slow=0}}else slow=0}if(n<5400)requestAnimationFrame(mon)};requestAnimationFrame(mon);
})();
