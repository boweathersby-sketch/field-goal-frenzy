// s62 Batch 11c — modes: PRACTICE & PARTY menu (Yardage Ladder, Wind Trainer, Daily Practice, Kid Mode,
// Challenge Codes, Pass & Play bracket), Pressure hype lines, Moving Posts aim ghost, Continue last Classic run.
(function(){
const T6=t=>window.FGF_TR?FGF_TR(t):t;const R=Math.random,RI=(a,b)=>a+Math.round(R()*(b-a));
const BS='border:2px solid #f2c230;background:#05200f;color:#f2c230;border-radius:16px;padding:10px 14px;font:900 13px system-ui';
const BG='border:2px solid #f2c230;background:#f2c230;color:#000;border-radius:16px;padding:10px 14px;font:900 13px system-ui';
const esc=s=>String(s).replace(/[<&"]/g,c=>({'<':'&lt;','&':'&amp;','"':'&quot;'})[c]);
function card(h,html,id){const o=document.getElementById('fgfxm');if(o)o.remove();const d=document.createElement('div');d.id='fgfxm';d.className='fgfov';d.style.cssText='position:fixed;inset:0;background:rgba(2,10,6,.82);z-index:68;display:flex;align-items:center;justify-content:center;padding:14px';
 d.innerHTML=`<div style="background:#062a14;border:2px solid #f2c230;border-radius:16px;padding:14px;max-width:360px;width:100%;color:#fff;font:14px system-ui;max-height:88vh;overflow:auto"><div style="color:#f2c230;font:900 18px system-ui;text-align:center;margin-bottom:10px">${h}</div>${html}</div>`;document.body.appendChild(d);d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',350);return d}
const closeCard=()=>{const o=document.getElementById('fgfxm');if(o)o.remove()};
const XM=[['yladder','📏','YARDAGE LADDER','20 → 80 yds in 5-yard steps · one miss ends it'],['windtr','🌬️','WIND TRAINER','Read the flags, guess the wind, then kick · 5 kicks'],['dprac','📅','DAILY PRACTICE','Today\'s Daily kick · practice as much as you like, never counts'],['kid','🧸','KID MODE','Short kicks, gentle wind · 10 balls'],['code','🔢','CHALLENGE CODE','Same 5 kicks for anyone with the code · works offline'],['pass','👥','PASS & PLAY','2–4 players on one phone · mini bracket']];
const XP=window.FGF_XMP=window.FGF_XMP||{};window.FGF_XMLIST=XM;let X=null;window.FGF_XM=()=>X;window.FGF_XMSTART=(t,o)=>start(t,o);window.FGF_XMMENU=()=>menu();
const best=t=>+(LS['fgfXM_'+t]||0);
// --- entry in MORE MODES ---
try{FGF_MODES2.push(['xtra','🧰','PRACTICE & PARTY','Ladder · Wind Trainer · Daily practice · Kid · Codes · Pass & Play'])}catch(e){}
function menu(){X=null;const h=XM.map(m=>`<button data-t="${m[0]}" style="${BS};display:block;width:100%;text-align:left;margin:0 0 8px;color:#fff"><span style="color:#f2c230">${m[1]} ${m[2]}</span><br><span style="font:12px system-ui;color:#bcd">${m[3]}${best(m[0])?' · Best '+best(m[0]):''}</span></button>`).join('')+`<button id="xmb" style="${BS};display:block;margin:6px auto 0;min-width:140px">◀ BACK</button>`;
 const d=card('🧰 PRACTICE & PARTY',h);d.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{closeCard();pre(b.dataset.t)});d.querySelector('#xmb').onclick=closeCard}
// --- setup screens ---
function pre(t){if(XP[t]&&XP[t].pre)return XP[t].pre();if(t==='code')return codeUI();if(t==='pass')return passUI();start(t,{})}
const C36='ABCDEFGHJKMNPQRSTUVWXYZ23456789',newCode=()=>'FGF'+Array.from({length:5},()=>C36[R()*C36.length|0]).join('');
const normCode=s=>{s=String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(!s.startsWith('FGF'))s='FGF'+s;return /^FGF[A-Z0-9]{5}$/.test(s)?s:null};
function codeUI(){if(X){X=null;if(String(mode).startsWith('xm_'))mode='classic'}const d=card('🔢 CHALLENGE CODE',`<div style="color:#bcd;font-size:12px;margin-bottom:8px">Everyone who plays the same code gets the same 5 kicks: same yards, same weather, same wind. Send it to a friend and compare.</div><input id="xcin" maxlength="9" placeholder="FGF·····" style="width:100%;box-sizing:border-box;font:900 20px system-ui;letter-spacing:2px;text-align:center;padding:10px;border-radius:12px;border:2px solid #f2c230;background:#05200f;color:#fff;text-transform:uppercase"><div style="display:flex;gap:8px;justify-content:center;margin-top:10px;flex-wrap:wrap"><button id="xcnew" style="${BS}">🎲 NEW CODE</button><button id="xcgo" style="${BG}">PLAY ▶</button><button id="xcx" style="${BS}">◀ BACK</button></div>`);
 const $=i=>d.querySelector('#'+i);$('xcin').value=LS.fgfLastCode||newCode();$('xcnew').onclick=()=>$('xcin').value=newCode();$('xcx').onclick=()=>{closeCard();menu()};$('xcgo').onclick=()=>{const c=normCode($('xcin').value);if(!c){toast('Codes look like FGF + 5 letters/numbers');return}LS.fgfLastCode=c;closeCard();start('code',{code:c})}}
function passUI(){if(X){X=null;if(String(mode).startsWith('xm_'))mode='classic'}let n=+(LS.fgfPassN||2);const nm=JSON.parse(LS.fgfPassNames||'["P1","P2","P3","P4"]');const hc=JSON.parse(LS.fgfPassHC||'[0,0,0,0]');
 const draw=()=>{const d=card('👥 PASS & PLAY',`<div style="color:#bcd;font-size:12px;margin-bottom:8px">Take turns on one phone. Each match is 3 rounds; both players get the same kick. Ties go to sudden death.</div><div style="display:flex;gap:6px;justify-content:center;margin-bottom:8px">${[2,3,4].map(k=>`<button data-n="${k}" style="${k===n?BG:BS}">${k} players</button>`).join('')}</div>${Array.from({length:n},(_,i)=>`<div style="display:flex;gap:6px;align-items:center;margin:0 0 6px"><input data-i="${i}" maxlength="10" value="${esc(nm[i]||'P'+(i+1))}" style="flex:1;min-width:0;box-sizing:border-box;font:16px system-ui;padding:9px;border-radius:10px;border:2px solid #f2c23088;background:#05200f;color:#fff"><button data-h="${i}" style="${BS};padding:8px 6px;min-width:64px;font-size:12px">+${hc[i]||0} ${T6('yds')}</button></div>`).join('')}<div style="color:#bcd;font-size:11px;margin:-2px 0 6px">${T6('Handicap: tap + yds so stronger players kick from farther')}</div><div style="display:flex;gap:8px;justify-content:center;margin-top:6px"><button id="xpgo" style="${BG}">START ▶</button><button id="xpx" style="${BS}">◀ BACK</button></div>`);
  d.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{save(d);n=+b.dataset.n;LS.fgfPassN=n;draw()});d.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{save(d);const i=+b.dataset.h;hc[i]=((hc[i]||0)+5)%15;LS.fgfPassHC=JSON.stringify(hc);draw()});d.querySelector('#xpx').onclick=()=>{closeCard();menu()};d.querySelector('#xpgo').onclick=()=>{save(d);closeCard();const P=nm.slice(0,n).map((s,i)=>(s||'').trim()||'P'+(i+1));start('pass',{P,hc:hc.slice(0,n)})}};
 const save=d=>{d.querySelectorAll('[data-i]').forEach(i=>nm[+i.dataset.i]=i.value);LS.fgfPassNames=JSON.stringify(nm)};draw()}
// --- run ---
const oNGx=newGame;newGame=function(){X=null;return oNGx.apply(this,arguments)};
function start(t,o){closeCard();newGame('classic');mode='xm_'+t;lives=99;prevLives=99;X=Object.assign({t,k:0,pts:0,made:0,log:[]},o);
 if(t==='pass'){const P=X.P;X.sc={};P.forEach(p=>X.sc[p]=0);X.q=P.length===4?[[0,1],[2,3]]:[[0,1]];X.win=[];X.mi=0;newMatch()}
 setup()}
function newMatch(){const m=X.q[X.mi];X.m={a:X.P[m[0]],b:X.P[m[1]],sa:0,sb:0,r:0,turn:0}}
function seeded(seed){const r=rng(seed),d=25+Math.floor(r()*36),wx=['clear','rain','snow','gust','fog','heat','clear','clear'][Math.floor(r()*8)],mph=Math.floor(r()*15),a=r()*6.283;return{d,wx,mph,a}}
function apply(c){dist=c.d;weather=c.wx;wind={mph:c.mph,a:c.a,x:Math.sin(c.a)*c.mph,z:Math.cos(c.a)*c.mph*0.3}}
function setup(){const c=X;msg=null;
 if(c.t==='yladder'){dist=20+c.k*5;newWind()}
 else if(c.t==='windtr'){dist=RI(28,50);newWind();if(Math.abs(wind.mph)<3&&R()<0.6){wind.mph=RI(4,16);wind.x=Math.sin(wind.a||1)*wind.mph}}
 else if(c.t==='dprac'){const d=dailyCfg();apply(d)}
 else if(c.t==='kid'){dist=RI(15,32);newWind();wind.x*=0.3;wind.z*=0.3;wind.mph=Math.round(Math.abs(wind.mph)*0.3)}
 else if(c.t==='code'){apply(seeded(c.code+':'+c.k))}
 else if(c.t==='pass'){const m=c.m;if(m.turn===0){m.cfg=seeded('pass'+Date.now()%1e6+':'+m.r);m.cfg.d=Math.min(60,24+m.r*7+RI(0,6))}apply(m.cfg);const who=m.turn===0?m.a:m.b,hi=c.P.indexOf(who),h=(c.hc||[])[hi]||0;if(h)dist=Math.min(75,dist+h)}
 else if(XP[c.t]){const r=XP[c.t].setup(c);resetBall();if(r!=='hold')state='play';return}
 resetBall();
 if(c.t==='windtr')return guess();
 if(c.t==='pass')return passTo();
 state='play'}
const truth=()=>{const m=Math.round(Math.abs(wind.x)>0.01||wind.mph?Math.abs(wind.mph||0):0),side=m<3?'C':(wind.x>0?'R':'L'),b=m<5?0:m<10?1:m<15?2:3;return{side,b,m}};
function guess(){state='xguess';let g={s:null,b:null};const d=card('🌬️ READ THE WIND',`<div style="text-align:center;font-weight:900;margin:0 0 6px;font-size:13px">Watch the flags. Which way?</div><div style="display:flex;gap:6px;justify-content:center">${[['L','◀ LEFT'],['C','CALM'],['R','RIGHT ▶']].map(x=>`<button data-s="${x[0]}" style="${BS}">${x[1]}</button>`).join('')}</div><div style="text-align:center;font-weight:900;margin:8px 0 6px;font-size:13px">How strong?</div><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">${['0–4','5–9','10–14','15+'].map((x,i)=>`<button data-b="${i}" style="${BS}">${x} mph</button>`).join('')}</div><div style="text-align:center;margin-top:8px"><button id="xgo" style="${BG}">LOCK IT IN</button></div>`);d.firstElementChild.style.padding='10px';d.firstElementChild.firstElementChild.style.cssText='color:#f2c230;font:900 15px system-ui;text-align:center;margin-bottom:4px';d.querySelectorAll('button').forEach(b=>b.dataset.s||b.dataset.b?b.style.padding='7px 10px':0);
 d.style.background='transparent';d.style.alignItems='flex-end';d.style.padding='6px 6px calc(6px + env(safe-area-inset-bottom))';
 const upd=()=>{d.querySelectorAll('[data-s]').forEach(b=>b.style.cssText=(b.dataset.s===g.s?BG:BS)+';padding:7px 10px');d.querySelectorAll('[data-b]').forEach(b=>b.style.cssText=(+b.dataset.b===g.b?BG:BS)+';padding:7px 10px')};
 d.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{g.s=b.dataset.s;upd()});d.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{g.b=+b.dataset.b;upd()});
 d.querySelector('#xgo').onclick=()=>{if(g.s==null||g.b==null){toast('Pick a direction and a strength');return}const t=truth(),ok1=g.s===t.side,ok2=g.b===t.b;let tip=(ok1?4:0)+(ok2?6:0);X.pts+=(ok1?1:0)+(ok2?1:0);if(tip)addCoins(tip);closeCard();toast((ok1&&ok2?'🎯 Spot on! ':ok1||ok2?'Close! ':'Not quite · ')+'It\'s '+t.m+' mph '+(t.side==='C'?'calm':t.side==='L'?'to the left':'to the right')+(tip?' · 🪙 +'+tip:''));state='play'}}
