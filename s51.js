// s51 (Batch 10a): KICK CONTROL styles (Swipe default · Aim + Hold · Timing Meter), Controls screen
// (swipe sensitivity, mirror swipe), beat-your-best banner, why-you-missed tips, offline badge.
// Alternative controls only build a synthetic swipe and hand it to the existing kick(), so the kicker
// animation, art, difficulty, gear boosts and ball physics are exactly the same code path as swiping.
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t;const KS_=()=>LS.fgfKC||'swipe';window.FGF_KC=KS_;
const SENS=()=>+(LS.fgfSens||1),MIR=()=>LS.fgfMirror==='1';
// ---- synthetic swipe: power 0..1, theta = aim angle (rad, + = right), curve -1..1 ----
function synth(power,theta,curve){const p=SP(ball.x,ball.y,ball.z)||{x:W/2,y:H*0.8};const len=H*0.32,dx=Math.sin(theta)*len,dy=Math.cos(theta)*len,
 sp=0.8+Math.max(0,Math.min(1,power))*4.2/(1+S3.gp()),T=Math.max(20,len*1000/(H*sp)),t0=performance.now()-T;
 const n=6,s=[];for(let i=0;i<=n;i++){const u=i/n,bow=Math.sin(u*Math.PI)*curve*len/3/(1-S3.ga()||1)*0.9;s.push({x:p.x+dx*u+Math.cos(theta)*bow,y:p.y-dy*u+Math.sin(theta)*bow,t:t0+T*Math.pow(u,1)})}
 s.__synth=1;return s}
window.FGF_SYNTHKICK=(pw,th,cv)=>{if(state==='play'&&!ball.fly)kick(synth(pw,th,cv||0))};
// swipe sensitivity + mirror for the normal swipe
const ok=kick;kick=function(s){try{if(s&&!s.__synth&&s.length>1){if(MIR()){const a=s[0];s=s.map(q=>({x:2*a.x-q.x,y:q.y,t:q.t}))}const k=SENS();if(k!==1){const t0=s[0].t;s=s.map(q=>({x:q.x,y:q.y,t:t0+(q.t-t0)/k}))}}}catch(e){}return ok.call(this,s)};
// ---- input for the alternative styles ----
let AH=null,TM=null,AIM=0,AD=null;const KB=()=>({x:W*0.55,y:H-178,w:W*0.4,h:58}),onKB=p=>{const k=KB();return p.x>=k.x-6&&p.x<=k.x+k.w+6&&p.y>=k.y-6&&p.y<=k.y+k.h+6};window.__KBDRAW=()=>{ctx.save();const k=KB();ctx.fillStyle=AH?'#ffd23f':'rgba(6,30,16,0.92)';ctx.strokeStyle='#ffd23f';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(k.x,k.y,k.w,k.h,18);ctx.fill();ctx.stroke();ctx.fillStyle=AH?'#063':'#fff';ctx.font='900 16px system-ui';ctx.textAlign='center';ctx.fillText(T_(AH?'RELEASE TO KICK':'🦶 HOLD TO KICK'),k.x+k.w/2,k.y+k.h/2+6,k.w-10);ctx.restore()};window.FGF_KCSTATE=()=>({AH,TM});
const canKick=()=>state==='play'&&!ball.fly&&!msg&&!(typeof cd!=='undefined'&&cd>0)&&!paused;
const ptc=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}};
const onUI=p=>{if(Math.hypot(p.x-PBX(),p.y-(H-44))<34)return true;try{return (BTN||[]).some(b=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)}catch(e){return false}};
const ballXY=()=>SP(ball.x,ball.y,ball.z)||{x:W/2,y:H*0.8};
const aimFrom=p=>{const b=ballXY();return Math.max(-0.6,Math.min(0.6,Math.atan2(p.x-b.x,Math.max(30,b.y-p.y))))};
cv.addEventListener('pointerdown',e=>{const st=KS_();if(st==='swipe'||!canKick())return;const p=ptc(e);if(onUI(p))return;e.stopImmediatePropagation();e.preventDefault();try{au()}catch(x){}
 if(st==='hold'){if(onKB(p))AH={t0:performance.now(),th:AIM,id:e.pointerId};else{AD=e.pointerId;const b=ballXY();if(b.y-p.y>10)AIM=aimFrom(p)}}
 else if(st==='meter'){const now=performance.now();if(!TM)TM={ph:1,t0:now};else if(TM.ph===1){TM.pw=meterPow(now);TM.ph=2;TM.t0=now}else if(TM.ph===2){const a=meterAcc(now);const th=a*0.55;const pw=TM.pw;TM=null;kick(synth(pw.p,th,pw.c))}}},true);
