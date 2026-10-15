// s61 Batch 11b — replay + stats tools: last-kick Scrubber with Photo save, slow-mo replay on misses (respects
// Reduced Motion, can be turned off), Kick Diary (top 20 makes), This week vs last week, Weekly Wrap card,
// copy/share stats as text, coin breakdown on Game Over, Career scout report + post-game recap.
(function(){
const J2=(k,d)=>{try{return JSON.parse(LS[k]||'')||d}catch(e){return d}},S2=(k,v)=>LS[k]=JSON.stringify(v);
const MN=m=>{try{return(MODES.find(x=>x[0]===m)||[0,m])[1]}catch(e){return m}};
// ---------- per-kick track (own copy, same data the built-in replay uses) ----------
let TK=[],LAST=null,kickD=0,kickM='',kickW='',snapC=null;
const oTop=S3.top;S3.top=function(dt){if(state==='play'&&ball.fly&&!paused&&TK.length<900)TK.push({x:ball.x,y:ball.y,z:ball.z,r:ball.rot});
 if(state==='scrub'&&SC){if(SC.auto){SC.t+=dt*0.35;SC.i=Math.min(LAST.tr.length-1,Math.floor(SC.t*60));if(SC.i>=LAST.tr.length-1){SC.hold=(SC.hold||0)+dt;if(SC.hold>0.6)endScrub()}}const p=LAST.tr[SC.i];if(p){Object.assign(ball,{x:p.x,y:p.y,z:p.z,rot:p.r,fly:true});trail=LAST.tr.slice(Math.max(0,SC.i-18),SC.i+1).map(q=>({x:q.x,y:q.y,z:q.z}))}const sl=document.getElementById('fgfscr');if(sl&&SC.auto)sl.value=SC.i}
 return oTop(dt)};
const oK=kick;kick=function(){if(!ball.fly){TK=[];snapC=coins;kickD=dist;kickM=mode;kickW=typeof weather!=='undefined'?weather:''}return oK.apply(this,arguments)};
// ---------- game + week stats ----------
let G={on:0},WK=J2('fgfWk2',{}),DI=J2('fgfDiary',[]);
const wkKey=(o=0)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7)-7*o);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
const wk=()=>{const k=wkKey();if(!WK[k])WK[k]={g:0,att:0,made:0,coins:0,best:0,long:0,stk:0};const ks=Object.keys(WK);if(ks.length>8){ks.sort((a,b)=>new Date(a)-new Date(b)).slice(0,ks.length-8).forEach(x=>delete WK[x])}return WK[k]};
const oNG=newGame;newGame=function(){const r=oNG.apply(this,arguments);if(mode!=='tut'&&mode!=='range'){G={on:1,m:mode,att:0,made:0,long:0,kc:0,c0:coins,ex:0,stk:0};wk().g++;S2('fgfWk2',WK)}else G={on:0};return r};
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{
 LAST={tr:TK.slice(),good,d:kickD,m:kickM};
 if(G.on&&mode!=='tut'&&mode!=='range'){const w=wk();G.att++;w.att++;const dc=snapC!=null?coins-snapC:0;if(good){G.made++;w.made++;G.long=Math.max(G.long,kickD);w.long=Math.max(w.long,kickD);G.stk=Math.max(G.stk,streak);w.stk=Math.max(w.stk,streak);if(dc>0)G.kc+=dc;
   DI.push({d:kickD,m:kickM,w:kickW,t:Date.now()});DI.sort((a,b)=>b.d-a.d||b.t-a.t);DI=DI.slice(0,20);S2('fgfDiary',DI)}S2('fgfWk2',WK)}snapC=null}catch(e){}return r};
// coins earned this week = every increase of the coin balance (purchases are decreases, so they don't count)
let lastC=coins;setInterval(()=>{if(coins>lastC&&!window.TESTER){wk().coins+=coins-lastC;S2('fgfWk2',WK)}lastC=coins},400);
const oEnd=S3.onEnd;S3.onEnd=function(){const r=oEnd?oEnd.apply(this,arguments):undefined;try{if(G.on){G.done=1;G.score=score;G.earn=coins-G.c0;const w=wk();w.best=Math.max(w.best,score);S2('fgfWk2',WK)}}catch(e){}return r};
// ---------- slow-mo on misses ----------
let SC=null,skipNext=false;
const missOK=()=>LS.fgfMissSlo!=='0'&&!(window.FGF_RM&&FGF_RM())&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const oNx=S3.next;S3.next=function(good){if(skipNext){skipNext=false;return oNx.apply(this,arguments)}
 if(!good&&LAST&&!LAST.good&&LAST.tr.length>12&&LAST.d>=35&&missOK()&&!['time','tut','vs'].includes(mode)&&ball.res!=='BLOCKED!'){startScrub(true,'play');return true}return oNx.apply(this,arguments)};
