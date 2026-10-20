// s67 (Kirk, Oct 15): calm EVENTS & MORE hub. One column, 4 small gold section headers, big rows on a subtle dark panel
// with a thin muted border, touch drag-scroll (same scroller as the leaderboards), fixed MENU button. Same actions + red dots.
(function(){const T_=t=>window.FGF_TR?FGF_TR(t):t;
const G=[['PLAY',['DAILY STORM','LEGEND CHALLENGE','WEEKEND EVENT','RIVAL','TRICK SHOTS','MORE MODES','K-I-C-K','ONLINE H2H','CAREER BRACKET']],
 ['REWARDS',['BONUS CENTER','DAILY SPIN','MODE OF THE DAY','KICK BINGO','MY GOAL','WEEKLY MISSIONS','SEASON PASS','STARTER QUESTS','DEAL OF THE DAY','WATCH AD']],
 ['COMPETE & FRIENDS',['ONLINE BOARD','WEEKLY BOARD','WEEKLY KICK CHALLENGE','CLUB WEEKLY GOAL','TEAM PRIDE','SOCIAL','CHALLENGE A FRIEND','FRIEND RECORDS','HIGHLIGHT OF THE WEEK','FAMILY NIGHT','INVITE FRIENDS']],
 ['YOU',['CAREER BOOK','MY PROGRESS','STORM BADGES','STATS','HALL OF FAME','COLLECTION','GET IT ON ANDROID']],
 ['STYLE',['MY LOCKER','SHOP HELPER','QUICK LOOK','MY FIELD']],
 ['OPTIONS & HELP',['KICK OPTIONS','EASY PLAY','COMFORT & DISPLAY','CREDITS & PRIVACY']]];
function layout(){const L=FGF_HUBITEMS(),by={};L.forEach(c=>by[c[1]]=c);const used=new Set(),out=[];
 G.forEach(([h,ks],gi)=>{const it=ks.map(k=>by[k]).filter(Boolean);if(gi===3)L.forEach(c=>{if(!G.some(g=>g[1].includes(c[1])))it.push(c)});if(!it.length)return;out.push({h});it.forEach(c=>out.push({c}))});return out}
const RH=()=>Math.max(56,Math.min(64,H*0.075)),HH=34,GAP=8;
const rr=(x,y,w,h,r)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r)};
const osc=S3.screen;S3.screen=function(){if(state!=='hub')return osc.apply(this,arguments);
 BTN=[];const TH=(window.FGF_HUBTH&&FGF_HUBTH())||{bg:'rgba(0,8,4,0.72)',row:'rgba(8,24,16,.82)',st:'rgba(160,190,175,.22)',hd:GOLD};ctx.fillStyle=TH.bg;ctx.fillRect(0,0,W,H);
 txt(T_('🎉 EVENTS & MORE'),W/2,H*0.065,Math.min(26,W*0.07),GOLD,'#063');ctx.fillStyle='#9fb8aa';ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillText('Lv '+FGF_LV().l+' '+FGF_TITLE()+' · 🪙 '+CSTR(),W/2,H*0.065+22,W*0.9);
 const y0=H*0.065+36,y1=H*0.95-34,rh=RH(),Lo=layout();let tot=0;const pos=Lo.map(e=>{const y=tot;tot+=e.h?HH:rh+GAP;return y});
 const S=FGF_SLIST('hub2',y0,y1,Math.ceil(tot/4)+1,4,()=>{});const x=W*0.05,w=W*0.9;
 ctx.save();ctx.beginPath();ctx.rect(0,y0,W,y1-y0);ctx.clip();
 Lo.forEach((e,i)=>{const y=y0+pos[i]-S.y;if(y>y1||y+rh<y0)return;
  if(e.h){ctx.fillStyle=TH.hd;ctx.font='900 12px system-ui';ctx.textAlign='left';ctx.fillText(T_(e.h),x+4,y+HH-11);ctx.fillStyle='rgba(242,194,48,.25)';ctx.fillRect(x+4,y+HH-5,w-8,1);return}
  const c=e.c;ctx.fillStyle=TH.row;rr(x,y,w,rh,14);ctx.fill();ctx.strokeStyle=TH.st;ctx.lineWidth=1;ctx.stroke();
  ctx.textAlign='center';ctx.font=Math.round(rh*0.46)+'px system-ui';ctx.fillStyle='#fff';ctx.fillText(c[0],x+rh*0.55,y+rh*0.64);
  const tx=x+rh*1.1,tw=w-rh*1.1-28;ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font='800 '+Math.min(18,rh*0.3)+'px system-ui';ctx.fillText(T_(c[1]),tx,y+(c[2]?rh*0.44:rh*0.58),tw);
  if(c[2]){ctx.fillStyle='#9fb8aa';ctx.font='500 '+Math.min(14,rh*0.23)+'px system-ui';let s=T_(c[2]);while(ctx.measureText(s).width>tw&&s.length>3)s=s.slice(0,-2)+'…';ctx.fillText(s,tx,y+rh*0.76)}
  ctx.fillStyle='rgba(200,220,210,.35)';ctx.font='700 18px system-ui';ctx.textAlign='right';ctx.fillText('›',x+w-12,y+rh*0.62);
  if(c[4]){ctx.fillStyle='#ff4f4f';ctx.beginPath();ctx.arc(x+w-30,y+rh/2,5,0,6.29);ctx.fill()}
  const ya=Math.max(y,y0),yb=Math.min(y+rh,y1);if(yb-ya>8)BTN.push({x,y:ya,w,h:yb-ya,cb:c[3],l:c[0]+' '+c[1]})});
 ctx.restore();
 bx(W/2-80,H*0.95-22,160,40,'◀ MENU',()=>state='title',false,14);return true};
})();
