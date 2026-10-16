// s73 (store readiness, Oct 16): safety net so no canvas text runs off the screen (any language, 320–430 wide):
// text with no max width that would cross the screen edge is squeezed to fit. Moving banners (start off-screen) are left alone.
(function(){const P=CanvasRenderingContext2D.prototype,of=P.fillText,os=P.strokeText;
function fit(c,t,x,y,mw){try{if(c.canvas&&c.canvas.id==='c'&&typeof t==='string'&&t.length>3){const tr=c.getTransform();if(Math.abs(tr.b)>1e-6||tr.a<=0)return mw;const d=window.devicePixelRatio>0?tr.a/(tr.a/(typeof DPR==='number'&&DPR?DPR:1)):1,k=tr.a/(typeof DPR==='number'&&DPR?DPR:1),sx=tr.e/(typeof DPR==='number'&&DPR?DPR:1),X=sx+x*k,tt=window.FGF_TR?FGF_TR(t):t,w=c.measureText(tt).width*k,al=c.textAlign,cw=innerWidth,m=8;
 let l=al==='center'?X-w/2:(al==='right'||al==='end')?X-w:X;if(l<-40||l>cw)return mw;/* moving banner or deliberately off-screen */
 let room;if(al==='center')room=2*Math.min(X-m,cw-m-X);else if(al==='right'||al==='end')room=X-m;else room=cw-m-X;room/=k;if(room>20&&c.measureText(tt).width>room)return mw?Math.min(mw,room):room}}catch(e){}return mw}
P.fillText=function(t,x,y,mw){const f=fit(this,t,x,y,mw);return f==null?of.call(this,t,x,y):of.call(this,t,x,y,f)};
P.strokeText=function(t,x,y,mw){const f=fit(this,t,x,y,mw);return f==null?os.call(this,t,x,y):os.call(this,t,x,y,f)};
// Spanish: a few titles that were still English
try{Object.assign(window.FGF_ES=window.FGF_ES||{},{'DAILY GOALS':'METAS DIARIAS','CREATE A MASCOT':'CREA UNA MASCOTA','🦶 KICK METHOD · CONTROLS':'🦶 MÉTODO · CONTROLES','KICK METHOD · CONTROLS':'MÉTODO · CONTROLES','🎈 Make a kick now: +50':'🎈 Acierta ahora: +50','🎃 PUMPKIN BALL · smash it through for coins':'🎃 BALÓN CALABAZA · mételo para ganar monedas'})}catch(e){}
})();
