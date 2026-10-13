// ===== Stage 8: front-facing My Kicker preview, male/female body types =====
'use strict';
const BMETA={"cw": 186, "h": 420, "m": [{"ox": 10, "w": 165, "fx": 102, "fy0": 1, "fy1": 78, "cy": 121, "cw": 71}, {"ox": 197, "w": 163, "fx": 287, "fy0": 0, "fy1": 78, "cy": 121, "cw": 71}, {"ox": 381, "w": 168, "fx": 474, "fy0": 0, "fy1": 76, "cy": 121, "cw": 74}, {"ox": 560, "w": 182, "fx": 656, "fy0": 4, "fy1": 77, "cy": 121, "cw": 85}, {"ox": 758, "w": 157, "fx": 850, "fy0": 6, "fy1": 79, "cy": 121, "cw": 74}, {"ox": 943, "w": 160, "fx": 1026, "fy0": 2, "fy1": 83, "cy": 121, "cw": 67}, {"ox": 1125, "w": 168, "fx": 1219, "fy0": 2, "fy1": 78, "cy": 121, "cw": 70}, {"ox": 1303, "w": 184, "fx": 1400, "fy0": 2, "fy1": 77, "cy": 121, "cw": 79}, {"ox": 1501, "w": 159, "fx": 1594, "fy0": 1, "fy1": 83, "cy": 121, "cw": 67}, {"ox": 1687, "w": 159, "fx": 1779, "fy0": 3, "fy1": 83, "cy": 121, "cw": 66}, {"ox": 1860, "w": 186, "fx": 1964, "fy0": 1, "fy1": 83, "cy": 121, "cw": 83}]}; // bodies.webp: one front-facing figure per cell (white uniform, holding helmet)
const BODIES=[{g:'m',n:'Slim',b:'slim'},{g:'m',n:'Athletic',b:'std'},{g:'m',n:'Muscular',b:'std'},{g:'m',n:'Big & Bearded',b:'big'},{g:'f',n:'Slim',b:'slim',hs:'pony'},{g:'f',n:'Athletic Ponytail',b:'std',hs:'pony'},{g:'m',n:'Bearded Athletic',b:'std'},{g:'m',n:'Big, Long Hair',b:'big'},{g:'f',n:'Ponytail, Slim',b:'slim',hs:'pony'},{g:'f',n:'Bun, Athletic',b:'std',hs:'bun'},{g:'f',n:'Braids, Strong',b:'big',hs:'braid'}];
const BUILD={slim:1,std:0,big:5};// back-view kicking sheet used in-game for each build
let BDI=null;function bdImg(){if(!BDI)BDI=IMG('bodies.webp');return BDI}
if(MK.g==null){MK.g='m';MK.bt=1}
const bodiesOf=g=>BODIES.map((b,i)=>[b,i]).filter(q=>q[0].g===g).map(q=>q[1]);
function setBody(i){MK.bt=i;MK.g=BODIES[i].g;MK.base=BUILD[BODIES[i].b];KC5.my=null;FC.k=null;MK.on=1}
// front preview recolor: white uniform -> team primary (luminance-preserving), grey trim -> secondary, skin/hair swatches, add-ons, number
const FC={k:null,c:null};
function frontImg(ti){const im=bdImg();if(!im.complete||!im.naturalWidth)return null;const key=JSON.stringify(MK)+ti;if(FC.k===key)return FC.c;const m=BMETA.m[MK.bt],cw=BMETA.cw,h=BMETA.h,c=document.createElement('canvas');c.width=cw;c.height=h;const x=c.getContext('2d');x.drawImage(im,(MK.bt)*cw,0,cw,h,0,0,cw,h);let d;try{d=x.getImageData(0,0,cw,h)}catch(e){return null}
 const a=d.data,P1=rgb(TEAMS[ti].p),S1=rgb(TEAMS[ti].s),skT=SKIN[MK.skin][1]&&rgb(SKIN[MK.skin][1]),hrT=HAIR[MK.hair][1]&&rgb(HAIR[MK.hair][1]),wbc=WBAND[MK.wb][1],WB=wbc?(wbc==='team'?S1:rgb(wbc)):null,fx=m.fx-m.ox+(cw-m.w)/2*0;
 const fxl=m.fx-(MK.bt*cw)-0; // face x inside the cell
 const isSkin=(r,g,b,s,v)=>s>0.2&&s<0.72&&v>0.27&&r>g&&g>=b;const arm=[];
 for(let i=0;i<a.length;i+=4){if(a[i+3]<20)continue;const p=i/4,px=p%cw,py=p/cw|0,r=a[i],g=a[i+1],b=a[i+2],[hh,s,v]=hsv(r,g,b);
  if(isSkin(r,g,b,s,v)&&!(py<h*0.2&&v<0.35)){if(py>h*0.19&&py<h*0.56&&Math.abs(px-fxl)>h*0.05)arm.push(p);if(skT){const k=v/0.66;a[i]=Math.min(255,skT[0]*k);a[i+1]=Math.min(255,skT[1]*k);a[i+2]=Math.min(255,skT[2]*k)}continue}
  if(py<h*0.22&&v<0.38&&s<0.75){if(hrT){const k=0.35+v*1.8;a[i]=Math.min(255,hrT[0]*k);a[i+1]=Math.min(255,hrT[1]*k);a[i+2]=Math.min(255,hrT[2]*k)}continue}
  if(s<0.16&&py<h*0.94){const T=v>0.6?P1:S1,ref=v>0.6?0.92:0.55,dk=T[0]+T[1]+T[2]<120;const k=dk?0.45+v*0.7:v/ref;a[i]=Math.min(255,T[0]*k+(dk?0:0));a[i+1]=Math.min(255,T[1]*k);a[i+2]=Math.min(255,T[2]*k)}}
 // sleeve: upper-arm skin -> team; wristband: lowest arm skin rows on each side
 for(const side of[-1,1]){const L=arm.filter(p=>Math.sign((p%cw)-fxl)===side);if(!L.length)continue;const ys=L.map(p=>p/cw|0),y0=Math.min(...ys),y1=Math.max(...ys);
  for(const p of L){const py=p/cw|0,i=p*4,v=hsv(a[i],a[i+1],a[i+2])[2];if(MK.sl&&py<y0+(y1-y0)*0.45){a[i]=P1[0]*(0.45+v*0.7);a[i+1]=P1[1]*(0.45+v*0.7);a[i+2]=P1[2]*(0.45+v*0.7)}else if(WB&&py>y1-9){a[i]=WB[0]*(0.5+v*0.55);a[i+1]=WB[1]*(0.5+v*0.55);a[i+2]=WB[2]*(0.5+v*0.55)}}}
 x.putImageData(d,0,0);
 if(MK.eb){const ey=m.fy0+(m.fy1-m.fy0)*0.5,ew=h*0.022;x.fillStyle='rgba(10,10,10,0.92)';x.fillRect(fxl-ew*1.9,ey,ew*1.2,ew*0.45);x.fillRect(fxl+ew*0.7,ey,ew*1.2,ew*0.45)}
 numOn(x,fxl,h*0.33,h*0.07,myNum(ti),TEAMS[ti].s);FC.k=key;FC.c=c;return c}
