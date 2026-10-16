// s19: gameplay feedback & variety: crowd/streak chants, doink/perfect bonuses, near-miss, bad snap, kick types,
// blimp event, pumpkin balls (Oct), clutch drama, night/moon/snow event hooks, haptics. Shared helpers for s20/s21.
(function(){
const DK=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};window.FGF_DK=DK;
const vibOn=()=>LS.fgfVib!=='0',buzz=p=>{try{if(vibOn()&&navigator.vibrate)navigator.vibrate(p)}catch(e){}};window.FGF_BUZZ=buzz;
// ---- daily cap for FREE coin rewards (new bonus sources only) ----
const CAP=600;window.FGF_FREE=function(n,label){const k=DK(),c=J('fgfFreeC',{d:'',n:0});if(c.d!==k){c.d=k;c.n=0}const g=Math.max(0,Math.min(n,CAP-c.n));c.n+=g;SV('fgfFreeC',c);if(g>0){addCoins(g);toast((label||'Bonus')+'  🪙 +'+g)}else toast((label||'Bonus')+' · daily bonus cap reached');return g};
// ---- popups ----
const PO=[];window.FGF_POP=(t,c,y)=>PO.push({t,c:c||GOLD,y:y||0.5,t0:performance.now()});
const isCh=()=>['rival','legendc','horse','trick'].includes(mode);
// ---- sound extras ----
const crowdBuild=s=>{if(LS.fgfMute==='1')return;try{noise(1.6+Math.min(s,15)*0.08,900,0.6,Math.min(0.5,0.12+s*0.03),0.3)}catch(e){}};
const chant=()=>{if(LS.fgfMute==='1')return;for(let i=0;i<6;i++)setTimeout(()=>{try{noise(0.12,1500,1,0.35,0.005);thump(120,0.5,0.1)}catch(e){}},i*330)};
const op=sfx.post;sfx.post=function(){const r=op.apply(this,arguments);try{thump(90,0.7,0.14)}catch(e){}buzz([25,30,25]);return r};
// ---- kick types (normal untouched) ----
const ok=kick;kick=function(s){const r=ok.apply(this,arguments);const kt=LS.fgfKT||'n';if(ball&&ball.fly&&kt!=='n'&&!ball._kt){ball._kt=1;const vh=Math.hypot(ball.vx,ball.vz),sp=Math.hypot(vh,ball.vy),a=kt==='l'?0.55:0.92,k=kt==='l'?1:0.97;const nh=sp*k*Math.cos(a);ball.vy=sp*k*Math.sin(a);if(vh>0){ball.vx*=nh/vh;ball.vz*=nh/vh}}return r};
// ---- bad snap / pumpkin / blimp setup per ball ----
let BL=null;
const orb=resetBall;resetBall=function(){orb.apply(this,arguments);if(state!=='play'||(mode==='tut'||mode==='range')||isCh())return;
 if(dist<80&&(+LS.fgfKN||0)>10&&!ball.bonus&&(window.FGF_SNAP||Math.random()<0.05)){ball.snap=(Math.random()<0.5?-1:1);ball.x=ball.snap*0.3}
 const mo=(window.FGF_DATE?new Date(FGF_DATE):new Date()).getMonth();if(mo===9&&!ball.bonus&&!ball.gold&&(window.FGF_PUMP||Math.random()<0.1))ball.pump=1;
 if(!BL&&(window.FGF_BLIMP||Math.random()<1/30))BL={t0:performance.now(),dir:Math.random()<0.5?1:-1}};
// ---- results ----
let lastStreak=0;
const ores=S3.onResult;S3.onResult=function(good){const r=ores.apply(this,arguments);if((mode==='tut'||mode==='range'))return r;const res=ball&&ball.res||'';
 if(good&&res!=='BLOCKED!'){
  if(msg&&/Off the upright/.test(msg.s||'')){FGF_FREE(25,'🔔 DOINK-IN bonus');FGF_POP('🔔 DOINK… IN!','#7fe8ff',0.56)}
  if(Math.abs(ball.x)<0.35){FGF_FREE(15,'🎯 Perfect kick');FGF_POP('🎯 PERFECT!','#7dff6a',0.6)}
  if(ball.pump){FGF_FREE(40,'🎃 Pumpkin smashed');for(let i=0;i<40;i++)parts.push({x:W/2+(Math.random()-0.5)*60,y:H*0.3,vx:(Math.random()-0.5)*260,vy:-Math.random()*200,c:i%2?'#ff7a00':'#5a2d00',l:1.4,g:300,f:1})}
  if(BL&&performance.now()-BL.t0<14000){FGF_FREE(50,'🎈 Blimp bonus');BL=null}
  crowdBuild(streak);if([5,10,15].includes(streak)){chant();FGF_POP('📣 KICK-ER! KICK-ER!','#ffd23f',0.36)}
  if(ball.snap)FGF_POP('💪 Saved the bad snap!','#fff',0.64)}
 else if(!good&&res){const ax=Math.abs(ball.x);let t='';if(/WIDE/.test(res)&&ax<3.08+1.0)t='😬 SO CLOSE!';else if(/OFF THE BAR/.test(res))t='😬 Just under the bar!';else if(/SHORT/.test(res)&&ball.z>dist-4)t='😬 A yard short!';if(t)FGF_POP(t,'#ffb36b',0.58)}
 return r};
// ---- gravity hook for Moon event ----
const oup=update;update=function(dt){const r=oup.apply(this,arguments);if(window.EVT==='moon'&&ball&&ball.fly&&!paused)ball.vy+=10.7*0.45*dt;return r};
// ---- drawing: overlays drawn with the kicker pass ----
const odk=drawKicker;drawKicker=function(){
 if(window.EVT==='night'&&(state==='play'||state==='replay')){ctx.save();ctx.setTransform(ctx.canvas.width/W,0,0,ctx.canvas.height/H,0,0);ctx.fillStyle='rgba(2,4,20,0.5)';ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='lighter';for(const sx of[0.08,0.92]){const g=ctx.createRadialGradient(W*sx,H*0.12,4,W*sx,H*0.12,W*0.5);g.addColorStop(0,'rgba(255,250,220,.55)');g.addColorStop(1,'rgba(255,250,220,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(W*sx,H*0.12,W*0.5,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,255,230,.9)';for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(W*sx-12+i*8,H*0.12,3,0,6.29);ctx.fill()}}ctx.restore()}
 if(BL&&(state==='play')){const a=(performance.now()-BL.t0)/14000;if(a>1)BL=null;else{ctx.save();ctx.setTransform(ctx.canvas.width/W,0,0,ctx.canvas.height/H,0,0);const x=BL.dir>0?-80+a*(W+160):W+80-a*(W+160),y=H*0.13+Math.sin(a*6)*4;ctx.fillStyle='#cfd6de';ctx.strokeStyle='#5b6470';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(x,y,46,15,0,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='#5b6470';ctx.fillRect(x-10,y+13,20,6);ctx.fillStyle='#0b3d1a';ctx.font='900 10px system-ui';ctx.textAlign='center';ctx.fillText('FG FRENZY',x,y+4);ctx.fillStyle=GOLD;ctx.font='900 11px system-ui';ctx.fillText('🎈 Make a kick now: +50',x,y+34);ctx.restore()}}
 const r=odk.apply(this,arguments);
 if(state==='play'&&ball&&!ball.fly){ctx.save();ctx.textAlign='center';ctx.font='900 14px system-ui';
  if(ball.snap){ctx.fillStyle='#ffb36b';ctx.fillText('⚠ BAD SNAP · ball is off-center, adjust your aim',W/2,H*0.36)}
  if(ball.pump){ctx.fillStyle='#ff9a3c';ctx.fillText('🎃 PUMPKIN BALL · smash it through for coins',W/2,H*0.36)}
  if(mode==='career'&&S3.cl&&S3.cl()){const pu=0.6+0.4*Math.sin(T*7);ctx.fillStyle='rgba(255,90,60,'+pu+')';ctx.font='900 17px system-ui';ctx.fillText('⏱ CLUTCH KICK · GAME ON THE LINE',W/2,H*0.36);if(!ball._hb||T-ball._hb>0.8){ball._hb=T;try{thump(60,0.6,0.12);setTimeout(()=>thump(55,0.45,0.1),180)}catch(e){}}}
  ctx.restore()}
 if(ball&&ball.pump){const p=SP(ball.x,ball.y,ball.z);if(p){const R=Math.max(8,Math.min(22,p.s*0.45));ctx.save();ctx.font=(R*1.9|0)+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🎃',p.x,p.y);ctx.restore()}}
 const now=performance.now();for(let i=PO.length-1;i>=0;i--){const o=PO[i],a=(now-o.t0)/1000;if(a>1.8){PO.splice(i,1);continue}ctx.save();const s=1+0.4*Math.max(0,1-a*3);ctx.globalAlpha=Math.min(1,(1.8-a)*2);ctx.translate(W/2,H*o.y-a*24);ctx.scale(s,s);{const tt=window.FGF_TR?FGF_TR(o.t):o.t,long=tt.length>16;let fs=long?Math.min(19,W*0.05):Math.min(30,W*0.075);const mw=W*0.9/s;ctx.font='900 '+fs+'px system-ui';ctx.textAlign='center';ctx.lineJoin='round';let L=[tt];if(ctx.measureText(tt).width>mw){const ws=tt.split(' ');let bst=null;for(let i=1;i<ws.length;i++){const p=ws.slice(0,i).join(' '),q=ws.slice(i).join(' '),m=Math.max(ctx.measureText(p).width,ctx.measureText(q).width);if(!bst||m<bst[2])bst=[p,q,m]}if(bst){L=[bst[0],bst[1]];if(bst[2]>mw)fs*=mw/bst[2]}else fs*=mw/ctx.measureText(tt).width;ctx.font='900 '+fs+'px system-ui'}ctx.lineWidth=Math.max(3,fs*0.2);ctx.strokeStyle='#200';L.forEach((l,k)=>{const yy=(k-(L.length-1)/2)*fs*1.15;ctx.strokeText(l,0,yy);ctx.fillStyle=o.c;ctx.fillText(l,0,yy)})}ctx.restore()}
 return r};
// ---- left-handed: pause button on the left ----
})();
