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

function initOrdersForm() {
  document.getElementById("create-order-button").innerHTML = "Create Order";
  document.getElementById("form-select-customer").selectedIndex = 0;
  document.getElementById("form-text-customer=address").value = "";
  document.getElementById("form-select-product").selectedIndex = 0;
  document.getElementById("form-text-price").value = "";
  document.getElementById("form-text-comment").value = "";
}

function createOrderClick() {
  let ordersForm = document.getElementById("orders-form");
  let createOrderButton = document.getElementById("create-order-button");
  if (ordersForm && ordersForm.style) {
    ordersForm.style.display = ordersForm.style.display != "none" ? "none" : "";
  }
  if (createOrderButton.innerHTML == "Create Order") {
    createOrderButton.innerHTML = "Close Order";
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
  let createOrderButton = document.getElementById("create-order-button");
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
    for (let i = 1; i < row.cells.length; i++) {
      row.cells[i].setAttribute("contenteditable", "true");
    }
    orderIdCell.outerHTML = "<th scope='row'>" + tableLength + "</th>";
    customerNameCell.innerHTML = formSelectCustomer.options[formSelectCustomer.selectedIndex].text;
    customerAddressCell.innerHTML = formTextAddress.value;
    productCell.innerHTML = formSelectProduct.options[formSelectProduct.selectedIndex].text;
    priceCell.innerHTML = formTextPrice.value;
    commentCell.innerHTML = formTextComment.value;
    ordersForm.style.display = "none";
    initOrdersForm();
    alert("Order added successfully!");
  }
}
