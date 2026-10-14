// s35: VISORS get their own shop tab (Hands = gloves & wristbands only).
(function(){const hi=SHOP.findIndex(c=>c[0]==='HANDS');if(hi<0||SHOP.some(c=>c[0]==='VISORS'))return;const H=SHOP[hi][1],V=H.filter(i=>slot(i[0])==='v');
 for(let i=H.length-1;i>=0;i--)if(slot(H[i][0])==='v')H.splice(i,1);SHOP.splice(hi+1,0,['VISORS',V])})();
// Deep visor catalog (cosmetic only, no stat bonus). [name, tint, glow, style, price]
(function(){const V=SHOP.find(c=>c[0]==='VISORS');if(!V)return;const G=window.FGF_GEARC&&FGF_GEARC.VIS;if(!G)return;
 const L=[['Clear Visor','rgba(220,240,255,0.55)',0,'',150],['Light Smoke Visor','#8a8f99',0,'',200],['Dark Smoke Visor','#3a3d44',0,'',300],['Amber Visor','#ffb000',0,'',300],
 ['Rose Visor','#ff7aa8',0,'',350],['Ice Blue Visor','#9be7ff',0,'',350],['Emerald Visor','#21c46b',0,'',400],['Purple Haze Visor','#8b5cf6',0,'',400],
 ['Mirror Gold Visor','#d4a017',0,'mirror',1200],['Mirror Silver Visor','#c0c7d0',0,'mirror',1000],['Mirror Blue Visor','#2a7fff',0,'mirror',1100],['Mirror Red Visor','#e0301e',0,'mirror',1100],
 ['Chrome Visor',['#f5f7fa','#8d99a6','#ffffff','#6b7682'],0,'chrome',1800],['Black Chrome Visor',['#111','#555','#222','#888'],0,'chrome',2000],
 ['Neon Green Visor','#39ff14',1,'',900],['Neon Pink Visor','#ff2bd6',1,'',900],['Neon Orange Visor','#ff6a00',1,'',900],['Neon Cyan Visor','#00f0ff',1,'',900],['Neon Yellow Visor','#f6ff00',1,'',900],['Neon Violet Visor','#b026ff',1,'',900],
 ['Team Colors Visor','team',0,'',700],['Team Glow Visor','team',1,'wide',1600],
 ['Sunset Fade Visor',['#ff5f6d','#ffc371'],0,'',800],['Ocean Fade Visor',['#00c6ff','#0072ff'],0,'',800],['Lime Fade Visor',['#a8ff78','#2bb673'],0,'',800],['Berry Fade Visor',['#8e2de2','#ff4b8b'],0,'',800],['Fire Fade Visor',['#ff0000','#ff9a00','#ffe600'],1,'',1500],['Ice Fade Visor',['#e0f7ff','#7fd3ff','#2a7fff'],1,'',1500],
 ['Racing Stripe Visor','#e8e8e8',0,'dbl','#e0301e',650],['Gold Stripe Visor','#222',0,'dbl','#f2c230',750],['Twin Blue Visor','#0a3161',0,'dbl','#7fd3ff',650],['Camo Visor',['#4b5320','#7a6a3a','#3b4a2a','#8a8f5a'],0,'',1000],
 ['Wide Shield Smoke','#2e3138',0,'wide',600],['Wide Shield Gold','#d4a017',0,'wide',1300],
 ['Rainbow Visor',['#ff0000','#ff9a00','#ffe600','#33cc33','#2a7fff','#8b00ff'],0,'',2500],['Rainbow Glow Visor',['#ff0000','#ff9a00','#ffe600','#33cc33','#2a7fff','#8b00ff'],1,'wide',4000],
 ['Galaxy Visor',['#0b0033','#5b2a86','#00c6ff','#0b0033'],1,'mirror',5000],['Plasma Visor',['#ff00cc','#3333ff','#00ffcc'],1,'chrome',6500],['Solar Flare Visor',['#fff3a0','#ffb000','#ff4d00'],1,'mirror',8000],['Diamond Visor',['#ffffff','#bfefff','#ffffff','#d9c2ff'],1,'chrome',12000]];
 L.forEach((x,i)=>{const id='vz'+i,dbl=x[3]==='dbl';G[id]=dbl?[x[1],x[2],'dbl',x[4]]:[x[1],x[2],x[3]];V[1].push([id,x[0],dbl?x[5]:x[4]])});
 V[1].sort((a,b)=>a[2]-b[2])})();
