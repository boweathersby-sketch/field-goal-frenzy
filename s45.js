// s45 (Batch 6, customization): STYLE shop tab with helmet stickers, sleeves, victory poses, name plates, crowd signs and kick sounds.
// Overlays use the same per-frame anchors as gear (s26), are drawn on human kickers only (mascots skipped) and never touch the sprite or animation.
(function(){
const HELM=[[.35,.105],[.47,.105],[.34,.13],[.29,.13]],HANDS=[[[.14,.54],[.58,.56]],[[.19,.56],[.63,.56]],[[.06,.56],[.67,.455]],[[.105,.56],[.65,.18]]];
const ST=()=>Object.assign({k:'',s:'',p:'',n:'',cs:'',ks:''},J('fgfSty',{})),setST=(k,v)=>{const s=ST();s[k]=v;SV('fgfSty',s)};
const tm=()=>(typeof TEAMS!=='undefined'&&TEAMS[typeof team!=='undefined'&&team>=0?team:0])||{p:'#5b2a86',s:'#f2c230'};
// catalog: [id,name,price,data]
const CAT={k:['STICKERS','🏷️',[['sy_k0','Gold Star',150,['★','#ffd23f']],['sy_k1','Lightning Bolt',200,['⚡','#fff36b']],['sy_k2','Skull',250,['☠','#ffffff']],['sy_k3','Flame',250,['🔥']],['sy_k4','Heart',150,['♥','#ff2d6f']],['sy_k5','Shamrock',200,['☘','#2ecc71']],['sy_k6','Crown',400,['♛','#ffd23f']],['sy_k7','Diamond',600,['◆','#7fe8ff']],['sy_k8','Football',150,['🏈']],['sy_k9','Team Logo Dot',300,['●','team']],['sy_k10','Number 1',350,['1','#ffd23f']],['sy_k11','Galaxy Star',900,['✦','#c77dff']]]],
 s:['SLEEVES','🦾',[['sy_s0','White Sleeves',150,['#ffffff']],['sy_s1','Black Sleeves',150,['#111111']],['sy_s2','Team Sleeves',250,['team']],['sy_s3','Gold Sleeves',500,['#ffd23f']],['sy_s4','Red Sleeves',200,['#e6283c']],['sy_s5','Neon Green',350,['#39ff14',1]],['sy_s6','Ice Blue',350,['#7fe8ff',1]],['sy_s7','Pink Sleeves',200,['#ff6ad5']],['sy_s8','Camo Sleeves',450,['#4b5320']],['sy_s9','Chrome Sleeves',800,['#d9e3ee',1]]]],
 p:['POSES','💪',[['sy_p0','The Flex',200,['💪','FLEX!']],['sy_p1','Salute',200,['🫡','SALUTE!']],['sy_p2','Point to the Sky',300,['☝️','UP TOP!']],['sy_p3','Shh…',300,['🤫','SHHH!']],['sy_p4','Crown Me',500,['👑','CROWN ME!']],['sy_p5','Money',600,['💰','CASH IT!']],['sy_p6','Ice Cold',600,['🥶','ICE COLD!']],['sy_p7','Dab',400,['🙌','DAB!']]]],
 n:['NAME PLATES','🪪',[['sy_n0','Classic Plate',150,['#063','#ffd23f']],['sy_n1','Gold Plate',500,['#ffd23f','#063']],['sy_n2','Chrome Plate',600,['#d9e3ee','#1d2a3c']],['sy_n3','Neon Plate',450,['#0b0033','#ff2bd6']],['sy_n4','Team Plate',300,['team','#fff']],['sy_n5','Fire Plate',500,['#ff5a00','#fff36b']],['sy_n6','Ice Plate',500,['#bfefff','#08304a']],['sy_n7','Night Plate',300,['#111827','#9ad5ff']]]],
 cs:['CROWD SIGNS','🪧',[['sy_c0','GO KICKER!',150,['GO KICKER!']],['sy_c1','DOINK!',200,['DOINK!']],['sy_c2','IT\'S GOOD!',200,['IT\'S GOOD!']],['sy_c3','LEG DAY',250,['LEG DAY']],['sy_c4','80 YDS OR BUST',400,['80 OR BUST']],['sy_c5','#1 FAN',150,['#1 FAN']],['sy_c6','MY NAME',500,['__name']],['sy_c7','ICE IN VEINS',300,['ICE IN VEINS']],['sy_c8','SPLIT THE POSTS',300,['SPLIT EM']],['sy_c9','BOOM!',200,['BOOM!']]]],
 ks:['KICK SOUNDS','🔊',[['sy_x0','Big Boom',200,'boom'],['sy_x1','Thwack',150,'thwack'],['sy_x2','Retro 8-Bit',300,'bit'],['sy_x3','Laser',400,'laser'],['sy_x4','Cannon',500,'cannon'],['sy_x5','Whoosh',250,'whoosh'],['sy_x6','Bongo',300,'bongo'],['sy_x7','Thunder Foot',700,'thunder']]]};
const KEYS=Object.keys(CAT),BYID={};KEYS.forEach(k=>CAT[k][2].forEach(it=>BYID[it[0]]=[k,it]));window.FGF_STYLE={CAT,ST,BYID};
const owns=id=>own.includes(id)||!!window.TESTER;
// ---- sounds ----
const KS={boom:()=>{tone(90,35,0.35,1);noise(0.18,500,1,0.7,0.002)},thwack:()=>{noise(0.06,2500,2,0.9,0.001);tone(220,90,0.08,0.6)},bit:()=>{tone(660,660,0.05,0.35,'square');setTimeout(()=>tone(990,990,0.07,0.3,'square'),50)},laser:()=>tone(1800,120,0.25,0.35,'sawtooth'),
 cannon:()=>{tone(70,30,0.6,1);noise(0.5,300,0.7,0.8,0.002)},whoosh:()=>noise(0.35,1200,0.6,0.6,0.08),bongo:()=>{tone(320,260,0.12,0.7);setTimeout(()=>tone(240,200,0.12,0.6),90)},thunder:()=>{tone(80,40,0.4,0.9);noise(0.9,180,0.6,0.7,0.01)}};
const oK=sfx.kick;sfx.kick=function(){const s=ST().ks,b=BYID[s];if(b&&owns(s)&&KS[b[1][3]]){try{KS[b[1][3]]()}catch(e){}return}return oK.apply(this,arguments)};
// ---- overlays on the kicker ----
function overlays(fr,x,y,w,h,st){fr=Math.max(0,Math.min(3,fr|0));const P=q=>[x+w*q[0],y+h*q[1]];ctx.save();
 const sl=BYID[st.s];if(sl&&sl[0]==='s'){let c=sl[1][3][0];if(c==='team')c=tm().p;const r=w*0.06;if(sl[1][3][1]){ctx.shadowColor=c;ctx.shadowBlur=r}ctx.strokeStyle=c;ctx.lineCap='round';ctx.lineWidth=Math.max(2,r*0.9);HANDS[fr].forEach(q=>{const [px,py]=P(q),dy=fr===3&&q[1]<0.3?h*0.05:-h*0.05;ctx.beginPath();ctx.moveTo(px-r*0.55,py+dy);ctx.lineTo(px+r*0.55,py+dy);ctx.stroke()});ctx.shadowBlur=0}
 const sk=BYID[st.k];if(sk&&sk[0]==='k'){const [px,py]=P(HELM[fr]),d=sk[1][3],fs=Math.max(7,w*0.11);ctx.font='900 '+fs+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=d[1]==='team'?tm().s:(d[1]||'#fff');ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineWidth=2;const sx=px+w*0.03,sy=py-h*0.022;if(d[1])ctx.strokeText(d[0],sx,sy);ctx.fillText(d[0],sx,sy);ctx.textBaseline='alphabetic'}
 ctx.restore()}
window.FGF_STYOV=overlays;
const od=S3.decal;S3.decal=function(fr,x,y,w,h){const r=od.apply(this,arguments);try{const im=S3.kimg();if(!(im&&im._masc)){const st=Object.assign({},ST());['k','s'].forEach(k=>{if(st[k]&&!owns(st[k]))st[k]=''});overlays(fr,x,y,w,h,st)}window.__KR={x,y,w,h}}catch(e){}return r};
// ---- victory pose callout after a make ----
let POSE=null;const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{const p=ST().p,b=BYID[p];if(good&&b&&owns(p))POSE={d:b[1][3],t:performance.now()}}catch(e){}return r};
// ---- crowd signs (drawn in the stands, behind the kicker) ----
const nm=()=>(J('fgfMK',{}).name||LS.fgfOLIni||'KICKER').toUpperCase().slice(0,12);window.FGF_KNUM=window.FGF_KNUM||(()=>'');
function signs(){const c=ST().cs,b=BYID[c];if(!b||!owns(c)||state!=='play')return;let t=b[1][3][0];if(t==='__name')t='GO '+nm()+'!';const T0=performance.now()/1000,base=(typeof HY!=='undefined'?HY:H*0.4)-H*0.035;ctx.save();ctx.font='900 '+Math.max(8,W*0.024)+'px system-ui';ctx.textAlign='center';
 [0.16,0.5,0.84].forEach((fx,i)=>{const bob=Math.sin(T0*3+i*2)*2+(streak>2?Math.sin(T0*9+i)*2:0),x=W*fx+(i===1?W*0.12:0),y=base-i%2*H*0.012+bob,tw=ctx.measureText(t).width+8;ctx.fillStyle=i%2?'#fff':'#ffd23f';ctx.fillRect(x-tw/2,y-9,tw,13);ctx.strokeStyle='#222';ctx.lineWidth=1;ctx.strokeRect(x-tw/2,y-9,tw,13);ctx.fillStyle='#111';ctx.fillText(t,x,y+1);ctx.fillStyle='#5a3a1a';ctx.fillRect(x-1,y+4,2,6)});ctx.restore()}
const oP=drawPosts;drawPosts=function(){try{signs()}catch(e){}return oP.apply(this,arguments)};
// ---- name plate (lower third) + pose bubble ----
function plate(n0,px,py){const n=n0||ST().n,b=BYID[n];if(!b||(!n0&&!owns(n)))return;let [bg,fg]=b[1][3];if(bg==='team')bg=tm().p;const t='#'+(window.FGF_KNUM?FGF_KNUM():'')+' '+nm(),fs=W<350?11:12;ctx.save();ctx.font='900 '+fs+'px system-ui';const tw=Math.min(W*0.5,ctx.measureText(t).width+20),x=px!=null?px-tw/2:W*0.04,y=py!=null?py:H*0.885;ctx.fillStyle=bg;ctx.strokeStyle=fg;ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(x,y,tw,22,6);ctx.fill();ctx.stroke();ctx.fillStyle=fg;ctx.textAlign='left';ctx.fillText(t.replace('# ',''),x+10,y+15,tw-16);ctx.restore()}
function pose(){if(!POSE)return;const a=(performance.now()-POSE.t)/1000;if(a>1.8){POSE=null;return}const K=window.__KR;if(!K)return;const x=K.x+K.w*0.5,y=K.y-10-a*8;ctx.save();ctx.globalAlpha=Math.min(1,(1.8-a)*2);ctx.font=(W<350?26:32)+'px system-ui';ctx.textAlign='center';ctx.fillText(POSE.d[0],x,y);ctx.font='900 '+(W<350?13:15)+'px system-ui';ctx.fillStyle=GOLD;ctx.strokeStyle='#063';ctx.lineWidth=3;ctx.strokeText(POSE.d[1],x,y+18);ctx.fillText(POSE.d[1],x,y+18);ctx.restore()}
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(state==='play'){plate();pose()}}catch(e){}return r};
// ---- STYLE shop tab ----
SHOP.push(['STYLE',[]]);let sub='k',pg=0,PV=null;
function buy(it){if(owns(it[0]))return;if(coins<it[2]){toast('Not enough coins · need 🪙 '+it[2].toLocaleString());return}addCoins(-it[2]);own.push(it[0]);SV('fgfOwn',own);try{sfx.cheer()}catch(e){}equip(it[0]);toast('✔ '+it[1]+' unlocked & equipped')}
function equip(id){const k=BYID[id][0],s=ST();setST(k,s[k]===id?'':id);if(k==='ks'&&ST().ks)sfx.kick()}
function preview(it){const k=BYID[it[0]][0];if(k==='ks'){try{KS[it[3]]()}catch(e){}return}if(k==='cs'||k==='n'||k==='p'){PV={it,k,t:performance.now()};return}PV={it,k,t:performance.now()}}
window.FGF_TABROWS=window.FGF_TABROWS||{};
FGF_TABROWS.STYLE=function(){const ra=window.FGF_ROWSAREA?FGF_ROWSAREA():{y0:H*0.3,y1:H*0.8},y0=ra.y0,y1=ra.y1;ctx.fillStyle='rgba(4,18,10,0.97)';ctx.fillRect(W*0.03,y0-4,W*0.94,y1-y0+40);
 const cw=W*0.94/KEYS.length;KEYS.forEach((k,i)=>bx(W*0.03+i*cw+1,y0,cw-2,26,CAT[k][1],()=>{sub=k;pg=0;PV=null},sub===k,15));ctx.fillStyle='#bcd';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText(CAT[sub][0]+' · cosmetic only',W/2,y0+40);
 const L=CAT[sub][2],rh=46,ys=y0+48,per=Math.max(1,Math.floor((y1-ys)/rh)),pages=Math.ceil(L.length/per);if(pg>=pages)pg=0;const st=ST();
 L.slice(pg*per,pg*per+per).forEach((it,i)=>{const y=ys+i*rh,ow=owns(it[0]),on=st[sub]===it[0];ctx.fillStyle='rgba(6,30,16,0.98)';ctx.strokeStyle=on?'#7dff6a':GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(W*0.04,y,W*0.92,rh-6,10);ctx.fill();ctx.stroke();
  icon(it,sub,W*0.04+22,y+(rh-6)/2);btn(W*0.04,y,44,rh-6,()=>preview(it));ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?12:13)+'px system-ui';ctx.fillText(it[1],W*0.04+46,y+17,W*0.5);ctx.font='11px system-ui';ctx.fillStyle='#bcd';ctx.fillText((ow?'Owned':'🪙 '+it[2].toLocaleString())+(sub==='ks'?' · tap 🔊 to hear':' · tap icon to preview'),W*0.04+46,y+33,W*0.52);
  const bw=W*0.25;if(ow)bx(W*0.94-bw,y+(rh-6)/2-14,bw,28,on?'ON ✓':'EQUIP',()=>equip(it[0]),on,11);else bx(W*0.94-bw,y+(rh-6)/2-14,bw,28,'🪙 '+it[2].toLocaleString(),()=>buy(it),true,11)});
 if(pages>1){const py=H*0.86-30;bx(W*0.04,py,56,28,'◀',()=>pg=(pg+pages-1)%pages,false,13);bx(W*0.96-56,py,56,28,'▶',()=>pg=(pg+1)%pages,false,13);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Page '+(pg+1)+' / '+pages,W/2,py+18)}
 if(PV&&performance.now()-PV.t<6000)pvCard()};
