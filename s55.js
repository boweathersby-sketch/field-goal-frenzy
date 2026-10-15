// s55 (Kirk, Oct 15): AD ITEMS 2.0. 170+ watch-ads-only cosmetics (tees, kick FX, sideline props, balls, trails,
// celebrations, horns, chants, flags). No daily watch limit: every item can be worked on anytime.
// "Featured Today" = 12 items picked by a date seed (same for everyone, changes at local midnight); a featured ad counts +1 extra.
// The old ad-only cleats/gloves/visors (no longer drawn) become tees / kick FX / sideline props; owners and progress carry over.
// Stays locked until ads are live (FGF_ADS_ON); tester mock can preview. Never on the kicker art.
(function(){const C=window.FGF_CAT,G2=window.FGF_GEAR2;if(!C||!G2||!window.FGF_ADITEMS)return;
const T_=t=>window.FGF_TR?FGF_TR(t):t,LOOK=G2.LOOK,I=[];const A=(id,nm,n,kind)=>{if(!I.some(x=>x[0]===id))I.push([id,nm,n,kind])};
// keep the existing ad trails + flags (same ids)
FGF_ADITEMS.filter(x=>x[3]==='TRAIL'||x[3]==='FLAG').forEach(x=>A(...x));
// convert the 13 ad-only cleats/gloves/visors: same names (re-themed), same ad counts, ownership + progress move over
const CONV=[['cad0','cTad0','Prism Tee',['rainbow'],'TEE'],['cad1','cTad1','Aurora Tee',['#00ff9d','#7a00ff'],'TEE'],['cad2','cTad2','Obsidian Tee',['#111','#444'],'TEE'],['cad3','cTad3','Starlight Tee',['ice'],'TEE'],
 ['gad0','gKad0','Prism Sparks',['spark','#00e5ff'],'KICK FX'],['gad1','gKad1','Aurora Ring',['ring','#7a00ff'],'KICK FX'],['gad2','gKad2','Obsidian Pop',['pixel'],'KICK FX'],['gad3','gKad3','Starlight Burst',['stars','#ffffff'],'KICK FX'],
 ['vad0','vSad0','Prism Speakers',['speakers'],'SIDELINE'],['vad1','vSad1','Aurora Fog',['fog'],'SIDELINE'],['vad2','vSad2','Obsidian Tower',['tower'],'SIDELINE'],['vad3','vSad3','Royal Banner',['flags'],'SIDELINE'],['vad4','vSad4','Starlight Balloon',['balloon'],'SIDELINE']];
const oldN={};FGF_ADITEMS.forEach(x=>oldN[x[0]]=x[2]);
CONV.forEach(([o,id,nm,lk,k])=>{LOOK[id]=lk;A(id,nm,oldN[o]||4,k)});
try{const P=J('fgfAdProg',{});let ch=0;CONV.forEach(([o,id])=>{if(own.includes(o)&&!own.includes(id)){own.push(id);ch=1}if(P[o]&&!P[id]){P[id]=P[o];ch=1}const s=slot(o);if(eq[s]===o){eq[slot(id)]=id;ch=1}});if(ch){SV('fgfOwn',own);SV('fgfAdProg',P);SV('fgfEq',eq)}}catch(e){}
// ---- generated catalog ----
const COL=[['Ruby','#e0115f'],['Sapphire','#0f52ba'],['Emerald','#00a86b'],['Amber','#ffbf00'],['Amethyst','#9966cc'],['Coral','#ff7f50'],['Mint','#3eb489'],['Cobalt','#0047ab'],['Crimson','#dc143c'],['Teal','#00a3a3'],['Magenta','#ff00a8'],['Copper','#b87333'],['Ivory','#fffff0'],['Onyx','#1b1b1b'],['Lilac','#c8a2c8'],['Citrus','#e4e400'],['Arctic','#bfe6ff'],['Blaze','#ff4500'],['Jade','#00a86b'],['Plum','#8e4585']];
const n=(i,lo,hi)=>lo+(i*7)%(hi-lo+1);// deterministic 3..8 ads
const TEESP=['chrome','neon','rainbow','lava','flame','galaxy','diamond','gold','ice','usa'];
COL.forEach((c,i)=>{const id='cTad'+(10+i),nx=COL[(i+7)%COL.length];LOOK[id]=i%3===2?['neon',c[1]]:[c[1],nx[1]];A(id,c[0]+' '+(i%3===2?'Neon Tee':'Duo Tee'),n(i,3,6),'TEE')});
TEESP.forEach((s,i)=>{const id='cTad'+(40+i);LOOK[id]=s==='neon'?['neon','#ff2bd6']:[s];A(id,['Mirror','Laser','Spectrum','Magma','Wildfire','Nebula','Crown Jewel','24K','Glacier','Liberty'][i]+' Tee',n(i,5,8),'TEE')});
const FXK=['spark','ring','stars'],EMO=['⚡','🔥','💎','🌟','🍀','🎉','💥','🌈','🦅','👑'];
COL.slice(0,15).forEach((c,i)=>{const id='gKad'+(10+i),k=FXK[i%3];LOOK[id]=[k,c[1]];A(id,c[0]+' '+(k==='spark'?'Sparks':k==='ring'?'Shockwave':'Stars'),n(i,3,6),'KICK FX')});
EMO.forEach((e,i)=>{const id='gKad'+(30+i);LOOK[id]=['emoji',e];A(id,['Thunder','Inferno','Gem','Superstar','Lucky','Party','Boom','Rainbow','Eagle','Royal'][i]+' Burst',n(i,4,8),'KICK FX')});
['fire','fireworks','nova','confetti','pixel'].forEach((k,i)=>{const id='gKad'+(45+i);LOOK[id]=[k];A(id,['Hellfire','Grand Finale','Hypernova','Ticker Tape','8-Bit'][i]+' FX',n(i,6,8),'KICK FX')});
const PEM=['🐐','🦁','🐉','🦈','🏟️','🎺','📣','🎸','🚀','🛸','🧊','🌋','🍕','🌮','🎃'];
PEM.forEach((e,i)=>{const id='vSad'+(10+i);LOOK[id]=['emoji',e];A(id,['GOAT','Lion','Dragon','Shark','Mini Stadium','Brass Band','Megaphone','Rock Guitar','Rocket','UFO','Ice Throne','Volcano','Pizza Party','Taco Stand','Pumpkin'][i]+' Prop',n(i,3,7),'SIDELINE')});
COL.slice(0,6).forEach((c,i)=>{const id='vSad'+(30+i);LOOK[id]=['cooler',c[1]];A(id,c[0]+' Cooler',n(i,3,5),'SIDELINE')});
// balls
const BI=[];COL.forEach((c,i)=>{if(i>=16)return;const id='blad'+i;C.BX[id]={p:i%10,c:c[1],c2:COL[(i+5)%COL.length][1]};A(id,c[0]+' '+['Striped','Dotted','Ringed','Seamed','Two-Tone','Swirl','Star','Checker','Crater','Sprinkle'][i%10]+' Ball',n(i,3,7),'BALL')});
// trails
COL.forEach((c,i)=>{const id='tad'+(20+i);C.TRX[id]=[c[1],COL[(i+3)%COL.length][1]];A(id,c[0]+' Comet Trail',n(i,3,7),'TRAIL')});
// celebrations
COL.forEach((c,i)=>{const id='exad'+i;C.CEX[id]=[c[0]+(i%3===0?' Rings':i%3===1?' Burst':' Rain'),[c[1],'#ffffff',COL[(i+9)%COL.length][1]],i%3===0?'o':i%3===1?'b':'r'];A(id,C.CEX[id][0],n(i,3,7),'CELEBRATE')});
// horns (generated melodies)
const NT=[262,294,330,349,392,440,494,523,587,659,698,784],WV=['sawtooth','square','triangle','sine'];
for(let i=0;i<15;i++){const id='hnad'+i,b=NT[(i*5+2)%12]*(i%2?0.5:1),iv=[[0,4,7,12],[0,7,4,12],[0,5,9],[12,7,4,0],[0,3,7,10,12]][i%5],ty=WV[i%4];C.HRN[id]=iv.map((s,k)=>{const f=b*Math.pow(2,s/12);return[f,f*(i%5===4?1.04:1),k===iv.length-1?0.45:0.16,ty]});A(id,['Arena','Stadium','Victory','Blitz','Thunder','Royal','Rocket','Glory','Hype','Showtime','Big Play','Comeback','Dynasty','Overtime','Legend'][i]+' Horn',n(i,3,7),'HORN')}
// chants
const CP=['c c - c c - v0:e v2:o>','s - s c - s - s c -','d d c - d d c - v4:e v2:e v0:o>','v0:o v2:o v4:o> - c c c -','s s c - v4:e> - s s c -','c - c - c c c - v2:e v4:e>','d - d - k - d d k -','v4:e v4:e v2:o> - s s c','c c c - c c c - v0:o>','s c s c s c - v2:i v4:o>'];
CP.forEach((p,i)=>{const id='zcad'+i,nm=['Ad Star','Wave','Hype Train','Roar Up','Thunder Clap','Victory March','Drumline','Champions','Triple Clap','Stomp Wave'][i]+' Chant';C.CHX[id]=[nm,100+i*8,[196,220,247,262][i%4],['light','mid','roar'][i%3],p];A(id,nm,n(i,3,7),'CHANT')});
// flags
COL.forEach((c,i)=>{if(i>=15)return;const id='fgad'+(10+i),d=COL[(i+6)%COL.length][1];C.FLX[id]=i%3===0?{stripes:[c[1],d]}:i%3===1?{check:[c[1],d]}:{solid:c[1]};A(id,c[0]+' Flag',n(i,3,6),'FLAG')});
window.FGF_ADITEMS=I;window.FGF_ADCOUNT=I.length;
I.forEach(it=>{if(!ITEM[it[0]])ITEM[it[0]]=[it[0],it[1],null]});
// ---- Featured Today: deterministic per local date ----
const dkey=()=>{const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()};
function featured(){const k=dkey();let s=k*2654435761>>>0;const r=()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296};const idx=I.map((_,i)=>i);for(let i=idx.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]]}return idx.slice(0,12).map(i=>I[i][0])}
let FT=null,FK=0;const FEAT=()=>{const k=dkey();if(k!==FK){FK=k;FT=featured()}return FT};window.FGF_FEATURED=FEAT;
const left=()=>{const d=new Date(),m=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);const s=Math.max(0,(m-d)/1000|0);return Math.floor(s/3600)+'h '+String(Math.floor(s%3600/60)).padStart(2,'0')+'m'};
// ---- watching (no limit) ----
const PROG=()=>J('fgfAdProg',{});let busy=false;
function watch(it){if(busy)return;const on=window.FGF_ADS_ON&&FGF_ADS_ON();if(!on){toast(T_('Ad items unlock in the Google Play app'));return}
 busy=true;window.FGF_ADPLAYING=1;let p;try{window.FGF_ADPAID_RESET&&FGF_ADPAID_RESET();p=window.FGF_ADAPTER().rewarded()}catch(e){p=Promise.resolve(false)}
 p.then(ok=>{busy=false;window.FGF_ADPLAYING=0;if(ok!==true){toast(T_('Watch the full video to get your reward'));return}
  const m=window.FGF_ADMULT?FGF_ADMULT():1,ft=FEAT().includes(it[0]),stp=(m>=2?2:1)+(ft?1:0);const P=PROG();P[it[0]]=Math.min(it[2],(P[it[0]]||0)+stp);SV('fgfAdProg',P);
  if(P[it[0]]>=it[2]){if(!own.includes(it[0])){own.push(it[0]);SV('fgfOwn',own)}toast('📺 '+T_(it[1])+' '+T_('unlocked!'));sfx.cheer()}else toast('📺 '+P[it[0]]+' / '+it[2]+' '+T_('ads watched')+(ft?' · ⭐ +1':''))}).catch(()=>{busy=false;window.FGF_ADPLAYING=0;toast(T_('Watch the full video to get your reward'))})}
