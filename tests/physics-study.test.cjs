const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
function environment(initial={},blocked=false){
 const memory={...initial},events={},timers=[];
 const ctx={Date,Math,Number,JSON,Event:class{constructor(type){this.type=type;}},setInterval:fn=>timers.push(fn),
 localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return memory[k]||null;},setItem:(k,v)=>{if(blocked)throw Error('blocked');memory[k]=v;}},
 document:{visibilityState:'visible',hasFocus:()=>true,addEventListener:()=>{}},addEventListener:(type,fn)=>{events[type]=fn;},dispatchEvent:()=>{}};
 ctx.window=ctx;vm.createContext(ctx);
 for(const file of [...Array.from({length:6},(_,i)=>'data/ch0'+(i+1)+'.js'),'data/source-library.js','data/source-solutions.js',...Array.from({length:6},(_,i)=>'data/solutions-ch0'+(i+1)+'.js'),'js/study-store.js'])vm.runInContext(fs.readFileSync(path.join(root,'physics',file),'utf8'),ctx);
 return {S:ctx.StudyStore,solutions:ctx.SourceSolutions.records,memory,ctx,events,timers};
}
const fixture=require('./fixtures/pdf-numerics.cjs');
test('250 separate worked solutions have valid keys and exact original page references',()=>{
 const {S,solutions}=environment();assert.equal(Object.keys(S.catalog).length,394);assert.equal(Object.keys(solutions).length,250);
 for(const [id,s] of Object.entries(solutions)){
  const q=S.catalog[id];assert.equal(s.steps.length,3,id);assert.ok(s.steps.every(x=>x.trim().length>0),id);
  assert.deepEqual(Array.from(s.pages),[...new Set(q.segments.map(x=>x.page))],id);
  if(s.key===null){assert.ok(s.issue,id);assert.equal(S.grade(id,{}).state,'review');continue;}
  if(q.kind==='mcq'){
   assert.match(s.key,/^[ABCD]$/);for(const letter of 'ABCD')assert.equal(S.grade(id,{choice:letter}).correct,letter===s.key,id+letter);
  }else if(q.kind==='tf'){
   assert.match(s.key,/^[TF]{4}$/);
   for(let bits=0;bits<16;bits++){const answer=Object.fromEntries([...'abcd'].map((l,i)=>[l,bits&(1<<i)?'true':'false']));assert.equal(S.grade(id,answer).correct,[...'abcd'].map(l=>answer[l]==='true'?'T':'F').join('')===s.key,id+bits);}
   assert.equal(S.grade(id,{a:'true'}).state,'incomplete');
  }else{assert.ok(Number.isFinite(s.key.value)&&s.key.tolerance>0&&s.key.unit,id);assert.equal(S.grade(id,{numeric:String(s.key.value)}).correct,true,id);}
 }
 assert.equal(Object.values(solutions).filter(s=>s.key===null).length,17);
});
test('all 57 gradeable numeric PDF answers agree with independent calculations and accept unrounded values',()=>{
 const {S,solutions}=environment();let n=0;
 for(const [ch,rows] of Object.entries(fixture))for(const [number,[raw,precision]] of Object.entries(rows)){
  const id='source-'+ch+'-'+number.padStart(3,'0'),s=solutions[id];n++;
  const rounded=Number(raw.toFixed(precision));
  assert.ok(Math.abs(rounded-s.key.value)<=s.key.tolerance,id+': computed '+raw+', rounded '+rounded+', key '+s.key.value);
  assert.equal(S.grade(id,{numeric:String(raw)}).correct,true,id+' should accept the accurate unrounded calculation');
  assert.equal(S.grade(id,{numeric:String(s.key.value+10*s.key.tolerance+1)}).correct,false,id);
 }
 assert.equal(n,57);
});
test('strict numeric parser supports decimal commas, exponents and rejects units/junk',()=>{
 const {S}=environment();for(const v of ['0,25','2.5e-1','2,5 × 10^-1','.25'])assert.equal(S.parseNumber(v),.25);
 for(const v of ['', '1 mV','1abc','1/0','NaN','Infinity','1e999','1,2,3','0x10'])assert.equal(S.parseNumber(v),null,v);
 assert.equal(S.parseNumber('−5e-6'),-5e-6);
});
test('latest-result accuracy, explicit retry, repeated mistakes and all review sources stay distinct',()=>{
 const {S,solutions}=environment(),id='source-ch01-001',key=solutions[id].key,wrong=[...'ABCD'].find(x=>x!==key);
 assert.equal(S.queue('unattempted').length,250);S.draft(id,{choice:wrong});assert.equal(S.stats().attempted,1);assert.equal(S.stats().graded,0);
 S.record(id,{choice:wrong});S.record(id,{choice:wrong});assert.equal(S.entry(id).attempts,1);assert.equal(S.entry(id).wrong,1);
 S.begin(id);S.record(id,{choice:wrong});assert.equal(S.stats().repeated.length,1);assert.equal(S.queue('wrong').length,1);
 S.mark(id,'sure');assert.equal(S.stats().rate,0);S.skip('source-ch01-002');S.mark('source-ch01-003','review');S.mark('source-ch01-004','unanswered');
 assert.equal(S.queue('skipped').length,1);assert.equal(S.queue('marked').length,2);assert.equal(new Set(S.queue()).size,S.queue().length);
 S.begin(id);S.record(id,{choice:key});assert.equal(S.stats().rate,100);assert.equal(S.queue('wrong').length,0);assert.equal(S.entry(id).wrong,2);
 assert.equal(S.stats().repeated.length,1);assert.equal(S.queue('unattempted','ch01').length,40);
 S.record('source-ch01-037',{a:'true',b:'true',c:'true',d:'true'});assert.equal(S.stats().graded,1);
});
test('legacy import does not invent time, streaks or repeated wrong attempts; persists safely',()=>{
 const old={ch01:{revision:'2026-09-12',picks:{0:'A',1:'B'},checked:{0:true},submitted:false}};
 const initial={'vldc-quiz-v1':JSON.stringify(old),'vldc-source-practice-v1':JSON.stringify({answers:{'source-ch01-002':{choice:'D'},'source-ch01-027':{response:'old work'}}})};
 const {S,memory}=environment(initial);assert.equal(S.stats().attempted,4);assert.equal(S.stats().graded,1);assert.equal(S.stats().seconds,0);assert.equal(S.stats().streak,0);
 assert.equal(S.stats().repeated.length,0);assert.equal(environment(memory).S.stats().graded,1);
 const stale=JSON.parse(memory['vldc-study-v1']);stale.items['quiz-ch01-001'].latest.revision='old';
 const changed=environment({'vldc-study-v1':JSON.stringify(stale)}).S;assert.equal(changed.stats().graded,0);assert.equal(changed.stats().stale,1);
 for(const e of [environment({'vldc-study-v1':'{bad json'}),environment({},true)]){e.S.mark('source-ch01-001','review');assert.equal(e.S.queue('marked').length,1);}
});
test('local calendar streak includes yesterday, crosses month boundary, excludes tiny idle saves',()=>{
 const initial={'vldc-study-v1':JSON.stringify({migrated:true,items:{},days:{'2026-08-30':{seconds:30},'2026-08-31':{seconds:60},'2026-09-01':{actions:1},'2026-09-02':{seconds:10}}})};
 const {S}=environment(initial);assert.equal(S.stats(new Date(2026,8,2)).streak,3);assert.equal(S.stats(new Date(2026,8,3)).streak,0);
 assert.equal(S.stats().seconds,100);S.addTime(1000,new Date(2026,8,2));assert.equal(S.stats().seconds,115);
 assert.equal(S.dateKey(new Date(2026,8,1,0,1)),'2026-09-01');
});
let browser,server,base;
test('study clock counts active foreground intervals and stops on idle, hidden or unfocused tabs',()=>{
 const {S,ctx,events,timers}=environment();let now=Date.now();
 ctx.Date=class extends Date{constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}};
 events.pointerdown();for(let i=0;i<5;i++){now+=15000;timers[0]();}assert.equal(S.stats().seconds,60);
 events.pointerdown();ctx.document.visibilityState='hidden';now+=15000;timers[0]();assert.equal(S.stats().seconds,60);
 ctx.document.visibilityState='visible';ctx.document.hasFocus=()=>false;now+=15000;timers[0]();assert.equal(S.stats().seconds,60);
 ctx.document.hasFocus=()=>true;events.pointerdown();now+=15000;timers[0]();assert.equal(S.stats().seconds,75);
});
before(async()=>{
 server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep))return res.writeHead(403).end();if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');fs.readFile(file,(err,body)=>{if(err)return res.writeHead(404).end();res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(body);});});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
});
after(async()=>{await browser?.close();if(server)await new Promise(r=>server.close(r));});
async function page(t,hash='#ch01/source',width=390){const p=await browser.newPage({serviceWorkers:'block',viewport:{width,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));t.after(async()=>{await p.close();assert.deepEqual(errors,[]);});await p.route('https://cdn.jsdelivr.net/**',r=>r.abort());await p.goto(base+'/physics/index.html'+hash);return p;}
test('PDF grading, confidence and review correction update dashboard without losing notes',async t=>{
 const p=await page(t),key=await p.evaluate(()=>SourceSolutions.records['source-ch01-001'].key),wrong=[...'ABCD'].find(x=>x!==key);
 await p.locator('[data-answer="choice"][value="'+wrong+'"]').check();await p.locator('#sourceNote').fill('Giữ ghi chú này');await p.locator('[data-study-check]').click();
 assert.match(await p.locator('.study-feedback').innerText(),/Chưa đúng/);await p.selectOption('[data-study-mark]','review');await p.reload();assert.equal(await p.locator('#sourceNote').inputValue(),'Giữ ghi chú này');
 await p.locator('[data-tab="progress"]').click();assert.match(await p.locator('.study-stats').innerText(),/1\/394/);assert.match(await p.locator('.study-stats').innerText(),/0% đúng/);
 await p.locator('.study-dashboard a[href="#ch01/review/wrong"]').click();await p.locator('#reviewForm button').click();
 assert.equal(await p.locator('#reviewQuestion').getAttribute('data-study-question'),'source-ch01-001');assert.equal(await p.locator('.study-feedback').count(),0);
 await p.locator('[data-answer="choice"][value="'+key+'"]').check();await p.locator('[data-study-check]').click();assert.match(await p.locator('.study-feedback').innerText(),/^Đúng/);
 assert.equal(await p.evaluate(()=>StudyStore.queue('wrong').length),0);await p.locator('[data-review-step="1"]').click();assert.match(await p.locator('.study-empty').innerText(),/đúng 1 câu/);
});
test('numeric and TF validation, ambiguous questions, skipped and PDF-only new queues',async t=>{
 const p=await page(t,'#ch01/source/29');await p.locator('[data-study-check]').click();assert.match(await p.locator('[data-study-message]').innerText(),/Nhập một số/);
 assert.match(await p.locator('.source-workspace').innerText(),/đơn vị pC/);
 await p.locator('[data-answer="numeric"]').fill('-4,9');await p.locator('[data-study-check]').click();assert.match(await p.locator('.study-feedback').innerText(),/^Đúng/);
 assert.equal(await p.evaluate(()=>StudyStore.grade('source-ch01-029',{numeric:'-4.9e-6'}).correct),false);
 await p.goto(base+'/physics/index.html#ch06/source/41');await p.locator('[data-answer="a"][value="true"]').check();await p.locator('[data-study-check]').click();assert.match(await p.locator('[data-study-message]').innerText(),/đủ bốn/);
 for(const k of 'bcd')await p.locator('[data-answer="'+k+'"][value="false"]').check();await p.locator('[data-study-check]').click();assert.match(await p.locator('.study-feedback').innerText(),/^Đúng/);
 await p.goto(base+'/physics/index.html#ch06/source/25');assert.equal(await p.locator('[data-study-check]').count(),0);await p.locator('.study-solution summary').click();assert.match(await p.locator('.study-solution').innerText(),/4,14/);await p.locator('[data-study-skip]').click();
 await p.goto(base+'/physics/index.html#ch01/review/skipped');await p.locator('#reviewForm button').click();assert.equal(await p.locator('#reviewQuestion').getAttribute('data-study-question'),'source-ch06-025');
 await p.selectOption('#reviewMode','unattempted');await p.selectOption('#reviewChapter','ch01');await p.locator('#reviewForm button').click();assert.equal(await p.locator('#reviewQuestion').getAttribute('data-study-question'),'source-ch01-001');
});
test('checking quiz then submitting does not double count; blank answers become review skips',async t=>{
 const p=await page(t,'#ch01/quiz');await p.locator('[data-q="0"][data-l="A"]').click();await p.locator('[data-check-q="0"]').click();p.on('dialog',d=>d.accept());await p.locator('#submitQuiz').click();
 const result=await p.evaluate(()=>({attempts:StudyStore.entry('quiz-ch01-001').attempts,skipped:StudyStore.queue('skipped').length,graded:StudyStore.stats().graded}));assert.deepEqual(result,{attempts:1,skipped:23,graded:1});
});
test('progress, review and worked solutions fit 320–1440px and preserve all 250 page links',async t=>{
 const p=await page(t);
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:900});
  for(const hash of ['#ch01/progress','#ch01/review','#ch01/source/29']){await p.goto(base+'/physics/index.html'+hash);if(hash.includes('source'))await p.locator('.study-solution summary').click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+hash);}
  await p.goto(base+'/physics/index.html#ch01/review/unattempted');await p.locator('#reviewForm button').click();
  await p.locator('#reviewZoom').fill('300');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' review zoom');
 }
 const coverage=await p.evaluate(()=>VLDC_SOURCE_LIBRARY.questions.map(q=>{const box=document.createElement('div');box.innerHTML=StudyUI.solution(q,true);return {id:q.id,steps:box.querySelectorAll('ol li').length,pages:[...box.querySelectorAll('a[href*="exercises.pdf#page="]')].map(a=>Number(a.getAttribute('href').split('=')[1]))};}));
 const {solutions}=environment();assert.equal(coverage.length,250);for(const row of coverage){assert.equal(row.steps,3,row.id);assert.deepEqual(row.pages,Array.from(solutions[row.id].pages),row.id);}
});
