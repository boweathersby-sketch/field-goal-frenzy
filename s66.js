// s66 (Kirk, Oct 15): PAUSE → ⚙️ SETTINGS shows every setting that is safe mid-game, in a scrollable sheet.
// Toggles run the real Settings buttons (harvested from the Settings screens), so they behave exactly the same.
// Anything that would leave or reset the run is greyed out with a note. RESUME continues exactly where you paused.
(function(){
const PAGES=['set','mset','a11y','a11y2'];
const NAV=/BACK|MORE ▶|MORE SETTINGS|ACCESSIBILITY|CONTROLS|ARRANGE|REDEEM|CLOUD|TUTORIAL/;
const GREY={'TUTORIAL':'Starts the tutorial, which ends this run','CONTROLS':'Opens a new screen · change from the title screen','ARRANGE':'Title-screen menu · change from the title screen','REDEEM':'Opens a new screen · redeem from the title screen','CLOUD':'Loading a save could replace this run · use from the title screen'};
function harvest(pg){const st=state,bt=BTN,sv=window.setOpen;let out=[];state=pg;BTN=[];try{ctx.save();S3.screen();ctx.restore()}catch(e){}out=BTN.slice();state=st;BTN=bt;return out}
function run(pg,key){const B=harvest(pg),b=B.find(x=>x.l&&lab(x.l)===key)||(key==='UMM'&&B.find(x=>!x.l&&x.y<H*0.2));if(!b)return;const st=state;state=pg;try{b.cb()}catch(e){}state=st;paused=true}
const lab=l=>String(l).split(':')[0].trim();
const BS='box-sizing:border-box;border:2px solid #f2c230;background:#05200f;color:#fff;border-radius:12px;padding:9px 12px;font:900 13px system-ui;display:block;width:100%;text-align:left;margin:0 0 6px';
function rows(){const R=[];const sec=t=>R.push(`<div style="color:#f2c230;font:900 12px system-ui;margin:10px 0 6px;letter-spacing:.05em">${t}</div>`);
 const btn=(pg,l,on)=>R.push(`<button data-p="${pg}" data-k="${lab(l).replace(/"/g,'&quot;')}" style="${BS};${on?'border-color:#2ecc71':''}">${l}</button>`);
 const grey=(l,n)=>R.push(`<div style="${BS};opacity:.45;cursor:default">${l}<br><span style="font:11px system-ui;color:#bcd">🔒 ${n}</span></div>`);
 const T={set:'SOUND & GENERAL',mset:'MUSIC, KICK STYLE & CONTROLS',a11y:'ACCESSIBILITY',a11y2:'MORE ACCESSIBILITY'};
 for(const pg of PAGES){sec(T[pg]);const B=harvest(pg);const ks=B.filter(b=>/^(NORMAL|LINE DRIVE|HIGH LOB)$/.test(b.l||''));
  for(const b of B){const l=b.l;if(!l){if(pg==='mset'&&b.y<H*0.2)btn(pg,'🎧 USE MY MUSIC: '+(LS.fgfUMM==='1'?'ON':'OFF'),LS.fgfUMM==='1');continue}
   if(ks.includes(b))continue;if(/KICK METHOD/.test(l))continue;/* duplicate of the 🦶 KICKING METHOD section below */if(l==='−'||l==='+')continue;const g=Object.keys(GREY).find(k=>l.includes(k));if(g){grey(l,GREY[g]);continue}if(NAV.test(l))continue;btn(pg,l,/: ON|Español/.test(l))}
  if(pg==='mset'&&ks.length)R.push(`<div style="font:900 12px system-ui;margin:2px 0 4px">🏈 BALL FLIGHT</div><div style="display:flex;gap:6px;margin-bottom:6px">`+ks.map(b=>{const on=({NORMAL:'n','LINE DRIVE':'l','HIGH LOB':'h'})[b.l]===(LS.fgfKT||'n');return `<button data-p="mset" data-k="${b.l}" aria-pressed="${on}" style="${BS};margin:0;text-align:center;font-size:11px;padding:8px 4px;${on?'border-color:#2ecc71;background:#0b3d1f;color:#7dffb0':''}">${on?'✔ ':''}${b.l}</button>`}).join('')+'</div>');
  if(pg==='a11y')R.push(`<div style="font:11px system-ui;color:#bcd;margin:0 0 6px">🔊 Volume sliders: Settings → More Settings → ♿ on the title screen.</div>`)}
 sec('🦶 KICKING METHOD');{const kc=LS.fgfKC||'swipe';[['swipe','👆 SWIPE (default)'],['hold','🎯 AIM + HOLD'],['meter','⏱️ TIMING METER']].forEach(o=>R.push(`<button data-kc="${o[0]}" style="${BS};${kc===o[0]?'border-color:#2ecc71':''}">${kc===o[0]?'✔ ':''}${o[1]}</button>`))}
 sec('REPLAYS, AIM & LIGHTING');const ms=LS.fgfMissSlo!=='0',ah=LS.fgfAimHelp||'auto',lt=LS.fgfLight||'auto';
 R.push(`<button data-x="slo" style="${BS};${ms?'border-color:#2ecc71':''}">🎬 SLOW-MO MISS REPLAYS: ${ms?'ON':'OFF'}</button>`);
 R.push(`<button data-x="aim" style="${BS};${ah==='1'?'border-color:#2ecc71':''}">🎯 MOVING-POSTS AIM HELPER: ${ah==='1'?'ALWAYS':ah==='0'?'OFF':'FIRST RUNS'}</button>`);
 R.push(`<div style="font:900 12px system-ui;margin:2px 0 4px">💡 STADIUM LIGHTING</div><div style="display:flex;gap:6px;margin-bottom:6px">`+['auto','day','dusk','night'].map(v=>`<button data-l="${v}" style="${BS};margin:0;text-align:center;font-size:11px;padding:8px 4px;${lt===v?'border-color:#2ecc71':''}">${v.toUpperCase()}</button>`).join('')+'</div>');
 sec('NEEDS THE TITLE SCREEN');grey('🗑️ Reset progress, profiles, team change','These would end or reset this run');return R.join('')}
function open(){const o=document.getElementById('fgfpset');if(o)o.remove();const d=document.createElement('div');d.id='fgfpset';d.className='fgfov';d.style.cssText='position:fixed;inset:0;height:100vh;height:100dvh;box-sizing:border-box;background:rgba(2,8,16,.9);z-index:70;display:flex;align-items:center;justify-content:center;padding:calc(8px + env(safe-area-inset-top)) calc(10px + env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom)) calc(10px + env(safe-area-inset-left))';
 const draw=(keep)=>{const sc=keep?d.querySelector('#fgfpsl').scrollTop:0;d.innerHTML=`<div style="background:#062a14;border:2px solid #f2c230;border-radius:16px;padding:12px;max-width:360px;width:100%;box-sizing:border-box;color:#fff;font:14px system-ui;max-height:100%;display:flex;flex-direction:column;overflow:hidden"><div style="color:#f2c230;font:900 18px system-ui;text-align:center">⚙️ SETTINGS</div><div style="font:11px system-ui;color:#bcd;text-align:center;margin:2px 0 6px">Game paused · your run is safe</div><div id="fgfpsl" style="overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y;flex:1 1 auto;min-height:0;padding:0 4px 14px 0">${rows()}</div><div style="flex:none;display:flex;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(242,194,48,.35)"><button id="fgfpsb" style="${BS};margin:0;text-align:center">◀ PAUSE MENU</button><button id="fgfpsr" style="${BS};margin:0;text-align:center;background:#f2c230;color:#063">▶ RESUME</button></div></div>`;
  d.querySelector('#fgfpsl').scrollTop=sc;
  d.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{run(b.dataset.p,b.dataset.k==='🎧 USE MY MUSIC'?'UMM':b.dataset.k);draw(1)});
  d.querySelectorAll('[data-kc]').forEach(b=>b.onclick=()=>{LS.fgfKC=b.dataset.kc;draw(1)});d.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{if(b.dataset.x==='slo')LS.fgfMissSlo=LS.fgfMissSlo==='0'?'1':'0';else{const v=LS.fgfAimHelp||'auto';LS.fgfAimHelp=v==='auto'?'1':v==='1'?'0':'auto'}draw(1)});
  d.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{LS.fgfLight=b.dataset.l;draw(1)});
  d.querySelector('#fgfpsb').onclick=()=>d.remove();d.querySelector('#fgfpsr').onclick=()=>{d.remove();paused=true;setTimeout(()=>{paused=false},0)}};
 draw();document.body.appendChild(d);d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',300)}
window.FGF_PSET=open;
const oPM=pauseMenu;pauseMenu=function(){const r=oPM.apply(this,arguments);try{const b=BTN.find(x=>x.l==='⚙️ SETTINGS');if(b)b.cb=open}catch(e){}return r};
setInterval(()=>{const o=document.getElementById('fgfpset');if(o&&!paused)o.remove()},400);
})();
// Kirk bug (Oct 15): ✖ END RANGE did nothing. s54 pushed its button from drawBall, but the HUD clears BTN every play frame
// (s43) before the tap check, so the button was never hit-testable in any kick style. Re-register it after the HUD.
(function(){const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(state==='play'&&mode==='range'&&!BTN.some(b=>b.__rg2))BTN.push({x:8,y:H-60,w:92,h:32,cb:()=>{state='range';try{sfx.whistle()}catch(e){}},__rg:1,__rg2:1})}catch(e){}return r}})();
