// s41 (Batch 2, gameplay): (perfect +15 / doink-in +25 bonuses already live in s19), stronger long-range wind bend (55-76 yd only; 80-yd tuning untouched),
// heat shimmer + night fog/snow, and MORE MODES: Moving Posts, Kickoff, Punt Pin, Onside Kick, Two-Minute Drill, Boss Gauntlet, Ladder.
(function(){
const R=Math.random,RI=(a,b)=>a+Math.round(R()*(b-a)),DK=window.FGF_DK||(()=>new Date().toDateString());
let MM=null,kt0=0;window.FGF_MM=()=>MM;
const OFFY=()=>typeof OFF!=='undefined'?OFF:0;
// ---- bonuses on normal kicks ----
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);

 if(MM)mmMsg(good);return r};
const oK=S3.onKick;S3.onKick=function(){kt0=performance.now();return oK.apply(this,arguments)};
// ---- wind: a bit more bend at long range, never at 80 and never under 55 ----
const oW=newWind;newWind=function(){const r=oW.apply(this,arguments);try{if(MM&&MM.far){wind.x*=0.3;wind.z*=0.3;wind.mph=Math.round(wind.mph*0.3)}else if(dist>=55&&dist<80&&weather!=='hurricane')wind.x*=1.15}catch(e){}return r};
// ---- moving posts / hide posts in far modes ----
const oP0=drawPosts;const oP=function(){const r=oP0.apply(this,arguments);try{if(weather==='heat')shimmer();nightFx()}catch(e){}return r};drawPosts=function(){if(MM&&MM.far){try{if(weather==='heat')shimmer();nightFx()}catch(e){}return}const px=window.__POX||0;if(!px)return oP.apply(this,arguments);const q=P(px,0,dist+0.2),o=P(0,0,dist+0.2);ctx.save();if(q&&o)ctx.translate(q.x-o.x,0);try{oP.apply(this,arguments)}finally{ctx.restore()}};
const oFl=drawFlags;drawFlags=function(){if(MM&&MM.far)return;const px=window.__POX||0;if(!px)return oFl.apply(this,arguments);const q=P(px,0,dist+0.2),o=P(0,0,dist+0.2);ctx.save();if(q&&o)ctx.translate(q.x-o.x,0);try{oFl.apply(this,arguments)}finally{ctx.restore()}};
// ---- modes ----
const BOSS=[['THE ROOKIE WALL',0.55,30],['IRON TOE',0.65,38],['ICE VEIN',0.72,45],['THE CANNON',0.8,52],['KING OF THE UPRIGHTS',0.88,58]];
const MODES2=[
 ['posts','↔️','MOVING POSTS','The uprights slide · 10 balls'],
 ['kickoff','🚀','KICKOFF','Distance + hang time · 5 kicks'],
 ['punt','🎯','PUNT PIN','Land it on the target · 5 kicks'],
 ['onside','🌀','ONSIDE KICK','Land it 10-18 yds · 5 tries'],
 ['drill','⏱️','TWO-MINUTE DRILL','120 seconds · random distances'],
 ['boss','👑','BOSS GAUNTLET','Beat 5 boss kickers in a row'],
 ['ladder','🪜','LADDER TOURNAMENT','8 rungs · make 2 of 3 to climb']];
window.FGF_MODES2=MODES2;
function start(t){newGame('classic');mode='mm_'+t;MM={t,n:0,pts:0,coins:0,log:[],far:['kickoff','punt','onside'].includes(t)};
 const c=MM;if(t==='posts')c.balls=10;if(c.far)c.balls=5;if(t==='drill'){c.end=performance.now()+120000}if(t==='boss'){c.b=0;c.k=0;c.me=0;c.op=0}if(t==='ladder'){c.r=0;c.k=0;c.m=0}
 setup();toast(MODES2.find(m=>m[0]===t)[2]+' · '+MODES2.find(m=>m[0]===t)[3])}
function setup(){const c=MM;window.__DLBL=c.far?(c.t==='kickoff'?'KICKOFF':c.t==='punt'?'PUNT':'ONSIDE'):null;lives=99;prevLives=99;window.__POX=0;
 dist=c.t==='posts'?RI(25,45):c.far?130:c.t==='drill'?RI(25,55):c.t==='boss'?BOSS[c.b][2]+RI(-3,3):c.t==='ladder'?25+c.r*6:30;
 if(c.t==='punt')c.tg=RI(35,60);newWind();resetBall()}
