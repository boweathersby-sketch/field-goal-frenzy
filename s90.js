// s90 (Oct 17 #106, Oct 19 #174, #177, #178): four new More Modes.
// SHRINKING POSTS (uprights narrow a little after every make, one miss ends it), DISTANCE ROULETTE (a wheel picks each kick, 8 balls, score = yards made),
// CALL YOUR SHOT (call left / center / right before each kick, right calls pay 🪙 5), FIELD GOAL GOLF (9 holes, up to 4 kicks a hole, par 2).
// Uses the More Modes plugin system (s62 FGF_XMP). Free, local bests only. HALF is restored the same way s89 does it.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,BS,ROW,SUB,card}=U;
const L=window.FGF_XMLIST,XP=window.FGF_XMP=window.FGF_XMP||{};const coin=n=>{try{n&&addCoins(n)}catch(e){}};
try{if(L){const add=m=>{if(!L.some(x=>x[0]===m[0]))L.splice(Math.min(L.length,7),0,m)};
 add(['golf','⛳','FIELD GOAL GOLF','9 holes · up to 4 kicks a hole · fewer kicks score more']);
 add(['callshot','🗣️','CALL YOUR SHOT','Call left, center or right before each kick · right calls pay 🪙 5']);
 add(['roul','🎡','DISTANCE ROULETTE','A wheel picks every kick from 20 to 70 yds · 8 balls']);
 add(['shrink','📐','SHRINKING POSTS','Uprights get narrower after every make · one miss ends it'])}}catch(e){}
const setW=(mph,a)=>{wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph*0.3}};const rw=m=>setW(Math.floor(Math.random()*m),(Math.random()<.5?-1:1)*(0.9+Math.random()*0.5));
const WIDE=3.08;let cx=0;
const oRes=result;result=function(r){try{cx=ball.x}catch(e){}return oRes.apply(this,arguments)};
setInterval(()=>{try{if(mode!=='xm_shrink'&&mode!=='xm_narrow'&&HALF!==WIDE)HALF=WIDE}catch(e){}},200);
// ---- #178 Shrinking Posts ----
XP.shrink={setup(c){weather='clear';HALF=Math.max(1.25,WIDE*Math.pow(0.93,c.made));dist=30+Math.min(15,c.made);rw(5)},
 next(c,good){c.pts=c.made;if(!good){HALF=WIDE;return 'fin'}const w=Math.max(1.25,WIDE*Math.pow(0.93,c.made));toast('📐 '+T_('Posts narrower')+' · '+Math.round(w/WIDE*100)+'%');return true},
 res(c){return T_('Makes in a row')+': '+c.made+' · '+T_('narrowest')+' '+Math.round(Math.max(1.25,WIDE*Math.pow(0.93,Math.max(0,c.made-1)))/WIDE*100)+'%'},
 hud(c){return '📐 '+T_('SHRINKING POSTS')+' · '+c.made+' · '+Math.round(HALF/WIDE*100)+'%'}};
// ---- #177 Distance Roulette ----
const SL=[20,25,30,35,40,45,50,55,60,65,70];
XP.roul={setup(c){weather='clear';rw(8);state='xguess';const tgt=SL[Math.floor(Math.random()*SL.length)];
 const d=card('🎡 '+T_('BALL')+' '+(c.k+1)+' / 8',`<div style="${ROW};text-align:center"><div id="w" style="font:900 54px system-ui;color:#f2c230;line-height:1.1">--</div><div style="${SUB}">${T_('yds')} · ${T_('Wind')} ${Math.abs(wind.mph)} mph</div></div>`,'fgfs90r',{nox:1});
 const el=d.querySelector('#w');let i=0;const n=2*SL.length+SL.indexOf(tgt);
 const spin=()=>{el.textContent=SL[i%SL.length];try{tone(900,700,0.03,0.06)}catch(e){}i++;if(i<=n){setTimeout(spin,40+Math.pow(i/n,3)*260)}else{el.textContent=tgt;el.style.transform='scale(1.15)';setTimeout(()=>{dist=tgt;c.cur=tgt;d.remove();resetBall();state='play'},650)}};
 spin();return 'hold'},
 next(c,good){if(good)c.pts+=c.cur;c.log.push(good?c.cur:'✗');return c.k>=8?'fin':true},
 res(c){return c.pts+' '+T_('yards made')+' · '+c.log.join(' · ')},hud(c){return '🎡 '+T_('ROULETTE')+' · '+c.pts+' '+T_('yds')+' · '+T_('ball')+' '+Math.min(8,c.k+1)+'/8'}};
