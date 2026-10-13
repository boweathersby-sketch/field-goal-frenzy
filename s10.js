// ===== Stage 10: mascot kickers = the Hawks kicker's exact 4 frames (same spot, size, timing, kick),
// recoloured to the mascot's team, fur on the arms, and the mascot's own head (back view) + tail. Custom name + number on the back.
'use strict';
const MFUR=[['#8a3fc4','#4e1a80'],['#35b5a8','#1a6e66'],['#4a4a52','#202026'],['#a4a4ac','#62626a'],['#d4ad6c','#94682e'],['#8a2d40','#4e1322'],['#86303e','#4a121e'],['#2a3a78','#121a40']];
function mHead(x,mi,hx,hy,R){const [L,D]=MFUR[mi],T=TEAMS[mi];x.save();x.lineJoin='round';
 const ball=(cx,cy,rx,ry,l,d)=>{const g=x.createRadialGradient(cx-rx*0.35,cy-ry*0.45,2,cx,cy,Math.max(rx,ry)*1.1);g.addColorStop(0,l);g.addColorStop(1,d);x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);x.fill();x.strokeStyle='rgba(0,0,0,0.35)';x.lineWidth=1.5;x.stroke()};
 const tri=(pts,c)=>{x.fillStyle=c;x.beginPath();x.moveTo(...pts[0]);for(const p of pts.slice(1))x.lineTo(...p);x.closePath();x.fill();x.strokeStyle='rgba(0,0,0,0.35)';x.lineWidth=1.2;x.stroke()};
 if(mi===0){tri([[hx-4,hy-R*0.7],[hx+R*0.5,hy-R*2.1],[hx+R*0.15,hy-R*1.25],[hx+R*0.75,hy-R*1.45],[hx+R*0.1,hy-R*0.4]],'#f6c21c')}
   if(mi===2){x.fillStyle=D;x.strokeStyle='rgba(0,0,0,0.5)';x.lineWidth=2;x.beginPath();x.roundRect(hx-R*1.05,hy-R*1.1,R*2.1,R*2.05,R*0.35);x.fill();x.stroke();x.fillStyle='#ff7a1a';x.fillRect(hx-R*1.05,hy-R*0.15,R*0.22,R*0.5);x.fillRect(hx+R*0.83,hy-R*0.15,R*0.22,R*0.5);x.fillStyle='rgba(255,255,255,0.12)';x.fillRect(hx-R*0.8,hy-R*0.95,R*1.6,R*0.25)}
 else ball(hx,hy,R*(mi===1?1.15:1),R*(mi===1?0.95:1),L,D);
 if(mi===3){tri([[hx-R*0.85,hy-R*0.3],[hx-R*0.7,hy-R*1.55],[hx-R*0.15,hy-R*0.75]],D);tri([[hx+R*0.85,hy-R*0.3],[hx+R*0.7,hy-R*1.55],[hx+R*0.15,hy-R*0.75]],D)}
 if(mi===5){ball(hx-R*0.95,hy-R*0.2,R*0.35,R*0.5,D,'#2e0a14');ball(hx+R*0.95,hy-R*0.2,R*0.35,R*0.5,D,'#2e0a14')}
 if(mi===1){for(let i=0;i<4;i++)tri([[hx-R*0.25,hy-R*0.95+i*R*0.5],[hx+R*0.25,hy-R*0.95+i*R*0.5],[hx,hy-R*1.35+i*R*0.5]],'#e8503a')}
 if(mi===4){x.strokeStyle='rgba(0,0,0,0.25)';x.lineWidth=2;for(let i=-1;i<=1;i++){x.beginPath();x.moveTo(hx-R*0.9,hy+i*R*0.4);x.quadraticCurveTo(hx,hy+i*R*0.4-R*0.2,hx+R*0.9,hy+i*R*0.4);x.stroke()}}
 if(mi===6){for(const s of[-1,1]){x.save();x.translate(hx+s*R*0.85,hy-R*0.35);x.scale(s,1);const g=x.createLinearGradient(0,-R,R,R);g.addColorStop(0,'#e8e4dc');g.addColorStop(1,'#8f8a80');x.strokeStyle=g;x.lineCap='round';x.lineWidth=R*0.42;x.beginPath();x.arc(R*0.35,R*0.25,R*0.55,-2.6,1.9);x.stroke();x.restore()}}
 if(mi===7){x.fillStyle='#f4f4f4';x.beginPath();x.ellipse(hx,hy-R*0.55,R*1.1,R*0.55,0,Math.PI,0);x.fill();x.fillStyle='#111a33';x.fillRect(hx-R*1.12,hy-R*0.6,R*2.24,R*0.22);x.fillStyle='#f2c230';x.fillRect(hx-R*0.15,hy-R*1.0,R*0.3,R*0.25)}
 if(mi===0||mi===3||mi===5||mi===6){x.strokeStyle='rgba(0,0,0,0.18)';x.lineWidth=2;for(let i=-1;i<=1;i++){x.beginPath();x.moveTo(hx+i*R*0.35,hy-R*0.7);x.quadraticCurveTo(hx+i*R*0.45,hy,hx+i*R*0.3,hy+R*0.8);x.stroke()}}
 x.restore()}
