// s99 (Oct 19 #184, #189, #190): Stadium Passport, Return Week, Coach's Clipboard.
// Stadium Passport: a stamp the first time you make a kick in each of the 12 stadiums/backdrops. All 12 = 🪙 400.
// Return Week: coming back after 7+ days opens a 3-day path (one small goal a day); finishing it gives a free look from the shop.
// Coach's Clipboard: one personal tip a week, picked from your own misses (crosswind side, short, blocked, long range).
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on)return;const {T_,J2,S2,DK,BS,ROW,SUB,H2,card,WEEK}=U;
const coin=n=>{try{n&&addCoins(n)}catch(e){}};
// ---------- Stadium Passport ----------
const SID=()=>{try{return S5.bgFor(stadT()).id}catch(e){return null}};
const NM=id=>{if(/^bg\d$/.test(id)){const t=TEAMS[+id.slice(2)];return t?t.n.split(' ').slice(-1)[0].toLowerCase().replace(/^./,c=>c.toUpperCase())+'|F':id}return {beach:'Beach',space:'Space',volcano:'Volcano',roof:'City Rooftop'}[id]||id};
const NMT=id=>{const n=NM(id);return n.endsWith('|F')?T_('{t} Field').replace('{t}',n.slice(0,-2)):T_(n)};const IDS=['bg0','bg1','bg2','bg3','bg4','bg5','bg6','bg7','beach','space','volcano','roof'];
on(e=>{try{if(e.t!=='make')return;const id=SID();if(!id||!IDS.includes(id))return;const P=J2('fgfPass',{});if(P[id])return;P[id]=DK();S2('fgfPass',P);const n=IDS.filter(i=>P[i]).length;
 setTimeout(()=>{if(n===12){coin(400);toast('🛂 '+T_('Stadium Passport complete! +🪙 400'))}else toast('🛂 '+T_('Passport stamp')+' · '+NMT(id)+' · '+n+'/12')},1300)}catch(x){}});
function passport(){const P=J2('fgfPass',{}),n=IDS.filter(i=>P[i]).length;
 const cells=IDS.map(id=>{const s=P[id];return `<div style="border-radius:12px;padding:9px 6px;text-align:center;${s?'background:rgba(242,194,48,.16);border:2px dashed #f2c230':'background:rgba(255,255,255,.04);border:2px dashed rgba(255,255,255,.14)'}"><div style="font-size:20px;${s?'':'filter:grayscale(1);opacity:.35'}">${id==='beach'?'🏖️':id==='space'?'🚀':id==='volcano'?'🌋':id==='roof'?'🏙️':'🏟️'}</div><div style="font:800 11px system-ui;color:${s?'#f2c230':'#8aa496'};margin-top:3px">${NMT(id)}</div><div style="font:10px system-ui;color:#9fb8aa">${s?'✓ '+s.slice(5):'—'}</div></div>`}).join('');
 card('🛂 '+T_('STADIUM PASSPORT'),`<div style="${ROW};text-align:center"><b>${n} / 12</b> ${T_('stamps')}<div style="${SUB}">${T_('Make a kick in every stadium and backdrop')} · 🪙 400</div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:8px">${cells}</div>`,'fgfs99')}
// ---------- Coach's Clipboard ----------
let wx0=0;const oRes=result;result=function(r){try{if(!ball.done)wx0=wind?wind.x:0}catch(e){}return oRes.apply(this,arguments)};
on(e=>{try{if(e.t!=='make'&&e.t!=='miss')return;const w=WEEK(),C=J2('fgfClip',{});if(C.w!==w){C.prev=C.w?{s:C.s}:C.prev;C.w=w;C.s={n:0,m:0,wl:0,wr:0,cl:0,cr:0,sh:0,bl:0,lg:0,lgm:0,cw:0,cwm:0}}const s=C.s;s.n++;const r=String(ball&&ball.res||'');
 const cross=Math.abs(wx0)>=4;if(cross)s.cw++;if(e.d>=50)s.lg++;
 if(e.t==='make'){s.m++;if(cross)s.cwm++;if(e.d>=50)s.lgm++}
 else{if(/LEFT/.test(r)){s.wl++;if(cross)(wx0<0?s.cl++:0)}else if(/RIGHT/.test(r)){s.wr++;if(cross)(wx0>0?s.cr++:0)}else if(/SHORT/.test(r))s.sh++;else if(/BLOCK/.test(r))s.bl++}
 S2('fgfClip',C)}catch(x){}});
