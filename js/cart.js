function getElement(id) {
  return document.getElementById(id);
}

//add to cart
var cart = getCartFromLocalStorage();

function addToCart(product) {
  // check xem sản phẩm đã có trong giỏ hàng chưa
  var checkProductInCart = -1;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === product.name) {
      checkProductInCart = i;
      break;
    }
  }

  if (checkProductInCart !== -1) {
    cart[checkProductInCart].quantity++;
  } else {
    var cartItem = {
      name: product.name,
      price: product.price,
      screen: product.screen,
      blackCamera: product.blackCamera,
      frontCamera: product.frontCamera,
      img: product.img,
      desc: product.desc,
      type: product.type,
      quantity: 1,
    };
    cart.push(cartItem);
  }

  showInfoToast();
  setCartToLocalStorage(cart);
  showCartFromLocalStorage();
}

function changeQuantity(index, type) {
  if (type === "decrement" && cart[index].quantity > 1) {
    cart[index].quantity--;
  } else if (type === "increment") {
    cart[index].quantity++;
  }

  renderTableCart(cart);
  setCartToLocalStorage(cart);

  updateTotalUI(cart);
}

function removeProduct(index) {
  cart.splice(index, 1);
  renderTableCart(cart);
  updateTotalUI(cart);

  setCartToLocalStorage(cart);
}

function setCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");

  try {
    if (storedCart !== null) {
      return JSON.parse(storedCart);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

function renderTableCart(cart) {
  var tbCartContent = "";
  for (var i = 0; i < cart.length; i++) {
    tbCartContent += `
    <tr>
      <td>
        <img
          src=${cart[i].img}
          alt="img"
        />
       </td>
      <td>
        <span>${cart[i].name}</span>
      </td>
      <td>${cart[i].price}</td>
      <td>
        <button class="btn-change-quantity" data-type="decrement" onclick="changeQuantity(${i}, 'decrement')">
           -
        </button>
        <span class="quantity" style="margin: 0 5px">${cart[i].quantity}</span>
        <button class="btn-change-quantity"  data-type="increment" onclick="changeQuantity(${i}, 'increment')">
           +
        </button>
      </td>
      <td>${cart[i].quantity * cart[i].price}</td>
      <td>
      <div>
        <div>
          <i class="fa-solid fa-trash" onclick="removeProduct(${i})"></i>
        </div>
      </div>
      </td>
    </tr>
    
    `;
  }
  getElement("tbodyCart").innerHTML = tbCartContent;
}

function calculateTotal(cart) {
  var total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity * cart[i].price;
  }
  return total;
}

function updateTotalUI(cart) {
  const totalSpan = getElement("totalAmount");
  const total = calculateTotal(cart);
  totalSpan.innerHTML = total;
}

function showCartFromLocalStorage() {
  var cart = getCartFromLocalStorage();
  renderTableCart(cart);
  updateTotalUI(cart);
}

document.addEventListener("DOMContentLoaded", function () {
  showCartFromLocalStorage();
});

const overlay = getElement("overlay");
const confirmationModal = getElement("confirmationModal");
const confirmButton = getElement("confirmButton");
const cancelButton = getElement("cancelButton");

getElement("btn-payment").addEventListener("click", function () {
  overlay.style.display = "block";
  confirmationModal.style.display = "block";
});

confirmButton.addEventListener("click", function () {
  showSuccessToast();

  overlay.style.display = "none";
  confirmationModal.style.display = "none";

  confirmPaymentAndClearCart();
});

cancelButton.addEventListener("click", function () {
  overlay.style.display = "none";
  confirmationModal.style.display = "none";
});

function confirmPaymentAndClearCart() {
  clearCart();

  getElement("totalAmount").innerHTML = 0;

  setCartToLocalStorage();
}

function clearCart() {
  const emptyCart = [];
  setCartToLocalStorage(emptyCart);
  renderTableCart(emptyCart);
}
