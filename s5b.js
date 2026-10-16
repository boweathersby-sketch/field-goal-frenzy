// s5b (Kirk bug, Oct 16): weather fits the stadium (no snow at warm / beach / desert / volcano stadiums: rain, clear
// or gusts instead) and stale toasts are dropped when a kick starts, so menu toasts never sit over gameplay.
(function(){
const WARM=new Set(['bg1','bg4','beach','volcano']);// Gators beach, Scorpions desert, Beach, Volcano
const warm=()=>{try{const b=S5.bgFor(stadT());return !!(b&&WARM.has(b.id))}catch(e){return false}};window.FGF_WARM=warm;
const oNW=newWind;newWind=function(){const r=oNW.apply(this,arguments);try{if(weather==='snow'&&warm()){const R=window.__SRNG||Math.random,p=['rain','clear','gust'][R()*3|0];weather=p;if(p==='gust'&&wind.mph<8){const k=8/Math.max(1,wind.mph);wind.mph=8;wind.x*=k;wind.z*=k}}}catch(e){}return r};
// toasts: queued on a menu screen are dropped once play starts; a toast showing at that moment is cut short
let last=state;setInterval(()=>{if(state==='play'&&last!=='play'&&last!=='pause'&&last!=='replay'){toastQ.length=0;if(toastT>0)toastT=Math.min(toastT,0.25)}last=state},100);
})();
