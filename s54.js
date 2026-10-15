// s54 (Batch 10d): Practice Range (pick distance + wind, no coins/rewards, no lives lost) and Same-Conditions Rematch
// (replays the exact weather + wind sequence of your last run). Uses the normal kick/ball physics.
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t;
const R={d:+(LS.fgfRangeD||35),w:LS.fgfRangeW||'rand'};window.FGF_RANGE=R;
const WOPT=[['calm','CALM'],['rand','RANDOM'],['l10','← 10 MPH'],['r10','10 MPH →']];
let REC=[],PLAY=null,lastMode='classic';
const oW=newWind;newWind=function(){if(mode==='range')dist=R.d;const r=oW.apply(this,arguments);try{
 if(mode==='range'){if(R.w==='calm')wind={mph:0,a:0,x:0,z:0};else if(R.w==='l10'||R.w==='r10'){const s=R.w==='l10'?-1:1;wind={mph:10,a:s*Math.PI/2,x:s*10,z:0}}}
 else if(PLAY&&PLAY[roundN-1]){const q=PLAY[roundN-1];weather=q.w;wind=Object.assign({},q.wind)}
 if(mode!=='range'&&mode!=='tut')REC[roundN-1]={w:weather,wind:Object.assign({},wind)}}catch(e){}return r};
const oN=newGame;newGame=function(m){const r=oN.apply(this,arguments);try{if(mode!=='range'){lastMode=mode;if(!window.__rematch){PLAY=null}window.__rematch=0;
  /* newGame already called newWind once: record/replay round 1 */ if(PLAY&&PLAY[0]){weather=PLAY[0].w;wind=Object.assign({},PLAY[0].wind)}REC=PLAY?REC:[];REC[0]={w:weather,wind:Object.assign({},wind)}}}catch(e){}return r};
function rematch(){PLAY=REC.slice();window.__rematch=1;REC=[];newGame(lastMode)}
window.FGF_REMATCH=rematch;window.FGF_RANGESTART=()=>startRange();
function startRange(){LS.fgfRangeD=R.d;LS.fgfRangeW=R.w;PLAY=null;newGame('range');dist=R.d;newWind();roundN=1;resetBall()}
// no lives lost, no coins in the range
let snap=null;const oK=kick;kick=function(){if(mode==='range'&&!ball.fly)snap=coins;return oK.apply(this,arguments)};
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(mode==='range'){lives=3;prevLives=3;if(snap!=null){coins=snap;if(!window.TESTER)LS.fgfCoins=coins}if(msg){msg.s2='';if(!good)msg.s=T_('Practice · no misses count')}}}catch(e){}return r};
// exit button while in the range
const odb=drawBall;drawBall=function(){const r=odb.apply(this,arguments);try{if(state==='play'&&mode==='range'){BTN=BTN.filter(b=>!b.__rg);const w=92,x=8,y=H-60;ctx.save();ctx.fillStyle='rgba(0,0,0,.6)';ctx.beginPath();ctx.roundRect(x,y,w,32,12);ctx.fill();ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText(T_('✖ END RANGE'),x+w/2,y+21,w-8);ctx.fillStyle=GOLD;ctx.font='900 11px system-ui';ctx.fillText(T_('🎯 PRACTICE RANGE'),W/2,H*0.215);ctx.restore();BTN.push({x,y,w,h:32,cb:()=>{state='range'},__rg:1})}}catch(e){}return r};
// range setup screen
const osc=S3.screen;S3.screen=function(){
 if(state==='range'){BTN=[];txt('🎯 PRACTICE RANGE',W/2,H*0.08,Math.min(24,W*0.065),GOLD,'#063');const bw=Math.min(300,W*0.86),x=W/2-bw/2;let y=H*0.15;
  ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(T_('Pick a distance and wind · free · no coins, no misses'),W/2,y,W*0.92);y+=24;
  ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.fillText(T_('DISTANCE'),W/2,y+4);y+=14;
  bx(x,y,60,48,'−',()=>R.d=Math.max(20,R.d-5),false,20);bx(x+bw-60,y,60,48,'+',()=>R.d=Math.min(80,R.d+5),false,20);txt(R.d+' YDS',W/2,y+32,22,'#fff');y+=62;
  ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText(T_('WIND'),W/2,y+4);y+=14;const hw=(bw-8)/2;
  WOPT.forEach((o,i)=>bx(x+(i%2)*(hw+8),y+Math.floor(i/2)*50,hw,42,o[1],()=>R.w=o[0],R.w===o[0],13));y+=110;
  bx(x,y,bw,52,'▶ START PRACTICE',startRange,true,16);
  bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='title',false,14);return true}
 const r=osc.apply(this,arguments);
 try{if(state==='over'&&mode!=='range'&&mode!=='tut'){const bw=Math.min(118,W/2-78),y=H*0.86;bx(W*0.02,y,bw,30,'🔁 REMATCH',rematch,false,11);bx(W*0.98-bw,y,bw,30,'🎯 RANGE',()=>state='range',false,11)}
  if(state==='ctl'){bx(W/2-Math.min(150,W*0.43),H*0.93-74,Math.min(300,W*0.86),42,'🎯 PRACTICE RANGE',()=>state='range',false,13)}}catch(e){}
 return r};
// the game-over screen is not handled by the menu tap router, so route these two buttons here
addEventListener('pointerdown',e=>{if(state!=='over'||mode==='range'||mode==='tut')return;const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height,bw=Math.min(118,W/2-78),y0=H*0.86;
 if(y<y0-4||y>y0+34)return;if(x>=W*0.02&&x<=W*0.02+bw){e.stopImmediatePropagation();rematch()}else if(x>=W*0.98-bw&&x<=W*0.98){e.stopImmediatePropagation();state='range'}},true);
})();
