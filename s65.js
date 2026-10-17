// s65 (Kirk, Oct 15): STORM modes. HURRICANE rework (70–170 mph, random distance, gusts), 🌀 HURRICANE POSTS (hurricane + moving posts),
// 🌪️ TORNADO (EF0–EF5, swirling wind that turns mid-flight, funnel sky + debris), 🌪️ TWISTER POSTS (tornado + moving posts).
// HARD RULE: every kick is checked by FGF_SOLVER (s65a.js, exact replica of the flight code) before it is shown; unmakeable kicks are re-rolled.
// Chaos kicks with moving posts get the same check.
(function(){
const SV=window.FGF_SOLVER,R=()=>(window.__SRNG||Math.random)(),RI=(a,b)=>a+Math.round(R()*(b-a)),HK=2.4,STEP=1/60;
WX.tornado=['🌪️','TORNADO'];
try{MODES.push(['storm','🌀 HURRICANE POSTS','Hurricane winds + moving posts'],['tornado','🌪️ TORNADO','EF0–EF5 swirling winds'],['twister','🌪️ TWISTER POSTS','Tornado winds + moving posts'],['dstorm','📅 DAILY STORM','Same storm for everyone today · 10 kicks'])}catch(e){}
const DT=()=>window.FGF_DSTYPE?FGF_DSTYPE():'h',HM=m=>m==='hurricane'||m==='storm'||(m==='dstorm'&&DT()==='h'),TM=m=>m==='tornado'||m==='twister'||(m==='dstorm'&&DT()==='t'),SM=m=>HM(m)||TM(m),POSTM=m=>m==='storm'||m==='twister';
const EF=mph=>mph<86?0:mph<111?1:mph<136?2:mph<166?3:mph<201?4:5;
let SW=null,tf=0,acc=0;window.FGF_STORMSTAT={gen:0,reroll:0};
const amp=()=>2.6*Math.min(1,(dist-20)/25+0.4),PX=()=>{const A=amp();return[-A,-A/2,0,A/2,A]};
// Oct 17 (Kirk): storms eased. Same 70–170 mph / EF0–EF5 shown, but the wind pushes the ball less (posts modes a bit more),
// distances lean shorter (20–50 hurricane, 20–45 tornado), tornado swirl turns slower and gust/swirl pulses are half as strong.
const EZK=m=>m==='storm'?0.40:m==='twister'?0.65:HM(m)?0.33:0.55;
function gen(){const m=mode;if(HM(m)){dist=20+Math.round(Math.pow(R(),1.5)*30);const mph=RI(70,170),a=(R()<0.5?1:-1)*(Math.PI/2+(R()-0.5)*0.5),eff=EZK(m)*140*HK*(0.75+0.45*(mph-70)/100);weather='hurricane';SW=null;wind={mph,a,x:Math.sin(a)*eff,z:Math.cos(a)*eff}}
 else{dist=20+Math.round(Math.pow(R(),1.5)*25);const mph=RI(65,230),a0=R()*6.283,w=(R()<0.5?-1:1)*(0.35+R()*0.55),eff=EZK(m)*140*HK*(0.55+0.5*(mph-65)/165);weather='tornado';SW={a0,w,eff,zk:0.25};wind={mph,a:a0,x:Math.sin(a0)*eff,z:Math.cos(a0)*eff*0.25,ef:EF(mph)}}}
function cfg(){return{dist,weather,wind:{x:wind.x,z:wind.z},wp:ball.wp,gust:weather==='hurricane'?'h':weather==='gust'||weather==='hlite'?'g':null,swirl:SW,pox:(POSTM(mode)||(mode==='chaos'&&window.__CHMOV))?PX():[0]}}
window.FGF_STORMCFG=cfg;
function ensure(){const S=window.FGF_STORMSTAT;S.gen++;
 if(SM(mode)){for(let i=0;i<60;i++){if(window.__SRNG)ball.wp=__SRNG()*6.28;gen();if(SV.makeable(cfg()))return;S.reroll++}dist=25}
 else if(mode==='chaos'&&window.__CHMOV){for(let i=0;i<15;i++){if(SV.makeable(cfg()))return;S.reroll++;const a=R()*6.283,mph=weather==='hlite'?30+RI(0,20):Math.max(0,Math.round(wind.mph*0.8));wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph}}wind={mph:0,a:0,x:0,z:0};if(!SV.makeable(cfg()))window.__CHMOV=false}}
const oRB=resetBall;resetBall=function(){const r=oRB.apply(this,arguments);tf=0;acc=0;try{if(state==='play'||state==='pass'||state==='ctick'||SM(mode))ensure()}catch(e){}return r};
const oNW=newWind;newWind=function(){const r=oNW.apply(this,arguments);if(!SM(mode))SW=null;else{weather=HM(mode)?'hurricane':'tornado';try{windAudio(true)}catch(e){}}return r};
function swirl(){if(!SW)return;const a=SW.a0+SW.w*tf,gg=1+0.12*Math.sin(gustT*2.7);wind.x=Math.sin(a)*SW.eff*gg;wind.z=Math.cos(a)*SW.eff*SW.zk*gg;wind.a=a}
window.FGF_STORMRESET=()=>{tf=0;acc=0};window.FGF_STORMSWIRL=()=>{swirl();tf+=STEP};
// fixed 60 Hz steps during flight in checked modes so the real flight matches the solver exactly
const oU=update;update=function(dt){const chk=SM(mode)||(mode==='chaos'&&window.__CHMOV);if(!(chk&&state==='play'&&ball.fly&&!ball.done&&!paused))return oU.apply(this,arguments);
 acc+=dt;let r;while(acc>=STEP-1e-9){acc-=STEP;swirl();tf+=STEP;r=oU.call(this,STEP);if(!ball.fly||ball.done)break}return r};
window.update=update;
// HUD: wind speed / EF rating, big and clear
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(state==='play'&&SM(mode)){ctx.save();ctx.textAlign='center';const t=TM(mode)?'🌪️ EF'+wind.ef+' · '+wind.mph+' MPH':'🌀 '+wind.mph+' MPH';ctx.font='900 '+Math.min(22,W*0.058)+'px system-ui';ctx.lineWidth=4;ctx.strokeStyle='#000';ctx.strokeText(t,W/2,H*0.215);ctx.fillStyle=TM(mode)?'#ffb347':'#7fdfff';ctx.fillText(t,W/2,H*0.215);
 if(POSTM(mode)){ctx.font='900 11px system-ui';ctx.fillStyle='#7fffd4';ctx.fillText('↔️ POSTS MOVING',W/2,H*0.215+16)}ctx.restore()}}catch(e){}return r};
