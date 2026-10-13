// ===== Stage 7: board turfs, Custom Field (IndexedDB, on-device only), custom uprights, scroll momentum =====
'use strict';
// ---- board turfs (deterministic world-space squares: even from the kicker to the end zone) ----
TURF.push(['checkers','Checkers Board',1500,{g0:'#111',g1:'#111',st:0,board:['#c62828','#151515'],ol:1,ln:'rgba(255,255,255,0.95)',ga:0.08}],
 ['chess','Chess Board',2000,{g0:'#3b2414',g1:'#3b2414',st:0,board:['#efe2c4','#4a2c17'],grain:1,ol:1,ln:'rgba(255,255,255,0.95)',ga:0.06}],
 ['custom','Custom Field',0,null,'$4.99']);
const SQ=1.33;// square edge in field units (40 across the field)
function boardBands(TS){const z0=-7.6,z1=dist+0.2;ctx.save();for(let zi=Math.floor(z0/SQ);zi*SQ<z1;zi++){const za=Math.max(z0,zi*SQ),zb=Math.min(z1,zi*SQ+SQ);const A=P(0,0,zb),B=P(0,0,za);if(!A||!B)continue;const e0=P(-1,0,za),e1=P(1,0,za),cn=e0&&e1?Math.min(30,Math.ceil(W/Math.max(1,(e1.x-e0.x))/SQ)+1):10;
  for(let c=-cn;c<cn;c++){const x0=c*SQ,x1=x0+SQ,p1=P(x0,0,zb),p2=P(x1,0,zb),p3=P(x1,0,za),p4=P(x0,0,za);if(!p1||!p2||!p3||!p4)continue;const dark=((zi+c)&1)!==0;ctx.fillStyle=TS.board[dark?1:0];ctx.beginPath();ctx.moveTo(p1.x,A.y);ctx.lineTo(p2.x,A.y);ctx.lineTo(p3.x,B.y);ctx.lineTo(p4.x,B.y);ctx.closePath();ctx.fill();
   if(TS.grain){ctx.strokeStyle=dark?'rgba(0,0,0,0.18)':'rgba(120,80,40,0.16)';ctx.lineWidth=1;for(let k=1;k<4;k++){const u=k/4+((zi*7+c*3)%5)*0.012,xa=p4.x+(p3.x-p4.x)*u,xb=p1.x+(p2.x-p1.x)*u;ctx.beginPath();ctx.moveTo(xb,A.y);ctx.quadraticCurveTo((xa+xb)/2+(k%2?2:-2),(A.y+B.y)/2,xa,B.y);ctx.stroke()}}}}ctx.restore()}
