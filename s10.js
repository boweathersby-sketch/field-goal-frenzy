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
mascSheet=function(mi,ti,num){const k='mh3_'+mi+'_'+num+'_'+(MK.name||'');if(KC5[k])return KC5[k];if(!KS.complete||!KS.naturalWidth)return teamSheet(ti);
 const H=7,src=document.createElement('canvas');src.width=812;src.height=300;const sx=src.getContext('2d');sx.drawImage(KS,0,H*300,812,300,0,0,812,300);
 let d;try{d=sx.getImageData(0,0,812,300)}catch(e){return teamSheet(ti)}const a=d.data,T=TEAMS[mi],P=rgb(T.p),S=rgb(T.s),F=rgb(MFUR[mi][0]);
 for(let i=0;i<a.length;i+=4){if(a[i+3]<8)continue;const [h,s,v]=hsv(a[i],a[i+1],a[i+2]);
  if(h>200&&h<260&&s>0.25){const k2=Math.min(1.6,v/0.36);a[i]=Math.min(255,P[0]*k2+18*v);a[i+1]=Math.min(255,P[1]*k2+18*v);a[i+2]=Math.min(255,P[2]*k2+18*v)}// navy jersey/pants -> team colour
  else if(h>=8&&h<=40&&s>0.18&&s<0.75&&v>0.25){const k2=v/0.75;a[i]=Math.min(255,F[0]*k2);a[i+1]=Math.min(255,F[1]*k2);a[i+2]=Math.min(255,F[2]*k2)}}// skin -> fur
 sx.putImageData(d,0,0);
 const c=document.createElement('canvas');c.width=812;c.height=300;c._masc=1;const x=c.getContext('2d');
 for(let f=0;f<4;f++){const m=KMETA[H][f];mTail(x,mi,m[0],m[1]+70)}
 x.drawImage(src,0,0);
 const nm=(MK.name||'').toUpperCase().slice(0,10);
 for(let f=0;f<4;f++){const m=KMETA[H][f];{const [L,D]=MFUR[mi],hx=MHP[f][0],hy=MHP[f][1],g=x.createLinearGradient(hx,hy,hx,hy+70);g.addColorStop(0,D);g.addColorStop(1,L);x.fillStyle=g;x.beginPath();x.ellipse(hx-6,hy+30,21,24,0,0,7);x.fill();mHead(x,mi,hx,hy,29)}
  numOn(x,m[0],m[1],m[3],num,T.s);if(nm){x.save();x.font='900 11px system-ui';x.textAlign='center';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,0.55)';x.strokeText(nm,m[0],m[1]-m[3]*0.72);x.fillStyle='#fff';x.fillText(nm,m[0],m[1]-m[3]*0.72);x.restore()}}
 return KC5[k]=c};
