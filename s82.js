// s79 (Kirk, Oct 17 · daily ideas 7, 9-20): progression. Weekly Kick Bingo, Mode of the Day (+25% coins), your own goal,
// Career Book (team stamps, season awards, timeline of firsts, retire-your-number, weather badges, next-rank preview, prestige),
// rivals remember your last result, gold CLUTCH tag in the Kick Diary, One Shot Daily "% who made it" (free Supabase, existing table).
(function(){const U=window.FGF_UI;if(!U)return;const {T_,J2,S2,DK,hash,esc,BS,ON,ROW,SUB,H2,card,empty,api,uid,ini,MN}=U;
const LOCAL=/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname)&&!/sbtest=1/.test(location.search);
const WK=()=>U.WEEK();const coin=n=>{if(!n)return;addCoins(n)};
const fmt=n=>(+n||0).toLocaleString();
// ---------- event feed ----------
const LST=[];const on=f=>LST.push(f);const emit=(e)=>{for(const f of LST){try{f(e)}catch(x){}}};
const RUNM=new Set();
const oR=S3.onResult;S3.onResult=function(good){const cl=mode==='career'&&S3.cl();const doink=!!(ball&&ball.hitPost);const r=oR.apply(this,arguments);
 try{if(mode!=='tut'&&!window.FGF_TRYING){RUNM.add(mode);emit({t:good?'make':'miss',d:dist,m:mode,wx:weather,stk:streak,doink:doink&&good,cl,lead:mode==='career'&&CG?CG.my-CG.op:0})}}catch(e){}return r};
const oNG=newGame;newGame=function(m){const r=oNG.apply(this,arguments);try{if(mode!=='tut')emit({t:'start',m:mode})}catch(e){}return r};
const oEnd=S3.onEnd;S3.onEnd=function(){const sc=score,m=mode;const r=oEnd.apply(this,arguments);try{if(m!=='tut')emit({t:'end',m,sc})}catch(e){}return r};
let lastX=null;setInterval(()=>{try{const X=window.FGF_XM&&FGF_XM();if(X&&X.done&&X!==lastX){lastX=X;emit({t:'end',m:'xm_'+X.t,sc:X.pts||X.made||0,X})}}catch(e){}},600);
const oFin=finishGame;finishGame=function(){const w=CG&&CG.my>CG.op,o=CG&&CG.o,po=CAR&&CAR.wk>=16,wk=CAR&&CAR.wk,my=CG&&CG.my,op=CG&&CG.op;const r=oFin.apply(this,arguments);try{emit({t:'cgame',w,o,po,wk,my,op,done:CAR&&CAR.done,season:CAR&&CAR.season})}catch(e){}return r};

// ================= 17) TIMELINE OF FIRSTS =================
const FI=()=>J2('fgfFirsts',{});const FLAB={make:'First made kick',y40:'First 40-yard make',y50:'First 50-yard make',y60:'First 60-yard make',y70:'First 70-yard make',legend:'First 80-yard Legend',doink:'First doink-in',s5:'First 5 in a row',s10:'First 10 in a row',cwin:'First Career win',pwin:'First playoff win',title:'First championship',daily:'First Daily Challenge made',goal:'First personal goal reached',bingo:'First Bingo line',stamp:'First team stamp',prest:'First prestige star',wx:'First weather badge'};
function first(k){const f=FI();if(f[k])return;f[k]=Date.now();S2('fgfFirsts',f);toast('📌 '+T_(FLAB[k]||k)+' · '+T_('added to your timeline'))}
on(e=>{if(e.t==='make'){first('make');if(e.d>=40)first('y40');if(e.d>=50)first('y50');if(e.d>=60)first('y60');if(e.d>=70)first('y70');if(e.d>=80)first('legend');if(e.doink)first('doink');if(e.stk>=5)first('s5');if(e.stk>=10)first('s10');if(e.m==='daily')first('daily')}
 if(e.t==='cgame'&&e.w){first('cwin');if(e.po)first('pwin');if(e.wk===17)first('title')}});

// ================= 19) WEATHER MASTERY (10 makes in each weather) =================
const WXL=[['clear','☀️','Clear'],['rain','🌧️','Rain'],['snow','❄️','Snow'],['gust','💨','Gusty'],['fog','🌫️','Fog'],['heat','🔥','Heat'],['hurricane','🌀','Hurricane'],['tornado','🌪️','Tornado']];
on(e=>{if(e.t!=='make')return;let w=e.wx;if(e.m==='tornado'||e.m==='twister')w='tornado';if(!WXL.some(x=>x[0]===w))return;const M=J2('fgfWxM',{});M[w]=(M[w]||0)+1;S2('fgfWxM',M);if(M[w]===10){coin(100);first('wx');const x=WXL.find(q=>q[0]===w);toast('🏅 '+T_('Weather badge')+': '+x[1]+' '+T_(x[2])+' · 🪙 +100')}});

// ================= 18) RETIRE YOUR NUMBER at 1,000 lifetime makes =================
const life=()=>{const s=J2('fgfStats2',{});return +s.m||0};
const jn=()=>{try{return NUMS[myT()]}catch(e){return 14}};
on(e=>{if(e.t==='make'&&!LS.fgfRetired&&life()>=1000){LS.fgfRetired=Date.now();LS.fgfRetiredN=jn();coin(1000);setTimeout(()=>card('🎽 #'+jn()+' '+T_('RETIRED'),`<div style="${ROW};text-align:center"><div style="font:900 44px system-ui">#${jn()}</div>${T_('1,000 lifetime makes. Your number now hangs in the rafters.')}<div style="${SUB};margin-top:4px">🪙 +1,000 · ${T_('banner on Events & More')}</div></div>`,'fgfs79ret'),1500)}});

// ================= 13) BEAT EVERY TEAM (Career stamps) · 9) RIVALS REMEMBER YOU · 15) SEASON AWARDS =================
on(e=>{if(e.t!=='cgame')return;const mem=J2('fgfRivMem',{});mem[e.o]={w:e.w?1:0,my:e.my,op:e.op,t:Date.now()};S2('fgfRivMem',mem);
 if(e.w){const s=J2('fgfStamps',[]);if(!s.includes(e.o)){s.push(e.o);S2('fgfStamps',s);first('stamp');toast('🏟️ '+T_('Team stamp')+': '+TEAMS[e.o].n+' · '+s.length+'/7');const all=TEAMS.map((t,i)=>i).filter(i=>i!==myT());if(all.every(i=>s.includes(i))&&!LS.fgfSlayer){LS.fgfSlayer=Date.now();coin(1000);setTimeout(()=>card('🏆 '+T_('TEAM SLAYER'),`<div style="${ROW};text-align:center">${T_('You beat every team in Career.')}<div style="${SUB};margin-top:4px">🪙 +1,000 · ${T_('new title: TEAM SLAYER')}</div></div>`,'fgfs79sl'),1200)}}}});
const RL={w:['You beat us last time. Not again.','I still hear that crowd from last time. Payback today.','Last time was luck. Watch this.'],l:['We got you last time. Same again today.','Remember last time? I do.','You missed when it mattered last time.']};
const oSA=simAdvance;simAdvance=function(){const fresh=CG&&CG.d===0&&!CG.__rm;const r=oSA.apply(this,arguments);try{if(fresh&&CG&&!CG.__rm&&state==='ctick'){CG.__rm=1;const m=J2('fgfRivMem',{})[CG.o];if(m){const L=m.w?RL.w:RL.l,t=TEAMS[CG.o];CG.log.unshift('🗣️ '+(t.rv||t.a)+' · '+T_(L[(hash(t.rv+CAR.season+CG.wk)%L.length)])+' · '+(m.w?m.my+'-'+m.op:m.op+'-'+m.my))}}}catch(e){}return r};
// season tracker
const SX=()=>{const s=J2('fgfSeasonX',null);const n=CAR?CAR.season:0;if(!s||s.season!==n)return{season:n,att:0,made:0,long:0,cl:0,run:0,br:0};return s};
on(e=>{if(e.m!=='career'||(e.t!=='make'&&e.t!=='miss'))return;const s=SX();s.att++;if(e.t==='make'){s.made++;s.long=Math.max(s.long,e.d);s.run++;s.br=Math.max(s.br,s.run);if(e.cl&&e.lead>=0)s.cl++}else s.run=0;S2('fgfSeasonX',s)});
function awardsFor(s){const A=[];if(s.cl>=2)A.push(['🧊','CLUTCH KICKER',s.cl+' '+T_('clutch makes')]);if(s.long>0)A.push(['📏','LONGEST MAKE',s.long+' '+T_('yds')]);if((s.att>=15&&s.made/s.att>=0.85)||s.br>=10)A.push(['🦵','IRON LEG',Math.round(s.made/Math.max(1,s.att)*100)+'% · '+s.br+' '+T_('in a row')]);return A}
on(e=>{if(e.t!=='cgame'||!e.done)return;const s=SX();const all=J2('fgfAwards',[]);if(all.some(a=>a.season===e.season))return;const A=awardsFor(s);all.unshift({season:e.season,a:A,t:Date.now()});S2('fgfAwards',all.slice(0,20));if(A.length){coin(100*A.length);setTimeout(()=>card('🏅 '+T_('SEASON AWARDS')+' · '+T_('Season')+' '+e.season,A.map(a=>`<div style="${ROW}">${a[0]} <b>${T_(a[1])}</b><div style="${SUB}">${a[2]}</div></div>`).join('')+`<div style="${SUB};text-align:center">🪙 +${100*A.length}</div>`,'fgfs79aw'),1800)}});
// ================= 10) CLUTCH tag in the Kick Diary (tie or win a Career game in crunch time) =================
on(e=>{if(e.t==='make'&&e.m==='career'&&e.cl&&e.lead>=0){try{const D=FGF_STATS.DI;if(D&&D.length){let x=D[0];D.forEach(q=>{if(q.t>x.t)x=q});if(Date.now()-x.t<3000){x.c=1;S2('fgfDiary',D)}}}catch(_){}}});

// ================= 14) MODE OF THE DAY (+25% coins on makes) =================
const MODP=['classic','time','pressure','hurricane','chaos'];const MOD=()=>MODP[hash('mod'+DK())%MODP.length];window.FGF_MOD=MOD;
const oRes=result;result=function(r){const c0=coins;const out=oRes.apply(this,arguments);try{if(r==='GOOD!'&&mode===MOD()){const dc=coins-c0;if(dc>0){const ex=Math.max(1,Math.round(dc*0.25));coins+=ex;if(!window.TESTER)LS.fgfCoins=coins;if(msg)msg.s2=(msg.s2||'')+'  🎯 +'+ex}}}catch(e){}return out};

// ================= 12) WEEKLY KICK BINGO =================
const BP=[['m50','Make a 50+ yd kick'],['m60','Make a 60+ yd kick'],['s5','Make 5 in a row'],['time','Finish a Time Attack run'],['press','Finish a Pressure Kick run'],['chaos','Finish a Chaos run'],['snow','Make a kick in snow'],['rain','Make a kick in rain'],['gust','Make a kick in gusty wind'],['cwin','Win a Career game'],['c3k','Score 3,000 in one Classic run'],['daily','Play the Daily Challenge'],['m20','Make 20 kicks this week'],['doink','Make a doink-in'],['storm','Make a kick in a storm mode'],['mm','Finish a More Modes game'],['wc5','Make 5 in Wind Climb'],['range','Make 3 kicks in Practice Range']];
function bingo(){let b=J2('fgfBingo',null);if(!b||b.w!==WK()){const ids=BP.map(x=>x[0]).sort((a,c)=>hash(WK()+a)-hash(WK()+c)).slice(0,9);b={w:WK(),ids,done:[],lines:[],full:0,n:{}};S2('fgfBingo',b)}return b}
const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function mark(id){const b=bingo();if(!b.ids.includes(id)||b.done.includes(id))return;b.done.push(id);const i=b.ids.indexOf(id);toast('🎱 '+T_('Bingo square')+': '+T_(BP.find(x=>x[0]===id)[1]));
 LINES.forEach((L,k)=>{if(!b.lines.includes(k)&&L.every(j=>b.done.includes(b.ids[j]))){b.lines.push(k);coin(150);first('bingo');toast('🎱 '+T_('BINGO! Line complete')+' · 🪙 +150')}});
 if(!b.full&&b.done.length===9){b.full=1;coin(1000);setTimeout(()=>card('🎱 '+T_('FULL CARD!'),`<div style="${ROW};text-align:center">${T_('You filled the whole Bingo card this week.')}<div style="${SUB};margin-top:4px">🪙 +1,000</div></div>`,'fgfs79bf'),900)}S2('fgfBingo',b)}
on(e=>{const b=bingo();if(e.t==='make'){b.n.m=(b.n.m||0)+1;if(e.m==='range')b.n.r=(b.n.r||0)+1;S2('fgfBingo',b);if(e.d>=50)mark('m50');if(e.d>=60)mark('m60');if(e.stk>=5)mark('s5');if(e.wx==='snow')mark('snow');if(e.wx==='rain')mark('rain');if(e.wx==='gust')mark('gust');if(e.doink)mark('doink');if(/^(hurricane|storm|tornado|twister|dstorm)$/.test(e.m))mark('storm');if(b.n.m>=20)mark('m20');if((b.n.r||0)>=3)mark('range');if(e.m==='daily')mark('daily')}
 if(e.t==='miss'&&e.m==='daily')mark('daily');
 if(e.t==='end'){if(e.m==='time')mark('time');if(e.m==='pressure')mark('press');if(e.m==='chaos')mark('chaos');if(e.m==='classic'&&e.sc>=3000)mark('c3k');if(/^mm_/.test(e.m))mark('mm');if(e.m==='xm_wclimb'&&e.X&&e.X.made>=5)mark('wc5')}
 if(e.t==='cgame'&&e.w)mark('cwin')});
setInterval(()=>{try{const M=window.FGF_MM&&FGF_MM();if(M&&M.done&&M!==bingo.__m){bingo.__m=M;mark('mm')}}catch(e){}},700);
function bingoCard(){const b=bingo();const cell=(id,i)=>{const d=b.done.includes(id);return `<div style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;text-align:center;padding:5px;border-radius:12px;font:700 11px system-ui;line-height:1.2;overflow:hidden;${d?'background:rgba(127,211,138,.18);border:1px solid rgba(127,211,138,.7);color:#bdf0c4':'background:rgba(10,30,20,.85);border:1px solid rgba(160,190,175,.2);color:#dfeee6'}">${d?'✓ ':''}${T_(BP.find(x=>x[0]===id)[1])}</div>`};
 card('🎱 '+T_('WEEKLY KICK BINGO'),`<div style="${SUB};text-align:center;margin-bottom:8px">${T_('New card every Monday. Each line = 🪙 150 · full card = 🪙 1,000')}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px">${b.ids.map(cell).join('')}</div><div style="${ROW};margin-top:10px;text-align:center">${b.done.length}/9 · ${T_('lines')} ${b.lines.length}/8${b.full?' · 🏆':''}</div>`,'fgfs79bg')}
window.FGF_BINGO={bingo,mark,card:bingoCard};

// ================= 16) SET YOUR OWN GOAL =================
const GP=[['d50','Make a 50-yard kick',e=>e.t==='make'&&e.d>=50],['d60','Make a 60-yard kick',e=>e.t==='make'&&e.d>=60],['d70','Make a 70-yard kick',e=>e.t==='make'&&e.d>=70],['d80','Make the 80-yard Legend',e=>e.t==='make'&&e.d>=80],['s5','Make 5 in a row',e=>e.t==='make'&&e.stk>=5],['s10','Make 10 in a row',e=>e.t==='make'&&e.stk>=10],['c3','Score 3,000 in Classic',e=>e.t==='end'&&e.m==='classic'&&e.sc>=3000],['c6','Score 6,000 in Classic',e=>e.t==='end'&&e.m==='classic'&&e.sc>=6000],['t15','Score 15,000 in Time Attack',e=>e.t==='end'&&e.m==='time'&&e.sc>=15000],['cw','Win a Career game',e=>e.t==='cgame'&&e.w]];
on(e=>{const g=J2('fgfGoal',null);if(!g||g.done)return;const p=GP.find(x=>x[0]===g.k);if(p&&p[2](e)){g.done=Date.now();S2('fgfGoal',g);coin(250);first('goal');const h=J2('fgfGoalH',[]);h.unshift({k:g.k,t:g.done});S2('fgfGoalH',h.slice(0,10));setTimeout(()=>card('🎯 '+T_('GOAL REACHED!'),`<div style="${ROW};text-align:center"><b>${T_(p[1])}</b><div style="${SUB};margin-top:4px">🪙 +250 · ${T_('pick your next goal in Events & More')}</div></div>`,'fgfs79gd'),1500)}});
function goalCard(){const g=J2('fgfGoal',null),h=J2('fgfGoalH',[]);const d=card('🎯 '+T_('MY GOAL'),(g&&!g.done?`<div style="${ROW};${ON}">🎯 <b>${T_((GP.find(x=>x[0]===g.k)||[0,''])[1])}</b><div style="${SUB}">${T_('Reward')}: 🪙 250</div></div>`:empty('Pick a goal below. Reach it for 🪙 250.'))+H2('PICK A GOAL')+GP.map(p=>`<button data-g="${p[0]}" style="${BS};display:block;width:100%;text-align:left;margin-bottom:8px;${g&&g.k===p[0]&&!g.done?ON:''}">${T_(p[1])}</button>`).join('')+H2('REACHED')+(h.length?h.map(x=>`<div style="${ROW}">✅ ${T_((GP.find(q=>q[0]===x.k)||[0,x.k])[1])}<div style="${SUB}">${new Date(x.t).toLocaleDateString()}</div></div>`).join(''):empty('No goals reached yet.')),'fgfs79go');
 d.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{S2('fgfGoal',{k:b.dataset.g,set:Date.now()});toast('🎯 '+T_('Goal set'));goalCard()})}

