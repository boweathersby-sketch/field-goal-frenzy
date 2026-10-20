// s94 (Kirk's note Oct 20): More Modes is long, so the Practice & Party card is organized into 4 tabs:
// 🌀 TWISTS (Classic with a twist), 🏆 CHALLENGES (score chasers), 🎉 PARTY (2+ players), 📅 DAILY & PRACTICE.
// Works on the s62 card after s71 adds Chip Shots / Blindfold / Storm Repeats. Remembers the last tab. Unknown new modes land in CHALLENGES.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,BS,ON}=U;
const G=[['tw','🌀','TWISTS'],['ch','🏆','CHALLENGES'],['pa','🎉','PARTY'],['da','📅','DAILY & PRACTICE']];
const MAP={wclimb:'tw',wflip:'tw',narrow:'tw',shrink:'tw',roul:'tw',dbl:'tw',ring:'tw',chip:'tw',blind:'tw',
 derby:'ch',xbar:'ch',golf:'ch',callshot:'ch',yladder:'ch',
 pass:'pa',dare:'pa',auction:'pa',kid:'pa',code:'pa',
 puzzle:'da',dprac:'da',windtr:'da',seed:'da'};
window.FGF_XMGROUP=(id,g)=>{MAP[id]=g};
const S71=['chip','blind','seed'];
function org(d){if(d.__s94)return;const bs=[...d.querySelectorAll('button')].filter(b=>b.id!=='xmb'&&(b.dataset.t||b.querySelector('span')));if(bs.length<4)return;d.__s94=1;
 let si=0;bs.forEach(b=>{const id=b.dataset.t||S71[si++]||'';b.dataset.g=MAP[id]||'ch'});
 const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin:0 0 10px;position:sticky;top:0;z-index:2;background:inherit';
 bar.innerHTML=G.map(g=>`<button data-gt="${g[0]}" style="${BS};padding:6px 2px;min-height:48px;font-size:10px;line-height:1.15"><div style="font-size:17px">${g[1]}</div>${T_(g[2])}</button>`).join('');
 bs[0].parentNode.insertBefore(bar,bs[0]);
 const show=g=>{LS.fgfXMG=g;bs.forEach(b=>b.style.display=b.dataset.g===g?'block':'none');bar.querySelectorAll('[data-gt]').forEach(x=>{const on=x.dataset.gt===g;x.style.cssText=x.style.cssText.replace(/;?outline:[^;]*/,'');x.style.setProperty('background',on?'#f2c230':'rgba(10,40,22,.92)','important');x.style.setProperty('color',on?'#0b2a16':'#e8f2ec','important');x.style.setProperty('border-color',on?'#f2c230':'rgba(160,190,175,.32)','important')})};
 bar.querySelectorAll('[data-gt]').forEach(x=>x.onclick=e=>{e.stopPropagation();show(x.dataset.gt)});
 const n={};bs.forEach(b=>n[b.dataset.g]=(n[b.dataset.g]||0)+1);const first=G.find(g=>g[0]===LS.fgfXMG&&n[g[0]])||G.find(g=>n[g[0]]);show(first[0])}
new MutationObserver(()=>{const d=document.getElementById('fgfxm');if(!d||d.__s94)return;
 if(!d.querySelector('[data-t]')||!d.querySelector('#xmb'))return;setTimeout(()=>{try{org(d)}catch(e){}},0)}).observe(document.body,{childList:true,subtree:false});
})();