// ---- custom field image: stored in IndexedDB on this device only, never uploaded ----
let CFI=null,CFC=null,CF=Object.assign({x:0.5,y:0.5,z:1,nl:0,nh:0},J('fgfCF',{}));
function idb(){return new Promise((res,rej)=>{const r=indexedDB.open('fgf',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function idbPut(k,v){const d=await idb();return new Promise(r=>{const t=d.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=()=>r(true);t.onerror=()=>r(false)})}
async function idbGet(k){const d=await idb();return new Promise(r=>{const q=d.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)})}
let CFA=0.85;// preview crop aspect = on-screen field area (width : height), so the editor matches the game
function fieldTop(z){const t=P(0,0,z);return t?t.y+OFF:H*0.45}
function cfAsp(){return Math.max(0.4,Math.min(2.2,W/Math.max(80,H-fieldTop(35.2))))}
function buildCFC(){if(!CFI)return;CFA=cfAsp();const w=1024,h=Math.round(w/CFA),c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';const iw=CFI.width,ih=CFI.height,base=Math.max(w/iw,h/ih)*CF.z,dw=iw*base,dh=ih*base;x.fillStyle='#1f6a26';x.fillRect(0,0,w,h);
 // cover-fit, clamp the offset so the photo always fills the frame (never stretched, aspect kept)
 const ox=Math.min(0,Math.max(w-dw,w/2-dw*CF.x)),oy=Math.min(0,Math.max(h-dh,h/2-dh*CF.y));x.drawImage(CFI,ox,oy,dw,dh);CFC=c}
function loadCF(){idbGet('cf').then(b=>{if(!b)return;decodeImg(b).then(im=>{CFI=im;buildCFC()}).catch(()=>{})}).catch(()=>{})}
// decode any photo: EXIF orientation honored (createImageBitmap 'from-image', <img> fallback, which modern browsers also auto-rotate)
function decodeImg(blob){if(window.createImageBitmap){return createImageBitmap(blob,{imageOrientation:'from-image'}).catch(()=>imgDecode(blob))}return imgDecode(blob)}
function toastNow(t){toastQ.length=0;toastT=0;toast(t)}
function imgDecode(blob){return new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=URL.createObjectURL(blob)})}
loadCF();
function pickImage(){const f=document.createElement('input');f.type='file';f.accept='image/*,.heic,.heif,.webp';f.onchange=()=>{const file=f.files&&f.files[0];if(!file)return;toast('🖼️ Loading photo…');
 decodeImg(file).then(im=>{const iw=im.width,ih=im.height;if(!iw||!ih)throw 0;const MAX=2048,k=Math.min(1,MAX/Math.max(iw,ih)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(iw*k));c.height=Math.max(1,Math.round(ih*k));const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.fillStyle='#1f6a26';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);if(im.close)try{im.close()}catch(e){}
  c.toBlob(bl=>{if(!bl){toastNow('Could not process that photo');return}idbPut('cf',bl).then(ok=>{if(!ok){toastNow('Could not save image');return}decodeImg(bl).then(i2=>{CFI=i2;CF.x=0.5;CF.y=0.5;CF.z=1;buildCFC();toastNow('🖼️ Photo loaded · drag & zoom to position')})})},'image/jpeg',0.88)})
 .catch(()=>{const heic=/hei[cf]$/i.test(file.name)||/hei[cf]/i.test(file.type);toastNow(heic?'HEIC not supported · save as JPG/PNG':'File type not supported · use JPG/PNG')})};f.click()}
// flat, faithful draw: cover-fit into the field area only (clipped, so nothing bleeds into the stadium)
function customBands(){if(!CFC)return;const y0=Math.max(0,fieldTop(dist+0.2)),fh=H-y0;if(fh<4)return;const sa=W/fh,ca=CFC.width/CFC.height;let sw=CFC.width,sh=CFC.height,sx=0,sy=0;if(ca>sa){sw=sh*sa;sx=(CFC.width-sw)/2}else{sh=sw/sa;sy=CFC.height-sh}
 ctx.save();ctx.beginPath();ctx.rect(0,y0,W,fh);ctx.clip();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(CFC,sx,sy,sw,sh,0,y0,W,fh);ctx.restore()}
const oTurf=S5.turf;S5.turf=function(){const ti=stadT();if(!S5.isHome(ti))return oTurf();if(TFE==='custom'){if(!CFC||!tfOwn('custom'))return TURF[0][3];return{g0:'#1f6a26',g1:'#1a5d22',st:0,custom:1,ol:1,ln:'rgba(255,255,255,0.95)',ga:0.1,nl:CF.nl,nh:CF.nh}}return oTurf()};
const oBands=S5.bands;S5.bands=function(TS){if(TS.board)return boardBands(TS);if(TS.custom)return customBands();return oBands(TS)};
function turfSwatch(t,x,y,w,h){ctx.save();ctx.beginPath();ctx.roundRect(x,y,w,h,4);ctx.clip();const c=t[3];
 if(t[0]==='custom'){if(CFC)ctx.drawImage(CFC,x,y,w,h);else{ctx.fillStyle='#234';ctx.fillRect(x,y,w,h);ctx.fillStyle='#fff';ctx.font='16px system-ui';ctx.textAlign='center';ctx.fillText('📷',x+w/2,y+h/2+6)}}
 else if(c&&c.board){const n=4,s=w/n;for(let i=0;i<n;i++)for(let j=0;j<Math.ceil(h/s);j++){ctx.fillStyle=c.board[(i+j)&1];ctx.fillRect(x+i*s,y+j*s,s,s)}}
 else{const cc=c||{g0:mix('#2c7a30',TEAMS[myT()].p,0.55),g1:TEAMS[myT()].p},g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,cc.g0);g.addColorStop(1,cc.g1);ctx.fillStyle=g;ctx.fillRect(x,y,w,h);if(c&&c.ck){ctx.fillStyle='rgba(255,255,255,0.15)';for(let i=0;i<4;i++)for(let j=0;j<4;j++)if((i+j)&1)ctx.fillRect(x+i*w/4,y+j*h/4,w/4,h/4)}else if(c&&c.st>0.1){ctx.fillStyle='rgba(255,255,255,0.18)';for(let j=0;j<4;j+=2)ctx.fillRect(x,y+j*h/4,w,h/4)}}
 ctx.strokeStyle='rgba(255,255,255,0.9)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y+h/2);ctx.lineTo(x+w,y+h/2);ctx.stroke();ctx.restore()}
