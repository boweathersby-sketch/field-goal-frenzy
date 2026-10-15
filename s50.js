// s50 (Kirk, Oct 15): CLEATS / HANDS / VISORS no longer render on the kicker, so they are replaced by
// KICKING TEES (slot c, power), KICK EFFECTS (slot g, accuracy) and SIDELINE PROPS (slot v, aim help).
// Nothing here draws on the kicker sprite: tees sit under the ball, effects fire at ball contact,
// props stand behind the kicker on the sideline. Same small stat boosts (cap 3%). Old items migrate fairly.
(function(){
const OLD=['CLEATS','HANDS','VISORS'],NEW=[['TEES','c','p'],['KICK FX','g','a'],['SIDELINE','v','v']];
const tm=()=>TEAMS[typeof team!=='undefined'&&team>=0?team:0]||{p:'#5b2a86',s:'#f2c230'};
// [suffix, name, price, look]
const TEES=[['0','Classic Orange Tee',0,['#ff7a00']],['1','Sky Blue Tee',150,['#3fa9ff']],['2','Hot Pink Tee',150,['#ff4d9d']],['3','Lime Tee',200,['#7fe83a']],['4','Team Colors Tee',300,['team']],['5','Black & Gold Tee',500,['#111','#f2c230']],
 ['6','Candy Stripe Tee',600,['#fff','#e8263a']],['7','Camo Tee',700,['#4d5b2a','#2f3a1a','#7a8a46']],['8','Chrome Tee',900,['chrome']],['9','Stars & Stripes Tee',1100,['usa']],['10','Ice Crystal Tee',1400,['ice']],['11','Neon Glow Tee',1800,['neon','#39ff14']],
 ['12','Rainbow Tee',2400,['rainbow']],['13','Lava Tee',3000,['lava']],['14','Flame Tee',3800,['flame']],['15','Galaxy Tee',4500,['galaxy']],['16','Diamond Tee',5000,['diamond']],['17','Gold Tee',5600,['gold']]];
const FX=[['0','Dust Puff',150,['puff','#d8c9a8']],['1','White Sparks',200,['spark','#ffffff']],['2','Gold Sparks',400,['spark','#ffd23f']],['3','Shockwave Ring',600,['ring','#ffffff']],['4','Team Shockwave',800,['ring','team']],['5','Confetti Burst',1000,['confetti']],
 ['6','Star Burst',1200,['stars','#ffe866']],['7','Heart Burst',1300,['emoji','💖']],['8','Snow Burst',1500,['emoji','❄️']],['9','Coin Shower',1800,['emoji','🪙']],['10','Fire Burst',2200,['fire']],['11','Lightning Strike',2700,['bolt','#bfe6ff']],
 ['12','Rainbow Ring',3200,['ring','rainbow']],['13','Pixel Pop',3600,['pixel']],['14','Fireworks',4200,['fireworks']],['15','Supernova',5000,['nova']]];
const SL=[['0','Water Cooler',200,['cooler','#ff8a00']],['1','Ball Rack',300,['rack']],['2','Team Flags',400,['flags']],['3','Kicking Net',500,['net']],['4','Bench',600,['bench']],['5','Gatorade Bucket',800,['cooler','#39d353']],
 ['6','Drum Line',1000,['emoji','🥁']],['7','Cheer Squad',1300,['cheer']],['8','Fog Machine',1600,['fog']],['9','Speaker Stack',2000,['speakers']],['10','Light Tower',2500,['tower']],['11','Confetti Cannon',3000,['cannon']],
 ['12','Trophy Table',3600,['emoji','🏆']],['13','Mascot Balloon',4200,['balloon']],['14','Fire Cannons',4800,['firecan']],['15','Hall of Fame Wall',5600,['wall']]];
const LOOK={},DEF={TEES,'KICK FX':FX,SIDELINE:SL},PRE={TEES:'cT','KICK FX':'gK',SIDELINE:'vS'};
// ---- build new categories, carry over the old stat boosts onto the same-priced new items ----
const oldCats={};OLD.forEach(n=>{const i=SHOP.findIndex(c=>c[0]===n);if(i>=0){oldCats[n]=SHOP[i][1];}});
const at=SHOP.findIndex(c=>c[0]==='CLEATS');
NEW.forEach(([n,sl,st],k)=>{const old=oldCats[OLD[k]]||[],boosted=old.filter(i=>typeof i[4]==='number'&&i[4]>0).sort((a,b)=>a[2]-b[2]);
 const L=DEF[n].map(([s,nm,pr,lk])=>{const id=PRE[n]+s;LOOK[id]=lk;return [id,nm,pr]});
 // the cheapest/mid/top boosted old items map to new items at matching price points (power for tees, etc.)
 boosted.forEach((b,j)=>{const cands=L.filter(i=>i[2]>0&&i.length===3);const best=cands.reduce((a,c)=>Math.abs(c[2]-b[2])<Math.abs(a[2]-b[2])?c:a,cands[0]);best.push(st,Math.min(0.03,b[4]))});
 L.forEach(i=>{ITEM[i[0]]=i});DEF[n]=L});
OLD.forEach(n=>{const i=SHOP.findIndex(c=>c[0]===n);if(i>=0)SHOP.splice(i,1)});
SHOP.splice(Math.max(0,at),0,...NEW.map(([n])=>[n,DEF[n]]));
window.FGF_GEAR2={LOOK,DEF,NEW};
// ---- migration: every owned old cleat/glove/visor becomes the best new item worth <= its price (same slot),
// the price difference is refunded in coins; boosted items map to the boosted item with the same boost.
function migrate(){const oldIds=new Map();OLD.forEach((n,k)=>(oldCats[n]||[]).forEach(i=>oldIds.set(i[0],[i,k])));
 try{['cad0','cad1','cad2','cad3'].forEach(()=>{})}catch(e){}
 const mine=own.filter(id=>oldIds.has(id));if(!mine.length&&!(eq.c&&oldIds.has(eq.c))&&!(eq.g&&oldIds.has(eq.g))&&!(eq.v&&oldIds.has(eq.v)))return;
 let refund=0,got=[];const map={};
 mine.map(id=>oldIds.get(id)).sort((a,b)=>b[0][2]-a[0][2]).forEach(([it,k])=>{const L=DEF[NEW[k][0]];let pick=null;
  if(typeof it[4]==='number'&&it[4]>0)pick=L.find(n=>n[4]===Math.min(0.03,it[4])&&!own.includes(n[0]));
  if(!pick)pick=L.filter(n=>n[2]>0&&n[2]<=it[2]&&!own.includes(n[0])).sort((a,b)=>b[2]-a[2])[0];
  if(pick){own.push(pick[0]);got.push(pick[1]);refund+=Math.max(0,it[2]-pick[2]);map[it[0]]=pick[0]}else refund+=it[2]});
 for(let i=own.length-1;i>=0;i--)if(oldIds.has(own[i]))own.splice(i,1);
 ['c','g','v'].forEach(s=>{if(eq[s]&&oldIds.has(eq[s]))eq[s]=map[eq[s]]||''});if(!eq.c||!ITEM[eq.c])eq.c='cT0';
 if(!own.includes('cT0'))own.push('cT0');SV('fgfOwn',own);SV('fgfEq',eq);if(refund>0)addCoins(refund);
 LS.fgfGear2=JSON.stringify({n:got.length,refund,t:Date.now()});
 if(got.length||refund)setTimeout(()=>{try{toast('🎯 Gear upgraded: '+got.length+' new item'+(got.length===1?'':'s')+(refund?' + 🪙 '+refund.toLocaleString()+' refund':''))}catch(e){}},2600)}
try{migrate()}catch(e){}
setInterval(()=>{try{migrate()}catch(e){}},5000);// catches old ids granted later by rewards
if(!own.includes('cT0')){own.push('cT0');SV('fgfOwn',own)}if(!eq.c||!ITEM[eq.c]){eq.c='cT0';SV('fgfEq',eq)}
// ---- shared drawing helpers ----
const col=c=>c==='team'?tm().p:c;
function fillFor(lk,x,y,w,h){const k=lk[0];
 if(k==='team'){const g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,tm().p);g.addColorStop(0.5,tm().p);g.addColorStop(0.5,tm().s);g.addColorStop(1,tm().s);return g}
 if(k==='chrome'){const g=ctx.createLinearGradient(x,0,x+w,0);['#666','#fff','#9aa','#eee','#777'].forEach((c,i)=>g.addColorStop(i/4,c));return g}
 if(k==='gold'){const g=ctx.createLinearGradient(x,y,x+w,y+h);['#8a5a00','#ffe27a','#c98a00','#fff3b0','#a06a00'].forEach((c,i)=>g.addColorStop(i/4,c));return g}
 if(k==='rainbow'){const g=ctx.createLinearGradient(x,0,x+w,0);['#f33','#f93','#fd3','#3d6','#39f','#a3f'].forEach((c,i)=>g.addColorStop(i/5,c));return g}
 if(k==='ice'){const g=ctx.createLinearGradient(x,y,x+w,y+h);['#e8fbff','#8fd8ff','#ffffff','#6cc4ff'].forEach((c,i)=>g.addColorStop(i/3,c));return g}
 if(k==='lava'){const g=ctx.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#ffcf3a');g.addColorStop(0.5,'#ff4a12');g.addColorStop(1,'#3a0d06');return g}
 if(k==='flame'){const g=ctx.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#fff27a');g.addColorStop(0.4,'#ff9a1a');g.addColorStop(1,'#d01a00');return g}
 if(k==='galaxy'){const g=ctx.createLinearGradient(x,y,x+w,y+h);['#1a0b3a','#5a2aa8','#1d4fd6','#c43aa8'].forEach((c,i)=>g.addColorStop(i/3,c));return g}
 if(k==='diamond'){const g=ctx.createLinearGradient(x,y,x+w,y+h);['#bff4ff','#ffffff','#7fe8ff','#e0ffff','#9ad'].forEach((c,i)=>g.addColorStop(i/4,c));return g}
 if(k==='usa'){const g=ctx.createLinearGradient(0,y,0,y+h);[[0,'#1c3a8a'],[0.34,'#1c3a8a'],[0.34,'#fff'],[0.5,'#fff'],[0.5,'#d0202e'],[0.67,'#d0202e'],[0.67,'#fff'],[0.83,'#fff'],[0.83,'#d0202e'],[1,'#d0202e']].forEach(([a,c])=>g.addColorStop(a,c));return g}
 if(k==='neon')return lk[1];
 if(lk.length>1){const g=ctx.createLinearGradient(x,0,x+w,0);const n=lk.length;for(let i=0;i<=8;i++)g.addColorStop(i/8,lk[i%n]);return g}
 return k}
function tee(id,cx,by,r,anim){const lk=LOOK[id]||['#ff7a00'];const x=cx-r*0.5,y=by+r*0.7,w=r,h=r*0.55;ctx.save();
 if(lk[0]==='neon'||lk[0]==='flame'||lk[0]==='lava'||lk[0]==='gold'||lk[0]==='diamond'){ctx.shadowColor=lk[0]==='neon'?lk[1]:lk[0]==='gold'?'#ffd23f':lk[0]==='diamond'?'#bff':'#ff6a00';ctx.shadowBlur=r*0.9}
 ctx.fillStyle=fillFor(lk,x,y,w,h);ctx.beginPath();ctx.moveTo(cx-r*0.5,by+r*1.25);ctx.lineTo(cx+r*0.5,by+r*1.25);ctx.lineTo(cx+r*0.25,by+r*0.7);ctx.lineTo(cx-r*0.25,by+r*0.7);ctx.closePath();ctx.fill();
 ctx.shadowBlur=0;ctx.strokeStyle='rgba(0,0,0,0.35)';ctx.lineWidth=Math.max(0.6,r*0.05);ctx.stroke();
 if(lk[0]==='flame'&&anim){for(let i=0;i<3;i++){const fx=cx+(i-1)*r*0.28,fh=r*(0.35+0.25*Math.sin(T*14+i*2));ctx.fillStyle=i===1?'#fff27a':'#ff7a1a';ctx.globalAlpha=0.85;ctx.beginPath();ctx.moveTo(fx-r*0.1,by+r*0.75);ctx.quadraticCurveTo(fx,by+r*0.75-fh*1.4,fx+r*0.1,by+r*0.75);ctx.fill()}}
 if((lk[0]==='diamond'||lk[0]==='galaxy'||lk[0]==='ice')&&anim){ctx.fillStyle='#fff';for(let i=0;i<3;i++){const a=(T*2+i*2.1)%6.28;ctx.globalAlpha=0.5+0.5*Math.sin(T*6+i);ctx.fillRect(cx+Math.cos(a)*r*0.35-0.8,by+r*0.95+Math.sin(a)*r*0.12-0.8,1.6,1.6)}}
 ctx.restore()}
window.FGF_TEE=tee;
// ---- tee under the ball: replaces the orange tee only for that one draw (ball and its skin are untouched) ----
const odb=drawBall;drawBall=function(){let p=null;try{if(!ball.fly&&eq.c&&LOOK[eq.c]&&eq.c!=='cT0')p=SP(ball.x,ball.y,ball.z)}catch(e){}
 if(p){const t=TEE();tee(eq.c,p.x,p.y,t.r,true);const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ctx),'fillStyle')||Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'fillStyle');
  Object.defineProperty(ctx,'fillStyle',{configurable:true,get(){return d.get.call(this)},set(v){d.set.call(this,v==='#ff7a00'?'rgba(0,0,0,0)':v)}});
  try{var r=odb.apply(this,arguments)}finally{delete ctx.fillStyle}}else var r=odb.apply(this,arguments);
 try{drawFX()}catch(e){}return r};