function land(){return Math.max(0,Math.round(ball.z))}
function mmMsg(good){const c=MM;if(!msg)return;
 if(c.far){const y=land(),h=Math.max(0,(performance.now()-kt0)/1000);c.last=[y,h];
  if(c.t==='kickoff'){const p=Math.round(y+h*10);msg={t:y+' YDS',s:'Hang '+h.toFixed(1)+'s · +'+p+' pts',c:'#7fe8ff'}}
  if(c.t==='punt'){const off=Math.abs(y-c.tg),p=Math.max(0,100-off*8);msg={t:y+' YDS',s:(off<=1?'PINNED! ':off+' yds off · ')+'+'+p+' pts',c:'#7fe8ff'}}
  if(c.t==='onside'){const ok=y>=10&&y<=18&&R()<(y<=14?0.75:0.5);c.lastOk=ok;msg={t:ok?'RECOVERED!':'THEIR BALL',s:y+' yds',c:ok?'#7dff6a':'#ff6b6b'}}
  msgT=1.6}}
const oN=S3.next;S3.next=function(good){if(!MM)return oN.apply(this,arguments);const c=MM;c.n++;
 if(c.t==='posts'){if(good){c.pts++;c.coins+=10}c.balls--;if(c.balls<=0)return fin();setup();return true}
 if(c.far){const [y,h]=c.last||[0,0];if(c.t==='kickoff')c.pts+=Math.round(y+h*10);if(c.t==='punt')c.pts+=Math.max(0,100-Math.abs(y-c.tg)*8);if(c.t==='onside'&&c.lastOk)c.pts++;c.balls--;if(c.balls<=0){c.coins=c.t==='kickoff'?Math.round(c.pts/5):c.t==='punt'?Math.round(c.pts/3):c.pts*40;return fin()}setup();return true}
 if(c.t==='drill'){if(good){c.pts+=dist*10;c.coins+=Math.round(dist/5)}if(performance.now()>=c.end)return fin();setup();return true}
 if(c.t==='boss'){const B=BOSS[c.b];if(good)c.me++;if(R()<B[1])c.op++;c.k++;toast('👑 '+B[0]+(c.op>c.k-1-0?'':'')+' · you '+c.me+' – '+c.op);
  if(c.k>=5){if(c.me>c.op){c.coins+=60+c.b*40;c.pts=c.b+1;toast('👑 Beat '+B[0]+'!  🪙 +'+(60+c.b*40));c.b++;c.k=0;c.me=0;c.op=0;if(c.b>=BOSS.length){c.win=1;c.coins+=500;return fin()}}else return fin()}setup();return true}
 if(c.t==='ladder'){c.k++;if(good)c.m++;if(c.m>=2){c.coins+=(c.r+1)*25;c.r++;c.k=0;c.m=0;c.pts=c.r;toast('🪜 Rung '+c.r+' cleared!');if(c.r>=8){c.win=1;c.coins+=300;return fin()}}else if(c.k-c.m>=2)return fin();setup();return true}
 return fin()};
