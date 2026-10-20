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
let TJ=0;// 0 closed, 1 tip jar, 2 custom picker, 3 ad-tip thank-you
// ---- Oct 17: WATCH AN AD TO TIP (free). Rewarded video through the shared ad adapter (FGF_ADAPTER, s22): AdMob rewarded
// in the Android build (Google test unit until real ids exist), tester mock on web (?tester + fgfAdMock=1). Counts ONLY when
// the adapter resolves true (AdMob onUserEarnedReward). No coins. 10 ad tips a day; every 10 ad tips = 1 Supporter heart.
const ADCAP=10,PERH=10,KIRK_AD='Thanks for watching! Every ad helps me keep updating the game. — Kirk';
const T_=x=>window.FGF_TR?FGF_TR(x):x;
const adDay=()=>{let d={};try{d=JSON.parse(LS.fgfAdTipDay||'{}')}catch(e){}const k=(window.FGF_DK||(()=>new Date().toDateString()))();if(d.d!==k)d={d:k,n:0};return d};
const adTot=()=>+(LS.fgfAdTips||0);let adBusy=false,adNewH=false;
function adTip(){if(adBusy)return;const on=window.FGF_ADS_ON&&FGF_ADS_ON();if(!on){toast(T_('Ad tips unlock in the Google Play app'));return}
 const d=adDay();if(d.n>=ADCAP){toast(T_('Daily ad tip limit reached · come back tomorrow'));return}
 adBusy=true;window.FGF_ADPLAYING=1;let pr;try{window.FGF_ADPAID_RESET&&FGF_ADPAID_RESET();pr=window.FGF_ADAPTER().rewarded()}catch(e){pr=Promise.resolve(false)}
 const done=ok=>{adBusy=false;window.FGF_ADPLAYING=0;if(ok!==true){toast(T_('Watch the full video to tip'));return}
  const d2=adDay();d2.n++;LS.fgfAdTipDay=JSON.stringify(d2);const t=adTot()+1;LS.fgfAdTips=String(t);adNewH=t%PERH===0;if(adNewH)LS.fgfTipH=String(hearts()+1);
  if(state==='shop')TJ=3;else toast('💛 '+T_('Thanks for the ad tip!'))};
 Promise.resolve(pr).then(done,()=>done(false))}
