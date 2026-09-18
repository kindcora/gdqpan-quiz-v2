const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const context = { window: {} }; vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'physics/data/source-library.js'), 'utf8'), context);
const library = JSON.parse(JSON.stringify(context.window.VLDC_SOURCE_LIBRARY));
let browser, server, base;
before(async () => {
  server = http.createServer((req, res) => {
    let file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
    if (file !== root && !file.startsWith(root + path.sep)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    fs.readFile(file, (err, data) => {
      if (err) return res.writeHead(404).end();
      res.setHeader('Content-Type', ({ '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.webp':'image/webp', '.pdf':'application/pdf' })[path.extname(file)] || 'application/octet-stream');
      res.end(data);
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch({ headless:true, ...(process.env.BROWSER_CHANNEL ? { channel:process.env.BROWSER_CHANNEL } : {}) });
});
after(async () => { if (browser) await browser.close(); if (server) await new Promise(resolve => server.close(resolve)); });
async function page(t, hash = '#ch01/source', width = 390) {
  const p = await browser.newPage({serviceWorkers:'block', viewport:{ width,height:844 }, isMobile:width<600, hasTouch:width<600 });
  const errors = []; p.on('pageerror', error => errors.push(error.message));
  t.after(async () => { await p.close(); assert.deepEqual(errors, []); });
  await p.route('https://cdn.jsdelivr.net/**', route => route.abort());
  await p.goto(base+'/physics/index.html'+hash);
  return p;
}
async function noOverflow(p) { assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); }
async function imagesLoaded(p) { await p.waitForFunction(() => [...document.querySelectorAll('.source-original')].every(img => img.complete && img.naturalWidth > 0)); }

test('all 250 source questions have continuous numbering, known types and complete page references', () => {
  assert.equal(library.questions.length, 250);
  assert.equal(new Set(library.questions.map(q => q.id)).size, 250);
  const counts = [41,41,45,41,41,41];
  for (let i=0; i<6; i++) {
    const ch = library.chapters[i], questions = library.questions.filter(q => q.chapter === ch.id);
    assert.deepEqual(questions.map(q => q.number), Array.from({length:counts[i]}, (_,n) => n+1));
    assert.equal(ch.questionCount, counts[i]);
  }
  const kinds = library.questions.reduce((totals,q) => { totals[q.kind] = (totals[q.kind]||0)+1; return totals; }, {});
  assert.deepEqual(kinds, {mcq:161,short:58,tf:31});
  for (const q of library.questions) {
    assert.ok(q.segments.length);
    for (const seg of q.segments) {
      assert.ok(fs.existsSync(path.join(root,'physics',seg.image)));
      assert.ok(seg.width > 0 && seg.height > 20);
      assert.ok(seg.sourceBox[1] >= 0 && seg.sourceBox[3] <= 2200);
    }
    assert.equal(q.answer, undefined, 'Do not invent an answer key');
  }
  const q7 = library.questions.find(q=>q.id==='source-ch01-007');
  assert.deepEqual(q7.segments.map(s=>s.page),[2,3]);
  assert.deepEqual(library.questions.find(q=>q.id==='source-ch04-026').segments.map(s=>s.page),[29,30]);
});
test('both original PDFs are byte-preserved and all 103 rendered pages exist', () => {
  assert.deepEqual(library.documents.map(d=>d.pages.length),[47,56]);
  for (const doc of library.documents) {
    const bytes = fs.readFileSync(path.join(root,'physics',doc.pdf));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),doc.sha256);
    assert.deepEqual(doc.pages.map(p=>p.page),Array.from({length:doc.pages.length},(_,i)=>i+1));
    for (const p of doc.pages) assert.ok(fs.existsSync(path.join(root,'physics',p.image)));
  }
  assert.deepEqual(library.chapters[5].lecturePages,[]);
  assert.deepEqual(library.notes.duplicates[0].pages,[54,55,56]);
});
test('native selections, short responses, notes and review progress survive reload and stay separate by module', async t => {
  const p = await page(t);
  await p.locator('[data-answer="choice"][value="D"]').check();
  const note = 'F = k |q1q2| / (εr²) <b>ghi chú</b>';
  await p.locator('#sourceNote').fill(note); await p.locator('#sourceDone').check();
  await p.reload();
  assert.equal(await p.locator('[data-answer="choice"][value="D"]').isChecked(),true);
  assert.equal(await p.locator('#sourceNote').inputValue(),note);
  assert.equal(await p.locator('#sourceDone').isChecked(),true);
  assert.match(await p.locator('#sourceDoneCount').innerText(),/1\/41/);
  await p.locator('[data-ch="ch02"]').click();
  assert.equal(await p.locator('[data-answer]:checked').count(),0);
  await p.locator('[data-ch="ch01"]').click();
  await p.selectOption('#sourceQuestion','source-ch01-027');
  await p.locator('#sourceResponse').fill('3,2 × 10^-7 C'); await p.reload();
  assert.equal(await p.locator('#sourceResponse').inputValue(),'3,2 × 10^-7 C');
  assert.match(await p.locator('.source-workspace').innerText(),/250 bài có hướng dẫn giải/);
  assert.equal(await p.locator('[data-study-check]').count(),1);
});
test('four independent true/false picks are retained without marking them correct', async t => {
  const p = await page(t,'#ch06/source/41');
  for (const key of ['a','b','c','d']) await p.locator(`[data-answer="${key}"][value="${key==='a'?'true':'false'}"]`).check();
  await p.reload(); assert.equal(await p.locator('[data-answer]:checked').count(),4);
  assert.equal(await p.locator('.source-library .correct,.source-library .wrong').count(),0);
});
test('search, type filters, empty results and unreviewed filter work without losing saved notes', async t => {
  const p = await page(t);
  await p.locator('#sourceQuery').fill('photocopy'); await p.locator('#sourceSearch button').click();
  assert.equal(await p.locator('#sourceQuestion option').count(),1);
  assert.match(await p.locator('#sourceHeading').innerText(),/Câu 38/);
  await p.locator('#sourceQuery').fill('khong-co-tu-khoa-nay-99999'); await p.locator('#sourceSearch button').click();
  assert.equal(await p.locator('.source-question').count(),0);
  await p.locator('[data-source-action="clear"]').click();
  await p.selectOption('#sourceKind','short'); assert.equal(await p.locator('#sourceQuestion option').count(),10);
  await p.selectOption('#sourceKind','all'); await p.locator('#sourceDone').check();
  await p.selectOption('#sourceReview','pending'); assert.equal(await p.locator('#sourceQuestion option').count(),40);
});
test('page reader covers every supplied page and makes missing Module 6 lecture clear', async t => {
  const p = await page(t,'#ch01/lecture');
  assert.equal(await p.locator('#sourcePage').inputValue(),'7');
  await p.locator('#sourceAllPages').check(); assert.equal(await p.locator('#sourcePage option').count(),56);
  await p.selectOption('#sourcePage','56'); await imagesLoaded(p); await p.reload();
  assert.equal(await p.locator('#sourcePage').inputValue(),'56');
  await p.locator('[data-ch="ch06"]').click(); assert.equal(await p.locator('#sourcePage').count(),0);
  assert.match(await p.locator('.source-empty').innerText(),/chưa có phần giảng Module 6/);
  await p.locator('[data-tab="source"]').click(); await p.locator('[data-source-action="reader"]').click();
  await p.locator('#sourceAllPages').check(); assert.equal(await p.locator('#sourcePage option').count(),47);
});
test('all 250 questions can be selected and their images load in the browser', async t => {
  const p = await page(t);
  for (const ch of library.chapters) {
    await p.locator(`[data-ch="${ch.id}"]`).click();
    for (const q of library.questions.filter(q=>q.chapter===ch.id)) {
      await p.selectOption('#sourceQuestion',q.id); await imagesLoaded(p);
      assert.equal(await p.locator('.source-question').getAttribute('data-source-id'),q.id);
      assert.equal(await p.locator('.source-original').count(),q.segments.length);
    }
  }
});
for (const width of [320,390,768,1440]) {
  test(`source questions and lecture reader stay within ${width}px even at 300% image zoom`, async t => {
    const p = await page(t,'#ch01/source/7',width); await imagesLoaded(p); await noOverflow(p);
    await p.locator('#sourceZoom').evaluate(el=>{el.value='300';el.dispatchEvent(new Event('input',{bubbles:true}));});
    await noOverflow(p);
    assert.ok(await p.locator('.source-image-viewport').evaluate(el=>el.scrollWidth>el.clientWidth));
    await p.locator('[data-tab="lecture"]').click(); await imagesLoaded(p); await noOverflow(p);
    await p.locator('#sourceZoom').evaluate(el=>{el.value='300';el.dispatchEvent(new Event('input',{bubbles:true}));});
    await noOverflow(p);
  });
}
test('blocked storage and failed image requests show recoverable feedback', async t => {
  const p = await page(t);
  await p.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('disabled')};Storage.prototype.setItem=()=>{throw Error('disabled')};});
  await p.reload(); await p.locator('#sourceNote').fill('Ghi chú');
  assert.match(await p.locator('#sourceSaveStatus').innerText(),/không lưu được/);
  await p.route('**/assets/library/questions/**',route=>route.abort()); await p.reload();
  await p.locator('.source-image-viewport [role="alert"]').waitFor();
  assert.equal(await p.locator('.source-question').count(),1);
});
