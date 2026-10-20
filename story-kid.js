// Backyard jug scene: dedicated hand-drawn teen kid over the original four kick poses (same frames/timing)
(function(){
// joints per pose, frame-local coords of the original 203x300 cells (traced from the source sprite)
const J=[
 {h:[73,30],n:[71,56],sL:[34,72],sR:[98,72],eL:[24,116],eR:[106,117],wL:[27,158],wR:[114,166],pL:[54,140],pR:[86,140],kL:[33,215],kR:[99,215],aL:[16,272],aR:[110,274],fL:[[9,286],[36,289]],fR:[[104,286],[140,290]]},
 {h:[95,31],n:[94,57],sL:[50,72],sR:[118,74],eL:[38,116],eR:[121,119],wL:[40,160],wR:[127,170],pL:[70,140],pR:[100,140],kL:[42,215],kR:[105,215],aL:[16,268],aR:[110,274],fL:[[8,284],[32,289]],fR:[[104,286],[140,290]]},
 {h:[70,44],n:[70,66],sL:[33,86],sR:[94,83],eL:[17,122],eR:[110,112],wL:[13,156],wR:[136,136],pL:[52,150],pR:[90,148],kL:[74,214],kR:[124,166],aL:[78,262],aR:[133,203],fL:[[76,287],[106,292]],fR:[[128,214],[162,201]]},
 {h:[60,46],n:[64,68],sL:[27,92],sR:[88,80],eL:[9,134],eR:[114,76],wL:[19,166],wR:[131,56],pL:[57,152],pR:[88,142],kL:[80,214],kR:[124,116],aL:[76,262],aR:[152,95],fL:[[72,287],[101,292]],fR:[[160,104],[172,64]]}];
const K=window.FGF_KID2={J,sc:0.88,sl:16,sw:8.5};
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
function seg(x,a,b,w0,w1,fill){// tapered limb as a smooth quad with round ends
 const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;x.beginPath();
 x.moveTo(a[0]+nx*w0,a[1]+ny*w0);x.lineTo(b[0]+nx*w1,b[1]+ny*w1);x.arc(b[0],b[1],w1,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI,true);
 x.lineTo(a[0]-nx*w0,a[1]-ny*w0);x.arc(a[0],a[1],w0,Math.atan2(-ny,-nx),Math.atan2(-ny,-nx)+Math.PI,true);x.closePath();if(fill){x.fillStyle=fill;x.fill()}}
function shade(hex,k){const c=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));return'rgb('+c.map(v=>Math.max(0,Math.min(255,v*k|0))).join(',')+')'}
function leg(x,p,k,a,front){// relaxed straight-leg jeans: thigh->knee->ankle, roomy, outer seam, small cuff
 const D='#4f78b4';seg(x,p,k,14.5,13,shade(D,front?1:0.9));seg(x,k,a,13,12.5,shade(D,front?0.96:0.86));
 // fabric shading: inner shadow stroke + knee crease + outer seam stitch
 x.save();x.lineCap='round';x.strokeStyle='rgba(20,35,70,.28)';x.lineWidth=3;x.beginPath();x.moveTo(...lerp(p,k,0.1));x.lineTo(...lerp(k,a,0.95));x.stroke();
 const sd=(q,r,o)=>{const dx=r[0]-q[0],dy=r[1]-q[1],L=Math.hypot(dx,dy)||1;return[q[0]-dy/L*o,q[1]+dx/L*o]};
 x.strokeStyle='rgba(225,190,120,.55)';x.lineWidth=0.9;x.setLineDash([2,1.6]);x.beginPath();x.moveTo(...sd(p,k,-9));x.lineTo(...sd(k,a,-8.5));x.stroke();x.setLineDash([]);
 x.strokeStyle='rgba(20,35,70,.35)';x.lineWidth=1.2;x.beginPath();const kc=lerp(p,k,0.92);x.moveTo(...sd(kc,k,-5));x.quadraticCurveTo(k[0],k[1],...sd(kc,k,5));x.stroke();
 // cuff
 const c0=lerp(k,a,0.88),q=[a[0]-(a[0]-k[0])*0.02,a[1]-(a[1]-k[1])*0.02];x.strokeStyle=shade(D,0.78);x.lineWidth=4;x.lineCap='butt';const dd=Math.hypot(a[0]-k[0],a[1]-k[1]),pp=[-(a[1]-k[1])/dd*12.5,(a[0]-k[0])/dd*12.5];x.beginPath();x.moveTo(c0[0]+pp[0],c0[1]+pp[1]);x.lineTo(c0[0]-pp[0],c0[1]-pp[1]);x.stroke();x.restore()}
