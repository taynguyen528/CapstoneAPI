function Services() {
  this.baseUrl =
    "https://65b8739cb71048505a88a52c.mockapi.io/products_Capstone";

  this.getList = () => {
    return axios({
      url: this.baseUrl,
      method: "get",
    });
  };

  this.deleteProduct = (id) => {
    return axios({
      url: `${this.baseUrl}/${id}`,
      method: "delete",
    });
  };

  this.addProduct = (data) => {
    return axios({
      url: this.baseUrl,
      method: "post",
      data: data,
    });
  };

  this.getProductDetailById = function (id) {
    return axios({
      url: `${this.baseUrl}/${id}`,
      method: "get",
    });
  };

  this.editProduct = (id, data) => {
    return axios({
      url: `${this.baseUrl}/${id}`,
      method: "update",
      data: data,
    });
  };

  this.updateProduct = function (id, data) {
    return axios({
      url: `${this.baseUrl}/${id}`,
      method: "put",
      data: data,
    });
  };
}
