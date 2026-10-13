// ===== Stage 5: unique kickers, My Kicker creator, mascot kickers, backgrounds, stadium creator, turf styles,
// login streak, weekly challenges, friend Daily board, starter pack, kick of the week, tester mode =====
'use strict';
// ---- tester mode (web only; the Play build sets window.FGF_APP=true so this never ships there) ----
const IS_WEB=!window.FGF_APP;
(function(){if(!IS_WEB){delete LS.fgfTester;return}const q=new URLSearchParams(location.search).get('tester');if(q==='gator87'){LS.fgfTester='1';setTimeout(()=>toast('🧪 TESTER MODE ON'),300)}else if(q==='off'){delete LS.fgfTester;setTimeout(()=>toast('Tester mode off'),300)}})();
window.TESTER=IS_WEB&&LS.fgfTester==='1';
if(TESTER){coins=1e9;const oAdd=addCoins;addCoins=function(n){}}
// ---- per-team kicker sheets (kickers.webp: 8 rows x 4 poses of 203x300) ----
const KMETA=[[[62, 88, 40, 31, 72, 24], [284, 88, 40, 31, 297, 24], [464, 94, 42, 30, 474, 32], [657, 96, 36, 30, 666, 34]], [[69, 88, 47, 31, 78, 24], [266, 88, 46, 31, 276, 25], [470, 88, 45, 31, 480, 25], [669, 89, 46, 31, 676, 26]], [[82, 88, 50, 31, 83, 24], [270, 94, 48, 31, 270, 32], [472, 94, 46, 31, 480, 32], [660, 94, 38, 31, 672, 32]], [[73, 88, 46, 31, 82, 24], [266, 92, 44, 31, 276, 30], [468, 93, 43, 31, 478, 31], [659, 92, 37, 31, 668, 30]], [[86, 88, 50, 31, 84, 24], [264, 93, 44, 31, 274, 31], [468, 93, 44, 31, 475, 31], [659, 94, 38, 31, 693, 32]], [[66, 88, 50, 31, 76, 24], [287, 88, 53, 31, 302, 24], [523, 91, 56, 31, 524, 29], [656, 91, 36, 31, 688, 29]], [[74, 88, 48, 31, 80, 24], [278, 88, 48, 31, 283, 25], [486, 88, 49, 31, 482, 25], [665, 92, 40, 31, 685, 30]], [[72, 88, 50, 31, 78, 24], [263, 92, 45, 31, 273, 30], [466, 92, 44, 31, 478, 30], [660, 91, 38, 31, 684, 29]]]; // per team, per pose: [numCx,numCy,numW,numH,headX,headY]
const NUMS5=[14,5,31,37,6,47,18,10]; // fixed in code: same on every device, unique per team
const SKIN=[['Default',null,0],['Fair','#f3cfae',0],['Light','#e0ac83',0],['Tan','#c48a5c',0],['Brown','#8e5a37',0],['Deep','#5c3820',0],['Gold Chrome','#ffd36a',400],['Blue Paint','#4f86e0',800]];
const HAIR=[['Default',null,0],['Black','#17110d',0],['Brown','#5b3a22',0],['Blond','#d6b05a',0],['Red','#a3442a',0],['Gray','#a3a3a3',0],['Platinum','#efe9da',250],['Neon Green','#4dff6a',500],['Hot Pink','#ff5fb0',500]];
const WBAND=[['None',null,0],['White','#ffffff',0],['Team','team',0],['Black','#111111',0],['Gold','#f2c230',300],['Neon','#39ff14',600]];
const VISOR=[['None',null,0],['Smoke','rgba(25,25,35,0.85)',0],['Gold','rgba(242,194,48,0.85)',600],['Mirror Blue','rgba(70,170,255,0.85)',900],['Rainbow','rainbow',1500]];
const MASCP=[2500,3000,3500,3000,2000,2500,3000,4000];
let MK=Object.assign({on:0,base:0,masc:-1,skin:0,hair:0,wb:0,vz:0,eb:0,sl:0,name:'',num:-1},J('fgfMK',{})),MKO=J('fgfMKO',[]);
const own5=id=>TESTER||MKO.includes(id);
const KC5={};
function rgb(c){return c[0]==='#'?[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)]:[255,255,255]}
function hsv(r,g,b){const mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;let h=0;if(d){if(mx===r)h=((g-b)/d+6)%6;else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60}return[h,mx?d/mx:0,mx/255]}
function myNum(ti,p2){return !p2&&MK.on&&MK.num>=0?MK.num:NUMS5[ti]}
function numOn(x,cx,cy,bh,n,col){const s=String(n),fs=bh*1.25,sq=s.length>1?0.6:1;x.save();x.translate(cx,cy+fs*0.36);x.scale(sq,1);x.font='900 '+fs+'px Impact,Arial Black,system-ui';x.textAlign='center';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,0.5)';x.strokeText(s,0,0);const C=rgb(col),gr=x.createLinearGradient(0,-fs*0.8,0,0);gr.addColorStop(0,'rgb('+C.map(v=>Math.min(255,v+45))+')');gr.addColorStop(1,'rgb('+C.map(v=>v*0.78|0)+')');x.fillStyle=gr;x.fillText(s,0,0);x.restore()}
function numCol(ti){const t=TEAMS[ti];return t.s.toLowerCase()==='#ffffff'||hsv(...rgb(t.s))[1]>0.2||true?t.s:t.s}
// default team kicker: sheet row + fixed number
function teamSheet(ti){const k='t'+ti;if(KC5[k])return KC5[k];const c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d');x.drawImage(KS,0,ti*300,812,300,0,0,812,300);KMETA[ti].forEach(m=>numOn(x,m[0],m[1],m[3],NUMS5[ti],TEAMS[ti].s));return KC5[k]=c}
// mascot kicker: code-animated pose sheet from the mascot sprite (tilt + squash/stretch leg-swing)
function mascSheet(mi,ti,num){const k='m'+mi+'_'+ti+'_'+num;if(KC5[k])return KC5[k];if(!MSI.complete||!MSI.naturalWidth)return teamSheet(ti);const c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d');
 const P=[[0,1,1,0],[-0.16,1.07,0.93,-6],[0.14,0.92,1.1,10],[0.3,0.95,1.06,16]];
 P.forEach(([r,sx,sy,dx],i)=>{const h=215,w=h*0.965,fx=i*203+100+dx,fy=297;x.save();x.translate(fx,fy);x.rotate(r);x.scale(sx,sy);
  // leg swing: a stubby team-colored leg drawn under the mascot
  if(i>0){x.save();x.translate(w*0.12,-h*0.18);x.rotate([0,0.9,-0.5,-1.5][i]);x.fillStyle=TEAMS[ti].p;x.beginPath();x.roundRect(-9,0,18,h*0.3,8);x.fill();x.fillStyle='#111';x.beginPath();x.ellipse(4,h*0.3,15,8,0,0,7);x.fill();x.restore()}
  x.drawImage(MSI,mi*193,0,193,200,-w/2,-h,w,h);
  x.fillStyle=TEAMS[ti].p;x.strokeStyle=TEAMS[ti].s;x.lineWidth=3;x.beginPath();x.arc(0,-h*0.42,19,0,7);x.fill();x.stroke();numOn(x,0,-h*0.42-1,22,num,TEAMS[ti].s);x.restore()});return KC5[k]=c}
// My Kicker: base body + skin/hair remap + uniform hue-shift to the selected team + add-ons + number
function mySheet(ti){const cfg=MK;if(cfg.masc>=0)return mascSheet(cfg.masc,ti,myNum(ti));const key=JSON.stringify(cfg)+ti;if(KC5.my&&KC5.myk===key)return KC5.my;
 const b=cfg.base,c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d');x.drawImage(KS,0,b*300,812,300,0,0,812,300);let d;try{d=x.getImageData(0,0,812,300)}catch(e){return teamSheet(ti)}
 const a=d.data,P0=rgb(TEAMS[b].p),S0=rgb(TEAMS[b].s),P1=rgb(TEAMS[ti].p),S1=rgb(TEAMS[ti].s),H0=hsv(...P0),H1=hsv(...S0),skT=SKIN[cfg.skin][1]&&rgb(SKIN[cfg.skin][1]),hrT=HAIR[cfg.hair][1]&&rgb(HAIR[cfg.hair][1]);
 const wbc=WBAND[cfg.wb][1],WB=wbc?(wbc==='team'?S1:rgb(wbc)):null;
 const match=(h,s,v,T)=>T[1]<0.2?(s<0.18&&Math.abs(v-T[2])<(T[2]<0.25?0.18:0.22)):(s>0.25&&Math.min(Math.abs(h-T[0]),360-Math.abs(h-T[0]))<24);
 const skinRows=[[],[],[],[]];
 for(let i=0;i<a.length;i+=4){if(a[i+3]<20)continue;const p=i/4,px=p%812,py=p/812|0,f=px/203|0,m=KMETA[b][f],r=a[i],g=a[i+1],bb=a[i+2],[h,s,v]=hsv(r,g,bb);
  const skin=h>=6&&h<=(b===4?30:38)&&s>0.2&&s<0.7&&v>0.28;
  if(skin){skinRows[f].push(p);if(skT){const k=v/0.7;a[i]=Math.min(255,skT[0]*k);a[i+1]=Math.min(255,skT[1]*k);a[i+2]=Math.min(255,skT[2]*k)}continue}
  if(hrT&&v<0.45&&s>0.12&&h>=10&&h<48&&(b!==2||s>0.2)&&py<m[5]+95&&Math.abs(px-m[4])<45&&py>m[5]-12){const k=0.35+v*1.6;a[i]=Math.min(255,hrT[0]*k);a[i+1]=Math.min(255,hrT[1]*k);a[i+2]=Math.min(255,hrT[2]*k);continue}
  if(b!==ti){let T=null,ref;if(match(h,s,v,H0)){T=P1;ref=H0}else if(match(h,s,v,H1)){T=S1;ref=H1}if(T){const k=ref[2]<0.15?0.55+v*2.2:v/ref[2];a[i]=Math.min(255,T[0]*k);a[i+1]=Math.min(255,T[1]*k);a[i+2]=Math.min(255,T[2]*k)}}}
 // sleeve (upper-arm skin -> team color) and wristband (lowest arm skin rows -> band color)
 skinRows.forEach((L,f)=>{const m=KMETA[b][f];const arm=L.filter(p=>(p/812|0)>m[1]-12&&(p/812|0)<m[5]+150);if(!arm.length)return;const ys=arm.map(p=>p/812|0),y1=Math.max(...ys);
  for(const p of arm){const py=p/812|0,i=p*4;const v=hsv(a[i],a[i+1],a[i+2])[2];if(cfg.sl&&py<m[1]+26){a[i]=P1[0]*(0.5+v*0.6);a[i+1]=P1[1]*(0.5+v*0.6);a[i+2]=P1[2]*(0.5+v*0.6)}else if(WB&&py>y1-9){a[i]=WB[0]*(0.55+v*0.5);a[i+1]=WB[1]*(0.55+v*0.5);a[i+2]=WB[2]*(0.55+v*0.5)}}});
 x.putImageData(d,0,0);
 KMETA[b].forEach((m,f)=>{numOn(x,m[0],m[1],m[3],myNum(ti),TEAMS[ti].s);
  if(cfg.eb){x.fillStyle='#000';x.fillRect(m[4]+9,m[5]+7,6,2);x.fillRect(m[4]-15,m[5]+7,6,2)}
  const vz=VISOR[cfg.vz][1];if(vz){let fs=vz;if(vz==='rainbow'){fs=x.createLinearGradient(m[4]-14,0,m[4]+14,0);['#f33','#fd3','#3f6','#39f','#c3f'].forEach((q,j)=>fs.addColorStop(j/4,q))}x.fillStyle=fs;x.beginPath();x.ellipse(m[4]+(f>=2?8:2),m[5]+2,f>=2?8:12,3.5,0,0,7);x.fill()}});
 KC5.myk=key;return KC5.my=c}
function kimg5(ti,p2){if(!KS.complete||!KS.naturalWidth)return KS;return !p2&&MK.on?mySheet(ti):teamSheet(ti)}
function who(){const n=MK.on&&MK.name?MK.name:'KICKER';return n+' #'+myNum(myT())}
function saveMK(){for(const[k,L]of[['skin',SKIN],['hair',HAIR],['wb',WBAND],['vz',VISOR]])if(L[MK[k]][2]&&!own5(k+MK[k]))MK[k]=0;if(MK.masc>=0&&!own5('masc'+MK.masc))MK.masc=-1;SV('fgfMK',MK);KC5.my=null}
// ---- backgrounds (data-driven: add a themed one by appending {id,name,src,by,price}) ----
const BGS=TEAMS.map((t,i)=>({id:'bg'+i,name:t.n.split(' ').slice(-1)[0]+' Field',im:STI[i],by:BASEY[i],price:[600,700,900,800,800,700,900,600][i],team:i})).concat([
 {id:'beach',name:'Beach',soon:1},{id:'space',name:'Space',soon:1},{id:'volcano',name:'Volcano',soon:1},{id:'roof',name:'City Rooftop',soon:1}]);
// art drop-in: {id:'beach',name:'Beach',src:'bg_beach.webp',by:<field-top y in the 960x1080 image>,price:800}
BGS.forEach(b=>{if(b.src&&!b.im)b.im=IMG(b.src)});
let BGO=J('fgfBGO',[]),ST=Object.assign({bg:-1,un:0,crowd:0,sky:0,wx:0,ez:'',name:''},J('fgfST',{})),STO=J('fgfSTO',[]);
const bgOwn=i=>TESTER||BGS[i].team===myT()||BGO.includes(BGS[i].id);
const CROWD=[['Team colors',null,0],['Fire','#ff4a1a','#ffd23a',300],['Ice','#5ad0ff','#ffffff',300],['Royal','#4b2aa8','#f2c230',300],['Neon','#39ff14','#ff2bd6',500],['Mono','#222222','#dddddd',300]];
const SKY=[['Day',0],['Sunset',300],['Night',500]],SWX=[['Clear',0,'clear'],['Snow',400,'snow'],['Rain',400,'rain']];
const stOwn=id=>TESTER||STO.includes(id);
// custom stadium items: never in Play a Friend; in Career only if the player opts in (Settings: CST.h home / CST.a away, both default off = real stadiums)
const CST=Object.assign({h:0,a:0},J('fgfCST',{}));
function isHome(ti){if(mode==='vs')return false;if(mode==='career')return ti===myT()?!!CST.h:!!CST.a;return ti===myT()}
// ---- turf styles: every style paints the whole field from the kicker to the end zone in one pass (no patches/seams) ----
const TURF=[['classic','Classic Green',0,{g0:'#2c7a30',g1:'#1f6a26',st:0.07,ln:'rgba(255,255,255,0.7)',ga:0.6}],
 ['stripe','Striped Mow',300,{g0:'#2f8034',g1:'#216e28',st:0.16,ln:'rgba(255,255,255,0.75)',ga:0.5}],
 ['check','Checkerboard Mow',600,{g0:'#2f8034',g1:'#216e28',st:0.11,ck:1,ln:'rgba(255,255,255,0.75)',ga:0.45}],
 ['snow','Snow-Covered',800,{g0:'#e9eef4',g1:'#c9d3de',st:0.04,ln:'rgba(40,80,150,0.55)',ga:0.25}],
 ['retro','Retro Faded',500,{g0:'#7f9a55',g1:'#6a8446',st:0.06,ln:'rgba(250,245,225,0.6)',ga:0.5}],
 ['desert','Desert Sand-Tint',700,{g0:'#b9a56b',g1:'#9f8a55',st:0.06,ln:'rgba(255,255,255,0.7)',ga:0.35}],
 ['neon','Neon Night',1500,{g0:'#06231a',g1:'#031510',st:0.08,ln:'rgba(60,255,220,0.95)',glow:1,ga:0.35}],
 ['team','Team-Color Tint',1200,null]];
let TFO=J('fgfTurfO',['classic']),TFE=LS.fgfTurf||'classic';const tfOwn=id=>TESTER||TFO.includes(id);
function mix(a,b,k){const A=rgb(a),B=rgb(b);return'rgb('+A.map((v,i)=>v*(1-k)+B[i]*k|0)+')'}
function turfCfg(){const ti=stadT();if(!isHome(ti))return TURF[0][3];const t=TURF.find(q=>q[0]===TFE)||TURF[0];if(t[0]==='team')return{g0:mix('#2c7a30',TEAMS[myT()].p,0.55),g1:mix('#1f6a26',TEAMS[myT()].p,0.6),st:0.08,ln:'rgba(255,255,255,0.75)',ga:0.45};return t[3]}
function turfBands(TS){for(let z=Math.ceil(dist/5)*5-5;z>-8;z-=5){const z1=Math.min(dist+0.2,z+5),z0=Math.max(-7.6,z),a=P(0,0,z1),b=P(0,0,z0);if(!a||!b)continue;const ev=((z/5)|0)%2===0;
  if(!TS.ck){ctx.fillStyle=ev?'rgba(255,255,255,'+TS.st+')':'rgba(0,0,0,'+TS.st+')';ctx.fillRect(0,a.y,W,b.y-a.y);continue}
  for(let c=-8;c<8;c++){const x0=c*6.65,x1=x0+6.65,p1=P(x0,0,z1),p2=P(x1,0,z1),p3=P(x1,0,z0),p4=P(x0,0,z0);if(!p1||!p2||!p3||!p4)continue;ctx.fillStyle=(ev^(c&1))?'rgba(255,255,255,'+TS.st+')':'rgba(0,0,0,'+TS.st+')';ctx.beginPath();ctx.moveTo(p1.x,a.y);ctx.lineTo(p2.x,a.y);ctx.lineTo(p3.x,b.y);ctx.lineTo(p4.x,b.y);ctx.closePath();ctx.fill()}}}
// ---- stadium visuals hooks ----
function bgFor(ti){let i=ti;if(isHome(ti)&&ST.bg>=0&&bgOwn(ST.bg)&&BGS[ST.bg].im)i=ST.bg;const b=BGS[i]||BGS[ti];return{im:b.im||STI[ti],by:b.by||BASEY[ti]}}
function crowd(ti){const t=TEAMS[ti];if(!isHome(ti))return t;const c=CROWD[ST.crowd];return{p:c&&c[1]&&stOwn('crowd'+ST.crowd)?c[1]:t.p,s:c&&c[1]&&stOwn('crowd'+ST.crowd)?c[2]:t.s,n:ST.un&&ST.ez?ST.ez:t.n}}
function sky(ti,ez){if(!isHome(ti)||!ST.sky||!stOwn('sky'+ST.sky))return;ctx.save();if(ST.sky===1){const g=ctx.createLinearGradient(0,0,0,ez);g.addColorStop(0,'rgba(255,110,40,0.35)');g.addColorStop(1,'rgba(255,170,60,0.22)');ctx.fillStyle=g;ctx.fillRect(0,0,W,ez)}else{const g=ctx.createLinearGradient(0,0,0,ez);g.addColorStop(0,'rgba(5,10,40,0.72)');g.addColorStop(1,'rgba(10,20,60,0.45)');ctx.fillStyle=g;ctx.fillRect(0,0,W,ez);ctx.fillStyle='#fff';for(let i=0;i<40;i++){const u=(i*0.618)%1,v=(i*0.377)%1;ctx.globalAlpha=0.4+0.4*Math.sin(T*2+i);ctx.fillRect(u*W,v*ez*0.45,1.5,1.5)}}ctx.restore()}
const oNW=newWind;newWind=function(){oNW();if(['classic','time','pressure','career'].includes(mode)&&isHome(stadT())&&ST.un&&ST.wx&&stOwn('wx'+ST.wx))weather=SWX[ST.wx][2]};
// ---- buying ----
let P5=null;function buy5(id,pr,ok){if(TESTER){ok();toast('🧪 Unlocked (tester)');return}if(coins<pr){toast('Need 🪙 '+pr.toLocaleString());return}if(P5!==id){P5=id;toast('Tap again to buy · 🪙 '+pr.toLocaleString());return}P5=null;addCoins(-pr);ok();sfx.cheer();toast('✔ Unlocked')}
// ---- login streak (50 -> 500 over 7 days, then repeats; a missed day resets) ----
const LSR=[50,75,100,150,200,300,500];let LSS=J('fgfLStreak',{last:'',day:0});
function ymd(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function lsPending(){const t=ymd(new Date()),y=ymd(new Date(Date.now()-864e5));if(LSS.last===t)return 0;return LSS.last===y?LSS.day%7+1:1}
function lsClaim(){const d=lsPending();if(!d)return;const r=LSR[d-1];LSS={last:ymd(new Date()),day:d};SV('fgfLStreak',LSS);addCoins(r);sfx.cheer();toast('🎁 DAY '+d+' STREAK  🪙 +'+r)}
// ---- weekly challenges (seeded by ISO week; same 3 for everyone) ----
function isoWeek(){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+3-(d.getDay()+6)%7);const w1=new Date(d.getFullYear(),0,4);return d.getFullYear()*100+1+Math.round(((d-w1)/864e5-3+(w1.getDay()+6)%7)/7)}
const WCH=[['w50w','3 makes from 50+ yds in 10+ mph wind',3,600,(g)=>g&&dist>=50&&wind.mph>=10],['w5r','5 makes in a row',1,400,(g)=>g&&streak>=5],['w10','Make 15 kicks',15,300,g=>g],['w60','Make a 60+ yarder',1,700,g=>g&&dist>=60],['whu','3 Hurricane makes',3,500,g=>g&&mode==='hurricane'],['wcl','2 clutch game-winners',2,600,g=>g&&S3.cl()],['wwx','5 makes in rain or snow',5,450,g=>g&&(weather==='rain'||weather==='snow')],['w40','10 makes from 40+',10,500,g=>g&&dist>=40],['wdl','Make 2 Daily Challenges',2,500,g=>g&&mode==='daily']];
function weekSet(){const w=isoWeek();let s=w*2654435761%4294967296;const r=()=>(s=(s*1103515245+12345)%2147483648)/2147483648;const idx=[...WCH.keys()];for(let i=idx.length-1;i>0;i--){const j=r()*(i+1)|0;[idx[i],idx[j]]=[idx[j],idx[i]]}return idx.slice(0,3)}
let WK=J('fgfWeek',null);if(!WK||WK.w!==isoWeek())WK={w:isoWeek(),ids:weekSet(),p:[0,0,0],done:[0,0,0]};SV('fgfWeek',WK);
// ---- kick of the week (own best kick this week, with the trajectory for replay) ----
let KOTW=J('fgfKotw',null);if(KOTW&&KOTW.w!==isoWeek())KOTW=null;
// ---- friend Daily board (no backend yet; real online boards come with the Play app later) ----
let FR=J('fgfFriends',[]);
(function(){const q=new URLSearchParams(location.search).get('fr');if(!q)return;try{const o=JSON.parse(decodeURIComponent(escape(atob(q))));if(o&&o.n&&o.d){const n=String(o.n).slice(0,12);FR=FR.filter(f=>!(f.n===n&&f.d===o.d));FR.push({n,s:+o.s||0,d:String(o.d)});FR=FR.slice(-60);SV('fgfFriends',FR);setTimeout(()=>toast('👥 Added '+n+'\'s Daily score: '+(o.s?o.s+' yds':'miss')),500)}}catch(e){}})();
function frLink(){const d=DL(),o={n:(MK.name||'Friend').slice(0,12),s:d.made?(d.dist||0):0,d:dkey(new Date())};return URL0+'?fr='+btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
// ---- result hook: haptics, weekly progress, kick of the week ----
const oR5=S3.onResult;S3.onResult=function(good){oR5(good);
 if(LS.fgfVib!=='0'&&navigator.vibrate){const perfect=good&&Math.abs(ball.x)<1.0;try{navigator.vibrate(good?(perfect||dist>=50?[70,40,110,40,160]:[35]):[22,70,22])}catch(e){}}
 if(mode!=='tut'){WK.ids.forEach((ci,k)=>{if(WK.done[k])return;const c=WCH[ci];if(c[4](good)){WK.p[k]=Math.min(c[2],WK.p[k]+1);if(WK.p[k]>=c[2]){WK.done[k]=1;addCoins(c[3]);toast('📋 WEEKLY DONE  🪙 +'+c[3])}}});SV('fgfWeek',WK)}
 if(good&&mode!=='tut'&&ball.res!=='BLOCKED!'&&TR.length>8&&(!KOTW||dist>KOTW.d)){KOTW={w:isoWeek(),d:dist,wx:weather,ti:stadT(),date:new Date().toDateString(),tr:TR.filter((p,i)=>i%2===0).map(p=>[+p.x.toFixed(2),+p.y.toFixed(2),+p.z.toFixed(2),+(p.r||0).toFixed(2)])};SV('fgfKotw',KOTW)}};
let KR=null;function kotwReplay(share5){if(!KOTW)return;KR={dist,weather,wind,mode,team,share:share5};dist=KOTW.d;weather=KOTW.wx;wind={mph:0,a:0,x:0,z:0};mode='kotw';TR=[];KOTW.tr.forEach((p,i)=>{const q={x:p[0],y:p[1],z:p[2],r:p[3]};TR.push(q);const n=KOTW.tr[i+1];if(n)TR.push({x:(p[0]+n[0])/2,y:(p[1]+n[1])/2,z:(p[2]+n[2])/2,r:(p[3]+n[3])/2})});RP={t:0,good:true,cl:false};state='replay';if(share5)setTimeout(()=>{if(state==='replay')share('My Kick of the Week: a '+KOTW.d+'-yarder')},400)}
const oCA=contAfter;contAfter=function(g){if(RP&&!RP.rec&&mode==='kotw'){RP=null;Object.assign(window,{});dist=KR.dist;weather=KR.weather;wind=KR.wind;mode=KR.mode;KR=null;state='title';return}return oCA(g)};
// ---- shared UI ----
function cyc(y,label,val,sub,prev,next,tap){const x0=W*0.05,w=W*0.9;panel(x0,y,w,40);ctx.fillStyle='#bcd';ctx.font='900 10px system-ui';ctx.textAlign='left';ctx.fillText(label,x0+10,y+16);ctx.fillStyle='#fff';ctx.font='900 14px system-ui';ctx.fillText(val,x0+10,y+33);if(sub){ctx.textAlign='right';ctx.fillStyle=sub[0]==='🪙'?GOLD:'#7fd38a';ctx.font='900 11px system-ui';ctx.fillText(sub,x0+w-88,y+26)}if(prev)bx(x0+w-80,y+5,34,30,'◀',prev,false,13);if(next)bx(x0+w-40,y+5,34,30,'▶',next,false,13);if(tap)btn(x0,y,w-90,40,tap)}
const nx=(v,n,d)=>(v+d+n)%n;
function priceTag(own,pr){return own||!pr?'':'🪙 '+pr.toLocaleString()+' · TAP'}
// ---- MY KICKER screen ----
let mkF=0;
function drawMK(){txt('MY KICKER',W/2,H*0.06,Math.min(30,W*0.08),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('🪙 '+CSTR()+' · most options free',W/2,H*0.06+20);
 const im=mySheet(myT()),ph=Math.min(H*0.2,170),pw=ph*203/300;mkF=(T*1.6|0)%4;panel(W/2-pw*0.75,H*0.095,pw*1.5,ph+8);ctx.drawImage(im,mkF*203,0,203,300,W/2-pw/2,H*0.1,pw,ph);
 ctx.fillStyle=GOLD;ctx.font='900 12px system-ui';ctx.fillText((MK.name||'MY KICKER')+' #'+myNum(myT())+(MK.on?' · IN USE':' · PREVIEW'),W/2,H*0.1+ph+20);
 bx(W*0.05,H*0.1+ph+28,W*0.9,32,MK.on?'✔ USING MY KICKER (tap for team kicker)':'USE MY KICKER',()=>{MK.on=MK.on?0:1;saveMK()},!!MK.on,12);
 const top=H*0.1+ph+66,bot=H*0.93-28,rh=48;let y=top-MKS.y;const R=(l,v,s,p,n,t)=>{if(y>=top-1&&y+42<=bot+1)cyc(y,l,v,s,p,n,t);else if(y+42>top&&y<bot){ctx.save();ctx.beginPath();ctx.rect(0,top,W,bot-top);ctx.clip();cyc(y,l,v,s,null,null,null);ctx.restore()}y+=rh};const pend=()=>{KC5.my=null;MK.on=1};MKS.top=top;MKS.bot=bot;
 const bodies=8+8,bi=MK.masc>=0?8+MK.masc:MK.base,mo=MK.masc>=0?own5('masc'+MK.masc):1;
 R('BODY',bi<8?TEAMS[bi].n.split(' ').slice(-1)[0]+' kicker':'🐾 '+TEAMS[MK.masc].n.split(' ').slice(-1)[0]+' MASCOT',MK.masc>=0?(mo?'OWNED':'🪙 '+MASCP[MK.masc].toLocaleString()+' · TAP'):'',()=>{const v=nx(bi,bodies,-1);if(v<8){MK.base=v;MK.masc=-1}else MK.masc=v-8;pend()},()=>{const v=nx(bi,bodies,1);if(v<8){MK.base=v;MK.masc=-1}else MK.masc=v-8;pend()},()=>{if(MK.masc>=0&&!mo)buy5('masc'+MK.masc,MASCP[MK.masc],()=>{MKO.push('masc'+MK.masc);SV('fgfMKO',MKO);MK.on=1;saveMK()})});
 for(const[k,L,lab]of[['skin',SKIN,'SKIN TONE'],['hair',HAIR,'HAIR'],['wb',WBAND,'WRISTBAND'],['vz',VISOR,'VISOR TINT']]){const o=L[MK[k]],ow=!o[2]||own5(k+MK[k]);R(lab,o[0],priceTag(ow,o[2]),()=>{MK[k]=nx(MK[k],L.length,-1);pend()},()=>{MK[k]=nx(MK[k],L.length,1);pend()},()=>{if(!ow)buy5(k+MK[k],o[2],()=>{MKO.push(k+MK[k]);SV('fgfMKO',MKO);saveMK()})})}
 R('EYE BLACK',MK.eb?'On':'Off','',null,()=>{MK.eb^=1;pend()},()=>{MK.eb^=1;pend()});R('SLEEVE',MK.sl?'On':'Off','',null,()=>{MK.sl^=1;pend()},()=>{MK.sl^=1;pend()});
 R('NAME (tap to edit)',MK.name||'—','',null,null,()=>{const v=prompt('Kicker name (max 12)',MK.name||'');if(v!=null){MK.name=v.toUpperCase().replace(/[^A-Z0-9 .'-]/g,'').slice(0,12);MK.on=1;saveMK()}});
 R('NUMBER (tap to edit)',MK.num>=0?'#'+MK.num:'Team #'+NUMS5[myT()],'',null,null,()=>{const v=prompt('Jersey number 0-99',MK.num>=0?MK.num:'');if(v!=null&&/^\d{1,2}$/.test(v.trim())){MK.num=+v.trim();MK.on=1;saveMK()}});
 MKS.max=Math.max(0,y+MKS.y-bot);if(MKS.max>0){const th=(bot-top)*(bot-top)/(bot-top+MKS.max);ctx.fillStyle='rgba(242,194,48,0.6)';ctx.fillRect(W-5,top+(bot-top-th)*MKS.y/MKS.max,3,th)}
 bx(W/2-90,H*0.93-20,180,40,'◀ SAVE & BACK',()=>{saveMK();state='title'},true,14)}
const MKS={y:0,max:0,top:0,bot:0};window.MKS=MKS;
cv.addEventListener('wheel',e=>{if(state==='shop'&&window.PKS){PKS.y=Math.max(0,Math.min(PKS.max,PKS.y+e.deltaY));return}if(state==='mk'){MKS.y=Math.max(0,Math.min(MKS.max,MKS.y+e.deltaY));e.preventDefault()}},{passive:false});
// ---- STADIUM screen (backdrops / creator / turf) ----
let stTab=0;
function drawST(){txt('MY STADIUM',W/2,H*0.06,Math.min(30,W*0.08),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('🪙 '+CSTR()+' · Career: choose in Settings',W/2,H*0.06+20);
 const tw=(W*0.9-12)/4;['🖼️ BACKDROP','🏟️ CREATOR','🌱 TURF','🥅 UPRIGHTS'].forEach((l,i)=>bx(W*0.05+i*(tw+4),H*0.1,tw,32,l,()=>{stTab=i;P5=null},stTab===i,Math.min(11,tw/8.5)));
 const y0=H*0.1+42;
 if(stTab===0){const cw=(W*0.9-8)/2,ch=Math.min(92,(H*0.8-y0)/6);BGS.forEach((b,i)=>{const x=W*0.05+(i%2)*(cw+8),y=y0+(i/2|0)*(ch+4);panel(x,y,cw,ch);if(b.im&&b.im.complete&&b.im.naturalWidth){ctx.save();ctx.beginPath();ctx.roundRect(x+3,y+3,cw-6,ch-24,6);ctx.clip();ctx.drawImage(b.im,0,(b.by||600)-560,960,520,x+3,y+3,cw-6,(cw-6)*520/960);ctx.restore()}else{ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(x+3,y+3,cw-6,ch-24);ctx.fillStyle='#8ab';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('COMING SOON',x+cw/2,y+ch/2-6)}
  const o=!b.soon&&bgOwn(i),eqd=(ST.bg<0?myT():ST.bg)===i;ctx.fillStyle=eqd?'#7fd38a':o?'#fff':GOLD;ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText((eqd?'✔ ':'')+b.name+(b.soon?'':o?'':' · 🪙 '+b.price),x+cw/2,y+ch-7);
  if(!b.soon)btn(x,y,cw,ch,()=>{if(o){ST.bg=i;SV('fgfST',ST);toast('🖼️ '+b.name+' set as home backdrop')}else buy5(b.id,b.price,()=>{BGO.push(b.id);SV('fgfBGO',BGO);ST.bg=i;SV('fgfST',ST)})})})}
 else if(stTab===1){if(!ST.un&&!TESTER){panel(W*0.08,y0+20,W*0.84,140);ctx.fillStyle='#fff';ctx.font='900 16px system-ui';ctx.textAlign='center';ctx.fillText('STADIUM CREATOR',W/2,y0+52);ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.fillText('Crowd colors · sky · weather · end zone text · name',W/2,y0+76);bx(W*0.2,y0+96,W*0.6,44,'UNLOCK · 🪙 2,000',()=>buy5('stun',2000,()=>{ST.un=1;SV('fgfST',ST)}),true,14)}
  else{let y=y0;const rh=48;const R=(l,v,s,p,n,t)=>{cyc(y,l,v,s,p,n,t);y+=rh};const S=()=>SV('fgfST',ST);
   const c=CROWD[ST.crowd],co=!c[3]||stOwn('crowd'+ST.crowd);R('CROWD COLORS',c[0],priceTag(co,c[3]),()=>{ST.crowd=nx(ST.crowd,CROWD.length,-1);S()},()=>{ST.crowd=nx(ST.crowd,CROWD.length,1);S()},()=>{if(!co)buy5('crowd'+ST.crowd,c[3],()=>{STO.push('crowd'+ST.crowd);SV('fgfSTO',STO)})});
   const k=SKY[ST.sky],ko=!k[1]||stOwn('sky'+ST.sky);R('SKY / TIME OF DAY',k[0],priceTag(ko,k[1]),()=>{ST.sky=nx(ST.sky,3,-1);S()},()=>{ST.sky=nx(ST.sky,3,1);S()},()=>{if(!ko)buy5('sky'+ST.sky,k[1],()=>{STO.push('sky'+ST.sky);SV('fgfSTO',STO)})});
   const w=SWX[ST.wx],wo=!w[1]||stOwn('wx'+ST.wx);R('WEATHER',w[0],priceTag(wo,w[1]),()=>{ST.wx=nx(ST.wx,3,-1);S()},()=>{ST.wx=nx(ST.wx,3,1);S()},()=>{if(!wo)buy5('wx'+ST.wx,w[1],()=>{STO.push('wx'+ST.wx);SV('fgfSTO',STO)})});
   R('END ZONE TEXT (tap)',ST.ez||TEAMS[myT()].n,'',null,null,()=>{const v=prompt('End zone text (max 18)',ST.ez||'');if(v!=null){ST.ez=v.toUpperCase().slice(0,18);S()}});
   R('STADIUM NAME (tap)',ST.name||'—','',null,null,()=>{const v=prompt('Stadium name (max 22)',ST.name||'');if(v!=null){ST.name=v.slice(0,22);S()}});
   ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Locked options preview in 👁 but only apply once bought',W/2,y+14)}}
else if(stTab===3)drawUP(y0);
 else{const rh=Math.min(50,(H*0.82-y0)/TURF.length);TURF.forEach((t,i)=>{const y=y0+i*rh,o=tfOwn(t[0]),e=TFE===t[0];panel(W*0.05,y,W*0.9,rh-4);turfSwatch(t,W*0.07,y+5,40,rh-14);ctx.fillStyle='#fff';ctx.font='900 13px system-ui';ctx.textAlign='left';ctx.fillText((e?'✔ ':'')+t[1],W*0.07+50,y+rh/2+2);ctx.textAlign='right';ctx.fillStyle=o?'#7fd38a':GOLD;ctx.font='900 12px system-ui';ctx.fillText(e?'EQUIPPED':o?'TAP TO USE':t[4]?t[4]:'🪙 '+t[2],W*0.93,y+rh/2+2);
  btn(W*0.05,y,W*0.9,rh-4,()=>{if(t[0]==='custom'){if(o)state='cfield';else toast('Coming soon on Google Play');return}if(o){TFE=t[0];LS.fgfTurf=TFE}else buy5('turf_'+t[0],t[2],()=>{TFO.push(t[0]);SV('fgfTurfO',TFO);TFE=t[0];LS.fgfTurf=TFE})})})}
 bx(W*0.05,H*0.93-20,W*0.42,40,'👁 PREVIEW',()=>{state='prev'},false,14);bx(W*0.53,H*0.93-20,W*0.42,40,'◀ BACK',()=>state='title',true,14)}
// ---- weekly / kotw / settings / friends screens ----
function drawWeek(){txt('WEEKLY CHALLENGES',W/2,H*0.08,Math.min(26,W*0.07),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';const now=new Date(),dl=(8-((now.getDay()+6)%7+1))%7||7;ctx.fillText('Same 3 for everyone · resets in '+dl+' day'+(dl>1?'s':''),W/2,H*0.08+22);
 WK.ids.forEach((ci,k)=>{const c=WCH[ci],y=H*0.08+70+k*96;panel(W*0.05,y,W*0.9,86);ctx.textAlign='left';ctx.fillStyle=WK.done[k]?'#7fd38a':'#fff';ctx.font='900 14px system-ui';ctx.fillText((WK.done[k]?'✔ ':'')+c[1],W*0.09,y+26);ctx.fillStyle=GOLD;ctx.font='900 12px system-ui';ctx.fillText('🪙 '+c[3],W*0.09,y+46);ctx.fillStyle='#223';ctx.fillRect(W*0.09,y+58,W*0.82,12);ctx.fillStyle=WK.done[k]?'#3ddc84':GOLD;ctx.fillRect(W*0.09,y+58,W*0.82*WK.p[k]/c[2],12);ctx.fillStyle='#fff';ctx.font='10px system-ui';ctx.textAlign='right';ctx.fillText(WK.p[k]+' / '+c[2],W*0.91,y+46)});
 bx(W/2-90,H*0.08+70+300,180,42,'◀ MENU',()=>state='title',true,15)}
function drawKotw(){txt('KICK OF THE WEEK',W/2,H*0.1,Math.min(28,W*0.075),GOLD,'#063');panel(W*0.08,H*0.16,W*0.84,190);if(!KOTW){ctx.fillStyle='#bcd';ctx.font='14px system-ui';ctx.textAlign='center';ctx.fillText('Make a kick this week to set your spotlight!',W/2,H*0.16+95)}else{txt('⭐ '+KOTW.d+' YARDS',W/2,H*0.16+60,34,'#fff');ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText(KOTW.date+' · '+KOTW.wx+' · '+TEAMS[KOTW.ti].n,W/2,H*0.16+92);ctx.fillText(who(),W/2,H*0.16+114);bx(W*0.25,H*0.16+132,W*0.5,44,'▶ REPLAY',()=>kotwReplay(false),true,15);}
 bx(W/2-90,H*0.16+220,180,42,'◀ MENU',()=>state='title',false,15)}
function drawSet(){txt('SETTINGS',W/2,H*0.2,36,'#fff');const bw=Math.min(280,W*0.8),x=W/2-bw/2,m=LS.fgfMute==='1',v=LS.fgfVib!=='0';bx(x,H*0.3,bw,50,'🔊 SOUND: '+(m?'OFF':'ON'),()=>{LS.fgfMute=m?'0':'1';if(AC){AC.resume();OUT(AC)}},!m);bx(x,H*0.3+62,bw,50,'📳 HAPTICS: '+(v?'ON':'OFF'),()=>{LS.fgfVib=v?'0':'1';if(!v&&navigator.vibrate)navigator.vibrate(40)},v);bx(x,H*0.3+124,bw,50,'📖 REPLAY TUTORIAL',()=>S4.tut());const cs=(k)=>()=>{CST[k]=CST[k]?0:1;SV('fgfCST',CST)};bx(x,H*0.3+272,bw,40,'🏟 Career HOME: '+(CST.h?'MY STADIUM':'Team stadium'),cs('h'),!!CST.h,12);bx(x,H*0.3+318,bw,40,'🏟 Career AWAY: '+(CST.a?'MY STADIUM':'Opponent stadium'),cs('a'),!!CST.a,12);if(TESTER){ctx.fillStyle='#ff6af0';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('🧪 Tester mode: open ?tester=off to disable',W/2,H*0.3+196)}bx(x,H*0.3+366,bw,46,'◀ BACK',()=>state='title')}
function friendBoard(y){const t=dkey(new Date()),d=DL(),L=FR.filter(f=>f.d===t).map(f=>({n:f.n,s:f.s}));if(d.done)L.push({n:(MK.name||'YOU')+' (you)',s:d.made?(d.dist||0):0,me:1});L.sort((a,b)=>b.s-a.s);panel(W*0.08,y,W*0.84,22+Math.max(1,Math.min(5,L.length))*18);ctx.fillStyle=GOLD;ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('👥 FRIENDS TODAY',W/2,y+15);if(L.length<2){ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.fillText('Use "Challenge a friend" to compare',W/2,y+33)}L.slice(0,5).forEach((f,i)=>{ctx.fillStyle=f.me?'#7fd38a':'#fff';ctx.font='12px system-ui';ctx.textAlign='left';ctx.fillText((i+1)+'. '+f.n,W*0.12,y+33+i*18);ctx.textAlign='right';ctx.fillText(f.s?f.s+' yds':'miss',W*0.88,y+33+i*18)})}
// ---- screen + menu integration ----
const oS5=S3.screen;S3.screen=function(){if(state==='mk'){BTN=[];drawMK();return true}if(state==='stad'){BTN=[];drawST();return true}if(state==='week'){BTN=[];drawWeek();return true}if(state==='kotw'){BTN=[];drawKotw();return true}if(state==='set'){BTN=[];drawSet();return true}
 if(state==='prev'){BTN=[];ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(0,H-60,W,60);txt('PREVIEW · tap to go back',W/2,H-24,15,'#fff');btn(0,0,W,H,()=>state='stad');return true}
 const r=oS5();if(state==='dres'){ctx.fillStyle='#7fd3ff';ctx.font='bold 13px system-ui';ctx.textAlign='center';ctx.fillText('Challenge a friend → copy link',W/2,H*0.68);ctx.fillRect(W/2-95,H*0.68+3,190,1);btn(W/2-100,H*0.68-16,200,24,()=>{const u=frLink(),t='Beat my Daily Challenge in Field Goal Frenzy! '+u;if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast('🔗 Score link copied'),()=>toast(u));else toast(u)},false,10);friendBoard(H*0.81)}
 if(state==='title')menuExtras();if(TESTER){ctx.fillStyle='rgba(255,40,200,0.85)';ctx.beginPath();ctx.roundRect(W-62,H-20,58,16,8);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 10px system-ui';ctx.textAlign='center';ctx.fillText('TESTER',W-33,H-8)}return r};
function chip(x,y,w,h,t,cb,hot){ctx.fillStyle=hot?'rgba(242,194,48,0.95)':'rgba(8,20,40,0.85)';ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(x,y,w,h,h/2);ctx.fill();ctx.stroke();ctx.fillStyle=hot?'#063':'#fff';ctx.font='900 '+Math.min(11,w/11)+'px system-ui';ctx.textAlign='center';ctx.fillText(t,x+w/2,y+h*0.66);btn(x,y,w,h,cb)}
function menuExtras(){const y=H*0.255,w=(W*0.88-12)/3,x0=W*0.06,pd=lsPending();
 chip(x0,y,w,26,pd?'🎁 DAY '+pd+' +'+LSR[pd-1]:'🎁 DAY '+LSS.day+' ✔',()=>{if(pd)lsClaim();else toast('Streak day '+LSS.day+' · come back tomorrow')},!!pd);
 chip(x0+w+6,y,w,26,'📋 WEEKLY '+WK.done.reduce((a,b)=>a+b,0)+'/3',()=>state='week');
 chip(x0+2*(w+6),y,w,26,KOTW?'⭐ KOTW '+KOTW.d+'y':'⭐ KICK OF WK',()=>state='kotw');
 if(ST.un&&ST.name){ctx.fillStyle='#bcd';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText('🏟️ '+ST.name,W/2,y-4)}}
// ---- starter pack (one-time $1.99; display only, like the other packs) ----
PACKS.unshift({id:'starter',price:'$1.99',coins:5000,name:'Starter Pack',desc:'5,000 coins + Neon Night turf + a backdrop',tag:'ONE-TIME'});
const oPur=BILLING.onPurchased;BILLING.onPurchased=function(id){if(id==='starter'){if(LS.fgfStarter)return;LS.fgfStarter='1';if(!TFO.includes('neon'))TFO.push('neon');SV('fgfTurfO',TFO);const b=BGS.find(q=>!q.soon&&!bgOwn(BGS.indexOf(q)));if(b){BGO.push(b.id);SV('fgfBGO',BGO)}}oPur(id)};
window.S5={kimg:kimg5,who,turf:turfCfg,bands:turfBands,bgFor,crowd,sky,isHome,mascSheet,teamSheet,KMETA};
