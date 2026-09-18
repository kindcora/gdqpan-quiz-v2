# Thư viện tài liệu Vật lý đại cương

Nhập ngày 11/09/2026 từ hai PDF do chủ dự án cung cấp. Đây là tài liệu quét ảnh, không có lớp chữ có thể trích xuất. Đề bài, công thức và hình vẽ được trình bày bằng ảnh nguồn để giữ đúng ký hiệu.

## Tài liệu và phạm vi

| Tên file cung cấp | Bản lưu | Số trang | Nội dung |
| --- | --- | --- | --- |
| `BAI_TAP_VAT_LY_DAI_CUONG_FULL.pdf` | [exercises.pdf](assets/library/pdf/exercises.pdf) | 47 | Bìa và 250 bài của 6 module |
| `BAI_TAP_VAT_LY_DAI_CUONG_FULL-1.pdf` | [lectures.pdf](assets/library/pdf/lectures.pdf) | 56 | Bìa, mục lục, bài giảng đến giữa Module 5 và 3 trang bài tập lặp |

Hai bản PDF được sao chép nguyên byte. SHA-256, tên file gốc và phạm vi từng module nằm trong [manifest](data/source-library-manifest.json). Số trang dưới đây tính từ đầu PDF, gồm bìa; có thể khác số trang in trên giấy.

| Module | Số bài | Trang PDF bài tập | Trang PDF bài giảng |
| --- | ---: | --- | --- |
| 1 · Điện học | 41 | 2–10 | 7–18 |
| 2 · Từ học | 41 | 11–17 | 19–26 |
| 3 · Cảm ứng điện từ | 45 | 18–25 | 27–35 |
| 4 · Trường điện từ, dao động và sóng | 41 | 26–34 | 36–47 |
| 5 · Quang học | 41 | 35–41 | 48–53, chưa hết module |
| 6 · Vật lý lượng tử | 41 | 42–47 | Chưa có trong file |

Tổng cộng **161 câu nhiều lựa chọn, 58 câu trả lời ngắn và 31 bài đúng/sai**. Giữ số câu gốc theo từng module. Hai PDF không có bảng đáp án đi kèm. Từ 12/09/2026, [250 lời giải độc lập](SOURCE_SOLUTIONS.md) được lưu riêng: 233 câu tự chấm và 17 câu giải theo điều kiện, cần đối chiếu. Dữ liệu/ảnh/PDF nguyên bản không bị sửa theo lời giải.

File bài giảng dừng giữa mục **5.3.3 – Bản mỏng hình nêm** ở trang PDF 53 (trang in 47). Trang PDF 54–56 lặp lại bìa và hai trang đầu bài tập. Cả 56 trang vẫn đọc được ở chế độ toàn tài liệu; phần lặp không được tính thành câu mới. Mục lục có Module 6 nhưng file không có nội dung bài giảng tương ứng.

## Cách hiển thị và lưu bài làm

- 103 ảnh toàn trang giúp đọc mọi nội dung trong hai file, gồm bìa, phần dẫn và công thức ngoài các câu hỏi.
- 250 bài dùng 273 mảnh ảnh: bài nối trang có nhiều mảnh trong cùng thẻ. Mỗi mảnh có số trang nguồn và tọa độ vùng cắt để đối chiếu.
- Tăng cỡ ảnh từ 100% đến 300%, cuộn ngang trong khung trên màn hình nhỏ. Có liên kết mở đúng trang PDF gốc.
- Văn bản OCR chỉ dùng tìm kiếm và hỗ trợ đọc màn hình. Ký hiệu, số mũ và bố cục phương án có thể nhận dạng sai; ảnh/PDF mới là nguồn để làm bài. Nội dung toán chưa được chuyển thành công thức có thể đọc đầy đủ bằng trình đọc màn hình.
- Ghi chú, bài nháp và vị trí đọc lưu tại `vldc-source-practice-v1`; lựa chọn, kết quả chấm, mức tự tin và lịch sử học dùng `vldc-study-v1`. Lựa chọn cũ được nhập vào bộ lưu mới một lần; không tạo lịch sử ngày giờ giả. Không có tài khoản hoặc đồng bộ giữa thiết bị.

## Quy trình nhập lại dành cho người bảo trì

Ứng dụng dùng dữ liệu và ảnh đã nhập sẵn, không cần Python, OCR hoặc bước build khi triển khai. Công cụ nhập cần Python 3 và Pillow; chỉ chạy lại khi cần cập nhật tài liệu.

1. Đặt hai file nguồn đúng tên vào một thư mục riêng.
2. Dùng Poppler render cả hai PDF với `pdftoppm -scale-to 2200 -jpeg -jpegopt quality=90`, tên ảnh `exercises-01.jpg` đến `exercises-47.jpg` và `lectures-01.jpg` đến `lectures-56.jpg`.
3. Chạy Tesseract.js với ngôn ngữ `vie+eng`, xuất JSON từng trang. JSON cần `text` và `blocks[].paragraphs[].lines[]`; mỗi dòng cần `text`, `bbox` với `x0`, `y0`, `x1`, `y1`. Đặt tên `exercises-NN.json` tương ứng. Bản nhập này dùng Tesseract.js 7.0 và bộ ngôn ngữ `tessdata_fast`.
4. Chạy từ thư mục gốc repo:

   ```sh
   python tools/import-physics-library.py --sources /path/to/pdfs --renders /path/to/page-images --ocr /path/to/ocr-json
   ```

5. Kiểm tra trực quan ảnh cắt, nhất là câu nối trang, hình lớn và đáp án chỉ có công thức; chạy `npm test` trước khi phát hành.

Script chứa ánh xạ chương, phạm vi trang và các sửa phân loại đã đối chiếu trực quan dành riêng cho hai bản PDF này. Khi thay nguồn phải kiểm tra và cập nhật các ánh xạ đó. `--reuse-pages` chỉ dùng khi PDF nguồn và ảnh render không đổi. Không đưa dữ liệu OCR tạm hoặc mô hình ngôn ngữ vào repo.

## Kiểm tra

Bộ kiểm thử xác nhận số thứ tự liên tục, đủ 250 câu và 103 ảnh trang, hash PDF, mở ảnh của tất cả câu trong trình duyệt, câu nối trang, khôi phục bài làm, lọc/tìm kiếm, trang bài giảng bị thiếu và thông báo khi không lưu được hoặc ảnh lỗi. Kiểm tra khung ảnh ở 320, 390, 768 và 1440px, gồm mức phóng to 300%. Việc kiểm tra tự động không thay cho đối chiếu chuyên môn hoặc thử trên điện thoại thật.
