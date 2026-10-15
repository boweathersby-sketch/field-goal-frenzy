// s40: impression-level ad revenue tiers (AdMob OnPaidEventListener: valueMicros + precision). OFF with the ads flag.
// The reward is still granted ONLY after the earned-reward callback; this only scales the size of the reward.
(function(){let LAST=null;
 window.FGF_AD_PAID=function(micros,prec,cur){LAST={v:+micros||0,p:String(prec||'').toUpperCase(),c:cur||'USD',t:Date.now()}};
 window.FGF_ADPAID_RESET=()=>{LAST=null};
 // PRECISE (=3) or PUBLISHER_PROVIDED (=2) only; ESTIMATED (=1) / UNKNOWN (=0) / missing -> base reward.
 const ok=p=>['PRECISE','PUBLISHER_PROVIDED','3','2'].includes(p);
 const TIERS=[[25000,3],[10000,2],[3000,1.5],[0,1]];// micros per impression -> multiplier. Floor 1x, cap 3x.
 window.FGF_ADMULT=function(){const L=LAST;LAST=null;if(!L||!ok(L.p)||Date.now()-L.t>120000||L.c!=='USD')return 1;for(const [min,m] of TIERS)if(L.v>=min)return Math.min(3,Math.max(1,m));return 1};
 window.FGF_ADTIERS=TIERS;})();
