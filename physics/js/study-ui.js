(function () {
  'use strict';
  const S = window.StudyStore;
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels = {sure:'Đã chắc chắn',review:'Cần xem lại',unanswered:'Chưa có đáp án'};
  const modes = {all:'Tất cả câu cần ôn',wrong:'Câu trả lời sai',skipped:'Câu đã bỏ qua',marked:'Câu đã đánh dấu',unattempted:'Bài PDF chưa làm'};
  const reference = {
    ch01:['Điện trường và định luật Coulomb','https://openstax.org/books/university-physics-volume-2/pages/5-3-coulombs-law'],
    ch02:['Chuyển động trong từ trường','https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field'],
    ch03:['Tự cảm và cuộn cảm','https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors'],
    ch04:['Dao động LC','https://openstax.org/books/university-physics-volume-2/pages/14-5-oscillations-in-an-lc-circuit'],
    ch05:['Giao thoa bản mỏng','https://openstax.org/books/university-physics-volume-3/pages/3-4-interference-in-thin-films'],
    ch06:['Hiệu ứng quang điện','https://openstax.org/books/university-physics-volume-3/pages/6-2-photoelectric-effect']
  };
  function markControls(id) {
    return '<label class="study-mark">Mức độ tự tin của bạn<select data-study-mark="'+id+'"><option value="">Chưa đánh dấu</option>'+Object.entries(labels).map(([v,t])=>'<option value="'+v+'"'+(S.entry(id).mark===v?' selected':'')+'>'+t+'</option>').join('')+'</select></label>';
  }
  function solution(q,open=false) {
    const s = window.SourceSolutions.records[q.id];
    if (!s) return '';
    return '<details class="study-solution"'+(open?' open':'')+'><summary>Lời giải từng bước · '+(s.key===null?'cần đối chiếu đề':'xem cách làm')+'</summary>'+
      (s.issue?'<p class="study-caution"><strong>Điểm cần đối chiếu:</strong> '+esc(s.issue)+'</p>':'')+
      '<p class="study-answer"><strong>Kết luận:</strong> '+esc(s.result)+'</p><ol>'+s.steps.map(step=>'<li>'+esc(step)+'</li>').join('')+'</ol>'+
      '<p class="hint">Đối chiếu nguyên bản: '+s.pages.map(page=>'<a href="assets/library/pdf/exercises.pdf#page='+page+'" target="_blank" rel="noopener">trang PDF '+page+' (trang in '+(page-1)+')</a>').join(' · ')+'</p>'+
      '<p class="hint">Lời giải biên soạn độc lập, không phải đáp án chính thức của PDF. <a href="source-solutions.html">Phạm vi kiểm tra và các câu cần đối chiếu</a> · <a href="'+reference[q.chapter][1]+'" target="_blank" rel="noopener">'+reference[q.chapter][0]+' — OpenStax</a>.</p></details>';
  }
  function controls(q, options) {
    q = S.catalog[q.id] || q;
    const answer = options ? options.answer : S.entry(q.id).draft || {}, locked = options ? options.locked : S.entry(q.id).locked && S.current(S.entry(q.id));
    const disabled = locked?' disabled':'';
    if (q.kind==='mcq') return '<fieldset class="source-answer-group"><legend>Đáp án bạn chọn</legend><div class="source-answer-options">'+['A','B','C','D'].map(letter=>'<label class="source-answer"><input type="radio" name="study-'+q.id+'" data-answer="choice" value="'+letter+'"'+(answer.choice===letter?' checked':'')+disabled+'><span>'+letter+(q.source?'':'. '+q.choices[letter])+'</span></label>').join('')+'</div></fieldset>';
    if (q.kind==='tf') return '<div class="source-tf">'+['a','b','c','d'].map(letter=>'<fieldset class="source-answer-group"><legend>Nhận định '+letter+')</legend><div class="source-answer-options">'+[['true','Đúng'],['false','Sai']].map(([v,t])=>'<label class="source-answer"><input type="radio" name="study-'+q.id+'-'+letter+'" data-answer="'+letter+'" value="'+v+'"'+(answer[letter]===v?' checked':'')+disabled+'><span>'+t+'</span></label>').join('')+'</div></fieldset>').join('')+'</div>';
    const s = window.SourceSolutions.records[q.id], unit = s?.key?.unit;
    const numericLabel = {x:'Giá trị x cần tìm',a:'Giá trị a cần tìm','tỉ số':'Tỉ số cần tìm','hệ số A':'Giá trị hệ số A cần tìm'}[unit] || (unit?'Kết quả theo đơn vị '+esc(unit):'Kết quả số bạn tính được');
    return '<label class="source-text-field">'+numericLabel+'<input class="study-number" data-answer="numeric" type="text" inputmode="text" maxlength="100" autocomplete="off" value="'+esc(answer.numeric || '')+'"'+disabled+' placeholder="Ví dụ: 0,25 hoặc 2.5e-1"></label><p class="hint">Chỉ nhập số theo đơn vị hoặc hệ số ở nhãn. Dấu phẩy thập phân và dạng 2,5 × 10^-1 được hỗ trợ.</p>';
  }
  function feedback(q) {
    const e = S.entry(q.id);
    if (!e.locked || !S.current(e)) return '';
    return '<div class="study-feedback '+(e.latest.correct?'study-correct':'study-incorrect')+'" role="status"><strong>'+(e.latest.correct?'Đúng':'Chưa đúng')+'</strong>'+(e.latest.parts?' · '+e.latest.parts.map((ok,i)=>'abcd'[i]+') '+(ok?'đúng':'chưa đúng')).join(' · '):'')+
      (!q.source?'<p>Đáp án '+q.answer+'. '+q.whyCorrect+'</p>':'<p>Đọc các bước giải bên dưới, rồi thử làm lại mà không xem đáp án.</p>')+'</div>';
  }
  function tools(q) {
    q = S.catalog[q.id] || q;
    const e = S.entry(q.id), locked = e.locked && S.current(e), ambiguous = q.source && window.SourceSolutions.records[q.id]?.key===null;
    return '<div class="study-tools" data-study-id="'+q.id+'">'+
      (ambiguous?'<p class="study-caution">Đề cần đối chiếu. Có hướng dẫn giải theo điều kiện; chưa chấm đúng/sai câu này.</p>':'')+
      '<div class="actions">'+(!ambiguous&&!locked?'<button class="btn btn-primary" data-study-check>Kiểm tra đáp án</button>':'')+
      (locked?'<button class="btn" data-study-retry>Làm lại câu này</button>':'')+'<button class="btn btn-ghost" data-study-skip>'+(e.skipped?'Đã đưa vào câu bỏ qua':'Bỏ qua · ôn sau')+'</button></div>'+
      '<div data-study-message role="status"></div>'+feedback(q)+solution(q,!!locked)+markControls(q.id)+'<p class="hint">Tự đánh dấu không thay đổi điểm số.</p><p class="hint" data-study-storage>'+esc(S.storageMessage())+'</p></div>';
  }
  function mountMarks(root) {
    root.querySelectorAll('[data-study-mark]').forEach(select=>select.onchange=()=>{S.mark(select.dataset.studyMark,select.value);updateStorage(root);});
  }
  function updateStorage(root) { root.querySelectorAll('[data-study-storage]').forEach(el=>el.textContent=S.storageMessage()); }
  function bindQuestion(root,q,refresh,afterSkip) {
    mountMarks(root);
    root.querySelectorAll('[data-answer]').forEach(input=>{
      const update = ()=>{S.draft(q.id,{[input.dataset.answer]:input.value});updateStorage(root);};
      if (input.type==='radio') input.onchange=update; else input.oninput=update;
    });
    const check = root.querySelector('[data-study-check]');
    if (check) check.onclick = ()=>{
      const result = S.record(q.id,S.entry(q.id).draft || {});
      if (result.state==='graded') { refresh(); const target=document.querySelector('.study-feedback'); if(target){target.tabIndex=-1;target.focus({preventScroll:true});} }
      else { root.querySelector('[data-study-message]').textContent=result.message; }
    };
    const retry = root.querySelector('[data-study-retry]');
    if (retry) retry.onclick=()=>{S.begin(q.id);refresh();};
    const skip = root.querySelector('[data-study-skip]');
    if (skip) skip.onclick=()=>{S.skip(q.id);if(afterSkip) afterSkip();else refresh();};
  }
  function chapterOptions(value) { return '<option value="all">Tất cả chương</option>'+window.VLDC_CHAPTERS.map(ch=>'<option value="'+ch.id+'"'+(ch.id===value?' selected':'')+'>'+esc(ch.title)+'</option>').join(''); }
  function progress() {
    const s = S.stats(), rate = n=>n===null?'Chưa có bài chấm':n+'% đúng';
    const topicRows = s.byTopic.filter(t=>t.graded>0).sort((a,b)=>a.rate-b.rate);
    const strong = topicRows.filter(t=>t.graded>=3&&t.rate>=80), weak = topicRows.filter(t=>t.graded>=3&&t.rate<60);
    const describe = list=>list.length?list.map(t=>esc(t.topic)+' ('+t.rate+'%, '+t.graded+' câu)').join(' · '):'Chưa đủ dữ liệu để kết luận. Làm ít nhất 3 câu mỗi chủ đề.';
    return '<section class="card study-dashboard"><p class="eyebrow">GÓC HỌC TẬP CỦA BẠN</p><h2>Tiến độ cá nhân</h2><p>Biết mình đã học đến đâu, chọn đúng phần cần luyện tiếp.</p><div class="study-stats">'+
      [[s.attempted+'/394','Câu đã bắt đầu làm'],[rate(s.rate),s.graded+' câu đã chấm'],[Math.floor(s.seconds/60)+' phút','Thời gian học chủ động'],[s.streak+' ngày','Chuỗi ngày ôn tập']].map(([n,label])=>'<div class="study-stat"><strong>'+n+'</strong><span>'+label+'</span></div>').join('')+'</div>'+
      '<p class="hint">394 câu = 144 trắc nghiệm + 250 bài PDF. Tỷ lệ đúng dùng lần chấm gần nhất của từng câu; một câu Đúng/Sai chỉ đúng khi đủ cả bốn ý. Bỏ qua, tự đánh dấu và xem lời giải không được tính là đúng.</p>'+
      (s.stale?'<p class="study-caution">'+s.stale+' câu có lời giải cập nhật: hãy chấm lại để đưa vào tỷ lệ đúng.</p>':'')+
      '<div class="actions"><a class="btn btn-primary" href="#ch01/review/wrong">Ôn câu sai</a><a class="btn" href="#ch01/review/unattempted">Làm bài PDF chưa thử</a></div><h3>Theo từng chương</h3><div class="study-chapters">'+s.byChapter.map(ch=>'<article class="study-chapter"><h4>'+esc(ch.title)+'</h4><p>'+ch.attempted+'/'+ch.total+' câu đã làm · '+ch.correct+'/'+ch.graded+' câu chấm đúng</p><progress max="100" value="'+(ch.rate||0)+'" aria-label="'+esc(ch.title)+': '+rate(ch.rate)+'"></progress><strong>'+rate(ch.rate)+'</strong><a href="#'+ch.id+'/source">Mở bài PDF →</a></article>').join('')+'</div>'+
      '<h3>Điểm mạnh và phần cần luyện</h3><div class="study-insights"><div><h4>Đang làm tốt</h4><p>'+describe(strong)+'</p></div><div><h4>Nên luyện thêm</h4><p>'+describe(weak)+'</p></div></div><p class="hint">Gợi ý dựa trên ít nhất 3 câu đã chấm/chủ đề: từ 80% là điểm mạnh, dưới 60% cần luyện thêm. Đây là tín hiệu ôn tập, chưa phải đánh giá toàn bộ năng lực.</p>'+
      '<details><summary>Xem tỷ lệ theo chủ đề ('+topicRows.length+')</summary><ul class="study-topic-list">'+topicRows.map(t=>'<li><span>'+esc(t.topic)+'</span><strong>'+t.correct+'/'+t.graded+' · '+t.rate+'%</strong></li>').join('')+'</ul></details>'+
      '<h3>Câu sai nhiều lần</h3><p class="hint">Số lần sai được giữ lại kể cả khi đã sửa đúng. Bộ ôn câu sai chỉ lấy những câu có lần chấm gần nhất sai.</p>'+(s.repeated.length?'<ul class="study-topic-list">'+s.repeated.map(q=>'<li><a href="#'+q.chapter+'/review/question-'+q.id+'">'+(q.source?'PDF':'Trắc nghiệm')+' · Ch.'+Number(q.chapter.slice(2))+' · Câu '+q.number+'</a><span>'+S.entry(q.id).wrong+' lần sai'+(S.current(S.entry(q.id))&&S.entry(q.id).latest.correct?' · đã sửa đúng':'')+'</span></li>').join('')+'</ul>':'<p>Chưa có câu nào sai từ hai lần trở lên.</p>')+
      '<p class="hint">Đã học trong '+s.days+' ngày. Đồng hồ chỉ tính lúc trang đang được dùng, dừng sau 60 giây không tương tác hoặc khi chuyển cửa sổ. Chuỗi ngày tính theo ngày trên thiết bị; còn được giữ nếu hôm qua có học. Bài làm cũ không có ngày giờ nên không được cộng vào chuỗi hoặc thời gian.</p><p class="hint" data-study-storage>'+esc(S.storageMessage())+'</p></section>';
  }
  let review = {zoom:100,mode:'all',chapter:'all',limit:20,ids:[],index:0,started:false,visited:[],route:''};
  function prepare() {
    const id = review.ids[review.index];
    if (id && !review.visited.includes(id)) { S.begin(id); review.visited.push(id); }
  }
  function reviewPage() {
    const part=location.hash.split('/')[2] || '';
    if (part!==review.route) {
      review.route=part;
      if (modes[part]) { review.mode=part;review.started=false; }
      if(part.startsWith('question-')&&S.catalog[part.slice(9)]) {
        review.ids=[part.slice(9)];review.index=0;review.visited=[];review.started=true;prepare();
      }
    }
    const available=S.queue(review.mode,review.chapter);
    let html='<section class="card study-review" id="studyReview"><p class="eyebrow">LUYỆN ĐÚNG PHẦN CẦN NHỚ</p><h2>Ôn câu sai và bài còn bỏ dở</h2><p>Chọn nguồn câu hỏi để tạo một lượt ôn. Danh sách được giữ cố định trong lượt, không nhảy câu khi điểm thay đổi.</p><form id="reviewForm" class="study-review-form"><label>Nguồn câu hỏi<select id="reviewMode">'+Object.entries(modes).map(([v,t])=>'<option value="'+v+'"'+(v===review.mode?' selected':'')+'>'+t+'</option>').join('')+'</select></label><label>Chương<select id="reviewChapter">'+chapterOptions(review.chapter)+'</select></label><label>Số câu<select id="reviewLimit">'+[[10,'10 câu'],[20,'20 câu'],[0,'Tất cả']].map(([v,t])=>'<option value="'+v+'"'+(v===review.limit?' selected':'')+'>'+t+'</option>').join('')+'</select></label><button class="btn btn-primary" type="submit">Tạo bài luyện</button></form><p class="hint" id="reviewAvailable">'+available.length+' câu phù hợp. “Câu đã đánh dấu” gồm Cần xem lại và Chưa có đáp án.</p>';
    if (!review.started) return html+'<div class="study-empty"><h3>Sẵn sàng cho lượt ôn mới</h3><p>Chọn bộ lọc rồi bấm Tạo bài luyện. Chỉ khi kiểm tra đáp án, kết quả mới được ghi vào tỷ lệ đúng.</p></div></section>';
    if (!review.ids.length) return html+'<div class="study-empty" role="status"><h3>Không có câu phù hợp</h3><p>Thử nguồn câu hỏi khác hoặc chọn tất cả chương.</p></div></section>';
    if (review.index>=review.ids.length) {
      const correct=review.ids.filter(id=>S.entry(id).locked&&S.current(S.entry(id))&&S.entry(id).latest.correct).length;
      const graded=review.ids.filter(id=>S.entry(id).locked&&S.current(S.entry(id))).length;
      return html+'<div class="study-empty" role="status"><h3>Đã đi hết lượt ôn</h3><p>Đã kiểm tra '+graded+'/'+review.ids.length+' câu · đúng '+correct+' câu. Câu bỏ qua và câu cần đối chiếu vẫn có thể ôn tiếp.</p><a class="btn" href="#ch01/progress">Xem tiến độ</a></div></section>';
    }
    const q=S.catalog[review.ids[review.index]];
    html+='<div class="source-navigation"><button class="btn" data-review-step="-1"'+(review.index===0?' disabled':'')+'>← Câu trước</button><strong>'+(review.index+1)+'/'+review.ids.length+'</strong><button class="btn" data-review-step="1">'+(review.index===review.ids.length-1?'Hoàn tất lượt ôn':'Câu tiếp →')+'</button></div><article id="reviewQuestion" data-study-question="'+q.id+'"><p class="badge">'+(q.source?'PDF gốc':'Bộ trắc nghiệm')+' · Ch.'+Number(q.chapter.slice(2))+' · '+esc(q.topic)+'</p><h3 tabindex="-1" id="reviewHeading">Câu '+q.number+'</h3>';
    html+=q.source?'<p><a href="assets/library/pdf/exercises.pdf#page='+q.segments[0].page+'" target="_blank" rel="noopener">Mở trang PDF gốc '+q.segments[0].page+' ↗</a></p><label class="source-zoom">Cỡ xem <input id="reviewZoom" type="range" min="100" max="300" step="25" value="'+review.zoom+'"><output id="reviewZoomValue">'+review.zoom+'%</output></label><p class="hint">Tăng cỡ xem rồi vuốt ngang trong ảnh để đọc công thức.</p><div class="source-image-viewport" tabindex="0" aria-label="Ảnh đề gốc; có thể cuộn ngang khi phóng to"><div class="source-image-content" style="width:'+review.zoom+'%">'+q.segments.map(seg=>'<img class="source-original" src="'+seg.image+'" width="'+seg.width+'" height="'+seg.height+'" alt="Câu '+q.number+', trang PDF '+seg.page+'">').join('')+'</div></div><details><summary>Bản chữ hỗ trợ đọc màn hình</summary><p class="hint">Nhận dạng tự động có thể sai công thức; đối chiếu ảnh hoặc PDF.</p><p>'+esc(q.searchText)+'</p></details>':'<div class="stem">'+q.stem+'</div>';
    return html+'<div class="source-workspace">'+controls(q)+tools(q)+'</div><div class="actions"><button class="btn btn-primary" data-review-advance>'+(review.index===review.ids.length-1?'Hoàn tất lượt ôn':'Câu tiếp theo →')+'</button></div></article></section>';
  }
  function mountReview() {
    const root=document.getElementById('studyReview'); if(!root) return;
    const refresh=()=>{root.outerHTML=reviewPage();mountReview();if(window.renderMathInElement)window.renderMathInElement(document.getElementById('studyReview'),{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});};
    const filters=()=>{review.mode=root.querySelector('#reviewMode').value;review.chapter=root.querySelector('#reviewChapter').value;review.limit=Number(root.querySelector('#reviewLimit').value);};
    root.querySelectorAll('#reviewForm select').forEach(el=>el.onchange=()=>{filters();root.querySelector('#reviewAvailable').textContent=S.queue(review.mode,review.chapter).length+' câu phù hợp với bộ lọc mới. Bấm Tạo bài luyện để áp dụng.';});
    root.querySelector('#reviewForm').onsubmit=e=>{e.preventDefault();filters();review.ids=S.queue(review.mode,review.chapter);if(review.limit)review.ids=review.ids.slice(0,review.limit);review.index=0;review.visited=[];review.started=true;prepare();refresh();document.getElementById('reviewHeading')?.focus();};
    const move=step=>{review.index=Math.max(0,Math.min(review.ids.length,review.index+step));prepare();refresh();document.getElementById('reviewHeading')?.focus();};
    root.querySelectorAll('[data-review-step]').forEach(btn=>btn.onclick=()=>move(Number(btn.dataset.reviewStep)));
    const advance=root.querySelector('[data-review-advance]');if(advance)advance.onclick=()=>move(1);
    const zoom=root.querySelector('#reviewZoom');
    if(zoom)zoom.oninput=()=>{review.zoom=Number(zoom.value);root.querySelector('.source-image-content').style.width=review.zoom+'%';root.querySelector('#reviewZoomValue').value=review.zoom+'%';};
    const q=S.catalog[review.ids[review.index]];
    if(q&&review.started)bindQuestion(root.querySelector('#reviewQuestion'),q,refresh,()=>move(1));
  }
  window.StudyUI={controls,tools,solution,markControls,mountMarks,bindQuestion,progress,reviewPage,mountReview};
})();