// ================= 11) PRESTIGE (after Level 40 · Legend) · 20) NEXT-RANK PREVIEW =================
const PN=()=>+(LS.fgfPrest||0);
{const oT=window.FGF_TITLE;if(oT)window.FGF_TITLE=FGF_TITLE=function(){const t=oT.apply(this,arguments);const n=PN();return n?t+' ★'+n:t}}
const TIT=[[1,'Rookie'],[5,'Starter'],[10,'Pro'],[20,'All-Pro'],[30,'Hall of Famer'],[40,'Legend']];
function nextRank(){const L=FGF_LV(),l=L.l,nt=TIT.find(t=>t[0]>l),nr=Math.ceil((l+1)/5)*5;let h=`<div style="${ROW}"><b>${T_('Level')} ${l} → ${l+1}</b><div style="height:7px;border-radius:4px;background:rgba(160,190,175,.15);margin:7px 0 4px"><div style="height:7px;border-radius:4px;width:${Math.round(L.cur/L.need*100)}%;background:#7fd38a"></div></div><div style="${SUB}">${fmt(L.need-L.cur)} ${T_('XP to go')}</div></div>`;
 h+=`<div style="${ROW}">🎁 ${T_('Level')} ${nr}: 🪙 ${fmt(100*nr)}</div>`+(nt?`<div style="${ROW}">🏷️ ${T_('Level')} ${nt[0]}: ${T_('new title')} <b>${T_(nt[1])}</b></div>`:`<div style="${ROW}">⭐ ${T_('Top title reached. Prestige is open.')}</div>`);
 try{const r=rank(),i=RANKS.findIndex(x=>x[0]===r[0]),n=RANKS[i+1];h+=`<div style="${ROW}">🏈 ${T_('Career rank')}: <b>${T_(r[0])}</b>${n?`<div style="${SUB}">${T_('Next')}: ${T_(n[0])} · ${fmt(n[1]-xp())} ${T_('Career XP to go')} (${T_('wins, playoff wins, titles, Legends')})</div>`:''}</div>`}catch(e){}return h}
