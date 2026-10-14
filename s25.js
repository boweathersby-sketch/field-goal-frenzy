// s25: coin sinks (all cosmetic): Ball skins, Stadium themes, more trails/celebrations/uprights, Weather tab, Mystery Box, Streak Freeze.
// Physics untouched: skins only change how the ball is drawn (same position, size and flight).
(function(){
const BALLS=[['bl0','Football',0],['bl1','Pumpkin',600],['bl2','Basketball',800],['bl3','Soccer Ball',800],['bl4','Tennis Ball',900],['bl5','Baseball',1000],['bl6','Beach Ball',1500],['bl7','Watermelon',2000],['bl8','Disco Ball',3500],['bl9','Golden Ball',5000]];
const THEMES=[['th0','Home Stadium',0],['th1','Night Lights',800],['th2','Snow Bowl',1100],['th3','Backyard',1400],['th4','Beach Bowl',1800]];
SHOP.push(['BALLS',BALLS],['STADIUMS',THEMES],['WEATHER',[]],['EXTRAS',[]]);
const TR=SHOP.find(c=>c[0]==='TRAILS'),CE=SHOP.find(c=>c[0]==='CELEBRATE');
[['t14','Confetti Trail',1500],['t15','Frost Trail',1200],['t16','Toxic Green',900]].forEach(i=>TR[1].push(i));
[['e12','Star Burst',900],['e14','Heart Burst',1200],['e15','Rainbow Blast',1800],['e13','Coin Shower',2500]].forEach(i=>CE[1].push(i));
SHOP.forEach(c=>c[1].forEach(i=>ITEM[i[0]]=i));
if(!eq.b)eq.b='bl0';if(!eq.s)eq.s='th0';
const otr=S3.trail;S3.trail=function(a){const t=eq.t;if(t==='t14')return['rgba(255,80,120,','rgba(255,214,0,','rgba(60,200,255,','rgba(120,255,120,'][(a*14|0)%4]+a+')';if(t==='t15')return'rgba('+(170+a*80|0)+',230,255,'+a+')';if(t==='t16')return'rgba(120,255,60,'+a+')';return otr.apply(this,arguments)};
// ---- celebrations ----
const burst=(cs,n)=>{const x=W*(0.2+Math.random()*0.6),y=H*(0.15+Math.random()*0.25);for(let i=0;i<(n||40);i++){const a=i/(n||40)*6.28,v=80+Math.random()*90;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,c:cs[i%cs.length],l:1.3+Math.random()*0.5,g:110,f:1})}};
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);if(good&&ball&&ball.res!=='BLOCKED!'){const e=eq.e;
 if(e==='e12')for(let i=0;i<4;i++)setTimeout(()=>burst(['#fff6a0','#ffffff','#ffd23f'],50),i*260);
 if(e==='e14')for(let i=0;i<4;i++)setTimeout(()=>burst(['#ff4d8d','#ff8fb5','#ffffff']),i*280);
 if(e==='e15')for(let i=0;i<5;i++)setTimeout(()=>burst(['#ff3b30','#ff9500','#ffcc00','#34c759','#007aff','#af52de'],60),i*240);
 if(e==='e13')for(let i=0;i<90;i++)parts.push({x:Math.random()*W,y:-10-Math.random()*120,vx:(Math.random()-.5)*40,vy:120+Math.random()*140,c:i%3?'#f2c230':'#fff3a0',l:2.6})}return r};
