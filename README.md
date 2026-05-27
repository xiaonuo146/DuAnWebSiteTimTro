# NhaTroSV - Website Tìm Nhà Trọ Sinh Viên

Website HTML/CSS/JavaScript thuần để tìm kiếm nhà trọ sinh viên.

## Cấu trúc file
```
Websitetimkiemtrosinhvien/
├── index.html          # Trang chủ (Tìm kiếm nhanh, thống kê, phòng nổi bật)
├── tim-kiem.html       # Trang tìm kiếm nâng cao với bộ lọc sidebar
├── ban-do.html         # Trang bản đồ tương tác toàn màn hình (Leaflet.js)
├── chi-tiet.html       # Trang thông tin chi tiết phòng trọ & bảng tính chi phí
├── dang-tin.html       # Trang đăng tin phòng trọ dành cho chủ nhà
├── js/
│   ├── data.js         # Khởi tạo dữ liệu phòng trọ mẫu vào LocalStorage
│   └── main.js         # X xử lý logic chính, tương tác bản đồ, bộ lọc, xử lý form
├── css/
│   ├── base.css        # Khai báo biến CSS (màu sắc, bo góc, bóng đổ) và reset CSS
│   ├── layout.css      # Cấu trúc khung trang (Header, Menu mobile, Footer)
│   ├── components.css  # Các thành phần giao diện dùng chung (Nút, Input, Card phòng)
│   ├── pages.css       # Giao diện đặc thù cho từng trang riêng biệt
│   └── main.css        # File gộp import toàn bộ các file CSS thành phần
└── README.md           # Hướng dẫn và mô tả dự án          
```
### 💻 Công Nghệ Sử Dụng
Ngôn ngữ chính: HTML5, CSS3, JavaScript (ES6)
Thư viện tương tác: jQuery 3.6.0 (Hỗ trợ truy vấn và xử lý sự kiện DOM)
Bản đồ trực tuyến: Leaflet.js 1.9.4 (Sử dụng dữ liệu bản đồ miễn phí từ OpenStreetMap)
Phông chữ: Be Vietnam Pro (tích hợp qua Google Fonts)

