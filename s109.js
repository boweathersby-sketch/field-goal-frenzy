// s109 (Kirk, Oct 20): menu music. Original western rock loop (menu_rock.mp3, 25.46 s seamless loop with a baked 40 ms crossfade).
// Plays on the main menu and menu sub-screens through the MUSIC channel (Settings MUSIC toggle, music volume, mute, Use My Music).
// Preloads and tries to start on page load (works where autoplay is allowed); otherwise starts on the first pointerdown/touchstart/keydown anywhere (capture phase), loads lazily, fades out when a game/kick starts (so it never overlaps the Legend anthem), fades back on the menu.
(function(){const PAD=0.5,LEN=25.455556,VOL=0.32,SRC='menu_rock.mp3?v=1';
const MENU=new Set('title hub teams shop mmsel mset social chal career wlb week stad kotw olb h2menu cloud cfield bonus a11y stats spin set perks mis miles marr initials hsel howto hof fstart deal ctl ct cstats cred'.split(' '));
let buf=null,loading=false,failed=false,src=null,g=null,tapped=false;
window.FGF_MENUROCK_ON=true;// tells the old synth menu pad (s20) to stay quiet
const want=()=>!failed&&LS.fgfMusic==='1'&&LS.fgfMute!=='1'&&LS.fgfUMM!=='1'&&!document.hidden&&typeof state!=='undefined'&&MENU.has(state);
function ctx(){try{return au()}catch(e){return null}}
function load(){if(buf||loading||failed)return;const c=ctx();if(!c)return;loading=true;
 fetch(SRC).then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(a=>c.decodeAudioData(a)).then(b=>{buf=b;loading=false}).catch(()=>{failed=true;loading=false;window.FGF_MENUROCK_ON=false})}
function start(){const c=ctx();if(!c||!buf||src)return;let out;const p=window.__CH;window.__CH='music';try{out=OUT(c)}finally{window.__CH=p}
 g=c.createGain();g.gain.value=0;src=c.createBufferSource();src.buffer=buf;src.loop=true;
 const off=Math.max(0,(buf.duration-(LEN+2*PAD))/2);src.loopStart=PAD+off;src.loopEnd=PAD+off+LEN;
 src.connect(g).connect(out);src.start(0,PAD+off);const t=c.currentTime;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(VOL,t+1.2);if(c.state!=='running'){try{c.resume().catch(()=>{})}catch(e){}}}
function stop(f){if(!src)return;const s=src,gg=g;src=null;g=null;try{const c=s.context,t=c.currentTime;gg.gain.cancelScheduledValues(t);gg.gain.setValueAtTime(gg.gain.value,t);gg.gain.linearRampToValueAtTime(0,t+f);s.stop(t+f+0.05)}catch(e){try{s.stop()}catch(x){}}}
const tap=()=>{tapped=true;try{const c=AC||null;if(c&&c.state!=='running')c.resume()}catch(e){}if(want()){if(!buf)load();else start()}};['pointerdown','pointerup','mousedown','touchstart','touchend','click','keydown'].forEach(k=>{addEventListener(k,tap,{capture:true,passive:true});document.addEventListener(k,tap,{capture:true,passive:true})});
try{if(want())load()}catch(e){}
setInterval(()=>{try{if(want()){if(!buf)load();else start()}else if(src)stop(typeof state!=='undefined'&&MENU.has(state)?0.4:0.6)}catch(e){}},200);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&src)stop(0.2)});
window.FGF_MENUROCK={state:()=>({buf:!!buf,dur:buf&&buf.duration,playing:!!src,ctx:(typeof AC!=='undefined'&&AC)?AC.state:null,failed,tapped,loopStart:src&&src.loopStart,loopEnd:src&&src.loopEnd})};
})();