// ---- uprights (My Stadium) ----
try{UPR.push(['bubble','Bubblegum Pink',900],['usa','Stars & Stripes',1400],['rainbow','Rainbow',1800])}catch(e){}
try{const oU=drawUprights;drawUprights=function(x,id,b,c,l,r,lt,rt,w){if(!['bubble','usa','rainbow'].includes(id))return oU.apply(this,arguments);x.save();x.lineCap='round';x.lineJoin='round';const P2=(st,lw)=>{x.strokeStyle=st;x.lineWidth=lw;postPath(x,b,c,l,r,lt,rt)};P2('rgba(0,0,0,0.55)',w+2.5);
 if(id==='bubble'){P2('#ff6fb5',w);P2('#ffd1ea',Math.max(1,w*0.35))}else if(id==='usa'){P2('#ffffff',w);x.setLineDash([w*1.6,w*1.6]);P2('#d62839',w);x.setLineDash([]);x.strokeStyle='#1f4bd1';x.lineWidth=w*0.9;x.beginPath();x.moveTo(lt.x,lt.y);x.lineTo(lt.x,lt.y+(l.y-lt.y)*0.18);x.moveTo(rt.x,rt.y);x.lineTo(rt.x,rt.y+(r.y-rt.y)*0.18);x.stroke()}
 else{const g=x.createLinearGradient(l.x,lt.y,r.x,b.y);['#ff3b30','#ff9500','#ffcc00','#34c759','#007aff','#af52de'].forEach((c2,i)=>g.addColorStop(i/5,c2));P2(g,w)}x.restore()}}catch(e){}
// ---- ball skins (drawn in place of the football; same spot/size) ----
const RB=(r)=>r*0.72;
window.FGF_BSKIN=function(p,r){const id=eq.b;if(!id||id==='bl0')return false;const R=RB(r);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ball.fly?ball.rot*0.6:0);
 const disc=(c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(0,0,R,0,7);ctx.fill()},shade=()=>{const g=ctx.createRadialGradient(-R*0.35,-R*0.4,R*0.1,0,0,R);g.addColorStop(0,'rgba(255,255,255,0.35)');g.addColorStop(1,'rgba(0,0,0,0.3)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R,0,7);ctx.fill()},ln=(c,w)=>{ctx.strokeStyle=c;ctx.lineWidth=Math.max(0.6,R*w)};
 if(id==='bl1'){ctx.fillStyle='#ff7a1a';ctx.beginPath();ctx.ellipse(0,0,R*1.1,R*0.92,0,0,7);ctx.fill();ln('#c2540a',0.08);for(const k of[-0.5,0,0.5]){ctx.beginPath();ctx.ellipse(R*k,0,R*0.35,R*0.9,0,0,7);ctx.stroke()}ctx.fillStyle='#3d7a1e';ctx.fillRect(-R*0.1,-R*1.15,R*0.2,R*0.3)}
 else if(id==='bl2'){disc('#e8741c');ln('#2b1408',0.08);ctx.beginPath();ctx.moveTo(-R,0);ctx.lineTo(R,0);ctx.moveTo(0,-R);ctx.lineTo(0,R);ctx.stroke();ctx.beginPath();ctx.arc(-R*1.25,0,R*0.95,-0.9,0.9);ctx.stroke();ctx.beginPath();ctx.arc(R*1.25,0,R*0.95,Math.PI-0.9,Math.PI+0.9);ctx.stroke()}
 else if(id==='bl3'){disc('#f4f4f4');ctx.fillStyle='#1b1b1b';const pg=(cx,cy,s)=>{ctx.beginPath();for(let i=0;i<5;i++){const a=-Math.PI/2+i*1.2566;ctx.lineTo(cx+Math.cos(a)*s,cy+Math.sin(a)*s)}ctx.fill()};pg(0,0,R*0.36);for(let i=0;i<5;i++){const a=-Math.PI/2+i*1.2566;pg(Math.cos(a)*R*0.92,Math.sin(a)*R*0.92,R*0.26)}}
 else if(id==='bl4'){disc('#d7f03c');ln('#ffffff',0.1);ctx.beginPath();ctx.arc(-R*0.95,0,R*0.75,-1.1,1.1);ctx.stroke();ctx.beginPath();ctx.arc(R*0.95,0,R*0.75,Math.PI-1.1,Math.PI+1.1);ctx.stroke()}
 else if(id==='bl5'){disc('#fbf8ef');ln('#d0302b',0.07);ctx.beginPath();ctx.arc(-R*1.05,0,R*0.8,-1,1);ctx.stroke();ctx.beginPath();ctx.arc(R*1.05,0,R*0.8,Math.PI-1,Math.PI+1);ctx.stroke()}
 else if(id==='bl6'){const C=['#ff3b30','#ffffff','#ffcc00','#ffffff','#007aff','#ffffff'];C.forEach((c,i)=>{ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,i*1.047,(i+1)*1.047);ctx.fill()});disc0()}
 else if(id==='bl7'){ctx.fillStyle='#2f8f2f';ctx.beginPath();ctx.ellipse(0,0,R*1.2,R*0.9,0,0,7);ctx.fill();ln('#145214',0.12);for(const k of[-0.6,-0.2,0.2,0.6]){ctx.beginPath();ctx.ellipse(0,R*k*0.9,R*1.1,R*0.12,0,0,7);ctx.stroke()}}
 else if(id==='bl8'){disc('#9aa6b2');ctx.save();ctx.beginPath();ctx.arc(0,0,R,0,7);ctx.clip();const n=6,s=R*2/n;for(let i=0;i<n;i++)for(let j=0;j<n;j++){const v=150+((i*7+j*13+(T*8|0))%5)*22;ctx.fillStyle='rgb('+v+','+v+','+(v+20)+')';ctx.fillRect(-R+i*s+0.4,-R+j*s+0.4,s-0.8,s-0.8)}ctx.restore();ctx.fillStyle='rgba(255,255,255,'+(0.5+0.5*Math.sin(T*9))+')';ctx.beginPath();ctx.arc(-R*0.4,-R*0.45,Math.max(1,R*0.16),0,7);ctx.fill()}
 else if(id==='bl9'){ctx.restore();ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ball.fly?0.3*Math.sin(ball.rot*0.2):-0.25);ctx.scale(1,ball.fly?0.55+0.4*Math.abs(Math.cos(ball.rot)):1);const g=ctx.createLinearGradient(-r*0.6,-r,r*0.6,r);g.addColorStop(0,'#fff3a0');g.addColorStop(0.5,'#e2a800');g.addColorStop(1,'#8a6100');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,r*0.62,r,0,0,7);ctx.fill();ln('#fff8d0',0.09/0.72);ctx.beginPath();ctx.moveTo(0,-r*0.45);ctx.lineTo(0,r*0.45);ctx.stroke();for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(-r*0.13,i*r*0.16);ctx.lineTo(r*0.13,i*r*0.16);ctx.stroke()}ctx.restore();return true}
 function disc0(){}
 shade();ctx.restore();return true};
