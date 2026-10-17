// s20: meta systems + EVENTS hub + info screens (XP/levels/titles, missions, season pass, spin, deal, stats, HoF,
// collection, credits/privacy, bracket, friend codes, comeback, streak save, milestones, flags: ads/online/analytics OFF)
(function(){
const DK=FGF_DK,NOW=()=>window.FGF_DATE?new Date(FGF_DATE):new Date();
const WK=()=>{const d=NOW();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.toISOString().slice(0,10)};window.FGF_WK=WK;
const MO=()=>{const d=NOW();return d.getFullYear()+'-'+(d.getMonth()+1)};
// ---- feature flags (all OFF; see fgf_store/SETUP.md) ----
window.FGF_ADS=false;window.FGF_watchAd=()=>{if(!FGF_ADS){toast('Ads are not enabled');return}};
window.FGF_ONLINE=Object.assign({enabled:true,url:'https://fdmcgupjmjfpraznmsew.supabase.co',anonKey:'sb_publishable_944lD1vIQwA5DGifZqbFJw_AuC1xUkz'},window.FGF_ONLINE_CFG||{});
const OH=()=>({'apikey':FGF_ONLINE.anonKey,'Content-Type':'application/json'});
const ini3=()=>{if(LS.fgfOLIni)return LS.fgfOLIni;let s='';try{const I=J('fgfIni',null);if(I)s=I.map(k=>AZ[k]).join('')}catch(e){}if(!s)s=((window.MK&&MK.name)||'FGF');s=s.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3);return s||'FGF'};
FGF_ONLINE.status='idle';
FGF_ONLINE.submit=function(sc){if(window.TESTER||window.FGF_NOSUBMIT||!this.enabled||!this.url||!(sc>0)||(mode==='tut'||mode==='range')||!['classic','time','pressure','hurricane','chaos'].includes(mode))return Promise.resolve(false);
 const now=Date.now(),rl=J('fgfOLrl',{t:0,w:'',b:{}});if(rl.w!==WK()){rl.w=WK();rl.b={}}if(now-rl.t<30000||sc<=(rl.b[mode]||0))return Promise.resolve(false);// rate limit: 1 per 30s, only new weekly bests per mode
 rl.t=now;rl.b[mode]=sc;SV('fgfOLrl',rl);
 return fetch(this.url+'/rest/v1/weekly_scores',{method:'POST',headers:Object.assign(OH(),{'Prefer':'return=minimal'}),body:JSON.stringify({week:WK(),mode:String(mode).slice(0,20),initials:ini3(),score:Math.min(1e7,Math.round(sc))})}).then(r=>{FGF_ONLINE.status=r.ok?'ok':'err '+r.status;return r.ok}).catch(()=>{FGF_ONLINE.status='offline';return false})};
FGF_ONLINE.fetchWeek=function(m){if(!this.enabled||!this.url)return Promise.resolve(null);return fetch(this.url+'/rest/v1/weekly_scores?select=initials,score,mode&week=eq.'+WK()+'&mode=eq.'+(m||'classic')+'&order=score.desc&limit=25',{headers:OH()}).then(r=>r.ok?r.json():(FGF_ONLINE.status='err '+r.status,null)).catch(()=>{FGF_ONLINE.status='offline';return null})};
FGF_ONLINE.rankOf=function(m,sc){if(!this.enabled||!this.url||!(sc>0))return Promise.resolve(null);return fetch(this.url+'/rest/v1/weekly_scores?select=score&week=eq.'+WK()+'&mode=eq.'+(m||'classic')+'&score=gt.'+Math.round(sc),{headers:Object.assign(OH(),{'Prefer':'count=exact','Range':'0-0'})}).then(r=>{const c=r.headers.get('content-range');const n=c&&+c.split('/')[1];return isNaN(n)?null:n+1}).catch(()=>null)};
let OLB={t:-1e9,m:'classic',rows:null,busy:0};
window.FGF_AN=Object.assign({enabled:false,endpoint:''},window.FGF_AN_CFG||{});window.FGF_track=function(ev){if(!FGF_AN.enabled||!FGF_AN.endpoint)return;try{navigator.sendBeacon(FGF_AN.endpoint+'?p=/event/'+encodeURIComponent(ev))}catch(e){}};
// ---- XP, levels, titles ----
const TIT=[[1,'Rookie'],[5,'Starter'],[10,'Pro'],[20,'All-Pro'],[30,'Hall of Famer'],[40,'Legend']];
const lvOf=x=>{let l=1,n=100;while(x>=n){x-=n;l++;n=100+(l-1)*40}return{l,cur:x,need:n}};window.FGF_LV=()=>lvOf(+LS.fgfXP||0);
const title=l=>TIT.filter(t=>l>=t[0]).pop()[1];window.FGF_TITLE=()=>title(FGF_LV().l);
function addXP(n){const b=FGF_LV().l;LS.fgfXP=(+LS.fgfXP||0)+n;const sp=J('fgfSPx',{m:'',p:0});if(sp.m!==MO()){sp.m=MO();sp.p=0}sp.p+=n;SV('fgfSPx',sp);const a=FGF_LV().l;if(a>b){toast('⬆️ LEVEL '+a+' · '+title(a));if(a%5===0){const c=100*a;addCoins(c);toast('🎁 Level '+a+' reward  🪙 +'+c)}}}
// ---- stats / HoF / missions tracking ----
const S=Object.assign({k:0,m:0,long:0,dk:0,pf:0,g:0,ds:0},J('fgfStats2',{}));
const ok=kick;kick=function(){const f=ball&&ball.fly;const r=ok.apply(this,arguments);if(!f&&ball&&ball.fly&&(mode!=='tut'&&mode!=='range')){S.k++;SV('fgfStats2',S)}return r};
const MI=[['m_make','Make 30 kicks',30,300],['m_50','Make 3 kicks of 50+ yards',3,400],['m_games','Finish 5 runs',5,250]];
const mis=()=>{const m=J('fgfMis',{w:'',p:{},c:{}});if(m.w!==WK()){m.w=WK();m.p={};m.c={}}return m};
const misAdd=(id,n)=>{const m=mis();m.p[id]=(m.p[id]||0)+n;SV('fgfMis',m)};window.FGF_MIS={mis,misAdd,MI,WK};
const ores=S3.onResult;S3.onResult=function(good){const r=ores.apply(this,arguments);if((mode==='tut'||mode==='range'))return r;
 if(good&&ball.res!=='BLOCKED!'){S.m++;S.ds+=dist;S.long=Math.max(S.long,dist);if(msg&&/Off the upright/.test(msg.s||''))S.dk++;if(Math.abs(ball.x)<0.35)S.pf++;addXP(Math.round(dist/2)+5);misAdd('m_make',1);if(dist>=50)misAdd('m_50',1);
  const H=J('fgfHoF',[]);H.push({d:dist,m:mode,dt:NOW().toLocaleDateString(),w:weather});H.sort((a,b)=>b.d-a.d);SV('fgfHoF',H.slice(0,5))}
 SV('fgfStats2',S);return r};
let pst=state;setInterval(()=>{if(state==='over'&&pst!=='over'){S.g++;SV('fgfStats2',S);misAdd('m_games',1);LS.fgfRounds=(+LS.fgfRounds||0)+1;FGF_ONLINE.submit(score);FGF_track('game_over_'+mode);
  const ch=J('fgfCH',null);if(ch&&mode===ch.m){toast(score>ch.s?'🏆 You beat '+ch.n+"'s "+ch.s+'!':'😤 '+ch.n+' still leads: '+ch.s);if(score>ch.s)LS.removeItem('fgfCH')}}
 if(state==='play'&&pst!=='play')FGF_track('play_'+mode);
 // trophy milestones every 10
 try{const n=TRO.filter(q=>AD[q[1]]).length,last=+LS.fgfTM||0;if(Math.floor(n/10)>Math.floor(last/10)&&n>=10){const c=500*Math.floor(n/10);addCoins(c);toast('🏅 '+(Math.floor(n/10)*10)+' TROPHIES milestone  🪙 +'+c)}if(n!==last)LS.fgfTM=n}catch(e){}
 if(window.EVT&&state==='title'){window.EVT=null;window.__wx=null}
 pst=state},150);
// ---- comeback bonus + streak save (1 per week) ----
(function(){const t=NOW();t.setHours(0,0,0,0);const ls=LS.fgfSeen?new Date(LS.fgfSeen):null;if(ls){const d=Math.round((t-ls)/864e5);if(d>=3){addCoins(300);setTimeout(()=>toast('👋 Welcome back! Comeback bonus  🪙 +300'),1500)}}LS.fgfSeen=t.toISOString();
 try{if(LSS&&LSS.last){const l=new Date(LSS.last+'T00:00:00'),d=Math.round((t-l)/864e5);if(d===2&&LS.fgfSave!==WK()){const y=new Date(t);y.setDate(y.getDate()-1);LSS.last=ymd(y);SV('fgfLStreak',LSS);LS.fgfSave=WK();setTimeout(()=>toast('🛡️ Streak saved! (1 free save per week)'),2500)}}}catch(e){}})();
// ---- friend challenge link ----
(function(){try{const q=new URLSearchParams(location.search).get('ch');if(q){const o=JSON.parse(decodeURIComponent(escape(atob(q))));if(o&&o.s>=0){SV('fgfCH',{n:String(o.n||'A friend').slice(0,12),s:+o.s,m:o.m||'classic'})}}}catch(e){}})();
function chLink(){const best=+(LS[BKEY('classic')]||0),o={n:(window.MK&&MK.name)||'Your friend',s:best,m:'classic'};return URL0+'?ch='+btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function shareLink(){const u=chLink(),t='Beat my '+(+(LS[BKEY('classic')]||0))+' in Field Goal Frenzy Classic!';if(navigator.share)navigator.share({title:'Field Goal Frenzy',text:t,url:u}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(t+' '+u).then(()=>toast('🔗 Challenge link copied')).catch(()=>toast(u));else toast(u)}
// ---- holiday calendar framework ----
window.FGF_HOL=[{k:'halloween',n:'Halloween',from:[10,1],to:[10,31]},{k:'thanks',n:'Turkey Bowl',from:[11,1],to:[11,30]},{k:'xmas',n:'Holiday Snow',from:[12,1],to:[12,31]},{k:'sb',n:'Big Game Week',from:[2,1],to:[2,14]},{k:'j4',n:'July 4th',from:[7,1],to:[7,7]}];
window.FGF_HOLIDAY=function(d){d=d||NOW();const m=d.getMonth()+1,dd=d.getDate();return FGF_HOL.find(h=>(m>h.from[0]||(m===h.from[0]&&dd>=h.from[1]))&&(m<h.to[0]||(m===h.to[0]&&dd<=h.to[1])))||null};
{const hd=FGF_HOLIDAY(),items={sb:{TRAILS:['t12','Big Game Confetti 🏈',1200,'p',0]},j4:{TRAILS:['t13','Stars & Stripes 🎆',1200,'p',0]}};for(const k in items)for(const tb of SHOP){const it=items[k][tb[0]];if(!it)continue;FGF_LIMITED[it[0]]=(k==='sb'?'🏈':'🎆')+' LIMITED · ends '+(k==='sb'?'Feb 14':'Jul 7');if(((hd&&hd.k===k)||own.includes(it[0]))&&!tb[1].some(a=>a[0]===it[0]))tb[1].push(it)}}
const otr=S3.trail;S3.trail=function(a){return eq.t==='t12'?'hsla('+((a*900+T*200)%360|0)+',95%,60%,'+a+')':eq.t==='t13'?(['rgba(230,40,60,','rgba(255,255,255,','rgba(40,80,220,'][(a*9|0)%3]+a+')'):otr.apply(this,arguments)};
// Halloween leave-date countdown
{const d=NOW();if(d.getMonth()===9){const left=31-d.getDate();window.FGF_LIMEND='Oct 31 · '+(left<=0?'last day!':left+' day'+(left>1?'s':'')+' left')}}
// ---- deal of the day ----
function deal(){const all=[];SHOP.forEach(t=>t[1].forEach(i=>{if(i[2]>0&&!own.includes(i[0])&&!FGF_LIMITED[i[0]])all.push(i)}));if(!all.length)return null;let s=0;for(const c of DK())s=(s*31+c.charCodeAt(0))>>>0;const it=all[s%all.length];return{it,pr:Math.round(it[2]*0.7/10)*10}}
// ---- try before you buy (preview on your kicker: one practice kick) ----
let PRV=null;window.FGF_TRYEND=()=>{PRV=null};window.FGF_DEAL=()=>deal();window.FGF_TRY=function(id,ret){PRV={eq:Object.assign({},eq),coins,ret:ret||'shop',sc:+(LS[BKEY('classic')]||0)};eq[slot(id)]=id;newGame('classic');PRV.on=1;lives=99;dist=30;newWind();resetBall();toast('👁 Preview: one practice kick')};
const onx=S3.next;S3.next=function(good){if(PRV&&PRV.on){Object.assign(eq,PRV.eq);coins=PRV.coins;LS.fgfCoins=coins;LS[BKEY('classic')]=PRV.sc;state=PRV.ret;PRV=null;try{pendNext=null}catch(e){}return true}return onx.apply(this,arguments)};
// ---- hub & screens ----
const hubItems=()=>{const d=deal(),L=[
 ['🏆','LEGEND CHALLENGE',LS.fgfLC===DK()?'Done today · back tomorrow':'1 free 80-yd try today',()=>window.FGF_LEGENDC&&FGF_LEGENDC(),LS.fgfLC!==DK()],
 ...(window.FGF_EARLY?[['🤖','GET IT ON ANDROID',LS.fgfEA?'You\'re on the list ✓':'Join Play testing',()=>FGF_EARLY(),!LS.fgfEA]]:[]),
 ['🎁','BONUS CENTER',window.FGF_GIFTREADY&&FGF_GIFTREADY()?'Free gift ready!':(window.FGF_BOOST&&FGF_BOOST().mult>1?'Coin boost live!':'Bundles · book · gifts'),()=>state='bonus',!!(window.FGF_GIFTREADY&&FGF_GIFTREADY())],
 ['🎡','DAILY SPIN',LS.fgfSpin===DK()?'Spun today':'Free spin ready!',()=>{state='spin';SPN=null},LS.fgfSpin!==DK()],
 ['🌙','WEEKEND EVENT',window.FGF_EVTNAME?FGF_EVTNAME():'',()=>window.FGF_EVENT&&FGF_EVENT(),!!(window.FGF_EVTON&&FGF_EVTON())],
 ['🐴','K-I-C-K','vs computer or a friend',()=>window.FGF_HORSE&&FGF_HORSE(),false],
 ['🆚','RIVAL','Rookie · Pro · Legend',()=>state='rvt',false],
 ['🎮','MORE MODES','Kickoff · Punt · Drill · Bosses',()=>state='mmsel',false],
 ['🎯','TRICK SHOTS','Doinks & dead-center',()=>window.FGF_TRICK&&FGF_TRICK(),false],
 ['📋','WEEKLY MISSIONS',mis().w?MI.filter(x=>(mis().p[x[0]]||0)>=x[2]&&!mis().c[x[0]]).length+' ready to claim':'',()=>state='mis',MI.some(x=>(mis().p[x[0]]||0)>=x[2]&&!mis().c[x[0]])],
 ['🎟️','SEASON PASS','Free track · this month',()=>state='pass',false],
 ['💰','DEAL OF THE DAY',d?d.it[1]+' · 🪙 '+d.pr:'You own everything!',()=>state='deal',false],
 ['⚔️','ONLINE H2H','Quick Match or private room',()=>window.FGF_H2MENU&&FGF_H2MENU(),false],
 ['🌐','ONLINE BOARD','Weekly scores worldwide',()=>{state='olb';OLB.t=-1e9},false],
 ['📅','WEEKLY BOARD','This week vs rivals',()=>state='wlb',false],
 ['🔗','CHALLENGE A FRIEND','Share a beat-my-score link',shareLink,false],
 ['👥','SOCIAL','Clubs · countries · ghosts',()=>state='social',false],
 ['🤝','INVITE FRIENDS','Share your code · 🪙 500 each',()=>window.FGF_REFER&&FGF_REFER(),false],
 ['🏈','CAREER BRACKET','Playoffs & trophies',()=>state='brk',false],
 ['📊','STATS','Perks · milestones · career',()=>state='stats',false],
 ['⭐','HALL OF FAME','Your top 5 kicks',()=>state='hof',false],
 ['📚','COLLECTION','Everything you own',()=>state='coll',false],
 ['ℹ️','CREDITS & PRIVACY','',()=>state='cred',false]];
 if(FGF_ADS)L.push(['📺','WATCH AD','+100 coins',FGF_watchAd,false]);return L};
window.FGF_HUBITEMS=hubItems;window.FGF_DAILYREADY=()=>{const r=[];if(LS.fgfSpin!==DK())r.push('Spin');if(LS.fgfLC!==DK())r.push('Legend try');if(window.FGF_EVTON&&FGF_EVTON())r.push('Weekend event');return r};
let SPN=null;const SPZ=[25,50,75,100,150,200,300,500],SPC=['#e74c3c','#f39c12','#f1c40f','#2ecc71','#1abc9c','#3498db','#9b59b6','#ff4fd8'];
function head(t,s){txt(t,W/2,H*0.07,Math.min(28,W*0.075),GOLD,'#063');if(s){ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(s,W/2,H*0.07+22)}}
function back(to){bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state=to||'hub',false,14)}
function rows(L,y0){const rh=Math.min(46,(H*0.8-y0)/Math.max(1,L.length));L.forEach((r,i)=>{const y=y0+i*rh;panel(W*0.06,y,W*0.88,rh-6);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='bold '+Math.min(14,rh*0.34)+'px system-ui';ctx.fillText(r[0],W*0.1,y+rh*0.5);ctx.textAlign='right';ctx.fillStyle=GOLD;ctx.fillText(r[1],W*0.9,y+rh*0.5)})}
const osc=S3.screen;S3.screen=function(){
 if(state==='hub'){BTN=[];ctx.fillStyle='rgba(0,8,4,0.6)';ctx.fillRect(0,0,W,H);head('🎉 EVENTS & MORE','Lv '+FGF_LV().l+' '+FGF_TITLE()+' · 🪙 '+CSTR());const L=hubItems(),cols=2,gw=W*0.44,gap=W*0.04,y0=H*0.115,rh=Math.min(84,(H*0.93-30-y0)/Math.ceil(L.length/2));let tf=rh*0.36,sf=rh*0.27;ctx.font='900 '+tf+'px system-ui';const mw=Math.max(...L.map(c=>ctx.measureText(c[0]+' '+c[1]).width));if(mw>gw-20)tf*=(gw-20)/mw;sf=Math.min(sf,tf*0.86);
  L.forEach((c,i)=>{const x=W*0.04+(i%2)*(gw+gap),y=y0+(i>>1)*rh;bx(x,y,gw,rh-6,'',c[3],false);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 '+tf+'px system-ui';ctx.fillText(c[0]+' '+c[1],x+8,y+rh*0.4,gw-18);ctx.fillStyle='#e8fff0';ctx.font='700 '+sf+'px system-ui';let s=c[2]||'';while(ctx.measureText(s).width>gw-16&&s.length>3)s=s.slice(0,-2)+'…';ctx.fillText(s,x+8,y+rh*0.74);if(c[4]){ctx.fillStyle='#ff4f4f';ctx.beginPath();ctx.arc(x+gw-10,y+10,5,0,6.29);ctx.fill()}});
  bx(W/2-80,H*0.95-22,160,38,'◀ MENU',()=>state='title',false,14);return true}

 if(state==='olb'){BTN=[];head('🌐 ONLINE WEEKLY','Week of '+WK()+' · top 25');const MS=[['classic','CLASSIC'],['time','TIME'],['pressure','PRESSURE'],['hurricane','HURRICANE'],['chaos','CHAOS']],tw=(W*0.92-16)/5;MS.forEach((m,i)=>bx(W*0.04+i*(tw+4),H*0.12,tw,30,m[1],()=>{OLB.m=m[0];OLB.t=-1e9},OLB.m===m[0],9));
  if(!OLB.busy&&performance.now()-OLB.t>20000){OLB.busy=1;OLB.t=performance.now();OLB.rows=undefined;FGF_ONLINE.fetchWeek(OLB.m).then(r=>{OLB.rows=r;OLB.busy=0})}
  const y0=H*0.19,rh=Math.min(44,H*0.058);if(OLB.rows===undefined)txt('Loading…',W/2,H*0.3,15,'#bcd');else if(!OLB.rows){txt('Online board unavailable right now',W/2,H*0.28,15,'#ffb36b');txt('Showing your local weekly bests instead',W/2,H*0.32,12,'#bcd');const L=(J('fgfLB',{})[OLB.m]||[]).slice(0,8);L.forEach((e,i)=>{const y=H*0.36+i*rh;panel(W*0.08,y,W*0.84,rh-6);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 14px system-ui';ctx.fillText((i+1)+'. '+e.i,W*0.12,y+rh*0.55);ctx.textAlign='right';ctx.fillText(e.s.toLocaleString(),W*0.88,y+rh*0.55)})}
  else if(!OLB.rows.length)txt('No scores yet this week. Be the first!',W/2,H*0.3,14,'#bcd');else{const R=OLB.rows,mi=ini3(),y1=H*0.93-22-64,yy0=H*0.12+36;const inTop=R.some(e=>e.initials===mi);const y1b=inTop||!OLB.my?y1:y1-36;
  FGF_SLIST('olb'+OLB.m,yy0,y1b,R.length,rh,(i,y)=>{const e=R[i],me=e.initials===mi;panel(W*0.08,y,W*0.84,rh-6);if(me){ctx.fillStyle='rgba(255,210,63,.22)';ctx.fillRect(W*0.08+2,y+2,W*0.84-4,rh-10)}ctx.textAlign='left';ctx.fillStyle=i<3?GOLD:me?GOLD:'#fff';ctx.font='900 15px system-ui';ctx.fillText((i+1)+'. '+e.initials+(me?' ★':''),W*0.12,y+rh*0.55);ctx.textAlign='right';ctx.fillText((+e.score).toLocaleString(),W*0.88,y+rh*0.55)});
  const myb=(J('fgfOLrl',{w:'',b:{}}).w===WK()&&J('fgfOLrl',{b:{}}).b[OLB.m])||0;if(!inTop&&myb>0){if(OLB.myk!==OLB.m+myb){OLB.myk=OLB.m+myb;OLB.my=null;FGF_ONLINE.rankOf(OLB.m,myb).then(r=>{OLB.my=r?{r,s:myb}:null})}
   if(OLB.my){const y=y1b+6;panel(W*0.08,y,W*0.84,rh-6);ctx.fillStyle='rgba(255,210,63,.22)';ctx.fillRect(W*0.08+2,y+2,W*0.84-4,rh-10);ctx.textAlign='left';ctx.fillStyle=GOLD;ctx.font='900 15px system-ui';ctx.fillText(OLB.my.r+'. '+mi+' ★ (you)',W*0.12,y+rh*0.55);ctx.textAlign='right';ctx.fillText(OLB.my.s.toLocaleString(),W*0.88,y+rh*0.55)}}}
  ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(''+(LS.fgfOLIni?'Your weekly bests post as '+LS.fgfOLIni+' (initials only).':'Your scores are not posted yet.')+'',W/2,H*0.93-22-48);if(window.FGF_ASKINI)bx(W*0.3,H*0.93-22-40,W*0.4,30,LS.fgfOLIni?'Change initials':'Set initials',()=>FGF_ASKINI(true),false,11);back();return true}
 if(state==='spin'){BTN=[];head('🎡 DAILY SPIN','One free spin a day');const cx=W/2,cy=H*0.42,R=Math.min(W*0.38,H*0.22);let ang=0;if(SPN){const a=Math.min(1,(performance.now()-SPN.t0)/3200),e=1-Math.pow(1-a,3);ang=e*SPN.to;if(a>=1&&!SPN.done){SPN.done=1;FGF_FREE(SPZ[SPN.i],'🎡 Spin prize');sfx.cheer()}}else ang=(+LS.fgfSpinA||0);
  for(let i=0;i<8;i++){ctx.fillStyle=SPC[i];ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,ang+i*0.785,ang+(i+1)*0.785);ctx.fill();ctx.save();ctx.translate(cx,cy);ctx.rotate(ang+(i+0.5)*0.785);ctx.fillStyle='#fff';ctx.font='900 '+Math.min(16,R*0.13)+'px system-ui';ctx.textAlign='center';ctx.fillText('🪙'+SPZ[i],R*0.65,5);ctx.restore()}
  ctx.strokeStyle=GOLD;ctx.lineWidth=4;ctx.beginPath();ctx.arc(cx,cy,R,0,6.29);ctx.stroke();ctx.fillStyle=GOLD;ctx.beginPath();ctx.moveTo(cx,cy-R+16);ctx.lineTo(cx-12,cy-R-14);ctx.lineTo(cx+12,cy-R-14);ctx.closePath();ctx.fill();
  if(LS.fgfSpin!==DK()&&!SPN)bx(W*0.25,cy+R+24,W*0.5,50,'SPIN!',()=>{const w=[18,18,16,14,12,10,8,4];let r=Math.random()*100,i=0;while(r>w[i]){r-=w[i];i++}const tgt=-Math.PI/2-(i+0.5)*0.785;const to=tgt-(Math.floor(tgt/6.283)-5)*6.283;SPN={i,to,t0:performance.now()};LS.fgfSpin=DK();LS.fgfSpinA=to%6.283},true,18);else{ctx.fillStyle='#bcd';ctx.font='14px system-ui';ctx.textAlign='center';ctx.fillText(SPN&&SPN.done?'You won 🪙 '+SPZ[SPN.i]+'!':SPN?'…':'Come back tomorrow for another spin',W/2,cy+R+50)}
  ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.fillText('Free bonus coins are capped at 600 a day',W/2,cy+R+86);back();return true}
 if(state==='mis'){BTN=[];head('📋 WEEKLY MISSIONS','Resets Monday');const m=mis();MI.forEach((x,i)=>{const y=H*0.15+i*90,p=Math.min(x[2],m.p[x[0]]||0);panel(W*0.06,y,W*0.88,80);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='900 15px system-ui';ctx.fillText(x[1],W*0.1,y+26);ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(W*0.1,y+40,W*0.5,12);ctx.fillStyle=GOLD;ctx.fillRect(W*0.1,y+40,W*0.5*p/x[2],12);ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.fillText(p+' / '+x[2],W*0.1,y+70);
   if(m.c[x[0]]){ctx.textAlign='right';ctx.fillStyle='#7f7';ctx.fillText('✔ CLAIMED',W*0.9,y+50)}else bx(W*0.64,y+26,W*0.26,36,p>=x[2]?'CLAIM 🪙'+x[3]:'🪙 '+x[3],()=>{if(p>=x[2]){m.c[x[0]]=1;SV('fgfMis',m);addCoins(x[3]);sfx.cheer();toast('📋 Mission done  🪙 +'+x[3])}},p>=x[2],12)});back();return true}
 if(state==='pass'){BTN=[];const sp=J('fgfSPx',{m:'',p:0}),pts=sp.m===MO()?sp.p:0,cl=J('fgfSPc',{m:'',c:{}});if(cl.m!==MO()){cl.m=MO();cl.c={}}head('🎟️ SEASON PASS',NOW().toLocaleString('en',{month:'long'})+' season · '+pts+' pts (earn XP to progress)');const R=[100,150,200,250,300,400,500,600,800,1500],rh=Math.min(50,(H*0.78-H*0.15)/10);
  ctx.fillStyle='#bcd';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('FREE',W*0.42,H*0.135);ctx.fillText('GOLD · Google Play app',W*0.76,H*0.135);
  R.forEach((c,i)=>{const y=H*0.15+i*rh,need=(i+1)*250,un=pts>=need;ctx.textAlign='left';ctx.fillStyle=un?GOLD:'#789';ctx.font='900 12px system-ui';ctx.fillText('T'+(i+1),W*0.06,y+rh*0.55);ctx.font='10px system-ui';ctx.fillText(need+' pts',W*0.12,y+rh*0.55);
   if(cl.c[i]){ctx.fillStyle='#7f7';ctx.textAlign='center';ctx.font='900 12px system-ui';ctx.fillText('✔ 🪙'+c,W*0.42,y+rh*0.55)}else bx(W*0.28,y+4,W*0.28,rh-8,(un?'CLAIM ':'🔒 ')+'🪙'+c,()=>{if(un){cl.c[i]=1;SV('fgfSPc',cl);addCoins(c);sfx.cheer()}},un,11);
   ctx.save();ctx.globalAlpha=0.4;panel(W*0.6,y+4,W*0.34,rh-8);ctx.fillStyle='#ddd';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('🔒 '+(i%3===2?'Gold cleats':'🪙'+(c*2)),W*0.77,y+rh*0.58);ctx.restore()});
  ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('Gold track: Google Play app only.',W/2,H*0.85);back();return true}
 if(state==='deal'){BTN=[];head('💰 DEAL OF THE DAY','A new coin discount every day');const d=deal();if(!d){txt('You own every shop item!',W/2,H*0.3,16,'#fff')}else{panel(W*0.08,H*0.15,W*0.84,H*0.36);txt(d.it[1],W/2,H*0.21,22,'#fff');ctx.fillStyle='#bcd';ctx.font='14px system-ui';ctx.textAlign='center';ctx.fillText('Was 🪙 '+d.it[2].toLocaleString(),W/2,H*0.26);txt('🪙 '+d.pr.toLocaleString()+'  (30% off)',W/2,H*0.31,22,GOLD);
  bx(W*0.15,H*0.35,W*0.33,44,'👁 TRY IT',()=>FGF_TRY(d.it[0],'deal'),false,14);bx(W*0.52,H*0.35,W*0.33,44,'BUY',()=>buy5('deal_'+d.it[0],d.pr,()=>{own.push(d.it[0]);SV('fgfOwn',own)}),true,15);ctx.fillStyle='#8ab';ctx.font='11px system-ui';ctx.fillText('TRY gives you one practice kick with it equipped.',W/2,H*0.47)}back();return true}
 if(state==='stats'){BTN=[];const lv=FGF_LV();head('📊 STATS','Level '+lv.l+' · '+FGF_TITLE());ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(W*0.1,H*0.13,W*0.8,10);ctx.fillStyle=GOLD;ctx.fillRect(W*0.1,H*0.13,W*0.8*lv.cur/lv.need,10);
  rows([['Total kicks',S.k],['Makes',S.m],['Accuracy',S.k?Math.round(S.m/S.k*100)+'%':'-'],['Longest make',S.long+' yds'],['Average make',S.m?Math.round(S.ds/S.m)+' yds':'-'],['Doink-ins',S.dk],['Perfect kicks',S.pf],['Runs finished',S.g],['Legend kicks',+(LS.fgfLegend||0)],['XP',(+LS.fgfXP||0).toLocaleString()]],H*0.17);back();return true}
 if(state==='hof'){BTN=[];head('⭐ HALL OF FAME','Your top 5 makes');const H5=J('fgfHoF',[]);if(!H5.length)txt('Make some kicks to fill your Hall of Fame!',W/2,H*0.3,14,'#bcd');else rows(H5.map((h,i)=>[(i+1)+'. '+h.d+' yds · '+h.m,h.dt]),H*0.15);back();return true}
 if(state==='coll'){BTN=[];head('📚 COLLECTION','Everything you own');const R=SHOP.map(t=>[t[0],t[1].filter(i=>own.includes(i[0])||i[2]===0).length+' / '+t[1].length]);let to=0;try{to=typeof tOwn!=='undefined'?new Set([...FREE,...tOwn]).size:0}catch(e){}R.push(['TEAMS',to+' / 8']);R.push(['TROPHIES',TRO.filter(q=>AD[q[1]]).length+' / '+TRO.length]);try{R.push(['MASCOT',(CMO&&CMO.includes('unlock'))||LS.fgfCMun?'Unlocked':'—'])}catch(e){}R.push(['LEVEL TITLE',FGF_TITLE()]);rows(R,H*0.15);back();return true}
 if(state==='cred'){BTN=[];head('ℹ️ CREDITS & PRIVACY');const L=['Field Goal Frenzy by Kirk Weathersby.','Game art: original painted art made for this game.','Sounds: synthesized live in your browser (WebAudio),','no recorded or copyrighted audio.','','PRIVACY','• No account, no sign-in, no ads, no tracking.','• Progress is saved on this device by default (localStorage).','• Cloud Save (optional): sign in with email to sync','  coins, unlocks, season & settings to your account.','• Online board: only if you opt in (3 initials + score).','• Android early access: the email you enter, used only','  to invite you to testing.','• No analytics, no ads, no tracking cookies.','• Share buttons only send what you choose to share.','','Questions: contact the developer via the store listing.'];ctx.textAlign='left';L.forEach((l,i)=>{ctx.fillStyle=l==='PRIVACY'?GOLD:'#dde';ctx.font=(l==='PRIVACY'?'900 ':'')+Math.min(13,W/27)+'px system-ui';ctx.fillText(l,W*0.07,H*0.15+i*Math.min(22,H*0.036),W*0.86)});{const w=Math.min(230,W*0.62),y=H*0.84;BTN.push({x:W/2-w/2,y:y,w:w,h:38,l:'FULL PRIVACY POLICY',cb:()=>window.open('privacy.html','_blank')});ctx.fillStyle='#2f4a3c';ctx.fillRect(W/2-w/2,y,w,38);ctx.fillStyle='#e6ece8';ctx.textAlign='center';ctx.font='700 13px system-ui';ctx.fillText('FULL PRIVACY POLICY',W/2,y+24)}back();return true}
 if(state==='brk'){BTN=[];head('🏈 CAREER BRACKET',CAR?'Season '+CAR.season:'');if(!CAR){txt('Start a Career to play for a title!',W/2,H*0.3,15,'#bcd')}else{const po=CAR.po||[],res=CAR.res||[],me=TEAMS[myT()].a,nm=i=>i==null?'TBD':TEAMS[i].a,oth=[0,1,2,3,4,5,6,7].filter(i=>i!==myT()&&i!==po[0]);const box=(x,y,a,b,r)=>{panel(x,y,W*0.38,58);ctx.textAlign='left';ctx.font='900 13px system-ui';ctx.fillStyle='#fff';ctx.fillText(a,x+10,y+22);ctx.fillText(b,x+10,y+46);if(r){ctx.textAlign='right';ctx.fillStyle=r==='W'?'#7f7':'#f77';ctx.fillText(r,x+W*0.38-10,y+34)}};
  const reg=res.slice(0,16),w=reg.filter(x=>x==='W').length;ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText('Regular season '+w+'-'+(reg.length-w)+(CAR.wk<16?' · week '+(CAR.wk+1)+' of 16':''),W/2,H*0.14);
  ctx.fillText('SEMIFINALS',W*0.27,H*0.2);ctx.fillText('FINAL',W*0.75,H*0.2);box(W*0.06,H*0.22,me,nm(po[0]),res[16]);box(W*0.06,H*0.22+80,nm(oth[1]),nm(oth[2]),'');ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W*0.44,H*0.22+29);ctx.lineTo(W*0.5,H*0.22+29);ctx.lineTo(W*0.5,H*0.22+109);ctx.lineTo(W*0.44,H*0.22+109);ctx.moveTo(W*0.5,H*0.22+69);ctx.lineTo(W*0.56,H*0.22+69);ctx.stroke();box(W*0.56,H*0.22+40,res[16]==='W'?me:'TBD',nm(po[1]),res[17]);
  if(CAR.wk<16){ctx.fillStyle='#8ab';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('Finish the 16-game season to reach the playoffs',W/2,H*0.22+170)}}
  const ti=+(J('fgfTitles',[]).length)||0,won=!!AD.title;panel(W*0.12,H*0.55,W*0.76,H*0.24);txt(won?'🏆':'🏆',W/2,H*0.63,54,won?GOLD:'#555');txt(won?'CHAMPIONS!':'Championship trophy',W/2,H*0.7,18,won?GOLD:'#889');ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(won?'Career titles: '+(AD.L_titles3?'3+':'1+'):'Win the Final to lift it',W/2,H*0.74);back();return true}
 if(state==='mset'){BTN=[];head('⚙️ MORE SETTINGS');const bw=Math.min(300,W*0.84),x=W/2-bw/2,mu=LS.fgfMusic==='1',lh=LS.fgfLH==='1',kt=LS.fgfKT||'n';
  bx(x,H*0.16,bw/2-4,48,'🎵 MUSIC: '+(mu?'ON':'OFF'),()=>LS.fgfMusic=mu?'0':'1',mu,13);bx(x,H*0.16+72,bw,44,'✋ LEFT-HANDED: '+(lh?'ON':'OFF'),()=>LS.fgfLH=lh?'0':'1',lh,15);
  ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText('Left-handed puts the pause button on the left.',W/2,H*0.16+134);
  txt('KICK TYPE',W/2,H*0.16+160,15,GOLD);const kw=(bw-12)/3;[['n','NORMAL'],['l','LINE DRIVE'],['h','HIGH LOB']].forEach((k,i)=>bx(x+i*(kw+6),H*0.16+172,kw,44,k[1],()=>LS.fgfKT=k[0],kt===k[0],11));ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.fillText(kt==='l'?'Flatter and longer, but lower over the bar.':kt==='h'?'Higher over the bar, a bit shorter.':'The classic kick (recommended).',W/2,H*0.16+236);
  bx(W/2-80,H*0.93-22,160,42,'◀ BACK',()=>state='set',false,14);return true}
 if(state==='rvt'){BTN=[];head('🆚 RIVAL MATCH','Best of 5 · alternate kicks');[['rookie','ROOKIE','Easier rival · prize 🪙 200'],['pro','PRO','Even match · prize 🪙 400'],['legend','LEGEND','Starts at 40 yds · prize 🪙 800']].forEach((t,i)=>{bx(W*0.1,H*0.18+i*84,W*0.8,70,'',()=>window.rvStart&&rvStart(t[0]),i===1);ctx.fillStyle=i===1?GREEN:'#fff';ctx.font='900 18px system-ui';ctx.textAlign='center';ctx.fillText(t[1],W/2,H*0.18+i*84+30);ctx.font='12px system-ui';ctx.fillStyle=i===1?'#063':'#bcd';ctx.fillText(t[2],W/2,H*0.18+i*84+52)});back();return true}
 const r=osc.apply(this,arguments);
 if(state==='set')bx(W/2-Math.min(140,W*0.4),H*0.3+182,Math.min(280,W*0.8),36,'⚙️ MORE SETTINGS',()=>state='mset',false,13);
 if(state==='title'){const dr=FGF_DAILYREADY(),ch=J('fgfCH',null);let t=ch?'🎯 Beat '+ch.n+"'s "+ch.s+' in Classic!':dr.length?'🎁 Daily ready: '+dr.join(' · ')+' ▶':'';if(!LS.fgfEA&&window.FGF_EARLY&&(!t||((Date.now()/5000|0)%2)))t='🤖 Get it early on Android ▶';
  if(t&&!(toastT>0)){ctx.save();ctx.font='900 12px system-ui';const tw=Math.min(W*0.92,ctx.measureText(t).width+28),tx=W/2-tw/2,and=t.includes('Android'),by=Math.max(6,(window.__SAFE_TOP||0)+4);ctx.fillStyle=and?'#f2c230':'rgba(120,20,20,0.95)';ctx.strokeStyle=and?'#063':'rgba(242,194,48,0.6)';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(tx,by,tw,26,13);ctx.fill();ctx.stroke();ctx.fillStyle=and?'#063':'#fff';ctx.textAlign='center';ctx.fillText(t,W/2,by+17,tw-16);ctx.restore();btn(tx,by-2,tw,30,()=>{if(and)FGF_EARLY();else state=ch?'title':'hub'})}
  if((+LS.fgfRounds||0)>=1&&!LS.fgfSOseen&&window.FGF_POPGATE&&FGF_POPGATE('so')){BTN=[];ctx.fillStyle='rgba(0,0,0,.66)';ctx.fillRect(0,0,W,H);panel(W*0.08,H*0.27,W*0.84,H*0.4);txt('🎁 STARTER PACK',W/2,H*0.33,24,GOLD,'#063');ctx.fillStyle='#fff';ctx.font='14px system-ui';ctx.textAlign='center';ctx.fillText('5,000 coins + Neon Night turf + a backdrop',W/2,H*0.38);ctx.fillStyle='#bcd';ctx.font='12px system-ui';ctx.fillText('One-time offer · Google Play app only',W/2,H*0.41);
   ctx.save();ctx.globalAlpha=0.45;panel(W*0.2,H*0.45,W*0.6,46);ctx.fillStyle='#ddd';ctx.font='900 15px system-ui';ctx.fillText('🔒 GOOGLE PLAY APP',W/2,H*0.45+29);ctx.restore();bx(W*0.3,H*0.56,W*0.4,40,'Maybe later',()=>LS.fgfSOseen='1',true,14)}}
 return r};
window.FGF_OVERX=function(){{const lv=FGF_LV(),nx=Math.ceil((lv.l+1)/5)*5,y=H*0.55,bw=W*0.72;ctx.save();ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(W/2-bw/2,y,bw,12);ctx.fillStyle=GOLD;ctx.fillRect(W/2-bw/2,y,bw*lv.cur/lv.need,12);ctx.fillStyle='#fff';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('LV '+lv.l+' '+FGF_TITLE()+' · '+lv.cur+'/'+lv.need+' XP',W/2,y-6);ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('Next unlock: 🪙 '+(100*nx)+' at level '+nx,W/2,y+28);ctx.restore();
  if(score>0&&score>=best)bx(W/2-70,H*0.86,140,30,'📤 Share best',()=>share('New personal best: '+score.toLocaleString()+' points'),false,12)}
};
// music: soft synth pads in menus only
let mi=0;setInterval(()=>{if(LS.fgfMusic!=='1'||LS.fgfMute==='1'||state==='play'||document.hidden)return;const C=[[262,330,392],[220,262,330],[175,220,262],[196,247,294]][mi++%4];try{window.__CH='music';C.forEach(f=>tone(f,f,2.2,0.025,'sine'))}catch(e){}finally{window.__CH=null}},2400);
})();
addEventListener('pointerdown',e=>{if(state!=='over'||!(score>0&&score>=best))return;const x=e.clientX,y=e.clientY;if(x>=W/2-70&&x<=W/2+70&&y>=H*0.86-6&&y<=H*0.86+36){e.stopImmediatePropagation();share('New personal best: '+score.toLocaleString()+' points')}},true);