function passTo(){state='xpass';const m=X.m,who=m.turn===0?m.a:m.b;const d=card('📱 PASS TO '+esc(who).toUpperCase(),`<div style="text-align:center;font:900 22px system-ui;margin:4px 0">${esc(m.a)} ${m.sa} – ${m.sb} ${esc(m.b)}</div><div style="text-align:center;color:#bcd">${X.q.length>1&&X.mi===X.q.length-1&&X.P.length>2?'FINAL · ':X.P.length>2?'SEMIFINAL '+(X.mi+1)+' · ':''}Round ${m.r+1}${m.r>=3?' (sudden death)':''} of 3 · ${dist} yds</div><div style="text-align:center;margin-top:14px"><button id="xrd" style="${BG}">${esc(who)} is READY ▶</button></div><div style="text-align:center;margin-top:10px"><button id="xq" style="${BS}">Quit</button></div>`);
 d.querySelector('#xrd').onclick=()=>{closeCard();state='play';toast('🏈 '+who+' · '+dist+' yds')};try{if(window.FGF_TRIVIA&&m.turn===0&&(m.r>0||X.mi>0))FGF_TRIVIA(d.firstElementChild,d.querySelector('#xrd').parentNode)}catch(e){}d.querySelector('#xq').onclick=()=>{closeCard();X=null;mode='classic';state='mmsel'}}
