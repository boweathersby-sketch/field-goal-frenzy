// s59 (Kirk, Oct 15): more real-money packs. ALL behind FGF_BILLING.available (false until Kirk sets up Play Billing):
// the web shows "Google Play app only" and nothing can be charged. Never charge twice: one-time products show OWNED,
// bundles pay coins for any piece you already own, subscriptions can't be bought while active.
(function(){const B=window.FGF_BILLING;if(!B||typeof PACKS==='undefined')return;
const own_=id=>own.includes(id),giveItem=id=>{if(!ITEM[id])return 0;if(own_(id)){const v=Math.max(200,ITEM[id][2]||300);addCoins(v);return v}own.push(id);SV('fgfOwn',own);return 0};
const day=()=>{const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()};
const BUN={fire:{n:'🔥 Fire Bundle',items:['cT14','gK10','vS14','t6'],c:2000,p:'$3.99'},ice:{n:'❄️ Ice Bundle',items:['cT10','gK8','t15','blu9'],c:2000,p:'$3.99'},galaxy:{n:'🌌 Galaxy Bundle',items:['cT15','gK15','blu16','tx53'],c:3000,p:'$4.99'},gold:{n:'🏆 Gold Bundle',items:['cT17','gK9','vS12','bl9'],c:3000,p:'$4.99'}};
const name=id=>ITEM[id]?ITEM[id][1]:id,bOwned=k=>BUN[k].items.every(own_);
// weekly limited-time deal: one bundle at 30% off, same for everyone, rotates every Monday
const wk=()=>{const d=new Date(),m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7));return m};
const dealKey=()=>{const k=Object.keys(BUN),m=wk();return k[(Math.floor(m.getTime()/6048e5))%k.length]};
const dealLeft=()=>{const e=new Date(wk().getTime()+7*864e5),s=Math.max(0,(e-new Date())/1000|0);return Math.floor(s/86400)+'d '+Math.floor(s%86400/3600)+'h'};
const L=[
 {id:'coins_45000',price:'$19.99',coins:45000,name:'45,000 Coins',tag:'+125% BONUS'},
 {id:'coins_125000',price:'$49.99',coins:125000,name:'125,000 Coins',tag:'+150% BONUS'},
 ...Object.keys(BUN).map(k=>({id:'bundle_'+k,price:BUN[k].p,coins:0,name:BUN[k].n.slice(2).trim(),icon:BUN[k].n.slice(0,2)+' ',desc:BUN[k].items.map(name).join(' · ')+' + '+BUN[k].c.toLocaleString()+' coins · pieces you own pay coins instead',bun:k})),
 {id:'deal_week',price:'',coins:0,name:'Deal of the Week',icon:'⏰ ',tag:'30% OFF',deal:1},
 {id:'vip_monthly',price:'$4.99/mo',coins:0,name:'VIP Club',icon:'👑 ',tag:'SUBSCRIPTION',desc:'500 coins every day you play · no ads · VIP name plate + VIP tee · renews monthly, cancel anytime in Google Play',sub:'P1M'},
 {id:'spass_gold',price:'$4.99',coins:0,name:'Season Pass Gold',icon:'🎟️ ',tag:'THIS MONTH',desc:'Gold track for this month: every Season Pass tier you claim pays its coins again, plus Gold Tee (tier 10), Gold Shockwave (tier 20) and Gold Water Cooler (tier 30)'},
 {id:'coin_doubler',price:'$2.99',coins:0,name:'Coin Doubler',icon:'✖️2 ',tag:'ONE-TIME',desc:'Double the coins you earn from made kicks, forever',once:'fgfDoubler'},
 {id:'gift_3000',price:'$2.99',coins:0,name:'Gift 3,000 Coins',icon:'💝 ',desc:'Buy coins for a friend: you get a gift code to share, they redeem it in Bonus Center'},
 {id:'gift_10000',price:'$7.99',coins:0,name:'Gift 10,000 Coins',icon:'💝 ',desc:'Buy coins for a friend: you get a gift code to share, they redeem it in Bonus Center'}];
