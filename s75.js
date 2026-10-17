// s75 (Kirk's freeze exception, Oct 17): LEGEND CELEBRATION v2, the approved "disco dance battle" look.
// A made 80-yard Legend kick in CLASSIC: 10 s opening ON THE FIELD (the stadium the kick was made in: your kicker dances
// standing next to your mascot, loud crowd roar, the stadium shakes), a purple fade into the club, then a ~45 s
// breakdance battle in a purple neon disco club. Pairs from all 8 team kickers face off in the middle; in each pair one
// shows off a power move or freeze while the other reacts, then they swap with a new move. 17-move pool, no move twice
// in a run, order randomized every time and never the same as the previous run. All 8 mascots cheer in the back.
// Plain helmets (no logos, decals or stars). No goalpost, HUD, score or text. Tap to skip after 2 s, then a brief SHARE,
// then the run is saved and the player goes home. Reduced Motion and Flash-free calm the lights and spins.
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t,now=()=>performance.now()/1000,PI=Math.PI,S=Math.sin,C=Math.cos;
const RMo=()=>LS.fgfRM==='1',FF=()=>LS.fgfNoFlash==='1'||!!(window.FGF_CF&&FGF_CF.ff);
const OPEN=10,PAIR=11.25,NP=4,DUR=OPEN+PAIR*NP,SKIP=2,SHR=3.2,BPM=126,BEAT=60/BPM;
let LG=null;window.FGF_LGCEL=()=>LG;
const E=t=>t<0?0:t>1?1:t,sm=t=>{t=E(t);return t*t*(3-2*t)},lerp=(a,b,k)=>a+(b-a)*k;
// ---------- uniforms (from the team kicker art), plain helmets ----------
const UNI=[ // jersey, pants, trim, helmet, socks
 ['#5b2a9e','#5b2a9e','#f2c230','#5b2a9e','#5b2a9e'],
 ['#0f8f8c','#0f8f8c','#ff6f4f','#cfd6de','#0f8f8c'],
 ['#2a2a2a','#2a2a2a','#ff7a1a','#2a2a2a','#2a2a2a'],
 ['#0f6b3a','#0f6b3a','#f2c230','#0f6b3a','#0f6b3a'],
 ['#c9a46a','#c9a46a','#c0392b','#c9a46a','#c0392b'],
 ['#6e1a2b','#dfe1e6','#a0a0a8','#d8dce2','#6e1a2b'],
 ['#7a1730','#e6e7eb','#c8ccd2','#7a1730','#7a1730'],
 ['#1b2a5a','#f2f2f2','#ffffff','#1b2a5a','#1b2a5a']];
const SKIN=['#f1c7a1','#8d5524','#d9a066','#5a3420','#e8b48a','#6b3e22','#c68642','#3f2416'];
const num=ti=>{try{return NUMS[ti]}catch(e){return [7,5,3,9,2,6,4,8][ti]}};
const shd=(h,k)=>{const n=parseInt(h.slice(1),16);const r=Math.round(((n>>16)&255)*k),g=Math.round(((n>>8)&255)*k),b=Math.round((n&255)*k);return'rgb('+Math.min(255,r)+','+Math.min(255,g)+','+Math.min(255,b)+')'};
// ---------- poses: angles in radians, V(a)=(sin a,-cos a): 0 = up, clockwise. Torso T; limbs relative to torso (PI = hanging down) ----------
const K0={mn:0.3,nc:0,T:0.04,sF:PI+0.28,eF:-0.5,sN:PI-0.22,eN:-0.6,hF:PI+0.1,kF:0.06,hN:PI-0.1,kN:0.08,fF:0,fN:0,nk:0,air:0,dx:0,sx:1,sw:0,bl:0};
const P=o=>Object.assign({},K0,o);
const blend=(a,b,k)=>{const o={};for(const q in K0)o[q]=lerp(a[q],b[q],k);o.sw=k<0.5?a.sw:b.sw;return o};
const sp=(t,f)=>t*PI*2*f; // spin phase
const MOVES={
 headspin:(p,t,rm)=>{const r=sp(t,rm?0.9:2.1),open=sm((p-0.12)/0.2);return P({T:PI,nk:0,sF:lerp(0.55,PI/2,open),eF:lerp(0.9,0,open),sN:lerp(-0.55,-PI/2,open),eN:lerp(-0.9,0,open),hF:PI+0.5,kF:0,hN:PI-0.5,kN:0,fF:0.3,fN:-0.3,sx:C(r),sw:C(r)<0?1:0,bl:open})},
 windmill:(p,t,rm)=>{const r=sp(t,rm?0.7:1.5),c=PI+0.75+0.35*S(r),s2=0.55+0.35*C(r);return P({T:PI/2+0.2*S(r),nk:0.3,sF:PI/2+0.4*S(r),eF:0.6,sN:PI/2+0.2-0.4*S(r),eN:0.4,hF:c+s2,kF:0,hN:c-s2,kN:0,sw:S(r)>0?1:0,bl:1,sx:0.75+0.25*C(r)})},
 flare:(p,t,rm)=>{const r=sp(t,rm?0.6:1.3);return P({T:-0.5+0.12*S(r*2),sF:PI+0.6,eF:0,sN:PI+0.4,eN:0,hF:PI-1.05+0.45,kF:0,hN:PI-1.05-0.25,kN:0,fF:0.4,fN:0.4,nk:0.3,mn:0.55,air:0.03+0.04*Math.abs(S(r)),sx:C(r),sw:C(r)<0?1:0,bl:1})},
 airchair:(p,t)=>{const w=0.03*S(t*3);return P({T:-1.15+w,sN:PI-0.15,eN:1.25,sF:-0.3,eF:-0.5,hF:PI-2.4,kF:1.0,hN:PI-2.1,kN:1.3,nk:0.7,fF:0.3,fN:0.3,nc:1})},
 baby:(p,t)=>{const w=0.03*S(t*3);return P({T:PI*0.72+w,nk:-0.2,sN:PI-PI*0.72-0.25,eN:-0.9,sF:PI-PI*0.72+0.25,eF:-1.0,hF:PI-1.1,kF:1.9,hN:PI-1.5,kN:2.1,fF:0.5,fN:0.4})},
 turtle:(p,t,rm)=>{const r=sp(t,rm?0.5:1.1);return P({T:PI/2+0.08,nk:-0.3,sN:PI/2-0.15,eN:1.5,sF:PI/2+0.15,eF:1.5,hF:PI-1.0,kF:2.1,hN:PI-1.2,kN:2.2,air:0.02,sx:C(r),sw:C(r)<0?1:0,bl:0.6})},
 handstand:(p,t)=>{const sc=0.35*S(t*2.4);return P({T:PI+0.05*S(t*2),sF:0.08,eF:0,sN:-0.08,eN:0,hF:PI+0.12+sc,kF:0,hN:PI-0.12-sc,kN:0,fF:0.6,fN:0.6,nk:0.4})},
 hollowback:(p,t)=>{const w=0.04*S(t*2.5);return P({T:PI+0.55+w,sF:-0.45,eF:0,sN:-0.6,eN:0,hF:PI+0.85,kF:0.55,hN:PI+0.65,kN:0.75,nk:0.5,fF:0.5,fN:0.5})},
 sixstep:(p,t,rm)=>{const r=sp(t,rm?0.6:1.2);return P({T:0.95+0.1*S(r),sN:PI-0.95,eN:0,sF:PI-1.6+0.5*S(r),eF:-0.6,hN:PI-0.9+1.0*S(r),kN:1.3+0.7*C(r),hF:PI-0.9+1.0*S(r+PI),kF:1.3+0.7*C(r+PI),nk:-0.5,sx:C(r*0.5),sw:C(r*0.5)<0?1:0})},
 backspin:(p,t,rm)=>{const r=sp(t,rm?0.8:1.9);return P({T:-PI/2+0.15,nk:0.4,sF:PI-1.9,eF:-1.2,sN:PI-1.7,eN:-1.1,hF:PI-1.7,kF:2.1,hN:PI-1.5,kN:2.2,fF:0.4,fN:0.4,sx:C(r),sw:C(r)<0?1:0,bl:0.8})},
 kipup:(p,t)=>{if(p<0.45){const k=sm(p/0.45);return P({T:-PI/2-0.25*k,nk:0.6,sF:PI-0.6-k*0.9,eF:-1.6*k,sN:PI-0.5-k*0.9,eN:-1.6*k,hF:PI-1.2-k*0.9,kF:0.4+k*0.3,hN:PI-1.3-k*0.9,kN:0.3+k*0.3,fF:0.3,fN:0.3})}
  if(p<0.68){const k=sm((p-0.45)/0.23);return blend(P({T:-PI/2-0.25,nk:0.6,sF:PI-1.5,eF:-1.6,sN:PI-1.4,eN:-1.6,hF:PI-2.1,kF:0.7,hN:PI-2.2,kN:0.6}),P({T:0.1,sF:PI*0.3,eF:-0.3,sN:-PI*0.25,eN:-0.3,hF:PI+0.25,kF:0.6,hN:PI-0.3,kN:0.7,air:0.28}),k)}
  const k=sm((p-0.68)/0.12),hit=sm((p-0.8)/0.1);return blend(P({T:0.25,sF:PI-0.4,eF:-1.2,sN:PI-0.3,eN:-1.3,hF:PI-0.55,kF:1.0,hN:PI+0.35,kN:0.9}),P({T:0.02,sF:-0.25,eF:0,sN:0.15,eN:-0.2,hF:PI+0.18,kF:0.05,hN:PI-0.18,kN:0.05}),hit*(1-k*0))},
 n1990:(p,t,rm)=>{const r=sp(t,rm?0.9:2.3),open=sm((p-0.1)/0.2);return P({T:PI+0.08,sN:-0.04,eN:0,sF:lerp(0.1,PI*0.55,open),eF:-0.2,hF:PI+0.06,kF:0,hN:PI-0.06,kN:0,fF:0.6,fN:0.6,nk:0.4,sx:C(r),sw:C(r)<0?1:0,bl:open})},
 swipe:(p,t,rm)=>{const r=sp(t,rm?0.4:0.85),k=0.5+0.5*S(r);return blend(P({T:-1.15,nk:0.5,sF:PI+1.15+0.1,eF:0,sN:PI+1.15-0.1,eN:0,hF:PI-1.6,kF:0.9,hN:PI-1.2,kN:1.1,air:0.03}),P({T:1.25,nk:-0.4,sF:PI-1.25,eF:0,sN:PI-1.15,eN:0,hF:PI+1.0,kF:0.3,hN:PI+0.6,kN:0.2,air:0.12}),k)},
 elbow:(p,t)=>{const w=0.03*S(t*2.6);return P({T:PI*0.6+w,nk:-0.4,sN:PI-PI*0.6,eN:-1.55,sF:PI-PI*0.6+0.4,eF:-0.6,hF:PI+0.15,kF:0,hN:PI-0.1,kN:0,fF:0.6,fN:0.6})},
 airflare:(p,t,rm)=>{const r=sp(t,rm?0.6:1.4),a=S(r);return P({T:PI*0.55+0.35*a,nk:-0.3,sN:PI-PI*0.55+0.2*a,eN:0,sF:PI-PI*0.55-0.3+0.6*Math.max(0,-a),eF:-0.3,hF:PI+0.7+0.4*C(r),kF:0,hN:PI-0.7+0.4*C(r),kN:0,air:0.06+0.12*Math.abs(a),sx:C(r),sw:C(r)<0?1:0,bl:1})},
 helicopter:(p,t,rm)=>{const r=sp(t,rm?0.6:1.4);return P({T:0.7,nk:-0.4,sN:PI-0.7-0.15,eN:0,sF:PI-0.45,eF:0,hN:PI-1.75,kN:2.6,hF:1.0,kF:0,fF:0.3,air:0,sx:C(r),sw:C(r)<0?1:0,bl:0.8})},
 toprock:(p,t,rm)=>{const b=t/BEAT,ph=S(b*PI),x=Math.abs(S(b*PI*0.5));return P({T:0.12+0.08*ph,sF:PI*0.55+0.6*ph,eF:-1.3,sN:PI*0.8-0.6*ph,eN:-1.5,hF:PI+0.3*ph,kF:0.25+0.25*x,hN:PI-0.3*ph,kN:0.25+0.25*(1-x),fF:0.2*ph,fN:-0.2*ph,nk:0.15*ph,dx:0.06*ph})}};
