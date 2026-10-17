// s75 (Kirk's freeze exception, Oct 17): LEGEND CHAMPIONSHIP CELEBRATION.
// A made 80-yard Legend kick in CLASSIC plays a ~9 s Super Bowl-style finale: team mascot dances next to the kicker
// (approved art, transforms only; kicker reuses the celebration poses in sequence), fireworks, team-color confetti,
// camera shake + zoom, LEGEND! trophy banner, crowd roar, horn, stadium lights. Reduced Motion and flash-free respected.
// Tap to skip after 2 s, SHARE LEGEND kept, then the run is saved and the player returns home.
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t,now=()=>performance.now()/1000;
const RMo=()=>LS.fgfRM==='1',FF=()=>LS.fgfNoFlash==='1'||!!(window.FGF_CF&&FGF_CF.ff);
const DUR=9.2,SKIP=2,SEQ=['dance','spin','pump','leap','shimmy','heisman','hop'];
let LG=null;window.FGF_LGCEL=()=>LG;
const E=t=>t<0?0:t>1?1:t,eo=t=>1-Math.pow(1-E(t),3),eob=t=>{t=E(t);const c=1.7;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
const tc=()=>{try{const t=TEAMS[myT()];return[t.p,t.s]}catch(e){return['#2a6','#f2c230']}};
// ---------- start ----------
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(good&&mode==='classic'&&dist>=80&&ball&&ball.res!=='BLOCKED!'&&state==='play'&&ok())start()}catch(e){console.warn(e)}return r};
function ok(){try{if(window.FGF_TRYING||lives>=50)return false;const h=window.FGF_H2&&FGF_H2();if(h&&h.room&&h.room.status==='active')return false}catch(e){}return true}
function start(){const rm=RMo(),ff=FF(),[p,s]=tc();
 LG={t0:now(),q:1,ema:0.016,rm,ff,col:[p,s,'#ffffff',s,p,'#e9d8a6'],fw:[],cf:[],nextFw:0.35,seg:-1,shared:false,sk:0};
 try{pendNext=null}catch(e){}msg=null;legendT=0;flash=ff?0:Math.min(flash,0.6);shake=0;
 confetti(rm?60:200,'top');if(!rm){cannon(0);cannon(1)}
 // sound: crowd roar swells, horn, cheer
 try{const c=au&&au();if(c){sfx.roar();setTimeout(()=>{try{sfx.cheer()}catch(e){}},500);setTimeout(()=>{try{sfx.roar()}catch(e){}},2600);setTimeout(()=>{try{sfx.cheer();sfx.roar()}catch(e){}},5200);setTimeout(()=>{try{sfx.roar()}catch(e){}},7400);
  setTimeout(horn,350);setTimeout(horn,4300)}}catch(e){}
 try{vib&&vib([60,40,120])}catch(e){}}
function horn(){if(!LG)return;try{if(eq&&eq.h&&window.FGF_PLAYH){FGF_PLAYH(eq.h)}else{tone(110,110,1.5,0.16,'sawtooth');tone(165,165,1.5,0.12,'sawtooth');tone(220,219,1.4,0.08,'sawtooth')}}catch(e){}}
// ---------- particles ----------
function confetti(n,from){const L=LG;if(!L)return;n=Math.round(n*L.q);for(let i=0;i<n&&L.cf.length<260*L.q;i++)L.cf.push({x:Math.random()*W,y:from==='top'?-10-Math.random()*H*0.5:H,vx:(Math.random()-.5)*40,vy:from==='top'?40+Math.random()*70:0,r:Math.random()*6.3,vr:(Math.random()-.5)*8,w:5+Math.random()*4,h:8+Math.random()*6,c:L.col[i%L.col.length],ph:Math.random()*6.3})}
function cannon(side){const L=LG;if(!L||L.rm)return;const x0=side?W+5:-5,y0=H*0.62;for(let i=0;i<60*L.q&&L.cf.length<260*L.q;i++){const a=(side?-1:1)*(0.5+Math.random()*0.5),v=380+Math.random()*320;L.cf.push({x:x0,y:y0,vx:Math.sin(a)*v*0.7*(side?1:1),vy:-Math.cos(a)*v,r:Math.random()*6.3,vr:(Math.random()-.5)*12,w:5+Math.random()*4,h:8+Math.random()*6,c:L.col[i%L.col.length],ph:Math.random()*6.3,dr:1})}}
function firework(){const L=LG;if(!L)return;const x=W*(0.12+Math.random()*0.76),ty=H*(0.08+Math.random()*0.24),cols=[L.col[0],L.col[1],'#ffffff','#e9d8a6'],c=cols[Math.random()*cols.length|0];
 L.fw.push({rk:1,x,y:H*0.62,vx:(Math.random()-.5)*30,vy:-(H*0.62-ty)*1.9,ty,c,l:0.55});try{noise(0.35,2600,0.8,0.05,0.01)}catch(e){}}
