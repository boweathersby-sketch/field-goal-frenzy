// ===== Stage 12: CREATE YOUR TEAM (Pro Bundle) + name filter for team and kicker names =====
// ---- name filter: bad words + NFL team names/cities (applies to team names, abbreviations and kicker names) ----
const NBAD=['FUCK','SHIT','BITCH','CUNT','DICK','COCK','PUSSY','ASSHOLE','FAG','NIGG','NIGA','SLUT','WHORE','RAPE','NAZI','HITLER','PORN','SEX','PENIS','VAGINA','TITS','BOOB','CUM','JIZZ','KKK','RETARD','WANK','TWAT','BASTARD','DAMN','CRAP','PISS','KYS'];
const NFLN=['NFL','CARDINALS','FALCONS','RAVENS','BILLS','PANTHERS','BEARS','BENGALS','BROWNS','COWBOYS','BRONCOS','LIONS','PACKERS','TEXANS','COLTS','JAGUARS','CHIEFS','RAIDERS','CHARGERS','RAMS','DOLPHINS','VIKINGS','PATRIOTS','SAINTS','GIANTS','JETS','EAGLES','STEELERS','49ERS','NINERS','SEAHAWKS','BUCCANEERS','BUCS','TITANS','COMMANDERS','REDSKINS'];
function nameOK(v){const u=String(v||'').toUpperCase(),z=u.replace(/[^A-Z0-9]/g,''),l=z.replace(/0/g,'O').replace(/1/g,'I').replace(/3/g,'E').replace(/4/g,'A').replace(/5/g,'S').replace(/7/g,'T').replace(/\$/g,'S');
 if(NBAD.some(b=>z.includes(b)||l.includes(b)))return false;const words=u.split(/[^A-Z0-9]+/);if(NFLN.some(n=>words.includes(n)||z.includes(n)&&n.length>=6))return false;return true}
window.nameOK=nameOK;
{const op=window.prompt.bind(window);window.prompt=function(q,d){const v=op(q,d);if(v!=null&&/name|abbrev|text/i.test(q)&&!nameOK(v)){toastNow?toastNow('🚫 That name isn\'t allowed · try another'):toast('🚫 That name isn\'t allowed');return null}return v}}
// ---- the custom team (a skin over your current team slot: its name, colors, number and logo) ----
const CT=Object.assign({on:0,n:'MY TEAM',a:'MYT',p:'#c81e3a',s:'#ffd23f',num:9,shape:0,icon:0},J('fgfCT',{}));window.CT=CT;
const CTPAL=['#c81e3a','#e8641b','#ffd23f','#2e9d4a','#0f8f8c','#1f6fd1','#1b2a5a','#5b2a9e','#d43f8d','#262626','#8a8f98','#ffffff','#6e1a2b','#c9a46a'];
const CTSH=['SHIELD','CIRCLE','DIAMOND','HEXAGON'],CTIC=['STAR','BOLT','CROWN','FLAME','LETTERS','BALL'];
const T0=TEAMS.map(t=>({n:t.n,a:t.a,p:t.p,s:t.s})),N0=NUMS5.slice();let CTI=-1;
const ctLive=()=>CT.on&&FGF_PRO()&&team>=0;window.ctLive=ctLive;
function ctApply(){if(CTI>=0){Object.assign(TEAMS[CTI],T0[CTI]);NUMS5[CTI]=N0[CTI]}CTI=-1;if(ctLive()){CTI=myT();Object.assign(TEAMS[CTI],{n:CT.n,a:CT.a,p:CT.p,s:CT.s});NUMS5[CTI]=CT.num}
 for(const k in KC5)delete KC5[k]}
window.ctApply=ctApply;const ctSave=()=>{SV('fgfCT',CT);ctApply()};
{const oA=applyTeam;applyTeam=function(i){if(CTI>=0){Object.assign(TEAMS[CTI],T0[CTI]);NUMS5[CTI]=N0[CTI];CTI=-1}oA(i);ctApply()}}
// kicker sheet for the custom team: the Harbor Hawks kicker with the jersey/socks recoloured to your primary colour
{const oT=teamSheet;teamSheet=function(ti){if(!(ctLive()&&ti===CTI))return oT(ti);const k='ct_'+CT.p+CT.s+CT.num;if(KC5[k])return KC5[k];if(!KS.complete||!KS.naturalWidth)return oT(ti);
 const c=document.createElement('canvas');c.width=812;c.height=300;const x=c.getContext('2d');x.drawImage(KS,0,7*300,812,300,0,0,812,300);let d;try{d=x.getImageData(0,0,812,300)}catch(e){return oT(ti)}
 const a=d.data,P=rgb(CT.p);for(let i=0;i<a.length;i+=4){if(a[i+3]<8)continue;const [h,s,v]=hsv(a[i],a[i+1],a[i+2]);if(h>200&&h<260&&s>0.25){const k2=Math.min(1.6,v/0.36);a[i]=Math.min(255,P[0]*k2+18*v);a[i+1]=Math.min(255,P[1]*k2+18*v);a[i+2]=Math.min(255,P[2]*k2+18*v)}}
 x.putImageData(d,0,0);KMETA[7].forEach(m=>numOn(x,m[0],m[1],m[3],CT.num,CT.s));return KC5[k]=c}}