function afterMiss(){skipNext=true;state='play';if(S3.next(false))return;if(lives<=0||(mode==='time'&&timeLeft<=0)){endGame();return}prevLives=lives;newWind();resetBall()}
// ---------- scrubber + photo ----------
function startScrub(auto,ret){if(!LAST||LAST.tr.length<2)return toast('Kick first, then open the replay');SC={auto,ret,i:auto?0:LAST.tr.length-1,t:0,bs:{...ball},tr0:trail.slice()};state='scrub';ui()}
function endScrub(){const s=SC;SC=null;const d=document.getElementById('fgfscrub');if(d)d.remove();Object.assign(ball,s.bs);trail=s.tr0;if(s.auto)afterMiss();else state=s.ret}
function ui(){let d=document.getElementById('fgfscrub');if(d)d.remove();d=document.createElement('div');d.id='fgfscrub';d.className='fgfov';d.style.cssText='position:fixed;inset:auto 0 0 0;background:linear-gradient(transparent,rgba(0,0,0,.75) 30%);padding:28px 12px calc(14px + env(safe-area-inset-bottom));z-index:66;display:flex;flex-direction:column;gap:8px;color:#fff;font:700 13px system-ui';
 const n=LAST.tr.length-1;d.innerHTML=SC.auto?`<div style="text-align:center;color:#ff8a7a;font:900 15px system-ui">MISS REPLAY · ${LAST.d} YDS</div><div style="display:flex;gap:8px;justify-content:center"><button class="b" id="scsk" style="${BS}">SKIP ▶</button><button class="b" id="scoff" style="${BS}">Turn off miss replays</button></div>`:
 `<div style="text-align:center;color:#f2c230;font:900 15px system-ui">🎞️ LAST KICK · ${LAST.d} YDS · ${LAST.good?'GOOD':'MISS'}</div><input id="fgfscr" type="range" min="0" max="${n}" value="${SC.i}" style="width:100%;accent-color:#f2c230;height:34px"><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="b" id="scpl" style="${BS}">▶ PLAY SLOW</button><button class="b" id="scph" style="${BS}">📷 SAVE PHOTO</button><button class="b" id="scx" style="${BS}">◀ BACK</button></div>`;
 document.body.appendChild(d);const $=i=>d.querySelector('#'+i);
 if(SC.auto){$('scsk').onclick=endScrub;$('scoff').onclick=()=>{LS.fgfMissSlo='0';toast('Miss replays off · turn on in 📊 Stats');endScrub()};return}
 $('fgfscr').oninput=e=>{SC.auto=false;SC.i=+e.target.value};$('scx').onclick=endScrub;$('scpl').onclick=()=>{SC.i=0;SC.t=0;SC.auto=true;SC.play=1};$('scph').onclick=photo}