// ---- stadium themes: background-only overlay (kicker/mascot/field art untouched) ----
const FL=[];for(let i=0;i<40;i++)FL.push({x:Math.random(),y:Math.random(),s:0.5+Math.random()});
const oBG=drawBG;drawBG=function(){const r=oBG.apply(this,arguments);const th=eq.s;if(!th||th==='th0')return r;let hz=H*0.42;try{const b=P(0,0,dist+0.2);if(b)hz=b.y}catch(e){}
 ctx.save();if(th==='th1'){const g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'rgba(5,10,40,0.7)');g.addColorStop(1,'rgba(10,20,60,0.25)');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);ctx.fillStyle='#fff';FL.forEach(f=>{ctx.globalAlpha=0.4+0.6*Math.abs(Math.sin(T*2+f.s*9));ctx.fillRect(f.x*W,f.y*hz*0.8,1.5,1.5)});ctx.globalAlpha=1;for(const x0 of[0.12,0.88]){const gg=ctx.createRadialGradient(W*x0,hz*0.25,2,W*x0,hz*0.25,W*0.25);gg.addColorStop(0,'rgba(255,255,230,0.55)');gg.addColorStop(1,'rgba(255,255,230,0)');ctx.fillStyle=gg;ctx.fillRect(0,0,W,hz)}}
 else if(th==='th2'){ctx.fillStyle='rgba(225,238,255,0.28)';ctx.fillRect(0,0,W,hz);ctx.fillStyle='rgba(255,255,255,0.9)';FL.forEach(f=>{const y=((f.y+T*0.06*f.s)%1)*H,x=(f.x*W+Math.sin(T+f.s*7)*12);ctx.beginPath();ctx.arc(x,y,1.2+f.s*1.4,0,7);ctx.fill()})}
 else if(th==='th3'){const g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'rgba(255,140,60,0.45)');g.addColorStop(1,'rgba(255,200,120,0.15)');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);ctx.fillStyle='#6b4423';const fy=hz-H*0.05;ctx.fillRect(0,fy+H*0.012,W,H*0.008);ctx.fillRect(0,fy+H*0.032,W,H*0.008);for(let x=0;x<W;x+=W/18){ctx.beginPath();ctx.moveTo(x,fy+H*0.05);ctx.lineTo(x,fy+4);ctx.lineTo(x+W/72,fy);ctx.lineTo(x+W/36,fy+4);ctx.lineTo(x+W/36,fy+H*0.05);ctx.fill()}ctx.fillStyle='#ffe98a';FL.slice(0,14).forEach(f=>{ctx.globalAlpha=0.4+0.6*Math.abs(Math.sin(T*3+f.s*5));ctx.beginPath();ctx.arc(f.x*W,hz*(0.55+f.y*0.4),1.6,0,7);ctx.fill()});ctx.globalAlpha=1}
 else if(th==='th4'){const g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'rgba(40,190,230,0.5)');g.addColorStop(1,'rgba(255,190,120,0.3)');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);ctx.fillStyle='rgba(255,230,120,0.95)';ctx.beginPath();ctx.arc(W*0.8,hz*0.28,Math.min(W,H)*0.07,0,7);ctx.fill();ctx.fillStyle='rgba(30,140,200,0.55)';ctx.fillRect(0,hz-H*0.03,W,H*0.03);ctx.font=Math.round(H*0.07)+'px system-ui';ctx.textAlign='center';ctx.fillText('🌴',W*0.07,hz-H*0.01);ctx.fillText('🌴',W*0.93,hz-H*0.01)}
 
 // turf wash so themes read clearly on the field
 if(th==='th1'){ctx.fillStyle='rgba(8,12,40,0.22)';ctx.fillRect(0,hz,W,H-hz)}
 else if(th==='th2'){ctx.fillStyle='rgba(220,235,255,0.2)';ctx.fillRect(0,hz,W,H-hz)}
 else if(th==='th3'){ctx.fillStyle='rgba(120,80,30,0.18)';ctx.fillRect(0,hz,W,H-hz)}
 else if(th==='th4'){ctx.fillStyle='rgba(230,200,100,0.16)';ctx.fillRect(0,hz,W,H-hz)}
 // name pill
 const nm=state==='play'||state==='pause'?null:(ITEM[th]||[])[1];if(nm){ctx.globalAlpha=0.9;ctx.fillStyle='rgba(0,0,0,0.45)';ctx.beginPath();ctx.roundRect(W/2-70,8,140,18,9);ctx.fill();ctx.fillStyle='#ffe08a';ctx.font='900 10px system-ui';ctx.textAlign='center';ctx.fillText(nm,W/2,21);ctx.globalAlpha=1}