// ---- kick effects at ball contact ----
let FXS=[];const RM=()=>LS.fgfRM==='1';
const oK=S3.onKick;S3.onKick=function(){const r=oK?oK.apply(this,arguments):undefined;try{const id=eq.g;if(id&&LOOK[id]){const p=SP(ball.x,ball.y,ball.z);if(p)spawn(id,p.x,p.y,Math.max(8,p.s*0.6))}}catch(e){}return r};
function spawn(id,x,y,s){const lk=LOOK[id],k=lk[0],n=RM()?8:k==='confetti'||k==='fireworks'||k==='pixel'?34:k==='spark'?22:14,P=[];
 for(let i=0;i<n;i++){const a=Math.random()*6.283,v=(0.6+Math.random())*s*(k==='puff'?2:6);P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(k==='fire'?s*4:0),c:k==='confetti'||k==='fireworks'||k==='pixel'?['#ff4040','#ffd23f','#3fa9ff','#7fe87f','#ff6ad5'][i%5]:col(lk[1]||'#fff'),r:0})}
 FXS.push({id,k,lk,x,y,s,t:0,P});if(FXS.length>4)FXS.shift()}
window.FGF_SPAWNFX=spawn;
let lt=performance.now();
function drawFX(){const now=performance.now(),dt=Math.min(0.05,(now-lt)/1000);lt=now;if(!FXS.length)return;ctx.save();
 FXS.forEach(f=>{f.t+=dt;const u=f.t/0.9,al=Math.max(0,1-u);if(al<=0)return;ctx.globalAlpha=al;
  if(f.k==='ring'||f.k==='nova'){const R=f.s*(1+u*7);ctx.lineWidth=Math.max(2,f.s*0.5*(1-u));ctx.strokeStyle=f.lk[1]==='rainbow'?fillFor(['rainbow'],f.x-R,f.y,R*2,1):col(f.lk[1]||'#fff');if(f.k==='nova'){ctx.strokeStyle='#fff';ctx.shadowColor='#7fe8ff';ctx.shadowBlur=20}ctx.beginPath();ctx.ellipse(f.x,f.y,R,R*0.55,0,0,7);ctx.stroke();ctx.shadowBlur=0}
  if(f.k==='bolt'){ctx.strokeStyle=f.lk[1];ctx.lineWidth=3;ctx.shadowColor='#9cf';ctx.shadowBlur=14;ctx.beginPath();let x=f.x,y=f.y;ctx.moveTo(x,y-f.s*8);for(let i=0;i<6;i++){x+=(Math.random()-0.5)*f.s*2;y=f.y-f.s*8+(i+1)*f.s*8/6;ctx.lineTo(x,y)}ctx.stroke();ctx.shadowBlur=0}
  f.P.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=f.s*(f.k==='confetti'?14:f.k==='fire'?-2:8)*dt;p.r+=dt*8;
   if(f.k==='emoji'){ctx.font=Math.round(f.s*0.9)+'px system-ui';ctx.textAlign='center';ctx.fillText(f.lk[1],p.x,p.y)}
   else if(f.k==='stars'){ctx.fillStyle=p.c;ctx.font=Math.round(f.s*0.9)+'px system-ui';ctx.textAlign='center';ctx.fillText('★',p.x,p.y)}
   else if(f.k==='confetti'){ctx.fillStyle=p.c;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillRect(-f.s*0.2,-f.s*0.08,f.s*0.4,f.s*0.16);ctx.restore()}
   else if(f.k==='pixel'){ctx.fillStyle=p.c;const q=f.s*0.28;ctx.fillRect(Math.round(p.x/q)*q,Math.round(p.y/q)*q,q,q)}
   else if(f.k==='puff'){ctx.fillStyle=p.c;ctx.globalAlpha=al*0.5;ctx.beginPath();ctx.arc(p.x,p.y,f.s*(0.3+u),0,7);ctx.fill();ctx.globalAlpha=al}
   else if(f.k==='fire'){ctx.fillStyle=u<0.4?'#fff27a':u<0.7?'#ff9a1a':'#c42000';ctx.beginPath();ctx.arc(p.x,p.y,f.s*0.25*(1-u)+1,0,7);ctx.fill()}
   else if(f.k==='fireworks'){ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,1.6,0,7);ctx.fill()}
   else if(f.k==='spark'||f.k==='nova'){ctx.strokeStyle=p.c;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*0.03,p.y-p.vy*0.03);ctx.stroke()}})});
 ctx.restore();FXS=FXS.filter(f=>f.t<0.9)}
