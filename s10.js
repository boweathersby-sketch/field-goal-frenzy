// ===== Stage 10: mascot kickers in BACK view — true mascot art at full opacity, back-of-head overlay hides the face,
// jersey back in the MASCOT's team colours with the player's name + number. Same spot + same 4-frame motion as human kickers.
'use strict';
const MBK={};
// per mascot: head [cx,cy,rx,ry], head colour [light,dark], torso [x,y,w,h] (in the 193x200 cell)
const MBH=[
 [[95,68,24,27],['#9a4fd0','#5a1f8a'],[62,86,68,58]],
 [[66,52,44,32],['#3cc2b4','#1d7a72'],[66,84,84,66]],
 [[104,58,33,31],['#4a4a52','#232328'],[48,90,72,56]],
 [[96,57,37,36],['#a9a9b0','#6a6a72'],[44,92,80,54]],
 [[95,72,30,28],['#d9b273','#9a7238'],[58,98,78,54]],
 [[80,40,36,34],['#8a2d40','#561524'],[46,80,96,62]],
 [[88,54,28,30],['#86303e','#4e1520'],[52,86,84,60]],
 [[76,55,33,27],['#2a3a78','#141d44'],[56,90,82,58]]];
function mascBack(mi,num){const nm=(MK.name||'').toUpperCase().slice(0,10),k=mi+'_'+num+'_'+nm;if(MBK[k])return MBK[k];
 const cw=193,c=document.createElement('canvas');c.width=cw;c.height=200;const x=c.getContext('2d');x.drawImage(MSI,mi*cw,0,cw,200,0,0,cw,200);
 const [hd,hc,tb]=MBH[mi]||MBH[0],T=TEAMS[mi]||TEAMS[0];
 x.globalCompositeOperation='source-atop';
 // back of head: opaque, shaded like the painted art, only on the mascot's own pixels (keeps horns/ears/hat silhouettes)
 let g=x.createRadialGradient(hd[0]-hd[2]*0.3,hd[1]-hd[3]*0.4,2,hd[0],hd[1],Math.max(hd[2],hd[3])*1.15);g.addColorStop(0,hc[0]);g.addColorStop(1,hc[1]);
 x.fillStyle=g;x.beginPath();x.ellipse(hd[0],hd[1],hd[2],hd[3],0,0,7);x.fill();
 x.strokeStyle='rgba(0,0,0,0.22)';x.lineWidth=2;for(let i=-1;i<=1;i++){x.beginPath();x.moveTo(hd[0]+i*hd[2]*0.35,hd[1]-hd[3]*0.7);x.quadraticCurveTo(hd[0]+i*hd[2]*0.45,hd[1],hd[0]+i*hd[2]*0.3,hd[1]+hd[3]*0.8);x.stroke()}
 // jersey back in team colours, shaded, clipped to the body so it wraps the silhouette
 const [tx,ty,tw,th]=tb;g=x.createLinearGradient(tx,0,tx+tw,0);g.addColorStop(0,'rgba(0,0,0,0.28)');g.addColorStop(0.3,'rgba(0,0,0,0)');g.addColorStop(0.7,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.3)');
 x.fillStyle=T.p;x.beginPath();x.roundRect(tx,ty,tw,th,[16,16,8,8]);x.fill();x.fillStyle=g;x.fill();
 x.fillStyle=T.s;x.fillRect(tx,ty,tw,4);x.fillRect(tx,ty+th-6,tw,6);
 x.strokeStyle='rgba(0,0,0,0.35)';x.lineWidth=1.5;x.stroke();
 x.globalCompositeOperation='source-over';x.textAlign='center';x.textBaseline='middle';
 if(nm){let fs=12;x.font=`900 ${fs}px system-ui`;while(x.measureText(nm).width>tw-8&&fs>7){fs--;x.font=`900 ${fs}px system-ui`}x.lineWidth=3;x.strokeStyle='rgba(0,0,0,0.5)';x.strokeText(nm,tx+tw/2,ty+12);x.fillStyle='#fff';x.fillText(nm,tx+tw/2,ty+12)}
 numOn(x,tx+tw/2,ty+th*0.6,Math.min(30,th*0.55),num,T.s);
 return MBK[k]=c}
mascSheet=function(mi,ti,num){const k='mb2_'+mi+'_'+num+'_'+(MK.name||'');if(KC5[k])return KC5[k];if(!MSI.complete||!MSI.naturalWidth)return teamSheet(ti);
 const c=document.createElement('canvas');c.width=812;c.height=300;c._masc=1;const x=c.getContext('2d'),bk=mascBack(mi,num),T=TEAMS[mi]||TEAMS[ti];
 // frames: 0 ready, 1 wind-up (leg back), 2 contact, 3 follow-through — feet on the human baseline, same spot by the ball
 // frame-space targets (203x300 cell) for the boot: wind-up behind, CONTACT exactly on the tee/ball, follow-through high toward the posts
 const P=[[0,0,null],[-0.04,-3,[40,250]],[0.03,2,[175,206]],[0.08,5,[178,80]]];
 P.forEach(([r,dx,tg],i)=>{const h=218,w=h*0.965,fx=i*203+76+dx,fy=297;
  let L=null;if(tg){const hx=fx+w*0.2,hy=fy-h*0.36;let vx=tg[0]+i*203-hx,vy=tg[1]-hy;const d=Math.hypot(vx,vy),Lm=Math.min(d,h*0.42);L=[hx,hy,Math.atan2(-vx,vy),Lm]}
  if(L&&i===1)drawLeg(x,L,T);
  x.save();x.translate(fx,fy);x.rotate(r);x.drawImage(bk,-w/2,-h,w,h);x.restore();
  if(L&&i>1)drawLeg(x,L,T)});return KC5[k]=c};
function drawLeg(x,[hx,hy,a,L],T){x.save();x.translate(hx,hy);x.rotate(a);
 const g=x.createLinearGradient(-13,0,13,0);g.addColorStop(0,'rgba(0,0,0,0.28)');g.addColorStop(0.5,'rgba(255,255,255,0.10)');g.addColorStop(1,'rgba(0,0,0,0.28)');
 x.fillStyle=T.p;x.beginPath();x.roundRect(-13,-6,26,L*0.62,12);x.fill();x.fillStyle=g;x.fill();
 x.fillStyle='#f4f4f4';x.beginPath();x.roundRect(-10,L*0.55,20,L*0.36,8);x.fill();x.fillStyle=T.s;x.fillRect(-10,L*0.55,20,5);
 x.fillStyle='#141414';x.beginPath();x.ellipse(3,L*0.94,12,17,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,0.22)';x.fillRect(-4,L*0.86,9,3);x.restore()}
