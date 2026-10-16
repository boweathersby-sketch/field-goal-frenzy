// s70 (Kirk, Oct 16 · batch 15a): COMFORT & DISPLAY sheet + feel options. All free, local, off unless noted.
// Perfect-window pulse, last-ball clutch zoom, hold-your-breath steadying, name-plate size, horn volume, celebration
// length, turf dimmer, trail length, HUD opacity, freeze FX in flight, huge wind number, one-hand info chip,
// flash-free celebrations, sound captions, pause blurb, audio ducking, screen wake, edge-swipe back, friendly errors,
// loading skeletons. Kicker / mascot art untouched; physics untouched (hold-breath only trims curve wobble when ON).
(function(){const T_=t=>window.FGF_TR?FGF_TR(t):t,J2=(k,d)=>{try{return JSON.parse(LS[k])||d}catch(e){return d}};
const DEF={pw:0,cz:0,hb:0,np:'n',hv:100,ci:'n',tb:100,tl:'m',ho:100,fz:0,bw:0,oh:'off',ff:0,cap:0,duck:1,wake:1,eb:1,reach:0};
const CF=Object.assign({},DEF,J2('fgfCF',{}));const SVC=()=>LS.fgfCF=JSON.stringify(CF);window.FGF_CF=CF;
const RM=()=>LS.fgfRM==='1',STORMY=()=>/^(hurricane|storm|tornado|twister|dstorm|chaos)$/.test(mode);
// ---------- sheet ----------
const BS='box-sizing:border-box;border:1px solid rgba(160,190,175,.3);background:rgba(8,24,16,.9);color:#dfe;border-radius:10px;padding:7px 9px;font:800 12px system-ui';
const ON='border-color:#7fd38a;color:#7fd38a;background:rgba(20,60,34,.9)';
const ROWS=[['🎯','Perfect-window pulse','pw',[[0,'OFF'],[1,'ON']],'A tiny dot pulses when your swipe power is in the sweet band'],
 ['🎥','Last-ball clutch zoom','cz',[[0,'OFF'],[1,'ON']],'Gentle zoom on your final life (off with Reduced Motion)'],
 ['🫁','Hold-your-breath steady','hb',[[0,'OFF'],[1,'ON']],'Hold your finger still ½ s before swiping to slightly calm curve wobble'],
 ['🏷️','Name plate size','np',[['n','COMPACT'],['l','LARGE']],''],
 ['📯','Horn volume','hv',[[0,'0'],[40,'40'],[70,'70'],[100,'100']],'Crowd volume lives in Accessibility & Volume'],
 ['🎉','Celebration length','ci',[['s','SHORT'],['n','NORMAL']],'Same poses, shorter timing'],
 ['🌙','Turf brightness','tb',[[55,'DIM'],[75,'SOFT'],[100,'FULL']],'Calmer field for night play'],
 ['☄️','Ball trail length','tl',[['s','SHORT'],['m','MED'],['l','LONG']],''],
 ['🪟','HUD opacity','ho',[[45,'45%'],[70,'70%'],[100,'100%']],'Let the field breathe'],
 ['🧊','Hide trails & FX in flight','fz',[[0,'OFF'],[1,'ON']],'Clean view of the ball while it flies'],
 ['🌬️','Extra-large wind number','bw',[[0,'OFF'],[1,'ON']],''],
 ['👍','One-hand mode','oh',[['off','OFF'],['l','LEFT'],['r','RIGHT']],'Pause button + a wind/lives chip near your thumb'],
 ['✨','Flash-free celebrations','ff',[[0,'OFF'],[1,'ON']],'Poses still play, no screen pulses or shake'],
 ['💬','Sound captions','cap',[[0,'OFF'],[1,'ON']],'Text chips for MAKE / MISS / DOINK'],
 ['🔇','Duck sound when app hides','duck',[[0,'OFF'],[1,'ON']],'Pauses game audio when a call or notification takes over'],
 ['📱','Keep screen awake in play','wake',[[0,'OFF'],[1,'ON']],'Warns you if the phone might sleep in a long Career drive'],
 ['👈','Edge swipe = back to menu','eb',[[0,'OFF'],[1,'ON']],'Swipe in from the left edge on menu screens'],
 ['👇','One-thumb reach (tall phones)','reach',[[0,'OFF'],[1,'ON']],'Moves the main menu a little lower on tall screens']];
function sheet(){const o=document.getElementById('fgfcf');if(o)o.remove();const d=document.createElement('div');d.id='fgfcf';d.className='fgfov';d.style.cssText='position:fixed;inset:0;background:rgba(2,8,6,.88);z-index:70;display:flex;align-items:center;justify-content:center;padding:10px';
 const row=r=>`<div style="padding:9px 8px;margin-bottom:7px;border-radius:12px;background:rgba(8,24,16,.85);border:1px solid rgba(160,190,175,.18)"><div style="font:800 13px system-ui;margin-bottom:6px">${r[0]} ${T_(r[1])}</div><div style="display:flex;gap:6px;flex-wrap:wrap">${r[3].map(([v,l])=>`<button data-k="${r[2]}" data-v="${v}" style="${BS};${String(CF[r[2]])===String(v)?ON:''}">${T_(l)}</button>`).join('')}</div>${r[4]?`<div style="font:11px system-ui;color:#9fb8aa;margin-top:5px">${T_(r[4])}</div>`:''}</div>`;
 d.innerHTML=`<div style="background:#071a10;border:1px solid rgba(160,190,175,.3);border-radius:16px;padding:12px;max-width:380px;width:100%;color:#fff;max-height:90vh;display:flex;flex-direction:column"><div style="color:#e9d27a;font:900 16px system-ui;text-align:center;margin-bottom:8px">🎛️ ${T_('COMFORT & DISPLAY')}</div><div id="cfl" style="overflow-y:auto;flex:1;min-height:0">${ROWS.map(row).join('')}</div><button id="cfx" style="${BS};margin-top:8px;padding:10px;font-size:14px">◀ ${T_('BACK')}</button></div>`;
 document.body.appendChild(d);const sc=window.__cfsc||0;d.querySelector('#cfl').scrollTop=sc;d.querySelector('#cfx').onclick=()=>d.remove();
 d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k,v=b.dataset.v;CF[k]=isNaN(+v)?v:+v;SVC();if(k==='oh')LS.fgfLH=v==='l'?'1':v==='r'?'0':LS.fgfLH;if(k==='hv')try{window.FGF_PLAYH&&eq.h&&FGF_PLAYH(eq.h)}catch(e){}window.__cfsc=d.querySelector('#cfl').scrollTop;sheet()});
 d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',300)}
window.FGF_COMFORT=sheet;
// entry: More Settings row 4 becomes two halves (slow-mo | comfort), hub YOU section, pause
const oS=S3.screen;S3.screen=function(){const m0=window.FGF_MSR,ms=state==='mset'&&m0;if(ms)window.FGF_MSR=i=>i===4?{y:-999,h:36}:m0(i);let r;try{r=oS.apply(this,arguments)}finally{if(ms)window.FGF_MSR=m0}try{if(ms){const q=m0(4),bw=Math.min(300,W*0.84),x=W/2-bw/2,hw=(bw-8)/2,on=LS.fgfLongRep!=='0';BTN=BTN.filter(b=>b.y>-900);
  bx(x,q.y,hw,q.h,'🎬 '+T_('SLOW-MO')+': '+(on?'ON':'OFF'),()=>{LS.fgfLongRep=on?'0':'1'},on,12);bx(x+hw+8,q.y,hw,q.h,'🎛️ '+T_('COMFORT'),sheet,false,12)}}catch(e){}return r};
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);L.push(['🎛️','COMFORT & DISPLAY','HUD opacity · turf dimmer · captions · one-hand',sheet,false]);return L};
// ---------- 5) perfect-window pulse ----------
let BAND=null;function band(){BAND=null;if(!CF.pw||!window.FGF_SOLVER)return;try{let c=null;if(STORMY()&&window.FGF_STORMCFG)c=FGF_STORMCFG();if(!c)c={dist,weather,wind:{x:wind.x,z:wind.z},wp:ball.wp,gust:weather==='gust'?'g':null,swirl:null,pox:[0]};
 const ok=[];for(let p=0.05;p<=1.001;p+=0.05){let lo=-1.1,hi=1.1,I={},hit=false;const at=th=>{I={};return FGF_SOLVER.sim(c,p,th,0,0,(c.pox||[0])[0],0,I)};if(at(0)){hit=true}else{for(let k=0;k<14;k++){const m=(lo+hi)/2;if(at(m)){hit=true;break}if(!(I.cx===I.cx))break;if(I.cx<0)lo=m;else hi=m}}if(hit)ok.push(p)}
 if(ok.length)BAND=[ok[0]-0.03,ok[ok.length-1]+0.03]}catch(e){BAND=null}}