// ---- sideline props: drawn BEFORE the kicker so the kicker art stays on top, untouched ----
function prop(id,x,y,s,anim){const lk=LOOK[id];if(!lk)return;const k=lk[0];ctx.save();ctx.textAlign='center';
 const shadow=(w)=>{ctx.fillStyle='rgba(0,0,0,0.35)';ctx.beginPath();ctx.ellipse(x,y,w,w*0.18,0,0,7);ctx.fill()};
 if(k==='cooler'){shadow(s*0.5);ctx.fillStyle=lk[1];ctx.beginPath();ctx.roundRect(x-s*0.38,y-s*0.9,s*0.76,s*0.88,s*0.12);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(x-s*0.4,y-s*0.98,s*0.8,s*0.14);ctx.fillStyle='rgba(255,255,255,.85)';ctx.font='900 '+Math.round(s*0.2)+'px system-ui';ctx.fillText(lk[1]==='#39d353'?'⚡':'H₂O',x,y-s*0.4)}
 else if(k==='rack'){shadow(s*0.6);ctx.strokeStyle='#bbb';ctx.lineWidth=s*0.05;ctx.strokeRect(x-s*0.55,y-s*0.6,s*1.1,s*0.55);for(let i=0;i<4;i++){ctx.fillStyle='#7a3b12';ctx.beginPath();ctx.ellipse(x-s*0.4+i*s*0.27,y-s*0.7,s*0.12,s*0.08,0,0,7);ctx.fill()}}
 else if(k==='flags'){for(const d of[-1,1]){const fx=x+d*s*0.35;ctx.strokeStyle='#ddd';ctx.lineWidth=s*0.04;ctx.beginPath();ctx.moveTo(fx,y);ctx.lineTo(fx,y-s*1.5);ctx.stroke();const wv=anim?Math.sin(T*5+d)*s*0.06:0;ctx.fillStyle=d<0?tm().p:tm().s;ctx.beginPath();ctx.moveTo(fx,y-s*1.5);ctx.quadraticCurveTo(fx+s*0.3,y-s*1.45+wv,fx+s*0.55,y-s*1.4);ctx.lineTo(fx+s*0.55,y-s*1.1);ctx.quadraticCurveTo(fx+s*0.3,y-s*1.12+wv,fx,y-s*1.15);ctx.fill()}}
 else if(k==='net'){shadow(s*0.6);ctx.strokeStyle='#eee';ctx.lineWidth=s*0.05;ctx.strokeRect(x-s*0.55,y-s*1.2,s*1.1,s*1.15);ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=1;for(let i=1;i<6;i++){ctx.beginPath();ctx.moveTo(x-s*0.55+i*s*0.18,y-s*1.2);ctx.lineTo(x-s*0.55+i*s*0.18,y-s*0.05);ctx.stroke();ctx.beginPath();ctx.moveTo(x-s*0.55,y-s*1.2+i*s*0.19);ctx.lineTo(x+s*0.55,y-s*1.2+i*s*0.19);ctx.stroke()}}
 else if(k==='bench'){shadow(s*0.8);ctx.fillStyle=tm().p;ctx.fillRect(x-s*0.8,y-s*0.42,s*1.6,s*0.12);ctx.fillRect(x-s*0.8,y-s*0.75,s*1.6,s*0.1);ctx.fillStyle='#555';ctx.fillRect(x-s*0.7,y-s*0.3,s*0.06,s*0.3);ctx.fillRect(x+s*0.64,y-s*0.3,s*0.06,s*0.3)}
 else if(k==='emoji'){shadow(s*0.45);ctx.font=Math.round(s*0.95)+'px system-ui';ctx.fillText(lk[1],x,y-s*0.1)}
 else if(k==='cheer'){for(let i=0;i<3;i++){const cx=x+(i-1)*s*0.5,j=anim?Math.abs(Math.sin(T*6+i))*s*0.15:0;ctx.font=Math.round(s*0.6)+'px system-ui';ctx.fillText('🧍',cx,y-s*0.1-j);ctx.fillText(i%2?'🎊':'📣',cx+s*0.12,y-s*0.65-j)}}
 else if(k==='fog'){shadow(s*0.4);ctx.fillStyle='#333';ctx.fillRect(x-s*0.35,y-s*0.35,s*0.7,s*0.35);for(let i=0;i<6;i++){const ph=((anim?T*0.6:0)+i/6)%1;ctx.globalAlpha=0.35*(1-ph);ctx.fillStyle='#e8eef5';ctx.beginPath();ctx.arc(x+s*0.4+ph*s*1.6,y-s*0.3-ph*s*0.5,s*(0.25+ph*0.6),0,7);ctx.fill()}ctx.globalAlpha=1}
 else if(k==='speakers'){shadow(s*0.5);for(let r=0;r<2;r++)for(let c=0;c<2;c++){const bx=x-s*0.45+c*s*0.46,by=y-s*0.46-r*s*0.46;ctx.fillStyle='#1a1a1a';ctx.fillRect(bx,by,s*0.44,s*0.44);ctx.fillStyle='#555';ctx.beginPath();ctx.arc(bx+s*0.22,by+s*0.22,s*0.15*(1+(anim?0.08*Math.sin(T*18):0)),0,7);ctx.fill()}}
 else if(k==='tower'){ctx.strokeStyle='#888';ctx.lineWidth=s*0.05;ctx.beginPath();ctx.moveTo(x-s*0.3,y);ctx.lineTo(x,y-s*1.8);ctx.lineTo(x+s*0.3,y);ctx.stroke();ctx.fillStyle='#fff8d0';ctx.shadowColor='#fff3a0';ctx.shadowBlur=18;ctx.fillRect(x-s*0.35,y-s*2.05,s*0.7,s*0.28);ctx.shadowBlur=0}
 else if(k==='cannon'){shadow(s*0.4);ctx.fillStyle='#333';ctx.save();ctx.translate(x,y-s*0.3);ctx.rotate(-0.8);ctx.fillRect(-s*0.12,-s*0.6,s*0.24,s*0.7);ctx.restore();if(anim){for(let i=0;i<8;i++){const ph=(T*0.8+i/8)%1;ctx.fillStyle=['#ff4040','#ffd23f','#3fa9ff','#7fe87f'][i%4];ctx.fillRect(x+s*0.4+ph*s*0.9,y-s*0.9-Math.sin(ph*3)*s*0.6+ph*ph*s,3,3)}}}
 else if(k==='balloon'){ctx.strokeStyle='#ccc';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-s*1.2);ctx.stroke();const b=anim?Math.sin(T*2)*s*0.05:0;ctx.fillStyle=tm().p;ctx.beginPath();ctx.ellipse(x,y-s*1.6+b,s*0.45,s*0.55,0,0,7);ctx.fill();ctx.fillStyle=tm().s;ctx.font='900 '+Math.round(s*0.4)+'px system-ui';ctx.fillText('★',x,y-s*1.48+b)}
 else if(k==='firecan'){for(const d of[-1,1]){const fx=x+d*s*0.4;ctx.fillStyle='#222';ctx.fillRect(fx-s*0.12,y-s*0.3,s*0.24,s*0.3);if(anim){const fh=s*(0.6+0.4*Math.abs(Math.sin(T*9+d)));const g=ctx.createLinearGradient(0,y-s*0.3-fh,0,y-s*0.3);g.addColorStop(0,'rgba(255,240,120,0)');g.addColorStop(0.4,'#ffb21a');g.addColorStop(1,'#ff3a00');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(fx-s*0.12,y-s*0.3);ctx.quadraticCurveTo(fx,y-s*0.3-fh*1.4,fx+s*0.12,y-s*0.3);ctx.fill()}}}
 else if(k==='wall'){ctx.fillStyle='#3a2a14';ctx.fillRect(x-s*0.9,y-s*1.1,s*1.8,s*1.1);ctx.fillStyle='#f2c230';ctx.font='900 '+Math.round(s*0.2)+'px system-ui';ctx.fillText('HALL OF FAME',x,y-s*0.88,s*1.7);for(let i=0;i<3;i++){ctx.fillStyle='#caa24a';ctx.fillRect(x-s*0.75+i*s*0.52,y-s*0.75,s*0.42,s*0.55);ctx.fillStyle='#222';ctx.font=Math.round(s*0.3)+'px system-ui';ctx.fillText('🏈',x-s*0.54+i*s*0.52,y-s*0.35)}}
 ctx.restore()}
