'use strict';
// ===== Stage 4: daily challenge, replays, feel, achievements, tutorial =====
const S4={};window.S4=S4;
const dkey=d=>d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
function rng(seed){let h=1779033703^seed.length;for(let i=0;i<seed.length;i++){h=Math.imul(h^seed.charCodeAt(i),3432918353);h=h<<13|h>>>19}return()=>{h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);return((h^=h>>>16)>>>0)/4294967296}}
// ---- achievements ----
const ACH=[['first','First Points','Make your first field goal',25],['fifty','Fifty Club','Make a 50+ yarder',100],['sixty','Sixty Something','Make a 60+ yarder',200],['legend','Legend','Make an 80-yard kick',500],['ice','Ice in the Veins','5 makes in a row kicking late (rush meter hot)',300],['wx','Weatherman','Make a kick in every weather',400],['storm','Eye of the Storm','Make a 60+ in Hurricane mode',400],['streak10','Hot Foot','10 makes in a row',200],['clutch','Clutch Gene','Make a Career game-winner',150],['title','First Title','Win a Career championship',500],['perfect','Perfect Season','Go 16-0 in a Career season',1000],['daily7','Daily Devotion','7-day Daily Challenge streak',300]];
let AD=J('fgfAch',{}),WXM=J('fgfWx',[]),iceN=0,late=false;
function unlock(id){if(AD[id])return;const a=ACH.find(x=>x[0]===id);AD[id]=today;SV('fgfAch',AD);addCoins(a[3]);toast('🎖️ '+a[1]+'  🪙 +'+a[3]);sfx.cheer()}
// ---- trajectory + replay ----
let TR=[],RP=null,pendNext=null,zoomT=0,zp=null;
const oKick=S3.onKick;S3.onKick=function(pw){late=waitT>=4;TR=[];RP=null;// sharper thunk
 const c=au();if(c){thump(180,0.9,0.06);noise(0.035,3200,1.2,0.5,0.001);noise(0.06,600,2,0.4,0.002)}vib(25);if(mode==='daily'||mode==='tut')return false;return oKick(pw)};
const oRes=S3.onResult;S3.onResult=function(good){oRes(good);const blk=ball.res==='BLOCKED!';
 if(good){zoomT=0.55;unlock('first');if(dist>=50)unlock('fifty');if(dist>=60)unlock('sixty');if(dist>=80)unlock('legend');if(mode==='hurricane'&&dist>=60)unlock('storm');if(streak>=10)unlock('streak10');if(!WXM.includes(weather)){WXM.push(weather);SV('fgfWx',WXM)}if(['clear','rain','snow','gust','hurricane','hlite','fog','heat'].every(w=>WXM.includes(w)))unlock('wx');if(S3.cl())unlock('clutch');
  if(late){iceN++;if(iceN>=5)unlock('ice')}else iceN=0;
  if((dist>=50||S3.cl())&&TR.length>8&&mode!=='tut')pendNext={good,cl:S3.cl()}}else iceN=0;
 if(mode==='daily')dailyDone(good);if(mode==='tut')tutRes(good)};
const oNext=S3.next;S3.next=function(good){if(pendNext&&!RP){RP={t:0,good,cl:pendNext.cl};pendNext=null;state='replay';return true}if(mode==='daily'){state='dres';return true}if(mode==='tut'){tutNext();return true}return oNext(good)};
function contAfter(good){if(!RP)return;const g=RP.good;RP=null;if(mode==='daily'){state='dres';return}if(oNext(g))return;if(lives<=0||(mode==='time'&&timeLeft<=0)){endGame();return}if(g)dist=Math.min(mode==='hurricane'?65:80,dist+(dist<40?3:dist<70?2:dist<76?2:4));state='play';newWind();resetBall()}
S3.cam=function(){if(zoomT>0&&zp){const k=Math.sin(Math.min(1,zoomT/0.55)*Math.PI)*0.12;ctx.translate(zp.x,zp.y);ctx.scale(1+k,1+k);ctx.translate(-zp.x,-zp.y)}};
const oTop=S3.top;S3.top=function(dt){if(state==='play'&&ball.fly&&!paused)TR.push({x:ball.x,y:ball.y,z:ball.z,r:ball.rot});if(zoomT>0)zoomT-=dt;{const b=P(0,BAR,dist);if(b)zp={x:b.x,y:b.y+OFF}}
 if(state==='replay'&&RP){RP.t+=dt*0.35;const i=Math.min(TR.length-1,Math.floor(RP.t*60)),p=TR[i];Object.assign(ball,{x:p.x,y:p.y,z:p.z,rot:p.r,fly:true});trail=TR.slice(Math.max(0,i-18),i+1).map(q=>({x:q.x,y:q.y,z:q.z}));if(TR[i-1]&&TR[i-1].z<dist&&p.z>=dist)zoomT=0.55;if(i>=TR.length-1&&RP.t*60>TR.length+40)contAfter()}
 if(state==='play'&&mode==='tut')tutDraw();oTop(dt);
 if(CAR&&CAR.st&&CAR.st.ti>0)unlock('title');if(CAR&&CAR.res&&CAR.res.length>=16&&CAR.res.slice(0,16).every(r=>r==='W'))unlock('perfect')};
