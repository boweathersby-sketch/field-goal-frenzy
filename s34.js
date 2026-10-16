// s34: Cloud Save — optional email magic-link on Supabase. Local stays default until signed in.
(function(){
window.FGF_CLOUDON=1;
const SB=()=>window.FGF_ONLINE||{url:'https://fdmcgupjmjfpraznmsew.supabase.co',anonKey:''};
const KEYS=['fgfCB','fgfRM','fgfBig','fgfVoice','fgfAnn','fgfVolM','fgfVolS','fgfVolC','fgfVolU','fgfSty','fgfBook','fgfGift','fgfCty','fgfClub','fgfClubN','fgfLastRun','fgfPerks','fgfTitleEq','fgfMS','fgfMM_posts','fgfMM_kickoff','fgfMM_punt','fgfMM_onside','fgfMM_drill','fgfMM_boss','fgfMM_ladder','fgfAdProg','fgfPicks','fgfTroCyc','fgfTroAll','fgfCoins','fgfOwn','fgfEq','fgfTeams','fgfCar','fgfPass','fgfMis','fgfMisW','fgfXP','fgfStats','fgfAch','fgfOLIni','fgfMenuOrder','fgfMute','fgfVib','fgfMusic','fgfKickType','fgfLeft','fgfTurf','fgfTurfO','fgfWxOwn','fgfFreeze','fgfChamps','fgfTitle','fgfPro','fgfLegend','fgfKN','fgfStreak','fgfLS','fgfFounder','fgfTeam','fgfMK','fgfCM','fgfCT','fgfUP','fgfBG'];
function snap(){const o={};KEYS.forEach(k=>{if(LS[k]!=null)o[k]=LS[k]});o._coins=+coins||+(LS.fgfCoins||0);o._v=1;return o}
function apply(p){if(!p||typeof p!=='object')return;KEYS.forEach(k=>{if(p[k]!=null)LS[k]=typeof p[k]==='string'?p[k]:JSON.stringify(p[k])});
 if(p.fgfCoins!=null){coins=+p.fgfCoins||0}else if(p._coins!=null){coins=+p._coins||0;LS.fgfCoins=String(coins)}
 try{own=J('fgfOwn',own);eq=J('fgfEq',eq);if(LS.fgfTeam!=null)team=+LS.fgfTeam}catch(e){}}
function merge(local,cloud){const out={...cloud};KEYS.forEach(k=>{
  if(local[k]==null)return;if(cloud[k]==null){out[k]=local[k];return}
  if(k==='fgfAch'){try{const a=JSON.parse(local[k]||'{}'),b=JSON.parse(cloud[k]||'{}'),lc=local.fgfTroCyc||'',cc=cloud.fgfTroCyc||'';out[k]=JSON.stringify(lc>cc?a:cc>lc?b:{...b,...a})}catch(e){out[k]=local[k]}}
  else if(k==='fgfTroCyc'){out[k]=(local[k]||'')>(cloud[k]||'')?local[k]:cloud[k]}
  else if(k==='fgfTroAll'){try{const a=JSON.parse(local[k]||'{}'),b=JSON.parse(cloud[k]||'{}'),m={};Object.keys({...a,...b}).forEach(x=>m[x]=Math.max(+a[x]||0,+b[x]||0));out[k]=JSON.stringify(m)}catch(e){out[k]=local[k]}}
  else if(k==='fgfOwn'||k==='fgfTeams'||k==='fgfTurfO'||k==='fgfWxOwn'){
    try{const a=JSON.parse(local[k]||'[]'),b=JSON.parse(cloud[k]||'[]');out[k]=JSON.stringify([...new Set([].concat(a,b))])}catch(e){out[k]=local[k]}
  }else if(k==='fgfCoins'){out[k]=String(Math.max(+local[k]||0,+cloud[k]||0))}
  else if(k==='fgfXP'||k==='fgfLegend'||k==='fgfChamps'||k==='fgfKN'){out[k]=String(Math.max(+local[k]||0,+cloud[k]||0))}
  else if(k==='fgfStats'){try{const a=JSON.parse(local[k]||'{}'),b=JSON.parse(cloud[k]||'{}'),m={};Object.keys({...a,...b}).forEach(x=>m[x]=Math.max(+a[x]||0,+b[x]||0));out[k]=JSON.stringify(m)}catch(e){out[k]=local[k]}}
  else{const lt=+(LS.fgfCloudAt||0),ct=+(cloud._at||0);out[k]=lt>=ct?local[k]:cloud[k]}
 });out._coins=Math.max(+local._coins||0,+cloud._coins||0,+out.fgfCoins||0);out.fgfCoins=String(out._coins);out._at=Date.now();return out}
let sess=null;try{sess=JSON.parse(LS.fgfSess||'null')}catch(e){}
const hdr=()=>{const s=SB(),h={apikey:s.anonKey,'Content-Type':'application/json'};if(sess&&sess.access_token)h.Authorization='Bearer '+sess.access_token;else h.Authorization='Bearer '+s.anonKey;return h};
async function auth(path,body){const s=SB();const r=await fetch(s.url+'/auth/v1/'+path,{method:'POST',headers:hdr(),body:JSON.stringify(body)});const t=await r.text();let j=null;try{j=t?JSON.parse(t):null}catch(e){}if(!r.ok)throw new Error((j&&(j.msg||j.error_description||j.message))||r.status);return j}
async function rest(path,opt){const s=SB();const r=await fetch(s.url+'/rest/v1/'+path,{...opt,headers:Object.assign(hdr(),(opt&&opt.headers)||{})});const t=await r.text();if(!r.ok)throw new Error(r.status+' '+t.slice(0,140));return t?JSON.parse(t):null}
function saveSess(j){if(!j||!j.access_token)return;sess={access_token:j.access_token,refresh_token:j.refresh_token,user:j.user||(j.user_id&&{id:j.user_id}),expires_at:j.expires_at};LS.fgfSess=JSON.stringify(sess)}
async function refresh(){if(!sess||!sess.refresh_token)return false;try{const j=await auth('token?grant_type=refresh_token',{refresh_token:sess.refresh_token});saveSess(j);return true}catch(e){return false}}
function uid(){return sess&&sess.user&&sess.user.id}
async function pull(){const id=uid();if(!id)return null;const rows=await rest('cloud_saves?user_id=eq.'+id+'&select=*');return rows&&rows[0]}
async function push(payload){const id=uid();if(!id)return;const body={user_id:id,email:(sess.user&&sess.user.email)||null,payload,coins:+payload._coins||0,updated_at:new Date().toISOString()};
 try{await rest('cloud_saves',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(body)})}
 catch(e){await rest('cloud_saves?user_id=eq.'+id,{method:'PATCH',body:JSON.stringify({payload,coins:body.coins,updated_at:body.updated_at,email:body.email})})}}
async function syncNow(quiet){if(!uid()){if(!quiet)toast('Sign in to sync');return}try{await refresh();const remote=await pull();const local=snap();local._at=+(LS.fgfCloudAt||0);
 const merged=remote&&remote.payload?merge(local,remote.payload):local;apply(merged);LS.fgfCloudAt=String(Date.now());await push(snap());if(!quiet)toast('☁ Progress synced')}catch(e){if(!quiet)toast('Cloud sync failed · try again');console.warn(e)}}
async function sendMagic(email){email=(email||'').trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast('Enter a valid email');return}
 try{await auth('otp?redirect_to='+encodeURIComponent(location.origin+location.pathname),{email,create_user:true});LS.fgfCloudEmail=email;toast('Check your email for the sign-in link');CS.sent=1}catch(e){toast((e.message||'Could not send link').slice(0,60))}}
