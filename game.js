'use strict';
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
let W,H,DPR,F,HY,bg;const CAMY=1.5,CAMZ=-8,G=10.7,HALF=3.08,BAR=3.33,POST=11;
const GREEN='#0f6b3a',GOLD='#f2c230';
// ---------- audio ----------
let AC=null;function au(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function noise(d,f,q,v,a=0.01){const c=au();if(!c)return;const b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),x=b.getChannelData(0);for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const fl=c.createBiquadFilter();fl.type='bandpass';fl.frequency.value=f;fl.Q.value=q;const g=c.createGain(),t=c.currentTime;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(0.001,t+d);s.connect(fl).connect(g).connect(c.destination);s.start()}
function tone(f1,f2,d,v,type='sine'){const c=au();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.type=type;o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);o.connect(g).connect(c.destination);o.start();o.stop(t+d)}
const sfx={kick(){tone(140,45,0.18,0.9);noise(0.08,900,1,0.6,0.002)},cheer(){noise(2.2,1400,0.6,0.55,0.25);noise(2.0,600,0.8,0.35,0.3)},groan(){noise(1.4,350,1.2,0.4,0.2);tone(220,110,1.0,0.12,'sawtooth')},post(){tone(1200,1150,0.5,0.25,'triangle');tone(1850,1800,0.4,0.12)},whistle(){tone(2600,2500,0.5,0.15,'square')}};
// ---------- state ----------
let state='title',score=0,streak=0,best=+(localStorage.fgfBest||0),lives=3,dist=20,wind={x:0,z:0,mph:0},ball,msg=null,msgT=0,kickT=0,shake=0,swipe=null,trail=[],flash=0,parts=[];
function newWind(){const lvl=Math.min(1,(dist-20)/30),mph=Math.round(Math.random()*(4+lvl*14)),a=Math.random()*Math.PI*2;wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph}}
function resetBall(){ball={x:0,y:0.15,z:0,vx:0,vy:0,vz:0,ax:0,rot:0,spin:0,fly:false,done:false,res:null,hitPost:false};trail=[]}
function newGame(){score=0;streak=0;lives=3;dist=20;newWind();resetBall();state='play';msg=null}
// ---------- layout / background ----------
function resize(){DPR=Math.min(2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);F=Math.min(W,H*0.62)*1.4;HY=H*0.53;buildBg()}
function P(x,y,z){const d=z-CAMZ;if(d<0.3)return null;const s=F/d;return{x:W/2+x*s,y:HY-(y-CAMY)*s,s}}
function buildBg(){bg=document.createElement('canvas');bg.width=W*DPR;bg.height=H*DPR;const b=bg.getContext('2d');b.setTransform(DPR,0,0,DPR,0,0);
 let g=b.createLinearGradient(0,0,0,HY);g.addColorStop(0,'#050a18');g.addColorStop(1,'#1b2c55');b.fillStyle=g;b.fillRect(0,0,W,HY+2);
 for(let i=0;i<40;i++){b.fillStyle='rgba(255,255,255,'+Math.random()*0.6+')';b.fillRect(Math.random()*W,Math.random()*HY*0.35,1.2,1.2)}
 // stands
 const top=HY-H*0.17;b.fillStyle='#1a1f2e';b.beginPath();b.moveTo(-10,HY);b.lineTo(-10,top+20);b.quadraticCurveTo(W/2,top-25,W+10,top+20);b.lineTo(W+10,HY);b.fill();
 const cols=['#0f6b3a','#f2c230','#e8e8e8','#0f6b3a','#c0392b','#2c6fd1','#f2c230','#666'];
 for(let y=top;y<HY-4;y+=4)for(let x=0;x<W;x+=4){const cy=top+20-45*(1-Math.pow((x-W/2)/(W/2),2))*0.55;if(y<cy)continue;b.fillStyle=cols[(Math.random()*cols.length)|0];b.globalAlpha=0.35+Math.random()*0.5;b.fillRect(x+Math.random(),y+Math.random(),2.2,2.2)}
 b.globalAlpha=1;b.fillStyle='#0d1220';b.fillRect(0,HY-8,W,8);b.fillStyle=GOLD;b.fillRect(0,HY-8,W,1.5);
 // light towers
 for(const lx of [W*0.08,W*0.92]){b.fillStyle='#2a3142';b.fillRect(lx-2,top-70,4,90);b.fillStyle='#333a4d';b.fillRect(lx-22,top-92,44,24);
  for(let i=0;i<4;i++)for(let j=0;j<2;j++){b.fillStyle='#fffbe6';b.fillRect(lx-19+i*10,top-89+j*10,7,7)}
  const rg=b.createRadialGradient(lx,top-80,0,lx,top-80,W*0.5);rg.addColorStop(0,'rgba(255,250,220,0.55)');rg.addColorStop(0.15,'rgba(255,250,220,0.15)');rg.addColorStop(1,'rgba(255,250,220,0)');b.fillStyle=rg;b.fillRect(0,0,W,H)}
 // scoreboard
 b.fillStyle='#111';b.fillRect(W/2-46,top-60,92,34);b.strokeStyle=GOLD;b.lineWidth=2;b.strokeRect(W/2-46,top-60,92,34);b.fillStyle=GOLD;b.font='bold 11px system-ui';b.textAlign='center';b.fillText('WOLVES',W/2,top-46);b.fillStyle='#f55';b.fillText('HOME',W/2,top-33);
 // field
 g=b.createLinearGradient(0,HY,0,H);g.addColorStop(0,'#0e4d22');g.addColorStop(1,'#1d7a35');b.fillStyle=g;b.fillRect(0,HY,W,H-HY)}