function share(txt0){const url='https://boweathersby-sketch.github.io/field-goal-frenzy/',text=txt0+' 🏈 Field Goal Frenzy';if(navigator.share){navigator.share({title:'Field Goal Frenzy',text,url}).catch(()=>{})}else if(navigator.clipboard){navigator.clipboard.writeText(text+' '+url).then(()=>toast('📋 Copied to clipboard'),()=>toast('Could not copy'))}else toast(url)}
// ---- daily ----
function DL(){return J('fgfDaily',{day:'',done:false,made:false,streak:0,last:''})}
function dailyCfg(){const r=rng('fgf-'+dkey(new Date())),d=45+Math.floor(r()*21),wx=['clear','rain','snow','gust','fog','heat'][Math.floor(r()*6)],mph=Math.floor(r()*14),a=r()*6.283;return{d,wx,mph,a}}
function cdStr(){const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);const s=Math.max(0,(m-n)/1000|0);return Math.floor(s/3600)+'h '+String(Math.floor(s%3600/60)).padStart(2,'0')+'m '+String(s%60).padStart(2,'0')+'s'}
S4.dailyLine=()=>{const d=DL();if(d.day===dkey(new Date())&&d.done)return(d.made?'✔ Made it':'✖ Missed')+' · next in '+cdStr()+' · 🔥'+d.streak;const c=dailyCfg();return c.d+' yds · '+c.wx+' · one shot · 🔥 streak '+d.streak};
S4.daily=()=>{const d=DL();if(d.day===dkey(new Date())&&d.done){state='dres';return}const c=dailyCfg();mode='daily';newGame('daily');lives=1;dist=c.d;weather=c.wx;wind={mph:c.mph,a:c.a,x:Math.sin(c.a)*c.mph,z:Math.cos(c.a)*c.mph*0.3};resetBall();bannerT=0;toast('📅 DAILY · '+c.d+' YDS · ONE SHOT')};
function dailyDone(good){const d=DL(),t=dkey(new Date()),y=new Date();y.setDate(y.getDate()-1);d.streak=good?(d.last===dkey(y)?d.streak+1:1):0;if(good)d.last=t;d.day=t;d.done=true;d.made=good;let rw=0;if(good){rw=150+(dist-45)*10;addCoins(rw)}d.rw=rw;d.dist=dist;SV('fgfDaily',d);if(d.streak>=7)unlock('daily7')}
// ---- tutorial ----
const TUT=[{d:25,mph:0,a:0,h:'Swipe STRAIGHT UP from the ball',s:'Nice and smooth. Aim for the middle.'},{d:30,mph:12,a:-Math.PI/2,h:'Wind blows LEFT ← · curve your swipe RIGHT into it',s:'Bend your swipe like a ) to fight the wind.'},{d:45,mph:0,a:0,h:'Long kick! Swipe FAST for full power',s:'Speed = power. Watch the KICK POWER bar.'}];let TS=0,tutMsg='';
S4.tut=()=>{TS=0;mode='tut';newGame('tut');tutSet()};
function tutSet(){const t=TUT[TS];dist=t.d;weather='clear';wind={mph:t.mph,a:t.a,x:Math.sin(t.a)*t.mph,z:0};resetBall();msg=null;state='play'}
function tutRes(good){msg.s=good?['Perfect! 🎯','You fought the wind! 💨','BOOM! 💥'][TS]:'Close! '+TUT[TS].s}
function tutNext(){TS++;if(TS>=TUT.length){LS.fgfTut='1';state='title';toast('🎓 Tutorial done! Good luck');return}tutSet()}
function tutEnd(){LS.fgfTut='1';state='title'}
function tutDraw(){if(msg||ball.fly)return;const t=TUT[TS];const Y=H*0.185;panel(W*0.05,Y,W*0.9,74);txt('TUTORIAL '+(TS+1)+'/3',W/2,Y+22,15,GOLD);ctx.fillStyle='#fff';ctx.font='bold 14px system-ui';ctx.textAlign='center';ctx.fillText(t.h,W/2,Y+44);ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.fillText(t.s,W/2,Y+62);
 ctx.fillStyle='rgba(6,30,16,0.9)';ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(W*0.95-72,Y+6,64,22,11);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.font='bold 11px system-ui';ctx.fillText('SKIP ▶▶',W*0.95-40,Y+21);
 // guide arrow
 const tee=TEE(),ph=(T*0.9)%1;ctx.save();ctx.globalAlpha=Math.sin(ph*Math.PI)*0.8;ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();const x0=W*0.55,y0=H*0.85,x1=W*0.55,y1=H*0.55;ctx.moveTo(x0,y0);if(TS===1)ctx.quadraticCurveTo(W*0.75,H*0.7,x1,y1);else ctx.lineTo(x1,y0-(y0-y1)*ph);ctx.stroke();ctx.restore()}
