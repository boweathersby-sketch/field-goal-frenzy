// s56 (Kirk, Oct 15): Collection Book rows are tappable → "My <category>" view of owned items with preview,
// equipped mark, tap-to-equip, owned/total count, BACK, and an empty state that links to the shop.
(function(){const T_=t=>window.FGF_TR?FGF_TR(t):t;let CAT=null,pg=0;
const items=k=>{const c=SHOP.find(x=>x[0]===k);return c?c[1]:[]},mine=k=>items(k).filter(i=>own.includes(i[0])||i[2]===0);
window.FGF_COLLOPEN=k=>{CAT=k;pg=0;state='cown'};
const osc=S3.screen;S3.screen=function(){
 if(state==='cown'&&CAT){BTN=[];const L=mine(CAT),tot=items(CAT).filter(i=>i[2]>=0||own.includes(i[0])).length;
  txt(T_('MY')+' '+T_(CAT),W/2,H*0.07,Math.min(24,W*0.065),GOLD,'#063');ctx.fillStyle='#cde';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(T_('Owned')+' '+L.length+' / '+tot+' · '+T_('tap EQUIP to use one'),W/2,H*0.07+22,W*0.92);
  const y0=H*0.07+36,y1=H*0.84,rh=50,per=Math.max(1,Math.floor((y1-y0)/rh)),pages=Math.max(1,Math.ceil(L.length/per));if(pg>=pages)pg=0;
  if(!L.length){panel(W*0.08,H*0.3,W*0.84,H*0.26);txt('🛍️',W/2,H*0.37,34,'#fff');ctx.fillStyle='#fff';ctx.font='900 14px system-ui';ctx.textAlign='center';ctx.fillText(T_('Nothing here yet!'),W/2,H*0.43,W*0.78);ctx.font='12px system-ui';ctx.fillStyle='#cde';ctx.fillText(T_('Find something you like in the shop.'),W/2,H*0.46,W*0.78);
   bx(W*0.2,H*0.49,W*0.6,40,'🛒 '+T_('GO TO SHOP'),()=>{const i=SHOP.findIndex(x=>x[0]===CAT);state='shop';if(i>=0)shopTab=i},true,14)}
  L.slice(pg*per,pg*per+per).forEach((it,k)=>{const y=y0+k*rh,id=it[0],sl=slot(id),eqd=eq[sl]===id;ctx.fillStyle='rgba(6,30,16,0.96)';ctx.strokeStyle=eqd?'#7dff6a':GOLD;ctx.lineWidth=eqd?3:2;ctx.beginPath();ctx.roundRect(W*0.04,y,W*0.92,rh-6,12);ctx.fill();ctx.stroke();
   const cx=W*0.04+22,cy=y+(rh-6)/2;try{if(id.startsWith('fg')&&window.FGF_SHOPPREVIEW)FGF_SHOPPREVIEW(id,cx,cy,12);else FGF_ICON(id,cx,cy,11)}catch(e){}
   btn(W*0.04+2,y+2,40,rh-10,()=>{if(CAT==='HORNS'||CAT==='CHANTS'){try{FGF_PLAYH(id)}catch(e){}}else if(window.FGF_TRY)FGF_TRY(id,'shop')});
   ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?12:13)+'px system-ui';ctx.fillText(T_(it[1]),W*0.07+34,y+rh*0.42,W*0.92-W*0.3-56);ctx.font='11px system-ui';ctx.fillStyle=eqd?'#7dff6a':'#bcd';ctx.fillText(eqd?'✔ '+T_('Equipped'):T_('Owned'),W*0.07+34,y+rh*0.72,W*0.5);
   const bw=W*0.27;bx(W*0.94-bw,cy-14,bw,28,eqd?'EQUIPPED':'EQUIP',()=>{eq[sl]=id;SV('fgfEq',eq);toast('✔ '+T_(it[1]))},eqd,12)});
  if(pages>1){const py=H*0.86-8;bx(W*0.04,py,56,28,'◀',()=>pg=(pg+pages-1)%pages,false,13);bx(W*0.96-56,py,56,28,'▶',()=>pg=(pg+1)%pages,false,13);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(T_('Page')+' '+(pg+1)+' / '+pages,W/2,py+18)}
  bx(W/2-80,H*0.93-18,160,40,'◀ BACK',()=>{state='bonus';if(window.FGF_BC)FGF_BC.tab=2},false,14);return true}
 const r=osc.apply(this,arguments);
 try{const BC=window.FGF_BC;if(state==='bonus'&&BC&&BC.tab===2){const B=FGF_BONUSTEST.BOOK(),y0=H*0.115+44,rh=Math.max(30,Math.min(40,(H*0.83-y0-24)/Math.ceil(B.length/2))),cw=W*0.44;
  B.forEach((x,i)=>{const col=i%2,row=i/2|0,xx=W*0.05+col*(cw+W*0.02),y=y0+22+row*rh;ctx.fillStyle='#ffd23f';ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('›',xx+cw*0.5-8,y+(rh-4)*0.45);btn(xx,y,cw*0.48,rh-4,()=>FGF_COLLOPEN(x.k))});
  ctx.fillStyle='#bcd';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText(T_('Tap a category to see and equip what you own'),W/2,y0+22+Math.ceil(B.length/2)*rh+10,W*0.9)}}catch(e){}
 return r};
})();