// next kick / end
const oNx=S3.next;S3.next=function(good){if(!X)return hype(good,oNx.apply(this,arguments));const c=X;c.k++;if(good)c.made++;
 if(XP[c.t]){const r=XP[c.t].next(c,good);if(r==='fin')return fin();setup();return true}
 if(c.t==='yladder'){if(!good||dist>=80){c.pts=good?13:c.k-1;if(good)toast('🏆 80 YARDS! Ladder complete!');return fin()}c.pts=c.k;toast('📏 '+dist+' made · next '+(dist+5)+' yds');setup();return true}
 if(c.t==='windtr'){if(good)c.pts++;if(c.k>=5)return fin();setup();return true}
 if(c.t==='dprac'){c.pts=c.made;if(c.k>=5)return fin();setup();return true}
 if(c.t==='kid'){c.pts=c.made;if(c.k>=10)return fin();setup();return true}
 if(c.t==='code'){c.pts=c.made;c.log.push(good?'✅':'❌');if(c.k>=5)return fin();setup();return true}
 if(c.t==='pass'){const m=c.m;if(m.turn===0){if(good)m.sa++;m.turn=1}else{if(good)m.sb++;m.turn=0;m.r++;
   if(m.r>=3&&m.sa!==m.sb){const w=m.sa>m.sb?m.a:m.b;c.win.push(w);c.sc[w]++;toast('🏆 '+w+' wins '+Math.max(m.sa,m.sb)+'–'+Math.min(m.sa,m.sb));
    if(c.mi===0&&c.P.length===3){c.q.push([c.P.indexOf(w),2])}else if(c.mi===1&&c.P.length===4){c.q.push([c.P.indexOf(c.win[0]),c.P.indexOf(c.win[1])])}
    c.mi++;if(c.mi>=c.q.length){c.champ=w;return fin()}newMatch()}}setup();return true}
 return fin()};
