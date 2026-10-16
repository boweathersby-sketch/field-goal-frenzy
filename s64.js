// s64 (Kirk, Oct 15): CHAOS mode — about 1 in 3 kicks the goalposts start moving (same sway as Moving Posts),
// stacking with whatever weather Chaos rolled, Hurricane included. Can happen back to back.
(function(){
window.__CHMOV=false;let shown=0;
const oW=newWind;newWind=function(){const r=oW.apply(this,arguments);try{const was=window.__CHMOV;window.__CHMOV=mode==='chaos'&&Math.random()<0.34;if(window.__CHMOV){shown=performance.now();try{sfx.whistle()}catch(e){}}if(!window.__CHMOV&&was)window.__POX=0}catch(e){}return r};
const oNG=newGame;newGame=function(){window.__CHMOV=false;window.__POX=0;return oNG.apply(this,arguments)};
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(state==='play'&&mode==='chaos'&&window.__CHMOV){const t=(performance.now()-shown)/1000;ctx.save();ctx.textAlign='center';
 if(t<1.8&&!ball.fly){const sc=Math.min(1,t*5)*(1+0.04*Math.sin(t*14));ctx.translate(W/2,H*0.36);ctx.scale(sc,sc);txt('↔️ POSTS MOVING!',0,0,Math.min(30,W*0.075),'#7fffd4','#063')}
 else{ctx.font='900 11px system-ui';ctx.fillStyle='#7fffd4';ctx.fillText('↔️ POSTS MOVING',W/2,H*0.19)}ctx.restore()}}catch(e){}return r};
window.FGF_CHMOV=()=>window.__CHMOV;
})();
