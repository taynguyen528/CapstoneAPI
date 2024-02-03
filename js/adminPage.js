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
      console.log(data.data);
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
        <button class='btn-edit'>Edit</button>
        <button class='btn-delete' data-id="${
          productList[i].id
        }" onclick='showConfirmationModal(this)'>Delete</button>
      </div>
      </td>
    </tr>
    
    `;
  }
  getElement("tbodyAdminPage").innerHTML = htmlContentAdminPage;
}

function deleteProduct(productID) {
  console.log("productID: ", productID);

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
  console.log(idProduct);
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