cv.addEventListener('pointermove',e=>{if(AD!=null&&!AH&&KS_()==='hold'){e.stopImmediatePropagation();const p=ptc(e);const b=ballXY();if(b.y-p.y>10)AIM=aimFrom(p)}else if(AH&&KS_()==='hold')e.stopImmediatePropagation()},true);
addEventListener('keydown',e=>{if(KS_()!=='hold'||!canKick()||AH)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){AIM=Math.max(-0.6,Math.min(0.6,AIM+(e.key==='ArrowLeft'?-0.04:0.04)));e.stopImmediatePropagation();e.preventDefault()}},true);
const rel=e=>{if(AD!=null&&!AH){AD=null;if(KS_()==='hold')e.stopImmediatePropagation();return}if(!AH||KS_()!=='hold')return;e.stopImmediatePropagation();const f=fill(performance.now());const th=AH.th;AH=null;if(!canKick())return;
 // perfect zone 0.88-1.0 = full power; underfill = less distance; overfill = less power + a hook
 let p,c=0;if(f<0.88)p=f/0.88*0.93;else if(f<=1.0)p=1;else{p=Math.max(0.45,1-(f-1)*2.2);c=(Math.random()<0.5?-1:1)*Math.min(0.8,(f-1)*3)}
 kick(synth(p,th,c))};
cv.addEventListener('pointerup',rel,true);cv.addEventListener('pointercancel',()=>{AH=null;AD=null},true);
const fill=now=>Math.min(1.25,(now-AH.t0)/1600);
// meter: power needle 0->1->0 over 1.6s (top 8% = perfect); accuracy needle sweeps -1..1 over 1.2s
const meterPow=now=>{const u=((now-TM.t0)/2300)%1,v=u<0.5?u*2:2-u*2;return{p:v>=0.92?1:v/0.92*0.95,c:0,raw:v}};
const meterAcc=now=>{const u=((now-TM.t0)/1720)%1;return Math.sin(u*Math.PI*2)};
// reset on new kick / screen change
setInterval(()=>{if(state!=='play'||ball.fly){AH=null;if(state!=='play')TM=null}},200);
const oN=newGame;newGame=function(){AH=null;TM=null;AIM=0;AD=null;return oN.apply(this,arguments)};
// ---- overlays (drawn with the ball so they show in every mode) ----
const odb=drawBall;drawBall=function(){const r=odb.apply(this,arguments);try{if(state==='play'&&!ball.fly&&KS_()!=='swipe')drawCtl()}catch(e){}return r};
function drawCtl(){const st=KS_(),b=ballXY(),now=performance.now(),mw=Math.min(200,W*0.55),mx=W/2-mw/2,my=H*0.62;ctx.save();
 const bar=(v,lbl,zoneA,zoneB,needle)=>{ctx.fillStyle='rgba(0,0,0,0.55)';ctx.beginPath();ctx.roundRect(mx-6,my-22,mw+12,40,10);ctx.fill();ctx.fillStyle='#223';ctx.fillRect(mx,my,mw,12);
  const g=ctx.createLinearGradient(mx,0,mx+mw,0);g.addColorStop(0,'#3ddc84');g.addColorStop(0.7,'#ffd23f');g.addColorStop(1,'#ff4a3a');ctx.fillStyle=g;ctx.fillRect(mx,my,mw*Math.min(1,v),12);
  if(zoneA!=null){ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.strokeRect(mx+mw*zoneA,my-2,mw*(zoneB-zoneA),16)}
  if(needle!=null){ctx.fillStyle='#fff';ctx.fillRect(mx+mw*needle-1.5,my-5,3,22)}
  ctx.fillStyle='#fff';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText(T_(lbl),W/2,my-8,mw+8)};
 if(st==='hold'){const th=AH?AH.th:AIM;ctx.strokeStyle='rgba(255,255,255,0.75)';ctx.setLineDash([6,6]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x+Math.sin(th)*H*0.3,b.y-Math.cos(th)*H*0.3);ctx.stroke();ctx.setLineDash([]);
  if(AH){const f=fill(now);bar(f/1.25,f>1?'TOO MUCH!':f>=0.88?'PERFECT · RELEASE!':'HOLD… release in the white zone',0.88/1.25,1/1.25,null)}else{ctx.fillStyle='rgba(0,0,0,0.55)';ctx.beginPath();ctx.roundRect(W/2-125,my-20,250,30,10);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText(T_('1️⃣ Drag to aim · 2️⃣ hold KICK for power'),W/2,my,242)}}
 if(st==='meter'){if(!TM){ctx.fillStyle='rgba(0,0,0,0.55)';ctx.beginPath();ctx.roundRect(W/2-120,my-20,240,30,10);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText(T_('👆 TAP to start the meter'),W/2,my,232)}
  else if(TM.ph===1){const v=meterPow(now).raw;bar(v,'TAP for POWER',0.92,1,null)}
  else{const a=meterAcc(now);bar(1,'TAP for AIM · center = straight',0.47,0.53,(a+1)/2);ctx.fillStyle='#ffd23f';ctx.font='900 10px system-ui';ctx.fillText(T_('Power '+Math.round(TM.pw.p*100)+'%'),W/2,my+30,mw)}}
 ctx.restore()}
