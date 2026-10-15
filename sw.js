// Field Goal Frenzy service worker: NETWORK-FIRST so new deploys (and ?v= cache-busting) always arrive;
// the cache is only an offline fallback. Bump CACHE when changing this file.
const CACHE='fgf-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))))});
// Push scaffolding (Batch 9): handlers only. Nothing subscribes unless FGF_PUSH.enabled is turned on with a real VAPID key + server.
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(err){}e.waitUntil(self.registration.showNotification(d.title||'Field Goal Frenzy',{body:d.body||'Your daily spin is ready!',icon:'icon-192.png',badge:'icon-192.png',data:d.url||'./'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow(e.notification.data||'./'))});
