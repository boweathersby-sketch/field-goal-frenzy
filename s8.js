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

// ---- wristbands + visor, drawn explicitly so they always read ----
if(!VISOR.find(v=>v[0]==='Red'))VISOR.push(['Red','rgba(230,40,40,0.85)',600]);
const isSk=(r,g,b)=>{const[h,s,v]=hsv(r,g,b);return s>0.18&&s<0.75&&v>0.2&&r>g&&g>=b};
function bandOn(x,X0,Y0,X1,Y1,col,th,skipX0,skipX1,ref){if(!col)return;const d=x.getImageData(X0,Y0,X1-X0,Y1-Y0),w=X1-X0,h=Y1-Y0,C=rgb(col);const o=d.data;let a=o;if(ref){const t=document.createElement('canvas');t.width=w;t.height=h;t.getContext('2d').drawImage(ref[0],ref[1],ref[2],w,h,0,0,w,h);a=t.getContext('2d').getImageData(0,0,w,h).data}
 const hit=[];for(let px=0;px<w;px++){if(px+X0>skipX0&&px+X0<skipX1)continue;for(let py=h-4;py>2;py--){const i=(py*w+px)*4,j=((py+3)*w+px)*4;if(a[i+3]>150&&isSk(a[i],a[i+1],a[i+2])&&a[j+3]>150&&!isSk(a[j],a[j+1],a[j+2])){hit.push([px,py]);break}}}
 for(const[px,py]of hit)for(let k=0;k<th;k++){const i=((py-k)*w+px)*4;if(py-k<0||a[i+3]<100)continue;const sh=k===1?1.25:k===th-1?0.75:1;o[i]=Math.min(255,C[0]*sh);o[i+1]=Math.min(255,C[1]*sh);o[i+2]=Math.min(255,C[2]*sh)}
 x.putImageData(d,X0,Y0)}
const wbCol=ti=>{const c=WBAND[MK.wb][1];return c?(c==='team'?TEAMS[ti].s:c):null};
function visorFill(x,X0,Y0,X1,Y1){const vz=VISOR[MK.vz][1];if(!vz)return;const d=x.getImageData(X0,Y0,X1-X0,Y1-Y0),a=d.data,w=X1-X0;let C=vz==='rainbow'?null:vz.match(/[\d.]+/g).map(Number);
 for(let i=0;i<a.length;i+=4){if(a[i+3]<150)continue;const mx=Math.max(a[i],a[i+1],a[i+2]),mn=Math.min(a[i],a[i+1],a[i+2]);if(mx>70||mx-mn>40)continue;const p=i/4,px=p%w,py=p/w|0;
  const c=C||[[255,60,60],[255,200,40],[60,220,90],[60,140,255],[190,80,255]][(px/4|0)%5];const sh=(px+py)%14<3?1.6:1;a[i]=Math.min(255,c[0]*0.85*sh);a[i+1]=Math.min(255,c[1]*0.85*sh);a[i+2]=Math.min(255,c[2]*0.85*sh)}
 x.putImageData(d,X0,Y0)}
const oFront=frontImg;frontImg=function(ti){const k0=FC.k,c=oFront(ti);if(!c||c.__ex===FC.k)return c;const x=c.getContext('2d'),m=BMETA.m[MK.bt],h=BMETA.h,cw=BMETA.cw,fxl=m.fx-MK.bt*cw;
 bandOn(x,0,Math.round(h*0.3),cw,Math.round(h*0.56),wbCol(ti),6,fxl-h*0.06,fxl+h*0.06,[bdImg(),MK.bt*cw,Math.round(h*0.3)]);visorFill(x,0,Math.round(h*0.34),cw,Math.round(h*0.52));c.__ex=FC.k;return c};
