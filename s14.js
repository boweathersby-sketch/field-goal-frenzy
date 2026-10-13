// s14: streak popup, weekly local board, UI click, Halloween limited items
(function(){
const sfxClick=()=>{try{if(LS.fgfMute!=='1')tone(880,620,0.035,0.18,'triangle')}catch(e){}};sfx.click=sfxClick;
const obx=bx;bx=function(x,y,w,h,l,cb,...r){return obx(x,y,w,h,l,typeof cb==='function'?function(){sfxClick();return cb.apply(this,arguments)}:cb,...r)};
LSR[6]=1000;
// Halloween
const now=new Date(),HW=now.getMonth()===9,HWEND='Oct 31';
const HI={CLEATS:['c9','Pumpkin Cleats 🎃',1500,'p',.03],TRAILS:['t9','Ghost Trail 👻',1200,'p',0],CELEBRATE:['e9','Spooky Party 🦇',1500,'p',0]};
SHOP.forEach(tb=>{const it=HI[tb[0]]||HI[tb.name];if(!it)return;const arr=Array.isArray(tb[1])?tb[1]:tb.items;if(arr&&(HW||own[it[0]])&&!arr.some(a=>a[0]===it[0]))arr.push(it)});
window.FGF_LIMITED={c9:1,t9:1,e9:1,witch:1};window.FGF_LIMEND=HWEND;
if(typeof CMHAT!=='undefined'&&(HW||cmOwn('witch'))&&!CMHAT.some(h=>h[0]==='witch'))CMHAT.push(['witch','Witch 🎃',1200]);
const otr=S3.trail;S3.trail=function(a){return eq.t==='t9'?'rgba(232,238,255,'+(a*0.8)+')':otr.apply(this,arguments)};
const odk=drawKicker;drawKicker=function(){if(eq.c==='c9'&&KS.complete&&KS.naturalWidth){const {x,y,w,h}=KG(),cx=x+w*0.42,cy=Math.min(y+h*0.96,ctx.getTransform().inverse().transformPoint({x:0,y:ctx.canvas.height-16*(ctx.canvas.height/H)}).y),p=0.85+0.15*Math.sin(T*5);ctx.save();ctx.translate(cx,cy);ctx.scale(1,0.5);const g=ctx.createRadialGradient(0,0,0,0,0,w*0.6);g.addColorStop(0,'rgba(255,130,20,'+0.85*p+')');g.addColorStop(0.45,'rgba(255,100,0,'+0.4*p+')');g.addColorStop(1,'rgba(255,80,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,w*0.6,0,6.29);ctx.fill();ctx.restore()}return odk.apply(this,arguments)};
const spook=()=>{window.__sp=(window.__sp||0)+1;const x=W*(0.2+Math.random()*0.6),y=H*(0.15+Math.random()*0.25);for(let i=0;i<40;i++){const a=i/40*6.28,v=80+Math.random()*80;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,c:['#ff7a00','#9b4dff','#7dff6a'][i%3],l:1.4,g:90,f:1})}};
const ores=S3.onResult;S3.onResult=function(good){const r=ores.apply(this,arguments);if(good&&eq.e==='e9'&&ball&&ball.res!=='BLOCKED!')for(let i=0;i<5;i++)setTimeout(spook,i*280);return r};
// Weekly local board
const wk=()=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.toISOString().slice(0,10)};
let WB=J('fgfWB',{}),rec=false;
setInterval(()=>{if(state==='over'){if(!rec&&typeof score==='number'){rec=true;const k=wk();WB[k]=WB[k]||[];WB[k].push(score);WB[k].sort((a,b)=>b-a);WB[k]=WB[k].slice(0,5);SV('fgfWB',WB)}}else rec=false},500);
const RN=['Jett Ramos','Kai Sullivan','Mo Okafor','Lena Brooks','Diego Vance','Ty Hollis','Sam Reyes','Ava Lindqvist','Rex Calder','Nia Grant','Cole Mercer','Iris Tan','Bo Kade','Zane Ortiz'];
function board(){const k=wk(),mine=WB[k]||[],pb=mine[0]||0,base=Math.max(pb,12);let s=0;for(const c of k)s=(s*31+c.charCodeAt(0))>>>0;const rnd=()=>(s=(s*1103515245+12345)>>>0)/4294967296;const names=RN.slice().sort(()=>rnd()-0.5).slice(0,9);const L=names.map(n=>({n,s:Math.max(3,Math.round(base*(0.55+rnd()*0.8)))}));L.push({n:'YOU',s:pb,me:1});return L.sort((a,b)=>b.s-a.s)}
window.FGF_WB=board;
const osc=S3.screen;S3.screen=function(){
 if(state==='wlb'){BTN=[];txt('WEEKLY BOARD',W/2,H*0.075,Math.min(30,W*0.08),GOLD,'#063');const k=wk();txt('Week of '+k+' · resets Monday',W/2,H*0.12,13,'#cfe');const L=board(),y0=H*0.16,rh=Math.min(40,H*0.058);panel(W*0.05,y0-6,W*0.9,rh*L.length+12);L.forEach((e,i)=>{const y=y0+i*rh;if(e.me){ctx.fillStyle='rgba(255,210,63,.18)';ctx.fillRect(W*0.06,y,W*0.88,rh-4)}ctx.textAlign='left';ctx.font='bold 16px sans-serif';ctx.fillStyle=e.me?GOLD:'#fff';ctx.fillText((i+1)+'. '+e.n,W*0.09,y+rh*0.62);ctx.textAlign='right';ctx.fillText(e.s,W*0.91,y+rh*0.62);ctx.textAlign='center'});const yn=y0+rh*L.length+22;txt('Your best scores this week: '+((WB[k]||[]).join(', ')||'none yet'),W/2,yn,12,'#cfe');txt('Offline board: rivals are simulated.',W/2,yn+18,11,'#9ab');txt('A true online leaderboard needs a server.',W/2,yn+34,11,'#9ab');bx(W*0.3,H*0.88,W*0.4,44,'BACK',()=>state='board');return true}
 const r=osc.apply(this,arguments);
 if(state==='board'){bx(W*0.62,H*0.03,W*0.34,30,'📅 WEEKLY',()=>state='wlb',false,13)}
 if(state==='title'&&typeof lsPending==='function'&&lsPending()&&!sessionStorage.fgfLSseen){BTN=[];ctx.fillStyle='rgba(0,0,0,.72)';ctx.fillRect(0,0,W,H);const pd=lsPending(),pw=W*0.9,px=W*0.05,py=H*0.22,ph=H*0.5;panel(px,py,pw,ph);txt('🎁 DAILY STREAK',W/2,py+40,26,GOLD,'#063');txt('Day '+pd+' of 7 · miss a day and it resets',W/2,py+68,13,'#cfe');const tw=(pw-32)/4;for(let i=0;i<7;i++){const c=i%4,rr=i/4|0,x=px+12+c*(tw+2.7)+(rr?tw/2:0),y=py+90+rr*(tw*0.9+8),cur=i+1===pd,dn=i+1<pd;ctx.fillStyle=cur?'rgba(255,210,63,.35)':dn?'rgba(80,200,120,.25)':'rgba(255,255,255,.08)';ctx.fillRect(x,y,tw-4,tw*0.9);ctx.strokeStyle=cur?GOLD:'rgba(255,255,255,.25)';ctx.lineWidth=cur?3:1;ctx.strokeRect(x,y,tw-4,tw*0.9);txt('DAY '+(i+1),x+tw/2-2,y+18,12,'#fff');txt((i===6?'💰':'🪙')+(LSR[i]*(window.PRO&&PRO()?2:1)),x+tw/2-2,y+tw*0.55,i===6?15:13,i===6?GOLD:'#fff');if(dn)txt('✔',x+tw/2-2,y+tw*0.8,12,'#7f7')}
  if(window.PRO&&PRO())txt('PRO: rewards doubled',W/2,py+ph-78,12,GOLD);bx(W*0.25,py+ph-62,W*0.5,48,'CLAIM',()=>{lsClaim();sessionStorage.fgfLSseen=1},true);return true}
 return r};
})();
