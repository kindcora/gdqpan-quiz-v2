const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),ctx={};ctx.window=ctx;vm.createContext(ctx);
const files=['source-library','source-solutions',...Array.from({length:6},(_,i)=>'solutions-ch0'+(i+1))],hashes={};
for(const name of files){const file='physics/data/'+name+'.js',body=fs.readFileSync(path.join(root,file),'utf8');vm.runInContext(body,ctx);hashes[file]=crypto.createHash('sha256').update(body.replace(/\r\n/g,'\n')).digest('hex');}
const rows=Object.values(ctx.SourceSolutions.records),pending=rows.filter(r=>r.key===null),graded=rows.length-pending.length;
if(rows.length!==250)throw Error('Expected 250 solutions');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sources=[
 ['Coulomb và điện trường','https://openstax.org/books/university-physics-volume-2/pages/5-3-coulombs-law'],
 ['Năng lượng tụ điện','https://openstax.org/books/university-physics-volume-2/pages/8-3-energy-stored-in-a-capacitor'],
 ['Chuyển động điện tích trong từ trường','https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field'],
 ['Faraday và điện trường cảm ứng','https://openstax.org/books/university-physics-volume-2/pages/13-4-induced-electric-fields'],
 ['Tự cảm và cuộn cảm','https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors'],
 ['Dao động LC','https://openstax.org/books/university-physics-volume-2/pages/14-5-oscillations-in-an-lc-circuit'],
 ['Dao động RLC tắt dần','https://openstax.org/books/university-physics-volume-2/pages/14-6-rlc-series-circuits'],
 ['Giao thoa Young','https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference'],
 ['Bản mỏng và độ lệch pha','https://openstax.org/books/university-physics-volume-3/pages/3-4-interference-in-thin-films'],
 ['Nhiễu xạ khe đơn','https://openstax.org/books/university-physics-volume-3/pages/4-1-single-slit-diffraction'],
 ['Phân cực và Malus','https://openstax.org/books/university-physics-volume-3/pages/1-7-polarization'],
 ['Bức xạ vật đen','https://openstax.org/books/university-physics-volume-3/pages/6-1-blackbody-radiation'],
 ['Phương trình quang điện','https://openstax.org/books/university-physics-volume-3/pages/6-2-photoelectric-effect'],
 ['Hằng số SI — NIST','https://www.nist.gov/si-redefinition/meet-constants'],
 ['Năng lượng photon trung bình của phổ Planck — MIT','https://web.mit.edu/8.286/www/quiz18/q3sols-euf18.pdf'],
 ['Phân chia dải UHF/SHF — ITU, Radio Regulations 2024','https://search.itu.int/history/HistoryDigitalCollectionDocLibrary/1.49.48.fr.201.pdf']
];
const intro=`Đủ 250 bài có lời giải từng bước, liên kết đến trang PDF và kết luận theo dữ kiện gốc. ${graded} bài được chấm tự động; ${pending.length} bài có dữ kiện hoặc cách diễn đạt chưa xác định đáp án duy nhất, được giải theo điều kiện và không đưa vào tỷ lệ đúng.`;
const limitations='Đây là lời giải biên soạn độc lập, không phải bảng đáp án chính thức của giảng viên. Đã đọc ảnh đề gốc để kiểm tra ký hiệu, đơn vị và hình vẽ; không dùng OCR làm nguồn tính toán. Kiểm thử phần mềm không chứng minh nội dung đúng tuyệt đối. Các câu nêu giả thiết lý tưởng chỉ kết luận trong phạm vi giả thiết đó.';
let html='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>250 lời giải PDF · VLĐC</title><link rel="stylesheet" href="../css/app.css"><link rel="stylesheet" href="css/app.css"><link rel="stylesheet" href="css/study.css"><style>.app{max-width:1050px}.audit-row{border-top:1px solid var(--line);padding:18px 0;overflow-wrap:anywhere}.audit-row summary{cursor:pointer;line-height:1.7}.audit-row li{margin:12px 0;line-height:1.8}.audit-links{display:flex;flex-wrap:wrap;gap:14px}.audit-row:target{outline:2px solid #9be8ce;outline-offset:6px}h1{font-size:clamp(28px,5vw,44px)}</style></head><body><main class="app"><section class="card"><a href="index.html#ch01/source">← Học và làm bài</a><p class="eyebrow">ĐỐI CHIẾU NỘI DUNG · 12/09/2026</p><h1>250 bài PDF, từng bước rõ ràng</h1><p>'+intro+'</p><p class="hint">'+limitations+'</p><div class="actions"><a class="btn btn-primary" href="index.html#ch01/source">Làm bài PDF</a><a class="btn" href="index.html#ch01/progress">Tiến độ cá nhân</a><a class="btn" href="index.html#ch01/review">Ôn câu sai</a></div><h2>Các câu cần đối chiếu</h2><p>Không ép chọn một đáp án khi đề thiếu điều kiện hoặc phương án chồng lấn. Mở từng câu để xem phần vẫn kết luận được và điều kiện còn thiếu.</p><ul>'+pending.map(r=>'<li><a href="#'+r.id+'">Ch.'+Number(r.chapter.slice(2))+' · Câu '+r.number+'</a>: '+esc(r.issue)+'</li>').join('')+'</ul><h2>Cách đọc và chấm bài</h2><ul><li>Số trang PDF là số trang trên trình đọc; số trang in trên giấy bằng số trang PDF trừ 1. Câu nối trang có đầy đủ liên kết.</li><li>Câu số: nhập theo đúng đơn vị trong nhãn, chấp nhận dấu phẩy và số mũ. Khoảng chấp nhận có tính làm tròn, không bỏ qua lỗi đơn vị hoặc sai dấu.</li><li>Câu Đúng/Sai: chấm sau khi chọn đủ a–d; chỉ tính đúng cả câu khi cả bốn ý đúng.</li><li>Đã chắc chắn / Cần xem lại / Chưa có đáp án là mức tự đánh dấu. Không thay thế kết quả kiểm tra.</li><li>Dùng hằng số được nêu trong đề; nếu không nêu, lời giải ghi giá trị sử dụng. Riêng Ch.6 câu 25, làm tròn h,c,e có thể đổi đáp án ở sát ngưỡng nên chưa tự chấm.</li></ul><nav class="audit-links" aria-label="Chương">'+ctx.VLDC_SOURCE_LIBRARY.chapters.map(ch=>'<a href="#'+ch.id+'">'+esc(ch.title)+'</a>').join('')+'</nav>';
let md='# 250 lời giải bài tập PDF\n\n'+intro+'\n\n'+limitations+'\n\n';
for(const ch of ctx.VLDC_SOURCE_LIBRARY.chapters){
 html+='<h2 id="'+ch.id+'">'+esc(ch.title)+'</h2>';md+='## '+ch.title+'\n\n';
 for(const r of rows.filter(r=>r.chapter===ch.id)){
  html+='<details class="audit-row" id="'+r.id+'"><summary><strong>Câu '+r.number+'</strong> · '+(r.key===null?'Cần đối chiếu':'Có kết luận để chấm')+' · trang PDF '+r.pages.join(', ')+'</summary><p><strong>'+esc(r.result)+'</strong></p>'+(r.issue?'<p class="study-caution">'+esc(r.issue)+'</p>':'')+'<ol>'+r.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><p>'+r.pages.map(p=>'<a href="assets/library/pdf/exercises.pdf#page='+p+'" target="_blank" rel="noopener">PDF '+p+' / trang in '+(p-1)+'</a>').join(' · ')+' · <a href="index.html#'+r.chapter+'/source/'+r.number+'">Mở bài để luyện</a></p></details>';
  md+='### Câu '+r.number+' · PDF '+r.pages.join(', ')+'\n\n**'+r.result+'**\n\n'+(r.issue?'Cần đối chiếu: '+r.issue+'\n\n':'')+r.steps.map((s,i)=>(i+1)+'. '+s).join('\n')+'\n\n';
 }
}
html+='<h2>Nguồn nguyên lý để đối chiếu</h2><p>Các nguồn sau hỗ trợ định luật và mô hình; không phải đáp án sẵn cho 250 câu trong tài liệu.</p><ul>'+sources.map(([name,url])=>'<li><a href="'+url+'" target="_blank" rel="noopener">'+name+'</a></li>').join('')+'</ul><p><a href="SOURCE_SOLUTIONS.md">Bản lời giải Markdown</a> · <a href="data/source-solution-audit.json">Bản ghi và dấu vân tay dữ liệu</a> · <a href="answer-audit.html">Đối chiếu 144 trắc nghiệm + 36 tự luận</a></p></section></main><script>function reveal(){const el=document.getElementById(location.hash.slice(1));if(el&&el.tagName==="DETAILS")el.open=true;}addEventListener("hashchange",reveal);reveal();</script></body></html>';
md+='## Nguồn nguyên lý\n\n'+sources.map(([name,url])=>'- ['+name+']('+url+')').join('\n')+'\n';
fs.writeFileSync(path.join(root,'physics/source-solutions.html'),html+'\n');
fs.writeFileSync(path.join(root,'physics/SOURCE_SOLUTIONS.md'),md);
fs.writeFileSync(path.join(root,'physics/data/source-solution-audit.json'),JSON.stringify({revision:ctx.SourceSolutions.revision,date:'2026-09-12',count:250,autograded:graded,conditional:pending.length,hashes,sources,records:rows},null,2)+'\n');
console.log(JSON.stringify({solutions:rows.length,autograded:graded,conditional:pending.length}));
