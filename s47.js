// s47 (Batch 8, accessibility): colorblind palette, reduced motion, big text, separate volume sliders (master / effects / crowd / music),
// announcer voice toggle. The left-handed layout already exists in More Settings.
(function(){
// ---- colorblind palette: swap the UI's red/green pairs for blue/orange (art and sprites untouched) ----
const CB={'#ff5a4f':'#ff9f1c','#ff6b6b':'#ff9f1c','#ff9a9a':'#ffc46b','#7dff6a':'#4da3ff','#7fe87f':'#4da3ff','#2ecc71':'#4da3ff','#7fe8ff':'#c9e7ff'};
const P=CanvasRenderingContext2D.prototype,fd=Object.getOwnPropertyDescriptor(P,'fillStyle'),sd=Object.getOwnPropertyDescriptor(P,'strokeStyle');
const cb=()=>LS.fgfCB==='1';let CBON=cb();window.FGF_CBSET=v=>{LS.fgfCB=v?'1':'0';CBON=!!v};
if(fd&&fd.set)Object.defineProperty(P,'fillStyle',{get:fd.get,set(v){fd.set.call(this,CBON&&typeof v==='string'&&CB[v]?CB[v]:v)},configurable:true});
if(sd&&sd.set)Object.defineProperty(P,'strokeStyle',{get:sd.get,set(v){sd.set.call(this,CBON&&typeof v==='string'&&CB[v]?CB[v]:v)},configurable:true});
// ---- big text: small UI fonts (under 16px) get 15% bigger; fillText maxWidth still keeps them inside their boxes ----
const fo=Object.getOwnPropertyDescriptor(P,'font');let BIG=LS.fgfBig==='1';window.FGF_BIGSET=v=>{LS.fgfBig=v?'1':'0';BIG=!!v};const fc=new Map();
if(fo&&fo.set)Object.defineProperty(P,'font',{get:fo.get,set(v){if(BIG&&typeof v==='string'){let o=fc.get(v);if(o===undefined){o=v.replace(/(\d+(?:\.\d+)?)px/,(m,n)=>{n=+n;return(n<16?Math.round(n*1.15*10)/10:n)+'px'});if(fc.size>500)fc.clear();fc.set(v,o)}v=o}fo.set.call(this,v)},configurable:true});
// ---- volume channels ----
const V=k=>Math.max(0,Math.min(100,+(LS['fgfVol'+k]??100)))/100;let CH=null;
const oOUT=OUT;OUT=function(c){const b=oOUT(c);try{if(!CH){CH={};['sfx','crowd','music'].forEach(k=>{const g=c.createGain();g.connect(b);CH[k]=g})}CH.sfx.gain.value=V('S');CH.crowd.gain.value=V('C');CH.music.gain.value=V('U');if(typeof MOUT!=='undefined'&&MOUT)MOUT.gain.value=LS.fgfMute==='1'?0:V('M');return CH[window.__CH||'sfx']}catch(e){return b}};
const inCh=(k,f)=>function(){const p=window.__CH;window.__CH=k;try{return f.apply(this,arguments)}finally{window.__CH=p}};
if(typeof crowdBed==='function')crowdBed=inCh('crowd',crowdBed);['crowd','cheer','roar','groan'].forEach(n=>{if(sfx[n])sfx[n]=inCh('crowd',sfx[n])});if(sfx.chant)sfx.chant=inCh('crowd',sfx.chant);
window.FGF_INCH=inCh;
function applyVol(){try{const c=typeof AC!=='undefined'&&AC;if(c)OUT(c)}catch(e){}}
// ---- screen ----
const ROWS=[['M','🔊 MASTER'],['S','💥 EFFECTS'],['C','📣 CROWD'],['U','🎵 MUSIC']];
const tog=(y,l,on,f,sub)=>{const bw=Math.min(300,W*0.84),x=W/2-bw/2;bx(x,y,bw,38,l+': '+(on?'ON':'OFF'),f,on,13);if(sub){ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(sub,W/2,y+50,W*0.9)}};
const osc=S3.screen;S3.screen=function(){
 if(state==='a11y'){BTN=[];txt('♿ ACCESSIBILITY',W/2,H*0.07,Math.min(26,W*0.07),GOLD,'#063');const sm=H<640,g=sm?52:60;let y=H*0.11;
  tog(y,'🎨 COLORBLIND COLORS',CBON,()=>FGF_CBSET(!CBON),'Red/green feedback becomes orange/blue');y+=g;
  tog(y,'🧘 REDUCED MOTION',LS.fgfRM==='1',()=>LS.fgfRM=LS.fgfRM==='1'?'0':'1','No shake, slow-mo, fades or confetti');y+=g;
  tog(y,'🔠 BIG TEXT',BIG,()=>FGF_BIGSET(!BIG),'Small labels 15% bigger');y+=g;
  tog(y,'🎙️ ANNOUNCER VOICE',LS.fgfVoice==='1',()=>LS.fgfVoice=LS.fgfVoice==='1'?'0':'1',window.speechSynthesis?'Uses your phone\'s free built-in voice':'Not supported on this device · text callouts only');y+=g;
  tog(y,'💬 ANNOUNCER CALLOUTS',LS.fgfAnn!=='0',()=>LS.fgfAnn=LS.fgfAnn==='0'?'1':'0');y+=sm?44:50;
  ROWS.forEach(([k,l],i)=>{const yy=y+i*(sm?34:40),v=Math.round(V(k)*100);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?11:13)+'px system-ui';ctx.fillText(l,W*0.06,yy+19,W*0.3);
   const bx0=W*0.38,bw=W*0.4;ctx.fillStyle='rgba(255,255,255,.15)';ctx.fillRect(bx0,yy+10,bw,8);ctx.fillStyle=GOLD;ctx.fillRect(bx0,yy+10,bw*v/100,8);btn(bx0,yy,bw,28,()=>{});
   bx(W*0.38-34,yy,30,28,'−',()=>{LS['fgfVol'+k]=Math.max(0,v-10);applyVol()},false,15);bx(W*0.38+bw+4,yy,30,28,'+',()=>{LS['fgfVol'+k]=Math.min(100,v+10);applyVol();if(k!=='U')try{(k==='C'?sfx.cheer:sfx.kick)()}catch(e){}},false,15);ctx.textAlign='right';ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText(v+'%',W*0.97,yy+19)});
  bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='mset',false,14);return true}
 const r=osc.apply(this,arguments);
 if(state==='mset')bx(W/2-Math.min(150,W*0.42),H*0.16+256,Math.min(300,W*0.84),40,'♿ ACCESSIBILITY & VOLUME',()=>state='a11y',false,13);
 return r};
// tap on the slider track sets the value directly
addEventListener('pointerdown',e=>{if(state!=='a11y')return;const sm=H<640,g=sm?52:60,y0=H*0.11+g*4+(sm?44:50),bx0=W*0.38,bw=W*0.4;ROWS.forEach(([k],i)=>{const yy=y0+i*(sm?34:40);if(e.clientX>=bx0&&e.clientX<=bx0+bw&&e.clientY>=yy&&e.clientY<=yy+28){LS['fgfVol'+k]=Math.round((e.clientX-bx0)/bw*10)*10;applyVol()}})},true);
})();
