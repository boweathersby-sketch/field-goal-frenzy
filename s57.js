// s57 (Kirk bug, Oct 15): touch-scrollable lists for leaderboards (local, online weekly, club, country) and Season Pass,
// top 25 everywhere, your row highlighted, your rank shown when you're outside the top 25, buttons below the list.
(function(){const T_=t=>window.FGF_TR?FGF_TR(t):t,SL={};
window.FGF_SLIST=function(key,y0,y1,n,rh,draw){const S=SL[key]||(SL[key]={y:0});S.max=Math.max(0,n*rh-(y1-y0));S.y=Math.max(0,Math.min(S.max,S.y||0));window.__SCK={st:state,o:S,t:performance.now()};
 ctx.save();ctx.beginPath();ctx.rect(0,y0,W,y1-y0);ctx.clip();for(let i=0;i<n;i++){const y=y0+i*rh-S.y;if(y+rh<y0||y>y1)continue;draw(i,y)}ctx.restore();
 if(S.max>0){const sh=Math.max(24,(y1-y0)*(y1-y0)/(n*rh));ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(W-5,y0+(y1-y0-sh)*(S.y/S.max),3,sh);if(S.y<S.max-2){ctx.fillStyle='#ffd23f';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('▼ '+T_('scroll for more'),W/2,y1+12)}}return S};
window.FGF_SLRESET=k=>{if(SL[k])SL[k].y=0};
addEventListener('wheel',e=>{const k=window.__SCK;if(k&&k.st===state&&performance.now()-k.t<500){k.o.y=Math.max(0,Math.min(k.o.max||0,(k.o.y||0)+e.deltaY))}},{passive:true});
try{cv.style.touchAction='none'}catch(e){}
// ---- local LEADERBOARD (top 25, scroll, buttons under the list) ----
let lastTab=-1;
const osc=S3.screen;S3.screen=function(){
 if(state==='board'){BTN=[];const ms=MODES;let lb=typeof lbTab!=='undefined'?lbTab:0;if(!(lb>=0&&lb<ms.length))lb=lbTab=0;txt('LEADERBOARD',W/2,H*0.075,Math.min(30,W*0.08),GOLD,'#063');const tw=(W*0.92-16)/5;
  const rw=Math.ceil(ms.length/5);ms.forEach((m,i)=>bx(W*0.04+(i%5)*(tw+4),H*0.11+Math.floor(i/5)*34,tw,30,m[1].replace(/[^A-Z ]/g,'').trim().split(' ')[0],()=>{lbTab=i;FGF_SLRESET('lb')},i===lb,9));
  const L=(J('fgfLB',{})[ms[lb][0]]||[]).slice(0,25),me=(()=>{try{return (LS.fgfOLIni||'')}catch(e){return ''}})(),y0=H*0.11+38+(Math.ceil(ms.length/5)-1)*34,y1=H*0.76,rh=Math.min(44,Math.max(36,H*0.058)),n=Math.max(10,L.length);
  FGF_SLIST('lb',y0,y1,n,rh,(i,y)=>{const e=L[i],mine=e&&me&&e.i===me;panel(W*0.08,y,W*0.84,rh-6);if(mine){ctx.fillStyle='rgba(255,210,63,.2)';ctx.fillRect(W*0.08+2,y+2,W*0.84-4,rh-10)}ctx.textAlign='left';ctx.fillStyle=i<3?GOLD:'#bcd';ctx.font='900 15px system-ui';ctx.fillText((i+1)+'.',W*0.12,y+rh*0.58);ctx.fillStyle=mine?GOLD:'#fff';ctx.fillText(e?e.i:'---',W*0.24,y+rh*0.58);ctx.textAlign='right';ctx.fillText(e?e.s.toLocaleString():'',W*0.88,y+rh*0.58)});
  bx(W*0.06,H*0.79,W*0.41,36,'🆚 RIVAL',()=>state='rvt',false,13);bx(W*0.53,H*0.79,W*0.41,36,'📅 WEEKLY',()=>state='wlb',false,13);
  bx(W/2-80,H*0.93-20,160,40,'◀ BACK',()=>state='title',false,14);return true}
 return osc.apply(this,arguments)};
})();
