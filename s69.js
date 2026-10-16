// s69 (Kirk, Oct 16): Daily Storm Challenge, slow-mo replay on 50+ yd makes, streak celebrations (5 / 10 in a row),
// storm badges, first-week starter quests. All free, local; storm kicks still go through FGF_SOLVER (s65).
(function(){const T_=t=>window.FGF_TR?FGF_TR(t):t,J2=(k,d)=>{try{return JSON.parse(LS[k])||d}catch(e){return d}},S2=(k,v)=>LS[k]=JSON.stringify(v);
const DK2=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const mul=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const BS='box-sizing:border-box;border:1px solid rgba(160,190,175,.3);background:rgba(8,24,16,.9);color:#fff;border-radius:12px;padding:10px 12px;font:800 14px system-ui';
function card(h,html){const o=document.getElementById('fgfs69');if(o)o.remove();const d=document.createElement('div');d.id='fgfs69';d.className='fgfov';d.style.cssText='position:fixed;inset:0;background:rgba(2,8,6,.86);z-index:69;display:flex;align-items:center;justify-content:center;padding:12px';
 d.innerHTML=`<div style="background:#071a10;border:1px solid rgba(160,190,175,.3);border-radius:16px;padding:14px;max-width:360px;width:100%;color:#fff;font:14px system-ui;max-height:88vh;display:flex;flex-direction:column"><div style="color:#f2c230;font:900 17px system-ui;text-align:center;margin-bottom:8px">${h}</div><div style="overflow-y:auto;flex:1;min-height:0">${html}</div><button id="s69x" style="${BS};margin-top:10px;text-align:center">◀ BACK</button></div>`;document.body.appendChild(d);d.querySelector('#s69x').onclick=()=>d.remove();d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',300);return d}
// ================= 1) DAILY STORM =================
const DS={k:0,made:0,on:false};const DTYPE=()=>hash('fgfds'+DK2())%2?'t':'h';window.FGF_DSTYPE=DTYPE;
const KICKS=10;
const oNW=newWind;newWind=function(){if(mode==='dstorm'){window.__SRNG=mul(hash(DK2()+':'+DS.k))}const r=oNW.apply(this,arguments);return r};
const oRB=resetBall;resetBall=function(){if(mode==='dstorm')window.__SRNG=mul(hash(DK2()+':k'+DS.k));const r=oRB.apply(this,arguments);window.__SRNG=null;return r};
const oNG=newGame;newGame=function(m){if((m||mode)==='dstorm'){DS.k=0;DS.made=0;DS.on=true}else DS.on=false;const r=oNG.apply(this,arguments);if(mode==='dstorm')lives=KICKS;return r};
const oRes=S3.onResult;S3.onResult=function(good){const r=oRes.apply(this,arguments);try{if(mode==='dstorm'&&DS.on&&good)DS.made++}catch(e){}return r};
const oNx=S3.next;S3.next=function(good){if(mode==='dstorm'&&DS.on){DS.k++;lives=Math.max(1,KICKS-DS.k);if(DS.k>=KICKS){DS.on=false;dsDone();endGame();return true}newWind();resetBall();return true}return oNx.apply(this,arguments)};
function dsDone(){const d=DK2(),R=J2('fgfDSR',{});const first=!R[d];if(first){const c=50*DS.made+(DS.made>=5?250:100);addCoins(c);R[d]={m:DS.made,s:score,c};S2('fgfDSR',R);setTimeout(()=>toast('📅 Daily Storm: '+DS.made+'/10 · 🪙 +'+c),900)}else{R[d].s=Math.max(R[d].s||0,score);S2('fgfDSR',R);setTimeout(()=>toast('📅 Daily Storm replay · reward already claimed today'),900)}badge('daily');quest('ds')}
window.FGF_DSTORM=()=>{try{sfx.whistle()}catch(e){}newGame('dstorm')};
// add to the Storm Modes menu
const oSM=window.FGF_STORMMENU;if(oSM)window.FGF_STORMMENU=function(){oSM();try{const d=document.getElementById('fgfxm'),b=d&&d.querySelector('[data-s=hurricane]');if(b){const n=b.cloneNode(true);n.dataset.s='dstorm';const done=J2('fgfDSR',{})[DK2()];n.innerHTML=`<span style="color:#f2c230">📅 DAILY STORM · ${DTYPE()==='h'?'🌀 HURRICANE':'🌪️ TORNADO'}</span><br><span style="font:12px system-ui;color:#bcd">${T_('Same 10 kicks for everyone today')}${done?' · ✓ '+done.m+'/10':' · 🪙 reward'}</span>`;n.onclick=()=>{d.remove();FGF_DSTORM()};b.parentNode.insertBefore(n,b)}}catch(e){}};
// HUD
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(state==='play'&&mode==='dstorm'){ctx.save();ctx.textAlign='center';ctx.font='900 12px system-ui';ctx.fillStyle='#cfe';ctx.fillText('📅 '+T_('DAILY STORM')+' · '+T_('kick')+' '+Math.min(KICKS,DS.k+1)+'/'+KICKS+' · '+DS.made+' '+T_('made'),W/2,H*0.215+34);ctx.restore()}}catch(e){}return r};
// ================= 3) SLOW-MO REPLAY ON 50+ YD MAKES =================
// The base game (s4) already replays 50+ yd makes in slow motion (state 'replay', tap to skip). Now: toggle (LS.fgfLongRep),
// the NEW kick animation plays during it, and the celebration plays right after it.
let rp0=0,rpOn=false;
const oTop=S3.top;S3.top=function(){const r=oTop?oTop.apply(this,arguments):undefined;try{
 if(state==='replay'){if(!rpOn){rpOn=true;rp0=performance.now();window.__MREP=1}kickT=Math.max(0,0.35-(performance.now()-rp0)/1000*0.35)}
 else if(rpOn){rpOn=false;window.__MREP=0;kickT=0;if(state==='play'&&LS.fgfCelAll!=='0'){try{const p=FGF_STYLE.BYID[FGF_STYLE.ST().p];FGF_KANIM.CEL={m:(p&&p[1][3][2])||'hop',t:performance.now(),d:p?null:['🙌','YES!']}}catch(e){}}}}catch(e){}return r};
window.FGF_MREP={get on(){return rpOn}};
addEventListener('pointerdown',e=>{if(state==='replay'&&window.FGF_RPSKIP&&!(e.target&&e.target.closest&&e.target.closest('.fgfov'))){FGF_RPSKIP()}},true);
const oSR=S3.screen;S3.screen=function(){const r=oSR.apply(this,arguments);try{if(state==='replay'){ctx.save();ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.roundRect(W/2-70,H-64,140,26,10);ctx.fill();ctx.fillStyle='#dde';ctx.font='700 12px system-ui';ctx.textAlign='center';ctx.fillText(T_('🎬 Slow-mo · tap to skip'),W/2,H-46);ctx.restore();if(window.FGF_RPSKIP)BTN.push({x:0,y:0,w:W,h:H,cb:FGF_RPSKIP})}}catch(e){}return r};
// ================= 4) STREAK CELEBRATIONS =================
const SY=window.FGF_STYLE;
if(SY){[['sy_st5','🔥 Heat Check (5 in a row)',0,['🔥','HEAT CHECK!','dance'],'earn','Earn it: make 5 kicks in a row'],['sy_st10','👑 Unstoppable (10 in a row)',0,['👑','UNSTOPPABLE!','flip'],'earn','Earn it: make 10 kicks in a row']].forEach(it=>{if(!SY.BYID[it[0]]){SY.CAT.p[2].unshift(it);SY.BYID[it[0]]=['p',it]}})}
const oR3=S3.onResult;S3.onResult=function(good){const r=oR3.apply(this,arguments);try{if(good&&(streak===5||streak===10)&&mode!=='tut'){const id=streak===5?'sy_st5':'sy_st10',it=SY.BYID[id][1];if(!own.includes(id)){own.push(id);SV('fgfOwn',own);setTimeout(()=>toast('🎉 '+T_('Unlocked celebration')+': '+it[1]+' · '+T_('Shop › Style › Poses')),600)}
  if(LS.fgfCelAll!=='0')setTimeout(()=>{try{FGF_KANIM.CEL={m:it[3][2],t:performance.now(),d:[it[3][0],streak+' '+T_('IN A ROW!')]}}catch(e){}},0)}}catch(e){}return r};
// ================= 5) STORM BADGES =================
const BADGES=[['h60','🌀','Eye Wall','Make a 60+ yd kick in 150+ mph hurricane wind'],['cat5','🌀','Category 5','Make a kick in 165+ mph hurricane wind'],['ef5','🌪️','EF5 Survivor','Make a kick in an EF5 tornado'],['ef4','🌪️','Twister Tamer','Make 3 kicks in a row in EF4+ tornado wind'],['slalom','🌀','Storm Slalom','Make a kick in Storm Slalom'],['twist','🌪️','Twister Posts','Make a kick in Twister Posts'],['chaser','🚨','Storm Chaser','Make 10 kicks in one Tornado run'],['daily','📅','Daily Storm','Finish a Daily Storm Challenge'],['perfect','✨','Calm in the Storm','Make all 10 kicks in a Daily Storm']];
const BG=()=>J2('fgfStormB',{});
function badge(id){const b=BG();if(b[id])return;b[id]=Date.now();S2('fgfStormB',b);const B=BADGES.find(x=>x[0]===id);if(B){addCoins(250);setTimeout(()=>toast('🏅 '+T_('Badge')+': '+B[2]+' · 🪙 +250'),1200)}}
let efRun=0,torRun=0;const oNG2=newGame;newGame=function(){efRun=0;torRun=0;return oNG2.apply(this,arguments)};
const oR4=S3.onResult;S3.onResult=function(good){const r=oR4.apply(this,arguments);try{const mph=wind&&wind.mph||0;
 if(good&&ball.res!=='BLOCKED!'){if(weather==='hurricane'&&mph>=150&&dist>=60)badge('h60');if(weather==='hurricane'&&mph>=165)badge('cat5');if(weather==='tornado'&&wind.ef===5)badge('ef5');if(mode==='storm')badge('slalom');if(mode==='twister')badge('twist');
  if(weather==='tornado'&&wind.ef>=4){if(++efRun>=3)badge('ef4')}else efRun=0;if(mode==='tornado'&&++torRun>=10)badge('chaser');if(mode==='dstorm'&&DS.made>=10)badge('perfect')}else efRun=0;
 if(weather==='hurricane')quest('hur');if(weather==='tornado')quest('tor');if(good)questCount()}catch(e){}return r};
function badgesUI(){const b=BG();card('🏅 '+T_('STORM BADGES')+' · '+Object.keys(b).length+'/'+BADGES.length,BADGES.map(x=>`<div style="display:flex;gap:10px;align-items:center;padding:9px 8px;margin-bottom:6px;border-radius:12px;background:rgba(8,24,16,.85);border:1px solid rgba(160,190,175,.2);${b[x[0]]?'':'opacity:.5'}"><div style="font-size:26px;width:34px;text-align:center">${b[x[0]]?x[1]:'🔒'}</div><div><div style="font:800 14px system-ui">${T_(x[2])}</div><div style="font:12px system-ui;color:#9fb8aa">${T_(x[3])}${b[x[0]]?' · ✓':''}</div></div></div>`).join('')+`<div style="font:12px system-ui;color:#9fb8aa;text-align:center">${T_('Each badge pays 🪙 250 once.')}</div>`)}
window.FGF_BADGES=badgesUI;
// ================= 6) STARTER QUESTS =================
if(!LS.fgfSQ0)LS.fgfSQ0=Date.now();const QON=()=>Date.now()-(+LS.fgfSQ0)<7*864e5;
const Q=[['k10','🏈','Make 10 kicks',10,150],['k40','🎯','Make a 40+ yard kick',1,150],['hur','🌀','Try a Hurricane kick',1,150],['tor','🌪️','Try a Tornado kick',1,150],['buy','🛒','Buy your first shop item',1,200],['cel','💪','Equip a celebration pose',1,100],['ds','📅','Finish a Daily Storm',1,250],['k50','🏟️','Make 50 kicks',50,400]];
const QS=()=>J2('fgfSQ',{p:{},c:{}});function quest(id,n){const s=QS();const q=Q.find(x=>x[0]===id);if(!q)return;s.p[id]=Math.min(q[3],n!=null?n:(s.p[id]||0)+1);S2('fgfSQ',s)}
function questCount(){const s=QS();s.p.k10=Math.min(10,(s.p.k10||0)+1);s.p.k50=Math.min(50,(s.p.k50||0)+1);if(dist>=40)s.p.k40=1;S2('fgfSQ',s)}
const own0=own.length;let lastOwn=own.length;setInterval(()=>{try{if(own.length>lastOwn&&state==='shop')quest('buy',1);lastOwn=own.length;if(SY&&SY.ST().p)quest('cel',1)}catch(e){}},700);
const ready=()=>{const s=QS();return Q.filter(q=>(s.p[q[0]]||0)>=q[3]&&!s.c[q[0]])};
function questUI(){const s=QS(),left=Math.max(0,Math.ceil((7*864e5-(Date.now()-(+LS.fgfSQ0)))/864e5));const d=card('🧭 '+T_('STARTER QUESTS'),`<div style="font:12px system-ui;color:#9fb8aa;text-align:center;margin-bottom:8px">${T_('First-week goals')} · ${left} ${T_('days left')}</div>`+Q.map(q=>{const p=s.p[q[0]]||0,done=p>=q[3],cl=s.c[q[0]];return `<div style="display:flex;gap:10px;align-items:center;padding:9px 8px;margin-bottom:6px;border-radius:12px;background:rgba(8,24,16,.85);border:1px solid rgba(160,190,175,.2)"><div style="font-size:24px;width:32px;text-align:center">${q[1]}</div><div style="flex:1"><div style="font:800 14px system-ui">${T_(q[2])}</div><div style="font:12px system-ui;color:#9fb8aa">${Math.min(p,q[3])}/${q[3]} · 🪙 ${q[4]}</div></div>${cl?'<span style="color:#7fd39a;font:800 13px system-ui">✓</span>':done?`<button data-q="${q[0]}" style="${BS};padding:7px 12px;border-color:#7fd39a;color:#7fd39a">${T_('CLAIM')}</button>`:''}</div>`}).join(''));
 d.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const s2=QS(),q=Q.find(x=>x[0]===b.dataset.q);if(s2.c[q[0]])return;s2.c[q[0]]=1;S2('fgfSQ',s2);addCoins(q[4]);try{sfx.cheer()}catch(e){}toast('🧭 '+T_(q[2])+' · 🪙 +'+q[4]);questUI()})}
