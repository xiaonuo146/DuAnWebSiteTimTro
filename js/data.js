// Khởi tạo localStorage nếu chưa có dữ liệu phòng
if (!localStorage.getItem("rooms") || JSON.parse(localStorage.getItem("rooms")).length === 0) {            /*Kho lưu trữ cục bộ string trên trình duyệt, được sử dụng để lưu trữ dữ liệu dưới dạng cặp key-value. Dữ liệu được lưu trữ trong localStorage sẽ tồn tại ngay cả khi người dùng đóng trình duyệt hoặc tắt máy tính, và chỉ bị xóa khi người dùng xóa thủ công hoặc thông qua mã JavaScript. */
  localStorage.setItem("rooms", JSON.stringify(danhSachPhongMau));
}