function shoe(x,heel,toe){const dx=toe[0]-heel[0],dy=toe[1]-heel[1],L=Math.hypot(dx,dy),an=Math.atan2(dy,dx);x.save();x.translate(heel[0],heel[1]);x.rotate(an);
 x.fillStyle='#f4f4f0';x.beginPath();x.moveTo(-4,-11);x.quadraticCurveTo(L*0.45,-13,L+3,-4);x.quadraticCurveTo(L+6,2,L+1,5);x.lineTo(-5,5);x.quadraticCurveTo(-9,-3,-4,-11);x.fill();
 x.fillStyle='#bfc3c8';x.fillRect(-5,2,L+7,3.6);x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=1;x.stroke();
 x.strokeStyle='#9aa3ad';x.lineWidth=1;for(let i=0;i<3;i++){x.beginPath();x.moveTo(L*0.3+i*3.5,-9);x.lineTo(L*0.36+i*3.5,-5);x.stroke()}x.restore()}
function arm(x,s,e,w,sk){seg(x,s,e,7,6,sk);seg(x,e,w,6,4.8,sk);x.fillStyle=sk;x.beginPath();x.ellipse(...lerp(e,w,1.12),5.4,6.6,Math.atan2(w[1]-e[1],w[0]-e[0])-Math.PI/2,0,7);x.fill();
 x.strokeStyle='rgba(90,45,20,.25)';x.lineWidth=1;x.beginPath();x.moveTo(...lerp(s,e,0.3));x.lineTo(...lerp(e,w,0.8));x.stroke()}