// ---------- input ----------
function pt(e){return{x:e.clientX,y:e.clientY,t:performance.now()}}
cv.addEventListener('pointerdown',e=>{au();const p=pt(e);
 if(state==='title'||state==='over'){const bx=W/2,by=H*0.68;if(Math.abs(p.x-bx)<120&&Math.abs(p.y-by)<40){sfx.whistle();newGame()}return}
 if(state==='play'&&Math.hypot(p.x-(W-40),p.y-(H-44))<30){paused=!paused;swipe=null;return}if(paused){paused=false;return}
 if(state==='play'&&!ball.fly&&!msg)swipe=[p]});
cv.addEventListener('pointermove',e=>{if(swipe)swipe.push(pt(e))});
const end=e=>{if(!swipe)return;swipe.push(pt(e));const s=swipe;swipe=null;kick(s)};
cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',()=>swipe=null);
function kick(s){const a=s[0],b=s[s.length-1],dy=a.y-b.y,dx=b.x-a.x,len=Math.hypot(dx,dy);if(dy<H*0.06)return;
 // use last ~150ms for speed
 let k=0;while(k<s.length-2&&b.t-s[k].t>180)k++;const sp=Math.hypot(b.x-s[k].x,b.y-s[k].y)/Math.max(16,b.t-s[k].t)*1000/H;
 const power=Math.max(0,Math.min(1,(sp-0.8)/4.2));
 // curvature: max signed deviation from chord
 let dev=0;for(const p of s){const d=((p.x-a.x)*dy-(a.y-p.y)*dx)/len;if(Math.abs(d)>Math.abs(dev))dev=d}const curve=Math.max(-1,Math.min(1,dev/len*3));
 const v=14+power*21,ang=0.72,aim=Math.atan2(dx,dy)*0.55;
 Object.assign(ball,{fly:true,vy:v*Math.sin(ang),vz:v*Math.cos(ang)*Math.cos(aim),vx:v*Math.cos(ang)*Math.sin(aim),ax:curve*5.5,spin:12+power*10});kickT=0.35;sfx.kick();bigKick=power>0.55;shake=3+power*4;firstKick=false;window.__lastKick={power,curve,aim,sp}}