#### 🛠️ Các Tính Năng Đã Được Hiện Thực
1. Trang Chủ (index.html)
Ô tìm kiếm nhanh: Cho phép chọn đường phố và nhập hẻm/địa chỉ cụ thể. Khi bấm tìm kiếm, hệ thống lưu tham số qua sessionStorage và tự động chuyển hướng sang trang tìm kiếm kèm bộ lọc tương ứng.
Thống kê số liệu: Hiển thị thông tin trực quan về số lượng phòng trọ, khu vực bao phủ và tỷ lệ thông tin xác thực.
Gợi ý ngẫu nhiên: Hiển thị ngẫu nhiên 3 phòng trọ từ dữ liệu trong hệ thống giúp tăng khả năng tiếp cận của các phòng trọ.
2. Trang Tìm Kiếm (tim-kiem.html)
Bộ lọc đa năng (Sidebar):
Lọc theo tuyến đường cụ thể (Y Wang, Lê Duẩn, Giải Phóng, Mai Thị Lựu, Nguyễn An Ninh).
Lọc theo khoảng giá tối thiểu và tối đa.
Lọc theo loại hình phòng (Phòng đơn, phòng đôi, ký túc xá).
Lọc theo các tiện ích đi kèm (Wifi, máy giặt, gác lửng).
Sắp xếp: Cho phép sắp xếp danh sách kết quả theo giá thuê tăng dần hoặc giảm dần.
Nút đặt lại (Reset): Khôi phục tất cả bộ lọc về trạng thái mặc định chỉ với một lượt nhấp.
3. Trang Bản Đồ Tương Tác (ban-do.html)
Tích hợp bản đồ trực quan Leaflet.js định vị quanh khu vực Đại học Tây Nguyên.
Hiển thị các phòng trọ dưới dạng ghim vị trí (Marker).
Khi nhấp vào Marker, thông tin chi tiết của phòng trọ (tiêu đề, địa chỉ, diện tích, giá thuê, link xem chi tiết) sẽ xuất hiện dưới dạng thẻ card nổi (#the-phong-chon).
Hỗ trợ thanh lọc nhanh Marker theo từng tuyến đường trực tiếp ngay trên bản đồ.
4. Trang Chi Tiết Phòng Trọ (chi-tiet.html)
Bảng tính chi phí dự tính: Tự động tính toán tổng chi phí tối thiểu hằng tháng dựa trên định mức điện (ước lượng 100 kWh/tháng theo đơn giá của chủ trọ), tiền nước, tiền wifi và tiền thuê phòng cố định.
Bộ sưu tập ảnh (Gallery & Lightbox): Hiển thị các hình ảnh phụ của phòng trọ. Người dùng có thể nhấp vào ảnh phụ để phóng to xem chi tiết thông qua hiệu ứng Lightbox overlay mượt mà.
Thông tin liên hệ xác thực: Hiển thị thông tin liên hệ của chủ nhà (Tên, SĐT, Email, Địa chỉ) kèm theo các nút hành động (Gọi điện, Nhắn tin SMS, Hẹn lịch xem phòng).
Bản đồ con: Hiển thị chính xác vị trí của riêng phòng trọ đó trên bản đồ nhỏ ở cuối trang.
5. Trang Đăng Tin Trọ (dang-tin.html)
Cung cấp biểu mẫu khai báo đầy đủ thông tin:
Khối 0: Thông tin liên hệ của người đăng (Chủ nhà).
Khối 1: Thông tin cơ bản của phòng trọ (Tiêu đề, địa chỉ, diện tích, loại phòng, số lượng phòng trống).
Khối 2: Giá thuê và tiền đặt cọc.
Khối 3: Đơn giá dịch vụ thực tế (Điện, nước, internet).
Khối 4: Tích chọn các tiện ích có sẵn.
Xử lý hình ảnh: Cho phép tải lên nhiều ảnh cùng lúc, sử dụng HTML5 Canvas để giải mã và nén hình ảnh về định dạng Base64 giúp lưu trữ trực tiếp vào danh sách phòng trong localStorage mà không cần máy chủ lưu trữ ảnh.
6. Khả Năng Tương Thích Giao Diện (Responsive)
Tự động điều chỉnh giao diện hiển thị mượt mà trên cả máy tính để bàn (Desktop) và thiết bị di động (Mobile).
Menu Hamburger (3 gạch) nhỏ gọn, nổi bật trên thiết bị di động.
Bản đồ trên thiết bị di động được tinh chỉnh hộp điều khiển nhỏ gọn và chuyển nút thu phóng (Zoom control) sang góc phải để tránh bị che khuất tầm nhìn.


##### 🚀 Hướng Dẫn Chạy Dự Án
Do đây là một dự án chạy hoàn toàn bằng mã nguồn phía máy khách (Client-side), bạn không cần cài đặt hay biên dịch thông qua bất kỳ công cụ dòng lệnh nào:
Tải mã nguồn về máy tính của bạn.
Mở file index.html bằng một trình duyệt web bất kỳ (Chrome, Edge, Firefox, Safari).
(Khuyên dùng) Bạn nên sử dụng tiện ích mở rộng Live Server trên phần mềm VS Code để dự án được cấp một địa chỉ localhost tạm thời, giúp các tính năng như tải ảnh hoạt động ổn định và mượt mà hơn.

###### 📝 Cơ Chế Lưu Trữ Dữ Liệu
Dự án sử dụng cơ chế LocalStorage của trình duyệt để lưu trữ dữ liệu phòng trọ dưới dạng chuỗi JSON:
Ở lần truy cập đầu tiên, nếu LocalStorage trống, hệ thống sẽ tự động nạp danh sách phòng trọ mẫu từ file js/data.js.
Mọi thay đổi dữ liệu từ trang dang-tin.html sẽ được lưu trực tiếp vào bộ nhớ của trình duyệt. Dữ liệu này vẫn tồn tại ngay cả khi bạn tải lại trang hoặc tắt trình duyệt.
```