const oRB=resetBall;resetBall=function(){const r=oRB.apply(this,arguments);try{setTimeout(band,0);LT=[]}catch(e){}return r};
// ---------- HUD wrapper: opacity, big wind, perfect pulse, one-hand chip, captions ----------
let CAP=null;const cap=t=>{if(CF.cap)CAP={t,a:performance.now()}};
const oHud=hud;hud=function(){ctx.save();if(CF.ho<100&&!paused)ctx.globalAlpha=CF.ho/100;let r;try{r=oHud.apply(this,arguments)}finally{ctx.restore()}
 try{if(CF.bw&&!(window.__BLINDW&&!ball.done)){const m=wind.mph||0;ctx.save();ctx.globalAlpha=Math.max(0.55,CF.ho/100);ctx.textAlign='right';ctx.font='900 46px system-ui';ctx.lineWidth=5;ctx.strokeStyle='rgba(0,0,0,.75)';const t=m>0?m+'':'0';ctx.strokeText(t,W-14,146);ctx.fillStyle='#e8f4ff';ctx.fillText(t,W-14,146);ctx.font='800 12px system-ui';ctx.fillStyle='#bcd';ctx.fillText('MPH '+(m>0?(wind.x>=0?'→':'←'):''),W-14,162);ctx.restore()}
  if(CF.pw&&BAND&&swipe&&typeof pwShow==='number'){const inb=pwShow>=BAND[0]&&pwShow<=BAND[1],mx=W*0.42,my=H-108,mw=W*0.5;ctx.save();ctx.fillStyle='rgba(127,211,138,.35)';ctx.fillRect(mx+mw*Math.max(0,BAND[0]),my+15,mw*Math.max(0.01,Math.min(1,BAND[1])-Math.max(0,BAND[0])),3);if(inb){const pu=0.5+0.5*Math.sin(performance.now()/90);ctx.fillStyle='rgba(127,211,138,'+(0.6+0.4*pu)+')';ctx.beginPath();ctx.arc(mx+mw+14,my+7,4+2*pu,0,7);ctx.fill()}ctx.restore()}
  if(CF.oh!=='off'&&!ball.fly){const L=CF.oh==='l',w=118,x=L?8:W-8-w,y=H-196;ctx.save();ctx.globalAlpha=0.9;ctx.fillStyle='rgba(6,20,12,.78)';ctx.beginPath();ctx.roundRect(x,y,w,44,10);ctx.fill();ctx.strokeStyle='rgba(160,190,175,.3)';ctx.stroke();ctx.fillStyle='#dfe';ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText((window.__BLINDW?'?? ':(wind.mph||0)+' ')+'MPH '+(wind.mph>0&&!window.__BLINDW?(wind.x>=0?'→':'←'):''),x+w/2,y+18);ctx.font='800 11px system-ui';ctx.fillStyle='#9fb8aa';ctx.fillText(dist+' YDS · '+(lives>9?'∞':'🏈×'+lives),x+w/2,y+35);ctx.restore()}
  if(CAP&&performance.now()-CAP.a<1400){const a=Math.min(1,(1400-(performance.now()-CAP.a))/400);ctx.save();ctx.globalAlpha=a;ctx.font='800 12px system-ui';const tw=ctx.measureText(CAP.t).width+18;ctx.fillStyle='rgba(0,0,0,.65)';ctx.beginPath();ctx.roundRect(8,100,tw,24,8);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText(CAP.t,17,116);ctx.restore()}}catch(e){}return r};
