// ===== Stage 11: Remove Ads plans (Shop → PACKS). Pro Bundle unchanged. =====
'use strict';
const SUBTXT='Renews automatically. Cancel anytime in Google Play.';
const NOADS=[
 {id:'noads_monthly',price:'$0.99/mo',coins:0,name:'Remove Ads · Monthly',desc:'No ads while subscribed · '+SUBTXT,icon:'🚫 ',sub:'P1M'},
 {id:'noads_yearly',price:'$4.99/yr',coins:0,name:'Remove Ads · Yearly',desc:'No ads for a year · '+SUBTXT,icon:'🚫 ',tag:'SAVE 58%',sub:'P1Y'},
 {id:'noads_lifetime',price:'$9.99',coins:0,name:'Remove Ads · Forever',desc:'One-time purchase · no ads forever',icon:'🚫 '}];
{const i=PACKS.findIndex(p=>p.id==='pro_bundle');PACKS.splice(i+1,0,...NOADS)}
if(!window.FGF_APP)NOADS.forEach(p=>p.desc+=' · Coming soon on Google Play');
// Play Console products to create (the app build reads this list)
window.FGF_PLAY_PRODUCTS={subscriptions:[{id:'noads_monthly',period:'P1M',price:'0.99 USD'},{id:'noads_yearly',period:'P1Y',price:'4.99 USD'}],
 inapp:PACKS.filter(p=>!p.sub&&p.id!=='tester_ads').map(p=>({id:p.id,price:p.price.replace('$','')+' USD'}))};
// entitlement: any active plan or the Pro Bundle hides ads; tester can force ads off
window.FGF_NOADS=function(){if(LS.fgfPro==='1'||LS.fgfNoAdsLife==='1')return true;const e=+(LS.fgfNoAdsExp||0);if(e>Date.now())return true;return !!(window.TESTER&&LS.fgfTestNoAds==='1')};
// store hooks: the app wrapper calls FGF_BILLING.onPurchased(id) after a verified purchase and
// FGF_BILLING.onSubscription(id, expiryMs) whenever Play reports the current subscription state (expiry 0 = lapsed)
{const oP=BILLING.onPurchased.bind(BILLING);BILLING.onPurchased=function(id){if(id==='noads_lifetime'){LS.fgfNoAdsLife='1';toast('✔ Ads removed forever');return}
  if(id==='noads_monthly'||id==='noads_yearly'){const d=id==='noads_monthly'?31:366;LS.fgfNoAdsExp=String(Date.now()+d*864e5);toast('✔ Ads removed');return}oP(id)};
 BILLING.onSubscription=function(id,exp){LS.fgfNoAdsExp=String(+exp||0)}}
// tester toggle row (web tester mode only)
if(window.TESTER){PACKS.push({id:'tester_ads',price:'',coins:0,name:'Tester: Ads',desc:'Toggle ads off for testing (tester mode only)',icon:'🧪 '});
 const tp=PACKS[PACKS.length-1];Object.defineProperty(tp,'price',{get:()=>LS.fgfTestNoAds==='1'?'ADS OFF':'ADS ON'})}
{const ob=buyPack;buyPack=function(p){if(p.id==='tester_ads'){LS.fgfTestNoAds=LS.fgfTestNoAds==='1'?'0':'1';toast(LS.fgfTestNoAds==='1'?'🧪 Ads OFF (tester)':'🧪 Ads ON (tester)');return}
 if(p.sub||p.id==='noads_lifetime'){if(window.FGF_NOADS()&&!window.TESTER){toast('Ads are already off');return}}return ob(p)}}
