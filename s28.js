// s28: Season Pass v2 — free, 30 tiers lasting the month, milestone rewards, completion = achievement + Season Champion badge + coins + exclusive ball.
(function(){
const NOW=()=>window.FGF_DATE?new Date(FGF_DATE):new Date(),MO=()=>{const d=NOW();return d.getFullYear()+'-'+(d.getMonth()+1)};
const MN=()=>NOW().toLocaleString('en',{month:'long'}),MC=['#4a90e2','#e24a8b','#2fbf71','#f2c230','#ff7a1a','#9b59b6','#e74c3c','#1abc9c','#e67e22','#ff6a00','#8e5a2d','#d62839'];
// tier i (1..30) needs 400+20i XP; cumulative ≈ 21,300 XP ≈ 27 days at ~800 XP/day (15–20 min of play)
const NEED=i=>400+20*i,CUM=[0];for(let i=1;i<=30;i++)CUM[i]=CUM[i-1]+NEED(i);
const SEX=()=>'blS'+(NOW().getMonth()+1);// exclusive monthly ball id
const BALLS=SHOP.find(c=>c[0]==='BALLS');
for(let m=1;m<=12;m++){const id='blS'+m,nm=new Date(2026,m-1,1).toLocaleString('en',{month:'short'})+' Champion Ball';if(!ITEM[id]){const it=[id,nm,-1];BALLS[1].push(it);ITEM[id]=it}}
const oBS=FGF_BSKIN;FGF_BSKIN=function(p,r){const id=eq.b;if(!id||!id.startsWith('blS'))return oBS(p,r);const m=(+id.slice(3)||1)-1,R=r*0.72;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ball.fly?ball.rot*0.6:0);ctx.shadowColor='#ffd23f';ctx.shadowBlur=R*0.8;ctx.fillStyle=MC[m];ctx.beginPath();ctx.arc(0,0,R,0,7);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='#ffd23f';ctx.lineWidth=Math.max(1,R*0.16);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?R*0.25:R*0.6;ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}ctx.fill();ctx.restore();return true};
// hide season-only items from the shop unless owned
try{const it0=SHOP.indexOf(BALLS);const odS=drawShop;drawShop=function(){const save=BALLS[1];if(shopTab===it0)BALLS[1]=save.filter(m=>m[2]>=0||own.includes(m[0]));try{return odS.apply(this,arguments)}finally{BALLS[1]=save}}}catch(e){}
try{if(typeof TRO!=='undefined'&&!TRO.some(t=>t[1]==='champ')){const i=TRO.map(q=>q[0]).lastIndexOf(0);TRO.splice(i+1,0,[0,'champ','Season Champion','Finish all 30 Season Pass tiers',500])}}catch(e){}
const REW=i=>i===30?['🏆','Season Champion: badge + 🪙 2,000 + '+MN()+' Champion Ball','champ']:i===10?['🏀','Ball skin: Tennis Ball (or 🪙 900)','b:bl4']:i===20?['❄️','Trail: Frost Trail (or 🪙 1,200)','t:t15']:i%5===0?['🎁','Mystery Box','mb']:['🪙',(40+4*i)+' coins','c:'+(40+4*i)];
const pts=()=>{const sp=J('fgfSPx',{m:'',p:0});return sp.m===MO()?sp.p:0};
const clm=()=>{const c=J('fgfSP2',{m:'',c:{}});if(c.m!==MO()){c.m=MO();c.c={}}return c};
let CEL=null,scroll=0,drag=null,autoS=true;
function grant(i){const c=clm();if(c.c[i])return;const r=REW(i),k=r[2];c.c[i]=1;SV('fgfSP2',c);
 if(k.startsWith('c:'))addCoins(+k.slice(2)),toast('🎟️ Tier '+i+' · 🪙 +'+k.slice(2));
 else if(k==='mb'){try{FGF_SHOPTEST.mystery()}catch(e){addCoins(300)}toast('🎁 Mystery Box opened · check the Shop!')}
 else if(k.startsWith('b:')||k.startsWith('t:')){const id=k.slice(2);if(own.includes(id)){const v=id==='bl4'?900:1200;addCoins(v);toast('Already owned · 🪙 +'+v)}else{own.push(id);SV('fgfOwn',own);toast('🎁 Unlocked '+ITEM[id][1])}}
 else if(k==='champ'){addCoins(2000);const id=SEX();if(!own.includes(id)){own.push(id);SV('fgfOwn',own)}const L=J('fgfChamps',[]);if(!L.includes(MO())){L.push(MO());SV('fgfChamps',L)}try{unlock('champ')}catch(e){}CEL={t0:performance.now()};sfx.cheer()}}
