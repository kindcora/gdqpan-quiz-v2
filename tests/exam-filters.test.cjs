const {test,before,after,beforeEach}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm');
const {chromium}=require('playwright'),root=path.resolve(__dirname,'..');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'js/exam-tools.js'),'utf8'),ctx);
const U=ctx.window.ExamTools;
test('search folds Vietnamese accents and balanced sampling is unique, bounded and redistributes exhausted groups',()=>{
 assert.ok(U.matches('Bảo vệ biển đảo Việt Nam','bien dao'));assert.ok(U.matches('Điện trường đều','dien deu'));assert.ok(!U.matches('Điện trường','dien bien'));
 const qs=Array.from({length:30},(_,i)=>({id:i,ch:i%3})),s=U.sample(qs,12,true,q=>q.ch);
 assert.equal(s.length,12);assert.equal(new Set(s.map(q=>q.id)).size,12);for(let n=0;n<3;n++)assert.equal(s.filter(q=>q.ch===n).length,4);
 const uneven=[{id:0,ch:1},...Array.from({length:9},(_,i)=>({id:i+1,ch:2}))];assert.equal(U.sample(uneven,20,true,q=>q.ch).length,10);
 assert.equal(U.summary(['correct','wrong','blank','correct']).score,'5.00');assert.equal(U.summary(['blank']).wrong,0);
});
let browser,server,base,networkDown=false;
before(async()=>{
 server=http.createServer((req,res)=>{
  if(networkDown){req.socket.destroy();return;}
  let file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)&&file!==root)return res.writeHead(403).end();
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  fs.readFile(file,(e,data)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json'})[path.extname(file)]||'application/octet-stream');res.end(data);});
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{}),args:['--no-proxy-server','--enable-unsafe-swiftshader']});
});
beforeEach(()=>{networkDown=false;});
after(async()=>{await browser?.close();if(server)await new Promise(r=>server.close(r));});
async function page(t,url='/',workers=false,width=390){
 const p=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce',serviceWorkers:workers?'allow':'block'}),errors=[];
 p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(60000);p.on('pageerror',e=>errors.push(e.message));
 t.after(async()=>{await p.close();assert.deepEqual(errors,[]);});await p.goto(base+url);return p;
}
const state=(p,key='vldc-exam-v1')=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
async function physics(t){const p=await page(t,'/physics/index.html#ch01/exam');await p.locator('#physicsExamForm').waitFor();return p;}
async function startPhysics(p,count=3,minutes=30){await p.locator('#peCount').fill(String(count));await p.locator('#peMinutes').fill(String(minutes));await p.locator('#peStart').click();await p.locator('#peSubmit').waitFor();}
async function selectAnswer(p,answer){for(const [key,value]of Object.entries(answer)){const input=p.locator('[data-answer="'+key+'"]'+(key==='numeric'?'':'[value="'+value+'"]'));if(key==='numeric')await input.fill(String(value));else await input.check();}}
async function rightAnswer(p,index=0){
 const answer=await p.evaluate(index=>{const it=JSON.parse(localStorage.getItem('vldc-exam-v1')).items[index],q=StudyStore.catalog[it.id],key=q.source?SourceSolutions.records[q.id].key:q.answer;
  return q.kind==='mcq'?{choice:key}:q.kind==='short'?{numeric:String(key.value)}:Object.fromEntries([...'abcd'].map((k,i)=>[k,key[i]==='T'?'true':'false']));
 },index);await selectAnswer(p,answer);return answer;
}
test('GDQP search, lesson counts, no-match reset and settings persist without replacing an active exam',async t=>{
 const p=await page(t);await p.locator('#keywordFilter').fill('bien dao');
 const expected=await p.evaluate(()=>GDQPAN_BANK.questions.filter(q=>q.id!=='hp1-194'&&ExamTools.matches(q.originalIndex+' '+q.lesson+' '+q.stem+' '+Object.values(q.choices).join(' '),'bien dao')).length);
 assert.match(await p.locator('#filterCount').innerText(),new RegExp('^'+expected+' câu'));assert.ok(expected>0);
 await p.reload();assert.equal(await p.locator('#keywordFilter').inputValue(),'bien dao');
 await p.locator('#openExamSetup').click();await p.locator('#examCount').fill('3');await p.locator('#startConfiguredExam').click();
 const before=await state(p,'gdqpan-session-v2');assert.equal(before.items.length,Math.min(3,expected));
 await p.locator('#keywordFilter').fill('zzzzzzzz');assert.match(await p.locator('#filterCount').innerText(),/^0 câu/);
 assert.deepEqual((await state(p,'gdqpan-session-v2')).items,before.items);
 await p.reload();assert.equal(await p.locator('#keywordFilter').inputValue(),'zzzzzzzz');
 assert.equal((await state(p,'gdqpan-session-v2')).endsAt,before.endsAt);
 await p.locator('#clearFilters').click();assert.match(await p.locator('#filterCount').innerText(),/^419 câu/);
 assert.ok((await p.locator('#lessonFilter option').allTextContents()).slice(1).every(s=>/\(\d+ câu\)$/.test(s)));
});
test('GDQP flags and question views survive reload; result filters and long-term latest status are consistent',async t=>{
 const p=await page(t);await p.locator('#openExamSetup').click();await p.locator('#examCount').fill('3');await p.locator('#startConfiguredExam').click();
 let s=await state(p,'gdqpan-session-v2');const correct=s.items[0].shuffled.toDisplay[s.items[0].q.answer],wrong=[...'ABCD'].find(l=>l!==s.items[1].shuffled.toDisplay[s.items[1].q.answer]);
 await p.locator('label:has(input[name=ex0][value='+correct+'])').click();await p.locator('label:has(input[name=ex1][value='+wrong+'])').click();
 await p.locator('[data-exam-flag="2"]').click();await p.selectOption('#examView','flagged');assert.equal(await p.locator('.exam-q:visible').count(),1);
 await p.reload();assert.equal(await p.locator('.exam-q:visible').count(),1);assert.equal(await p.locator('[data-exam-flag="2"]').getAttribute('aria-pressed'),'true');
 await p.locator('[data-jump="0"]').click();assert.equal(await p.locator('.exam-q:visible').count(),3);
 p.once('dialog',d=>d.accept());await p.locator('#submitTop').click();assert.match(await p.locator('.exam-metrics').innerText(),/3.33\/10/);
 for(const mode of ['wrong','blank','correct','flagged']){await p.selectOption('#examResultView',mode);assert.equal(await p.locator('.exam-q:visible').count(),1);}
 const progress=await p.evaluate(()=>JSON.parse(localStorage.getItem('gdqpan-progress-v1')));await p.reload();
 assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('gdqpan-progress-v1'))),progress);
 await p.selectOption('#practiceFilter','wrong');assert.match(await p.locator('#filterCount').innerText(),/^1 câu/);
 await p.selectOption('#practiceFilter','correct');assert.match(await p.locator('#filterCount').innerText(),/^1 câu/);
 await p.selectOption('#practiceFilter','skipped');assert.match(await p.locator('#filterCount').innerText(),/^1 câu/);
});
test('physics filters expose 144/228/372 gradeable questions, omit conditional answers and preserve chosen scope',async t=>{
 const p=await physics(t);assert.match(await p.locator('#pePool').innerText(),/^144 câu/);
 await p.selectOption('#peBank','pdf');assert.match(await p.locator('#pePool').innerText(),/^228 câu/);
 await p.selectOption('#peBank','mixed');assert.match(await p.locator('#pePool').innerText(),/^372 câu/);
 assert.equal(await p.locator('#peCount').getAttribute('max'),'372');await p.locator('#peCount').fill('373');assert.equal(await p.locator('#peStart').isDisabled(),true);assert.match(await p.locator('#pePool').innerText(),/1–372/);await p.locator('#peCount').fill('20');
 await p.locator('.exam-filters summary').click();await p.selectOption('#peLevel','VDC');
 assert.ok(await p.evaluate(()=>PhysicsExam.pool().every(q=>!q.source&&q.level==='VDC')));
 await p.locator('#peQuery').fill('zzzzzzzz');assert.equal(await p.locator('#peStart').isDisabled(),true);
 await p.locator('#peResetFilters').click();await p.locator('#peClearChapters').click();assert.equal(await p.locator('#peStart').isDisabled(),true);
 await p.locator('[data-pe-chapter=ch05]').check();await p.locator('[data-pe-chapter=ch06]').check();
 await p.locator('#peCount').fill('12');await p.reload();assert.equal(await p.locator('[data-pe-chapter]:checked').count(),2);
 await p.locator('#peStart').click();const s=await state(p);assert.equal(new Set(s.items.map(it=>it.id)).size,12);
 assert.equal(s.items.filter(it=>it.id.includes('ch05')).length,6);assert.equal(s.items.filter(it=>it.id.includes('ch06')).length,6);
});
test('physics exam keeps answers concealed, preserves time and flags, blocks study-mode answer reveal and records once',async t=>{
 const p=await physics(t);await startPhysics(p);
 const original=await state(p);await rightAnswer(p);await p.locator('#peFlag').click();await p.reload();
 assert.equal((await state(p)).endsAt,original.endsAt);assert.equal(await p.locator('#peFlag').getAttribute('aria-pressed'),'true');
 assert.equal(await p.locator('.study-solution,.exam-result-answer,.result.coach').count(),0);
 await p.locator('[data-tab=quiz]').click();assert.equal(await p.locator('#peSubmit').count(),1);assert.equal(await p.locator('#mcq-0').count(),0);
 await p.locator('[data-pe-jump="1"]').click();
 const wrong=await p.evaluate(()=>{const it=JSON.parse(localStorage.getItem('vldc-exam-v1')).items[1];return [...'ABCD'].find(k=>k!==StudyStore.catalog[it.id].answer);});
 await selectAnswer(p,{choice:wrong});
 p.once('dialog',d=>d.dismiss());await p.locator('#peSubmit').click();assert.equal((await state(p)).status,'active');
 p.once('dialog',d=>d.accept());await p.locator('#peSubmit').click();assert.equal((await state(p)).status,'done');assert.match(await p.locator('.exam-metrics').innerText(),/3.33\/10/);
 const snapshot=await p.evaluate(()=>({graded:StudyStore.stats().graded,attempts:JSON.parse(localStorage.getItem('vldc-exam-v1')).items.map(it=>StudyStore.entry(it.id).attempts||0)}));assert.equal(snapshot.graded,2);
 await p.reload();assert.deepEqual(await p.evaluate(()=>({graded:StudyStore.stats().graded,attempts:JSON.parse(localStorage.getItem('vldc-exam-v1')).items.map(it=>StudyStore.entry(it.id).attempts||0)})),snapshot);
 for(const view of ['wrong','blank','correct','flagged']){await p.selectOption('#peView',view);assert.equal(await p.locator('.exam-question-panel').count(),1);}
 await p.locator('#physicsExam a[href="#ch01/progress"]').click();assert.match(await p.locator('.study-stats').innerText(),/2\/394/);
 await p.locator('[data-tab=exam]').click();await p.locator('#peNewExam').click();await p.locator('.exam-filters summary').click();
 for(const [status,count] of Object.entries({wrong:1,correct:1,marked:1,skipped:1,new:142})){
  await p.selectOption('#peStatus',status);assert.match(await p.locator('#pePool').innerText(),new RegExp('^'+count+' câu'));
 }
});
test('physics PDF numeric/TF exams validate completeness, use existing grading and reveal full solutions only after submission',async t=>{
 const p=await physics(t);
 for(const kind of ['short','tf']){
  await p.selectOption('#peBank','pdf');if(!await p.locator('#peKind').isVisible())await p.locator('.exam-filters summary').click();await p.selectOption('#peKind',kind);await startPhysics(p,1);
  assert.equal(await p.locator('.study-solution').count(),0);
  if(kind==='short'){await selectAnswer(p,{numeric:'12abc'});assert.match(await p.locator('#peAnswerHint').innerText(),/chưa hợp lệ/);assert.match(await p.locator('#peProgress').innerText(),/^0\/1/);}
  else{await selectAnswer(p,{a:'true'});assert.match(await p.locator('#peProgress').innerText(),/^0\/1/);}
  await rightAnswer(p);await p.locator('#peSubmit').click();assert.match(await p.locator('.exam-metrics').innerText(),/10.00\/10/);
  assert.equal(await p.locator('.study-solution[open] ol li').count(),3);
  await p.locator('#peNewExam').click();
 }
});
test('physics deadline auto-submits on reload and timer completion never duplicates progress',async t=>{
 const p=await physics(t);await p.clock.install();await p.reload();await startPhysics(p,2,1);await rightAnswer(p);
 await p.clock.fastForward(61000);assert.equal((await state(p)).status,'done');
 const id=(await state(p)).items[0].id;assert.equal(await p.evaluate(id=>StudyStore.entry(id).attempts,id),1);
 await p.clock.fastForward(61000);assert.equal(await p.evaluate(id=>StudyStore.entry(id).attempts,id),1);
 await p.locator('#peNewExam').click();await startPhysics(p,1,1);
 await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('vldc-exam-v1'));s.endsAt=Date.now()-1;localStorage.setItem('vldc-exam-v1',JSON.stringify(s));});
 await p.reload();assert.equal((await state(p)).status,'done');assert.equal(await p.locator('#peSubmit').count(),0);
});
test('physics rejects stale exam content and handles unavailable storage without crashing',async t=>{
 const p=await physics(t);await startPhysics(p,1);
 await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('vldc-exam-v1'));s.signature='outdated';localStorage.setItem('vldc-exam-v1',JSON.stringify(s));});await p.reload();
 assert.match(await p.locator('.exam-warning').innerText(),/nội dung câu hỏi đã thay đổi/);
 await p.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('blocked');};Storage.prototype.setItem=()=>{throw Error('blocked');};Storage.prototype.removeItem=()=>{throw Error('blocked');};});await p.reload();await startPhysics(p,1);
 assert.match(await p.locator('#peSaveNote').innerText(),/không lưu được/);await selectAnswer(p,{choice:'A'});await p.locator('#peSubmit').click();assert.equal(await p.locator('.exam-metrics').count(),1);
});
test('exam builders, active papers, result filters and PDF zoom fit 320–1440px',async t=>{
 const p=await physics(t);
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await p.selectOption('#peBank','pdf');await startPhysics(p,2);await p.locator('#peZoom').fill('300');
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'PDF exam '+width);
  p.once('dialog',d=>d.accept());await p.locator('#peSubmit').click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'results '+width);
  await p.locator('#peNewExam').click();
 }
});
test('configured exams and local results work offline in both subjects',async t=>{
 const p=await page(t,'/offline.html',true);
 await p.waitForFunction(()=>!!navigator.serviceWorker.controller);
 assert.equal(await p.evaluate(async()=>!!(await caches.match(location.origin+'/physics/index.html'))),true);
 networkDown=true;await p.context().setOffline(true);
 await p.goto(base+'/physics/index.html#ch01/exam');await startPhysics(p,1);await rightAnswer(p);await p.locator('#peSubmit').click();await p.reload();assert.match(await p.locator('.exam-metrics').innerText(),/10.00\/10/);
 await p.goto(base+'/');await p.locator('#openExamSetup').click();await p.locator('#examCount').fill('1');await p.locator('#startConfiguredExam').click();
 const s=await state(p,'gdqpan-session-v2'),key=s.items[0].shuffled.toDisplay[s.items[0].q.answer];
 await p.locator('label:has(input[name=ex0][value='+key+'])').click();await p.locator('#submitTop').click();await p.reload();assert.match(await p.locator('.exam-metrics').innerText(),/10.00\/10/);
});
