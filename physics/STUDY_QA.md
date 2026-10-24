# Rà lại toàn bộ đáp án — 24/10/2026

Đã đọc lại 144 câu trắc nghiệm (kể cả lý do loại từng phương án), 36 bài tự luận và ảnh gốc của 250 bài PDF trên các trang 2–47. Đối chiếu số mũ, đơn vị, hình vẽ và điều kiện áp dụng; không dùng riêng văn bản OCR để tính. Các nguồn nguyên lý nằm trong [báo cáo ngân hàng ôn tập](answer-audit.html) và [báo cáo PDF](source-solutions.html). Đây là rà soát độc lập, không phải đáp án chính thức của giảng viên hoặc bảo đảm đúng tuyệt đối.

## Kết quả đợt này

- Giữ nguyên 144 ký tự đáp án và kết quả của 36 tự luận. Làm rõ điều kiện/ký hiệu ở Ch.1 trắc nghiệm 8, 18; Ch.1 tự luận 3; Ch.3 trắc nghiệm 6.
- 250 bài PDF: 228 bài có kết luận để tự chấm, 22 bài còn cần đối chiếu. Thêm 5 câu: Ch.4 #40 (mức xấp xỉ RLC), Ch.5 #6 (lõi và vỏ sợi quang), #23 và #24 (vị trí vùng quan sát), Ch.6 #2 (định nghĩa bức xạ cân bằng). Lời giải và PDF gốc vẫn được giữ.
- Loại câu chưa xác định khỏi thi thử và tỷ lệ đúng; không tiếp tục gắn nhãn “sai nhiều lần” từ đáp án đã rút. Giữ lựa chọn, ghi chú, mức tự tin và lịch sử cũ. Phiên bản đáp án PDF đổi thành `2026-10-24-pdf-2`; điểm cũ cần kiểm tra lại.
- 70 kiểm thử của bản GitHub đã đạt (gồm kiểm tra hồi quy Quốc phòng và PWA); 38 kiểm thử tập trung vào nội dung/luồng học liên quan: 576 lượt chọn của bộ 144 câu; các tổ hợp Đúng/Sai; 56 phép tính số PDF đủ điều kiện tự chấm; các bài số trắc nghiệm/tự luận; ví dụ phản chứng cho đếm vân và sợi quang; RLC có/không tắt dần; giữ bài làm; thi thử offline; không tràn ngang ở 320–1440 px. Kiểm thử phần mềm không thay thế kiểm tra nội dung hoặc thử trên iPhone thật.

## Hồ sơ kiểm tra trước đây

Nội dung dưới đây ghi nhận đợt 12/09/2026; số lượng tự chấm và kiểm thử của đợt đó không phải số hiện tại.


## Phạm vi nội dung

- 250/250 bài có kết luận và lời giải 3 bước, đủ mọi liên kết trang nguồn; giữ nguyên hai PDF và 273 mảnh ảnh đề.
- 233 bài chấm được, 17 bài giải theo điều kiện và cần đối chiếu đề. Danh sách lý do nằm tại [bảng lời giải](source-solutions.html).
- Đọc các trang bài tập 2–47 và rà lại ảnh riêng của cả 58 câu trả lời ngắn. Đối chiếu độc lập phép tính của 57 câu số được chấm; câu số còn lại thiếu điều kiện phát sóng.
- Sửa đơn vị câu 29 Điện học theo ảnh gốc: **−4,9 pC**, không phải giá trị đó theo μC. Ghi rõ sự khác biệt picocoulomb/microcoulomb.
- Câu 25 Lượng tử nằm sát ngưỡng công thoát của đồng: hằng số SI chính xác và hằng số làm tròn thông dụng có thể dẫn tới hai phương án khác nhau. Không tự chấm câu này.
- Lời giải là nội dung biên soạn độc lập, không phải đáp án chính thức của giảng viên. Kiểm thử phần mềm không chứng nhận tính đúng tuyệt đối của kiến thức.

## Kiểm thử phần mềm

`npm test`: **47 kiểm thử qua, 0 lỗi** trên Edge không giao diện. Bao gồm:

- 576 tình huống chấm bộ 144 trắc nghiệm cũ; bảo toàn việc mở lại kết quả từ bản đáp án cũ.
- Toàn bộ phương án của các câu PDF nhiều lựa chọn và 16 tổ hợp của từng câu Đúng/Sai được chấm; đủ 250 lời giải/trang nguồn.
- 57 phép tính độc lập, đáp số làm tròn/chưa làm tròn, dấu âm, dấu phẩy, số mũ, chuỗi không hợp lệ và đơn vị.
- Không đếm trùng khi kiểm tra câu rồi nộp toàn bài; đếm sai lặp lại chỉ sau lần làm lại; sửa đúng cập nhật tỷ lệ nhưng giữ số lần sai cũ.
- Bộ ôn từ câu sai, bỏ qua, đánh dấu và PDF chưa làm; lọc chương và giữ thứ tự câu trong một lượt.
- Nhập lựa chọn cũ một lần; không tạo thời gian, chuỗi ngày hoặc lịch sử sai giả. Dữ liệu hỏng/chặn lưu trữ không làm hỏng trang học.
- Chuỗi ngày qua ranh giới tháng; thời gian chỉ tăng khi hoạt động ở trang đang hiển thị, dừng khi không tương tác/chuyển cửa sổ.
- Mở đủ ảnh của 250 câu. Kiểm tra tràn ngang ở 320, 390, 768 và 1440 px; ảnh PDF và bộ ôn phóng to 300% vẫn cuộn trong khung.

## Kiểm tra giao diện

Đã xem ảnh chụp trang tiến độ có dữ liệu trên máy tính và điện thoại, lời giải số trên mobile, bộ ôn và trang đối chiếu. Có nhãn cho các ô nhập, thông báo kết quả bằng chữ, trạng thái bàn phím và nút chuyển câu ở cuối lượt đọc. Chưa thay thế cho thử nghiệm trên thiết bị điện thoại thật.

## Duy trì

- `physics/data/source-library.js`: chỉ mục nguyên bản, không đưa đáp án vào dữ liệu nguồn.
- `physics/data/solutions-ch01.js` đến `solutions-ch06.js`: lời giải, đáp án/giới hạn chấm và lý do cần đối chiếu.
- Khi sửa đáp án, đổi `SourceSolutions.revision` để loại kết quả chấm cũ khỏi tỷ lệ cho đến khi người học kiểm tra lại.
- Sau thay đổi nội dung: chạy `node tools/build-source-solutions.cjs` và `npm test`. Bản ghi JSON lưu dấu vân tay nội dung đã chuẩn hóa xuống dòng.
- Không dùng dấu tự tin hoặc việc mở lời giải để suy ra người học trả lời đúng.
