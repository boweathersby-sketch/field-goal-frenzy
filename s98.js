// s98 (Oct 19 #173, #180, #181): sky and stadium twists.
// 🏳️ LAYERED WIND (More Modes · Twists): two winds, one near the ground and one up high (above ~6 m) that can blow the other way. 10 balls.
// 🌙 LOW GRAVITY (More Modes · Twists, weekends only): floaty ball flight just for fun, with its own local best. Never touches Classic or leaderboards.
// 🐦 BEACH SEAGULLS: in the Beach stadium (Classic and practice only), now and then a gull glides across the posts; bonk it and it squawks off: no good.
(function(){const U=window.FGF_UI;if(!U)return;const {T_}=U;
const L=window.FGF_XMLIST,XP=window.FGF_XMP=window.FGF_XMP||{};const WKND=()=>{const d=(window.FGF_DATE?new Date(FGF_DATE):new Date()).getDay();return d===0||d===6};
try{if(L){const add=m=>{if(!L.some(x=>x[0]===m[0]))L.push(m)};
 add(['layer','🏳️','LAYERED WIND','Wind near the ground and wind up high can blow different ways · 10 balls']);
 add(['lowg','🌙','LOW GRAVITY',(WKND()?'🌙 THIS WEEKEND · ':'Weekends only · ')+'floaty ball flight just for fun · 10 balls']);
 if(window.FGF_XMGROUP){FGF_XMGROUP('layer','tw');FGF_XMGROUP('lowg','tw')}}}catch(e){}
const setW=(mph,a)=>{wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph*0.3}};
// ---- #173 Layered wind ----
let HI=null;
XP.layer={setup(c){weather='clear';dist=34+Math.min(26,c.k*3);const s=Math.random()<.5?-1:1,lo=3+Math.floor(Math.random()*6),hi=6+Math.floor(Math.random()*9);setW(lo,s*1.2);const flip=Math.random()<0.65;HI={mph:hi,x:(flip?-s:s)*Math.sin(1.2)*hi};toast('🏳️ '+T_('Low')+' '+lo+' mph '+(s>0?'▶':'◀')+' · '+T_('High')+' '+hi+' mph '+(HI.x>0?'▶':'◀'))},
 next(c,good){c.pts=c.made;if(c.k>=10){HI=null;return 'fin'}return true},res(c){return T_('Made')+' '+c.made+' '+T_('of')+' 10'},
 hud(c){return '🏳️ '+T_('High wind')+' '+(HI?HI.mph+' mph '+(HI.x>0?'▶':'◀'):'')+' · '+c.made+'/'+c.k}};
// ---- #180 Low gravity ----
XP.lowg={pre(){if(!WKND()){toast('🌙 '+T_('Low Gravity is back this weekend!'));return}FGF_XMSTART('lowg')},
 setup(c){weather='clear';dist=40+Math.min(35,c.k*4);setW(Math.floor(Math.random()*6),(Math.random()<.5?-1:1)*1.1)},
 next(c,good){c.pts=c.made;return c.k>=10?'fin':true},res(c){return T_('Made')+' '+c.made+' '+T_('of')+' 10'},hud(c){return '🌙 '+T_('LOW GRAVITY')+' · '+dist+' '+T_('yds')+' · '+c.made+'/'+c.k}};
// ---- #181 Beach seagulls ----
let GL=null;const beach=()=>{try{return S5.bgFor(stadT()).id==='beach'}catch(e){return false}};
const oRB=resetBall;resetBall=function(){const r=oRB.apply(this,arguments);try{GL=null;if((mode==='classic'||mode==='practice')&&beach()&&Math.random()<0.1){const dir=Math.random()<.5?-1:1;GL={x:-dir*14,dir,y:BAR+2+Math.random()*4,t:0,hit:false}}}catch(e){}return r};
if(typeof update==='function'){const oU=update;update=function(dt){const r=oU.apply(this,arguments);try{
 if(ball&&ball.fly&&HI&&mode==='xm_layer'){const f=Math.max(0,Math.min(1,(ball.y-5)/3));ball.vx+=(HI.x-wind.x)*0.05*f*dt}
 if(ball&&ball.fly&&mode==='xm_lowg')ball.vy+=G*0.42*dt;
 if(GL&&!paused){if(ball&&ball.fly)GL.t+=dt;GL.x+=GL.dir*(GL.hit?9:4.2)*dt*(ball&&ball.fly?1:0.35);if(GL.hit)GL.y+=dt*6;
  if(!GL.hit&&ball&&ball.fly&&!ball.done&&Math.abs(ball.z-dist)<1.4&&Math.hypot(ball.x-GL.x,ball.y-GL.y)<1.0){GL.hit=true;ball.vz=-4;ball.vy=3;ball.vx*=-0.4;try{tone(1800,900,0.18,0.25,'sawtooth');setTimeout(()=>tone(1600,800,0.15,0.2,'sawtooth'),160)}catch(e){}result('SEAGULL!');setTimeout(()=>toast('🐦 '+T_('SQUAWK! A seagull got in the way')),300)}
  if(Math.abs(GL.x)>18)GL=null}}catch(e){}return r}}
const oDP=drawPosts;drawPosts=function(){const r=oDP.apply(this,arguments);try{if(GL){const p=P(GL.x,GL.y,dist+0.2),q=P(GL.x+1.3,GL.y,dist+0.2);if(p&&q){const s=Math.abs(q.x-p.x),fl=Math.sin(performance.now()/90)*0.5;ctx.save();ctx.translate(p.x,p.y);ctx.scale(GL.dir,1);ctx.strokeStyle='#f4f6f8';ctx.lineWidth=Math.max(1.5,s*0.18);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-s,-s*(0.35+fl));ctx.quadraticCurveTo(-s*0.45,-s*0.05,0,0);ctx.quadraticCurveTo(s*0.45,-s*0.05,s,-s*(0.35+fl));ctx.stroke();ctx.fillStyle='#f4f6f8';ctx.beginPath();ctx.ellipse(0,s*0.04,s*0.28,s*0.12,0,0,7);ctx.fill();ctx.fillStyle='#f2a020';ctx.beginPath();ctx.moveTo(s*0.26,s*0.02);ctx.lineTo(s*0.42,s*0.06);ctx.lineTo(s*0.26,s*0.1);ctx.fill();ctx.restore()}}}catch(e){}return r};
window.FGF_GULL=(on)=>{GL=on?{x:-14,dir:1,y:BAR+3,t:0,hit:false}:null;return GL};
})();
