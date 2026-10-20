// s86 (Kirk GO Oct 19 · Oct 18 ideas #122-126, 129, 130, 132, 145): MY PROGRESS hub card.
// Distance band medals, welcome-back gift (3+ days away, max once a week), monthly report card, quiet milestone toasts,
// today's coin tracker (where coins came from), Career salary (text only), League Record Book (fictional records),
// team loyalty level, hot-hand Career bonus (coins only, never extra power). Free, local only.
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on)return;const {T_,J2,S2,DK,esc,ROW,SUB,H2,card,empty,BS}=U;
const coin=n=>{try{n&&addCoins(n)}catch(e){}};const tst=t=>{try{toast(t)}catch(e){}};const fmt=n=>(+n||0).toLocaleString();
const MK=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')};
// ---- 145 coin tracker ----
let SRC=null;const oAC=addCoins;addCoins=function(n){const r=oAC.apply(this,arguments);try{if(window.FGF_TRYING||!n)return r;const k=DK();const T=J2('fgfCoinDay',{});if(T.d!==k){T.d=k;T.s={}}
 const src=n<0?'Spent':SRC||(state==='play'||state==='over'?U.MN(mode):state==='shop'?'Shop':'Rewards & events');T.s[src]=(T.s[src]||0)+n;S2('fgfCoinDay',T)}catch(e){}return r};
// ---- 125 medals · 130 monthly · 132 milestones · 122 hot hand ----
const BANDS=[40,50,60,70],TIERS=[[10,'🥉','BRONZE'],[25,'🥈','SILVER'],[50,'🥇','GOLD']];
const tier=n=>{let t=null;for(const x of TIERS)if(n>=x[0])t=x;return t};
let cgM=0,cgX=0;
on(e=>{if(e.t==='start'&&e.m==='career'){cgM=0;cgX=0}
 if(e.t!=='make'&&e.t!=='miss')return;const d=Math.round(e.d||0),mk=e.t==='make';
 if(e.m==='career'){mk?cgM++:cgX++}
 const M=J2('fgfMonth',{});const k=MK();const m=M[k]||{a:0,m:0,b:0,w:{}};m.a++;if(mk){m.m++;if(d>m.b)m.b=d;if(e.wx)m.w[e.wx]=(m.w[e.wx]||0)+1}M[k]=m;const ks=Object.keys(M).sort().slice(-12),M2={};ks.forEach(x=>M2[x]=M[x]);S2('fgfMonth',M2);
 if(!mk)return;
 const b=BANDS.filter(x=>d>=x&&d<x+10)[0];if(b){const B=J2('fgfBands',{});const o=tier(B[b]||0);B[b]=(B[b]||0)+1;S2('fgfBands',B);const n=tier(B[b]);if(n&&n!==o)tst(n[1]+' '+T_(n[2])+' '+T_('medal')+' · '+b+'s '+T_('yds'))}
 const F=J2('fgfFirsts2',{});const q=(id,txt)=>{if(!F[id]){F[id]=Date.now();S2('fgfFirsts2',F);tst('✨ '+T_(txt))}};
 if(d>=60)q('60','First 60-yard make!');if(d>=70)q('70','First 70-yard make!');if(e.wx==='snow')q('snow','First make in the snow!');if(e.wx==='rain')q('rain','First make in the rain!');if(e.cl)q('cl','First clutch make!')});
on(e=>{if(e.t!=='cgame')return;try{
 const L=J2('fgfLoyal',{});const t=myT();L[t]=(L[t]||0)+1;S2('fgfLoyal',L);if(L[t]%16===0)tst('🚩 '+T_('Team loyalty level')+' '+(L[t]/16)+' · '+TEAMS[t].n);
 if(LS.fgfHot==='1'&&e.w){LS.fgfHot='0';SRC='Hot hand bonus';coin(50);SRC=null;tst('🔥 '+T_('HOT HAND BONUS')+' · 🪙 +50')}
 if(cgM>=2&&cgX===0){LS.fgfHot='1';setTimeout(()=>tst('🔥 '+T_('Perfect game! Win the next one for a hot-hand bonus.')),1600)}
 const S=J2('fgfSal',{});const s=e.season|0;S[s]=S[s]||{w:0,g:0};S[s].g++;if(e.w)S[s].w++;S2('fgfSal',S)}catch(x){}});
