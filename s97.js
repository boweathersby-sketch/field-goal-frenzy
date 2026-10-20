// s97 (Oct 18 #114, #121, #131): Career extras.
// 🙌 FAIR-CATCH FREE KICK: a rare real-rule moment (about 1 in 16 Career field goals in Q2/Q4): +6 yds, but no rush, so it can't be blocked.
// 🧊 HOLD THE LEAD: a late Q4 field goal while you lead by 1-5 becomes "ICE IT" (two-score game); the crowd reacts differently to a make or a miss.
// 📋 COACH TRUST: 0-100, starts at 50, +4 per Career make, -6 per miss. At 70+ the coach sends you out for longer tries (+2 yds), at 85+ (+4 yds).
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on||typeof simAdvance!=='function')return;const {T_}=U;
const TR=()=>Math.max(0,Math.min(100,+(LS.fgfTrust||50)));const tb=t=>t>=85?4:t>=70?2:0;
window.FGF_TRUST=TR;
if(typeof fgDist==='function'){const oFD=fgDist;fgDist=function(){return Math.min(68,oFD.apply(this,arguments)+tb(TR()))}}
const oSA=simAdvance;simAdvance=function(){const r=oSA.apply(this,arguments);try{if(state==='ctick'&&CG&&CG.kick&&CG.kick.t==='fg'&&!CG.kick.__s97){const k=CG.kick;k.__s97=1;
 if(!CG.__s97){CG.__s97=1;const t=TR();setTimeout(()=>toast('📋 '+T_('Coach trust')+' '+t+'/100'+(tb(t)?' · '+T_('longer tries'):'')),1200)}
 const lead=CG.my-CG.op;
 if(CG.q===4&&!CG.ot&&lead>=1&&lead<=5&&!/GAME-WINNER|TO TIE/.test(k.lab)){k.ice=1;k.lab='🧊 ICE IT · '+k.lab;(CG.log||[]).push('🧊 '+T_('Up by # late. A field goal makes it a two-score game.').replace('#',lead))}
 else if((CG.q===2||CG.q===4)&&!CG.ot&&!CG.fk&&!/GAME-WINNER|TO TIE|NEED A TD/.test(k.lab)&&Math.random()<1/16){CG.fk=1;k.fk=1;k.cc=1;k.d=Math.min(62,k.d+6);k.lab='🙌 FAIR-CATCH FREE KICK +3';(CG.log||[]).push('🙌 '+T_('Fair catch as the half ends! Free kick: no rush, a longer try.'))}}}catch(e){}return r};
if(window.S3&&S3.onKick){const oK=S3.onKick;S3.onKick=function(){const b=oK.apply(this,arguments);try{if(mode==='career'&&CG&&CG.kick&&CG.kick.fk)return false}catch(e){}return b}}
on(e=>{try{if((e.t!=='make'&&e.t!=='miss')||e.m!=='career')return;const g=e.t==='make';const o=TR(),n=Math.max(0,Math.min(100,o+(g?4:-6)));LS.fgfTrust=n;
 if(tb(n)>tb(o))setTimeout(()=>toast('📋 '+T_('Coach trust # · the coach will send you out for longer tries').replace('#',n)),1600);
 else if(tb(n)<tb(o))setTimeout(()=>toast('📋 '+T_('Coach trust #').replace('#',n)),1600);
 const k=CG&&CG.kick;if(k&&k.ice){setTimeout(()=>{toast(g?'🧊 '+T_('Game iced! The crowd erupts'):'😬 '+T_('Door left open… the crowd goes quiet'));try{g&&sfx.crowd()}catch(x){}},700)}
 if(k&&k.fk&&g)setTimeout(()=>toast('🙌 '+T_('Free kick is good! A real-rule rarity')),700)}catch(x){}});
})();
