var isDarkMode = false;
function updateFooterImg() {
  var footerImg = document.getElementById("footerImg");

  if (isDarkMode) {
    footerImg.src = "../img/angle-up-light.svg";
  } else {
    footerImg.src = "../img/angle-up-dark.png";
  }
  isDarkMode = !isDarkMode;
}

function darkMode() {
  var htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark");

  var buyButtons = document.querySelectorAll(".btn-buy");
  for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].classList.toggle("btn-buy-dark");
  }
  updateFooterImg();

  var buttonPayment = document.getElementById("btn-payment");
  buttonPayment.classList.toggle("btn-payment-dark");

  const quantityButtons = document.querySelectorAll(".btn-change-quantity");

  for (let i = 0; i < quantityButtons.length; i++) {
    quantityButtons[i].classList.remove("btn-change-quantity-dark");

    if (document.documentElement.classList.contains("dark")) {
      quantityButtons[i].classList.add("btn-change-quantity-dark");
    } else {
      quantityButtons[i].classList.remove("btn-change-quantity-dark");
    }
  }

  isDarkMode = !isDarkMode;
}

// CapstoneAPI
function getElement(id) {
  return document.getElementById(id);
}
var productListData;
const service = new Services();
function getProductList() {
  //call api

  var promise = service.getList();

  //.then để nhận trường hợp lấy data thành công
  //.catch để nhận trường hợp lấy data thất bại
  promise
    .then((data) => {
      //data.data là productList(tham số truyền vào hàm renderTable)
      //Gọi hàm render để hiển thị product list ra UI
      renderTable(data.data);
      productListData = data.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

getProductList();

function renderTable(productList) {
  var htmlContent = "";

  for (var i = 0; i < productList.length; i++) {
    htmlContent += `
    <div class="col-12 col-lg-6 itemProduct">
      <img
                src=${productList[i].img}
                alt="product"
              />
              <div class="infoProduct">
                <div class="topProduct">
                  <div class="titleProduct">
                    <div class="nameProduct">${productList[i].name}</div>
                  </div>
                  <div class="priceProduct">${productList[i].price}</div>
                </div>
                <div class="bottomProduct">
                  <div class="infoProduct">
                    <spam class="titleInfo">Thông tin sản phẩm:</spam>
                    <div class="screen">Screen: ${productList[i].screen}.</div>
                    <div class="blackCamera">BlackCamera: ${productList[i].blackCamera}.</div>
                    <div class="frontCamera">FrontCamera: ${productList[i].frontCamera}.</div>
                    <div class="desc">Mô tả: ${productList[i].desc}.</div>
                  </div>
                  <button class="btn-buy" index-product="${i}">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
    `;
  }
  getElement("row").innerHTML = htmlContent;

  var buyButtons = document.querySelectorAll(".btn-buy");

  for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener("click", function (e) {
      var indexProduct = e.target.getAttribute("index-product");
      var selectedProduct = productList[indexProduct];
      addToCart(selectedProduct);
    });
  }
}

function filterProducts() {
  var select = getElement("productType").value;

  var arrProductFilter =
    select === "all"
      ? productListData
      : productListData.filter((product) => product.type === select);

  renderTable(arrProductFilter);
}
