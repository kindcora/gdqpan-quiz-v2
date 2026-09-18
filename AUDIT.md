# Báo cáo cải thiện GDQPAN Quiz

Ngày: 11/09/2026. Repo: `kindcora/gdqpan-quiz`.
Commit gốc: `c1a972a05455036ed1ba22ea42a2bcbfac86d257`.
Nhánh sửa cục bộ: `improve/quiz-mobile-ux`.

## Kết quả

Đã cải thiện giao diện Quốc phòng, CSS dùng chung, giao diện mobile Vật lý và
sửa luồng làm bài/lưu trạng thái. Website vẫn chạy tĩnh, không thêm dịch vụ ngoài.
Báo cáo mô tả bản sửa từ commit gốc nêu trên. Trạng thái phát hành xem lịch sử commit và GitHub Actions của repository.

## Lỗi và cách xử lý

| Vấn đề | Xử lý |
| --- | --- |
| “Dừng” ở trang đầu gây lỗi đặt `kind` trên null | Kiểm tra phiên tồn tại, thông báo phù hợp. Đã tái hiện lỗi trên mã nguồn gốc. |
| “Câu sai” trước khi luyện gây lỗi đọc `history` của null | Đọc lịch sử an toàn khi chưa có phiên. Đã tái hiện lỗi trên mã nguồn gốc. |
| Có lưu localStorage nhưng không khôi phục | Khôi phục câu, thứ tự đáp án, lịch sử, bộ lọc phiên, kết quả và hạn giờ; kiểm tra dữ liệu trước khi dùng. |
| Tuần tự vẫn ưu tiên bài vừa làm sai | Chỉ ưu tiên bài trong chế độ ngẫu nhiên. |
| Xáo cả lựa chọn “cả ba phương án trên” | Giữ thứ tự câu có tham chiếu đến lựa chọn để tránh đổi nghĩa. |
| Kết quả dùng ký tự gốc trong khi đáp án đã xáo | Hiển thị ký tự đang thấy và nội dung; kết quả thi hiện lại đủ lựa chọn. |
| Đề 0 câu/0 phút hoặc số quá lớn vẫn chạy | Kiểm tra số nguyên, số câu và thời gian 1–180 phút. |
| Xem đáp án/chuyển vòng trong lúc đang thi | Yêu cầu nộp trước; “Dừng” chuyển qua luồng nộp và chấm. |
| Nộp thiếu câu không xác nhận | Hiện số câu trống và xác nhận; kết quả ghi số bỏ trống. |
| Reload làm mất bộ đếm thi | Giữ hạn giờ tuyệt đối, quá hạn tự nộp; không nhận thay đổi đáp án sau hạn giờ. |
| Phím A–D có thể chấm câu cũ khi đang xem lại | Chỉ nhận phím khi màn luyện hiện hữu; bỏ qua Ctrl/Alt/Meta, phím lặp và nút đang focus. Thêm nút quay lại bài đang luyện. |
| Vật lý mất lựa chọn/câu đã kiểm tra khi reload | Lưu và khôi phục theo module; đáp án vẫn ẩn trước khi kiểm tra. |
| Vật lý render lại DOM làm mất focus | Trả focus về lựa chọn hoặc phản hồi vừa chấm. |
| Thiếu thư viện CDN làm lab không dùng được | Hiện hướng dẫn tải lại; lý thuyết và bài tập vẫn thao tác được. |

## UI/UX và mobile

- Trang đầu có giới thiệu, số câu theo bộ lọc và lựa chọn luyện/thi rõ ràng.
- Tách bộ lọc khỏi điều hướng, thu gọn lệnh nâng cao, giữ thao tác phổ biến.
- Tăng độ tương phản chữ phụ; chữ đáp án 16px; nút chính tối thiểu 44px.
- Thanh tiến độ luyện; thanh thời gian/nộp bài cố định trong vùng đề.
- Bảng số câu đánh dấu câu đã chọn, hỗ trợ nhảy đến câu cần làm.
- Bộ lọc co giãn; văn bản dài xuống dòng; bảng/công thức dài cuộn trong vùng riêng;
  tab Vật lý thành lưới 2 cột trên mobile.