function tip(){const C=J2('fgfClip',{}),s=(C.s&&C.s.n>=12)?C.s:(C.prev&&C.prev.s&&C.prev.s.n>=12?C.prev.s:null);if(!s)return null;
 const miss=s.n-s.m,T=[];
 if(s.cl+s.cr>=3){const L=s.cl>=s.cr;T.push([s.cl+s.cr,'🌬️',L?'You miss left in crosswinds':'You miss right in crosswinds',L?'The wind is pushing you left · aim a little more right into it':'The wind is pushing you right · aim a little more left into it'])}
 if(s.wl>=3&&s.wl>=s.wr*2)T.push([s.wl*0.8,'↖️','Most of your misses go left','Take a breath and finish your swipe straight up the middle']);
 if(s.wr>=3&&s.wr>=s.wl*2)T.push([s.wr*0.8,'↗️','Most of your misses go right','Take a breath and finish your swipe straight up the middle']);
 if(s.sh>=3)T.push([s.sh,'💪','Your misses are coming up short','Long kicks need a longer, faster swipe · the ball needs more power']);
 if(s.bl>=2)T.push([s.bl*1.2,'✋','You are getting blocked','Kick a little sooner · the rush gets there if you wait']);
 if(s.lg>=5&&s.lgm/s.lg<0.4)T.push([3,'📏','Long kicks are your next step','From 50+ you made '+s.lgm+' of '+s.lg+' · try a few in the Practice Range']);
 if(!T.length)return['✅',miss?'Steady week · keep it up':'Perfect week so far','You made '+s.m+' of '+s.n+' kicks this week'];
 T.sort((a,b)=>b[0]-a[0]);return T[0].slice(1)}
function clip(){const t=tip();card('📋 '+T_("COACH'S CLIPBOARD"),t?`<div style="${ROW}"><div style="font-size:28px;text-align:center">${t[0]}</div><div style="font:900 15px system-ui;text-align:center;margin:4px 0">${T_(t[1])}</div><div style="${SUB};text-align:center">${T_(t[2])}</div></div><div style="${SUB};text-align:center;margin-top:8px">${T_('A new tip every week, from your own kicks')}</div>`:`<div style="${ROW};text-align:center"><div style="font-size:28px">📋</div>${T_('Kick 12 times this week and Coach will have a tip for you')}</div>`,'fgfs99')}
// ---------- Return Week ----------
const RG=[['Make 5 kicks',5,0],['Make a 40+ yard kick',1,40],['Make 10 kicks',10,0]];
try{const now=Date.now(),last=+(LS.fgfLastPlay||0);if(last&&now-last>7*864e5&&!J2('fgfRet',null)){S2('fgfRet',{s:DK(),d:0,p:0,day:''});setTimeout(()=>toast('🧭 '+T_('Return Week! 3 short goals, then a free look')),5200)}}catch(e){}
on(e=>{try{if(e.t==='start'||e.t==='make'||e.t==='miss')LS.fgfLastPlay=Date.now();if(e.t!=='make')return;const R=J2('fgfRet',null);if(!R||R.d>=3)return;
 if(R.day===DK()&&R.done)return;if(R.day!==DK()){R.day=DK();R.p=0;R.done=0}const g=RG[R.d];if(e.d>=g[2])R.p++;
 if(R.p>=g[1]){R.done=1;R.d++;if(R.d>=3){const it=freeLook();R.it=it;setTimeout(()=>toast('🧭 '+T_('Return Week complete!')+(it?' · 🎁 '+T_(it[1]):' · 🪙 +300')),1400)}else setTimeout(()=>toast('🧭 '+T_('Return Week')+' · '+T_('Day')+' '+R.d+'/3 ✓ · '+T_('come back tomorrow')),1400)}
 S2('fgfRet',R)}catch(x){}});
function freeLook(){try{const all=[];SHOP.forEach(t=>t[1].forEach(i=>{if(i[2]>0&&i[2]<=1500&&!own.includes(i[0])&&!(window.FGF_LIMITED&&FGF_LIMITED[i[0]]))all.push(i)}));if(!all.length){coin(300);return null}all.sort((a,b)=>b[2]-a[2]);const it=all[0];own.push(it[0]);SV('fgfOwn',own);return it}catch(e){coin(300);return null}}
window.FGF_RETURN=()=>J2('fgfRet',null);window.FGF_PASSPORT=passport;window.FGF_CLIP=clip;window.FGF_CLIPTIP=tip;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{const P=J2('fgfPass',{}),n=IDS.filter(i=>P[i]).length,R=J2('fgfRet',null);
 if(R&&R.d<3)L.unshift(['🧭','RETURN WEEK',T_('Day')+' '+(R.d+1)+'/3 · '+T_(RG[R.d][0])+(R.day===DK()?' · '+R.p+'/'+RG[R.d][1]:'')+' · 🎁 '+T_('free look'),()=>toast('🧭 '+T_(RG[R.d][0])),false]);
 L.push(['🛂','STADIUM PASSPORT',n+'/12 '+T_('stamps')+' · 🪙 400',()=>passport(),false]);
 L.push(['📋',"COACH'S CLIPBOARD",T_('One tip a week from your own kicks'),()=>clip(),false])}catch(e){}return L};
})();
