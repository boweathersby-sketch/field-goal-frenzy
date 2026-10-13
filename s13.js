// ===== Stage 13: CREATE A MASCOT (coins): base animal from the painted mascots, colour shift, accessories, name + number =====
// usable on your sideline and as your mascot kicker (painted head on the Hawks kicker body, original kick) + My Kicker preview
const CMN=['THUNDER','GATOR','ROBOT','WOLF','SCORPION','BULLDOG','RAM','HAWK','BEAR','LION','TIGER','SHARK','EAGLE','PANTHER','BULL','HORSE','FOX','GORILLA','DRAGON','BUFFALO'],CMHUE=[0,30,60,95,130,165,200,235,270,305,335],
 CMHAT=[['none','No hat',0],['cap','Team cap',500],['beanie','Beanie',500],['cowboy','Cowboy hat',1200],['top','Top hat',1500],['crown','Gold crown',2500]],
 CMGL=[['none','No glasses',0],['shades','Shades',500],['nerd','Big specs',500],['star','Star glasses',1500]],
 CMCH=[['none','No chain',0],['gold','Gold chain',2000],['medal','Champ medal',1500]],CMPRICE=5000;
const CM=Object.assign({own:0,base:7,hue:0,hat:'none',gl:'none',ch:'none',name:'MASCOT',num:1,side:0,kick:0},J('fgfCM',{}));window.CM=CM;
// one-time: clear earlier test customization so the editor starts from the plain template (owned items are kept)
if(LS.fgfCMv!=='2'){Object.assign(CM,{hue:0,hat:'none',gl:'none',ch:'none'});SV('fgfCM',CM);LS.fgfCMv='2'}let CMO=J('fgfCMO',['none']);const T0J=TEAMS.map(q=>({p:q.p,s:q.s}));const cmSlot=b=>b<8?b:7;window.cmSlot=cmSlot;
// kicker-head geometry for the new bases: [head ellipse cx,cy,rx,ry], [face cx,cy,rx,ry], fur light/dark
const CMJ={8:['#1d2f6e','#ffffff'],9:['#5b2a9e','#f2c230'],10:['#1a1a1a','#e8822a'],11:['#1f5fd1','#ffffff'],12:['#0f5a34','#ffffff'],13:['#c0242a','#1a1a1a'],14:['#e8e8ea','#c0322a'],15:['#ececec','#1d2f6e'],16:['#0f6b3a','#ffffff'],17:['#1c1c22','#7a3fc4'],18:['#ececec','#2e8a3a'],19:['#6e1a2b','#e8c890']};
function cmHueHex(h,deg){if(!deg)return h;const [r,g,b]=rgb(h),c=Math.cos(deg*Math.PI/180),s=Math.sin(deg*Math.PI/180),m=[0.213+c*0.787-s*0.213,0.715-c*0.715-s*0.715,0.072-c*0.072+s*0.928,0.213-c*0.213+s*0.143,0.715+c*0.285+s*0.140,0.072-c*0.072-s*0.283,0.213-c*0.213-s*0.787,0.715-c*0.715+s*0.715,0.072+c*0.928+s*0.072],f=v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0');return '#'+f(r*m[0]+g*m[1]+b*m[2])+f(r*m[3]+g*m[4]+b*m[5])+f(r*m[6]+g*m[7]+b*m[8])}
const CMX={8:[[96,32,26,28],[96,34,22,22],['#8a5a32','#4e301a']],9:[[95,40,34,34],[95,42,22,24],['#d9a23a','#8a5a14']],10:[[92,30,26,27],[92,32,22,22],['#e8822a','#8a4410']],11:[[83,32,26,28],[83,34,22,22],['#4f7fb8','#24426a']],12:[[96,28,22,24],[94,30,18,20],['#f2f2f0','#a8a8a4']],13:[[81,30,24,26],[81,32,20,22],['#2a2a30','#101014']],14:[[90,44,28,26],[90,44,22,22],['#c0322a','#6e1410']],15:[[89,42,24,34],[89,44,20,26],['#b06a30','#6a3a14']],16:[[84,32,24,28],[84,34,20,22],['#e8742a','#8a3a10']],17:[[83,34,26,26],[83,36,22,22],['#2c2c30','#121214']],18:[[87,44,28,30],[86,46,16,18],['#3e8a3a','#1e4a1a']],19:[[81,42,30,26],[81,42,24,22],['#6a4226','#3a2010']]};
const CMA=[[93,50,46,90,72,13,96,104,40,0],[66,24,48,70,40,13,86,104,48,-0.12],[89,30,58,89,52,15,82,96,42,0],[71,22,44,71,41,12,71,96,44,0],[115,40,40,121,70,11,92,92,38,0.2],[78,6,56,80,30,14,80,80,52,0],[85,20,40,86,44,11,85,88,46,0],[76,4,46,72,34,9,66,76,40,-0.05],[96,6,52,96,28,10,96,60,46,0],[95,10,56,95,38,11,95,72,46,0],[92,6,50,92,28,10,92,57,46,0],[83,8,44,80,30,9,85,60,46,0],[96,6,40,92,24,8,96,56,46,0],[81,4,46,81,28,10,81,56,48,0],[90,20,40,90,33,10,90,71,46,0],[89,9,38,89,32,9,92,77,44,-0.05],[84,6,40,84,27,9,86,62,44,0],[83,8,48,83,31,10,83,60,50,0],[87,26,38,86,37,8,88,77,40,0],[81,20,46,81,35,10,81,66,48,0]];window.CMA=CMA;
const cmOwn=id=>window.TESTER||CMO.includes(id),cmSave=()=>{SV('fgfCM',CM);CMC=null;for(const k in CMK)delete CMK[k];if(window.PSC)for(const k in PSC)delete PSC[k];try{for(const k in PSC)delete PSC[k]}catch(e){}KC5.my=null};
let CMC=null;const CMK={};
let CMB=0;function cmCell(){if(CMC)return CMC;if(CMB)return null;CMB=1;try{return cmCell0()}finally{CMB=0}}
function cmCell0(){if(!MSI.complete||!MSI.naturalWidth)return null;const c=document.createElement('canvas');c.width=193;c.height=200;const x=c.getContext('2d'),B=CM.base;x.drawImage(MSI,B*193,0,193,200,0,0,193,200);
 if(CM.hue){const d=x.getImageData(0,0,193,200),a=d.data,cs=Math.cos(CM.hue*Math.PI/180),sn=Math.sin(CM.hue*Math.PI/180);
  // hue rotation matrix (keeps light/dark detail of the painted art)
  const m=[0.213+cs*0.787-sn*0.213,0.715-cs*0.715-sn*0.715,0.072-cs*0.072+sn*0.928,0.213-cs*0.213+sn*0.143,0.715+cs*0.285+sn*0.140,0.072-cs*0.072-sn*0.283,0.213-cs*0.213-sn*0.787,0.715-cs*0.715+sn*0.715,0.072+cs*0.928+sn*0.072];
  for(let i=0;i<a.length;i+=4){if(a[i+3]<4)continue;const r=a[i],g=a[i+1],b=a[i+2];a[i]=r*m[0]+g*m[1]+b*m[2];a[i+1]=r*m[3]+g*m[4]+b*m[5];a[i+2]=r*m[6]+g*m[7]+b*m[8]}x.putImageData(d,0,0)}
 const A=CMA[B],T=TEAMS[myT()],mx=A[0],top=A[1],mrx=A[2]/2,ex=A[3],ey=A[4],erx=A[5]*2,nkx=A[6],nky=A[7],nkw=A[8],tl=A[9]||0;x.lineJoin='round';
 const H=CM.hat;if(cmOwn(H)&&H!=='none'){x.save();x.translate(mx,top);x.rotate(tl);x.translate(-mx,-top);x.strokeStyle='#111';x.lineWidth=2;
  if(H==='cap'){x.fillStyle=T.p;x.beginPath();x.ellipse(mx,top+12,mrx*0.75,14,0,Math.PI,0);x.fill();x.stroke();x.fillStyle=T.s;x.beginPath();x.ellipse(mx+mrx*0.55,top+12,mrx*0.45,5,0,0,7);x.fill();x.stroke()}
  else if(H==='beanie'){x.fillStyle=T.p;x.beginPath();x.ellipse(mx,top+12,mrx*0.72,17,0,Math.PI,0);x.fill();x.stroke();x.fillStyle=T.s;x.fillRect(mx-mrx*0.74,top+9,mrx*1.48,7);x.strokeRect(mx-mrx*0.74,top+9,mrx*1.48,7);x.beginPath();x.arc(mx,top-7,6,0,7);x.fill();x.stroke()}
  else if(H==='cowboy'){x.fillStyle='#8a5a2b';x.beginPath();x.ellipse(mx,top+10,mrx*1.05,7,0,0,7);x.fill();x.stroke();x.beginPath();x.moveTo(mx-mrx*0.5,top+8);x.quadraticCurveTo(mx-mrx*0.5,top-18,mx,top-14);x.quadraticCurveTo(mx+mrx*0.5,top-18,mx+mrx*0.5,top+8);x.closePath();x.fill();x.stroke();x.fillStyle=T.s;x.fillRect(mx-mrx*0.5,top+1,mrx,5)}
  else if(H==='top'){x.fillStyle='#151515';x.beginPath();x.ellipse(mx,top+10,mrx*0.85,6,0,0,7);x.fill();x.stroke();x.fillRect(mx-mrx*0.45,top-24,mrx*0.9,34);x.strokeRect(mx-mrx*0.45,top-24,mrx*0.9,34);x.fillStyle=T.p;x.fillRect(mx-mrx*0.45,top+1,mrx*0.9,6)}
  else if(H==='crown'){const g=x.createLinearGradient(0,top-20,0,top+10);g.addColorStop(0,'#fff3a0');g.addColorStop(1,'#c99a06');x.fillStyle=g;x.beginPath();const w=mrx*0.7;x.moveTo(mx-w,top+10);x.lineTo(mx-w,top-10);x.lineTo(mx-w*0.5,top);x.lineTo(mx,top-18);x.lineTo(mx+w*0.5,top);x.lineTo(mx+w,top-10);x.lineTo(mx+w,top+10);x.closePath();x.fill();x.stroke();x.fillStyle='#e0303a';x.beginPath();x.arc(mx,top+3,3.5,0,7);x.fill()}
  x.restore()}
 const G=CM.gl;if(cmOwn(G)&&G!=='none'){x.save();x.strokeStyle='#111';x.lineWidth=2;x.translate(ex,ey);x.rotate(tl);x.translate(-ex,-ey);const dx=erx*0.5,r=Math.max(5,dx*0.62);
  if(G==='shades'){x.fillStyle='rgba(10,10,14,0.92)';[-1,1].forEach(k=>{x.beginPath();x.ellipse(ex+k*dx,ey,r*1.1,r*0.75,0,0,7);x.fill();x.stroke()});x.beginPath();x.moveTo(ex-dx+r,ey);x.lineTo(ex+dx-r,ey);x.stroke()}
  else if(G==='nerd'){x.fillStyle='rgba(200,230,255,0.25)';[-1,1].forEach(k=>{x.beginPath();x.arc(ex+k*dx,ey,r,0,7);x.fill();x.lineWidth=3;x.stroke()})}
  else{x.fillStyle='#ffcf1a';[-1,1].forEach(k=>{x.beginPath();for(let i=0;i<10;i++){const a=Math.PI/5*i-Math.PI/2,rr=i%2?r*0.55:r*1.2;x.lineTo(ex+k*dx+Math.cos(a)*rr,ey+Math.sin(a)*rr)}x.closePath();x.fill();x.stroke()})}
  x.restore()}
 const C=CM.ch;if(cmOwn(C)&&C!=='none'){x.save();const ny=nky,cx=nkx,cr=nkw/2;x.strokeStyle='#e5b416';x.lineWidth=4;x.beginPath();x.ellipse(cx,ny-cr*0.3,cr,cr*0.6,0,0.25,Math.PI-0.25);x.stroke();x.strokeStyle='#8a6a00';x.lineWidth=1;x.setLineDash([3,3]);x.stroke();x.setLineDash([]);
  if(C==='medal'){x.fillStyle='#ffd23f';x.strokeStyle='#8a6a00';x.lineWidth=2;x.beginPath();x.arc(cx,ny+cr*0.3,8,0,7);x.fill();x.stroke();x.fillStyle='#8a6a00';x.font='900 9px system-ui';x.textAlign='center';x.fillText('1',cx,ny+cr*0.3+3)}
  else{x.fillStyle='#ffd23f';x.font='900 11px system-ui';x.textAlign='center';x.fillText('$',cx,ny+cr*0.3+4)}x.restore()}
 if(H==='witch'&&cmOwn(H)){const k=0.78,ox=193*(1-k)/2,oy=200*(1-k),c2=document.createElement('canvas');c2.width=193;c2.height=200;const y=c2.getContext('2d');y.imageSmoothingQuality='high';y.drawImage(c,ox,oy,193*k,200*k);
  const hx=ox+mx*k,hy=oy+top*k+4,r=Math.max(26,mrx*k*1.15),tip=Math.max(3,hy-58);y.save();y.translate(hx,hy);y.rotate(tl);y.translate(-hx,-hy);y.lineJoin='round';y.strokeStyle='#111';y.lineWidth=2;
  y.fillStyle='#2a1238';y.beginPath();y.ellipse(hx,hy,r*1.25,r*0.28,0,0,6.29);y.fill();y.stroke();
  y.beginPath();y.moveTo(hx-r*0.62,hy-2);y.quadraticCurveTo(hx-r*0.3,hy-(hy-tip)*0.6,hx+r*0.15,tip+6);y.quadraticCurveTo(hx+r*0.55,tip,hx+r*0.95,tip+12);y.quadraticCurveTo(hx+r*0.45,tip+14,hx+r*0.35,tip+22);y.quadraticCurveTo(hx+r*0.5,hy-(hy-tip)*0.4,hx+r*0.62,hy-2);y.closePath();y.fill();y.stroke();
  y.fillStyle='#ff8a1c';y.beginPath();y.moveTo(hx-r*0.6,hy-4);y.lineTo(hx+r*0.6,hy-4);y.lineTo(hx+r*0.52,hy-12);y.lineTo(hx-r*0.5,hy-12);y.closePath();y.fill();y.stroke();
  y.fillStyle='#ffd23f';y.fillRect(hx-5,hy-12,10,8);y.strokeRect(hx-5,hy-12,10,8);y.restore();return CMC=c2}
 return CMC=c}
window.cmCell=cmCell;
// MSI proxy: while building/drawing the custom mascot, reads from the base animal's cell come from the custom cell instead
let CMP=0;{const P=CanvasRenderingContext2D.prototype,od=P.drawImage;P.drawImage=function(im,...a){if(im===MSI&&a.length===8){const B=cmSlot(CM.base),sx=a[0];
 const side=CM.own&&CM.side&&(state==='play'||state==='replay')&&sx===myT()*193&&a[2]===193;if(!CMB&&(CMP&&sx>=B*193&&sx<B*193+193)||!CMB&&side){const c=cmCell();if(c)return od.call(this,c,side?0:sx-B*193,a[1],a[2],a[3],a[4],a[5],a[6],a[7])}}return od.call(this,im,...a)}}
const cmUse=()=>CM.own&&CM.kick&&MK.masc===cmSlot(CM.base);window.cmUse=cmUse;
function cmWrap(fn,key){return function(...a){if(!(cmUse()&&a[0]===cmSlot(CM.base)))return fn(...a);const k=key+JSON.stringify(CM)+'|'+a.join(',')+'|'+(MK.name||'');if(CMK[k])return CMK[k];
 const sv=Object.assign({},KC5);for(const q in KC5)delete KC5[q];const X=CMX[CM.base],sv7=X&&[MHM[7],MHE[7],MFUR[7],MTL[7]],SL=cmSlot(CM.base),TJ=CMJ[CM.base]||[T0J[SL].p,T0J[SL].s],svT=[TEAMS[SL].p,TEAMS[SL].s];TEAMS[SL].p=cmHueHex(TJ[0],CM.hue);TEAMS[SL].s=cmHueHex(TJ[1],CM.hue);if(X){MHM[7]=X[0];MHE[7]=X[1];MFUR[7]=X[2];MTL[7]=null;delete MAH[7]}CMP=1;let s;try{s=fn(...a)}finally{CMP=0;if(X){[MHM[7],MHE[7],MFUR[7],MTL[7]]=sv7;delete MAH[7]}TEAMS[SL].p=svT[0];TEAMS[SL].s=svT[1];for(const q in KC5)delete KC5[q];Object.assign(KC5,sv)}return CMK[k]=s}}
mascSheet=cmWrap(mascSheet,'ms');frontMasc=cmWrap(frontMasc,'fm');
// ---- editor ----
function drawCM(){BTN=[];txt('CREATE A MASCOT',W/2,H*0.06,Math.min(26,W*0.068),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';
 ctx.fillText(CM.own?'Your mascot · sideline + mascot kicker':'Unlock for 🪙 '+CMPRICE.toLocaleString()+' · accessories extra',W/2,H*0.06+20);
 const py=H*0.095,ph=Math.min(H*0.21,180);panel(W*0.05,py,W*0.9,ph);const c=cmCell();if(c){const h=ph*0.92,w=h*193/200;ctx.drawImage(c,0,0,193,200,W*0.27-w/2,py+ph*0.04,w,h)}
 ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 18px system-ui';ctx.fillText(CM.name,W*0.52,py+ph*0.42);ctx.fillStyle=GOLD;ctx.font='bold 13px system-ui';ctx.fillText('#'+CM.num+' · '+CMN[CM.base],W*0.52,py+ph*0.6);
 const acc=(L,f)=>{const it=L.find(q=>q[0]===CM[f])||L[0];return it[1]+(window.FGF_LIMITED&&FGF_LIMITED[it[0]]?' · 🎃 LIMITED · ends '+FGF_LIMEND:'')+(cmOwn(it[0])?'':' · 🪙 '+it[2].toLocaleString())};
 const cyc=(L,f)=>d=>{const i=L.findIndex(q=>q[0]===CM[f]);CM[f]=L[(i+d+L.length)%L.length][0];cmSave()};
 const R=[['BASE ANIMAL',CMN[CM.base],d=>{CM.base=(CM.base+d+20)%20;Object.assign(CM,{hue:0,hat:'none',gl:'none',ch:'none'});if(CM.kick&&CM.own){MK.masc=cmSlot(CM.base);saveMK()}cmSave()}],['COLOUR',CM.hue?'Shift '+CM.hue+'°':'Original',d=>{CM.hue=CMHUE[(CMHUE.indexOf(CM.hue)+d+CMHUE.length)%CMHUE.length];cmSave()}],
  ['HAT',acc(CMHAT,'hat'),cyc(CMHAT,'hat'),CMHAT,'hat'],['GLASSES',acc(CMGL,'gl'),cyc(CMGL,'gl'),CMGL,'gl'],['CHAIN',acc(CMCH,'ch'),cyc(CMCH,'ch'),CMCH,'ch'],
  ['NAME',CM.name,()=>{const v=prompt('Mascot name (max 12)',CM.name);if(v!=null){const t=v.toUpperCase().replace(/[^A-Z0-9 .\'-]/g,'').trim().slice(0,12);if(t){CM.name=t;cmSave();if(cmUse()){MK.name=t;saveMK()}}}}],
  ['NUMBER','#'+CM.num,()=>{const v=prompt('Jersey number 0-99',CM.num);if(v!=null&&/^\d{1,2}$/.test(v.trim())){CM.num=+v.trim();cmSave();if(cmUse()){MK.num=CM.num;saveMK()}}}]];
 const y0=py+ph+8,rh=Math.min(46,(H*0.8-y0)/(R.length+1.6));
 R.forEach(([l,v,f,L,fk],i)=>{const y=y0+i*rh;panel(W*0.05,y,W*0.9,rh-5);ctx.textAlign='left';ctx.fillStyle='#bcd';ctx.font='bold 10px system-ui';ctx.fillText(l,W*0.08,y+rh*0.34);ctx.fillStyle='#fff';ctx.font='900 13px system-ui';ctx.fillText(v,W*0.08,y+rh*0.68);
  if(!CM.own)return;const it=L&&L.find(q=>q[0]===CM[fk]);if(it&&!cmOwn(it[0]))bx(W*0.95-158,y+rh/2-15,70,28,'BUY',()=>buy5('cm_'+it[0],it[2],()=>{CMO.push(it[0]);SV('fgfCMO',CMO);cmSave()}),true,11);
  if(f.length){bx(W*0.95-80,y+rh/2-15,36,28,'◀',()=>f(-1),false,13);bx(W*0.95-40,y+rh/2-15,36,28,'▶',()=>f(1),false,13)}else bx(W*0.95-70,y+rh/2-15,64,28,'EDIT',f,false,12)});
 const yb=y0+R.length*rh+4,bw=(W*0.9-8)/2;
 if(!CM.own)bx(W*0.05,yb,W*0.9,40,'🔓 UNLOCK · 🪙 '+CMPRICE.toLocaleString(),()=>buy5('cm_unlock',CMPRICE,()=>{CM.own=1;cmSave()}),true,13);
 else{bx(W*0.05,yb,bw,40,CM.side?'✔ ON SIDELINE':'PUT ON SIDELINE',()=>{CM.side=CM.side?0:1;cmSave()},!!CM.side,12);
  bx(W*0.05+bw+8,yb,bw,40,cmUse()?'✔ MY KICKER':'USE AS KICKER',()=>{if(cmUse()){CM.kick=0;MK.masc=-1}else{CM.kick=1;MK.masc=cmSlot(CM.base);MK.on=1;MK.name=CM.name;MK.num=CM.num}cmSave();saveMK();KC5.my=null},cmUse(),12)}
 bx(W/2-90,H*0.93-20,180,40,'◀ BACK',()=>state='teams')}
{const oS=S3.screen;S3.screen=function(){if(state==='cm'){drawCM();return true}const r=oS();if(state==='teams'&&window.SWC==null)bx(W/2-4-W*0.44,H*0.79,W*0.44,36,'🐾 CREATE MASCOT',()=>state='cm',false,12);return r}}
// if the base animal changes while it's the kicker, keep the kicker in sync
setInterval(()=>{if(CM.kick&&CM.own&&MK.masc>=0&&MK.masc!==cmSlot(CM.base)&&MK.masc!==-1){/* player picked another mascot in My Kicker */CM.kick=0;SV('fgfCM',CM)}},700);