// ---- #174 Call Your Shot ----
const CN={L:'LEFT',C:'CENTER',R:'RIGHT'};
XP.callshot={setup(c){weather='clear';dist=28+Math.floor(Math.random()*20);rw(7);state='xguess';
 const d=card('🗣️ '+T_('CALL YOUR SHOT')+' · '+(c.k+1)+' / 10',`<div style="${ROW};text-align:center">${dist} ${T_('yds')} · ${T_('Wind')} ${Math.abs(wind.mph)} mph<div style="${SUB};margin-top:4px">${T_('Where will it go through?')}</div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${['L','C','R'].map(k=>`<button data-c="${k}" style="${BS};padding:10px 0">${k==='L'?'◀ ':k==='R'?'':'● '}${T_(CN[k])}${k==='R'?' ▶':''}</button>`).join('')}</div>`,'fgfs90c',{nox:1});
 d.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{c.call=b.dataset.c;d.remove();resetBall();state='play';toast('🗣️ '+T_(CN[c.call]))});return 'hold'},
 next(c,good){let hit=false;if(good){const t=HALF/3,z=cx<-t?'L':cx>t?'R':'C';hit=z===c.call;c.pts+=hit?2:1;if(hit){c.hit=(c.hit||0)+1;coin(5);toast('🗣️ '+T_('Called it!')+' +🪙 5')}}c.log.push(good?(hit?'✓':'•'):'✗');return c.k>=10?'fin':true},
 res(c){return c.pts+' '+T_('points')+' · '+(c.hit||0)+' '+T_('calls right')},hud(c){return '🗣️ '+T_('CALL')+': '+T_(CN[c.call]||'')+' · '+c.pts+' '+T_('pts')}};
// ---- #106 Field Goal Golf ----
const HO=[[30,3],[38,6],[45,4],[33,10],[50,6],[42,9],[55,5],[36,13],[60,7]];
XP.golf={setup(c){if(c.h==null){c.h=0;c.s=0;c.tot=0;c.card=[]}weather=c.h===3||c.h===7?'rain':'clear';const H=HO[c.h];dist=H[0];if(c.s===0)c.side=Math.random()<.5?-1:1;setW(H[1],c.side*1.1);if(c.s===0)toast('⛳ '+T_('Hole')+' '+(c.h+1)+' · '+dist+' '+T_('yds')+' · '+T_('par')+' 2')},
 next(c,good){c.s++;if(good||c.s>=4){const st=good?c.s:5;c.tot+=st;c.card.push(st);c.pts+=Math.max(0,4-st);const lab=st===1?T_('Ace!'):st===2?T_('Par'):st===3?T_('Bogey'):good?T_('Double bogey'):T_('Picked up');toast('⛳ '+T_('Hole')+' '+(c.h+1)+' · '+lab);c.h++;c.s=0;if(c.h>=9)return 'fin'}return true},
 res(c){const d=c.tot-18;return T_('Kicks')+': '+c.tot+' ('+(d===0?T_('even par'):(d>0?'+':'')+d)+') · '+c.pts+' '+T_('points')+' · '+c.card.join(' · ')},
 hud(c){return '⛳ '+T_('Hole')+' '+Math.min(9,(c.h||0)+1)+'/9 · '+T_('kick')+' '+((c.s||0)+1)+' · '+T_('total')+' '+(c.tot||0)}};
})();
