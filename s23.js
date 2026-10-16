// s23: Android early-access sign-up (Supabase public.early_access) + Founding Kicker tester reward
(function(){
const SB=()=>window.FGF_ONLINE||{url:'https://fdmcgupjmjfpraznmsew.supabase.co',anonKey:'sb_publishable_944lD1vIQwA5DGifZqbFJw_AuC1xUkz'};
const okMail=e=>/^[a-z0-9._%+-]+@(gmail|googlemail)\.com$/i.test(e)||/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(e);
const isG=e=>/@(gmail|googlemail)\.com$/i.test(e);
function modal(html){const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:19;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;font-family:system-ui';d.innerHTML='<div style="background:#0c1f12;border:2px solid #f2c230;border-radius:16px;padding:18px;width:min(330px,88vw);color:#fff;text-align:center">'+html+'</div>';document.body.appendChild(d);d.addEventListener('pointerdown',e=>{e.stopPropagation();if(e.target===d)d.remove()});return d}
window.FGF_EARLY=function(){if(document.getElementById('eaf'))return;
 const d=modal('<div style="font:900 20px system-ui;color:#f2c230">🤖 GET IT EARLY ON ANDROID</div><div style="font-size:13px;color:#cde;margin:8px 0 12px">Enter the Gmail on your Android phone. Google Play testing needs a Google account.</div><input id="eaf" type="email" inputmode="email" autocomplete="email" placeholder="you@gmail.com" style="width:100%;box-sizing:border-box;font-size:16px;padding:11px;border-radius:10px;border:2px solid #446;background:#fff;color:#000"><div id="eam" style="min-height:18px;font-size:12px;margin:6px 0;color:#ff8a8a"></div><button id="eas" style="width:100%;font:900 16px system-ui;padding:12px;border-radius:12px;border:0;background:#f2c230;color:#063">SIGN ME UP</button><div style="font-size:11px;color:#9ab;margin-top:10px">🔒 Used only to invite you to Android testing.</div><button id="eac" style="margin-top:8px;background:none;border:0;color:#8ab;font-size:13px">Not now</button>');
 const i=d.querySelector('#eaf'),m=d.querySelector('#eam'),b=d.querySelector('#eas');d.querySelector('#eac').onclick=()=>d.remove();
 const done=t=>{LS.fgfEA='1';d.querySelector('div').innerHTML='<div style="font:900 20px system-ui;color:#7fe87f">✅ '+t+'</div><div style="font-size:13px;color:#cde;margin:10px 0">We\'ll email your Play testing invite.</div><button style="font:900 15px system-ui;padding:10px 24px;border-radius:12px;border:0;background:#f2c230;color:#063">OK</button>';d.querySelector('button').onclick=()=>d.remove()};
 b.onclick=()=>{const e=i.value.trim().toLowerCase();if(!okMail(e)||e.length>254){m.textContent='Please enter a valid email address.';return}if(!isG(e)&&!b.dataset.w){b.dataset.w=1;m.style.color='#f2c230';m.textContent='Play testing needs a Google account (usually Gmail). Tap again to use this one.';return}
  b.disabled=true;b.textContent='Sending…';m.textContent='';const s=SB();
  fetch(s.url+'/rest/v1/early_access',{method:'POST',headers:{apikey:s.anonKey,Authorization:'Bearer '+s.anonKey,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({email:e})})
  .then(r=>{if(r.ok)done("You're on the list!");else if(r.status===409)done("You're already signed up!");else return r.text().then(t=>{if(/duplicate|23505/.test(t))done("You're already signed up!");else throw t})})
  .catch(()=>{b.disabled=false;b.textContent='SIGN ME UP';m.style.color='#ff8a8a';m.textContent="Couldn't connect. Please try again."})};
 setTimeout(()=>i.focus(),50)};
// ---- Founding Kicker ----
[[0,'founder','Founding Kicker','Android early tester · thank you!',1000]].forEach(a=>{if(typeof TRO!=='undefined'&&!TRO.some(b=>b[1]===a[1])){const i=TRO.map(q=>q[0]).lastIndexOf(a[0]);TRO.splice(i+1,0,a)}if(typeof ACH!=='undefined'&&!ACH.some(b=>b[0]===a[1]))ACH.push([a[1],a[2],a[3],a[4]])});
const CODES=['FOUNDINGKICKER','FOUNDER2026'];
window.FGF_FOUNDER=function(){if(LS.fgfFounder==='1'){toast('🏅 Founding Kicker already claimed');return false}LS.fgfFounder='1';const c0=coins;try{unlock('founder')}catch(e){}if(coins===c0)addCoins(1000);setTimeout(()=>toast('🏅 FOUNDING KICKER · 🪙 +1000'),300);return true};
window.FGF_REDEEM=function(){const c=(prompt('Enter a code')||'').trim().toUpperCase().replace(/\s/g,'');if(!c)return;if(CODES.includes(c))FGF_FOUNDER();else toast('❌ Code not recognized')};
try{const q=new URLSearchParams(location.search);if(q.get('founder')==='1'||CODES.includes((q.get('code')||'').toUpperCase())){setTimeout(()=>{FGF_FOUNDER();q.delete('founder');q.delete('code');history.replaceState(null,'',location.pathname+(q.toString()?'?'+q:''))},1500)}}catch(e){}
const osc=S3.screen;S3.screen=function(){const r=osc.apply(this,arguments);
 if(state==='mset'){const bw=Math.min(300,W*0.84);window.FGF_MSR=window.FGF_MSR||(i=>{const t=!!window.TESTER,st=40;return{y:H*0.16+(t?310:262)+i*st,h:36}});const q=FGF_MSR(0);bx(W/2-bw/2,q.y,bw,q.h,'🎟️ REDEEM A CODE',FGF_REDEEM,false,13)}
 if(state==='stats'&&LS.fgfFounder==='1')txt('🏅 FOUNDING KICKER',W/2,H*0.115,13,'#f2c230','#063');
 return r};
})();
