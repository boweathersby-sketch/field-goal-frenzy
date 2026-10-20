// s101 (Oct 17 extra #8, #12, #25; Oct 19 #199): Career halftime mascot race, coach's headset, joke ref flags, piggy bank.
// Halftime race (Career): at halftime, pick which of 4 team mascots wins a quick race; a right pick earns 🪙 20. Free, no betting coins.
// Coach's headset (Career): after back-to-back misses the coach gets fired up (just a funny line); a make calms him down.
// Joke ref flags (Classic): once in a while after a make, a silly flag gets thrown, and it is always declined. No effect on the kick.
// Piggy bank: 10% extra of the coins you earn drops into a piggy bank (up to 🪙 500); smash it free once a week.
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on)return;const {T_,J2,S2,DK,BS,ROW,SUB,card,esc}=U;
// ---------- piggy bank ----------
const WKN=()=>{const d=window.FGF_DATE?new Date(FGF_DATE):new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.toISOString().slice(0,10)};
let PIG=false;const oAC=addCoins;addCoins=function(n){const r=oAC.apply(this,arguments);try{if(!PIG&&n>0&&!window.TESTER&&!window.FGF_TRYING){const p=J2('fgfPig',{c:0,w:''});const add=Math.max(1,Math.round(n*0.1));if(p.c<500){p.c=Math.min(500,p.c+add);S2('fgfPig',p)}}}catch(e){}return r};
const pigReady=()=>{const p=J2('fgfPig',{c:0,w:''});return p.c>=10&&p.w!==WKN()};
function piggy(){const p=J2('fgfPig',{c:0,w:''}),rd=pigReady();const d=card('🐷 '+T_('PIGGY BANK'),`<div style="${ROW};text-align:center"><div style="font-size:44px">🐷</div><div style="font:900 22px system-ui;color:#f2c230">🪙 ${p.c}</div><div style="${SUB}">${T_('10% extra of the coins you earn drops in here (up to 500)')}</div><div style="${SUB}">${rd?T_('Ready to smash!'):p.w===WKN()?T_('Smashed this week · it opens again Monday'):T_('Fill it to at least 10 to smash it')}</div></div>${rd?`<button id="pg" style="${BS};display:block;width:100%;margin-top:8px;background:#f2c230;color:#0b2a16;text-align:center">🔨 ${T_('SMASH IT')}</button>`:''}`,'fgfs101');
 const b=d.querySelector('#pg');if(b)b.onclick=()=>{const q=J2('fgfPig',{c:0,w:''});if(!pigReady())return;const c=q.c;q.c=0;q.w=WKN();S2('fgfPig',q);PIG=true;try{addCoins(c)}finally{PIG=false}try{sfx.coin&&sfx.coin()}catch(e){}toast('🐷 '+T_('Piggy bank smashed!')+' +🪙 '+c);piggy()}}
