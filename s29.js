// s29: Weekly Missions v2 — a week's worth of goals (~5–7 days at 15–20 min/day), bigger rewards, progress bars + days left.
(function(){
const M=FGF_MIS;if(!M)return;const MI=M.MI;
MI.length=0;[['m_make','Make 150 kicks',150,1500],['m_50','Make 10 kicks of 50+ yards',10,1200],['m_daily','Play 5 Daily Challenges',5,1000],['m_hur','Make 3 kicks in Hurricane',3,1000,'mb'],['m_win','Win 5 Rival or K-I-C-K matches',5,1500],['m_games','Finish 25 runs',25,1000]].forEach(x=>MI.push(x));
const BONUS=2000;
// trackers
const od=dailyDone;dailyDone=function(){const r=od.apply(this,arguments);try{M.misAdd('m_daily',1)}catch(e){}return r};
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(good&&mode==='hurricane'&&ball.res!=='BLOCKED!')M.misAdd('m_hur',1)}catch(e){}return r};
let pst=state;setInterval(()=>{try{if(state==='rres'&&pst!=='rres'&&typeof RV!=='undefined'&&RV&&RV.win)M.misAdd('m_win',1);const c=window.FGF_CH&&FGF_CH();if(state==='chres'&&c&&c.type==='horse'&&!c.p2&&c.win&&!c.mcount){c.mcount=1;M.misAdd('m_win',1)}}catch(e){}pst=state},200);
const daysLeft=()=>{const d=window.FGF_DATE?new Date(FGF_DATE):new Date(),wd=(d.getDay()+6)%7;return 7-wd};
const osc=S3.screen;S3.screen=function(){if(state!=='mis')return osc.apply(this,arguments);BTN=[];const m=M.mis(),dl=daysLeft();
 txt('📋 WEEKLY MISSIONS',W/2,H*0.065,Math.min(26,W*0.07),GOLD,'#063');ctx.fillStyle='#cde';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(dl+' day'+(dl===1?'':'s')+' left · resets Monday · big weekly goals',W/2,H*0.065+22,W*0.92);
 const top=H*0.065+36,bot=H*0.93-22-60,rh=Math.min(78,(bot-top)/MI.length);
 MI.forEach((x,i)=>{const y=top+i*rh,p=Math.min(x[2],m.p[x[0]]||0),done=p>=x[2],cl=!!m.c[x[0]];panel(W*0.04,y,W*0.92,rh-6);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?12:14)+'px system-ui';ctx.fillText(x[1],W*0.07,y+rh*0.3,W*0.55);
  const bw2=W*0.52;ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(W*0.07,y+rh*0.42,bw2,10);ctx.fillStyle=done?'#7fe87f':GOLD;ctx.fillRect(W*0.07,y+rh*0.42,bw2*p/x[2],10);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText(p+' / '+x[2]+(x[4]?' · +🎁 Mystery Box':''),W*0.07,y+rh*0.8,bw2);
  const b=W*0.28,by=y+(rh-6)/2-16;if(cl){ctx.textAlign='center';ctx.fillStyle='#7fe87f';ctx.font='900 12px system-ui';ctx.fillText('✔ CLAIMED',W*0.92-b/2,by+20)}else bx(W*0.92-b,by,b,32,(done?'CLAIM ':'')+'🪙'+x[3].toLocaleString(),()=>{if(!done)return;m.c[x[0]]=1;SV('fgfMis',m);addCoins(x[3]);if(x[4]==='mb')try{FGF_SHOPTEST.mystery();toast('🎁 Mystery Box opened · see the Shop')}catch(e){}sfx.cheer();toast('📋 Mission done  🪙 +'+x[3])},done,12)});
 const all=MI.every(x=>m.c[x[0]]),by=bot+6;if(m.c._b){ctx.fillStyle='#7fe87f';ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText('✔ Weekly bonus claimed',W/2,by+24)}else bx(W*0.12,by,W*0.76,40,all?'🏆 CLAIM WEEKLY BONUS · 🪙 '+BONUS.toLocaleString()+' + 🎁':'Finish all 6 → 🪙 '+BONUS.toLocaleString()+' + 🎁 bonus',()=>{if(!all)return;m.c._b=1;SV('fgfMis',m);addCoins(BONUS);try{FGF_SHOPTEST.mystery()}catch(e){}sfx.cheer();toast('🏆 Weekly bonus  🪙 +'+BONUS)},all,12);
 bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='hub',false,14);return true};
})();
