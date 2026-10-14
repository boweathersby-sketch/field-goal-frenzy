// s17: bonus ball (+1 life) and coin continue (250/500/1000, max 3 per run)
(function(){
const LM=['classic','hurricane','chaos'],CP=[250,500,1000];let CN=0,CT=null,POP=0;
const on=S3.onNew;S3.onNew=function(){CN=0;CT=null;return on.apply(this,arguments)};
const orb=resetBall;resetBall=function(){orb.apply(this,arguments);if(state==='play'&&LM.includes(mode)&&lives<3&&lives>0&&dist>=40&&(window.FGF_BONUS||Math.random()<1/8)){ball.bonus=1;ball.gold=0}};
const odb=drawBall;drawBall=function(){const r=odb.apply(this,arguments);if(ball&&ball.bonus){const p=SP(ball.x,ball.y,ball.z);if(p){const R=Math.max(8,Math.min(22,p.s*0.45)),pu=0.75+0.25*Math.sin(T*6);ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,R*1.8);g.addColorStop(0,'rgba(255,215,60,'+0.9*pu+')');g.addColorStop(1,'rgba(255,190,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,R*1.8,0,6.29);ctx.fill();ctx.restore()}}return r};
const ores=S3.onResult;S3.onResult=function(good){const r=ores.apply(this,arguments);if(good&&ball&&ball.bonus&&ball.res!=='BLOCKED!'){lives=Math.min(3,lives+1);prevLives=lives;POP=performance.now();sfx.cheer()}return r};
const oend=endGame;endGame=function(){if(LM.includes(mode)&&lives<=0&&CN<3&&state==='play'){CT={t0:performance.now(),p:CP[CN]};state='cont';msg=null;return}CT=null;return oend.apply(this,arguments)};
const free=()=>window.TESTER===true||(typeof TESTER!=='undefined'&&TESTER);
function buy(){const p=CT.p;if(!free()){if(coins<p)return;addCoins(-p)}CN++;CT=null;lives=1;prevLives=1;state='play';msg=null;newWind();resetBall();toast('🏈 +1 BALL · keep kicking!')}
function quit(to){CT=null;state='play';oend();if(to)state=to}
const osc=S3.screen;S3.screen=function(){
 if(state==='cont'&&CT){BTN=[];const left=Math.max(0,8-(performance.now()-CT.t0)/1000);if(left<=0){quit();return true}
  ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.save();ctx.fillStyle='rgba(4,18,10,0.96)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(W*0.07,H*0.24,W*0.86,H*0.5,18);ctx.fill();ctx.stroke();ctx.restore();
  txt('OUT OF BALLS!',W/2,H*0.31,Math.min(34,W*0.085),'#ff5a4f','#300');txt('Continue?',W/2,H*0.355,20,'#fff');ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText('Score '+score+' · '+dist+' yds · continue '+(CN+1)+' of 3',W/2,H*0.39);
  const cx=W/2,cy=H*0.45,rr=24;ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,rr,0,6.29);ctx.stroke();ctx.strokeStyle=GOLD;ctx.beginPath();ctx.arc(cx,cy,rr,-1.571,-1.571+6.283*left/8);ctx.stroke();txt(Math.ceil(left)+'',cx,cy+8,22,'#fff');
  const can=free()||coins>=CT.p,lbl='Buy 1 ball - '+CT.p.toLocaleString()+' coins';
  if(can)bx(W*0.13,H*0.53,W*0.74,54,'🏈 '+lbl,buy,true,16);else{ctx.save();ctx.globalAlpha=0.45;ctx.fillStyle='#444';ctx.beginPath();ctx.roundRect(W*0.13,H*0.53,W*0.74,54,14);ctx.fill();ctx.fillStyle='#ddd';ctx.font='900 16px system-ui';ctx.textAlign='center';ctx.fillText('🔒 '+lbl,W/2,H*0.53+33);ctx.restore();ctx.fillStyle='#ffd27a';ctx.font='12px system-ui';ctx.fillText('You have 🪙 '+coins.toLocaleString(),W/2,H*0.53+70);bx(W*0.3,H*0.53+80,W*0.4,34,'🛒 Get coins',()=>quit('shop'),false,13)}
  bx(W*0.3,H*0.68,W*0.4,36,'No thanks',()=>quit(),false,14);return true}
 const r=osc.apply(this,arguments);return r};
// banner + popup drawn over play
const odk=drawKicker;drawKicker=function(){const r=odk.apply(this,arguments);
 if(state==='play'&&ball&&ball.bonus&&!ball.fly){ctx.save();const y=H*0.2,w=Math.min(W*0.9,340),pu=0.6+0.4*Math.sin(T*5);ctx.fillStyle='rgba(40,25,0,.85)';ctx.strokeStyle='rgba(255,210,63,'+pu+')';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(W/2-w/2,y-20,w,40,14);ctx.fill();ctx.stroke();ctx.fillStyle=GOLD;ctx.font='900 15px system-ui';ctx.textAlign='center';ctx.fillText('✨ BONUS BALL: make it for +1 life ✨',W/2,y+6);ctx.restore()}
 const a=(performance.now()-POP)/1000;if(POP&&a<1.8){ctx.save();const s=1+0.5*Math.max(0,1-a*3);ctx.globalAlpha=Math.min(1,(1.8-a)*2);ctx.translate(W/2,H*0.56-a*30);ctx.scale(s,s);ctx.font='900 44px system-ui';ctx.textAlign='center';ctx.lineWidth=6;ctx.strokeStyle='#300';ctx.strokeText('❤️ +1 LIFE!',0,0);ctx.fillStyle='#ff6b8b';ctx.fillText('❤️ +1 LIFE!',0,0);ctx.restore()}
 return r};
})();
