// s92 (Oct 18 #163, #165, Oct 19 #221, #224, #226): COMFORT & ASSIST card (hub). All free, all off by default.
// 👁️ High-visibility ball (bright outline ring), 🎧 Aim by ear (a soft tone rises as your swipe points closer to straight at the posts),
// 🔊 Stereo wind whoosh (a short whoosh from the side the wind blows toward, before each kick), 🎥 Steady camera (no screen shake),
// 📖 Football glossary in plain language. Nothing here changes scoring or leaderboards.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,ROW,SUB,BS,card,tog,bindTog}=U;
const is=k=>LS[k]==='1';
// 👁️ High-visibility ball
const oDB=drawBall;drawBall=function(){const r=oDB.apply(this,arguments);try{if(is('fgfHiVis')&&ball){const p=SP(ball.x,ball.y,ball.z);if(p){const R=Math.max(7,p.s*0.19*1.55);ctx.save();ctx.lineWidth=Math.max(2,R*0.22);ctx.strokeStyle='rgba(0,0,0,.65)';ctx.beginPath();ctx.arc(p.x,p.y,R+ctx.lineWidth*0.6,0,7);ctx.stroke();ctx.strokeStyle='#d8ff2e';ctx.shadowColor='#d8ff2e';ctx.shadowBlur=8;ctx.beginPath();ctx.arc(p.x,p.y,R,0,7);ctx.stroke();ctx.restore()}}}catch(e){}return r};
// 🎥 Steady camera
(function st(){try{if(is('fgfSteady')&&typeof shake!=='undefined'&&shake>0)shake=0}catch(e){}requestAnimationFrame(st)})();
// 🎧 Aim by ear
let ao=null;
setInterval(()=>{try{const want=is('fgfAimEar')&&state==='play'&&swipe&&swipe.length>2&&ball&&!ball.fly;
 if(want){const c=au();if(!c)return;if(!ao){const o=c.createOscillator(),g=c.createGain();o.type='sine';g.gain.value=0;o.connect(g).connect(OUT(c));o.start();ao={o,g}}
  const a=swipe[0],b=swipe[swipe.length-1],dy=a.y-b.y;if(dy<8)return;const off=Math.min(1,Math.abs((b.x-a.x)/dy)*2.2);
  ao.o.frequency.setTargetAtTime(330+(1-off)*660,c.currentTime,0.04);ao.g.gain.setTargetAtTime(0.07,c.currentTime,0.05)}
 else if(ao){const c=AC;ao.g.gain.setTargetAtTime(0,c.currentTime,0.05);const o=ao;ao=null;setTimeout(()=>{try{o.o.stop()}catch(e){}},300)}}catch(e){}},50);
// 🔊 Stereo wind whoosh
let lastW='';
const oRB=resetBall;resetBall=function(){const r=oRB.apply(this,arguments);try{if(is('fgfStereo')&&wind&&Math.abs(wind.mph)>=3){const key=dist+':'+wind.x;if(key!==lastW){lastW=key;setTimeout(whoosh,350)}}}catch(e){}return r};
function whoosh(){try{const c=au();if(!c||!c.createStereoPanner)return;const len=c.sampleRate*0.9|0,b=c.createBuffer(1,len,c.sampleRate),x=b.getChannelData(0);for(let i=0;i<len;i++)x[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/len);
 const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=650;f.Q.value=1.2;const p=c.createStereoPanner(),side=wind.x>0?1:-1;p.pan.setValueAtTime(-side*0.85,c.currentTime);p.pan.linearRampToValueAtTime(side*0.95,c.currentTime+0.9);
 const g=c.createGain();g.gain.value=Math.min(0.32,0.1+Math.abs(wind.mph)*0.012);s.connect(f).connect(p).connect(g).connect(OUT(c));s.start()}catch(e){}}
window.FGF_WHOOSH=whoosh;
// 📖 Glossary
const GL=[['Field goal','A kick through the uprights and over the crossbar. Worth 3 points in real football.'],['Uprights','The two tall posts. The ball has to pass between them.'],['Crossbar','The flat bar between the posts. The ball has to go over it.'],['Doink','When the ball hits a post or the bar. It can still bounce in!'],['Hash marks','Lines on the field that show where the ball is placed, left, middle or right.'],['PAT','Point After Touchdown: a short kick worth 1 point after a touchdown.'],['Wide left / wide right','The kick missed outside the posts on that side.'],['Short','The kick did not have enough distance to clear the crossbar.'],['Clutch','A big kick at the end of a close game.'],['Overtime','Extra play when the score is tied at the end.'],['Ice the kicker','The other team calls a timeout right before a kick to make the kicker nervous.'],['Yards','Football distance. 1 yard is about 0.9 meters.'],['Hang time','How long the ball stays in the air.'],['Snap and hold','The ball is passed back and a holder sets it up for the kicker.']];
function glossary(){card('📖 '+T_('FOOTBALL GLOSSARY'),GL.map(g=>`<div style="${ROW}"><b style="color:#f2c230">${T_(g[0])}</b><div style="${SUB};margin-top:2px">${T_(g[1])}</div></div>`).join(''),'fgfs92g')}
window.FGF_GLOSSARY=glossary;
function open(){const d=card('♿ '+T_('COMFORT & ASSIST'),`<div style="${SUB};text-align:center;margin-bottom:8px">${T_('All free, all off by default. Nothing here changes your score.')}</div>`+
 tog('fgfHiVis','👁️ High-visibility ball','A bright outline around the ball so it is easy to follow')+
 tog('fgfAimEar','🎧 Aim by ear','A soft tone rises as your swipe points closer to straight at the posts')+
 tog('fgfStereo','🔊 Stereo wind whoosh','Before each kick, a whoosh moves the way the wind blows (use headphones)')+
 tog('fgfSteady','🎥 Steady camera','No screen shake on big kicks and hits')+
 `<button id="gl" style="${BS};display:block;width:100%;margin-top:4px">📖 ${T_('FOOTBALL GLOSSARY')}</button>`,'fgfs92');
 bindTog(d,open);d.querySelector('#gl').onclick=glossary}
window.FGF_COMFORT=open;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{L.push(['♿','COMFORT & ASSIST','High-vis ball · aim by ear · stereo wind · glossary',()=>open(),false])}catch(e){}return L};
})();