const MV=Object.keys(MOVES);
// reactions (always standing, never one of the show-off moves)
const REACT={
 point:(t)=>{const b=S(t/BEAT*PI);return P({T:0.08,sN:PI*0.55,eN:-0.05,sF:PI*0.88,eF:-1.9,hF:PI+0.16,kF:0.12+0.05*b,hN:PI-0.14,kN:0.12+0.05*b,nk:0.1*b})},
 wow:(t)=>{const b=S(t*5);return P({T:-0.12+0.04*b,sF:0.15,eF:-2.4,sN:-0.15,eN:-2.3,hF:PI+0.16,kF:0.14,hN:PI-0.16,kN:0.14,nk:-0.25})},
 cross:(t)=>{const b=S(t/BEAT*PI);return P({T:-0.05,sF:PI-0.5,eF:-2.2,sN:PI-0.25,eN:-2.3,hF:PI+0.18,kF:0.05,hN:PI-0.18,kN:0.05,nk:0.25*b})},
 clap:(t)=>{const b=Math.abs(S(t/BEAT*PI*2));return P({T:0.06,sF:PI*0.6+0.25*b,eF:-1.0-0.4*b,sN:PI*0.6+0.25*b,eN:-1.0-0.4*b,hF:PI+0.15,kF:0.15+0.1*b,hN:PI-0.15,kN:0.15+0.1*b,nk:0.1})},
 nah:(t)=>{const w=S(t*9);return P({T:-0.08,sN:PI*0.45,eN:-1.4+0.35*w,sF:PI+0.3,eF:-1.9,hF:PI+0.12,kF:0.06,hN:PI-0.14,kN:0.06,nk:-0.25*S(t*6)})},
 hype:(t)=>{const b=Math.abs(S(t/BEAT*PI));return P({T:0.02,sF:-0.3+0.6*b,eF:-0.6,sN:PI*0.75,eN:-1.8,hF:PI+0.22,kF:0.35*b,hN:PI-0.22,kN:0.35*b,nk:-0.1})},
 shrug:(t)=>{const b=Math.max(0,S(t*2.4));return P({T:0,sF:PI-0.7,eF:-1.4+0.3*b,sN:PI-0.6,eN:-1.4+0.3*b,hF:PI+0.12,kF:0.05,hN:PI-0.12,kN:0.05,nk:0.3*b,air:0})},
 rock:(t)=>{const b=S(t/BEAT*PI),x=Math.abs(b);return P({T:0.1+0.08*x,sF:PI-0.6+0.4*b,eF:-1.5,sN:PI-0.4-0.4*b,eN:-1.6,hF:PI+0.18,kF:0.25*x,hN:PI-0.18,kN:0.25*x,nk:0.2*x})}};
const RV=Object.keys(REACT);
// opening: standing dance only (both feet on the floor)
function openPose(t){t=t%5.1;const b=t/BEAT,x=Math.abs(S(b*PI)),y=S(b*PI);
 if(t<1.7)return P({T:0.06+0.06*x,sF:PI-0.9+0.5*y,eF:-1.4,sN:PI-0.7-0.5*y,eN:-1.5,hF:PI+0.18,kF:0.18+0.22*x,hN:PI-0.18,kN:0.18+0.22*x,nk:0.15*x,dx:0.04*y});
 if(t<3.4)return P({T:-0.05+0.1*y,sF:-0.15+0.3*y,eF:-0.3,sN:PI*0.45,eN:-0.4+0.4*x,hF:PI+0.22,kF:0.12+0.2*x,hN:PI-0.22,kN:0.12+0.2*x,nk:0.2*y,dx:0.05*S(b*PI*0.5)});
 return P({T:0.04,sF:-0.25+0.35*x,eF:-0.25,sN:0.25-0.35*x,eN:-0.25,hF:PI+0.2,kF:0.15+0.25*x,hN:PI-0.2,kN:0.15+0.25*x,nk:-0.1+0.2*y,dx:0.06*y})}
// ---------- skeleton ----------
const L_={tor:0.29,neck:0.125,ua:0.15,fa:0.14,th:0.2,sh:0.2,ft:0.09,hr:0.13};
const V=(a,l)=>[S(a)*l,-C(a)*l],ad=(p,v)=>[p[0]+v[0],p[1]+v[1]];
function joints(o){const T=o.T,p=[0,0],n=ad(p,V(T,L_.tor)),hd=ad(n,V(T+o.nk,L_.neck)),s=ad(n,V(T,-0.025));
 const arm=(sa,e)=>{const el=ad(s,V(T+sa,L_.ua));return[el,ad(el,V(T+sa+e,L_.fa))]};
 const leg=(h,k,f)=>{const kn=ad(p,V(T+h,L_.th)),an=ad(kn,V(T+h+k,L_.sh));return[kn,an,ad(an,V(T+h+k-PI/2+f,L_.ft))]};
 const J={p,n,hd,s,aF:arm(o.sF,o.eF),aN:arm(o.sN,o.eN),lF:leg(o.hF,o.kF,o.fF),lN:leg(o.hN,o.kN,o.fN)};
 const ys=[hd[1]+L_.hr,J.aF[1][1]+0.03,J.aN[1][1]+0.03,J.aF[0][1]+0.035,J.aN[0][1]+0.035,J.lF[1][1]+0.03,J.lN[1][1]+0.03,J.lF[2][1]+0.025,J.lN[2][1]+0.025,J.lF[0][1]+0.045,J.lN[0][1]+0.045].concat(o.nc>0.5?[]:[p[1]+0.075,s[1]+0.08]);
 J.lift=-Math.max(...ys);return J}