// tornado sky: dark funnel + flying debris (cosmetic)
const DB=[];for(let i=0;i<26;i++)DB.push({x:R(),y:R(),s:2+R()*5,v:0.15+R()*0.4,r:R()*6,c:['#5a4630','#3b3b3b','#6b5a3a','#2f4f2f'][i%4]});
const oBG=drawBG;drawBG=function(){const r=oBG.apply(this,arguments);try{if(weather==='tornado'&&(state==='play'||state==='pass')){const t=performance.now()/1000,hz=H*0.42;ctx.save();
 const g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'rgba(18,24,20,.88)');g.addColorStop(1,'rgba(60,72,58,.35)');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);
 const fx=W*0.72+Math.sin(t*0.4)*W*0.08;for(let k=0;k<3;k++){ctx.beginPath();const top=W*(0.34-k*0.06),bot=W*0.03;ctx.moveTo(fx-top/2,0);for(let i=0;i<=12;i++){const y=hz*i/12,w=top+(bot-top)*Math.pow(i/12,0.7),wob=Math.sin(t*3+i*0.8+k)*W*0.02*(i/12);ctx.lineTo(fx-w/2+wob+Math.sin(i*0.5)*W*0.03*(i/12),y)}for(let i=12;i>=0;i--){const y=hz*i/12,w=top+(bot-top)*Math.pow(i/12,0.7),wob=Math.sin(t*3+i*0.8+k)*W*0.02*(i/12);ctx.lineTo(fx+w/2+wob+Math.sin(i*0.5)*W*0.03*(i/12),y)}ctx.closePath();ctx.fillStyle=['rgba(40,44,40,.55)','rgba(70,74,66,.45)','rgba(110,110,100,.3)'][k];ctx.fill()}
 for(const d of DB){d.x+=d.v*0.01*(SW&&SW.w<0?-1:1);if(d.x>1.1)d.x=-0.1;if(d.x<-0.1)d.x=1.1;const x=d.x*W,y=d.y*hz*1.1+Math.sin(t*2+d.r)*12;ctx.save();ctx.translate(x,y);ctx.rotate(t*4*d.v+d.r);ctx.fillStyle=d.c;ctx.fillRect(-d.s,-d.s/2,d.s*2,d.s);ctx.restore()}ctx.restore()}}catch(e){}return r};