// ---- list UI: FEATURED / IN PROGRESS / ALL + kind filter ----
const KINDS=['ALL','TEE','KICK FX','SIDELINE','BALL','TRAIL','CELEBRATE','HORN','CHANT','FLAG'];let view=LS.fgfAdView||'feat',kind=0,pg=0,lastKey='';
function list(){const P=PROG();let L;if(view==='feat'){const f=FEAT();L=f.map(id=>I.find(x=>x[0]===id)).filter(Boolean)}else if(view==='prog')L=I.filter(x=>(P[x[0]]||0)>0&&!own.includes(x[0]));else L=I.filter(x=>kind===0||x[3]===KINDS[kind]);return L}
window.FGF_ADROWS=function(){const ra=window.FGF_ROWSAREA?FGF_ROWSAREA():{y0:H*0.3,y1:H*0.8};const y0=ra.y0,y1=ra.y1,on=window.FGF_ADS_ON&&FGF_ADS_ON(),rh=50;
 ctx.fillStyle='rgba(4,18,10,0.97)';ctx.fillRect(W*0.03,y0-4,W*0.94,y1-y0+40);
 const P=PROG(),np=I.filter(x=>(P[x[0]]||0)>0&&!own.includes(x[0])).length,tw=(W*0.92-12)/3,tx=W*0.04;
 [['feat','⭐ '+T_('TODAY')],['prog','⏳ '+np],['all',T_('ALL')+' '+I.length]].forEach((v,i)=>bx(tx+i*(tw+6),y0,tw,26,v[1],()=>{view=v[0];LS.fgfAdView=view;pg=0},view===v[0],11));
 let y=y0+32;ctx.textAlign='center';ctx.font='11px system-ui';ctx.fillStyle=on?'#bcd':'#ffd27a';
 if(view==='feat')ctx.fillText('⭐ '+T_('Featured Today')+' · '+T_('+1 per ad')+' · '+T_('new in')+' '+left(),W/2,y+10,W*0.9);
 else if(view==='all'){bx(W/2-80,y-2,160,22,'◀ '+T_(KINDS[kind])+' ▶',()=>{kind=(kind+1)%KINDS.length;pg=0},false,11)}
 else ctx.fillText(np?T_('Items you started · finish them anytime'):T_('Nothing in progress yet'),W/2,y+10,W*0.9);
 if(!on){ctx.fillStyle='#ffd27a';ctx.fillText(T_('📺 WATCH-ADS-ONLY items · Google Play app'),W/2,y+24,W*0.9)}
 y+=on?20:32;const L=list(),per=Math.max(1,Math.floor((y1-y)/rh)),pages=Math.max(1,Math.ceil(L.length/per));if(pg>=pages)pg=0;
 const F=FEAT();
 L.slice(pg*per,pg*per+per).forEach((it,k)=>{const yy=y+k*rh,[id,nm,nn,kd]=it,ow=own.includes(id),sl=slot(id),eqd=eq[sl]===id,ft=F.includes(id);ctx.fillStyle='rgba(6,30,16,0.98)';ctx.strokeStyle=ft?'#ffd23f':on?GOLD:'#556';ctx.lineWidth=ft?3:2;ctx.beginPath();ctx.roundRect(W*0.04,yy,W*0.92,rh-6,12);ctx.fill();ctx.stroke();
  const cx=W*0.04+22,cy=yy+(rh-6)/2;ctx.save();if(!on)ctx.globalAlpha=0.6;try{if(id.startsWith('fg')&&window.FGF_SHOPPREVIEW)FGF_SHOPPREVIEW(id,cx,cy,12);else FGF_ICON(id,cx,cy,11)}catch(e){}ctx.restore();
  btn(W*0.04+4,yy+2,36,rh-10,()=>{if(kd==='HORN'||kd==='CHANT'){try{FGF_PLAYH(id)}catch(e){}}else if(window.FGF_TRY)FGF_TRY(id,'shop')});
  ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+(W<350?12:13)+'px system-ui';ctx.fillText((ft?'⭐ ':'')+T_(nm),W*0.07+34,yy+rh*0.4,W*0.92-W*0.3-56);ctx.font='11px system-ui';ctx.fillStyle='#bcd';ctx.fillText(T_(kd)+' · '+(ow?T_('Unlocked'):'📺 '+Math.min(nn,P[id]||0)+'/'+nn+' '+T_('ads')),W*0.07+34,yy+rh*0.7,W*0.92-W*0.3-56);
  const bw=W*0.28;if(ow)bx(W*0.94-bw,cy-14,bw,28,eqd?'EQUIPPED':'EQUIP',()=>{eq[sl]=id;SV('fgfEq',eq)},eqd,12);else if(on)bx(W*0.94-bw,cy-14,bw,28,'▶ '+T_('WATCH AD'),()=>watch(it),true,11);else bx(W*0.94-bw,cy-14,bw,28,'🔒 APP',()=>toast(T_('Ad items unlock in the Google Play app')),false,11)});
 const py=H*0.86-30;if(pages>1){bx(W*0.04,py,56,28,'◀',()=>pg=(pg+pages-1)%pages,false,13);bx(W*0.96-56,py,56,28,'▶',()=>pg=(pg+1)%pages,false,13);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(T_('Page')+' '+(pg+1)+' / '+pages,W/2,py+18)}};
window.FGF_ADITEM_TEST={watch,featured:FEAT,count:()=>I.length};
})();
