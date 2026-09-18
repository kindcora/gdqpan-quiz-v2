(function () {
  const LETTERS = ["A", "B", "C", "D"];
  const STORE = "gdqpan-session-v2";
  // Parsing damage: option B contains part of the stem; source Word is not in this repo.
  // Retain the original record for review, but do not score it until verified.
  const NEEDS_REVIEW = new Set(["hp1-194"]);

  const el = {
    main: document.getElementById("main"),
    status: document.getElementById("statusLine"),
    commandForm: document.getElementById("commandForm"),
    commandInput: document.getElementById("commandInput"),
    sourceFilter: document.getElementById("sourceFilter"),
    lessonFilter: document.getElementById("lessonFilter"),
  };

  let bank = [];
  let spelling = [];
  let session = null;
  let examTimer = null;
  let learned = {}, storageWarning = false;
  const PROGRESS = "gdqpan-progress-v1", PREFS = "gdqpan-filters-v1";

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applySpelling(text) {
    let t = String(text || "");
    let fixed = false;
    spelling.forEach(function (pair) {
      const from = pair[0];
      const to = pair[1];
      if (from && t.indexOf(from) !== -1) {
        t = t.split(from).join(to);
        fixed = true;
      }
    });
    return { text: t, fixed: fixed };
  }

  function prepareQuestion(raw) {
    const stem = applySpelling(raw.stem);
    const choices = {};
    let fixed = !!raw.spellingFixed || stem.fixed;
    LETTERS.forEach(function (k) {
      const c = applySpelling(raw.choices[k]);
      choices[k] = c.text;
      if (c.fixed) fixed = true;
    });
    return Object.assign({}, raw, {
      stem: stem.text,
      choices: choices,
      spellingFixed: fixed,
    });
  }

  function shuffleChoices(q) {
    // Keep references such as "cả ba phương án trên" meaningful.
    const references = /(?:phương án|đáp án|câu)\s+[A-D]\b|\b[A-D]\s*[,;+/]\s*[A-D]\b|\b[A-D]\s+(?:và|hoặc)\s+[A-D]\b|(?:cả|tất cả|các).{0,35}(?:trên|đều|phương án|đáp án)|cả (?:ba|hai|3|2)/i;
    const order = references.test(q.stem + " " + Object.values(q.choices).join(" ")) ? LETTERS.slice() : shuffle(LETTERS);
    const display = {};
    const toOriginal = {};
    const toDisplay = {};
    LETTERS.forEach(function (disp, i) {
      const orig = order[i];
      display[disp] = q.choices[orig];
      toOriginal[disp] = orig;
      toDisplay[orig] = disp;
    });
    return { display: display, toOriginal: toOriginal, toDisplay: toDisplay };
  }

  function needsTextbook(q) {
    const blob = q.stem + " " + LETTERS.map(function (k) { return q.choices[k]; }).join(" ");
    return /\d{4}|Điều\s+\d+|Nghị định|Chương\s+\d+|%|cm3|BLHS|Luật\s|Nghị quyết/i.test(blob);
  }

  function explain(q) {
    const items = ["Ngân hàng gốc không có lời giải chi tiết. Đáp án được đối chiếu theo file nguồn."];
    if (needsTextbook(q)) items.push("Với năm, điều luật và số liệu, hãy đối chiếu giáo trình đang học.");
    return items;
  }

  function memoryNote(q) {
    const words = String(q.choices[q.answer] || "")
      .replace(/[.,;:]+$/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 15);
    return words.join(" ");
  }

  function currentFilters() {
    return {
      source: el.sourceFilter.value,
      lesson: el.lessonFilter.value,
      keyword: document.getElementById("keywordFilter").value,
      practice: document.getElementById("practiceFilter").value,
    };
  }

  function normalizeText(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[,.;:!?()"""''\-–—/]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function filteredBank(extraKeyword) {
    const f=currentFilters(), query=[f.keyword,extraKeyword].filter(Boolean).join(' ');
    return bank.filter(q=>{
      if(NEEDS_REVIEW.has(q.id)||(f.source!=='ALL'&&q.source!==f.source)||(f.lesson!=='ALL'&&q.lesson!==f.lesson))return false;
      const e=learned[q.id]||{};
      if(f.practice==='new'&&e.attempted)return false;
      if(f.practice==='wrong'&&e.correct!==false)return false;
      if(f.practice==='correct'&&e.correct!==true)return false;
      if(f.practice==='skipped'&&!e.skipped)return false;
      return ExamTools.matches(q.originalIndex+' '+q.lesson+' '+q.stem+' '+Object.values(q.choices).join(' '),query);
    });
  }

  function recordLearning(q,correct) {
    const e=learned[q.id]||{};
    learned[q.id]={attempted:e.attempted||correct!==null,correct:correct===null?e.correct:correct,skipped:correct===null,attempts:(e.attempts||0)+(correct===null?0:1)};
    try{localStorage.setItem(PROGRESS,JSON.stringify(learned));}catch(_){storageWarning=true;}
  }
  function loadLearning() {
    try{const raw=JSON.parse(localStorage.getItem(PROGRESS));if(raw&&typeof raw==='object')bank.forEach(q=>{const e=raw[q.id];if(e&&typeof e==='object')learned[q.id]={attempted:e.attempted===true,correct:typeof e.correct==='boolean'?e.correct:undefined,skipped:e.skipped===true,attempts:Number.isSafeInteger(e.attempts)&&e.attempts>=0?e.attempts:0};});}catch(_){}
  }
  function savePreferences() {
    try{localStorage.setItem(PREFS,JSON.stringify({...currentFilters(),count:document.getElementById('examCount').value,minutes:document.getElementById('examMinutes').value,distribution:document.getElementById('examDistribution').value}));}catch(_){storageWarning=true;}
  }
  function loadPreferences() {
    try{
      const p=JSON.parse(localStorage.getItem(PREFS));if(!p)return;
      el.sourceFilter.value=['ALL','HP1','HP2'].includes(p.source)?p.source:'ALL';fillLessons();
      if([...el.lessonFilter.options].some(o=>o.value===p.lesson))el.lessonFilter.value=p.lesson;
      document.getElementById('keywordFilter').value=typeof p.keyword==='string'?p.keyword.slice(0,200):'';
      document.getElementById('practiceFilter').value=['all','new','wrong','correct','skipped'].includes(p.practice)?p.practice:'all';
      if(Number(p.count)>=1&&Number(p.count)<=419)document.getElementById('examCount').value=p.count;
      if(Number(p.minutes)>=1&&Number(p.minutes)<=180)document.getElementById('examMinutes').value=p.minutes;
      document.getElementById('examDistribution').value=p.distribution==='random'?'random':'balanced';
    }catch(_){}
  }
  function updateFilterSummary() {
    const pool=filteredBank(),n=Number(document.getElementById('examCount').value),minutes=Number(document.getElementById('examMinutes').value);
    document.getElementById('filterCount').textContent=pool.length+' câu phù hợp'+(storageWarning?' · Trình duyệt chưa lưu được thay đổi.':'');
    const valid=Number.isInteger(n)&&n>0&&n<=419&&Number.isInteger(minutes)&&minutes>0&&minutes<=180;
    document.getElementById('examPreview').textContent=!pool.length?'Không có câu phù hợp. Xóa hoặc nới bộ lọc để tạo đề.':!valid?'Nhập 1–419 câu và 1–180 phút.':'Đề sẽ có '+Math.min(n,pool.length)+' câu · '+minutes+' phút'+(n>pool.length?' (bộ lọc chỉ có '+pool.length+' câu).':'.')+' Mỗi câu tính điểm như nhau; không trừ điểm câu sai.';
    document.getElementById('startConfiguredExam').disabled=!valid||!pool.length||session?.kind==='exam';
  }
  function openExamSetup() {
    document.getElementById('examSetup').open=true;updateFilterSummary();
    document.getElementById('examSetup').scrollIntoView({block:'start'});document.getElementById('examCount').focus({preventScroll:true});
    if(session?.kind==='exam')setStatus('Bài thi đang chạy. Nộp bài hiện tại trước khi tạo đề mới.');
  }

  function save() {
    try {
      const copy = JSON.parse(JSON.stringify(session));
      localStorage.setItem(STORE, JSON.stringify(copy));
    } catch (e) { storageWarning=true; setStatus("Trình duyệt không lưu được bài. Hãy giữ trang này mở cho đến khi nộp."); }
  }

  function setStatus(text) {
    el.status.textContent = text || "";
  }

  function wrongOriginals() {
    return ((session && session.history) || [])
      .filter(function (h) { return !h.correct; })
      .map(function (h) { return h.source + "-" + h.originalIndex; });
  }

  function remainingCount() {
    if (!session || !session.queue) return 0;
    return session.queue.length;
  }

  function pickNext() {
    if (!session.queue.length) return null;
    if (session.preferLesson && !session.sequential) {
      const idx = session.queue.findIndex(function (q) { return q.lesson === session.preferLesson; });
      if (idx >= 0) {
        return session.queue.splice(idx, 1)[0];
      }
      session.preferLesson = null;
    }
    return session.queue.shift();
  }

  function startDrill(list, modeLabel, sequential) {
    if (!list.length) { setStatus("Không có câu phù hợp. Hãy đổi bộ lọc hoặc số câu bắt đầu."); return; }
    clearInterval(examTimer);
    examTimer = null;
    const pool = list.slice();
    session = {
      kind: "drill",
      filters: currentFilters(),
      modeLabel: modeLabel,
      sequential: !!sequential,
      queue: sequential ? pool : shuffle(pool),
      current: null,
      shuffled: null,
      answered: false,
      sessionIndex: 0,
      history: [],
      preferLesson: null,
      sinceCheckpoint: 0,
    };
    nextQuestion();
  }

  function nextQuestion() {
    if (!session.queue.length) {
      showSummary(true);
      return;
    }
    session.current = pickNext();
    session.shuffled = shuffleChoices(session.current);
    session.answered = false;
    session.sessionIndex += 1;
    save();
    renderDrill();
    focusQuestion();
  }

  function gradeChoice(displayLetter) {
    if (!session || session.kind !== "drill" || session.answered || !LETTERS.includes(displayLetter)) return;
    const q = session.current;
    const original = session.shuffled.toOriginal[displayLetter];
    const correct = original === q.answer;
    session.answered = true;
    session.sinceCheckpoint += 1;
    session.history.push({
      id: q.id,
      source: q.source,
      originalIndex: q.originalIndex,
      lesson: q.lesson,
      display: displayLetter,
      originalPicked: original,
      correct: correct,
    });
    recordLearning(q,correct);
    updateFilterSummary();
    session.preferLesson = correct ? null : q.lesson;
    save();
    renderDrill(displayLetter, correct);
  }

  function choiceHtml(letter, text, extraClass, tag, extraAttr) {
    const t = tag || "button";
    const cls = "choice" + (extraClass ? " " + extraClass : "");
    const open = t === "button"
      ? '<button type="button" class="' + cls + '" data-choice="' + letter + '"' + (extraAttr || "") + ">"
      : '<label class="' + cls + '">';
    const close = t === "button" ? "</button>" : "</label>";
    return open + '<span class="key">' + letter + '</span><span class="txt">' + escapeHtml(text) + "</span>" + close;
  }

  function renderDrill(picked, correct) {
    const q = session.current;
    if (!q) return;
    if (session.answered) {
      const last = session.history[session.history.length - 1];
      picked = last.display;
      correct = last.correct;
    }
    const sh = session.shuffled;
    const spell = q.spellingFixed ? '<p class="note-spell">Đã sửa chính tả rõ ràng</p>' : "";
    const total = session.sessionIndex + session.queue.length;
    let html = '<article class="card quiz-card">';
    html += '<div class="progress-label"><span>' + escapeHtml(session.modeLabel) + '</span><strong>' + session.history.length + ' / ' + total + ' đã làm</strong></div>';
    html += '<progress max="' + total + '" value="' + session.history.length + '" aria-label="Tiến độ luyện tập"></progress>';
    html += '<div class="meta">';
    html += '<p class="badge">' + q.source + " · Câu <strong>" + q.originalIndex + "</strong> · " + session.sessionIndex + "</p>";
    html += '<p class="lesson">' + escapeHtml(q.lesson) + "</p>";
    html += "</div>";
    html += '<h2 class="stem" tabindex="-1">' + escapeHtml(q.stem) + "</h2>";
    html += '<p class="hint">Chọn một đáp án · không giới hạn thời gian<span class="keyboard-hint"> · phím A–D</span></p>';
    html += '<div class="choices">';
    LETTERS.forEach(function (d) {
      let extra = "";
      if (session.answered) {
        const orig = sh.toOriginal[d];
        if (orig === q.answer) extra = "correct";
        if (picked === d && !correct) extra = "wrong";
      }
      html += choiceHtml(d, sh.display[d], extra, "button", session.answered ? " disabled" : "");
    });
    html += "</div>" + spell;

    if (session.answered) {
      html += '<div role="status" class="result ' + (correct ? "ok" : "bad") + '">';
      html += "<h2>" + (correct ? "Đúng" : "Sai") + "</h2>";
      html += '<p class="pair">Đáp án đúng: <strong>' + sh.toDisplay[q.answer] + '</strong> · Bạn chọn: ' + picked + '</p><p>' + escapeHtml(q.choices[q.answer]) + '</p>';
      html += "<ul class='explain'>";
      explain(q).forEach(function (line) {
        html += "<li>" + escapeHtml(line) + "</li>";
      });
      html += "</ul>";
      html += '<p class="memory">Ghi nhớ · ' + escapeHtml(memoryNote(q)) + "</p>";
      html += "</div>";
      if (session.sinceCheckpoint >= 5 && session.queue.length) {
        html += checkpointBlock();
      } else {
        html += '<div class="actions"><button type="button" class="btn btn-primary" id="btnNext">' + (session.queue.length ? 'Câu tiếp theo →' : 'Xem tổng kết') + '</button></div>';
      }
    }
    html += "</article>";
    el.main.innerHTML = html;
    setStatus(session.modeLabel + " · còn " + remainingCount() + " · đã làm " + session.history.length);

    if (!session.answered) {
      el.main.querySelectorAll("[data-choice]").forEach(function (btn) {
        btn.addEventListener("click", function () { gradeChoice(btn.getAttribute("data-choice")); });
      });
    } else if (session.sinceCheckpoint >= 5 && session.queue.length) {
      bindCheckpoint();
    } else {
      const n = document.getElementById("btnNext");
      if (n) n.addEventListener("click", function () { nextQuestion(); });
    }
  }

  function checkpointBlock() {
    const h = session.history;
    const right = h.filter(function (x) { return x.correct; }).length;
    const wrong = h.length - right;
    const pct = h.length ? Math.round((right / h.length) * 100) : 0;
    const wrongIds = h.filter(function (x) { return !x.correct; }).map(function (x) {
      return x.source + " câu " + x.originalIndex;
    });
    let html = '<div class="result"><h2>Tiến độ cả vòng</h2>';
    html += '<div class="table-wrap"><table><thead><tr><th>Làm</th><th>Đúng</th><th>Sai</th><th>%</th><th>Câu gốc sai</th></tr></thead><tbody>';
    html += "<tr><td>" + h.length + "</td><td>" + right + "</td><td>" + wrong + "</td><td>" + pct + "</td><td>" + wrong + "</td></tr>";
    html += "</tbody></table></div>";
    html += '<p class="pair">Câu gốc bị sai: ' + (wrongIds.length ? wrongIds.join("; ") : "không") + "</p>";
    html += '<div class="actions">';
    html += '<button type="button" class="btn btn-primary" data-cp="tiep">Tiếp</button>';
    html += '<button type="button" class="btn btn-ghost" data-cp="sai">Chỉ câu sai</button>';
    html += '<button type="button" class="btn btn-ghost" data-cp="het">Hết vòng</button>';
    html += "</div></div>";
    return html;
  }

  function bindCheckpoint() {
    el.main.querySelectorAll("[data-cp]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const a = btn.getAttribute("data-cp");
        session.sinceCheckpoint = 0;
        if (a === "sai") {
          runCommand("chỉ câu sai");
        } else if (a === "het") {
          showSummary(false);
        } else {
          nextQuestion();
        }
      });
    });
  }

  function showSummary(finishedBank) {
    if (!session) { setStatus("Bạn chưa bắt đầu làm bài."); return; }
    if (session.kind === "exam") { requestSubmitExam(); return; }
    if (examTimer) {
      clearInterval(examTimer);
      examTimer = null;
    }
    const h = (session && session.history) ? session.history : [];
    const right = h.filter(function (x) { return x.correct; }).length;
    const wrong = h.filter(function (x) { return !x.correct; });
    const pct = h.length ? Math.round((right / h.length) * 100) : 0;
    let html = '<article class="card hero">';
    html += "<h2>" + (finishedBank ? "Hết vòng" : "Tổng kết") + "</h2>";
    html += "<p>Làm " + h.length + " · Đúng " + right + " · Sai " + wrong.length + " · " + pct + "%</p>";
    html += '<p class="pair">Câu gốc đã sai: ' + (wrong.length ? wrong.map(function (x) { return x.source + " #" + x.originalIndex; }).join(", ") : "không") + "</p>";
    html += '<div class="actions">';
    html += '<button type="button" class="btn btn-primary" data-end="sai">Chỉ câu sai</button>';
    html += '<button type="button" class="btn btn-ghost" data-end="moi">Xáo vòng mới</button>';
    html += "</div></article>";
    el.main.innerHTML = html;
    setStatus("Đã dừng. Dùng lệnh bắt đầu hoặc chỉ câu sai.");
    session.kind = "summary";
    save();
    el.main.querySelectorAll("[data-end]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        runCommand(btn.getAttribute("data-end") === "sai" ? "chỉ câu sai" : "bắt đầu");
      });
    });
  }

  function startExam(n, minutes) {
    if (!Number.isSafeInteger(n) || n < 1 || n > bank.length || !Number.isSafeInteger(minutes) || minutes < 1 || minutes > 180) {
      setStatus("Đề cần từ 1 đến " + bank.length + " câu, thời gian từ 1 đến 180 phút."); return;
    }
    const pool = ExamTools.sample(filteredBank(),n,document.getElementById("examDistribution").value==="balanced",q=>q.source+" / "+q.lesson);
    if (!pool.length) {
      setStatus("Không còn câu khớp bộ lọc.");
      return;
    }
    const items = pool.slice(0, Math.min(n, pool.length)).map(function (q) {
      return { q: q, shuffled: shuffleChoices(q), picked: null, flagged:false };
    });
    session = {
      kind: "exam",
      filters: currentFilters(),
      modeLabel: "Đề " + items.length + " câu " + minutes + " phút",
      items: items,
      minutes: minutes,
      startedAt: Date.now(),
      view:"all",
      endsAt: Date.now() + minutes * 60 * 1000,
      history: [],
    };
    updateFilterSummary();
    save();
    renderExam();
    focusQuestion();
    startExamTimer();
  }

  function startExamTimer() {
    clearInterval(examTimer);
    if (Date.now() >= session.endsAt) { finishExam(); return; }
    examTimer = setInterval(function () {
      if (!session || session.kind !== "exam") {
        clearInterval(examTimer);
        return;
      }
      if (Date.now() >= session.endsAt) {
        finishExam();
      } else {
        const t = document.getElementById("examTimer");
        if (t) t.textContent = formatRemain();
      }
    }, 500);
  }

  function formatRemain() {
    const ms = Math.max(0, session.endsAt - Date.now());
    const s = Math.ceil(ms / 1000);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function renderExam() {
    let html = '<article class="card">';
    html += '<div class="exam-toolbar"><span class="timer" id="examTimer" aria-label="Thời gian còn lại">' + formatRemain() + '</span><span id="examProgress"></span><button type="button" class="btn btn-primary" id="submitTop">Nộp bài</button></div><nav class="question-map" aria-label="Đi đến câu hỏi">' + session.items.map(function (_, i) { return '<a href="#exam-q-' + i + '" data-jump="' + i + '">' + (i + 1) + '</a>'; }).join('') + '</nav>';
    html += '<p class="pair">Đáp án ẩn đến khi nộp. Đồng hồ tiếp tục chạy khi tải lại hoặc rời trang. Gạch vàng: câu đã đánh dấu.</p>';
    html += '<label class="exam-view-label">Hiển thị câu hỏi<select id="examView"><option value="all">Tất cả câu</option><option value="blank">Chưa trả lời</option><option value="flagged">Đã đánh dấu</option></select></label><button class="btn" id="nextBlank">Đến câu chưa trả lời</button><p data-exam-empty class="exam-empty" hidden>Không có câu thuộc nhóm này.</p>';
    session.items.forEach(function (item, i) {
      const q = item.q;
      html += '<section class="exam-q" id="exam-q-' + i + '" role="group" aria-labelledby="exam-title-' + i + '">';
      html += '<div class="meta"><p class="badge">' + q.source + " · Câu <strong>" + q.originalIndex + "</strong> · " + (i + 1) + "</p></div>";
      html += '<h2 class="stem" id="exam-title-' + i + '" tabindex="-1">' + escapeHtml(q.stem) + "</h2>";
      html += '<div class="choices">';
      LETTERS.forEach(function (d) {
        const checked = item.picked === d ? " checked" : "";
        html += '<label class="choice"><input type="radio" name="ex' + i + '" value="' + d + '"' + checked + ">";
        html += '<span class="key">' + d + '</span><span class="txt">' + escapeHtml(item.shuffled.display[d]) + "</span></label>";
      });
      html += '</div><button class="btn exam-flag" data-exam-flag="'+i+'" aria-pressed="'+String(!!item.flagged)+'">'+(item.flagged?'★ Đã đánh dấu':'☆ Đánh dấu xem lại')+'</button></section>';
    });
    html += '<div class="actions"><button type="button" class="btn btn-primary" id="btnSubmitExam">Nộp bài</button></div>';
    html += "</article>";
    el.main.innerHTML = html;
    setStatus(session.modeLabel + " · nộp hết rồi mới chấm");
    session.items.forEach(function (item, i) {
      el.main.querySelectorAll('input[name="ex' + i + '"]').forEach(function (inp) {
        inp.addEventListener("change", function () {
          if (Date.now() >= session.endsAt) { finishExam(); return; }
          item.picked = inp.value;
          save();
          updateExamProgress();
        });
      });
    });
    document.getElementById("btnSubmitExam").addEventListener("click", requestSubmitExam);
    document.getElementById("submitTop").addEventListener("click", requestSubmitExam);
    const view=document.getElementById('examView');view.value=session.view||'all';
    view.onchange=()=>{session.view=view.value;save();applyExamView();};
    document.getElementById('nextBlank').onclick=()=>{
      const index=session.items.findIndex(it=>!it.picked);
      if(index<0){setStatus('Bạn đã trả lời tất cả câu.');return;}
      session.view='blank';view.value='blank';save();applyExamView();
      document.getElementById('exam-title-'+index).focus({preventScroll:true});document.getElementById('exam-q-'+index).scrollIntoView({block:'start'});
    };
    el.main.querySelectorAll('[data-exam-flag]').forEach(btn=>btn.onclick=()=>{
      if(Date.now()>=session.endsAt){finishExam();return;}
      const item=session.items[Number(btn.dataset.examFlag)];item.flagged=!item.flagged;
      btn.setAttribute('aria-pressed',String(item.flagged));btn.textContent=item.flagged?'★ Đã đánh dấu':'☆ Đánh dấu xem lại';save();updateExamProgress();
    });
    el.main.querySelectorAll('[data-jump]').forEach(a=>a.onclick=e=>{
      e.preventDefault();const i=Number(a.dataset.jump);session.view='all';view.value='all';save();applyExamView();
      document.getElementById('exam-title-'+i).focus({preventScroll:true});document.getElementById('exam-q-'+i).scrollIntoView({block:'start'});
    });
    updateExamProgress();applyExamView();
  }

  function applyExamView() {
    let shown=0;
    session.items.forEach((item,i)=>{const visible=session.view==='blank'?!item.picked:session.view==='flagged'?!!item.flagged:true;document.getElementById('exam-q-'+i).hidden=!visible;if(visible)shown++;});
    el.main.querySelector('[data-exam-empty]').hidden=shown>0;
  }

  function updateExamProgress() {
    const done = session.items.filter(function (item) { return item.picked; }).length;
    document.getElementById("examProgress").textContent = done + "/" + session.items.length + " đã chọn";
    el.main.querySelectorAll("[data-jump]").forEach(function (a, i) {
      a.classList.toggle("is-answered", !!session.items[i].picked);
      a.classList.toggle("is-flagged", !!session.items[i].flagged);
      a.setAttribute("aria-label", "Câu " + (i + 1) + (session.items[i].picked ? ", đã chọn" : ", chưa chọn")+(session.items[i].flagged?", đã đánh dấu":""));
    });
  }

  function requestSubmitExam() {
    const blank = session.items.filter(function (item) { return !item.picked; }).length;
    if (blank && !confirm("Còn " + blank + " câu chưa chọn. Bạn muốn nộp bài?")) return;
    finishExam();
  }

  function finishExam() {
    if (examTimer) {
      clearInterval(examTimer);
      examTimer = null;
    }
    if (!session || !["exam", "examDone"].includes(session.kind)) return;
    const first=session.kind==="exam";
    if(first)session.finishedAt=Math.min(Date.now(),session.endsAt);
    session.history = session.items.map(function (item) {
      const original = item.picked ? item.shuffled.toOriginal[item.picked] : null;
      return {
        id: item.q.id,
        source: item.q.source,
        originalIndex: item.q.originalIndex,
        lesson: item.q.lesson,
        display: item.picked,
        originalPicked: original,
        correct: original === item.q.answer,
      };
    });
    if(!session.progressRecorded){session.history.forEach(h=>recordLearning(bank.find(q=>q.id===h.id),h.originalPicked?h.correct:null));session.progressRecorded=true;}
    const statuses=session.history.map(h=>!h.originalPicked?'blank':h.correct?'correct':'wrong'),stats=ExamTools.summary(statuses);
    let html = '<article class="card"><h2>Kết quả đề</h2>';
    html+='<div class="exam-metrics"><div><b>'+stats.score+'/10</b><span>Điểm</span></div><div><b>'+stats.correct+'</b><span>Đúng</span></div><div><b>'+stats.wrong+'</b><span>Sai</span></div><div><b>'+stats.blank+'</b><span>Bỏ trống</span></div></div>';
    if(session.startedAt&&session.finishedAt)html+='<p class="hint">Thời gian làm: '+Math.max(0,Math.round((session.finishedAt-session.startedAt)/1000))+' giây.</p>';
    const groups=[...new Set(session.items.map(it=>it.q.source))];
    html+='<table class="exam-breakdown"><caption>Kết quả theo học phần</caption><thead><tr><th>Học phần</th><th>Đúng / tổng</th></tr></thead><tbody>'+groups.map(g=>'<tr><td>'+escapeHtml(g)+'</td><td>'+session.history.filter(h=>h.source===g&&h.correct).length+' / '+session.history.filter(h=>h.source===g).length+'</td></tr>').join('')+'</tbody></table>';
    html+='<label class="exam-view-label">Xem kết quả<select id="examResultView"><option value="all">Tất cả câu</option><option value="wrong">Chỉ câu sai</option><option value="blank">Câu bỏ trống</option><option value="correct">Câu đúng</option><option value="flagged">Câu đã đánh dấu</option></select></label><p data-exam-empty class="exam-empty" hidden>Không có câu thuộc nhóm này.</p>';

    const right = session.history.filter(function (x) { return x.correct; }).length;
    html += "<p>Đúng " + right + "/" + session.history.length + " (" + Math.round(100 * right / session.history.length) + "%)</p>";
    session.items.forEach(function (item, i) {
      const q = item.q;
      const h = session.history[i];
      html += '<section class="exam-q" id="exam-q-' + i + '" role="group" aria-labelledby="exam-title-' + i + '">';
      html += '<p class="badge">' + q.source + " · Câu <strong>" + q.originalIndex + "</strong> · " + (!h.originalPicked ? "Bỏ trống" : h.correct ? "Đúng" : "Sai") + "</p>";
      html += '<h2 class="stem" id="exam-title-' + i + '" tabindex="-1">' + escapeHtml(q.stem) + "</h2>";
      html += '<p class="pair">Đáp án đúng: <strong>' + item.shuffled.toDisplay[q.answer] + '</strong> · Bạn chọn: ' + (item.picked || 'Chưa chọn') + '</p><div class="choices">' + LETTERS.map(function (d) { return choiceHtml(d, item.shuffled.display[d], item.shuffled.toOriginal[d] === q.answer ? 'correct' : (d === item.picked ? 'wrong' : ''), 'button', ' disabled'); }).join('') + '</div>';
      html += "<ul class='explain'>";
      explain(q).forEach(function (line) { html += "<li>" + escapeHtml(line) + "</li>"; });
      html += "</ul>";
      html += '<p class="memory">Ghi nhớ · ' + escapeHtml(memoryNote(q)) + "</p>";
      html += "</section>";
    });
    html += '<div class="actions"><button type="button" class="btn btn-primary" data-end="moi">Xáo vòng mới</button>';
    html += '<button type="button" class="btn btn-ghost" data-end="sai">Chỉ câu sai</button></div></article>';
    el.main.innerHTML = html;
    session.kind = "examDone";
    updateFilterSummary();
    save();
    setStatus("Đã chấm đề · " + session.items.filter(function (item) { return !item.picked; }).length + " câu bỏ trống.");
    const resultView=document.getElementById('examResultView');
    resultView.onchange=()=>{let shown=0;session.items.forEach((item,i)=>{const visible=resultView.value==='all'||(resultView.value==='flagged'?item.flagged:statuses[i]===resultView.value);document.getElementById('exam-q-'+i).hidden=!visible;if(visible)shown++;});el.main.querySelector('[data-exam-empty]').hidden=shown>0;};
    focusQuestion();
    el.main.querySelectorAll("[data-end]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        runCommand(btn.getAttribute("data-end") === "sai" ? "chỉ câu sai" : "bắt đầu");
      });
    });
  }

  function reviewOriginal(n, sourceHint) {
    const list = bank.filter(function (q) {
      if (q.originalIndex !== n) return false;
      if (sourceHint && q.source !== sourceHint) return false;
      const f = currentFilters();
      if (f.source !== "ALL" && q.source !== f.source) return false;
      return true;
    });
    if (!list.length) {
      setStatus("Không thấy câu gốc " + n + " trong bộ lọc hiện tại.");
      return;
    }
    let html = "";
    list.forEach(function (q) {
      html += '<article class="card">';
      html += '<div class="meta"><p class="badge">Xem lại · ' + q.source + " · Câu <strong>" + q.originalIndex + "</strong></p></div>";
      html += '<p class="lesson">' + escapeHtml(q.lesson) + "</p>";
      html += '<h2 class="stem" tabindex="-1">' + escapeHtml(q.stem) + "</h2>";
      html += '<div class="choices">';
      LETTERS.forEach(function (k) {
        html += choiceHtml(k, q.choices[k], k === q.answer ? "correct" : "", "button", " disabled");
      });
      html += "</div>";
      if (NEEDS_REVIEW.has(q.id)) html += '<p class="memory" role="status">Câu này bị lỗi tách đề và lựa chọn, đang tạm loại khỏi luyện tập và thi thử. Cần đối chiếu file Word gốc trước khi sử dụng đáp án.</p>';
      html += '<p class="pair">Đáp án file ' + q.answer + "</p><ul class='explain'>";
      explain(q).forEach(function (line) { html += "<li>" + escapeHtml(line) + "</li>"; });
      html += "</ul><p class='memory'>Ghi nhớ · " + escapeHtml(memoryNote(q)) + "</p>";
      html += "</article>";
    });
    el.main.innerHTML = html;
    setStatus("Đã hiện đáp án câu gốc " + n + ".");
    if (session && session.kind === "drill") {
      el.main.insertAdjacentHTML("beforeend", '<div class="actions"><button type="button" class="btn btn-primary" id="backToDrill">Quay lại bài đang luyện</button></div>');
      document.getElementById("backToDrill").onclick = function () { renderDrill(); focusQuestion(); };
    }
  }

  function fillLessons() {
    const src = el.sourceFilter.value;
    const lessons = [];
    const seen = {};
    bank.forEach(function (q) {
      if (src !== "ALL" && q.source !== src) return;
      if (!seen[q.lesson]) {
        seen[q.lesson] = true;
        lessons.push(q.lesson);
      }
    });
    const prev = el.lessonFilter.value;
    el.lessonFilter.innerHTML = '<option value="ALL">Tất cả bài</option>' +
      lessons.map(function (l) {
        const count=bank.filter(q=>!NEEDS_REVIEW.has(q.id)&&q.lesson===l&&(src==="ALL"||q.source===src)).length;
        const label = l+" ("+count+" câu)";
        return '<option value="' + escapeHtml(l) + '">' + escapeHtml(label) + "</option>";
      }).join("");
    if (lessons.indexOf(prev) >= 0) el.lessonFilter.value = prev;
  }

  function runCommand(raw) {
    const text = String(raw || "").trim();
    if (!text) return;
    const lower = text.toLowerCase();
    if (session && session.kind === "exam" && !/^(dừng|dung|còn bao nhiêu|con bao nhieu)$/.test(lower)) {
      setStatus("Bạn đang làm đề. Hãy nộp bài trước khi đổi chế độ hoặc xem đáp án."); return;
    }
    if (session && session.kind === "drill" && /^(bắt đầu|bat dau|tuần tự|tuan tu|chỉ câu sai|chi cau sai|từ câu|tu cau|đề |de |chương |chuong |từ khóa |tu khoa )/.test(lower)) {
      if (!confirm("Bắt đầu vòng mới sẽ thay thế tiến độ vòng hiện tại. Tiếp tục?")) return;
    }

    if (lower === "bắt đầu" || lower === "bat dau") {
      startDrill(filteredBank(), "Xáo cả kho", false);
      return;
    }
    if (lower === "tuần tự" || lower === "tuan tu") {
      startDrill(filteredBank(), "Tuần tự theo file", true);
      return;
    }
    if (lower === "chỉ câu sai" || lower === "chi cau sai") {
      const ids = {};
      wrongOriginals().forEach(function (k) { ids[k] = true; });
      const list = filteredBank().filter(function (q) { return ids[q.source + "-" + q.originalIndex]; });
      if (!list.length) {
        setStatus("Chưa có câu sai trong phiên này.");
        return;
      }
      startDrill(list, "Chỉ câu sai", false);
      return;
    }
    if (lower === "còn bao nhiêu" || lower === "con bao nhieu") {
      if (!session || session.kind !== "drill") {
        setStatus("Chưa có vòng luyện. Gõ bắt đầu. Ngân hàng lọc hiện tại: " + filteredBank().length + " câu.");
      } else {
        setStatus("Còn " + remainingCount() + " câu chưa ra trong vòng này.");
      }
      return;
    }
    if (lower === "dừng" || lower === "dung") {
      showSummary(false);
      return;
    }
    if (lower === "tiếp" || lower === "tiep") {
      if (session && session.kind === "drill" && session.answered) nextQuestion();
      else setStatus("Chưa có câu để tiếp.");
      return;
    }

    let m = lower.match(/^từ câu\s+(\d+)/) || lower.match(/^tu cau\s+(\d+)/);
    if (m) {
      const n = parseInt(m[1], 10);
      const list = filteredBank().filter(function (q) { return q.originalIndex >= n; });
      startDrill(list, "Từ câu " + n, true);
      return;
    }

    m = lower.match(/^xem lại câu\s+(\d+)/) || lower.match(/^xem lai cau\s+(\d+)/);
    if (m) {
      reviewOriginal(parseInt(m[1], 10), el.sourceFilter.value === "ALL" ? null : el.sourceFilter.value);
      return;
    }

    m = lower.match(/^đề\s+(\d+)\s+câu\s+(\d+)\s+phút/) || lower.match(/^de\s+(\d+)\s+cau\s+(\d+)\s+phut/);
    if (m) {
      startExam(parseInt(m[1], 10), parseInt(m[2], 10));
      return;
    }

    m = lower.match(/^(?:chương|chuong|từ khóa|tu khoa)\s+(.+)/);
    if (m) {
      const kw = m[1].trim();
      const list = filteredBank(kw);
      if (!list.length) {
        setStatus("Không có câu khớp: " + kw);
        return;
      }
      startDrill(list, "Lọc: " + kw, false);
      return;
    }

    setStatus("Không hiểu lệnh. Thử: bắt đầu, tuần tự, từ câu 10, chương biển đảo, đề 20 câu 15 phút.");
  }

  function bindUi() {
    el.commandForm.addEventListener("submit", function (e) {
      e.preventDefault();
      runCommand(el.commandInput.value);
    });
    document.querySelectorAll("[data-cmd]").forEach(function (btn) {
      btn.addEventListener("click", function () { runCommand(btn.getAttribute("data-cmd")); });
    });
    el.sourceFilter.addEventListener("change", function () { fillLessons(); filtersChanged(); });
    el.lessonFilter.addEventListener("change", filtersChanged);
    document.getElementById('keywordFilter').addEventListener('input',filtersChanged);
    document.getElementById('practiceFilter').addEventListener('change',filtersChanged);
    document.getElementById('clearFilters').onclick=()=>{el.sourceFilter.value='ALL';fillLessons();el.lessonFilter.value='ALL';document.getElementById('keywordFilter').value='';document.getElementById('practiceFilter').value='all';filtersChanged();};
    document.getElementById('openExamSetup').onclick=openExamSetup;
    document.getElementById('examSetupForm').onsubmit=e=>{e.preventDefault();runCommand('đề '+document.getElementById('examCount').value+' câu '+document.getElementById('examMinutes').value+' phút');};
    ['examCount','examMinutes','examDistribution'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{savePreferences();updateFilterSummary();}));
    document.querySelectorAll('[data-exam-preset]').forEach(btn=>btn.onclick=()=>{const [n,m]=btn.dataset.examPreset.split(',');document.getElementById('examCount').value=n;document.getElementById('examMinutes').value=m;savePreferences();updateFilterSummary();});

    document.addEventListener("keydown", function (e) {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (tag === "BUTTON" || e.ctrlKey || e.metaKey || e.altKey || e.repeat || e.target.isContentEditable) return;
      if (!session || session.kind !== "drill" || !el.main.querySelector(".quiz-card")) return;
      const k = String(e.key || "").toUpperCase();
      if (!session.answered && LETTERS.indexOf(k) >= 0) {
        e.preventDefault();
        gradeChoice(k);
        return;
      }
      if (session.answered && (e.key === "Enter" || e.key === " ")) {
        const next = document.getElementById("btnNext");
        if (next) {
          e.preventDefault();
          next.click();
        }
      }
    });
  }

  function focusQuestion() {
    const target = el.main.querySelector('.stem, h1, h2');
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    el.main.scrollIntoView({ block: 'start' });
  }

  function filtersChanged() {
    savePreferences();updateFilterSummary();
    if (!session) showHome();
    else setStatus("Bộ lọc mới có " + filteredBank().length + " câu; áp dụng khi bắt đầu vòng mới. Bài đang làm vẫn được giữ.");
  }

  function showHome() {
    el.main.innerHTML = '<article class="card hero home-hero"><p class="eyebrow">GÓC ÔN TẬP · GDQP &amp; AN</p>' +
      '<h1>Ôn từng câu.<br><span>Vững từng bài.</span></h1><p class="hero-copy">Luyện từ ngân hàng HP1 và HP2. Hiểu câu sai, theo dõi tiến độ và tự tin hơn trước kỳ thi.</p>' +
      '<div class="stats"><div class="stat"><b>' + bank.length + '</b><span>Câu hỏi gốc</span></div><div class="stat"><b>2</b><span>Học phần</span></div><div class="stat"><b>' + filteredBank().length + '</b><span>Khớp bộ lọc</span></div></div>' +
      '<div class="mode-grid"><button class="mode-card" data-home="bắt đầu"><span class="mode-number">01 / LUYỆN TẬP</span><strong>Luyện từng câu <span aria-hidden="true">↗</span></strong><span>Chấm ngay sau khi chọn. Ôn lại những câu chưa đúng.</span></button>' +
      '<button class="mode-card" data-home="setup"><span class="mode-number">02 / THI THỬ</span><strong>Thử sức với một đề <span aria-hidden="true">↗</span></strong><span>Chọn số câu, thời gian và phạm vi. Nộp bài rồi xem kết quả.</span></button></div>' +
      '<p class="home-note">Tiến độ tự lưu trên trình duyệt này · Không cần tài khoản</p><p class="home-note">1 câu (HP1 #194) tạm loại do lỗi tách dữ liệu, chờ đối chiếu bản gốc.</p></article>';
    el.main.querySelectorAll('[data-home]').forEach(function (btn) { btn.onclick = function () { if(btn.dataset.home==="setup")openExamSetup();else runCommand(btn.dataset.home); }; });
    setStatus("Chọn học phần và bài, sau đó chọn cách ôn tập.");
  }

  function restore() {
    try {
      const data = JSON.parse(localStorage.getItem(STORE));
      if (!data || !['drill', 'exam', 'examDone', 'summary'].includes(data.kind) || !Array.isArray(data.history)) return false;
      const validQ = function (q) { return q && !NEEDS_REVIEW.has(q.id) && bank.some(function (b) { return b.id === q.id && b.answer === q.answer && b.stem === q.stem && LETTERS.every(function (L) { return b.choices[L] === q.choices[L]; }); }); };
      const validShuffle = function (q, sh) { return sh && sh.toOriginal && sh.toDisplay && sh.display && new Set(Object.values(sh.toOriginal)).size === 4 && LETTERS.every(function (d) { const o = sh.toOriginal[d]; return LETTERS.includes(o) && sh.toDisplay[o] === d && sh.display[d] === q.choices[o]; }); };
      if (data.kind === 'drill' && (!validQ(data.current) || !validShuffle(data.current, data.shuffled) || !Array.isArray(data.queue) || !data.queue.every(validQ) || !Number.isSafeInteger(data.sessionIndex) || (data.answered && !data.history.length))) return false;
      if (['exam', 'examDone'].includes(data.kind) && (!Array.isArray(data.items) || !data.items.length || !Number.isFinite(data.endsAt) || !data.items.every(function (it) { return validQ(it.q) && validShuffle(it.q, it.shuffled) && (it.picked === null || LETTERS.includes(it.picked)); }))) return false;
      session = data;
      if (data.filters) { el.sourceFilter.value = ['ALL', 'HP1', 'HP2'].includes(data.filters.source) ? data.filters.source : 'ALL'; fillLessons(); if (Array.from(el.lessonFilter.options).some(function (o) { return o.value === data.filters.lesson; })) el.lessonFilter.value = data.filters.lesson; }
      if (session.kind === 'drill') renderDrill();
      else if (session.kind === 'exam') { renderExam(); startExamTimer(); }
      else if (session.kind === 'examDone') finishExam();
      else showSummary(false);
      return true;
    } catch (_) { session = null; return false; }
  }

  async function boot() {
    bindUi();
    spelling = Array.isArray(window.GDQPAN_SPELLING) ? window.GDQPAN_SPELLING : [];
    const raw = (window.GDQPAN_BANK && window.GDQPAN_BANK.questions) ? window.GDQPAN_BANK.questions : [];
    bank = raw.map(prepareQuestion);
    fillLessons();
    loadLearning();
    const restored=restore();loadPreferences();
    if(!restored)showHome();
    if(session?.history&&!Object.keys(learned).length)session.history.forEach(h=>{const q=bank.find(q=>q.id===h.id);if(q)recordLearning(q,h.originalPicked?h.correct:null);});
    updateFilterSummary();
  }

  boot();
})();
