// s87 (Kirk GO Oct 19 · Oct 18 ideas #115, #116, #118, #120): new More Modes + a Pressure timeout.
// MAX DISTANCE DERBY (3 balls, you pick the distance, longest make wins), WIND FLIP (wind switches sides every kick, 10 balls),
// CROSSBAR CHALLENGE (10 balls, a make off the post or bar counts double), and one wind-reset TIMEOUT per Pressure run.
// Uses the existing More Modes plugin system (s62 FGF_XMP). Free, local bests only.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,BS,ROW,SUB,card}=U;
const L=window.FGF_XMLIST,XP=window.FGF_XMP=window.FGF_XMP||{};
try{if(L){const add=(m,i)=>{if(!L.some(x=>x[0]===m[0]))L.splice(i,0,m)};
 add(['derby','📏','MAX DISTANCE DERBY','3 balls · pick your distance · longest make wins'],3);
 add(['wflip','🔁','WIND FLIP','Wind switches sides after every kick · 10 balls'],4);
 add(['xbar','🥅','CROSSBAR CHALLENGE','10 balls · a make off the post or bar counts double'],5)}}catch(e){}
const setW=(mph,a)=>{wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph*0.3}};
// ---- Derby ----
XP.derby={setup(c){weather='clear';setW(Math.floor(Math.random()*8),(Math.random()<.5?-1:1)*(0.9+Math.random()*0.6));state='xguess';
 const opts=[40,50,55,60,65,70,75,80];const best=c.best||0;
 const d=card('📏 '+T_('BALL')+' '+(c.k+1)+' / 3',`<div style="${ROW};text-align:center">${best?T_('Longest make so far')+': <b>'+best+' '+T_('yds')+'</b>':T_('Pick a distance. Only makes count.')}<div style="${SUB};margin-top:4px">${T_('Wind')} ${Math.abs(wind.mph)} mph</div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${opts.map(o=>`<button data-d="${o}" style="${BS};padding:8px 0;${o<=best?'opacity:.45':''}">${o}</button>`).join('')}</div>`,'fgfs87d',{nox:1});
 d.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{dist=+b.dataset.d;c.cur=dist;d.remove();resetBall();state='play';toast('📏 '+dist+' '+T_('yds'))});return 'hold'},
 next(c,good){if(good&&c.cur>(c.best||0))c.best=c.cur;c.pts=c.best||0;c.log.push(good?c.cur:'✗');if(c.k>=3)return 'fin';return true},
 res(c){return c.best?T_('Longest make')+': '+c.best+' '+T_('yds')+' · '+c.log.join(' · '):T_('No makes this time')+' · '+c.log.join(' · ')},
 hud(c){return '📏 '+T_('DERBY')+' · '+T_('ball')+' '+Math.min(3,c.k+1)+'/3 · '+T_('best')+' '+(c.best||0)}};
// ---- Wind Flip ----
XP.wflip={setup(c){weather='clear';if(c.k===0){c.mph=6+Math.floor(Math.random()*7);c.side=Math.random()<.5?-1:1}else c.side=-c.side;dist=30+Math.min(25,c.k*3);setW(c.mph,c.side*1.2)},
 next(c,good){c.pts=c.made;if(c.k>=10)return 'fin';toast('🔁 '+T_('Wind flips')+' '+(c.side>0?'◀':'▶')+' · '+c.mph+' mph');return true},
 res(c){return T_('Made')+' '+c.made+' '+T_('of')+' 10'},hud(c){return '🔁 '+T_('WIND FLIP')+' · '+c.made+'/'+c.k+' · '+(c.side>0?T_('wind ▶'):T_('wind ◀'))}};
// ---- Crossbar ----
XP.xbar={setup(c){weather='clear';dist=28+Math.floor(Math.random()*20);const m=Math.floor(Math.random()*6);setW(m,(Math.random()<.5?-1:1)*1.1)},
 next(c,good){if(good){const dk=!!(ball&&ball.hitPost);c.pts+=dk?2:1;if(dk){c.dk=(c.dk||0)+1;toast('🥅 '+T_('DOINK-IN! Double points'))}}if(c.k>=10)return 'fin';return true},
 res(c){return c.pts+' '+T_('points')+' · '+(c.dk||0)+' '+T_('doink-ins')},hud(c){return '🥅 '+T_('CROSSBAR')+' · '+c.pts+' '+T_('pts')+' · '+T_('ball')+' '+Math.min(10,c.k+1)+'/10'}};
// ---- #118 Pressure timeout: reset the wind once per run ----
let used=false,btn=null;
const oNG=newGame;newGame=function(m){const r=oNG.apply(this,arguments);used=false;return r};
function mk(){btn=document.createElement('button');btn.id='fgfs87to';btn.textContent='⏱️ '+T_('TIMEOUT');btn.title=T_('Reset the wind once per run');
 btn.style.cssText=BS+';position:fixed;left:12px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:40;min-height:38px;padding:7px 12px;font-size:12px;display:none';
 btn.onclick=()=>{if(used||!ok())return;used=true;btn.style.display='none';try{const k=dist;newWind();dist=k;roundN=Math.max(0,roundN-1)}catch(e){}toast('⏱️ '+T_('Timeout! The wind settles')+' · '+Math.abs(Math.round(wind.mph))+' mph')};document.body.appendChild(btn)}
const ok=()=>state==='play'&&mode==='pressure'&&!paused&&ball&&!ball.fly&&!ball.done&&!msg&&!document.querySelector('.fgfov');
setInterval(()=>{try{if(!btn)mk();btn.style.display=(!used&&ok())?'block':'none'}catch(e){}},250);
})();