function fin(){const c=X;c.done=1;const k='fgfXM_'+c.t,b=best(c.t);let nb=false;if(c.t!=='pass'&&c.pts>b){LS[k]=c.pts;nb=true}state='xres';
 const L=XP[c.t]?XP[c.t].res(c):c.t==='yladder'?(c.pts>=13?'Made all 13 rungs · 80 yds!':'Reached '+(20+Math.max(0,c.pts-1)*5)+' yds · '+c.pts+' rungs'):c.t==='windtr'?c.pts+' of 15 points (guesses + makes)':c.t==='kid'?c.made+' of 10 made':c.t==='code'?c.made+' of 5 made · '+c.log.join(''):c.t==='dprac'?c.made+' of 5 made at today\'s Daily':'🏆 '+esc(c.champ)+' is the champion!';
 const m=XM.find(x=>x[0]===c.t),share=c.t==='code'?`<button id="xsh" style="${BS}">📤 SHARE CODE</button>`:'';
 const d=card(m[1]+' '+m[2],`<div style="text-align:center;font:900 18px system-ui;margin:4px 0 6px">${L}</div>${nb?'<div style="text-align:center;color:#f2c230;font-weight:900">NEW BEST</div>':''}${c.t==='code'?`<div style="text-align:center;font:900 22px system-ui;letter-spacing:2px;margin:8px 0">${c.code}</div>`:''}<div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap"><button id="xag" style="${BG}">AGAIN</button>${share}<button id="xmd" style="${BS}">MODES</button></div>`);
 d.querySelector('#xag').onclick=()=>{const t=c.t,o=XP[t]&&XP[t].again?XP[t].again(c):t==='code'?{code:c.code}:t==='pass'?{P:c.P,hc:c.hc}:{};if(XP[t]&&XP[t].pre&&!XP[t].again){closeCard();XP[t].pre();return}start(t,o)};d.querySelector('#xmd').onclick=()=>{closeCard();X=null;mode='classic';state='mmsel'};
 const sh=d.querySelector('#xsh');if(sh)sh.onclick=()=>{const t='🔢 I made '+c.made+'/5 on Field Goal Frenzy challenge code '+c.code+'. Can you beat it? Open More Modes › Practice & Party › Challenge Code. '+location.origin+location.pathname+'?code='+c.code;if(navigator.share)navigator.share({text:t}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast('📋 Copied'))};
 try{sfx.cheer()}catch(e){}return true}
