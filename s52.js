// s52 (Batch 10b, accessibility 2): reduce flashing, high-contrast HUD, dyslexia-friendly font, colorblind wind
// patterns, wind haptics, battery saver. All free, all off by default, art/kicker untouched.
(function(){
const on=k=>LS[k]==='1',flip=k=>LS[k]=on(k)?'0':'1';
// reduce flashing: caps the full-screen make flash and stops crowd flashbulbs
const odb=drawBall;drawBall=function(){if(on('fgfNoFlash')&&typeof flash!=='undefined'&&flash>0.2)flash=0.2;window.FGF_NOBULBS=on('fgfNoFlash');return odb.apply(this,arguments)};
// high-contrast HUD: darker panels with a white outline during play
if(typeof panel==='function'){const op=panel;panel=function(x,y,w,h){const r=op.apply(this,arguments);if(on('fgfHC')&&state==='play'){ctx.save();ctx.fillStyle='rgba(0,0,0,0.5)';ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,h,10);ctx.fill();ctx.stroke();ctx.restore()}return r}}
// dyslexia-friendly font: wider, clearer letters (Verdana stack) + a little letter spacing
const P=CanvasRenderingContext2D.prototype,fo=Object.getOwnPropertyDescriptor(P,'font');let DY=on('fgfDys');
const setDY=v=>{DY=v;document.documentElement.style.fontFamily=v?'Verdana,Tahoma,"Trebuchet MS",sans-serif':'';document.documentElement.style.letterSpacing=v?'0.03em':''};setDY(DY);
if(fo&&fo.set)Object.defineProperty(P,'font',{get:fo.get,set(v){if(DY&&typeof v==='string'&&v.includes('system-ui')){v=v.replace('system-ui','Verdana,Tahoma,"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif');try{this.letterSpacing='0.4px'}catch(e){}}else if(!DY&&this.letterSpacing&&this.letterSpacing!=='0px'){try{this.letterSpacing='0px'}catch(e){}}fo.set.call(this,v)},configurable:true});
// colorblind wind patterns: the wind chip gets arrows › whose count shows strength (no color needed)
const wp=t=>{const m=+t.split(' ')[0];if(!(m>0))return t;const n=m>=15?3:m>=8?2:1,a=(wind.x||0)>=0?'›':'‹';return (a==='‹'?a.repeat(n)+' ':'')+t+(a==='›'?' '+a.repeat(n):'')};const omt=P.measureText;P.measureText=function(t){if(on('fgfWPat')&&typeof t==='string'&&/^\d+ MPH$/.test(t)&&state==='play')arguments[0]=wp(t);return omt.apply(this,arguments)};
const oft=P.fillText;P.fillText=function(t){if(on('fgfWPat')&&typeof t==='string'&&/^\d+ MPH$/.test(t)&&state==='play')arguments[0]=wp(t);return oft.apply(this,arguments)};
// wind haptics: when a kick is set up, buzz once (wind from right→ left push) = one long, push right = two short; stronger wind = longer
let last='';setInterval(()=>{try{if(!on('fgfWHap')||state!=='play'||ball.fly||!navigator.vibrate)return;const k=roundN+'|'+score+'|'+lives;if(k===last)return;last=k;const m=+wind.mph||0;if(m<3)return;const d=Math.min(160,40+m*6);navigator.vibrate((wind.x||0)<0?[d]:[Math.round(d/2),70,Math.round(d/2)])}catch(e){}},400);
// battery saver: about 30 frames per second instead of 60
let lastF=0;const oRAF=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=function(cb){if(on('fgfBatt')){const w=Math.max(0,33-(performance.now()-lastF));return setTimeout(()=>oRAF(t=>{lastF=performance.now();cb(t)}),w)}return oRAF(cb)};
// screen
const T=[['fgfNoFlash','⚡ REDUCE FLASHING','Softer make flash, no flashbulbs'],['fgfHC','🔲 HIGH-CONTRAST HUD','Darker boxes with white outlines'],['fgfDys','🔤 DYSLEXIA-FRIENDLY FONT','Wider, clearer letters'],['fgfWPat','➡️ WIND ARROWS','› › › shows wind strength without color'],['fgfWHap','📳 WIND HAPTICS','1 long buzz = wind pushes left · 2 short = right'],['fgfBatt','🔋 BATTERY SAVER','30 fps · smoother on older phones']];
const osc=S3.screen;S3.screen=function(){
 if(state==='a11y2'){BTN=[];txt('♿ MORE ACCESSIBILITY',W/2,H*0.07,Math.min(24,W*0.063),GOLD,'#063');const sm=H<640,g=sm?60:72,bw=Math.min(300,W*0.84),x=W/2-bw/2;let y=H*0.12;
  T.forEach(([k,l,s])=>{const v=on(k);bx(x,y,bw,38,l+': '+(v?'ON':'OFF'),()=>{flip(k);if(k==='fgfDys')setDY(on(k))},v,12);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(window.FGF_TR?FGF_TR(s):s,W/2,y+50,W*0.92);y+=g});
  bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='a11y',false,14);return true}
 const r=osc.apply(this,arguments);
 if(state==='a11y')bx(W-76,H*0.93-22,68,42,'MORE ▶',()=>state='a11y2',false,12);
 return r};
})();