// ---- Controls screen ----
const OPT=[['swipe','👆 SWIPE','Swipe from the ball to the posts (default)'],['hold','🎯 AIM + HOLD','Aim first (drag or ←/→), then hold KICK for power, release in the white zone'],['meter','⏱️ TIMING METER','Tap to start, tap for power, tap for aim']];
const oSc=S3.screen;S3.screen=function(){if(state==='ctl'){BTN=[];txt('🎮 CONTROLS',W/2,H*0.08,Math.min(26,W*0.07),GOLD,'#063');const bw=Math.min(310,W*0.88),x=W/2-bw/2;let y=H*0.13;
  ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText('KICK CONTROL',W/2,y+4);y+=14;
  OPT.forEach(o=>{const on=KS_()===o[0];bx(x,y,bw,52,'',()=>{LS.fgfKC=o[0]},on);ctx.fillStyle=on?'#063':'#fff';ctx.font='900 14px system-ui';ctx.textAlign='center';ctx.fillText((on?'✔ ':'')+(window.FGF_TR?FGF_TR(o[1]):o[1]),W/2,y+22);ctx.font='11px system-ui';ctx.fillStyle=on?'#063':'#bcd';ctx.fillText(o[2],W/2,y+40,bw-12);y+=58});
  y+=8;ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.fillText('SWIPE SENSITIVITY',W/2,y+4);y+=12;const S=[[0.85,'LOW'],[1,'NORMAL'],[1.2,'HIGH']],sw=(bw-12)/3;S.forEach((s,i)=>bx(x+i*(sw+6),y,sw,40,s[1],()=>{LS.fgfSens=s[0]},Math.abs(SENS()-s[0])<0.01,12));y+=48;
  ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('HIGH = less effort for full power',W/2,y+4,bw);y+=14;
  bx(x,y,bw,44,'↔️ MIRROR SWIPE: '+(MIR()?'ON':'OFF'),()=>{LS.fgfMirror=MIR()?'0':'1'},MIR(),13);y+=50;ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('Mirror flips left/right for your swipe',W/2,y+4,bw);
  bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='mset',false,14);return true}
 const r=oSc?oSc.apply(this,arguments):undefined;
 try{if(state==='mset'){const bw=Math.min(300,W*0.84),x=W/2-bw/2,i=BTN.findIndex(q=>Math.abs(q.y-(H*0.16+72))<2&&Math.abs(q.x-x)<2);if(i>=0){BTN[i].w=bw/2-4}
   // repaint: Left-handed narrowed + CONTROLS beside it
   const lh=LS.fgfLH==='1';panelFix(x,H*0.16+72,bw,44);bx(x,H*0.16+72,bw/2-4,44,'✋ LEFTY: '+(lh?'ON':'OFF'),()=>LS.fgfLH=lh?'0':'1',lh,12);bx(x+bw/2+4,H*0.16+72,bw/2-4,44,'🦶 KICK METHOD · CONTROLS',()=>state='ctl',false,12)}
  if(state==='title'&&navigator.onLine===false){ctx.save();ctx.fillStyle='rgba(120,20,20,0.85)';ctx.beginPath();ctx.roundRect(8,H-30,86,22,11);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText(T_('📴 OFFLINE'),51,H-15,82);ctx.restore()}}catch(e){}
 return r};
