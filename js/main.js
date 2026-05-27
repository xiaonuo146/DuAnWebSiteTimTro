// Helper lấy danh sách phòng từ LocalStorage
const layDSPhong = () => JSON.parse(localStorage.getItem("rooms")) || [];
// ==================== ĐIỀU KHIỂN MENU MOBILE (3 GẠCH) ====================
function khoiTaoMenuMobile() {
  const $nutHamburger = $("#nut-hamburger");
  const $thanhMenu = $("#thanh-menu");
  if ($nutHamburger.length) {
    $nutHamburger.off("click").on("click", function(e) {
      e.stopPropagation();
      $thanhMenu.toggleClass("active");
      $(this).toggleClass("active");
    });
    // Đóng menu khi nhấp ngoài vùng
    $(document).on("click", function(e) {
      if (!$(e.target).closest(".thanh-dieu-huong").length) {
        $thanhMenu.removeClass("active");
        $nutHamburger.removeClass("active");
      }
    });
  }
}
// ==================== HIỂN THỊ DANH SÁCH CARD PHÒNG ====================
function hienThiPhong(ds, containerId) {
  const $container = $(containerId);
  if (!$container.length) return;
  $container.empty();
  if (!ds.length) {
    $container.html('<p class="thong-bao-trong">Không có phòng trọ phù hợp.</p>');
    return;
  }
  const template = document.getElementById("mau-card-phong");
  if (!template) return;
  ds.forEach(p => {
    const clone = document.importNode(template.content, true);
    const $clone = $(clone);
    $clone.find(".card-phong").attr("href", `chi-tiet.html?id=${p.id}`);
    $clone.find(".card-phong__nhan").text(p.tag || "Còn phòng");
    if (p.image) {
      $clone.find(".card-phong__anh-that").attr("src", p.image).show();
      $clone.find(".room-image-placeholder").hide();
    } else {
      $clone.find(".card-phong__anh-that").hide();
      $clone.find(".room-image-placeholder").show();
    }
    $clone.find(".card-phong__tieu-de").text(p.title);
    $clone.find(".card-phong__dia-chi").text(`📍 ${p.address}`);
    $clone.find(".card-phong-dien-tich").text(`📐 ${p.area} m²`);
    let loaiText = "🚪 Phòng đơn";
    if (p.type === "double") loaiText = "🚪 Phòng đôi";
    else if (p.type === "dormitory") loaiText = "🚪 Ký túc xá";
    $clone.find(".card-phong-loai-phong").text(loaiText);
    $clone.find(".card-phong__gia").text(`${(p.price || 0).toLocaleString()}đ`);
    $container.append($clone);
  });
}
// ==================== BỘ LỌC VÀ TÌM KIẾM TRỰC TIẾP ====================
function locVaHienThi() {
  let ds = layDSPhong();
  const duong = $("#chon-duong").val();
  const giaMin = parseInt($("#loc-gia-thap").val()) || 0;
  const giaMax = parseInt($("#loc-gia-cao").val()) || 1e12;
  const loaiChon = $(".loc-loai-phong:checked").map((i, el) => $(el).val()).get();
  const tienIchChon = $(".loc-tien-ich:checked").map((i, el) => $(el).val()).get();
  const sapXep = $("#sap-xep").val();
  ds = ds.filter(p => {
    if (duong !== "all" && p.street !== duong) return false;
    if (p.price < giaMin || p.price > giaMax) return false;
    if (loaiChon.length && !loaiChon.includes(p.type)) return false;
    if (tienIchChon.length && !tienIchChon.every(ti => (p.amenities || []).includes(ti))) return false;
    return true;
  });
  if (sapXep === "gia-tang") ds.sort((a, b) => a.price - b.price);
  if (sapXep === "gia-giam") ds.sort((a, b) => b.price - a.price);
  hienThiPhong(ds, "#danh-sach-tim-kiem");
  $("#so-luong-phong").text(`Tìm thấy ${ds.length} phòng trọ`);
}
// ==================== TRANG CHI TIẾT PHÒNG TRỌ (DATA ADMIN) ====================
function napChiTiet(phong) {
  $("#duong-dan-tieu-de, #chi-tiet-ten").text(phong.title);
  document.title = `${phong.title} - NhaTroSV`;
  $("#chi-tiet-dia-chi").text(`📍 ${phong.address}`);
  $("#chi-tiet-khoang-cach").text(`🏫 Khu vực đường ${phong.street}, Ea Tam`);
  $("#chi-tiet-rating").html(`★ ${phong.rating || 5.0} (Đánh giá của sinh viên)`);
  $("#chi-tiet-tag").text(phong.tag || "Còn phòng");
  if (phong.image) {
    $("#chi-tiet-anh").attr("src", phong.image).show();
    $("#khung-anh-phong .room-image-placeholder").hide();
  } else {
    $("#chi-tiet-anh").hide();
    $("#khung-anh-phong .room-image-placeholder").show();
  }
  $("#thongso-dien-tich").text(`${phong.area} m²`);
  let loaiText = "Đơn";
  if (phong.type === "double") loaiText = "Đôi";
  else if (phong.type === "dormitory") loaiText = "KTX";
  $("#thongso-loai").text(loaiText);
  $("#thongso-rating").text(`${phong.rating || 5.0}/5`);
  // Tính toán bảng chi phí chi tiết dựa trên khai báo của Admin
  const giaThue = phong.price || 0;
  const tienCoc = phong.deposit || 0;
  const donGiaDien = phong.electricPrice || 3500;
  const uocTinhKwh = 100;
  const uocTinhDien = donGiaDien * uocTinhKwh;
  const tienNuoc = phong.waterPrice || 0;
  const tienWifi = phong.wifiPrice || 0;
  const tienGuiXe = phong.parkingPrice || 0;
  const tongChiPhiThang = giaThue + uocTinhDien + tienNuoc + tienWifi + tienGuiXe;
  $("#chiphi-thue").text(`${giaThue.toLocaleString()}đ`);
  $("#chiphi-coc").text(`${tienCoc.toLocaleString()}đ`);
  $("#chiphi-dien").text(`${uocTinhDien.toLocaleString()}đ (${donGiaDien}đ/kWh)`);
  $("#chiphi-nuoc").text(`${tienNuoc.toLocaleString()}đ/tháng`);
  $("#chiphi-wifi").text(`${tienWifi.toLocaleString()}đ/tháng`);
  $("#chiphi-tong").text(`${tongChiPhiThang.toLocaleString()}đ`);
  // ---- ẢNH PHỤ ----
  const anhPhu = Array.isArray(phong.images) ? phong.images : [];
  const $anhPhuContainer = $("#anh-phu-phong");
  $anhPhuContainer.empty();
  if (anhPhu.length > 0) {
    anhPhu.forEach(src => {
      const $img = $(`<img src="${src}" class="anh-phu-item" alt="ảnh phụ">`);
      $img.on("click", function() {
        $("#lightbox-anh").attr("src", src);
        $("#lightbox-overlay").fadeIn(200);
      });
      $anhPhuContainer.append($img);
    });
    $anhPhuContainer.show();
  } else {
    $anhPhuContainer.hide();
  }
  // Đóng lightbox khi nhấp nền hoặc nút ×
  $("#lightbox-dong, #lightbox-overlay").off("click").on("click", function(e) {
    if (e.target.id === "lightbox-dong" || e.target.id === "lightbox-overlay") {
      $("#lightbox-overlay").fadeOut(200);
    }
  });
  // ---- NGƯỜI ĐĂNG TIN ----
  // Hiển thị tên người đăng (ưu tiên landlordName do người dùng nhập)
  const tenNguoiDang = phong.landlordName || "Quản trị viên hệ thống";
  const sdtNguoiDang = phong.landlordPhone || "---";
  const emailNguoiDang = phong.landlordEmail || "";
  const diaChiLienHe = phong.landlordAddress || "";
  $("#nguoi-dang-ten").text(tenNguoiDang);
  // Xây dựng nội dung thông tin liên hệ đầy đủ
  let sdtHtml = `📞 SĐT: <strong>${sdtNguoiDang}</strong>`;
  if (emailNguoiDang) sdtHtml += `<br>✉️ Email: <strong>${emailNguoiDang}</strong>`;
  if (diaChiLienHe) sdtHtml += `<br>🏠 Địa chỉ: <strong>${diaChiLienHe}</strong>`;
  $("#nguoi-dang-sdt").html(sdtHtml);
  // Tiện ích
  const amenities = phong.amenities || [];
  $("#tienich-wifi").text(amenities.includes("wifi") ? "✔️ Wifi kết nối sẵn" : "❌ Không tích hợp Wifi");
  $("#tienich-gac").text(amenities.includes("gac_lung") ? "✔️ Có gác lửng thông thoáng" : "❌ Không có gác lửng");
  $("#tienich-maygiat").text(amenities.includes("may_giat") ? "✔️ Có máy giặt dùng chung" : "❌ Tự giặt bằng tay");
  // Thông tin liên hệ trong sidebar
  $("#lien-he-gia").text(`${giaThue.toLocaleString()}đ`);
  $("#lien-he-ten").text(tenNguoiDang);
  // Xử lý sự kiện nhấp các nút liên hệ trực tiếp
  $("#lien-he-btn-goi").off("click").on("click", function() {
    alert(`Bạn có thể gọi trực tiếp đến số: ${sdtNguoiDang}`);
  });
  $("#lien-he-btn-nhan").off("click").on("click", function() {
    const thongTin = emailNguoiDang
      ? `SĐT: ${sdtNguoiDang}\nEmail: ${emailNguoiDang}`
      : `SĐT: ${sdtNguoiDang}`;
    alert(`Thông tin liên hệ:\n${thongTin}`);
  });
  $("#lien-he-btn-datlich").off("click").on("click", function() {
    alert(`Hệ thống đang hỗ trợ đặt lịch hẹn trực tiếp với ${tenNguoiDang} qua SĐT: ${sdtNguoiDang}`);
  });
  // Khởi tạo bản đồ vị trí phòng trọ
  const mapLat = phong.lat || 12.65067;
  const mapLng = phong.lng || 108.02621;
  const map = L.map("ban-do-chi-tiet").setView([mapLat, mapLng], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
  L.marker([mapLat, mapLng]).addTo(map).bindPopup(phong.title).openPopup();
}
// ==================== TRANG BẢN ĐỒ KHU VỰC ====================
function khoiTaoBanDo() {
  if (!$("#ban-do-chinh").length) return;
  const map = L.map("ban-do-chinh").setView([12.65067, 108.02621], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
  let markers = [];
  function capNhatGhim(ds) {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    ds.forEach(p => {
      const m = L.marker([p.lat, p.lng]).addTo(map);
      m.bindPopup(`<strong>${p.title}</strong><br>${(p.price || 0).toLocaleString()}đ/tháng`);
      m.on("click", () => {
        $("#chon-tag").text(p.tag || "Còn phòng");
        $("#chon-title").text(p.title);
        $("#chon-address").text(`📍 ${p.address}`);
        $("#chon-area").text(`📐 ${p.area} m²`);
        $("#chon-price").text(`${(p.price || 0).toLocaleString()}đ/tháng`);
        $("#chon-link").attr("href", `chi-tiet.html?id=${p.id}`);
        $("#the-phong-chon").fadeIn(200);
      });
      markers.push(m);
    });
    $("#so-luong-ban-do").text(ds.length);
  }
  $("#loc-duong-ban-do").on("change", function() {
    let ds = layDSPhong();
    const loc = $(this).val();
    if (loc !== "all") ds = ds.filter(p => p.street === loc);
    capNhatGhim(ds);
    $("#the-phong-chon").fadeOut(100);
  });
  $("#nut-dong-the").click(() => $("#the-phong-chon").fadeOut(200));
  capNhatGhim(layDSPhong());
}
// ==================== ĐĂNG TIN NHANH ====================
function khoiTaoDangTin() {
  if (!$("#form-dang-tin").length) return;
    let hinhAnhBase64 = "";
  let danhSachAnh = [];
    $("#dang-anh").on("change", function(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    danhSachAnh = [];
    hinhAnhBase64 = "";
    $("#xem-truoc-anh").empty();
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 600;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL("image/jpeg", 0.7);
          danhSachAnh.push(base64);
          if (index === 0) hinhAnhBase64 = base64;

          const $preview = $(`<img src="${base64}" style="width:80px;height:60px;object-fit:cover;border-radius:6px;border:1px solid #cbd5e1;">`);
          $("#xem-truoc-anh").append($preview);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  });

  $("#form-dang-tin").on("submit", function(e) {
    e.preventDefault();
    // ---- Đọc thông tin người đăng từ form ----
    const tenNguoiDang   = $("#dang-ten-nguoi-dang").val().trim() || "Chủ nhà";
    const sdtNguoiDang   = $("#dang-sdt").val().trim()            || "---";
    const emailNguoiDang = $("#dang-email").val().trim()           || "";
    const diaChiLienHe   = $("#dang-dia-chi-lien-he").val().trim() || "";
    const phongMoi = {
      id: String(Date.now()),
      title: $("#dang-tieu-de").val().trim(),
      address: $("#dang-dia-chi").val().trim(),
      street: $("#dang-duong").val(),
      price: parseInt($("#dang-gia").val()) || 0,
      deposit: parseInt($("#dang-coc").val()) || 0,
      area: parseInt($("#dang-dien-tich").val()) || 0,
      type: $("#dang-loai-phong").val(),
      rating: 5.0,
      tag: `Còn ${$("#dang-so-luong").val().trim()} phòng`,
      amenities: $(".tien-ich-dang:checked").map((i, el) => $(el).val()).get(),
      image: hinhAnhBase64 || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      images: danhSachAnh.length > 1 ? danhSachAnh.slice(1) : [],
      lat: 12.65067 + (Math.random() - 0.5) * 0.015,
      lng: 108.02621 + (Math.random() - 0.5) * 0.015,
      // ---- Thông tin người đăng do người dùng nhập ----
      landlordName: tenNguoiDang,
      landlordPhone: sdtNguoiDang,
      landlordEmail: emailNguoiDang,
      landlordAddress: diaChiLienHe,
      // ---- Chi phí dịch vụ ----
      electricPrice: parseInt($("#dang-gia-dien").val()) || 3500,
      waterPrice: parseInt($("#dang-gia-nuoc").val()) || 50000,
      wifiPrice: parseInt($("#dang-gia-wifi").val()) || 50000,
      parkingPrice: 0
    };
    const ds = layDSPhong();
    ds.unshift(phongMoi);
    localStorage.setItem("rooms", JSON.stringify(ds));
        alert("Hệ thống đã ghi nhận tin đăng của bạn thành công!");
    window.location.href = "tim-kiem.html";
  });
}
// ==================== KHỞI CHẠY KHU VỰC TRANG QUY ĐỊNH ====================
$(document).ready(() => {
  khoiTaoMenuMobile();
  // Trang chủ (index.html)
  if ($("#danh-sach-tro").length) {
    const dsNgan = layDSPhong().sort(() => Math.random() - 0.5).slice(0, 3);
    hienThiPhong(dsNgan, "#danh-sach-tro");
    $("#btn-tim").click(() => {
      sessionStorage.setItem("duongChuyenTiep", $("#chon-duong").val());
      window.location.href = "tim-kiem.html";
    });
  }
  // Trang tìm kiếm (tim-kiem.html)
  if ($("#danh-sach-tim-kiem").length) {
    const duongSess = sessionStorage.getItem("duongChuyenTiep");
    if (duongSess) {
      $("#chon-duong").val(duongSess);
      sessionStorage.removeItem("duongChuyenTiep");
    }
    locVaHienThi();
    $("#chon-duong, #loc-gia-thap, #loc-gia-cao, #sap-xep, .loc-loai-phong, .loc-tien-ich").on("change keyup", locVaHienThi);
        $("#nut-dat-lai").click(() => {
      $("#chon-duong").val("all");
      $("#loc-gia-thap").val("0");
      $("#loc-gia-cao").val("100000000000");
      $(".loc-loai-phong, .loc-tien-ich").prop("checked", false);
      $("#sap-xep").val("mac-dinh");
      locVaHienThi();
    });
  }
  khoiTaoBanDo();
  khoiTaoDangTin();
  // Trang chi tiết
  if ($("#chi-tiet-trang").length) {
    const idParam = new URLSearchParams(window.location.search).get("id");
    const phongTim = layDSPhong().find(p => String(p.id) === String(idParam));
    if (!phongTim) {
      alert("Phòng trọ không tồn tại hoặc dữ liệu đã bị xóa.");
      window.location.href = "tim-kiem.html";
    } else {
      napChiTiet(phongTim);
    }
  }
});