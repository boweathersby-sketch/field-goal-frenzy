// s48 (Batch 9, growth prep, all OFF by flags): in-app feedback (Supabase public.feedback, insert-only), analytics event hooks (FGF_AN, off),
// push-notification scaffolding (off, no service), Portuguese/French language scaffolding (hidden beta). Ads stay rewarded-only (s22 policy).
(function(){
const q=new URLSearchParams(location.search);
window.FGF_FEEDBACK=window.FGF_FEEDBACK??(q.get('feedback')==='1'||LS.fgfFBon==='1');// OFF by default
window.FGF_LANG_BETA=window.FGF_LANG_BETA??(q.get('lang')==='beta');// OFF by default
window.FGF_PUSH=Object.assign({enabled:false,vapidKey:'',endpoint:''},window.FGF_PUSH_CFG||{});// OFF: no push service is configured
// ---- analytics hooks (no-ops unless FGF_AN.enabled + endpoint are set; no data leaves the device today) ----
const T=(e)=>{try{window.FGF_track&&FGF_track(e)}catch(er){}};
const oN=newGame;newGame=function(m){const r=oN.apply(this,arguments);T('run_start_'+mode);return r};
const oE=S3.onEnd;S3.onEnd=function(){T('run_end_'+mode);return oE.apply(this,arguments)};
const oA=addCoins;addCoins=function(n){if(n<0)T('spend');return oA.apply(this,arguments)};
let LS0=null;setInterval(()=>{if(state!==LS0){LS0=state;T('screen_'+state)}},1000);
// ---- languages: Portuguese/French appear in the picker only in beta ----
if(window.FGF_LANGS&&FGF_LANG_BETA){FGF_LANGS.push(['pt','Português (beta)'],['fr','Français (beta)'])}
// ---- feedback ----
const SBU='https://fdmcgupjmjfpraznmsew.supabase.co',KEY=()=>(window.FGF_ONLINE&&(FGF_ONLINE.anonKey||FGF_ONLINE.key))||'sb_publishable_944lD1vIQwA5DGifZqbFJw_AuC1xUkz';
async function sendFB(msg){msg=String(msg||'').trim().slice(0,1000);if(msg.length<3)return 'Please write a few words.';if(LS.fgfFBt&&Date.now()-(+LS.fgfFBt)<60000)return 'Thanks! Please wait a minute before sending more.';
 const ver=((document.querySelector('script[src*="game.js"]')||{}).src||'').split('v=')[1]||'',dev=(navigator.userAgent||'').replace(/\s+/g,' ').slice(0,120);
 try{const r=await fetch(SBU+'/rest/v1/feedback',{method:'POST',headers:{apikey:KEY(),Authorization:'Bearer '+KEY(),'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({msg,ver,device:dev})});if(r.ok){LS.fgfFBt=Date.now();return 'OK'}const t=await r.text();return /42501|permission|PGRST20/.test(t)?'Feedback is not switched on yet.':'Could not send right now.'}catch(e){return 'Offline · try again later.'}}
window.FGF_FB=function(){if(document.getElementById('fbm'))return;const d=document.createElement('div');d.id='fbm';d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:60;display:flex;align-items:center;justify-content:center;font-family:system-ui';const tr=window.FGF_TR||(s=>s);
 d.innerHTML='<div style="background:#062a14;border:2px solid #f2c230;border-radius:16px;padding:16px;width:min(330px,88vw);color:#fff;text-align:center"><div style="font:900 18px system-ui;color:#f2c230">💬 '+tr('SEND FEEDBACK')+'</div><div style="font-size:12px;color:#cde;margin:6px 0 10px">'+tr('Bugs, ideas, anything. No account or email needed. We store only your message, the game version and your browser type.')+'</div><textarea id="fbt" maxlength="1000" rows="5" style="width:100%;box-sizing:border-box;border-radius:10px;border:1px solid #f2c230;background:#0a3a1f;color:#fff;padding:8px;font:14px system-ui"></textarea><div id="fbs" style="font-size:12px;color:#ffd27a;min-height:16px;margin:6px 0"></div><button id="fbg" style="width:100%;padding:11px;font:900 15px system-ui;border-radius:10px;border:0;background:#f2c230;color:#063">'+tr('SEND')+'</button><button id="fbx" style="margin-top:8px;background:none;border:0;color:#8ab;font-size:13px">'+tr('Close')+'</button></div>';
 document.body.appendChild(d);d.querySelector('#fbx').onclick=()=>d.remove();d.querySelector('#fbg').onclick=async()=>{const s=d.querySelector('#fbs');s.textContent='…';const m=await sendFB(d.querySelector('#fbt').value);s.textContent=m==='OK'?'✔ '+tr('Thanks! Sent.'):tr(m);if(m==='OK')setTimeout(()=>d.remove(),1200)}};
const osc=S3.screen;S3.screen=function(){const r=osc.apply(this,arguments);if(state==='mset'&&FGF_FEEDBACK)bx(W/2-Math.min(150,W*0.42),H*0.16+304,Math.min(300,W*0.84),36,'💬 SEND FEEDBACK',()=>FGF_FB(),false,13);return r};
// ---- push scaffolding: subscribe() only runs when FGF_PUSH.enabled + vapidKey are set (they are not) ----
window.FGF_PUSHSUB=async function(){if(!FGF_PUSH.enabled||!FGF_PUSH.vapidKey||!('serviceWorker' in navigator)||!('PushManager' in window))return 'off';const reg=await navigator.serviceWorker.ready;const p=await Notification.requestPermission();if(p!=='granted')return 'denied';const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:FGF_PUSH.vapidKey});if(FGF_PUSH.endpoint)await fetch(FGF_PUSH.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(sub)});return 'ok'};
window.FGF_GROWTHTEST={sendFB};
})();
