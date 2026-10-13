// ===== Stage 10: mascot kickers in BACK view (same spot + same 4-frame motion as human kickers) =====
'use strict';
const MBK={};
function mascBack(mi,ti,num){const k=mi+'_'+ti+'_'+num;if(MBK[k])return MBK[k];const cw=193,c=document.createElement('canvas');c.width=cw;c.height=200;const x=c.getContext('2d');x.drawImage(MSI,mi*cw,0,cw,200,0,0,cw,200);
 // average body colour of the upper half -> paint over the front (face, belly, details) so it reads as the back
 let d;try{d=x.getImageData(0,0,cw,200)}catch(e){return c}const a=d.data;let r=0,g=0,b=0,n=0;for(let i=0;i<a.length;i+=4){const y=(i/4/cw)|0;if(a[i+3]>200&&y<110){r+=a[i];g+=a[i+1];b+=a[i+2];n++}}if(n){r/=n;g/=n;b/=n}
 x.globalCompositeOperation='source-atop';x.globalAlpha=0.82;const gr=x.createLinearGradient(0,0,cw,0);gr.addColorStop(0,`rgb(${r*0.65|0},${g*0.65|0},${b*0.65|0})`);gr.addColorStop(0.5,`rgb(${Math.min(255,r*1.08)|0},${Math.min(255,g*1.08)|0},${Math.min(255,b*1.08)|0})`);gr.addColorStop(1,`rgb(${r*0.6|0},${g*0.6|0},${b*0.6|0})`);x.fillStyle=gr;x.fillRect(0,0,cw,200);
 // jersey back: team colour over the torso with name + number
 x.globalAlpha=1;const T=TEAMS[ti];x.fillStyle=T.p;x.beginPath();x.roundRect(cw*0.27,200*0.36,cw*0.46,200*0.34,14);x.fill();x.fillStyle=T.s;x.fillRect(cw*0.27,200*0.36,cw*0.46,5);x.globalCompositeOperation='source-over';
 const nm=(MK.name||'').slice(0,10);if(nm){x.fillStyle='#fff';x.font='900 13px system-ui';x.textAlign='center';x.fillText(nm,cw/2,200*0.43)}numOn(x,cw/2,200*0.56,30,num,T.s);
 return MBK[k]=c}
mascSheet=function(mi,ti,num){const k='mb'+mi+'_'+ti+'_'+num+'_'+(MK.name||'');if(KC5[k])return KC5[k];if(!MSI.complete||!MSI.naturalWidth)return teamSheet(ti);const c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d'),bk=mascBack(mi,ti,num),T=TEAMS[ti];
 // same frame roles/timing as the human sheet: 0 ready, 1 wind-up, 2 contact, 3 follow-through; feet on the same baseline, same spot by the ball
 const P=[[0,1,1,0,null],[-0.08,1.03,0.97,-4,0.55],[0.06,0.97,1.04,4,-1.25],[0.16,0.95,1.06,8,-2.2]];
 P.forEach(([r,sx,sy,dx,leg],i)=>{const h=245,w=h*0.965,fx=i*203+78+dx,fy=297;x.save();x.translate(fx,fy);x.rotate(r);x.scale(sx,sy);
  x.drawImage(bk,-w/2,-h,w,h);
  if(leg!=null){// kicking leg swinging through toward the posts (drawn in front, team colour + boot)
   x.save();x.translate(w*0.16,-h*0.3);x.rotate(leg);x.fillStyle=T.p;x.strokeStyle='rgba(0,0,0,0.35)';x.lineWidth=2;x.beginPath();x.roundRect(-11,0,22,h*0.34,10);x.fill();x.stroke();x.fillStyle='#fff';x.fillRect(-11,h*0.22,22,h*0.07);x.fillStyle='#111';x.beginPath();x.ellipse(5,h*0.35,17,9,0,0,7);x.fill();x.restore()}
  x.restore()});return KC5[k]=c};
