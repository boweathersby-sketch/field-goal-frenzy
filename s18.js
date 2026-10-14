// s18: Create Team Pro gate state
(function(){
const osc=S3.screen;S3.screen=function(){const r=osc.apply(this,arguments);
 if(state==='ct'&&!FGF_PRO()){BTN=[];ctx.fillStyle='rgba(0,0,0,0.62)';ctx.fillRect(0,0,W,H);const pw=W*0.86,px=W*0.07,py=H*0.3,ph=H*0.36;ctx.save();ctx.fillStyle='rgba(4,18,10,0.96)';ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(px,py,pw,ph,18);ctx.fill();ctx.stroke();ctx.restore();
  txt('⭐ PRO FEATURE',W/2,py+44,26,GOLD,'#063');ctx.fillStyle='#fff';ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillText('Create Your Team is part of the',W/2,py+78);ctx.fillText('Pro Bundle: your own name, colours,',W/2,py+98);ctx.fillText('logo and jersey number.',W/2,py+118);
  bx(px+pw*0.1,py+ph-112,pw*0.8,50,'⭐ GET THE PRO BUNDLE',()=>{state='shop';shopTab=SHOP.length;if(window.PKS)PKS.y=0},true,15);bx(px+pw*0.3,py+ph-52,pw*0.4,38,'◀ BACK',()=>state='teams',false,13)}
 return r};
})();
