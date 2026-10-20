// s105 (final translation pass): translate text inside the older HTML cards (overlays built before T_ existed).
// Every text node inside an overlay (.fgfov, #fbm, toasts) goes through the same dictionary lookup as the canvas (FGF_TR).
// Text that is already translated, names and numbers simply have no dictionary entry, so they are left alone.
(function(){if(!window.FGF_TR)return;const TR=window.FGF_TR,SK=/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/;
const fix=root=>{try{if((LS.fgfLang||'en')==='en')return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=w.nextNode())L.push(n);
 for(const t of L){const v=t.nodeValue;if(!v||!/[A-Za-z]{2}/.test(v)||t.__tr===v)continue;if(t.parentNode&&SK.test(t.parentNode.nodeName))continue;const lead=v.match(/^\s*/)[0],tail=v.match(/\s*$/)[0],core=v.trim();const o=TR(core);if(o&&o!==core){t.nodeValue=lead+o+tail}t.__tr=t.nodeValue}
 root.querySelectorAll&&root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(e=>['placeholder','aria-label','title'].forEach(a=>{const v=e.getAttribute(a);if(v&&/[A-Za-z]{2}/.test(v)){const o=TR(v);if(o&&o!==v)e.setAttribute(a,o)}}))}catch(e){}};
const isOv=e=>e&&e.nodeType===1&&(e.classList.contains('fgfov')||e.id==='fbm'||(e.closest&&e.closest('.fgfov,#fbm')));
let q=new Set(),sch=0;const run=()=>{sch=0;const s=[...q];q.clear();s.forEach(e=>{if(e.isConnected)fix(e)})};
new MutationObserver(ms=>{for(const m of ms){const tg=m.type==='characterData'?m.target.parentNode:m.target;if(m.type==='childList')m.addedNodes.forEach(n=>{const e=n.nodeType===1?n:n.parentNode;if(isOv(e))q.add(e)});else if(isOv(tg))q.add(tg)}if(q.size&&!sch){sch=1;requestAnimationFrame(run)}}).observe(document.body,{childList:true,subtree:true,characterData:true});
window.FGF_DOMTR=fix;
})();