ctx.restore();return r};
// ---- weather for coins (Classic runs) ----
const WX=[['rain','🌧️ Rain','Wet ball, light wind',60,800],['snow','❄️ Heavy Snow','Snow all game',80,1200],['fog','🌫️ Fog','Posts fade in the mist',80,1200],['gust','💨 Gusty Wind','Stronger, swirling wind',100,1500],['heat','🔥 Heat Wave','Shimmering air',100,1500],['hlite','⛈️ Thunderstorm','30–50 mph storm winds',150,2500],['chaos','🌀 Chaos','Random weather every kick',200,3500],['hurricane','🌪️ Hurricane','140 mph winds in Classic',250,4000]];
const wxOwn=()=>{const o=J('fgfWxOwn',[]);try{if(typeof stOwn==='function'){if(stOwn('wx1')&&!o.includes('snow'))o.push('snow');if(stOwn('wx2')&&!o.includes('rain'))o.push('rain')}}catch(e){}return o};
let WXRUN=null;window.FGF_WXRUN=()=>WXRUN;
const W7=['clear','rain','snow','gust','hlite','fog','heat'];
const oNW=newWind;newWind=function(){if(WXRUN&&mode==='classic'){window.__wx=WXRUN==='chaos'?W7[Math.random()*7|0]:WXRUN;if(WXRUN==='chaos')bannerT=2.2;try{return oNW.apply(this,arguments)}finally{window.__wx=undefined}}return oNW.apply(this,arguments)};
setInterval(()=>{if(WXRUN&&(mode!=='classic'||['title','shop','hub','teams'].includes(state)))WXRUN=null},300);
function wxPlay(id){WXRUN=id;newGame('classic');toast('Classic · '+WX.find(w=>w[0]===id)[1])}
// ---- extras ----
const RAR=[['common',.60,0,800],['rare',.30,801,2200],['epic',.09,2201,4500],['legendary',.01,4501,1e9]];
const RAR_L={common:'Common (60%)',rare:'Rare (30%)',epic:'Epic (9%)',legendary:'Legendary (1%)'};
function pool(){const L=[];SHOP.forEach(c=>{if(['BALLS','TRAILS','CELEBRATE','CLEATS','HANDS','STADIUMS','HORNS','CHANTS','FLAGS'].includes(c[0]))c[1].forEach(i=>{if(i[2]>0&&!(i[0]||'').startsWith('blS')&&!(window.FGF_LIMITED&&FGF_LIMITED[i[0]])&&!own.includes(i[0]))L.push(i)})});
 try{UPR.forEach(u=>{if(u[2]>0&&!UPO.includes(u[0]))L.push(['up_'+u[0],u[1]+' Uprights',u[2]])})}catch(e){}return L}
