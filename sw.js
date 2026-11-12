const V='rudi-games-v1';
const FILES=["./", "index.html", "sw.js", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "spy.html", "insider.html", "codenames.html", "who-am-i.html", "fake-artist.html", "taboo.html", "spy.webmanifest", "insider.webmanifest", "codenames.webmanifest", "who-am-i.webmanifest", "fake-artist.webmanifest", "taboo.webmanifest"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!/^https?:/.test(r.url))return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()));
return hit||net}))});