// logo from original shapes (no real-world marks)
function ctLogo(c,x,y,s){const P=CT.p,S=CT.s;c.save();c.translate(x,y);const r=s*0.46;c.beginPath();
 if(CT.shape===0){c.moveTo(-r*0.85,-r*0.8);c.lineTo(r*0.85,-r*0.8);c.lineTo(r*0.85,r*0.05);c.quadraticCurveTo(r*0.8,r*0.7,0,r);c.quadraticCurveTo(-r*0.8,r*0.7,-r*0.85,r*0.05);c.closePath()}
 else if(CT.shape===1)c.arc(0,0,r,0,7);else if(CT.shape===2){c.moveTo(0,-r);c.lineTo(r,0);c.lineTo(0,r);c.lineTo(-r,0);c.closePath()}else{for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/2;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath()}
 c.fillStyle=P;c.fill();c.lineWidth=Math.max(2,s*0.06);c.strokeStyle=S;c.stroke();c.fillStyle=S;c.strokeStyle='rgba(0,0,0,0.35)';c.lineWidth=Math.max(1,s*0.02);const q=r*0.5;c.beginPath();
 const ic=CTIC[CT.icon];if(ic==='STAR'){for(let i=0;i<10;i++){const a=Math.PI/5*i-Math.PI/2,rr=i%2?q*0.45:q;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}c.closePath();c.fill();c.stroke()}
 else if(ic==='BOLT'){c.moveTo(q*0.2,-q);c.lineTo(-q*0.55,q*0.1);c.lineTo(-q*0.02,q*0.1);c.lineTo(-q*0.25,q);c.lineTo(q*0.55,-q*0.15);c.lineTo(q*0.02,-q*0.15);c.closePath();c.fill();c.stroke()}
 else if(ic==='CROWN'){c.moveTo(-q,q*0.6);c.lineTo(-q,-q*0.5);c.lineTo(-q*0.5,0);c.lineTo(0,-q*0.8);c.lineTo(q*0.5,0);c.lineTo(q,-q*0.5);c.lineTo(q,q*0.6);c.closePath();c.fill();c.stroke()}
 else if(ic==='FLAME'){c.moveTo(0,-q);c.bezierCurveTo(q*0.9,-q*0.2,q*0.8,q*0.9,0,q);c.bezierCurveTo(-q*0.8,q*0.9,-q*0.9,0,-q*0.2,-q*0.3);c.quadraticCurveTo(-q*0.05,-q*0.55,0,-q);c.fill();c.stroke()}
 else if(ic==='BALL'){c.ellipse(0,0,q,q*0.6,-0.5,0,7);c.fill();c.stroke();c.strokeStyle=P;c.lineWidth=Math.max(1,s*0.03);c.beginPath();c.moveTo(-q*0.35,q*0.2);c.lineTo(q*0.35,-q*0.2);c.stroke()}
 else{c.font='900 '+Math.round(r*(CT.a.length>2?0.62:0.8))+'px Impact,Arial Black,system-ui';c.textAlign='center';c.textBaseline='middle';c.lineWidth=Math.max(2,s*0.04);c.strokeText(CT.a,0,r*0.04);c.fillText(CT.a,0,r*0.04)}
 c.restore()}
