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
}
