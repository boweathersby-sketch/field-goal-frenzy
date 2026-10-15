// s44 (Batch 5, shop): Bonus Center with daily free gift, Lucky Hour, Coin-Doubler Weekend, coin bundles, Collection Book rewards, gifting to friends; more holiday items.
(function(){
const NOW=()=>window.FGF_DATE?new Date(FGF_DATE):new Date(),DK=window.FGF_DK||(()=>NOW().toDateString()),R=Math.random;
const SBU='https://fdmcgupjmjfpraznmsew.supabase.co',KEY=()=>(window.FGF_ONLINE&&(FGF_ONLINE.anonKey||FGF_ONLINE.key))||'sb_publishable_944lD1vIQwA5DGifZqbFJw_AuC1xUkz';
async function api(path,opt){const r=await fetch(SBU+'/rest/v1/'+path,Object.assign({},opt,{headers:Object.assign({apikey:KEY(),Authorization:'Bearer '+KEY(),'Content-Type':'application/json'},(opt&&opt.headers)||{})}));const t=await r.text();if(!r.ok){const e=new Error(t);e.off=/42P01|PGRST20|Could not find|does not exist|42501|permission/.test(t);throw e}return t?JSON.parse(t):null}
const uid=()=>{let id=LS.fgfUID;if(!id){id='u'+R().toString(36).slice(2)+Date.now().toString(36);LS.fgfUID=id}return id};
const tester=()=>!!window.TESTER;
// ---- more holiday items (LIMITED, only sold during their dates; owners keep them) ----
const C=window.FGF_CAT;const HOL=[['ny',[1,1],[1,10],'🎉 LIMITED · ends Jan 10',[['tzny','Midnight Countdown 🎉',['#ffd23f','#c0c0ff'],1200]],[['fgzny','New Year Flag 🎉',{stars:1},900]]],
 ['val',[2,1],[2,14],'💘 LIMITED · ends Feb 14',[['tzval','Cupid Hearts 💘',['#ff2d6f','#ffc2d6'],1200]],[['fgzval','Hearts Flag 💘',{stripes:['#ff2d6f','#ffffff']},900]]],
 ['stp',[3,1],[3,17],'☘️ LIMITED · ends Mar 17',[['tzstp','Shamrock Streak ☘️',['#00a651','#b6ffb0'],1200]],[['fgzstp','Lucky Clover Flag ☘️',{check:['#00a651','#ffffff']},900]]],
 ['spr',[4,1],[4,30],'🌷 LIMITED · ends Apr 30',[['tzspr','Spring Bloom 🌷',['#ff9ad5','#a0e7ff']]],[['fgzspr','Pastel Flag 🌷',{stripes:['#ff9ad5','#a0e7ff']},900]]],
 ['sum',[6,15],[8,31],'🏖️ LIMITED · ends Aug 31',[['tzsum','Summer Sunset 🏖️',['#ff7a00','#ffe066']]],[['fgzsum','Beach Flag 🏖️',{stripes:['#00b4d8','#ffe066']},900]]]];
const inR=(d,a,b)=>{const m=d.getMonth()+1,x=d.getDate(),v=m*100+x;return v>=a[0]*100+a[1]&&v<=b[0]*100+b[1]};
window.FGF_HOL2=HOL;
if(C){const tab=n=>SHOP.find(c=>c[0]===n);HOL.forEach(h=>{const live=inR(NOW(),h[1],h[2])||tester();h[4].forEach(t=>{C.TRX[t[0]]=t[2];const it=[t[0],t[1],t[3]||1200];ITEM[t[0]]=it;FGF_LIMITED[t[0]]=h[3];if((live||own.includes(t[0]))&&tab('TRAILS')&&!tab('TRAILS')[1].some(a=>a[0]===t[0]))tab('TRAILS')[1].push(it)});
 h[5].forEach(f=>{C.FLX[f[0]]=f[2];const it=[f[0],f[1],f[3]];ITEM[f[0]]=it;FGF_LIMITED[f[0]]=h[3];if((live||own.includes(f[0]))&&tab('FLAGS')&&!tab('FLAGS')[1].some(a=>a[0]===f[0]))tab('FLAGS')[1].push(it)})})}
// ---- boosts: Lucky Hour (1 random hour a day, 1.5x kick coins) and Coin-Doubler Weekend (first weekend of each month, 2x) ----
const hash=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)};
const luckyH=()=>12+hash(DK())%10;// noon to 9 PM local
const isLucky=()=>NOW().getHours()===luckyH();
const isDbl=()=>{const d=NOW(),g=d.getDay();return (g===6&&d.getDate()<=7)||(g===0&&d.getDate()<=8&&d.getDate()>=2)};
const mult=()=>isDbl()?2:isLucky()?1.5:1;window.FGF_BOOST=()=>({lucky:isLucky(),dbl:isDbl(),mult:mult(),hour:luckyH()});
const NOB=['trick','tut','legendc','h2h','ghost'];
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{const m=mult();if(good&&m>1&&!NOB.includes(mode)&&!String(mode).startsWith('mm_')&&ball.res==='GOOD!'){const base=dist>=80?500:Math.round(3*Math.pow(1.08,dist-20))+(streak>1?2:0),ex=Math.min(250,Math.round(base*(m-1)));if(ex>0){addCoins(ex);FGF_POP((isDbl()?'💰 2X WEEKEND':'🍀 LUCKY HOUR')+' +'+ex,'#7dff6a',0.7)}}}catch(e){}return r};
// ---- daily free gift ----
const giftReady=()=>LS.fgfGift!==DK();window.FGF_GIFTREADY=giftReady;
function cheapUnowned(){const L=[];SHOP.forEach(t=>{if(['WEATHER','EXTRAS','PACKS','AD ITEMS','MENU'].includes(t[0]))return;t[1].forEach(i=>{if(i[2]>0&&i[2]<=400&&!own.includes(i[0])&&!(window.FGF_LIMITED&&FGF_LIMITED[i[0]]))L.push(i)})});return L}
function claimGift(){if(!giftReady())return;LS.fgfGift=DK();const L=cheapUnowned();if(L.length&&R()<0.25){const it=L[R()*L.length|0];own.push(it[0]);SV('fgfOwn',own);toast('🎁 Daily gift: '+it[1]+'!');GIFT={t:performance.now(),s:it[1]}}else{const n=[50,75,100,100,125,150][R()*6|0];addCoins(n);toast('🎁 Daily gift  🪙 +'+n);GIFT={t:performance.now(),s:'🪙 +'+n}}try{sfx.cheer()}catch(e){}}
let GIFT=null;
// ---- bundles: 3 themed unowned items, 30% off ----
const THEMES=[['🌈 Neon Night','neon'],['🔥 Fire & Ice','fire|ice|flame|frost'],['🥇 Gold Rush','gold|golden'],['🌌 Cosmic','galaxy|cosmic|star|nebula|comet'],['🌊 Ocean','ocean|wave|aqua|sea|beach'],['🍬 Candy Shop','candy|bubble|pink|cotton']];
function bundle(th){const re=new RegExp(th[1],'i'),L=[],seen=new Set();for(const t of SHOP){if(['WEATHER','EXTRAS','PACKS','AD ITEMS'].includes(t[0]))continue;const it=t[1].find(i=>re.test(i[1])&&i[2]>0&&!own.includes(i[0])&&!(window.FGF_LIMITED&&FGF_LIMITED[i[0]])&&!seen.has(t[0]));if(it){L.push(it);seen.add(t[0])}if(L.length>=3)break}const full=L.reduce((a,i)=>a+i[2],0);return{n:th[0],L,full,pr:Math.round(full*0.7/10)*10}}
function buyBundle(b){if(b.L.length<2)return;if(!tester()&&coins<b.pr){toast('Not enough coins · need 🪙 '+b.pr.toLocaleString());return}if(!tester())addCoins(-b.pr);b.L.forEach(i=>{if(!own.includes(i[0]))own.push(i[0])});SV('fgfOwn',own);try{sfx.cheer()}catch(e){}toast('📦 '+b.n+' bundle unlocked · '+b.L.length+' items')}
// ---- collection book: finish a category for a one-time reward; finish everything for a big one ----
const BOOK=()=>SHOP.filter(t=>!['WEATHER','EXTRAS','PACKS','AD ITEMS'].includes(t[0])&&t[1].length).map(t=>{const n=t[1].length,o=t[1].filter(i=>own.includes(i[0])||i[2]===0).length;return{k:t[0],n,o,rw:Math.min(2000,200+n*15)}});
const bookC=()=>J('fgfBook',{});function claimBook(k,rw){const c=bookC();if(c[k])return;c[k]=1;SV('fgfBook',c);addCoins(rw);try{sfx.cheer()}catch(e){}toast('📚 '+k+' complete  🪙 +'+rw)}
// ---- gifting ----
const code8=()=>{const A='ABCDEFGHJKMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<8;i++)s+=A[R()*A.length|0];return s};
async function sendGift(it){if(tester()){toast('Gifting is off in tester mode');return}if(coins<it[2]){toast('Not enough coins');return}const c=code8();
 try{await api('gifts',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({code:c,item_id:it[0],from_ini:LS.fgfOLIni||null,price:it[2]})});addCoins(-it[2]);const t='🎁 I sent you "'+it[1]+'" in Field Goal Frenzy! Open the game, then Events › Bonus Center › Redeem gift: '+c+'  '+location.origin+location.pathname+'?gift='+c;
  if(navigator.share)navigator.share({text:t}).catch(()=>{});else if(navigator.clipboard){navigator.clipboard.writeText(t)}toast('🎁 Gift code '+c+' · share it with your friend');GSENT={c,n:it[1]}}catch(e){toast(e.off?'Gifting is switching on soon':'Could not send gift')}}