// captions + flash-free + horn volume
const wrapS=(k,t)=>{if(sfx&&typeof sfx[k]==='function'){const o=sfx[k];sfx[k]=function(){if(state==='play'||state==='replay')cap(t);return o.apply(this,arguments)}}};
wrapS('cheer','🔊 '+'MAKE · crowd cheers');wrapS('groan','🔊 '+'MISS · crowd groans');wrapS('post','🔊 '+'DOINK! · off the post');
let HG=null;const hornWrap=fn=>function(){if(CF.hv>=100)return fn.apply(this,arguments);const m0=window.FGF_MASTER;try{const c=au&&au();if(c){if(!HG){HG=c.createGain();HG.connect(m0||c.destination)}HG.gain.value=CF.hv/100;window.FGF_MASTER=HG}return fn.apply(this,arguments)}finally{window.FGF_MASTER=m0}};
S3.onResult=hornWrap(S3.onResult);if(window.FGF_PLAYH)window.FGF_PLAYH=hornWrap(window.FGF_PLAYH);
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(CF.ff&&good){flash=0;shake=0;legendT=Math.min(legendT,0)}}catch(e){}return r};
// ---------- update wrapper: trail length, freeze FX, flash-free, short celebrations ----------
let LT=[];const oUp=update;update=function(dt){const r=oUp.apply(this,arguments);try{
 if(ball&&ball.fly&&!ball.done){if(CF.tl==='s'&&trail.length>7)trail.splice(0,trail.length-7);else if(CF.tl==='l'){const l=trail[trail.length-1];if(l&&LT[LT.length-1]!==l){LT.push(l);if(LT.length>32)LT.shift()}trail=LT.slice()}
  if(CF.fz){trail=[];if(parts.length)parts.length=0}}
 if(CF.ff){if(flash>0)flash=0;if(shake>1)shake=0}
 if(CF.ci==='s'&&window.FGF_KANIM&&FGF_KANIM.CEL&&performance.now()-FGF_KANIM.CEL.t>750)FGF_KANIM.CEL=null}catch(e){}return r};