async function signOut(){try{if(sess)await fetch(SB().url+'/auth/v1/logout',{method:'POST',headers:hdr()})}catch(e){}sess=null;delete LS.fgfSess;toast('Signed out · progress stays on this device');CS.mode='menu'}
// Capture magic-link tokens from URL hash/query
(function boot(){try{const h=location.hash||'',q=location.search||'';const m=h.match(/access_token=([^&]+)/)||q.match(/access_token=([^&]+)/);const r=h.match(/refresh_token=([^&]+)/)||q.match(/refresh_token=([^&]+)/);
 if(m){saveSess({access_token:decodeURIComponent(m[1]),refresh_token:r?decodeURIComponent(r[1]):null,user:null});
  // fetch user
  fetch(SB().url+'/auth/v1/user',{headers:hdr()}).then(r=>r.json()).then(u=>{if(u&&u.id){sess.user=u;LS.fgfSess=JSON.stringify(sess);syncNow(false);toast('☁ Signed in · progress linked')}}).catch(()=>{});
  history.replaceState(null,'',location.pathname+location.search.replace(/[?&]access_token=[^&]*/,'').replace(/[?&]refresh_token=[^&]*/,''))}
 else if(sess){refresh().then(ok=>ok&&syncNow(true))}
}catch(e){}})();
// Auto-push every 45s while signed in + on visibility hide
setInterval(()=>{if(uid()&&!window.FGF_TRYING)syncNow(true)},45e3);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&uid())syncNow(true)});
let CS={mode:'menu',email:'',sent:0};
window.FGF_CLOUD=()=>{state='cloud';CS.mode=uid()?'in':'menu'};
window.FGF_CLOUD_TEST={snap,merge,apply,syncNow,sendMagic,uid:()=>uid(),sess:()=>sess};
const osc=S3.screen;S3.screen=function(){if(state==='cloud'){BTN=[];txt('☁ CLOUD SAVE',W/2,H*0.12,Math.min(28,W*0.075),GOLD,'#063');
  ctx.fillStyle='#cde';ctx.font='13px system-ui';ctx.textAlign='center';
  if(uid()){ctx.fillText('Signed in'+(sess.user&&sess.user.email?' · '+sess.user.email:''),W/2,H*0.12+26,W*0.9);
   ctx.fillText('Progress syncs across phones when you sign in.',W/2,H*0.12+48,W*0.9);
   bx(W*0.15,H*0.35,W*0.7,48,'☁ SYNC NOW',()=>syncNow(false),true,15);
   bx(W*0.15,H*0.35+64,W*0.7,44,'Sign out',signOut,false,14)}
  else{ctx.fillText('Optional · play without an account anytime.',W/2,H*0.12+26,W*0.9);
   ctx.fillText('Email a magic link to move progress to another phone.',W/2,H*0.12+48,W*0.92);
   const em=LS.fgfCloudEmail||CS.email||'';
   bx(W*0.1,H*0.32,W*0.8,44,'✉ '+(em||'Tap to enter email'),()=>{const v=prompt('Email for magic link',em||'');if(v!=null){CS.email=v;LS.fgfCloudEmail=v}},false,13);
   bx(W*0.15,H*0.32+64,W*0.7,48,CS.sent?'✔ LINK SENT · check inbox':'📧 SEND MAGIC LINK',()=>sendMagic(LS.fgfCloudEmail||CS.email),true,14);
   ctx.fillStyle='#9ab';ctx.font='11px system-ui';ctx.fillText('We only use the email to sign you in. No spam.',W/2,H*0.32+130,W*0.9)}
  bx(W/2-90,H*0.93-18,180,38,'◀ BACK',()=>state='mset');return true}
 // inject entry on More Settings
 const r=osc.apply(this,arguments);if(state==='mset'&&(window.FGF_CLOUDON||window.TESTER)){const bw=Math.min(300,W*0.84);window.FGF_MSR=window.FGF_MSR||(i=>{const t=!!window.TESTER,st=t?40:44;return{y:H*0.16+(t?310:262)+i*st,h:t?36:38}});const q=FGF_MSR(3);bx(W/2-bw/2,q.y,bw,q.h,'☁ CLOUD SAVE',()=>state='cloud',false,13)}return r};
})();