window.FGF_ADTIP={tip:adTip,day:()=>adDay().n,total:adTot,CAP:ADCAP,PERH};
function adLine(){return adDay().n+'/'+ADCAP+' '+T_('today')+' · '+(adTot()%PERH)+'/'+PERH+' '+T_('toward your next heart')+' 💛'}
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
const EN2=['📺 WATCH AN AD TO TIP (free)',KIRK_AD,'Ad tips unlock in the Google Play app','Daily ad tip limit reached · come back tomorrow','Watch the full video to tip','Thanks for the ad tip!','today','toward your next heart','THANK YOU!','OK','New Supporter heart!','Free · no coins · up to 10 a day'];
const TR2={es:['📺 VER ANUNCIO COMO PROPINA (gratis)','¡Gracias por mirar! Cada anuncio me ayuda a seguir actualizando el juego. — Kirk','Las propinas con anuncios se activan en la app de Google Play','Límite diario alcanzado · vuelve mañana','Mira el video completo para dar la propina','¡Gracias por la propina con anuncio!','hoy','para tu próximo corazón','¡GRACIAS!','OK','¡Nuevo corazón de colaborador!','Gratis · sin monedas · hasta 10 al día'],
de:['📺 WERBUNG ALS TRINKGELD (gratis)','Danke fürs Zuschauen! Jede Werbung hilft mir, das Spiel weiter zu aktualisieren. — Kirk','Werbe-Trinkgeld gibt es in der Google-Play-App','Tageslimit erreicht · komm morgen wieder','Sieh das ganze Video, um Trinkgeld zu geben','Danke für das Werbe-Trinkgeld!','heute','bis zum nächsten Herz','DANKE!','OK','Neues Unterstützer-Herz!','Gratis · keine Münzen · bis zu 10 am Tag'],
fr:['📺 UNE PUB EN POURBOIRE (gratuit)','Merci d’avoir regardé ! Chaque pub m’aide à mettre le jeu à jour. — Kirk','Les pourboires pub arrivent dans l’app Google Play','Limite du jour atteinte · reviens demain','Regarde la vidéo en entier pour donner','Merci pour le pourboire pub !','aujourd’hui','vers ton prochain cœur','MERCI !','OK','Nouveau cœur de soutien !','Gratuit · sans pièces · jusqu’à 10 par jour'],
it:['📺 UN ANNUNCIO COME MANCIA (gratis)','Grazie per aver guardato! Ogni annuncio mi aiuta ad aggiornare il gioco. — Kirk','Le mance con annunci arrivano nell’app Google Play','Limite giornaliero raggiunto · torna domani','Guarda tutto il video per lasciare la mancia','Grazie per la mancia con annuncio!','oggi','verso il prossimo cuore','GRAZIE!','OK','Nuovo cuore sostenitore!','Gratis · niente monete · fino a 10 al giorno'],
pt:['📺 ANÚNCIO COMO GORJETA (grátis)','Obrigado por assistir! Cada anúncio me ajuda a atualizar o jogo. — Kirk','Gorjetas com anúncio chegam no app do Google Play','Limite diário atingido · volte amanhã','Assista ao vídeo inteiro para dar a gorjeta','Obrigado pela gorjeta com anúncio!','hoje','para o próximo coração','OBRIGADO!','OK','Novo coração de apoiador!','Grátis · sem moedas · até 10 por dia'],
nl:['📺 ADVERTENTIE ALS FOOI (gratis)','Bedankt voor het kijken! Elke advertentie helpt me de game te updaten. — Kirk','Advertentiefooien komen in de Google Play-app','Daglimiet bereikt · kom morgen terug','Kijk de hele video om een fooi te geven','Bedankt voor de advertentiefooi!','vandaag','tot je volgende hart','BEDANKT!','OK','Nieuw supportershart!','Gratis · geen munten · max. 10 per dag'],
pl:['📺 REKLAMA JAKO NAPIWEK (za darmo)','Dzięki za oglądanie! Każda reklama pomaga mi aktualizować grę. — Kirk','Napiwki z reklam będą w aplikacji Google Play','Dzienny limit osiągnięty · wróć jutro','Obejrzyj cały film, aby dać napiwek','Dzięki za napiwek z reklamy!','dziś','do następnego serca','DZIĘKI!','OK','Nowe serce wspierającego!','Za darmo · bez monet · do 10 dziennie'],
ru:['📺 РЕКЛАМА ВМЕСТО ЧАЕВЫХ (бесплатно)','Спасибо за просмотр! Каждая реклама помогает мне обновлять игру. — Кирк','Чаевые за рекламу доступны в приложении Google Play','Дневной лимит исчерпан · возвращайтесь завтра','Досмотрите видео до конца, чтобы оставить чаевые','Спасибо за чаевые рекламой!','сегодня','до следующего сердца','СПАСИБО!','OK','Новое сердце поддержки!','Бесплатно · без монет · до 10 в день'],
tr:['📺 BAHŞİŞ İÇİN REKLAM İZLE (ücretsiz)','İzlediğin için teşekkürler! Her reklam oyunu güncellememe yardım ediyor. — Kirk','Reklamla bahşiş Google Play uygulamasında açılır','Günlük sınıra ulaşıldı · yarın tekrar gel','Bahşiş için videonun tamamını izle','Reklam bahşişi için teşekkürler!','bugün','sonraki kalbe','TEŞEKKÜRLER!','TAMAM','Yeni destekçi kalbi!','Ücretsiz · jeton yok · günde en fazla 10'],
id:['📺 TONTON IKLAN UNTUK TIP (gratis)','Terima kasih sudah menonton! Setiap iklan membantuku memperbarui game. — Kirk','Tip iklan tersedia di aplikasi Google Play','Batas harian tercapai · kembali besok','Tonton video sampai habis untuk memberi tip','Terima kasih atas tip iklannya!','hari ini','menuju hati berikutnya','TERIMA KASIH!','OK','Hati pendukung baru!','Gratis · tanpa koin · maks. 10 sehari'],
vi:['📺 XEM QUẢNG CÁO ĐỂ TIP (miễn phí)','Cảm ơn bạn đã xem! Mỗi quảng cáo giúp mình cập nhật game. — Kirk','Tip bằng quảng cáo có trong ứng dụng Google Play','Đã đạt giới hạn hôm nay · quay lại ngày mai','Xem hết video để tip','Cảm ơn bạn đã tip bằng quảng cáo!','hôm nay','tới trái tim tiếp theo','CẢM ƠN!','OK','Trái tim ủng hộ mới!','Miễn phí · không xu · tối đa 10 mỗi ngày'],
tl:['📺 MANOOD NG AD PARA MAG-TIP (libre)','Salamat sa panonood! Bawat ad ay tumutulong sa pag-update ko ng laro. — Kirk','Bukas ang ad tip sa Google Play app','Naabot na ang limit ngayon · bumalik bukas','Panoorin ang buong video para mag-tip','Salamat sa ad tip!','ngayon','papunta sa susunod na puso','SALAMAT!','OK','Bagong Supporter na puso!','Libre · walang coins · hanggang 10 bawat araw'],
hi:['📺 टिप के लिए विज्ञापन देखें (मुफ़्त)','देखने के लिए धन्यवाद! हर विज्ञापन से मैं गेम अपडेट करता रह पाता हूँ। — Kirk','विज्ञापन टिप Google Play ऐप में खुलती है','आज की सीमा पूरी · कल फिर आएँ','टिप देने के लिए पूरा वीडियो देखें','विज्ञापन टिप के लिए धन्यवाद!','आज','अगले दिल तक','धन्यवाद!','ठीक है','नया समर्थक दिल!','मुफ़्त · कोई सिक्के नहीं · दिन में 10 तक'],
ar:['📺 شاهد إعلانًا للإكرامية (مجانًا)','شكرًا على المشاهدة! كل إعلان يساعدني على تحديث اللعبة. — كيرك','إكراميات الإعلانات متاحة في تطبيق Google Play','بلغت الحد اليومي · عد غدًا','شاهد الفيديو كاملًا لتقديم الإكرامية','شكرًا على إكرامية الإعلان!','اليوم','نحو قلبك التالي','شكرًا!','حسنًا','قلب داعم جديد!','مجانًا · بلا عملات · حتى 10 يوميًا'],
ja:['📺 広告を見てチップ（無料）','見てくれてありがとう！広告はゲームの更新を続ける助けになります。— Kirk','広告チップは Google Play アプリで使えます','今日の上限に達しました · また明日','チップするには動画を最後まで見てください','広告チップありがとう！','今日','次のハートまで','ありがとう！','OK','新しいサポーターハート！','無料 · コインなし · 1日10回まで'],
ko:['📺 광고 보고 팁 주기 (무료)','시청해 주셔서 감사합니다! 광고는 게임 업데이트에 큰 힘이 됩니다. — Kirk','광고 팁은 Google Play 앱에서 열립니다','오늘 한도에 도달했어요 · 내일 다시 오세요','팁을 주려면 영상을 끝까지 보세요','광고 팁 감사합니다!','오늘','다음 하트까지','감사합니다!','확인','새 후원자 하트!','무료 · 코인 없음 · 하루 최대 10회'],
zh:['📺 看广告打赏（免费）','感谢观看！每个广告都能帮我持续更新游戏。— Kirk','广告打赏在 Google Play 应用中开放','今日次数已满 · 明天再来','看完整个视频才能打赏','感谢你的广告打赏！','今天','距离下一颗心','谢谢！','好的','新的支持者之心！','免费 · 不给金币 · 每天最多 10 次']};
function merge(){for(const l in TR){const D=window['FGF_'+(l==='tr'?'TRK':l.toUpperCase())];if(D&&!D.__tip){EN.forEach((k,i)=>D[k]=TR[l][i]);if(TR2[l])EN2.forEach((k,i)=>D[k]=TR2[l][i]);try{Object.defineProperty(D,'__tip',{value:1})}catch(e){}}}}
merge();setTimeout(merge,3000);
// ---- drawing ----
function thanks(){const cw=Math.min(W*0.88,360),cx=(W-cw)/2;ctx.font='14px system-ui';const tl=wrapP(T_(KIRK_AD),(cw-44)*11/14);const ch=150+tl.length*19+(adNewH?24:0),cy=Math.max(8,(H-ch)/2);
 BTN.length=0;ctx.fillStyle='rgba(3,8,16,0.82)';ctx.fillRect(0,0,W,H);panel(cx,cy,cw,ch);let y=cy+38;ctx.textAlign='center';
 ctx.fillStyle='#ffd98a';ctx.font='900 22px system-ui';ctx.fillText('💛 '+T_('THANK YOU!'),W/2,y);y+=28;ctx.fillStyle='#e8eef5';ctx.font='14px system-ui';tl.forEach(l=>{ctx.fillText(l,W/2,y);y+=19});
 if(adNewH){ctx.fillStyle=GOLD;ctx.font='900 14px system-ui';ctx.fillText('💛 '+T_('New Supporter heart!'),W/2,y+4);y+=24}
 ctx.fillStyle='#9fb3c8';ctx.font='11px system-ui';ctx.fillText(adLine(),W/2,y+6,cw-24);y+=18;
 bx(W/2-70,y+8,140,38,'OK',()=>{TJ=1;adNewH=false},true,15)}
