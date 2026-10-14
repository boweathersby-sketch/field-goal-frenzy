// s21: challenge modes (Legend Challenge, K-I-C-K horse, Trick Shots, Weekend Events), animated CPU/rival kicks, loading screen, PWA
(function(){
const DK=FGF_DK,NOW=()=>window.FGF_DATE?new Date(FGF_DATE):new Date(),tester=()=>!!window.TESTER;
let CH=null,CA=null,skip=0;window.FGF_CH=()=>CH;
// ---- animated CPU kick ----
function cpuAnim(name,made,d,cb){CA={name,made,d,t0:performance.now(),cb,ret:'play'};state='cpuk';try{sfx.kick()}catch(e){}setTimeout(()=>{try{made?sfx.cheer():sfx.groan()}catch(e){}},1150)}
function drawCA(){const a=Math.min(1,(performance.now()-CA.t0)/1700);ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(0,0,W,H);const px=W*0.08,py=H*0.22,pw=W*0.84,ph=H*0.42;ctx.save();ctx.fillStyle='#0f3d1c';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(px,py,pw,ph,16);ctx.fill();ctx.stroke();ctx.beginPath();ctx.roundRect(px,py,pw,ph,16);ctx.clip();
 ctx.fillStyle='#16210f';ctx.fillRect(px,py,pw,ph*0.35);for(let i=0;i<6;i++){ctx.strokeStyle='rgba(255,255,255,.15)';ctx.beginPath();ctx.moveTo(px,py+ph*0.4+i*ph*0.11);ctx.lineTo(px+pw,py+ph*0.4+i*ph*0.11);ctx.stroke()}
 const gx=W/2,gy=py+ph*0.36,hw=pw*0.16;ctx.strokeStyle=GOLD;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(gx,gy+30);ctx.lineTo(gx,gy);ctx.moveTo(gx-hw,gy);ctx.lineTo(gx+hw,gy);ctx.moveTo(gx-hw,gy);ctx.lineTo(gx-hw,gy-ph*0.26);ctx.moveTo(gx+hw,gy);ctx.lineTo(gx+hw,gy-ph*0.26);ctx.stroke();
 const sx=W/2,sy=py+ph*0.92,side=CA.made?0:(CA.d%2?1:-1),ex=gx+side*hw*1.5,ey=gy-ph*(CA.made?0.12:0.04),e=a,bxp=sx+(ex-sx)*e,byp=sy+(ey-sy)*e-Math.sin(e*Math.PI)*ph*0.35,r=10*(1-e*0.6);ctx.fillStyle='#8b4513';ctx.beginPath();ctx.ellipse(bxp,byp,r*1.3,r,e*6,0,6.29);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(bxp-r*0.6,byp);ctx.lineTo(bxp+r*0.6,byp);ctx.stroke();ctx.restore();
 txt('🆚 '+CA.name+' · '+CA.d+' YDS',W/2,py+26,15,'#fff');if(a>=0.7)txt(CA.made?'GOOD! ✅':'NO GOOD ❌',W/2,py+ph*0.62,30,CA.made?GOLD:'#ff6b6b','#200');
 if(a>=1&&performance.now()-CA.t0>2300){const cb=CA.cb;CA=null;state='play';cb()}}
// rival: animate the AI kick before the score moves on
const onx=S3.next;S3.next=function(good){
 if(mode==='rival'&&window.RV_&&RV_()&&!skip){const R=RV_();cpuAnim(R.n,R.last,dist,()=>{skip=1;try{S3.next(good)}finally{skip=0}});return true}
 if(CH&&['legendc','horse','trick'].includes(mode)){try{pendNext=null}catch(e){}return chNext(good)}
 return onx.apply(this,arguments)};
// ---- challenge runner ----
function chStart(type,o){newGame('classic');mode=type;lives=99;prevLives=99;CH=Object.assign({type,n:0,pts:0,log:[]},o||{});dist=CH.d0||30;newWind();resetBall()}
function setD(d){dist=d;newWind();resetBall();lives=99}
const pr=d=>Math.max(0.3,Math.min(0.95,0.97-(d-30)*0.013));
const CPN=['Ace Bot','K-9000','Robo Rex'][Math.random()*3|0];
function chNext(good){const c=CH;c.n++;
 if(c.type==='legendc'){c.made=good;if(good){addCoins(1000);toast('🏆 Legend Challenge prize  🪙 +1000')}state='chres';return true}
 if(c.type==='trick'){const dk=msg&&/Off the upright/.test(msg.s||''),pf=good&&Math.abs(ball.x)<0.35,p=good?1+(pf?2:0)+(dk?4:0):0;c.pts+=p;c.log.push([dist,p]);if(p)FGF_POP('+'+p+' TRICK PTS','#7fe8ff',0.62);if(c.n>=10){const b=+(LS.fgfTrickBest||0);if(c.pts>b)LS.fgfTrickBest=c.pts;addCoins(c.pts*20);state='chres';return true}setD(25+Math.round(Math.random()*25));return true}
 if(c.type==='horse'){// phases: 'shoot' (you set the shot) or 'match' (you must match the CPU)
  if(c.ph==='shoot'){if(good){const cm=Math.random()<pr(dist);cpuAnim(CPN,cm,dist,()=>{if(!cm){c.cpu++;toast('🐴 '+CPN+' gets a letter: '+'KICK'.slice(0,c.cpu))}hNext('cpu')})}else hNext('cpu');return true}
  if(c.ph==='match'){if(!good){c.me++;toast('🐴 You get a letter: '+'KICK'.slice(0,c.me))}hNext('me');return true}}
 return false}
function hNext(sh){const c=CH;if(c.me>=4||c.cpu>=4){c.win=c.cpu>=4;if(c.win){addCoins(400);sfx.cheer()}state='chres';return}
 if(sh==='me'){c.ph='shoot';setD(30+Math.round(Math.random()*25));toast('🐴 Your shot: set the distance');return}
 const d=30+Math.round(Math.random()*25),cm=Math.random()<pr(d);setD(d);cpuAnim(CPN,cm,d,()=>{if(cm){c.ph='match';toast('🐴 Match it from '+d+' yds!')}else hNext('me')})}
window.FGF_LEGENDC=()=>{if(LS.fgfLC===DK()&&!tester()){toast('🏆 One Legend try per day · come back tomorrow');return}LS.fgfLC=DK();chStart('legendc',{d0:80})};
window.FGF_TRICK=()=>chStart('trick',{d0:25+Math.round(Math.random()*25)});
window.FGF_HORSE=()=>{chStart('horse',{me:0,cpu:0,ph:'shoot',d0:30+Math.round(Math.random()*25)});toast('🐴 K-I-C-K: you shoot first')};
// ---- weekend events ----
const EVS=[['snow','❄️ SNOW BOWL','Snow all game long'],['night','🌙 NIGHT GAME','Under the lights'],['moon','🌕 MOON GRAVITY','Low gravity, huge kicks']];
const wkN=()=>{const d=NOW();return Math.floor((d-new Date(2026,0,5))/6048e5)};const cur=()=>EVS[((wkN()%3)+3)%3];
window.FGF_EVTON=()=>{const g=NOW().getDay();return tester()||g===5||g===6||g===0};
window.FGF_EVTNAME=()=>FGF_EVTON()?cur()[1]+' · live now':'Next: '+cur()[1]+' (Fri–Sun)';
window.FGF_EVENT=()=>{if(!FGF_EVTON()){toast('Weekend events run Friday to Sunday');return}const e=cur();window.EVT=e[0];window.__wx=e[0]==='snow'?'snow':null;newGame('classic');window.__evg=1;toast(e[1]+' · '+e[2])};
setInterval(()=>{if(state==='over'&&window.EVT&&window.__evg){window.__evg=0;const k=FGF_WK();if(LS.fgfEVr!==k){LS.fgfEVr=k;addCoins(250);toast('🌟 Weekend event reward  🪙 +250')}}},300);
// ---- screens ----
const osc=S3.screen;S3.screen=function(){
 if(state==='cpuk'&&CA){BTN=[];drawCA();return true}
 if(state==='chres'&&CH){BTN=[];const c=CH;panel(W*0.08,H*0.22,W*0.84,H*0.5);
  if(c.type==='legendc'){txt(c.made?'🏆 LEGEND!':'SO CLOSE…',W/2,H*0.3,32,c.made?GOLD:'#ff6b6b','#063');txt(c.made?'80 yards · 🪙 +1000 prize (+500 jackpot)':'No good from 80. One free try a day.',W/2,H*0.37,14,'#fff');if(c.made)bx(W*0.2,H*0.43,W*0.6,46,'📤 SHARE',()=>share('I just nailed an 80-yard LEGEND kick'),true,16)}
  if(c.type==='trick'){txt('🎯 TRICK SHOTS',W/2,H*0.29,26,GOLD,'#063');txt(c.pts+' pts',W/2,H*0.37,40,'#fff');txt('Best '+(+(LS.fgfTrickBest||0))+' · 🪙 +'+c.pts*20,W/2,H*0.43,14,'#bcd');txt('Make 1 · Perfect +2 · Doink-in +4',W/2,H*0.47,12,'#9ab')}
  if(c.type==='horse'){txt(c.win?'🐴 YOU WIN!':'🐴 '+CPN+' WINS',W/2,H*0.29,28,c.win?GOLD:'#ff6b6b','#063');txt('YOU '+('KICK'.slice(0,c.me)||'—')+'   ·   CPU '+('KICK'.slice(0,c.cpu)||'—'),W/2,H*0.37,18,'#fff');txt(c.win?'🪙 +400':'Spell K-I-C-K and you lose',W/2,H*0.43,14,GOLD)}
  bx(W*0.1,H*0.62,W*0.38,46,'AGAIN',()=>{const t=c.type;CH=null;t==='legendc'?FGF_LEGENDC():t==='trick'?FGF_TRICK():FGF_HORSE()},false,15);bx(W*0.52,H*0.62,W*0.38,46,'EVENTS',()=>{CH=null;mode='classic';state='hub'},true,15);return true}
 const r=osc.apply(this,arguments);
 if(state==='play'&&CH){ctx.save();ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillStyle=GOLD;const c=CH;ctx.fillText(c.type==='legendc'?'🏆 LEGEND CHALLENGE · one try':c.type==='trick'?'🎯 TRICK '+(c.n+1)+'/10 · '+c.pts+' pts':'🐴 YOU '+('KICK'.slice(0,c.me)||'—')+' · CPU '+('KICK'.slice(0,c.cpu)||'—')+(c.ph==='match'?' · MATCH IT':' · YOUR SHOT'),W/2,H*0.155);ctx.restore()}
 if(state==='play'&&window.EVT&&!CH){ctx.save();ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillStyle='#bfe6ff';ctx.fillText(cur()[1],W/2,H*0.155);ctx.restore()}
 return r};
// ---- loading screen + PWA ----
const ld=document.getElementById('ld');if(ld){const done=()=>{ld.style.opacity='0';setTimeout(()=>ld.remove(),450)};if(document.readyState==='complete')setTimeout(done,500);else addEventListener('load',()=>setTimeout(done,500))}
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')&&!window.FGF_NOSW)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();
