// s89 (Kirk GO Oct 19 · Oct 18 ideas #117, #119): MULLIGAN + NARROW POSTS.
// #117 Mulligan: earn one by making 10 in a row in Classic (bank holds 1, never sold). When a Classic miss would end
//      your run, you can spend it to re-kick the same kick (same distance + wind, streak kept). Max one use per day.
// #119 Narrow Posts: More Modes event, uprights 30% narrower (game.js HALF is a `let` now; only this mode changes it).
//      Every other week is NARROW POSTS WEEK: +🪙 15 per make. Other weeks it's still playable for fun.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,DK,BS,ON,ROW,SUB,card}=U;
const coin=n=>{try{n&&addCoins(n)}catch(e){}};
// ---------- #117 MULLIGAN ----------
let pre=null;
const oRes=result;result=function(r){try{if(mode==='classic'&&!ball.done)pre={d:dist,w:JSON.parse(JSON.stringify(wind)),wx:weather,stk:streak,sc:score}}catch(e){}
 const o=oRes.apply(this,arguments);try{if(mode==='classic'&&r==='GOOD!'&&streak>=10&&LS.fgfMullTok!=='1'){LS.fgfMullTok='1';toast('↺ '+T_('MULLIGAN EARNED! Saves one run-ending miss'))}}catch(e){}return o};
const oNx=S3.next;S3.next=function(good){
 if(!good&&mode==='classic'&&lives<=0&&pre&&LS.fgfMullTok==='1'&&LS.fgfMullDay!==DK()&&!document.getElementById('fgfs89m')){const P=pre;
  const d=card('↺ '+T_('USE YOUR MULLIGAN?'),`<div style="${ROW};text-align:center">${T_('That miss ends your run. Re-kick the same')} ${P.d}${T_('-yard kick instead?')}<div style="${SUB};margin-top:4px">${T_('Score')} ${P.sc} · ${T_('one per day · earn another with 10 makes in a row')}</div></div><button id="y" style="${BS};width:100%;${ON}">↺ ${T_('RE-KICK')}</button><button id="n" style="${BS};width:100%;margin-top:8px">${T_('NO THANKS')}</button>`,'fgfs89m',{nox:1});
  d.querySelector('#y').onclick=()=>{d.remove();LS.fgfMullTok='0';LS.fgfMullDay=DK();lives=1;prevLives=1;dist=P.d;wind=P.w;weather=P.wx;streak=P.stk;resetBall();state='play';try{saveRun()}catch(e){}toast('↺ '+T_('Mulligan! Same kick, one more try'))};
  d.querySelector('#n').onclick=()=>{d.remove();endGame()};return true}
 return oNx.apply(this,arguments)};
window.FGF_MULL=()=>({tok:LS.fgfMullTok==='1',usedToday:LS.fgfMullDay===DK()});
// ---------- #119 NARROW POSTS ----------
const WIDE=3.08,NAR=3.08*0.7;
const wkIdx=()=>Math.floor((Date.now()/864e5+3)/7);const NWEEK=()=>wkIdx()%2===0;window.FGF_NARROWWEEK=NWEEK;
const L=window.FGF_XMLIST,XP=window.FGF_XMP=window.FGF_XMP||{};
try{if(L&&!L.some(x=>x[0]==='narrow'))L.splice(6,0,['narrow','🎯','NARROW POSTS',(NWEEK()?'🔥 NARROW POSTS WEEK · +🪙 15 per make · ':'')+'Uprights 30% narrower · 10 balls'])}catch(e){}
const setW=(m,a)=>{wind={mph:m,a,x:Math.sin(a)*m,z:Math.cos(a)*m*0.3}};
XP.narrow={setup(c){HALF=NAR;weather='clear';dist=25+Math.min(30,c.k*3);setW(Math.floor(Math.random()*7),(Math.random()<.5?-1:1)*1.1)},
 next(c,good){c.pts=c.made;if(good&&NWEEK()){coin(15);c.bonus=(c.bonus||0)+15}if(c.k>=10){HALF=WIDE;return 'fin'}return true},
 res(c){return T_('Made')+' '+c.made+' '+T_('of')+' 10'+(c.bonus?' · 🪙 +'+c.bonus+' '+T_('event bonus'):'')},
 hud(c){return '🎯 '+T_('NARROW POSTS')+' · '+c.made+'/'+c.k+(NWEEK()?' · 🔥 '+T_('event week'):'')}};
// safety: posts are normal everywhere else, always
setInterval(()=>{try{if(mode!=='xm_narrow'&&HALF!==WIDE)HALF=WIDE}catch(e){}},200);
const oNG=newGame;newGame=function(){try{HALF=WIDE}catch(e){}return oNG.apply(this,arguments)};
})();
