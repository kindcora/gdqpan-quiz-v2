# Kiểm tra lời giải PDF và tiến độ học — 12/09/2026

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