function icon(it,k,cx,cy){const d=it[3];ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';
 if(k==='k'){ctx.fillStyle='#2a3a52';ctx.beginPath();ctx.arc(cx,cy,14,0,7);ctx.fill();ctx.font='900 16px system-ui';ctx.fillStyle=d[1]==='team'?tm().s:(d[1]||'#fff');ctx.fillText(d[0],cx,cy+1)}
 else if(k==='s'){let c=d[0]==='team'?tm().p:d[0];ctx.strokeStyle=c;ctx.lineCap='round';ctx.lineWidth=9;if(d[1]){ctx.shadowColor=c;ctx.shadowBlur=8}ctx.beginPath();ctx.moveTo(cx-12,cy+8);ctx.lineTo(cx+10,cy-8);ctx.stroke()}
 else if(k==='p'){ctx.font='22px system-ui';ctx.fillText(d[0],cx,cy+1)}
 else if(k==='n'){let bg=d[0]==='team'?tm().p:d[0];ctx.fillStyle=bg;ctx.strokeStyle=d[1];ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(cx-18,cy-8,36,16,4);ctx.fill();ctx.stroke();ctx.fillStyle=d[1];ctx.font='900 8px system-ui';ctx.fillText('#14',cx,cy+1)}
 else if(k==='cs'){ctx.fillStyle='#ffd23f';ctx.fillRect(cx-18,cy-10,36,16);ctx.fillStyle='#5a3a1a';ctx.fillRect(cx-1,cy+6,2,8);ctx.fillStyle='#111';ctx.font='900 7px system-ui';ctx.fillText((d[0]==='__name'?'GO ME!':d[0]).slice(0,9),cx,cy-2,34)}
 else if(k==='ks'){ctx.font='20px system-ui';ctx.fillText('🔊',cx,cy+1)}ctx.restore()}
