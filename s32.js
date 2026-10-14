// s32: Online Head-to-Head (Supabase REST + Realtime). Quick Match + Private Room. Host rolls dist/wind; turn-based.
(function(){
const SB=()=>window.FGF_ONLINE||{url:'https://fdmcgupjmjfpraznmsew.supabase.co',anonKey:'sb_publishable_944lD1vIQwA5DGifZqbFJw_AuC1xUkz'};
const OH=()=>{const s=SB();return{apikey:s.anonKey,Authorization:'Bearer '+s.anonKey,'Content-Type':'application/json','Prefer':'return=representation'}};
const uid=()=>{let id=LS.fgfUID;if(!id){id='u'+Math.random().toString(36).slice(2)+Date.now().toString(36);LS.fgfUID=id}return id};
const myIni=()=>{const v=LS.fgfOLIni;if(v&&v!=='FGF'&&v.length===3)return v;return null};
const DK=window.FGF_DK||(()=>new Date().toISOString().slice(0,10));
let H2={room:null,sub:null,poll:null,role:null,ai:0,grace:0,waitT:0,busy:0,lastKick:0};
window.FGF_H2=()=>H2;
async function api(path,opt){const s=SB();const r=await fetch(s.url+'/rest/v1/'+path,{...opt,headers:Object.assign(OH(),(opt&&opt.headers)||{})});if(!r.ok){const t=await r.text();throw new Error(r.status+' '+t.slice(0,120))}const j=await r.text();return j?JSON.parse(j):null}
function code6(){const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<6;i++)s+=A[Math.random()*A.length|0];return s}
function roll(){const d=25+Math.round(Math.random()*40),mph=Math.round(Math.random()*14),a=Math.random()*6.283;return{dist:d,wind:{mph,a,x:Math.sin(a)*mph,z:Math.cos(a)*mph*0.3}}}
async function patch(id,fields){fields.updated_at=new Date().toISOString();return api('h2h_rooms?id=eq.'+id,{method:'PATCH',body:JSON.stringify(fields)})}
function leave(){stopSub();H2={room:null,sub:null,poll:null,role:null,ai:0,grace:0,waitT:0,busy:0,lastKick:0};if(['h2h','h2play','h2res'].includes(state))state='hub'}
function stopSub(){try{if(H2.sub){H2.sub.close();H2.sub=null}}catch(e){}if(H2.poll){clearInterval(H2.poll);H2.poll=null}}
function applyRoom(r){if(!r)return;H2.room=r;if(r.status==='active'&&state!=='h2play'&&state!=='h2res'){mode='h2h';lives=H2.role==='host'?r.host_lives:r.guest_lives;dist=r.dist;const w=r.wind||{};wind={mph:w.mph||0,a:w.a||0,x:w.x||0,z:w.z||0};state='h2play';msg=null;resetBall();paused=false}
 if(r.status==='done'||r.status==='forfeit'){state='h2res'}}
async function refresh(){if(!H2.room)return;try{const rows=await api('h2h_rooms?id=eq.'+H2.room.id+'&select=*');if(rows&&rows[0])applyRoom(rows[0])}catch(e){}}
function subscribe(id){stopSub();const s=SB(),host=s.url.replace(/^https?:\/\//,''),url='wss://'+host+'/realtime/v1/websocket?apikey='+encodeURIComponent(s.anonKey)+'&vsn=1.0.0';let ref=0;const ws=new WebSocket(url);H2.sub=ws;
 ws.onopen=()=>{const payload={config:{postgres_changes:[{event:'*',schema:'public',table:'h2h_rooms',filter:'id=eq.'+id}],broadcast:{ack:false},presence:{key:uid()}},access_token:s.anonKey};ws.send(JSON.stringify({topic:'realtime:public:h2h_rooms',event:'phx_join',payload:payload,ref:String(++ref)}))};
 ws.onmessage=e=>{try{const m=JSON.parse(e.data);const rec=m.payload&&(m.payload.record||(m.payload.data&&m.payload.data.record));if(rec)applyRoom(rec)}catch(err){}};
 ws.onerror=()=>{};ws.onclose=()=>{};H2.poll=setInterval(refresh,2000)}
async function needIni(){if(myIni())return myIni();toast('Set 3 initials first (Online Board)');state='olb';if(window.FGF_ASKINI)FGF_ASKINI(true);return null}
async function createRoom(priv){const ini=await needIni();if(!ini)return;H2.busy=1;try{const roll0=roll(),body={code:priv?code6():null,status:'waiting',host_ini:ini,host_id:uid(),turn:uid(),dist:roll0.dist,wind:roll0.wind,expires_at:new Date(Date.now()+15*60e3).toISOString()};
 const rows=await api('h2h_rooms',{method:'POST',body:JSON.stringify(body)});H2.role='host';H2.waitT=performance.now();applyRoom(rows[0]);subscribe(rows[0].id);state='h2h';toast(priv?'🔗 Room '+rows[0].code+' · share the code':'🔎 Searching for an opponent…')}catch(e){toast('Online H2H unavailable right now');console.warn(e)}H2.busy=0}
async function joinCode(c){const ini=await needIni();if(!ini)return;c=(c||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);if(c.length<4){toast('Enter the 6-letter code');return}H2.busy=1;
 try{const rows=await api('h2h_rooms?code=eq.'+c+'&status=eq.waiting&select=*');if(!rows||!rows[0]){toast('No open room with that code');H2.busy=0;return}
 const r=rows[0];if(r.host_id===uid()){toast('That\'s your own room');H2.busy=0;return}
 const upd=await patch(r.id,{guest_ini:ini,guest_id:uid(),status:'active',turn:r.host_id});H2.role='guest';applyRoom((upd&&upd[0])||Object.assign(r,{guest_ini:ini,guest_id:uid(),status:'active'}));subscribe(r.id);state='h2h';toast('⚔️ Matched vs '+r.host_ini)}catch(e){toast('Could not join · try again')}H2.busy=0}
async function quickMatch(){const ini=await needIni();if(!ini)return;H2.busy=1;
 try{const open=await api('h2h_rooms?status=eq.waiting&code=is.null&order=created_at.asc&limit=1&select=*');if(open&&open[0]&&open[0].host_id!==uid()){const r=open[0];const upd=await patch(r.id,{guest_ini:ini,guest_id:uid(),status:'active',turn:r.host_id});H2.role='guest';applyRoom((upd&&upd[0])||Object.assign(r,{guest_ini:ini,guest_id:uid(),status:'active'}));subscribe(r.id);state='h2h';toast('⚔️ Matched vs '+r.host_ini)}else await createRoom(false)}catch(e){toast('Online H2H unavailable right now')}H2.busy=0}
function startAI(){if(!H2.room||H2.role!=='host')return;H2.ai=1;patch(H2.room.id,{guest_ini:'CPU',guest_id:'ai',status:'active',ai:true,turn:H2.room.host_id}).then(r=>{applyRoom((r&&r[0])||Object.assign(H2.room,{guest_ini:'CPU',guest_id:'ai',status:'active',ai:true}));toast('🤖 No opponent · playing the computer')})}
function myTurn(){const r=H2.room;if(!r||r.status!=='active')return false;return r.turn===(H2.role==='host'?r.host_id:r.guest_id)}
async function submitKick(good){const r=H2.room;if(!r||!myTurn()||performance.now()-H2.lastKick<800)return;H2.lastKick=performance.now();
 const host=H2.role==='host',sc=host?'host_score':'guest_score',lv=host?'host_lives':'guest_lives',fields={last_result:{who:H2.role,good,dist:r.dist},round:(r.round||0)+1};
 fields[sc]=(r[sc]||0)+(good?dist:0);if(!good)fields[lv]=Math.max(0,(r[lv]||3)-1);
 const hL=host?(fields[lv]??r.host_lives):r.host_lives,gL=host?r.guest_lives:(fields[lv]??r.guest_lives);
 if(hL<=0||gL<=0){fields.status='done';fields.turn=null}else{const next=host?r.guest_id:r.host_id;fields.turn=next;if(host){const rr=roll();fields.dist=rr.dist;fields.wind=rr.wind}}
 try{const upd=await patch(r.id,fields);applyRoom((upd&&upd[0])||Object.assign({},r,fields));if(H2.ai&&fields.turn==='ai')setTimeout(aiKick,900)}catch(e){toast('Could not sync kick')}}
function aiKick(){const r=H2.room;if(!r||r.turn!=='ai')return;const good=Math.random()<Math.max(0.35,0.9-(r.dist-25)*0.012);const fields={last_result:{who:'ai',good,dist:r.dist},round:(r.round||0)+1,guest_score:(r.guest_score||0)+(good?r.dist:0)};if(!good)fields.guest_lives=Math.max(0,(r.guest_lives||3)-1);
 if(fields.guest_lives===0||r.host_lives<=0){fields.status='done';fields.turn=null}else{fields.turn=r.host_id;const rr=roll();fields.dist=rr.dist;fields.wind=rr.wind}
 patch(r.id,fields).then(u=>applyRoom((u&&u[0])||Object.assign({},r,fields)))}
const oN=S3.next;S3.next=function(good){if(mode==='h2h'&&H2.room){try{pendNext=null}catch(e){}submitKick(!!good);return true}return oN.apply(this,arguments)};
// disconnect grace
setInterval(()=>{if(!H2.room)return;if(H2.room.status==='waiting'&&H2.role==='host'&&!H2.ai&&performance.now()-H2.waitT>25000)startAI();
 if(H2.room.status==='active'){const mine=myTurn();if(!mine){if(!H2.grace)H2.grace=performance.now();else if(performance.now()-H2.grace>20000){const who=H2.role==='host'?'guest':'host';patch(H2.room.id,{status:'forfeit',last_result:{who:'timeout',side:who}}).then(u=>applyRoom((u&&u[0])||Object.assign(H2.room,{status:'forfeit'})));H2.grace=0}}else H2.grace=0;if(H2.sub&&H2.sub.readyState>1&&H2.role==='host'){if(!H2.wsGrace)H2.wsGrace=performance.now();else if(performance.now()-H2.wsGrace>12000){patch(H2.room.id,{status:'forfeit',last_result:{who:'disconnect'}}).then(u=>applyRoom((u&&u[0])||Object.assign(H2.room,{status:'forfeit'})));H2.wsGrace=0}}else H2.wsGrace=0}},1000);
const osc=S3.screen;S3.screen=function(){if(state==='h2menu'){BTN=[];txt('⚔️ ONLINE H2H',W/2,H*0.14,Math.min(30,W*0.08),GOLD,'#063');ctx.fillStyle='#cde';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText('Same kick for both · turn-based · initials as your name',W/2,H*0.14+26,W*0.9);
  const bw=Math.min(300,W*0.84),x=W/2-bw/2;bx(x,H*0.32,bw,56,'🔎 QUICK MATCH',()=>{if(!H2.busy)quickMatch()},true,15);bx(x,H*0.32+70,bw,56,'🔗 CREATE PRIVATE ROOM',()=>{if(!H2.busy)createRoom(true)},false,14);bx(x,H*0.32+140,bw,56,'🔑 JOIN WITH CODE',()=>{const c=prompt('Enter room code');if(c)joinCode(c)},false,14);
  bx(W/2-90,H*0.93-18,180,38,'◀ BACK',()=>state='hub');return true}
 if(state==='h2h'){BTN=[];const r=H2.room||{};txt(r.code?'🔗 ROOM '+r.code:'🔎 MATCHMAKING',W/2,H*0.16,Math.min(26,W*0.07),GOLD,'#063');
  if(r.status==='waiting'){txt('Waiting for an opponent…',W/2,H*0.3,16,'#fff');ctx.fillStyle='#bcd';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText(r.code?'Share this code with a friend':'Looking for a Quick Match…',W/2,H*0.36);ctx.fillText('Computer fills in after 25s if no one joins',W/2,H*0.42);if(r.code)bx(W*0.2,H*0.5,W*0.6,40,'📋 Copy code',()=>{navigator.clipboard&&navigator.clipboard.writeText(r.code).then(()=>toast('Code copied'))},false,14)}
  else{txt((r.host_ini||'?')+'  vs  '+(r.guest_ini||'?')+(r.ai?' (CPU)':''),W/2,H*0.3,18,'#fff');txt((r.host_score||0)+'  —  '+(r.guest_score||0),W/2,H*0.38,32,GOLD);bx(W*0.2,H*0.5,W*0.6,48,'▶ GO TO KICK',()=>{applyRoom(r);state='h2play';newGame('classic');mode='h2h';dist=r.dist;const w=r.wind||{};wind={mph:w.mph||0,a:w.a||0,x:w.x||0,z:w.z||0};lives=H2.role==='host'?r.host_lives:r.guest_lives;resetBall()},true,15)}
  bx(W/2-90,H*0.93-18,180,38,'✕ LEAVE',leave,false,14);return true}
 if(state==='h2play'){BTN=[];const r=H2.room||{},me=H2.role==='host',mine=myTurn();
  ctx.fillStyle='rgba(0,0,0,0.55)';ctx.beginPath();ctx.roundRect(W*0.06,8,W*0.88,58,12);ctx.fill();ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText((r.host_ini||'H')+' '+ (r.host_score||0)+'  ·  '+(r.guest_score||0)+' '+(r.guest_ini||'G')+(r.ai?' 🤖':''),W/2,28);
  ctx.fillStyle=mine?'#7fe87f':'#ffb36b';ctx.font='900 12px system-ui';ctx.fillText(mine?'YOUR TURN · '+dist+' YDS':('Waiting for '+(me?r.guest_ini:r.host_ini)+'…'),W/2,48);
  ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('🏈 '+(me?r.host_lives:r.guest_lives)+' left · round '+(r.round||0),W/2,H*0.92);
  if(!mine&&!ball.fly){/* block kicks */}bx(W*0.04,H*0.93-18,90,36,'✕ Quit',leave,false,12);return false}
 if(state==='h2res'){BTN=[];const r=H2.room||{},me=H2.role==='host',ms=r.host_score||0,os=r.guest_score||0,win=r.status==='forfeit'?true:(me?ms>=os:os>=ms);
  txt(r.status==='forfeit'?'⚠️ OPPONENT LEFT':(win?'🏆 YOU WIN!':'💀 YOU LOSE'),W/2,H*0.22,Math.min(30,W*0.08),win?GOLD:'#ff6b6b','#063');
  txt((r.host_ini||'?')+'  '+ms+'  —  '+os+'  '+(r.guest_ini||'?'),W/2,H*0.34,18,'#fff');if(win&&!r.ai){addCoins(200);toast('⚔️ H2H win  🪙 +200')}bx(W*0.15,H*0.5,W*0.7,48,'PLAY AGAIN',()=>{leave();state='h2menu'},true,15);bx(W/2-90,H*0.5+64,180,40,'◀ HUB',()=>{leave();state='hub'},false,14);return true}
 return osc.apply(this,arguments)};
// block input when not your turn
const ok=kick;kick=function(){if(mode==='h2h'&&H2.room&&!myTurn()){toast('Wait for your turn');return}return ok.apply(this,arguments)};
try{const L=SHOP&&0}catch(e){}
// inject hub entry via screen wrapper on hub: already many cards; add via s20 patch below
window.FGF_H2MENU=()=>{state='h2menu'};
window.FGF_H2_TEST={createRoom,joinCode,quickMatch,leave,api,uid};
})();