// ---------- update ----------
function result(r){ball.done=true;ball.res=r;const good=r==='GOOD!';
 if(good){streak++;coins+=5+Math.min(20,dist/5|0)+(streak>1?5:0);localStorage.fgfCoins=coins;const pts=dist*10+Math.max(0,streak-1)*25;score+=pts;msg={t:'GOOD!',s:'+'+pts+(streak>1?'  🔥 x'+streak:''),c:GOLD};sfx.cheer();flash=1;for(let i=0;i<60;i++)parts.push({x:Math.random()*W,y:-10,vx:(Math.random()-.5)*60,vy:80+Math.random()*120,c:Math.random()<.5?GOLD:'#2ecc71',l:2.5})}
 else{streak=0;lives--;msg={t:r,s:lives>0?lives+(lives==1?' miss':' misses')+' left':'',c:'#ff5a4f'};sfx.groan()}
 msgT=1.8}
function update(dt){if(paused)return;if(shake>0)shake=Math.max(0,shake-dt*20);if(flash>0)flash-=dt*1.5;if(kickT>0)kickT-=dt;if(fadeT>0)fadeT-=dt;camK+=((ball.fly&&bigKick&&!ball.done?1:0)-camK)*Math.min(1,dt*4);
 parts=parts.filter(p=>(p.l-=dt)>0);for(const p of parts){p.x+=p.vx*dt;p.y+=p.vy*dt}
 if(state!=='play')return;
 if(ball.fly){const steps=4,h=dt/steps;for(let i=0;i<steps;i++){const pz=ball.z,py=ball.y,px=ball.x;
  ball.vx+=(ball.ax+wind.x*0.05)*h;ball.vz+=wind.z*0.04*h;ball.vy-=G*h;ball.x+=ball.vx*h;ball.y+=ball.vy*h;ball.z+=ball.vz*h;ball.rot+=ball.spin*h;
  if(!ball.done&&pz<dist&&ball.z>=dist){const t=(dist-pz)/(ball.z-pz),cx=px+(ball.x-px)*t,cy=py+(ball.y-py)*t;
   const nearPost=Math.abs(Math.abs(cx)-HALF)<0.25&&cy>BAR&&cy<POST;
   if(nearPost&&!ball.hitPost){ball.hitPost=true;sfx.post();ball.vz*=-0.3;ball.vx=(cx>0?-1:1)*Math.abs(ball.vx)*0.3+(Math.abs(cx)<HALF?0:(cx>0?2:-2));if(Math.abs(cx)<HALF){result('GOOD!');msg.s='Off the upright… IN! '+msg.s}else result(cx<0?'DOINK! NO GOOD':'DOINK! NO GOOD')}
   else if(Math.abs(cx)<HALF&&cy>BAR)result('GOOD!');else if(cy<=BAR&&Math.abs(cx)<HALF+1.5)result(cy<0.5?'SHORT':'SHORT - OFF THE BAR');else if(cy>POST&&Math.abs(cx)<HALF+0.3)result('GOOD!');else result(cx<0?'WIDE LEFT':'WIDE RIGHT')}
  if(Math.abs(ball.x-0)<0.4&&Math.abs(ball.z-dist)<0.3&&ball.y<BAR&&!ball.hitPost){ball.vz*=-0.4;ball.hitPost=true;sfx.post()}
  if(ball.y<0.15){ball.y=0.15;if(!ball.done)result(ball.z<dist?'SHORT':(ball.x<0?'WIDE LEFT':'WIDE RIGHT'));ball.vy=Math.abs(ball.vy)*0.35;ball.vx*=0.6;ball.vz*=0.6;ball.spin*=0.5;if(ball.vy<1)ball.vy=0}}
  if(ball.z>-CAMZ*0+0.2)trail.push({x:ball.x,y:ball.y,z:ball.z});if(trail.length>18)trail.shift()}
 if(msg){msgT-=dt;if(msgT<=0){const good=msg.c===GOLD;msg=null;if(lives<=0){state='over';if(score>best){best=score;localStorage.fgfBest=best}}else{if(good)dist=Math.min(65,dist+(dist<40?3:2));newWind();resetBall()}}}}