function mTail(x,mi,cx,cy){const [L,D]=MFUR[mi];x.save();x.lineCap='round';
 if(mi===1){x.fillStyle=L;x.beginPath();x.moveTo(cx-14,cy-6);x.quadraticCurveTo(cx-60,cy+40,cx-70,cy+95);x.lineTo(cx-56,cy+92);x.quadraticCurveTo(cx-40,cy+40,cx+10,cy+8);x.fill();x.strokeStyle='rgba(0,0,0,0.35)';x.lineWidth=1.5;x.stroke()}
 if(mi===3){const g=x.createLinearGradient(cx,cy,cx-50,cy+60);g.addColorStop(0,D);g.addColorStop(1,L);x.fillStyle=g;x.beginPath();x.ellipse(cx-34,cy+40,14,38,0.6,0,7);x.fill()}
 if(mi===4){x.strokeStyle=L;x.lineWidth=13;x.beginPath();x.moveTo(cx-10,cy);x.bezierCurveTo(cx-70,cy-30,cx-70,cy-170,cx-10,cy-185);x.stroke();x.fillStyle='#d23a2a';x.beginPath();x.moveTo(cx-10,cy-195);x.lineTo(cx+12,cy-180);x.lineTo(cx-8,cy-172);x.fill()}
 if(mi===5){x.strokeStyle=D;x.lineWidth=7;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx-10,cy+14);x.stroke()}
 x.restore()}
const MHP=[[72,40],[266,44],[469,44],[669,39]];

