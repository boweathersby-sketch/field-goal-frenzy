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