const rarity=i=>{for(const [n,p,a,b] of RAR)if(i[2]>=a&&i[2]<=b)return n;return'common'};
let MB=null;
const MBP=()=>pool().length?500:250;
function mystery(){const P=pool();if(!P.length){const paid=250,n=Math.max(paid,50)+Math.floor(Math.random()*(500-Math.max(paid,50)+1));addCoins(n);MB={it:['coins','🪙 '+n+' coins',0],coins:n,rar:'',t0:performance.now()};sfx.cheer();return MB.it}
 const by={};RAR.forEach(([n])=>by[n]=[]);P.forEach(i=>by[rarity(i)].push(i));
 let alive=RAR.filter(([n,p])=>by[n].length),tot=alive.reduce((a,[,p])=>a+p,0),r=Math.random()*tot,pick=alive[0][0];
 for(const [n,p] of alive){r-=p;if(r<=0){pick=n;break}}
 const bag=by[pick],it=bag[Math.random()*bag.length|0];
 if(it[0].startsWith('up_')){const id=it[0].slice(3);try{if(!UPO.includes(id)){UPO.push(id);SV('fgfUpO',UPO)}}catch(e){}}
 else{own.push(it[0]);SV('fgfOwn',own)}
 MB={it,dupe:false,rar:pick,t0:performance.now()};sfx.cheer();return it}