// ---------- draw ----------
function line(x1,y1,z1,x2,y2,z2){const a=P(x1,y1,z1),b=P(x2,y2,z2);if(!a||!b)return;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
function drawField(){{const a=P(0,0,-7)||{y:H*0.75},g=ctx.createLinearGradient(0,a.y,0,H);g.addColorStop(0,'#1d7a34');g.addColorStop(1,'#0e4a1f');ctx.fillStyle=g;ctx.fillRect(0,a.y,W,H-a.y);for(let i=0;i<6;i++){ctx.fillStyle=i%2?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)';const y0=a.y+(H-a.y)*(i/6)**0.8,y1=a.y+(H-a.y)*((i+1)/6)**0.8;ctx.fillRect(0,y0,W,y1-y0)}}
ctx.strokeStyle='rgba(255,255,255,0.75)';ctx.fillStyle='rgba(255,255,255,0.08)';
 for(let z=-7;z<dist+12;z+=1){const a=P(-60,0,z),b=P(60,0,z+1);if(!a||!b)continue;if(Math.floor((z+100)/5)%2){ctx.fillRect(0,b.y,W,a.y-b.y)}}
 for(let z=0;z<=dist+10;z+=5){ctx.lineWidth=Math.max(0.6,F/(z-CAMZ)*0.12);line(-27,0,z,27,0,z);const p=P(-12,0,z);if(z%10==0&&z<dist&&p){const n=Math.min(50,Math.max(0,50-(dist-z)));}}
 ctx.lineWidth=1.5;line(-26.6,0,-5,-26.6,0,dist+10);line(26.6,0,-5,26.6,0,dist+10);
 // hash marks
 for(let z=0;z<dist+10;z++){ctx.lineWidth=0.8;line(-3.1,0,z,-2.6,0,z);line(3.1,0,z,2.6,0,z)}
 // end zone
 const e1=P(-27,0,dist+10),e2=P(-27,0,dist);ctx.fillStyle='rgba(15,107,58,0.9)';ctx.fillRect(0,e1.y,W,e2.y-e1.y);ctx.fillStyle='rgba(242,194,48,0.85)';ctx.font='bold '+Math.max(6,(e2.y-e1.y)*0.7)+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.save();ctx.translate(W/2,(e1.y+e2.y)/2);ctx.scale(1,0.55);ctx.fillText('TUNDRA WOLVES',0,0);ctx.restore();ctx.textBaseline='alphabetic';
 // yard marker near ball
 const lp=P(-6,0,0);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='bold '+(lp.s*1.2|0)+'px system-ui';ctx.fillText((dist-10>50?100-(dist-10):dist-10)+'',lp.x,lp.y)}
function drawPosts(){const z=dist+0.2,lw=s=>Math.max(1.5,s*0.18);const b=P(0,0,z),c=P(0,BAR,z),l=P(-HALF,BAR,z),r=P(HALF,BAR,z),lt=P(-HALF,POST,z),rt=P(HALF,POST,z);
 ctx.strokeStyle='#e8b800';ctx.lineCap='round';ctx.lineWidth=lw(b.s)*1.6;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.stroke();
 ctx.strokeStyle='#ffd21f';ctx.lineWidth=lw(b.s);ctx.beginPath();ctx.moveTo(lt.x,lt.y);ctx.lineTo(l.x,l.y);ctx.lineTo(r.x,r.y);ctx.lineTo(rt.x,rt.y);ctx.stroke();
 ctx.fillStyle='#ff7a00';ctx.fillRect(lt.x-lw(b.s),lt.y-b.s*0.9,lw(b.s)*2,b.s*0.7);ctx.fillRect(rt.x-lw(b.s),rt.y-b.s*0.9,lw(b.s)*2,b.s*0.7);
 ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='bold '+Math.max(9,b.s*0.9|0)+'px system-ui';ctx.textAlign='center';ctx.fillText(dist+' YDS',b.x,b.y+b.s*1.4+8)}
function SP(x,y,z){const p=P(x,y,z);if(!p)return null;const t=TEE(),m=1-Math.pow(1-Math.max(0,Math.min(1,z/9)),2),ty=t.y-OFF-(y-0.15)*t.r*4;return{x:t.x+(p.x-t.x)*m,y:ty+(p.y-ty)*m,s:t.r/0.19+(p.s-t.r/0.19)*m}}
function drawBall(){const p=SP(ball.x,ball.y,ball.z);if(!p)return;const sh=SP(ball.x,0.15,ball.z);sh.y+=p.s*0.15;
 ctx.fillStyle='rgba(0,0,0,'+Math.max(0.05,0.4-ball.y*0.03)+')';ctx.beginPath();ctx.ellipse(sh.x,sh.y,p.s*0.22,p.s*0.07,0,0,7);ctx.fill();
 if(trail.length>1){ctx.save();ctx.lineCap='round';ctx.shadowColor=GOLD;ctx.shadowBlur=10;for(let i=1;i<trail.length;i++){const a=SP(trail[i-1].x,trail[i-1].y,trail[i-1].z),b=SP(trail[i].x,trail[i].y,trail[i].z);if(!a||!b)continue;ctx.strokeStyle='rgba(255,236,170,'+(i/trail.length*0.55)+')';ctx.lineWidth=Math.max(1,b.s*0.12);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}ctx.restore()}
 if(!ball.fly){const t=TEE();ctx.fillStyle='#ff7a00';ctx.beginPath();ctx.moveTo(p.x-t.r*0.5,p.y+t.r*1.25);ctx.lineTo(p.x+t.r*0.5,p.y+t.r*1.25);ctx.lineTo(p.x+t.r*0.25,p.y+t.r*0.7);ctx.lineTo(p.x-t.r*0.25,p.y+t.r*0.7);ctx.fill()}const r=Math.max(2.5,p.s*0.19);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ball.fly?0.3*Math.sin(ball.rot*0.2):-0.25);const sq=0.55+0.4*Math.abs(Math.cos(ball.rot));
 ctx.scale(1,ball.fly?sq:1);ctx.fillStyle='#7a3b12';ctx.beginPath();ctx.ellipse(0,0,r*0.62,r,0,0,7);ctx.fill();
 const g=ctx.createRadialGradient(-r*0.2,-r*0.3,0,0,0,r);g.addColorStop(0,'rgba(255,200,150,0.45)');g.addColorStop(1,'rgba(0,0,0,0.3)');ctx.fillStyle=g;ctx.fill();
 ctx.strokeStyle='#fff';ctx.lineWidth=Math.max(0.6,r*0.09);ctx.beginPath();ctx.moveTo(0,-r*0.45);ctx.lineTo(0,r*0.45);ctx.stroke();for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(-r*0.13,i*r*0.16);ctx.lineTo(r*0.13,i*r*0.16);ctx.stroke()}ctx.restore()}
