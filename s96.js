// s96 (Oct 18 #147, #149, #151): GAME DAY STYLE card (hub). All free, all optional.
// 📣 Make call: pick which built-in "It's good!" line the announcer uses (or keep it random).
// 🏷️ Nickname: the announcer works your nickname into some make calls ("ACE · Money!").
// 🥅 Goal net: an optional net behind the uprights (off, white, gold, red or blue). Visual only.
(function(){const U=window.FGF_UI;if(!U)return;const {T_,J2,S2,BS,ON,ROW,SUB,esc,card}=U;
const LN=window.FGF_LINES;const ORIG=LN?JSON.parse(JSON.stringify(LN)):null;
const nick=()=>(LS.fgfNick||'').trim().slice(0,12);
function apply(){if(!LN||!ORIG)return;const n=nick(),ph=LS.fgfCall||'';for(const k of ['good','long','streak','gw']){let a=ORIG[k].slice();if(k==='good'&&ph&&ORIG.good.includes(ph))a=[ph];if(n)a=a.concat(a.map(l=>n.toUpperCase()+' · '+l));LN[k]=a}}
apply();
const NETS={off:null,white:'rgba(255,255,255,.3)',gold:'rgba(242,194,48,.34)',red:'rgba(235,80,70,.36)',blue:'rgba(100,175,255,.36)'};
const oDP=drawPosts;drawPosts=function(){try{const col=NETS[LS.fgfNet||'off'];if(col&&typeof ctx!=='undefined'){const z0=dist+0.2,z1=dist+2.2,H2=HALF+0.4,TOP=BAR+(POST-BAR)*0.62,ox=window.__POX||0;
  ctx.save();ctx.strokeStyle=col;ctx.lineWidth=1;const L=(a,b)=>{if(a&&b){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}};
  for(let i=0;i<=10;i++){const x=ox-H2+i*(2*H2/10);L(P(x,BAR,z1),P(x,TOP,z1))}
  for(let j=0;j<=6;j++){const y=BAR+j*((TOP-BAR)/6);L(P(ox-H2,y,z1),P(ox+H2,y,z1))}
  ctx.strokeStyle=col.replace(/[\d.]+\)$/,'0.35)');L(P(ox-HALF,TOP,z0),P(ox-H2,TOP,z1));L(P(ox+HALF,TOP,z0),P(ox+H2,TOP,z1));L(P(ox-HALF,BAR,z0),P(ox-H2,BAR,z1));L(P(ox+HALF,BAR,z0),P(ox+H2,BAR,z1));ctx.restore()}}catch(e){}return oDP.apply(this,arguments)};
function open(){const ph=LS.fgfCall||'',net=LS.fgfNet||'off';const lines=ORIG?ORIG.good:[];
 const d=card('🎨 '+T_('GAME DAY STYLE'),
  `<div style="${ROW}"><b>📣 ${T_('Make call')}</b><div style="${SUB};margin:2px 0 6px">${T_('Which line the announcer says on a make')}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px"><button data-c="" style="${BS};padding:7px 6px;font-size:11px;${ph?'':ON}">🎲 ${T_('Random')}</button>${lines.map(l=>`<button data-c="${esc(l)}" style="${BS};padding:7px 6px;font-size:11px;${ph===l?ON:''}">${T_(l)}</button>`).join('')}</div></div>`+
  `<div style="${ROW}"><b>🏷️ ${T_('Nickname')}</b><div style="${SUB};margin:2px 0 6px">${T_('The announcer uses it in some make calls')}</div><div style="display:flex;gap:6px"><input id="nk" maxlength="12" value="${esc(nick())}" placeholder="${T_('e.g. ACE')}" style="flex:1;min-width:0;box-sizing:border-box;font:16px system-ui;padding:9px;border-radius:10px;border:2px solid #f2c23088;background:#05200f;color:#fff;text-transform:uppercase"><button id="nks" style="${BS};min-width:72px">${T_('SAVE')}</button></div></div>`+
  `<div style="${ROW}"><b>🥅 ${T_('Goal net')}</b><div style="${SUB};margin:2px 0 6px">${T_('A net behind the uprights. Looks only.')}</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px">${Object.keys(NETS).map(k=>`<button data-n="${k}" style="${BS};padding:7px 2px;font-size:11px;${net===k?ON:''}">${k==='off'?'✖':`<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${NETS[k]};vertical-align:-2px"></span>`} ${T_(k==='off'?'OFF':k[0].toUpperCase()+k.slice(1))}</button>`).join('')}</div></div>`,'fgfs96');
 d.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{LS.fgfCall=b.dataset.c;apply();open();toast('📣 '+(b.dataset.c?T_(b.dataset.c):T_('Random')))});
 d.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{LS.fgfNet=b.dataset.n;open()});
 d.querySelector('#nks').onclick=()=>{LS.fgfNick=d.querySelector('#nk').value.replace(/[<>]/g,'').trim().slice(0,12);apply();open();toast('🏷️ '+(nick()?nick().toUpperCase():T_('Nickname cleared')))}}
window.FGF_STYLE=open;
const oHI=window.FGF_HUBITEMS;if(oHI)window.FGF_HUBITEMS=function(){const L=oHI.apply(this,arguments);try{L.push(['🎨','GAME DAY STYLE','Make call · nickname · goal net',()=>open(),false])}catch(e){}return L};
})();
