// s79 (Oct 17, Kirk): calm TIP JAR in Shop › PACKS. Same purchase path as Remove Ads / Pro Bundle (buyPack → FGF_BILLING,
// Google Play Billing in the Android build; web shows the existing "Google Play app only" toast). No external donation links.
// Each tip is a consumable Play product (placeholder ids tip_099 … tip_4999) and grants only a cosmetic thank-you:
// a gold-heart "Supporter" badge by the player's name. Bigger tiers add more hearts (stacking, shown up to 5).
(function(){const B=window.FGF_BILLING;if(!B||typeof PACKS==='undefined')return;
const TIERS=[['tip_099','$0.99',1],['tip_199','$1.99',1],['tip_299','$2.99',2],['tip_499','$4.99',3],['tip_999','$9.99',4],['tip_1999','$19.99',5],['tip_4999','$49.99',5]];
const QUICK=['tip_099','tip_299','tip_499'],T=id=>TIERS.find(t=>t[0]===id);
const KIRK='Thanks for playing! Tips help me keep updating the game. — Kirk';
const hearts=()=>+(LS.fgfTipH||0),badge=()=>{const h=hearts();return h>0?'💛'.repeat(Math.min(5,h))+' Supporter':''};
window.FGF_SUPPORTER=badge;
PACKS.push({id:'tip_jar',price:'OPEN',coins:0,name:'Tip Jar',icon:'💛 ',desc:KIRK+' · Optional · cosmetic thank-you only'});
const oBuy=buyPack;buyPack=function(p){if(p&&p.id==='tip_jar'){TJ=1;return}return oBuy.apply(this,arguments)};
const oOn=B.onPurchased.bind(B);B.onPurchased=function(id){const t=T(id);if(t){LS.fgfTipH=String(hearts()+t[2]);LS.fgfTips=String(+(LS.fgfTips||0)+1);TJ=0;toast('💛 Thank you for the tip!');return}return oOn.apply(this,arguments)};
let TJ=0;// 0 closed, 1 tip jar, 2 custom picker
// ---- translations (merged into each language table when it loads) ----
const TR={es:['BOTE DE PROPINAS','Bote de propinas','¡Gracias por jugar! Las propinas me ayudan a seguir actualizando el juego. — Kirk','Opcional','solo un agradecimiento cosmético','PROPINA PERSONALIZADA','Elige una cantidad','CERRAR','Colaborador','¡Gracias por la propina!','Cada propina añade un corazón dorado junto a tu nombre'],
de:['TRINKGELDGLAS','Trinkgeldglas','Danke fürs Spielen! Trinkgelder helfen mir, das Spiel weiter zu aktualisieren. — Kirk','Freiwillig','nur ein kosmetisches Dankeschön','EIGENES TRINKGELD','Wähle einen Betrag','SCHLIESSEN','Unterstützer','Danke für das Trinkgeld!','Jedes Trinkgeld fügt ein goldenes Herz neben deinem Namen hinzu'],
fr:['POURBOIRES','Pourboires','Merci de jouer ! Les pourboires m’aident à continuer de mettre le jeu à jour. — Kirk','Facultatif','simple merci cosmétique','POURBOIRE LIBRE','Choisis un montant','FERMER','Soutien','Merci pour le pourboire !','Chaque pourboire ajoute un cœur doré à côté de ton nom'],
it:['BARATTOLO MANCE','Barattolo mance','Grazie per aver giocato! Le mance mi aiutano a continuare ad aggiornare il gioco. — Kirk','Facoltativo','solo un grazie cosmetico','MANCIA PERSONALIZZATA','Scegli un importo','CHIUDI','Sostenitore','Grazie per la mancia!','Ogni mancia aggiunge un cuore d’oro accanto al tuo nome'],
pt:['POTE DE GORJETAS','Pote de gorjetas','Obrigado por jogar! As gorjetas me ajudam a continuar atualizando o jogo. — Kirk','Opcional','só um agradecimento cosmético','GORJETA PERSONALIZADA','Escolha um valor','FECHAR','Apoiador','Obrigado pela gorjeta!','Cada gorjeta adiciona um coração dourado ao lado do seu nome'],
nl:['FOOIENPOT','Fooienpot','Bedankt voor het spelen! Fooien helpen me de game te blijven updaten. — Kirk','Optioneel','alleen een cosmetisch bedankje','EIGEN FOOI','Kies een bedrag','SLUITEN','Supporter','Bedankt voor de fooi!','Elke fooi voegt een gouden hart bij je naam toe'],
pl:['SŁOIK NA NAPIWKI','Słoik na napiwki','Dzięki za grę! Napiwki pomagają mi dalej aktualizować grę. — Kirk','Opcjonalne','tylko kosmetyczne podziękowanie','WŁASNY NAPIWEK','Wybierz kwotę','ZAMKNIJ','Wspierający','Dzięki za napiwek!','Każdy napiwek dodaje złote serce przy twoim imieniu'],
ru:['БАНКА ДЛЯ ЧАЕВЫХ','Банка для чаевых','Спасибо, что играете! Чаевые помогают мне обновлять игру. — Кирк','По желанию','только косметическое «спасибо»','СВОЯ СУММА','Выберите сумму','ЗАКРЫТЬ','Поддержка','Спасибо за чаевые!','Каждый донат добавляет золотое сердце рядом с вашим именем'],
tr:['BAHŞİŞ KAVANOZU','Bahşiş kavanozu','Oynadığın için teşekkürler! Bahşişler oyunu güncellemeye devam etmeme yardım ediyor. — Kirk','İsteğe bağlı','yalnızca kozmetik teşekkür','ÖZEL BAHŞİŞ','Bir tutar seç','KAPAT','Destekçi','Bahşiş için teşekkürler!','Her bahşiş adının yanına altın bir kalp ekler'],
id:['TOPLES TIP','Toples tip','Terima kasih sudah bermain! Tip membantuku terus memperbarui game ini. — Kirk','Opsional','hanya ucapan terima kasih kosmetik','TIP KUSTOM','Pilih jumlah','TUTUP','Pendukung','Terima kasih atas tipnya!','Setiap tip menambah hati emas di samping namamu'],
vi:['HŨ TIỀN TIP','Hũ tiền tip','Cảm ơn bạn đã chơi! Tiền tip giúp mình tiếp tục cập nhật game. — Kirk','Tùy chọn','chỉ là lời cảm ơn trang trí','TIP TÙY CHỌN','Chọn số tiền','ĐÓNG','Người ủng hộ','Cảm ơn bạn đã tip!','Mỗi lần tip thêm một trái tim vàng cạnh tên bạn'],
tl:['TIP JAR','Tip jar','Salamat sa paglalaro! Tumutulong ang mga tip para patuloy kong ma-update ang laro. — Kirk','Opsyonal','pasasalamat na kosmetiko lang','SARILING TIP','Pumili ng halaga','ISARA','Supporter','Salamat sa tip!','Bawat tip ay nagdadagdag ng gintong puso sa tabi ng pangalan mo'],
hi:['टिप जार','टिप जार','खेलने के लिए धन्यवाद! टिप्स से मैं गेम को अपडेट करता रह पाता हूँ। — Kirk','वैकल्पिक','सिर्फ़ कॉस्मेटिक धन्यवाद','अपनी टिप','राशि चुनें','बंद करें','समर्थक','टिप के लिए धन्यवाद!','हर टिप आपके नाम के पास एक सुनहरा दिल जोड़ती है'],
ar:['جرة الإكراميات','جرة الإكراميات','شكرًا على اللعب! الإكراميات تساعدني على مواصلة تحديث اللعبة. — كيرك','اختياري','شكر تجميلي فقط','إكرامية مخصصة','اختر مبلغًا','إغلاق','داعم','شكرًا على الإكرامية!','كل إكرامية تضيف قلبًا ذهبيًا بجانب اسمك'],
ja:['チップ箱','チップ箱','遊んでくれてありがとう！チップはゲームの更新を続ける助けになります。— Kirk','任意','見た目だけのお礼','金額を選んでチップ','金額を選んでください','閉じる','サポーター','チップありがとう！','チップごとに名前の横に金のハートが付きます'],
ko:['팁 항아리','팁 항아리','플레이해 주셔서 감사합니다! 팁은 게임을 계속 업데이트하는 데 큰 힘이 됩니다. — Kirk','선택 사항','꾸미기용 감사 표시만','직접 고르는 팁','금액을 선택하세요','닫기','후원자','팁 감사합니다!','팁마다 이름 옆에 금색 하트가 추가됩니다'],
zh:['打赏罐','打赏罐','感谢游玩！你的打赏能帮我持续更新游戏。— Kirk','自愿','仅外观感谢','自选打赏','选择金额','关闭','支持者','感谢打赏！','每次打赏都会在你的名字旁加一颗金心']};
const EN=['TIP JAR','Tip Jar',KIRK,'Optional','cosmetic thank-you only','CUSTOM TIP','Pick a tip amount','CLOSE','Supporter','Thank you for the tip!','Each tip adds a gold heart by your name'];
function merge(){for(const l in TR){const D=window['FGF_'+l.toUpperCase()];if(D&&!D.__tip){EN.forEach((k,i)=>D[k]=TR[l][i]);try{Object.defineProperty(D,'__tip',{value:1})}catch(e){}}}}
merge();setTimeout(merge,3000);
// ---- drawing ----
function overlay(){const cw=Math.min(W*0.92,380),cx=(W-cw)/2,isPick=TJ===2;
 ctx.font='13px system-ui';const tl=wrapP(KIRK,(cw-40)*11/13),sub=wrapP('Each tip adds a gold heart by your name',cw-36);
 const rows=isPick?Math.ceil(TIERS.length/2):1,ch=86+tl.length*17+sub.length*15+(isPick?28+rows*44:52+44)+(badge()?22:0)+58,cy=Math.max(8,(H-ch)/2);
 BTN.length=0;ctx.fillStyle='rgba(3,8,16,0.82)';ctx.fillRect(0,0,W,H);panel(cx,cy,cw,ch);
 let y=cy+36;ctx.textAlign='center';ctx.fillStyle='#ffd98a';ctx.font='900 20px system-ui';ctx.fillText(isPick?'💛 CUSTOM TIP':'💛 TIP JAR',W/2,y);y+=26;
 ctx.fillStyle='#e8eef5';ctx.font='13px system-ui';tl.forEach(l=>{ctx.fillText(l,W/2,y);y+=17});y+=4;
 ctx.fillStyle='#9fb3c8';ctx.font='11px system-ui';sub.forEach(l=>{ctx.fillText(l,W/2,y);y+=15});
 if(badge()){ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.fillText(badge(),W/2,y+6);y+=22}
 y+=10;const g=10;
 if(!isPick){const bw=(cw-36-2*g)/3;QUICK.forEach((id,i)=>{const t=T(id);bx(cx+18+i*(bw+g),y,bw,40,t[1],()=>buyPack({id:t[0],price:t[1],name:'Tip'}),false,15)});y+=52;
  bx(cx+18,y,cw-36,36,'CUSTOM TIP ▸',()=>{TJ=2},false,13);y+=44}
 else{ctx.fillStyle='#bcd';ctx.font='11px system-ui';ctx.fillText('Pick a tip amount',W/2,y+4);y+=18;const bw=(cw-36-g)/2;
  TIERS.forEach((t,i)=>{const c=i%2,r=(i/2)|0,last=i===TIERS.length-1&&TIERS.length%2;bx(last?cx+18:cx+18+c*(bw+g),y+r*44,last?cw-36:bw,36,t[1]+' · '+t[2]+'💛',()=>buyPack({id:t[0],price:t[1],name:'Tip'}),false,13)});y+=rows*44}
 ctx.fillStyle='#7f93a8';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText(B.available?'Optional · cosmetic thank-you only':'Google Play app only',W/2,y+8);
 bx(W/2-70,y+16,140,34,isPick?'◀ BACK':'CLOSE',()=>{TJ=isPick?1:0},false,13)}
const oDS=drawShop;drawShop=function(){merge();return oDS.apply(this,arguments)};
// drawn last (after s72's HELPER chip etc.) so nothing underneath stays tappable
const oSc=S3.screen;S3.screen=function(){const r=oSc.apply(this,arguments);try{if(state!=='shop')TJ=0;else if(TJ)overlay()}catch(e){TJ=0}return r};
// supporter hearts next to the profile name (More › Profiles button)
try{new MutationObserver(()=>{const h=badge();if(!h)return;const s=document.querySelector('#mpf span');if(s&&!s.dataset.tip){s.dataset.tip=1;s.textContent+=' '+'💛'.repeat(Math.min(5,hearts()))}}).observe(document.body,{childList:true,subtree:true})}catch(e){}
window.FGF_TIPJAR={open:()=>{state='shop';shopTab=SHOP.length;TJ=1},pick:()=>{state='shop';shopTab=SHOP.length;TJ=2},TIERS};
})();
