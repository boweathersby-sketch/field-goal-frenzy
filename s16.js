// s16: new-player first-run flow (title + PLAY -> tutorial -> Classic -> team pick), first-kick power pulse counter
(function(){
const ok=kick;kick=function(){const r=ok.apply(this,arguments);if((mode!=='tut'&&mode!=='range'))LS.fgfKN=(+LS.fgfKN||0)+1;return r};
if(team<0&&!LS.fgfTut){state='fstart'}
let prev=state;
setInterval(()=>{const f=LS.fgfFirst;
 if(f==='1'&&state==='title'&&LS.fgfTut){LS.fgfFirst='2';newGame('classic')}
 else if(f==='2'&&prev==='over'&&state!=='over'&&state!=='initials'){LS.fgfFirst='3';state='teams';toast('🏟️ Nice round! Now pick your team')}
 prev=state},100);
const osc=S3.screen;S3.screen=function(){
 if(state==='fstart'){BTN=[];ctx.fillStyle='rgba(2,10,6,0.55)';ctx.fillRect(0,0,W,H);txt('FIELD GOAL',W/2,H*0.25,Math.min(52,W*0.13),GOLD,'#063');txt('FRENZY',W/2,H*0.25+Math.min(60,W*0.155),Math.min(64,W*0.165),'#fff',GREEN);
  ctx.fillStyle='#cfe';ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillText('Swipe to kick. How far can you go?',W/2,H*0.43);
  const pu=1+0.03*Math.sin(performance.now()/260),bw=W*0.62*pu,bh=74*pu;bx(W/2-bw/2,H*0.56-bh/2,bw,bh,'▶ PLAY',()=>{applyTeam(0);LS.fgfHow='1';LS.fgfFirst='1';S4.tut()},true,30);
  ctx.fillStyle='#9ab';ctx.font='12px system-ui';ctx.fillText('Quick tutorial kick, then Classic. Pick your team after.',W/2,H*0.66);return true}
 return osc.apply(this,arguments)};
})();