function pvCard(){const it=PV.it,k=PV.k,w=Math.min(300,W*0.86),h=Math.min(300,H*0.5),x=W/2-w/2,y=H*0.22;ctx.save();ctx.fillStyle='rgba(3,12,8,0.97)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,h,14);ctx.fill();ctx.stroke();ctx.fillStyle=GOLD;ctx.font='900 14px system-ui';ctx.textAlign='center';ctx.fillText('PREVIEW · '+it[1],W/2,y+22,w-20);
 const st=Object.assign({},ST());st[k]=it[0];
 if(k==='k'||k==='s'){const im=S3.kimg&&S3.kimg();const kh=h-60;if(im&&!im._masc&&window.FGF_KPREV){FGF_KPREV(W/2,y+34,kh,eq);const kw=kh*203/300;overlays(0,W/2-kw/2,y+34,kw,kh,st)}else{ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.fillText('Shows on human kickers (not mascots)',W/2,y+h/2)}}
 else if(k==='n'){plate(it[0],W/2,y+h*0.42);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Shows bottom-left during play',W/2,y+h-16)}
 else if(k==='p'){ctx.font='54px system-ui';ctx.fillText(it[3][0],W/2,y+h*0.5);ctx.font='900 20px system-ui';ctx.fillStyle=GOLD;ctx.fillText(it[3][1],W/2,y+h*0.5+34);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('Pops over your kicker after every make',W/2,y+h-16)}
 else if(k==='cs'){let t=it[3][0]==='__name'?'GO '+nm()+'!':it[3][0];ctx.font='900 18px system-ui';const tw=ctx.measureText(t).width+20;ctx.fillStyle='#ffd23f';ctx.fillRect(W/2-tw/2,y+h*0.4,tw,30);ctx.fillStyle='#5a3a1a';ctx.fillRect(W/2-2,y+h*0.4+30,4,30);ctx.fillStyle='#111';ctx.fillText(t,W/2,y+h*0.4+22);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('Fans hold it up in the stands during play',W/2,y+h-16)}
 ctx.restore();btn(0,0,W,H,()=>PV=null)}
window.FGF_STYLETEST={buy,equip,preview,KS,ST};
})();