window.ctLogo=ctLogo;
{const oL=logo;logo=function(i,x,y,s){if(ctLive()&&i===CTI){ctLogo(ctx,x,y,s);return}oL(i,x,y,s)}}
// ---- editor screen ----
let CTP=null;
function drawCT(){BTN=[];txt('CREATE YOUR TEAM',W/2,H*0.06,Math.min(26,W*0.068),GOLD,'#063');const pro=FGF_PRO();ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.textAlign='center';
 ctx.fillText(pro?'⭐ Pro feature · replaces your current team\'s look':'🔒 Pro Bundle feature',W/2,H*0.06+20);
 const py=H*0.1,ph=Math.min(H*0.2,170);panel(W*0.05,py,W*0.9,ph);ctLogo(ctx,W*0.3,py+ph/2,ph*0.8);
 ctx.fillStyle='#fff';ctx.font='900 '+Math.min(18,W*0.045)+'px system-ui';ctx.textAlign='left';const nm=CT.n,tx=W*0.52;ctx.fillText(nm.length>14?nm.slice(0,14):nm,tx,py+ph*0.38);if(nm.length>14)ctx.fillText(nm.slice(14),tx,py+ph*0.38+20);
 ctx.font='bold 12px system-ui';ctx.fillStyle=CT.s;ctx.fillText(CT.a+' · #'+CT.num,tx,py+ph*0.66);[CT.p,CT.s].forEach((c,i)=>{ctx.fillStyle=c;ctx.fillRect(tx+i*26,py+ph*0.74,22,14);ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.strokeRect(tx+i*26,py+ph*0.74,22,14)});
 const R=[['TEAM NAME',CT.n,()=>{const v=prompt('Team name (max 20)',CT.n);if(v!=null){const t=v.toUpperCase().replace(/[^A-Z0-9 .'&-]/g,'').trim().slice(0,20);if(t){CT.n=t;ctSave()}}}],
  ['ABBREVIATION',CT.a,()=>{const v=prompt('Team abbreviation (3 letters)',CT.a);if(v!=null){const t=v.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3);if(t){CT.a=t;ctSave()}}}],
  ['PRIMARY COLOUR','',d=>{CT.p=CTPAL[(CTPAL.indexOf(CT.p)+d+CTPAL.length)%CTPAL.length];ctSave()},CT.p],
  ['SECONDARY COLOUR','',d=>{CT.s=CTPAL[(CTPAL.indexOf(CT.s)+d+CTPAL.length)%CTPAL.length];ctSave()},CT.s],
  ['JERSEY NUMBER','#'+CT.num,()=>{const v=prompt('Jersey number 0-99',CT.num);if(v!=null&&/^\d{1,2}$/.test(v.trim())){CT.num=+v.trim();ctSave()}}],
  ['LOGO SHAPE',CTSH[CT.shape],d=>{CT.shape=(CT.shape+d+CTSH.length)%CTSH.length;ctSave()}],
  ['LOGO ICON',CTIC[CT.icon],d=>{CT.icon=(CT.icon+d+CTIC.length)%CTIC.length;ctSave()}]];
 const y0=py+ph+10,rh=Math.min(50,(H*0.8-y0)/(R.length+1));
 R.forEach(([l,v,f,sw],i)=>{const y=y0+i*rh;panel(W*0.05,y,W*0.9,rh-6);ctx.textAlign='left';ctx.fillStyle='#bcd';ctx.font='bold 10px system-ui';ctx.fillText(l,W*0.08,y+rh*0.34);ctx.fillStyle='#fff';ctx.font='900 14px system-ui';
  if(sw){ctx.fillStyle=sw;ctx.fillRect(W*0.08,y+rh*0.45,60,rh*0.3);ctx.strokeStyle='#fff';ctx.strokeRect(W*0.08,y+rh*0.45,60,rh*0.3)}else ctx.fillText(v,W*0.08,y+rh*0.7);
  if(!pro)return;if(f.length){bx(W*0.95-80,y+rh/2-16,36,30,'◀',()=>f(-1),false,13);bx(W*0.95-40,y+rh/2-16,36,30,'▶',()=>f(1),false,13)}else bx(W*0.95-70,y+rh/2-16,64,30,'EDIT',f,false,12)});
 const yb=y0+R.length*rh+4,bw=W*0.9;
 if(pro)bx(W*0.05,yb,bw,40,CT.on?'✔ USING MY TEAM · TAP TO TURN OFF':'USE MY TEAM',()=>{CT.on=CT.on?0:1;ctSave();toast(CT.on?'🏈 '+CT.n+' is your team':'Team look back to '+T0[myT()].n)},!!CT.on,13);
 else bx(W*0.05,yb,bw,40,'🔒 GET THE PRO BUNDLE',()=>{state='shop';shopTab=SHOP.length},true,13);
 bx(W/2-90,H*0.93-20,180,40,'◀ BACK',()=>state='teams')}
{const oS=S3.screen;S3.screen=function(){if(state==='ct'){drawCT();return true}const r=oS();if(state==='teams'&&window.SWC==null)bx(W/2+4,H*0.14+4*(Math.min(H*0.155,130)+8),W*0.44,36,(FGF_PRO()?'⭐ ':'🔒 ')+'CREATE TEAM',()=>state='ct',false,12);return r}}
// keep the custom look in sync with Pro (tester toggle / purchase) and at start
{let lp=null;setInterval(()=>{const p=ctLive();if(p!==lp){lp=p;ctApply()}},500);ctApply()}
