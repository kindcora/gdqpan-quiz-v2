# Học offline và mô phỏng

## Sử dụng

Mở [Cài ứng dụng · Tải offline](https://kindcora.github.io/gdqpan-quiz-v2/offline.html) khi còn mạng. Bộ cơ bản tự tải khoảng **3,4 MB**, gồm Quốc phòng, công thức, 144 trắc nghiệm, 36 tự luận, dữ liệu/lời giải 250 bài PDF, tiến độ và cả sáu lab. KaTeX, font toán và Three.js nằm trong website, không cần CDN.

Ảnh đề và PDF là các gói tùy chọn:

| Gói | Dung lượng gần đúng |
| --- | ---: |
| Chương 1 | 5,6 MB |
| Chương 2 | 5,0 MB |
| Chương 3 | 5,7 MB |
| Chương 4 | 5,7 MB |
| Chương 5 | 4,4 MB |
| Chương 6 | 2,8 MB |
| PDF bài tập + 47 ảnh trang | 39,4 MB |
| PDF bài giảng + 56 ảnh trang | 42,4 MB |

Gói chương có ảnh từng câu và trang giảng hiện có, không chứa file PDF nguyên bản. Muốn mở liên kết “Trang gốc” trong trình đọc PDF, tải thêm gói PDF tương ứng. Gói chương và gói toàn bộ có thể chứa trang trùng nhau nên tổng dung lượng lưu lớn hơn dung lượng tài liệu duy nhất.

Chờ **Sẵn sàng offline** rồi mới ngắt mạng. Tải bị gián đoạn có thể tiếp tục; **Dừng tải** giữ các tệp đã hoàn tất. **Xóa bản offline** chỉ xóa gói tài liệu, giữ bài làm và ghi chú. Các liên kết nguồn bên ngoài cần mạng.

Android: dùng nút **Cài ứng dụng** khi trình duyệt cung cấp hoặc menu Chrome/Edge. iPhone/iPad: Safari → Chia sẻ → Thêm vào Màn hình chính. Sau khi cài, mở ứng dụng khi có mạng và xác nhận các gói đã sẵn sàng trong chính ứng dụng đó. Chức năng cài phụ thuộc trình duyệt; bộ kiểm thử không thực hiện cài trên điện thoại thật.

Kết quả vẫn lưu cục bộ, không đồng bộ tài khoản/thiết bị. Xóa dữ liệu website hoặc trình duyệt thu hồi bộ nhớ có thể mất dữ liệu. Website đề nghị lưu bền vững khi tải gói, nhưng trình duyệt quyết định cấp quyền.

## Điều khiển lab

Mỗi chương có **Tạm dừng / Tiếp tục**, **Chạy một bước +0,05 s**, **Đặt lại thông số**, bảng số liệu SI, chọn đại lượng trên biểu đồ và phần **Điều gì đang thay đổi?**. Đổi thanh điều khiển bắt đầu lượt đo mới tại t = 0; đặt lại khôi phục tất cả thanh điều khiển. Lịch sử biểu đồ giữ tối đa 401 mẫu trong 20 giây minh họa.

Mô hình tĩnh cho biểu đồ nằm ngang. Khi bật giảm chuyển động trong hệ điều hành, lab bắt đầu ở trạng thái tạm dừng. Đổi tab học sẽ hủy vòng hoạt ảnh và tài nguyên 3D cũ. Thiết bị không bật được WebGL vẫn có số liệu, biểu đồ và mô hình 2D.

### Ý nghĩa vật lý và giới hạn hình vẽ

| Chương | Số liệu và quy ước |
| --- | --- |
| 1 | q nhập nC, bảng đổi sang C; điện trường tâm khoang V/m. Vỏ cầu dẫn nối đất bán kính 1,6 m, điện tích ngoài cách tâm 3,2 m trong hình 2D. Bật vỏ: E trong khoang rỗng bằng 0. Độ dài mũi tên không phải thước đo E. |
| 2 | Dây thẳng dài trong chân không, số đo B/H tại r = 0,08 m. Hạt lý tưởng có q = +1,6 μC, m = 1 mg, vận tốc vuông góc B là 1,84 m/s; bán kính, chu kỳ và lực Lorentz tính từ các giá trị này. Trục mô hình tính m; đường xoắn được nối lại khi ra khỏi vùng xem. |
| 3 | Mô hình từ thông hiệu dụng Φ = 0,002[1 + (d/0,15)²]⁻³ᐟ² Wb, d = 0,62 − x (m), R = 10 Ω; bỏ tự cảm và quá độ. e = −dΦ/dt tính bằng đạo hàm, không phụ thuộc tốc độ khung hình. Nam châm dừng ở biên. Máy phát N = 100, B = 0,2 T, S = 0,01 m². |
| 4 | RLC nối tiếp cưỡng bức ổn định: L = 1 H, C = 1 F, R = 0,4 Ω, U nguồn cực đại 1 V. I₀ = 2,5 A ở cộng hưởng dòng. Sóng chân không có E/B = c; 1 s minh họa tương ứng 3,2/c s thực. Mũi tên E và B dùng thang vẽ riêng. |
| 5 | Young với D = 1,2 m; a nhập mm, λ nhập nm, bảng xuất m; i = λD/a. Kính tiềm vọng có gương 45° (π/4 rad), là hình tĩnh. |
| 6 | Công thoát 2,28 eV được đổi sang J; Kmax = hf − A, vmax = √(2Kmax/mₑ). Dưới ngưỡng, số 0 là quy ước “không có quang electron”. Đổi nhiệt độ sao chỉ tác động cực đại phổ Wien, không đổi chùm sáng chiếu. Tốc độ electron trên hình là minh họa. |

Hằng số trong bảng SI: c = 299792458 m/s, h = 6,62607015 × 10⁻³⁴ J·s, e = 1,602176634 × 10⁻¹⁹ C, mₑ = 9,1093837139 × 10⁻³¹ kg. Coulomb dùng k ≈ 9 × 10⁹ và Wien dùng b ≈ 2,9 × 10⁻³ m·K theo cách làm tròn của bài học. Các hằng số lab không sửa dữ kiện/đáp án bài tập.

## Bảo trì

- manifest.webmanifest dùng URL tương đối, scope toàn repo; hoạt động cả localhost và GitHub Pages /gdqpan-quiz-v2/.
- Cache offline được tách theo đường dẫn website; cập nhật V2 không xóa cache của bản khác trên cùng tên miền.
- Service worker lưu bộ cơ bản khi cài thành công; bản cập nhật đợi người học chọn **Dùng bản mới và tải lại**. Bài làm không nằm trong cache tài liệu.
- Tải gói qua MessageChannel, có tiến độ và hủy; xác nhận kích thước từng ảnh/PDF trước khi lưu. Chỉ có dấu hoàn tất sau khi đủ mọi tệp. Gói có mã băm nội dung riêng để giữ nguyên qua cập nhật ứng dụng.
- PDF trong cache hỗ trợ Range 206 và 416, gồm khoảng mở và đoạn cuối file.
- Sau khi sửa HTML, CSS, JS hoặc nội dung: chạy **node tools/build-offline.cjs** và commit cả offline-assets.js. Mã phiên bản chuẩn hóa xuống dòng văn bản để nhất quán giữa Windows và Git.
- Khi cập nhật thư viện: chỉnh phiên bản trong tools/vendor-offline.cjs, chạy script để lấy các bản chính thức cùng giấy phép, rồi xây lại danh mục offline. KaTeX 0.16.11 và Three.js 0.160.0 hiện được giữ trong vendor, kèm MIT LICENSE.
- PWA cần HTTPS hoặc localhost. Mở file trực tiếp vẫn có một số chức năng nhưng không bật service worker.

Tham khảo triển khai: [Service worker của MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), [điều kiện cài PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

## Kiểm chứng

Bộ tests/offline-labs.test.cjs kiểm tra độc lập phương trình SI, chuyển đổi đơn vị, Faraday bằng sai phân trung tâm, RLC qua đạo hàm điện áp tụ, ngưỡng quang điện; kiểm tra điều khiển cả sáu lab và bố cục 320, 390, 768, 1440 px.

Kiểm thử trình duyệt phục vụ site dưới /gdqpan-quiz-v2/; đóng kết nối tại máy chủ và bật offline trong trình duyệt để xác nhận tài nguyên đến từ cache. Bao gồm tải lại sáu lab và công thức, chấm và lưu bài, tải tiếp sau lỗi, hủy, xóa gói, PDF nguyên bản và byte ranges, cập nhật có chờ, giữ gói/bài làm và lỗi cài bộ cơ bản. Các kiểm thử chức năng cũ tắt service worker để độc lập với bộ kiểm thử PWA.
