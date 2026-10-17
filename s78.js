// s78 (Oct 17, Kirk bug): Settings buttons keep their real label and selected state.
// Cause of the blank bar under LEFTY in Pause > Settings: s74 wraps long labels (e.g. "🦶 KICK METHOD · CONTROLS")
// by drawing a blank-labelled button and painting 2 lines on top, so the button was recorded with label " ".
// Here every bx() button records its original label and whether it is selected (on), after any wrapping.
(function(){const o=bx;bx=function(x,y,w,h,label,cb,on){const n=BTN.length;const r=o.apply(this,arguments);try{if(BTN.length>n){const b=BTN[BTN.length-1];if(typeof label==='string'&&label.trim())b.l=label;b.on=!!on}}catch(e){}return r}})();
