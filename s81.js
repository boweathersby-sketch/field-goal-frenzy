// s78 (Kirk, Oct 17 · daily ideas 1-10, 51, 52, 54-57, 59): gameplay ideas + in-game comfort. Free, local, no new art.
// Also the shared calm UI kit (FGF_UI) used by s82-s84. Options live in Events & More › YOU › 🎯 KICK OPTIONS / ♿ EASY PLAY.
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t,J2=(k,d)=>{try{const v=JSON.parse(LS[k]);return v==null?d:v}catch(e){return d}},S2=(k,v)=>LS[k]=JSON.stringify(v);
const DK=(d)=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const hash=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const esc=s=>String(s).replace(/[<&">]/g,c=>({'<':'&lt;','&':'&amp;','"':'&quot;','>':'&gt;'})[c]);
const WEEK=()=>window.FGF_WK?FGF_WK():DK();
// ---------- calm UI kit: soft borders, dark panels, muted gold headers, big well-spaced rows ----------
const BS='box-sizing:border-box;border:1px solid rgba(160,190,175,.32);background:rgba(10,30,20,.92);color:#eef5f0;border-radius:12px;padding:11px 12px;font:800 13px system-ui;min-height:44px;line-height:1.25';
const ON='border-color:rgba(127,211,138,.85);color:#9fe3a8';
const ROW='padding:11px 12px;margin-bottom:8px;border-radius:12px;background:rgba(10,30,20,.85);border:1px solid rgba(160,190,175,.18);line-height:1.35';
const SUB='font:12px system-ui;color:#9fb8aa';
const H2=t=>`<div style="color:#d9c67a;font:900 12px system-ui;letter-spacing:.3px;margin:14px 2px 8px">${T_(t)}</div>`;
function card(h,html,id,opt){id=id||'fgfs78';opt=opt||{};const o=document.getElementById(id);if(o)o.remove();const d=document.createElement('div');d.id=id;d.className='fgfov';d.style.cssText='position:fixed;inset:0;background:rgba(2,8,6,.86);z-index:'+(opt.z||73)+';display:flex;align-items:center;justify-content:center;padding:12px';
 d.innerHTML=`<div style="background:#08190f;border:1px solid rgba(160,190,175,.28);border-radius:16px;padding:14px 14px 12px;max-width:380px;width:100%;color:#eef5f0;font:14px system-ui;max-height:90vh;display:flex;flex-direction:column;box-sizing:border-box"><div style="color:#e2cf7f;font:900 17px system-ui;text-align:center;margin-bottom:8px;overflow-wrap:anywhere">${h}</div><div class="bd" style="overflow-y:auto;flex:1;min-height:0;overflow-wrap:anywhere;-webkit-overflow-scrolling:touch">${html}</div>${opt.nox?'':`<button class="x" style="${BS};margin-top:10px;width:100%">${opt.x||'◀ '+T_('BACK')}</button>`}</div>`;
 d.dataset.fgfui='1';document.body.appendChild(d);trTree(d);const x=d.querySelector('.x');if(x)x.onclick=()=>{d.remove();if(opt.onx)opt.onx()};d.style.pointerEvents='none';setTimeout(()=>d.style.pointerEvents='',300);return d}
// translate any plain text left inside these cards (lang ≠ en); numbers/emoji handled by FGF_TR
const TRW=new WeakMap();function trTree(r){if((LS.fgfLang||'en')==='en'||!window.FGF_TR||!r)return;const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode())){const v=n.nodeValue;if(TRW.get(n)===v)continue;const p=n.parentElement;if(p&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName)){TRW.set(n,v);continue}const t=v.trim();if(t&&/[A-Za-z]{2}/.test(t)){const o=FGF_TR(t);if(o&&o!==t)n.nodeValue=v.replace(t,o)}TRW.set(n,n.nodeValue)}if(r.querySelectorAll)r.querySelectorAll('input[placeholder]').forEach(i=>{if(!i.__tp){i.__tp=1;i.placeholder=FGF_TR(i.placeholder)}})}
window.FGF_TRTREE=trTree;
new MutationObserver(ms=>{const seen=new Set();for(const m of ms){const t=m.target.nodeType===1?m.target:m.target.parentElement;const c=t&&t.closest&&t.closest('[data-fgfui]');if(c&&!seen.has(c)){seen.add(c);trTree(c)}}}).observe(document.body,{childList:true,subtree:true,characterData:true});
const tog=(k,label,note,def)=>{const on=def?LS[k]!=='0':LS[k]==='1';return `<button data-tog="${k}" data-def="${def?1:0}" style="${BS};display:block;width:100%;text-align:left;margin-bottom:8px;${on?ON:''}">${on?'✓ ':'○ '}${T_(label)} · ${on?T_('ON'):T_('OFF')}${note?`<div style="${SUB};font-weight:400;margin-top:3px">${T_(note)}</div>`:''}</button>`};
const bindTog=(d,re)=>d.querySelectorAll('[data-tog]').forEach(b=>b.onclick=()=>{const k=b.dataset.tog,def=b.dataset.def==='1',on=def?LS[k]!=='0':LS[k]==='1';LS[k]=on?'0':'1';re()});
const empty=t=>`<div style="${ROW};color:#9fb8aa;text-align:center">🌱 ${T_(t)}</div>`;
// Supabase (free tier, anon insert/select only; same project + publishable key as s43)
const SBU='https://fdmcgupjmjfpraznmsew.supabase.co',KEY=()=>(window.FGF_ONLINE&&(FGF_ONLINE.anonKey||FGF_ONLINE.key))||'sb_publishable_944lD1vIQwA5DGifZqbFJw_AuC1xUkz';
async function api(path,opt){opt=opt||{};const r=await fetch(SBU+'/rest/v1/'+path,Object.assign({},opt,{headers:Object.assign({apikey:KEY(),Authorization:'Bearer '+KEY(),'Content-Type':'application/json'},opt.headers||{})}));if(opt.count){const c=r.headers.get('content-range');return c?+c.split('/')[1]:0}const t=await r.text();if(!r.ok)throw new Error(t);return t?JSON.parse(t):null}
const uid=()=>{let id=LS.fgfUID;if(!id){id='u'+Math.random().toString(36).slice(2)+Date.now().toString(36);LS.fgfUID=id}return id};
const ini=()=>{const v=LS.fgfOLIni;return v&&v!=='FGF'&&/^[A-Z]{3}$/.test(v)?v:null};
const MN=m=>{const x=(window.MODES||[]).find(q=>q[0]===m);if(x)return T_(x[1]);const y=(window.FGF_MODES2||[]).find(q=>q[0]===m);return y?T_(y[2]):String(m||'').replace(/^xm_/,'').toUpperCase()};
window.FGF_UI={T_,J2,S2,DK,hash,esc,WEEK,BS,ON,ROW,SUB,H2,card,tog,bindTog,empty,api,uid,ini,MN};
const ST=()=>/^(hurricane|storm|tornado|twister|dstorm)$/.test(mode);
const PLAYM=()=>state==='play'&&mode!=='tut';