- Có focus bàn phím, liên kết bỏ qua điều hướng, nhãn ô lệnh/nhóm radio,
  phản hồi đúng/sai bằng chữ/ký hiệu, hỗ trợ giảm chuyển động.
- Bỏ nhãn “30 giây” vì luyện tập thực tế không giới hạn thời gian.
- Vật lý ghi rõ 24 câu TN và 6 tự luận **mỗi module**.

Trang đầu bản gốc không tái hiện tràn ngang ở 7 chiều rộng đã thử.
Các thay đổi mobile tập trung vào dễ đọc, kích thước chạm và nội dung dài;
không coi việc thay bố cục là bằng chứng rằng mọi trang mobile cũ đều lỗi.

## Dữ liệu cần đối chiếu

**HP1 #194:** A chỉ có “Anh”; B chứa cả phần tình huống, câu hỏi và “Anh T.”.
Không có Word gốc trong repo để xác nhận cách tách chính xác. Đã giữ nguyên bản ghi
và đáp án nguồn, tạm loại khỏi luyện/thi; màn xem lại có cảnh báo. Còn 419 câu luyện.

**HP2 #74:** hỏi cả số tội danh và phạm vi điều luật, nhưng lựa chọn chỉ có số
10/11/9/12. Cần đối chiếu tài liệu gốc. Chưa sửa nội dung/đáp án khi thiếu nguồn.

Có 48 bản ghi gắn `duplicate-stem` và 6 bản ghi `merged-split`. Trùng thân câu
không tự động đồng nghĩa sai đáp án vì lựa chọn có thể khác. Không tự xóa/gộp.

Kiểm tra cấu trúc xác nhận 420 ID duy nhất, đủ A–D, đáp án hợp lệ, JSON nguồn trùng
dữ liệu nhúng; 6 module Vật lý có 24 câu TN/module. **Chưa thẩm định chuyên môn
toàn bộ đáp án hoặc đối chiếu luật hiện hành.**

## Kiểm thử

- **19/19 kiểm thử tự động đạt**, Node.js, Playwright 1.62.1, Edge headless/Windows.
- GDQPAN: 320, 360, 390, 430, 768, 1024, 1440px; trang đầu, bộ lọc, luyện,
  phản hồi, thi và kết quả không tràn ngang trong các tình huống kiểm thử.
- Đã thử chấm sau xáo, khóa đáp án, checkpoint 5 câu, tuần tự, câu sai, xem lại,
  localStorage hỏng/bị chặn, nộp thiếu, hết giờ trực tiếp và hết giờ khi reload.
- Vật lý: chọn/kiểm tra/reload; cả 6 module qua lý thuyết, trắc nghiệm, tự luận.
  Kiểm tra bổ sung 320px, mở lời giải và phản hồi; không tràn toàn trang.
- Cả 6 lab tải thư viện thật, có đủ 2 canvas (2D/3D); không JavaScript exception
  trong lượt thử. Có thử riêng trường hợp chặn CDN.
- Đã xem ảnh render desktop, mobile trang đầu, câu hỏi và đề thi.
- Kiểm tra cú pháp JavaScript và `git diff --check` đạt.

Mobile là mô phỏng viewport/touch trên Edge, chưa chạy trên iPhone Safari/Android
thật. Chưa kiểm chứng độ chính xác khoa học và mọi thao tác kéo/thả trong lab.
Phiên lưu v1 cũ được giữ nguyên nhưng không tự nhập vào phiên v2 mới.

## Sử dụng

Giải nén mã nguồn, mở `index.html` hoặc phục vụ qua HTTP như README.
Nếu đã có clone đúng commit gốc, có thể dùng patch kèm theo thay cho zip:

```sh
git switch -c improve/quiz-mobile-ux
git apply --check gdqpan-ui-ux.patch
git apply gdqpan-ui-ux.patch
```

Chạy kiểm thử theo README, xem diff rồi commit/push lên nhánh phù hợp.
Không cần dùng zip và patch cùng lúc.