const FRZ=()=>+LS.fgfFreeze||0;
const oDD=dailyDone;dailyDone=function(good){try{const d=DL(),y=new Date();y.setDate(y.getDate()-1);const y2=new Date();y2.setDate(y2.getDate()-2);if(good&&d.streak>0&&d.last===dkey(y2)&&FRZ()>0){d.last=dkey(y);SV('fgfDaily',d);LS.fgfFreeze=FRZ()-1;setTimeout(()=>toast('🧊 Streak Freeze used · streak saved!'),600)}}catch(e){}return oDD.apply(this,arguments)};
// ---- shop (tabs in 2 rows, paging, custom tabs) ----
let page=0,lastTab=-1,pend=null;const TABN=()=>[...SHOP.map(c=>c[0]),'💰 PACKS'];
const rowsArea=()=>{const y0=H*0.14+Math.ceil(TABN().length/5)*34+6,y1=H*0.86-36;return{y0,y1}};
function pager(n,per){const pages=Math.ceil(n/per);if(page>=pages)page=0;if(pages>1){const y=H*0.86-30;bx(W*0.04,y,56,28,'◀',()=>page=(page+pages-1)%pages,false,13);bx(W*0.96-56,y,56,28,'▶',()=>page=(page+1)%pages,false,13);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Page '+(page+1)+' / '+pages,W/2,y+18)}else{ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Coins only · all cosmetic',W/2,H*0.86-12)}return page*per}
const tierS=pr=>pr===0?'FREE':pr<=1000?'COMMON':pr<=3000?'RARE':pr<=8000?'EPIC':'LEGENDARY';
function preview(id,x,y,s){if(id.startsWith('bl')){const sv=eq.b,b0={...ball};eq.b=id;const fake={x,y,s:s/0.19};try{ball.fly=false;if(id==='bl0'){ctx.save();ctx.translate(x,y);ctx.rotate(-0.25);ctx.fillStyle='#7a3b12';ctx.beginPath();ctx.ellipse(0,0,s*0.62,s,0,0,7);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=Math.max(0.8,s*0.09);ctx.beginPath();ctx.moveTo(0,-s*0.45);ctx.lineTo(0,s*0.45);ctx.stroke();ctx.restore()}else FGF_BSKIN(fake,s)}finally{eq.b=sv;Object.assign(ball,b0)}}
 else if(id.startsWith('th')){let C={th0:['#2b5b2b','#173d17'],th1:['#0a1440','#1d2c66'],th2:['#dfeaff','#9fb6d6'],th3:['#ff9a50','#6b4423'],th4:['#3ec3e8','#ffd27a']}[id];if(!C&&window.FGF_CAT&&FGF_CAT.THX&&FGF_CAT.THX[id])C=[FGF_CAT.THX[id][1],FGF_CAT.THX[id][2]];if(!C)C=['#2a3a2a','#102010'];const g=ctx.createLinearGradient(0,y-s,0,y+s);g.addColorStop(0,C[0]);g.addColorStop(1,C[1]);ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(x-s*1.3,y-s,s*2.6,s*2,5);ctx.fill()}}
function itemRows(it){{const a=rowsArea();ctx.save();ctx.fillStyle='rgba(4,18,10,0.97)';ctx.beginPath();ctx.roundRect(W*0.03,a.y0-4,W*0.94,a.y1-a.y0+40,12);ctx.fill();ctx.restore()}const {y0,y1}=rowsArea(),rh=52,per=Math.max(1,Math.floor((y1-y0)/rh)),st=pager(it.length,per);
 it.slice(st,st+per).forEach((m,k)=>{const y=y0+k*rh,[id,nm,pr,stt,bo]=m,o=pr===0||own.includes(id)||!!window.TESTER,sl=slot(id),on=eq[sl]===id||(sl==='b'&&!eq.b&&id==='bl0')||(sl==='s'&&!eq.s&&id==='th0');ctx.fillStyle='rgba(6,30,16,0.98)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(W*0.04,y,W*0.92,rh-6,12);ctx.fill();ctx.stroke();const snd=id.startsWith('hn')||id.startsWith('zc'),ic=(id.startsWith('bl')||id.startsWith('th')||snd)?34:0;if(snd)bx(W*0.04+6,y+(rh-6)/2-15,30,30,'🔊',()=>{try{if(window.AC&&AC.resume)AC.resume()}catch(e){}window.FGF_PLAYH&&FGF_PLAYH(id)},false,13);if(ic)try{preview(id,W*0.04+22,y+(rh-6)/2,Math.min(13,rh*0.24))}catch(e){}
  const bw=W*0.3,tx=W*0.07+ic,mw=W*0.92-bw-ic-W*0.06;ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?13:15)+'px system-ui';let n2=nm;while(ctx.measureText(n2).width>mw&&n2.length>3)n2=n2.slice(0,-2)+'…';ctx.fillText(n2,tx,y+rh*0.4);ctx.font='11px system-ui';ctx.fillStyle='#bcd';const lim=window.FGF_LIMITED&&FGF_LIMITED[id];ctx.fillText((lim?(lim===1?'🎃 LIMITED':lim):tierS(pr))+' · '+(pr===0?'FREE':'🪙 '+pr.toLocaleString())+(bo?' · +'+Math.round(bo*100)+'% '+({p:'power',a:'accuracy',v:'aim help'})[stt]:''),tx,y+rh*0.68,mw);
  bx(W*0.92-bw,y+(rh-6)/2-15,bw,30,on?'EQUIPPED':o?'EQUIP':pend===id?'CONFIRM':'🪙 '+pr.toLocaleString(),()=>{if(o){eq[sl]=on&&(sl==='g'||sl==='v')?'':id;SV('fgfEq',eq)}else if(pend===id){if(coins>=pr){addCoins(-pr);own.push(id);SV('fgfOwn',own);eq[sl]=id;SV('fgfEq',eq);toast('✔ '+nm);sfx.cheer()}else toast('Need 🪙 '+pr.toLocaleString());pend=null}else pend=id},on,12)})}
