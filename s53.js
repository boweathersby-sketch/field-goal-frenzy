// s53 (Batch 10c, polish): What's New card, tips on the game-over screen, stretch-break reminder, tester badge.
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t;
const WN='b10',NEWS=['🎮 New KICK CONTROL styles: Swipe, Aim + Hold, Timing Meter (Settings → More Settings → Controls)','🎚️ Swipe sensitivity and Mirror swipe','💡 Tips after a miss + 🏆 New Best banner','♿ More Accessibility: reduce flashing, high contrast, dyslexia-friendly font, wind arrows, wind haptics, battery saver'];
function whatsNew(){if(document.getElementById('fgfwn'))return;const d=document.createElement('div');d.id='fgfwn';d.style.cssText='position:fixed;inset:0;background:rgba(2,10,6,.88);z-index:65;display:flex;align-items:center;justify-content:center;font-family:system-ui';
 d.innerHTML='<div style="background:#0b2a17;border:2px solid #ffd23f;border-radius:16px;padding:16px;width:min(330px,90vw);color:#fff"><div style="color:#ffd23f;font-weight:900;font-size:20px;text-align:center;margin-bottom:10px">'+T_("✨ WHAT'S NEW")+'</div>'+NEWS.map(n=>'<div style="font-size:13px;margin:8px 0;line-height:1.35">'+T_(n)+'</div>').join('')+'<button style="margin-top:10px;width:100%;padding:12px;border-radius:12px;border:0;background:#ffd23f;color:#063;font-weight:900;font-size:15px">'+T_('GOT IT')+'</button></div>';
 d.querySelector('button').onclick=()=>{LS.fgfWN=WN;d.remove()};document.body.appendChild(d)}
window.FGF_WHATSNEW=whatsNew;
setInterval(()=>{if(state==='title'&&LS.fgfWN!==WN&&+(LS.fgfRounds||0)>0&&LS.fgfLang&&!document.getElementById('lngm'))whatsNew()},1500);
const TIPS=['Tip: wind arrows show where the ball will drift · aim the other way','Tip: kick before the rush gets to you','Tip: try Aim + Hold or Timing Meter in Settings → Controls','Tip: long kicks need a fast, full swipe','Tip: perfect kicks earn bonus coins','Tip: Mirror swipe flips left and right if that feels better'];
let tip=0,lastS='';
const osc=S3.screen;S3.screen=function(){const r=osc.apply(this,arguments);try{
 if(state!==lastS){if(state==='over')tip=(tip+1)%TIPS.length;lastS=state}
 if(state==='over'){ctx.save();ctx.fillStyle='#bfe6ff';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('💡 '+T_(TIPS[tip]),W/2,H*0.92,W*0.92);ctx.restore()}
}catch(e){}return r};
// stretch break: after 20 minutes of play this session, one gentle reminder
let played=0,told=false;setInterval(()=>{if(state==='play'&&!paused)played+=5;if(!told&&played>=1200&&state==='play'&&!ball.fly){told=true;FGF_POP(T_('🧘 Nice session! Time for a quick stretch?'),'#bfe6ff',0.3)}},5000);
})();
// highlight the item you just previewed when you come back to the shop (3 s pulse)
(function(){const oI=window.FGF_ICON;if(!oI)return;window.FGF_ICON=FGF_ICON=function(id,cx,cy,s){const r=oI.apply(this,arguments);try{const h=window.FGF_HL;if(h&&h.id===id){const a=(performance.now()-h.t)/1000;if(a<3.5){ctx.save();ctx.strokeStyle='#ffd23f';ctx.lineWidth=3;ctx.globalAlpha=0.55+0.45*Math.sin(a*9);ctx.beginPath();ctx.arc(cx,cy,(s||11)*2.1,0,7);ctx.stroke();ctx.restore()}else window.FGF_HL=null}}catch(e){}return r}})();
// free "No Horn" / "No Chant": first card in HORNS / CHANTS, owned by everyone, equipping it silences that sound
(function(){try{const add=(cat,id,name)=>{const c=SHOP.find(x=>x[0]===cat);if(!c||c[1].some(i=>i[0]===id))return;const it=[id,name,0];c[1].unshift(it);ITEM[id]=it;if(!own.includes(id)){own.push(id);SV('fgfOwn',own)}};
 add('HORNS','hnNone','No Horn');add('CHANTS','zcNone','No Chant');
 const oP=window.FGF_PLAYH;if(oP)window.FGF_PLAYH=FGF_PLAYH=function(id){if(id==='hnNone'||id==='zcNone'){toast((window.FGF_TR?FGF_TR('🔇 Silent'):'🔇 Silent'));return}return oP.apply(this,arguments)};
 const oI=window.FGF_ICON;if(oI)window.FGF_ICON=FGF_ICON=function(id,cx,cy,s){if(id==='hnNone'||id==='zcNone'){ctx.save();ctx.font=Math.round((s||11)*1.9)+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🔇',cx,cy);ctx.restore();return}return oI.apply(this,arguments)};
}catch(e){}})();
