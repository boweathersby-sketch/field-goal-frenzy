// pure replica of game.js flight (update/kick) + storm wind models
(function(root){
const G=10.7,HALF=3.08,BAR=3.33,POST=11,DRAG=0.14;
const DIFF=d=>Math.max(0,Math.min(1,(d-40)/40));
// cfg: {dist,weather,wind:{x,z},wp,gust:'h'|'g'|null,swirl:{a0,w,eff,zk}|null,pox:[...],rainVx}
function sim(c,p,th,cu,g0,pox,rv,info){const d=c.dist,dk=DIFF(d),L80=d>=80,v0=14+p*(L80?23:21),ang=0.72,aim=th*0.55*(1+dk*(L80?0.55:0.8));
 let vx=v0*Math.cos(ang)*Math.sin(aim),vy=v0*Math.sin(ang),vz=v0*Math.cos(ang)*Math.cos(aim),ax=cu*5.5*(1+dk*(L80?0.55:0.8));
 if(c.weather==='snow'){vx*=0.93;vy*=0.93;vz*=0.93}if(c.weather==='heat'){vx*=1.04;vy*=1.04;vz*=1.04}vx+=rv||0;
 let x=0,y=0.15,z=0,gt=g0,tf=0,hit=false;const dt=1/60,h=dt/4,wm=1+dk*0.9,gk=c.weather==='rain'?1.07:c.weather==='snow'?1.04:1;let wx=c.wind.x,wz=c.wind.z;
 for(let f=0;f<480;f++){if(c.swirl){const s=c.swirl,a=s.a0+s.w*tf,gg=1+0.12*Math.sin(gt*2.7);wx=Math.sin(a)*s.eff*gg;wz=Math.cos(a)*s.eff*s.zk*gg}tf+=dt;gt+=dt;
  for(let i=0;i<4;i++){const pz=z,py=y,px=x;const gm=c.gust==='g'?1+0.45*Math.sin(gt*3.2):c.gust==='h'?1+0.1*Math.sin(gt*2.1):1;
   vx+=(ax+wx*0.05*gm*wm+Math.sin(z*0.09+c.wp)*dk*1.3)*h;vz+=wz*0.04*gm*wm*h-vz*dk*DRAG*h;vy-=G*gk*h;x+=vx*h;y+=vy*h;z+=vz*h;
   if(pz<d&&z>=d){const t=(d-pz)/(z-pz),cx=px+(x-px)*t-pox,cy=py+(y-py)*t;const near=Math.abs(Math.abs(cx)-HALF)<0.25&&cy>BAR&&cy<POST;
    if(info){info.cx=cx;info.cy=cy}if(near)return false;/* treat doinks as not a clean make */
    if(Math.abs(cx)<HALF-0.05&&cy>BAR+0.05)return true;if(cy>POST&&Math.abs(cx)<HALF+0.3)return true;return false}
   if(y<0.15)return false;if(vz<=0&&z<d)return false}}return false}
const PW=[1,0.85,0.7,0.55,0.4,0.25,0.1],CU=[0,-1,1,-0.5,0.5],TMAX=1.1;
// cx at the goal line grows with aim, so bisect the aim angle onto the target post position, then test that kick
function findOne(c,g0,pox,rv){for(const p of PW)for(const cu of CU){let lo=-TMAX,hi=TMAX,I={};const at=th=>{I={cx:NaN,cy:NaN};const ok=sim(c,p,th,cu,g0,pox,rv,I);return ok};
  if(at(lo))return{p,th:lo,cu};const a=I.cx;if(at(hi))return{p,th:hi,cu};const b=I.cx;if(!(a<0&&b>0))continue;
  for(let k=0;k<16;k++){const m=(lo+hi)/2;if(at(m))return{p,th:+m.toFixed(4),cu};if(!(I.cx===I.cx))break;if(I.cx<0)lo=m;else hi=m}}return null}
// makeable for EVERY gust phase / rain kick / wp (wp fixed per kick) : exists swipe (and post timing if posts move)
function makeable(c){const G0=c.gust||c.swirl?[0,0.8,1.6,2.4]:[0],RV=c.weather==='rain'?[-0.55,0,0.55]:[0],PX=c.pox||[0];let sol=null;
 for(const g0 of G0)for(const rv of RV){let ok=null;for(const px of PX){ok=findOne(c,g0,px,rv);if(ok){ok.pox=px;break}}if(!ok)return null;sol=sol||ok}return sol}
root.FGF_SOLVER={sim,findOne,makeable,DIFF};
})(typeof window!=='undefined'?window:globalThis);