const oMy2=mySheet;mySheet=function(ti){const c=oMy2(ti);if(MK.masc>=0||c.__ex)return c;const x=c.getContext('2d'),b=MK.base,wc=wbCol(ti),vz=VISOR[MK.vz][1];
 KMETA[b].forEach((m,f)=>{const X0=f*203,hx=m[4],hy=m[5];bandOn(x,X0,Math.max(0,hy+50),X0+203,Math.min(300,hy+170),wc,4,hx-22,hx+22,[KS,X0,b*300+Math.max(0,hy+50)]);
  if(vz){x.save();x.fillStyle=vz==='rainbow'?'#c060ff':vz;x.strokeStyle='rgba(255,255,255,0.55)';x.lineWidth=1;for(const sd of[-1,1]){x.beginPath();x.ellipse(hx+sd*15,hy+9,2.6,5,sd*0.25,0,7);x.fill();x.stroke()}x.restore()}});c.__ex=1;return c};
function drawMK(){txt('MY KICKER',W/2,H*0.05,Math.min(28,W*0.075),GOLD,'#063');ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('🪙 '+CSTR()+' · most options free',W/2,H*0.05+18);
 const py=H*0.075,ph=Math.min(H*0.44,W*1.05),pw=Math.min(W*0.9,ph*0.62);panel(W/2-pw/2,py,pw,ph);
 if(MK.masc>=0){const s=portraitSheet(myT()),h=ph*0.9,w=h*203/300;ctx.drawImage(s,0,0,203,300,W/2-w/2,py+ph*0.05,w,h)}
 else{const f=frontImg(myT());if(f){const h=ph*0.95,w=h*BMETA.cw/BMETA.h;ctx.drawImage(f,W/2-w/2,py+ph*0.03,w,h)}else{ctx.fillStyle='#bcd';ctx.fillText('Loading…',W/2,py+ph/2)}
  }
 ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText((MK.name||'MY KICKER')+' #'+myNum(myT())+(MK.on?' · IN USE':' · PREVIEW'),W/2,py+ph+17);if(window.TTL&&TTL()){ctx.fillStyle='#7fe8ff';ctx.font='900 10px system-ui';ctx.fillText('🏆 '+TTL(),W/2,py+ph-6)}
 bx(W*0.05,py+ph+24,W*0.9,30,MK.on?'✔ USING MY KICKER (tap for team kicker)':'USE MY KICKER',()=>{MK.on=MK.on?0:1;saveMK()},!!MK.on,12);
 const top=py+ph+60,bot=H*0.93-28,rh=48;let y=top-MKS.y;const R=(l,v,s,p,n,t)=>{if(y>=top-1&&y+42<=bot+1)cyc(y,l,v,s,p,n,t);else if(y+42>top&&y<bot){ctx.save();ctx.beginPath();ctx.rect(0,top,W,bot-top);ctx.clip();cyc(y,l,v,s,null,null,null);ctx.restore()}y+=rh};const pend=()=>{KC5.my=null;FC.k=null;MK.on=1};MKS.top=top;MKS.bot=bot;
 R('GENDER',MK.g==='f'?'Female':'Male','',()=>{const g=MK.g==='f'?'m':'f';setBody(bodiesOf(g)[0])},()=>{const g=MK.g==='f'?'m':'f';setBody(bodiesOf(g)[0])});
 const L=bodiesOf(MK.g),bi=Math.max(0,L.indexOf(MK.bt));R('BODY TYPE ('+(bi+1)+'/'+L.length+')',BODIES[MK.bt].n,'',()=>setBody(L[nx(bi,L.length,-1)]),()=>setBody(L[nx(bi,L.length,1)]));
 const mo=MK.masc>=0?own5('masc'+MK.masc):1;R('MASCOT KICKER',MK.masc>=0?(window.cmUse&&cmUse()?'🐾 '+CM.name+' · '+CMN[CM.base]:'🐾 '+TEAMS[MK.masc].n.split(' ').slice(-1)[0]):'None',MK.masc>=0?(mo?'OWNED':'🪙 '+MASCP[MK.masc].toLocaleString()+' · TAP'):'',()=>{MK.masc=MK.masc<=-1?7:MK.masc-1;pend()},()=>{MK.masc=MK.masc>=7?-1:MK.masc+1;pend()},()=>{if(MK.masc>=0&&!mo)buy5('masc'+MK.masc,MASCP[MK.masc],()=>{MKO.push('masc'+MK.masc);SV('fgfMKO',MKO);MK.on=1;saveMK()})});
 for(const[k,Lx,lab]of[['skin',SKIN,'SKIN TONE'],['hair',HAIR,'HAIR'],['wb',WBAND,'WRISTBAND'],['vz',VISOR,'VISOR TINT']]){const o=Lx[MK[k]],ow=!o[2]||own5(k+MK[k]);R(lab,o[0],priceTag(ow,o[2]),()=>{MK[k]=nx(MK[k],Lx.length,-1);pend()},()=>{MK[k]=nx(MK[k],Lx.length,1);pend()},()=>{if(!ow)buy5(k+MK[k],o[2],()=>{MKO.push(k+MK[k]);SV('fgfMKO',MKO);saveMK()})})}
 R('EYE BLACK',MK.eb?'On':'Off','',null,()=>{MK.eb^=1;pend()},()=>{MK.eb^=1;pend()});R('SLEEVE',MK.sl?'On':'Off','',null,()=>{MK.sl^=1;pend()},()=>{MK.sl^=1;pend()});
 R('NAME (tap to edit)',MK.name||'—','',null,null,()=>{const v=prompt('Kicker name (max 12)',MK.name||'');if(v!=null){MK.name=v.toUpperCase().replace(/[^A-Z0-9 .'-]/g,'').slice(0,12);MK.on=1;saveMK()}});
 R('NUMBER (tap to edit)',MK.num>=0?'#'+MK.num:'Team #'+NUMS5[myT()],'',null,null,()=>{const v=prompt('Jersey number 0-99',MK.num>=0?MK.num:'');if(v!=null&&/^\d{1,2}$/.test(v.trim())){MK.num=+v.trim();MK.on=1;saveMK()}});
 MKS.max=Math.max(0,y+MKS.y-bot);if(MKS.max>0){const th=(bot-top)*(bot-top)/(bot-top+MKS.max);ctx.fillStyle='rgba(242,194,48,0.6)';ctx.fillRect(W-5,top+(bot-top-th)*MKS.y/MKS.max,3,th)}
 bx(W/2-90,H*0.93-20,180,40,'◀ SAVE & BACK',()=>{saveMK();state='title'},true,14)}
// ===== DAILY CHALLENGES: 3 per day from a 40+ pool, same for everyone (date seed), reset at local midnight =====
const isW=w=>weather===w,clean=()=>ball.res!=='BLOCKED!';
const DCH=[['d1','Make 5 kicks',5,50,g=>g],['d2','Make 10 kicks',10,100,g=>g],['d3','Make 20 kicks',20,200,g=>g],['d4','Make a 40+ yarder',1,60,g=>g&&dist>=40],['d5','Make 3 kicks from 40+',3,100,g=>g&&dist>=40],['d6','Make a 50+ yarder',1,120,g=>g&&dist>=50],['d7','Make 2 kicks from 50+',2,180,g=>g&&dist>=50],['d8','Make a 55+ yarder',1,160,g=>g&&dist>=55],['d9','Make a 60+ yarder',1,250,g=>g&&dist>=60],['d10','Make a 65+ yarder',1,300,g=>g&&dist>=65],
['d11','Make 2 kicks from 45+ in rain',2,200,g=>g&&dist>=45&&isW('rain')],['d12','Make 3 kicks in the rain',3,120,g=>g&&isW('rain')],['d13','Make 3 kicks in the snow',3,120,g=>g&&isW('snow')],['d14','Make a 45+ yarder in the snow',1,180,g=>g&&dist>=45&&isW('snow')],['d15','Make a kick into a 20+ mph wind',1,150,g=>g&&wind.mph>=20],['d16','Make 3 kicks in 10+ mph wind',3,120,g=>g&&wind.mph>=10],['d17','Make 2 kicks in 15+ mph wind',2,150,g=>g&&wind.mph>=15],['d18','Hit a perfect, dead-center kick',1,120,g=>g&&Math.abs(ball.x)<0.5],['d19','Hit 3 dead-center kicks',3,220,g=>g&&Math.abs(ball.x)<0.5],['d20','Make 3 in a row',1,80,g=>g&&streak>=3],
['d21','Make 5 in a row',1,150,g=>g&&streak>=5],['d22','Make 8 in a row',1,250,g=>g&&streak>=8],['d23','Make 3 in a row in Hurricane',1,250,g=>g&&mode==='hurricane'&&streak>=3],['d24','Make 2 Hurricane kicks',2,150,g=>g&&mode==='hurricane'],['d25','Make a 40+ yarder in Hurricane',1,220,g=>g&&mode==='hurricane'&&dist>=40],['d26','Make a game-winner in Pressure Kick',1,200,g=>g&&mode==='pressure'&&S3.cl()],['d27','Make 3 Pressure Kick kicks',3,150,g=>g&&mode==='pressure'],['d28','Reach round 5 in Pressure Kick',1,200,g=>g&&mode==='pressure'&&streak>=5],['d29','Score 3,000 in Classic',1,150,g=>mode==='classic'&&score>=3000],['d30','Score 6,000 in Classic',1,250,g=>mode==='classic'&&score>=6000],
['d31','Make 8 kicks in Time Attack',8,150,g=>g&&mode==='time'],['d32','Score 2,000 in Time Attack',1,180,g=>mode==='time'&&score>=2000],['d33','Make 5 Chaos kicks',5,150,g=>g&&mode==='chaos'],['d34','Make a 45+ yarder in Chaos',1,180,g=>g&&mode==='chaos'&&dist>=45],['d35','Make 4 Career kicks',4,120,g=>g&&mode==='career'],['d36','Make a clutch Career kick',1,200,g=>g&&mode==='career'&&S3.cl()],['d37','Make the Daily Challenge kick',1,100,g=>g&&mode==='daily'],['d38','Make 3 kicks in fog or gusts',3,150,g=>g&&(isW('fog')||isW('gust'))],['d39','Make 4 kicks in a Play a Friend match',4,120,g=>g&&mode==='vs'],['d40','Make a 50+ yarder in wind 10+',1,220,g=>g&&dist>=50&&wind.mph>=10],
['d41','Make 2 kicks from 35+ in rain or snow',2,140,g=>g&&dist>=35&&(isW('rain')||isW('snow'))],['d42','Make 6 kicks without a block',6,100,g=>g&&clean()],['d43','Make a 70+ yarder',1,300,g=>g&&dist>=70],['d44','Make 12 kicks',12,140,g=>g]];
const DCBON=200;
function dcSet(k){let s=0;for(const ch of k)s=(s*31+ch.charCodeAt(0))>>>0;s=(s*2654435761)>>>0;const r=()=>(s=(s*1103515245+12345)%2147483648)/2147483648;const idx=[...DCH.keys()];for(let i=idx.length-1;i>0;i--){const j=r()*(i+1)|0;[idx[i],idx[j]]=[idx[j],idx[i]]}return idx.slice(0,3)}
let DC=J('fgfDC',null);function dcCheck(){const k=dkey(new Date());if(!DC||DC.d!==k){DC={d:k,ids:dcSet(k),p:[0,0,0],done:[0,0,0],bon:0};SV('fgfDC',DC)}return DC}dcCheck();
const oR8=S3.onResult;S3.onResult=function(good){oR8(good);if((mode==='tut'||mode==='range'))return;dcCheck();DC.ids.forEach((ci,k)=>{if(DC.done[k])return;const c=DCH[ci];let ok=false;try{ok=c[4](good)}catch(e){}if(ok){DC.p[k]=Math.min(c[2],DC.p[k]+1);if(DC.p[k]>=c[2]){DC.done[k]=1;addCoins(c[3]);toast('🎯 DAILY DONE  🪙 +'+c[3])}}});
 if(!DC.bon&&DC.done.every(Boolean)){DC.bon=1;addCoins(DCBON);setTimeout(()=>toast('🎯 ALL 3 DAILY CHALLENGES!  🪙 +'+DCBON),1400)}SV('fgfDC',DC)};
function chalTabs(){const tw=W*0.42,y=H*0.08+30;bx(W/2-tw-4,y,tw,28,'🎯 DAILY '+dcCheck().done.filter(Boolean).length+'/3',()=>state='chal',state==='chal',12);bx(W/2+4,y,tw,28,'📋 WEEKLY '+WK.done.reduce((a,b)=>a+b,0)+'/3',()=>state='week',state==='week',12)}
function drawChal(){dcCheck();txt('DAILY CHALLENGES',W/2,H*0.08,Math.min(26,W*0.07),GOLD,'#063');const n=new Date(),m=new Date(n.getFullYear(),n.getMonth(),n.getDate()+1)-n,hh=m/3.6e6|0,mm=(m/6e4|0)%60,ss=(m/1e3|0)%60;ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('Same 3 for everyone today · new ones in '+hh+':'+String(mm).padStart(2,'0')+':'+String(ss).padStart(2,'0'),W/2,H*0.08+20);chalTabs();
 const y0=H*0.08+70,rh=Math.min(92,(H*0.86-y0-60)/3);DC.ids.forEach((ci,k)=>{const c=DCH[ci],y=y0+k*rh;panel(W*0.05,y,W*0.9,rh-8);ctx.textAlign='left';ctx.fillStyle=DC.done[k]?'#7fd38a':'#fff';ctx.font='900 14px system-ui';ctx.fillText((DC.done[k]?'✔ ':'')+c[1],W*0.09,y+24);ctx.fillStyle=GOLD;ctx.font='900 12px system-ui';ctx.fillText('🪙 '+c[3],W*0.09,y+44);ctx.fillStyle='#223';ctx.fillRect(W*0.09,y+rh-30,W*0.82,11);ctx.fillStyle=DC.done[k]?'#3ddc84':GOLD;ctx.fillRect(W*0.09,y+rh-30,W*0.82*DC.p[k]/c[2],11);ctx.fillStyle='#fff';ctx.font='10px system-ui';ctx.textAlign='right';ctx.fillText(DC.p[k]+' / '+c[2],W*0.91,y+44)});
 const yb=y0+3*rh;panel(W*0.05,yb,W*0.9,44);ctx.textAlign='center';ctx.fillStyle=DC.bon?'#7fd38a':GOLD;ctx.font='900 13px system-ui';ctx.fillText(DC.bon?'✔ ALL-3 BONUS EARNED  🪙 +'+DCBON:'Complete all 3 for a bonus  🪙 +'+DCBON,W/2,yb+27);
 bx(W/2-90,H*0.93-20,180,40,'◀ MENU',()=>state='title',true,15)}
const oS8=S3.screen;S3.screen=function(){if(state==='chal'){BTN=[];drawChal();return true}const r=oS8.apply(this,arguments);if(state==='week')chalTabs();return r};
menuExtras=(function(){const y=()=>H*0.255;return function(){const yy=y(),w=(W*0.88-12)/3,x0=W*0.06,pd=lsPending();
 chip(x0,yy,w,26,pd?'🎁 DAY '+pd+' +'+LSR[pd-1]:'🎁 DAY '+LSS.day+' ✔',()=>{if(pd)lsClaim();else toast('Streak day '+LSS.day+' · come back tomorrow')},!!pd);
 chip(x0+w+6,yy,w,26,'🎯 DAILY '+dcCheck().done.filter(Boolean).length+'/3',()=>state='chal');
 chip(x0+2*(w+6),yy,w,26,KOTW?'⭐ KOTW '+KOTW.d+'y':'⭐ KICK OF WK',()=>state='kotw');
 if(ST.un&&ST.name){ctx.fillStyle='#bcd';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText('🏟️ '+ST.name,W/2,yy-4)}}})();
