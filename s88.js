// s88 (Kirk GO Oct 19 · Oct 18 ideas #134, #135, #137, #139): FAMILY NIGHT.
// DARE MODE (2 players on one phone: dare each other with a distance + wind, 5 dares each),
// FAMILY LEAGUE (week-long standings from Pass & Play and Dare results, resets Monday),
// champion crown 👑 for last week's league winner, and the rivalry line ("You lead Mom 7-4"). Local only, nothing online.
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on)return;const {T_,J2,S2,esc,BS,ON,ROW,SUB,H2,card,empty}=U;
const L=window.FGF_XMLIST,XP=window.FGF_XMP=window.FGF_XMP||{};
try{if(L&&!L.some(x=>x[0]==='dare')){const i=L.findIndex(x=>x[0]==='pass');L.splice(i<0?L.length:i+1,0,['dare','🫵','DARE MODE','2 players · dare each other with a distance and wind · 5 dares each'])}}catch(e){}
const WKN=()=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.toISOString().slice(0,10)};
const names=()=>{try{return JSON.parse(LS.fgfPassNames||'[]')}catch(e){return[]}};
// ---- league store: {wk, t:{name:{w,g,m}}, last:{wk,champ}} ----
function lg(){let g=J2('fgfFamLg',null);const w=WKN();if(!g)g={wk:w,t:{}};if(g.wk!==w){const top=Object.entries(g.t).sort((a,b)=>b[1].w-a[1].w||b[1].m-a[1].m)[0];if(top&&top[1].w>0)g.last={wk:g.wk,champ:top[0]};g.wk=w;g.t={}}S2('fgfFamLg',g);return g}
function rec(winner,players,makes){const g=lg();players.forEach(p=>{const r=g.t[p]=g.t[p]||{w:0,g:0,m:0};r.g++;if(p===winner)r.w++;r.m+=(makes&&makes[p])||0});S2('fgfFamLg',g);
 const H=J2('fgfFamH2H',{});players.forEach(a=>players.forEach(b=>{if(a===b)return;const k=a+'|'+b;H[k]=H[k]||0;if(a===winner)H[k]++}));S2('fgfFamH2H',H)}
const crown=n=>{const g=lg();return g.last&&g.last.champ===n?'👑 ':''};window.FGF_CROWN=crown;
on(e=>{try{if(e.t==='end'&&e.m==='xm_pass'&&e.X&&e.X.champ&&!e.X.__lg){e.X.__lg=1;rec(e.X.champ,e.X.P||[],e.X.sc)}}catch(x){}});
// ---- #139 rivalry line ----
function rivalry(a,b){const H=J2('fgfFamH2H',{}),x=H[a+'|'+b]||0,y=H[b+'|'+a]||0;if(!x&&!y)return T_('First time these two meet!');return x===y?esc(a)+' '+T_('and')+' '+esc(b)+' '+T_('are tied')+' '+x+'-'+y:esc(x>y?a:b)+' '+T_('leads')+' '+esc(x>y?b:a)+' '+Math.max(x,y)+'-'+Math.min(x,y)}
window.FGF_RIVALRY=rivalry;
// ---- #135 Dare mode ----
const setW=(mph,s)=>{const a=s*1.2;wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph*0.3}};
function intro(c){state='xguess';const n=names();const d=card('🫵 '+T_('DARE MODE'),`<div style="${SUB};text-align:center;margin-bottom:8px">${T_('Take turns. The darer picks the distance and wind, the kicker tries to make it. 5 dares each, most makes wins.')}</div>
 <input id="a" maxlength="10" value="${esc(n[0]||'P1')}" style="${BS};width:100%;margin-bottom:6px"><input id="b" maxlength="10" value="${esc(n[1]||'P2')}" style="${BS};width:100%">
 <div id="rv" style="${ROW};text-align:center;margin-top:8px"></div><button id="go" style="${BS};width:100%;${ON}">▶ ${T_('START')}</button>`,'fgfs88',{x:'◀ '+T_('MODES'),onx:()=>{try{FGF_XMMENU()}catch(e){}}});
 const A=d.querySelector('#a'),B=d.querySelector('#b'),rv=d.querySelector('#rv');const up=()=>rv.textContent='⚔️ '+rivalry(A.value.trim()||'P1',B.value.trim()||'P2');A.oninput=B.oninput=up;up();
 d.querySelector('#go').onclick=()=>{c.P=[A.value.trim()||'P1',B.value.trim()||'P2'];if(c.P[0]===c.P[1])c.P[1]+=' 2';const nn=names();nn[0]=c.P[0];nn[1]=c.P[1];LS.fgfPassNames=JSON.stringify(nn);c.sc={[c.P[0]]:0,[c.P[1]]:0};c.started=1;d.remove();pick(c)}}
