// s85 (Kirk GO Oct 19 · Extra ideas Oct 17 #7,9,10,19,30 + part 3 #98,105,107,110): KICK MEMORIES hub card.
// Hall of Fame (top 10 kicks), Legend Wall (every 80-yd make), Hot/Cold zones by distance, Ticket Stub album (Career games),
// Fan Mail after big kicks, Kicker Trading Card (stats only, no new art), record-breaker alerts, Homecoming week bonus,
// Pregame coin toss (+25 coins) before Career games. Free, local only, no celebration changes.
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on)return;const {T_,J2,S2,esc,ROW,SUB,H2,card,empty,BS}=U;
const coin=n=>{try{n&&addCoins(n)}catch(e){}};const tst=t=>{try{toast(t)}catch(e){}};const day=t=>new Date(t).toLocaleDateString();
const MNAME=m=>U.MN(m);const WX=w=>({rain:'🌧️',snow:'❄️',wind:'🌬️',fog:'🌫️'})[w]||'';
// ---- 10 Hall of Fame + 19 Legend Wall + 98 zones + 110 record alerts ----
on(e=>{if(e.t!=='make'&&e.t!=='miss')return;const d=Math.round(e.d||0);const Z=J2('fgfZones',{});const b=Math.min(7,Math.floor((d-15)/10));const z=Z[b]||[0,0];z[1]++;if(e.t==='make')z[0]++;Z[b]=z;S2('fgfZones',Z);
 if(e.t!=='make')return;const k={d,m:e.m,w:e.wx||'',cl:!!e.cl,t:Date.now()};
 const best=+(LS.fgfPR||0);if(d>best){LS.fgfPR=d;if(best>0)tst('📈 '+T_('NEW PERSONAL RECORD')+': '+d+' '+T_('yds')+' ('+T_('old')+' '+best+')')}
 const H=J2('fgfHOF',[]);H.push(k);H.sort((a,b)=>b.d-a.d||a.t-b.t);S2('fgfHOF',H.slice(0,10));
 if(d>=80){const L=J2('fgfLWall',[]);L.unshift(k);S2('fgfLWall',L.slice(0,200))}
 // 30 fan mail on big kicks
 if(d>=55||e.cl){const F=J2('fgfMail',[]);const P=['Coach Ray','Mia, age 9','Grandpa Lou','Sam from Section 112','The Tailgate Crew','Ms. Patel','Your #1 Fan Jojo','Big Earl'];const n=P[(Date.now()/1000|0)%P.length];
  const L=e.cl?['That kick to win it? I spilled my nachos. Worth it.','My whole living room jumped. Clutch!','I knew you would make that one. Ice in your veins.']:['I was in the stands for that '+d+'-yarder. Unreal!','My kid made me rewind that '+d+' yard kick ten times.','A '+d+' yard boot! You made my week.'];
  F.unshift({n,x:L[(Date.now()/7|0)%L.length],t:Date.now(),r:0});S2('fgfMail',F.slice(0,40))}});
// ---- 105 ticket stubs + 7 homecoming ----
on(e=>{if(e.t!=='cgame')return;try{const S=J2('fgfStubs',[]);const o=e.o!=null&&TEAMS[e.o]?TEAMS[e.o].n:'?';S.unshift({o,w:!!e.w,my:e.my|0,op:e.op|0,wk:e.wk|0,s:e.season|0,po:!!e.po,t:Date.now()});S2('fgfStubs',S.slice(0,120));
 if(e.wk===7&&e.w&&!e.po){coin(200);tst('🎉 '+T_('HOMECOMING WIN')+' · 🪙 +200')}}catch(x){}});
// ---- 107 pregame coin toss (Career only, once per game) ----
// toss happens BEFORE kickoff: the card shows on the Career screen, then the game starts (forecast etc. follow as usual)
function willPlay(){try{if(!CAR||!CAR.sched)return true;return !(CAR.done||CAR.wk>=18||(CAR.wk<16&&!CAR.sched[CAR.wk]))}catch(e){return false}}
const oSCG=startCareerGame;let tossing=false;
startCareerGame=function(){const self=this,args=arguments;if(tossing||document.getElementById('fgfs85ct')||!willPlay()||LS.fgfTossOff==='1')return oSCG.apply(self,args);
 const d=card('🪙 '+T_('COIN TOSS'),`<div style="${ROW};text-align:center">${T_('Call it! Win the toss for 🪙 25.')}</div><div style="display:flex;gap:8px"><button id="h" style="${BS};flex:1">${T_('HEADS')}</button><button id="tl" style="${BS};flex:1">${T_('TAILS')}</button></div>`,'fgfs85ct',{nox:1});
 const go=c=>{d.querySelectorAll('button').forEach(b=>b.disabled=true);const r=Math.random()<.5?'h':'tl';const w=r===c;if(w)coin(25);d.querySelector('.bd').innerHTML=`<div style="${ROW};text-align:center;font:900 18px system-ui">🪙 ${r==='h'?T_('HEADS'):T_('TAILS')}</div><div style="${ROW};text-align:center">${w?T_('You won the toss!')+' 🪙 +25':T_('They won the toss. Go get them anyway!')}</div>`;
  setTimeout(()=>{d.remove();tossing=true;try{oSCG.apply(self,args)}finally{tossing=false}},1300)};
 d.querySelector('#h').onclick=()=>go('h');d.querySelector('#tl').onclick=()=>go('tl')};