// ---- 126 welcome back ----
try{const now=Date.now(),last=+(LS.fgfLastSeen||0),wk=Math.floor(now/6048e5);if(last&&now-last>3*864e5&&+(LS.fgfWBG||-1)!==wk){LS.fgfWBG=wk;setTimeout(()=>{SRC='Welcome back gift';coin(150);SRC=null;tst('👋 '+T_('Welcome back! Here is a gift')+' · 🪙 +150')},4000)}LS.fgfLastSeen=now;setInterval(()=>LS.fgfLastSeen=Date.now(),60000)}catch(e){}
// ---- hub card ----
const row=(a,b)=>`<div style="${ROW}">${a}${b?`<div style="${SUB}">${b}</div>`:''}</div>`;
const REC=[['Longest field goal',78,()=>+(LS.fgfPR||0),'Ace Mercer, 1998'],['Career makes',2500,()=>{const Z=J2('fgfZones',{});let m=0;for(const k in Z)m+=Z[k][0];return m},'Dutch Kowalski'],['80-yard makes',12,()=>J2('fgfLWall',[]).length,'"Big Toe" Tanaka'],['Season wins (16 games)',15,()=>{const S=J2('fgfSal',{});return Math.max(0,...Object.values(S).map(x=>x.w))},'1987 Harbor Hawks']];
function tab(k){
 if(k==='md'){const B=J2('fgfBands',{});return H2('DISTANCE MEDALS')+BANDS.map(b=>{const n=B[b]||0,t=tier(n),nx=TIERS.find(x=>n<x[0]);return row(`${t?t[1]:'⚪'} <b>${b}-${b+9} ${T_('yds')}</b> · ${n} ${T_('makes')}`,nx?T_('Next')+': '+nx[1]+' '+T_(nx[2])+' '+T_('at')+' '+nx[0]:T_('All medals earned!'))}).join('')}
 if(k==='rc'){const M=J2('fgfMonth',{});const ks=Object.keys(M).sort().reverse();return H2('MONTHLY REPORT CARD')+(ks.length?ks.map(x=>{const m=M[x],p=m.a?Math.round(m.m/m.a*100):0,g=p>=85?'A':p>=70?'B':p>=55?'C':p>=40?'D':'F',w=Object.entries(m.w).sort((a,b)=>b[1]-a[1])[0];return row(`<b>${new Date(x+'-15').toLocaleDateString(undefined,{month:'long',year:'numeric'})}</b> · ${T_('Grade')} <b>${g}</b>`,`${m.m}/${m.a} (${p}%) · ${T_('Long')} ${m.b} ${T_('yds')}${w?' · '+T_('Best weather')+': '+T_(w[0]):''}`)}).join(''):empty('Kick a few to start this month’s report card.'))}
 if(k==='cn'){const T=J2('fgfCoinDay',{});const e=T.d===DK()?Object.entries(T.s||{}):[];let p=0,s=0;e.forEach(x=>x[1]>0?p+=x[1]:s+=x[1]);return H2("TODAY'S COINS")+(e.length?e.sort((a,b)=>b[1]-a[1]).map(x=>row(`${x[1]<0?'🛒':'🪙'} ${esc(T_(x[0]))} · <b>${x[1]>0?'+':''}${fmt(x[1])}</b>`)).join('')+row(`<b>${T_('Earned')} +${fmt(p)} · ${T_('Spent')} ${fmt(s)}</b>`):empty('No coins yet today. Go kick some!'))}
 if(k==='rb'){return H2('LEAGUE RECORD BOOK')+REC.map(r=>{const v=r[2](),br=v>r[1];return row(`${br?'🏅':'📕'} <b>${T_(r[0])}</b> · ${T_('Record')} ${fmt(r[1])}`,`${br?T_('YOU hold the record')+' · '+fmt(v):T_('Held by')+' '+r[3]+' · '+T_('You')+': '+fmt(v)}`)}).join('')}
 // career: salary + loyalty
 const S=J2('fgfSal',{}),L=J2('fgfLoyal',{});const ss=Object.keys(S).map(Number).sort((a,b)=>b-a);
 let h=H2('CONTRACT');if(ss.length){const last=S[ss[0]];h+=row(`💼 ${T_('Salary')}: <b>🪙 ${fmt(100+ss.slice(1).reduce((a,s)=>a+S[s].w*10,0))}</b> ${T_('per game (just for fun)')}`,T_('Good seasons earn you a raise.'));ss.slice(0,6).forEach(s=>h+=row(`${T_('Season')} ${s}: ${S[s].w}-${S[s].g-S[s].w}`))}else h+=empty('Play Career to sign your first contract.');
 h+=H2('TEAM LOYALTY');const lk=Object.keys(L);h+=lk.length?lk.sort((a,b)=>L[b]-L[a]).map(t=>{let n='?';try{n=TEAMS[t].n}catch(e){}const lv=Math.floor(L[t]/16);return row(`🚩 <b>${esc(n)}</b> · ${T_('Level')} ${lv}`,`${L[t]} ${T_('games')} · ${16-L[t]%16} ${T_('to next level')}`)}).join(''):empty('Play Career games with a team to raise loyalty.');
 h+=row(`🔥 ${T_('Hot hand')}: ${LS.fgfHot==='1'?T_('ON · win your next game for 🪙 50'):T_('Play a perfect Career game to light it up')}`);return h}
function open(k){k=k||'md';const T=[['md','🥇'],['rc','📝'],['cn','🪙'],['rb','📕'],['cr','💼']];const d=card('📈 '+T_('MY PROGRESS'),`<div style="display:flex;gap:5px;margin-bottom:6px">${T.map(t=>`<button data-k="${t[0]}" style="${BS};flex:1;padding:6px 0;min-height:40px;${t[0]===k?U.ON:''}">${t[1]}</button>`).join('')}</div>`+tab(k),'fgfs86');d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>open(b.dataset.k))}
window.FGF_PROGRESS=open;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{L.push(['📈','MY PROGRESS','Medals · report card · today’s coins · record book · contract',()=>open(),false])}catch(e){}return L};
})();