function prestige(){if(FGF_LV().l<40){toast(T_('Prestige opens at Level 40 (Legend)'));return}const d=card('⭐ '+T_('PRESTIGE'),`<div style="${ROW}">${T_('Your level goes back to 1 and you earn a prestige star.')}<div style="${SUB};margin-top:4px">${T_('You keep every item, coin, team and record.')}</div></div>`,'fgfs79pr',{x:T_('NOT NOW')});const b=document.createElement('button');b.style.cssText=BS+';width:100%;margin-top:8px;'+ON;b.textContent='⭐ '+T_('PRESTIGE NOW');b.onclick=()=>{LS.fgfXP=0;LS.fgfPrest=PN()+1;first('prest');d.remove();toast('⭐ '+T_('Prestige')+' ★'+PN());try{sfx.cheer()}catch(e){}};d.querySelector('.bd').appendChild(b)}

// ================= CAREER BOOK card =================
function book(tab){tab=tab||'stamps';const tabs=[['stamps','STAMPS'],['awards','AWARDS'],['firsts','FIRSTS'],['badges','BADGES'],['rank','NEXT RANK']];let h=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">${tabs.map(t=>`<button data-t="${t[0]}" style="${BS};padding:8px 10px;min-height:40px;font-size:12px;flex:1 1 auto;${tab===t[0]?ON:''}">${T_(t[1])}</button>`).join('')}</div>`;
 if(tab==='stamps'){const s=J2('fgfStamps',[]);h+=`<div style="${SUB};margin-bottom:8px">${T_('Beat every team in Career for the TEAM SLAYER title')} · 🪙 1,000</div>`+TEAMS.map((t,i)=>i===myT()?'':`<div style="${ROW};display:flex;justify-content:space-between;align-items:center"><span>${s.includes(i)?'✅':'⬜'} ${esc(t.n)}</span><span style="${SUB}">${s.includes(i)?T_('beaten'):'—'}</span></div>`).join('')+(LS.fgfSlayer?`<div style="${ROW};${ON};text-align:center">🏆 TEAM SLAYER</div>`:'')}
 if(tab==='awards'){const A=J2('fgfAwards',[]),s=SX();h+=`<div style="${ROW}"><b>${T_('This season so far')}</b><div style="${SUB}">${s.made}/${s.att} · ${T_('long')} ${s.long} · ${T_('clutch')} ${s.cl} · ${T_('best run')} ${s.br}</div></div>`+(A.length?A.map(x=>`<div style="${ROW}"><b>${T_('Season')} ${x.season}</b><div style="${SUB}">${x.a.length?x.a.map(a=>a[0]+' '+T_(a[1])+' ('+a[2]+')').join(' · '):T_('No awards that season')}</div></div>`).join(''):empty('Finish a Career season to earn awards: Clutch Kicker, Longest Make, Iron Leg.'))}
 if(tab==='firsts'){const f=FI(),L=Object.keys(f).sort((a,b)=>f[a]-f[b]);h+=L.length?L.map(k=>`<div style="${ROW};display:flex;gap:10px"><span style="${SUB};min-width:74px">${new Date(f[k]).toLocaleDateString()}</span><span>📌 ${T_(FLAB[k]||k)}</span></div>`).join(''):empty('Your firsts show up here with the date: first 50, first Legend, first title...')}
 if(tab==='badges'){const M=J2('fgfWxM',{}),n=life();h+=H2('WEATHER MASTERY · 10 MAKES EACH')+WXL.map(x=>{const c=M[x[0]]||0;return `<div style="${ROW};display:flex;justify-content:space-between"><span>${c>=10?'🏅':x[1]} ${T_(x[2])}</span><span style="${SUB}">${Math.min(c,10)}/10</span></div>`}).join('')+H2('RETIRE YOUR NUMBER')+`<div style="${ROW}">🎽 #${jn()} · ${fmt(Math.min(n,1000))}/1,000 ${T_('lifetime makes')}<div style="height:7px;border-radius:4px;background:rgba(160,190,175,.15);margin-top:7px"><div style="height:7px;border-radius:4px;width:${Math.min(100,n/10)}%;background:#7fd38a"></div></div></div>`}
 if(tab==='rank'){h+=nextRank()+`<button id="prb" style="${BS};width:100%;${FGF_LV().l>=40?ON:'opacity:.6'}">⭐ ${T_('PRESTIGE')}${PN()?' · ★'+PN():''}<div style="${SUB};font-weight:400">${T_('Opens at Level 40. Level resets, you keep everything.')}</div></button>`}
 const d=card('📖 '+T_('CAREER BOOK'),h,'fgfs79bk');d.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>book(b.dataset.t));const p=d.querySelector('#prb');if(p)p.onclick=prestige}