const web=!window.FGF_APP;
L.forEach(p=>{if(web)p.desc=(p.desc||'Coins for gear, teams & more')+' · Google Play app only.';
 if(p.deal){Object.defineProperty(p,'desc',{get:()=>{const k=dealKey();return BUN[k].n+': '+BUN[k].items.map(name).join(' · ')+' + '+BUN[k].c.toLocaleString()+' coins · ends in '+dealLeft()+(web?' · Google Play app only.':'')}});Object.defineProperty(p,'price',{get:()=>bOwned(dealKey())?'OWNED':({'$3.99':'$2.79','$4.99':'$3.49'})[BUN[dealKey()].p]})}
 else if(p.once){const pr=p.price;Object.defineProperty(p,'price',{get:()=>LS[p.once]==='1'?'OWNED':pr})}
 else if(p.bun){const pr=p.price;Object.defineProperty(p,'price',{get:()=>bOwned(p.bun)?'OWNED':pr})}
 else if(p.id==='vip_monthly'){const pr=p.price;Object.defineProperty(p,'price',{get:()=>+(LS.fgfVipExp||0)>Date.now()?'ACTIVE':pr})}
 else if(p.id==='spass_gold'){const pr=p.price;Object.defineProperty(p,'price',{get:()=>LS.fgfSPGold===mo()?'ACTIVE':pr})}});
const mo=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)};
{const i=PACKS.findIndex(p=>p.id==='coins_20000');PACKS.splice(i+1,0,...L.slice(0,2));const j=PACKS.findIndex(p=>p.id==='pro_bundle');PACKS.splice(j,0,...L.slice(2))}
// the existing Starter Pack (s5) is one-time: show OWNED after it's bought
{const sp=PACKS.find(p=>p.id==='starter');if(sp){const pr=sp.price;Object.defineProperty(sp,'price',{get:()=>LS.fgfStarter?'OWNED':pr})}}
// tags for the original coin tiers (bonus vs the $0.99 rate)
[['coins_7500','+50% BONUS'],['coins_20000','+100% BONUS']].forEach(([id,t])=>{const p=PACKS.find(x=>x.id===id);if(p&&!p.tag)p.tag=t});
try{FGF_PLAY_PRODUCTS.inapp=PACKS.filter(p=>!p.sub&&!/^tester_/.test(p.id)&&p.id!=='deal_week').map(p=>({id:p.id,price:String(Object.getOwnPropertyDescriptor(p,'price').get?'see ECONOMY.md':p.price).replace('$','')+' USD'}));FGF_PLAY_PRODUCTS.inapp.push({id:'deal_week',price:'2.79/3.49 USD'});FGF_PLAY_PRODUCTS.subscriptions.push({id:'vip_monthly',period:'P1M',price:'4.99 USD'})}catch(e){}
// never charge twice
const oBP=buyPack;buyPack=function(p){const pr=p.price;if(pr==='OWNED'){toast('You already own this');return}if(pr==='ACTIVE'){toast('Already active');return}return oBP.apply(this,arguments)};
// grants after a verified purchase
const VIPT=['cTvip','VIP Tee',-1],VIPN='sy_n_vip';try{if(window.FGF_GEAR2){FGF_GEAR2.LOOK.cTvip=['neon','#b388ff'];const T=SHOP.find(c=>c[0]==='TEES');if(T&&!ITEM.cTvip){T[1].push(VIPT);ITEM.cTvip=VIPT}}
 const S=window.FGF_STYLE;if(S&&!S.BYID[VIPN]){const it=[VIPN,'VIP Plate',-1,['#2a0a3d','#ffd23f']];S.CAT.n[2].push(it);S.BYID[VIPN]=['n',it]}
 const GT=[['cTgold','Gold Pass Tee',['neon','#ffb000']],['gKgold','Gold Shockwave',['ring','#ffd23f']],['vSgold','Gold Water Cooler',['cooler','#ffd23f']]];GT.forEach(([id,n,lk])=>{FGF_GEAR2.LOOK[id]=lk;const cat=id[0]==='c'?'TEES':id[0]==='g'?'KICK FX':'SIDELINE',C=SHOP.find(c=>c[0]===cat);if(C&&!ITEM[id]){const it=[id,n,-1];C[1].push(it);ITEM[id]=it}})}catch(e){}
