// s42 (Batch 3, progression): cosmetic perk/title tree, career stats, milestone rewards. Levels/XP, Stats, Hall of Fame and the Daily Spin already exist (s20).
(function(){
const st=()=>Object.assign({k:0,m:0,long:0,dk:0,pf:0,g:0,ds:0},J('fgfStats2',{})),lv=()=>FGF_LV().l;
// ---- perk / title tree (cosmetic only: each node = a title + a badge next to your name) ----
const TREE=[['STYLE','🎨',[['Smooth Operator','✨'],['Showtime','🎬'],['Highlight Reel','📹'],['Mr. Primetime','🌟']]],
 ['CROWD','📣',[['Fan Favorite','👏'],['Crowd Pleaser','🙌'],['Stadium Shaker','🏟️'],['Thunder Foot','⚡']]],
 ['LEGACY','🏛️',[['Steady Leg','🦵'],['Clutch Gene','🧊'],['Record Breaker','📈'],['Immortal','👑']]]];
const REQ=k=>[2,6,12,20][k];// level needed for tier k
const got=()=>J('fgfPerks',[]),pts=()=>Math.max(0,lv()-1)-got().length;window.FGF_PERKS={TREE,got,pts};
function canBuy(b,k){const g=got(),id=b+'_'+k;return !g.includes(id)&&pts()>0&&lv()>=REQ(k)&&(k===0||g.includes(b+'_'+(k-1)))}
function buy(b,k){if(!canBuy(b,k))return;const g=got();g.push(b+'_'+k);SV('fgfPerks',g);LS.fgfTitleEq=b+'_'+k;try{sfx.cheer()}catch(e){}toast('🌳 Title unlocked: '+TREE[b][2][k][0])}
const oT=FGF_TITLE;window.FGF_TITLE=FGF_TITLE=function(){const e=LS.fgfTitleEq;if(e&&got().includes(e)){const [b,k]=e.split('_').map(Number);const n=TREE[b]&&TREE[b][2][k];if(n)return n[1]+' '+n[0]}return oT()};
// ---- milestones ----
const MS=[['m100','100 lifetime makes',s=>s.m>=100,300],['m500','500 lifetime makes',s=>s.m>=500,800],['m1k','1,000 lifetime makes',s=>s.m>=1000,1500],['m5k','5,000 lifetime makes',s=>s.m>=5000,4000],
 ['k1k','1,000 kicks taken',s=>s.k>=1000,600],['l50','Make one from 50+',s=>s.long>=50,200],['l60','Make one from 60+',s=>s.long>=60,400],['l70','Make one from 70+',s=>s.long>=70,700],
 ['lg1','First Legend 80-yarder',()=>+(LS.fgfLegend||0)>=1,500],['lg10','10 Legend kicks',()=>+(LS.fgfLegend||0)>=10,2000],['dk25','25 doink-ins',s=>s.dk>=25,500],['pf50','50 perfect kicks',s=>s.pf>=50,600],
 ['g100','Finish 100 runs',s=>s.g>=100,700],['v10','Reach level 10',()=>lv()>=10,500],['v20','Reach level 20',()=>lv()>=20,1200],['v30','Reach level 30',()=>lv()>=30,2500]];
const msC=()=>J('fgfMS',{}),ready=()=>{const s=st(),c=msC();return MS.filter(m=>!c[m[0]]&&m[2](s))};window.FGF_MSREADY=()=>ready().length;
function claim(m){const c=msC();if(c[m[0]])return;c[m[0]]=Date.now();SV('fgfMS',c);addCoins(m[3]);try{sfx.cheer()}catch(e){}toast('🎖️ '+m[1]+'  🪙 +'+m[3])}
let pg=0;
function head(t,s){txt(t,W/2,H*0.07,Math.min(26,W*0.07),GOLD,'#063');if(s){ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(s,W/2,H*0.07+22,W*0.9)}}
function back(to){bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state=to,false,14)}
const osc=S3.screen;S3.screen=function(){
 if(state==='perks'){BTN=[];head('🌳 PERKS & TITLES',pts()+' point'+(pts()===1?'':'s')+' to spend · 1 per level · cosmetic only');const g=got(),cw=W*0.3,gx=W*0.035,y0=H*0.15,rh=Math.min(92,(H*0.83-y0-24)/4);
  TREE.forEach((br,b)=>{const x=gx+b*(cw+W*0.0175);ctx.textAlign='center';ctx.fillStyle=GOLD;ctx.font='900 '+(W<350?11:13)+'px system-ui';ctx.fillText(br[1]+' '+br[0],x+cw/2,y0+12);
   br[2].forEach((n,k)=>{const y=y0+24+k*rh,id=b+'_'+k,ow=g.includes(id),ok=canBuy(b,k),eqd=LS.fgfTitleEq===id;
    bx(x,y,cw,rh-10,'',()=>{if(ow){LS.fgfTitleEq=id;toast('Title equipped: '+n[0])}else if(ok)buy(b,k);else toast(lv()<REQ(k)?'Reach level '+REQ(k)+' first':k&&!g.includes(b+'_'+(k-1))?'Unlock the one above first':'No perk points · level up')},eqd,11);
    ctx.save();if(!ow&&!ok)ctx.globalAlpha=0.5;ctx.textAlign='center';ctx.font=(rh*0.26|0)+'px system-ui';ctx.fillText(n[1],x+cw/2,y+rh*0.3);ctx.fillStyle='#fff';ctx.font='900 '+(W<350?9:11)+'px system-ui';ctx.fillText(n[0],x+cw/2,y+rh*0.53,cw-6);ctx.fillStyle=eqd?'#063':ow?'#7dff6a':'#bcd';ctx.font=(W<350?9:10)+'px system-ui';ctx.fillText(eqd?'EQUIPPED':ow?'Tap to equip':'Lv '+REQ(k)+' · 1 pt',x+cw/2,y+rh*0.73,cw-6);ctx.restore();
    if(k<3){ctx.strokeStyle='rgba(242,194,48,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+cw/2,y+rh-10);ctx.lineTo(x+cw/2,y+rh);ctx.stroke()}})});
  if(LS.fgfTitleEq)bx(W*0.25,H*0.84,W*0.5,28,'Use level title',()=>{delete LS.fgfTitleEq},false,11);back('stats');return true}
 if(state==='miles'){BTN=[];const s=st(),c=msC();head('🎖️ MILESTONES',ready().length+' ready to claim · one-time coin rewards');const y0=H*0.13,rh=Math.max(40,Math.min(52,(H*0.8-y0)/8)),per=Math.floor((H*0.83-y0)/rh),pages=Math.ceil(MS.length/per);if(pg>=pages)pg=0;
  MS.slice(pg*per,pg*per+per).forEach((m,i)=>{const y=y0+i*rh,dn=!!c[m[0]],ok=!dn&&m[2](s);panel(W*0.05,y,W*0.9,rh-6);ctx.textAlign='left';ctx.fillStyle=dn?'#8a9':'#fff';ctx.font='900 '+(W<350?12:13)+'px system-ui';ctx.fillText((dn?'✔ ':'')+m[1],W*0.09,y+(rh-6)*0.42,W*0.5);ctx.fillStyle=GOLD;ctx.font='11px system-ui';ctx.fillText('🪙 '+m[3].toLocaleString(),W*0.09,y+(rh-6)*0.78);
   if(ok)bx(W*0.66,y+(rh-6)/2-14,W*0.26,28,'CLAIM',()=>claim(m),true,12);else{ctx.textAlign='right';ctx.fillStyle='#9ab';ctx.font='11px system-ui';ctx.fillText(dn?'Claimed':'Locked',W*0.91,y+(rh-6)*0.6)}});
  if(pages>1){bx(W*0.05,H*0.835,56,28,'◀',()=>pg=(pg+pages-1)%pages,false,13);bx(W*0.95-56,H*0.835,56,28,'▶',()=>pg=(pg+1)%pages,false,13);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Page '+(pg+1)+' / '+pages,W/2,H*0.835+18)}back('stats');return true}
 if(state==='cstats'){BTN=[];head('🏈 CAREER STATS','Best in every mode');const R=[];[['classic','Classic'],['time','Time Attack'],['pressure','Pressure'],['hurricane','Hurricane'],['chaos','Chaos']].forEach(m=>R.push([m[1],(+(localStorage[BKEY(m[0])]||0)).toLocaleString()]));
  R.push(['Trick Shots',+(LS.fgfTrickBest||0)]);(window.FGF_MODES2||[]).forEach(m=>R.push([m[2].charAt(0)+m[2].slice(1).toLowerCase(),+(LS['fgfMM_'+m[0]]||0)]));R.push(['Perks unlocked',got().length+' / 12']);R.push(['Milestones',Object.keys(msC()).length+' / '+MS.length]);
  const y0=H*0.13,rh=Math.min(40,(H*0.85-y0)/R.length);R.forEach((r,i)=>{const y=y0+i*rh;panel(W*0.06,y,W*0.88,rh-4);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='bold '+Math.min(13,rh*0.36)+'px system-ui';ctx.fillText(r[0],W*0.1,y+rh*0.58);ctx.textAlign='right';ctx.fillStyle=GOLD;ctx.fillText(String(r[1]),W*0.9,y+rh*0.58)});back('stats');return true}
 const r=osc.apply(this,arguments);
 if(state==='stats'){const bw=W*0.28,y=H*0.835;bx(W*0.04,y,bw,30,'🌳 PERKS'+(pts()?' ('+pts()+')':''),()=>state='perks',pts()>0,11);bx(W*0.36,y,bw,30,(W<350?'MILESTONES':'🎖️ MILESTONES')+(ready().length&&W>=350?' ('+ready().length+')':''),()=>{pg=0;state='miles'},ready().length>0,10);bx(W*0.68,y,bw,30,'🏈 CAREER',()=>state='cstats',false,11)}
 return r};
})();
