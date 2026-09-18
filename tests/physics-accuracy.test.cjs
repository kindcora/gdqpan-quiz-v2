const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),http=require('node:http');
const {chromium}=require('playwright');
const review=require('./fixtures/physics-review.cjs');
const root=path.resolve(__dirname,'..');
const ctx={window:{}};vm.createContext(ctx);
for(let n=1;n<=6;n++)vm.runInContext(fs.readFileSync(path.join(root,`physics/data/ch0${n}.js`),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(root,'physics/js/quiz-coach.js'),'utf8'),ctx);
const chapters=JSON.parse(JSON.stringify(ctx.window.VLDC_CHAPTERS));
test('144 reviewed answer decisions and 36 solution records are complete; coach uses corrected content',()=>{
 for(let c=0;c<6;c++){
  assert.equal(review.keys[c].length,24);assert.equal(review.notes[c].length,24);assert.equal(review.essays[c].length,6);
  chapters[c].mcq.forEach((q,n)=>{
   assert.equal(q.answer,review.keys[c][n],`Module ${c+1}, question ${n+1}`);
   assert.equal(new Set(Object.values(q.choices)).size,4);
   assert.deepEqual(Object.keys(q.whyWrong).sort(),[...'ABCD'].filter(l=>l!==q.answer));
   assert.equal(ctx.window.VLDC_QUIZ_COACH[chapters[c].id][n].formula,q.whyCorrect);
  });
 }
 assert.match(chapters[0].mcq[18].whyCorrect,/3\{,\}186/);
 assert.match(chapters[0].essays[3].steps.s4,/3\{,\}186/);
 assert.doesNotMatch(JSON.stringify(ctx.window.VLDC_QUIZ_COACH.ch01[18]),/1\{,\}59/);
 const audit=JSON.parse(fs.readFileSync(path.join(root,'physics/data/answer-audit.json'),'utf8'));
 assert.equal(audit.questions.length,144);assert.equal(audit.essays.length,36);
 for(const [file,hash]of Object.entries(audit.hashes)){
  const actual=require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n')).digest('hex');
  assert.equal(actual,hash,'Review is stale after a content change: '+file);
 }
});
function scalar(text){
 const s=text.replace(/\{,\}/g,'.').replace(/\\approx/g,'').replace(/\\times\s*10\^\{?(-?\d+)\}?/g,'e$1').replace(/\\pi/g,'PI').replace(/[${}\s]/g,'');
 const m=s.match(/^([+-]?[\d.]+)(PI)?(e-?\d+)?/);assert.ok(m,`Cannot parse ${text}`);
 return Number(m[1])*(m[2]?Math.PI:1)*(m[3]?10**Number(m[3].slice(1)):1);
}
test('24 numerical MCQs are independently recalculated including the corrected capacitor energy',()=>{
 for(const [ch,n,calculated,unit] of review.numeric){
  const q=chapters[ch-1].mcq[n-1];
  const selected=scalar(q.choices[q.answer])*unit;
  assert.ok(Math.abs(selected/calculated-1)<.015,`ch${ch} q${n}: selected ${selected}, calculated ${calculated}`);
 }
 // Two additional cases are expressions rather than scalar options.
 assert.ok(Math.abs(Math.asin(1/1.33)*180/Math.PI-48.8)<.05);
 assert.match(chapters[4].mcq[21].choices.A,/48\{,\}8/);
 assert.ok(Math.abs(Math.cos(Math.PI/3)**2-1/4)<1e-12);
 assert.equal(chapters[4].mcq[14].choices.A,'$I_0/4$');
});
test('numerical essay results satisfy independent physical equations and rounding',()=>{
 const cases=[
  [1,2,9e9*4e-8*6e-8/.15**2,9.6e-4,'9{,}6'],[1,3,9e9*8e-5/2**2,1.8e5,'1{,}8'],
  [1,4,.5*(6*8.85e-12*2e-4/.0015)*300**2,3.186e-7,'3{,}186'],[1,5,9e-8/(6*8.85e-12),1695,'1{,}695'],[1,6,1e3*1.6e-19*2e5,3.2e-11,'3{,}2'],
  [2,1,20/4,5,'5'],[2,2,2e-7*2/.1,4e-6,'4'],[2,3,9.1e-31*1e6/(1.6e-19*.01),5.7e-4,'5{,}7'],
  [2,3,2*Math.PI*9.1e-31/(1.6e-19*.01),3.6e-9,'3{,}6'],[2,4,.2*5*.4,.4,'0{,}40'],[2,5,2e-7*10*10/.02,1e-3,'10^{-3}'],
  [3,1,200*4e-4*.05/.2,.02,'0{,}020'],[3,4,.4*2/.01,80,'80'],[3,4,.5*.4*2**2,.8,'0{,}80'],[3,5,100*.01*.2*2*Math.PI*50,62.8,'62{,}8'],
  [4,1,Math.PI*.05**2*.2,1.57e-3,'1{,}57'],[4,1,.05*.2/2,.005,'5{,}0'],[4,2,100e-4*.02,.0002,'2{,}0'],
  [4,3,2*Math.PI*Math.sqrt(.004*1e-6),3.97e-4,'3{,}97'],[4,3,1/(2*Math.PI*Math.sqrt(.004*1e-6)),2.52e3,'2{,}52'],[4,3,1/Math.sqrt(.004*1e-6),1.58e4,'1{,}58'],
  [4,4,1/(4*Math.PI**2*1e12*.0002),1.27e-10,'1{,}27'],[4,5,3e8/100e6,3,'3{,}0'],
  [5,2,500e-9/.25e-3,.002,'2{,}0'],[5,2,3*500e-9/.25e-3,.006,'6{,}0'],[5,3,Math.asin(1.45/1.5)*180/Math.PI,75.2,'75{,}2'],[5,4,.5*Math.cos(Math.PI/4)**2,.25,'I_n/4'],[5,5,600e-9/(2e-4),.003,'3{,}0'],
  [6,1,2.898e-3/600e-9,4830,'4830'],[6,2,5.67e-8*.025*800**4,581,'581'],[6,3,4.14e-15*1e15-2.5,1.64,'1{,}64'],[6,6,4/(3*1.097e7),121.5e-9,'121{,}5']
 ];
 for(const [ch,n,calc,rounded,token] of cases){
  assert.ok(Math.abs(calc/rounded-1)<.015,`Essay ch${ch}/${n}: ${calc} vs ${rounded}`);
  assert.ok(chapters[ch-1].essays[n-1].steps.s4.includes(token),`Essay ch${ch}/${n}: displayed result must include ${token}`);
 }
 assert.ok(700>1240/1.8);assert.match(chapters[5].essays[3].steps.s3,/689/);
});
let browser,server,base;
before(async()=>{
 server=http.createServer((req,res)=>{
  let file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
  if(file!==root&&!file.startsWith(root+path.sep))return res.writeHead(403).end();
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  fs.readFile(file,(err,data)=>{if(err)return res.writeHead(404).end();res.setHeader('Content-Type',({'.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css'})[path.extname(file)]||'application/octet-stream');res.end(data);});
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
});
after(async()=>{if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));});
async function newPage(t){const p=await browser.newPage({serviceWorkers:'block',viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));t.after(async()=>{await p.close();assert.deepEqual(errors,[]);});await p.route('https://cdn.jsdelivr.net/**',r=>r.abort());await p.goto(base+'/physics/index.html#ch01/quiz');return p;}
test('all four selections for each of 144 questions render the reviewed correct answer and score accurately',async t=>{
 const p=await newPage(t);
 for(let c=0;c<6;c++)for(const letter of 'ABCD'){
  const id='ch0'+(c+1),picks=Object.fromEntries(Array.from({length:24},(_,i)=>[i,letter]));
  await p.evaluate(({id,picks})=>localStorage.setItem('vldc-quiz-v1',JSON.stringify({[id]:{picks,checked:{},submitted:false,revision:'2026-09-12'}})),{id,picks});
  await p.goto(base+'/physics/index.html#'+id+'/quiz');await p.reload();
  await p.locator('#submitQuiz').click();
  const correct=await p.locator('.choice.correct').evaluateAll(nodes=>nodes.map(n=>n.dataset.l));
  assert.deepEqual(correct,review.keys[c],id+'/'+letter);
  const score=review.keys[c].filter(l=>l===letter).length;
  assert.match(await p.locator('.result-banner').innerText(),new RegExp(score+'/24'));
  assert.equal(await p.locator('.result.ok').count(),score);
  assert.equal(await p.locator('.result.bad').count(),24-score);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 }
});
test('old checked/submitted results reopen while preserving choices, then corrected answer survives reload',async t=>{
 const p=await newPage(t);
 await p.evaluate(()=>localStorage.setItem('vldc-quiz-v1',JSON.stringify({ch01:{picks:{18:'A'},checked:{18:true},submitted:true}})));
 await p.reload();
 assert.equal(await p.locator('#mcq-18 .result').count(),0);
 assert.equal(await p.locator('#mcq-18 [data-l="A"]').getAttribute('aria-pressed'),'true');
 assert.match(await p.locator('[role="status"].source-note').innerText(),/mở lại/);
 await p.locator('#mcq-18 [data-l="B"]').click();await p.locator('[data-check-q="18"]').click();
 await p.reload();assert.equal(await p.locator('#mcq-18 .result.ok').count(),1);
 assert.match((await p.locator('#mcq-18 .result .katex-html').allInnerTexts()).join(''),/3.*186/);
 await p.goto(base+'/physics/index.html#ch01/source/7');
 assert.match(await p.locator('.source-workspace').innerText(),/250 bài có hướng dẫn giải/);
 assert.equal(await p.locator('.study-feedback').count(),0);
});
