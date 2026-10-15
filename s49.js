// s49: languages (first-launch picker, 18 languages, lazy dictionaries, Beta marks) + "Use My Music".
(function(){
// ---- languages ----
// [code, native name, beta?]  beta = machine translated, not yet reviewed by a native speaker
const L=[['en','English',0],['es','Español',0],['pt','Português',1],['fr','Français',1],['de','Deutsch',1],['it','Italiano',1],['ja','日本語',1],['ko','한국어',1],['zh','简体中文',1],['hi','हिन्दी',1],['ar','العربية',1],['ru','Русский',1],['tr','Türkçe',1],['id','Bahasa Indonesia',1],['vi','Tiếng Việt',1],['tl','Filipino',1],['pl','Polski',1],['nl','Nederlands',1]];
const AVAIL=L.map(l=>l[0]);// all dictionaries shipped; non-en/es stay marked Beta until native review
for(let i=L.length-1;i>=0;i--)if(!AVAIL.includes(L[i][0]))L.splice(i,1);
window.FGF_LANGMETA=L;
const LANGS=window.FGF_LANGS;if(LANGS){LANGS.length=0;L.forEach(l=>LANGS.push([l[0],l[1]+(l[2]?' (Beta)':'')]))}
const LOADED={en:1,es:1};
function loadLang(c){if(LOADED[c]||!/^[a-z]{2}$/.test(c))return;LOADED[c]=1;const s=document.createElement('script');s.src='i18n_'+c+'.js?v='+((document.querySelector('script[src*="s49.js"]')||{src:''}).src.split('v=')[1]||Date.now());document.head.appendChild(s)}
window.FGF_LOADLANG=loadLang;
function setLang(c){LS.fgfLang=c;loadLang(c);document.documentElement.lang=c;document.documentElement.dir=c==='ar'?'rtl':'ltr'}
window.FGF_SETLANG=setLang;
if(LS.fgfLang)setLang(LS.fgfLang);
// cycle in Settings also loads the dictionary
setInterval(()=>{const c=LS.fgfLang;if(c&&!LOADED[c])setLang(c)},400);
const suggest=()=>{const n=((navigator.languages&&navigator.languages[0])||navigator.language||'en').toLowerCase();let c=n.slice(0,2);if(c==='fil')c='tl';if(n.startsWith('fil'))c='tl';return L.some(l=>l[0]===c)?c:'en'};
window.FGF_LANGPICK=function(first){if(document.getElementById('lngm'))return;const cur=LS.fgfLang||suggest();const d=document.createElement('div');d.id='lngm';d.style.cssText='position:fixed;inset:0;background:rgba(2,10,6,.92);z-index:70;display:flex;align-items:center;justify-content:center;font-family:system-ui';
 const b=document.createElement('div');b.style.cssText='background:#06301a;border:3px solid #f5c542;border-radius:16px;width:min(92vw,380px);max-height:88vh;display:flex;flex-direction:column;padding:12px;box-sizing:border-box';
 b.innerHTML='<div style="color:#f5c542;font-weight:900;font-size:20px;text-align:center">🌐 Language · Idioma · Langue</div><div style="color:#bcd;font-size:12px;text-align:center;margin:4px 0 8px">Change any time in Settings</div>';
 const g=document.createElement('div');g.style.cssText='overflow-y:auto;min-height:0;flex:1 1 auto;touch-action:pan-y;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-bottom:4px';
 L.forEach(([c,n,bt])=>{const e=document.createElement('button');e.dir=c==='ar'?'rtl':'ltr';e.style.cssText='min-height:'+(innerWidth<350?40:44)+'px;border-radius:10px;border:2px solid '+(c===cur?'#f5c542':'#2d6a45')+';background:'+(c===cur?'#f5c542':'#0b4026')+';color:'+(c===cur?'#063':'#fff')+';font:700 '+(innerWidth<350?13:14)+'px system-ui;padding:4px 6px;overflow-wrap:anywhere';e.innerHTML=n+(bt?' <span style="font-size:10px;opacity:.75">BETA</span>':'')+(c===suggest()&&first?'<div style="font-size:10px;opacity:.8">✓ suggested</div>':'');
  e.onclick=()=>{setLang(c);LS.fgfLangPicked='1';d.remove();try{sfxClick()}catch(x){}};g.appendChild(e)});
 b.appendChild(g);const n=document.createElement('div');n.style.cssText='color:#8ab;font-size:11px;text-align:center;margin-top:8px';n.textContent='BETA = machine translated, not yet reviewed';b.appendChild(n);d.appendChild(b);document.body.appendChild(d)};
// first launch for new players only (existing players keep their language, default English)
const isNew=!LS.fgfLang&&!LS.fgfLangPicked&&!(+LS.fgfRounds>0);
if(isNew)setTimeout(()=>FGF_LANGPICK(true),900);else if(!LS.fgfLangPicked)LS.fgfLangPicked='1';
// Settings: language button opens the picker instead of cycling
const oSc=S3.screen;S3.screen=function(){const r=oSc?oSc.apply(this,arguments):undefined;try{if(state==='set'){const bw=Math.min(280,W*0.8),x=W/2-bw/2,y=H*0.3+124,b=BTN.find(q=>Math.abs(q.x-(x+bw/2+4))<2&&Math.abs(q.y-y)<2);if(b)b.cb=()=>FGF_LANGPICK(false)}}catch(e){}return r};
// ---- Use My Music ----
// ON: game music starts muted (the separate MUSIC toggle still works), SFX always play, and the page asks the
// browser for "ambient" audio so it mixes with Spotify / Apple Music / SXM instead of pausing them.
const umm=()=>LS.fgfUMM==='1';window.FGF_UMM=umm;
function applySession(){try{if(navigator.audioSession)navigator.audioSession.type=umm()?'ambient':'auto'}catch(e){}try{window.FGF_NATIVE&&FGF_NATIVE.audioMix&&FGF_NATIVE.audioMix(umm())}catch(e){}}
applySession();
function toggleUMM(){if(umm()){LS.fgfUMM='0'}else{LS.fgfUMM='1';LS.fgfMusic='0';toast('🎧 Use My Music ON · game music muted, sound effects stay')}applySession()}
window.FGF_TOGGLEUMM=toggleUMM;
function sw(x,y,w,h,label,on,cb){panel(x,y,w,h);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 12px system-ui';const tw=w-60;ctx.fillText(label,x+10,y+h/2+4,tw);
 const sx=x+w-50,sy=y+h/2-12;ctx.fillStyle=on?'#3ddc84':'#4a5a66';ctx.beginPath();ctx.roundRect(sx,sy,42,24,12);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(on?sx+30:sx+12,sy+12,9,0,7);ctx.fill();btn(x,y,w,h,cb)}
const oH=S3.screen;S3.screen=function(){const r=oH.apply(this,arguments);try{if(state==='mset'){const bw=Math.min(300,W*0.84),x=W/2-bw/2;sw(x+bw/2+4,H*0.16,bw/2-4,48,'🎧 USE MY MUSIC',umm(),toggleUMM);ctx.fillStyle='#9bc';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(umm()?'Use My Music: game music muted · SFX stay · MUSIC still works':'Use My Music: play your own music app while you kick',W/2,H*0.16+63,bw)}}catch(e){}return r};
})();
