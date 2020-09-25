/**
 * @author Thanh Tung
 */

let productsCart = [];

fetchCart = () => {
  const localProductsCart = localStorage.getItem("productsCart");
  if (localProductsCart) {
    mapData(JSON.parse(localProductsCart), productsCart);
    renderCart();
  }
};

deleteCart = (idButton) => {
  const idCart = idButton.split("_")[1];
  const index = findPosition(idCart);
  productsCart.splice(index, 1);
  saveCart();
  renderCart();
};

renderCart = (data) => {
  data = data || productsCart;

  if (productsCart.length === 0) {
    document.getElementById("rowProductsCart").style.display = "none";
    document.getElementById("noItems").style.display = "block";
  } else {
    document.getElementById("rowProductsCart").style.display = "block";
    document.getElementById("noItems").style.display = "none";
  }

  let htmlCart = "";
  for (let product of data) {
    htmlCart += `
        <tr>
          <td>
            <a href="detail.html?id=${product.id}">
              <img
                  class="item-img"
                  src="${product.image}"
              />
            </a>
          </td>
          <td class="item-name">
            <a href="detail.html?id=${product.id}">${product.name}</a>
          </td>
          <td class="item-price">$${product.price}</td>
          <td class="item-quantity">
            <div class="btn-group">
                <button class="btn btn-quantity" id="reduction_${product.id}"
                onclick="switchQuantity('reduction_${product.id}')">-</button>
                <input
                type="number"
                min="1"
                class="input-quantity"
                id="inputQuantity_${product.id}"
                value="${product.quantity}"
                onchange="getChangeQuantity('${product.id}')"
                oninput="onInputQuantity('${product.id}')"
                />
                <button class="btn btn-quantity" id="increase_${product.id}"
                onclick="switchQuantity('increase_${product.id}')">+</button>
            </div>
            <div class="inventory-available mt-2">${
              product.inventory
            } piece available</div>
          </td>
          <td class="item-total">$${product.price * product.quantity}</td>
          <td>
            <button class="btn btn-danger btn-delete id="delete_${product.id}"
            onclick="deleteCart('delete_${product.id}')"
            ">x</button>
          </td>
        </tr>
      `;
  }
  document.getElementById("tbodyCart").innerHTML = htmlCart;

  let sumTotal = 0;
  for (let product of data) {
    sumTotal += product.price * product.quantity;
  }
  document.getElementById("orderTotal").innerHTML = `$${sumTotal}`;

  setStyleQuantity();

  getQuantityTotal();
};

checkout = () => {
  if (productsCart.length !== 0) {
    productsCart = [];
    saveCart();
    renderCart();
    swal({
      title: "You have successfully paid",
      text: "",
      icon: "../assets/images/check-circle.png",
      button: false,
      timer: 3000,
    });
  } else {
    swal({
      title: "No items in your shopping cart",
      text: "",
      icon: "../assets/images/check-circle.png",
      button: false,
      timer: 3000,
    });
  }
};

switchQuantity = (idButton) => {
  const id = idButton.split("_")[1];
  const product = findById(id, productsCart);

  if (idButton === `reduction_${id}`) {
    product.quantity--;
    saveCart();
    renderCart();
  }
  if (idButton === `increase_${id}`) {
    product.quantity++;
    saveCart();
    renderCart();
  }
};

setStyleQuantity = () => {
  for (let product of productsCart) {
    if (product.quantity <= 1) {
      document.getElementById(`reduction_${product.id}`).disabled = true;
      document.getElementById(`reduction_${product.id}`).style.backgroundColor =
        "#e9ecef";
    } else {
      document.getElementById(`reduction_${product.id}`).disabled = false;
      document.getElementById(`reduction_${product.id}`).style.backgroundColor =
        "#dbdada";
    }

    if (product.quantity >= product.inventory) {
      document.getElementById(`increase_${product.id}`).disabled = true;
      document.getElementById(`increase_${product.id}`).style.backgroundColor =
        "#e9ecef";
    } else {
      document.getElementById(`increase_${product.id}`).disabled = false;
      document.getElementById(`increase_${product.id}`).style.backgroundColor =
        "#dbdada";
    }
  }
};

onInputQuantity = (id) => {
  document.getElementById(`inputQuantity_${id}`).validity.valid ||
    (document.getElementById(`inputQuantity_${id}`).value = "");

  const product = findById(id, productsCart);

  if (+document.getElementById(`inputQuantity_${id}`).value <= 1) {
    document.getElementById(`reduction_${id}`).disabled = true;
    document.getElementById(`reduction_${id}`).style.backgroundColor =
      "#e9ecef";
  } else {
    document.getElementById(`reduction_${id}`).disabled = false;
    document.getElementById(`reduction_${id}`).style.backgroundColor =
      "#dbdada";
  }

  if (
    +document.getElementById(`inputQuantity_${id}`).value >= product.inventory
  ) {
    document.getElementById(`inputQuantity_${id}`).value = product.inventory;
    document.getElementById(`increase_${id}`).disabled = true;
    document.getElementById(`increase_${id}`).style.backgroundColor = "#e9ecef";
  } else {
    document.getElementById(`increase_${id}`).disabled = false;
    document.getElementById(`increase_${id}`).style.backgroundColor = "#dbdada";
  }
};

getChangeQuantity = (id) => {
  const inputQuantity = +document.getElementById(`inputQuantity_${id}`).value;
  for (let product of productsCart) {
    if (inputQuantity <= 0) {
      document.getElementById(`inputQuantity_${id}`).value = product.quantity;
      renderCart();
      break;
    }
    if (product.id === id) {
      product.quantity = inputQuantity;
      saveCart();
      renderCart();
    }
  }
};

getQuantityTotal = () => {
  let quantityTotal = 0;
  for (const product of productsCart) {
    quantityTotal += product.quantity;
  }
  document.getElementById(
    "productCount"
  ).innerHTML = `(${quantityTotal} product)`;

  document.getElementById("cartCount").innerHTML = `${quantityTotal}`;

  if (productsCart.length !== 0) {
    document.getElementById("cartCount").style.display = "inline";
  } else {
    document.getElementById("cartCount").style.display = "none";
  }
};

saveCart = () => {
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
};

mapData = (data, arr) => {
  for (let product of data) {
    let newProduct = new Product(
      product.id,
      product.name,
      product.image,
      product.description,
      product.price,
      product.inventory,
      product.rating,
      product.type
    );
    newProduct = { ...newProduct, quantity: product.quantity };
    arr.push(newProduct);
  }
};

findPosition = (id) => {
  for (let i in productsCart) {
    if (productsCart[i].id === id) {
      return i;
    }
  }
  return -1;
};

findById = (id, data) => {
  for (let product of data) {
    if (product.id === id) {
      return product;
    }
  }
};

fetchCart();
