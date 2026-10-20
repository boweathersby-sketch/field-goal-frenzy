// s95 (Oct 19 #192, #194, #195): two party modes for one phone + end-of-night awards.
// 2-ON-2 TEAM KICK: 4 players, two teams, everyone takes the same kick each round (3 rounds), combined makes win.
// HOT POTATO: 2-4 players take turns with a 5-second clock; too slow counts as a miss. 4 rounds.
// Both end with fun awards: Most Clutch (last-round makes), Doink King (post/bar hits), Longest Make, Sharpshooter (most makes).
(function(){const U=window.FGF_UI;if(!U)return;const {T_,BS,ROW,SUB,esc,card}=U;
const L=window.FGF_XMLIST,XP=window.FGF_XMP=window.FGF_XMP||{};
try{if(L){const add=m=>{if(!L.some(x=>x[0]===m[0]))L.push(m)};
 add(['team','🤝','2-ON-2 TEAM KICK','4 players · two teams · same kick for everyone · combined makes win']);
 add(['potato','🥔','HOT POTATO','2–4 players · 5 seconds to kick or it counts as a miss']);if(window.FGF_XMGROUP){FGF_XMGROUP('team','pa');FGF_XMGROUP('potato','pa')}}}catch(e){}
const setW=(mph,a)=>{wind={mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph*0.3}};const rw=m=>setW(Math.floor(Math.random()*m),(Math.random()<.5?-1:1)*(0.9+Math.random()*0.5));
const names=()=>{try{return JSON.parse(LS.fgfPassNames||'[]')}catch(e){return []}};
function setupUI(t,min){let n=t==='team'?4:Math.max(2,+(LS.fgfPotN||3));const nm=names();
 const draw=()=>{const d=card((t==='team'?'🤝 ':'🥔 ')+T_(t==='team'?'2-ON-2 TEAM KICK':'HOT POTATO'),`<div style="${SUB};text-align:center;margin-bottom:8px">${T_(t==='team'?'Team 1 and Team 2 take turns. Everyone gets the same kick each round.':'Pass the phone fast! 5 seconds to kick or it counts as a miss.')}</div>`+
  (t==='potato'?`<div style="display:flex;gap:6px;justify-content:center;margin-bottom:8px">${[2,3,4].map(k=>`<button data-n="${k}" style="${BS};${k===n?U.ON:''}">${k} ${T_('players')}</button>`).join('')}</div>`:'')+
  Array.from({length:n},(_,i)=>`<div style="display:flex;gap:6px;align-items:center;margin:0 0 6px">${t==='team'?`<b style="width:62px;font-size:11px;color:${i%2?'#7cc8ff':'#f2c230'}">${T_(i%2?'TEAM 2':'TEAM 1')}</b>`:''}<input data-i="${i}" maxlength="10" value="${esc(nm[i]||'P'+(i+1))}" style="flex:1;min-width:0;box-sizing:border-box;font:16px system-ui;padding:9px;border-radius:10px;border:2px solid #f2c23088;background:#05200f;color:#fff"></div>`).join('')+
  `<button id="go" style="${BS};display:block;width:100%;margin-top:6px;background:#f2c230;color:#0b2a16">${T_('START')} ▶</button>`,'fgfs95');
  const save=()=>{d.querySelectorAll('[data-i]').forEach(i=>nm[+i.dataset.i]=i.value);LS.fgfPassNames=JSON.stringify(nm)};
  d.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{save();n=+b.dataset.n;LS.fgfPotN=n;draw()});
  d.querySelector('#go').onclick=()=>{save();d.remove();const P=nm.slice(0,n).map((s,i)=>(s||'').trim()||'P'+(i+1));FGF_XMSTART(t,{P,st:P.map(()=>({m:0,a:0,lg:0,dk:0,cl:0}))})}};draw()}
const who=c=>c.P[c.k%c.P.length];
const pass=c=>{try{toast('📱 '+T_('HAND THE PHONE TO')+' '+who(c))}catch(e){}};
function track(c,good){const i=(c.k-1)%c.P.length,s=c.st[i];s.a++;const dk=!!(ball&&ball.hitPost);if(dk)s.dk++;if(good){s.m++;s.lg=Math.max(s.lg,dist);if(c.last)s.cl++}}
function awards(c){const A=[['🧊','Most Clutch','cl'],['🥅','Doink King','dk'],['📏','Longest Make','lg'],['🎯','Sharpshooter','m']];
 return `<div style="margin-top:10px;font:600 13px system-ui;text-align:left">${A.map(a=>{let b=-1,w=[];c.st.forEach((s,i)=>{if(s[a[2]]>b){b=s[a[2]];w=[i]}else if(s[a[2]]===b)w.push(i)});if(b<=0)return '';return `<div style="${ROW};padding:7px 10px;margin:4px 0">${a[0]} <b>${T_(a[1])}</b> · ${w.map(i=>esc(c.P[i])).join(' & ')} <span style="color:#9fb8aa">(${a[2]==='lg'?b+' '+T_('yds'):b})</span></div>`}).join('')}</div>`}
// ---- 2-on-2 ----
XP.team={nobest:1,pre(){setupUI('team')},
 setup(c){if(!c.P)c.P=['P1','P2','P3','P4'],c.st=c.P.map(()=>({m:0,a:0,lg:0,dk:0,cl:0}));weather='clear';if(c.k%4===0){c.d=28+Math.floor(c.k/4)*7+Math.floor(Math.random()*6);c.w=[Math.floor(Math.random()*8),(Math.random()<.5?-1:1)*(0.9+Math.random()*0.5)]}dist=c.d;setW(c.w[0],c.w[1]);c.last=c.k>=8;pass(c)},
 next(c,good){track(c,good);const i=(c.k-1)%4;if(good){c.s=c.s||[0,0];c.s[i%2]++}if(c.k>=12){const s=c.s||[0,0];if(s[0]===s[1]&&!c.ot){c.ot=1;toast('⚡ '+T_('Tied! Sudden death'));c.k=8;return true}c.pts=Math.max(s[0],s[1]);return 'fin'}return true},
 res(c){const s=c.s||[0,0],T1=esc(c.P[0])+' & '+esc(c.P[2]),T2=esc(c.P[1])+' & '+esc(c.P[3]);return `${T_('TEAM 1')} ${s[0]} – ${s[1]} ${T_('TEAM 2')}<div style="font-size:14px;color:#f2c230;margin-top:4px">🏆 ${s[0]===s[1]?T_('Tie game!'):(s[0]>s[1]?T1:T2)+' '+T_('win!')}</div>`+awards(c)},
 hud(c){const s=c.s||[0,0];return '🤝 '+T_('ROUND')+' '+Math.min(3,Math.floor(c.k/4)+1)+'/3 · '+who(c)+' · '+s[0]+'–'+s[1]}};
// ---- Hot Potato ----
let clk=0,clkOn=false;
XP.potato={nobest:1,pre(){setupUI('potato')},
 setup(c){if(!c.P)c.P=['P1','P2'],c.st=c.P.map(()=>({m:0,a:0,lg:0,dk:0,cl:0}));weather='clear';dist=25+Math.floor(Math.random()*26);rw(9);c.last=c.k>=c.P.length*3;clk=5;clkOn=true;pass(c)},
 next(c,good){clkOn=false;track(c,good);if(c.k>=c.P.length*4){c.pts=Math.max(...c.st.map(s=>s.m));return 'fin'}return true},
 res(c){const b=Math.max(...c.st.map(s=>s.m)),w=c.P.filter((p,i)=>c.st[i].m===b);return c.P.map((p,i)=>esc(p)+' '+c.st[i].m).join(' · ')+`<div style="font-size:14px;color:#f2c230;margin-top:4px">🏆 ${w.map(esc).join(' & ')} ${T_(w.length>1?'tie!':'wins!')}</div>`+awards(c)},
 hud(c){return '🥔 '+who(c)+' · '+Math.max(0,Math.ceil(clk))+'s · '+T_('ROUND')+' '+Math.min(4,Math.floor(c.k/c.P.length)+1)+'/4'}};
let lt=performance.now();(function tick(){const n=performance.now(),dt=Math.min(0.1,(n-lt)/1000);lt=n;try{if(clkOn&&mode==='xm_potato'&&state==='play'&&!paused&&ball&&!ball.fly&&!ball.done&&!msg&&!document.querySelector('.fgfov')){const p=Math.ceil(clk);clk-=dt;if(Math.ceil(clk)<p&&p<=3){try{tone(1500,1500,0.08,0.18,'square')}catch(e){}}if(clk<=0){clkOn=false;swipe=null;ball.done=true;result('DELAY OF GAME')}}if(mode!=='xm_potato')clkOn=false}catch(e){}requestAnimationFrame(tick)})();
})();