// painted mascot head from the real sideline art: mask ellipse M (keeps ears/horns/spikes/hat), face ellipse E painted over with the mascot's own fur
const MHM=[[92,55,40,55],[66,50,56,38],[104,56,42,38],[96,48,46,50],[95,70,38,36],[80,40,44,42],[88,48,52,40],[62,42,46,48]];
const MHC=[[123,63,192],[47,179,166],[58,58,64],[154,154,162],[216,176,112],[122,34,54],[122,40,56],[34,48,106]];
const MHE=[[95,68,24,27],[66,52,44,32],[104,58,33,31],[96,57,37,36],[95,72,30,28],[80,40,36,34],[88,54,28,30],[64,60,30,24]];
const MTL=[null,[[118,90,75,100],1],null,[[128,92,55,75],1],[[15,0,60,52],-1],null,null,null];
const MAH={};
function artHead(mi){if(MAH[mi])return MAH[mi];const [mx,my,mrx,mry]=MHM[mi],[ex,ey,erx,ery]=MHE[mi],x0=mx-mrx,y0=my-mry,w=mrx*2,h=mry*2,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
 x.save();x.beginPath();x.ellipse(mrx,mry,mrx,mry,0,0,7);x.clip();x.drawImage(MSI,mi*193+x0,y0,w,h,0,0,w,h);x.restore();
 // sample the fur colour on the rim of the face
 let L=MHC[mi];if(0)try{const d=x.getImageData(0,0,w,h).data,acc=[];for(let t=0;t<64;t++){const a=t/64*6.283,px=Math.round(ex-x0+Math.cos(a)*erx*0.92),py=Math.round(ey-y0+Math.sin(a)*ery*0.92);if(px<0||py<0||px>=w||py>=h)continue;const i=(py*w+px)*4;if(d[i+3]>200)acc.push([d[i],d[i+1],d[i+2]])}
  if(acc.length){const lum=v=>v[0]*0.3+v[1]*0.59+v[2]*0.11;acc.sort((p,q)=>lum(p)-lum(q));L=acc[acc.length>>1]}}catch(e){}
 const cx=ex-x0,cy=ey-y0;x.save();x.globalCompositeOperation='source-atop';x.beginPath();x.ellipse(cx,cy,erx*0.97,ery*0.97,0,0,7);x.clip();
 const g=x.createRadialGradient(cx-erx*0.35,cy-ery*0.45,2,cx,cy,Math.max(erx,ery)*1.1);g.addColorStop(0,`rgb(${L.map(v=>Math.min(255,v*1.25+12)|0)})`);g.addColorStop(0.6,`rgb(${L.map(v=>v|0)})`);g.addColorStop(1,`rgb(${L.map(v=>v*0.55|0)})`);x.fillStyle=g;x.fillRect(0,0,w,h);
 x.globalAlpha=0.12;x.filter='blur(6px)';x.drawImage(c,0,0);x.filter='none';x.globalAlpha=1;
 x.strokeStyle=`rgba(${L.map(v=>v*0.5|0)},0.55)`;x.lineWidth=1.4;for(let i=0;i<14;i++){const u=(i/13-0.5)*1.7;x.beginPath();x.moveTo(cx+u*erx*0.6,cy-ery*0.85);x.quadraticCurveTo(cx+u*erx*0.75,cy,cx+u*erx*0.55,cy+ery*0.9);x.stroke()}
 x.restore();return MAH[mi]=c}