function frame(x,f,o){const j=J[f],SK=o.sk,HR=o.hr;
 // slimmer teen: narrow shoulders/hips toward the spine
 const mid=[(j.sL[0]+j.sR[0])/2,(j.sL[1]+j.sR[1])/2],hm=[(j.pL[0]+j.pR[0])/2,(j.pL[1]+j.pR[1])/2],nar=(p,c,k)=>[c[0]+(p[0]-c[0])*k,c[1]+(p[1]-c[1])*k];
 const sL=nar(j.sL,mid,0.78),sR=nar(j.sR,mid,0.78),pL=nar(j.pL,hm,0.86),pR=nar(j.pR,hm,0.86);
 const eL=lerp(sL,j.eL,1),eR=lerp(sR,j.eR,1);
 // legs (kicking leg R drawn front when raised)
 leg(x,pL,j.kL,j.aL,f<2);shoe(x,...j.fL);
 leg(x,pR,j.kR,j.aR,true);shoe(x,...j.fR);
 // hips/seat of jeans + back pockets
 x.fillStyle='#4a72ad';x.beginPath();x.moveTo(pL[0]-13,pL[1]-8);x.lineTo(pR[0]+13,pR[1]-8);x.lineTo(pR[0]+12,pR[1]+14);x.quadraticCurveTo(hm[0],hm[1]+24,pL[0]-12,pL[1]+14);x.closePath();x.fill();
 x.strokeStyle='rgba(225,190,120,.6)';x.lineWidth=0.9;x.setLineDash([2,1.6]);[pL,pR].forEach(p=>{x.beginPath();x.rect(p[0]-6,p[1]+1,11,10);x.stroke()});x.beginPath();x.moveTo(hm[0],hm[1]-4);x.lineTo(hm[0],hm[1]+16);x.stroke();x.setLineDash([]);
 // arms behind/beside torso
 arm(x,lerp(sL,eL,0.3),eL,j.wL,SK);arm(x,lerp(sR,eR,0.3),eR,j.wR,SK);
 // loose tee: narrow shoulders, falls straight past the waistband with soft folds, short sleeves
 const hem=lerp(mid,hm,1.1),tw=Math.hypot(sR[0]-sL[0],sR[1]-sL[1])/2,ux=(sR[0]-sL[0])/(2*tw),uy=(sR[1]-sL[1])/(2*tw);
 const hL=[hem[0]-ux*(tw+4),hem[1]-uy*(tw+4)],hR=[hem[0]+ux*(tw+4),hem[1]+uy*(tw+4)];
 const nb=[j.n[0],j.n[1]+7],cL=[nb[0]-ux*8,nb[1]-uy*8+1],cR=[nb[0]+ux*8,nb[1]+uy*8+1];
 const slv=(s0,e)=>{const L=Math.hypot(e[0]-s0[0],e[1]-s0[1])||1,d=[(e[0]-s0[0])/L,(e[1]-s0[1])/L],c=[s0[0]+d[0]*K.sl,s0[1]+d[1]*K.sl],p=[-d[1]*K.sw,d[0]*K.sw];
  const A=[c[0]+p[0],c[1]+p[1]],B=[c[0]-p[0],c[1]-p[1]],dm=q=>Math.hypot(q[0]-hm[0],q[1]-hm[1]);return dm(A)>dm(B)?[A,B]:[B,A]};
 const [oL,iL]=slv(sL,eL),[oR,iR]=slv(sR,eR),apL=lerp(lerp(sL,hL,0.32),mid,0.12),apR=lerp(lerp(sR,hR,0.32),mid,0.12);
 const g=x.createLinearGradient(sL[0]-10,0,sR[0]+10,0);g.addColorStop(0,'#dcdcd6');g.addColorStop(0.4,'#fbfbf8');g.addColorStop(0.7,'#f4f4f0');g.addColorStop(1,'#d6d6d0');
 x.fillStyle=g;x.beginPath();x.moveTo(...cL);x.quadraticCurveTo(sL[0]+2,sL[1]-5,sL[0]-2,sL[1]-1);x.lineTo(...oL);x.lineTo(...iL);x.quadraticCurveTo(apL[0]+1,apL[1]-2,...apL);
 x.quadraticCurveTo(hL[0]-1,(apL[1]+hL[1])/2,...hL);x.quadraticCurveTo(hem[0],hem[1]+5,...hR);x.quadraticCurveTo(hR[0]+1,(apR[1]+hR[1])/2,...apR);x.quadraticCurveTo(apR[0]-1,apR[1]-2,...iR);x.lineTo(...oR);x.lineTo(sR[0]+2,sR[1]-1);
 x.quadraticCurveTo(sR[0]-2,sR[1]-5,...cR);x.quadraticCurveTo(nb[0],nb[1]+3,...cL);x.closePath();x.fill();x.strokeStyle='rgba(0,0,0,.16)';x.lineWidth=1;x.stroke();
 // sleeve hems + soft folds + collar band
 x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=1.2;[[oL,iL],[oR,iR]].forEach(([o,i])=>{const q=lerp(o,i,0),r=lerp(i,o,0);x.beginPath();x.moveTo(...lerp(q,r,0.05));x.lineTo(...lerp(q,r,0.95));x.stroke()});
 x.strokeStyle='rgba(0,0,0,.07)';x.lineWidth=2;for(const t of[0.3,0.55,0.75]){const p0=lerp(lerp(sL,sR,t),hem,0.35),p1=lerp(hL,hR,t+0.04);x.beginPath();x.moveTo(...p0);x.quadraticCurveTo(p0[0]+3,(p0[1]+p1[1])/2,p1[0],p1[1]-1);x.stroke()}
 x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=2;x.beginPath();x.moveTo(...cL);x.quadraticCurveTo(nb[0],nb[1]+3,...cR);x.stroke();
 // neck + head (back view): ears, short messy hair
 seg(x,[j.n[0],j.n[1]+6],[j.h[0],j.h[1]+10],7,7,SK);
 x.strokeStyle='rgba(0,0,0,.14)';x.lineWidth=1.4;x.beginPath();x.ellipse(j.n[0],j.n[1]+5,7,2.6,0,0,Math.PI);x.stroke();
 const hr=j.h;x.fillStyle=SK;[-1,1].forEach(s=>{x.beginPath();x.ellipse(hr[0]+s*16.5,hr[1]+5,3.4,5.5,0,0,7);x.fill()});
 x.fillStyle=HR;x.beginPath();x.ellipse(hr[0],hr[1],17,19,0,0,7);x.fill();
 x.fillStyle=shade(HR,1.35);for(let i=0;i<9;i++){const an=-Math.PI*0.95+i*Math.PI*0.24,r=17;x.beginPath();x.moveTo(hr[0]+Math.cos(an)*r*0.6,hr[1]+Math.sin(an)*r*0.6);x.lineTo(hr[0]+Math.cos(an+0.15)*(r+3.2),hr[1]+Math.sin(an+0.15)*(r+3.2));x.lineTo(hr[0]+Math.cos(an+0.3)*r*0.75,hr[1]+Math.sin(an+0.3)*r*0.75);x.fill()}
 x.strokeStyle=shade(HR,0.62);x.lineWidth=1.3;x.lineCap='round';[[-9,-12,-3,-2,-8,8],[-2,-15,3,-4,-1,9],[6,-13,9,-2,5,10],[11,-6,13,3,10,11],[-13,-4,-12,4,-11,11]].forEach(q=>{x.beginPath();x.moveTo(hr[0]+q[0],hr[1]+q[1]);x.quadraticCurveTo(hr[0]+q[2],hr[1]+q[3],hr[0]+q[4],hr[1]+q[5]);x.stroke()});
 x.fillStyle=shade(HR,0.9);[[-6,16],[0,17],[6,16]].forEach(q=>{x.beginPath();x.moveTo(hr[0]+q[0]-3,hr[1]+12);x.lineTo(hr[0]+q[0],hr[1]+q[1]+2);x.lineTo(hr[0]+q[0]+3,hr[1]+12);x.fill()});
 x.fillStyle=shade(HR,0.85);x.beginPath();x.ellipse(hr[0],hr[1]+14,13,4.5,0,0,Math.PI);x.fill()}
const C={};
function sheet(o){const k=JSON.stringify(o);if(C[k])return C[k];const c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d');
 for(let f=0;f<4;f++){x.save();x.translate(f*203,0);const bx=f<2?(f?72:62):88;x.translate(bx,292);x.scale(K.sc,K.sc);x.translate(-bx,-292);x.lineJoin='round';frame(x,f,o);x.restore()}
 return C[k]=c}
K.sheet=sheet;
})();