// ---------- kicker drawing (cartoon, outlined, plain helmet) ----------
const OL='#14081f';
function seg(a,b,w,c){ctx.strokeStyle=OL;ctx.lineWidth=w+0.022;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
const mix=(a,b,k)=>[lerp(a[0],b[0],k),lerp(a[1],b[1],k)];
function drawArm(J,a,sk,u,dk){const[el,hn]=a,s=J.s,k=dk?0.78:1,mid=mix(s,el,0.55);seg(s,el,0.098,shd(sk,k));seg(s,mid,0.112,shd(u[0],k));
 // sleeve stripes
 ctx.strokeStyle=shd(u[2],k);ctx.lineWidth=0.112;ctx.beginPath();const s1=mix(s,el,0.36),s2=mix(s,el,0.44);ctx.moveTo(s1[0],s1[1]);ctx.lineTo(s2[0],s2[1]);ctx.stroke();
 seg(el,hn,0.084,shd(sk,k));const w1=mix(el,hn,0.78),w2=mix(el,hn,0.9);ctx.strokeStyle=dk?'#c9c9c9':'#f4f4f4';ctx.lineWidth=0.09;ctx.beginPath();ctx.moveTo(w1[0],w1[1]);ctx.lineTo(w2[0],w2[1]);ctx.stroke();
 ctx.fillStyle=OL;ctx.beginPath();ctx.arc(hn[0],hn[1],0.056,0,7);ctx.fill();ctx.fillStyle=shd(sk,k);ctx.beginPath();ctx.arc(hn[0],hn[1],0.045,0,7);ctx.fill()}
function drawLeg(J,l,u,dk){const[kn,an,toe]=l,p=J.p,k=dk?0.78:1,cuff=mix(kn,an,0.18);seg(p,kn,0.13,shd(u[1],k));seg(kn,cuff,0.112,shd(u[1],k));seg(cuff,an,0.095,shd(u[4],k));
 const s1=mix(kn,an,0.42),s2=mix(kn,an,0.52);ctx.strokeStyle=shd(u[2],k);ctx.lineWidth=0.095;ctx.lineCap='butt';ctx.beginPath();ctx.moveTo(s1[0],s1[1]);ctx.lineTo(s2[0],s2[1]);ctx.stroke();ctx.lineCap='round';
 // pants stripe
 ctx.strokeStyle=shd(u[2],k*0.95);ctx.lineWidth=0.018;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(kn[0],kn[1]);ctx.stroke();
 seg(an,toe,0.075,dk?'#0a0a0a':'#161616');ctx.fillStyle='#e8e8e8';const st=mix(an,toe,0.5);ctx.beginPath();ctx.arc(st[0],st[1],0.008,0,7);ctx.fill()}
function drawTorso(J,o,u,n,mir){const p=J.p,nk=J.n,T=o.T,ux=C(T),uy=S(T);// perpendicular to torso
 const q=(c,w)=>[c[0]+ux*w,c[1]+uy*w],hp1=q(p,0.105),hp2=q(p,-0.1),w1=q(mix(p,nk,0.55),0.12),w2=q(mix(p,nk,0.55),-0.115),s1=q(nk,0.19),s2=q(nk,-0.17);
 ctx.fillStyle=u[0];ctx.strokeStyle=OL;ctx.lineWidth=0.022;ctx.beginPath();ctx.moveTo(hp1[0],hp1[1]);ctx.lineTo(w1[0],w1[1]);ctx.quadraticCurveTo(s1[0],s1[1],nk[0]+(s1[0]-nk[0])*0.5,nk[1]+(s1[1]-nk[1])*0.5);ctx.lineTo(nk[0]+(s2[0]-nk[0])*0.5,nk[1]+(s2[1]-nk[1])*0.5);ctx.quadraticCurveTo(s2[0],s2[1],w2[0],w2[1]);ctx.lineTo(hp2[0],hp2[1]);ctx.closePath();ctx.fill();ctx.stroke();
 // pants top + belt
 const b1=q(p,0.108),b2=q(p,-0.103),bt1=q(mix(p,nk,0.14),0.11),bt2=q(mix(p,nk,0.14),-0.105);ctx.fillStyle=u[1];ctx.beginPath();ctx.moveTo(b1[0],b1[1]);ctx.lineTo(bt1[0],bt1[1]);ctx.lineTo(bt2[0],bt2[1]);ctx.lineTo(b2[0],b2[1]);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.strokeStyle=shd(u[1],0.6);ctx.lineWidth=0.016;ctx.beginPath();ctx.moveTo(bt1[0],bt1[1]);ctx.lineTo(bt2[0],bt2[1]);ctx.stroke();
 // collar trim
 ctx.strokeStyle=u[2];ctx.lineWidth=0.02;ctx.beginPath();const c1=q(nk,0.05),c2=q(nk,-0.045);ctx.moveTo(c1[0],c1[1]);ctx.lineTo(c2[0],c2[1]);ctx.stroke();
 // number
 const c=mix(p,nk,0.6);ctx.save();ctx.translate(c[0],c[1]);ctx.rotate(T);ctx.scale(mir,1);ctx.font='900 0.15px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=0.018;ctx.strokeStyle=OL;ctx.strokeText(n+'',0,0.005);ctx.fillStyle=u[2]===u[0]?'#fff':u[2];ctx.fillText(n+'',0,0.005);ctx.restore()}
function drawHead(J,o,u,sk,back){const h=J.hd,a=o.T+o.nk,r=L_.hr;ctx.save();ctx.translate(h[0],h[1]);ctx.rotate(a);
 ctx.fillStyle=OL;ctx.beginPath();ctx.arc(0,0,r+0.011,0,7);ctx.fill();
 if(!back){ctx.fillStyle=sk;ctx.beginPath();ctx.ellipse(r*0.38,r*0.28,r*0.62,r*0.6,0,0,7);ctx.fill()}
 ctx.fillStyle=u[3];ctx.beginPath();if(back){ctx.arc(0,0,r,0,7)}else{ctx.arc(0,0,r,-PI*0.05,PI*1.02,true);ctx.lineTo(-r*0.15,r*0.55);ctx.quadraticCurveTo(r*0.25,r*0.2,r*0.55,-r*0.05);ctx.closePath()}ctx.fill();
 const g=ctx.createRadialGradient(-r*0.3,-r*0.45,0,-r*0.3,-r*0.45,r*0.9);g.addColorStop(0,'rgba(255,255,255,0.55)');g.addColorStop(0.5,'rgba(255,255,255,0.08)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();
 ctx.fillStyle='rgba(0,0,0,0.35)';ctx.beginPath();ctx.arc(-r*0.12,r*0.12,r*0.13,0,7);ctx.fill();
 if(!back){ctx.strokeStyle='#9ea4ac';ctx.lineWidth=0.017;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(r*0.2,r*0.05);ctx.quadraticCurveTo(r*1.12,-r*0.02,r*1.0,r*0.55);ctx.moveTo(r*0.15,r*0.42);ctx.quadraticCurveTo(r*0.8,r*0.42,r*1.02,r*0.3);ctx.moveTo(r*0.72,r*0.0);ctx.lineTo(r*0.68,r*0.72);ctx.stroke();
  ctx.fillStyle='#1a0f08';ctx.beginPath();ctx.arc(r*0.62,r*0.2,r*0.07,0,7);ctx.fill()}
 ctx.restore()}
function kicker(o,ti,x,fy,sc,mir){const J=joints(o),u=UNI[ti],sk=SKIN[ti],sx=o.sx,sxv=Math.abs(sx)<o.mn?o.mn*(sx<0?-1:1):sx,lift=J.lift-o.air;
 // spins: foreshorten the limbs around the spin axis (pelvis), the body keeps its width
 if(sxv!==1){const f=q=>{q[0]*=sxv};[J.n,J.hd,J.s,J.aF[0],J.aF[1],J.aN[0],J.aN[1],J.lF[0],J.lF[1],J.lF[2],J.lN[0],J.lN[1],J.lN[2]].forEach(f)}
 const Te=Math.atan2(J.n[0]-J.p[0],-(J.n[1]-J.p[1])),He=Math.atan2(J.hd[0]-J.n[0],-(J.hd[1]-J.n[1])),o2=Object.assign({},o,{T:Te,nk:He-Te});
 ctx.save();ctx.globalAlpha=0.38*(1-Math.min(0.6,o.air*2.5));ctx.fillStyle='#0a0216';ctx.beginPath();ctx.ellipse(x+o.dx*sc*mir,fy,sc*0.28,sc*0.05,0,0,7);ctx.fill();ctx.restore();
 ctx.save();ctx.translate(x+o.dx*sc*mir,fy+lift*sc);ctx.scale(sc*mir,sc);ctx.lineCap='round';ctx.lineJoin='round';
 const back=sxv<0.35,swap=(o.sw?1:0)^(sxv<0?1:0);const far=swap?['aN','lN']:['aF','lF'],near=swap?['aF','lF']:['aN','lN'];
 if(o.bl>0.05&&!LG.rm){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=0.3*o.bl;ctx.strokeStyle=u[2]==='#ffffff'?'#d8b8ff':u[2];ctx.lineWidth=0.025;
  for(const f of [J.lF[2],J.lN[2]]){const R=Math.max(Math.abs(J.lF[2][0]),Math.abs(J.lN[2][0]))/Math.max(0.12,Math.abs(sxv));ctx.beginPath();ctx.ellipse(0,f[1],Math.max(0.06,R+0.06),0.045,0,0,PI*2);ctx.stroke()}ctx.restore()}
 drawArm(J,J[far[0]],sk,u,1);drawLeg(J,J[far[1]],u,1);drawTorso(J,o2,u,num(ti),mir);drawLeg(J,J[near[1]],u,0);drawHead(J,o2,u,sk,back);drawArm(J,J[near[0]],sk,u,0);
 ctx.restore()}
// ---------- the club (cached static layer + live lights) ----------
let BGC=null,BGK='';
function stars(n,seed){const a=[];let s=seed;const r=()=>(s=(s*16807)%2147483647)/2147483647;for(let i=0;i<n;i++)a.push([r(),r(),r(),r()]);return a}
const ST=stars(260,9137),GL=stars(26,4441),SPK=stars(48,771);
function geo(){const yH=H*0.43;return{yH,fy:H*0.86,ax:W/2,arx:Math.min(W*0.36,H*0.2),ary:H*0.15,bx:W*0.19,by:H*0.12,br:Math.min(W*0.115,H*0.058)}}
function staticBG(){const k=W+'x'+H+'x'+(window.devicePixelRatio||1);if(BGC&&BGK===k)return BGC;BGK=k;const dpr=Math.min(2,window.devicePixelRatio||1);BGC=document.createElement('canvas');BGC.width=W*dpr;BGC.height=H*dpr;const x=BGC.getContext('2d');x.scale(dpr,dpr);const G=geo();
 let g=x.createLinearGradient(0,0,0,G.yH);g.addColorStop(0,'#0d0322');g.addColorStop(0.55,'#2a0a55');g.addColorStop(1,'#4a1488');x.fillStyle=g;x.fillRect(0,0,W,G.yH+2);
 for(const s of ST){const y=s[1]*G.yH*1.02;x.fillStyle='rgba(255,'+(220+s[2]*35|0)+',255,'+(0.25+s[3]*0.6)+')';x.fillRect(s[0]*W,y,s[2]<0.85?1:1.6,s[2]<0.85?1:1.6)}
 // back wall glow behind the arch
 g=x.createRadialGradient(G.ax,G.yH,0,G.ax,G.yH,G.arx*1.4);g.addColorStop(0,'rgba(170,70,255,0.55)');g.addColorStop(1,'rgba(120,40,220,0)');x.fillStyle=g;x.fillRect(0,0,W,G.yH);
 // arch frame
 x.lineWidth=Math.max(6,W*0.022);x.strokeStyle='#3b1a3a';x.beginPath();x.ellipse(G.ax,G.yH,G.arx,G.ary,0,PI,2*PI);x.stroke();x.lineWidth=2;x.strokeStyle='#d9a14a';x.beginPath();x.ellipse(G.ax,G.yH,G.arx+x.lineWidth*0,G.ary,0,PI,2*PI);x.stroke();
 // stage platform
 x.fillStyle='#2a0f4a';x.beginPath();x.ellipse(G.ax,G.yH,G.arx*1.25,H*0.014,0,0,7);x.fill();x.strokeStyle='rgba(230,150,255,0.8)';x.lineWidth=1.5;x.stroke();
 // pink neon frame (right wall)
 const fx=W*0.79,fy2=H*0.2,fw=W*0.17,fh=H*0.1;x.save();x.shadowColor='#ff3fd0';x.shadowBlur=14;x.strokeStyle='#ff6ae0';x.lineWidth=3;x.strokeRect(fx,fy2,fw,fh);x.lineWidth=1.5;x.strokeRect(fx+5,fy2+5,fw-10,fh-10);x.restore();
 // floor
 g=x.createLinearGradient(0,G.yH,0,H);g.addColorStop(0,'#3c0f78');g.addColorStop(0.5,'#5a148f');g.addColorStop(1,'#2a0752');x.fillStyle=g;x.fillRect(0,G.yH,W,H-G.yH);
 g=x.createRadialGradient(W/2,H*0.84,0,W/2,H*0.84,W*0.75);g.addColorStop(0,'rgba(255,170,60,0.75)');g.addColorStop(0.3,'rgba(255,90,140,0.45)');g.addColorStop(0.7,'rgba(160,60,255,0.15)');g.addColorStop(1,'rgba(120,40,220,0)');x.fillStyle=g;x.fillRect(0,G.yH,W,H-G.yH);
 for(const [cx,cy,c] of [[0.2,0.9,'rgba(60,255,140,0.28)'],[0.8,0.88,'rgba(60,170,255,0.28)'],[0.5,0.97,'rgba(255,240,90,0.25)']]){g=x.createRadialGradient(W*cx,H*cy,0,W*cx,H*cy,W*0.28);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,G.yH,W,H-G.yH)}
 for(const s of ST.slice(0,90)){x.fillStyle='rgba(255,230,255,'+(0.2+s[3]*0.4)+')';x.fillRect(s[0]*W,G.yH+s[1]*(H-G.yH),1.2,1.2)}
 // grid
 x.save();x.globalCompositeOperation='lighter';const vy=G.yH-H*0.32,line=(a,b,c,d)=>{x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke()};
 for(const [lw,al] of [[5,0.18],[1.6,0.85]]){x.lineWidth=lw;x.strokeStyle='rgba(255,70,235,'+al+')';
  for(let i=-9;i<=9;i++){const bx=W/2+i*W*0.17,t=(G.yH-vy)/(H-vy),tx=W/2+(bx-W/2)*t;line(tx,G.yH,bx,H)}
  for(let j=1;j<=13;j++){const s=Math.pow(j/13,1.85),y=G.yH+(H-G.yH)*s;x.strokeStyle='rgba('+(255-j*6)+','+(70+j*4)+',235,'+al+')';line(0,y,W,y)}}
 x.restore();
 // horizon glow
 g=x.createLinearGradient(0,G.yH-6,0,G.yH+18);g.addColorStop(0,'rgba(255,120,255,0)');g.addColorStop(0.4,'rgba(255,120,255,0.5)');g.addColorStop(1,'rgba(255,120,255,0)');x.fillStyle=g;x.fillRect(0,G.yH-6,W,24);
 return BGC}
const LC=['#ff3fd8','#4a7dff','#ffa53a','#ff5ab0','#b44dff','#ff3fd8','#4ad0ff','#ffa53a','#ff5ab0'];
function rgba(h,a){const n=parseInt(h.slice(1),16);return'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')'}
function club(a,on){const L=LG,G=geo(),bg=staticBG(),calm=L.rm||L.ff,beat=(a/BEAT)%1,pulse=calm?0.5:Math.pow(1-beat,2);
 ctx.drawImage(bg,0,0,W,H);
 // twinkles
 for(const s of GL){const tw=calm?0.6:0.5+0.5*S(a*(2+s[2]*3)+s[3]*9);const x=s[0]*W,y=s[1]*G.yH,r=1.5+s[2]*3*tw;ctx.fillStyle='rgba(255,240,255,'+(0.35+0.6*tw)+')';ctx.beginPath();ctx.moveTo(x,y-r*2);ctx.lineTo(x+r*0.4,y);ctx.lineTo(x,y+r*2);ctx.lineTo(x-r*0.4,y);ctx.closePath();ctx.moveTo(x-r*2,y);ctx.lineTo(x,y+r*0.4);ctx.lineTo(x+r*2,y);ctx.lineTo(x,y-r*0.4);ctx.fill()}
 ctx.save();ctx.globalCompositeOperation='lighter';
 // floor tiles lighting up on the beat
 if(!L.ff){const vy=G.yH-H*0.32,bi=Math.floor(a/BEAT);for(let k=0;k<(L.rm?3:7);k++){const h=((bi*7919+k*104729)%9973)/9973,h2=((bi*3571+k*7907)%9973)/9973,i=Math.floor(h*14)-7,j=1+Math.floor(h2*12);
  const y0=G.yH+(H-G.yH)*Math.pow(j/13,1.85),y1=G.yH+(H-G.yH)*Math.pow((j+1)/13,1.85),f=y=>(y-vy)/(H-vy),xa=y=>W/2+(i*W*0.17)*f(y),xb=y=>W/2+((i+1)*W*0.17)*f(y);
  ctx.fillStyle=rgba(LC[(bi+k)%LC.length],(L.rm?0.12:0.22)*(0.4+0.6*pulse));ctx.beginPath();ctx.moveTo(xa(y0),y0);ctx.lineTo(xb(y0),y0);ctx.lineTo(xb(y1),y1);ctx.lineTo(xa(y1),y1);ctx.fill()}}
 // spotlight beams
 const n=9;for(let i=0;i<n;i++){const lx=W*(0.04+i*0.115),ly=H*0.012,sw=calm?0:S(a*0.7+i*1.3)*0.35,ang=(lx<W/2?-1:1)*-0.25+sw+(i%2?0.12:-0.12),len=H*0.75,k=on*(calm?0.6:0.55+0.45*S(a*1.5+i));
  ctx.save();ctx.translate(lx,ly);ctx.rotate(ang);const g=ctx.createLinearGradient(0,0,0,len);g.addColorStop(0,rgba(LC[i],0.32*k));g.addColorStop(1,rgba(LC[i],0));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-5,0);ctx.lineTo(5,0);ctx.lineTo(len*0.13,len);ctx.lineTo(-len*0.13,len);ctx.fill();ctx.restore();
  const rg=ctx.createRadialGradient(lx,ly,0,lx,ly,16);rg.addColorStop(0,rgba('#ffffff',0.9*Math.max(0.3,on)));rg.addColorStop(0.3,rgba(LC[i],0.8*Math.max(0.3,on)));rg.addColorStop(1,rgba(LC[i],0));ctx.fillStyle=rg;ctx.fillRect(lx-16,ly-16,32,32)}
 // arch marquee bulbs (chase)
 const nb=26;for(let r2=0;r2<2;r2++)for(let i=0;i<=nb;i++){const t=PI+PI*i/nb,rx=G.arx*(r2?0.9:1.0),ry=G.ary*(r2?0.88:1.0),x=G.ax+C(t)*rx,y=G.yH+S(t)*ry,lit=calm?0.8:((i+Math.floor(a*8)+r2)%3===0?1:0.45);
  const rg=ctx.createRadialGradient(x,y,0,x,y,7);rg.addColorStop(0,'rgba(255,240,200,'+(lit*on)+')');rg.addColorStop(0.35,'rgba(255,170,90,'+(0.6*lit*on)+')');rg.addColorStop(1,'rgba(255,120,60,0)');ctx.fillStyle=rg;ctx.fillRect(x-7,y-7,14,14)}
 ctx.restore();
 // disco ball
 discoBall(a,G,on)}
function discoBall(a,G,on){const L=LG,x=G.bx,y=G.by,r=G.br,rot=a*(L.rm?0.3:0.8);
 ctx.strokeStyle='#8a7aa8';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,y-r);ctx.stroke();
 ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();let g=ctx.createRadialGradient(x-r*0.3,y-r*0.3,0,x,y,r);g.addColorStop(0,'#e9d8ff');g.addColorStop(0.6,'#8a64c8');g.addColorStop(1,'#3a2266');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);
 const bands=9;for(let j=0;j<bands;j++){const la=-PI/2+PI*(j+0.5)/bands,cy=y+S(la)*r,rr=C(la)*r,cnt=Math.max(4,Math.round(18*C(la))),th=r*PI/bands*0.9;
  for(let i=0;i<cnt;i++){const lo=(i/cnt)*PI*2+rot,cx=C(lo);if(S(lo)<0)continue;const px=x+cx*rr,w=Math.max(0.8,S(lo)*rr*PI*2/cnt*0.85),sh=((i*31+j*17+Math.floor(a*6))%7)/7;ctx.fillStyle=sh>0.8?'rgba(255,255,255,0.95)':'rgba('+(170+sh*80|0)+','+(140+sh*90|0)+',255,'+(0.35+sh*0.5)+')';ctx.fillRect(px-w/2,cy-th/2,w,th)}}
 ctx.restore();ctx.strokeStyle='rgba(30,10,60,0.8)';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();
 ctx.save();ctx.globalCompositeOperation='lighter';g=ctx.createRadialGradient(x,y,r*0.6,x,y,r*2.2);g.addColorStop(0,'rgba(220,170,255,0.35)');g.addColorStop(1,'rgba(220,170,255,0)');ctx.fillStyle=g;ctx.fillRect(x-r*2.2,y-r*2.2,r*4.4,r*4.4);
 // light specks sweeping the room
 if(on>0.2)for(const s of SPK){const lo=s[0]*PI*2+rot*1.0,la=(s[1]-0.5)*1.6,px=W*0.5+C(lo)*W*0.7*C(la)+(x-W*0.5)*0.3,py=G.yH*0.2+(s[1]*1.6)*H*0.55;if(S(lo)<0)continue;ctx.fillStyle='rgba(255,'+(200+s[2]*55|0)+',255,'+(0.5*on*S(lo))+')';ctx.beginPath();ctx.arc(px,py,1.2+s[3]*1.8,0,7);ctx.fill()}
 ctx.restore()}
