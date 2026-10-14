// s22: AD SYSTEM (OFF). Player-friendly policy + AdMob-ready adapter + mock adapter for tester mode.
// Live build: FGF_ADS=false and no ad network => nothing here shows. See /workspace/game/fgf_store/ADS_PLAN.md
(function(){
const DK=FGF_DK,now=()=>Date.now();
const on=()=>!!(window.FGF_ADS||(window.TESTER&&LS.fgfAdMock==='1'));window.FGF_ADS_ON=on;
const noAds=()=>{try{return FGF_NOADS()}catch(e){return false}};
// ---- adapters ----
const Mock={name:'mock',init(){return Promise.resolve(true)},
 show(kind){return new Promise(res=>{window.FGF_ADPLAYING=1;const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:20;background:rgba(5,10,20,.96);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui;text-align:center';
  d.innerHTML='<div style="font:900 13px system-ui;color:#ff6af0">🧪 MOCK AD ('+kind+')</div><div style="font:900 26px system-ui;margin:14px 0 6px">Ad would play here</div><div style="color:#bcd;font-size:13px;max-width:280px">'+(kind==='rewarded'?'Watch to the end to get your reward.':'Skippable after 5 seconds.')+'</div><button id="adb" disabled style="margin-top:26px;font:900 16px system-ui;padding:12px 26px;border-radius:12px;border:2px solid #f2c230;background:#1d2a3c;color:#889">5</button>'+(kind==='rewarded'?'<button id="adx" style="margin-top:12px;background:none;border:0;color:#8ab;font-size:13px">Close (no reward)</button>':'');
  document.body.appendChild(d);let t=5;const b=d.querySelector('#adb'),fin=r=>{d.remove();window.FGF_ADPLAYING=0;res(r)};const iv=setInterval(()=>{t--;if(t>0)b.textContent=t;else{clearInterval(iv);b.disabled=false;b.style.background='#f2c230';b.style.color='#063';b.textContent=kind==='rewarded'?'CLAIM REWARD':'SKIP ▶'}},1000);
  b.onclick=()=>fin(true);const x=d.querySelector('#adx');if(x)x.onclick=()=>{clearInterval(iv);fin(false)}})},
 interstitial(){return this.show('interstitial')},rewarded(){return this.show('rewarded')},banner(v){window.FGF_MOCKBANNER=!!v}};
// AdMob via a native bridge (e.g. Capacitor @capacitor-community/admob). Not wired yet: only used if the native app injects window.AdMob.
const IDS=window.FGF_ADMOB_IDS||{interstitial:'',rewarded:'',banner:''};
const AdMobA={name:'admob',init(){return window.AdMob?AdMob.initialize({}).then(()=>true).catch(()=>false):Promise.resolve(false)},
 interstitial(){return AdMob.prepareInterstitial({adId:IDS.interstitial}).then(()=>AdMob.showInterstitial()).then(()=>true).catch(()=>false)},
 rewarded(){return new Promise(res=>{let got=false;const h=AdMob.addListener&&AdMob.addListener('onRewardedVideoAdReward',()=>{got=true});AdMob.prepareRewardVideoAd({adId:IDS.rewarded}).then(()=>AdMob.showRewardVideoAd()).then(()=>res(true)).catch(()=>res(got)).finally(()=>{try{h&&h.remove&&h.remove()}catch(e){}})})},
 banner(v){try{v?AdMob.showBanner({adId:IDS.banner,position:'BOTTOM_CENTER'}):AdMob.hideBanner()}catch(e){}}};
const AD=()=>window.AdMob&&window.FGF_ADS?AdMobA:Mock;window.FGF_ADAPTER=AD;
// ---- policy ----
LS.fgfSessions=(+LS.fgfSessions||0)+1;const firstSession=+LS.fgfSessions<=1;let sessRuns=0,runsSince=+LS.fgfAdRuns||0;
const lastBuy=()=>+LS.fgfLastBuy||0;const markBuy=()=>LS.fgfLastBuy=now();
const ob5=buy5;buy5=function(id,pr,ok){return ob5(id,pr,function(){markBuy();return ok.apply(this,arguments)})};
try{const op=BILLING.onPurchased;BILLING.onPurchased=function(){markBuy();return op.apply(this,arguments)}}catch(e){}
const CAPS={x2:3,cont:3,reroll:1,legend:1},TOT=10;
const cap=()=>{const c=J('fgfAdCap',{d:'',n:{},t:0});if(c.d!==DK()){c.d=DK();c.n={};c.t=0}return c};
const canR=k=>on()&&cap().t<TOT&&(cap().n[k]||0)<CAPS[k];
const useR=k=>{const c=cap();c.n[k]=(c.n[k]||0)+1;c.t++;SV('fgfAdCap',c)};
window.FGF_ADPOLICY=()=>({on:on(),noAds:noAds(),firstSession,rounds:+LS.fgfRounds||0,sessRuns,runsSince,minsSince:((now()-(+LS.fgfAdT||0))/6e4)|0,caps:cap()});
function interOK(){if(!on()||noAds()||firstSession||(+LS.fgfRounds||0)<4||runsSince<3)return false;if(now()-(+LS.fgfAdT||0)<4*60e3)return false;if(now()-lastBuy()<3*60e3)return false;if(['daily','legendc','tut','rival','horse','trick'].includes(mode))return false;return true}
let pst=state,runCoins=coins,runX2=false;
setInterval(()=>{if(state==='play'&&pst!=='play'&&!['cpuk'].includes(pst)){if(pst!=='cont'&&pst!=='replay'){runCoins=coins;runX2=false}}
 if(state==='over'&&pst!=='over'){sessRuns++;runsSince++;LS.fgfAdRuns=runsSince;if(interOK()){setTimeout(()=>{if(state==='over'&&!window.FGF_ADPLAYING){AD().interstitial().then(()=>{LS.fgfAdT=now();runsSince=0;LS.fgfAdRuns=0})}},1200)}}
 if(on()&&!noAds()&&LS.fgfBanner==='1'&&['title','hub','board','wlb','olb','stats','coll'].includes(state))AD().banner(true);else AD().banner(false);
 pst=state},200);
// ---- rewarded hooks (opt-in only) ----
function reward(k,fn){if(!canR(k)){toast('📺 Daily ad limit reached');return}AD().rewarded().then(ok=>{if(ok){useR(k);fn()}else toast('No reward (ad closed early)')})}
window.FGF_REWARD=reward;window.FGF_INTEROK=interOK;window.FGF_ADTEST=n=>{runCoins=coins-n};
const earned=()=>Math.max(0,coins-runCoins);
const prevOver=window.FGF_OVERX;window.FGF_OVERX=function(){if(prevOver)prevOver();if(on()&&!runX2&&earned()>0&&canR('x2')&&mode!=='tut'){const y=H*0.905;ctx.save();ctx.fillStyle='rgba(4,18,10,.95)';ctx.strokeStyle='#7fe8ff';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(W/2-100,y,200,30,14);ctx.fill();ctx.stroke();ctx.fillStyle='#7fe8ff';ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText('📺 Watch ad: 2x coins (+'+earned()+')',W/2,y+20);ctx.restore()}};
addEventListener('pointerdown',e=>{if(state!=='over'||!on()||runX2||!(earned()>0))return;const x=e.clientX,y=e.clientY;if(x>=W/2-100&&x<=W/2+100&&y>=H*0.905-4&&y<=H*0.905+34){e.stopImmediatePropagation();const n=earned();reward('x2',()=>{runX2=true;addCoins(n);toast('📺 2x coins  🪙 +'+n)})}},true);
let contUsed=false;
const osc=S3.screen;S3.screen=function(){const r=osc.apply(this,arguments);if(!on())return r;
 if(state==='play'&&ball&&!ball.fly&&!msg&&score===0&&lives===3)contUsed=false;
 if(state==='cont'&&window.FGF_CONTINFO&&FGF_CONTINFO()&&!contUsed&&canR('cont')){const ph=Math.max(H*0.42,H*0.26+150),y=H*0.24+ph+10;bx(W*0.18,y,W*0.64,40,'📺 Watch ad: free ball',()=>reward('cont',()=>{contUsed=true;FGF_CONTFREE()}),false,13)}
 if(state==='spin'&&LS.fgfSpin===DK()&&canR('reroll')&&!window.__spinning){bx(W*0.25,H*0.86-48,W*0.5,36,'📺 Watch ad: re-roll',()=>reward('reroll',()=>{LS.fgfSpin='';toast('🎡 Spin again!')}),false,13)}
 if(state==='chres'&&window.FGF_CH&&FGF_CH()&&FGF_CH().type==='legendc'&&!FGF_CH().made&&canR('legend'))bx(W*0.15,H*0.45,W*0.7,42,'📺 Watch ad: free Legend retry',()=>reward('legend',()=>{LS.fgfLC='';FGF_LEGENDC()}),false,13);
 if(state==='mset'&&window.TESTER){bx(W/2-Math.min(150,W*0.42),H*0.16+262,Math.min(300,W*0.84),40,'🧪 MOCK ADS: '+(LS.fgfAdMock==='1'?'ON':'OFF'),()=>LS.fgfAdMock=LS.fgfAdMock==='1'?'0':'1',LS.fgfAdMock==='1',13)}
 return r};
// tester toggle visible even when ads are off
const osc2=S3.screen;S3.screen=function(){const r=osc2.apply(this,arguments);if(!on()&&state==='mset'&&window.TESTER)bx(W/2-Math.min(150,W*0.42),H*0.16+262,Math.min(300,W*0.84),40,'🧪 MOCK ADS: OFF',()=>LS.fgfAdMock='1',false,13);return r};
})();
