// s39: WATCH ADS ONLY shop tab. Exclusive cosmetics unlocked only by rewarded ads (never coins, never boxes).
// Progress counts ONLY when the ad adapter resolves true (AdMob onUserEarnedReward). Behind the ADS flag; locked while off.
(function(){const C=window.FGF_CAT,G=window.FGF_GEARC;if(!C||!G)return;
 const I=[];const A=(id,nm,n,kind)=>I.push([id,nm,n,kind]);
 [['Prism Trail',['#ff00cc','#00e5ff'],3],['Aurora Trail',['#00ff9d','#7a00ff'],3],['Solar Wind',['#fff36b','#ff5a00'],4],['Midnight Comet',['#0b0033','#9ad5ff'],4],['Ruby Rush',['#ff0040','#ffb3c6'],5],['Emerald Jet',['#00c853','#b9f6ca'],5],['Ad Star Trail',['#ffd23f','#ffffff'],6],['Phantom Streak',['#e0e0e0','#5b2a86'],8]]
  .forEach((t,i)=>{const id='tad'+i;C.TRX[id]=t[1];A(id,t[0],t[2],'TRAIL')});
 [['Prism Visor',['#ff00cc','#00e5ff','#fff36b'],1,'mirror',3],['Aurora Visor',['#00ff9d','#7a00ff'],1,'',4],['Obsidian Mirror',['#000','#444','#000'],0,'chrome',5],['Royal Ad Visor',['#5b2a86','#f2c230'],1,'wide',6],['Starlight Visor',['#ffffff','#9ad5ff','#ffffff'],1,'chrome',8]]
  .forEach((v,i)=>{const id='vad'+i;G.VIS[id]=[v[1],v[2],v[3]];A(id,v[0],v[4],'VISOR')});
 [['Prism Cleats','#ff00cc',1,3],['Aurora Cleats','#00ff9d',1,4],['Obsidian Cleats','#111111',0,4],['Starlight Cleats','#e8f4ff',1,6]].forEach((c,i)=>{const id='cad'+i;G.CLT[id]=[c[1],c[2]];A(id,c[0],c[3],'CLEATS')});
 [['Prism Gloves','#00e5ff',1,3],['Aurora Gloves','#7a00ff',1,4],['Obsidian Gloves','#111111',0,4],['Starlight Gloves','#ffffff',1,6]].forEach((c,i)=>{const id='gad'+i;G.GLV[id]=[c[1],c[2]];A(id,c[0],c[3],'GLOVES')});
 [['Prism Flag',{stripes:['#ff00cc','#00e5ff']},3],['Aurora Flag',{check:['#00ff9d','#7a00ff']},3],['Starfield Flag',{stars:1},4],['Inferno Flag',{flames:1},5],['Storm Flag',{bolt:1},5],['Obsidian Flag',{solid:'#0a0a0a'},3]].forEach((f,i)=>{const id='fgad'+i;C.FLX[id]=f[1];A(id,f[0],f[2],'FLAG')});
 window.FGF_ADITEMS=I;SHOP.push(['AD ITEMS',[]]);
 const PROG=()=>J('fgfAdProg',{}),CAPD=10;let busy=false,pg=0;
 const today=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
 function watch(it){if(busy)return;const on=window.FGF_ADS_ON&&FGF_ADS_ON();if(!on){toast('Ad items unlock in the Google Play app');return}
  const D=J('fgfAdDay',{d:'',n:0});if(D.d!==today()){D.d=today();D.n=0}if(D.n>=CAPD){toast('Daily ad limit reached · come back tomorrow');return}
  busy=true;window.FGF_ADPLAYING=1;let p;try{window.FGF_ADPAID_RESET&&FGF_ADPAID_RESET();p=window.FGF_ADAPTER().rewarded()}catch(e){p=Promise.resolve(false)}
  p.then(ok=>{busy=false;window.FGF_ADPLAYING=0;if(ok!==true){toast('Watch the full video to get your reward');return}
   D.n++;SV('fgfAdDay',D);const m=window.FGF_ADMULT?FGF_ADMULT():1,stp=m>=2?2:1;const P=PROG();P[it[0]]=Math.min(it[2],(P[it[0]]||0)+stp);SV('fgfAdProg',P);
   if(P[it[0]]>=it[2]){if(!own.includes(it[0])){own.push(it[0]);SV('fgfOwn',own)}toast('📺 '+it[1]+' unlocked!');sfx.cheer()}else toast('📺 '+P[it[0]]+' / '+it[2]+' ads watched')}).catch(()=>{busy=false;window.FGF_ADPLAYING=0;toast('Watch the full video to get your reward')})}
 window.FGF_ADROWS=function(){const ra=window.FGF_ROWSAREA?FGF_ROWSAREA():{y0:H*0.3,y1:H*0.8};const y0=ra.y0,y1=ra.y1,on=window.FGF_ADS_ON&&FGF_ADS_ON(),rh=52;
  ctx.fillStyle='rgba(4,18,10,0.97)';ctx.fillRect(W*0.03,y0-4,W*0.94,y1-y0+40);ctx.fillStyle=on?'#bcd':'#ffd27a';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText(on?'📺 Watch ads to unlock · coins can\'t buy these':'📺 WATCH-ADS-ONLY items · Google Play app',W/2,y0+12,W*0.9);
  const per=Math.max(1,Math.floor((y1-y0-22)/rh)),pages=Math.ceil(I.length/per);if(pg>=pages)pg=0;const P=PROG();
  I.slice(pg*per,pg*per+per).forEach((it,k)=>{const y=y0+22+k*rh,[id,nm,n,kind]=it,ow=own.includes(id),sl=slot(id),eqd=eq[sl]===id;ctx.fillStyle='rgba(6,30,16,0.98)';ctx.strokeStyle=on?GOLD:'#556';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(W*0.04,y,W*0.92,rh-6,12);ctx.fill();ctx.stroke();
   const cx=W*0.04+22,cy=y+(rh-6)/2;ctx.save();if(!on)ctx.globalAlpha=0.6;try{if(id.startsWith('fg'))FGF_SHOPPREVIEW?FGF_SHOPPREVIEW(id,cx,cy,12):0;else FGF_ICON(id,cx,cy,11)}catch(e){}ctx.restore();btn(W*0.04+4,y+2,36,rh-10,()=>{if(window.FGF_TRY)FGF_TRY(id,'shop')});
   ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?12:14)+'px system-ui';ctx.fillText(nm,W*0.07+34,y+rh*0.4,W*0.92-W*0.3-56);ctx.font='11px system-ui';ctx.fillStyle='#bcd';ctx.fillText(kind+' · '+(ow?'Unlocked':'📺 '+Math.min(n,P[id]||0)+'/'+n+' ads'),W*0.07+34,y+rh*0.68,W*0.92-W*0.3-56);
   const bw=W*0.3;if(ow)bx(W*0.92-bw,cy-15,bw,30,eqd?'EQUIPPED':'EQUIP',()=>{eq[sl]=id;SV('fgfEq',eq)},eqd,12);else if(on)bx(W*0.92-bw,cy-15,bw,30,'▶ WATCH AD',()=>watch(it),true,11);else bx(W*0.92-bw,cy-15,bw,30,'🔒 APP',()=>toast('Ad items unlock in the Google Play app'),false,11)});
  const py=H*0.86-30;if(pages>1){bx(W*0.04,py,56,28,'◀',()=>pg=(pg+pages-1)%pages,false,13);bx(W*0.96-56,py,56,28,'▶',()=>pg=(pg+1)%pages,false,13);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Page '+(pg+1)+' / '+pages,W/2,py+18)}};
 window.FGF_ADITEM_TEST={watch};
})();
