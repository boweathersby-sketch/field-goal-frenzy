// s80 (Oct 17, playtest fixes approved by Kirk)
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t;
// ---- 1) popups: none on the very first launch, at most one per launch, and they take turns ----
try{if(LS.fgfLaunches==null)LS.fgfLaunches=(+LS.fgfRounds||0)>0?1:0;LS.fgfLaunches=(+LS.fgfLaunches||0)+1}catch(e){}
let NOW=null;
const ELIG={ls:()=>typeof lsPending==='function'&&lsPending()&&!sessionStorage.fgfLSseen,
 wn:()=>window.FGF_WN&&LS.fgfWN!==FGF_WN&&+(LS.fgfRounds||0)>0,
 so:()=>+(LS.fgfRounds||0)>=1&&!LS.fgfSOseen};
window.FGF_POPGATE=function(name){try{if((+LS.fgfLaunches||0)<2)return false;if(NOW)return NOW===name;
 let order=['ls','wn','so'];const last=LS.fgfPopLast;if(last&&order.includes(last))order=order.filter(x=>x!==last).concat(last);
 const first=order.find(k=>{try{return ELIG[k]()}catch(e){return false}});if(first&&first!==name)return false;NOW=name;LS.fgfPopLast=name;return true}catch(e){return false}};
// ---- 2) tutorial aim help: a gentle nudge on every tutorial kick, full help on a retry ----
const oU=update;update=function(dt){const r=oU.apply(this,arguments);try{if(mode==='tut'&&state==='play'&&ball.fly&&!ball.done&&!paused&&ball.z<dist&&ball.vz>0){
 const full=!!window.FGF_TUTASSIST,k=full?1:0.35,t=Math.max(0.15,(dist-ball.z)/Math.max(1,ball.vz)),d=Math.min(1,(dt||1/60)*4*k);
 ball.vx+=((-ball.x)/t-ball.vx)*d;ball.ax=(ball.ax||0)*(1-d);
 if(full){if(ball.vz<15)ball.vz=15;const t2=(dist-ball.z)/ball.vz,py=ball.y+ball.vy*t2-0.5*G*t2*t2;if(py<BAR+1.2)ball.vy=(BAR+1.6-ball.y+0.5*G*t2*t2)/t2}}}catch(e){}return r};window.update=update;
// ---- 3) Pause > HOME with a confirm ----
let HC=0;
const oPM=pauseMenu;pauseMenu=function(){const r=oPM.apply(this,arguments);try{if(typeof setOpen!=='undefined'&&setOpen)return r;const bw=Math.min(280,W*0.8),x=W/2-bw/2;
 if(!HC){bx(x,H*0.36+198,bw,52,'🏠 '+T_('HOME'),()=>{HC=1},false);return r}
 BTN=[];ctx.save();ctx.fillStyle='rgba(3,8,20,0.92)';ctx.fillRect(0,0,W,H);const pw=Math.min(320,W*0.88),ph=210,px=W/2-pw/2,py=H*0.3;panel(px,py,pw,ph);
 ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='900 19px system-ui';ctx.fillText(T_('Go to the home screen?'),W/2,py+40,pw-24);
 ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.fillText(T_('This game will end and will not be saved.'),W/2,py+68,pw-24);ctx.restore();
 bx(px+16,py+92,pw-32,46,'🏠 '+T_('YES, GO HOME'),()=>{HC=0;try{delete LS.fgfRun}catch(e){}try{windAudio(false)}catch(e){}paused=false;state='title'},false,15);
 bx(px+16,py+148,pw-32,44,T_('KEEP PLAYING'),()=>{HC=0},true,14)}catch(e){}return r};
setInterval(()=>{if(!paused||state!=='play')HC=0},300);
// ---- 4) calmer home screen: softer borders and a muted gold (only when no menu theme is equipped) ----
const SOFT={fill:'rgba(6,28,16,0.86)',on:'#d8b552',stroke:'rgba(242,194,48,0.42)',text:'#fff',textOn:'#0b3d1a'};
const oTH=window.FGF_MENUTH;window.FGF_MENUTH=function(){const t=oTH?oTH.apply(this,arguments):null;if(t)return t;return state==='title'?SOFT:null};

// gold borders on the home screen (chips, panels) are drawn softer too; text and fills keep their colors
try{const P=CanvasRenderingContext2D.prototype,d=Object.getOwnPropertyDescriptor(P,'strokeStyle'),G1=/^(#f2c230|#F2C230|rgba\(242,194,48,0?\.8\d*\))$/;
 Object.defineProperty(P,'strokeStyle',{get:d.get,set(v){if(typeof v==='string'&&state==='title'&&G1.test(v))v='rgba(242,194,48,0.3)';d.set.call(this,v)},configurable:true})}catch(e){}
})();