function wxRows(){{const a=rowsArea();ctx.fillStyle='rgba(4,18,10,0.97)';ctx.fillRect(W*0.03,a.y0-4,W*0.94,a.y1-a.y0+40)}const {y0,y1}=rowsArea(),o=wxOwn(),rh=Math.max(52,Math.min(62,(y1-y0-22)/WX.length)),per=Math.max(1,Math.floor((y1-y0-22)/rh));ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Premium weather for Classic · Clear, Hurricane & Chaos modes stay free',W/2,y0+12,W*0.9);const st=pager(WX.length,per);
 WX.slice(st,st+per).forEach((w,k)=>{const y=y0+22+k*rh,[id,nm,ds,p1,p2]=w,ow=o.includes(id)||!!window.TESTER;panel(W*0.04,y,W*0.92,rh-6);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?13:14)+'px system-ui';ctx.fillText(nm,W*0.07,y+rh*0.38);ctx.font='11px system-ui';ctx.fillStyle='#bcd';ctx.fillText(ow?'Owned · play any time':ds,W*0.07,y+rh*0.66,W*0.4);
  const bh=26,by=y+(rh-6)/2-bh/2;if(ow)bx(W*0.92-W*0.26,by,W*0.26,bh,'▶ PLAY',()=>wxPlay(id),true,12);else{const b1=W*0.2,b2=W*0.22;bx(W*0.92-b2-b1-6,by,b1,bh,pend==='r'+id?'CONFIRM':'1 RUN 🪙'+p1,()=>{if(pend==='r'+id){if(coins>=p1){addCoins(-p1);pend=null;wxPlay(id)}else{toast('Need 🪙 '+p1);pend=null}}else pend='r'+id},false,W<350?9:10);
   bx(W*0.92-b2,by,b2,bh,pend==='o'+id?'CONFIRM':'OWN 🪙'+p2.toLocaleString(),()=>{if(pend==='o'+id){if(coins>=p2){addCoins(-p2);const L=J('fgfWxOwn',[]);L.push(id);SV('fgfWxOwn',L);toast('✔ '+nm+' unlocked');sfx.cheer()}else toast('Need 🪙 '+p2.toLocaleString());pend=null}else pend='o'+id},false,W<350?9:10)}})}