function burst(f){const L=LG,n=Math.round((L.rm?22:44)*L.q),c2=Math.random()<0.4?'#ffffff':f.c;for(let i=0;i<n&&L.fw.length<520*L.q;i++){const a=i/n*6.283+Math.random()*0.1,v=(L.rm?60:110)+Math.random()*(L.rm?30:70);L.fw.push({x:f.x,y:f.y,px:f.x,py:f.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,c:i%3?f.c:c2,l:1.1+Math.random()*0.6,g:70})}
 if(!L.ff)L.fw.push({core:1,x:f.x,y:f.y,R:L.rm?40:70,l:0.35});try{thump(90+Math.random()*30,0.32,0.22);setTimeout(()=>{try{noise(0.45,4200,0.6,0.07,0.003)}catch(e){}},120)}catch(e){}}
// ---------- camera: zoom + shake (none with Reduced Motion / flash-free) ----------
const oCam=S3.cam;S3.cam=function(){const r=oCam.apply(this,arguments);try{if(LG&&!LG.rm){const a=now()-LG.t0,z=1+0.11*eo(a/1.1)*(1-eo((a-DUR+1.0)/1.0)),fx=W*0.42,fy=H*0.78;ctx.translate(fx,fy);ctx.scale(z,z);ctx.translate(-fx,-fy);
 if(!LG.ff){const sh=a<0.9?9*(1-a/0.9):(a>4.3&&a<4.8?4*(1-(a-4.3)/0.5):0);if(sh>0)ctx.translate((Math.random()-.5)*sh,(Math.random()-.5)*sh)}}}catch(e){}return r};
// ---------- mascot dance (approved mascot art, transforms only) ----------
function mascot(a){if(!MSI.complete||!MSI.naturalWidth)return;const K=KG(),mh=Math.min(H*0.3,W*0.5),feet=H*0.965,x=Math.min(W-mh*0.48-6,K.x+K.w+mh*0.42);
 let oy=0,rot=0,sx=1,sy=1,dx=0,bub='';const rm=LG.rm,P=Math.PI,S=Math.sin;
 if(rm){oy=-Math.abs(S(a*P*1.2))*mh*0.03}
 else{const ph=a%9.2;
  if(ph<1.5){oy=-Math.abs(S(ph*P*3))*mh*0.22;sy=1+0.06*S(ph*P*6);sx=2-sy;bub='🎉'}                        // bounce
  else if(ph<3.0){const u=(ph-1.5)/1.5;sx=Math.cos(eo(u)*P*4);oy=-S(u*P)*mh*0.28;bub='🌀'}                    // jump spin
  else if(ph<4.6){const u=ph-3.0;rot=(Math.floor(u*4)%2?0.16:-0.16)*Math.min(1,u*4);oy=-Math.abs(S(u*P*4))*mh*0.08;sy=1+0.05*Math.abs(S(u*P*4));bub='💪'} // arm pumps
  else if(ph<6.1){const u=ph-4.6;dx=S(u*P*2)*mh*0.18;rot=S(u*P*4)*0.12;oy=-Math.abs(S(u*P*4))*mh*0.1;bub='🕺'} // shuffle
  else if(ph<7.4){const u=(ph-6.1)/1.3;rot=u*P*2;oy=-S(u*P)*mh*0.35;bub='🔥'}                                // flip
  else{const u=ph-7.4;oy=-Math.abs(S(u*P*5))*mh*0.15;rot=(Math.floor(u*5)%2?0.12:-0.12);bub='🏆'}}           // victory pumps
 const X=x+dx;ctx.save();ctx.globalAlpha=0.32;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(X,feet,mh*0.3*(1+oy/mh*0.6),mh*0.05,0,0,7);ctx.fill();ctx.globalAlpha=1;
 ctx.translate(X,feet+oy-mh/2);ctx.rotate(rot);ctx.scale(sx,sy);ctx.drawImage(MSI,myT()*193,0,193,200,-mh*0.48,-mh/2,mh*0.965,mh);ctx.restore();
 if(bub&&!rm){ctx.font=(mh*0.2|0)+'px system-ui';ctx.textAlign='center';ctx.fillText(bub,X+mh*0.34,feet+oy-mh*1.02)}}