addEventListener('pointerdown',e=>{if(state==='pass')drag={y:e.clientY,s:scroll,m:0}},true);addEventListener('pointermove',e=>{if(state==='pass'&&drag){scroll=drag.s-(e.clientY-drag.y);drag.m=Math.max(drag.m,Math.abs(e.clientY-drag.y));autoS=false}});addEventListener('pointerup',()=>drag=null);addEventListener('wheel',e=>{if(state==='pass'){scroll+=e.deltaY;autoS=false}});
let pst='';
const osc=S3.screen;S3.screen=function(){if(state!=='pass'){if(pst==='pass')autoS=true;pst=state;const r=osc.apply(this,arguments);if(state==='stats'){const L=J('fgfChamps',[]);if(L.length){ctx.fillStyle=GOLD;ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('🏆 SEASON CHAMPION ×'+L.length+' · '+L.slice(-3).map(m=>new Date(m.split('-')[0],m.split('-')[1]-1,1).toLocaleString('en',{month:'short'})).join(' · '),W/2,H*0.93-30,W*0.92)}}return r}
 pst=state;BTN=[];const P=pts(),c=clm();let tier=0;while(tier<30&&P>=CUM[tier+1])tier++;
 txt('🎟️ SEASON PASS',W/2,H*0.06,Math.min(28,W*0.075),GOLD,'#063');const d=NOW(),end=new Date(d.getFullYear(),d.getMonth()+1,1),days=Math.ceil((end-d)/864e5);ctx.fillStyle='#cde';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(MN()+' season · FREE · '+days+' day'+(days===1?'':'s')+' left',W/2,H*0.06+20);
 const nx=Math.min(30,tier+1),into=P-CUM[tier],need=tier>=30?1:NEED(nx);ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(W*0.08,H*0.06+30,W*0.84,10);ctx.fillStyle=GOLD;ctx.fillRect(W*0.08,H*0.06+30,W*0.84*Math.min(1,tier>=30?1:into/need),10);ctx.fillStyle='#fff';ctx.font='bold 11px system-ui';ctx.fillText(tier>=30?'All 30 tiers complete!':'Tier '+tier+' / 30 · '+into+' / '+need+' XP to tier '+nx,W/2,H*0.06+54);
 const top=H*0.06+64,bot=H*0.88,rh=Math.max(48,Math.min(58,H*0.07)),tot=30*rh;if(autoS){scroll=Math.max(0,(Math.max(1,tier)-2)*rh)}scroll=Math.max(0,Math.min(tot-(bot-top),scroll));
 ctx.save();ctx.beginPath();ctx.rect(0,top,W,bot-top);ctx.clip();
 for(let i=1;i<=30;i++){const y=top+(i-1)*rh-scroll;if(y+rh<top||y>bot)continue;const got=P>=CUM[i],cl=!!c.c[i],cur=i===nx&&tier<30,r=REW(i),ms=i%5===0;
  ctx.globalAlpha=got||cur?1:0.6;panel(W*0.04,y+2,W*0.92,rh-6);if(cur){ctx.strokeStyle='#7fe8ff';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(W*0.04,y+2,W*0.92,rh-6,10);ctx.stroke()}
  ctx.textAlign='left';ctx.fillStyle=ms?GOLD:'#fff';ctx.font='900 '+(W<350?12:14)+'px system-ui';ctx.fillText((ms?'★ ':'')+'TIER '+i,W*0.07,y+rh*0.42);ctx.font='11px system-ui';ctx.fillStyle='#cde';let t=r[0]+' '+r[1];const mw=W*0.92-W*0.3-W*0.06;while(ctx.measureText(t).width>mw&&t.length>4)t=t.slice(0,-2)+'…';ctx.fillText(t,W*0.07,y+rh*0.72);ctx.globalAlpha=1;
  const bw=W*0.26,by=y+(rh-6)/2-14+2;if(cl){ctx.fillStyle='#7fe87f';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('✔ CLAIMED',W*0.92-bw/2,by+19)}else if(got){if(y>=top-2&&y+rh<=bot+2)bx(W*0.92-bw,by,bw,28,'CLAIM',()=>{if(!drag||drag.m<8)grant(i)},true,12)}else{ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(CUM[i].toLocaleString()+' XP',W*0.92-bw/2,by+18)}}
 ctx.restore();ctx.fillStyle='rgba(255,255,255,.25)';const sh=(bot-top)*(bot-top)/tot;ctx.fillRect(W-5,top+(bot-top-sh)*(scroll/Math.max(1,tot-(bot-top))),3,sh);
 bx(W/2-90,H*0.93-18,180,38,'◀ BACK',()=>state='hub');
 if(CEL){const a=(performance.now()-CEL.t0)/1000;BTN=[];ctx.fillStyle='rgba(0,0,0,0.78)';ctx.fillRect(0,0,W,H);if(a<0.1||Math.random()<0.06)parts.push({x:Math.random()*W,y:-10,vx:(Math.random()-.5)*60,vy:90+Math.random()*120,c:Math.random()<.5?GOLD:'#fff',l:2.5});
  panel(W*0.08,H*0.2,W*0.84,H*0.56);txt('🏆',W/2,H*0.3,56,'#fff');txt('SEASON CHAMPION',W/2,H*0.38,Math.min(26,W*0.068),GOLD,'#063');txt(MN()+' '+NOW().getFullYear(),W/2,H*0.43,16,'#fff');
  ctx.fillStyle='#cde';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText('🪙 +2,000 · badge added to your profile',W/2,H*0.48);const sv=eq.b,b0={...ball};eq.b=SEX();ball.fly=false;FGF_BSKIN({x:W/2,y:H*0.55,s:22/0.19},22);eq.b=sv;Object.assign(ball,b0);ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.fillText('Exclusive: '+ITEM[SEX()][1]+' · never sold',W/2,H*0.6+12,W*0.8);
  bx(W*0.2,H*0.66,W*0.6,42,'EQUIP IT',()=>{eq.b=SEX();SV('fgfEq',eq);CEL=null;toast('✔ Equipped!')},true,15);bx(W*0.3,H*0.66+50,W*0.4,32,'Later',()=>{CEL=null},false,12)}
 return true};
window.FGF_PASS={CUM,REW,grant};
})();
