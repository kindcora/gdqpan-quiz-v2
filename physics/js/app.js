(function () {
  const LETTERS = ["A", "B", "C", "D"];
  const LEVELS = { NB: "Nhận biết", TH: "Thông hiểu", VD: "Vận dụng", VDC: "Vận dụng cao" };

  const TAB_LABEL = { theory: "Lý thuyết", lab: "Lab 2D/3D", quiz: "Trắc nghiệm", essay: "Tự luận", source: "Bài tập gốc", lecture: "Bài giảng PDF", progress:"Tiến độ cá nhân", review:"Ôn câu sai", exam:"Thi thử" };

  const el = {
    nav: document.getElementById("chapterNav"),
    tabs: document.getElementById("tabNav"),
    main: document.getElementById("main"),
    status: document.getElementById("statusLine"),
  };

  const chapters = (window.VLDC_CHAPTERS || []).slice().sort(function (a, b) {
    return a.number - b.number;
  });

  let chapterId = (chapters[0] && chapters[0].id) || "ch01";
  let tab = "theory";
  let simHandles = [];
  const QUIZ_STORE = 'vldc-quiz-v1';
  const ANSWER_REVISION = '2026-09-12';
  const quizState = {};
  try {
    const saved = JSON.parse(localStorage.getItem(QUIZ_STORE));
    if (saved && typeof saved === 'object') chapters.forEach(function (ch) {
      const data = saved[ch.id];
      if (!data || !data.picks || !data.checked || typeof data.submitted !== 'boolean') return;
      const current = data.revision === ANSWER_REVISION;
      const state = { picks: {}, checked: {}, submitted: current && data.submitted, revision: ANSWER_REVISION, needsRecheck: !current || data.needsRecheck === true };
      (ch.mcq || []).forEach(function (_, i) {
        if (LETTERS.includes(data.picks[i])) state.picks[i] = data.picks[i];
        if (current && state.picks[i] && data.checked[i] === true) state.checked[i] = true;
      });
      quizState[ch.id] = state;
    });
  } catch (_) { /* Invalid or unavailable storage must not prevent studying. */ }
  function saveQuiz() {
    Object.values(quizState).forEach(function (state) { state.revision = ANSWER_REVISION; });
    try { localStorage.setItem(QUIZ_STORE, JSON.stringify(quizState)); } catch (_) { /* Storage can be disabled. */ }
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function chapter() {
    return chapters.find(function (c) { return c.id === chapterId; }) || chapters[0];
  }

  function typeset() {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  function parseHash() {
    const raw = (location.hash || "").replace(/^#/, "");
    if (!raw) return;
    const parts = raw.split("/");
    if (parts[0] && chapters.some(function (c) { return c.id === parts[0]; })) {
      chapterId = parts[0];
    }
    if (parts[1] && Object.prototype.hasOwnProperty.call(TAB_LABEL, parts[1])) {
      tab = parts[1];
    }
  }

  function setHash() {
    const next = "#" + chapterId + "/" + tab;
    if ((tab === "source" || tab === "lecture" || tab === "review") && location.hash.startsWith(next + "/")) return;
    if (location.hash !== next) {
      history.replaceState(null, "", next);
    }
  }

  function disposeSims() {
    simHandles.forEach(function (h) {
      if (h && typeof h.dispose === "function") h.dispose();
    });
    simHandles = [];
  }

  function setStatus() {
    const ch = chapter();
    if (!el.status) return;
    if (!ch) {
      el.status.textContent = "";
      return;
    }
    el.status.textContent = "UTT DC1TT23 · Ch." + ch.number + " · " + ch.title + " · " + (TAB_LABEL[tab] || tab);
  }

  function renderNav() {
    el.nav.innerHTML = chapters.map(function (c) {
      const on = c.id === chapterId ? " chip chip-on" : " chip";
      return '<button type="button" data-ch="' + c.id + '" class="' + on.trim() + '">Ch.' + c.number + " · " + escapeHtml(c.short || c.title) + "</button>";
    }).join("");
    Array.prototype.forEach.call(el.tabs.querySelectorAll("button"), function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-tab") === tab));
    });
  }

  const COMMON_SI = [
    { k: "$t$", mean: "thời gian", unit: "s (giây)", note: "SI gốc" },
    { k: "$S$", mean: "diện tích", unit: "m$^2$", note: "chữ hoa. Tụ phẳng, thông lượng, khe I-âng" },
    { k: "$V$", mean: "thể tích hoặc điện thế", unit: "m$^3$ hoặc V", note: "đọc ngữ cảnh: hình học vs volt" },
    { k: "$q$", mean: "điện tích", unit: "C", note: "điện tích nguyên tố $e=1{,}6\\times 10^{-19}$ C" },
    { k: "$\\varepsilon$", mean: "hằng số điện môi tương đối", unit: "—", note: "$\\varepsilon\\ge 1$; chân không $\\varepsilon=1$" },
    { k: "$\\mu$", mean: "độ từ thẩm tương đối", unit: "—", note: "Có thể nhỏ hơn 1 ở vật nghịch từ; chân không $\\mu=1$, không khí lấy xấp xỉ 1." },
    { k: "rad", mean: "radian", unit: "1 (không thứ nguyên)", note: "góc trong $\\omega$, Maxwell, giao thoa, Malus" }
  ];

  function renderGlossary(list, heading) {
    if (!list || !list.length) return "";
    const rows = list.map(function (g) {
      return "<tr><td>" + g.k + "</td><td>" + g.mean + "</td><td>" + g.unit + "</td><td>" + (g.note || "—") + "</td></tr>";
    }).join("");
    return "<h3>" + heading + "</h3>" +
      '<div class="table-wrap"><table class="glossary"><thead><tr>' +
      "<th>Ký hiệu</th><th>Ý nghĩa</th><th>Đơn vị SI</th><th>Ghi chú / chỗ dễ nhầm</th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>";
  }

  function formulaNotes(f) {
    if (f.sym && f.sym.length) {
      return "<ul class=\"sym-list\">" + f.sym.map(function (s) {
        var line = "<strong>" + s.k + "</strong>: " + s.mean;
        if (s.unit) line += " (" + s.unit + ")";
        if (s.note) line += " — " + s.note;
        return "<li>" + line + "</li>";
      }).join("") + "</ul>";
    }
    return f.symbols || "";
  }

  function renderTheory(ch) {
    const rows = (ch.formulas || []).map(function (f) {
      return "<tr><td>" + f.name + "</td><td>" + f.latex + "</td><td>" + formulaNotes(f) + "</td><td>" + f.when + "</td></tr>";
    }).join("");
    const traps = (ch.traps || []).map(function (t) {
      return '<div class="trap"><strong>' + t.title + "</strong>" + t.text + "</div>";
    }).join("");
    const vis = ch.visual || {};
    return (
      '<section class="card"><h2>Phần 1 · Hệ thống lý thuyết &amp; lưu ý</h2>' +
      "<p>Cách đọc chú thích: <strong>ký hiệu : ý nghĩa (đơn vị SI)</strong>. Giáo trình UTT dùng cặp $\\vec{E},\\vec{D}$ và $\\vec{B},\\vec{H}$ (không chỉ $E$ và $B$). Chữ hoa/thường khác nghĩa.</p>" +
      renderGlossary(COMMON_SI, "0. Ký hiệu hình học &amp; SI dùng chung") +
      renderGlossary(ch.glossary, "0b. Ký hiệu riêng chương này") +
      "<h3>1. Bảng tóm tắt công thức cốt lõi</h3>" +
      '<div class="table-wrap"><table><thead><tr>' +
      "<th>Đại lượng / Định luật</th><th>Công thức đại số &amp; dạng vectơ</th>" +
      "<th>Từng ký hiệu trong công thức</th><th>Điều kiện áp dụng</th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
      "<h3>2. Bẫy lý thuyết &amp; lỗi sai kinh điển</h3>" + traps +
      "<h3>3. Mô tả visual / sơ đồ minh họa</h3>" +
      '<div class="visual">' + (vis.html || "") + "</div></section>"
    );
  }

  function renderLab(ch) {
    return (
      '<section class="card" id="labRoot"><h2>Lab mô phỏng · ' + escapeHtml(ch.title) + "</h2>" +
      "<p class=\"pair\">Kéo chuột để xoay mô hình 3D, lăn bánh xe để phóng to/thu nhỏ. Dùng slider để đổi tham số và đọc vectơ theo chú thích màu.</p>" +
      '<div class="lab-grid">' +
      '<div class="lab-panel"><h3>Mô hình 2D</h3><div class="controls" id="ctrl2d"></div><div class="sim-box" id="box2d"></div><div id="meta2d"></div></div>' +
      '<div class="lab-panel"><h3>Mô hình 3D</h3><div class="controls" id="ctrl3d"></div><div class="sim-box" id="box3d"></div><div id="meta3d"></div></div>' +
      "</div></section>"
    );
  }

  function qState(ch) {
    if (!quizState[ch.id]) {
      quizState[ch.id] = { picks: {}, checked: {}, submitted: false };
    }
    if (!quizState[ch.id].checked) quizState[ch.id].checked = {};
    return quizState[ch.id];
  }

  function extractFormula(text) {
    if (!text) return "";
    const display = text.match(/\$\$([\s\S]+?)\$\$/);
    if (display) return "$$" + display[1] + "$$";
    let best = "";
    const re = /\$([^$]+)\$/g;
    let m;
    while ((m = re.exec(text))) {
      if (m[1].indexOf("=") !== -1 && m[1].length >= best.length) best = m[1];
    }
    if (best) return "$" + best + "$";
    return text;
  }

  function tipFor(q) {
    return q.reviewTip || 'Đọc đúng điều kiện của đề; đổi đơn vị trước khi thay số. Đối chiếu cả giá trị, đơn vị và chiều của đại lượng.';
  }

  function coachOf(ch, q, i) {
    const pack = window.VLDC_QUIZ_COACH && window.VLDC_QUIZ_COACH[ch.id];
    const extra = (q.coach || (pack && pack[i]) || {});
    return {
      formula: extra.formula || extractFormula(q.whyCorrect),
      tip: extra.tip || tipFor(q),
      ok: extra.ok || "",
      bad: extra.bad || ""
    };
  }

  function renderCoach(ch, q, i, picked) {
    const ok = picked === q.answer;
    const c = coachOf(ch, q, i);
    const traps = LETTERS.filter(function (L) { return L !== q.answer; }).map(function (L) {
      return "<li><strong>" + L + ":</strong> " + ((q.whyWrong && q.whyWrong[L]) || "Không khớp định nghĩa / tính toán.") + "</li>";
    }).join("");
    let note;
    if (ok) {
      note = '<div class="coach-note right"><h4>Lưu ý khi làm đúng</h4><p>' +
        (c.ok || "Đúng rồi — vẫn ghi các bẫy để lần sau không mất điểm vì đề đổi cách hỏi.") +
        "</p><ul>" + traps + "</ul></div>";
    } else {
      const miss = picked
        ? ("Bạn chọn <strong>" + picked + "</strong>. " + ((q.whyWrong && q.whyWrong[picked]) || "Lựa chọn này không khớp định nghĩa / tính toán."))
        : "Bạn bỏ trống câu này.";
      note = '<div class="coach-note wrong"><h4>Lưu ý khi làm sai</h4><p>' + miss + "</p>" +
        (c.bad ? "<p>" + c.bad + "</p>" : "") +
        "<p><strong>Cách đúng (" + q.answer + "):</strong> " + q.whyCorrect + "</p>" +
        "<p>Các bẫy còn lại:</p><ul>" +
        LETTERS.filter(function (L) { return L !== q.answer && L !== picked; }).map(function (L) {
          return "<li><strong>" + L + ":</strong> " + ((q.whyWrong && q.whyWrong[L]) || "Không khớp định nghĩa / tính toán.") + "</li>";
        }).join("") + "</ul></div>";
    }
    return '<div class="result coach ' + (ok ? "ok" : "bad") + '">' +
      "<h2>" + (ok ? "Đúng" : "Chưa đúng") + "</h2>" +
      '<p class="pair">' + (ok
        ? "Nhớ công thức và mẹo bên dưới, đồng thời xem các bẫy để giữ điểm."
        : "Đáp án là <strong>" + q.answer + "</strong>" + (picked ? " · bạn chọn " + picked : " · chưa chọn") + ".") +
      "</p>" +
      '<p class="memory">Ghi nhớ · ' + c.formula + "</p>" +
      '<div class="coach-grid">' +
      '<div class="coach-box"><h4>Công thức cần nhớ</h4><p>' + c.formula + "</p></div>" +
      '<div class="coach-box"><h4>Mẹo</h4><p>' + c.tip + "</p></div>" +
      "</div>" + note +
      '<p class="explain-caption">Giải thích từng phương án</p>' +
      "<ol class=\"explain\">" +
      "<li><strong>Đúng " + q.answer + ":</strong> " + q.whyCorrect + "</li>" + traps +
      "</ol></div>";
  }

  function renderQuiz(ch) {
    const st = qState(ch);
    const qs = ch.mcq || [];
    let checkedN = 0;
    let okN = 0;
    qs.forEach(function (q, i) {
      if (st.submitted || st.checked[i]) {
        checkedN += 1;
        if (st.picks[i] === q.answer) okN += 1;
      }
    });
    const items = qs.map(function (q, i) {
      const picked = st.picks[i];
      const revealed = !!(st.submitted || st.checked[i]);
      const choices = LETTERS.map(function (L) {
        let cls = "choice";
        if (revealed) {
          if (L === q.answer) cls += " correct";
          else if (picked === L && L !== q.answer) cls += " wrong";
        } else if (picked === L) cls += " selected";
        return '<button type="button" class="' + cls + '" data-q="' + i + '" data-l="' + L + '"' +
          (revealed ? " disabled" : "") + ' aria-pressed="' + String(picked === L) + '"' + '><span class="key">' + L + '</span><span class="txt">' +
          q.choices[L] + "</span></button>";
      }).join("");
      let extra = "";
      if (revealed) {
        extra = renderCoach(ch, q, i, picked);
      } else if (picked) {
        extra = '<div class="actions mcq-actions"><button type="button" class="btn btn-primary" data-check-q="' + i +
          '">Kiểm tra câu này</button></div>';
      } else {
        extra = '<p class="hint-pick">Chọn A–D, rồi bấm <strong>Kiểm tra câu này</strong> để xem công thức, mẹo và lưu ý.</p>';
      }
      const lv = (q.level || "TH").toLowerCase();
      return '<article class="mcq" id="mcq-' + i + '"><div><span class="badge ' + lv + '">' +
        escapeHtml(LEVELS[q.level] || q.level) + "</span></div>" +
        '<p class="stem"><strong>Câu ' + (i + 1) + ".</strong> " + q.stem + "</p>" +
        '<div class="choices">' + choices + "</div>" + extra + window.StudyUI.markControls(window.StudyStore.quizId(ch.id,i+1)) + '<button class="btn btn-ghost" data-quiz-skip="'+i+'">Bỏ qua · ôn sau</button><span class="hint" data-skip-status="'+i+'">'+(window.StudyStore.entry(window.StudyStore.quizId(ch.id,i+1)).skipped?' Đã đưa vào bộ ôn câu bỏ qua.':'')+'</span></article>';
    }).join("");

    let banner = "";
    if (st.submitted) {
      banner = '<div class="result-banner">Bạn đúng <strong>' + okN + "/" + qs.length +
        "</strong>. Dưới mỗi câu: công thức cần nhớ, mẹo, và lưu ý khi đúng / khi sai.</div>";
    } else if (checkedN) {
      banner = '<div class="result-banner">Đã kiểm tra <strong>' + checkedN + "/" + qs.length +
        "</strong> · đúng <strong>" + okN + "</strong>. Làm tiếp từng câu, hoặc nộp bài để mở hết.</div>";
    }

    const lv = { NB: 0, TH: 0, VD: 0, VDC: 0 };
    qs.forEach(function (q) {
      if (Object.prototype.hasOwnProperty.call(lv, q.level)) lv[q.level] += 1;
    });

    return (
      '<section class="card"><h2>Phần 2 · Bài tập trắc nghiệm (' + qs.length + " câu)</h2>" +
      '<p class="hint">Rà soát đáp án và điều kiện áp dụng ngày 12/09/2026 · <a href="answer-audit.html" target="_blank" rel="noopener">Bảng đối chiếu từng câu và nguồn</a>.</p>' +
      (st.needsRecheck ? '<p class="source-note" role="status">Nội dung đã được sửa sau lần làm trước. Lựa chọn cũ được giữ để tham khảo; trạng thái chấm cũ đã mở lại. Hãy đọc đề đã cập nhật và kiểm tra lại từng câu.</p>' : '') +
      "<p>Tỉ lệ: " + lv.NB + " nhận biết · " + lv.TH + " thông hiểu · " + lv.VD +
      " vận dụng · " + lv.VDC + " vận dụng cao. Sau <strong>mỗi câu</strong>, bấm Kiểm tra — sẽ hiện công thức cần nhớ, mẹo, và lưu ý (khác nhau khi đúng / khi sai). Đáp án không hiện trước khi kiểm tra.</p>" +
      banner + items +
      '<div class="actions">' +
      (st.submitted
        ? '<button type="button" class="btn btn-ghost" id="retryQuiz">Làm lại</button>'
        : '<button type="button" class="btn btn-primary" id="submitQuiz">Nộp bài (kiểm tra hết)</button>') +
      "</div></section>"
    );
  }

  function renderEssay(ch) {
    const items = (ch.essays || []).map(function (e, i) {
      return (
        '<article class="card"><h3>' + (i + 1) + ". " + e.title +
        ' <span class="badge">' + escapeHtml(e.kind) + "</span></h3>" +
        "<div>" + e.problem + "</div>" +
        '<div class="actions"><button type="button" class="btn btn-ghost" data-essay="' + i + '">Xem lời giải 4 bước</button></div>' +
        '<div class="essay-steps" id="essay-' + i + '">' +
        '<div class="coach-grid">' +
        '<div class="coach-box"><h4>Công thức cần nhớ</h4><div>' + e.steps.s3 + "</div></div>" +
        '<div class="coach-box"><h4>Mẹo &amp; lưu ý</h4><p>' +
        (e.tip || "Làm đủ 4 bước: giả thiết → chiều dương / SI → phương trình chữ → thế số. Sai hay do nhầm $\\varepsilon,\\mu$, quên vectơ, hoặc đảo $E$ với $D$ / $B$ với $H$.") +
        "</p></div></div>" +
        '<div class="step"><div class="n">Bước 1 · Phân tích hiện tượng &amp; tóm tắt đề</div>' + e.steps.s1 + "</div>" +
        '<div class="step"><div class="n">Bước 2 · Hệ / chiều dương / đơn vị SI</div>' + e.steps.s2 + "</div>" +
        '<div class="step"><div class="n">Bước 3 · Phương trình dạng chữ / tổng quát</div>' + e.steps.s3 + "</div>" +
        '<div class="step"><div class="n">Bước 4 · Thế số kèm đơn vị SI</div>' + e.steps.s4 + "</div>" +
        "</div></article>"
      );
    }).join("");
    return "<h2>Phần 3 · Bài tập tự luận trọng tâm (" + (ch.essays || []).length + " bài)</h2>" +
      "<p>Mỗi bài bốn bước (ẩn đến khi bấm xem). Có bài công thức, vi phân/tích phân, và mô hình thực tiễn.</p>" +
      items;
  }

  function mountLab(ch) {
    const pack = window.VLDC_SIMS && window.VLDC_SIMS[ch.id];
    if (!pack || typeof pack.mount !== "function") {
      document.getElementById("labRoot").insertAdjacentHTML(
        "beforeend",
        "<p>Lab chương này chưa gắn được.</p>"
      );
      return;
    }
    if (!window.THREE || !window.SimCore) {
      document.getElementById("labRoot").insertAdjacentHTML("beforeend", '<p role="status">Không tải được thư viện mô phỏng. Kiểm tra kết nối rồi tải lại trang; các phần lý thuyết và bài tập vẫn dùng được.</p>');
      return;
    }
    const session=window.LabSession.create(document.getElementById('labRoot'));
    simHandles = pack.mount({
      box2d: document.getElementById("box2d"),
      box3d: document.getElementById("box3d"),
      ctrl2d: document.getElementById("ctrl2d"),
      ctrl3d: document.getElementById("ctrl3d"),
      meta2d: document.getElementById("meta2d"),
      meta3d: document.getElementById("meta3d")
    }) || [];
    simHandles.push(session);
  }

  function render(opts) {
    if(window.PhysicsExam.active())tab="exam";
    el.nav.parentElement.hidden=tab==="exam";
    const y = window.scrollY;
    disposeSims();
    const ch = chapter();
    if (!ch) {
      el.main.innerHTML = "<p>Chưa có dữ liệu chương.</p>";
      return;
    }
    renderNav();
    setStatus();
    setHash();
    if (tab === "theory") el.main.innerHTML = renderTheory(ch);
    else if (tab === "lab") el.main.innerHTML = renderLab(ch);
    else if (tab === "quiz") el.main.innerHTML = renderQuiz(ch);
    else if (tab === "exam") el.main.innerHTML = window.PhysicsExam.page();
    else if (tab === "source" || tab === "lecture") el.main.innerHTML = window.SourceLibrary
      ? window.SourceLibrary.render(ch.id, tab)
      : '<section class="card"><h2>Chưa tải được tài liệu</h2><p>Hãy kiểm tra kết nối và tải lại trang.</p></section>';
    else if (tab === "progress") el.main.innerHTML = window.StudyUI.progress();
    else if (tab === "review") el.main.innerHTML = window.StudyUI.reviewPage();
    else el.main.innerHTML = renderEssay(ch);
    if ((tab === "source" || tab === "lecture") && window.SourceLibrary) window.SourceLibrary.mount();
    if (tab === "review") window.StudyUI.mountReview();
    if (tab === "exam") { window.PhysicsExam.mount(()=>render({keepScroll:true}),typeset); el.status.textContent="Thi thử · Phạm vi câu hỏi theo cấu hình đề"; }
    if (tab === "quiz") window.StudyUI.mountMarks(el.main);
    typeset();
    if (tab === "lab") {
      mountLab(ch);
      typeset();
    }
    if (opts && opts.keepScroll) {
      window.scrollTo(0, y);
    }
  }

  el.nav.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-ch]");
    if (!btn) return;
    chapterId = btn.getAttribute("data-ch");
    render();
  });

  el.tabs.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    tab = btn.getAttribute("data-tab");
    render();
  });

  el.main.addEventListener("click", function (e) {
    const choice = e.target.closest("button.choice");
    if (choice) {
      const ch = chapter();
      const st = qState(ch);
      const qi = Number(choice.getAttribute("data-q"));
      if (st.submitted || st.checked[qi]) return;
      st.picks[qi] = choice.getAttribute("data-l");
      window.StudyStore.draft(window.StudyStore.quizId(ch.id,qi+1),{choice:st.picks[qi]});
      saveQuiz();
      render({ keepScroll: true });
      const selected = el.main.querySelector('[data-q="' + qi + '"][data-l="' + st.picks[qi] + '"]');
      if (selected) selected.focus({ preventScroll: true });
      return;
    }
    const checkOne = e.target.closest("button[data-check-q]");
    if (checkOne) {
      const ch = chapter();
      const st = qState(ch);
      const i = Number(checkOne.getAttribute("data-check-q"));
      if (st.submitted || st.checked[i]) return;
      if (!st.picks[i]) {
        alert("Hãy chọn A, B, C hoặc D trước.");
        return;
      }
      st.checked[i] = true;
      const studyId = window.StudyStore.quizId(ch.id,i+1);
      window.StudyStore.begin(studyId);
      window.StudyStore.record(studyId,{choice:st.picks[i]});
      saveQuiz();
      render({ keepScroll: true });
      const feedback = document.querySelector('#mcq-' + i + ' .result');
      if (feedback) { feedback.tabIndex = -1; feedback.focus({ preventScroll: true }); }
      return;
    }
    if (e.target.id === "submitQuiz") {
      const ch = chapter();
      const st = qState(ch);
      const n = (ch.mcq || []).length;
      if (Object.keys(st.picks).length < n) {
        if (!confirm("Bạn chưa chọn hết câu. Vẫn nộp?")) return;
      }
      if (st.submitted) return;
      (ch.mcq || []).forEach(function (_,i) {
        const id = window.StudyStore.quizId(ch.id,i+1);
        if (!st.picks[i]) window.StudyStore.skip(id);
        else if (!st.checked[i]) { window.StudyStore.begin(id); window.StudyStore.record(id,{choice:st.picks[i]}); }
      });
      st.submitted = true;
      st.needsRecheck = false;
      saveQuiz();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (e.target.id === "retryQuiz") {
      chapter().mcq.forEach(function (_,i) { window.StudyStore.begin(window.StudyStore.quizId(chapter().id,i+1)); });
      quizState[chapter().id] = { picks: {}, checked: {}, submitted: false };
      saveQuiz();
      render();
      el.main.scrollIntoView({ block: "start" });
      return;
    }
    const skipQuestion = e.target.closest('[data-quiz-skip]');
    if (skipQuestion) {
      const i=Number(skipQuestion.dataset.quizSkip);
      window.StudyStore.skip(window.StudyStore.quizId(chapter().id,i+1));
      el.main.querySelector('[data-skip-status="'+i+'"]').textContent=' Đã đưa vào bộ ôn câu bỏ qua.';
      return;
    }
    const essayBtn = e.target.closest("button[data-essay]");
    if (essayBtn) {
      const box = document.getElementById("essay-" + essayBtn.getAttribute("data-essay"));
      if (box) box.classList.toggle("open");
    }
  });

  window.addEventListener("hashchange", function () {
    parseHash();
    render();
  });

  parseHash();
  render();
})();