window.FGF_QUESTS=questUI;window.FGF_QTEST={quest,QS,ready,BG,badge,DS,DTYPE};
// ---- hub entries ----
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);const done=J2('fgfDSR',{})[DK2()];
 L.unshift(['📅','DAILY STORM',(DTYPE()==='h'?'🌀 Hurricane':'🌪️ Tornado')+' · '+(done?'done today ✓ '+done.m+'/10':'10 kicks · 🪙 reward'),()=>FGF_DSTORM(),!done]);
 if(QON()||ready().length)L.push(['🧭','STARTER QUESTS',ready().length?ready().length+' ready to claim':'First-week goals · 🪙 rewards',questUI,ready().length>0]);
 L.push(['🏅','STORM BADGES',Object.keys(BG()).length+' / '+BADGES.length+' earned',badgesUI,false]);return L};
// ---- Settings: long-make replay toggle on More Settings (below Cloud Save slot) ----
const oS=S3.screen;S3.screen=function(){const r=oS.apply(this,arguments);try{if(state==='mset'&&window.FGF_MSR){const q=FGF_MSR(4),bw=Math.min(300,W*0.84),on=LS.fgfLongRep!=='0';if(q.y+q.h<H*0.93-26)bx(W/2-bw/2,q.y,bw,q.h,'🎬 SLOW-MO LONG MAKES: '+(on?'ON':'OFF'),()=>{LS.fgfLongRep=on?'0':'1'},on,13)}}catch(e){}return r};
})();
