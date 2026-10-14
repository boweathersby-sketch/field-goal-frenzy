// s33: MENU THEMES (button colors/styles for every menu) — coin shop tab.
(function(){
const T=[['mn0','Gold Classic',0,{fill:'rgba(6,30,16,0.92)',on:'#f2c230',stroke:'#f2c230',text:'#fff',textOn:'#063'}],
['mn1','Neon Night',600,{fill:'rgba(10,0,25,0.92)',on:'#39ff14',stroke:'#39ff14',text:'#d9ffd0',textOn:'#051'}],['mn2','Ice',800,{fill:'rgba(10,40,70,0.9)',on:'#9be7ff',stroke:'#bfefff',text:'#eaf9ff',textOn:'#04324a'}],
['mn3','Fire',900,{fill:'rgba(50,8,0,0.92)',on:'#ff6d00',stroke:'#ffab40',text:'#fff3e0',textOn:'#3a0a00'}],['mn4','Camouflage',1200,{fill:'rgba(52,64,36,0.94)',on:'#a3b18a',stroke:'#c2b280',text:'#f1f1e6',textOn:'#2b3320'}],
['mn5','Team Colors',1500,{team:1}],['mn6','Royal Purple',700,{fill:'rgba(40,10,60,0.92)',on:'#b388ff',stroke:'#d1c4e9',text:'#fff',textOn:'#2a0a3d'}],['mn7','Ocean',700,{fill:'rgba(0,40,60,0.92)',on:'#26c6da',stroke:'#80deea',text:'#e0f7fa',textOn:'#003238'}],
['mn8','Bubblegum',500,{fill:'rgba(70,10,45,0.9)',on:'#ff80ab',stroke:'#ffc1e3',text:'#fff',textOn:'#4a0028'}],['mn9','Midnight Steel',1000,{fill:'rgba(25,30,38,0.94)',on:'#b0bec5',stroke:'#cfd8dc',text:'#eceff1',textOn:'#1c2329'}],
['mn10','Lava',1800,{fill:'rgba(30,0,0,0.94)',on:'#ff1744',stroke:'#ff8a80',text:'#ffebee',textOn:'#2b0000'}],['mn11','Mint',400,{fill:'rgba(0,45,35,0.9)',on:'#69f0ae',stroke:'#b9f6ca',text:'#e8fff4',textOn:'#00321f'}],
['mn12','Sunset',1100,{fill:'rgba(60,20,30,0.9)',on:'#ffb74d',stroke:'#ff8a65',text:'#fff3e0',textOn:'#3d1a00'}],['mn13','Chrome',1800,{fill:'rgba(40,44,50,0.94)',on:'#e0e0e0',stroke:'#ffffff',text:'#fafafa',textOn:'#222'}],
['mn14','Black & Gold',2200,{fill:'rgba(0,0,0,0.94)',on:'#ffd23f',stroke:'#ffd23f',text:'#ffd23f',textOn:'#000'}],['mn15','Rainbow',3500,{rainbow:1}],['mn16','Pixel Arcade',2000,{fill:'rgba(15,0,40,0.94)',on:'#00e5ff',stroke:'#ff00e5',text:'#fff',textOn:'#140030'}],
['mn17','Holiday Candy',1300,{fill:'rgba(80,0,10,0.92)',on:'#ffffff',stroke:'#ff5252',text:'#fff',textOn:'#b71c1c'}],['mn18','Forest',600,{fill:'rgba(10,40,15,0.94)',on:'#8bc34a',stroke:'#aed581',text:'#f1f8e9',textOn:'#1b3a0b'}],['mn19','PRO Gold Luxe',5000,{fill:'rgba(30,20,0,0.95)',on:'#ffe082',stroke:'#ffca28',text:'#fff8e1',textOn:'#3e2a00',glow:1}]];
const TH={};T.forEach(t=>TH[t[0]]=t[3]);
if(!SHOP.find(c=>c[0]==='MENU')){const i=SHOP.findIndex(c=>c[0]==='WEATHER');SHOP.splice(i,0,['MENU',T.map(t=>[t[0],t[1],t[2]])])}
SHOP.forEach(c=>c[1].forEach(i=>ITEM[i[0]]=i));if(!eq.m)eq.m='mn0';
window.FGF_MENUTH=()=>{const t=TH[eq.m];if(!t||eq.m==='mn0')return null;if(t.team){const tm=TEAMS[myT()]||{p:'#5b2a86',s:'#f2c230'};return{fill:'rgba(0,0,0,0.6)',on:tm.s,stroke:tm.s,text:'#fff',textOn:tm.p}}if(t.rainbow){const h=(performance.now()/20)%360;return{fill:'rgba(10,10,20,0.92)',on:'hsl('+h+',90%,60%)',stroke:'hsl('+((h+120)%360)+',90%,65%)',text:'#fff',textOn:'#111'}}return t};

// ---- Arrange Menu (Settings) ----
const DEF=['career','daily','classic','time','pressure','hurricane','chaos','vs'],LBL={career:'🏈 CAREER',daily:'📅 DAILY CHALLENGE',classic:'⭐ CLASSIC',time:'⏱️ TIME ATTACK',pressure:'😬 PRESSURE KICK',hurricane:'🌪️ HURRICANE',chaos:'🌀 CHAOS',vs:'👥 FRIEND · RIVAL · EVENTS'};
const ord=()=>{const O=J('fgfMenuOrder',null);const o=Array.isArray(O)?O.filter(k=>DEF.includes(k)):[];DEF.forEach(k=>{if(!o.includes(k))o.push(k)});return o};
const osc=S3.screen;S3.screen=function(){if(state==='marr'){BTN=[];txt('↕️ ARRANGE MENU',W/2,H*0.08,Math.min(26,W*0.07),GOLD,'#063');ctx.fillStyle='#cde';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('Use ▲ ▼ to move a mode. Saved on this device.',W/2,H*0.08+22,W*0.92);
  const o=ord(),top=H*0.08+40,rh=Math.min(56,(H*0.93-22-60-top)/o.length);o.forEach((k,i)=>{const y=top+i*rh;panel(W*0.05,y,W*0.9,rh-6);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?12:14)+'px system-ui';ctx.fillText((i+1)+'. '+LBL[k],W*0.09,y+(rh-6)/2+5,W*0.52);const b=Math.min(44,rh-10),by=y+(rh-6)/2-b/2;
   bx(W*0.95-b*2-14,by,b,b,'▲',()=>{if(i>0){const n=o.slice();[n[i-1],n[i]]=[n[i],n[i-1]];SV('fgfMenuOrder',n)}},false,16);bx(W*0.95-b-8,by,b,b,'▼',()=>{if(i<o.length-1){const n=o.slice();[n[i+1],n[i]]=[n[i],n[i+1]];SV('fgfMenuOrder',n)}},false,16)});
  bx(W*0.08,H*0.93-22-52,W*0.4,40,'↺ RESET',()=>{delete LS.fgfMenuOrder;toast('Menu order reset')},false,13);bx(W*0.52,H*0.93-22-52,W*0.4,40,'✔ DONE',()=>state='title',true,13);bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='mset',false,14);return true}
 const r=osc.apply(this,arguments);if(state==='mset'){const bw=Math.min(300,W*0.84);bx(W/2-bw/2,H*0.16+(window.TESTER?358:310),bw,40,'↕️ ARRANGE MENU',()=>state='marr',false,13)}return r};
})();
