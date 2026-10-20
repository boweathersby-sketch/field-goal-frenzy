// s91 (Oct 19 #183, #185, #186, #191): Yard Collector board, kick grades, First Kick of the Day double XP, Classic run quarters.
// Yard Collector: one box for every distance 20-80 yds, filled the first time you make a kick from there (all modes).
// Kick grades: every make gets a letter for how close to center it went through; running average on the Yard Collector screen.
// First Kick of the Day: the first make each day earns double XP (same XP rule as s20: dist/2, given once more).
// Classic quarters: every 10 makes in one Classic run starts a new quarter with a small banner and coin drop (Q2 +10, Q3 +20, Q4 +30, OT +40).
(function(){const U=window.FGF_UI,on=window.FGF_ON;if(!U||!on)return;const {T_,J2,S2,DK,BS,ROW,SUB,card}=U;
const coin=n=>{try{n&&addCoins(n)}catch(e){}};let cx=0,hw=3.08;
const oRes=result;result=function(r){try{if(!ball.done){cx=ball.x-(window.__POX||0);hw=HALF}}catch(e){}return oRes.apply(this,arguments)};
const GR=[['A+',.15],['A',.3],['B',.5],['C',.75],['D',9]],GP={'A+':4.3,'A':4,'B':3,'C':2,'D':1};
const grade=()=>{const f=Math.abs(cx)/(hw||3.08);for(const g of GR)if(f<g[1])return g[0];return 'D'};
const avgL=p=>p>=4.15?'A+':p>=3.5?'A':p>=2.5?'B':p>=1.5?'C':'D';
let run=0;const oNG=newGame;newGame=function(){run=0;return oNG.apply(this,arguments)};
on(e=>{try{if(e.t!=='make')return;const d=Math.round(e.d);
 // Yard Collector
 if(d>=20&&d<=80){const Y=J2('fgfYC',{});if(!Y[d]){Y[d]=DK();S2('fgfYC',Y);const n=Object.keys(Y).length;
  if(n%10===0&&n<61)setTimeout(()=>toast('🧩 '+T_('Yard Collector: '+n+' of 61 distances')),900);if(n===61)setTimeout(()=>{coin(500);toast('🧩 '+T_('Yard Collector complete! +🪙 500'))},2400)}}
 // Kick grade
 const g=grade(),G=J2('fgfGrades',{n:0,s:0,c:{}});G.n++;G.s+=GP[g];G.c[g]=(G.c[g]||0)+1;S2('fgfGrades',G);
 // First Kick of the Day
 if(LS.fgfFKD!==DK()){LS.fgfFKD=DK();const x=Math.round(d/2);LS.fgfXP=(+LS.fgfXP||0)+x;setTimeout(()=>toast('🌅 '+T_('First make of the day · double XP')+' +'+x+' XP'),1500)}
 // Classic quarters
 if(mode==='classic'){run++;if(run%10===0){const q=run/10;const lab=q>=4?T_('OVERTIME'):T_(['','2ND QUARTER','3RD QUARTER','4TH QUARTER'][q]);const c=Math.min(40,q*10);coin(c);setTimeout(()=>toast('🏈 '+lab+' · +🪙 '+c),1100)}}
}catch(x){}});
window.FGF_GRADE=()=>{const G=J2('fgfGrades',{n:0,s:0,c:{}});return G.n?avgL(G.s/G.n):''};
function open(){const Y=J2('fgfYC',{}),n=Object.keys(Y).length,G=J2('fgfGrades',{n:0,s:0,c:{}});let cells='';
 for(let d=20;d<=80;d++)cells+=`<div title="${d}" style="aspect-ratio:1;border-radius:6px;display:flex;align-items:center;justify-content:center;font:800 11px system-ui;${Y[d]?'background:#f2c230;color:#0b2a16':'background:rgba(255,255,255,.06);color:#6f8a7a;border:1px solid rgba(255,255,255,.1)'}">${d}</div>`;
 const bars=['A+','A','B','C','D'].map(k=>{const v=G.c[k]||0,p=G.n?Math.round(v/G.n*100):0;return `<div style="display:flex;align-items:center;gap:6px;font:700 12px system-ui;margin:2px 0"><b style="width:22px">${k}</b><div style="flex:1;height:8px;border-radius:4px;background:rgba(255,255,255,.08)"><div style="width:${p}%;height:100%;border-radius:4px;background:#f2c230"></div></div><span style="width:34px;text-align:right">${p}%</span></div>`}).join('');
 card('🧩 '+T_('YARD COLLECTOR'),`<div style="${ROW};text-align:center"><b>${n} / 61</b> ${T_('distances made')}<div style="${SUB}">${T_('Make a kick from every distance, 20 to 80 yds')} · 🪙 500</div></div><div style="display:grid;grid-template-columns:repeat(9,1fr);gap:3px;margin:6px 0">${cells}</div><div style="${ROW}"><div style="text-align:center;font-weight:900;margin-bottom:4px">${T_('KICK GRADES')} · ${G.n?T_('average')+' '+avgL(G.s/G.n):'—'}</div>${G.n?bars:`<div style="${SUB};text-align:center">${T_('Every make gets a grade for how close to center it went through.')}</div>`}</div>`,'fgfs91')}
window.FGF_YARDS=open;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{L.push(['🧩','YARD COLLECTOR','Every distance 20 to 80 · kick grades',()=>open(),false])}catch(e){}return L};
})();
