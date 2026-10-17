// s15: more achievements, Nov/Dec events, Rival mode, tutorial from How to Play, Legend share card, golden ball
(function(){
const D=window.FGF_DATE?new Date(FGF_DATE):new Date(),MO=D.getMonth();
// ---- achievements ----
[[0,'golden','Golden Touch','Make a golden ball kick',150],[0,'rival','Rival Slayer','Win a Rival match',150],[1,'doink','Doink Master','Hit the uprights 5 times',200],[1,'ls7','Loyal Kicker','Reach day 7 of the login streak',300]].forEach(a=>{if(!TRO.some(b=>b[1]===a[1])){const i=TRO.map(q=>q[0]).lastIndexOf(a[0]);TRO.splice(i+1,0,a)}});
const olc=lsClaim;lsClaim=function(){const r=olc.apply(this,arguments);if(LSS&&LSS.day>=7)unlock('ls7');return r};
// ---- seasonal items (same pattern as Halloween) ----
const EV={10:{end:'🦃 LIMITED · ends Nov 30',it:{CLEATS:['c10','Turkey Trot Cleats 🦃',1500,'p',.03],TRAILS:['t10','Autumn Leaves 🍂',1200,'p',0],CELEBRATE:['e10','Turkey Bowl 🦃',1500,'p',0]}},11:{end:'🎄 LIMITED · ends Dec 31',it:{CLEATS:['c11','Candy Cane Cleats 🎄',1500,'p',.03],TRAILS:['t11','Candy Cane Trail',1200,'p',0],CELEBRATE:['e11','Snow Globe ❄️',1500,'p',0]}}};
window.FGF_LIMITED=window.FGF_LIMITED||{};
for(const m in EV){const e=EV[m];for(const tb of SHOP){const it=e.it[tb[0]];if(!it)continue;FGF_LIMITED[it[0]]=e.end;if((+m===MO||own.includes(it[0]))&&!tb[1].some(a=>a[0]===it[0]))tb[1].push(it)}}
const otr=S3.trail;S3.trail=function(a){return eq.t==='t10'?'hsla('+(18+a*25|0)+',90%,'+(40+a*15|0)+'%,'+a+')':eq.t==='t11'?(((a*12)|0)%2?'rgba(255,255,255,'+a+')':'rgba(230,30,50,'+a+')'):otr.apply(this,arguments)};
const burst=cs=>{const x=W*(0.2+Math.random()*0.6),y=H*(0.15+Math.random()*0.25);for(let i=0;i<40;i++){const a=i/40*6.28,v=80+Math.random()*80;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,c:cs[i%cs.length],l:1.4,g:90,f:1})}};
const GLOW={c10:'200,120,40',c11:'235,40,60'};
const odk=drawKicker;drawKicker=function(){const col=GLOW[eq.c];if(col&&KS.complete&&KS.naturalWidth){const {x,y,w,h}=KG(),cx=x+w*0.42,cy=Math.min(y+h*0.96,ctx.getTransform().inverse().transformPoint({x:0,y:ctx.canvas.height-16*(ctx.canvas.height/H)}).y);ctx.save();ctx.translate(cx,cy);ctx.scale(1,0.5);const g=ctx.createRadialGradient(0,0,0,0,0,w*0.6);g.addColorStop(0,'rgba('+col+',.8)');g.addColorStop(0.45,'rgba('+col+',.35)');g.addColorStop(1,'rgba('+col+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,w*0.6,0,6.29);ctx.fill();ctx.restore()}
 if(MO===11&&(state==='play'||state==='replay')){ctx.save();ctx.setTransform(ctx.canvas.width/W,0,0,ctx.canvas.height/H,0,0);ctx.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<120;i++){const sx=(i*97.3+Math.sin(T*0.7+i)*18)%W,sy=((i*61.7)+T*(30+i%5*9))%H,r=1.6+i%3*0.9;ctx.beginPath();ctx.arc((sx+W)%W,sy,r,0,6.29);ctx.fill()}const sg=ctx.createLinearGradient(0,H*0.55,0,H);sg.addColorStop(0,'rgba(235,245,255,.08)');sg.addColorStop(1,'rgba(240,248,255,.28)');ctx.fillStyle=sg;ctx.fillRect(0,H*0.55,W,H*0.45);ctx.restore()}
 return odk.apply(this,arguments)};