// ---------- turf dimmer ----------
const oBG=S3.bg;S3.bg=function(){const r=oBG.apply(this,arguments);try{if(r&&CF.tb<100&&typeof EZ==='number'){ctx.fillStyle='rgba(0,6,12,'+((100-CF.tb)/100*0.9).toFixed(3)+')';ctx.fillRect(0,EZ,W,H-EZ)}}catch(e){}return r};
// ---------- clutch zoom ----------
let zk=0;const oCam=S3.cam;S3.cam=function(){const r=oCam?oCam.apply(this,arguments):undefined;try{const want=CF.cz&&!RM()&&state==='play'&&lives===1&&!/^(pressure|career|vs|range|time)$/.test(mode)&&!String(mode).startsWith('xm_')&&!ball.done?1:0;zk+=(want-zk)*0.05;if(zk>0.01){const k=1+0.05*zk;ctx.translate(W/2,H*0.5);ctx.scale(k,k);ctx.translate(-W/2,-H*0.5)}}catch(e){}return r};
// ---------- hold-your-breath ----------
let hd=null,calm=false;addEventListener('pointerdown',e=>{hd={x:e.clientX,y:e.clientY,t:performance.now()};calm=false},true);
addEventListener('pointermove',e=>{if(hd&&!calm&&Math.hypot(e.clientX-hd.x,e.clientY-hd.y)>8){calm=performance.now()-hd.t>=500;hd=null}},true);
const oK=kick;kick=function(){const was=ball&&ball.fly;const r=oK.apply(this,arguments);try{if(CF.hb&&calm&&ball.fly&&!was){ball.ax*=0.9;calm=false;cap('🫁 steady')}}catch(e){}return r};
// ring while holding
const oT=S3.top;S3.top=function(){const r=oT?oT.apply(this,arguments):undefined;try{if(CF.hb&&hd&&state==='play'&&!ball.fly&&!paused){const a=Math.min(1,(performance.now()-hd.t)/500);ctx.save();ctx.strokeStyle='rgba(127,211,138,'+(0.25+0.5*a)+')';ctx.lineWidth=3;ctx.beginPath();ctx.arc(hd.x,hd.y,26,-Math.PI/2,-Math.PI/2+a*6.283);ctx.stroke();ctx.restore()}
 if(paused&&state==='play')pauseBlurb()}catch(e){}return r};
