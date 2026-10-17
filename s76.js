// s76 (Oct 17, Kirk bug): one clean backdrop during kicks.
// Cause: on big kicks the camera pans the whole scene down (camK, up to 12% of the screen) to follow the ball.
// Full-width overlays drawn from y=0 inside that pan (stadium themes like Snow Bowl, weather washes, thunder flash)
// started below the top of the screen, so a strip behind the SCORE/COINS bar showed the backdrop without the
// overlay (looked like a second backdrop); at some distances the backdrop image itself did not reach the top.
(function(){
const P2=CanvasRenderingContext2D.prototype,oFR=P2.fillRect;let SCN=0;
// 1) inside the scene, full-width overlays anchored at the top extend above it, so a camera pan never uncovers a strip
P2.fillRect=function(x,y,w,h){if(SCN&&this.canvas&&this.canvas.id==='c'&&y<=0.5&&x<=0.5&&w>=W-1){const e=Math.ceil(H*0.25);return oFR.call(this,x,y-e,w,h+e)}return oFR.apply(this,arguments)};
const wrap=f=>function(){SCN++;try{return f.apply(this,arguments)}finally{SCN--}};
drawBG=wrap(drawBG);drawWeather=wrap(drawWeather);S3.amb=wrap(S3.amb);
// 2) start every frame from an opaque base, so nothing from a previous frame can show through
const oCam=S3.cam;S3.cam=function(){try{if(state==='play'||state==='pass'||state==='replay'){ctx.fillStyle='#0b1424';oFR.call(ctx,0,0,W,H)}}catch(e){}return oCam.apply(this,arguments)};
// 3) if the pan would show above the stadium image, continue the image upward with a mirrored sky strip
const oBg=S3.bg;S3.bg=function(){const r=oBg.apply(this,arguments);try{if(r&&typeof BGT==='object'&&BGT){const pan=(camK||0)*Math.min(H*0.12,Math.max(0,ball.y)*H*0.012)+(shake||0)+4,gap=BGT.dy+pan;
 if(gap>0){const im=S5.bgFor(stadT()).im;if(im&&im.complete){const sc=BGT.sc,rows=Math.min(1080,gap/sc+2);ctx.save();ctx.translate(0,BGT.dy);ctx.scale(1,-1);ctx.drawImage(im,0,0,960,rows,BGT.dx,0,960*sc,rows*sc);ctx.restore()}}}}catch(e){}return r};
})();
