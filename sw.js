'use strict';
importScripts('./offline-assets.js');
const assets=self.OFFLINE_ASSETS,base=new URL('./',self.location.href),PREFIX='study-offline-'+encodeURIComponent(base.pathname)+'-',CORE=PREFIX+'core-'+assets.version;
const url=p=>new URL(p,base).href,packName=g=>PREFIX+'pack-'+g.id+'-'+g.hash,marker=g=>url('__offline_pack_ready__/'+g.id);
const coreUrls=[...assets.core.map(url),url('offline-assets.js')],known=new Set([...coreUrls,...assets.groups.flatMap(g=>g.files.map(url))]);
let busy=null;
self.addEventListener('install',event=>event.waitUntil((async()=>{try{const cache=await caches.open(CORE);await cache.addAll(coreUrls.map(u=>new Request(u,{cache:'reload'})));for(const u of coreUrls){if((await cache.match(u))?.status!==200)throw Error('Tệp tải về không đầy đủ.');}}catch(error){await caches.delete(CORE);throw error;}})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keep=new Set([CORE,...assets.groups.map(packName)]);for(const key of await caches.keys())if((key.startsWith(PREFIX+'core-')||key.startsWith(PREFIX+'pack-'))&&!keep.has(key))await caches.delete(key);await self.clients.claim();})()));
async function cached(key){let response=await (await caches.open(CORE)).match(key);if(response)return response;for(const g of assets.groups){if(!g.files.some(f=>url(f)===key))continue;response=await (await caches.open(packName(g))).match(key);if(response)return response;}return null;}
async function rangeResponse(request,response){const header=request.headers.get('range');if(!header)return response;const match=header.match(/^bytes=(\d*)-(\d*)$/);if(!match)return response;const data=await response.arrayBuffer(),length=data.byteLength;let start=match[1]?Number(match[1]):Math.max(0,length-Number(match[2])),end=match[1]&&match[2]?Math.min(length-1,Number(match[2])):length-1;if(start>=length||start>end)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+length}});return new Response(data.slice(start,end+1),{status:206,headers:{'Content-Type':response.headers.get('content-type')||'application/pdf','Content-Range':`bytes ${start}-${end}/${length}`,'Accept-Ranges':'bytes','Content-Length':String(end-start+1)}});}
self.addEventListener('fetch',event=>{
 const request=event.request,u=new URL(request.url);if(request.method!=='GET'||u.origin!==base.origin||!u.pathname.startsWith(base.pathname))return;
 const key=url(u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname);
 if(!known.has(key)&&request.mode!=='navigate')return;
 event.respondWith((async()=>{const hit=await cached(key);if(hit)return rangeResponse(request,hit);try{return await fetch(request);}catch(_){if(request.mode==='navigate'&&key!==url('offline.html')&&await (await caches.open(CORE)).match(url('offline.html')))return Response.redirect(url('offline.html'),302);return new Response('Nội dung chưa được tải offline.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}})());
});
self.addEventListener('message',event=>{
 const message=event.data||{},port=event.ports[0];if(!port)return;
 const reply=data=>port.postMessage(data);
 event.waitUntil((async()=>{
  try{
   if(message.type==='STATUS'){const names=await caches.keys(),groups=[];for(const g of assets.groups){const cache=names.includes(packName(g))?await caches.open(packName(g)):null;groups.push({id:g.id,ready:!!(cache&&await cache.match(marker(g))),cached:cache?(await cache.keys()).filter(r=>r.url!==marker(g)).length:0});}reply({done:true,version:assets.version,coreReady:names.includes(CORE),groups});return;}
   if(message.type==='ACTIVATE'){reply({done:true});await self.skipWaiting();return;}
   if(message.type==='CANCEL'){if(busy)busy.cancelled=true;reply({done:true});return;}
   const group=assets.groups.find(g=>g.id===message.id);if(!group)throw Error('Gói nội dung không hợp lệ.');
   if(busy)throw Error('Một gói khác đang tải. Hãy đợi hoặc dừng lượt tải hiện tại.');
   if(message.type==='REMOVE'){await caches.delete(packName(group));reply({done:true});return;}
   if(message.type!=='DOWNLOAD')throw Error('Yêu cầu không hợp lệ.');
   const job={id:group.id,cancelled:false};busy=job;
   try{
    const cache=await caches.open(packName(group));let completed=0;
    for(const [index,file] of group.files.entries()){if(job.cancelled)throw Error('Đã dừng tải. Bạn có thể tiếp tục sau.');const key=url(file);if(!await cache.match(key)){const r=await fetch(new Request(key,{cache:'reload'}));if(r.status!==200)throw Error('Tải chưa hoàn tất. Kiểm tra kết nối rồi thử tiếp.');if((await r.clone().arrayBuffer()).byteLength!==group.sizes[index])throw Error('Tệp tải về chưa đầy đủ. Hãy kiểm tra kết nối rồi thử tiếp.');await cache.put(key,r);}completed++;reply({progress:true,completed,total:group.files.length,id:group.id});}
    if(job.cancelled)throw Error('Đã dừng tải.');await cache.put(marker(group),new Response('complete'));reply({done:true,id:group.id});
   }finally{busy=null;}
  }catch(error){reply({done:true,error:error.name==='QuotaExceededError'?'Thiết bị không đủ dung lượng. Xóa một gói offline rồi thử tiếp.':error.message});}
 })());
});
