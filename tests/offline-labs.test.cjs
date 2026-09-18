const {test,before,after,beforeEach}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),sandbox={window:{},self:{}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root,'physics/js/sim-models.js'),'utf8'),sandbox);
vm.runInContext(fs.readFileSync(path.join(root,'offline-assets.js'),'utf8'),sandbox);
const M=sandbox.window.LabModels,catalog=JSON.parse(JSON.stringify(sandbox.self.OFFLINE_ASSETS));
const cachePrefix='study-offline-'+encodeURIComponent('/gdqpan-quiz-v2/')+'-';
const near=(actual,expected,tolerance=1e-10)=>assert.ok(Math.abs(actual-expected)<=Math.max(1e-30,Math.abs(expected)*tolerance),actual+' != '+expected);

test('SI models satisfy Coulomb, Lorentz, Faraday and circuit equations',()=>{
 near(M.electric(2,false).E,18/3.2**2);assert.equal(M.electric(2,true).E,0);
 const b=M.magnetic(2,.5,.7);near(b.Bwire,5e-6);near(b.radius,2.3);
 near(b.mass*b.vPerp*b.vPerp/b.radius,b.force);near(b.period*b.vPerp,2*Math.PI*b.radius);
 assert.equal(M.magnetic(-2,.5,.7).Bwire,b.Bwire);
 const x=.25,v=.08,dt=1e-5,a=M.induction(x,v);
 near(a.emf,-(M.induction(x+v*dt,0).phi-M.induction(x-v*dt,0).phi)/(2*dt),1e-8);
 near(a.current,a.emf/10);near(M.induction(x,0).emf,0);
 near(M.induction(x,-v).emf,-a.emf);
 const angle=.7,omega=1.4,g=M.generator(angle,omega);
 near(g.emf,-(M.generator(angle+omega*dt,omega).linkage-M.generator(angle-omega*dt,omega).linkage)/(2*dt),1e-8);
 const r=M.rlc(1,.4);near(r.I0,2.5);
 assert.ok(M.rlc(.6,0).I0<r.I0&&M.rlc(1.6,0).I0<r.I0);
 near(r.i,(M.rlc(1,.4+dt).u-M.rlc(1,.4-dt).u)/(2*dt),1e-8);
});
test('wave, Young and quantum readouts use SI and respect emission threshold',()=>{
 const w=M.wave(1.1,.7);near(w.E/w.B,299792458);near(w.omega*w.lambda,2*Math.PI*299792458);
 near(w.physicalTime,3.2*.7/299792458);
 near(M.young(.4,600).spacing,.0018);near(M.young(.8,600).spacing,.0009);
 const q=M.quantum(600,5000);near(q.K,6.62607015e-34*600e12-2.28*1.602176634e-19);
 near(.5*9.1093837139e-31*q.speed**2,q.K);near(q.wien,580e-9);
 assert.equal(M.quantum(400,5000).emits,false);assert.equal(M.quantum(400,5000).speed,0);
});
test('install manifest and cache catalog contain every local dependency and real PNG icons',()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
 assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./physics/index.html');assert.equal(manifest.display,'standalone');
 for(const icon of manifest.icons){const data=fs.readFileSync(path.join(root,icon.src)),size=Number(icon.sizes.split('x')[0]);assert.equal(data.readUInt32BE(16),size);assert.equal(data.readUInt32BE(20),size);}
 const css=fs.readFileSync(path.join(root,'vendor/katex/katex.min.css'),'utf8');
 for(const [,font]of css.matchAll(/url\(([^)]+)\)/g))assert.ok(catalog.core.includes('vendor/katex/'+font.replace(/['"]/g,'')),font);
 for(const file of [...catalog.core,...catalog.groups.flatMap(g=>g.files)]){assert.ok(!file.startsWith('/')&&!file.includes('://'));assert.ok(fs.existsSync(path.join(root,file)),file);}
 assert.equal(catalog.groups.length,8);assert.ok(catalog.core.includes('vendor/three/LICENSE'));
 assert.ok(catalog.core.includes('vendor/katex/LICENSE'));
 assert.doesNotMatch(fs.readFileSync(path.join(root,'physics/index.html'),'utf8'),/src="https:|href="https:.*\.css/);
});

let browser,server,base,origin,revision=0,failFile='',slowFile='',networkDown=false,hits=[];
before(async()=>{
 server=http.createServer((req,res)=>{
  if(networkDown){req.socket.destroy();return;}
  const pathname=decodeURIComponent(req.url.split('?')[0]);hits.push(pathname);
  if(!pathname.startsWith('/gdqpan-quiz-v2/'))return res.writeHead(404).end('outside app');
  let rel=pathname.slice('/gdqpan-quiz-v2/'.length);if(!rel||rel.endsWith('/'))rel+='index.html';
  const file=path.resolve(root,rel);
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  const send=()=>fs.readFile(file,(err,bytes)=>{
   if(err)return res.writeHead(404).end();
   if(rel===failFile)return res.writeHead(503).end('simulated interruption');
   if(revision&&rel==='sw.js')bytes=Buffer.from(bytes.toString()+'\n// Test update '+revision);
   if(revision&&rel==='offline-assets.js')bytes=Buffer.from(bytes.toString().replace(catalog.version,catalog.version+'-test'+revision));
   res.setHeader('Content-Type',({'.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css','.webmanifest':'application/manifest+json','.pdf':'application/pdf','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');
   res.setHeader('Cache-Control','no-store');res.end(bytes);
  });
  if(rel===slowFile)setTimeout(send,200);else send();
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));origin='http://127.0.0.1:'+server.address().port;base=origin+'/gdqpan-quiz-v2/';
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{}),args:['--enable-unsafe-swiftshader','--no-proxy-server']});
});
beforeEach(()=>{revision=0;failFile='';slowFile='';networkDown=false;hits=[];});
after(async()=>{await browser?.close();if(server)await new Promise(r=>server.close(r));});
async function page(t,route='offline.html',options={}){
 const p=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce',...options}),errors=[];
 p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(60000);p.on('pageerror',e=>errors.push(e.message));
 t.after(async()=>{await p.close();assert.deepEqual(errors,[]);});
 await p.goto(base+route);
 return p;
}
async function ready(p){
 try{await p.waitForFunction(async()=>{const r=await navigator.serviceWorker.getRegistration();return r?.active?.state==='activated'&&!!navigator.serviceWorker.controller;},{},{timeout:30000});}
 catch(error){throw Error('Offline registration: '+await p.locator('#offlineStatus').textContent()+'; '+error.message);}
}
async function rpc(p,message,waiting=false){
 return p.evaluate(async({message,waiting})=>{
  const reg=await navigator.serviceWorker.ready,worker=waiting?reg.waiting:reg.active;
  return new Promise((resolve,reject)=>{const ch=new MessageChannel(),timer=setTimeout(()=>reject(Error('RPC timeout')),60000);
   ch.port1.onmessage=e=>{if(e.data.done){clearTimeout(timer);ch.port1.close();resolve(e.data);}};worker.postMessage(message,[ch.port2]);});
 },{message,waiting});
}
async function setRange(p,index,value){
 await p.locator('input[type=range]').nth(index).evaluate((el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));},String(value));
}
test('all six labs pause, step exactly, reset every parameter, graph and dispose across mobile routes',async t=>{
 const p=await page(t,'physics/index.html#ch01/lab',{serviceWorkers:'block'});
 for(let chapter=1;chapter<=6;chapter++){
  await p.goto(base+'physics/index.html#ch0'+chapter+'/lab');
  await p.locator('.lab-console[data-paused=true]').waitFor();
  assert.ok(await p.locator('[data-measure]').count()>=3);
  assert.ok((await p.locator('#labExplanation').innerText()).length>80);
  const initial=await p.locator('input[type=range]').evaluateAll(nodes=>nodes.map(n=>n.value));
  const before=await p.locator('#labClock').getAttribute('data-time');
  await p.waitForTimeout(90);assert.equal(await p.locator('#labClock').getAttribute('data-time'),before);
  await p.locator('[data-lab-step]').click();near(Number(await p.locator('#labClock').getAttribute('data-time')),Number(before)+.05);
  assert.match(await p.locator('#labChartCaption').innerText(),/2 mẫu/);
  const slider=p.locator('input[type=range]').first(),max=await slider.getAttribute('max'),min=await slider.getAttribute('min');
  await setRange(p,0,max===initial[0]?min:max);
  assert.equal(Number(await p.locator('#labClock').getAttribute('data-time')),0);
  assert.match(await p.locator('#labExplanation').innerText(),/ — /);
  await p.locator('[data-lab-step]').click();await p.locator('[data-lab-reset]').click();
  assert.deepEqual(await p.locator('input[type=range]').evaluateAll(nodes=>nodes.map(n=>n.value)),initial);
  assert.equal(Number(await p.locator('#labClock').getAttribute('data-time')),0);
  assert.ok(await p.locator('[data-measure]').evaluateAll(nodes=>nodes.every(n=>Number.isFinite(Number(n.dataset.value)))));
  for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'lab '+chapter+' at '+width);}
  await p.locator('[data-lab-toggle]').click();await p.waitForFunction(()=>Number(document.getElementById('labClock').dataset.time)>.07);
  await p.locator('[data-lab-toggle]').click();const stopped=await p.locator('#labClock').getAttribute('data-time');
  await p.waitForTimeout(90);assert.equal(await p.locator('#labClock').getAttribute('data-time'),stopped);
  await p.goto(base+'physics/index.html#ch0'+chapter+'/theory');
  assert.equal(await p.evaluate(()=>LabSession.active),null);assert.equal(await p.locator('#labHistory').count(),0);
 }
});
test('parameter changes update physical values while paused; lack of WebGL still permits 2D and stepping',async t=>{
 const p=await page(t,'physics/index.html#ch01/theory',{serviceWorkers:'block'});
 await p.evaluate(()=>{THREE.WebGLRenderer=function(){throw Error('WebGL unavailable');};});
 await p.goto(base+'physics/index.html#ch01/lab');assert.match(await p.locator('#box3d').innerText(),/WebGL/);
 await setRange(p,1,0);assert.ok(Number(await p.locator('[data-measure=E]').getAttribute('data-value'))>0);
 await p.locator('[data-lab-step]').click();near(Number(await p.locator('#labClock').getAttribute('data-time')),.05);
 await p.goto(base+'physics/index.html#ch03/lab');await setRange(p,0,.04);
 assert.ok(Number(await p.locator('[data-measure=emf]').getAttribute('data-value'))<0);
 await setRange(p,0,-.04);assert.ok(Number(await p.locator('[data-measure=emf]').getAttribute('data-value'))>0);
 await p.goto(base+'physics/index.html#ch05/lab');
 const before=Number(await p.locator('[data-measure=spacing]').getAttribute('data-value'));
 await setRange(p,0,.8);const after=Number(await p.locator('[data-measure=spacing]').getAttribute('data-value'));assert.notEqual(after,before);
 await p.goto(base+'physics/index.html#ch06/lab');await setRange(p,0,400);
 assert.match(await p.locator('#labExplanation').innerText(),/chưa|không/i);
});
test('core caches under GitHub Pages subpath; math, six labs, quizzes and progress reload without network',async t=>{
 const p=await page(t);await ready(p);
 const state=await rpc(p,{type:'STATUS'});assert.equal(state.coreReady,true);
 const cacheURLs=await p.evaluate(async prefix=>{const keys=await caches.keys(),cache=await caches.open(keys.find(k=>k.startsWith(prefix+'core-')));return (await cache.keys()).map(r=>r.url);},cachePrefix);
 assert.equal(cacheURLs.length,catalog.core.length+1);assert.ok(cacheURLs.every(u=>u.startsWith(base)));
 networkDown=true;await p.context().setOffline(true);
 for(let ch=1;ch<=6;ch++){await p.goto(base+'physics/index.html#ch0'+ch+'/lab');await p.reload();await p.locator('.lab-console').waitFor();assert.ok(await p.locator('.katex').count()>0);await p.locator('[data-lab-step]').click();}
 await p.goto(base+'physics/index.html#ch01/quiz');
 const key=await p.evaluate(()=>VLDC_CHAPTERS[0].mcq[0].answer);
 await p.locator('#mcq-0 [data-l="'+key+'"]').click();await p.locator('[data-check-q="0"]').click();assert.equal(await p.locator('#mcq-0 .result.ok').count(),1);
 await p.reload();assert.equal(await p.locator('#mcq-0 .result.ok').count(),1);
 await p.goto(base+'physics/index.html#ch01/progress');assert.match(await p.locator('.study-stats').innerText(),/1\/394/);
 await p.goto(base);assert.match(await p.title(),/GDQP/i);
 await p.goto(base+'not-cached-page.html');assert.match(await p.locator('h1').innerText(),/mất mạng/);
 const unavailable=await p.evaluate(async file=>(await fetch(file)).status,catalog.groups[0].files[0]);assert.equal(unavailable,503);
});
test('chapter download resumes after failure, reports readiness only when complete, and deletion preserves results',async t=>{
 const p=await page(t);await ready(p);const group=catalog.groups[0];
 failFile=group.files[3];let result=await rpc(p,{type:'DOWNLOAD',id:group.id});assert.ok(result.error);
 let s=(await rpc(p,{type:'STATUS'})).groups.find(g=>g.id===group.id);assert.equal(s.ready,false);assert.equal(s.cached,3);
 failFile='';hits=[];await p.reload();
 await p.locator('[data-download=ch01]').click();
 await p.locator('[data-group=ch01] .offline-ready').waitFor({timeout:30000});
 assert.ok(!hits.includes('/gdqpan-quiz-v2/'+group.files[0]),'resume must reuse the cached prefix');
 s=(await rpc(p,{type:'STATUS'})).groups.find(g=>g.id===group.id);assert.equal(s.ready,true);assert.equal(s.cached,group.files.length);
 networkDown=true;await p.context().setOffline(true);
 assert.equal(await p.evaluate(async files=>{for(const f of files)if(!(await fetch(f)).ok)return false;return true;},group.files),true);
 await p.goto(base+'physics/index.html#ch01/source');
 const img=p.locator('.source-original').first();await img.waitFor();await p.waitForFunction(()=>document.querySelector('.source-original').naturalWidth>0);
 const answer=await p.evaluate(()=>SourceSolutions.records['source-ch01-001'].key);
 await p.locator('[data-answer="choice"][value="'+answer+'"]').check();await p.locator('[data-study-check]').click();
 await p.locator('#sourceNote').fill('Ghi chú vẫn còn khi xóa tài liệu.');
 await p.goto(base+'offline.html');const stored=await p.evaluate(()=>localStorage.getItem('vldc-study-v1'));
 await p.locator('[data-remove=ch01]').click();
 await p.waitForFunction(()=>document.querySelector('[data-group=ch01]').innerText.includes('Chưa tải'));
 assert.equal(await p.evaluate(()=>localStorage.getItem('vldc-study-v1')),stored);
 assert.match(await p.evaluate(()=>localStorage.getItem('vldc-source-practice-v1')),/Ghi chú vẫn còn/);
});
test('cancel leaves a resumable partial pack and rejects unrelated download targets',async t=>{
 const p=await page(t);await ready(p);slowFile=catalog.groups[1].files[1];
 await p.locator('[data-download=ch02]').click();await p.locator('#downloadPanel').waitFor();
 await p.waitForFunction(()=>document.getElementById('downloadProgress').value>0);
 await p.locator('#cancelDownload').click();await p.waitForFunction(()=>/dừng/i.test(document.getElementById('downloadStatus').textContent));
 const s=(await rpc(p,{type:'STATUS'})).groups.find(g=>g.id==='ch02');assert.equal(s.ready,false);assert.ok(s.cached>0);
 assert.ok((await rpc(p,{type:'DOWNLOAD',id:'https://example.com'})).error);
});
test('full PDF pack serves byte ranges offline for browser PDF readers',async t=>{
 const p=await page(t);await ready(p);
 assert.ok(!(await rpc(p,{type:'DOWNLOAD',id:'exercises'})).error);
 const file=catalog.groups.find(g=>g.id==='exercises').files.find(f=>f.endsWith('.pdf')),bytes=fs.readFileSync(path.join(root,file));
 networkDown=true;await p.context().setOffline(true);
 const responses=await p.evaluate(async file=>{const rows=[];for(const range of ['bytes=0-31','bytes=-16','bytes=100-','bytes=999999999-']){const r=await fetch(file,{headers:{Range:range}});rows.push({status:r.status,range:r.headers.get('Content-Range'),data:Array.from(new Uint8Array(await r.arrayBuffer())).slice(0,32)});}return rows;},file);
 assert.equal(responses[0].status,206);assert.deepEqual(responses[0].data,[...bytes.subarray(0,32)]);
 assert.deepEqual(responses[1].data,[...bytes.subarray(-16)]);assert.deepEqual(responses[2].data,[...bytes.subarray(100,132)]);assert.equal(responses[3].status,416);
});
test('new version waits for explicit activation and retains downloaded packs and local results',async t=>{
 const p=await page(t);await ready(p);await rpc(p,{type:'DOWNLOAD',id:'ch06'});
 const otherCaches=['unrelated-app','study-offline-core-'+catalog.version,'study-offline-pack-ch06-old','study-offline-'+encodeURIComponent('/another-quiz/')+'-core-old'];
 await p.evaluate(async names=>{localStorage.setItem('update-test','retained');for(const name of names){const cache=await caches.open(name);await cache.put('/other-site-sentinel',new Response('retained'));}},otherCaches);
 revision=1;await p.locator('#checkUpdate').click();await p.locator('#applyUpdate').waitFor({state:'visible',timeout:30000});
 assert.equal((await rpc(p,{type:'STATUS'})).version,catalog.version);
 await Promise.all([p.waitForEvent('load'),p.locator('#applyUpdate').click()]);
 await ready(p);const state=await rpc(p,{type:'STATUS'});assert.equal(state.version,catalog.version+'-test1');assert.equal(state.groups.find(g=>g.id==='ch06').ready,true);
 const keys=await p.evaluate(()=>caches.keys());assert.ok(!keys.includes(cachePrefix+'core-'+catalog.version));assert.ok(keys.includes(cachePrefix+'core-'+catalog.version+'-test1'));
 for(const name of otherCaches){assert.ok(keys.includes(name));assert.equal(await p.evaluate(async name=>(await (await caches.open(name)).match('/other-site-sentinel')).text(),name),'retained');}
 assert.equal(await p.evaluate(()=>localStorage.getItem('update-test')),'retained');
});
test('offline manager fits small screens and an interrupted core installation is never reported ready',async t=>{
 const p=await page(t);await ready(p);
 for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'offline '+width);}
 failFile='vendor/three/three.min.js';
 const other=await page(t);
 await other.waitForFunction(()=>/chưa tải đủ|không bật được/i.test(document.getElementById('offlineStatus').textContent));
 assert.equal(await other.evaluate(()=>navigator.serviceWorker.controller),null);
 assert.ok(!(await other.evaluate(()=>caches.keys())).some(k=>k.startsWith(cachePrefix+'core-')));
});