// ===== Pro Bundle extras (cosmetic / bonus only) =====
window.FGF_PRO=()=>LS.fgfPro==='1'||!!(window.TESTER&&LS.fgfTestPro==='1');
// old Pro owners keep everything and get the new extras (+7,500 to match the new 10,000 coins), once
if(LS.fgfPro==='1'&&!LS.fgfPro2){LS.fgfPro2='1';addCoins(5000);toast('⭐ Pro upgraded: +5,000 coins & new Pro extras')}
// Pro uprights
UPR.push(['pro_bg','⭐ Pro Black & Gold','PRO']);
function proSync(){const has=UPO.includes('pro_bg');if(FGF_PRO()&&!has){UPO.push('pro_bg');SV('fgfUpO',UPO)}else if(!FGF_PRO()&&has&&!TESTER){UPO.splice(UPO.indexOf('pro_bg'),1);SV('fgfUpO',UPO);if(UPE==='pro_bg'){UPE='classic';LS.fgfUp='classic'}}}
proSync();
{const ob5=buy5;buy5=function(id,pr,ok){if(id==='up_pro_bg'){if(FGF_PRO())ok();else toast('⭐ Pro Bundle only');return}return ob5(id,pr,ok)}}
// double daily login coins
{const oc=lsClaim;lsClaim=function(){const d=lsPending();oc();if(d&&FGF_PRO()){const r=LSR[d-1];addCoins(r);toast('⭐ PRO 2× login  🪙 +'+r)}}}
// Pro gold kicker look (gold helmet + cleats + PRO patch), toggled in My Kicker
const GK={};
function goldify(src,row){const k=row+'_'+(src.__gid||(src.__gid=Math.random()));if(GK[k])return GK[k];const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d');x.drawImage(src,0,0);
 x.save();x.globalCompositeOperation='color';x.fillStyle='#d4a017';
 for(let f=0;f<4;f++){const m=KMETA[row][f];x.beginPath();x.arc(m[4],m[5]+20,26,0,7);x.fill();x.fillRect(f*203,278,203,22)}x.restore();
 x.save();x.globalCompositeOperation='source-atop';x.fillStyle='rgba(255,236,150,0.18)';for(let f=0;f<4;f++){const m=KMETA[row][f];x.beginPath();x.arc(m[4]-6,m[5]+12,12,0,7);x.fill()}x.restore();
 for(let f=0;f<4;f++){const m=KMETA[row][f],px=m[0]-m[2]*0.9,py=m[1]-m[3]*0.55;x.fillStyle='#f2c230';x.strokeStyle='#3a2a00';x.lineWidth=1.5;x.beginPath();x.arc(px,py,8,0,7);x.fill();x.stroke();x.fillStyle='#000';x.font='900 6px system-ui';x.textAlign='center';x.fillText('PRO',px,py+2)}
 return GK[k]=c}
{const ok=S5.kimg;S5.kimg=function(ti,p2){const s=ok(ti,p2);if(p2||!FGF_PRO()||LS.fgfGoldLook!=='1'||(MK.on&&MK.masc>=0)||s._masc)return s;return goldify(s,MK.on?MK.base:ti)}}
{const od=drawMK;drawMK=function(){od();const ph=Math.min(H*0.44,W*1.05),pw=Math.min(W*0.9,ph*0.62),x0=W/2-pw/2+8,y0=H*0.075+8,on=LS.fgfGoldLook==='1';
 bx(x0,y0,Math.min(124,pw*0.46),26,FGF_PRO()?(on?'⭐ GOLD LOOK: ON':'⭐ GOLD LOOK: OFF'):'🔒 PRO GOLD LOOK',()=>{if(!FGF_PRO()){toast('⭐ Pro Bundle only');return}LS.fgfGoldLook=on?'0':'1'},FGF_PRO()&&on,10)}}
// tester: unlock Pro
if(window.TESTER){PACKS.push({id:'tester_pro',price:'',coins:0,name:'Tester: Pro',desc:'Unlock Pro extras for testing (tester mode only)',icon:'🧪 '});const tp=PACKS[PACKS.length-1];Object.defineProperty(tp,'price',{get:()=>LS.fgfTestPro==='1'?'PRO ON':'PRO OFF'})}
{const ob=buyPack;buyPack=function(p){if(p.id==='tester_pro'){LS.fgfTestPro=LS.fgfTestPro==='1'?'0':'1';proSync();toast(LS.fgfTestPro==='1'?'🧪 Pro ON (tester)':'🧪 Pro OFF (tester)');return}return ob(p)}}
// mascot kicker in the My Kicker preview uses the same sheet as in game (mySheet -> mascSheet)