async function redeemGift(c){c=(c||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(c.length!==8){toast('Gift codes are 8 letters');return}
 try{const r=await api('rpc/claim_gift',{method:'POST',body:JSON.stringify({p_code:c,p_device:uid()})});if(!r||!r[0]){toast('That gift was already opened or does not exist');return}const g=r[0];
  if(own.includes(g.item_id)||!ITEM[g.item_id]){const n=Math.min(g.price,5000);addCoins(n);toast('🎁 Gift from '+(g.from_ini||'a friend')+' · you already own it, so 🪙 +'+n)}else{own.push(g.item_id);SV('fgfOwn',own);toast('🎁 Gift from '+(g.from_ini||'a friend')+': '+ITEM[g.item_id][1]+'!')}try{sfx.cheer()}catch(e){}}catch(e){toast(e.off?'Gifting is switching on soon':'Could not open gift · try again')}}
const gq=new URLSearchParams(location.search).get('gift');if(gq)setTimeout(()=>redeemGift(gq),4000);
let GSENT=null,BC={tab:0,pg:0,gpg:0};window.FGF_BC=BC;window.FGF_BONUSTEST={claimGift,bundle,THEMES,buyBundle,BOOK,claimBook,redeemGift,sendGift};
// ---- screen ----
function head(t,s){txt(t,W/2,H*0.07,Math.min(26,W*0.07),GOLD,'#063');if(s){ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(s,W/2,H*0.07+22,W*0.92)}}
function note(t,y,c){ctx.fillStyle=c||'#bcd';ctx.font=(W<350?12:13)+'px system-ui';ctx.textAlign='center';ctx.fillText(t,W/2,y,W*0.9)}
const TB=['🎁 TODAY','📦 BUNDLES','📚 BOOK','💝 GIFT'];
const osc=S3.screen;S3.screen=function(){
 if(state==='bonus'){BTN=[];const b=FGF_BOOST();head('🎁 BONUS CENTER','🪙 '+(window.CSTR?CSTR():coins));const tw=W*0.92/4;TB.forEach((t,i)=>bx(W*0.04+i*tw,H*0.115,tw-4,30,W<350?t.split(' ')[0]:t,()=>{BC.tab=i;BC.pg=0},BC.tab===i,W<350?15:11));const y0=H*0.115+44;
  if(BC.tab===0){panel(W*0.06,y0,W*0.88,110);txt('🎁 DAILY FREE GIFT',W/2,y0+24,16,GOLD);note(giftReady()?'Coins or a surprise item · once a day':'Opened today · come back tomorrow',y0+46);if(giftReady())bx(W*0.25,y0+58,W*0.5,40,'OPEN GIFT',claimGift,true,15);else if(GIFT&&performance.now()-GIFT.t<8000)note(GIFT.s,y0+82,'#fff');
   const y1=y0+124;panel(W*0.06,y1,W*0.88,70);txt('🍀 LUCKY HOUR',W/2,y1+22,15,b.lucky?'#7dff6a':GOLD);const h=b.hour,hs=(h%12||12)+(h<12?' AM':' PM');note(b.lucky?'LIVE NOW · kick coins x1.5':'Today at '+hs+' · kick coins x1.5 for an hour',y1+46);
   const y2=y1+84;panel(W*0.06,y2,W*0.88,70);txt('💰 COIN-DOUBLER WEEKEND',W/2,y2+22,15,b.dbl?'#7dff6a':GOLD);note(b.dbl?'LIVE NOW · kick coins x2 all weekend':'First weekend of every month · kick coins x2',y2+46);
   note('Boosts apply to normal kicks (bonus capped per kick)',y2+92)}
  if(BC.tab===1){const L=THEMES.map(bundle).filter(x=>x.L.length>=2);if(!L.length)note('You own everything in our bundles!',y0+40);const rh=Math.min(96,(H*0.84-y0)/Math.min(4,L.length||1)),per=Math.max(1,Math.floor((H*0.84-y0)/rh)),pages=Math.ceil(L.length/per);if(BC.pg>=pages)BC.pg=0;
   L.slice(BC.pg*per,BC.pg*per+per).forEach((x,i)=>{const y=y0+i*rh;panel(W*0.05,y,W*0.9,rh-8);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?13:15)+'px system-ui';ctx.fillText(x.n+' bundle',W*0.08,y+20,W*0.5);ctx.font='11px system-ui';ctx.fillStyle='#bcd';x.L.forEach((it,k)=>ctx.fillText('• '+it[1],W*0.08,y+38+k*14,W*0.55));
    ctx.textAlign='right';ctx.fillStyle='#9ab';ctx.font='11px system-ui';ctx.fillText('was 🪙 '+x.full.toLocaleString(),W*0.92,y+20);bx(W*0.66,y+30,W*0.26,32,'🪙 '+x.pr.toLocaleString(),()=>buyBundle(x),true,12);ctx.fillStyle='#7dff6a';ctx.textAlign='right';ctx.font='900 10px system-ui';ctx.fillText('30% OFF',W*0.92,y+76)});
   if(pages>1){bx(W*0.05,H*0.85,56,28,'◀',()=>BC.pg=(BC.pg+pages-1)%pages,false,13);bx(W*0.95-56,H*0.85,56,28,'▶',()=>BC.pg=(BC.pg+1)%pages,false,13)}}
  if(BC.tab===2){const B=BOOK(),c=bookC(),tot=B.reduce((a,x)=>a+x.n,0),ow=B.reduce((a,x)=>a+x.o,0);note('Collection '+ow+' / '+tot+' · finish a page for a one-time reward',y0+10);const rh=Math.max(30,Math.min(40,(H*0.83-y0-24)/Math.ceil(B.length/2))),cw=W*0.44;
   B.forEach((x,i)=>{const col=i%2,row=i/2|0,xx=W*0.05+col*(cw+W*0.02),y=y0+22+row*rh,done=x.o>=x.n,cl=c[x.k];panel(xx,y,cw,rh-4);ctx.fillStyle='rgba(242,194,48,.3)';ctx.fillRect(xx+2,y+rh-10,(cw-4)*x.o/x.n,4);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?10:11)+'px system-ui';ctx.fillText(x.k,xx+6,y+(rh-4)*0.45,cw*0.5);ctx.font='10px system-ui';ctx.fillStyle='#bcd';ctx.fillText(x.o+'/'+x.n,xx+6,y+(rh-4)*0.8);
    if(done&&!cl)bx(xx+cw*0.5,y+3,cw*0.48,rh-12,'🪙 '+x.rw,()=>claimBook(x.k,x.rw),true,10);else{ctx.textAlign='right';ctx.fillStyle=cl?'#7dff6a':'#9ab';ctx.fillText(cl?'✔ claimed':'🪙 '+x.rw,xx+cw-6,y+(rh-4)*0.6)}});
   const all=ow>=tot&&tot>0,cl=c.__all;if(all&&!cl)bx(W*0.2,H*0.84,W*0.6,30,'🏆 COMPLETE BOOK · 🪙 10,000',()=>claimBook('__all',10000),true,12);else note(cl?'🏆 Whole book complete!':'Finish the whole book: 🪙 10,000',H*0.86)}
  if(BC.tab===3){note('Send a cosmetic to a friend: you pay its price, they get the item.',y0+10);note('If they already own it, they get the coins instead.',y0+28);bx(W*0.15,y0+40,W*0.7,36,'🔑 REDEEM A GIFT CODE',()=>{const c=prompt('Gift code (8 letters)');if(c)redeemGift(c)},true,13);
   if(GSENT)note('Last gift: '+GSENT.n+' · code '+GSENT.c,y0+92,'#fff');const L=cheapUnowned().concat(SHOP.filter(t=>['BALLS','TRAILS'].includes(t[0])).flatMap(t=>t[1].filter(i=>i[2]>400&&i[2]<=2500&&!(window.FGF_LIMITED&&FGF_LIMITED[i[0]])))).slice(0,60),rh=36,y1=y0+100,per=Math.max(1,Math.floor((H*0.84-y1)/rh)),pages=Math.max(1,Math.ceil(L.length/per));if(BC.gpg>=pages)BC.gpg=0;
   L.slice(BC.gpg*per,BC.gpg*per+per).forEach((it,i)=>{const y=y1+i*rh;panel(W*0.05,y,W*0.9,rh-4);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 12px system-ui';ctx.fillText(it[1],W*0.08,y+21,W*0.5);bx(W*0.62,y+3,W*0.3,rh-10,'💝 🪙 '+it[2].toLocaleString(),()=>{if(confirm('Send "'+it[1]+'" as a gift for '+it[2]+' coins?'))sendGift(it)},false,11)});
   if(pages>1){bx(W*0.05,H*0.85,56,28,'◀',()=>BC.gpg=(BC.gpg+pages-1)%pages,false,13);bx(W*0.95-56,H*0.85,56,28,'▶',()=>BC.gpg=(BC.gpg+1)%pages,false,13)}}
  bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='hub',false,14);return true}
 return osc.apply(this,arguments)};
})();