// in-game: women get a ponytail / bun / braid drawn out of the back of the helmet, in the hair color
const oMySheet=mySheet;mySheet=function(ti){const c=oMySheet(ti);const B=BODIES[MK.bt];if(MK.masc>=0||!B||B.g!=='f'||c.__hs)return c;const x=c.getContext('2d'),col=HAIR[MK.hair][1]||'#2b1a10',b=MK.base;
 KMETA[b].forEach((m,f)=>{const hx=m[4],hy=m[5]+20;x.save();x.lineCap='round';x.strokeStyle=col;x.fillStyle=col;
  if(B.hs==='bun'){x.beginPath();x.arc(hx,hy+2,7,0,7);x.fill();x.strokeStyle='rgba(0,0,0,0.3)';x.lineWidth=1;x.stroke()}
  else if(B.hs==='braid'){for(const o of[-5,5]){for(let k=0;k<6;k++){x.beginPath();x.ellipse(hx+o+Math.sin(k)*1,hy+4+k*8,3.6-k*0.25,4.6,0,0,7);x.fill()}}}
  else{const sw=f>=2?6:2;x.lineWidth=9;x.beginPath();x.moveTo(hx,hy);x.quadraticCurveTo(hx+sw+2,hy+20,hx+sw,hy+44);x.stroke();x.lineWidth=5;x.beginPath();x.moveTo(hx+sw,hy+40);x.lineTo(hx+sw-1,hy+52);x.stroke();x.fillStyle='rgba(255,255,255,0.14)';x.fillRect(hx-1,hy+6,2,30)}
  x.restore()});c.__hs=1;return c};