function fin(){const c=MM;c.done=1;window.__DLBL=null;window.__POX=0;const k='fgfMM_'+c.t,b=+(LS[k]||0);if(c.pts>b){LS[k]=c.pts;c.nb=1}c.coins=Math.min(600,c.coins);if(c.coins)addCoins(c.coins);try{c.coins>0?sfx.cheer():sfx.groan()}catch(e){}state='mmres';return true}
window.FGF_MMSTART=start;
// ---- draw ----
function shimmer(){const t=performance.now()/1000;ctx.save();ctx.globalAlpha=0.08;ctx.strokeStyle='#fff';ctx.lineWidth=2;for(let i=0;i<9;i++){const y=HY+OFFY()-20+i*7;ctx.beginPath();for(let x=0;x<=W;x+=12){ctx.lineTo(x,y+Math.sin(x*0.05+t*4+i)*2.5)}ctx.stroke()}ctx.restore()}
function nightFx(){const night=window.EVT==='night'||/night|midnight|moon/i.test(String((typeof eq!=='undefined'&&eq.st)||''));if(!night)return;
 if(weather==='fog'){ctx.save();const g=ctx.createLinearGradient(0,HY-60,0,H);g.addColorStop(0,'rgba(160,180,210,0)');g.addColorStop(0.4,'rgba(160,180,210,0.28)');g.addColorStop(1,'rgba(160,180,210,0.12)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore()}
 if(weather==='snow'){ctx.save();ctx.fillStyle='rgba(120,170,255,0.08)';ctx.fillRect(0,0,W,H);ctx.restore()}}
const osc=S3.screen;S3.screen=function(){
 if(state==='mmsel'){BTN=[];txt('🎮 MORE MODES',W/2,H*0.08,Math.min(28,W*0.075),GOLD,'#063');const y0=H*0.13,rh=Math.min(64,(H*0.84-y0)/MODES2.length);
  MODES2.forEach((m,i)=>{const y=y0+i*rh,b=+(LS['fgfMM_'+m[0]]||0);bx(W*0.06,y,W*0.88,rh-8,'',()=>start(m[0]),false,13);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?14:16)+'px system-ui';ctx.fillText(m[1]+' '+m[2],W*0.1,y+(rh-8)*0.42,W*0.8);ctx.font=(W<350?11:12)+'px system-ui';ctx.fillStyle='#bcd';ctx.fillText(m[3]+(b?' · Best '+b:''),W*0.1,y+(rh-8)*0.78,W*0.8)});
  bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='hub',false,14);return true}
 if(state==='mmres'&&MM){BTN=[];const c=MM,m=MODES2.find(x=>x[0]===c.t);panel(W*0.08,H*0.22,W*0.84,H*0.36);txt(m[1]+' '+m[2],W/2,H*0.29,Math.min(24,W*0.065),GOLD,'#063');
  const L=c.t==='boss'?(c.win?'ALL 5 BOSSES BEATEN!':'Beat '+c.b+' of 5 bosses'):c.t==='ladder'?(c.win?'TOP OF THE LADDER!':'Reached rung '+c.r+' of 8'):c.t==='onside'?c.pts+' of 5 recovered':c.t==='posts'?c.pts+' of 10 made':c.pts+' pts';
  txt(L,W/2,H*0.37,Math.min(26,W*0.07),'#fff');txt((c.nb?'NEW BEST · ':'')+'🪙 +'+c.coins,W/2,H*0.44,15,GOLD);
  bx(W*0.1,H*0.62,W*0.38,46,'AGAIN',()=>{const t=c.t;MM=null;start(t)},false,15);bx(W*0.52,H*0.62,W*0.38,46,'MODES',()=>{MM=null;mode='classic';state='mmsel'},true,15);return true}
 if(state!=='play'&&MM&&!['mmres','pause','cpuk'].includes(state)&&state!=='over'){/* left the mode */}
 if(state==='play'&&MM&&MM.t==='posts'){const t=performance.now()/1000;window.__POX=Math.sin(t*1.3)*2.6*Math.min(1,(dist-20)/25+0.4)}
 const r=osc.apply(this,arguments);
 return r};
const oH=S3.hud;S3.hud=function(sm){if(!MM)return oH.apply(this,arguments);const c=MM;let s='';if(c.t==='posts')s='↔️ MOVING POSTS · '+c.pts+' made · '+c.balls+' 🏈 left';else if(c.t==='kickoff')s='🚀 KICKOFF · '+c.pts+' pts · '+c.balls+' 🏈 left';else if(c.t==='punt')s='🎯 PUNT PIN · land at '+c.tg+' yds · '+c.balls+' 🏈';else if(c.t==='onside')s='🌀 ONSIDE · land 10-18 yds · '+c.pts+'/5';else if(c.t==='drill')s='⏱️ '+Math.max(0,Math.ceil((c.end-performance.now())/1000))+'s · '+c.pts+' pts';else if(c.t==='boss')s='👑 '+BOSS[c.b][0]+' · '+c.me+'–'+c.op+' · kick '+(c.k+1)+'/5';else if(c.t==='ladder')s='🪜 RUNG '+(c.r+1)+'/8 · '+dist+' yds · '+c.m+'/2 made';
  ctx.save();ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillStyle=GOLD;ctx.fillText(s,W/2,H*0.155,W*0.94);ctx.restore();
  if(c.t==='punt'||c.t==='onside'){const zs=c.t==='punt'?[c.tg]:[10,18];zs.forEach(z=>{const a=P(-12,0,z),b=P(12,0,z);if(a&&b){ctx.save();ctx.translate(0,OFFY());ctx.strokeStyle=c.t==='punt'?'#ff4fd8':'#7fe8ff';ctx.lineWidth=Math.max(2,a.s*0.15);ctx.setLineDash([8,6]);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.restore()}})}return true};
// leaving to menu ends the mode cleanly
setInterval(()=>{if(!MM)window.__DLBL=null;if(MM&&['menu','hub','title'].includes(state)){MM=null;window.__DLBL=null;window.__POX=0;if(String(mode).startsWith('mm_'))mode='classic'}},500);
})();