// ---------- mascots (approved mascot art) cheering in two rows ----------
function slots(){const G=geo(),r1=G.yH+H*0.07,r2=G.yH+H*0.125,h1=Math.min(H*0.11,W*0.22),h2=Math.min(H*0.125,W*0.25),out=[],bk=[0.2,0.4,0.6,0.8],fr=[0.11,0.37,0.63,0.89],ord=[0,4,1,5,2,6,3,7];
 for(let i=0;i<8;i++){const k=ord.indexOf(i),f=k%2;out.push({x:W*(f?fr:bk)[k>>1],fy:f?r2:r1,h:f?h2:h1,f})}return out}
function mascotAt(ti,x,fy,h,a,ph,al){if(!MSI.complete||!MSI.naturalWidth)return;const L=LG,b=((a/BEAT)+ph)%1,calm=L.rm;let oy=0,sy=1,rot=0;
 if(calm){oy=-Math.abs(S(a*2+ph*6))*h*0.03}else{const big=((Math.floor(a/BEAT)+ti)%4===0);oy=-Math.sin(b*PI)*h*(big?0.22:0.09);sy=1+(b<0.12?-0.08:0.03*S(b*PI));rot=S(a*2.2+ti)*0.08}
 ctx.save();ctx.globalAlpha=al*0.35;ctx.fillStyle='#0a0216';ctx.beginPath();ctx.ellipse(x,fy,h*0.28,h*0.045,0,0,7);ctx.fill();ctx.globalAlpha=al;
 ctx.translate(x,fy+oy);ctx.rotate(rot);ctx.scale(2-sy,sy);ctx.drawImage(MSI,ti*193,0,193,200,-h*0.48,-h,h*0.965,h);ctx.restore()}