function limb(x1,y1,x2,y2,w,c){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
let OFF=0,EZ=0,SCL=1,coins=+(localStorage.fgfCoins||0),paused=false,firstKick=true,prevFr=0,curFr=0,fadeT=0,camK=0,bigKick=false;const STAD=new Image();STAD.src='stadium.webp';const KS=new Image();KS.src='kicker.webp';
function drawBG(){const b=P(0,0,dist+0.2);if(!STAD.complete||!STAD.naturalWidth||!b){ctx.drawImage(bg,0,0,W,H);drawField();return}
 const sc=Math.max(W/1280,H/720,(2*HALF*b.s)/136);let dx=W/2-640*sc,dy=b.y-414*sc;dx=Math.min(0,Math.max(W-1280*sc,dx));dy=Math.min(0,Math.max(H-720*sc,dy));
 ctx.drawImage(STAD,dx,dy,1280*sc,720*sc);OFF=dy+414*sc-b.y;EZ=dy+417*sc;SCL=sc;{const tw=Math.min(W*0.92,560*sc),fs=19*sc;ctx.save();ctx.translate(W/2,EZ);ctx.scale(1,0.55);ctx.font='900 '+fs+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';const mw=ctx.measureText('TUNDRA WOLVES').width,k=Math.min(1,tw/mw);ctx.scale(k,1);ctx.restore();ctx.save();ctx.fillStyle='rgba(10,80,32,0.92)';ctx.fillRect(0,EZ-fs*0.36,W,fs*0.72);ctx.fillStyle='rgba(255,255,255,0.7)';ctx.fillRect(0,EZ+fs*0.36,W,1.5);ctx.translate(W/2,EZ);ctx.scale(k,0.55);ctx.font='900 '+fs+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=fs*0.12;ctx.strokeStyle='#05361a';ctx.strokeText('TUNDRA WOLVES',0,0);ctx.fillStyle=GOLD;ctx.fillText('TUNDRA WOLVES',0,0);ctx.restore();ctx.textBaseline='alphabetic'}const v=ctx.createRadialGradient(W/2,H*0.45,H*0.25,W/2,H*0.5,H*0.85);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.4)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)}
function KG(){const fw=KS.naturalWidth/4||203,fh=KS.naturalHeight||300,h=Math.min(H*0.34,W*0.62),w=h*fw/fh;return{fw,fh,h,w,x:W*0.02,y:H*0.995-h}}
function TEE(){const g=KG();return{x:g.x+g.w*1.0,y:g.y+g.h*0.86,r:g.h*0.065}}
function drawKicker(){const u=kickT>0?1-kickT/0.35:0;let fr=0;if(swipe)fr=1;else if(kickT>0)fr=u<0.35?2:3;else if(ball.fly)fr=3;
 if(fr!==curFr){prevFr=curFr;curFr=fr;fadeT=0.09}
 if(!KS.complete||!KS.naturalWidth)return;const {fw,fh,h,w,x,y}=KG();
 ctx.fillStyle='rgba(0,0,0,0.4)';ctx.beginPath();ctx.ellipse(x+w*0.4,y+h*0.97,w*0.42,h*0.035,0,0,7);ctx.fill();
 if(kickT>0&&fr>=2){ctx.globalAlpha=0.18;ctx.drawImage(KS,(fr-1)*fw,0,fw,fh,x-w*0.03,y,w,h)}
 if(fadeT>0){ctx.globalAlpha=fadeT/0.09;ctx.drawImage(KS,prevFr*fw,0,fw,fh,x,y,w,h);ctx.globalAlpha=1-fadeT/0.09*0.5}else ctx.globalAlpha=1;
 ctx.drawImage(KS,fr*fw,0,fw,fh,x,y,w,h);ctx.globalAlpha=1}
function drawWind(){const x=W-52,y=96;ctx.fillStyle='rgba(0,0,0,0.45)';ctx.beginPath();ctx.roundRect(x-40,y-38,80,80,12);ctx.fill();ctx.fillStyle='#bcd';ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillText('WIND',x,y-25);
 if(wind.mph>0){ctx.save();ctx.translate(x,y);ctx.rotate(wind.a);ctx.fillStyle='#7fd3ff';ctx.beginPath();ctx.moveTo(0,-16);ctx.lineTo(9,-3);ctx.lineTo(3,-3);ctx.lineTo(3,14);ctx.lineTo(-3,14);ctx.lineTo(-3,-3);ctx.lineTo(-9,-3);ctx.fill();ctx.restore()}else{ctx.fillStyle='#7fd3ff';ctx.fillText('CALM',x,y+4)}
 ctx.fillStyle='#fff';ctx.font='bold 13px system-ui';ctx.fillText(wind.mph+' MPH',x,y+34)}
function shield(x,y,w,h){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y);ctx.lineTo(x+w,y+h*0.55);ctx.quadraticCurveTo(x+w,y+h*0.85,x+w/2,y+h);ctx.quadraticCurveTo(x,y+h*0.85,x,y+h*0.55);ctx.closePath()}
function panel(x,y,w,h){ctx.fillStyle='rgba(6,30,16,0.82)';ctx.strokeStyle='rgba(242,194,48,0.85)';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,h,10);ctx.fill();ctx.stroke()}
function swipePower(){if(!swipe||swipe.length<2)return 0;const b=swipe[swipe.length-1];let k=0;while(k<swipe.length-2&&b.t-swipe[k].t>180)k++;const sp=Math.hypot(b.x-swipe[k].x,b.y-swipe[k].y)/Math.max(16,b.t-swipe[k].t)*1000/H;return Math.max(0,Math.min(1,(sp-0.8)/4.2))}
let pwShow=0;
function hud(){const sm=W<380?0.9:1;
 // score shield
 panel(8,10,W*0.36,48);ctx.save();const sg=ctx.createLinearGradient(0,12,0,52);sg.addColorStop(0,'#ffe27a');sg.addColorStop(1,'#c98f10');ctx.fillStyle=sg;shield(16,15,30,38);ctx.fill();ctx.strokeStyle='#7a5200';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.35)';shield(22,20,9,22);ctx.fill();ctx.restore();
 ctx.textAlign='left';ctx.fillStyle=GOLD;ctx.font='bold '+(11*sm|0)+'px system-ui';ctx.fillText('SCORE',54,27);ctx.fillStyle='#fff';ctx.font='900 '+(20*sm|0)+'px system-ui';ctx.fillText(score.toLocaleString(),54,50);
 // coins
 const cw=W*0.33,cx=W-8-cw;panel(cx,10,cw,48);const cg=ctx.createRadialGradient(cx+22,28,2,cx+25,34,15);cg.addColorStop(0,'#fff3a8');cg.addColorStop(1,'#d39a12');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(cx+25,34,14,0,7);ctx.fill();ctx.strokeStyle='#8a5d00';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#8a5d00';ctx.font='900 15px system-ui';ctx.textAlign='center';ctx.fillText('$',cx+25,40);
 ctx.textAlign='left';ctx.fillStyle=GOLD;ctx.font='bold '+(11*sm|0)+'px system-ui';ctx.fillText('COINS',cx+45,27);ctx.fillStyle='#fff';ctx.font='900 '+(19*sm|0)+'px system-ui';ctx.fillText(coins.toLocaleString(),cx+45,50);
 // center: attempt + lives
 ctx.textAlign='center';ctx.font='900 '+(13*sm|0)+'px system-ui';ctx.fillStyle=streak>1?GOLD:'#fff';ctx.fillText(streak>1?'🔥 x'+streak:dist+' YDS',W/2,30);ctx.font=(13*sm|0)+'px system-ui';let s='';for(let i=0;i<3;i++)s+=i<lives?'🏈':'✖️';ctx.fillText(s,W/2,50);
 drawWind();
 // power meter
 const pw=swipePower();pwShow+=(pw-pwShow)*0.35;if(swipe){const mx=W*0.42,my=H-108,mw=W*0.5,mh=14;panel(mx-8,my-22,mw+16,mh+30);ctx.fillStyle='#fff';ctx.font='bold 10px system-ui';ctx.textAlign='left';ctx.fillText('KICK POWER',mx,my-8);const mg=ctx.createLinearGradient(mx,0,mx+mw,0);mg.addColorStop(0,'#2ecc71');mg.addColorStop(0.55,'#f2c230');mg.addColorStop(1,'#e74c3c');ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(mx,my,mw,mh);ctx.fillStyle=mg;ctx.fillRect(mx,my,mw*pwShow,mh);ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=1;ctx.strokeRect(mx,my,mw,mh)}
 // pause button
 ctx.fillStyle='rgba(6,30,16,0.85)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.arc((W-40),H-44,22,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';if(paused){ctx.beginPath();ctx.moveTo((W-40)-6,H-54);ctx.lineTo((W-40)+9,H-44);ctx.lineTo((W-40)-6,H-34);ctx.fill()}else{ctx.fillRect((W-40)-8,H-54,5,20);ctx.fillRect((W-40)+3,H-54,5,20)}}
