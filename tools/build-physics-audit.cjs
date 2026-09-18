// Rebuild only after reviewing every changed question and updating tests/fixtures/physics-review.cjs.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),review=require('../tests/fixtures/physics-review.cjs');
const baseline='47489d4e4cc56aa4d83f9a6c212d2a7305101b08';
const current={window:{}},old={window:{}};vm.createContext(current);vm.createContext(old);
const hashes={};
for(let n=1;n<=6;n++){
 const file=`physics/data/ch0${n}.js`,body=fs.readFileSync(path.join(root,file),'utf8');
 vm.runInContext(body,current);vm.runInContext(cp.execFileSync('git',['show',baseline+':'+file],{cwd:root,encoding:'utf8'}),old);
 // Normalize Git checkout line endings for a portable content fingerprint.
 hashes[file]=crypto.createHash('sha256').update(body.replace(/\r\n/g,'\n')).digest('hex');
}
const sources=[
 ['Gauss và điện môi','https://farside.ph.utexas.edu/teaching/em/lectures/node69.html'],
 ['Khoang dẫn và định lý duy nhất','https://farside.ph.utexas.edu/teaching/em/lectures/node62.html'],
 ['Năng lượng tụ điện','https://openstax.org/books/university-physics-volume-2/pages/8-3-energy-stored-in-a-capacitor'],
 ['Hạt chuyển động trong từ trường','https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field'],
 ['Faraday và điện trường cảm ứng','https://openstax.org/books/university-physics-volume-2/pages/13-4-induced-electric-fields'],
 ['Tự cảm và từ thông móc vòng','https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors'],
 ['Cộng hưởng RLC','https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit'],
 ['Giao thoa Young','https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference'],
 ['Phân cực và Malus','https://openstax.org/books/university-physics-volume-3/pages/1-7-polarization'],
 ['Bức xạ vật đen','https://openstax.org/books/university-physics-volume-3/pages/6-1-blackbody-radiation'],
 ['Hiệu ứng quang điện ngoài','https://openstax.org/books/university-physics-volume-3/pages/6-2-photoelectric-effect'],
 ['Photodiode và vùng cấm bán dẫn','https://hub.hamamatsu.com/us/en/technical-notes/detector-selection/guide-to-detector-selection.html'],
 ['Hằng số Planck trong SI','https://www.nist.gov/si-redefinition/definitions-si-base-units'],
 ['Điện tích ảnh và cầu dẫn nối đất','https://www.feynmanlectures.caltech.edu/II_06.html']
];
const sourceByChapter=[[1,2,3],[4],[5,6],[5,7],[8,9],[10,11,12,13]];
const rows=[],essayRows=[];
current.window.VLDC_CHAPTERS.forEach((ch,c)=>{
 ch.mcq.forEach((q,n)=>{
  if(q.answer!==review.keys[c][n]||!review.notes[c][n])throw Error('Review mismatch '+ch.id+'/'+(n+1));
  const prev=old.window.VLDC_CHAPTERS[c].mcq[n];
  rows.push({id:`${ch.id}-mcq-${String(n+1).padStart(2,'0')}`,chapter:ch.id,number:n+1,answer:review.keys[c][n],previousAnswer:prev.answer,changed:JSON.stringify(q)!==JSON.stringify(prev),note:review.notes[c][n]});
 });
 ch.essays.forEach((e,n)=>essayRows.push({id:`${ch.id}-essay-${n+1}`,chapter:ch.id,number:n+1,title:e.title,note:review.essays[c][n],changed:JSON.stringify(e)!==JSON.stringify(old.window.VLDC_CHAPTERS[c].essays[n])}));
});
const changes=rows.filter(r=>r.answer!==r.previousAnswer),summary={mcq:144,essays:36,answerKeyChanges:changes.length,mcqRevised:rows.filter(r=>r.changed).length,essaysRevised:essayRows.filter(r=>r.changed).length,sourcePdfQuestionsWithoutOfficialKey:250};
const manifest={date:'2026-09-12',baseline,scope:'144 existing MCQs and 36 worked essays. The 250 original PDF exercises are covered separately in source-solution-audit.json.',summary,hashes,sources,questions:rows,essays:essayRows};
fs.writeFileSync(path.join(root,'physics/data/answer-audit.json'),JSON.stringify(manifest,null,2)+'\n');
const intro='Đã rà 144 câu trắc nghiệm và 36 bài tự luận có lời giải của 6 module: kiểm tra dữ kiện, đáp án, đơn vị, dấu, điều kiện áp dụng và các phương án còn lại. Các phép tính dùng hằng số/làm tròn nêu trong đề. Đây là kết quả rà soát, không phải chứng nhận chính xác tuyệt đối hay đáp án chính thức của giảng viên.';
const limitations='250 bài PDF có lời giải và báo cáo riêng tại source-solutions.html (233 câu tự chấm, 17 câu cần đối chiếu). Số câu trong bảng dưới đây là số tại tab Trắc nghiệm/Tự luận, không phải số câu của PDF. Xem mục 250 lời giải PDF để đối chiếu đúng ngân hàng.';
const fixes=[
 'Module 1, trắc nghiệm câu 19: đổi A → B. C = 7,08 pF, W = 3,186 × 10⁻⁷ J ≈ 3,19 × 10⁻⁷ J; trước đó chia đôi thêm một lần. Bài tự luận 4 và phần mẹo đã sửa đồng bộ.',
 'Sửa phân biệt điện tích tự do/tổng điện tích trong Gauss và chứng minh E = 0 trong khoang dẫn; bổ sung điều kiện tuyến tính, đẳng hướng, phi tương đối tính khi cần.',
 'Tách Φ một vòng và Ψ = NΦ móc vòng; sửa các khẳng định quá rộng về dòng cảm ứng, điện trường xoáy, dòng dịch và dao động tắt dần.',
 'Làm rõ cường độ ngay trước bản phân tích trong Malus; sửa đường tia kính tiềm vọng, ngưỡng quang điện, hằng số Planck và phân biệt công thoát với vùng cấm photodiode.',
 'Sửa mô phỏng khoảng vân Young, chiều từ trường quanh dây, cầu dẫn nối đất, pha/biên độ RLC và ngưỡng quang điện. Đồ họa dùng thang minh họa được ghi rõ; không coi độ dài mũi tên là đại lượng SI.',
 'Phần mẹo lấy từ lời giải đã rà soát để tránh lưu hai bản đáp án khác nhau. Khi tải bài làm từ phiên bản cũ, giữ lựa chọn nhưng mở lại trạng thái chấm để người học kiểm tra với đề mới.'
];
let md='# Rà soát đáp án Vật lý đại cương — 12/09/2026\n\n'+intro+'\n\n'+limitations+'\n\n## Các sửa đổi chính\n\n'+fixes.map(x=>'- '+x).join('\n')+`\n\nCó **${summary.answerKeyChanges} câu đổi ký tự đáp án**, **${summary.mcqRevised} câu trắc nghiệm** và **${summary.essaysRevised} bài tự luận** được sửa nội dung/lời giải/điều kiện so với bản trước. Sửa nội dung không đồng nghĩa từng mục trước đó đều có đáp án sai.\n`;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let html=`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Đối chiếu đáp án VLĐC</title><style>body{margin:0;background:#101723;color:#e9eef7;font:16px/1.65 system-ui,sans-serif}main{max-width:1050px;padding:24px;margin:auto}a{color:#a8c8ff}h1{font-size:clamp(26px,4vw,38px)}h2{margin-top:36px}.note{padding:16px;background:#25334a;border-radius:12px}li{margin:8px 0}.table{overflow-x:auto}table{border-collapse:collapse;width:100%;min-width:480px}td,th{border-bottom:1px solid #3d4c63;text-align:left;padding:12px;vertical-align:top}td:first-child{white-space:nowrap}details{margin:16px 0}summary{cursor:pointer;padding:12px;background:#1d293b;border-radius:10px}small{color:#b9c6d8}</style><main><a href="index.html#ch01/quiz">← Về ôn tập VLĐC</a><h1>Đối chiếu đáp án VLĐC</h1><p><strong>Rà soát ngày 12/09/2026 · 144 trắc nghiệm + 36 tự luận</strong></p><p>${escape(intro)}</p><p class="note">${escape(limitations)}</p><p><a href="source-solutions.html">250 lời giải PDF và các câu cần đối chiếu →</a></p><h2>Các sửa đổi chính</h2><ul>${fixes.map(x=>'<li>'+escape(x)+'</li>').join('')}</ul><p>${summary.answerKeyChanges} câu đổi ký tự đáp án; ${summary.mcqRevised} câu trắc nghiệm và ${summary.essaysRevised} tự luận được chỉnh nội dung hoặc điều kiện.</p>`;
for(const ch of current.window.VLDC_CHAPTERS){
 const refs=sourceByChapter[ch.number-1].map(n=>`[${sources[n-1][0]}](${sources[n-1][1]})`).join(' · ');
 md+=`\n## Module ${ch.number} · ${ch.title}\n\nNguồn đối chiếu nguyên lý: ${refs}. Phép tính cụ thể được tính lại từ dữ kiện của từng bài.\n\n| Câu trắc nghiệm | Đáp án | Kiểm tra / điều kiện |\n| --- | --- | --- |\n`;
 html+=`<h2 id="${ch.id}">Module ${ch.number} · ${escape(ch.title)}</h2><p>Nguồn nguyên lý: ${sourceByChapter[ch.number-1].map(n=>`<a href="${sources[n-1][1]}">${escape(sources[n-1][0])}</a>`).join(' · ')}.</p><details open><summary>24 câu trắc nghiệm</summary><div class="table"><table><tr><th>Câu</th><th>Đáp án</th><th>Kiểm tra / điều kiện</th></tr>`;
 for(const r of rows.filter(r=>r.chapter===ch.id)){
  md+=`| ${r.number} | **${r.answer}**${r.answer!==r.previousAnswer?' (sửa từ '+r.previousAnswer+')':''} | ${r.note.replace(/\|/g,'\\|')} |\n`;
  html+=`<tr><td>${r.number}</td><td><strong>${r.answer}</strong>${r.answer!==r.previousAnswer?' (sửa từ '+r.previousAnswer+')':''}</td><td>${escape(r.note)}</td></tr>`;
 }
 md+='\n| Bài tự luận | Kết luận kiểm tra |\n| --- | --- |\n';
 html+='</table></div></details><details><summary>6 bài tự luận</summary><div class="table"><table><tr><th>Bài</th><th>Kết luận kiểm tra</th></tr>';
 for(const r of essayRows.filter(r=>r.chapter===ch.id)){md+=`| ${r.number} | ${r.note.replace(/\|/g,'\\|')} |\n`;html+=`<tr><td>${r.number}</td><td>${escape(r.note)}</td></tr>`;}
 html+='</table></div></details>';
}
md+='\n## Kiểm chứng kỹ thuật và giới hạn\n\nBộ kiểm thử đối chiếu 144 quyết định đáp án độc lập với dữ liệu ứng dụng, tính lại các bài số, kiểm tra cả 4 lựa chọn cho từng câu trên trình duyệt và trạng thái bài làm sau khi cập nhật. Kiểm thử phần mềm không chứng minh tính đúng tuyệt đối của nội dung vật lý. Với đề thi chính thức, cần dùng đúng giả thiết, ký hiệu và hằng số của đề; có thể gửi bảng này cho giảng viên đối chiếu.\n\nBản ghi có dấu vân tay dữ liệu: [answer-audit.json](data/answer-audit.json). Khi sửa đề/lời giải phải rà lại bản ghi kiểm tra, cập nhật phiên bản bài làm trong app và tạo lại báo cáo bằng `node tools/build-physics-audit.cjs`.\n\n## Các nguồn bổ sung\n\n'+sources.map(([name,url])=>`- [${name}](${url})`).join('\n')+'\n';
html+='<h2>Phạm vi xác nhận</h2><p>Kiểm thử phần mềm không chứng minh nội dung vật lý đúng tuyệt đối. Dùng đúng điều kiện và hằng số của đề; bảng này hỗ trợ đối chiếu với giảng viên. Các bản PDF gốc được giữ nguyên; lời giải PDF được biên soạn riêng và liên kết theo trang nguồn.</p><p><a href="data/answer-audit.json">Bản ghi kiểm tra và dấu vân tay dữ liệu</a> · <a href="ANSWER_AUDIT.md">Bản Markdown</a></p></main></html>';
fs.writeFileSync(path.join(root,'physics/ANSWER_AUDIT.md'),md);fs.writeFileSync(path.join(root,'physics/answer-audit.html'),html);
console.log(summary);