// ---------- run sequence: randomized, never the same as last run ----------
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function makeSeq(me){let prev='';try{prev=LS.fgfLgSeq||''}catch(e){}let q,sig,n=0;
 do{const o=shuf([0,1,2,3,4,5,6,7].filter(i=>i!==me)),ord=[me].concat(o),pairs=[];for(let i=0;i<NP;i++)pairs.push(i?shuf([ord[i*2],ord[i*2+1]]):[ord[0],ord[1]]);
  const mv=shuf(MV.slice()).slice(0,NP*4),rc=[];let lr='';for(let i=0;i<NP*4;i++){let r;do{r=RV[Math.random()*RV.length|0]}while(r===lr);lr=r;rc.push(r)}
  q={pairs,mv,rc,first:pairs.map(()=>Math.random()<0.5?0:1)};sig=JSON.stringify([pairs,mv,q.first])}while(sig===prev&&++n<20);
 try{LS.fgfLgSeq=sig}catch(e){}return q}
// ---------- rewards moment: right after the Legend kick goes through (~2.8 s), then the celebration ----------
// Everything is already awarded by the normal kick hooks (coins, achievements, XP, quests, stats); this only shows it.
let RW=null,RC0=null;const RWD=2.8;
try{const oRs=result;result=function(){try{RC0={c:coins,s:score,ach:Object.assign({},typeof AD!=='undefined'?AD:{}),xp:+LS.fgfXP||0}}catch(e){RC0=null}return oRs.apply(this,arguments)}}catch(e){}
function pre(){const b=RC0||{c:coins,s:score,ach:{},xp:+LS.fgfXP||0};RW={t0:now(),c0:b.c,s0:b.s,ach0:b.ach,xp0:b.xp,tl:[],rm:RMo()};try{pendNext=null}catch(e){}msg=null;try{tone(660,990,0.22,0.08,'triangle')}catch(e){}}
function rwData(){const r=RW,lb=J('fgfLB',{})[mode]||[];let rank=1;for(const e of lb)if(e.s>score)rank++;
 // trophies newly in the save (authoritative: toasts can be cleared by other popups), then any other unlock toasts
 const ach=[];try{const tro=typeof TRO!=='undefined'?TRO:null;for(const id in AD){if(r.ach0[id])continue;const q=tro&&tro.find(x=>x[1]===id);if(q)ach.push([['🥉','🥈','🥇','💎'][q[0]]||'🏅',T_(q[2]),q[4]]);else{const a=ACH.find(x=>x[0]===id);if(a)ach.push(['🎖️',T_(a[1]),a[3]])}}}catch(e){}
 const extra=r.tl.filter(s=>!ach.some(a=>s.includes(a[1])));
 let lv=null,ti='';try{lv=FGF_LV().l;ti=FGF_TITLE()}catch(e){}
 return{coins:Math.max(0,coins-r.c0),pts:Math.max(0,score-r.s0),score,rank:rank<=25?rank:0,lv,ti,xp:Math.max(0,(+LS.fgfXP||0)-r.xp0),ach,extra}}
function grabToasts(){const r=RW;try{const take=s=>{if(typeof s==='string'&&!r.tl.includes(s))r.tl.push(s)};while(toastQ.length)take(toastQ.shift());if(S3.tq){take(S3.tq);S3.tq=null;toastT=0}}catch(e){}}
function rwRow(ic,label,val,y,x0,w,fs,al){ctx.globalAlpha=al;ctx.textBaseline='middle';ctx.font=(fs+2)+'px system-ui';ctx.textAlign='left';ctx.fillStyle='#fff';ctx.fillText(ic,x0,y);
 ctx.font='700 '+fs+'px system-ui';ctx.fillStyle='#f3ecff';ctx.fillText(label,x0+fs*1.9,y,w-fs*1.9-(val?fs*4.2:0));if(val){ctx.textAlign='right';ctx.font='900 '+fs+'px system-ui';ctx.fillStyle=GOLD;ctx.fillText(val,x0+w,y)}}
