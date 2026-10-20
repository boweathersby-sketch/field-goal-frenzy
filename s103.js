// s103 (Oct 18 #161, #164; Oct 19 #202): text size, read cards aloud, wishlist deal alert. (#188 gradual modes lives in s94.)
// Text size (Comfort & Assist): Small / Normal / Large / Extra large for every menu card.
// Read aloud (Comfort & Assist, OFF by default): the phone's own built-in voice reads each card's title and first line.
// Wishlist alert: once a day, if today's Deal of the Day is on your wishlist, a quiet toast tells you.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,BS,ON,SUB}=U;
const TS=[['S','Small',0.9],['N','Normal',1],['L','Large',1.15],['X','Extra large',1.3]];
const st=document.createElement('style');document.head.appendChild(st);
const apply=()=>{const z=(TS.find(t=>t[0]===(LS.fgfTxt||'N'))||TS[1])[2];st.textContent=z===1?'':`.fgfov>div{zoom:${z}}`};apply();
const LANGS={es:'es-ES',pt:'pt-BR',fr:'fr-FR',de:'de-DE',it:'it-IT',nl:'nl-NL',pl:'pl-PL',ru:'ru-RU',tr:'tr-TR',id:'id-ID',tl:'fil-PH',vi:'vi-VN',hi:'hi-IN',ar:'ar-SA',ja:'ja-JP',ko:'ko-KR',zh:'zh-CN'};
const say=t=>{try{if(!window.speechSynthesis||LS.fgfMute==='1')return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=LANGS[LS.fgfLang]||'en-US';u.rate=1;speechSynthesis.speak(u)}catch(e){}};
const clean=t=>String(t||'').replace(/[\u{1F000}-\u{1FFFF}\u2600-\u27BF\uFE0F\u200D]/gu,'').replace(/\s+/g,' ').trim();
let lastSaid='';
new MutationObserver(ms=>{try{
 // read aloud
 if(LS.fgfRead==='1')for(const m of ms)for(const n of m.addedNodes){if(n.nodeType===1&&n.classList&&n.classList.contains('fgfov')){const box=n.firstElementChild;if(!box)continue;const h=box.firstElementChild,bd=box.querySelector('.bd');const t=clean(h&&h.textContent)+'. '+clean(bd&&bd.firstElementChild&&String(bd.firstElementChild.innerText||'').replace(/\n+/g,'. ').replace(/(\.\s*){2,}/g,'. ')).slice(0,160);if(t!==lastSaid&&t.length>3){lastSaid=t;setTimeout(()=>say(t),150)}}}
 // extra rows on Comfort & Assist
 const c=document.getElementById('fgfs92');if(c&&!c.__s103){const gl=c.querySelector('#gl');if(!gl)return;c.__s103=1;const cur=LS.fgfTxt||'N',rd=LS.fgfRead==='1';
  const w=document.createElement('div');w.innerHTML=`<div style="${BS};display:block;width:100%;margin-bottom:8px;box-sizing:border-box">🔠 ${T_('Text size')}<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-top:6px">${TS.map(t=>`<button data-ts="${t[0]}" style="${BS};padding:6px 2px;font-size:11px;${t[0]===cur?ON:''}">${T_(t[1])}</button>`).join('')}</div></div><button id="rdal" style="${BS};display:block;width:100%;text-align:left;margin-bottom:8px;${rd?ON:''}">${rd?'✓ ':'○ '}🗣️ ${T_('Read cards aloud')} · ${rd?T_('ON'):T_('OFF')}<div style="${SUB};font-weight:400;margin-top:3px">${T_("Your phone's built-in voice reads each card's title and first line")}</div></button>`;
  gl.parentNode.insertBefore(w,gl);
  w.querySelectorAll('[data-ts]').forEach(b=>b.onclick=()=>{LS.fgfTxt=b.dataset.ts;apply();window.FGF_COMFORT&&FGF_COMFORT()});
  w.querySelector('#rdal').onclick=()=>{LS.fgfRead=LS.fgfRead==='1'?'0':'1';if(LS.fgfRead==='1')say(T_('Read cards aloud')+' '+T_('ON'));else try{speechSynthesis.cancel()}catch(e){}window.FGF_COMFORT&&FGF_COMFORT()}}
}catch(e){}}).observe(document.body,{childList:true,subtree:true});
// wishlist deal alert
setTimeout(()=>{try{const dk=new Date().toDateString();if(LS.fgfWishAl===dk||!window.FGF_DEAL)return;const d=FGF_DEAL(),W=JSON.parse(LS.fgfWish||'[]');if(d&&d.it&&W.includes(d.it[0])){LS.fgfWishAl=dk;toast('💖 '+T_('On your wishlist and in today’s deal')+': '+T_(d.it[1])+' · 🪙 '+d.pr.toLocaleString())}}catch(e){}},7000);
window.FGF_SAY=say;
})();