window.FGF_PROP=prop;
const odk=drawKicker;drawKicker=function(){try{if(eq.v&&LOOK[eq.v]&&KS.complete&&KS.naturalWidth&&(state==='play'||state==='prev'||state==='pause')){const {x,y,w,h}=KG();prop(eq.v,x+w*0.95,y+h*0.42,Math.min(h*0.15,W*0.11),!(LS.fgfRM==='1'))}}catch(e){}return odk.apply(this,arguments)};
// ---- shop thumbnails ----
const oI=window.FGF_ICON;window.FGF_ICON=function(id,cx,cy,s){const lk=LOOK[id];if(!lk)return oI&&oI.apply(this,arguments);const sl=slot(id);
 if(sl==='c'){ctx.save();ctx.fillStyle='#7a3b12';ctx.beginPath();ctx.ellipse(cx,cy-s*0.45,s*0.42,s*0.62,0.3,0,7);ctx.fill();ctx.restore();tee(id,cx,cy-s*0.35,s*1.5,true);return}
 if(sl==='g'){const k=lk[0];ctx.save();ctx.translate(cx,cy);const c=col(lk[1]||'#fff');
  if(k==='ring'||k==='nova'){ctx.strokeStyle=lk[1]==='rainbow'?fillFor(['rainbow'],-s,0,s*2,1):k==='nova'?'#bff':c;ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(0,0,s*0.95,s*0.55,0,0,7);ctx.stroke()}
  else if(k==='emoji'){ctx.font=Math.round(s*1.3)+'px system-ui';ctx.textAlign='center';ctx.fillText(lk[1],0,s*0.45)}
  else if(k==='bolt'){ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-s*0.2,-s);ctx.lineTo(s*0.25,-s*0.1);ctx.lineTo(-s*0.15,0);ctx.lineTo(s*0.2,s);ctx.stroke()}
  else{const C=k==='confetti'||k==='fireworks'||k==='pixel'?['#ff4040','#ffd23f','#3fa9ff','#7fe87f']:k==='fire'?['#fff27a','#ff9a1a','#d02000']:[c];for(let i=0;i<12;i++){const a=i/12*6.283;ctx.strokeStyle=ctx.fillStyle=C[i%C.length];if(k==='spark'){ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(Math.cos(a)*s*0.3,Math.sin(a)*s*0.3);ctx.lineTo(Math.cos(a)*s,Math.sin(a)*s);ctx.stroke()}else if(k==='stars'){ctx.font=Math.round(s*0.5)+'px system-ui';ctx.fillText('★',Math.cos(a)*s*0.8-3,Math.sin(a)*s*0.8+3)}else{ctx.beginPath();ctx.arc(Math.cos(a)*s*0.75,Math.sin(a)*s*0.75,k==='puff'?s*0.3:s*0.14,0,7);ctx.fill()}}}
  ctx.restore();return}
 if(sl==='v'){prop(id,cx,cy+s*0.9,s*1.15,true);return}};
// keep the EXTRAS Gear Box pointed at the new categories
try{const B=window.FGF_BOXES.find(b=>b[0]==='mbG');if(B){B[1]='🎯 GEAR BOX';B[2]='Tees, kick effects & sideline props';B[3]=['TEES','KICK FX','SIDELINE']}}catch(e){}
})();