// screens + HUD
const oSc=S3.screen;S3.screen=function(){if(state==='xguess'||state==='xpass'||state==='xres')return true;const r=oSc.apply(this,arguments);
 try{if(state==='mmsel'){const rows=BTN.filter(b=>Math.abs(b.w-W*0.88)<1);const last=rows.sort((a,b)=>b.y-a.y)[0];if(last)last.cb=menu}}catch(e){}return r};
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);if(X&&state==='play'){const c=X;let s=XP[c.t]?XP[c.t].hud(c):c.t==='yladder'?'📏 LADDER · rung '+(c.k+1)+' of 13 · '+dist+' yds':c.t==='windtr'?'🌬️ WIND TRAINER · kick '+(c.k+1)+' of 5 · '+c.pts+' pts':c.t==='dprac'?'📅 DAILY PRACTICE · '+(c.k+1)+' of 5 · doesn\'t count':c.t==='kid'?'🧸 KID MODE · '+c.made+' made · '+(10-c.k)+' 🏈 left':c.t==='code'?'🔢 '+c.code+' · kick '+(c.k+1)+' of 5':'👥 '+(c.m.turn===0?c.m.a:c.m.b)+' kicking · '+c.m.a+' '+c.m.sa+'–'+c.m.sb+' '+c.m.b;
 ctx.save();ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillStyle='rgba(0,0,0,.45)';const w=Math.min(W*0.96,ctx.measureText(s).width+20);ctx.fillRect(W/2-w/2,H*0.155-15,w,21);ctx.fillStyle=GOLD;ctx.fillText(s,W/2,H*0.155,W*0.94);ctx.restore()}return r};