function drawArtHead(x,mi,hx,hy){const c=artHead(mi),[mx,my,mrx,mry]=MHM[mi],[ex,ey,erx]=MHE[mi],s=Math.min(1.7,40/erx);const X=hx-(ex-(mx-mrx))*s,Y=hy-(ey-(my-mry))*s,W2=c.width*s;if(mi===1){x.save();x.translate(2*X+W2,0);x.scale(-1,1);x.drawImage(c,X,Y,W2,c.height*s);x.restore()}else x.drawImage(c,X,Y,W2,c.height*s)}
function drawArtTail(x,mi,ax,ay){const t=MTL[mi];if(!t)return;let [[tx,ty,tw,th],side]=t,s=0.9;if(mi===1){ax+=side>0?10:-10;ay+=side>0?54:-54;side=-side;const X=side>0?ax+4:ax-tw*s-4,Y=side>0?ay-th*s*0.35:ay-th*s*0.95;x.save();x.translate(2*X+tw*s,0);x.scale(-1,1);x.drawImage(MSI,mi*193+tx,ty,tw,th,X,Y,tw*s,th*s);x.restore();return}x.drawImage(MSI,mi*193+tx,ty,tw,th,side>0?ax+4:ax-tw*s-4,side>0?ay-th*s*0.35:ay-th*s*0.95,tw*s,th*s)}
mascSheet=function(mi,ti,num){const k='mh6_'+mi+'_'+num+'_'+(MK.name||'');if(KC5[k])return KC5[k];if(!KS.complete||!KS.naturalWidth||!MSI.complete||!MSI.naturalWidth)return teamSheet(ti);
 const H=7,src=document.createElement('canvas');src.width=812;src.height=300;const sx=src.getContext('2d');sx.drawImage(KS,0,H*300,812,300,0,0,812,300);
 let d;try{d=sx.getImageData(0,0,812,300)}catch(e){return teamSheet(ti)}const a=d.data,T=TEAMS[mi],P=rgb(T.p),S=rgb(T.s),F=rgb(MFUR[mi][0]);
 for(let i=0;i<a.length;i+=4){if(a[i+3]<8)continue;const [h,s,v]=hsv(a[i],a[i+1],a[i+2]);
  if(h>200&&h<260&&s>0.25){const k2=Math.min(1.6,v/0.36);a[i]=Math.min(255,P[0]*k2+18*v);a[i+1]=Math.min(255,P[1]*k2+18*v);a[i+2]=Math.min(255,P[2]*k2+18*v)}// navy jersey/pants -> team colour
  else if(h>=8&&h<=40&&s>0.18&&s<0.75&&v>0.25){const k2=v/0.75;a[i]=Math.min(255,F[0]*k2);a[i+1]=Math.min(255,F[1]*k2);a[i+2]=Math.min(255,F[2]*k2)}}// skin -> fur
 sx.putImageData(d,0,0);
 const c=document.createElement('canvas');c.width=812;c.height=300;c._masc=1;const x=c.getContext('2d');
 for(let f=0;f<4;f++){const m=KMETA[H][f];drawArtTail(x,mi,m[0]+(MTL[mi]&&MTL[mi][1]>0?14:-26),m[1]+(MTL[mi]&&MTL[mi][1]>0?72:40))}
 x.drawImage(src,0,0);
 const nm=(MK.name||'').toUpperCase().slice(0,10);
 for(let f=0;f<4;f++){const m=KMETA[H][f];{const [L,D]=MFUR[mi],hx=MHP[f][0],hy=MHP[f][1],g=x.createLinearGradient(hx,hy,hx,hy+70);g.addColorStop(0,D);g.addColorStop(1,L);x.fillStyle=g;x.beginPath();x.ellipse(hx-6,hy+30,21,24,0,0,7);x.fill();drawArtHead(x,mi,hx,hy)}
  numOn(x,m[0],m[1],m[3],num,T.s);if(nm){x.save();x.font='900 11px system-ui';x.textAlign='center';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,0.55)';x.strokeText(nm,m[0],m[1]-m[3]*0.72);x.fillStyle='#fff';x.fillText(nm,m[0],m[1]-m[3]*0.72);x.restore()}}
 return KC5[k]=c};
// ---- Painted-mascot kickers (Gators, Forge, Scorpions): real painted head + tail, mascot-textured limbs, Hawks kick ----
{const _pd=drawArtHead,_pt=drawArtTail,PM={
 1:{mir:1,head:[[28,0,104,92],[[30,40],[45,30],[70,14],[85,0],[118,4],[130,30],[124,60],[108,84],[80,92],[52,86],[40,64],[30,52]]],hs:0.78,
    tail:[[128,96,65,72],[[150,150],[146,128],[160,110],[178,96],[193,98],[193,140],[180,160],[160,168]]],tp:[-62,30,0.95],limb:(px,py,v)=>{const sc=((px+(py>>2&1)*3)%6<1||py%4<1)?0.78:1;return [53*v*sc,181*v*sc,168*v*sc]}}};
 let NOG=0;drawArtHead=function(x,mi,a,b){if(PM[mi]&&NOG)return;_pd(x,mi,a,b)};drawArtTail=function(x,mi,a,b){if(PM[mi]&&NOG)return;_pt(x,mi,a,b)};
 const prev=mascSheet,PC={};
 function gpart(mi,[[sx,sy,w,h],poly],mir){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');if(mir){x.translate(w,0);x.scale(-1,1)}
  x.beginPath();poly.forEach(([px,py],i)=>i?x.lineTo(px-sx,py-sy):x.moveTo(px-sx,py-sy));x.closePath();x.clip();x.drawImage(MSI,mi*193+sx,sy,w,h,0,0,w,h);return c}
 // paint the BACK of the head inside the painted silhouette (no face toward the camera); keeps spikes/edge features
 function backify(mi,c){const w=c.width,h=c.height,x=c.getContext('2d'),d=x.getImageData(0,0,w,h),a=d.data,src=new Uint8ClampedArray(a),A=(X,Y)=>X<0||Y<0||X>=w||Y>=h?0:src[(Y*w+X)*4+3];
  let y0=h,y1=0;for(let y=0;y<h;y++)for(let X=0;X<w;X++)if(src[(y*w+X)*4+3]>8){y0=Math.min(y0,y);y1=Math.max(y1,y)}
  for(let y=0;y<h;y++)for(let X=0;X<w;X++){const i=(y*w+X)*4;if(src[i+3]<8)continue;
   let e=99;for(const r of [2,4,6,8])if(!A(X-r,y)||!A(X+r,y)||!A(X,y-r)||!A(X,y+r)||!A(X-r,y-r)||!A(X+r,y-r)){e=r;break}
   const r0=src[i],g0=src[i+1],b0=src[i+2],t=(y-y0)/Math.max(1,y1-y0),sh=1.12-0.42*t-(e<=2?0.25:0);let o;
   if(mi===1){const red=r0>150&&g0<120;if(red&&(e<=6||t<0.3)){continue}// red spikes stay
    const sc=((X+(y>>2&1)*3)%6<1||y%5<1)?0.82:1;o=[53*sh*sc,181*sh*sc,168*sh*sc]}
   else if(mi===2){o=[60*sh,60*sh,68*sh];if(e<=2)o=[200,95,20];if((y-y0)%14===7)o=[40*sh,40*sh,46*sh];
    for(const [bx,by] of [[0.2,0.25],[0.8,0.25],[0.2,0.75],[0.8,0.75]]){const dx=X-bx*w,dy=y-(y0+by*(y1-y0));if(dx*dx+dy*dy<5)o=[150,150,160]}}
   else{const cx=Math.abs(X-w/2)/w,ch=((y-y0)+cx*30)%16;o=ch<2?[208*sh,128*sh,86*sh]:[220*sh,176*sh,112*sh];if(e<=2)o=[120,60,30]}
   a[i]=o[0];a[i+1]=o[1];a[i+2]=o[2]}
  x.putImageData(d,0,0);return c}
 // three-quarter turn to the right: back of head, with the right part of the painted face squeezed onto the right side
 // full side-profile face looking right (no back plate, no seam): Scorpion art already looks right; Forge face is narrowed and turned right
 function threeq(mi,face){if(mi!==2)return face;const w=face.width,h=face.height,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
  x.setTransform(0.72,0,-0.06,1,w*0.28,0);x.drawImage(face,0,0);return c}
 mascSheet=function(mi,ti,num){const M=window.FGF_PORT?null:PM[mi];if(!M)return prev(mi,ti,num);const k='pm3_'+mi+'_'+num+'_'+(MK.name||'');if(KC5[k])return KC5[k];if(!MSI.complete||!MSI.naturalWidth)return prev(mi,ti,num);
  NOG=1;const base=prev(mi,ti,num);NOG=0;if(!base._masc)return base;delete KC5['mh6_'+mi+'_'+num+'_'+(MK.name||'')];
  if(!PC[mi])PC[mi]={h:mi===1?backify(mi,gpart(mi,M.head,M.mir)):threeq(mi,gpart(mi,M.head,M.mir)),t:M.tail&&gpart(mi,M.tail,M.mir)};const G=PC[mi];
  const c=document.createElement('canvas');c.width=812;c.height=300;c._masc=1;const x=c.getContext('2d');x.drawImage(base,0,0);
  const d=x.getImageData(0,0,812,300),a=d.data;
  for(let i=0;i<a.length;i+=4){if(a[i+3]<8)continue;const r=a[i],g=a[i+1],b=a[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx>95&&(mx-mn)<38){const p=i/4,o=M.limb(p%812,p/812|0,Math.min(1.15,mx/215));a[i]=o[0];a[i+1]=o[1];a[i+2]=o[2]}}// white pants/socks/gloves -> mascot skin
  x.putImageData(d,0,0);
  for(let f=0;f<4;f++){const m=KMETA[7][f],hx=MHP[f][0],hy=MHP[f][1];
   if(G.t){const [ox,oy,ts]=M.tp,tw=G.t.width*ts,th=G.t.height*ts;x.save();x.globalCompositeOperation='destination-over';x.drawImage(G.t,m[0]+ox,m[1]+oy,tw,th);x.restore()}
   const w=G.h.width*M.hs,h=G.h.height*M.hs;x.drawImage(G.h,hx-w*0.5+4,hy-h*0.6,w,h)}
  return KC5[k]=c}}

// ---- Portraits (My Kicker previews) keep the pre-d4cc12b look: original kickers art + old Bulldogs metrics + old mascot heads; in-game sprites unchanged ----
const KSP=new Image();KSP.src='kickers_p.webp?v=1';const PSC={},OLD5=[[56,88,50,31,75,24],[278,88,53,31,300,24]];
// pre-fdadfa7 front-facing painted mascot (as the My Kicker preview looked originally)
function frontMasc(mi,ti,num){const k='fm4_'+mi+'_'+ti+'_'+num;if(KC5[k])return KC5[k];if(!MSI.complete||!MSI.naturalWidth)return teamSheet(ti);const c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d');
 const P=[[0,1,1,0],[-0.08,1.03,0.97,-3],[0.07,0.97,1.03,4],[0.14,0.98,1.02,6]];
 P.forEach(([r,sx,sy,dx],i)=>{const h=176,w=h*0.965,fx=i*203+101+dx,fy=292;x.save();x.beginPath();x.rect(i*203,0,203,300);x.clip();/* keep every frame inside its own cell: no bleed into the neighbour */x.translate(fx,fy);x.rotate(r);x.scale(sx,sy);
  x.drawImage(MSI,mi*193,0,193,200,-w/2,-h,w,h);
  x.fillStyle=TEAMS[ti].p;x.strokeStyle=TEAMS[ti].s;x.lineWidth=3;x.beginPath();x.arc(0,-h*0.42,19,0,7);x.fill();x.stroke();numOn(x,0,-h*0.42-1,22,num,TEAMS[ti].s);x.restore()});return KC5[k]=c}
window.portraitSheet=function(ti){if(MK.masc>=0)return frontMasc(MK.masc,ti,myNum(ti));const key=JSON.stringify(MK)+'|'+ti;if(PSC[key])return PSC[key];if(!KSP.complete||!KSP.naturalWidth)return mySheet(ti);
 const sv=Object.assign({},KC5);for(const k in KC5)delete KC5[k];const k5=[KMETA[5][0].slice(),KMETA[5][1].slice()];KMETA[5][0]=OLD5[0].slice();KMETA[5][1]=OLD5[1].slice();
 const P=CanvasRenderingContext2D.prototype,od=P.drawImage;P.drawImage=function(im,...a){return od.call(this,im===KS?KSP:im,...a)};window.FGF_PORT=1;let s;
 try{s=mySheet(ti)}finally{window.FGF_PORT=0;P.drawImage=od;KMETA[5][0]=k5[0];KMETA[5][1]=k5[1];for(const k in KC5)delete KC5[k];Object.assign(KC5,sv)}
 return PSC[key]=s};