function drawRewards(){const r=RW,u=now()-r.t0;grabToasts();msg=null;try{msgT=Math.max(msgT,1)}catch(e){}
 if(u>=RWD){RW=null;start();return}
 const d=rwData(),inA=sm(u/0.3),out=1-sm((u-(RWD-0.3))/0.3),al=Math.min(inA,out);
 ctx.save();ctx.fillStyle='rgba(8,3,22,'+(0.74*al)+')';ctx.fillRect(0,0,W,H);
 const cw=Math.min(W*0.9,360),x=W/2-cw/2,pad=Math.max(12,cw*0.06),fs=Math.max(12,Math.min(15,cw*0.045)),list=d.ach.map(a=>[a[0],a[1],'🪙 +'+a[2]]).concat(d.extra.map(s=>{const m=s.match(/^(\S+)\s+(.*?)(?:\s+(🪙 \+\d+))?$/u);return m?[m[1],m[2].replace(/\s+$/,''),m[3]||'']:['⭐',s,'']})),big0=Math.min(44,cw*0.12),fixed=pad*2+cw*0.06+big0*0.85+fs*(2.6+1.8+1.6+1.1+2.1+1.4)+fs*2.9,maxR=Math.max(1,Math.floor((H*0.92-fixed)/(fs*2.1))),over=list.length>maxR?list.length-(maxR-1):0,shown=over?list.slice(0,maxR-1):list,rows=shown.length+(over?1:0),ch=Math.min(H*0.94,fixed+rows*fs*2.1-(rows?0:fs*2.9)),y=H/2-ch/2;
 ctx.globalAlpha=al;ctx.fillStyle='rgba(28,10,58,0.96)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,cw,ch,18);ctx.fill();ctx.stroke();
 let yy=y+pad+cw*0.06;const big=Math.min(44,cw*0.12);ctx.textAlign='center';ctx.textBaseline='middle';
 ctx.font='900 '+big+'px system-ui';ctx.lineWidth=big*0.12;ctx.strokeStyle='#5a2a00';ctx.lineJoin='round';ctx.strokeText(T_('LEGEND KICK!'),W/2,yy,cw-pad*2);ctx.fillStyle=GOLD;ctx.fillText(T_('LEGEND KICK!'),W/2,yy,cw-pad*2);
 yy+=big*0.85;ctx.font='700 '+fs+'px system-ui';ctx.fillStyle='#d8c8ff';ctx.fillText(dist+' '+T_('YARDS')+' · '+T_('JACKPOT'),W/2,yy);
 // coins count-up
 yy+=fs*2.6;const k=r.rm?1:sm((u-0.25)/1.1),cn=Math.round(d.coins*k);ctx.font='900 '+Math.min(38,cw*0.105)+'px system-ui';ctx.fillStyle='#ffe28a';ctx.fillText('🪙 +'+cn.toLocaleString(),W/2,yy);
 yy+=fs*1.8;ctx.font='600 '+(fs-1)+'px system-ui';ctx.fillStyle='#bfb0e8';ctx.fillText(T_('COINS EARNED')+' · '+T_('Total')+' '+coins.toLocaleString(),W/2,yy,cw-pad*2);
 // achievements + other unlocks
 const x0=x+pad,w=cw-pad*2;yy+=fs*1.6;
 if(list.length){ctx.strokeStyle='rgba(242,194,48,0.35)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x0,yy);ctx.lineTo(x0+w,yy);ctx.stroke();yy+=fs*1.3;
  ctx.font='900 '+(fs-2)+'px system-ui';ctx.textAlign='left';ctx.fillStyle=GOLD;ctx.fillText(T_('UNLOCKED'),x0,yy);yy+=fs*1.6;
  shown.forEach((a,i)=>{rwRow(a[0],a[1],a[2],yy,x0,w,fs,al*(r.rm?1:sm((u-0.5-i*0.15)/0.3)));yy+=fs*2.1});
  if(over){rwRow('➕',T_('more unlocked')+' ('+over+')','',yy,x0,w,fs,al);yy+=fs*2.1}}
 ctx.globalAlpha=al;ctx.strokeStyle='rgba(242,194,48,0.35)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x0,yy-fs*0.4);ctx.lineTo(x0+w,yy-fs*0.4);ctx.stroke();
 // score + rank
 yy+=fs*1.1;rwRow('🏈',T_('SCORE')+' '+d.score.toLocaleString(),'+'+d.pts.toLocaleString(),yy,x0,w,fs,al);yy+=fs*2.1;
 rwRow('🏆',(d.rank?T_('Leaderboard')+' #'+d.rank:T_('Run saves after the dance'))+(d.lv?' · '+T_('LEVEL')+' '+d.lv:''),d.xp?'+'+d.xp+' XP':'',yy,x0,w,fs,al);
 ctx.restore()}
// ---------- start ----------
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(good&&mode==='classic'&&dist>=80&&ball&&ball.res!=='BLOCKED!'&&state==='play'&&ok())pre()}catch(e){console.warn(e)}return r};
function ok(){try{if(window.FGF_TRYING||lives>=50)return false;const h=window.FGF_H2&&FGF_H2();if(h&&h.room&&h.room.status==='active')return false}catch(e){}return true}
function start(){RW=null;const me=myT();LG={t0:now(),rm:RMo(),ff:FF(),me,seq:makeSeq(me),end:0,cf:[],nb:0,pc:-1};
 try{pendNext=null}catch(e){}msg=null;legendT=0;flash=0;shake=0;try{const K=window.FGF_KANIM;if(K)K.CEL=null}catch(e){}
 try{sfx.cheer();sfx.roar()}catch(e){}try{vib&&vib(LG.rm?[60,40,120]:[220,60,220,60,320,80,400])}catch(e){}}
// ---------- music: a simple synth breakbeat, scheduled on the audio clock (respects Sound OFF) ----------
// Legend anthem (Kirk-approved original track, legend_rock.mp3): loaded once during Classic, played on the MUSIC channel
// (Master/Music volume, Sound OFF and Use My Music all respected), synced to the celebration clock, stopped on skip/home.
const SONG='legend_rock.mp3?v=4',DUCK=0.7;let SBUF=null,SLD=null,SFAIL=false;
function loadSong(){if(SBUF||SLD||SFAIL)return;let c=null;try{c=typeof AC!=='undefined'&&AC}catch(e){}if(!c)return;
 SLD=fetch(SONG).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(b=>new Promise((res,rej)=>c.decodeAudioData(b,res,rej))).then(b=>{SBUF=b}).catch(()=>{SFAIL=true}).finally(()=>{SLD=null})}
setInterval(()=>{try{if(state==='play'&&mode==='classic')loadSong()}catch(e){}},1500);
const umm=()=>LS.fgfUMM==='1';
function songOut(c){const p=window.__CH;window.__CH='music';try{return OUT(c)}finally{window.__CH=p}}
function playSong(L,a){if(L.src||!SBUF||umm())return;let c;try{c=au()}catch(e){}if(!c)return;const g=c.createGain(),s=c.createBufferSource();s.buffer=SBUF;g.gain.value=1;s.connect(g).connect(songOut(c));
 const off=Math.max(0,a);if(off>=SBUF.duration-0.05)return;const t=c.currentTime;
 // under the field crowd roar the intro sits a little lower (no clipping), then opens up fully for the drop at the club fade
 if(off<OPEN){g.gain.setValueAtTime(DUCK,t);if(off<OPEN-0.4)g.gain.setValueAtTime(DUCK,t+OPEN-0.4-off);g.gain.linearRampToValueAtTime(1,t+OPEN-off)}s.start(t,off);L.src=s;L.sg=g}
function stopSong(L,fade){const s=L&&L.src;if(!s)return;L.src=null;try{const c=s.context,g=L.sg,t=c.currentTime;if(fade){g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+fade);s.stop(t+fade+0.02)}else s.stop()}catch(e){}}
const BASS=[55,55,65.4,49,55,55,73.4,65.4];
// ---------- crowd roar over the field opening (CROWD channel: Master/Crowd volume and Sound OFF respected) ----------
function crowd(L,a){if(L.cr||a>OPEN-1)return;L.cr=1;let c;try{c=au()}catch(e){}if(!c)return;const p0=window.__CH;window.__CH='crowd';let out;try{out=OUT(c)}finally{window.__CH=p0}const t=c.currentTime,sr=c.sampleRate,d=Math.max(1,OPEN+0.8-a),n=Math.floor(sr*d);
 const b=c.createBuffer(2,n,sr);for(let ch=0;ch<2;ch++){const x=b.getChannelData(ch);let p=0,q=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;p=p*0.985+w*0.015;q=q*0.9+w*0.1;x[i]=w*0.25+q*0.9+p*4}}
 const s=c.createBufferSource();s.buffer=b;const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=90;const bp=c.createBiquadFilter();bp.type='peaking';bp.frequency.value=1100;bp.Q.value=0.7;bp.gain.value=5;
 const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=5200;const g=c.createGain(),T=x=>t+Math.max(0,x-a),V=0.45;
 g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(V,T(0.35));g.gain.setValueAtTime(V,T(1.0));g.gain.linearRampToValueAtTime(V*0.8,T(2.6));g.gain.linearRampToValueAtTime(V,T(4.2));g.gain.linearRampToValueAtTime(V*0.85,T(5.8));g.gain.linearRampToValueAtTime(V,T(7.4));g.gain.linearRampToValueAtTime(V*0.6,T(OPEN-1.2));g.gain.linearRampToValueAtTime(0.0001,T(OPEN+0.5));
 s.connect(hp).connect(bp).connect(lp).connect(g).connect(out);s.start(t);s.stop(t+d);s.onended=()=>{if(L.crs===s)L.crs=null};L.crs=s;L.crg=g}
