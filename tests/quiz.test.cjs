const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const vm = require('node:vm');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
let browser, server, base;
const KEY = 'gdqpan-session-v2';
before(async () => {
  server = http.createServer((req, res) => {
    let file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
    if (file !== root && !file.startsWith(root + path.sep)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    fs.readFile(file, (err, data) => {
      if (err) return res.writeHead(404).end();
      res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[path.extname(file)] || 'application/octet-stream');
      res.end(data);
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
});
after(async () => { if (browser) await browser.close(); if (server) await new Promise(r => server.close(r)); });
async function page(t, width = 390) {
  const p = await browser.newPage({serviceWorkers:'block', viewport: { width, height: 844 }, isMobile: width < 600, hasTouch: width < 600 });
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  t.after(async () => { await p.close(); assert.deepEqual(errors, [], 'No uncaught browser errors'); });
  await p.goto(base);
  return p;
}
async function command(p, text) {
  await p.locator('.command-panel').evaluate(el => el.open = true);
  await p.locator('#commandInput').fill(text);
  await p.locator('#commandForm').evaluate(el => el.requestSubmit());
}
async function state(p) { return p.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY); }
async function noOverflow(p) {
  const sizes = await p.evaluate(() => ({ scroll: document.documentElement.scrollWidth, view: innerWidth }));
  assert.ok(sizes.scroll <= sizes.view + 1, JSON.stringify(sizes));
}
test('bank integrity: 420 unique IDs, complete answers, embedded JSON matches source', () => {
  const ctx = { window: {} }; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/questions-data.js'), 'utf8'), ctx);
  const bank = JSON.parse(JSON.stringify(ctx.window.GDQPAN_BANK.questions));
  assert.equal(bank.length, 420); assert.equal(new Set(bank.map(q => q.id)).size, 420);
  const json = JSON.parse(fs.readFileSync(path.join(root, 'data/questions.json'), 'utf8'));
  assert.deepEqual(bank, json.questions);
  bank.forEach(q => { assert.match(q.answer, /^[A-D]$/); for (const L of 'ABCD') assert.ok(q.choices[L].trim()); });
  for (let i = 1; i <= 6; i++) vm.runInContext(fs.readFileSync(path.join(root, `physics/data/ch0${i}.js`), 'utf8'), ctx);
  assert.equal(ctx.window.VLDC_CHAPTERS.length, 6);
  for (const ch of ctx.window.VLDC_CHAPTERS) { assert.equal(ch.mcq.length, 24); ch.mcq.forEach(q => assert.ok(q.choices[q.answer])); }
});
test('home commands, empty filters, invalid exam inputs do not crash or create sessions', async t => {
  const p = await page(t);
  for (const cmd of ['dừng', 'chỉ câu sai', 'từ câu 9999', 'đề 0 câu 15 phút', 'đề 20 câu 0 phút', 'đề 20 câu 999 phút']) {
    await command(p, cmd); assert.equal(await state(p), null);
  }
  assert.equal(await p.locator('.home-hero').count(), 1);
});
test('sequential mode, score locking, incorrect-answer persistence and end summary', async t => {
  const p = await page(t); await p.selectOption('#sourceFilter', 'HP1');
  await command(p, 'tuần tự');
  for (let i = 1; i <= 6; i++) {
    const st = await state(p); assert.equal(st.current.originalIndex, i);
    const picked = Object.keys(st.shuffled.toOriginal).find(d => st.shuffled.toOriginal[d] !== st.current.answer);
    await p.locator(`[data-choice="${picked}"]`).click();
    assert.equal((await state(p)).history.length, i);
    assert.equal(await p.locator('.choice.wrong').count(), 1);
    await p.reload(); assert.match(await p.locator('.result h2').first().innerText(), /Sai/);
    if (i === 5) await p.locator('[data-cp="tiep"]').click();
    else if (i < 6) await p.locator('#btnNext').click();
  }
  await command(p, 'dừng'); assert.equal((await state(p)).kind, 'summary');
  await p.reload(); assert.equal(await p.locator('[data-end="sai"]').count(), 1);
  await p.locator('[data-end="sai"]').click();
  const st = await state(p); assert.equal(st.queue.length + 1, 6);
});
test('shuffled choices grade by content, restore correct feedback and preserve referenced options', async t => {
  const p = await page(t); await p.selectOption('#sourceFilter', 'HP1'); await command(p, 'từ câu 88');
  let st = await state(p); assert.deepEqual(st.shuffled.toOriginal, { A: 'A', B: 'B', C: 'C', D: 'D' });
  const right = st.shuffled.toDisplay[st.current.answer]; await p.locator(`[data-choice="${right}"]`).click();
  await p.reload(); assert.equal(await p.locator('.result.ok').count(), 1);
  await p.locator('#btnNext').click(); st = await state(p);
  await p.locator(`[data-choice="${st.shuffled.toDisplay[st.current.answer]}"]`).click();
  assert.equal((await state(p)).history[1].correct, true);
});
test('review does not accept hidden keyboard answers; modifiers and focused buttons are respected', async t => {
  const p = await page(t); await command(p, 'tuần tự');
  await command(p, 'xem lại câu 5'); await p.locator('#main').focus(); await p.keyboard.press('a');
  assert.equal((await state(p)).history.length, 0);
  await p.reload(); await p.locator('#main').focus(); await p.keyboard.press('Control+a');
  assert.equal((await state(p)).history.length, 0);
  await p.keyboard.press('a'); assert.equal((await state(p)).history.length, 1);
});
test('exam saves picks, prevents answer reveals, confirms blanks and restores result', async t => {
  const p = await page(t); await command(p, 'đề 3 câu 15 phút');
  let st = await state(p); const correct = st.items[0].shuffled.toDisplay[st.items[0].q.answer];
  await p.locator(`label:has(input[name="ex0"][value="${correct}"])`).click();
  await p.reload(); assert.equal((await state(p)).items[0].picked, correct);
  assert.equal(await p.locator('.correct').count(), 0);
  for (const cmd of ['xem lại câu 1', 'bắt đầu', 'đề 2 câu 1 phút']) { await command(p, cmd); assert.equal((await state(p)).items.length, 3); }
  p.once('dialog', d => d.dismiss()); await p.locator('#submitTop').click(); assert.equal((await state(p)).kind, 'exam');
  p.once('dialog', d => d.accept()); await command(p, 'dừng');
  st = await state(p); assert.equal(st.kind, 'examDone'); assert.equal(st.history.filter(h => h.correct).length, 1);
  assert.match(await p.locator('#statusLine').innerText(), /2 câu bỏ trống/);
  assert.equal(await p.locator('.choice.correct').count(), 3);
  await p.reload(); assert.equal((await state(p)).kind, 'examDone'); assert.equal(await p.locator('.choice.correct').count(), 3);
});
test('expired exam submits on reload without resetting deadline', async t => {
  const p = await page(t); await command(p, 'đề 2 câu 1 phút');
  await p.evaluate(key => { const s = JSON.parse(localStorage.getItem(key)); s.endsAt = Date.now() - 1000; localStorage.setItem(key, JSON.stringify(s)); }, KEY);
  await p.reload(); assert.equal((await state(p)).kind, 'examDone');
  assert.equal((await state(p)).history.length, 2);
});
test('live exam timer submits once when time expires', async t => {
  const p = await page(t); await p.clock.install(); await command(p, 'đề 2 câu 1 phút');
  await p.clock.fastForward(61000); assert.equal((await state(p)).kind, 'examDone');
  await p.clock.fastForward(61000); assert.equal((await state(p)).history.length, 2);
});
test('corrupt/unavailable storage does not break startup or grading', async t => {
  const p = await page(t); await p.evaluate(key => localStorage.setItem(key, '{bad'), KEY); await p.reload();
  assert.equal(await p.locator('.home-hero').count(), 1);
  await p.addInitScript(() => { Storage.prototype.getItem = () => { throw Error('blocked'); }; Storage.prototype.setItem = () => { throw Error('blocked'); }; });
  await p.reload(); await command(p, 'tuần tự'); await p.locator('[data-choice="A"]').click();
  assert.equal(await p.locator('.result').count(), 1);
});
test('damaged HP1 #194 stays reviewable but cannot enter a scored round', async t => {
  const p = await page(t); await p.selectOption('#sourceFilter', 'HP1'); await command(p, 'từ câu 194');
  assert.equal((await state(p)).current.originalIndex, 195);
  await command(p, 'xem lại câu 194'); assert.match(await p.locator('#main').innerText(), /lỗi tách đề/);
});
for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
  test(`no page overflow at ${width}px: home, filters, drill, exam and results`, async t => {
    const p = await page(t, width); await noOverflow(p);
    const options = await p.locator('#lessonFilter option').evaluateAll(opts => opts.map(o => o.value));
    await p.selectOption('#lessonFilter', options.at(-1)); await noOverflow(p);
    await command(p, 'tuần tự'); await noOverflow(p); await p.locator('[data-choice="A"]').click(); await noOverflow(p);
    await command(p, 'dừng'); await command(p, 'đề 3 câu 15 phút'); await noOverflow(p);
    p.once('dialog', d => d.accept()); await p.locator('#submitTop').click(); await noOverflow(p);
  });
}
test('physics: selected answer is hidden until checked, state survives reload, mobile tabs fit', async t => {
  const p = await page(t, 360); await p.goto(base + '/physics/index.html#ch01/quiz');
  await p.locator('[data-q="0"][data-l="A"]').click();
  assert.equal(await p.locator('#mcq-0 .result').count(), 0);
  assert.equal(await p.locator('[data-q="0"][data-l="A"]').getAttribute('aria-pressed'), 'true');
  await p.reload(); assert.equal(await p.locator('[data-q="0"][data-l="A"]').getAttribute('aria-pressed'), 'true');
  await p.locator('[data-check-q="0"]').click(); assert.equal(await p.locator('#mcq-0 .result').count(), 1);
  await p.reload(); assert.equal(await p.locator('#mcq-0 .result').count(), 1);
  await noOverflow(p);
  for (let ch = 1; ch <= 6; ch++) {
    await p.locator(`[data-ch="ch0${ch}"]`).click();
    for (const tab of ['theory', 'quiz', 'essay']) { await p.locator(`[data-tab="${tab}"]`).click(); await noOverflow(p); }
  }
});
test('physics library failure shows useful lab fallback and leaves quiz working', async t => {
  const p = await page(t); await p.route('**/vendor/three/three.min.js', route => route.abort());
  await p.goto(base + '/physics/index.html#ch01/lab');
  assert.match(await p.locator('#labRoot').innerText(), /Không tải được thư viện/);
  await p.locator('[data-tab="quiz"]').click(); await p.locator('[data-q="0"][data-l="A"]').click();
  await p.locator('[data-check-q="0"]').click(); assert.equal(await p.locator('#mcq-0 .result').count(), 1);
});
