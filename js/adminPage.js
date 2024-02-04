function getElement(id) {
  return document.getElementById(id);
}

var services = new Services();

function getProductListAdminPage() {
  //call api
  var promise = services.getList();

  promise
    .then(function (data) {
      //data.data là productList(tham số truyền vào hàm renderTable)
      //Gọi hàm render để hiển thị product list ra UI
      renderTableAdminPage(data.data);
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
}
getProductListAdminPage();

function renderTableAdminPage(productList) {
  var htmlContentAdminPage = "";
  for (var i = 0; i < productList.length; i++) {
    htmlContentAdminPage += `
    <tr>
    <td>
        <span>${i + 1}</span>  
       </td>
      <td>
        <span>${productList[i].name}</span>  
       </td>
      <td>
        <img
            src=${productList[i].img}
            alt="img"
        />
      </td>
      <td>${productList[i].price}</td>
      <td>
        <span>${productList[i].screen}</span>  
      </td>
      <td>
        <span style ='white-space: wrap;'>${productList[i].blackCamera}</span>
      </td>
      <td>
        <span>${productList[i].frontCamera}</span>
      </td>
      <td>
        <span style ='white-space: wrap;'>${productList[i].desc}</span>
      </td>
      <td>
        <span>${productList[i].type}</span>
      </td>
      <td>
      <div>
        <button class='btn-edit' onclick='btnEdit(${productList[i].id})'>
          Edit
        </button>
        <button 
          class='btn-delete' 
          data-id="${productList[i].id}" 
          onclick='showConfirmationModal(this)'>
            Delete
        </button>
      </div>
      </td>
    </tr>
    
    `;
  }
  getElement("tbodyAdminPage").innerHTML = htmlContentAdminPage;
}

function deleteProduct(productID) {
  var promise = services.deleteProduct(productID);

  promise
    .then((data) => {
      getProductListAdminPage();
    })
    .catch((error) => {
      console.log("error: ", error);
    });

  showSuccessDeleteToast();
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const wrapForm = document.getElementById("wrapForm");
  const btnAddProduct = document.querySelector(".btnAddProduct");

  btnAddProduct.addEventListener("click", function () {
    overlay.style.display = "block";
    wrapForm.style.display = "block";

    getElement("btnEditProductModal").style.display = "none";
    getElement("titleEditFormModal").style.display = "none";

    getElement("btnAddProductModal").style.display = "block";
    getElement("titleAddFormModal").style.display = "block";

    resetModal();
  });

  overlay.addEventListener("click", function () {
    overlay.style.display = "none";
    wrapForm.style.display = "none";
  });
});

var idProduct;

function showConfirmationModal(button) {
  var modal = document.getElementById("confirmationModal");
  idProduct = button.dataset.id * 1;

  modal.style.display = "block";
  overlay.style.display = "block";
}

confirmButton.addEventListener("click", function () {
  overlay.style.display = "none";
  confirmationModal.style.display = "none";
  deleteProduct(idProduct);
});

cancelButton.addEventListener("click", function () {
  overlay.style.display = "none";
  confirmationModal.style.display = "none";
});

function getInfoProduct() {
  var name = getElement("productName").value;
  var price = getElement("productPrice").value;
  var img = getElement("productImage").value;
  var screen = getElement("productScreen").value;
  var blackCamera = getElement("productBlackCamera").value;
  var frontCamera = getElement("productFrontCamera").value;
  var desc = getElement("productDescription").value;
  var dropdown = getElement("productType");
  var selectedIndex = dropdown.selectedIndex;
  var selectedValue = dropdown.options[selectedIndex].value;

  return new Product(
    name,
    price,
    screen,
    blackCamera,
    frontCamera,
    img,
    desc,
    selectedValue
  );
}

function addProduct() {
  var product = getInfoProduct();
  console.log(product);

  var promise = services.addProduct(product);

  promise
    .then((data) => {
      getProductListAdminPage();
      showSuccessAddProductToast();
      getElement("wrapForm").style.display = "none";
      getElement("overlay").style.display = "none";
      resetModal();
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

function resetModal() {
  getElement("productName").value = "";
  getElement("productPrice").value = "";
  getElement("productImage").value = "";
  getElement("productScreen").value = "";
  getElement("productBlackCamera").value = "";
  getElement("productFrontCamera").value = "";
  getElement("productDescription").value = "";
  var dropdown = getElement("productType");
  dropdown.value = "Samsung";
}
var idProductEdit;
function btnEdit(id) {
  getElement("wrapForm").style.display = "block";
  getElement("overlay").style.display = "block";

  var promise = services.getProductDetailById(id);
  idProductEdit = id;
  promise
    .then((data) => {
      var product = data.data;

      getElement("productName").value = product.name;
      getElement("productPrice").value = product.price;
      getElement("productImage").value = product.img;
      getElement("productScreen").value = product.screen;
      getElement("productBlackCamera").value = product.blackCamera;
      getElement("productFrontCamera").value = product.frontCamera;
      getElement("productDescription").value = product.desc;
      getElement("productType").value = product.type;

      getElement("btnAddProductModal").style.display = "none";
      getElement("titleAddFormModal").style.display = "none";

      getElement("btnEditProductModal").style.display = "block";
      getElement("titleEditFormModal").style.display = "block";
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

getElement("btnEditProductModal").addEventListener("click", function () {
  var product = getInfoProduct();
  console.log("Product sau update: ", product);
  var promise = services.updateProduct(idProductEdit, product);

  promise
    .then((data) => {
      //gọi lại api để cập nhật lại UI sau khi cập nhật tương tự như render lại dssv, dsnv
      // trong getProductListAdminPage(); đã có renderTable
      getProductListAdminPage();
      showSuccessEditProductToast();
      getElement("wrapForm").style.display = "none";
      getElement("overlay").style.display = "none";
      // resetModal();
    })
    .catch((error) => {
      console.log(error);
    });
});