function panelFix(x,y,w,h){BTN=BTN.filter(q=>!(Math.abs(q.y-y)<2&&Math.abs(q.x-x)<2&&q.w>=w/2-6&&q.w<=w+1&&q!==null));ctx.save();ctx.fillStyle='#0b2a17';ctx.fillRect(x-3,y-3,w+6,h+6);ctx.restore()}
// ---- beat-your-best banner + why-you-missed tip ----
let bestAt=0,shown=false;const oNG=newGame;newGame=function(){const r=oNG.apply(this,arguments);bestAt=best;shown=false;return r};
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(state==='play'&&!['tut','ghost'].includes(mode)){
  if(good&&bestAt>0&&!shown&&score>bestAt){shown=true;FGF_POP('🏆 NEW BEST! '+Math.round(score).toLocaleString(),'#ffd23f',0.36)}
  if(!good&&LS.fgfWhy!=='0'){const res=String(ball.res||''),k=window.__lastKick||{},wx=+wind.x||0,mph=Math.round(+wind.mph||0);let t='';
   if(res.startsWith('WIDE')){const side=res.endsWith('LEFT')?'left':'right';const windPush=mph>=5&&((side==='right'&&wx>0)||(side==='left'&&wx<0));t=windPush?'💨 '+mph+' mph wind pushed it '+side+' · aim more '+(side==='right'?'left':'right'):'↔️ Missed '+side+' · aim more '+(side==='right'?'left':'right')}
   else if(res.startsWith('SHORT'))t=KS_()==='swipe'?'💪 Short · swipe longer and faster':KS_()==='hold'?'💪 Short · release in the white zone':'💪 Short · tap power at the very top';
   else if(/BLOCK/.test(res))t='✋ Blocked · kick sooner, the rush is coming';
   if(t)setTimeout(()=>FGF_POP(t,'#bfe6ff',0.42),650)}}}catch(e){}return r};
const oT=txt;txt=function(t){if(state==='play'&&KS_()==='hold'&&(t==='SWIPE UP'||t==='TO KICK!'))return;if(t==='SWIPE UP'&&state==='play'&&KS_()!=='swipe')arguments[0]=KS_()==='hold'?'HOLD & RELEASE':'TAP · TAP · TAP';return oT.apply(this,arguments)};
})();

(function(){const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(state==='play'&&!ball.fly&&!paused&&FGF_KC()==='hold'&&window.__KBDRAW)__KBDRAW()}catch(e){}return r}})();
(function(){const oP=panel;panel=function(x,y){if(state==='play'&&FGF_KC()==='hold'&&Math.abs(x-W*0.55)<1&&Math.abs(y-(H-178))<1)return;return oP.apply(this,arguments)}})();
