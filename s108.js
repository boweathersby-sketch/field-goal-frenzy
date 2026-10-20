// s108 (#23, approved by Kirk Oct 20 exactly as preview-23-snow-angel-390.png): snow angel imprint after the first make of a snow game. 🪙 +20 once per game.
(function(){const on=window.FGF_ON;if(!on)return;let done=false;
function show(){const cv=document.createElement('canvas');cv.width=innerWidth;cv.height=innerHeight;cv.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:80;transition:opacity .5s';document.body.appendChild(cv);const x=cv.getContext('2d');
 const cx=innerWidth*0.5,cy=innerHeight*0.74;x.save();x.translate(cx,cy);x.scale(1,0.42);
 const g=x.createRadialGradient(0,0,10,0,0,95);g.addColorStop(0,'rgba(170,195,220,.75)');g.addColorStop(1,'rgba(205,222,240,.55)');x.fillStyle=g;x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=4;
 x.beginPath();x.moveTo(0,-40);x.quadraticCurveTo(-95,-95,-88,-20);x.quadraticCurveTo(-60,10,-22,0);x.lineTo(-58,95);x.quadraticCurveTo(0,120,58,95);x.lineTo(22,0);x.quadraticCurveTo(60,10,88,-20);x.quadraticCurveTo(95,-95,0,-40);x.closePath();x.fill();x.stroke();
 x.beginPath();x.arc(0,-62,20,0,7);x.fill();x.stroke();x.restore();
 x.fillStyle='rgba(8,25,15,.88)';x.strokeStyle='rgba(190,220,245,.7)';x.lineWidth=1.5;x.beginPath();x.roundRect(innerWidth/2-170,innerHeight*0.40-32,340,66,16);x.fill();x.stroke();
 x.font='900 22px system-ui';x.textAlign='center';x.fillStyle='#fff';x.strokeStyle='#000';x.lineWidth=4;x.strokeText('❄️ SNOW ANGEL!',innerWidth/2,innerHeight*0.40);x.fillText('❄️ SNOW ANGEL!',innerWidth/2,innerHeight*0.40);
 x.font='800 13px system-ui';x.fillStyle='#d9e8f5';x.fillText('Your kicker left a snow angel by the hash · 🪙 +20',innerWidth/2,innerHeight*0.40+22,320);
 setTimeout(()=>{cv.style.opacity='0'},2300);setTimeout(()=>cv.remove(),2900)}
on(e=>{try{if(e.t==='start'){done=false;return}
 if(e.t!=='make'||done||e.wx!=='snow'||(e.d||0)>=80||/^(tut|range)/.test(String(e.m||'')))return;done=true;
 setTimeout(()=>{show();try{addCoins(20)}catch(x){}},450)}catch(x){}});
window.FGF_SNOWANGEL=show})();