window.FGF_BOOK=book;

// ================= 7) ONE SHOT DAILY: % of players who made today's Daily (anonymous, once a day) =================
let DPCT=null;
async function dailyPct(){try{const d=J2('fgfDaily',{});const day=d.day;if(!day||!d.done)return;if(LS.fgfDShotP!==day&&!LOCAL&&!window.TESTER){LS.fgfDShotP=day;await api('social_runs',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({week:day,device_id:uid(),ini:ini()||'FAN',mode:'dshot',score:d.made?1:0})}).catch(()=>{})}
 const tot=await api('social_runs?select=id&mode=eq.dshot&week=eq.'+day,{count:1,headers:{Prefer:'count=exact',Range:'0-0'}}),mk=await api('social_runs?select=id&mode=eq.dshot&score=eq.1&week=eq.'+day,{count:1,headers:{Prefer:'count=exact',Range:'0-0'}});if(tot>0)DPCT={day,p:Math.round(mk/tot*100),n:tot}}catch(e){}}
setTimeout(dailyPct,5000);let dWas=false;setInterval(()=>{const d=state==='dres';if(d&&!dWas)dailyPct();dWas=d},800);
{const oDL=S4.dailyLine;S4.dailyLine=function(){const s=oDL.apply(this,arguments);try{const d=J2('fgfDaily',{});if(DPCT&&d.done&&DPCT.day===d.day)return s+' · '+DPCT.p+'% '+T_('made it')}catch(e){}return s}}
const oSc=S3.screen;S3.screen=function(){const r=oSc.apply(this,arguments);try{if(state==='dres'&&DPCT){const t='🌍 '+DPCT.p+'% '+T_('of players made today\'s Daily')+' ('+DPCT.n+')';ctx.save();ctx.font='800 12px system-ui';ctx.textAlign='center';const w=Math.min(W*0.92,ctx.measureText(t).width+24);ctx.fillStyle='rgba(6,18,12,.8)';ctx.strokeStyle='rgba(160,190,175,.35)';ctx.beginPath();ctx.roundRect(W/2-w/2,H*0.115-15,w,24,12);ctx.fill();ctx.stroke();ctx.fillStyle='#dfeee6';ctx.fillText(t,W/2,H*0.115+2,W*0.88);ctx.restore()}}catch(e){}return r};