// ================= 1) TIME ATTACK COMBO (x2 for 2 in a row, x3 for 4+; a miss resets) =================
// ================= 51) crowd roar grows with distance · 52) small X where a miss landed =================
let MX=null;
const oRes=result;result=function(r){const s0=score;const out=oRes.apply(this,arguments);try{const good=r==='GOOD!';
 if(good&&mode==='time'){const m=streak>=4?3:streak>=2?2:1;if(m>1){const d=score-s0;score+=d*(m-1);if(msg)msg.s=(msg.s||'')+'  ⚡ '+T_('COMBO')+' x'+m}}
 if(good&&dist<80&&mode!=='tut'){const k=Math.max(0,Math.min(1,(dist-25)/50));if(k>0.08){noise(1+k*2.2,850,0.5,0.1+k*0.42,0.18);if(k>0.6)setTimeout(()=>noise(1.4,1900,0.7,0.08+k*0.15,0.3),250)}}
 if(!good&&r!=='BLOCKED!'&&ball)MX={x:ball.x,z:Math.max(4,Math.min(ball.z,dist+2))};}catch(e){}return out};
const oDB=drawBall;drawBall=function(){try{if(MX&&state==='play'&&ball&&ball.done&&LS.fgfMissX!=='0'){const p=SP(MX.x,0.15,MX.z);if(p){const s=Math.max(5,Math.min(13,p.s*1.1));ctx.save();ctx.strokeStyle='rgba(255,120,110,.85)';ctx.lineWidth=Math.max(2,s*0.28);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(p.x-s,p.y-s*0.6);ctx.lineTo(p.x+s,p.y+s*0.6);ctx.moveTo(p.x+s,p.y-s*0.6);ctx.lineTo(p.x-s,p.y+s*0.6);ctx.stroke();ctx.restore()}}}catch(e){}return oDB.apply(this,arguments)};