// mode menu: "🌪️ STORM MODES" entry in MORE MODES
try{FGF_MODES2.push(['storms','🌪️','STORM MODES','Hurricane Posts · Tornado · Twister Posts · every kick makeable'])}catch(e){}
const BS='border:2px solid #f2c230;background:#05200f;color:#f2c230;border-radius:16px;padding:10px 14px;font:900 13px system-ui';
function menu(){const o=document.getElementById('fgfxm');if(o)o.remove();const L=[['hurricane','🌀 HURRICANE','70–170 mph · random distance · gusts'],['storm','🌀 HURRICANE POSTS','Hurricane winds + moving posts'],['tornado','🌪️ TORNADO','EF0–EF5 · wind swirls mid-flight'],['twister','🌪️ TWISTER POSTS','Tornado winds + moving posts']];
 const d=document.createElement('div');d.id='fgfxm';d.className='fgfov';d.style.cssText='position:fixed;inset:0;background:rgba(2,10,6,.82);z-index:68;display:flex;align-items:center;justify-content:center;padding:14px';
 d.innerHTML=`<div style="background:#062a14;border:2px solid #f2c230;border-radius:16px;padding:14px;max-width:360px;width:100%;color:#fff;font:14px system-ui;max-height:88vh;overflow:auto"><div style="color:#f2c230;font:900 18px system-ui;text-align:center;margin-bottom:6px">🌪️ STORM MODES</div><div style="font:12px system-ui;color:#bcd;text-align:center;margin-bottom:10px">Every kick is checked so at least one swipe can score.</div>`+L.map(m=>`<button data-s="${m[0]}" style="${BS};display:block;width:100%;text-align:left;margin:0 0 8px;color:#fff"><span style="color:#f2c230">${m[1]}</span><br><span style="font:12px system-ui;color:#bcd">${m[2]}${+(LS[BKEY(m[0])]||0)?' · Best '+LS[BKEY(m[0])]:''}</span></button>`).join('')+`<button id="smb" style="${BS};display:block;margin:6px auto 0;min-width:140px">◀ BACK</button></div>`;
 document.body.appendChild(d);d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',350);d.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{d.remove();try{sfx.whistle()}catch(e){}newGame(b.dataset.s)});d.querySelector('#smb').onclick=()=>d.remove()}
window.FGF_STORMMENU=menu;
const oS=S3.screen;S3.screen=function(){const r=oS.apply(this,arguments);try{if(state==='mmsel'){const rows=BTN.filter(b=>Math.abs(b.w-W*0.88)<1).sort((a,b)=>b.y-a.y);if(rows[0])rows[0].cb=menu;if(rows[1]&&window.FGF_XMTEST)rows[1].cb=FGF_XMTEST.menu}}catch(e){}return r};
})();