function stopCrowd(L,f){const s=L&&L.crs;if(!s)return;L.crs=null;try{const c=s.context,t=c.currentTime,g=L.crg.gain;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(0,t+(f||0.01));s.stop(t+(f||0.01)+0.02)}catch(e){}}
function music(a){const L=LG;if(L.end){if(L.crs)stopCrowd(L,0.3);if(L.src&&!L.sf&&a<DUR-0.05){L.sf=1;stopSong(L,0.5)}return}crowd(L,a);if(!L.ch&&a>4.6){L.ch=1;try{sfx.cheer()}catch(e){}}if(umm())return;if(SBUF){playSong(L,a);return}if(!SFAIL&&a<2){loadSong();return}let c;try{c=au()}catch(e){}if(!c)return;const out=OUT(c);if(L.ac0==null){L.ac0=c.currentTime-a}
 const ahead=a+0.25;while(L.nb*BEAT/2<ahead){const i=L.nb++,t=L.ac0+i*BEAT/2;if(t<c.currentTime-0.02)continue;const bar=i%16,vol=a<1?0.6:1;
  if(bar%8===0||bar%8===3||bar%8===5&&bar>8){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(48,t+0.14);g.gain.setValueAtTime(0.32*vol,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.22);o.connect(g).connect(out);o.start(t);o.stop(t+0.25)}
  if(bar%8===4){nz(c,out,t,0.16,1900,0.8,0.16*vol)}
  nz(c,out,t,0.04,8000,1.2,(i%2?0.05:0.03)*vol);
  if(i%2===0){const f=BASS[(i/2|0)%8],o=c.createOscillator(),g=c.createGain(),fl=c.createBiquadFilter();o.type='sawtooth';o.frequency.value=f;fl.type='lowpass';fl.frequency.value=420;g.gain.setValueAtTime(0.07*vol,t);g.gain.exponentialRampToValueAtTime(0.001,t+BEAT*0.9);o.connect(fl).connect(g).connect(out);o.start(t);o.stop(t+BEAT)}}}
let NZB=null;function nz(c,out,t,d,f,q,v){if(!NZB){NZB=c.createBuffer(1,c.sampleRate*0.3,c.sampleRate);const x=NZB.getChannelData(0);for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1}const s=c.createBufferSource();s.buffer=NZB;const fl=c.createBiquadFilter();fl.type='bandpass';fl.frequency.value=f;fl.Q.value=q;const g=c.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);s.connect(fl).connect(g).connect(out);s.start(t);s.stop(t+d+0.02)}
// ---------- scene ----------
function dancerSize(){return Math.min(H*0.29,W*0.6)}
function battle(a){const L=LG,q=L.seq,bt=a-OPEN,pi=Math.min(NP-1,Math.floor(bt/PAIR)),lt=bt-pi*PAIR,pr=q.pairs[pi],G=geo(),sc=dancerSize();
 if(pi!==L.pc){L.pc=pi;if(pi>0){try{sfx.cheer()}catch(e){}if(!L.rm)pyro()}}
 const enter=pi===0?1:sm(lt/0.6),exit=pi===NP-1?1:1-sm((lt-(PAIR-0.4))/0.4);
 const tt=lt-0.75,ti=Math.max(0,Math.min(3,Math.floor(tt/2.5))),u=tt-ti*2.5,show=(q.first[pi]+ti)%2,mi=pi*4+ti,live=tt>=0&&tt<10;
 const ps=[0,1].map(side=>{let o;const t=a;if(!live){o=REACT.rock(t)}else if(side===show){const f=MOVES[q.mv[mi]],core=(u-0.3)/1.9;const m=f(E(core),Math.max(0,u-0.3),L.rm);const k=sm(u/0.3)*(1-sm((u-2.2)/0.3));o=blend(REACT.rock(t),q.mv[mi]==='toprock'?m:m,k)}else{const r=REACT[q.rc[mi]](t),k=sm(u/0.35)*(1-sm((u-2.2)/0.3));o=blend(REACT.rock(t),r,k)}return o});
 const off=(1-enter)+(1-exit);
 for(const side of (show===0?[1,0]:[0,1])){const mir=side?-1:1,isS=live&&side===show,bx=W*(side?0.71:0.29)+(isS?(side?-1:1)*W*0.03*sm(u/0.4)*(1-sm((u-2.1)/0.4)):0),x=bx+(side?1:-1)*off*W*0.62,fy=G.fy+(isS?H*0.02:0);
  kicker(ps[side],pr[side],x,fy,sc*(isS?1.02:0.94),mir)}}
function opening(a){const G=geo(),sc=dancerSize(),me=LG.me,o=openPose(a);kicker(o,me,W*0.34,G.fy,sc,1)}
function pyro(){const L=LG;for(const s of [0,1])for(let i=0;i<46;i++){const ang=(s?-1:1)*(0.15+Math.random()*0.45),v=H*(0.5+Math.random()*0.5);L.cf.push({x:s?W*0.97:W*0.03,y:H*0.62,vx:S(ang)*v*0.6,vy:-C(ang)*v,l:0.6+Math.random()*0.6,c:Math.random()<0.6?'#ffd27a':'#ff9ad9',k:1})}}
function confetti(n){const L=LG,cols=['#ff3fd8','#4ad0ff','#ffd23f','#7dff8a','#ffffff','#b44dff'];for(let i=0;i<n;i++)L.cf.push({x:Math.random()*W,y:-10-Math.random()*H*0.3,vx:(Math.random()-.5)*40,vy:60+Math.random()*80,l:9,c:cols[i%cols.length],r:Math.random()*6,ph:Math.random()*6})}
function parts(dt){const L=LG;ctx.save();for(let i=L.cf.length-1;i>=0;i--){const p=L.cf[i];p.l-=dt;if(p.l<=0||p.y>H+20){L.cf.splice(i,1);continue}
 if(p.k){p.vy+=H*0.9*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;ctx.globalCompositeOperation='lighter';ctx.fillStyle=p.c;ctx.globalAlpha=Math.min(1,p.l*2);ctx.fillRect(p.x-1.2,p.y-1.2,2.4,2.4)}
 else{p.ph+=dt*5;p.x+=p.vx*dt+S(p.ph)*0.5;p.y+=p.vy*dt;ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle=p.c;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r+p.ph);ctx.scale(1,C(p.ph));ctx.fillRect(-3,-4,6,8);ctx.restore()}}ctx.restore()}
// ---------- the field opening: the real stadium of this kick (no HUD, ball, score or yard label) ----------
function fieldBG(){const pz=paused,lt=legendT;legendT=1.2;// the crowd bounces like after a Legend kick
 try{drawBG();ctx.save();ctx.translate(0,OFF);ctx.fillText=ctx.strokeText=ctx.roundRect=function(){};try{drawPosts();drawFlags()}finally{delete ctx.fillText;delete ctx.strokeText;delete ctx.roundRect;ctx.restore()}
  paused=true;drawWeather()}catch(e){}finally{paused=pz;legendT=lt}}
function tconf(n){const L=LG,u=UNI[L.me],cols=[u[0],u[2],u[3],'#ffffff',u[2]];for(let i=0;i<n;i++)L.cf.push({x:Math.random()*W,y:-10-Math.random()*H*0.35,vx:(Math.random()-.5)*50,vy:70+Math.random()*90,l:9,c:cols[i%cols.length],r:Math.random()*6,ph:Math.random()*6})}
// stadium shake: strong low rumble from the start, easing out as the field fades into the club (light with Reduced Motion)
function shk(a){const L=LG;if(a>=OPEN+0.2)return null;const env=sm(a/0.2)*(1-sm((a-(OPEN-4))/3.6)),beat=Math.pow(1-((a/BEAT)%1),3),m=Math.min(W,H)*(L.rm?0.005:0.03)*env*(0.7+0.3*beat);if(m<0.05)return null;
 return{x:m*(0.6*S(a*41)+0.4*S(a*67+1.3)),y:m*0.8*(0.6*S(a*47+0.7)+0.4*S(a*73+2.1)),r:(L.rm?0:1)*m/W*0.35*S(a*29),z:1+2.6*m/Math.min(W,H)}}
