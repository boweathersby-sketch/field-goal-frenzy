// s68 (Kirk, Oct 16): (1) KICKER CELEBRATIONS after EVERY make (Style › Poses, now 20 moves with real motion), short (1.3 s),
// non-blocking, tap to skip, free default if none equipped, toggle "🎉 CELEBRATE" (Settings + Pause Settings).
// (2) NEW KICK ANIMATION (approved change): same approved art/frames, better motion via transforms around the feet —
// approach/gather on wind-up, plant + hip turn, eased leg swing, impact squash on the launch frame, follow-through hop, settle.
// Ball launch timing and input are untouched (pure draw). Toggle "🦶 KICK ANIM: NEW / CLASSIC".
(function(){const SY=window.FGF_STYLE;if(!SY)return;const T_=t=>window.FGF_TR?FGF_TR(t):t;
const CEL_ON=()=>LS.fgfCelAll!=='0',KA_NEW=()=>LS.fgfKAnim!=='classic';
// ---- catalog: [id,name,price,[emoji,callout,motion]] ----
const MOT={p0:'flex',p1:'salute',p2:'sky',p3:'shh',p4:'bounce',p5:'shimmy',p6:'cool',p7:'dab',p8:'pump',p9:'pump',p10:'bounce',p11:'cool',p12:'hop',p13:'flex',p14:'wave',p15:'hop',p16:'dance',p17:'spin',p18:'rocket',p19:'shimmy',p20:'bounce',p21:'bow',p22:'chest',p23:'robot',p24:'spin',p25:'heisman',p26:'leap',p27:'tail'};
SY.CAT.p[2].forEach(it=>{const k=it[0].replace('sy_','');if(MOT[k]&&!it[3][2])it[3][2]=MOT[k]});
const NEW=[['sy_m0','Happy Hop',0,['🙌','LET\'S GO!','hop']],['sy_m1','Crowd Wave',200,['👋','HELLO CROWD!','wave']],
 ['sy_m2','Victory Dance',450,['🕺','DANCE!','dance']],['sy_m3','Chest Bump the Air',500,['💥','BOOM!','chest']],['sy_m4','Lambeau Leap',900,['🧀','LEAP!','leap']],
 ['sy_m5','Spin Move',700,['🌀','SPIN!','spin']],['sy_m6','Shimmy Shake',550,['💃','SHIMMY!','shimmy']],['sy_m7','Heisman Pose',800,['🏈','HEISMAN!','heisman']],
 ['sy_m8','Mascot Stomp',750,['🦶','STOMP!','stomp']],['sy_m9','Mascot Tail Spin',1200,['🐊','CHOMP!','tail']],
 ['sy_m10','★ RARE Backflip',3500,['🤸','BACKFLIP!','flip']],['sy_m11','★ RARE Moonwalk',3000,['🌙','SMOOTH!','moon']]];
NEW.forEach(it=>{if(SY.BYID[it[0]])return;SY.CAT.p[2].push(it);SY.BYID[it[0]]=['p',it]});
try{let ch=0;NEW.filter(i=>i[2]===0).forEach(i=>{if(!own.includes(i[0])){own.push(i[0]);ch=1}});if(ch)SV('fgfOwn',own)}catch(e){}
// ---- motion library: a in 0..1 over DUR -> {dx,dy,r,sx,sy} in kicker-height units ----
const E=t=>t<0?0:t>1?1:t,eo=t=>1-Math.pow(1-E(t),3),S=Math.sin,P=Math.PI,env=a=>Math.min(1,a*8,(1-a)*5);
const M={
 pump:a=>({dy:-0.02*Math.abs(S(a*P*4))*env(a),r:0,sx:1,sy:1+0.03*Math.abs(S(a*P*4))*env(a)}),
 hop:a=>({dy:-0.07*Math.abs(S(a*P*2)),sx:1,sy:1}),
 wave:a=>({dx:0.02*S(a*P*4)*env(a),r:0.05*S(a*P*4)*env(a)}),
 flex:a=>({sy:1+0.04*env(a),sx:1+0.03*env(a)}),salute:a=>({r:-0.03*env(a),dy:-0.01*env(a)}),
 sky:a=>({sy:1+0.06*env(a),dy:-0.02*env(a)}),shh:a=>({r:0.04*env(a),dx:0.01*env(a)}),
 bounce:a=>({dy:-0.04*Math.abs(S(a*P*3))}),cool:a=>({r:-0.05*env(a),dx:-0.01*env(a)}),
 dab:a=>({r:0.09*env(a)*(a<0.5?1:1),dx:0.02*env(a)}),
 dance:a=>({dx:0.03*S(a*P*6)*env(a),r:0.07*S(a*P*6)*env(a),dy:-0.02*Math.abs(S(a*P*6))}),
 chest:a=>({dx:0.05*S(E(a*1.6)*P),dy:-0.06*S(E(a*1.6)*P),r:-0.08*S(E(a*1.6)*P)}),
 leap:a=>({dx:0.08*eo(a),dy:-0.16*S(E(a*1.25)*P),r:0.12*S(E(a*1.25)*P)}),
 spin:a=>({sx:Math.cos(eo(a)*P*2)}),shimmy:a=>({dx:0.015*S(a*P*14)*env(a),sy:1+0.02*S(a*P*14)}),
 heisman:a=>({r:-0.1*env(a),dx:-0.02*env(a),sy:1+0.02*env(a)}),robot:a=>({r:0.05*Math.sign(S(a*P*5))*env(a),dy:-0.01*(Math.floor(a*10)%2)}),
 stomp:a=>({dy:-0.04*Math.abs(S(a*P*3)),sy:1-0.05*Math.max(0,-Math.cos(a*P*6))*env(a),sx:1+0.04*Math.max(0,-Math.cos(a*P*6))*env(a)}),
 bow:a=>({r:0.12*env(a),dx:0.02*env(a)}),tail:a=>({sx:Math.cos(eo(a)*P*4),dy:-0.03*S(a*P)}),
 flip:a=>{const u=E((a-0.1)/0.7);return{dy:-0.22*S(u*P),r:-u*P*2}},
 moon:a=>({dx:-0.12*S(a*P),r:-0.03*env(a)}),
 rocket:a=>({dy:-0.4*Math.pow(E(a/0.6),2)+0.4*Math.pow(E((a-0.6)/0.4),0.5)*E((a-0.6)/0.4)*(a>0.6?1:0),sy:1+0.06*env(a)})};
window.FGF_CELMOT=M;
const DUR=1.3;let CEL=null;
function curPose(){const s=SY.ST().p,b=SY.BYID[s];return b&&(own.includes(s)||window.TESTER)?b[1]:null}
const oR=S3.onResult;S3.onResult=function(good){const r=oR.apply(this,arguments);try{if(good&&ball&&ball.res!=='BLOCKED!'&&CEL_ON()){const p=curPose();CEL={m:(p&&p[3][2])||'hop',t:performance.now(),d:p?null:['🙌','YES!']}}}catch(e){}return r};
addEventListener('pointerdown',()=>{if(CEL)CEL=null},true);
// default bubble when no pose equipped (equipped poses already show their bubble from s45)
const oH=S3.hud;S3.hud=function(){const r=oH.apply(this,arguments);try{if(CEL&&CEL.d&&state==='play'){const a=(performance.now()-CEL.t)/1000,K=window.__KR;if(a<DUR&&K){ctx.save();ctx.globalAlpha=Math.min(1,(DUR-a)*3);ctx.textAlign='center';ctx.font=(W<350?24:30)+'px system-ui';ctx.fillText(CEL.d[0],K.x+K.w*0.5,K.y-10-a*8);ctx.font='900 '+(W<350?13:15)+'px system-ui';ctx.fillStyle=GOLD;ctx.strokeStyle='#063';ctx.lineWidth=3;ctx.strokeText(T_(CEL.d[1]),K.x+K.w*0.5,K.y+8-a*8);ctx.fillText(T_(CEL.d[1]),K.x+K.w*0.5,K.y+8-a*8);ctx.restore()}}}catch(e){}return r};
// ---- kick animation state ----
let swT=null,lastSw=null;
function kickXform(){if(!KA_NEW())return null;const now=performance.now();
 const sw=!!swipe||(window.FGF_KCSTATE&&(()=>{const s=FGF_KCSTATE();return !!(s.AH||(s.TM&&s.TM.ph===2))})());
 if(sw&&!ball.fly){if(swT==null)swT=now}else if(!ball.fly)swT=null;
 if(kickT>0){const k=0.35-kickT; // 0..0.35 s after launch
  const c=E(k/0.05),f=E((k-0.04)/0.31);const sq=k<0.07?S(E(k/0.07)*P):0;
  return{dx:0.035*(1-c)+0.05*eo(f)-0.02*f*f,dy:-0.03*S(f*P),r:-0.03*(1-c)+0.09*S(eo(f)*P*0.9),sx:1+0.05*sq,sy:1-0.06*sq,kx:0.05*(1-f)}}
 if(ball.fly){return{dx:0.03,dy:0,r:0.02,sx:1,sy:1}}
 if(swT!=null){const u=eo((now-swT)/260);return{dx:-0.025*u,dy:0.01*u,r:-0.045*u,sx:1-0.015*u,sy:1+0.02*u,kx:-0.04*u}} // gather + plant + hip load
 return{dx:0,dy:0.003*S(now/600),r:0,sx:1,sy:1+0.004*S(now/600)}} // idle breathing
const odk=drawKicker;drawKicker=function(){let X=null;try{if(state==='play'||state==='pass'||state==='ctick'||state==='vs'){X=kickXform();
  if(CEL){const a=(performance.now()-CEL.t)/1000;if(a>=DUR||swipe||ball.fly&&!ball.done)CEL=null;else if(LS.fgfRM!=='1'){const m=(M[CEL.m]||M.hop)(a/DUR);X=Object.assign({dx:0,dy:0,r:0,sx:1,sy:1},X||{});X.dx+=(m.dx||0);X.dy+=(m.dy||0);X.r+=(m.r||0);X.sx*=(m.sx==null?1:m.sx);X.sy*=(m.sy==null?1:m.sy)}}}}catch(e){X=null}
 if(!X)return odk.apply(this,arguments);const g=KG(),h=g.h,px=g.x+g.w*0.45,py=g.y+h*0.97;ctx.save();ctx.translate(px+(X.dx||0)*h,py+(X.dy||0)*h);if(X.r)ctx.rotate(X.r);if(X.kx)ctx.transform(1,0,X.kx,1,0,0);ctx.scale(X.sx==null?1:X.sx,X.sy==null?1:X.sy);ctx.translate(-px,-py);
 try{return odk.apply(this,arguments)}finally{ctx.restore()}};
window.FGF_KANIM={kickXform,M,get CEL(){return CEL},set CEL(v){CEL=v}};
// ---- shop preview: animate the pose emoji with its motion ----
// ---- Settings toggles (main Settings page, between MORE SETTINGS and Career rows) ----
const oS=S3.screen;S3.screen=function(){const r=oS.apply(this,arguments);try{if(state==='set'){const ms=BTN.find(b=>b.l==='⚙️ MORE SETTINGS'),ca=BTN.find(b=>/Career HOME/.test(b.l||''));if(ms){const y=ms.y+ms.h+6,hh=Math.max(30,Math.min(42,(ca?ca.y:y+48)-y-6)),bw=ms.w/2-4;
  bx(ms.x,y,bw,hh,'🎉 CELEBRATE: '+(CEL_ON()?'ON':'OFF'),()=>{LS.fgfCelAll=CEL_ON()?'0':'1'},CEL_ON(),11);
  bx(ms.x+bw+8,y,bw,hh,'🦶 KICK ANIM: '+(KA_NEW()?'NEW':'CLASSIC'),()=>{LS.fgfKAnim=KA_NEW()?'classic':'new'},KA_NEW(),11)}}}catch(e){}return r};
})();
