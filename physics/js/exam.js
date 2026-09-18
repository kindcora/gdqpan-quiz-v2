(function () {
  'use strict';
  const S=window.StudyStore,U=window.ExamTools,esc=U.esc,KEY='vldc-exam-v1',PREFS='vldc-exam-filters-v1';
  const chapters=window.VLDC_CHAPTERS,levels={NB:'Nhận biết',TH:'Thông hiểu',VD:'Vận dụng',VDC:'Vận dụng cao'};
  const defaults=()=>({chapters:chapters.map(c=>c.id),bank:'quiz',kind:'all',level:'all',topic:'all',status:'all',query:'',count:20,minutes:30,distribution:'balanced'});
  let filters=defaults(),exam=null,warning='',refresh=null,saveFailed=false;
  const gradeable=q=>!q.source||window.SourceSolutions.records[q.id]?.key!=null;
  const all=Object.values(S.catalog).filter(gradeable);
  function signature(ids) {
    const text=JSON.stringify(ids.map(id=>{const q=S.catalog[id];return [id,q.stem,q.searchText,q.choices,q.source?SourceSolutions.records[id]:q.answer];}));
    let hash=2166136261;for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
    return (hash>>>0).toString(16);
  }
  function readFilters() {
    try{
      const p=JSON.parse(localStorage.getItem(PREFS));if(!p||typeof p!=='object')return;
      if(Array.isArray(p.chapters))filters.chapters=[...new Set(p.chapters.filter(id=>chapters.some(c=>c.id===id)))];
      for(const [k,values]of Object.entries({bank:['quiz','pdf','mixed'],kind:['all','mcq','short','tf'],level:['all','NB','TH','VD','VDC'],status:['all','new','wrong','correct','marked','skipped'],distribution:['balanced','random']}))if(values.includes(p[k]))filters[k]=p[k];
      if(typeof p.topic==='string'&&all.some(q=>filters.chapters.includes(q.chapter)&&q.topic===p.topic))filters.topic=p.topic;
      if(typeof p.query==='string')filters.query=p.query.slice(0,200);
      if(Number.isInteger(p.count)&&p.count>0&&p.count<=377)filters.count=p.count;
      if(Number.isInteger(p.minutes)&&p.minutes>0&&p.minutes<=180)filters.minutes=p.minutes;
    }catch(_){}
  }
  function saveFilters(){try{localStorage.setItem(PREFS,JSON.stringify(filters));}catch(_){saveFailed=true;}}
  function save(){try{if(exam)localStorage.setItem(KEY,JSON.stringify(exam));else localStorage.removeItem(KEY);saveFailed=false;}catch(_){saveFailed=true;}}
  function readExam() {
    try{
      const data=JSON.parse(localStorage.getItem(KEY));if(!data)return;
      if(!['active','done'].includes(data.status)||!Array.isArray(data.items)||!data.items.length||data.items.length>377||!data.items.every(it=>S.catalog[it.id]&&gradeable(S.catalog[it.id]))||new Set(data.items.map(it=>it.id)).size!==data.items.length||!Number.isFinite(data.endsAt)||!Number.isFinite(data.startedAt)||typeof data.token!=='string'||data.token.length>100)throw Error('invalid');
      if(data.signature!==signature(data.items.map(it=>it.id)))throw Error('content changed');
      data.items=data.items.map(it=>({id:it.id,flagged:it.flagged===true,answer:Object.fromEntries(Object.entries(it.answer||{}).filter(([k,v])=>['choice','numeric','a','b','c','d'].includes(k)&&typeof v==='string').map(([k,v])=>[k,v.slice(0,100)]))}));
      data.index=Number.isInteger(data.index)&&data.index>=0&&data.index<data.items.length?data.index:0;
      data.view=['all','blank','flagged','wrong','correct'].includes(data.view)?data.view:'all';
      exam=data;
      if(exam.status==='done')S.recordExam(exam.token,exam.items);
    }catch(_){warning='Không khôi phục được đề cũ hoặc nội dung câu hỏi đã thay đổi. Hãy tạo đề mới; tiến độ cá nhân vẫn được giữ.';}
  }
  readFilters();readExam();
  function pool() {
    return all.filter(q=>{
      if(!filters.chapters.includes(q.chapter)||(filters.bank==='quiz'&&q.source)||(filters.bank==='pdf'&&!q.source))return false;
      if(filters.kind!=='all'&&q.kind!==filters.kind)return false;
      if(filters.level!=='all'&&(q.source||q.level!==filters.level))return false;
      if(filters.topic!=='all'&&q.topic!==filters.topic)return false;
      const e=S.entry(q.id),current=S.current(e);
      if(filters.status==='new'&&e.attempted)return false;
      if(filters.status==='wrong'&&(!current||e.latest.correct))return false;
      if(filters.status==='correct'&&(!current||!e.latest.correct))return false;
      if(filters.status==='marked'&&!['review','unanswered'].includes(e.mark))return false;
      if(filters.status==='skipped'&&!e.skipped)return false;
      return U.matches(q.number+' '+q.topic+' '+(q.searchText||q.stem)+' '+Object.values(q.choices||{}).join(' '),filters.query);
    });
  }
  const options=(items,value)=>Object.entries(items).map(([v,t])=>'<option value="'+esc(v)+'"'+(v===value?' selected':'')+'>'+esc(t)+'</option>').join('');
  function builder() {
    return '<section class="card exam-builder"><p class="eyebrow">THI THỬ VẬT LÝ</p><h2>Tạo đề theo mục tiêu của bạn</h2><p>Chọn phạm vi, xem số câu phù hợp rồi bắt đầu. Đáp án và lời giải chỉ mở sau khi nộp.</p>'+
      (warning?'<p role="status" class="exam-warning">'+esc(warning)+'</p>':'')+
      '<form id="physicsExamForm" class="exam-form"><div class="exam-fields"><label class="full-field">Ngân hàng<select id="peBank">'+options({quiz:'144 trắc nghiệm ôn tập',pdf:'233 bài PDF có thể tự chấm',mixed:'Kết hợp cả hai ngân hàng'},filters.bank)+'</select></label></div>'+
      '<fieldset class="exam-checks"><legend>Chương đưa vào đề</legend>'+chapters.map(c=>'<label><input type="checkbox" data-pe-chapter="'+c.id+'"'+(filters.chapters.includes(c.id)?' checked':'')+'>'+c.number+'. '+esc(c.short||c.title)+'</label>').join('')+'</fieldset>'+
      '<div class="exam-actions"><button class="btn" type="button" id="peAllChapters">Chọn tất cả chương</button><button class="btn" type="button" id="peClearChapters">Bỏ chọn chương</button></div>'+
      '<details class="exam-filters"'+([filters.kind,filters.level,filters.topic,filters.status].some(v=>v!=='all')||filters.query?' open':'')+'><summary>Bộ lọc chi tiết</summary><div class="exam-fields">'+
      '<label>Dạng câu<select id="peKind">'+options({all:'Tất cả dạng',mcq:'Chọn một đáp án',short:'Trả lời số',tf:'Đúng / Sai'},filters.kind)+'</select></label>'+
      '<label>Mức độ (bộ ôn tập)<select id="peLevel">'+options({all:'Tất cả mức độ',...levels},filters.level)+'</select></label>'+
      '<label>Chủ đề<select id="peTopic">'+options({all:'Tất cả chủ đề',...Object.fromEntries([...new Set(all.filter(q=>filters.chapters.includes(q.chapter)).map(q=>q.topic))].map(t=>[t,t]))},filters.topic)+'</select></label>'+
      '<label>Trạng thái học<select id="peStatus">'+options({all:'Tất cả câu',new:'Chưa trả lời',wrong:'Sai ở lần gần nhất',correct:'Đúng ở lần gần nhất',marked:'Đánh dấu cần xem lại',skipped:'Đã bỏ qua'},filters.status)+'</select></label>'+
      '<label class="full-field">Từ khóa hoặc số câu<input type="search" id="peQuery" maxlength="200" value="'+esc(filters.query)+'" placeholder="Ví dụ: dien truong, giao thoa…"></label></div><p class="hint">Tìm kiếm có hoặc không dấu. PDF chưa được gán mức độ; chọn một mức độ cụ thể sẽ chỉ lấy câu từ bộ ôn tập.</p></details>'+
      '<div class="exam-presets"><button type="button" class="btn" data-pe-preset="10,15">10 câu · 15 phút</button><button type="button" class="btn" data-pe-preset="20,30">20 câu · 30 phút</button><button type="button" class="btn" data-pe-preset="40,60">40 câu · 60 phút</button></div>'+
      '<div class="exam-fields"><label>Số câu mong muốn<input id="peCount" type="number" min="1" max="377" required value="'+filters.count+'"></label><label>Thời gian (phút)<input id="peMinutes" type="number" min="1" max="180" required value="'+filters.minutes+'"></label><label class="full-field">Cách lấy câu<select id="peDistribution">'+options({balanced:'Trải đều các chương có câu phù hợp',random:'Ngẫu nhiên toàn bộ'},filters.distribution)+'</select></label></div>'+
      '<div id="pePool" class="exam-pool" role="status"></div><p class="hint">Mỗi câu có trọng số bằng nhau, không trừ điểm. Câu Đúng/Sai phải đúng cả bốn ý. 17 bài PDF cần đối chiếu dữ kiện không dùng trong đề thi.</p>'+
      '<p class="hint">Nếu thi từ PDF khi mất mạng, hãy <a href="../offline.html" target="_blank" rel="noopener">tải trước ảnh đề theo chương</a>.</p>'+
      '<div class="actions"><button class="btn btn-primary" id="peStart">Bắt đầu thi</button><button class="btn btn-ghost" type="button" id="peResetFilters">Xóa bộ lọc</button></div><p class="exam-save-note" id="peSaveNote"></p></form></section>';
  }
  function readForm() {
    filters.chapters=[...document.querySelectorAll('[data-pe-chapter]:checked')].map(e=>e.dataset.peChapter);
    for(const [key,id]of Object.entries({bank:'peBank',kind:'peKind',level:'peLevel',topic:'peTopic',status:'peStatus',query:'peQuery',distribution:'peDistribution'}))filters[key]=document.getElementById(id).value;
    filters.count=Number(document.getElementById('peCount').value);filters.minutes=Number(document.getElementById('peMinutes').value);
  }
  function preview() {
    const candidates=pool(),valid=Number.isInteger(filters.count)&&filters.count>0&&filters.count<=377&&Number.isInteger(filters.minutes)&&filters.minutes>0&&filters.minutes<=180;
    document.getElementById('pePool').innerHTML='<strong>'+candidates.length+' câu phù hợp</strong><p>'+(!filters.chapters.length?'Chọn ít nhất một chương.':!candidates.length?'Không có câu khớp. Thử đổi ngân hàng, bỏ bớt điều kiện hoặc xóa bộ lọc.':!valid?'Nhập 1–377 câu và 1–180 phút.':'Đề sẽ có '+Math.min(filters.count,candidates.length)+' câu · '+filters.minutes+' phút'+(filters.count>candidates.length?' (giới hạn theo số câu đang có).':'.'))+'</p><div class="exam-candidate-chips">'+chapters.map(c=>{const n=candidates.filter(q=>q.chapter===c.id).length;return n?'<span>Ch. '+c.number+': '+n+' câu</span>':'';}).join('')+'</div>';
    document.getElementById('peStart').disabled=!valid||!candidates.length;
    document.getElementById('peSaveNote').textContent=saveFailed?'Trình duyệt không lưu được dữ liệu. Bài sẽ chỉ được giữ trong trang đang mở.':'Bài tự lưu trên trình duyệt này. Rời trang hoặc tải lại không đặt lại thời gian.';
  }
  function complete(item) {
    const q=S.catalog[item.id],a=item.answer;
    if(q.kind==='mcq')return /^[ABCD]$/.test(a.choice||'');
    if(q.kind==='tf')return [...'abcd'].every(k=>['true','false'].includes(a[k]));
    return S.parseNumber(a.numeric)!==null;
  }
  function outcome(item){if(!complete(item))return 'blank';return S.grade(item.id,item.answer).correct?'correct':'wrong';}
  function visibleIndices() {return exam.items.map((_,i)=>i).filter(i=>exam.view==='all'||(exam.view==='flagged'?exam.items[i].flagged:exam.view==='blank'?!complete(exam.items[i]):outcome(exam.items[i])===exam.view));}
  function clockText() {const seconds=Math.max(0,Math.ceil((exam.endsAt-Date.now())/1000));return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');}
  function finish() {
    if(!exam||exam.status!=='active')return;
    exam.status='done';exam.finishedAt=Math.min(Date.now(),exam.endsAt);exam.view='all';exam.index=0;
    S.recordExam(exam.token,exam.items);save();if(refresh)refresh();
  }
  function submit() {
    if(Date.now()>=exam.endsAt){finish();return;}
    const incomplete=exam.items.filter(it=>!complete(it)).length;
    if(incomplete&&!confirm('Còn '+incomplete+' câu chưa trả lời đủ hoặc số chưa hợp lệ. Các câu này tính 0 điểm. Bạn muốn nộp?'))return;
    finish();
  }
  function resultsHeader() {
    const summary=U.summary(exam.items.map(outcome));
    return '<h2>Kết quả thi thử</h2><div class="exam-metrics"><div><b>'+summary.score+'/10</b><span>Điểm</span></div><div><b>'+summary.correct+'</b><span>Đúng</span></div><div><b>'+summary.wrong+'</b><span>Sai</span></div><div><b>'+summary.blank+'</b><span>Chưa trả lời đủ</span></div></div>'+
      '<p>Đúng '+summary.correct+'/'+summary.total+' câu · '+Math.round(100*summary.correct/summary.total)+'% · '+Math.max(0,Math.round(((exam.finishedAt||exam.endsAt)-exam.startedAt)/1000))+' giây. Kết quả đã được đưa vào tiến độ cá nhân.</p>'+
      '<table class="exam-breakdown"><caption>Kết quả theo chương</caption><thead><tr><th>Chương</th><th>Đúng / tổng</th></tr></thead><tbody>'+chapters.map(c=>{const rows=exam.items.filter(it=>S.catalog[it.id].chapter===c.id);return rows.length?'<tr><td>'+esc(c.title)+'</td><td>'+rows.filter(it=>outcome(it)==='correct').length+' / '+rows.length+'</td></tr>':'';}).join('')+'</tbody></table>'+
      '<div class="actions"><button class="btn btn-primary" id="peNewExam">Tạo đề mới</button><a class="btn" href="#ch01/review/wrong">Ôn câu sai</a><a class="btn" href="#ch01/progress">Xem tiến độ</a></div>';
  }
  function question(item,index) {
    const q=S.catalog[item.id],done=exam.status==='done';
    let html='<section class="exam-question-panel" data-pe-question="'+q.id+'"><p class="badge">Câu '+(index+1)+' / '+exam.items.length+' · Ch. '+Number(q.chapter.slice(2))+' · '+(q.source?'PDF gốc':'Bộ ôn tập')+' #'+q.number+'</p><h3 id="peQuestionHeading" tabindex="-1" class="exam-question-title">'+(q.source?'Đề bài gốc · '+esc(q.topic):q.stem)+'</h3>';
    if(q.source)html+='<label class="source-zoom">Cỡ xem ảnh<input id="peZoom" type="range" min="100" max="300" step="25" value="100"><output id="peZoomValue">100%</output></label><div class="source-image-viewport" tabindex="0" aria-label="Ảnh đề gốc, cuộn ngang khi phóng to"><div id="peImageContent" style="width:100%">'+q.segments.map(seg=>'<img class="source-original" src="'+seg.image+'" width="'+seg.width+'" height="'+seg.height+'" alt="Câu '+q.number+', trang PDF '+seg.page+'">').join('')+'</div></div><p><a href="assets/library/pdf/exercises.pdf#page='+q.segments[0].page+'" target="_blank" rel="noopener">Mở trang PDF gốc '+q.segments[0].page+'</a></p>';
    html+='<div class="exam-answer">'+StudyUI.controls(q,{answer:item.answer,locked:done})+'</div>';
    if(done){
      const status=outcome(item),grade=S.grade(q.id,item.answer);
      const key=q.source?SourceSolutions.records[q.id].key:q.answer;
      const answer=q.kind==='tf'?[...'abcd'].map((k,i)=>k+') '+(key[i]==='T'?'Đúng':'Sai')).join(' · '):q.kind==='short'?SourceSolutions.records[q.id].result:key;
      html+='<div class="exam-result-answer"><strong class="exam-result-label '+status+'">'+({correct:'Đúng',wrong:'Sai',blank:'Chưa trả lời đủ / chưa nhập số hợp lệ'})[status]+'</strong>'+(grade.parts?'<p>Kết quả từng ý: '+grade.parts.map((ok,i)=>'abcd'[i]+') '+(ok?'chính xác':'chưa đúng')).join(' · ')+'</p>':'')+'<p>Đáp án: '+esc(answer)+'</p>'+(!q.source?'<p>'+q.whyCorrect+'</p>':'')+'</div>'+(q.source?StudyUI.solution(q,true):'');
    }else html+='<p id="peAnswerHint" class="hint" role="status"></p><button class="btn exam-flag" id="peFlag" aria-pressed="'+!!item.flagged+'">'+(item.flagged?'★ Đã đánh dấu':'☆ Đánh dấu xem lại')+'</button>';
    return html+'</section>';
  }
  function page() {
    if(!exam)return builder();
    if(exam.status==='active'&&Date.now()>=exam.endsAt){exam.status='done';exam.finishedAt=exam.endsAt;exam.view='all';S.recordExam(exam.token,exam.items);save();}
    const done=exam.status==='done',indices=visibleIndices();
    if(!indices.includes(exam.index)&&indices.length)exam.index=indices[0];
    return '<section class="card exam-builder" id="physicsExam">'+(done?resultsHeader():'<h2>Đề thi thử Vật lý</h2><div class="exam-toolbar"><span class="timer" id="peTimer" aria-label="Thời gian còn lại">'+clockText()+'</span><span id="peProgress"></span><button class="btn btn-primary" id="peSubmit">Nộp bài</button></div><p class="hint">Đồng hồ tiếp tục chạy khi rời trang. Tự nộp khi hết giờ; đáp án đang ẩn. Gạch vàng: câu đã đánh dấu.</p>')+
      '<label class="exam-view-label">Hiển thị<select id="peView">'+options(done?{all:'Tất cả câu',wrong:'Câu sai',blank:'Chưa trả lời đủ',correct:'Câu đúng',flagged:'Câu đã đánh dấu'}:{all:'Tất cả câu',blank:'Chưa trả lời đủ',flagged:'Câu đã đánh dấu'},exam.view)+'</select></label>'+
      '<div class="exam-map-wrap"><nav class="question-map" aria-label="Đi đến câu hỏi">'+exam.items.map((it,i)=>'<a href="#" data-pe-jump="'+i+'" class="'+(complete(it)?'is-answered ':'')+(it.flagged?'is-flagged ':'')+(i===exam.index?'is-current':'')+'" aria-label="Câu '+(i+1)+(complete(it)?', đã trả lời':', chưa trả lời đủ')+(it.flagged?', đã đánh dấu':'')+'">'+(i+1)+'</a>').join('')+'</nav></div>'+
      (indices.length?question(exam.items[exam.index],exam.index):'<div class="exam-empty">Không có câu thuộc nhóm này. Chọn “Tất cả câu” để xem đề.</div>')+
      '<div class="exam-actions"><button class="btn" id="pePrev"'+(!indices.some(i=>i<exam.index)?' disabled':'')+'>← Câu trước</button><button class="btn btn-primary" id="peNext"'+(!indices.some(i=>i>exam.index)?' disabled':'')+'>Câu tiếp →</button>'+(!done?'<button class="btn" id="peNextBlank">Câu chưa trả lời</button>':'')+'</div><p id="peSaveNote" class="exam-save-note"></p></section>';
  }
  function updateLive() {
    if(!exam)return;
    const timer=document.getElementById('peTimer'),progress=document.getElementById('peProgress');
    if(timer){timer.textContent=clockText();timer.classList.toggle('is-urgent',exam.endsAt-Date.now()<=60000);}
    if(progress)progress.textContent=exam.items.filter(complete).length+'/'+exam.items.length+' đã trả lời đủ';
    document.querySelectorAll('[data-pe-jump]').forEach(a=>{const it=exam.items[Number(a.dataset.peJump)];a.classList.toggle('is-answered',complete(it));a.classList.toggle('is-flagged',it.flagged);a.setAttribute('aria-label','Câu '+(Number(a.dataset.peJump)+1)+(complete(it)?', đã trả lời':', chưa trả lời đủ')+(it.flagged?', đã đánh dấu':''));});
    const note=document.getElementById('peSaveNote');if(note)note.textContent=saveFailed?'Trình duyệt không lưu được bài. Giữ trang này mở cho đến khi nộp.':S.storageMessage();
  }
  function move(index) {exam.index=index;save();refresh();document.getElementById('peQuestionHeading')?.focus({preventScroll:true});document.querySelector('.exam-question-panel')?.scrollIntoView({block:'start'});}
  function mount(onRefresh) {
    refresh=onRefresh;
    if(!exam){
      const form=document.getElementById('physicsExamForm');
      form.querySelectorAll('input,select').forEach(input=>input.addEventListener(input.type==='search'||input.type==='number'?'input':'change',()=>{
        readForm();
        if(input.dataset.peChapter){if(filters.topic!=='all'&&!all.some(q=>filters.chapters.includes(q.chapter)&&q.topic===filters.topic))filters.topic='all';saveFilters();refresh();}else{saveFilters();preview();}
      }));
      form.onsubmit=e=>{
        e.preventDefault();readForm();const candidates=pool();if(document.getElementById('peStart').disabled)return;
        const selected=U.sample(candidates,filters.count,filters.distribution==='balanced',q=>q.chapter),now=Date.now();
        exam={status:'active',token:typeof crypto.randomUUID==='function'?crypto.randomUUID():'exam-'+now+'-'+Math.random().toString(36).slice(2),items:selected.map(q=>({id:q.id,answer:{},flagged:false})),startedAt:now,endsAt:now+filters.minutes*60000,index:0,view:'all',signature:signature(selected.map(q=>q.id))};
        save();refresh();document.getElementById('physicsExam')?.scrollIntoView({block:'start'});
      };
      document.getElementById('peAllChapters').onclick=()=>{filters.chapters=chapters.map(c=>c.id);saveFilters();refresh();};
      document.getElementById('peClearChapters').onclick=()=>{filters.chapters=[];filters.topic='all';saveFilters();refresh();};
      document.getElementById('peResetFilters').onclick=()=>{filters=defaults();saveFilters();refresh();};
      form.querySelectorAll('[data-pe-preset]').forEach(btn=>btn.onclick=()=>{const [n,m]=btn.dataset.pePreset.split(',').map(Number);filters.count=n;filters.minutes=m;document.getElementById('peCount').value=n;document.getElementById('peMinutes').value=m;saveFilters();preview();});
      preview();return;
    }
    document.getElementById('peView').onchange=e=>{exam.view=e.target.value;save();refresh();};
    document.querySelectorAll('[data-pe-jump]').forEach(a=>a.onclick=e=>{e.preventDefault();exam.view='all';move(Number(a.dataset.peJump));});
    document.getElementById('pePrev').onclick=()=>{const ids=visibleIndices().filter(i=>i<exam.index);if(ids.length)move(ids.at(-1));};
    document.getElementById('peNext').onclick=()=>{const ids=visibleIndices().filter(i=>i>exam.index);if(ids.length)move(ids[0]);};
    const zoom=document.getElementById('peZoom');if(zoom)zoom.oninput=()=>{document.getElementById('peImageContent').style.width=zoom.value+'%';document.getElementById('peZoomValue').textContent=zoom.value+'%';};
    document.querySelectorAll('.exam-question-panel img').forEach(img=>img.onerror=()=>{const notice=document.createElement('p');notice.setAttribute('role','status');notice.innerHTML='Ảnh đề chưa tải được. <a href="../offline.html" target="_blank" rel="noopener">Mở trang tải offline</a> khi có mạng. Đồng hồ vẫn tiếp tục chạy.';img.replaceWith(notice);});
    if(exam.status==='active'){
      document.getElementById('peSubmit').onclick=submit;
      document.getElementById('peNextBlank').onclick=()=>{const ids=exam.items.map((it,i)=>!complete(it)?i:-1).filter(i=>i>=0);if(ids.length){exam.view='blank';move(ids.find(i=>i>exam.index)??ids[0]);}};
      const flag=document.getElementById('peFlag');if(flag)flag.onclick=()=>{if(Date.now()>=exam.endsAt){finish();return;}const it=exam.items[exam.index];it.flagged=!it.flagged;flag.setAttribute('aria-pressed',String(it.flagged));flag.textContent=it.flagged?'★ Đã đánh dấu':'☆ Đánh dấu xem lại';save();updateLive();};
      document.querySelectorAll('#physicsExam [data-answer]').forEach(input=>input.addEventListener(input.type==='radio'?'change':'input',()=>{
        if(Date.now()>=exam.endsAt){finish();return;}
        const it=exam.items[exam.index];it.answer[input.dataset.answer]=input.value;
        const hint=document.getElementById('peAnswerHint');if(hint)hint.textContent=S.catalog[it.id].kind==='short'&&input.value.trim()&&S.parseNumber(input.value)===null?'Số chưa hợp lệ. Nhập số theo đơn vị ở nhãn, ví dụ 0,25 hoặc 2.5e-1.':'Lựa chọn đã ghi nhận; đáp án sẽ mở sau khi nộp.';
        save();updateLive();
      }));
    }else document.getElementById('peNewExam').onclick=()=>{exam=null;save();refresh();};
    updateLive();
  }
  setInterval(()=>{if(exam?.status==='active'){if(Date.now()>=exam.endsAt)finish();else updateLive();}},500);
  window.PhysicsExam={page,mount,active:()=>exam?.status==='active',pool,complete,signature};
})();
