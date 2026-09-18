(function () {
  'use strict';
  const library = window.VLDC_SOURCE_LIBRARY;
  const STORE = 'vldc-source-practice-v1';
  const LABELS = { mcq: 'Nhiều lựa chọn', tf: 'Đúng / Sai', short: 'Trả lời ngắn' };
  let saved = { answers: {}, positions: {} };
  let storageUnavailable = false;
  let state = { chapter: 'ch01', mode: 'source', query: '', kind: 'all', review: 'all', reader: false, allPages: false, page: 0, zoom: 100 };
  const escape = text => String(text == null ? '' : text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase();
  try {
    const data = JSON.parse(localStorage.getItem(STORE));
    if (data && data.answers && typeof data.answers === 'object' && !Array.isArray(data.answers)) {
      library.questions.forEach(q => {
        const item = data.answers[q.id];
        if (!item || typeof item !== 'object') return;
        const values = {};
        for (const key of ['choice', 'a', 'b', 'c', 'd']) {
          if (['A', 'B', 'C', 'D', 'true', 'false'].includes(item[key])) values[key] = item[key];
        }
        saved.answers[q.id] = { ...values, note: typeof item.note === 'string' ? item.note.slice(0, 10000) : '', response: typeof item.response === 'string' ? item.response.slice(0, 2000) : '', done: item.done === true };
      });
      if (data.positions && typeof data.positions === 'object') {
        library.chapters.forEach(ch => {
          const id = data.positions[ch.id];
          if (library.questions.some(q => q.chapter === ch.id && q.id === id)) saved.positions[ch.id] = id;
        });
      }
    }
  } catch (_) { /* A malformed save cannot prevent reading the original material. */ }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(saved)); storageUnavailable = false; }
    catch (_) { storageUnavailable = true; }
    const status = document.getElementById('sourceSaveStatus');
    if (status) status.textContent = storageUnavailable ? 'Trình duyệt không lưu được tiến độ. Hãy giữ lại ghi chú trước khi đóng trang.' : 'Đã lưu trên trình duyệt này.';
  }

  function chapter() { return library.chapters.find(ch => ch.id === state.chapter); }
  function questions() { return library.questions.filter(q => q.chapter === state.chapter); }
  function filtered() {
    const query = normalize(state.query.trim());
    return questions().filter(q => (state.kind === 'all' || q.kind === state.kind) &&
      (state.review === 'all' || !saved.answers[q.id]?.done) &&
      (!query || String(q.number) === query || normalize(q.topic + ' ' + q.searchText).includes(query)));
  }
  function selected() { return filtered().find(q => q.id === saved.positions[state.chapter]) || filtered()[0]; }
  function setRoute(value) {
    history.replaceState(null, '', '#' + state.chapter + '/' + state.mode + '/' + value);
  }
  function rerender(focus) {
    const root = document.getElementById('sourceLibrary');
    if (!root) return;
    root.outerHTML = content();
    mount();
    if (focus) {
      const target = document.getElementById(focus);
      if (target) { target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'start' }); }
    }
  }

  function imagePanel(segments, label) {
    return '<div class="source-image-viewport" tabindex="0" aria-label="' + escape(label) + '. Có thể cuộn ngang khi phóng to."><div class="source-image-content" style="width:' + state.zoom + '%">' +
      segments.map((seg, i) => '<img class="source-original" src="' + seg.image + '" width="' + seg.width + '" height="' + seg.height + '" alt="' + escape(label + ', phần ' + (i + 1) + ', trang PDF ' + seg.page) + '" decoding="async">').join('') + '</div></div>';
  }
  function zoomControls() {
    return '<label class="source-zoom">Cỡ xem <input id="sourceZoom" type="range" min="100" max="300" step="25" value="' + state.zoom + '"><output id="sourceZoomValue">' + state.zoom + '%</output></label><p class="hint">Công thức và hình vẽ giữ nguyên từ PDF. Tăng cỡ xem rồi vuốt ngang để đọc trên điện thoại.</p>';
  }
  function answerControls(q) {
    const answer = saved.answers[q.id] || {};
    return window.StudyUI.controls(q) + (q.kind === 'short' ? '<label class="source-text-field">Câu trả lời / bài làm nháp của bạn<textarea id="sourceResponse" rows="2" maxlength="2000" placeholder="Các bước tính, đơn vị hoặc ghi chú kết quả…">' + escape(answer.response || '') + '</textarea></label>' : '');
  }

  function practice() {
    const group = questions(), list = filtered(), q = selected();
    const done = group.filter(item => saved.answers[item.id]?.done).length;
    let html = '<div class="source-progress"><span>' + group.length + ' bài gốc · ' + escape(chapter().title) + '</span><strong id="sourceDoneCount">' + done + '/' + group.length + ' đã ôn</strong></div>' +
      '<progress id="sourceProgress" max="' + group.length + '" value="' + done + '" aria-label="Số bài đã đánh dấu ôn"></progress>' +
      '<form id="sourceSearch" class="source-filters"><label>Tìm bài<input id="sourceQuery" type="search" value="' + escape(state.query) + '" placeholder="Số câu hoặc từ khóa…"></label>' +
      '<label>Dạng bài<select id="sourceKind"><option value="all">Tất cả</option>' + Object.entries(LABELS).map(([key,label]) => '<option value="' + key + '"' + (state.kind === key ? ' selected' : '') + '>' + label + '</option>').join('') + '</select></label>' +
      '<label>Tiến độ<select id="sourceReview"><option value="all">Tất cả bài</option><option value="pending"' + (state.review === 'pending' ? ' selected' : '') + '>Chưa đánh dấu ôn</option></select></label><button class="btn" type="submit">Tìm</button></form>';
    if (!q) return html + '<div class="source-empty" role="status"><h3>Không có bài khớp bộ lọc</h3><p>Thử từ khóa khác hoặc hiển thị lại tất cả bài của module.</p><button class="btn btn-primary" data-source-action="clear">Xóa bộ lọc</button></div>';
    const index = list.findIndex(item => item.id === q.id);
    saved.positions[state.chapter] = q.id;
    const answer = saved.answers[q.id] || {};
    html += '<div class="source-navigation"><button class="btn" data-source-step="-1"' + (index === 0 ? ' disabled' : '') + '>← Bài trước</button><label class="source-jump-label">Chọn câu<select id="sourceQuestion">' + list.map(item => '<option value="' + item.id + '"' + (item.id === q.id ? ' selected' : '') + '>Câu ' + item.number + (saved.answers[item.id]?.done ? ' · đã ôn' : '') + '</option>').join('') + '</select></label><button class="btn" data-source-step="1"' + (index === list.length-1 ? ' disabled' : '') + '>Bài sau →</button></div>';
    html += '<article class="source-question" data-source-id="' + q.id + '"><div class="meta"><p class="badge">Module ' + Number(q.chapter.slice(2)) + ' · ' + LABELS[q.kind] + '</p><a class="source-link" href="assets/library/pdf/exercises.pdf#page=' + q.segments[0].page + '" target="_blank" rel="noopener">Trang gốc ' + [...new Set(q.segments.map(s => s.page))].join(', ') + ' ↗</a></div>' +
      '<h3 id="sourceHeading" tabindex="-1">Câu ' + q.number + ' <span class="source-position">' + (index+1) + '/' + list.length + ' bài trong bộ lọc</span></h3>' + zoomControls() + imagePanel(q.segments, 'Nguyên bản câu ' + q.number + ', ' + chapter().title) +
      '<details class="source-transcript"><summary>Bản chữ hỗ trợ tìm kiếm và đọc màn hình</summary><p class="source-note">Văn bản nhận dạng tự động có thể sai ký hiệu và số mũ. Dùng ảnh gốc phía trên để làm bài.</p><p>' + escape(q.searchText) + '</p></details>' +
      '<div class="source-workspace"><p class="source-note">Đủ 250 bài có hướng dẫn giải và trang đối chiếu. PDF gốc không kèm đáp án chính thức; những câu thiếu dữ kiện được ghi rõ và không tự chấm.</p>' + answerControls(q) + window.StudyUI.tools(q) +
      '<label class="source-text-field">Ghi chú / cách giải<textarea id="sourceNote" rows="3" maxlength="10000" placeholder="Công thức cần nhớ, cách giải hoặc điểm cần hỏi lại…">' + escape(answer.note || '') + '</textarea></label>' +
      '<label class="source-check"><input id="sourceDone" type="checkbox"' + (answer.done ? ' checked' : '') + '> Tôi đã ôn bài này</label><p id="sourceSaveStatus" role="status" class="hint">' + (storageUnavailable ? 'Trình duyệt không lưu được tiến độ.' : 'Lựa chọn và ghi chú chỉ lưu trên trình duyệt này.') + '</p></div></article>';
    html += '<div class="actions"><button class="btn btn-primary" data-source-step="1"' + (index === list.length-1 ? ' disabled' : '') + '>Bài tiếp theo →</button><button class="btn btn-ghost" data-source-action="reader">Đọc theo trang PDF</button></div>';
    return html;
  }

  function reader() {
    const doc = library.documents.find(d => d.id === (state.mode === 'lecture' ? 'lectures' : 'exercises'));
    const range = state.mode === 'lecture' ? chapter().lecturePages : chapter().exercisePages;
    const pages = state.allPages ? doc.pages : doc.pages.filter(p => range.length && p.page >= range[0] && p.page <= range[1]);
    let html = '<div class="source-reader-options"><label class="source-check"><input type="checkbox" id="sourceAllPages"' + (state.allPages ? ' checked' : '') + '> Xem toàn bộ ' + doc.pages.length + ' trang của file</label>' +
      (state.mode === 'source' ? '<button class="btn" data-source-action="practice">Quay lại từng bài</button>' : '') + '</div>';
    if (state.mode === 'lecture') html += '<p class="source-note">' + escape(library.notes.lectureScope) + '</p>';
    if (!pages.length) return html + '<div class="source-empty"><h3>File này chưa có phần giảng Module 6</h3><p>Bạn vẫn có thể dùng tab Lý thuyết hiện có hoặc mở toàn bộ tài liệu để đối chiếu mục lục.</p><button class="btn" data-source-action="all-pages">Mở toàn bộ tài liệu</button></div>';
    const page = pages.find(p => p.page === state.page) || pages[0];
    state.page = page.page;
    const index = pages.indexOf(page);
    html += '<div class="source-navigation"><button class="btn" data-page-step="-1"' + (index === 0 ? ' disabled' : '') + '>← Trang trước</button><label class="source-jump-label">Trang PDF<select id="sourcePage">' + pages.map(p => '<option value="' + p.page + '"' + (p.page === page.page ? ' selected' : '') + '>Trang ' + p.page + '</option>').join('') + '</select></label><button class="btn" data-page-step="1"' + (index === pages.length-1 ? ' disabled' : '') + '>Trang sau →</button></div>' +
      '<h3 id="sourceHeading" tabindex="-1">' + doc.title + ' · Trang ' + page.page + '/' + doc.pages.length + '</h3>' + zoomControls() + imagePanel([page], doc.title + ', trang PDF ' + page.page) +
      '<div class="actions"><a class="btn" href="' + doc.pdf + '#page=' + page.page + '" target="_blank" rel="noopener">Mở trang trong PDF ↗</a><a class="btn" href="' + doc.pdf + '" download>Tải PDF gốc</a></div>';
    return html;
  }

  function content() {
    return '<section id="sourceLibrary" class="card source-library"><div class="source-title"><div><p class="eyebrow">TÀI LIỆU BẠN CUNG CẤP · DC1TT23</p><h2>' + (state.mode === 'lecture' ? 'Bài giảng gốc' : '250 bài tập gốc') + '</h2></div><a class="source-link" href="assets/library/pdf/' + (state.mode === 'lecture' ? 'lectures' : 'exercises') + '.pdf" target="_blank" rel="noopener">Mở PDF đầy đủ ↗</a></div>' +
      (state.mode === 'lecture' || state.reader ? reader() : practice()) + '</section>';
  }

  function render(chapterId, mode) {
    if (!library) return '<section class="card">Chưa tải được dữ liệu tài liệu. Hãy tải lại trang.</section>';
    if (state.chapter !== chapterId || state.mode !== mode) state = { chapter: chapterId, mode, query: '', kind: 'all', review: 'all', reader: false, allPages: false, page: 0, zoom: 100 };
    const part = location.hash.split('/')[2] || '';
    if (/^page-\d+$/.test(part)) {
      state.page = Number(part.slice(5)); state.reader = true;
      const range = mode === 'lecture' ? chapter().lecturePages : chapter().exercisePages;
      if (!range.length || state.page < range[0] || state.page > range[1]) state.allPages = true;
    } else if (/^\d+$/.test(part)) {
      state.reader = false;
      const q = questions().find(q => q.number === Number(part));
      if (q) saved.positions[chapterId] = q.id;
    }
    return content();
  }

  function mount() {
    const root = document.getElementById('sourceLibrary');
    if (!root) return;
    root.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
      const notice = document.createElement('p'); notice.className = 'source-note'; notice.setAttribute('role','alert');
      notice.textContent = 'Không tải được ảnh trang. Hãy tải lại hoặc mở PDF gốc ở liên kết phía trên.'; img.replaceWith(notice);
    }));
    const queryForm = root.querySelector('#sourceSearch');
    if (queryForm) queryForm.onsubmit = e => { e.preventDefault(); state.query = root.querySelector('#sourceQuery').value; rerender(); };
    for (const [id,key] of [['sourceKind','kind'],['sourceReview','review']]) {
      const select = root.querySelector('#'+id); if (select) select.onchange = () => { state[key] = select.value; rerender(); };
    }
    const jump = root.querySelector('#sourceQuestion');
    if (jump) jump.onchange = () => { saved.positions[state.chapter] = jump.value; save(); setRoute(selected().number); rerender('sourceHeading'); };
    root.querySelectorAll('[data-source-step]').forEach(btn => btn.onclick = () => {
      const list = filtered(), i = list.indexOf(selected()), q = list[i+Number(btn.dataset.sourceStep)];
      if (!q) return; saved.positions[state.chapter] = q.id; save(); setRoute(q.number); rerender('sourceHeading');
    });
    root.querySelectorAll('[data-source-action]').forEach(btn => btn.onclick = () => {
      switch (btn.dataset.sourceAction) {
        case 'clear': state.query = ''; state.kind = 'all'; state.review = 'all'; break;
        case 'reader': state.reader = true; state.page = selected()?.segments[0].page || 0; break;
        case 'practice': state.reader = false; break;
        case 'all-pages': state.allPages = true; break;
      }
      rerender('sourceHeading');
      setRoute(state.reader || state.mode === 'lecture' ? 'page-' + state.page : selected()?.number || '');
    });
    const zoom = root.querySelector('#sourceZoom');
    if (zoom) zoom.oninput = () => { state.zoom = Number(zoom.value); root.querySelector('.source-image-content').style.width = state.zoom+'%'; root.querySelector('#sourceZoomValue').value = state.zoom+'%'; };
    const allPages = root.querySelector('#sourceAllPages');
    if (allPages) allPages.onchange = () => { state.allPages = allPages.checked; state.page = 0; rerender('sourceHeading'); setRoute('page-'+state.page); };
    const pageSelect = root.querySelector('#sourcePage');
    if (pageSelect) pageSelect.onchange = () => { state.page = Number(pageSelect.value); setRoute('page-'+state.page); rerender('sourceHeading'); };
    root.querySelectorAll('[data-page-step]').forEach(btn => btn.onclick = () => {
      const options = Array.from(pageSelect.options), index = options.findIndex(o => Number(o.value) === state.page);
      const next = options[index + Number(btn.dataset.pageStep)]; if (!next) return;
      state.page = Number(next.value); setRoute('page-'+state.page); rerender('sourceHeading');
    });
    function answer() {
      const q = selected(); if (!q) return null;
      if (!saved.answers[q.id]) saved.answers[q.id] = { done: false, note: '', response: '' };
      return saved.answers[q.id];
    }
    const activeQuestion = selected();
    if (!state.reader && state.mode === 'source' && activeQuestion) window.StudyUI.bindQuestion(root,activeQuestion,()=>rerender());
    for (const [id,key] of [['sourceNote','note'],['sourceResponse','response']]) {
      const field = root.querySelector('#'+id); if (field) field.oninput = () => { answer()[key] = field.value; if (key === 'response') window.StudyStore.draft(selected().id,{response:field.value}); save(); };
    }
    const done = root.querySelector('#sourceDone');
    if (done) done.onchange = () => {
      answer().done = done.checked; save();
      const count = questions().filter(q => saved.answers[q.id]?.done).length;
      root.querySelector('#sourceDoneCount').textContent = count+'/'+questions().length+' đã ôn'; root.querySelector('#sourceProgress').value = count;
      if (state.review === 'pending') rerender('sourceHeading');
    };
  }
  window.SourceLibrary = { render, mount };
})();