function extras(){const {y0}=rowsArea(),bw=W*0.92,x=W*0.04,h=Math.min(148,H*0.2),left=pool().length;
 panel(x,y0,bw,h);ctx.textAlign='left';ctx.fillStyle=GOLD;ctx.font='900 17px system-ui';ctx.fillText('🎁 MYSTERY BOX',x+14,y0+26);ctx.fillStyle='#fff';ctx.font='12px system-ui';ctx.fillText(left?'One random cosmetic you don\'t own yet.':'Collection complete! Box now gives 🪙 250–500.',x+14,y0+46,bw-28);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('Odds: Common 60% · Rare 30% · Epic 9% · Legendary 1%',x+14,y0+64,bw-28);ctx.fillText(left?(left+' left to unlock · never a duplicate · no season-only items'):'You never get back less than you paid.',x+14,y0+80,bw-28);
 const mp=MBP();bx(x+bw-150,y0+h-44,136,34,pend==='mb'?'CONFIRM':'🪙 '+mp,()=>{if(pend==='mb'){if(coins>=mp){addCoins(-mp);mystery()}else toast('Need 🪙 '+mp);pend=null}else pend='mb'},true,13);
 const y2=y0+h+10;panel(x,y2,bw,h);ctx.textAlign='left';ctx.fillStyle='#7fd3ff';ctx.font='900 17px system-ui';ctx.fillText('🧊 STREAK FREEZE',x+14,y2+26);ctx.fillStyle='#fff';ctx.font='12px system-ui';ctx.fillText('Miss one day, keep your Daily streak.',x+14,y2+46,bw-28);ctx.fillStyle='#bcd';ctx.fillText('You have '+FRZ()+' / 2 · used automatically',x+14,y2+64,bw-28);
 bx(x+bw-150,y2+h-44,136,34,FRZ()>=2?'FULL':pend==='fz'?'CONFIRM':'🪙 400',()=>{if(FRZ()>=2)return;if(pend==='fz'){if(coins>=400){addCoins(-400);LS.fgfFreeze=FRZ()+1;toast('🧊 Streak Freeze added');sfx.cheer()}else toast('Need 🪙 400');pend=null}else pend='fz'},FRZ()<2,13);
 ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Coins only · all cosmetic',W/2,H*0.86-12)}
drawShop=function(){txt('COIN SHOP',W/2,H*0.065,Math.min(30,W*0.08),GOLD,'#063');ctx.fillStyle=GOLD;ctx.font='900 15px system-ui';ctx.textAlign='center';ctx.fillText('🪙 '+CSTR(),W/2,H*0.065+22);
 if(shopTab!==lastTab){page=0;pend=null;lastTab=shopTab}if(shopTab===SHOP.length)LS.fgfSPseen='1';const T5=TABN(),tw=(W*0.92-16)/5;T5.forEach((c,i)=>bx(W*0.04+(i%5)*(tw+4),H*0.14+(i/5|0)*34,tw,30,c,()=>{shopTab=i;pendBuy=null},i===shopTab,Math.min(11,tw/7.2)));
 if(shopTab===SHOP.length){window.SHOP_DY=0;drawPacks();bx(W/2-90,H*0.93-14,180,40,'◀ BACK',()=>state='title');return}
 const nm=SHOP[shopTab][0];if(nm==='WEATHER')wxRows();else if(nm==='EXTRAS')extras();else itemRows(SHOP[shopTab][1]);
 bx(W/2-90,H*0.93-14,180,40,'◀ BACK',()=>state='title');
 if(MB){const a=(performance.now()-MB.t0)/1000;if(a>3.2)MB=null;else{BTN=[];ctx.fillStyle='rgba(0,0,0,0.75)';ctx.fillRect(0,0,W,H);panel(W*0.1,H*0.3,W*0.8,H*0.3);txt('🎁 MYSTERY BOX',W/2,H*0.36,22,GOLD,'#063');if(MB.it[0].startsWith('bl')||MB.it[0].startsWith('th'))preview(MB.it[0],W/2,H*0.43,16);txt(MB.it[1],W/2,H*0.5,20,'#fff');ctx.fillStyle='#7fe87f';ctx.font='bold 13px system-ui';ctx.textAlign='center';ctx.fillText(MB.coins?'Collection complete · coins instead':(RAR_L[MB.rar]||'')+' · New! Equip it in its tab',W/2,H*0.55)}}};
window.FGF_SHOPPG=v=>{if(v!=null)page=v;return page};// Soften original gear prices too
SHOP.forEach(c=>{if(['CLEATS','HANDS','TRAILS','CELEBRATE'].includes(c[0]))c[1].forEach(it=>{if(it[2]>5000){it[2]=Math.round(it[2]*0.55/50)*50;ITEM[it[0]]=it}else if(it[2]>3000){it[2]=Math.round(it[2]*0.75/50)*50;ITEM[it[0]]=it}})});
// gear boosts capped (no pay-to-win): max +3%
SHOP.forEach(c=>c[1].forEach(it=>{if(typeof it[4]==='number'&&it[4]>0){it[4]=Math.round(Math.min(0.03,it[4]*0.3)*100)/100||0.01;ITEM[it[0]]=it}}));
window.FGF_SHOPTEST={mystery,wxPlay,WX,BALLS,THEMES};
})();
