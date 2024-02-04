function toast(title, message, type = "info", duration = 3000) {
  const main = document.getElementById("toast");

  if (main) {
    const toast = document.createElement("div");

    //auto remove toast
    const autoRemove = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemove);
      }
    };

    toast.classList.add("show");

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-check-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease-out 0.5s, fadeOut linear 1s ${delay}s forwards`;
    toast.style.animationFillMode = "forwards";
    toast.innerHTML = `
          <div class="toast__icon">
              <i class='${icon}'></i>
          </div>
          <div class="toast__body">
              <h3 class="toast__title">${title}</h3>
              <p class="toast__msg">${message}</p>
          </div>
          <div class="toast__close">
              <i class="fa-solid fa-xmark"></i>
          </div>
        `;

    main.appendChild(toast);
  }
}

function showSuccessToast() {
  toast("Thành công", "Thanh toán thành công.", "success", 5000);
}

function showErrorToast() {
  toast("Thất bại", "Có lỗi xảy ra. Vui lòng kiểm tra lại.", "error", 5000);
}

function showInfoToast() {
  toast("Thành công", "Thêm sản phẩm vào giỏ hàng thành công", "info", 5000);
}

function showWarningToast() {
  toast("Cảnh báo", "Vui lòng kiểm tra lại dữ liệu.", "warning", 5000);
}

function showSuccessDeleteToast() {
  toast("Thành công", "Đã xóa thành công sản phẩm.", "success", 5000);
}

function showSuccessAddProductToast() {
  toast("Thành công", "Đã thêm sản phẩm thành công.", "success", 5000);
}

function showSuccessEditProductToast() {
  toast("Thành công", "Đã chỉnh sửa thông tin sản phẩm thành công.", "success", 5000);
}