// ================= 3) HASH MARKS · 4) THIN AIR · 5) ICING · 8) LATE SNAP =================
let HOLD=null;// {k:'ice'|'snap',t,dur}
window.__HASHX=0;
const thin=()=>{try{return stadT()===6&&!ST()&&dist<80&&mode!=='tut'}catch(e){return false}};
let iced=null;
const oRB=resetBall;resetBall=function(){const r=oRB.apply(this,arguments);try{MX=null;HOLD=null;
 const hm=LS.fgfHash==='1'&&state==='play'&&/^(classic|time|range|career|pressure)$/.test(mode);window.__HASHX=hm?[-1.8,0,1.8][Math.random()*3|0]:0;
 if(state==='play'&&LS.fgfIcing!=='0'){const ck=mode==='career'&&typeof CG!=='undefined'&&CG&&CG.kick&&S3.cl();const pk=mode==='pressure'&&roundN>=3&&Math.random()<0.35;if((ck&&iced!==CG.kick)||pk){if(ck)iced=CG.kick;HOLD={k:'ice',t:0,dur:2.6};try{sfx.whistle()}catch(e){}}}
 if(!HOLD&&state==='play'&&LS.fgfLateSnap==='1'&&mode!=='tut'&&!ST()&&Math.random()<0.12)HOLD={k:'snap',t:0,dur:0.9+Math.random()*0.7};
 SW=0;setTimeout(band,0)}catch(e){}return r};
const oK=kick;kick=function(){if(HOLD&&state==='play'){try{toast(HOLD.k==='ice'?'⏱️ '+T_('Timeout! Wait for the whistle'):'⏳ '+T_('Wait for the snap!'))}catch(e){}return}const f=ball&&ball.fly;const r=oK.apply(this,arguments);try{if(!f&&ball&&ball.fly&&thin()){ball.vz*=1.03;ball.vy*=1.015}}catch(e){}return r};
addEventListener('pointerdown',e=>{if(HOLD&&state==='play'&&!(e.target.closest&&e.target.closest('.fgfov'))){e.stopPropagation()}},true);
addEventListener('keydown',e=>{if(HOLD&&state==='play'&&e.key===' ')e.stopPropagation()},true);
// ================= 54) GAME SPEED 75% (ball flight + animations; the Time Attack clock stays real-time) =================
const oUp=update;update=function(dt){if(LS.fgfSpeed75==='1'&&state==='play'&&mode!=='tut'&&!(window.FGF_LGCEL&&FGF_LGCEL.on)){const r=oUp.call(this,dt*0.75);try{if(mode==='time'&&timeLeft>0)timeLeft=Math.max(0,timeLeft-dt*0.25)}catch(e){}return r}return oUp.apply(this,arguments)};
// ================= 55) soft tone when swipe power is in the sweet spot =================
let BAND=null,SW=0;
function band(){BAND=null;if(LS.fgfSweet!=='1'||!window.FGF_SOLVER||state!=='play')return;try{let c=null;if(ST()&&window.FGF_STORMCFG)c=FGF_STORMCFG();if(!c)c={dist,weather,wind:{x:wind.x,z:wind.z},wp:ball.wp,gust:weather==='gust'?'g':null,swirl:null,pox:[window.__POX||0]};
 const ok=[];for(let p=0.05;p<=1.001;p+=0.05){let lo=-1.1,hi=1.1,I={},hit=false;const at=th=>{I={};return FGF_SOLVER.sim(c,p,th,0,0,(c.pox||[0])[0],0,I)};if(at(0)){hit=true}else{for(let k=0;k<14;k++){const m=(lo+hi)/2;if(at(m)){hit=true;break}if(!(I.cx===I.cx))break;if(I.cx<0)lo=m;else hi=m}}if(hit)ok.push(p)}
 if(ok.length)BAND=[ok[0]-0.03,ok[ok.length-1]+0.03]}catch(e){BAND=null}}