window.FGF_PIGGY=piggy;
// ---------- coach's headset (Career) ----------
let cm=0;const HL=[['🎧','Coach is pacing the sideline'],['🎧💢','Coach just spiked his headset'],['🎧🔥','Coach is yelling at the headset cord']];
on(e=>{try{if(e.m!=='career')return;if(e.t==='start'){cm=0;return}if(e.t==='miss'){cm++;if(cm>=2){const h=HL[Math.min(2,cm-2)];setTimeout(()=>toast(h[0]+' '+T_(h[1])),1700)}}else if(e.t==='make'){if(cm>=2)setTimeout(()=>toast('🎧😮‍💨 '+T_('Coach puts the headset back on')),1700);cm=0}}catch(x){}});
// ---------- joke ref flags (Classic) ----------
const FL=['Illegal celebration by the mascot','Too much swagger in the warm-up','Delay of game: the crowd was too loud','Unsportsmanlike dancing on the sideline','Illegal use of a lucky sock','Too many fans holding the same sign'];let fl=0;
on(e=>{try{if(e.t!=='make'||e.m!=='classic')return;fl++;if(fl<6||Math.random()>1/30)return;fl=0;setTimeout(()=>toast('🚩 '+T_(FL[Math.random()*FL.length|0])+' · '+T_('declined, the kick is good!')),1900)}catch(x){}});
// ---------- halftime mascot race (Career) ----------
let lq=0,raced=null,pend=null;
setInterval(()=>{try{if(typeof CG==='undefined'||!CG||mode!=='career'){lq=0;return}const k=CG.wk+'_'+(CG.o);if(lq===2&&CG.q===3&&raced!==k)pend=k;if(pend===k&&state!=='play'&&!document.querySelector('.fgfov')){raced=k;pend=null;race()}lq=CG.q}catch(e){}},400);
function race(){try{const ti=[...new Set([myT(),CG.o,(myT()+3)%8,(CG.o+5)%8])].slice(0,4);while(ti.length<4){const r=Math.random()*8|0;if(!ti.includes(r))ti.push(r)}
 const nm=i=>esc(String(TEAMS[i].n).split(' ').slice(-1)[0]);const col=i=>'#f2c230';
 const d=card('🏁 '+T_('HALFTIME MASCOT RACE'),`<div style="${SUB};text-align:center;margin-bottom:8px">${T_('Pick the winner · a right pick earns 🪙 20')}</div><div id="rl">${ti.map((t,j)=>`<div style="position:relative;height:38px;margin:0 0 6px;border-radius:10px;background:rgba(255,255,255,.05);overflow:hidden"><div style="position:absolute;right:8px;top:0;bottom:0;width:3px;background:repeating-linear-gradient(#fff 0 4px,#000 4px 8px)"></div><button data-p="${j}" style="${BS};position:absolute;left:0;top:0;bottom:0;width:100%;text-align:left;background:transparent;border:0;padding:0 10px;display:flex;align-items:center;gap:6px"><b style="width:84px;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:${col(t)}">${nm(t)}</b><span class="tk" style="position:relative;flex:1;height:100%;display:flex;align-items:center"><span class="rr" data-r="${j}" style="display:inline-block;transition:transform .12s linear;font-size:18px"><span style="display:inline-block;transform:scaleX(-1)">🏃</span></span></span></button></div>`).join('')}</div><div id="rm" style="${SUB};text-align:center;min-height:16px"></div>`,'fgfs101');
 let go=0;d.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-p]');if(!b||go)return;go=1;const pick=+b.dataset.p;b.parentNode.style.outline='2px solid #f2c230';run(d,ti,pick,nm)})}catch(e){}}
function run(d,ti,pick,nm){const pos=[0,0,0,0],R=()=>d.querySelectorAll('.rr'),wd=((d.querySelector('.tk')||{}).clientWidth||220)-34;let win=-1;
 const iv=setInterval(()=>{for(let j=0;j<4;j++){pos[j]+=4+Math.random()*9;const rj=R()[j];if(rj)rj.style.transform='translateX('+Math.min(wd,pos[j])+'px)';if(win<0&&pos[j]>=wd)win=j}
  if(win>=0){clearInterval(iv);const ok=win===pick;if(ok)try{addCoins(20)}catch(e){}const m=d.querySelector('#rm');if(m)m.innerHTML='🏆 <b>'+nm(ti[win])+'</b> '+T_('wins!')+' '+(ok?'· +🪙 20':'· '+T_('Better luck next half'));setTimeout(()=>{try{d.remove()}catch(e){}},2600)}},120)}
window.FGF_RACE=race;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{const p=J2('fgfPig',{c:0,w:''});L.push(['🐷','PIGGY BANK','🪙 '+p.c+' · '+(pigReady()?T_('Ready to smash!'):T_('smash it once a week')),()=>piggy(),pigReady()])}catch(e){}return L};
})();