// ---- hub card ----
const row=(a,b)=>`<div style="${ROW}">${a}<div style="${SUB}">${b}</div></div>`;
function tab(k){const W={
 hof:()=>{const H=J2('fgfHOF',[]);return H2('HALL OF FAME · TOP 10 KICKS')+(H.length?H.map((k,i)=>row(`#${i+1} · <b>${k.d} ${T_('yds')}</b> ${WX(k.w)}${k.cl?' · ⭐ '+T_('CLUTCH'):''}`,MNAME(k.m)+' · '+day(k.t))).join(''):empty('Make a kick to start your Hall of Fame.'))},
 lw:()=>{const L=J2('fgfLWall',[]);return H2('LEGEND WALL · EVERY 80-YARD MAKE')+(L.length?`<div style="${ROW};text-align:center;font:900 22px system-ui">🏆 × ${L.length}</div>`+L.slice(0,50).map(k=>row('🏆 80 '+T_('yds')+' '+WX(k.w),MNAME(k.m)+' · '+day(k.t))).join(''):empty('Make the 80-yard Legend kick to hang your first plaque.'))},
 zn:()=>{const Z=J2('fgfZones',{});let h=H2('HOT / COLD ZONES');let any=0;for(let b=0;b<8;b++){const z=Z[b];if(!z)continue;any=1;const p=Math.round(z[0]/z[1]*100);const c=p>=75?'#e85d3a':p>=50?'#e2b23f':'#4aa3df';h+=`<div style="${ROW}"><b>${15+b*10}-${b===7?'80':24+b*10} ${T_('yds')}</b> · ${p}% (${z[0]}/${z[1]}) ${p>=75?'🔥':p<50?'🧊':''}<div style="height:8px;border-radius:4px;background:#1c3a2a;margin-top:6px"><div style="height:8px;border-radius:4px;width:${p}%;background:${c}"></div></div></div>`}return h+(any?'':empty('Kick a few to see your hot and cold zones.'))},
 tk:()=>{const S=J2('fgfStubs',[]);return H2('TICKET STUB ALBUM')+(S.length?S.map(s=>`<div style="${ROW};border-left:5px dashed ${s.w?'#7fd38a':'#c46'}">🎟️ <b>${T_('Season')} ${s.s} · ${s.po?T_('PLAYOFFS'):T_('Week')+' '+(s.wk+1)}</b>${s.wk===7&&!s.po?' · 🎉 '+T_('HOMECOMING'):''}<div style="${SUB}">${T_('vs')} ${esc(s.o)} · ${s.w?T_('WIN'):T_('LOSS')} ${s.my}-${s.op} · ${day(s.t)}</div></div>`).join(''):empty('Play a Career game to get your first ticket stub.'))},
 fm:()=>{const F=J2('fgfMail',[]);F.forEach(f=>f.r=1);S2('fgfMail',F);return H2('FAN MAIL')+(F.length?F.map(f=>row('✉️ “'+esc(T_(f.x))+'”','— '+esc(f.n)+' · '+day(f.t))).join(''):empty('Make a 55+ yard or clutch kick and the fans will write in.'))},
 tc:()=>{const H=J2('fgfHOF',[]),L=J2('fgfLWall',[]),Z=J2('fgfZones',{});let m=0,a=0;for(const k in Z){m+=Z[k][0];a+=Z[k][1]}let tn='';try{tn=TEAMS[myT()].n}catch(e){}const nm=esc(LS.fgfKName||LS.fgfOLIni||T_('ROOKIE'));
  return H2('MY TRADING CARD')+`<div style="margin:0 auto;max-width:240px;border-radius:14px;padding:12px;background:linear-gradient(160deg,#2a2208,#0c2416);border:2px solid #d9c67a;text-align:center"><div style="font:900 11px system-ui;color:#d9c67a">FIELD GOAL FRENZY · ${new Date().getFullYear()}</div><div style="font:900 34px system-ui;margin:8px 0">🦵</div><div style="font:900 18px system-ui">${nm}</div><div style="${SUB}">${esc(tn)}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px;font:800 12px system-ui"><div>${T_('LONG')}<br><b style="font-size:18px">${LS.fgfPR||0}</b></div><div>FG%<br><b style="font-size:18px">${a?Math.round(m/a*100):0}</b></div><div>${T_('MAKES')}<br><b style="font-size:18px">${m}</b></div><div>🏆 80s<br><b style="font-size:18px">${L.length}</b></div></div></div><div style="${SUB};text-align:center;margin-top:8px">${T_('Your card updates as you play.')}</div>`}};
 return (W[k]||W.hof)()}
function open(k){k=k||'hof';const T=[['hof','🏛️'],['lw','🏆'],['zn','🔥'],['tk','🎟️'],['fm','✉️'],['tc','🃏']];
 const d=card('📸 '+T_('KICK MEMORIES'),`<div style="display:flex;gap:5px;margin-bottom:6px">${T.map(t=>`<button data-k="${t[0]}" style="${BS};flex:1;padding:6px 0;min-height:40px;${t[0]===k?U.ON:''}">${t[1]}</button>`).join('')}</div>`+tab(k),'fgfs85');d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>open(b.dataset.k))}
window.FGF_MEMORIES=open;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{const un=J2('fgfMail',[]).filter(f=>!f.r).length;L.push(['📸','KICK MEMORIES','Hall of Fame · Legend Wall · zones · ticket stubs · fan mail'+(un?' · ✉️ '+un+' new':'')+' · trading card',()=>open(),!!un])}catch(e){}return L};
})();