// ---- golden ball ----
const orb=resetBall;resetBall=function(){orb.apply(this,arguments);if(state==='play'&&(mode!=='tut'&&mode!=='range')&&(window.FGF_GOLD||Math.random()<0.03))ball.gold=1};
const odb=drawBall;drawBall=function(){const r=odb.apply(this,arguments);if(ball&&ball.gold){const p=SP(ball.x,ball.y,ball.z);if(p){const R=Math.max(8,Math.min(22,p.s*0.45));ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,R*1.6);g.addColorStop(0,'rgba(255,215,60,.85)');g.addColorStop(1,'rgba(255,190,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,R*1.6,0,6.29);ctx.fill();ctx.fillStyle='#fff6c0';for(let i=0;i<6;i++){const a=T*3+i*1.047,d=R*(1.1+0.3*Math.sin(T*7+i)),s=2+1.5*Math.abs(Math.sin(T*5+i));const sx=p.x+Math.cos(a)*d,sy=p.y+Math.sin(a)*d;ctx.beginPath();ctx.moveTo(sx,sy-s*2);ctx.lineTo(sx+s*0.5,sy);ctx.lineTo(sx,sy+s*2);ctx.lineTo(sx-s*0.5,sy);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(sx-s*2,sy);ctx.lineTo(sx,sy+s*0.5);ctx.lineTo(sx+s*2,sy);ctx.lineTo(sx,sy-s*0.5);ctx.closePath();ctx.fill()}ctx.restore();if(!ball.fly){ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillStyle=GOLD;ctx.fillText('✨ GOLDEN BALL ✨',p.x,p.y-R*2)}}}return r};
// ---- rival mode ----
let RV=null;window.RV_=()=>RV;
function rvStart(tier){tier=tier||'pro';const t=[0,1,2,3,4,5,6,7].filter(i=>i!==myT())[Math.random()*7|0];newGame('classic');mode='rival';RV={t,n:TEAMS[t].rv||'Rival',r:0,me:0,ai:0,log:[],tier,base:tier==='legend'?40:30,prize:{rookie:200,pro:400,legend:800}[tier]};lives=3;prevLives=3;dist=RV.base;newWind();resetBall()}
window.rvStart=rvStart;
const ores=S3.onResult;S3.onResult=function(good){const r=ores.apply(this,arguments);
 if(ball&&ball.res&&/DOINK/.test(ball.res)){const n=(+LS.fgfDoinks||0)+1;LS.fgfDoinks=n;if(n>=5)unlock('doink')}
 if(good&&ball&&ball.gold){const gc=mode==='classic'?90:150;addCoins(gc);toast('✨ GOLDEN BALL  🪙 +'+gc);unlock('golden');burst(['#ffd23f','#fff6c0','#ffb300'])}
 if(good&&eq.e==='e10'&&ball.res!=='BLOCKED!')for(let i=0;i<5;i++)setTimeout(()=>burst(['#8b4513','#ff8c1a','#ffd23f']),i*280);
 if(good&&eq.e==='e11'&&ball.res!=='BLOCKED!')for(let i=0;i<5;i++)setTimeout(()=>burst(['#ffffff','#bfe6ff','#e6283c','#2fbf4f']),i*280);
 if(mode==='rival'&&RV){if(good)RV.me++;const pr=Math.max(0.2,Math.min(0.97,0.97-(dist-30)*0.013+({rookie:-0.2,pro:0,legend:0.05})[RV.tier||'pro']));const ag=Math.random()<pr;if(ag)RV.ai++;RV.log.push([good,ag,dist]);RV.last=ag;msg.s='YOU '+RV.me+'  ·  '+RV.n.split(' ')[0].toUpperCase()+' '+RV.ai;try{pendNext=null}catch(e){}}
 return r};
const onx=S3.next;S3.next=function(good){if(mode==='rival'&&RV){RV.r++;if(RV.r>=5&&RV.me!==RV.ai){RV.win=RV.me>RV.ai;if(RV.win){addCoins(RV.prize||300);unlock('rival');sfx.cheer()}else{addCoins(50);sfx.groan()}state='rres';return true}lives=3;prevLives=3;dist=(RV.base||30)+Math.min(RV.r,6)*8;newWind();resetBall();return true}return onx.apply(this,arguments)};
// ---- share card for Legend ----
const osh=share;share=function(t){const r=osh.apply(this,arguments);if(/80-yard LEGEND/.test(t)){try{const c=document.createElement('canvas');c.width=1080;c.height=1350;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,0,1350);g.addColorStop(0,'#1b0b3a');g.addColorStop(1,'#04140a');x.fillStyle=g;x.fillRect(0,0,1080,1350);
 const sw=cv.width,sh=cv.height,cw=920,ch=Math.min(760,cw*sh/sw*0.62),sy=sh*0.12,shh=Math.min(sh-sy,sw*ch/cw);x.save();x.beginPath();x.roundRect?x.roundRect(80,250,cw,ch,28):x.rect(80,250,cw,ch);x.clip();x.drawImage(cv,0,sy,sw,shh,80,250,cw,ch);x.restore();x.strokeStyle='#f2c230';x.lineWidth=8;x.strokeRect(80,250,cw,ch);
 x.textAlign='center';x.fillStyle='#f2c230';x.font='900 64px system-ui';x.fillText('🏈 FIELD GOAL FRENZY',540,110);x.fillStyle='#fff';x.font='800 34px system-ui';x.fillText('LEGEND KICK',540,170);
 const T0=TEAMS[myT()];x.fillStyle='#f2c230';x.font='900 150px system-ui';x.fillText(Math.round(dist)+' YARDS',540,250+ch+160);x.fillStyle='#fff';x.font='800 44px system-ui';x.fillText(S5.who()+' · '+(T0&&T0.n||''),540,250+ch+230);x.fillStyle='#bcd';x.font='32px system-ui';x.fillText('Can you beat it? '+URL0.replace('https://',''),540,1300);
 SH.img=c.toDataURL('image/jpeg',0.9);c.toBlob(bl=>{if(SH&&bl)SH.file=new File([bl],'field-goal-frenzy-legend.jpg',{type:'image/jpeg'})},'image/jpeg',0.9);SH.card=1}catch(e){}}return r};
// ---- screens ----
const osc=S3.screen;S3.screen=function(){
 if(state==='rres'&&RV){BTN=[];panel(W*0.08,H*0.22,W*0.84,H*0.5);txt(RV.win?'🏆 YOU WIN!':'RIVAL WINS',W/2,H*0.29,30,RV.win?GOLD:'#ff6b6b','#063');txt('vs '+RV.n,W/2,H*0.335,15,'#cfe');txt(RV.me+' – '+RV.ai,W/2,H*0.42,54,'#fff','#063');RV.log.forEach((l,i)=>txt('R'+(i+1)+' · '+l[2]+' yds   YOU '+(l[0]?'✅':'❌')+'   RIVAL '+(l[1]?'✅':'❌'),W/2,H*0.47+i*20,13,'#dde'));txt(RV.win?'🪙 +'+(RV.prize||300)+' prize':'🪙 +50 for showing up',W/2,H*0.68,16,GOLD);bx(W*0.1,H*0.76,W*0.38,46,'REMATCH',()=>rvStart(RV.tier),true);bx(W*0.52,H*0.76,W*0.38,46,'MENU',()=>{state='title';mode='classic'});return true}
 const r=osc.apply(this,arguments);
 if(state==='board')bx(W*0.06,H*0.79,W*0.41,36,'🆚 RIVAL',()=>state='rvt',false,13);
 if(state==='wlb')bx(W*0.53,H*0.88,W*0.41,44,'🆚 RIVAL',()=>state='rvt',false,13);
 if(state==='howto')bx(W*0.06,H*0.915-20,W*0.41,42,'📖 TUTORIAL',()=>{HT.y=0;S4.tut()},false,14);
 if(state==='play'&&mode==='rival'&&RV){ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillStyle=GOLD;ctx.fillText('🆚 '+RV.n+' · R'+(RV.r+1)+(RV.r>=5?' SD':'/5')+' · YOU '+RV.me+' – '+RV.ai,W/2,H*0.155)}
 return r};
})();