// hide never-sold items (price -1) from the coin shop lists unless owned
try{const odS=drawShop;drawShop=function(){const sv=[];SHOP.forEach(c=>{if(['TEES','KICK FX','SIDELINE'].includes(c[0])){sv.push([c,c[1]]);c[1]=c[1].filter(m=>m[2]>=0||own.includes(m[0]))}});try{return odS.apply(this,arguments)}finally{sv.forEach(([c,a])=>c[1]=a)}}}catch(e){}
const oOn=B.onPurchased.bind(B);B.onPurchased=function(id){
 if(id==='coins_45000'||id==='coins_125000'){addCoins(id==='coins_45000'?45000:125000);toast('✔ Coins added');return}
 if(id.startsWith('bundle_')||id==='deal_week'){const k=id==='deal_week'?dealKey():id.slice(7);const b=BUN[k];if(!b)return;let back=0;b.items.forEach(x=>back+=giveItem(x));addCoins(b.c);toast('✔ '+b.n+(back?' · 🪙 +'+back+' for pieces you owned':''));return}
 if(id==='vip_monthly'){LS.fgfVipExp=String(Date.now()+31*864e5);giveItem('cTvip');if(!own.includes(VIPN)){own.push(VIPN);SV('fgfOwn',own)}toast('👑 Welcome to VIP!');return}
 if(id==='spass_gold'){LS.fgfSPGold=mo();toast('🎟️ Season Pass Gold active for this month');return}
 if(id==='coin_doubler'){LS.fgfDoubler='1';toast('✖️2 Coin Doubler active');return}
 if(id==='gift_3000'||id==='gift_10000'){const n=id==='gift_3000'?3000:10000;FGF_GIFTPACK(n,arguments[1]).catch(()=>toast('Gift code could not be made · contact support'));return}
 return oOn(id)};
const oSub=B.onSubscription;B.onSubscription=function(id,exp){if(id==='vip_monthly'){LS.fgfVipExp=String(+exp||0);return}return oSub?oSub.apply(this,arguments):undefined};
// VIP: no ads + 500 coins on the first game each day
const oNA=window.FGF_NOADS;window.FGF_NOADS=function(){if(+(LS.fgfVipExp||0)>Date.now())return true;return oNA?oNA():false};
const oNG=newGame;newGame=function(){const r=oNG.apply(this,arguments);try{if(+(LS.fgfVipExp||0)>Date.now()&&LS.fgfVipDay!==String(day())){LS.fgfVipDay=String(day());addCoins(500);toast('👑 VIP daily 🪙 +500')}}catch(e){}return r};
// Coin Doubler: made kicks pay their coins twice
let snap=null;const oK=kick;kick=function(){if(!ball.fly)snap=coins;return oK.apply(this,arguments)};
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(good&&LS.fgfDoubler==='1'&&snap!=null&&mode!=='range'&&mode!=='tut'){const d=coins-snap;if(d>0&&d<5000){coins+=d;if(!window.TESTER)LS.fgfCoins=coins}}snap=null}catch(e){}return r};
// Season Pass Gold: called by the Season Pass after a free tier is claimed
window.FGF_SPGOLD=function(i,k){if(LS.fgfSPGold!==mo())return;try{if(k&&k.startsWith('c:'))addCoins(+k.slice(2));const x={10:'cTgold',20:'gKgold',30:'vSgold'}[i];if(x)giveItem(x);toast('🎟️ Gold tier '+i+(x?' · '+name(x):' · coins doubled'))}catch(e){}};
window.FGF_PACKTEST={BUN,dealKey,L};
})();
