// s27: Horse distance setter + Pass & Play picker; Legend Challenge coin retry (escalating, daily reset)
(function(){
const DMIN=20,DMAX=65;let HB=[];
const hc=()=>{const c=window.FGF_CH&&FGF_CH();return c&&c.type==='horse'&&mode==='horse'?c:null};
const setterOn=()=>{const c=hc();return !!(c&&state==='play'&&!paused&&c.ph==='shoot'&&c.pick&&!ball.fly&&!(kickT>0))};
function setDist(d){d=Math.max(DMIN,Math.min(DMAX,d));if(d===dist)return;dist=d;resetBall();lives=99;try{sfx.click()}catch(e){}}
function drawSetter(){HB=[];if(!setterOn())return;const c=hc(),bw=Math.min(54,W*0.13),bh=46,gap=6,mid=Math.min(132,W*0.32),tot=bw*4+mid+gap*4,x0=W/2-tot/2,y=Math.max(96,H*0.17);
 ctx.save();ctx.fillStyle='rgba(0,0,0,0.55)';ctx.beginPath();ctx.roundRect(x0-8,y-26,tot+16,bh+34,14);ctx.fill();ctx.fillStyle=GOLD;ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText((c.p2?'P'+c.sh+' · ':'')+'SET YOUR SHOT · then kick',W/2,y-9);
 const B=[['−5',-5],['−1',-1],[null,0],['+1',1],['+5',5]];let x=x0;B.forEach(b=>{const w=b[0]?bw:mid;if(b[0]){ctx.fillStyle='#10301a';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,bh,10);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.font='900 18px system-ui';ctx.fillText(b[0],x+w/2,y+bh/2+6);HB.push({x,y,w,h:bh,d:b[1]})}else{ctx.fillStyle='#fff';ctx.font='900 24px system-ui';ctx.fillText(dist+' YDS',x+w/2,y+bh/2+8)}x+=w+gap});ctx.restore()}
addEventListener('pointerdown',e=>{if(!setterOn())return;const x=e.clientX,y=e.clientY;const b=HB.find(b=>x>=b.x-4&&x<=b.x+b.w+4&&y>=b.y-6&&y<=b.y+b.h+6);if(b){e.stopImmediatePropagation();e.preventDefault();setDist(dist+b.d)}},true);
const ok=kick;kick=function(){const c=hc();const r=ok.apply(this,arguments);if(c&&c.ph==='shoot'&&ball.fly)c.pick=0;return r};
const odk=drawKicker;drawKicker=function(){const r=odk.apply(this,arguments);try{drawSetter();const c=hc();if(c&&state==='play'&&c.ph==='match'&&!ball.fly){ctx.save();ctx.fillStyle='rgba(0,0,0,0.55)';ctx.beginPath();ctx.roundRect(W/2-120,Math.max(96,H*0.17)-6,240,34,12);ctx.fill();ctx.fillStyle='#7fe8ff';ctx.font='900 14px system-ui';ctx.textAlign='center';ctx.fillText((c.p2?'P'+(c.sh===1?2:1)+': ':'')+'MATCH IT · '+dist+' YDS',W/2,Math.max(96,H*0.17)+16);ctx.restore()}}catch(e){}return r};
// ---- mode picker ----
const osc=S3.screen;S3.screen=function(){if(state==='hsel'){BTN=[];txt('🐴 K-I-C-K',W/2,H*0.16,Math.min(34,W*0.09),GOLD,'#063');ctx.fillStyle='#cde';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText('Set a shot. Miss the match and you get a letter.',W/2,H*0.16+28,W*0.9);ctx.fillText('Spell K-I-C-K and you lose.',W/2,H*0.16+46);
  const bw=Math.min(300,W*0.84),x=W/2-bw/2;bx(x,H*0.36,bw,64,'🤖 VS COMPUTER  ·  🪙 400 prize',()=>FGF_HORSE1(false),true,15);bx(x,H*0.36+78,bw,64,'👥 PASS & PLAY  ·  2 players',()=>FGF_HORSE1(true),false,15);
  bx(W/2-90,H*0.93-18,180,38,'◀ BACK',()=>state='hub');return true}
 const r=osc.apply(this,arguments);
 if(state==='chres'){const c=window.FGF_CH&&FGF_CH();if(c&&c.type==='trick'&&c.over&&!c.cont){const bw=W*0.7,y=H*0.52,pr=300;if(window.TESTER||coins>=pr)bx(W/2-bw/2,y,bw,40,'🏈 CONTINUE · +3 balls · 🪙 '+pr,()=>{if(!window.TESTER)addCoins(-pr);c.cont=1;c.over=0;lives=3;prevLives=3;state='play';msg=null;newWind();resetBall();toast('🎯 +3 balls · keep going!')},true,13);else{ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('Continue (+3 balls) costs 🪙 '+pr,W/2,y+20)}}}
 // ---- Legend coin retry ----
 if(state==='chres'){const c=window.FGF_CH&&FGF_CH();if(c&&c.type==='legendc'&&!c.made){const L=J('fgfLCR',{d:'',n:0});if(L.d!==FGF_DK()){L.d=FGF_DK();L.n=0}const pr=Math.min(1600,200*Math.pow(2,L.n)),adOn=window.FGF_ADS_ON&&FGF_ADS_ON(),y=H*0.45+(adOn?52:0),bw=W*0.7;
  if(window.TESTER||coins>=pr)bx(W/2-bw/2,y,bw,42,'🔁 TRY AGAIN · 🪙 '+pr.toLocaleString(),()=>{if(!window.TESTER)addCoins(-pr);L.n++;SV('fgfLCR',L);LS.fgfLC='';FGF_LEGENDC()},true,14);
  else{ctx.fillStyle='#ffb36b';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('Try again costs 🪙 '+pr.toLocaleString()+' · you have 🪙 '+coins.toLocaleString(),W/2,y+12,W*0.9);bx(W/2-bw/2,y+20,bw,36,'🛒 Get coins in the Shop',()=>{state='shop';shopTab=SHOP.length},false,13)}
  ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Retry price doubles each try today (200 → 400 → 800 → 1,600 max)',W/2,H*0.62+62,W*0.92)}}
 return r};
})();
