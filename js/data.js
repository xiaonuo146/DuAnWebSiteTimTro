// --- FILE: js/data.js ---

// Khởi tạo localStorage nếu chưa có dữ liệu phòng
if (!localStorage.getItem("rooms") || JSON.parse(localStorage.getItem("rooms")).length === 0) {
  localStorage.setItem("rooms", JSON.stringify(danhSachPhongMau));
}