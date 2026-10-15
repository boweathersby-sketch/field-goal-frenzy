// s46 (Batch 7, polish): camera shake on doinks/big makes, game-winner slow motion, crowd that swells with your streak (flashbulbs + louder crowd),
// announcer text callouts (+ optional free offline device voice via speechSynthesis, OFF by default), confetti on new records, smooth screen fades.
// Loading tips already exist (index.html). Everything respects Reduced Motion (s47).
(function(){
const RM=()=>LS.fgfRM==='1';window.FGF_RM=RM;
// ---- camera shake ----
const oPost=sfx.post;sfx.post=function(){if(!RM())shake=Math.max(shake,7);return oPost.apply(this,arguments)};
// ---- game-winner slow motion: pressure kicks, last 5s of the drill, last boss kick, final ladder rung, final Career kick ----
const gw=()=>{if(mode==='pressure')return true;const M=window.FGF_MM&&FGF_MM();if(M){if(M.t==='drill')return M.end-performance.now()<5000;if(M.t==='boss')return M.k===4&&M.me===M.op;if(M.t==='ladder')return M.r===7}try{if(mode==='career'&&window.FGF_CGLAST&&FGF_CGLAST())return true}catch(e){}return false};
const oU=update;update=function(dt){let d=dt;try{if(!RM()&&state==='play'&&ball&&ball.fly&&!ball.done&&gw()&&ball.z>dist-12&&ball.z<dist+2&&legendT<=0)d=dt*0.35}catch(e){}const r=oU.call(this,d);if(RM()){shake=0;if(flash>0.4)flash=0.4}return r};
// ---- crowd swells with the streak ----
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(good&&streak>=3){window.__CH='crowd';try{sfx.crowd()}finally{window.__CH=null}if(streak>=6)setTimeout(()=>{try{window.__CH='crowd';sfx.roar()}catch(e){}window.__CH=null},250)}call(good)}catch(e){}return r};
function bulbs(){if(state!=='play'||streak<3||RM())return;const n=Math.min(40,streak*4),base=(typeof HY!=='undefined'?HY:H*0.4);ctx.save();for(let i=0;i<n;i++){if(Math.random()<0.5)continue;const x=Math.random()*W,y=base-H*(0.02+Math.random()*0.09);ctx.fillStyle='rgba(255,255,255,'+(0.5+Math.random()*0.5)+')';ctx.fillRect(x,y,1.6,1.6)}ctx.restore()}
const oP=drawPosts;drawPosts=function(){try{bulbs();drawCall()}catch(e){}return oP.apply(this,arguments)};
// ---- announcer ----
const LINES={good:['Right down the middle!','It is GOOD!','Splits the uprights!','Through the uprights!','He has the leg!','Money!'],long:['From WAY downtown!','What a boot!','That one had a passport!'],streak:['He is on FIRE!','Can anybody stop this kicker?','The crowd is going wild!'],doink:['Off the upright… and IN!','Doink… and good!'],miss:['No good!','Wide… so close.','The wind got that one.','Shanked it!'],gw:['For the win… GOOD!','Ice in the veins!']};
const ES={'Right down the middle!':'¡Justo por el medio!','It is GOOD!':'¡Es BUENA!','Splits the uprights!':'¡Parte los postes!','Through the uprights!':'¡Limpia… entre los postes!','He has the leg!':'¡Qué pierna!','Money!':'¡Dinero!','From WAY downtown!':'¡Desde MUY lejos!','What a boot!':'¡Qué patadón!','That one had a passport!':'¡Esa llevaba pasaporte!','He is on FIRE!':'¡Está ENCENDIDO!','Can anybody stop this kicker?':'¿Alguien puede pararlo?','The crowd is going wild!':'¡El público enloquece!','Off the upright… and IN!':'¡Pega en el poste… y ENTRA!','Doink… and good!':'¡Poste… y buena!','No good!':'¡No es buena!','Wide… so close.':'Desviada… muy cerca.','The wind got that one.':'El viento se la llevó.','Shanked it!':'¡La mordió!','For the win… GOOD!':'Para ganar… ¡BUENA!','Ice in the veins!':'¡Hielo en las venas!'};
Object.assign(window.FGF_ES||{},ES);
let CALL=null;const pick=a=>a[Math.random()*a.length|0];
function call(good){if(LS.fgfAnn==='0'||['tut'].includes(mode))return;const dk=msg&&/Off the upright/.test(msg.s||'');const t=good?(dk?pick(LINES.doink):gw()?pick(LINES.gw):streak>=4&&Math.random()<0.5?pick(LINES.streak):dist>=55?pick(LINES.long):pick(LINES.good)):pick(LINES.miss);CALL={t,t0:performance.now()};
 if(LS.fgfVoice==='1'&&window.speechSynthesis&&LS.fgfMute!=='1'){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(LS.fgfLang==='es'?(ES[t]||t):t);u.lang=LS.fgfLang==='es'?'es-ES':'en-US';u.rate=1.08;u.pitch=0.9;u.volume=Math.min(1,(+(LS.fgfVolM??100))/100);speechSynthesis.speak(u)}catch(e){}}}
window.FGF_ANN=()=>CALL;
function drawCall(){if(!CALL)return;const a=(performance.now()-CALL.t0)/1000;if(a>2){CALL=null;return}ctx.save();ctx.globalAlpha=Math.min(1,(2-a)*3,a*6);ctx.font='italic 900 '+(W<350?13:15)+'px system-ui';ctx.textAlign='center';const y=H*0.3-52;const tw=ctx.measureText(CALL.t).width+22;ctx.fillStyle='rgba(0,0,0,0.55)';ctx.beginPath();ctx.roundRect(W/2-tw/2,y-16,tw,24,12);ctx.fill();ctx.fillStyle='#fff';ctx.fillText('🎙️ '+CALL.t,W/2,y+1,W*0.9);ctx.restore()}
// ---- confetti on new records ----
let PB=0;const oN=newGame;newGame=function(){const r=oN.apply(this,arguments);PB=best;return r};
const oE=S3.onEnd;S3.onEnd=function(){const nb=score>PB&&score>0&&PB>0;const r=oE.apply(this,arguments);try{if(nb){toast('🏆 NEW RECORD! '+score.toLocaleString());if(!RM())for(let i=0;i<160;i++)parts.push({x:Math.random()*W,y:-10-Math.random()*60,vx:(Math.random()-.5)*90,vy:90+Math.random()*160,c:['#ffd23f','#2ecc71','#ff4f6d','#4fd1ff','#fff','#c77dff'][i%6],l:3.5});try{sfx.cheer()}catch(e){}}}catch(e){}return r};
// ---- smooth fades between screens ----
let LST=null,FT=0;function fade(){if(state!==LST){if(LST!==null&&!RM()&&!(LST==='play'&&state==='pause'))FT=performance.now();LST=state}const a=(performance.now()-FT)/180;if(a<1){ctx.save();ctx.fillStyle='rgba(5,10,20,'+(0.6*(1-a))+')';ctx.fillRect(0,0,W,H);ctx.restore()}}
const osc=S3.screen;S3.screen=function(){const r=osc.apply(this,arguments);try{fade()}catch(e){}return r};
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{fade()}catch(e){}return r};
window.FGF_POLISHTEST={call,gw,LINES};
})();
