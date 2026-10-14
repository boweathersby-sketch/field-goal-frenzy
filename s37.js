// s37: Hurricane rules. Start with 3 lives; a miss costs 1, a make adds 1 (max 5).
// "Unlimited Kicks" (permanent coin unlock, toggle): misses never end the run; scores don't count for Best or boards.
(function(){const PRICE=6000;window.FGF_HUNL_PRICE=PRICE;
 const owned=()=>LS.fgfHUnl==='1'||!!window.TESTER,on=()=>owned()&&LS.fgfHUnlOn==='1';window.FGF_HUNL={owned,on,PRICE};
 let UN=false,lastUn=false,popT=0;
 const oNG=newGame;newGame=function(m){const r=oNG.apply(this,arguments);UN=mode==='hurricane'&&on();window.HUNL_RUN=UN;if(mode==='hurricane'){lives=UN?99:3;prevLives=lives}return r};
 const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);if(mode==='hurricane'&&state==='play'&&!UN&&good&&ball&&ball.res!=='BLOCKED!'&&lives<5){lives++;prevLives=lives;popT=performance.now()}return r};
 setInterval(()=>{if(UN&&mode==='hurricane'&&(state==='play'||state==='pause')&&lives<99){lives=99;prevLives=99}},100);
 const oE=endGame;endGame=function(){if(!(UN&&mode==='hurricane')){lastUn=false;return oE.apply(this,arguments)}
  const b0=best,k=BKEY(mode),l0=LS[k],sc=score;score=0;let r;try{r=oE.apply(this,arguments)}finally{score=sc;best=b0;if(l0==null)delete LS[k];else LS[k]=l0}lastUn=true;if(state==='initials')state='over';return r};
 const oH=S3.hud;S3.hud=function(sm){const r=oH.apply(this,arguments);if(mode!=='hurricane'||state!=='play')return r;
  if(UN){const w=118,x=W/2-w/2,y=H*0.13;ctx.save();ctx.fillStyle='rgba(60,20,90,0.92)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,24,12);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('∞ UNLIMITED · END RUN',W/2,y+16,w-8);ctx.restore();btn(x,y-4,w,32,()=>{endGame()})}
  const a=(performance.now()-popT)/1000;if(a<1.2){ctx.save();ctx.globalAlpha=1-a/1.2;ctx.fillStyle='#7fe87f';ctx.strokeStyle='#063';ctx.lineWidth=4;ctx.font='900 '+(22*sm|0)+'px system-ui';ctx.textAlign='center';ctx.strokeText('+1 LIFE ❤️',W/2,H*0.2-a*30);ctx.fillText('+1 LIFE ❤️',W/2,H*0.2-a*30);ctx.restore()}return r};
 const oS=S3.screen;S3.screen=function(){const r=oS.apply(this,arguments);if(state==='over'&&lastUn&&mode==='hurricane'){ctx.save();ctx.fillStyle='rgba(60,20,90,0.95)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;const w=Math.min(W*0.9,300),x=W/2-w/2,y=Math.max(8,(window.__SAFE_TOP||0)+6);ctx.beginPath();ctx.roundRect(x,y,w,26,13);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('∞ UNLIMITED RUN · not counted for Best or boards',W/2,y+17,w-12);ctx.restore()}return r};
 window.FGF_HUNL_TEST={get UN(){return UN},get lastUn(){return lastUn}};
})();
