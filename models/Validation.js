function Validation() {
  this.kiemTraRong = function (value, elementErrorID, messageError) {
    if (value === "") {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }

    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraAm = function (value, elementErrorID, messageError) {
    if (value <= 0) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }

    getElement(elementErrorID).innerHTML = "";
    return true;
  };
}