addEventListener('pointerup',()=>{hd=null},true);
// ---------- name plate size ----------
const P=CanvasRenderingContext2D.prototype,fo=Object.getOwnPropertyDescriptor(P,'font');let NP=false;
if(fo&&fo.set)Object.defineProperty(P,'font',{get:fo.get,set(v){if(NP&&typeof v==='string')v=v.replace(/(\d+(?:\.\d+)?)px/,(m,n)=>Math.round(+n*1.3)+'px');fo.set.call(this,v)},configurable:true});
const omt=P.measureText;const oDec=S3.decal;S3.decal=function(){NP=CF.np==='l';try{return oDec.apply(this,arguments)}finally{NP=false}};
// ---------- pause blurb ----------
function pauseBlurb(){if(typeof setOpen!=='undefined'&&setOpen)return;const side=(wind.mph||0)<1?T_('calm air'):(wind.mph+' mph '+(wind.x>=0?T_('pushing right →'):T_('← pushing left'))),lv=lives>9?'':' · '+lives+' '+(lives===1?T_('ball left'):T_('balls left'));ctx.save();ctx.font='600 13px system-ui';ctx.textAlign='center';ctx.fillStyle='#9fb8aa';ctx.fillText(dist+' yds · '+(window.__BLINDW?T_('wind hidden'):side)+lv,W/2,H*0.25+26,W*0.9);ctx.restore()}
// ---------- one-thumb reach ----------
const oS2=S3.screen;S3.screen=function(){const tall=H/W>=2.05&&CF.reach&&state==='title';if(!tall)return oS2.apply(this,arguments);const dy=Math.round(Math.min(56,H*0.06));ctx.save();ctx.translate(0,dy);let r;try{r=oS2.apply(this,arguments)}finally{ctx.restore()}BTN.forEach(b=>{if(!b.__ry){b.y+=dy;b.__ry=1}});return r};
// ---------- audio ducking ----------
const duck=h=>{try{if(!CF.duck||typeof AC==='undefined'||!AC)return;if(h)AC.suspend();else AC.resume()}catch(e){}};
document.addEventListener('visibilitychange',()=>duck(document.hidden));addEventListener('blur',()=>{if(CF.duck&&state==='play'&&!paused&&document.hidden)duck(true)});addEventListener('focus',()=>duck(false));
// ---------- screen wake + warning ----------
let WL=null,warned=0;async function wake(on){try{if(on&&!WL&&navigator.wakeLock){WL=await navigator.wakeLock.request('screen');WL.addEventListener('release',()=>WL=null)}else if(!on&&WL){WL.release();WL=null}}catch(e){WL=null}}
setInterval(()=>{const play=state==='play'||state==='ctick'||state==='career';wake(CF.wake&&play&&!document.hidden);if(CF.wake&&mode==='career'&&state==='ctick'&&!navigator.wakeLock&&!warned){warned=1;toast('📱 '+T_('Long drive coming · set screen timeout longer so the phone does not sleep'))}},1500);
// ---------- edge swipe back ----------
const SAFE=['hub','mmsel','shop','stad','set','mset','board','teams','a11y','cloud','marr','range','stats','mk','week','career'];let es=null;
addEventListener('pointerdown',e=>{es=CF.eb&&e.clientX<18&&SAFE.includes(state)&&!(e.target&&e.target.closest&&e.target.closest('.fgfov'))?{x:e.clientX,y:e.clientY}:null},true);
addEventListener('pointerup',e=>{if(es&&e.clientX-es.x>80&&Math.abs(e.clientY-es.y)<60){es=null;try{sfx.click&&sfx.click()}catch(_){}state='title'}es=null},true);
// ---------- friendly error toasts ----------
const oTo=toast;toast=function(t){try{if(typeof t==='string'&&/(failed|error|network|timed? ?out|couldn.t|nokey)/i.test(t)&&!/check wi-?fi|try again/i.test(t))t=t.replace(/\s*[\(\[].*?[\)\]]/g,'')+' · '+T_('check Wi-Fi and try again');}catch(e){}return oTo.call(this,t)};
// ---------- loading skeletons (leaderboards) ----------
const oft=P.fillText;P.fillText=function(t,x,y){if(typeof t==='string'&&/^(Loading|Cargando)/i.test(t)&&/board|lb|club|ctry|week|online/i.test(String(state))){const w=Math.min(W*0.84,320),x0=W/2-w/2;for(let i=0;i<5;i++){const a=0.10+0.06*Math.sin(performance.now()/260+i*0.7);this.save();this.fillStyle='rgba(200,220,210,'+a.toFixed(3)+')';this.beginPath();this.roundRect(x0,y-10+i*44,w,34,10);this.fill();this.restore()}return}return oft.apply(this,arguments)};
window.FGF_CFTEST={CF,band:()=>BAND,cap};
})();