addEventListener('pointerdown',e=>{if(state==='play'&&mode==='tut'&&!ball.fly&&!msg){const x=e.clientX,y=e.clientY;if(Math.abs(x-(W*0.95-40))<40&&Math.abs(y-(H*0.185+17))<18){e.stopImmediatePropagation();tutEnd()}}},true);
if(!LS.fgfTut){const go2=()=>{if(state==='title'&&team>=0){S4.tut()}else setTimeout(go2,400)};setTimeout(go2,300)}
// ---- screens ----
const oScreen=S3.screen;S3.screen=function(){if(state==='replay'){BTN=[];drawReplay();return true}if(state==='dres'){BTN=[];drawDres();return true}if(state==='ach'){BTN=[];drawAch();return true}return oScreen()};
function drawReplay(){const a=0.6+0.4*Math.sin(T*6);ctx.fillStyle='rgba(200,20,20,'+(0.85)+')';ctx.beginPath();ctx.roundRect(12,160,96,30,6);ctx.fill();ctx.fillStyle='#fff';ctx.globalAlpha=a;ctx.beginPath();ctx.arc(28,175,6,0,7);ctx.fill();ctx.globalAlpha=1;ctx.font='900 14px system-ui';ctx.textAlign='left';ctx.fillText('REPLAY',40,180);ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(0,0,W,8);ctx.fillRect(0,H-8,W,8);
 txt((RP&&RP.cl?'GAME-WINNER! ':'')+dist+' YARDS',W/2,H*0.3,Math.min(30,W*0.075),GOLD);ctx.fillStyle='#ddd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('0.35× slow motion',W/2,H*0.3+20);
 bx(W*0.08,H-110,W*0.4,44,'📤 SHARE',()=>share('I just drilled a '+dist+'-yard field goal'+(RP&&RP.cl?' to win the game':'')+'!'),false,15);bx(W*0.52,H-110,W*0.4,44,'SKIP ▶▶',()=>contAfter(),true,15)}
function drawDres(){const d=DL();txt('DAILY CHALLENGE',W/2,H*0.16,Math.min(30,W*0.08),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText(new Date().toDateString()+' · same kick for everyone',W/2,H*0.16+24);
 txt(d.made?'NAILED IT!':'MISSED',W/2,H*0.32,Math.min(46,W*0.12),d.made?GOLD:'#ff5a4f');txt((d.dist||dailyCfg().d)+' YDS',W/2,H*0.4,26,'#fff');if(d.rw)txt('🪙 +'+d.rw,W/2,H*0.47,24,GOLD);txt('🔥 STREAK '+d.streak,W/2,H*0.54,22,'#ff9a3c');ctx.fillStyle='#fff';ctx.font='bold 15px system-ui';ctx.fillText('Come back tomorrow · '+cdStr(),W/2,H*0.6);
 bx(W/2-110,H*0.66,220,46,'📤 SHARE',()=>share((d.made?'I made':'I missed')+' today\'s '+(d.dist||'')+'-yd Daily Challenge · streak '+d.streak),false,16);bx(W/2-90,H*0.75,180,42,'◀ MENU',()=>state='title',true,15)}
function drawAch(){txt('ACHIEVEMENTS',W/2,H*0.07,Math.min(30,W*0.08),GOLD,'#063');const n=ACH.filter(a=>AD[a[0]]).length;ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText(n+' / '+ACH.length+' unlocked',W/2,H*0.07+22);const rh=Math.min(54,H*0.74/12);
 ACH.forEach((a,i)=>{const y=H*0.12+i*rh,u=AD[a[0]];ctx.globalAlpha=u?1:0.6;panel(W*0.04,y,W*0.92,rh-4);ctx.font='20px system-ui';ctx.textAlign='left';ctx.fillText(u?'🏅':'🔒',W*0.07,y+rh*0.62);ctx.fillStyle=u?GOLD:'#fff';ctx.font='900 13px system-ui';ctx.fillText(a[1],W*0.17,y+rh*0.42);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText(a[2],W*0.17,y+rh*0.75);ctx.textAlign='right';ctx.fillStyle=u?'#5f5':GOLD;ctx.font='bold 12px system-ui';ctx.fillText(u?'✔':'🪙 '+a[3],W*0.93,y+rh*0.58);ctx.globalAlpha=1});bx(W/2-80,H*0.94-18,160,36,'◀ BACK',()=>state='title',false,14)}