// Custom Field editor
const CFE={drag2:1,y:0,max:0,mv(dx,dy){if(!CFI)return;const f=CFE.f;CF.x=Math.max(0,Math.min(1,CFE.sx-dx/(f.w*CF.z)));CF.y=Math.max(0,Math.min(1,CFE.sy-dy/(f.h*CF.z)));buildCFC()},start(){CFE.sx=CF.x;CFE.sy=CF.y}};window.CFE=CFE;
function drawCF(){txt('CUSTOM FIELD',W/2,H*0.06,Math.min(28,W*0.075),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Stays on this device only · never uploaded',W/2,H*0.06+20);
 const fw=Math.min(W*0.74,(H*0.42)*CFA),fh=fw/CFA,fx=W/2-fw/2,fy=H*0.1;CFE.f={x:fx,y:fy,w:fw,h:fh};panel(fx-6,fy-6,fw+12,fh+12);
 if(CFC){ctx.drawImage(CFC,fx,fy,fw,fh);if(!CF.nl){ctx.strokeStyle='rgba(255,255,255,0.9)';ctx.shadowColor='#000';ctx.shadowBlur=3;ctx.lineWidth=1.5;for(let i=1;i<12;i++){ctx.beginPath();ctx.moveTo(fx,fy+fh*i/12);ctx.lineTo(fx+fw,fy+fh*i/12);ctx.stroke()}ctx.shadowBlur=0}ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(fx,fy+fh-18,fw,18);ctx.fillStyle='#fff';ctx.font='10px system-ui';ctx.fillText('kicker ↓   ·   drag to move   ·   end zone ↑',W/2,fy+fh-6)}
 else{ctx.fillStyle='#bcd';ctx.font='14px system-ui';ctx.fillText('Choose a photo from your device',W/2,fy+fh/2)}
 let y=fy+fh+14;const bw=(W*0.9-8)/2;bx(W*0.05,y,bw,38,'📁 CHOOSE IMAGE',pickImage,!CFC,12);bx(W*0.05+bw+8,y,(bw-8)/2,38,'➖',()=>{CF.z=Math.max(1,CF.z/1.15);buildCFC()},false,14);bx(W*0.05+bw+8+(bw-8)/2+8,y,(bw-8)/2,38,'➕',()=>{CF.z=Math.min(5,CF.z*1.15);buildCFC()},false,14);y+=46;
 bx(W*0.05,y,bw,36,'YARD LINES: '+(CF.nl?'OFF':'ON'),()=>{CF.nl^=1},!CF.nl,11);bx(W*0.05+bw+8,y,bw,36,'HASH MARKS: '+(CF.nh?'OFF':'ON'),()=>{CF.nh^=1},!CF.nh,11);y+=46;
 ctx.fillStyle='#ffd27a';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('⚠ Only use images you have rights to.',W/2,y+8);
 bx(W*0.05,H*0.93-20,bw,40,CFC?'✔ SAVE & USE':'✔ SAVE',()=>{SV('fgfCF',CF);if(CFC){TFE='custom';LS.fgfTurf='custom';toast('🏟️ Custom Field on for home games')}state='stad'},true,13);bx(W*0.05+bw+8,H*0.93-20,bw,40,'◀ BACK',()=>{state='stad'},false,13)}
// ---- uprights (cosmetic only; physics uses the same HALF/BAR/POST constants for every style) ----
const UPR=[['classic','Classic Yellow',0],['chrome','Chrome',400],['team','Team Color',500],['candy','Candy Cane',700],['neon','Neon Glow',1000],['gold','Gold Legend',1500],['wood','Wooden Retro',600],['ice','Ice Crystal',800],['lava','Lava',1200],['bolt','Lightning',1500]];
let UPO=J('fgfUpO',['classic']),UPE=LS.fgfUp||'classic';const upOwn=id=>TESTER||UPO.includes(id);
function postPath(x,b,c,l,r,lt,rt){x.beginPath();x.moveTo(b.x,b.y);x.lineTo(c.x,c.y);x.stroke();x.beginPath();x.moveTo(lt.x,lt.y);x.lineTo(l.x,l.y);x.lineTo(r.x,r.y);x.lineTo(rt.x,rt.y);x.stroke()}
function drawUprights(x,id,b,c,l,r,lt,rt,w){const P2=(st,lw,extra)=>{x.strokeStyle=st;x.lineWidth=lw;if(extra)extra();postPath(x,b,c,l,r,lt,rt)};x.save();x.lineCap='round';x.lineJoin='round';
 P2('rgba(0,0,0,0.55)',w+2.5);// readable outline on every backdrop
 const night=ST.sky===2;const grad=(a,bb)=>{const g=x.createLinearGradient(l.x,l.y,r.x,r.y);g.addColorStop(0,a);g.addColorStop(0.5,bb);g.addColorStop(1,a);return g};
 if(id==='chrome')P2(grad('#9aa3ad','#ffffff'),w);
 else if(id==='team'){P2(TEAMS[myT()].p,w);P2(TEAMS[myT()].s,Math.max(1,w*0.35))}
 else if(id==='candy'){P2('#ffffff',w);x.setLineDash([w*1.8,w*1.8]);P2('#e01e37',w);x.setLineDash([])}
 else if(id==='neon'){x.shadowColor='#39ff14';x.shadowBlur=night?22:12;P2('#39ff14',w);x.shadowBlur=0;P2('#d9ffd0',Math.max(1,w*0.35))}
 else if(id==='gold'){x.shadowColor='#ffd75a';x.shadowBlur=8;P2(grad('#b8860b','#fff1a8'),w);x.shadowBlur=0;const g=(T*0.6)%1,px=l.x+(r.x-l.x)*g,py=l.y+(r.y-l.y)*g;x.fillStyle='rgba(255,255,255,0.9)';x.beginPath();x.arc(px,py,w*0.7,0,7);x.fill()}
 else if(id==='wood'){P2('#8b5a2b',w);x.setLineDash([w*3,w*1.2]);P2('#5e3a1a',Math.max(1,w*0.3));x.setLineDash([])}
 else if(id==='ice'){x.shadowColor='#9be7ff';x.shadowBlur=10;P2('#bfefff',w);x.shadowBlur=0;P2('#ffffff',Math.max(1,w*0.3))}
 else if(id==='lava'){x.shadowColor='#ff5a00';x.shadowBlur=14;P2('#ff3d00',w);x.shadowBlur=0;x.setLineDash([w*1.5,w*2]);x.lineDashOffset=-T*30;P2('#ffc400',Math.max(1,w*0.5));x.setLineDash([])}
 else if(id==='bolt'){x.shadowColor='#7fd3ff';x.shadowBlur=12;P2('#ffe94d',w);x.shadowBlur=0;if(((T*6)|0)%3!==0){x.strokeStyle='#e8f6ff';x.lineWidth=1.5;x.shadowColor='#7fd3ff';x.shadowBlur=8;x.beginPath();const n=7;for(let i=0;i<=n;i++){const u=i/n,px=l.x+(r.x-l.x)*u,py=l.y+(r.y-l.y)*u+(i%n?(Math.sin(T*40+i*3)*w*1.5):0);i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke()}}
 else P2('#ffd21f',w);x.restore()}
S5.posts=function(b,c,l,r,lt,rt,w){const id=S5.isHome(stadT())&&upOwn(UPE)?UPE:'classic';if(id==='classic')return false;drawUprights(ctx,id,b,c,l,r,lt,rt,w);return true};
function drawUP(y0){const rh=Math.min(50,(H*0.82-y0)/UPR.length);UPR.forEach((u,i)=>{const y=y0+i*rh,o=upOwn(u[0]),e=UPE===u[0];panel(W*0.05,y,W*0.9,rh-4);
  // mini preview
  const px=W*0.07,pw=40,ph=rh-14,py=y+5;ctx.save();ctx.fillStyle='#16304a';ctx.beginPath();ctx.roundRect(px,py,pw,ph,4);ctx.fill();const m=v=>v,bb={x:px+pw/2,y:py+ph-2},cc={x:px+pw/2,y:py+ph*0.55},ll={x:px+7,y:py+ph*0.55},rr={x:px+pw-7,y:py+ph*0.55},lt={x:px+7,y:py+3},rt={x:px+pw-7,y:py+3};ctx.lineCap='round';if(u[0]==='classic'){ctx.strokeStyle='rgba(0,0,0,0.55)';ctx.lineWidth=5;postPath(ctx,bb,cc,ll,rr,lt,rt);ctx.strokeStyle='#ffd21f';ctx.lineWidth=3;postPath(ctx,bb,cc,ll,rr,lt,rt)}else drawUprights(ctx,u[0],bb,cc,ll,rr,lt,rt,3);ctx.restore();
  ctx.fillStyle='#fff';ctx.font='900 13px system-ui';ctx.textAlign='left';ctx.fillText((e?'✔ ':'')+u[1],W*0.07+50,y+rh/2+2);ctx.textAlign='right';ctx.fillStyle=o?'#7fd38a':GOLD;ctx.font='900 12px system-ui';ctx.fillText(e?'EQUIPPED':o?'TAP TO USE':'🪙 '+u[2],W*0.93,y+rh/2+2);
  btn(W*0.05,y,W*0.9,rh-4,()=>{if(o){UPE=u[0];LS.fgfUp=UPE}else buy5('up_'+u[0],u[2],()=>{UPO.push(u[0]);SV('fgfUpO',UPO);UPE=u[0];LS.fgfUp=UPE})})});
 ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Cosmetic only · same size & hitbox · home games',W/2,y0+UPR.length*rh+12)}
PACKS.push({id:'custom_field',price:'$4.99',coins:0,name:'Custom Field',desc:'Your own photo as the field (stays on your device)',tag:'NEW'});
// ---- screens + scroll momentum + bottom fade on long lists ----
const oS7=S3.screen;S3.screen=function(){if(state==='cfield'){BTN=[];drawCF();return true}const r=oS7();if(state==='howto'||state==='mk'){const o=state==='mk'?MKS:HT,bot=state==='mk'?MKS.bot:H*0.88;if(o.max>0&&o.y<o.max-2){const g=ctx.createLinearGradient(0,bot-40,0,bot);g.addColorStop(0,'rgba(5,10,24,0)');g.addColorStop(1,'rgba(5,10,24,0.85)');ctx.fillStyle=g;ctx.fillRect(0,bot-40,W,40);ctx.fillStyle=GOLD;ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('▼ scroll for more',W/2,bot-6)}}return r};
const MOM={v:0,o:null,lt:0,ly:0};
addEventListener('pointermove',e=>{const now=performance.now();if(MOM.ly&&now-MOM.lt<80){MOM.v=MOM.v*0.6+(-(e.clientY-MOM.ly)/Math.max(8,now-MOM.lt)*16)*0.4}MOM.ly=e.clientY;MOM.lt=now},true);
addEventListener('pointerdown',()=>{MOM.v=0;MOM.ly=0},true);
addEventListener('pointerup',()=>{MOM.o=state==='mk'?MKS:state==='howto'?HT:state==='shop'&&window.PKS&&PKS.max>0?PKS:null;if(performance.now()-MOM.lt>90)MOM.v=0;MOM.ly=0},true);
(function mom(){if(MOM.o&&Math.abs(MOM.v)>0.3&&(state==='mk'||state==='howto'||state==='shop')){const o=MOM.o;o.y=Math.max(0,Math.min(o.max||0,o.y+MOM.v));MOM.v*=0.94}else MOM.v=0;requestAnimationFrame(mom)})();