const FX=OPEN-1.1,FXD=1.3;// field -> club crossfade window (club fully in just after the drop at OPEN)
function scene(a,dt){const L=LG,G=geo(),fk=a<FX?0:sm((a-FX)/FXD),on=0.15+0.85*sm((a-FX)/1.6);
 if(fk<1)fieldBG();
 const sl=slots();
 if(fk>0){ctx.save();ctx.globalAlpha=fk;club(a,on);ctx.restore();
  // all 8 mascots cheer in the back rows (yours hops over from the field)
  const mIn=E((a-(OPEN-0.8))/1.1);for(let i=0;i<8;i++){if(i===L.me&&a<OPEN+0.6)continue;const s=sl[i],delay=i*0.08,al=(a<OPEN+0.6?sm(mIn*1.6-delay):1)*fk;if(al<=0.01)continue;const dy=(1-al)*H*0.05;mascotAt(i,s.x,s.fy+dy,s.h,a,i*0.37,al)}}
 // purple glow dip through the transition
 if(fk>0&&fk<1){const g=S(fk*PI);ctx.fillStyle='rgba(110,25,210,'+(0.42*g)+')';ctx.fillRect(0,0,W,H);if(!L.ff){ctx.save();ctx.globalCompositeOperation='lighter';const r=ctx.createRadialGradient(W/2,H*0.55,0,W/2,H*0.55,Math.max(W,H)*0.7);r.addColorStop(0,'rgba(255,120,255,'+(0.35*g)+')');r.addColorStop(1,'rgba(120,40,255,0)');ctx.fillStyle=r;ctx.fillRect(0,0,W,H);ctx.restore()}}
 // your mascot dances next to you on the field, then joins the crowd as the club fades in
 if(a<OPEN+0.6){const s=sl[L.me],k=sm((a-(OPEN-0.4))/1.0),h=lerp(Math.min(H*0.22,W*0.44),s.h,k),x=lerp(W*0.72,s.x,k),fy=lerp(G.fy,s.fy,k);mascotAt(L.me,x,fy-(k>0&&k<1?S(k*PI)*H*0.08:0),h,a,0,1)}
 // soft light pool on the opening kicker
 if(a<OPEN){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(W*0.48,G.fy,0,W*0.48,G.fy,W*0.55);g.addColorStop(0,'rgba(255,235,210,'+(0.16*(1-fk))+')');g.addColorStop(1,'rgba(255,220,200,0)');ctx.fillStyle=g;ctx.fillRect(0,G.yH,W,H-G.yH);ctx.restore()}
 if(a<OPEN)opening(a);else battle(a);
 // team-colour confetti on the field, then showers at the battle start and the finale
 if(!L.c0&&a>0.15){L.c0=1;tconf(L.rm?50:140)}if(!L.c5&&a>5.5){L.c5=1;tconf(L.rm?30:90)}
 if(!L.c1&&a>OPEN){L.c1=1;confetti(L.rm?40:110)}if(!L.c2&&a>DUR-5){L.c2=1;confetti(L.rm?50:160);if(!L.rm)pyro()}
 parts(dt);
 // gentle beat glow in the club (none when flash-free)
 if(!L.ff&&!L.rm&&fk>0){const b=Math.pow(1-((a/BEAT)%1),3);ctx.fillStyle='rgba(255,80,220,'+(0.05*b*fk)+')';ctx.fillRect(0,0,W,H)}
 // vignette
 const v=ctx.createRadialGradient(W/2,H*0.55,Math.min(W,H)*0.45,W/2,H*0.55,Math.max(W,H)*0.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(5,0,15,'+(0.3+0.25*fk)+')');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)}
function draw(){const L=LG,a0=now()-L.t0,dt=Math.min(0.05,Math.max(0,a0-(L.la||a0)));L.la=a0;
 if(!L.end&&a0>=DUR){L.end=DUR;L.endAt=a0}
 ctx.save();try{music(a0)}catch(e){}{const k=shk(a0);if(k){ctx.translate(W/2+k.x,H/2+k.y);ctx.rotate(k.r);ctx.scale(k.z,k.z);ctx.translate(-W/2,-H/2)}}scene(a0,dt);ctx.restore();
 BTN=[];
 if(L.end){const u=a0-L.endAt;if(u>=SHR){finish(false);return}ctx.fillStyle='rgba(8,2,20,'+(0.55*sm(u/0.3))+')';ctx.fillRect(0,0,W,H);
  const al=sm(u/0.3)*(1-sm((u-SHR+0.3)/0.3)),bw=Math.min(220,W*0.6),bh=54;ctx.save();ctx.globalAlpha=al;bx(W/2-bw/2,H*0.5-bh/2,bw,bh,'📤 '+T_('SHARE'),()=>shareLegend(),true,18);ctx.restore()}}
// take over the whole frame while dancing (drawn last, over the stadium and HUD)
const oTop=S3.top;S3.top=function(){const r=oTop?oTop.apply(this,arguments):undefined;try{if(RW&&state==='play')drawRewards();else if(RW)RW=null;if(LG&&state==='play')draw()}catch(e){console.warn(e)}return r};
const oCam=S3.cam;S3.cam=function(){if(LG)return;return oCam.apply(this,arguments)};
const oM=S3.masc;S3.masc=function(){if(LG)return;return oM.apply(this,arguments)};
// input: share button, tap-to-skip after 2 s (goes to the brief SHARE), nothing reaches the kick
function skip(){const L=LG;if(!L)return;const a=now()-L.t0;if(L.end){finish(false);return}if(a>=SKIP){L.end=Math.min(a,DUR);L.endAt=a}}
addEventListener('pointerdown',e=>{if(RW&&state==='play'){e.stopImmediatePropagation();e.preventDefault&&e.preventDefault();return}if(!LG||state!=='play')return;if(e.target&&e.target.closest&&e.target.closest('.fgfov,#lngm'))return;e.stopImmediatePropagation();e.preventDefault&&e.preventDefault();LG.dn={x:e.clientX,y:e.clientY}},true);
addEventListener('pointerup',e=>{if(RW&&state==='play'){e.stopImmediatePropagation();if(now()-RW.t0>1.2)RW.t0=now()-RWD;return}if(!LG||state!=='play')return;if(e.target&&e.target.closest&&e.target.closest('.fgfov,#lngm'))return;e.stopImmediatePropagation();const d=LG.dn;LG.dn=null;if(!d)return;
 const b=(BTN||[]).find(q=>d.x>=q.x&&d.x<=q.x+q.w&&d.y>=q.y&&d.y<=q.y+q.h);if(b&&b.cb&&LG.end){b.cb();return}skip()},true);
addEventListener('keydown',e=>{if(RW&&state==='play'&&(e.key===' '||e.key==='Enter'||e.key==='Escape')){e.preventDefault();e.stopImmediatePropagation();if(now()-RW.t0>1.2)RW.t0=now()-RWD;return}if(LG&&state==='play'&&(e.key===' '||e.key==='Enter'||e.key==='Escape')){e.preventDefault();e.stopImmediatePropagation();skip()}},true);
let hid=0;document.addEventListener('visibilitychange',()=>{if(!LG)return;if(document.hidden){hid=now();stopSong(LG,0);stopCrowd(LG,0)}else if(hid){const d=now()-hid;LG.t0+=d;if(LG.endAt)LG.endAt+=0;LG.ac0=null;LG.nb=Math.ceil((now()-LG.t0)/(BEAT/2));hid=0}});
function shareLegend(){if(!LG)return;let snap=null;try{snap=document.createElement('canvas');snap.width=cv.width;snap.height=cv.height;snap.getContext('2d').drawImage(cv,0,0)}catch(e){snap=null}
 HOLDCB=()=>{try{if(snap){const x=cv.getContext('2d');x.save();x.setTransform(1,0,0,1,0,0);x.drawImage(snap,0,0);x.restore()}share('I just nailed an 80-yard LEGEND kick')}catch(e){}};finish(true)}
// run-end hooks (stats/games played, online + weekly leaderboard, missions, events) poll for state==='over' every 150-500 ms.
// Going straight home skipped them, so the run sits in 'over' for 0.8 s behind a calm curtain, then goes home.
let HOLD=0,HOLDCB=null,CUR=null;
function curtain(on){try{if(on){if(!CUR){CUR=document.createElement('div');CUR.style.cssText='position:fixed;inset:0;background:#0b0420;z-index:2147483000;opacity:1;transition:opacity .25s;pointer-events:auto';document.body.appendChild(CUR)}CUR.style.opacity='1'}else if(CUR){const c=CUR;CUR=null;c.style.opacity='0';setTimeout(()=>c.remove(),300)}}catch(e){}}
function hold(){HOLD=now();curtain(true)}
setInterval(()=>{if(!HOLD||now()-HOLD<0.8)return;HOLD=0;const cb=HOLDCB;HOLDCB=null;if(state==='over'){state='title';if(!cb)try{toast('🏆 '+T_('Legend run saved')+' · '+score.toLocaleString())}catch(e){}}curtain(false);if(cb)cb()},100);
// ---------- finish: save the run, then home ----------
let goHome=false;
function finish(forShare){if(!LG)return;stopSong(LG,0.25);stopCrowd(LG,0.2);LG=null;try{const K=window.FGF_KANIM;if(K)K.CEL=null}catch(e){}msg=null;legendT=0;shake=0;flash=0;
 try{endGame()}catch(e){console.warn(e)}
 if(state==='initials'&&LS.fgfIni){try{const ini=J('fgfIni',[0,0,0]),AZ='ABCDEFGHIJKLMNOPQRSTUVWXYZ',lb=J('fgfLB',{}),L=lb[mode]||[];L.push({i:ini.map(k=>AZ[k]||'A').join(''),s:score});L.sort((x,y)=>y.s-x.s);lb[mode]=L.slice(0,25);SV('fgfLB',lb);state='over'}catch(e){}}
 if(state==='over')hold();else{goHome=true;if(HOLDCB){const cb=HOLDCB;HOLDCB=null;try{cb()}catch(e){}}}}
setInterval(()=>{if(goHome&&state==='over'&&!HOLD){goHome=false;hold()}if(goHome&&(state==='title'||state==='hub'))goHome=false},200);
window.FGF_LGTEST=()=>{mode='classic';dist=80;start()};
window.FGF_LG2={MOVES:MV,REACT:RV,DUR,OPEN,RWD};window.FGF_LGRW=()=>RW;
})();