function pick(c){state='xguess';const kick=c.P[c.k%2],darer=c.P[(c.k+1)%2];let D=40,M=8,S=1;
 const d=card('🫵 '+esc(darer)+' '+T_('dares')+' '+esc(kick),`<div style="${SUB};text-align:center">${T_('Dare')} ${Math.floor(c.k/2)+1} / 5 · ${esc(c.P[0])} ${c.sc[c.P[0]]} – ${c.sc[c.P[1]]} ${esc(c.P[1])}</div>${H2('DISTANCE')}<div id="dd" style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${[25,35,40,45,50,55,60,65].map(x=>`<button data-d="${x}" style="${BS};padding:8px 0">${x}</button>`).join('')}</div>${H2('WIND')}<div id="mm" style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${[0,5,10,15].map(x=>`<button data-m="${x}" style="${BS};padding:8px 0">${x} mph</button>`).join('')}</div><div style="display:flex;gap:6px;margin-top:6px"><button data-s="-1" style="${BS};flex:1">◀ ${T_('LEFT')}</button><button data-s="1" style="${BS};flex:1">${T_('RIGHT')} ▶</button></div><button id="go" style="${BS};width:100%;margin-top:10px;${ON}">🏈 ${T_('HAND THE PHONE TO')} ${esc(kick)}</button>`,'fgfs88',{nox:1});
 const sel=()=>{d.querySelectorAll('[data-d]').forEach(b=>b.style.cssText=BS+';padding:8px 0;'+(+b.dataset.d===D?ON:''));d.querySelectorAll('[data-m]').forEach(b=>b.style.cssText=BS+';padding:8px 0;'+(+b.dataset.m===M?ON:''));d.querySelectorAll('[data-s]').forEach(b=>b.style.cssText=BS+';flex:1;'+(+b.dataset.s===S?ON:''))};sel();
 d.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{D=+b.dataset.d;sel()});d.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{M=+b.dataset.m;sel()});d.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{S=+b.dataset.s;sel()});
 d.querySelector('#go').onclick=()=>{dist=D;weather='clear';setW(M,S);c.cur={kick,D,M};d.remove();resetBall();state='play';toast('🫵 '+kick+' · '+D+' '+T_('yds')+' · '+M+' mph')}}
XP.dare={nobest:1,setup(c){if(!c.started)intro(c);else pick(c);return 'hold'},
 next(c,good){const k=c.cur&&c.cur.kick;if(good&&k){c.sc[k]++;c.made++}c.log.push((good?'✓':'✗'));if(c.k>=10&&c.k%2===0){const [a,b]=c.P;if(c.sc[a]===c.sc[b]){toast('⚖️ '+T_('Tied! Sudden death'));if(c.k>=16)return fin(c);return true}return fin(c)}return true},
 res(c){const [a,b]=c.P;return '🏆 '+esc(c.champ||'')+' '+T_('wins the dare battle')+' · '+esc(a)+' '+c.sc[a]+' – '+c.sc[b]+' '+esc(b)},
 hud(c){const [a,b]=c.P||['',''];return c.P?'🫵 '+esc(a)+' '+c.sc[a]+' – '+c.sc[b]+' '+esc(b)+' · '+T_('kicking')+': '+esc(c.cur?c.cur.kick:''):'🫵 '+T_('DARE MODE')}};
function fin(c){const [a,b]=c.P;c.champ=c.sc[a]===c.sc[b]?null:(c.sc[a]>c.sc[b]?a:b);c.pts=Math.max(c.sc[a],c.sc[b]);if(c.champ)rec(c.champ,c.P,c.sc);c.champ=c.champ||T_('Nobody');return 'fin'}
// ---- Family League card ----
function league(){const g=lg();const R=Object.entries(g.t).sort((a,b)=>b[1].w-a[1].w||b[1].m-a[1].m);
 const d=card('🏠 '+T_('FAMILY LEAGUE'),`<div style="${SUB};text-align:center;margin-bottom:6px">${T_('This week on this phone. Pass & Play and Dare Mode wins count. Resets Monday.')}</div>`+(g.last?`<div style="${ROW};text-align:center">👑 ${T_('Last week’s champion')}: <b>${esc(g.last.champ)}</b></div>`:'')+H2('STANDINGS')+(R.length?R.map((r,i)=>`<div style="${ROW}">${i+1}. ${crown(r[0])}<b>${esc(r[0])}</b> · ${r[1].w} ${T_('W')} – ${r[1].g-r[1].w} ${T_('L')}<div style="${SUB}">${r[1].m} ${T_('makes')}</div></div>`).join('')+(R.length>1?`<div style="${ROW};text-align:center">⚔️ ${rivalry(R[0][0],R[1][0])}</div>`:''):empty('Play Pass & Play or Dare Mode to start this week’s league.'))+`<button id="dm" style="${BS};width:100%;margin-top:4px">🫵 ${T_('PLAY DARE MODE')}</button>`,'fgfs88lg');
 d.querySelector('#dm').onclick=()=>{d.remove();try{FGF_XMSTART('dare')}catch(e){}}}
window.FGF_FAMLEAGUE=league;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{const g=lg();L.push(['🏠','FAMILY LEAGUE',g.last?'👑 '+g.last.champ+' · this week’s standings':'Pass & Play + Dare Mode standings · resets Monday',league,false])}catch(e){}return L};
})();
