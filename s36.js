// s36: Trophies reset every month (same cycle as the Season Pass). Coins/items/titles already earned are kept.
// Badges that are one-time by nature (Founding Kicker) and Season Champion badges (fgfChamps) are permanent.
(function(){const PERM=['founder'];const cyc=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')};
 const ALL=()=>J('fgfTroAll',{});
 function roll(){const c=cyc(),old=LS.fgfTroCyc;if(!old){const A=ALL();Object.keys(AD).forEach(k=>{if(!A[k])A[k]=1});SV('fgfTroAll',A);LS.fgfTroCyc=c;return}
  if(old<c){Object.keys(AD).forEach(k=>{if(!PERM.includes(k))delete AD[k]});SV('fgfAch',AD);LS.fgfTroCyc=c;try{toast('🏆 New trophy month! Win them all again')}catch(e){}}}
 roll();setInterval(roll,60000);
 const ou=unlock;unlock=function(id){const had=!!AD[id];const r=ou.apply(this,arguments);if(!had&&AD[id]){const A=ALL();A[id]=(A[id]||0)+1;SV('fgfTroAll',A)}return r};
 window.FGF_TROALL=id=>ALL()[id]||0;
 window.FGF_TROLEFT=()=>{const d=new Date(),n=new Date(d.getFullYear(),d.getMonth()+1,1),ms=n-d,dd=Math.floor(ms/864e5),hh=Math.floor(ms%864e5/36e5);return dd>0?dd+'d '+hh+'h':hh+'h '+Math.floor(ms%36e5/6e4)+'m'};
 window.FGF_TROTEST={roll,cyc}})();
// Leaving tester mode: anything equipped but never bought goes back to the default.
(function(){if(window.TESTER)return;const P={};SHOP.forEach(c=>c[1].forEach(i=>P[i[0]]=i[2]));let ch=0;
 Object.keys(eq).forEach(k=>{const id=eq[k];if(id&&P[id]>0&&!own.includes(id)&&!(window.FGF_LIMITED&&FGF_LIMITED[id]&&own.includes(id))){eq[k]='';ch=1}});if(ch)SV('fgfEq',eq)})();
