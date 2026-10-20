// s104 (Oct 18 #158; Oct 19 #200): local error log for feedback (opt-in), tester-only economy dashboard.
// Error log: the last 10 script errors stay on this phone only. The feedback card gets an "Attach error log" box (OFF by default);
// only when ticked are those lines added to the message (error text + file:line + version, nothing personal).
// Economy dashboard: only in tester mode. Coins earned vs spent per day (last 7 days) and the most-bought items.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,J2,S2,ROW,SUB,H2,card,esc}=U;
// ---- error log ----
const V=(()=>{try{const m=[...document.scripts].map(s=>s.src).find(s=>/s104\.js\?v=/.test(s));return m?m.split('v=')[1]:''}catch(e){return ''}})();
const logE=(msg,src,ln)=>{try{const L=J2('fgfErr',[]);const f=String(src||'').split('/').pop().split('?')[0];const e={t:new Date().toISOString().slice(0,16),m:String(msg).slice(0,140),f:f+(ln?':'+ln:'')};if(L.length&&L[0].m===e.m&&L[0].f===e.f)return;L.unshift(e);S2('fgfErr',L.slice(0,10))}catch(x){}};
addEventListener('error',e=>logE(e.message,e.filename,e.lineno));addEventListener('unhandledrejection',e=>logE('promise: '+(e.reason&&e.reason.message||e.reason),'',0));
new MutationObserver(()=>{const t=document.getElementById('fbt');if(!t||t.__s104)return;t.__s104=1;const L=J2('fgfErr',[]);if(!L.length)return;
 const w=document.createElement('label');w.style.cssText='display:flex;gap:8px;align-items:flex-start;text-align:left;font:12px system-ui;color:#cde;margin:8px 0 0;cursor:pointer';
 w.innerHTML=`<input type="checkbox" id="fberr" style="margin-top:2px;width:18px;height:18px"><span>${T_('Attach the error log from this phone')} (${L.length}) · ${T_('error messages only, nothing personal')}</span>`;t.parentNode.insertBefore(w,t.nextSibling);
 const g=t.closest('#fbm')||document.body;g.addEventListener('click',ev=>{try{if(!ev.target.closest||!ev.target.closest('#fbg'))return;if(document.getElementById('fberr').checked&&!t.value.includes('[errors '))t.value=(t.value+'\n\n[errors v'+V+'] '+L.map(e=>e.t+' '+e.f+' '+e.m).join(' | ')).slice(0,1000)}catch(e){}},true)}).observe(document.body,{childList:true,subtree:true});
window.FGF_ERRLOG=()=>J2('fgfErr',[]);
// ---- tester economy dashboard ----
if(!window.TESTER)return;
const DK=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const oAC=addCoins;addCoins=function(n){const r=oAC.apply(this,arguments);try{const E=J2('fgfEco',{d:{},b:{}}),k=DK();E.d[k]=E.d[k]||[0,0];if(n>0)E.d[k][0]+=n;else E.d[k][1]+=-n;const ks=Object.keys(E.d).sort();while(ks.length>14)delete E.d[ks.shift()];S2('fgfEco',E)}catch(e){}return r};
let n0=own.length;setInterval(()=>{try{if(own.length>n0){const E=J2('fgfEco',{d:{},b:{}});own.slice(n0).forEach(id=>E.b[id]=(E.b[id]||0)+1);n0=own.length;S2('fgfEco',E)}else n0=own.length}catch(e){}},3000);
function dash(){const E=J2('fgfEco',{d:{},b:{}}),ks=Object.keys(E.d).sort().slice(-7),mx=Math.max(1,...ks.map(k=>Math.max(E.d[k][0],E.d[k][1])));
 const rows=ks.map(k=>{const [a,b]=E.d[k];return `<div style="font:12px system-ui;margin:4px 0">${k.slice(5)} <div style="display:flex;gap:4px;align-items:center"><div style="height:7px;width:${a/mx*70}%;background:#7fd38a;border-radius:3px"></div><span>+${a.toLocaleString()}</span></div><div style="display:flex;gap:4px;align-items:center"><div style="height:7px;width:${b/mx*70}%;background:#e57373;border-radius:3px"></div><span>−${b.toLocaleString()}</span></div></div>`}).join('')||'<div style="color:#9fb8aa">No data yet</div>';
 const top=Object.entries(E.b).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([id,c])=>{const it=(typeof ITEM!=='undefined'&&ITEM[id])||null;return `<div style="font:12px system-ui">${esc(it?it[1]:id)} · ${c}×${it?' · 🪙 '+it[2]:''}</div>`}).join('')||'<div style="color:#9fb8aa">No purchases yet</div>';
 card('🧪 ECONOMY (TESTER ONLY)',`<div style="${SUB};text-align:center">Only on this tester device · green earned, red spent</div>${H2('LAST 7 DAYS')}<div style="${ROW}">${rows}</div>${H2('MOST BOUGHT')}<div style="${ROW}">${top}</div>`,'fgfs104')}
window.FGF_ECO=dash;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{L.push(['🧪','ECONOMY (TESTER)','Earned vs spent · most bought',()=>dash(),false])}catch(e){}return L};
})();