// ================= hub rows =================
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{const b=bingo(),g=J2('fgfGoal',null),gp=g&&!g.done&&GP.find(x=>x[0]===g.k);
 L.push(['🎱','KICK BINGO',b.done.length+'/9 · '+T_('lines')+' '+b.lines.length+'/8 · '+T_('new card Monday'),bingoCard,false]);
 L.push(['🎯','MODE OF THE DAY','+25% '+T_('coins in')+' '+MN(MOD())+' '+T_('today'),()=>card('🎯 '+T_('MODE OF THE DAY'),`<div style="${ROW};text-align:center"><div style="font:900 20px system-ui">${MN(MOD())}</div>${T_('Every make pays +25% coins today.')}<div style="${SUB};margin-top:4px">${T_('A new mode at midnight.')}</div></div>`,'fgfs79md'),false]);
 L.push(['🏁','MY GOAL',gp?T_(gp[1]):T_('Set a goal · 🪙 250 when you reach it'),goalCard,!g]);
 L.push(['📖','CAREER BOOK',T_('Stamps · awards · firsts · badges · next rank'),()=>book(),false]);
 if(LS.fgfRetired)L.unshift(['🎽','#'+(LS.fgfRetiredN||jn())+' '+T_('RETIRED'),T_('1,000 lifetime makes · in the rafters'),()=>book('badges'),false])}catch(e){}return L};
window.FGF_S79TEST={emit,first,mark,bingo,MOD,awardsFor,SX,nextRank,prestige,book,goalCard,dailyPct,get DPCT(){return DPCT}};
})();
