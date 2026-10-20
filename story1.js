// story1.js (Kirk GO, Oct 19): CAREER STORY MODE · Stage 1 = HIGH SCHOOL SEASON 1 "Milk Jugs and Night Shifts".
// DOM story overlay (scenes, branching choices, meters, texts) + story kicks that use the NORMAL swipe kick (mode 'story').
// Meters: Fan Rep, Coach Trust (shown), Family (hidden). Daily: 2 free game weeks/day, rewarded ad (test IDs via FGF_ADAPTER)
// unlocks one more early; "Previously on" recap; one character text a day with a small coin gift. Saved in fgfStory.
// Fictional names only. Does not touch kicker/mascot art, the kicking animation or the Legend celebration (story kicks < 80 yds).
(function(){
const T_=t=>window.FGF_TR?FGF_TR(t):t,DAY=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
const FREE_WEEKS=2,TEXT_GIFT=25,S0={v:1,name:'',nick:'',pr:'they',node:'',fan:0,coach:0,fam:0,fl:{},wk:0,day:'',wd:0,ad:0,td:'',log:[],done:0};
let S=Object.assign({},S0,J('fgfStory',{}));const save=()=>SV('fgfStory',S);
const addC=n=>{coins+=n;if(!window.TESTER)LS.fgfCoins=coins};
const N=t=>t.replace(/\{n\}/g,S.name||'Kid').replace(/\{nick\}/g,S.nick||S.name||'Kid');
// ---------------- SEASON 1 CONTENT ----------------
const BG={dark:'#000',dawn:'linear-gradient(#1b2338,#4a3b52 60%,#a8705a)',yard:'linear-gradient(#2a3b5a,#5b6f7a 55%,#2f4a2a)',garage:'linear-gradient(#2a1d14,#4a3424 60%,#1d140e)',field:'linear-gradient(#0b1a33,#12305a 50%,#1d6a34)',night:'linear-gradient(#050a18,#0f1f3d 55%,#155a2c)',hosp:'linear-gradient(#0f2a2e,#1c4a4f 60%,#0c1c1f)',fog:'linear-gradient(#6b7378,#9aa3a8 55%,#3d5a40)',kitchen:'linear-gradient(#2b2117,#4d3b26 60%,#1a130c)',porch:'linear-gradient(#0d1426,#24304d 60%,#3a2d1f)'};
const IMG=id=>'story/'+id+'.webp',PIC={tx1:'tx1',tx2:'tx2',c1:'c1',c2:'c2',jq:'jq',c3:'c3',c4:'c4',c5:'c5',c6:'c6',c7:'c7',c8:'c8',c9:'c9',c10:'c10',c11:'c11',c12:'c12',c13:'c13',c14w:'c14w',c14l:'c14l',c15:'c15',c16:'c16'};
// panels that exist on disk; add an id here when its art lands (see story/ART-REDO.md). Avoids 404s.
const ART=new Set(['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13','c14w','c14l','c15','c16','field','end','jq','wk1','wk2','wk3','wk4','wk5','tx1','tx2']);
const pic=(id,cls)=>!ART.has(id)?'':'<div class="pic '+(cls||'')+'"><img src="'+IMG(id)+'" alt="" onerror="this.remove()"></div>';
// ---------- score: one looping cue per mood, 1s crossfade, respects MUSIC/mute/volume ----------
const MOOD={c1:'sad',c2:'home',jq:'home',c3:'home',c4:'hopeful',c5:'hopeful',c6:'home',c7:'hopeful',tx1:'home',c8:'hopeful',w1:'tense',c9:'hopeful',c10:'mystery',w2:'mystery',c11:'mystery',tx2:'home',c12:'tense',w3:'tense',c13:'rival',w4:'rival',w0:'tense',c14w:'triumph',c14l:'sad',c15:'home',c16:'sad',end:'sad'};
const MU={buf:{},cur:null,src:null,g:null,want:null};
function muOK(){return LS.fgfMusic==='1'&&LS.fgfMute!=='1'&&!document.hidden}
function muVol(){return 0.3}// MUSIC/MASTER sliders apply on the s47 music channel
function muStop(){if(!MU.src)return;const c=au(),g=MU.g,src=MU.src;MU.src=MU.g=null;MU.cur=null;try{g.gain.cancelScheduledValues(c.currentTime);g.gain.setValueAtTime(g.gain.value,c.currentTime);g.gain.linearRampToValueAtTime(0,c.currentTime+1);src.stop(c.currentTime+1.05)}catch(e){}}
function muStart(m){let c;try{c=au()}catch(e){return}if(!c)return;const go=b=>{if(MU.want!==m||!muOK()||MU.cur===m)return;muStop();const src=c.createBufferSource();src.buffer=b;src.loop=true;const g=c.createGain();g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(muVol(),c.currentTime+1);const pc=window.__CH;window.__CH='music';let out;try{out=OUT(c)}catch(e){out=c.destination}window.__CH=pc;src.connect(g);g.connect(out||c.destination);src.start();MU.src=src;MU.g=g;MU.cur=m};
 if(MU.buf[m])return go(MU.buf[m]);if(MU.buf[m]===0)return;MU.buf[m]=0;fetch('story/music/'+m+'.mp3').then(r=>r.arrayBuffer()).then(a=>c.decodeAudioData(a)).then(b=>{MU.buf[m]=b;go(b)}).catch(()=>{delete MU.buf[m]})}
function mood(m){MU.want=m||null;if(!m)return muStop();if(muOK())muStart(m)}
setInterval(()=>{try{if(!MU.want||!document.getElementById('fgfst')){if(MU.src)muStop();return}if(!muOK()){if(MU.src)muStop();return}if(MU.cur!==MU.want)muStart(MU.want);else if(MU.g){const c=au();MU.g.gain.setTargetAtTime(muVol(),c.currentTime,.2)}}catch(e){}},500);
const BGC={dark:'#000',dawn:'#1b2338',yard:'#2a3b5a',garage:'#2a1d14',field:'#0b1a33',night:'#050a18',hosp:'#0f2a2e',fog:'#6b7378',kitchen:'#2b2117',porch:'#0d1426'};
const SC={
 c1:{bg:'dark',art:'🫀',who:'',t:['A heartbeat in the dark. Slow. Steady.','Then a beep. 5:31 AM. Your mom\'s badge at the hospital time clock.','Rae has mopped four floors since midnight. Another night shift, done.'],go:'c2'},
 c2:{bg:'dawn',art:'🚗🌫️🏭',who:'Rae',t:['Rae drives home through the fog, past the paper mill, its chimneys still smoking.','You\'re already in the backyard, kicking a soccer ball at a milk jug taped to the clothesline post.','Rae sits on the back steps in her work scrubs. "They cut the soccer program," she says. "You were the best one on it."'],
  ch:[{t:'Keep kicking. Harder.',fx:{coach:3},say:'Thump. Thump. The jug spins on its tape.'},{t:'Sit down next to Rae on the steps.',fx:{fam:5},say:'She leans her head on your shoulder. Neither of you says anything for a while.'}],go:'jq'},
 jq:{bg:'yard',art:'c2',who:'Rae',t:['Rae nods at the milk jug. "Twenty yards. Three in a row. Your grandpa used to do it before school."','"Bet you can\'t."'],ch:[{t:'🥛 Take the Milk Jug Challenge',jug:1},{t:'Maybe tomorrow. Go see Pop.'}],go:'c3'},
 c3:{bg:'garage',art:'🧓📏🏈',who:'Pop',t:['Pop takes you into his garage. One wall is covered in pencil marks: your mom\'s height every birthday, the year the river flooded.','He picks up a beat-up leather football from the workbench beside him. Scuffed brown, laces worn pale, a strip of tape holding one seam. "This is Old Faithful. Older than your mother\'s car."','He hands you a marker. "One line. Why you kick."'],
  ch:[{t:'"For Rae. Every Friday."',fx:{fam:5},fl:{why:'For Rae. Every Friday.'}},{t:'"To prove they cut the wrong kid."',fx:{fan:5},fl:{why:'To prove they cut the wrong kid.'}},{t:'"Because it feels like flying."',fx:{coach:3},fl:{why:'Because it feels like flying.'}}],go:'c4'},
 c4:{bg:'field',art:'📋🧢',who:'Coach D',t:['Hollow Creek High has no kicker. Coach Darnell "D" Okafor lets you try out "because nobody else showed up."','First he makes the whole team walk the field barefoot, end zone to end zone. "Feel every yard you kick for."','Your first kick clangs off the crossbar. The linemen howl.','Coach D doesn\'t laugh. He just waits.'],
  ch:[{t:'"One more." Set the ball again.',fx:{coach:5},say:'The second one splits the uprights. The howling stops.'},{t:'Laugh it off with the linemen.',fx:{fan:5},say:'Big Tank Teague slaps your helmet. "Kid\'s got jokes AND a leg." The next one goes through.'}],go:'c5'},
 c5:{bg:'field',art:'🪑',who:'',t:['At the end of the bench sits Wes Tilly, a quiet, lanky sophomore who never gets in a game.','He\'s been watching your kicks all practice.'],
  ch:[{t:'Invite Wes to your milk-jug warm-ups.',fx:{fam:5},fl:{wes:1},say:'Wes shrugs. "I can snap. Kind of." By Thursday he\'s bouncing snaps off your garage door.'},{t:'Focus on your own routine.',fx:{coach:5},say:'You put your headphones on. Wes drifts back to the end of the bench.'}],go:'c6'},
 c6:{bg:'porch',art:'🧓🌙',who:'Pop',t:['Thursday night. Pop is on the porch with a mug of coffee he shouldn\'t be drinking this late.','"Every great kicker has a thing they do. Every time. What\'s yours?"'],
  ch:[{t:'Tap Old Faithful twice.',fl:{rit:'tap'}},{t:'Tug your left sock.',fl:{rit:'sock'}},{t:'Look up at Rae\'s seat.',fx:{fam:3},fl:{rit:'seat'}},{t:'Whisper the line from the garage wall.',fl:{rit:'line'}}],go:'w0'},
 w0:{week:0},
 c7:{bg:'night',art:'🎤👧',who:'Jojo',t:['After the game, your little sibling Jojo, age 9, shoves a hairbrush in your face like a microphone.','"Sideline report! What did the ball feel like?"','Behind Jojo, a fluffy little black, grey and tan stray that followed the band bus home sits on your cleats like she owns them. Jojo has already named her Puppy.'],
  ch:[{t:'"Like a promise."',fx:{fam:5}},{t:'"Like the whole town was watching."',fx:{fan:5}}],go:'tx1'},
 tx1:{texts:[['Rae','Watched it on the break room phone 🥹 the nurses SCREAMED'],['Coach D','Film at 7. Bring Old Faithful.'],['Wes','same time tomorrow? i\'ll bring the jug',{if:'wes'}],['Unknown number','nice kick. (it\'s wes. from the bench)',{if:'!wes'}]],go:'c8'},
 c8:{bg:'hosp',art:'📱🧽',who:'',t:['Some Fridays Rae can\'t get away.','Your phone buzzes before kickoff. "I\'ll be watching. Promise."','In the hospital break room, Rae and three night nurses huddle around a cracked phone propped on her mop bucket, watching the local stream.'],
  ch:[{t:'Text back: "Did you sleep at all?"',fx:{fam:5}},{t:'Text back: "Watch the second quarter. I\'ve got something for you."',fx:{fan:3,fam:2}}],go:'w1'},
 w1:{week:1},
 c9:{bg:'field',art:'🏟️⭐',who:'Gus',t:['Saturday. A free kicking clinic two towns over, run by Gus Hollander, the Frenzy Football League legend who still holds the 80-yard record.','He watches you kick three balls and walks over. "You get one question, kid. Make it good."'],
  ch:[{t:'"How do you handle missing?"',fl:{tip:'You don\'t. You just kick the next one.'},say:'"You don\'t. You just kick the next one."'},{t:'"How do you kick it farther?"',fl:{tip:'Plant long. Let the hip do the work.'},say:'He shows you the "long plant." "Let the hip do the work."'},{t:'"Can you sign this for my grandpa?"',fx:{fam:5},fl:{gus:1},say:'Gus signs Old Faithful. He turns the old ball over in his hands for a long second. "Hollow Creek? I knew a kicker from there once."'}],go:'c10'},
 c10:{bg:'fog',art:'🌫️🥅',who:'Coach D',t:['Week 3. The Fog Game at Prairie Creek.','The mist is so thick you can\'t see the uprights from the sideline.','Coach D crouches next to you. "You can\'t see it, so feel it. You\'ve walked every yard of a field barefoot."'],go:'w2'},
 w2:{week:2},
 c11:{bg:'porch',art:'🧓☕🌫️',who:'Pop',t:['Pop is waiting on the porch when the bus drops you off.','"I kicked in fog like that once," he says. Then he stops, like he said too much.',{if:'gus',t:'His eyes land on Gus Hollander\'s signature on Old Faithful. He traces it with his thumb and says nothing.'},'Instead he teaches you something. "When it gets loud, forget the meter. In through the nose. One. Two. Three. Then swing."','"Three breaths. Use it when it counts. Not before."'],
  ch:[{t:'"When? Where?"',fx:{fam:3},fl:{askPop:1},say:'"Long time ago." He stands up. "Go to bed, kid."'},{t:'Let it go. Sit with him.',fx:{fam:5},say:'He hums an old song you don\'t know. The porch light buzzes.'}],go:'tx2'},
 tx2:{texts:[['Jojo','scrapbook page 3 is YOU in the fog 👻'],['Tank','road trip to ironwood. bring snacks or walk'],['Rae','Double shift Friday. I\'ll make the second half. I swear.']],go:'c12'},
 c12:{bg:'night',art:'🚌🦊',who:'Coach D',t:['Week 4. A road game at Ironwood. Their crowd is loud and their field is lumpy.','Late in the first half, 4th and 6 from the 23. That\'s a 40-yard try. You\'ve never made one in a game.','Coach D looks at you. "Your call, {nick}."'],
  ch:[{t:'"I\'ve got it. Send me out."',fx:{coach:5,fan:3},fl:{went40:1},say:'You jog out. Old Faithful hits the grass.'},{t:'"Not yet, Coach. Go for it on 4th."',fx:{coach:-3},fl:{went40:0},say:'The play gets stuffed. Coach D nods anyway. "Honest. I can work with honest."'}],go:'w3'},
 w3:{week:3},
 c13:{bg:'night',art:'🐏📹',who:'',t:['Rivalry week. Ridgeline High has beaten Hollow Creek eleven years straight.','Their kicker, Dez Calloway, already has college letters and a dad who films every practice.','At midfield in warm-ups, Dez looks at Old Faithful. "Cute ball. Did your grandpa find it in a museum?"'],
  ch:[{t:'Fire back: "At least my grandpa doesn\'t film my naps."',fx:{fan:10,coach:-5},fl:{dez:'fire'}},{t:'Stay quiet. Point at the scoreboard.',fx:{coach:10},fl:{dez:'quiet'},say:'Coach D, passing by: "That\'s a captain move."'},{t:'"Nice form, honestly."',fx:{fan:5},fl:{dez:'nice'},say:'Dez blinks. For one second, the rival hesitates.'}],go:'w4'},
 w4:{week:4},
 c14w:{bg:'night',art:'🏆🎆',who:'Rae',t:['The bleachers empty onto the field. Eleven years, over.','In the chaos you find Rae alone at the fence, still in hospital scrubs, crying and laughing at the same time.','"I didn\'t even see it," Rae says. "I just heard it."',{if:'dez=fire',t:'Behind the end zone, Dez Calloway\'s dad is still filming. This time it\'s your kick on his tape.'},{if:'dez=quiet',t:'You point at the scoreboard one more time. This time, it agrees with you.'},'It\'s the first time you understand that every Friday costs her something.'],go:'c15'},
 c14l:{bg:'night',art:'🌧️🏟️',who:'Rae',t:['Ridgeline\'s sideline explodes. Twelve years now.','You find Rae at the fence, still in hospital scrubs.','"I heard the whole place go quiet," Rae says, and pulls you in over the rail. "I\'ve never been prouder of a quiet."',{if:'dez=nice',t:'Across the field, Dez Calloway catches your eye. He doesn\'t celebrate. He just nods.'},'It\'s the first time you understand that every Friday costs her something.'],go:'c15'},
 c15:{bg:'night',art:'📸',who:'',t:['The moment freezes into a memory polaroid for the scrapbook.','Give it a caption.'],
  ch:[{t:'"Every Friday costs something."',fx:{fam:5},fl:{cap:'Every Friday costs something.'}},{t:'"Hollow Creek finally heard us."',if:'w4',fx:{fan:5},fl:{cap:'Hollow Creek finally heard us.'}},{t:'"Twelve years. Not thirteen."',if:'!w4',fx:{fan:5},fl:{cap:'Twelve years. Not thirteen.'}},{t:'"Old Faithful never blinked."',fx:{coach:3},fl:{cap:'Old Faithful never blinked.'}}],go:'c16'},
 c16:{bg:'kitchen',art:'✉️🧂',who:'',t:['That night, a letter on the kitchen table, under the salt shaker.','THE HOLLOW CREEK PAPER MILL WILL CLOSE ON DECEMBER 1.','Through the thin wall you hear Rae on the phone: "If the kid has to quit football to work, then that\'s what—"','The line goes quiet. Puppy whines at the back door.','On the hook by the door hangs Old Faithful. Somewhere on Pop\'s garage wall is your line: "{why}"','For the first time since the milk jug, you don\'t know if it\'s still true.'],go:'end'},
 end:{end:1}
};
// game weeks: opp, intro, kicks [dist, situation, weather], need = makes to win; last kick of rivalry branches (OT 31 on miss)
const WK=[
 {n:'Week 1 · Friday Night',opp:'Mill Valley Millers',home:1,intro:'First varsity game. The whole town in the bleachers, and the marching band is slightly out of tune.',k:[[20,'Extra point after the opening TD. "Welcome to the Hawks."'],[28,'2nd quarter · 0:09 · tied 7-7'],[33,'4th quarter · up 4 · make it a two-score game']],need:2,win:'Hawks win 20-13!',loss:'Millers win 17-14.',go:'c7'},
 {n:'Week 2 · Friday Night',opp:'Cedar Bluff Bobcats',home:1,intro:'Coach D\'s goal for you: three field goals from 30+ tonight.',k:[[25,'1st quarter · stalled drive'],[32,'2nd quarter · 0:03 · halftime kick'],[36,'3rd quarter · into the wind'],[30,'4th quarter · 1:10 · up 1']],need:3,win:'Hawks win 26-21!',loss:'Bobcats win 24-19.',go:'c9'},
 {n:'Week 3 · The Fog Game',opp:'Prairie Creek Plowmen',home:0,wx:'fog',intro:'Make 2 field goals by feel. You won\'t see the uprights until the ball is in the air.',k:[[27,'1st quarter · you can\'t see the posts'],[31,'3rd quarter · fog getting thicker'],[34,'4th quarter · 0:40 · down 1']],need:2,win:'Hawks win 9-7 in the fog!',loss:'Plowmen win 7-6.',go:'c11'},
 {n:'Week 4 · Friday Night (Road)',opp:'Ironwood Foxes',home:0,intro:'Lumpy field, loud crowd. Pop drove separately just to be here.',k:[[24,'1st quarter · Foxes student section chanting'],[40,'2nd quarter · the 40-yarder you chose',0,'went40'],[35,'4th quarter · 0:22 · tied 17-17']],need:2,win:'Hawks win 20-17 on the road!',loss:'Foxes win 23-17.',go:'c13'},
 {n:'Week 5 · RIVALRY NIGHT',opp:'Ridgeline High Rattlers',home:1,riv:1,intro:'Eleven straight losses to Ridgeline. Rae is coming at halftime, straight off a double shift.',k:[[24,'2nd quarter · Dez just made a 45'],[35,'3rd quarter · down 21-17'],[38,'4th quarter · 0:04 left · down 2 · THIS IS IT']],need:0,go:'c14w'}
];
const TXT=[['Pop','Old Faithful says hi. Here\'s a little something for gas money.'],['Rae','Packed you a lunch. And a few coins. Don\'t tell Jojo.'],['Jojo','I found coins in the couch!! they are yours if you win friday'],['Coach D','Kickers who show up get paid in respect. And this.'],['Wes','found these under the bleachers lol 🪙'],['Mabel (Diner)','Free pie Friday if you make the long one. Coins on the house today.']];
// ---------------- UI ----------------
const css=document.createElement('style');css.textContent=`#fgfst{position:fixed;inset:0;z-index:9000;display:flex;flex-direction:column;color:#fff;font-family:system-ui;overflow:auto;-webkit-tap-highlight-color:transparent}
#fgfst .top{display:flex;justify-content:space-between;align-items:center;padding:12px 14px 4px;font:900 12px system-ui;letter-spacing:.06em}
#fgfst .top>span{white-space:nowrap}#fgfst .top b{color:#f2c230}#fgfst .chip{background:rgba(0,0,0,.45);border:1px solid rgba(242,194,48,.6);border-radius:12px;padding:4px 8px;margin-left:4px}
#fgfst .art{font-size:64px;text-align:center;margin:18px 0 6px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.6))}
#fgfst .card{margin:auto 14px 14px;background:rgba(6,20,14,.86);border:2px solid rgba(242,194,48,.85);border-radius:16px;padding:16px;box-shadow:0 8px 30px rgba(0,0,0,.5)}
#fgfst .who{display:inline-block;background:#f2c230;color:#063;font:900 13px system-ui;border-radius:10px;padding:3px 10px;margin-bottom:8px}
#fgfst p{margin:0 0 10px;font-size:16px;line-height:1.42}#fgfst p.say{color:#ffe08a;font-style:italic}
#fgfst button{display:block;width:100%;margin:8px 0 0;padding:13px 12px;border-radius:14px;border:2px solid #f2c230;background:rgba(0,0,0,.35);color:#fff;font:800 15px system-ui;text-align:left}
#fgfst button.go{background:#f2c230;color:#063;text-align:center;font-weight:900}#fgfst button.sm{width:auto;display:inline-block;padding:7px 12px;font-size:12px;text-align:center}
#fgfst h1{font:900 26px system-ui;color:#f2c230;text-align:center;margin:6px 0 2px;text-shadow:0 2px 0 #063}#fgfst h2{font:900 15px system-ui;text-align:center;margin:0 0 12px;color:#cfe}
#fgfst input{width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:2px solid #f2c230;background:#0a1a12;color:#fff;font:700 16px system-ui;margin:4px 0 10px}
#fgfst .lbl{font:900 11px system-ui;color:#f2c230;letter-spacing:.08em}#fgfst .row{display:flex;gap:6px}#fgfst .row button{text-align:center;padding:10px 4px;font-size:13px}#fgfst .row button.on{background:#f2c230;color:#063}
#fgfst .phone{background:#0d1117;border-radius:22px;border:3px solid #333;padding:12px;margin:10px 18px}#fgfst .bub{background:#2a2f3a;border-radius:16px 16px 16px 4px;padding:9px 12px;margin:6px 40px 6px 0;font-size:14px}#fgfst .bub i{display:block;font:900 11px system-ui;color:#f2c230;font-style:normal;margin-bottom:2px}
#fgfst .kk{display:flex;gap:6px;justify-content:center;margin:6px 0 10px}#fgfst .kk span{width:30px;height:30px;border-radius:50%;border:2px solid #f2c230;display:flex;align-items:center;justify-content:center;font-size:14px}
#fgfst .pic{position:relative;margin:0 0 -34px;height:min(46vh,calc(100vw*0.75));overflow:hidden;flex:0 0 auto}#fgfst .pic.sm{height:min(30vh,calc(100vw*0.5))}
#fgfst .pic img{width:100%;height:100%;object-fit:cover;display:block;animation:fgfkb 16s ease-out forwards;transform-origin:50% 40%}
#fgfst .pic:after{content:'';position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,0) 22%,rgba(0,0,0,0) 62%,var(--bgc,#050a18))}#fgfst .pic.dim img{filter:brightness(.6) saturate(.8)}
@keyframes fgfkb{from{transform:scale(1.0)}to{transform:scale(1.07)}}#fgfst{animation:fgfin .35s ease}@keyframes fgfin{from{opacity:.0}to{opacity:1}}
#fgfst h1{position:relative}#fgfst .big{font:900 72px system-ui;text-align:center;margin:40px 0 0}#fgfst .big.ok{color:#5dff9a;text-shadow:0 0 24px rgba(93,255,154,.6)}#fgfst .big.no{color:#ff7a6a;text-shadow:0 0 24px rgba(255,90,70,.5)}
#fgfst .top{position:absolute;top:0;left:0;right:0;z-index:2;background:linear-gradient(rgba(0,0,0,.65),transparent)}#fgfst.txt .top,#fgfst .nopic{position:relative}
#fgfst>.top+:not(.pic){margin-top:56px}
#fgfst .fade{animation:fgfsf .5s ease}@keyframes fgfsf{from{opacity:0;transform:translateY(8px)}to{opacity:1}}
#fgfst{overflow-y:auto;-webkit-overflow-scrolling:touch}#fgfst .pic{position:fixed;inset:0;height:auto;margin:0;z-index:0}#fgfst .pic img{object-position:50% 30%}
#fgfst .pic:after{background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,0) 16%,rgba(0,0,0,0) 38%,rgba(0,0,0,.72) 66%,var(--bgc,#050a18) 100%)}
#fgfst>*:not(.pic){position:relative;z-index:1}#fgfst .top{position:sticky}#fgfst>.pic+h1{margin-top:auto}#fgfst>.top+.pic+h1{margin-top:auto}
#fgfst .card{background:rgba(6,14,20,.82);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);margin-bottom:max(14px,env(safe-area-inset-bottom))}
#fgfst p{font-size:17px;line-height:1.5;text-shadow:0 1px 2px rgba(0,0,0,.6)}#fgfst p:last-child{animation:fgfsf .4s ease}
#fgfst h1,#fgfst h2{text-shadow:0 2px 6px rgba(0,0,0,.9)}
#fgfst button{min-height:48px;font-size:16px}#fgfst button.mn{display:inline-block;width:34px;min-height:34px;height:34px;padding:0;margin:0 6px 0 0;text-align:center;border-radius:50%;font-size:14px;vertical-align:middle}
#fgfst .fade{animation-duration:.4s}
#fgfst{height:100%;overflow:hidden}#fgfst .top{position:relative;flex:0 0 auto;padding:8px 12px 4px}
#fgfst .pic,#fgfst .pic.sm{position:relative;inset:auto;flex:0 0 auto;height:min(48vh,calc((100vw - 24px)*16/9));margin:2px 12px 6px;z-index:0;background:#000;border:3px solid #111;outline:2px solid #f2c230;border-radius:4px;box-shadow:0 4px 0 rgba(0,0,0,.5)}
#fgfst .pic.sm{height:min(30vh,calc((100vw - 24px)*16/9))}#fgfst .pic:after{display:none}
#fgfst .pic img{object-fit:contain;object-position:50% 50%;animation:none}
#fgfst h1,#fgfst>h1:first-of-type{margin:2px 0 0;font-size:20px;flex:0 0 auto}#fgfst h2{flex:0 0 auto;margin:0 0 4px;font-size:13px}
#fgfst .card,#fgfst>h1~.card,#fgfst>h2~.card{flex:1 1 auto;min-height:0;overflow-y:auto;margin:4px 12px max(10px,env(safe-area-inset-bottom));background:#fffbea;color:#1a1408;border:3px solid #111;border-radius:4px;box-shadow:4px 4px 0 #000;-webkit-backdrop-filter:none;backdrop-filter:none;padding:12px 14px}
#fgfst .card p{color:#1a1408;text-shadow:none;font:500 16px/1.45 Georgia,'Times New Roman',serif;margin:0 0 8px}#fgfst .card p.say{color:#7a3d00}
#fgfst .card .who{background:#111;color:#f2c230}#fgfst .card .lbl{color:#7a3d00}#fgfst .card button{background:#fff;color:#111;border:2px solid #111;box-shadow:2px 2px 0 #000}#fgfst .card button.go{background:#f2c230;color:#111}
#fgfst .card input{background:#fff;color:#111;border-color:#111}#fgfst .phone{flex:0 1 auto;overflow-y:auto;min-height:0}
#fgfst .pic,#fgfst .pic.sm{aspect-ratio:9/16;width:auto;max-width:calc(100vw - 24px);align-self:center;margin:2px auto 6px}
@media (max-height:700px){#fgfst .pic{height:min(42vh,calc((100vw - 24px)*16/9))}#fgfst .card p{font-size:15px}#fgfst button{min-height:44px;padding:10px 12px}}#fgfst>.top+:not(.pic){margin-top:0}#fgfst>h1:first-of-type{margin-top:auto}#fgfst .card{margin-top:auto}#fgfst>h1~.card,#fgfst>h2~.card{margin-top:14px}#fgfst.txt>h2{margin-top:16px}`;document.head.appendChild(css);
let el=null;
function shell(bg){if(!el){el=document.createElement('div');el.id='fgfst';el.className='fgfov';document.body.appendChild(el)}el.style.background=BG[bg]||bg||BG.night;el.style.setProperty('--bgc',BGC[bg]||(bg&&bg[0]==='#'?bg:'#050a18'));el.classList.remove('txt');el.style.paddingTop='0';el.innerHTML='';
 const top=document.createElement('div');top.className='top';top.innerHTML='<span><button class="mn" aria-label="Menu">✕</button> 📖 <b>S1</b> · HAWKS</span><span><span class="chip">📣 '+S.fan+'</span><span class="chip">📋 '+S.coach+'</span><span class="chip">🪙 '+CSTR()+'</span></span>';el.appendChild(top);top.querySelector('.mn').onclick=()=>{try{sfxClick()}catch(e){}K=null;close();state='title'};return el}
function close(){if(el){el.remove();el=null}mood(null)}
function card(h){const c=document.createElement('div');c.className='card fade';c.innerHTML=h||'';el.appendChild(c);return c}
function btn(c,t,f,cls){const b=document.createElement('button');b.textContent=T_(t);if(cls)b.className=cls;b.onclick=()=>{try{sfxClick()}catch(e){}f()};c.appendChild(b);return b}
const P=s=>'<p>'+N(s).replace(/</g,'&lt;')+'</p>';// story prose stays English: the word-map translator garbles full sentences
const OK=c=>{if(!c)return true;const neg=c[0]==='!',k=neg?c.slice(1):c,[f,v]=k.split('=');const hit=v!=null?String(S.fl[f])===v:!!S.fl[f];return neg?!hit:hit};
const LN=a=>a.filter(x=>typeof x==='string'||OK(x.if)).map(x=>typeof x==='string'?x:x.t);
function fx(o){if(!o)return;for(const k in o)S[k]=(S[k]||0)+o[k]}
function logIt(t){S.log.push(N(t));if(S.log.length>6)S.log.shift()}
// ---------- screens ----------
function home(){mood('home');const e=shell('night');e.insertAdjacentHTML('beforeend',pic('field')+'<h1>CAREER STORY</h1><h2>Season 1 · "Milk Jugs and Night Shifts"<br>Hollow Creek High Hawks · Friday Nights</h2>');
 const c=card();if(!S.name){c.innerHTML=P('A kid from a tired little mill town, a duct-taped milk jug, and a grandpa\'s beat-up lucky football. Sixteen seasons start with one Friday night.');btn(c,'▶ START YOUR STORY',create,'go')}
 else if(S.done){c.innerHTML=P('Season 1 complete. Season 2 "Captain of the Hawks" is coming soon.')+P('Your caption: "'+(S.fl.cap||'')+'"');btn(c,'↺ Replay Season 1 (keeps your kicker)',()=>{const n=S.name,k=S.nick,p=S.pr;S=Object.assign({},S0,{name:n,nick:k,pr:p,fl:{},log:[]});save();go('c1')})}
 else{c.innerHTML=P(S.node?'Your story is waiting, '+S.name+'.':'Ready, '+S.name+'?');btn(c,'▶ CONTINUE',()=>go(S.node||'c1'),'go')}
 if(S.name&&(S.node||S.done))btn(c,'↺ RESTART SEASON 1',()=>restartAsk());
 btn(c,'◀ BACK',()=>{close();state='title'})}
function create(){const e=shell('field');e.insertAdjacentHTML('beforeend','<h1 style="margin-top:14px">CREATE YOUR KICKER</h1><h2>Hollow Creek High · Junior · Age 16</h2>');
 const c=card('<div class="lbl">FIRST NAME</div><input id="stn" maxlength="12" placeholder="Your kicker\'s name"><div class="lbl">NICKNAME (OPTIONAL)</div><input id="stk" maxlength="14" placeholder="What the team calls you"><div class="lbl">YOUR KICKER\'S LOOK</div><p style="font-size:13px;color:#cfe">Uses your look from the Kicker Creator (MY KICKER). You can change it any time.</p>');
 const r=document.createElement('div');r.className='row';c.appendChild(r);
 btn(c,'🧑 OPEN KICKER CREATOR',()=>{S.name=(document.getElementById('stn').value||'').trim()||S.name;save();window.__stMK=1;close();state='mk'});
 btn(c,'✔ BEGIN SEASON 1',()=>{const n=(document.getElementById('stn').value||'').trim();if(!n){document.getElementById('stn').focus();return}S.name=n.slice(0,12);S.nick=(document.getElementById('stk').value||'').trim().slice(0,14);save();go('c1')},'go');
 btn(c,'◀ BACK',home);if(S.name)document.getElementById('stn').value=S.name}
function go(id){S.node=id;save();const s0=SC[id];if(!s0)return home();const s=Object.assign({},s0,s0.t?{t:LN(s0.t)}:{},s0.ch?{ch:s0.ch.filter(o=>OK(o.if))}:{},s0.texts?{texts:s0.texts.filter(m=>!m[2]||OK(m[2].if))}:{});mood(MOOD[id]);
 if(s.week!=null)return weekGate(s.week);if(s.texts)return texts(Object.assign(s,{id}));if(s.end)return finale();
 const e=shell(s.bg);if(PIC[id])e.insertAdjacentHTML('beforeend',pic(PIC[id]));
 const c=card((s.who?'<span class="who">'+s.who+'</span>':''));let i=0;const lines=document.createElement('div');c.appendChild(lines);
 const step=()=>{lines.insertAdjacentHTML('beforeend',P(s.t[i]));i++;nx.innerHTML='';if(i<s.t.length)btn(nx,'▼ CONTINUE',step,'go');else choices()};
 const nx=document.createElement('div');c.appendChild(nx);lines.onclick=()=>{if(i<s.t.length){while(i<s.t.length-1){lines.insertAdjacentHTML('beforeend',P(s.t[i]));i++}step()}};
 const choices=()=>{if(!s.ch){btn(nx,'CONTINUE ▶',()=>go(s.go),'go');return}
  s.ch.forEach(o=>btn(nx,o.t,()=>{if(o.jug){jugStart(()=>go(s.go));return}fx(o.fx);if(o.fl)Object.assign(S.fl,o.fl);logIt(o.t);S.node=s.go;save();if(o.say){nx.innerHTML='';lines.insertAdjacentHTML('beforeend','<p class="say">'+N(o.say).replace(/</g,'&lt;')+'</p>');btn(nx,'CONTINUE ▶',()=>go(s.go),'go')}else go(s.go)}))};
 step()}
function texts(s){const e=shell('#05070c');e.classList.add('txt');if(PIC[s.id])e.insertAdjacentHTML('beforeend',pic(PIC[s.id],'sm'));e.insertAdjacentHTML('beforeend','<h2 style="margin-top:16px">📱 Between games</h2>');const ph=document.createElement('div');ph.className='phone fade';e.appendChild(ph);
 s.texts.forEach((m,i)=>setTimeout(()=>{ph.insertAdjacentHTML('beforeend','<div class="bub fade"><i>'+m[0]+'</i>'+N(m[1]).replace(/</g,'&lt;')+'</div>');try{tone(880,1200,0.08,0.05)}catch(e){}},300+i*500));
 const c=card();btn(c,'CONTINUE ▶',()=>go(s.go),'go')}
// ---------- daily gate ----------
function rollDay(){const d=DAY();if(S.day!==d){S.day=d;S.wd=0;S.ad=0;save()}}
function weekGate(w){rollDay();if(S.wd<FREE_WEEKS+S.ad||window.TESTER)return weekIntro(w);
 const e=shell('night');e.insertAdjacentHTML('beforeend',pic('field','dim')+'<h1>NEXT FRIDAY</h1><h2>'+WK[w].n+' vs '+WK[w].opp+'</h2>');
 const c=card(P('You\'ve played today\'s '+FREE_WEEKS+' free game weeks. The next Friday night arrives tomorrow.'));
 btn(c,'🎬 WATCH AN AD TO PLAY IT NOW',()=>{let pr;if(el)el.style.display='none';try{window.FGF_ADPLAYING=1;pr=window.FGF_ADAPTER().rewarded()}catch(x){pr=Promise.resolve(false)}Promise.resolve(pr).then(ok=>{window.FGF_ADPLAYING=0;if(el)el.style.display='';if(ok){S.ad++;save();weekIntro(w)}else{try{toast('Ad not available, try again later')}catch(x){}}})},'go');
 btn(c,'◀ COME BACK TOMORROW',()=>{close();state='title'})}
let K=null;// current game week run
function weekIntro(w){mood(WK[w].wx==='fog'?'mystery':WK[w].riv?'rival':'tense');const W_=WK[w];K={w,i:0,res:[],ot:0};const e=shell('night');e.insertAdjacentHTML('beforeend',pic('wk'+(w+1))+'<h1>'+W_.n.toUpperCase()+'</h1><h2>'+(W_.home?'Hollow Creek Hawks vs ':'@ ')+W_.opp+'</h2>');
 const c=card(P(W_.intro)+'<div class="kk">'+W_.k.map(()=>'<span>🏈</span>').join('')+'</div>');btn(c,'🏈 TO THE FIELD',nextKick,'go')}
function kicksFor(){const W_=WK[K.w];return W_.k.filter(k=>!k[3]||S.fl[k[3]])}
function nextKick(){mood(K&&WK[K.w].wx==='fog'?'mystery':'tense');const ks=kicksFor(),k=K.ot?[31,'OVERTIME · one more chance · 31 yards']:ks[K.i];if(!k)return weekEnd();
 const e=shell('night');e.insertAdjacentHTML('beforeend',pic(WK[K.w].wx==='fog'?'c10':'field','sm')+'<h1>'+k[0]+' YARDS</h1><h2>Story kick '+(K.ot?'OT':(K.i+1)+' of '+ks.length)+'</h2>');
 const c=card(P(k[1])+(S.fl.rit?'<p class="say">'+({tap:'You tap the tape on Old Faithful twice.',sock:'You tug your left sock.',seat:'You look up at Rae\'s seat.',line:'You whisper: "'+(S.fl.why||'')+'"'})[S.fl.rit]+'</p>':''));btn(c,'SWIPE TIME ▶',()=>play(k),'go');
 const clutch=K.ot||(K.w>=2&&K.i===ks.length-1);if(clutch&&!S.fl.tbUsed&&K.w>=3){btn(c,'🌬️ THREE BREATHS · no meter, just Pop\'s count (once this season)',()=>{S.fl.tbUsed=1;save();ST.tb=1;play(k)})}}
let pend=null;
function play(k){close();window.__wx=WK[K.w].wx||'clear';newGame('story');dist=k[0];newWind();window.__wx=null;roundN=1;resetBall();ST.kick={d:k[0],lab:K.ot?'OT':(K.i+1)+'/'+kicksFor().length}}
// ---------- Milk Jug Challenge (outline Ch1: hit the jug from 20 yards three times in a row) ----------
let JG=null;function jugStart(done){mood('hopeful');JG={n:0,streak:0,done};jugKick()}
function jugKick(){const e=shell('yard');e.insertAdjacentHTML('beforeend',pic('jq','sm')+'<h1>🥛 MILK JUG CHALLENGE</h1><h2>20 yards · 3 in a row · streak '+JG.streak+'/3</h2>');const c=card(P(JG.streak?'The jug is still swinging. Again.':'Rae watches from the steps, coffee in hand.'));btn(c,JG.last===0?'TRY AGAIN ▶':'SWIPE ▶',()=>{close();newGame('story');dist=20;window.__wx='clear';newWind();window.__wx=null;roundN=1;resetBall();ST.kick={d:20,lab:'JUG '+(JG.streak+1)+'/3',jug:1};ST.hit=0;ST.cross=null},'go');btn(c,'CONTINUE STORY ▶',()=>{const d=JG.done;JG=null;d()})}
function jugAfter(good){JG.n++;JG.last=good?1:0;JG.streak=good?JG.streak+1:0;if(JG.streak>=3){const first=!S.fl.jug&&!S.jugPaid;S.fl.jug=1;S.jugPaid=1;fx({fam:3,coach:2});if(first)addC(150);save();const e=shell('yard');e.insertAdjacentHTML('beforeend',pic('c2')+'<h1>THREE IN A ROW!</h1>');const c=card(P('The jug spins off the post and rolls into Rae\'s tomato plants. Rae is on her feet, coffee everywhere.')+'<p class="say">'+N(T_('"Okay," Rae says. "Okay. Don\'t tell your grandpa I lost a bet."'))+'</p>'+P(first?'🪙 +150 bonus coins':'You\'ve already earned the bonus. Still felt good.'));const d=JG.done;JG=null;btn(c,'CONTINUE ▶',d,'go');return}
 const tries=JG.n>=8;const e=shell('yard');e.insertAdjacentHTML('beforeend','<div class="big '+(good?'ok':'no')+'">'+(good?'✓':'✕')+'</div><h1>'+(good?'THUNK!':'MISSED THE JUG')+'</h1><h2>Streak '+JG.streak+'/3</h2>');const c=card(P(good?'Dead center on the tape.':tries?'Your leg is jelly. The jug will be here tomorrow.':'Back to zero. The jug doesn\'t care how close it was.'));if(!tries)btn(c,good?'NEXT KICK ▶':'TRY AGAIN ▶',jugKick,'go');btn(c,tries?'CONTINUE ▶':'CONTINUE STORY ▶',()=>{const d=JG.done;JG=null;d()},tries?'go':'')}
function after(good){mood('tense');const ks=kicksFor(),W_=WK[K.w],last=!K.ot&&K.i===ks.length-1;K.res.push(good?1:0);
 const lines=good?['GOOD! The Hawks sideline goes nuts.','Right down the middle. Coach D allows himself one fist pump.','Through! Somewhere in a break room, three nurses are screaming.']:['No good. The ball fades wide.','Off the upright. The bleachers groan.','Short. You stare at the grass for one second, then jog off.'];
 fx(good?{fan:2,coach:1}:{coach:-1});save();
 const e=shell('night');e.insertAdjacentHTML('beforeend','<div class="big '+(good?'ok':'no')+'">'+(good?'✓':'✕')+'</div><h1>'+(good?'GOOD!':'NO GOOD')+'</h1>');
 const c=card(P(lines[Math.random()*3|0])+(!good&&S.fl.tip&&Math.random()<.6?'<p class="say">Gus, in your head: "'+S.fl.tip+'"</p>':''));
 if(W_.riv&&last&&!good&&!K.ot){c.insertAdjacentHTML('beforeend',P('Ridgeline misses too, and it\'s OVERTIME. Coach D grabs your face mask: "Shorter one. Same swing."'));K.ot=1;btn(c,'TO OVERTIME ▶',nextKick,'go');return}
 if(K.ot||last){btn(c,'FINAL WHISTLE ▶',weekEnd,'go');return}K.i++;btn(c,'NEXT KICK ▶',nextKick,'go')}
function weekEnd(){const W_=WK[K.w],mk=K.res.reduce((a,b)=>a+b,0);let win;if(W_.riv){win=!!K.res[K.res.length-1]}else win=mk>=W_.need;
 S.wk=K.w+1;S.wd++;fx(win?{fan:5,coach:3}:{fam:2});S.fl['w'+K.w]=win?1:0;const coinsW=40+mk*20;addC(coinsW);
 const res=W_.riv?(win?(K.ot?'HAWKS WIN IN OVERTIME! The streak ends at 11.':'HAWKS WIN 24-23! The streak ends at 11.'):'Ridgeline wins in overtime. Twelve years.'):(win?W_.win:W_.loss);
 logIt(W_.n+' vs '+W_.opp+': '+res+' ('+mk+' of '+K.res.length+' kicks)');save();
 mood(win?'triumph':'sad');const e=shell('night');e.insertAdjacentHTML('beforeend',pic(W_.riv?(win?'c14w':'c14l'):'field',win?'':'dim')+'<h1>'+(win?'WIN':'LOSS')+'</h1><h2>'+W_.opp+'</h2>');
 const c=card(P(res)+P('You made '+mk+' of '+K.res.length+'. 🪙 +'+coinsW+' coins'));const nxt=W_.riv?(win?'c14w':'c14l'):W_.go;K=null;btn(c,'CONTINUE ▶',()=>go(nxt),'go')}
function finale(){mood('sad');if(!S.done){S.done=1;if(!S.rw1){S.rw1=1;addC(500)}LS.fgfLookMJR='1';save()}const e=shell('#000');e.insertAdjacentHTML('beforeend',pic('end')+'<h1>TO BE CONTINUED…</h1><h2>Season 1 complete · '+(S.fl.w4?'Rivalry won':'Rivalry lost')+'</h2>');
 const c=card(P('🪙 +500 coins')+P('🎁 Exclusive look unlocked: "Milk-Jug Rookie" (gray hoodie, taped cleats, lucky-football charm)')+P('Season 2: "Captain of the Hawks" is coming soon.'));btn(c,'🥛 WEAR THE MILK-JUG ROOKIE LOOK',()=>{LS.fgfMJROn='1';LS.fgfGoldLook='0';close();state='mk'});btn(c,'🏠 HOME',()=>{close();state='title'},'go')}
// ---------- daily text + previously on ----------
function dailyText(then){rollDay();if(!S.name||S.td===S.day)return then();S.td=S.day;const m=TXT[(new Date().getDate())%TXT.length];addC(TEXT_GIFT);save();
 const e=shell('#05070c');e.insertAdjacentHTML('beforeend','<h2 style="margin-top:16px">📱 New message</h2>');e.insertAdjacentHTML('beforeend','<div class="phone fade"><div class="bub"><i>'+m[0]+'</i>'+m[1]+'</div><div class="bub" style="background:#3a3010"><i>GIFT</i>🪙 +'+TEXT_GIFT+' coins</div></div>');
 const c=card();btn(c,'CONTINUE ▶',then,'go')}
function recap(then){if(!S.log.length||S.done)return then();mood('mystery');const e=shell('#000');e.insertAdjacentHTML('beforeend','<h1 style="margin-top:22px">PREVIOUSLY ON…</h1><h2>Field Goal Frenzy · Season 1</h2>');
 const c=card(S.log.slice(-3).map(l=>'<p>▸ '+l.replace(/</g,'&lt;')+'</p>').join(''));btn(c,'▶ CONTINUE THE STORY',then,'go')}
function open(){dailyText(()=>recap(home))}
// ---------- hooks into the normal kick ----------
const GP=(x,y,z)=>window.P(x,y,z);// game projection (the local P is the HTML paragraph helper)
const ST={kick:null};
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(mode==='story'&&ST.kick){lives=3;prevLives=3;const j=ST.kick.jug;ST.kick=null;ST.tb=0;setTimeout(()=>j&&JG?jugAfter(!!good):after(!!good),1700)}}catch(e){}return r};
const odb=drawBall;drawBall=function(){const r=odb.apply(this,arguments);try{if(state==='play'&&mode==='story'&&(ST.kick||ball.fly)){ctx.save();ctx.fillStyle='rgba(0,0,0,.55)';const w=210,x=W/2-w/2,y=H*0.2;ctx.beginPath();ctx.roundRect(x,y,w,26,12);ctx.fill();ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle=GOLD;ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText(JG?'📖 STORY · KICK THE JUG '+Math.min(3,JG.streak+1)+'/3':'📖 STORY · '+(K?WK[K.w].opp.split(' ').slice(-1)[0].toUpperCase()+' · ':'')+'KICK '+(ST.kick?ST.kick.lab:''),W/2,y+17,w-10);ctx.restore()}}catch(e){}return r};
// ---------- Hollow Creek field: Friday night lights + small bleachers (story kicks only) ----------
const HC=new Image();if(ART.has('field'))HC.src=IMG('field');const SKY=()=>state==='play'&&mode==='story';
const oBG=drawBG;drawBG=function(){const r=oBG.apply(this,arguments);try{if(SKY()&&!JG&&(!K||WK[K.w].home)&&HC.complete&&HC.naturalWidth){const b=GP(0,0,dist+0.2),hz=(window.EZ||(b&&b.y)||H*0.42)-((window.SCL||1)*7);
 // painted backdrop above the end line: sky, mill chimneys, water tower, light tower and the little home bleachers
 const iw=HC.naturalWidth,ih=HC.naturalHeight,sy=ih*0.53,sc=Math.max(W/iw,hz/sy);ctx.save();ctx.beginPath();ctx.rect(0,0,W,hz);ctx.clip();ctx.drawImage(HC,0,0,iw,sy,W/2-iw*sc/2,hz-sy*sc,iw*sc,sy*sc);
 const g=ctx.createLinearGradient(0,hz-40,0,hz);g.addColorStop(0,'rgba(10,40,20,0)');g.addColorStop(1,'rgba(10,40,20,.55)');ctx.fillStyle=g;ctx.fillRect(0,hz-40,W,40);
 if(weather==='fog'){ctx.fillStyle='rgba(190,200,208,.55)';ctx.fillRect(0,0,W,hz)}ctx.restore();
 const fs=Math.max(9,19*(window.SCL||1));ctx.save();ctx.fillStyle='rgba(140,22,30,.92)';ctx.fillRect(0,hz,W,fs*0.72);ctx.translate(W/2,hz+fs*0.36);ctx.scale(1,0.6);ctx.fillStyle='#f2c230';ctx.font='900 '+fs+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('HOLLOW CREEK HAWKS',0,0);ctx.restore()}}catch(e){}return r};
