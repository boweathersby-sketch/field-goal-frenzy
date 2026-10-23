// s110 (Kirk Oct 21): PENALTIES on game kicks (Career, Story game kicks; NEVER Classic per Kirk; never backyard jug / practice).
// All five are called before the snap (dead ball): the kick is waved off and re-kicked from the new spot, so a
// penalty never costs a kick or a life and never changes scoring. Offense: Delay of game (wait too long, -5),
// False start (-5). Defense (always helps): Offsides (+5 closer), Leaping (+15 closer), Too many men (+5 closer).
// Rare: ~1 in 10 kicks overall. Story HS: offensive yardage capped at 31 yds (HS makeable max).
// Also draws the pass-rush meter on Story game kicks (s3 RUSH code).
(function(){
const PEN={dog:['DELAY OF GAME',-5],fs:['FALSE START',-5],off:['DEFENSIVE OFFSIDES',5],leap:['LEAPING',15],tmm:['TOO MANY MEN ON THE FIELD',5]};
const RATE={fs:0.02,off:0.03,leap:0.02,tmm:0.03};// per kick; delay of game only on a long wait
const HS_MAX=31,DOG_T=15;
let FL=null,idle=0,last=performance.now();
const ok=()=>{try{if(state!=='play'||paused||(typeof msg!=='undefined'&&msg)||ball.fly||ball.done)return false;if(mode==='classic')return false;if(mode==='career')return true;return mode==='story'&&!!(window.FGF_SGAME&&FGF_SGAME())}catch(e){return false}};
const dbg=()=>{try{return localStorage.fgfPenDbg||''}catch(e){return ''}};// dev-only force hook (no UI)
function apply(k){const [name,y]=PEN[k];let d=dist-y;const sb=(mode==='story'&&window.FGF_SPEN)?FGF_SPEN():{lo:10,hi:HS_MAX};/* S3: FG 35-45, PAT exempt (Kirk Oct 23) */if(mode==='story'&&y<0)d=Math.min(d,Math.max(dist,sb.hi));d=Math.max(mode==='story'?sb.lo:15,Math.min(mode==='story'?99:80,d));const moved=d-dist;dist=d;
 try{if(mode==='career'&&CG&&CG.kick)CG.kick.d=dist}catch(e){}
 resetBall();try{waitT=0}catch(e){}idle=0;FL={k,name,txt:y<0?(moved>0?moved+' YDS BACK':'NO YARDAGE (MAX)')+' · RE-KICK':(-moved)+' YDS CLOSER · RE-KICK',t:0,def:y>0};window.__lastPen=k;
 try{thump(80,0.8,0.25);vib([40,30,40])}catch(e){}}
window.FGF_PEN_TEST=k=>{if(PEN[k]&&mode!=='classic')apply(k)};// dev hook for headless tests only
// swipe/hold/timing all end in kick(s): roll the pre-snap penalty there
const ok0=kick;kick=function(s){try{if(ok()){const f=dbg();let k=null;if(f&&PEN[f]&&f!=='dog'){k=f;localStorage.removeItem('fgfPenDbg')}else if(!f){let r=Math.random();for(const q in RATE){if(r<RATE[q]){k=q;break}r-=RATE[q]}}
 if(k){const a=s&&s[0],b=s&&s[s.length-1];if(a&&b&&a.y-b.y>=H*0.06){apply(k);return}}}}catch(e){}return ok0.apply(this,arguments)};
const top0=S3.top;S3.top=function(dt){const r=top0.apply(this,arguments);try{const now=performance.now(),rd=Math.min(0.1,(now-last)/1000);last=now;
 if(ok()){idle+=rd;if(idle>=DOG_T||(dbg()==='dog'&&idle>0.5)){if(dbg()==='dog')localStorage.removeItem('fgfPenDbg');apply('dog')}}else idle=0;
 if(mode==='story'&&window.FGF_SGAME&&FGF_SGAME()&&typeof rushMeter==='function')rushMeter();
 if(FL){FL.t+=rd;const t=FL.t;if(t>2.6)FL=null;else{const a=Math.min(1,t*5,(2.6-t)*3);ctx.save();ctx.globalAlpha=a;const y=H*0.42;
  ctx.fillStyle='rgba(255,210,0,0.94)';ctx.fillRect(0,y-34,W,68);ctx.fillStyle='#111';ctx.fillRect(0,y-34,W,4);ctx.fillRect(0,y+30,W,4);
  // yellow flag
  const fx=W*0.1,fy=y-4,sw=Math.sin(t*9)*3;ctx.fillStyle='#fff200';ctx.strokeStyle='#111';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(fx,fy-14);ctx.quadraticCurveTo(fx+12,fy-14+sw,fx+24,fy-12);ctx.lineTo(fx+22,fy+8);ctx.quadraticCurveTo(fx+11,fy+6+sw,fx,fy+8);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#111';ctx.beginPath();ctx.arc(fx+4,fy+12,4,0,7);ctx.fill();
  txt('🚩 '+FL.name,W/2+12,y-4,Math.min(19,W*0.046),'#111','rgba(255,255,255,0.6)');txt((FL.def?'DEFENSE · ':'')+FL.txt,W/2+12,y+20,Math.min(13,W*0.034),'#3a2a00','rgba(255,255,255,0.4)');ctx.restore()}}}catch(e){}return r};
})();