// ================= per-frame: hold banners, hash/thin-air chips, sweet tone, take-a-break =================
let playS=+(sessionStorage.fgfPlayS||0),brk=sessionStorage.fgfBrk==='1',lastT=performance.now();
const chip=(t,y,col)=>{ctx.save();ctx.font='800 12px system-ui';ctx.textAlign='center';const w=Math.min(W*0.92,ctx.measureText(t).width+22);ctx.fillStyle='rgba(6,18,12,.72)';ctx.strokeStyle='rgba(160,190,175,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(W/2-w/2,y-15,w,22,11);ctx.fill();ctx.stroke();ctx.fillStyle=col||'#dfeee6';ctx.fillText(t,W/2,y,W*0.88);ctx.restore()};
const oTop=S3.top;S3.top=function(dt){const r=oTop.apply(this,arguments);try{const now=performance.now(),rd=Math.min(0.1,(now-lastT)/1000);lastT=now;
 if(PLAYM()&&!paused){playS+=rd;if(((playS*10)|0)%50===0)sessionStorage.fgfPlayS=playS|0;if(LS.fgfBreak45==='1'&&!brk&&playS>=45*60&&!ball.fly&&!msg){brk=true;sessionStorage.fgfBrk='1';paused=true;const d=card('🌿 '+T_('TIME FOR A BREAK?'),`<div style="${ROW};text-align:center">${T_("You've played for 45 minutes.")}<div style="${SUB};margin-top:4px">${T_('Stretch, drink some water, rest your eyes. Your run is paused.')}</div></div>`,'fgfs78brk',{x:'▶ '+T_('KEEP PLAYING'),onx:()=>{paused=false}})}}
 if(HOLD&&state==='play'&&!paused){HOLD.t+=rd;if(typeof waitT!=='undefined')waitT=0;const a=Math.min(1,HOLD.t*4,(HOLD.dur-HOLD.t)*4);ctx.save();ctx.globalAlpha=Math.max(0,a)*0.5;ctx.fillStyle='#02070a';ctx.fillRect(0,0,W,H);ctx.restore();
  if(HOLD.k==='ice')chip('⏱️ '+T_("TIMEOUT · they're icing the kicker"),H*0.42,'#ffe7a3');else chip('⏳ '+T_('LATE SNAP · wait a beat…'),H*0.42,'#ffe7a3');
  if(HOLD.t>=HOLD.dur){const k=HOLD.k;HOLD=null;try{if(k==='ice')sfx.whistle();else thump(160,0.5,0.1)}catch(e){}toast(k==='ice'?'🏈 '+T_('Timeout over · kick when ready'):'🏈 '+T_('SNAP! Kick it'))}}
 if(state==='play'&&ball&&!ball.fly&&!msg&&!HOLD&&!paused){let y=H*0.205;if(window.__HASHX){chip(window.__HASHX>0?'⬅ '+T_('LEFT HASH · posts sit to your right'):T_('RIGHT HASH · posts sit to your left')+' ➡',y);y+=26}if(thin())chip('🏔️ '+T_('THIN AIR · the ball carries a few extra yards'),y,'#cfe9ff')}
 if(LS.fgfSweet==='1'&&state==='play'&&ball&&!ball.fly&&swipe&&swipe.length>1&&BAND){const p=swipePower();if(p>=BAND[0]&&p<=BAND[1]&&!SW){SW=1;try{tone(660,660,0.14,0.07,'sine');setTimeout(()=>tone(990,990,0.1,0.04,'sine'),70)}catch(e){}}}
 if(!swipe)SW=0}catch(e){}return r};

// ================= 6) COACH'S CALL (Career): kick the long one now, or gamble on one more play =================
const oBK=beginKick;beginKick=function(){try{const k=CG&&CG.kick;if(LS.fgfCoach!=='0'&&k&&k.t==='fg'&&k.d>=46&&!k.cc&&!/RE-KICK/.test(k.lab||'')){k.cc=1;const d=card('📋 '+T_("COACH'S CALL"),`<div style="${ROW};text-align:center"><div style="font:900 22px system-ui">${k.d} ${T_('yds')}</div><div style="${SUB}">${T_(k.lab||'')}</div></div>
  <button id="cc1" style="${BS};display:block;width:100%;margin-bottom:8px;${ON}">🦵 ${T_('KICK IT NOW')} · ${k.d} ${T_('yds')}</button>
  <button id="cc2" style="${BS};display:block;width:100%;text-align:left">🎲 ${T_('GAMBLE: run one more play')}<div style="${SUB};font-weight:400;margin-top:3px">${T_('55%: gain 7-10 yds (closer) · 45%: lose 5-8 yds')}</div></button>`,'fgfs78cc',{nox:1});
  d.querySelector('#cc1').onclick=()=>{d.remove();oBK.apply(this,arguments)};d.querySelector('#cc2').onclick=()=>{d.remove();const win=Math.random()<0.55,n=win?7+(Math.random()*4|0):5+(Math.random()*4|0);k.d=Math.max(20,Math.min(65,k.d+(win?-n:n)));k.lab=k.d+'-YD FIELD GOAL +3';toast(win?'✅ '+T_('Big gain! Now')+' '+k.d+' '+T_('yds'):'😬 '+T_('Sacked! Now')+' '+k.d+' '+T_('yds'));oBK.apply(this,arguments)};return}}catch(e){}return oBK.apply(this,arguments)};

// ================= 2) WIND CLIMB (Practice & Party): wind grows after every make, one miss ends it =================
try{const L=window.FGF_XMLIST;if(L&&!L.some(m=>m[0]==='wclimb'))L.splice(2,0,['wclimb','🌬️','WIND CLIMB','Wind grows after every make · one miss ends it'])}catch(e){}
const wmph=c=>Math.min(60,3+c.made*3);
(window.FGF_XMP=window.FGF_XMP||{}).wclimb={setup(c){dist=35;weather='clear';const a=(Math.random()<0.5?-1:1)*(0.9+Math.random()*0.6),m=wmph(c);wind={mph:m,a,x:Math.sin(a)*m,z:Math.cos(a)*m*0.3};c.top=Math.max(c.top||0,m)},
 next(c,good){if(!good)return 'fin';c.pts=c.made;toast('🌬️ '+T_('Next wind')+': '+wmph(c)+' mph');return true},
 res(c){return T_('Made')+' '+c.made+' · '+T_('top wind')+' '+(c.top||3)+' mph'},hud(c){return '🌬️ '+T_('WIND CLIMB')+' · '+c.made+' '+T_('made')+' · '+wmph(c)+' mph'}};

// ================= 56) bigger touch zones (canvas buttons + overlay buttons) =================
const oPick=pickBTN;pickBTN=function(x,y){const r=oPick.apply(this,arguments);if(r||LS.fgfBigTouch!=='1')return r;let best=null,bd=1e9;const P=24;for(const b of BTN){if(x>=b.x-P&&x<=b.x+b.w+P&&y>=b.y-P&&y<=b.y+b.h+P){const d=Math.hypot(Math.max(b.x-x,0,x-b.x-b.w),Math.max(b.y-y,0,y-b.y-b.h));if(d<bd){bd=d;best=b}}}return best};
const css=document.createElement('style');css.textContent='body.fgfbig .fgfov button{min-height:52px!important;padding-top:13px!important;padding-bottom:13px!important}body.fgfbig .fgfov input{min-height:48px}';document.head.appendChild(css);
setInterval(()=>document.body.classList.toggle('fgfbig',LS.fgfBigTouch==='1'),700);
// ================= 57) SIMPLE WORDS mode (English only): easier words for kids and new readers =================
const SW_=[[/\bSUDDEN DEATH\b/g,'LAST CHANCE'],[/\bSudden death\b/g,'Last chance'],[/\bsudden death\b/g,'last chance'],[/\bDOINK(-IN)?\b/g,'POST HIT'],[/\bDoink(-in)?s?\b/g,'Post hit'],[/\bdoink(-in)?s?\b/g,'post hit'],[/\bupwind\b/g,'into the wind'],[/\bcrosswind\b/gi,'side wind'],[/\bINTERCEPTION\b/g,'BALL STOLEN'],[/\bInterception\b/g,'Ball stolen'],[/\bOVERTIME\b/g,'EXTRA TIME'],[/\bOvertime\b/g,'Extra time'],[/\bPAT\b/g,'EXTRA POINT'],[/\bAttempts\b/g,'Tries'],[/\battempts\b/g,'tries'],[/\bAccuracy\b/g,'Hit rate'],[/\bconsecutive\b/g,'in a row'],[/\bLeaderboard\b/g,'Top scores'],[/\bLEADERBOARD\b/g,'TOP SCORES'],[/\bmultiplier\b/g,'boost'],[/\bHandicap\b/g,'Head start'],[/\bSEMIFINAL\b/g,'SEMI'],[/\bChampionship\b/g,'Final'],[/\bCHAMPIONSHIP\b/g,'FINAL'],[/\bvelocity\b/g,'speed'],[/\bGUST\b/g,'WIND BURST'],[/\bgusts?\b/g,'wind bursts'],[/\bROUGHING THE KICKER\b/g,'KICKER GOT BUMPED'],[/\bforfeit\b/g,'give up'],[/\bPrestige\b/g,'Star restart'],[/\bPRESTIGE\b/g,'STAR RESTART']];
const simp=s=>{if(typeof s!=='string'||LS.fgfSimple!=='1'||(LS.fgfLang&&LS.fgfLang!=='en'))return s;let o=s;for(const [a,b] of SW_)o=o.replace(a,b);return o};
{const P=CanvasRenderingContext2D.prototype,oF=P.fillText,oS=P.strokeText,oM=P.measureText;P.fillText=function(t,...a){return oF.call(this,simp(t),...a)};P.strokeText=function(t,...a){return oS.call(this,simp(t),...a)};P.measureText=function(t){return oM.call(this,simp(t))};const oT=window.FGF_TR;if(oT){window.FGF_TR=function(s){return simp(oT(s))}}}

// ================= option cards =================
function kickOpts(){const d=card('🎯 '+T_('KICK OPTIONS'),H2('ON THE FIELD')+tog('fgfHash','Hash-mark kicks','Ball on the left or right hash changes the angle (Classic, Time, Career, Pressure, Range)')+tog('fgfLateSnap','Late snap','Rare: the snap comes a beat late, wait for it')+tog('fgfIcing','Icing the kicker','Career clutch kicks and late Pressure rounds: a quiet timeout first',1)+tog('fgfMissX','Mark where a miss landed','A small X on the field after a miss',1)
 +H2('CAREER')+tog('fgfCoach',"Coach's Call",'Long field goals: kick now or gamble for a closer spot',1)
 +H2('ALWAYS ON')+`<div style="${ROW}">⚡ ${T_('Time Attack combo')}<div style="${SUB}">${T_('2 makes in a row = x2 points, 4+ = x3. A miss resets it.')}</div></div><div style="${ROW}">🏔️ ${T_('Thin air at Mountain Rams stadium')}<div style="${SUB}">${T_('The ball carries a few extra yards (not in storm modes or the Legend kick).')}</div></div><div style="${ROW}">🌬️ ${T_('Wind Climb')}<div style="${SUB}">${T_('More Modes › Practice & Party')}</div></div>`,'fgfs78ko');bindTog(d,kickOpts)}
function easy(){const d=card('♿ '+T_('EASY PLAY'),H2('COMFORT')+tog('fgfSpeed75','Game speed 75%','Slower ball flight and animations. Results are the same.')+tog('fgfSweet','Sweet-spot tone','A soft chime while your swipe power is just right')+tog('fgfBigTouch','Bigger touch zones','Easier to hit buttons everywhere')+tog('fgfSimple','Simple words','Easier words for kids and new readers (English)')+tog('fgfBreak45','Take-a-break note','A gentle note after 45 minutes of play')
 +H2('COLORS')+`<button id="cbp" style="${BS};display:block;width:100%;text-align:left">🎨 ${T_('Colorblind preview')}<div style="${SUB};font-weight:400;margin-top:3px">${T_('See every color mode side by side, then pick one')}</div></button>`,'fgfs78ez');bindTog(d,easy);d.querySelector('#cbp').onclick=()=>window.FGF_CBPREVIEW&&FGF_CBPREVIEW()}
window.FGF_KICKOPTS=kickOpts;window.FGF_EASY=easy;
window.FGF_S78TEST={get HOLD(){return HOLD},set HOLD(v){HOLD=v},get MX(){return MX},band,get BAND(){return BAND},thin,simp,kickOpts,easy,wmph};
})();