function overlay(){if(TJ===3)return thanks();const cw=Math.min(W*0.92,380),cx=(W-cw)/2,isPick=TJ===2;
 ctx.font='13px system-ui';const tl=wrapP(KIRK,(cw-40)*11/13),sub=wrapP('Each tip adds a gold heart by your name',cw-36);
 const rows=isPick?Math.ceil(TIERS.length/2):1,ch=86+tl.length*17+sub.length*15+(isPick?28+rows*44:52+44+62)+(badge()?22:0)+58,cy=Math.max(8,(H-ch)/2);
 BTN.length=0;ctx.fillStyle='rgba(3,8,16,0.82)';ctx.fillRect(0,0,W,H);panel(cx,cy,cw,ch);
 let y=cy+36;ctx.textAlign='center';ctx.fillStyle='#ffd98a';ctx.font='900 20px system-ui';ctx.fillText(isPick?'💛 CUSTOM TIP':'💛 TIP JAR',W/2,y);y+=26;
 ctx.fillStyle='#e8eef5';ctx.font='13px system-ui';tl.forEach(l=>{ctx.fillText(l,W/2,y);y+=17});y+=4;
 ctx.fillStyle='#9fb3c8';ctx.font='11px system-ui';sub.forEach(l=>{ctx.fillText(l,W/2,y);y+=15});
 if(badge()){ctx.fillStyle=GOLD;ctx.font='900 13px system-ui';ctx.fillText(badge(),W/2,y+6);y+=22}
 y+=10;const g=10;
 if(!isPick){const bw=(cw-36-2*g)/3;QUICK.forEach((id,i)=>{const t=T(id);bx(cx+18+i*(bw+g),y,bw,40,t[1],()=>buyPack({id:t[0],price:t[1],name:'Tip'}),false,15)});y+=52;
  bx(cx+18,y,cw-36,36,'CUSTOM TIP ▸',()=>{TJ=2},false,13);y+=44;
  const full=adDay().n>=ADCAP;bx(cx+18,y,cw-36,38,'📺 WATCH AN AD TO TIP (free)',adTip,!full,cw<320?11.5:13);const lb=BTN[BTN.length-1];if(lb)lb.l='📺 WATCH AN AD TO TIP (free)';
  ctx.fillStyle='#9fb3c8';ctx.font='10.5px system-ui';ctx.textAlign='center';ctx.fillText(full?T_('Daily ad tip limit reached · come back tomorrow'):adLine(),W/2,y+52,cw-30);y+=62}
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