// Fog Game: the uprights stay hidden in the mist until the ball is in the air, then fade in
const oDP=drawPosts;drawPosts=function(){if(!(SKY()&&weather==='fog'))return oDP.apply(this,arguments);ctx.save();let a=0.05;try{if(ball.fly)a=Math.min(1,0.05+Math.max(0,ball.z)/Math.max(1,dist)*1.3)}catch(e){}ctx.globalAlpha=a;const fl=window.FGF_FLAG;if(a<0.5)window.FGF_FLAG=()=>true;let r;try{r=oDP.apply(this,arguments)}finally{window.FGF_FLAG=fl;ctx.restore()}
 try{if(a<0.5){const z=dist+0.2,b=GP(0,BAR,z),t=GP(0,POST+1.5,z);if(b&&t){const cx=b.x,cy=(b.y+t.y)/2,rw=Math.max(60,(GP(HALF,BAR,z).x-b.x)*2.6),rh=Math.abs(b.y-t.y)*0.9;ctx.save();const g=ctx.createRadialGradient(cx,cy,4,cx,cy,rw);g.addColorStop(0,'rgba(196,204,212,.92)');g.addColorStop(.7,'rgba(196,204,212,.6)');g.addColorStop(1,'rgba(196,204,212,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx,cy,rw,rh,0,0,7);ctx.fill();ctx.restore()}}}catch(e){}
 return r};
const oDF=drawFlags;drawFlags=function(){if(!(SKY()&&weather==='fog'))return oDF.apply(this,arguments);let a=0.0;try{if(ball.fly)a=Math.min(1,Math.max(0,ball.z)/Math.max(1,dist)*1.3)}catch(e){}if(a<0.05)return;ctx.save();ctx.globalAlpha=a;try{return oDF.apply(this,arguments)}finally{ctx.restore()}};
// Three Breaths: hide the power meter and show Pop's count instead
const oHUD=hud;hud=function(){if(!(SKY()&&ST.tb))return oHUD.apply(this,arguments);const sw=swipe;swipe=null;let r;try{r=oHUD.apply(this,arguments)}finally{swipe=sw}
 try{const t=performance.now()/1000,ph=(t%3.6)/1.2|0,k=(t%1.2)/1.2,mw=W*0.6,mx=W/2-mw/2,my=H*0.3;panel(mx-8,my-26,mw+16,40);ctx.save();ctx.fillStyle=GOLD;ctx.font='900 10px system-ui';ctx.textAlign='left';ctx.fillText("🌬️ POP'S THREE BREATHS",mx,my-11);ctx.fillStyle='#fff';ctx.font='900 15px system-ui';ctx.fillText(['ONE…','TWO…','THREE. SWING.'][ph],mx,my+8);for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(mx+mw-40+i*16,my+2,5+(i===ph?k*2:0),0,7);ctx.fillStyle=i<=ph?GOLD:'rgba(255,255,255,.25)';ctx.fill()}ctx.restore()}catch(e){}return r};
// ---------- Milk-Jug Rookie exclusive look (earned by finishing Season 1) ----------
const MJ={};function mjr(src,row){const k=row+'_'+(src.__mj||(src.__mj=Math.random()));if(MJ[k])return MJ[k];const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d');x.drawImage(src,0,0);const KM=S5.KMETA[row]||S5.KMETA[0];
 x.save();x.globalCompositeOperation='source-atop';for(let f=0;f<4;f++){const m=KM[f];// gray hoodie over the jersey
  x.fillStyle='rgba(150,152,156,.88)';x.beginPath();x.ellipse(m[0],m[1]+m[3]*0.15,m[2]*1.25,m[3]*1.55,0,0,7);x.fill();x.strokeStyle='rgba(90,92,96,.9)';x.lineWidth=2;x.beginPath();x.moveTo(m[0]-m[2]*0.45,m[1]+m[3]*0.75);x.lineTo(m[0]+m[2]*0.45,m[1]+m[3]*0.75);x.stroke();
  // hood behind the neck
  x.fillStyle='rgba(120,122,126,.9)';x.beginPath();x.ellipse(m[4],m[5]+26,18,7,0,0,7);x.fill();
  // taped cleats
  x.fillStyle='rgba(235,235,228,.95)';x.fillRect(f*203,282,203,4);x.fillRect(f*203,290,203,3);
  // lucky-football charm
  x.fillStyle='#ff7a00';x.beginPath();x.moveTo(m[0]+m[2]*0.55,m[1]-m[3]*0.2);x.lineTo(m[0]+m[2]*0.85,m[1]-m[3]*0.2);x.lineTo(m[0]+m[2]*0.7,m[1]-m[3]*0.65);x.closePath();x.fill()}
 x.restore();return MJ[k]=c}
const MJON=()=>LS.fgfLookMJR==='1'&&LS.fgfMJROn==='1'&&LS.fgfGoldLook!=='1';
{const ok=S5.kimg;S5.kimg=function(ti,p2){const s=ok(ti,p2);if(p2||!MJON()||(MK.on&&MK.masc>=0)||s._masc||(typeof KS!=='undefined'&&s===KS))return s;return mjr(s,MK.on?MK.base:ti)}}
if(typeof frontImg==='function'){const of=frontImg,FMJ={};frontImg=function(ti){const f=of.apply(this,arguments);if(!f||!MJON()||MK.masc>=0)return f;const k=JSON.stringify(MK)+ti;if(FMJ.k===k&&FMJ.src===f)return FMJ.c;const c=document.createElement('canvas');c.width=f.width;c.height=f.height;const x=c.getContext('2d');x.drawImage(f,0,0);const m=BMETA.m[MK.bt]||BMETA.m[0],w=c.width,top=m.fy1+4,cx=m.fx-(MK.bt*BMETA.cw)+0;
 const t0=Math.max(0,m.fy1-34),hh=Math.min(c.height-t0,160);try{const d=x.getImageData(0,t0,w,hh),p=d.data;for(let q=0;q<p.length;q+=4){if(p[q+3]<8)continue;const r=p[q],g2=p[q+1],b=p[q+2],mx=Math.max(r,g2,b),mn=Math.min(r,g2,b);
  const skin=r>=g2&&g2>=b*0.9&&r-b>18&&mx>60&&(r-g2)<(mx-mn)*0.85+30&&!(b>r);if(skin&&mx-mn<150)continue;// leave skin and hair alone
  const L=0.3*r+0.59*g2+0.11*b,y=(q/4/w)|0,fade=y>hh-12?(hh-y)/12:1,v=Math.min(255,62+L*0.78);p[q]+= (v-r)*fade;p[q+1]+=(v+1-g2)*fade;p[q+2]+=(v+5-b)*fade}x.putImageData(d,0,t0)}catch(e){}
 x.save();x.globalCompositeOperation='source-atop';x.strokeStyle='rgba(70,72,76,.95)';x.lineWidth=5;x.beginPath();x.ellipse(w/2,top+2,m.cw*0.36,9,0,0.15,Math.PI-0.15);x.stroke();// hood rim
 x.strokeStyle='rgba(235,235,228,.95)';x.lineWidth=1.4;x.beginPath();x.moveTo(w/2-4,top+8);x.lineTo(w/2-6,top+34);x.moveTo(w/2+4,top+8);x.lineTo(w/2+6,top+34);x.stroke();// drawstrings
 x.fillStyle='rgba(236,236,228,.95)';x.fillRect(0,c.height-22,w,4);x.fillRect(0,c.height-13,w,3);// taped cleats
 x.fillStyle='#ff7a00';x.strokeStyle='#7a3a00';x.lineWidth=1;x.beginPath();x.moveTo(w/2+m.cw*0.16,top+42);x.lineTo(w/2+m.cw*0.32,top+42);x.lineTo(w/2+m.cw*0.24,top+27);x.closePath();x.fill();x.stroke();// lucky-football charm
 x.restore();FMJ.k=k;FMJ.src=f;return FMJ.c=c}}
{const od=drawMK;drawMK=function(){od();if(LS.fgfLookMJR!=='1')return;const ph=Math.min(H*0.44,W*1.05),pw=Math.min(W*0.9,ph*0.62),bw=Math.min(124,pw*0.46),x0=W/2+pw/2-8-bw,y0=H*0.075+8,on=MJON();
 bx(x0,y0,bw,26,on?'🥛 ROOKIE LOOK: ON':'🥛 ROOKIE LOOK: OFF',()=>{LS.fgfMJROn=on?'0':'1';if(!on)LS.fgfGoldLook='0'},on,10)}}

// ---------- Restart Season (story home + pause menu) ----------
function restartSeason(){const keep={name:S.name,nick:S.nick,pr:S.pr,day:S.day,wd:S.wd,ad:S.ad,td:S.td,rw1:S.rw1,jugPaid:S.jugPaid||(S.fl&&S.fl.jug?1:0)};
 S=Object.assign({},S0,keep,{fl:{},log:[],node:'c1',done:0});save();K=null;JG=null;ST.kick=null;try{paused=false;if(state==='play'||state==='over')state='title'}catch(e){}go('c1')}
function restartAsk(){if(document.getElementById('fgfrs'))return;const d=document.createElement('div');d.id='fgfrs';d.style.cssText='position:fixed;inset:0;z-index:9600;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;font-family:system-ui';
 d.innerHTML='<div style="background:#fffbea;color:#1a1408;border:3px solid #111;box-shadow:4px 4px 0 #000;border-radius:6px;max-width:320px;margin:16px;padding:18px"><p style="font:500 17px/1.45 Georgia,serif;margin:0 0 14px">Restart Season 1 from the beginning? Your story choices for this season will be cleared.</p><button id="fgfrsY" style="display:block;width:100%;min-height:48px;margin:0 0 8px;border:2px solid #111;border-radius:12px;background:#f2c230;color:#111;font:900 16px system-ui">↺ Restart</button><button id="fgfrsN" style="display:block;width:100%;min-height:48px;border:2px solid #111;border-radius:12px;background:#fff;color:#111;font:800 16px system-ui">Cancel</button></div>';
 document.body.appendChild(d);const x=()=>d.remove();d.querySelector('#fgfrsN').onclick=x;d.querySelector('#fgfrsY').onclick=()=>{x();restartSeason()}}
if(typeof pauseMenu==='function'){const oPM=pauseMenu;pauseMenu=function(){const r=oPM.apply(this,arguments);try{if(mode==='story'&&!setOpen){const bw=Math.min(280,W*0.8),x=W/2-bw/2;bx(x,H*0.36+198,bw,52,'↺ RESTART SEASON 1',()=>restartAsk())}}catch(e){}return r}}
// =====================================================================
// Story difficulty tiers (data-driven). Seasons map to a level per BIBLE:
// S1–S2 high school, S3–S6 college, S7+ pro. Every kick stays makeable:
// max power is floored so it always clears the bar at the kick's distance with margin.
const TIERS={
 hs:     {name:'High school',pw:0.80,aim:1.30,curve:1.30,windMax:10},
 college:{name:'College',    pw:0.90,aim:1.15,curve:1.15,windMax:16},
 pro:    {name:'Pro',        pw:1.00,aim:1.00,curve:1.00,windMax:null}};
const SEASON=1,tierOf=n=>n<=2?'hs':n<=6?'college':'pro',TIER=()=>TIERS[tierOf(SEASON)];
const VMAX=35,ANG=0.72;// game.js: v=14+power*21 (dist<80), launch angle 0.72
function vNeed(d,h){const c=Math.cos(ANG),den=2*c*c*(d*Math.tan(ANG)-h);return den>0?Math.sqrt(10.7*1.07*d*d/den):99}// rain gravity worst case
function pwFor(d){const t=TIER();return Math.min(1,Math.max(t.pw,vNeed(d+2,BAR+2.5)*1.15/VMAX))}// >=15% speed margin, 2 yds past the bar, 2.5 yds over it
window.FGF_STORY_TIERS={TIERS,tierOf,pwFor,vNeed};
const isStory=()=>state==='play'&&mode==='story';
// cosmetics off during story kicks (tees, trails, ball skins, themes); restored as soon as the kick screen closes
let EQS=null;function eqOff(){if(EQS||typeof eq!=='object')return;EQS=Object.assign({},eq);for(const k in eq)delete eq[k];Object.assign(eq,{c:'c0',g:'',v:'',t:'t0',e:'e0'})}
function eqOn(){if(!EQS)return;for(const k in eq)delete eq[k];Object.assign(eq,EQS);EQS=null}
let HALF0=null;
setInterval(()=>{try{if(isStory()){eqOff();if(!ball.fly&&(ball.pump||ball.gold||ball.bonus)){ball.pump=0;ball.gold=0;ball.bonus=0}}else eqOn();if(isStory()&&JG){if(HALF0==null){HALF0=HALF;HALF=40}}else if(HALF0!=null){HALF=HALF0;HALF0=null}}catch(e){}},100);
// wind cap per tier
const oNW2=newWind;newWind=function(){const r=oNW2.apply(this,arguments);try{if(mode==='story'){const t=TIER();if(JG||weather==='fog'){wind.mph=Math.min(wind.mph,JG?3:6)}else if(t.windMax!=null)wind.mph=Math.min(wind.mph,t.windMax);wind.x=Math.sin(wind.a)*wind.mph;wind.z=Math.cos(wind.a)*wind.mph}}catch(e){}return r};
// tier applied right after the launch: speed scale + tighter aim/curve; jug kicks get a flatter, power-mapped arc
const JUG={y:4.2,ry:1.7,rx:1.35,arm:6.6};
const oKick=S3.onKick;S3.onKick=function(power){const r=oKick.apply(this,arguments);try{if(mode==='story'&&ball.fly){const t=TIER(),k=(14+power*21)>0?((14+power*21*pwFor(dist))/(14+power*21)):1;
  ball.vx*=k*t.aim;ball.vy*=k;ball.vz*=k;ball.ax*=t.curve;
  if(JG){const tt=dist/Math.max(4,ball.vz),yt=0.9+power*7.6;ball.vy=(yt-0.15+0.5*G*tt*tt)/tt}
  ST.cross=null}}catch(e){}return r};
// remember where the ball crossed the target plane (for the jug)
const odb3=drawBall;drawBall=function(){try{if(isStory()&&JG&&ball.fly&&!ST.cross&&ball.z>=dist)ST.cross={x:ball.x,y:ball.y,t:performance.now()}}catch(e){}return odb3.apply(this,arguments)};
// jug: only a hit on the jug counts
// jug scene: only a jug hit is a score - a miss must not add points/confetti from the wide practice posts
{const oRes=result;result=function(r){try{if(mode==='story'&&JG&&ST.kick&&ST.kick.jug){const c=ST.cross||{x:ball.x,y:ball.y};const hit=!!(c&&Math.abs(c.x)<=JUG.rx&&Math.abs(c.y-JUG.y)<=JUG.ry);r=hit?'GOOD!':'NO GOOD'}}catch(e){}return oRes.call(this,r)}}
const oR2=S3.onResult;S3.onResult=function(good){try{if(mode==='story'&&JG&&ST.kick&&ST.kick.jug){const c=ST.cross||{x:ball.x,y:ball.y};good=!!(c&&Math.abs(c.x)<=JUG.rx&&Math.abs(c.y-JUG.y)<=JUG.ry);ST.hit=good?performance.now():0;
  msg={t:good?'THUNK!':(c&&c.y>JUG.y+JUG.ry?'OVER THE JUG':c&&c.y<JUG.y-JUG.ry?'SHORT OF THE JUG':'MISSED THE JUG'),s:good?'Right on the tape':'',c:good?GOLD:'#ff5a4f'}}}catch(e){}return oR2.call(this,good)};
// Old Faithful: tape patch on the ball during story kicks
const odb4=drawBall;drawBall=function(){const r=odb4.apply(this,arguments);try{if(isStory()){const p=window.SP?SP(ball.x,ball.y,ball.z):null;if(p){const s2=Math.max(2,p.s*0.12);ctx.save();ctx.translate(p.x,p.y);ctx.rotate((ball.rot||0)+0.5);ctx.fillStyle='rgba(170,170,165,.9)';ctx.fillRect(-s2*0.9,-s2*0.35,s2*1.4,s2*0.7);ctx.restore()}}}catch(e){}return r};
// no arcade extras during story kicks (pumpkin/gold/bonus balls, bad snaps, pop-ups)
const oRB=resetBall;resetBall=function(){const r=oRB.apply(this,arguments);try{if(mode==='story'){ball.pump=0;ball.gold=0;ball.bonus=0;if(ball.snap){ball.snap=0;ball.x=0}}}catch(e){}return r};
if(window.FGF_POP){const oPop=window.FGF_POP;window.FGF_POP=function(){if(mode==='story')return;return oPop.apply(this,arguments)}}
// ---- Hollow Creek kicker: recolor whatever look the player has to Hawks red + white trim (name/number kept) ----
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
function hsv(r,g,b){r/=255;g/=255;b/=255;const M=Math.max(r,g,b),m=Math.min(r,g,b),d=M-m;let h=0;if(d){h=M===r?((g-b)/d)%6:M===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return[h,M?d/M:0,M]}
const HAWK={p:[176,28,40],s:[244,244,240]},RC=new WeakMap();
function hawkify(src,ti){if(!src||!src.width)return src;let m=RC.get(src);if(m&&m.ti===ti)return m.c;const t=TEAMS[ti]||TEAMS[0],P0=hsv(...hx(t.p)),S0=hsv(...hx(t.s));
 const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d');x.drawImage(src,0,0);let d;try{d=x.getImageData(0,0,c.width,c.height)}catch(e){return src}
 const a=d.data,near=(H,T,tol)=>T[1]<0.2?(H[1]<0.2&&Math.abs(H[2]-T[2])<0.16):(H[1]>0.3&&Math.min(Math.abs(H[0]-T[0]),360-Math.abs(H[0]-T[0]))<tol);
 for(let i=0;i<a.length;i+=4){if(a[i+3]<20)continue;const H=hsv(a[i],a[i+1],a[i+2]);let to=null,ref=null;if(near(H,P0,26)){to=HAWK.p;ref=P0}else if(near(H,S0,S0[0]>20&&S0[0]<70?10:20)&&H[1]>0.45){to=HAWK.s;ref=S0}
  if(to){const k=Math.max(0.35,Math.min(1.5,H[2]/Math.max(0.15,ref[2])));a[i]=Math.min(255,to[0]*k);a[i+1]=Math.min(255,to[1]*k);a[i+2]=Math.min(255,to[2]*k)}}
 x.putImageData(d,0,0);RC.set(src,{ti,c});return c}
{const ok=S5.kimg;S5.kimg=function(ti,p2){const s=ok.apply(this,arguments);try{if(isStory()&&!p2&&!(MK.on&&MK.masc>=0))return hawkify(s,ti)}catch(e){}return s}}
// ---- Hawks mascot on our sideline: the game's hawk mascot, tinted Hollow Creek red ----
const HAWKS_T=Math.max(0,TEAMS.findIndex(t=>t.k==='hawks'));
// Hollow Creek's own hawk (new art, same 193x200 cell + same sideline animation)
const HCM=new Image();/* HCM.src='story/hc_hawk.webp?v=1'; -- enable once the new art file is added */
const oM=S3.masc;S3.masc=function(){if(!isStory())return oM.apply(this,arguments);if(JG){try{drawYardRae()}catch(e){}return}
 const om=myT,useNew=HCM.complete&&HCM.naturalWidth,odi=ctx.drawImage;let r;ctx.save();try{if(useNew)ctx.drawImage=function(im,sx,sy,sw,sh,dx,dy,dw,dh){if(im===MSI&&arguments.length===9&&sx===HAWKS_T*193)return odi.call(this,HCM,0,0,HCM.naturalWidth,HCM.naturalHeight,dx,dy,dw,dh);return odi.apply(this,arguments)};else ctx.filter='hue-rotate(135deg) saturate(1.5)';myT=()=>HAWKS_T;r=oM.apply(this,arguments)}catch(e){}finally{myT=om;delete ctx.drawImage;ctx.restore()}return r};
// no stadium crowd / storm ambience over our HS fields
const oAmb=S3.amb;S3.amb=function(){if(isStory()&&weather!=='fog'&&weather!=='rain')return;return oAmb.apply(this,arguments)};
// ---- away HS field (opponent colors) ----
const OPPC={'Mill Valley Millers':['#2f5d8a','#e8e2d0'],'Cedar Bluff Bobcats':['#c96a1b','#1d1d1d'],'Prairie Creek Plowmen':['#6b4a2b','#e0c35a'],'Ironwood Foxes':['#d4581c','#1f2a36'],'Ridgeline High Rattlers':['#1f4d2b','#111111']};
function hz0(){const b=GP(0,0,dist+0.2);return (window.EZ||(b&&b.y)||H*0.42)-((window.SCL||1)*7)}
function bleach(x0,y0,w,h,col,rows){ctx.fillStyle='#8d949b';for(let i=0;i<rows;i++){const yy=y0+h*i/rows;ctx.fillRect(x0+i*w*0.02,yy,w-i*w*0.04,h/rows*0.42)}ctx.fillStyle=col;ctx.fillRect(x0,y0+h,w,h*0.12)}
function tower(x,base,top){ctx.fillStyle='#2b2f36';ctx.fillRect(x-2,top,4,base-top);ctx.fillStyle='#fff6d8';ctx.shadowColor='#fff3c0';ctx.shadowBlur=18;ctx.fillRect(x-14,top-8,28,10);ctx.shadowBlur=0}
function awayField(){const hz=hz0(),o=WK[K.w],C=OPPC[o.opp]||['#444','#ddd'],fog=weather==='fog';ctx.save();
 const g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#070b1a');g.addColorStop(0.7,'#16223f');g.addColorStop(1,'#2b3550');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);
 ctx.fillStyle='rgba(255,255,255,.6)';for(let i=0;i<30;i++){const u=(i*0.618)%1,v=(i*0.377)%1;ctx.fillRect(u*W,v*hz*0.4,1.2,1.2)}
 ctx.fillStyle='#0d1410';ctx.beginPath();ctx.moveTo(0,hz);for(let x=0;x<=W;x+=W/14)ctx.lineTo(x,hz-24-((x*7)%19));ctx.lineTo(W,hz);ctx.fill();// tree line
 bleach(W*0.04,hz-64,W*0.36,46,C[0],6);bleach(W*0.6,hz-64,W*0.36,46,C[0],6);// visitors' small bleachers
 tower(W*0.08,hz-10,hz*0.25);tower(W*0.92,hz-10,hz*0.25);
 if(fog){ctx.fillStyle='rgba(190,200,208,.62)';ctx.fillRect(0,0,W,hz)}ctx.restore();
 const fs=Math.max(9,19*(window.SCL||1));ctx.save();ctx.fillStyle=C[0];ctx.fillRect(0,hz,W,fs*0.72);ctx.translate(W/2,hz+fs*0.36);ctx.scale(1,0.6);ctx.fillStyle=C[1];ctx.font='900 '+fs+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.opp.toUpperCase(),0,0);ctx.restore()}
// ---- backyard (Milk Jug Challenge): early-morning yard, clothesline post with the duct-taped jug, Rae on the back steps ----
function yard(){const hz=hz0();ctx.save();
 const g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#3a4c6e');g.addColorStop(0.55,'#c99a78');g.addColorStop(1,'#e9c79a');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);
 // mill chimneys with smoke, far away in the haze
 ctx.fillStyle='rgba(84,90,98,.85)';[[0.66,0.58],[0.72,0.54]].forEach(([u,t])=>{ctx.fillRect(W*u,hz*t,W*0.022,hz*(1-t))});
 ctx.fillStyle='rgba(200,200,205,.35)';for(let i=0;i<7;i++){ctx.beginPath();ctx.arc(W*0.735+i*W*0.035,hz*0.5-i*hz*0.025,6+i*3,0,7);ctx.fill()}
 ctx.fillStyle='rgba(120,128,130,.7)';ctx.fillRect(0,hz*0.8,W,hz*0.2);// far rooftops
 ctx.fillStyle='rgba(225,215,200,.45)';ctx.fillRect(0,hz*0.72,W,hz*0.28);// morning fog
 // wooden backyard fence
 ctx.fillStyle='#7a6248';for(let x=-4;x<W;x+=11){ctx.fillRect(x,hz-30,9,30);ctx.beginPath();ctx.moveTo(x,hz-30);ctx.lineTo(x+4.5,hz-35);ctx.lineTo(x+9,hz-30);ctx.fill()}ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(0,hz-22,W,3);ctx.fillRect(0,hz-9,W,3);
 // house siding + back steps on the left
 ctx.fillStyle='#b9b2a2';ctx.fillRect(0,hz*0.18,W*0.17,hz*0.82+40);ctx.fillStyle='rgba(0,0,0,.12)';for(let y=hz*0.2;y<hz+40;y+=7)ctx.fillRect(0,y,W*0.17,1.5);ctx.fillStyle='#5b4632';ctx.beginPath();ctx.moveTo(0,hz*0.14);ctx.lineTo(W*0.21,hz*0.22);ctx.lineTo(W*0.21,hz*0.25);ctx.lineTo(0,hz*0.18);ctx.fill();
 ctx.restore();
 // yard grass over the field (no lines, no logos)
 const g2=ctx.createLinearGradient(0,hz,0,H);g2.addColorStop(0,'#5d7a3a');g2.addColorStop(1,'#3b5525');ctx.fillStyle=g2;ctx.fillRect(0,hz,W,H-hz);
 ctx.fillStyle='rgba(0,0,0,.06)';for(let i=0;i<40;i++){const u=(i*0.618)%1,v=(i*0.377)%1;ctx.fillRect(u*W,hz+v*(H-hz),2+v*6,1+v*2)}
 ctx.fillStyle='#6f5a44';ctx.fillRect(0,hz+4,W*0.24,16);ctx.fillRect(0,hz+18,W*0.27,14);// back steps
}
function drawYardRae(){const p=GP(-3.6,0,Math.max(3,dist*0.42));if(!p)return;const s=p.s,x=p.x,y=p.y;ctx.save();
 ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(x,y,s*0.5,s*0.12,0,0,7);ctx.fill();
 ctx.fillStyle='#3d6fa6';ctx.fillRect(x-s*0.2,y-s*0.95,s*0.16,s*0.95);ctx.fillRect(x+s*0.04,y-s*0.95,s*0.16,s*0.95);// scrub pants
 ctx.fillStyle='#2b2b2b';ctx.fillRect(x-s*0.22,y-s*0.06,s*0.2,s*0.07);ctx.fillRect(x+s*0.03,y-s*0.06,s*0.2,s*0.07);// shoes
 ctx.fillStyle='#4a7fb8';ctx.beginPath();ctx.roundRect(x-s*0.3,y-s*1.75,s*0.6,s*0.86,s*0.12);ctx.fill();// scrub top
 ctx.fillStyle='rgba(0,0,0,.12)';ctx.beginPath();ctx.moveTo(x-s*0.12,y-s*1.75);ctx.lineTo(x,y-s*1.55);ctx.lineTo(x+s*0.12,y-s*1.75);ctx.fill();// v-neck
 ctx.fillStyle='#4a7fb8';ctx.fillRect(x+s*0.22,y-s*1.68,s*0.13,s*0.5);ctx.fillStyle='#d7a98a';ctx.fillRect(x+s*0.22,y-s*1.2,s*0.13,s*0.22);// arm
 ctx.fillStyle='#e9e6df';ctx.fillRect(x+s*0.16,y-s*1.12,s*0.2,s*0.2);// mug
 ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=Math.max(1,s*0.03);ctx.beginPath();const t=performance.now()/600;ctx.moveTo(x+s*0.26,y-s*1.15);ctx.quadraticCurveTo(x+s*(0.2+0.06*Math.sin(t)),y-s*1.35,x+s*0.28,y-s*1.5);ctx.stroke();
 ctx.fillStyle='#4a7fb8';ctx.fillRect(x-s*0.35,y-s*1.68,s*0.13,s*0.6);ctx.fillStyle='#d7a98a';ctx.fillRect(x-s*0.35,y-s*1.1,s*0.13,s*0.15);
 ctx.fillStyle='#d7a98a';ctx.beginPath();ctx.arc(x,y-s*1.98,s*0.21,0,7);ctx.fill();// face
 ctx.fillStyle='#2a1d17';ctx.beginPath();ctx.arc(x,y-s*2.04,s*0.22,Math.PI*0.95,Math.PI*2.05);ctx.fill();ctx.beginPath();ctx.arc(x+s*0.04,y-s*2.26,s*0.13,0,7);ctx.fill();// hair + messy bun
 ctx.fillRect(x-s*0.22,y-s*2.02,s*0.07,s*0.22);ctx.restore()}
function drawJugPost(){const z=dist+0.2,b=GP(0,0,z),arm=GP(0,JUG.arm,z),j=GP(0,JUG.y,z);if(!b||!arm||!j)return;const s=b.s,pw=Math.max(5,s*0.32);ctx.save();
 ctx.fillStyle='#6e543a';ctx.fillRect(b.x-pw/2,arm.y,pw,b.y-arm.y);ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(b.x+pw*0.15,arm.y,pw*0.35,b.y-arm.y);// 4x4 post
 ctx.fillStyle='#6e543a';ctx.fillRect(b.x-s*1.6,arm.y-pw*0.2,s*3.2,pw*0.7);// cross-arm
 ctx.strokeStyle='rgba(235,235,230,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(b.x+s*1.5,arm.y+pw*0.2);ctx.quadraticCurveTo(b.x+W*0.35,arm.y+s*0.9,W+20,arm.y+s*0.4);ctx.stroke();// clothesline wire
 // the jug, duct-taped to the post (knocked spinning when hit)
 let jx=j.x,jy=j.y,rot=0;const ht=ST.hit?(performance.now()-ST.hit)/1000:0;if(ST.hit&&ht<2.5){jx+=ht*s*2.2;jy+=-s*1.5*ht+s*2.4*ht*ht;rot=ht*9}else if(ST.hit)jy=-999;
 const js=s*1.25;ctx.translate(jx,jy);ctx.rotate(rot);ctx.fillStyle='#f6f4ee';ctx.strokeStyle='#8a8f94';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(-js*0.45,-js*0.55,js*0.9,js*1.1,js*0.18);ctx.fill();ctx.stroke();
 ctx.fillStyle='#f6f4ee';ctx.fillRect(-js*0.14,-js*0.8,js*0.28,js*0.28);ctx.fillStyle='#d9d9d2';ctx.fillRect(-js*0.16,-js*0.86,js*0.32,js*0.1);// neck + cap
 ctx.strokeStyle='#b8bcc0';ctx.beginPath();ctx.moveTo(js*0.22,-js*0.4);ctx.quadraticCurveTo(js*0.62,-js*0.1,js*0.22,js*0.2);ctx.stroke();// handle
 if(!ST.hit){ctx.fillStyle='rgba(150,155,160,.95)';ctx.fillRect(-js*0.6,-js*0.12,js*1.2,js*0.22)}// silver duct tape band
 ctx.restore()}
const oBG3=drawBG;drawBG=function(){const r=oBG3.apply(this,arguments);try{if(isStory()){if(JG)yard();else if(K&&!WK[K.w].home)awayField()}}catch(e){}return r};
const oDP3=drawPosts;drawPosts=function(){if(isStory()&&JG){try{drawJugPost()}catch(e){}return}return oDP3.apply(this,arguments)};
const oDF3=drawFlags;drawFlags=function(){if(isStory()&&JG)return;return oDF3.apply(this,arguments)};
// back from the Kicker Creator during kicker creation -> return to Story
setInterval(()=>{if(window.__stMK&&state==='title'){window.__stMK=0;create()}},400);
window.FGF_STORY={open,go,_restart:restartSeason,_restartAsk:restartAsk,state:()=>S,_mu:MU,_after:after,_play:play,_week:weekIntro,_jg:()=>!!JG};
})();
;(function(){// ---- backyard jug kicks: plain kid (jeans, white tee, sneakers, bare head) — same sprite frames, clothes/head redrawn only ----
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
function hsv(r,g,b){r/=255;g/=255;b/=255;const M=Math.max(r,g,b),m=Math.min(r,g,b),d=M-m;let h=0;if(d){h=M===r?((g-b)/d)%6:M===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return[h,M?d/M:0,M]}
const KC={};const KD=window.FGF_KID={};
function kid(b){const SK=(typeof SKIN!=='undefined'&&MK.on&&SKIN[MK.skin]&&SKIN[MK.skin][1])||null,HR=(typeof HAIR!=='undefined'&&MK.on&&HAIR[MK.hair]&&HAIR[MK.hair][1])||'#4a2f1c';const key=b+'|'+SK+'|'+HR;if(KC[key])return KC[key];
 if(!KS.complete||!KS.naturalWidth)return null;const c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d');x.drawImage(KS,0,b*300,812,300,0,0,812,300);let d;try{d=x.getImageData(0,0,812,300)}catch(e){return null}
 const W8=812,a=d.data,skT=SK?hx(SK):[200,140,100],hrT=hx(HR),KM=S5.KMETA[b];
 const A=p=>a[p*4+3]>=40,V=p=>Math.max(a[p*4],a[p*4+1],a[p*4+2])/255;
 const put=(i,C,k)=>{a[i]=Math.min(255,C[0]*k);a[i+1]=Math.min(255,C[1]*k);a[i+2]=Math.min(255,C[2]*k);a[i+3]=255};
 // kicking-foot tip per frame
 const tip=[null,null,null,null];for(let p=0;p<W8*300;p++){if(!A(p))continue;const px=p%W8,py=p/W8|0,f=px/203|0;if(f===0||py>KD.fy-4)continue;const m=KM[f];if(px<m[0])continue;const sc=f===3?(px-py*0.3):(px+py*0.35);if(!tip[f]||sc>tip[f][2])tip[f]=[px,py,sc]}
 for(let f=0;f<4;f++)if(tip[f]&&tip[f][1]>=KD.fy-20)tip[f]=null;
 // hands below the waist: narrow separate runs at the outside of a row (+3px grow)
 const HM=new Uint8Array(W8*300);for(let f=0;f<4;f++){const m=KM[f];for(let y=m[1]+30;y<Math.min(300,m[1]+(f>=2?75:92));y++){const R=[];let st=-1;for(let px=f*203;px<=f*203+203;px++){const o=px<f*203+203&&A(y*W8+px);if(o&&st<0)st=px;if(!o&&st>=0){R.push([st,px]);st=-1}}
  if(R.length>=2)for(const r of [R[0],R[R.length-1]])if(r[1]-r[0]<KD.hw&&Math.abs((r[0]+r[1])/2-m[0])>m[2]*0.6)for(let px=r[0]-3;px<r[1]+3;px++)for(let yy=y-2;yy<=y+2;yy++)if(yy>=0&&yy<300)HM[yy*W8+px]=1}}
 const shirt=[];// per-pixel shirt flag
 for(let p=0;p<W8*300;p++){const i=p*4;if(!A(p)){a[i+3]=0;continue}const px=p%W8,py=p/W8|0,f=px/203|0,m=KM[f],v=V(p),hx0=m[4],hy0=m[5],waist=m[1]+KD.w;
  // head: short hair on a head-sized ellipse; face/ears skin; helmet bulk cleared
  if(py<hy0+KD.hb&&Math.abs(px-hx0)<46){const dx=(px-hx0)/KD.rx,dy=(py-hy0-KD.hy)/KD.ry;if(dx*dx+dy*dy<=1)put(i,hrT,0.5+v*0.8);else a[i+3]=0;continue}
  const xh=m[0]+m[2]*0.5,leg=py>=waist||(f===3&&px>xh&&py>waist-(px-xh)*0.95-10);
  if(!leg){const top=m[1]-KD.st,ax=Math.abs(px-m[0]),half=m[2]*(KD.sw0+(KD.sw1-KD.sw0)*Math.max(0,Math.min(1,(py-top)/(waist-top))));
   // shoulder points; sleeves = within radius of them (follows the arm direction)
   const sL=[m[0]-m[2]*KD.sx,top+KD.sy],sR=[m[0]+m[2]*KD.sx,top+KD.sy],inSl=Math.hypot(px-sL[0],py-sL[1])<KD.sr||Math.hypot(px-sR[0],py-sR[1])<KD.sr;
   if(f===3&&px>m[0]+m[2]*1.15&&py<top+6){put(i,skT,KD.ak+KD.av*Math.max(V(p),0.4));continue}// raised arm/hand
   if(py<top-2){a[i+3]=0;continue}// pad tops
   if(py<top+KD.cr&&ax>m[2]*0.55&&!(f===3&&px>m[0])){const u=(ax-m[2]*0.55)/(m[2]*0.5),w=(top+KD.cr-py)/KD.cr;if(u*u+w*w>1){a[i+3]=0;continue}}// rounded natural shoulders
   if((ax<half&&py>=top)||inSl){shirt.push(p);continue}
   if(py<top+8&&ax<m[2]*1.25){a[i+3]=0;continue}// pad wings
   put(i,skT,KD.ak+KD.av*Math.max(v,0.4));continue}// bare arms/hands, tape/gloves flattened
  if(HM[p]||(px<m[0]-m[2]*(f<2?0.78:0.55)&&py<m[1]+(f<2?95:112))){put(i,skT,KD.ak+KD.av*Math.max(v,0.4));continue}
  const T=tip[f],shoe=py>KD.fy||(T&&Math.hypot(px-T[0],py-T[1])<KD.fr);
  if(shoe){put(i,[244,244,240],0.8+v*0.22);continue}
  put(i,[70,110,170],0.62+1.0*Math.min(v,0.42))}// plain denim, stripes flattened
 // shirt: soft white with gentle vertical shading
 for(const p of shirt){const i=p*4,py=p/W8|0,px=p%W8,m=KM[px/203|0],v=V(p);put(i,[248,248,245],0.86+0.1*Math.min(v,0.6)-0.0006*Math.abs(px-m[0]))}
 x.putImageData(d,0,0);
 // neck behind, sneaker soles, shirt hem/collar lines
 x.save();x.globalCompositeOperation='destination-over';x.fillStyle=SK||'#b07850';KM.forEach(m=>{x.beginPath();x.roundRect(m[4]-8,m[5]+14,16,30,5);x.fill()});x.restore();
 x.save();x.globalCompositeOperation='source-atop';x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=2;KM.forEach(m=>{x.beginPath();x.moveTo(m[0]-m[2],m[1]+KD.w-2);x.lineTo(m[0]+m[2],m[1]+KD.w-2);x.stroke();x.beginPath();x.ellipse(m[4],m[1]-KD.st+2,10,4,0,0,Math.PI);x.stroke()});
 x.fillStyle='rgba(90,90,95,.85)';for(let f=0;f<4;f++){x.fillRect(f*203,KD.fy+22,203,8);const T=tip[f];if(T&&f<3){x.save();x.beginPath();x.arc(T[0],T[1],KD.fr,0,7);x.clip();x.fillRect(T[0]-KD.fr,T[1]+KD.fr*0.45,KD.fr*2,KD.fr);x.restore()}}x.restore();
 return KC[key]=c}
Object.assign(KD,{w:46,hb:30,hy:6,rx:17,ry:21,fy:262,fr:24,hw:34,st:22,sw0:0.92,sw1:0.74,sx:0.82,sy:8,sr:20,ak:0.72,av:0.4,cr:14});
window.FGF_KIDSHEET=kid;const KID5=new Image();KID5.src='story/kidsheet.png?v=1';
const JGON=()=>{try{return mode==='story'&&state==='play'&&window.FGF_STORY&&FGF_STORY._jg&&FGF_STORY._jg()}catch(e){return false}};
{const ok=S5.kimg;S5.kimg=function(ti,p2){const s=ok.apply(this,arguments);try{if(!p2&&JGON()){const k=(KID5.complete&&KID5.naturalWidth)?KID5:window.FGF_KID2?FGF_KID2.sheet({sk:'#d8a283',hr:'#4a3626'}):kid(MK.on&&MK.masc<0?MK.base:ti);if(k)return k}}catch(e){}return s}}
{const od=S3.decal;S3.decal=function(){if(JGON())return;return od.apply(this,arguments)}}
})();
