// s77 (Oct 17, Kirk): TESTER ONLY (?tester=gator87) — unlimited balls in every mode: a miss never costs a ball
// and never ends the run. Normal players are unchanged. Time limits, kick counts and END RUN / pause quit still end a run.
(function(){if(!window.TESTER)return;
const oRes=result;result=function(){const lv=lives;const r=oRes.apply(this,arguments);try{if(lives<lv){lives=lv;prevLives=lv;if(msg&&/left$/.test(msg.s||''))msg.s='🧪 '+(window.FGF_TR?FGF_TR('Tester: unlimited balls'):'Tester: unlimited balls')}}catch(e){}return r};
const oE=endGame;endGame=function(){try{if(state==='play'&&lives<=0&&!(mode==='time'&&timeLeft<=0)){lives=3;prevLives=3;msg=null;newWind();resetBall();return}}catch(e){}return oE.apply(this,arguments)};
setInterval(()=>{try{if(state==='play'&&lives<=0&&!ball.fly){lives=3;prevLives=3}}catch(e){}},250);
})();