const oM=S3.masc;S3.masc=function(){if(!LG)return oM.apply(this,arguments);try{drawLines()}catch(e){}try{mascot(now()-LG.t0)}catch(e){}};
// kicker: celebration poses in sequence (s68 motion library; it already honours Reduced Motion)
function poses(a){const K=window.FGF_KANIM;if(!K)return;const i=Math.min(SEQ.length-1,Math.floor(a/1.3));if(i!==LG.seg||!K.CEL){if(i!==LG.seg){LG.seg=i;LG.st=performance.now()}K.CEL={m:SEQ[i],t:LG.st,d:null}}}
// ---------- overlay ----------
let last=0;
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(LG&&state==='play')draw()}catch(e){console.warn(e)}return r};
function lights(a){const L=LG;ctx.save();ctx.globalCompositeOperation='lighter';
 for(const s of [0,1]){const lx=s?W*0.9:W*0.1,ly=H*0.07;let k=0.55;if(!L.ff&&!L.rm)k=0.35+0.4*(0.5+0.5*Math.sin(a*Math.PI*2*1.25+(s?Math.PI:0)));
  const sw=L.rm?0:Math.sin(a*0.9+s*2)*0.35,ang=(s?-1:1)*0.35+sw,len=H*0.95;ctx.save();ctx.translate(lx,ly);ctx.rotate(ang);const g=ctx.createLinearGradient(0,0,0,len);g.addColorStop(0,'rgba(255,248,225,'+(0.22*k)+')');g.addColorStop(1,'rgba(255,248,225,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(8,0);ctx.lineTo(len*0.22,len);ctx.lineTo(-len*0.22,len);ctx.fill();ctx.restore();
  const rg=ctx.createRadialGradient(lx,ly,0,lx,ly,W*0.22);rg.addColorStop(0,'rgba(255,250,230,'+(0.5*k)+')');rg.addColorStop(1,'rgba(255,250,230,0)');ctx.fillStyle=rg;ctx.fillRect(lx-W*0.22,ly-W*0.22,W*0.44,W*0.44);
  ctx.fillStyle='rgba(255,252,240,'+(0.6+0.4*k)+')';for(let j=0;j<4;j++)for(let q=0;q<2;q++){ctx.beginPath();ctx.arc(lx+(j-1.5)*9,ly+(q-0.5)*9,3,0,7);ctx.fill()}}
 ctx.restore()}
function banner(a){const L=LG,u=a-0.25;if(u<0)return;const sc=L.rm?1:Math.max(1,2.2-1.2*eob(u/0.55))*(u<0.55?1:1+0.015*Math.sin(a*5)),al=L.rm?E(u/0.6):E(u/0.15),cy=H*0.215,bw=Math.min(W*0.9,420),bh=Math.min(H*0.2,150);
 ctx.save();ctx.globalAlpha=al*E((DUR-a)/0.5);ctx.translate(W/2,cy);ctx.scale(sc,sc);
 // ribbon
 ctx.fillStyle='rgba(10,16,22,0.82)';ctx.strokeStyle='rgba(233,216,166,0.85)';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(-bw/2,-bh*0.28,bw,bh*0.62,14);ctx.fill();ctx.stroke();
 const [p,s]=L.col;ctx.fillStyle=p;ctx.beginPath();ctx.moveTo(-bw/2+4,bh*0.2);ctx.lineTo(-bw/2-16,bh*0.36);ctx.lineTo(-bw/2-6,bh*0.2);ctx.lineTo(-bw/2-16,bh*0.04);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(bw/2-4,bh*0.2);ctx.lineTo(bw/2+16,bh*0.36);ctx.lineTo(bw/2+6,bh*0.2);ctx.lineTo(bw/2+16,bh*0.04);ctx.closePath();ctx.fill();
 // trophy
 const tr=Math.min(bh*0.5,64);ctx.font=tr+'px system-ui';ctx.textAlign='center';ctx.fillText('🏆',0,-bh*0.3+(L.rm?0:Math.sin(a*3)*2));
 const fs=Math.min(bh*0.32,W*0.12,46);ctx.font='900 '+fs+'px system-ui';const t1=T_('LEGEND!');ctx.lineWidth=5;ctx.strokeStyle='#1b1405';ctx.strokeText(t1,0,bh*0.06,bw-30);
 const g=ctx.createLinearGradient(-bw/3,0,bw/3,0);const sh=L.rm?0.5:((a*0.45)%1);g.addColorStop(0,'#e7c766');g.addColorStop(Math.max(0,sh-0.12),'#e7c766');g.addColorStop(sh,'#fff6d8');g.addColorStop(Math.min(1,sh+0.12),'#e7c766');g.addColorStop(1,'#e7c766');ctx.fillStyle=g;ctx.fillText(t1,0,bh*0.06,bw-30);
 ctx.font='800 '+Math.min(13,W*0.036)+'px system-ui';ctx.fillStyle='#e8eee9';ctx.fillText(T_('CHAMPIONSHIP KICK · 80 YARDS'),0,bh*0.24,bw-24);ctx.restore();
 if(a>0.9){ctx.save();ctx.globalAlpha=E((a-0.9)/0.4)*E((DUR-a)/0.5);const y=cy+bh*0.48;fitTxt(T_('🪙 +500 COINS JACKPOT'),W/2,y,Math.min(16,W*0.045),'#e9d8a6',W*0.86);ctx.restore()}}
function draw(){const L=LG,a=now()-L.t0,dt=Math.min(0.05,Math.max(0,a-(L.la||a)));L.la=a;
 if(a>=DUR){finish(false);return}
 if(dt>0){L.ema=L.ema*0.9+dt*0.1;if(a>0.6&&L.ema>0.024&&L.q>0.35){L.q=Math.max(0.35,L.q-0.15);L.ema=0.018}}
 poses(a);
 // dim + lights
 ctx.fillStyle='rgba(2,6,16,'+(0.28*E(a/0.5)*E((DUR-a)/0.6))+')';ctx.fillRect(0,0,W,H*0.6);
 lights(a);
 // fireworks schedule
 if(a>=L.nextFw&&a<DUR-1.2){firework();if(!L.rm&&Math.random()<0.45*L.q)firework();L.nextFw=a+(L.rm?1.1:0.55+Math.random()*0.35)}
 if(!L.rm&&(a>3&&!L.c2)){L.c2=1;cannon(0);cannon(1);confetti(80,'top')}if(!L.rm&&a>6&&!L.c3){L.c3=1;cannon(0);cannon(1)}if(L.rm&&a>4&&!L.c2){L.c2=1;confetti(40,'top')}
 ctx.save();ctx.globalCompositeOperation='lighter';const PB={};
 for(let i=L.fw.length-1;i>=0;i--){const f=L.fw[i];if(f.core){f.l-=dt;if(f.l<=0){L.fw.splice(i,1);continue}const k=Math.max(0,f.l/0.35),rg=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.R);rg.addColorStop(0,'rgba(255,250,235,'+(0.55*k)+')');rg.addColorStop(1,'rgba(255,250,235,0)');ctx.globalAlpha=1;ctx.fillStyle=rg;ctx.fillRect(f.x-f.R,f.y-f.R,f.R*2,f.R*2);continue}
  if(f.rk){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=H*1.6*dt;f.l-=dt;ctx.globalAlpha=1;ctx.fillStyle='rgba(255,240,200,0.9)';ctx.fillRect(f.x-1.5,f.y-1.5,3,7);if(f.vy>=0||f.y<=f.ty||f.l<=0){burst(f);L.fw.splice(i,1)}continue}
  f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=0.985;f.vy=f.vy*0.985+f.g*dt;f.l-=dt;if(f.l<=0){L.fw.splice(i,1);continue}
  const key=f.c+'|'+(f.l>0.66?3:f.l>0.33?2:1);(PB[key]||(PB[key]=[])).push(f)}
 ctx.lineWidth=2.6;ctx.lineCap='round';for(const k in PB){const [c,a]=k.split('|');ctx.globalAlpha=a/3;ctx.strokeStyle=c;ctx.beginPath();for(const f of PB[k]){ctx.moveTo(f.x-f.vx*0.09,f.y-f.vy*0.09);ctx.lineTo(f.x,f.y)}ctx.stroke()}
 ctx.restore();ctx.globalAlpha=1;
 if(L.fl>0){if(!L.ff){ctx.fillStyle='rgba(255,245,220,'+(L.fl*0.5)+')';ctx.fillRect(0,0,W,H)}L.fl-=dt*0.9}
 // confetti
 const B0=ctx.getTransform();
 for(let i=L.cf.length-1;i>=0;i--){const c=L.cf[i];c.ph+=dt*6;if(c.dr){c.vy+=420*dt;c.vx*=0.985;if(c.vy>60){c.dr=0}}else{c.vy=Math.min(c.vy+40*dt,90);c.vx=c.vx*0.98+Math.sin(c.ph)*12*dt*(L.rm?0.3:1)}
  c.x+=c.vx*dt;c.y+=c.vy*dt;c.r+=c.vr*dt*(L.rm?0.2:1);if(c.y>H+20){L.cf.splice(i,1);continue}
  const sy=L.rm?1:Math.cos(c.ph),co=Math.cos(c.r),si=Math.sin(c.r);ctx.setTransform(B0.a*co,B0.b*co+B0.d*si,(-B0.a*si)*sy,(B0.d*co)*sy,B0.e+B0.a*c.x,B0.f+B0.d*c.y);ctx.fillStyle=c.c;ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h)}
 ctx.setTransform(B0);
 if(!L.rm&&a<DUR-1.5&&L.cf.length<160&&Math.random()<0.5)confetti(3,'top');
 banner(a);
 // share + skip
 BTN=[];if(a>=1.2){const al=E((a-1.2)/0.4);ctx.save();ctx.globalAlpha=al;const bw=Math.min(190,W*0.5),by=H*0.9-6;bx(W/2-bw/2,by-46,bw,38,'📤 '+T_('SHARE LEGEND'),()=>shareLegend(),false,13);ctx.restore()}
 if(a>=SKIP){ctx.save();ctx.globalAlpha=0.55+0.25*(L.rm||L.ff?1:Math.sin(a*3)*0.5+0.5);ctx.fillStyle='#e8eee9';ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.fillText(T_('Tap anywhere to continue'),W/2,H*0.9+12);ctx.restore()}}