function drawSwipe(){if(!swipe||swipe.length<2)return;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';const path=()=>{ctx.beginPath();ctx.moveTo(swipe[0].x,swipe[0].y);for(let i=1;i<swipe.length-1;i++){const a=swipe[i],b=swipe[i+1];ctx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2)}const l=swipe[swipe.length-1];ctx.lineTo(l.x,l.y)};
 ctx.shadowColor='#bff7ff';ctx.shadowBlur=18;ctx.strokeStyle='rgba(180,240,255,0.35)';ctx.lineWidth=16;path();ctx.stroke();ctx.shadowBlur=8;ctx.strokeStyle='rgba(255,255,255,0.95)';ctx.lineWidth=5;path();ctx.stroke();
 const l=swipe[swipe.length-1],p=swipe[Math.max(0,swipe.length-4)],a=Math.atan2(l.y-p.y,l.x-p.x);ctx.translate(l.x,l.y);ctx.rotate(a);ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(12,0);ctx.lineTo(-6,-9);ctx.lineTo(-6,9);ctx.fill();ctx.restore()}
function txt(t,x,y,sz,c,st){ctx.font='900 '+sz+'px system-ui';ctx.textAlign='center';ctx.lineWidth=sz*0.14;ctx.strokeStyle=st||'#000';ctx.lineJoin='round';ctx.strokeText(t,x,y);ctx.fillStyle=c;ctx.fillText(t,x,y)}
function button(label){const bx=W/2,by=H*0.68;ctx.fillStyle=GOLD;ctx.beginPath();ctx.roundRect(bx-110,by-32,220,64,32);ctx.fill();ctx.fillStyle=GREEN;ctx.font='900 24px system-ui';ctx.textAlign='center';ctx.fillText(label,bx,by+9)}
let last=performance.now(),T=0;
function frame(now){const dt=Math.min(0.05,(now-last)/1000);last=now;T+=dt;update(dt);
 ctx.save();if(shake)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);ctx.translate(0,camK*Math.min(H*0.12,Math.max(0,ball.y)*H*0.012));drawBG();
 const behind=ball.z>dist;ctx.save();ctx.translate(0,OFF);if(behind)drawBall();drawPosts();ctx.restore();drawKicker();ctx.save();ctx.translate(0,OFF);if(!behind)drawBall();ctx.restore();ctx.restore();
 if(flash>0){ctx.fillStyle='rgba(242,194,48,'+flash*0.25+')';ctx.fillRect(0,0,W,H)}
 for(const p of parts){ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,4,7)}
 if(state==='play'){hud();drawSwipe();if(paused){ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(0,0,W,H);txt('PAUSED',W/2,H*0.42,44,'#fff');ctx.fillStyle='#dde';ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillText('Tap to resume',W/2,H*0.42+32)}
  if(!ball.fly&&!msg&&!swipe&&!paused){const hx=W*0.75,hy=H-150;panel(hx-W*0.2,hy-28,W*0.4,58);txt('SWIPE UP',hx,hy-4,17,'#fff');txt('TO KICK!',hx,hy+18,17,GOLD);if(firstKick){const ph=(T*0.8)%1;ctx.globalAlpha=Math.sin(ph*Math.PI);ctx.font='38px system-ui';ctx.textAlign='center';ctx.fillText('👆',W*0.62,H*0.72-ph*H*0.18);ctx.globalAlpha=1}}
  if(msg){const sc=Math.min(1,(1.8-msgT)*6);ctx.save();ctx.translate(W/2,H*0.3);ctx.scale(sc,sc);txt(msg.t,0,0,Math.min(54,W/(msg.t.length*0.62)),msg.c);ctx.restore();if(msg.s)txt(msg.s,W/2,H*0.3+36,18,'#fff')}}
 else{ctx.fillStyle='rgba(5,10,24,0.72)';ctx.fillRect(0,0,W,H);
  if(state==='title'){txt('FIELD GOAL',W/2,H*0.26,Math.min(52,W*0.13),GOLD,'#063');txt('FRENZY',W/2,H*0.26+Math.min(58,W*0.15),Math.min(64,W*0.17),'#fff',GREEN);ctx.fillStyle='#bcd';ctx.font='15px system-ui';ctx.fillText('Swipe up to kick. Beat the wind.',W/2,H*0.47);ctx.fillText('3 misses and you\'re done.',W/2,H*0.47+22);if(best)ctx.fillText('Best: '+best,W/2,H*0.47+50);button('START')}
  else{txt('GAME OVER',W/2,H*0.27,Math.min(54,W*0.13),'#ff5a4f');txt(score+'',W/2,H*0.42,48,'#fff');ctx.fillStyle='#bcd';ctx.font='15px system-ui';ctx.fillText('Longest attempt: '+dist+' yds   ·   Best: '+best,W/2,H*0.48);button('PLAY AGAIN')}}
 requestAnimationFrame(frame)}
addEventListener('resize',resize);resize();newWind();resetBall();requestAnimationFrame(frame);
