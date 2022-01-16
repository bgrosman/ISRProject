const customersAddresses = new Map();
customersAddresses.set(0, "");
customersAddresses.set(1, "Hertzel 24");
customersAddresses.set(2, "Dizengof 111");
customersAddresses.set(3, "Jaffa 200");
customersAddresses.set(4, "Rabbi Akiva 45");
customersAddresses.set(5, "Michael 2");

const productsPrices = new Map();
productsPrices.set(0, "");
productsPrices.set(1, "200");
productsPrices.set(2, "100");
productsPrices.set(3, "4000");
productsPrices.set(4, "1500");
productsPrices.set(5, "1000");

let currentOrderDetails = [];

function initOrdersForm() {
  document.getElementById("create-close-order-button").innerHTML = "Create Order";
  document.getElementById("form-select-customer").selectedIndex = 0;
  document.getElementById("form-text-customer=address").value = "";
  document.getElementById("form-select-product").selectedIndex = 0;
  document.getElementById("form-text-price").value = "";
  document.getElementById("form-text-comment").value = "";
  document.getElementById("create-update-button").innerHTML = "Create";
}

function createOrderClick() {
  let ordersForm = document.getElementById("orders-form");
  let createCloseOrderButton = document.getElementById("create-close-order-button");
  if (ordersForm && ordersForm.style) {
    ordersForm.style.display = ordersForm.style.display != "none" ? "none" : "";
  }
  if (createCloseOrderButton.innerHTML == "Create Order") {
    createCloseOrderButton.innerHTML = "Close Order";
  } else {
    initOrdersForm();
  }
}

function customerSelect() {
  let formSelectCustomer = document.getElementById("form-select-customer");
  let formTextAddress = document.getElementById("form-text-customer=address");
  formTextAddress.value = customersAddresses.get(formSelectCustomer.selectedIndex);
}

function productSelect() {
  let formSelectProduct = document.getElementById("form-select-product");
  let formTextPrice = document.getElementById("form-text-price");
  formTextPrice.value = productsPrices.get(formSelectProduct.selectedIndex);
}

function createButtonClick() {
  let formSelectCustomer = document.getElementById("form-select-customer");
  let formTextAddress = document.getElementById("form-text-customer=address");
  let formSelectProduct = document.getElementById("form-select-product");
  let formTextPrice = document.getElementById("form-text-price");
  let formTextComment = document.getElementById("form-text-comment");
  let ordersTable = document.getElementById("orders-table");
  let ordersForm = document.getElementById("orders-form");
  let createUpdateButton = document.getElementById("create-update-button");
  if (formSelectCustomer.selectedIndex == 0) {
    alert("Please choose cutomer");
  } else if (formTextAddress.value == "") {
    alert("Please specify customer address");
  } else if (formSelectProduct.selectedIndex == 0) {
    alert("Please choose product");
  } else if (formTextPrice.value == "") {
    alert("Please specify price");
  } else if (formTextPrice.value.match(/^[0-9]+$/) == null) {
    alert("Price should be a number");
  } else {
    if (createUpdateButton.innerHTML == "Create") {
      let tableLength = ordersTable.rows.length;
      let row = ordersTable.insertRow(tableLength);
      if (tableLength % 2 == 0) {
        row.classList.add("table-primary");
      } else {
        row.classList.add("table-secondary");
      }
      let orderIdCell = row.insertCell(0);
      let customerNameCell = row.insertCell(1);
      let customerAddressCell = row.insertCell(2);
      let productCell = row.insertCell(3);
      let priceCell = row.insertCell(4);
      let commentCell = row.insertCell(5);
      row.addEventListener("click", rowClick, false);
      orderIdCell.outerHTML = "<th scope='row'>" + tableLength + "</th>";
      customerNameCell.innerHTML = formSelectCustomer.options[formSelectCustomer.selectedIndex].text;
      customerAddressCell.innerHTML = formTextAddress.value;
      productCell.innerHTML = formSelectProduct.options[formSelectProduct.selectedIndex].text;
      priceCell.innerHTML = formTextPrice.value;
      commentCell.innerHTML = formTextComment.value;
      alert("Order added successfully!");
    } else {
      currentOrderDetails[1].innerHTML = formSelectCustomer.options[formSelectCustomer.selectedIndex].text;
      currentOrderDetails[2].innerHTML = formTextAddress.value;
      currentOrderDetails[3].innerHTML = formSelectProduct.options[formSelectProduct.selectedIndex].text;
      currentOrderDetails[4].innerHTML = formTextPrice.value;
      currentOrderDetails[5].innerHTML = formTextComment.value;
      alert("Order number " +  currentOrderDetails[0].textContent + " updated successfully!");
    }
    ordersForm.style.display = "none";
    initOrdersForm();
  }
}

function rowClick() {
  currentOrderDetails = [];
  for (let i = 0; i < this.cells.length; i++) {
    currentOrderDetails.push(this.cells[i]);
  }
  let formSelectCustomer = document.getElementById("form-select-customer");
  let formTextAddress = document.getElementById("form-text-customer=address");
  let formSelectProduct = document.getElementById("form-select-product");
  let formTextPrice = document.getElementById("form-text-price");
  let formTextComment = document.getElementById("form-text-comment");
  let ordersForm = document.getElementById("orders-form");
  ordersForm.style.display = "";
  formSelectCustomer.selectedIndex = [...formSelectCustomer.options].findIndex (option => option.text == currentOrderDetails[1].textContent);
  formTextAddress.value = currentOrderDetails[2].textContent;
  formSelectProduct.selectedIndex = [...formSelectProduct.options].findIndex (option => option.text == currentOrderDetails[3].textContent);
  formTextPrice.value = currentOrderDetails[4].textContent;
  formTextComment.value = currentOrderDetails[5].textContent;
  document.getElementById("create-update-button").innerHTML = "Update";
  document.getElementById("create-close-order-button").innerHTML = "Close Order";
}
