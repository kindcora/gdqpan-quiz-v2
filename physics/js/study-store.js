(function () {
  'use strict';
  const KEY = 'vldc-study-v1', REV = '2026-09-12';
  const topics = {
    ch01:['Tương tác tĩnh điện','Cường độ điện trường','Điện thế và công','Vật dẫn và tụ điện'],
    ch02:['Dòng điện và nguồn điện','Từ trường của dòng điện','Lực từ và tương tác dòng điện','Lực Lorentz','Tổng hợp từ học'],
    ch03:['Hiện tượng cảm ứng','Định luật Lenz','Suất điện động cảm ứng','Dòng điện Foucault','Tự cảm và năng lượng từ','Tổng hợp cảm ứng'],
    ch04:['Trường điện từ Maxwell','Dao động LC','Dao động tắt dần và cưỡng bức','Sóng điện từ'],
    ch05:['Quang hình học','Cơ sở quang học sóng','Giao thoa ánh sáng','Nhiễu xạ ánh sáng','Phân cực ánh sáng'],
    ch06:['Bức xạ nhiệt','Thuyết lượng tử','Giới hạn quang điện','Định luật quang điện','Hiệu ứng quang điện','Hiệu suất lượng tử','Tổng hợp lượng tử']
  };
  const quizTopics = {
    ch01:[1,1,2,2,2,2,2,4,4,4,1,2,2,2,4,2,3,4,4,1,1,2,1,2],
    ch02:[1,1,1,2,2,2,2,2,1,3,4,2,4,3,3,3,2,2,4,2,1,4,2,2],
    ch03:[1,2,3,4,5,5,3,5,3,4,2,5,5,3,1,4,3,3,3,4,1,1,3,3],
    ch04:[1,1,1,1,1,1,2,2,3,3,4,4,2,4,1,1,1,2,4,2,4,1,3,1],
    ch05:[1,1,1,1,2,2,2,3,3,3,3,4,5,5,5,1,1,3,3,1,4,1,3,5],
    ch06:[1,1,1,1,1,2,2,4,4,3,4,3,1,1,5,5,1,2,6,4,4,2,2,6]
  };
  const catalog = {}, quizId = (ch,n) => 'quiz-' + ch + '-' + String(n).padStart(3,'0');
  window.VLDC_SOURCE_LIBRARY.questions.forEach(q => {
    const group = Number((q.topic.match(/\d+/) || [1])[0]);
    catalog[q.id] = {...q, source:true, topic:topics[q.chapter][group-1] || topics[q.chapter][0]};
  });
  window.VLDC_CHAPTERS.forEach(ch => ch.mcq.forEach((q,i) => {
    const id = quizId(ch.id,i+1);
    catalog[id] = {...q,id,chapter:ch.id,number:i+1,kind:'mcq',source:false,topic:topics[ch.id][quizTopics[ch.id][i]-1]};
  }));
  let data = {items:{},days:{},migrated:false,examTokens:[]}, unavailable = false;
  const object = x => x && typeof x === 'object' && !Array.isArray(x);
  const count = x => Number.isFinite(x) && x >= 0 ? Math.floor(x) : 0;
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      if (!object(raw)) return;
      data = {items:{},days:{},migrated:raw.migrated===true,examTokens:Array.isArray(raw.examTokens)?raw.examTokens.filter(t=>typeof t==='string'&&t.length<=100).slice(-200):[]};
      if (object(raw.items)) Object.keys(catalog).forEach(id => {
        const e = raw.items[id]; if (!object(e)) return;
        data.items[id] = {attempted:e.attempted===true,skipped:e.skipped===true,mark:['sure','review','unanswered'].includes(e.mark)?e.mark:'',
          wrong:count(e.wrong),attempts:count(e.attempts),draft:object(e.draft)?e.draft:{},locked:e.locked===true,
          latest:object(e.latest)&&typeof e.latest.correct==='boolean'?e.latest:null,legacy:e.legacy===true};
      });
      if (object(raw.days)) Object.entries(raw.days).forEach(([date,day]) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(date) && object(day)) data.days[date] = {seconds:Math.min(86400,count(day.seconds)),actions:count(day.actions)};
      });
    } catch (_) { /* Bad or blocked storage leaves a usable in-memory session. */ }
  }
  function save() {
    try { localStorage.setItem(KEY,JSON.stringify(data)); unavailable = false; }
    catch (_) { unavailable = true; }
    window.dispatchEvent(new Event('studychange'));
  }
  read();
  const revision = id => catalog[id]?.source ? window.SourceSolutions.revision : REV;
  const current = e => e?.latest && e.latest.revision === revision(e.latest.id);
  function entry(id) { return data.items[id] || {}; }
  function item(id) {
    if (!catalog[id]) throw new Error('Unknown question');
    return data.items[id] || (data.items[id] = {wrong:0,attempts:0,draft:{}});
  }
  function dateKey(date = new Date()) {
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
  }
  function action() {
    const day = dateKey(); data.days[day] ||= {seconds:0,actions:0}; data.days[day].actions++;
  }
  function parseNumber(text) {
    const s = String(text ?? '').trim().replace(/−/g,'-').replace(/,/g,'.');
    const plain = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
    const scientific = s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*[×x*]\s*10\s*\^\s*([+-]?\d+)$/i);
    const value = plain.test(s) ? Number(s) : scientific ? Number(scientific[1])*10**Number(scientific[2]) : NaN;
    return Number.isFinite(value) ? value : null;
  }
  function grade(id, answer) {
    const q = catalog[id]; if (!q) return {state:'invalid',message:'Không tìm thấy câu hỏi.'};
    const solution = q.source ? window.SourceSolutions.records[id] : {key:q.answer};
    if (!solution || solution.key === null) return {state:'review',message:'Đề cần đối chiếu: xem lời giải và điều kiện áp dụng. Câu này không tính vào tỷ lệ đúng.'};
    const key = solution.key;
    if (q.kind === 'mcq') {
      if (!/^[ABCD]$/.test(answer.choice || '')) return {state:'incomplete',message:'Hãy chọn một đáp án A–D.'};
      return {state:'graded',correct:answer.choice===key};
    }
    if (q.kind === 'tf') {
      const values = ['a','b','c','d'].map(k => answer[k]);
      if (values.some(v => !['true','false'].includes(v))) return {state:'incomplete',message:'Hãy chọn Đúng hoặc Sai cho đủ bốn nhận định.'};
      const parts = values.map((v,i) => (v==='true'?'T':'F')===key[i]);
      return {state:'graded',correct:parts.every(Boolean),parts};
    }
    const value = parseNumber(answer.numeric);
    if (value === null) return {state:'incomplete',message:'Nhập một số theo đơn vị ghi trên ô. Có thể dùng 0,25 hoặc 2.5e-1; không nhập đơn vị vào ô số.'};
    return {state:'graded',correct:Math.abs((solution.acceptMagnitude?Math.abs(value):value)-key.value) <= key.tolerance + Number.EPSILON*Math.max(1,Math.abs(key.value))};
  }
  function draft(id, values) {
    const e = item(id); if (e.locked && current(e)) return;
    e.draft = {...e.draft,...values};
    if (Object.values(values).some(v => String(v).trim())) { e.attempted = true; e.skipped = false; }
    save();
  }
  function record(id, answer) {
    const e = item(id);
    if (e.locked && current(e)) return {state:'graded',...e.latest};
    const result = grade(id,answer);
    if (result.state !== 'graded') return result;
    e.draft = {...answer}; e.attempted = true; e.skipped = false; e.locked = true;
    e.attempts = count(e.attempts)+1; e.wrong = count(e.wrong)+(result.correct?0:1);
    e.latest = {id,correct:result.correct,parts:result.parts,revision:revision(id),at:new Date().toISOString()};
    action(); save(); return result;
  }
  function begin(id) { const e = item(id); e.locked = false; e.draft = {}; save(); }
  // Commit an exam as one local transaction; restoring the same exam is idempotent.
  function recordExam(token, entries) {
    if(typeof token!=='string'||!token||token.length>100||data.examTokens.includes(token))return;
    const seen=new Set();
    entries.forEach(row=>{
      if(!catalog[row.id]||seen.has(row.id))return;seen.add(row.id);
      const result=grade(row.id,row.answer||{}),e=item(row.id);
      if(row.flagged)e.mark='review';
      e.draft={...row.answer};
      if(result.state==='graded'){
        e.attempted=true;e.skipped=false;e.locked=true;
        e.attempts=count(e.attempts)+1;e.wrong=count(e.wrong)+(result.correct?0:1);
        e.latest={id:row.id,correct:result.correct,parts:result.parts,revision:revision(row.id),at:new Date().toISOString()};
      }else{e.skipped=true;e.locked=false;if(Object.values(e.draft).some(v=>String(v).trim()))e.attempted=true;}
    });
    data.examTokens.push(token);data.examTokens=data.examTokens.slice(-200);action();save();
  }
  function skip(id) { const e = item(id); e.skipped = true; action(); save(); }
  function mark(id,value) {
    if (!['','sure','review','unanswered'].includes(value)) return;
    item(id).mark = value; action(); save();
  }
  function queue(mode='all',chapter='all') {
    return Object.values(catalog).filter(q => {
      if (chapter !== 'all' && q.chapter !== chapter) return false;
      const e = entry(q.id), flags = {wrong:!!current(e)&&!e.latest.correct,skipped:!!e.skipped,marked:e.mark==='review'||e.mark==='unanswered',unattempted:q.source&&!e.attempted};
      return mode==='all'?Object.values(flags).some(Boolean):flags[mode];
    }).map(q => q.id);
  }
  function stats(now = new Date()) {
    const summarize = qs => {
      const attempted = qs.filter(q=>entry(q.id).attempted).length;
      const graded = qs.filter(q=>current(entry(q.id)));
      const correct = graded.filter(q=>entry(q.id).latest.correct).length;
      return {total:qs.length,attempted,graded:graded.length,correct,rate:graded.length?Math.round(100*correct/graded.length):null};
    };
    const all = Object.values(catalog), byChapter = window.VLDC_CHAPTERS.map(ch=>({...summarize(all.filter(q=>q.chapter===ch.id)),id:ch.id,title:ch.title}));
    const byTopic = window.VLDC_CHAPTERS.flatMap(ch => topics[ch.id].map(topic => ({...summarize(all.filter(q=>q.chapter===ch.id&&q.topic===topic)),chapter:ch.id,topic})));
    const days = Object.entries(data.days).filter(([,d])=>d.actions>0||d.seconds>=30).map(([d])=>d).sort();
    const active = new Set(days), cursor = new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);
    if (!active.has(dateKey(cursor))) cursor.setDate(cursor.getDate()-1);
    let streak = 0;
    while (active.has(dateKey(cursor))) { streak++; cursor.setDate(cursor.getDate()-1); }
    return {...summarize(all),byChapter,byTopic,streak,days:days.length,seconds:Object.values(data.days).reduce((n,d)=>n+d.seconds,0),
      repeated:all.filter(q=>count(entry(q.id).wrong)>=2).sort((a,b)=>entry(b.id).wrong-entry(a.id).wrong),
      stale:all.filter(q=>entry(q.id).latest&&!current(entry(q.id))).length};
  }
  // Import old work without fabricating dates, time or earlier attempts.
  if (!data.migrated) {
    try {
      const old = JSON.parse(localStorage.getItem('vldc-quiz-v1')) || {};
      Object.values(catalog).filter(q=>!q.source).forEach(q => {
        const st = old[q.chapter], n = q.number-1;
        if (!st || !/^[ABCD]$/.test(st.picks?.[n] || '')) return;
        const e = item(q.id); e.attempted = true; e.draft = {choice:st.picks[n]}; e.legacy = true;
        if (st.revision===REV && (st.checked?.[n]===true || st.submitted===true)) {
          const correct = st.picks[n]===q.answer;
          e.latest = {id:q.id,correct,revision:REV,at:null}; e.attempts = 1; e.wrong = correct?0:1;
        }
      });
      const source = JSON.parse(localStorage.getItem('vldc-source-practice-v1'))?.answers || {};
      Object.entries(source).forEach(([id,a]) => {
        if (!catalog[id] || !object(a)) return;
        const e = item(id); e.draft = {};
        ['choice','a','b','c','d'].forEach(k=>{if (['A','B','C','D','true','false'].includes(a[k])) e.draft[k] = a[k];});
        if (typeof a.response==='string' && a.response.trim()) e.attempted = true;
        if (Object.keys(e.draft).length) e.attempted = true;
        e.legacy = true;
      });
    } catch (_) { /* An inaccessible legacy save must not block the new page. */ }
    data.migrated = true; save();
  }
  function addTime(seconds,when = new Date()) {
    if (!Number.isFinite(seconds) || seconds<=0) return;
    const day = dateKey(when); data.days[day] ||= {seconds:0,actions:0};
    data.days[day].seconds = Math.min(86400,data.days[day].seconds+Math.min(15,Math.floor(seconds))); save();
  }
  // Count only foreground time within one minute of deliberate activity.
  let last = Date.now(), activeUntil = 0, remainder = 0;
  function tick() {
    const now = Date.now(), elapsed = Math.max(0,Math.min(now,activeUntil)-last);
    if (document.visibilityState==='visible' && document.hasFocus() && now-last<=20000) {
      remainder += elapsed/1000;
      if (remainder>=1) { const whole=Math.floor(remainder);addTime(whole,new Date(last));remainder-=whole; }
    }
    last = now;
  }
  ['pointerdown','keydown','scroll','input'].forEach(name => window.addEventListener(name,()=>{tick();activeUntil=Date.now()+60000;},{passive:true}));
  window.addEventListener('blur',()=>{tick();activeUntil=0;});
  document.addEventListener('visibilitychange',()=>{tick();if(document.hidden) activeUntil=0;});
  window.addEventListener('pagehide',tick);
  setInterval(tick,15000);
  window.addEventListener('storage',e=>{if(e.key===KEY){read();window.dispatchEvent(new Event('studychange'));}});
  window.StudyStore = {catalog,topics,quizId,entry,current,grade,parseNumber,draft,record,recordExam,begin,skip,mark,queue,stats,dateKey,addTime,
    storageMessage:()=>unavailable?'Trình duyệt không lưu được tiến độ. Dữ liệu hiện chỉ tồn tại trong phiên đang mở.':'Tiến độ lưu trên trình duyệt này; chưa đồng bộ giữa thiết bị.'};
})();