// input during the celebration: share button, tap-to-skip after 2 s, nothing reaches the kick
addEventListener('pointerdown',e=>{if(!LG||state!=='play')return;if(e.target&&e.target.closest&&e.target.closest('.fgfov,#lngm'))return;e.stopImmediatePropagation();e.preventDefault&&e.preventDefault();LG.dn={x:e.clientX,y:e.clientY}},true);
addEventListener('pointerup',e=>{if(!LG||state!=='play')return;if(e.target&&e.target.closest&&e.target.closest('.fgfov,#lngm'))return;e.stopImmediatePropagation();const d=LG.dn;LG.dn=null;if(!d)return;const a=now()-LG.t0;
 const b=(BTN||[]).find(q=>d.x>=q.x&&d.x<=q.x+q.w&&d.y>=q.y&&d.y<=q.y+q.h);if(b&&b.cb){b.cb();return}if(a>=SKIP)finish(false)},true);
addEventListener('keydown',e=>{if(LG&&state==='play'&&now()-LG.t0>=SKIP&&(e.key===' '||e.key==='Enter'||e.key==='Escape')){e.preventDefault();finish(false)}},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&LG)LG.t0-=0})
function shareLegend(){if(!LG)return;finish(true);try{share('I just nailed an 80-yard LEGEND kick')}catch(e){}}
// ---------- finish: save the run, then home ----------
let goHome=false;
function finish(forShare){if(!LG)return;LG=null;try{const K=window.FGF_KANIM;if(K)K.CEL=null}catch(e){}msg=null;legendT=0;shake=0;flash=0;
 try{endGame()}catch(e){console.warn(e)}
 if(state==='initials'&&LS.fgfIni){try{const ini=J('fgfIni',[0,0,0]),AZ='ABCDEFGHIJKLMNOPQRSTUVWXYZ',lb=J('fgfLB',{}),L=lb[mode]||[];L.push({i:ini.map(k=>AZ[k]||'A').join(''),s:score});L.sort((x,y)=>y.s-x.s);lb[mode]=L.slice(0,25);SV('fgfLB',lb);state='over'}catch(e){}}
 if(state==='over'){state='title';try{toast('🏆 '+T_('Legend run saved')+' · '+score.toLocaleString())}catch(e){}}else goHome=true}
setInterval(()=>{if(goHome&&state==='over'){goHome=false;state='title'}if(goHome&&(state==='title'||state==='hub'))goHome=false},200);
window.FGF_LGTEST=()=>{mode='classic';dist=80;start()};
})();
