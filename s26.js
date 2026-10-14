// s26: visible gear on the kicker (tint overlays on hands/feet/visor; sprite untouched), Deal of the Day before/after preview,
// "Equipped!" preview card in the shop, and a fully side-effect-free Try-On.
(function(){
const HANDS=[[[.14,.54],[.58,.56]],[[.19,.56],[.63,.56]],[[.06,.56],[.67,.455]],[[.105,.56],[.65,.18]]];
const FEET=[[[.10,.94],[.59,.94]],[[.10,.93],[.60,.95]],[[.44,.94],[.73,.69]],[[.42,.94],[.82,.265]]];
const HELM=[[.35,.105],[.47,.105],[.34,.13],[.29,.13]];
const GLV={g1:['#ff8a00',0],g2:['#39ff14',1]},VIS={v1:['#7d8ea6',0],v2:['#ff2bd6',1],v3:['#ffd23f',1]},CLT={c1:['#25c4ff',0],c2:['#58e6ff',1],c3:['#ffd23f',1],c9:['#ff7a00',1],c10:['#a0522d',0],c11:['#e6283c',0]};window.FGF_GEARC={GLV,VIS,CLT};
function gear(fr,x,y,w,h,e){fr=Math.max(0,Math.min(3,fr|0));ctx.save();const P=(q)=>[x+w*q[0],y+h*q[1]];
 const g=GLV[e.g];if(g){const r=w*0.06;HANDS[fr].forEach(q=>{const [px,py]=P(q);if(g[1]){ctx.shadowColor=g[0];ctx.shadowBlur=r*1.6}ctx.fillStyle=g[0];ctx.globalAlpha=0.9;ctx.beginPath();ctx.ellipse(px,py,r*0.8,r,0,0,7);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1;ctx.strokeStyle='#fff';ctx.lineWidth=Math.max(1,r*0.28);ctx.beginPath();ctx.moveTo(px-r*0.75,py-r*0.85);ctx.lineTo(px+r*0.75,py-r*0.85);ctx.stroke()})}
 const c=CLT[e.c];if(c){FEET[fr].forEach(q=>{const [px,py]=P(q);if(c[1]){ctx.shadowColor=c[0];ctx.shadowBlur=w*0.06}ctx.fillStyle=c[0];ctx.globalAlpha=0.8;ctx.beginPath();ctx.ellipse(px,py,w*0.085,h*0.022,0,0,7);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1})}
 const v=VIS[e.v];if(v){const [px,py]=P(HELM[fr]);if(v[1]){ctx.shadowColor=v[0];ctx.shadowBlur=w*0.07}ctx.strokeStyle=v[0];ctx.lineWidth=Math.max(2,w*0.035);ctx.beginPath();ctx.ellipse(px,py,w*0.13,h*0.05,0,-0.35,0.9);ctx.stroke();ctx.shadowBlur=0}
 ctx.restore()}
window.FGF_GEAR=gear;
const od=S3.decal;S3.decal=function(fr,x,y,w,h){const r=od.apply(this,arguments);try{const im=S3.kimg();if(!(im&&im._masc))gear(fr,x,y,w,h,eq)}catch(e){}return r};
// kicker preview box (frame 0, current team kicker)
function kprev(x,y,h,e){const im=S3.kimg();if(!im||!im.complete&&!im.getContext)return;const fw=203,fh=300,w=h*fw/fh;try{ctx.drawImage(im,0,0,fw,fh,x-w/2,y,w,h)}catch(er){return}if(!(im&&im._masc))gear(0,x-w/2,y,w,h,e)}
window.FGF_KPREV=kprev;
const KIND={h:'GOAL HORN · plays when you score',z:'CROWD CHANT · the crowd sings on a streak',c:'CLEATS · on your kicker\'s feet',g:'GLOVES · on your kicker\'s hands',v:'VISOR · on your kicker\'s helmet',t:'KICK TRAIL · behind the ball',e:'CELEBRATION · after a make',b:'BALL SKIN · replaces the football',s:'STADIUM THEME · the background'};
function itemPrev(id,cx,cy,s){const sl=slot(id);if(sl==='t'){const sv=eq.t;eq.t=id;ctx.save();ctx.lineCap='round';for(let i=0;i<18;i++){const a=i/18;ctx.strokeStyle=S3.trail(a*0.9+0.1);ctx.lineWidth=2+a*s*0.25;ctx.beginPath();ctx.moveTo(cx-s*1.6+a*s*3.2,cy+s*0.6-a*s*1.2);ctx.lineTo(cx-s*1.6+(a+1/18)*s*3.2,cy+s*0.6-(a+1/18)*s*1.2);ctx.stroke()}ctx.restore();eq.t=sv;return}
 if(sl==='e'){ctx.font=(s*1.4|0)+'px system-ui';ctx.textAlign='center';ctx.fillText(id==='e0'?'🎉':id==='e13'?'🪙':id==='e14'?'💖':id==='e15'?'🌈':id==='e12'?'⭐':'🎆',cx,cy+s*0.5);return}
 ctx.font=(s|0)+'px system-ui';ctx.textAlign='center';ctx.fillText(sl==='b'?'🏈':'🏟️',cx,cy+s*0.35)}
window.FGF_ICON=function(id,cx,cy,s){const sl=slot(id);
 if(sl==='t')return itemPrev(id,cx,cy,s*0.85);
 if(sl==='e'){const C=window.FGF_CAT&&FGF_CAT.CEX[id];const cols=C?C[1]:id==='e1'?['#ff4040','#ffd23f','#3fa9ff']:id==='e2'?['#ffd23f','#ff6ad5','#5cf']:['#ff4d8d','#ffd23f','#4dd2ff','#7fe87f'];
  ctx.save();for(let i=0;i<14;i++){const a=i/14*6.283,r=s*(0.45+0.55*((i*7)%5)/4);ctx.fillStyle=cols[i%cols.length];ctx.beginPath();ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r*0.8,s*0.13+1,0,7);ctx.fill()}ctx.restore();return}
 if(sl==='c'||sl==='g'||sl==='v'){const e=Object.assign({},eq);e[sl]=id;ctx.save();ctx.beginPath();ctx.rect(cx-s*1.3,cy-s*1.55,s*2.6,s*3.1);ctx.clip();const h=s*3.4;kprev(cx,cy-(sl==='c'?h*0.82:sl==='g'?h*0.5:h*0.12),h*2.2*(sl==='v'?1:1),e);ctx.restore();return}
 if(sl==='m'){const T=window.FGF_MTH&&FGF_MTH[id];const sv=eq.m;eq.m=id;let th=null;try{th=FGF_MENUTH()}catch(er){}eq.m=sv;ctx.save();ctx.fillStyle=th?th.on:'#f2c230';ctx.strokeStyle=th?th.stroke:'#063';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(cx-s*1.2,cy-s*0.55,s*2.4,s*1.1,s*0.5);ctx.fill();ctx.stroke();ctx.fillStyle=th?(th.textOn||th.text):'#063';ctx.font='900 '+(s*0.6|0)+'px system-ui';ctx.textAlign='center';ctx.fillText('PLAY',cx,cy+s*0.22);ctx.restore();return}
 return itemPrev(id,cx,cy,s)};
// ---- Deal of the Day (replaces s20 layout) ----
const osc=S3.screen;S3.screen=function(){if(state==='deal'&&window.FGF_DEAL){BTN=[];const d=FGF_DEAL();txt('💰 DEAL OF THE DAY',W/2,H*0.065,Math.min(26,W*0.07),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('A new coin discount every day',W/2,H*0.065+22);
 if(!d){txt('You own every shop item!',W/2,H*0.3,16,'#fff')}else{const id=d.it[0],sl=slot(id),gearK='cgv'.includes(sl);
  panel(W*0.05,H*0.12,W*0.9,H*0.62);txt(d.it[1],W/2,H*0.12+30,Math.min(22,W*0.058),'#fff');ctx.fillStyle=GOLD;ctx.font='900 11px system-ui';ctx.fillText(KIND[sl]||'',W/2,H*0.12+50);
  const ph=Math.min(H*0.36,W*0.62),py=H*0.12+62;
  if(gearK){const af={...eq,[sl]:id};const bx1=W*0.29,bx2=W*0.71;const bef={...eq};if(bef[sl]===id)bef[sl]='';kprev(bx1,py,ph,bef);kprev(bx2,py,ph,af);ctx.fillStyle='#bcd';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('NOW',bx1,py+ph+14);ctx.fillStyle=GOLD;ctx.fillText('WITH '+d.it[1].toUpperCase().slice(0,18),bx2,py+ph+14);ctx.fillStyle='#fff';ctx.font='22px system-ui';ctx.fillText('➜',W/2,py+ph*0.55)}
  else{if(sl==='b'||sl==='s'){try{const s0=Math.min(30,ph*0.25);if(sl==='b'){const sv=eq.b,b0={...ball};eq.b=id;ball.fly=false;if(id==='bl0'){}else FGF_BSKIN({x:W/2,y:py+ph*0.45,s:s0/0.19},s0);eq.b=sv;Object.assign(ball,b0)}else itemPrev(id,W/2,py+ph*0.45,ph*0.3)}catch(e){}}else itemPrev(id,W/2,py+ph*0.45,ph*0.3)}
  const yb=py+ph+24;ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText('Was 🪙 '+d.it[2].toLocaleString(),W/2,yb+4);txt('🪙 '+d.pr.toLocaleString()+'  (30% off)',W/2,yb+30,20,GOLD);
  const by=Math.min(yb+44,H*0.86-48);bx(W*0.1,by,W*0.38,44,'👁 TRY IT',()=>FGF_TRY(id,'deal'),false,14);
  bx(W*0.52,by,W*0.38,44,'BUY',()=>buy5('deal_'+id,d.pr,()=>{if(!own.includes(id))own.push(id);SV('fgfOwn',own);eq[sl]=id;SV('fgfEq',eq);EQP={id,t0:performance.now()}}),true,15);
  ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.fillText('TRY IT = one free practice kick to see it. No coins in or out.',W/2,by+60,W*0.9)}
 bx(W/2-90,H*0.93-18,180,38,'◀ BACK',()=>state='hub');drawEQP();return true}
 const r=osc.apply(this,arguments);if(state==='shop')drawEQP();return r};
// ---- "Equipped!" preview card (shop + deal) ----
let EQP=null;window.FGF_EQP=id=>EQP={id,t0:performance.now()};
const oeq=JSON.stringify(eq);let last=oeq;setInterval(()=>{const s=JSON.stringify(eq);if(state==='shop'&&s!==last&&!window.FGF_TRYING){const a=JSON.parse(last);for(const k in eq)if(eq[k]&&eq[k]!==a[k]){EQP={id:eq[k],t0:performance.now()};break}}last=s},100);
function drawEQP(){if(!EQP)return;const a=(performance.now()-EQP.t0)/1000;if(a>1.8){EQP=null;return}const it=ITEM[EQP.id];if(!it)return;const sl=slot(EQP.id),h=Math.min(H*0.34,W*0.6),pw=W*0.7,px=W*0.15,py=H*0.22;ctx.save();ctx.globalAlpha=Math.min(1,(1.8-a)*3);ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);panel(px,py,pw,h+86);txt('✔ EQUIPPED!',W/2,py+30,22,'#7fe87f','#063');
 if('cgv'.includes(sl))kprev(W/2,py+42,h,eq);else if(sl==='b'){try{const b0={...ball};ball.fly=false;FGF_BSKIN({x:W/2,y:py+42+h*0.45,s:24/0.19},24);Object.assign(ball,b0)}catch(e){}}else itemPrev(EQP.id,W/2,py+42+h*0.45,h*0.3);
 txt(it[1],W/2,py+h+70,16,'#fff');ctx.restore()}
// ---- Try-On: purely visual ----
const KEYS=()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k!=='fgfTryBak')o[k]=localStorage.getItem(k)}return o};
function restore(){const b=LS.fgfTryBak;if(!b)return;const o=JSON.parse(b);Object.keys(localStorage).forEach(k=>{if(!(k in o))localStorage.removeItem(k)});Object.keys(o).forEach(k=>localStorage.setItem(k,o[k]));localStorage.removeItem('fgfTryBak')}
let SNAP=null;
const otry=FGF_TRY;FGF_TRY=function(id,ret){if(window.FGF_TRYING)return;SNAP={coins,eq:{...eq},own:own.slice(),ret:ret||'shop'};LS.fgfTryBak=JSON.stringify(KEYS());window.FGF_TRYING=1;return otry.apply(this,arguments)};
function endTry(){if(!window.FGF_TRYING)return;window.FGF_TRYING=0;try{sessionStorage.fgfRet=(SNAP&&SNAP.ret)||(state==='deal'?'deal':'shop');sessionStorage.fgfLSseen=1;location.reload();return}catch(e){}if(SNAP){coins=SNAP.coins;Object.keys(eq).forEach(k=>delete eq[k]);Object.assign(eq,SNAP.eq);own.length=0;SNAP.own.forEach(x=>own.push(x))}SNAP=null;try{FGF_TRYEND()}catch(e){}}
const oUn=unlock;unlock=function(){if(window.FGF_TRYING)return;return oUn.apply(this,arguments)};
const oAC=addCoins;addCoins=function(n){if(window.FGF_TRYING)return;return oAC.apply(this,arguments)};
const onx=S3.next;S3.next=function(){if(window.FGF_TRYING){const r=onx.apply(this,arguments);endTry();return r}return onx.apply(this,arguments)};
setInterval(()=>{if(window.FGF_TRYING&&!['play','replay','pause','cont'].includes(state)&&!paused)endTry()},250);
if(sessionStorage.fgfRet){const r=sessionStorage.fgfRet;sessionStorage.removeItem('fgfRet');setTimeout(()=>{if(team>=0)state=r},400)}

})();
