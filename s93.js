// s93 (Oct 19 #175, #176, #179): three more More Modes.
// RING TOSS: a ring floats between the uprights; a make that threads it scores 3, any other make 1 (10 balls).
// DOUBLE TROUBLE: kicks come in pairs; the second kick of each pair has a 4-second clock and its own wind. Both made = +2 bonus (5 pairs).
// DAILY PUZZLE KICK: one tricky setup a day (same for everyone, seeded by date), unlimited tries, scored by how few tries you needed.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,J2,S2,DK,hash,ROW,SUB,card}=U;
const L=window.FGF_XMLIST,XP=window.FGF_XMP=window.FGF_XMP||{};
try{if(L){const add=m=>{if(!L.some(x=>x[0]===m[0]))L.splice(Math.min(L.length,7),0,m)};
 add(['puzzle','🧩','DAILY PUZZLE KICK','One tricky kick a day · unlimited tries · fewer tries score more']);
 add(['dbl','⏱️','DOUBLE TROUBLE','Kicks come in pairs · 4 seconds for the second one · 5 pairs']);
 add(['ring','💍','RING TOSS','Thread the floating ring for 3 points · 10 balls'])}}catch(e){}
const setW=(mph,a)=>{wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph*0.3}};const rw=m=>setW(Math.floor(Math.random()*m),(Math.random()<.5?-1:1)*(0.9+Math.random()*0.5));
let bx=0,by=0;const oRes=result;result=function(r){try{if(!ball.done){bx=ball.x-(window.__POX||0);by=ball.y}}catch(e){}return oRes.apply(this,arguments)};
// ---- #175 Ring Toss ----
let RG=null;const RR=0.95;
XP.ring={setup(c){weather='clear';dist=26+Math.min(24,c.k*2);rw(5);RG={x:(Math.random()*2-1)*1.5,y:BAR+1.4+Math.random()*2.6}},
 next(c,good){let th=false;if(good&&RG){th=Math.hypot(bx-RG.x,by-RG.y)<RR;c.pts+=th?3:1;if(th){c.th=(c.th||0)+1;toast('💍 '+T_('Threaded the ring! +3'))}}if(c.k>=10){RG=null;return 'fin'}return true},
 res(c){return c.pts+' '+T_('points')+' · '+(c.th||0)+' '+T_('rings threaded')},hud(c){return '💍 '+T_('RING TOSS')+' · '+c.pts+' '+T_('pts')+' · '+T_('ball')+' '+Math.min(10,c.k+1)+'/10'}};
const oDP=drawPosts;drawPosts=function(){const r=oDP.apply(this,arguments);try{if(RG&&mode==='xm_ring'){const z=dist+0.2,a=P(RG.x,RG.y,z),b=P(RG.x+RR,RG.y,z);if(a&&b){const R=Math.abs(b.x-a.x),t=(performance.now()/1000)%6.28;ctx.save();ctx.translate(a.x,a.y+Math.sin(t*2)*R*0.04);ctx.lineWidth=Math.max(2,R*0.16);ctx.strokeStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(0,R*0.06,R,R*0.92,0,0,7);ctx.stroke();ctx.strokeStyle='#ffd23a';ctx.shadowColor='#ffb000';ctx.shadowBlur=10;ctx.beginPath();ctx.ellipse(0,0,R,R*0.92,0,0,7);ctx.stroke();ctx.restore()}}}catch(e){}return r};
setInterval(()=>{try{if(RG&&mode!=='xm_ring')RG=null}catch(e){}},500);window.FGF_RING=()=>RG;
// ---- #176 Double Trouble ----
let clk=0,clkOn=false;
XP.dbl={setup(c){weather='clear';const sec=c.k%2===1;dist=sec?32+Math.floor(Math.random()*14):28+Math.floor(Math.random()*16);rw(sec?9:6);clkOn=false;
 if(sec){clk=4;clkOn=true;toast('⏱️ '+T_('Quick! Second kick · 4 seconds'))}},
 next(c,good){clkOn=false;const sec=(c.k-1)%2===1;if(good)c.pts+=1;if(!sec)c.first=good;else if(good&&c.first){c.pts+=2;c.pairs=(c.pairs||0)+1;toast('⏱️ '+T_('Both made! +2 bonus'))}return c.k>=10?'fin':true},
 res(c){return c.pts+' '+T_('points')+' · '+(c.pairs||0)+' / 5 '+T_('pairs made')},hud(c){const sec=c.k%2===1;return '⏱️ '+T_('PAIR')+' '+Math.min(5,Math.floor(c.k/2)+1)+'/5 · '+(sec?T_('second kick')+' · '+Math.max(0,Math.ceil(clk))+'s':T_('first kick'))+' · '+c.pts+' '+T_('pts')}};
let lt=performance.now();(function tick(){const n=performance.now(),dt=Math.min(0.1,(n-lt)/1000);lt=n;try{if(clkOn&&mode==='xm_dbl'&&state==='play'&&!paused&&ball&&!ball.fly&&!ball.done&&!msg&&!document.querySelector('.fgfov')){const p=Math.ceil(clk);clk-=dt;if(Math.ceil(clk)<p&&p<=3){try{tone(1500,1500,0.08,0.18,'square')}catch(e){}}if(clk<=0){clkOn=false;swipe=null;ball.done=true;result('DELAY OF GAME')}}if(mode!=='xm_dbl')clkOn=false}catch(e){}requestAnimationFrame(tick)})();
// ---- #179 Daily Puzzle Kick ----
const PZ=()=>{const h=hash('pz'+DK())>>>0;const W=['clear','rain','snow','clear'];return {d:44+h%22,mph:9+(h>>5)%9,side:(h>>9)%2?1:-1,wx:W[(h>>11)%4]}};
XP.puzzle={pre(){const P0=PZ(),R=J2('fgfPZ',{});const t=R[DK()];
  const d=card('🧩 '+T_('DAILY PUZZLE KICK'),`<div style="${ROW};text-align:center"><b style="font-size:22px">${P0.d} ${T_('yds')}</b><div>${T_('Wind')} ${P0.mph} mph ${P0.side>0?'▶':'◀'} · ${T_(P0.wx==='clear'?'Clear':P0.wx==='rain'?'Rain':'Snow')}</div><div style="${SUB};margin-top:6px">${t?T_('Solved today in # tries').replace('#',t):T_('Same kick all day. Unlimited tries. Fewer tries score more.')}</div></div><button id="go" style="${U.BS};display:block;width:100%">${t?T_('PLAY AGAIN FOR FUN'):T_('START')}</button>`,'fgfs93p');
  d.querySelector('#go').onclick=()=>{d.remove();FGF_XMSTART('puzzle')}},
 setup(c){const P0=PZ();weather=P0.wx;dist=P0.d;setW(P0.mph,P0.side*1.25)},
 next(c,good){if(good){c.pts=Math.max(1,11-c.k);const R=J2('fgfPZ',{});if(!R[DK()]){R[DK()]=c.k;const ks=Object.keys(R).sort().slice(-30),o={};ks.forEach(k=>o[k]=R[k]);S2('fgfPZ',o)}return 'fin'}if(c.k>=30)return 'fin';if(c.k%5===0)toast('🧩 '+T_('Try #').replace('#',c.k+1));return true},
 res(c){return c.made?T_('Solved in # tries').replace('#',c.k)+' · '+c.pts+' '+T_('points'):T_('Not solved yet. Come back and try again today!')},
 hud(c){return '🧩 '+T_('PUZZLE')+' · '+T_('Try #').replace('#',c.k+1)}};
})();