const BS='border:2px solid #f2c230;background:#05200f;color:#f2c230;border-radius:16px;padding:9px 14px;font:900 12px system-ui';
// manual play from the scrubber stops at the end instead of leaving
const oE2=endScrub;endScrub=function(){if(SC&&SC.play&&SC.auto){SC.auto=false;SC.play=0;return}return oE2()};
function photo(){try{const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d');x.drawImage(cv,0,0);const k=cv.width/W;x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,c.height-30*k,c.width,30*k);x.fillStyle='#f2c230';x.font='900 '+(13*k)+'px system-ui';x.textAlign='center';x.fillText('🏈 FIELD GOAL FRENZY · '+LAST.d+' YDS',c.width/2,c.height-10*k);
 c.toBlob(bl=>{if(!bl)return;const f=new File([bl],'fgf-photo-'+LAST.d+'yd.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f]}).catch(()=>{})}else{const a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download=f.name;document.body.appendChild(a);a.click();a.remove();toast('📷 Photo saved')}window.FGF_LASTPHOTO=bl.size},'image/png')}catch(e){toast('Could not save photo')}}
// replay chip during the built-in replay and on Game Over
const chip=document.createElement('button');chip.id='fgfscrchip';chip.className='fgfov fgfper';chip.textContent='🎞️ SCRUB';chip.style.cssText='position:fixed;inset:auto;top:calc(10px + env(safe-area-inset-top));right:10px;z-index:64;display:none;'+BS;document.body.appendChild(chip);
chip.onclick=()=>startScrub(false,state);
setInterval(()=>{chip.style.display=(state==='over'||state==='replay')&&LAST&&LAST.tr.length>2&&!document.getElementById('fgfscrub')?'block':'none'},200);
// ---------- coin breakdown on Game Over ----------
const cb=document.createElement('div');cb.id='fgfcoinbd';cb.className='fgfov fgfper';cb.style.cssText='position:fixed;inset:auto;top:calc(12px + env(safe-area-inset-top));left:10px;right:110px;z-index:64;display:none;background:rgba(0,0,0,.6);border:1px solid #f2c23088;border-radius:12px;padding:5px 9px;color:#ffd23f;font:700 11px system-ui;pointer-events:none';document.body.appendChild(cb);
setInterval(()=>{const on=state==='over'&&G.done&&G.earn!=null;cb.style.display=on?'block':'none';if(on){const kc=Math.min(G.kc,Math.max(0,G.earn)),ex=Math.max(0,G.earn-kc);cb.textContent='🪙 +'+Math.max(0,G.earn).toLocaleString()+' this game · kicks '+kc.toLocaleString()+' · bonuses '+ex.toLocaleString()+' · '+G.made+'/'+G.att+' made'}},250);
const oSc=S3.screen;S3.screen=function(){if(state==='scrub')return true;const r=oSc.apply(this,arguments);try{if(state!==ls2){ls2=state;if(state==='title')wrapCard()}}catch(e){}return r};let ls2='';
// ---------- Career scout report + recap ----------
const oSCG=startCareerGame;startCareerGame=function(){try{const c=CAR,sc=c.wk<16?c.sched[c.wk]:null,o=sc?sc.o:c.po[c.wk-16];if(o!=null){const t=TEAMS[o],h=c.sched.map((s,i)=>s&&s.o===o?c.res[i]:null).filter(Boolean),wn=h.filter(x=>x==='W').length;
 const tip=['Their kicker is streaky: bank early points.','Expect long tries late: practice 45+ in the Range.','Windy stadium: watch the arrows before every kick.','They play fast: be ready for a short clock.'][(o+c.wk)%4];
 card('📋 SCOUT REPORT',[(sc&&sc.h?'vs ':'@ ')+t.n+(sc&&sc.rv?' · RIVALRY':''),'Rival kicker: '+t.rv,h.length?'Your record vs them: '+wn+'-'+(h.length-wn):'First meeting',tip],'PLAY ▶')}}catch(e){}G={on:1,m:'career',att:0,made:0,long:0,kc:0,c0:coins,stk:0};return oSCG.apply(this,arguments)};
const oFG=finishGame;finishGame=function(){const r=oFG.apply(this,arguments);try{card(CG.win?'🏆 WIN · RECAP':'RECAP',[TEAMS[myT()].n+' '+CG.my+' - '+CG.op+' '+(TEAMS[CG.o]?TEAMS[CG.o].n:''),'Kicks made: '+G.made+' / '+G.att,'Longest: '+(G.long||0)+' yds','Coins: 🪙 +'+Math.max(0,coins-G.c0).toLocaleString()],'OK')}catch(e){}return r};
function card(h,lines,btn,extra){const o=document.getElementById('fgfcard');if(o)o.remove();const d=document.createElement('div');d.id='fgfcard';d.className='fgfov';d.style.cssText='position:fixed;inset:0;background:rgba(2,10,6,.86);z-index:68;display:flex;align-items:center;justify-content:center;padding:16px';
 d.innerHTML=`<div style="background:#062a14;border:2px solid #f2c230;border-radius:16px;padding:16px;max-width:340px;width:100%;color:#fff;font:14px system-ui;max-height:86vh;overflow:auto"><div style="color:#f2c230;font:900 18px system-ui;text-align:center;margin-bottom:10px">${h}</div>${lines.map(l=>`<div style="margin:6px 0">${String(l).replace(/</g,'&lt;')}</div>`).join('')}${extra||''}<button id="fgfcardok" style="${BS};display:block;margin:14px auto 0;min-width:140px;background:#f2c230;color:#000">${btn}</button></div>`;document.body.appendChild(d);d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',350);d.querySelector('#fgfcardok').onclick=()=>d.remove();return d}
// ---------- Stats screen ----------
const WN={clear:'☀️',rain:'🌧️',snow:'❄️',fog:'🌫️',gust:'💨',heat:'🔥',hlite:'⛈️',hurricane:'🌪️',chaos:'🌀'};
function cmp(a,b){return a===b?'':a>b?' <span style="color:#7fff8a">▲</span>':' <span style="color:#ff8a7a">▼</span>'}
function statsText(){const a=WK[wkKey()]||{},b=WK[wkKey(1)]||{};return '🏈 My Field Goal Frenzy stats\nBest score: '+(+(LS.fgfBest||0)).toLocaleString()+'\nThis week: '+(a.made||0)+'/'+(a.att||0)+' made · longest '+(a.long||0)+' yds · best game '+(a.best||0)+'\nLast week: '+(b.made||0)+'/'+(b.att||0)+' made · longest '+(b.long||0)+' yds\nTop kicks: '+DI.slice(0,5).map(x=>x.d+' yds').join(', ')+'\n'+location.origin+location.pathname}
function openStats(){const a=WK[wkKey()]||{g:0,att:0,made:0,coins:0,best:0,long:0,stk:0},b=WK[wkKey(1)]||{g:0,att:0,made:0,coins:0,best:0,long:0,stk:0};const pc=x=>x.att?Math.round(x.made/x.att*100)+'%':'–';
 const row=(n,x,y)=>`<tr><td>${n}</td><td style="text-align:right">${x}${cmp(typeof x==='string'?parseInt(x)||0:x,typeof y==='string'?parseInt(y)||0:y)}</td><td style="text-align:right;color:#bcd">${y}</td></tr>`;
 const tb=`<div style="color:#f2c230;font-weight:900;margin-top:4px">THIS WEEK vs LAST WEEK</div><table style="width:100%;font-size:13px;border-collapse:collapse"><tr style="color:#bcd;font-size:11px"><td></td><td style="text-align:right">this</td><td style="text-align:right">last</td></tr>${row('Games',a.g,b.g)}${row('Makes',a.made,b.made)}${row('FG %',pc(a),pc(b))}${row('Longest',a.long,b.long)}${row('Best game',a.best,b.best)}${row('Best streak',a.stk,b.stk)}${row('Coins earned',a.coins,b.coins)}</table>`;
 const di=`<div style="color:#f2c230;font-weight:900;margin-top:12px">📖 KICK DIARY · TOP ${DI.length||20}</div>`+(DI.length?DI.map((x,i)=>`<div style="display:flex;justify-content:space-between;font-size:12px;border-bottom:1px solid #f2c23033;padding:4px 0"><span>${i+1}. <b>${x.d} yds</b> ${WN[x.w]||''}</span><span style="color:#bcd">${MN(x.m)} · ${new Date(x.t).toLocaleDateString()}</span></div>`).join(''):'<div style="color:#bcd;font-size:12px">Make a kick and it shows up here.</div>');
 const op=`<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button id="stcp" style="${BS}">📋 COPY STATS</button><button id="stsh" style="${BS}">📤 SHARE</button><button id="stms" style="${BS}">Miss replays: ${LS.fgfMissSlo==='0'?'OFF':'ON'}</button><button id="stwr" style="${BS}">🗓️ LAST WEEK WRAP</button></div>`;
 const d=card('📊 MY STATS',[],'◀ BACK',tb+di+op);const $=i=>d.querySelector('#'+i);
 $('stcp').onclick=()=>{const t=statsText();(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('📋 Stats copied'),()=>{prompt('Copy your stats:',t)})};
 $('stsh').onclick=()=>{const t=statsText();if(navigator.share)navigator.share({text:t}).catch(()=>{});else $('stcp').onclick()};
 $('stms').onclick=e=>{LS.fgfMissSlo=LS.fgfMissSlo==='0'?'1':'0';e.target.textContent='Miss replays: '+(LS.fgfMissSlo==='0'?'OFF':'ON')};$('stwr').onclick=()=>wrapCard(true)}
function wrapCard(force){const k=wkKey(1),b=WK[k];if(!force&&(!b||!b.g||LS.fgfWrapSeen===k))return;LS.fgfWrapSeen=k;if(!b||!b.g){toast('No games last week yet');return}const bestD=DI.filter(x=>x.t>=new Date(k).getTime()&&x.t<new Date(k).getTime()+7*864e5)[0];
 card('🗓️ WEEK WRAP',['Week of '+new Date(k).toLocaleDateString(),'Games: '+b.g+' · Makes: '+b.made+'/'+b.att,'Longest make: '+(b.long||0)+' yds'+(bestD?' ('+MN(bestD.m)+')':''),'Best streak: '+b.stk+' · Best game: '+b.best.toLocaleString(),'Coins earned: 🪙 '+b.coins.toLocaleString()],'NICE!')}
// Stats button on the title screen (top right)
const oSc2=S3.screen;S3.screen=function(){const r=oSc2.apply(this,arguments);try{if(state==='title'&&!document.querySelector('.fgfov:not(.fgfper)'))bx(W-64,44,58,26,'📊 STATS',openStats,false,9)}catch(e){}return r};
window.FGF_STATS={openStats,startScrub,wrapCard,statsText,get LAST(){return LAST},get G(){return G},get DI(){return DI},WK:()=>WK,wkKey};
})();