function drawMK(){txt('MY KICKER',W/2,H*0.05,Math.min(28,W*0.075),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('🪙 '+CSTR()+' · most options free',W/2,H*0.05+18);
 const py=H*0.075,ph=Math.min(H*0.44,W*1.05),pw=Math.min(W*0.9,ph*0.62);panel(W/2-pw/2,py,pw,ph);
 if(MK.masc>=0){const s=mySheet(myT()),h=ph*0.9,w=h*203/300;ctx.drawImage(s,0,0,203,300,W/2-w/2,py+ph*0.05,w,h)}
 else{const f=frontImg(myT());if(f){const h=ph*0.95,w=h*BMETA.cw/BMETA.h;ctx.drawImage(f,W/2-w/2,py+ph*0.03,w,h)}else{ctx.fillStyle='#bcd';ctx.fillText('Loading…',W/2,py+ph/2)}
  const s=mySheet(myT()),th=ph*0.32,tw=th*203/300,fr=(T*1.6|0)%4;ctx.fillStyle='rgba(0,0,0,0.35)';ctx.fillRect(W/2+pw/2-tw-8,py+ph-th-8,tw+4,th+4);ctx.drawImage(s,fr*203,0,203,300,W/2+pw/2-tw-6,py+ph-th-6,tw,th);ctx.fillStyle='#bcd';ctx.font='9px system-ui';ctx.fillText('IN-GAME',W/2+pw/2-tw/2-6,py+ph-th-12)}
 ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText((MK.name||'MY KICKER')+' #'+myNum(myT())+(MK.on?' · IN USE':' · PREVIEW'),W/2,py+ph+17);
 bx(W*0.05,py+ph+24,W*0.9,30,MK.on?'✔ USING MY KICKER (tap for team kicker)':'USE MY KICKER',()=>{MK.on=MK.on?0:1;saveMK()},!!MK.on,12);
 const top=py+ph+60,bot=H*0.93-28,rh=48;let y=top-MKS.y;const R=(l,v,s,p,n,t)=>{if(y>=top-1&&y+42<=bot+1)cyc(y,l,v,s,p,n,t);else if(y+42>top&&y<bot){ctx.save();ctx.beginPath();ctx.rect(0,top,W,bot-top);ctx.clip();cyc(y,l,v,s,null,null,null);ctx.restore()}y+=rh};const pend=()=>{KC5.my=null;FC.k=null;MK.on=1};MKS.top=top;MKS.bot=bot;
 R('GENDER',MK.g==='f'?'Female':'Male','',()=>{const g=MK.g==='f'?'m':'f';setBody(bodiesOf(g)[0])},()=>{const g=MK.g==='f'?'m':'f';setBody(bodiesOf(g)[0])});
 const L=bodiesOf(MK.g),bi=Math.max(0,L.indexOf(MK.bt));R('BODY TYPE ('+(bi+1)+'/'+L.length+')',BODIES[MK.bt].n,'',()=>setBody(L[nx(bi,L.length,-1)]),()=>setBody(L[nx(bi,L.length,1)]));
 const mo=MK.masc>=0?own5('masc'+MK.masc):1;R('MASCOT KICKER',MK.masc>=0?'🐾 '+TEAMS[MK.masc].n.split(' ').slice(-1)[0]:'None',MK.masc>=0?(mo?'OWNED':'🪙 '+MASCP[MK.masc].toLocaleString()+' · TAP'):'',()=>{MK.masc=MK.masc<=-1?7:MK.masc-1;pend()},()=>{MK.masc=MK.masc>=7?-1:MK.masc+1;pend()},()=>{if(MK.masc>=0&&!mo)buy5('masc'+MK.masc,MASCP[MK.masc],()=>{MKO.push('masc'+MK.masc);SV('fgfMKO',MKO);MK.on=1;saveMK()})});
 for(const[k,Lx,lab]of[['skin',SKIN,'SKIN TONE'],['hair',HAIR,'HAIR'],['wb',WBAND,'WRISTBAND'],['vz',VISOR,'VISOR TINT (in-game)']]){const o=Lx[MK[k]],ow=!o[2]||own5(k+MK[k]);R(lab,o[0],priceTag(ow,o[2]),()=>{MK[k]=nx(MK[k],Lx.length,-1);pend()},()=>{MK[k]=nx(MK[k],Lx.length,1);pend()},()=>{if(!ow)buy5(k+MK[k],o[2],()=>{MKO.push(k+MK[k]);SV('fgfMKO',MKO);saveMK()})})}
 R('EYE BLACK',MK.eb?'On':'Off','',null,()=>{MK.eb^=1;pend()},()=>{MK.eb^=1;pend()});R('SLEEVE',MK.sl?'On':'Off','',null,()=>{MK.sl^=1;pend()},()=>{MK.sl^=1;pend()});
 R('NAME (tap to edit)',MK.name||'—','',null,null,()=>{const v=prompt('Kicker name (max 12)',MK.name||'');if(v!=null){MK.name=v.toUpperCase().replace(/[^A-Z0-9 .'-]/g,'').slice(0,12);MK.on=1;saveMK()}});
 R('NUMBER (tap to edit)',MK.num>=0?'#'+MK.num:'Team #'+NUMS5[myT()],'',null,null,()=>{const v=prompt('Jersey number 0-99',MK.num>=0?MK.num:'');if(v!=null&&/^\d{1,2}$/.test(v.trim())){MK.num=+v.trim();MK.on=1;saveMK()}});
 MKS.max=Math.max(0,y+MKS.y-bot);if(MKS.max>0){const th=(bot-top)*(bot-top)/(bot-top+MKS.max);ctx.fillStyle='rgba(242,194,48,0.6)';ctx.fillRect(W-5,top+(bot-top-th)*MKS.y/MKS.max,3,th)}
 bx(W/2-90,H*0.93-20,180,40,'◀ SAVE & BACK',()=>{saveMK();state='title'},true,14)}
