// s74 (Oct 17): More Settings layout fix — calm 8px row gaps, labels fit inside buttons (2 lines at " · "),
// list scrolls on short screens with BACK pinned and clear at the bottom. Same rows, no new features.
(function(){
// 1) a button label that is too wide shrinks a little, then wraps to 2 lines at " · "
const oBx=bx;bx=function(x,y,w,h,label,cb,on,sz){if(window.__MSBK!=null&&label==='◀ BACK'&&Math.abs(y-window.__MSBK)<2&&w===160){if(cb)btn(x,y,w,h,cb);return}
 try{if(typeof label==='string'&&label){const f=sz||Math.min(18,h*0.42);ctx.save();ctx.font='900 '+f+'px system-ui';const tr=window.FGF_TR?FGF_TR(label):label;const tw=ctx.measureText(tr).width,mx=w-14;ctx.restore();
 if(tw>mx){const f2=f*mx/tw;if(f2>=f*0.82||tr.indexOf(' · ')<0||h<34)return oBx.call(this,x,y,w,h,label,cb,on,Math.max(8,f2));
  const p=tr.split(' · '),a=p[0],b=p.slice(1).join(' · ');const r=oBx.call(this,x,y,w,h,' ',cb,on,sz);const th=(window.FGF_MENUTH&&FGF_MENUTH())||{text:'#fff',textOn:GREEN};
  ctx.save();ctx.fillStyle=on?(th.textOn||GREEN):(th.text||'#fff');ctx.textAlign='center';let g=Math.min(f,12);ctx.font='900 '+g+'px system-ui';const m=Math.max(ctx.measureText(a).width,ctx.measureText(b).width);if(m>mx){g=Math.max(8,g*mx/m);ctx.font='900 '+g+'px system-ui'}
  ctx.fillText(a,x+w/2,y+h/2-g*0.2);ctx.font='700 '+(g*0.92)+'px system-ui';ctx.globalAlpha=0.85;ctx.fillText(b,x+w/2,y+h/2+g*0.95);ctx.restore();return r}}}catch(e){}return oBx.apply(this,arguments)};
// 2) shared row positions for the lower list: 38px rows, 8px gaps
window.FGF_MSR=i=>{const t=!!window.TESTER;return{y:H*0.16+(t?312:264)+i*46,h:38}};
// 3) scroll area above a pinned BACK
const MS={y:0,max:0};window.FGF_MSSCROLL=MS;
addEventListener('wheel',e=>{if(state==='mset'&&MS.max>0)MS.y=Math.max(0,Math.min(MS.max,MS.y+e.deltaY))},{passive:true});
const o=S3.screen;S3.screen=function(){if(state!=='mset'){MS.y=0;return o.apply(this,arguments)}
 const bT=H*0.93-22,clipB=bT-12;MS.y=Math.max(0,Math.min(MS.max,MS.y));const sy=MS.y;
 window.__MSBK=bT;ctx.save();ctx.beginPath();ctx.rect(0,0,W,clipB);ctx.clip();ctx.translate(0,-sy);let r;try{r=o.apply(this,arguments)}finally{ctx.restore();window.__MSBK=null}
 try{let bk=null,bot=0;const isBk=b=>Math.abs(b.y-bT)<2&&Math.abs(b.w-160)<2&&Math.abs(b.x-(W/2-80))<2;
  BTN=BTN.filter(b=>{if(isBk(b)){bk=b;return false}bot=Math.max(bot,b.y+b.h);b.y-=sy;if(b.y+b.h>clipB){b.h=clipB-b.y}return b.h>8&&b.y+b.h>0});
  MS.max=Math.max(0,bot+14-clipB);if(MS.y>MS.max)MS.y=MS.max;
  if(MS.max>0){window.__SCK={st:'mset',t:performance.now(),o:MS};
   ctx.save();const g=ctx.createLinearGradient(0,clipB-26,0,clipB);g.addColorStop(0,'rgba(4,14,10,0)');g.addColorStop(1,'rgba(4,14,10,.55)');if(sy<MS.max-1){ctx.fillStyle=g;ctx.fillRect(0,clipB-26,W,26)}
   const tH=clipB-H*0.14,th=Math.max(30,tH*tH/(tH+MS.max)),ty=H*0.14+(tH-th)*(sy/MS.max);ctx.fillStyle='rgba(200,220,210,.10)';ctx.fillRect(W-6,H*0.14,3,tH);ctx.fillStyle='rgba(200,220,210,.45)';ctx.fillRect(W-6,ty,3,th);ctx.restore()}
  if(bk)bx(W/2-80,bT,160,42,'◀ BACK',bk.cb,false,14)}catch(e){}
 return r};
})();