setInterval(()=>{if(X&&['menu','hub','title','mmsel'].includes(state)){X=null;closeCard();if(String(mode).startsWith('xm_'))mode='classic'}},500);
// ?code=FGFxxxxx link opens the challenge
try{const q=new URLSearchParams(location.search).get('code');const c=normCode(q);if(c){LS.fgfLastCode=c;setTimeout(()=>{if(state==='title'){codeUI();const i=document.getElementById('xcin');if(i)i.value=c}},2500)}}catch(e){}
// ---------- Pressure hype lines ----------
const HY=['{r}: "That was luck. Do it again."','{r} is pacing the sideline...','{r}: "Nobody makes two in a row on me."','The crowd is chanting your name!','{r} just tossed his helmet.','{r}: "I\'ve seen better kicks in pee-wee."','Coach: "Ice in the veins. One more."','{r} is waving a towel to distract you.'];
function hype(good,r){try{if(mode==='pressure'&&good&&state==='play'){const t=TEAMS[(Math.random()*TEAMS.length)|0];toast('🗣️ '+HY[Math.random()*HY.length|0].replace('{r}',t.rv||'Their kicker'))}}catch(e){}return r}
// ---------- Moving Posts aim ghost (first 3 kicks of a run, first 5 runs) ----------
let gk=0,gRun=null;const MMf=()=>window.FGF_MM&&FGF_MM();
const oR=S3.onResult;S3.onResult=function(){const r=oR.apply(this,arguments);try{const m=MMf();if(m&&m.t==='posts')gk++}catch(e){}return r};
const oDP=drawPosts;drawPosts=function(){const r=oDP.apply(this,arguments);try{const m=MMf();if(m&&m.t==='posts'){if(gRun!==m){gRun=m;gk=0;LS.fgfGhostN=+(LS.fgfGhostN||0)+1}
 if(state==='play'&&!ball.fly&&LS.fgfAimHelp!=='0'&&(LS.fgfAimHelp==='1'||(gk<3&&+(LS.fgfGhostN||0)<=5))){const t=performance.now()/1000+1.1,px=Math.sin(t*1.3)*2.6*Math.min(1,(dist-20)/25+0.4),a=P(px,0,dist+0.2),b=P(px,BAR+4,dist+0.2);if(a&&b){ctx.save();ctx.globalAlpha=0.55+0.25*Math.sin(performance.now()/180);ctx.strokeStyle='#7fffd4';ctx.lineWidth=Math.max(2,a.s*0.12);ctx.setLineDash([6,6]);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.setLineDash([]);ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillStyle='#7fffd4';ctx.fillText('AIM HERE · '+(3-gk)+' left',b.x,b.y-6);ctx.restore()}}}}catch(e){}return r};
window.FGF_XMTEST={start,menu,seeded,normCode,truth,codeUI,passUI};
})();
