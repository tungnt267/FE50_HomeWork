let productDetail;
let prodQuantity = 1;

fetchProductDetail = () => {
  const productID = location.search.split("=")[1];
  axios({
    url: `https://5f54430fe5de110016d51eb9.mockapi.io/api/products/${productID}`,
    method: "GET",
    data: null,
  })
    .then(function (res) {
      productDetail = res.data;
      mapProductDetail(res.data, productDetail);
      renderDetails();
    })
    .catch(function (err) {
      console.log(err);
    });
};

renderDetails = () => {
  var htmlContent = "";
  htmlContent += `
    <div class="col-6 col-sm-7 col-lg-6">
      <div class="group-images">
        <a><img
            class="images"
            src="${productDetail.image}"
          />
        </a>
        <div class="thumbnail text-right pr-5">
          <div class="container img-zoom-container ">
            <a href="#">
              <img
                class="img-origin"
                id="myImage"
                src="${productDetail.image}"
              />
            </a>
            <div id="myResult" class="img-zoom-result"></div>
          </div>
          <div class="thumbnail-tut text-center">
            <i class="fa fa-search-plus"></i>
            <span>Enlarge Images on Hover</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-sm-5 col-lg-6">
      <div class="detail__content">
        <h4 class="detail__name mb-4">${productDetail.name}</h4>
        <div class="detail__rating mb-2">
          <div class="rating-star" id="ratingStar">${ratingStar()}</div>
          <span class="rate-point">${productDetail.rating}</span>
        </div>
        <div class="detail__description mb-2">
          <span class="detail-title">Description: </span>
          ${productDetail.description}
        </div>
        <div class="detail__price mb-2">
          <p class="detail-title">Price: <span>$${
            productDetail.price
          }</span></p>
        </div>
        <div class="detail__inventory mb-2">
          <span class="detail-title">Inventory: </span>
          ${productDetail.inventory}
        </div>
        <div class="detail__type mb-5">
          <span class="detail-title">Type: </span>
          ${productDetail.type}
        </div>
        <div class="detail__quantity">
          <div class="btn-group">
            <button class="btn btn-quantity"
              id="reduction_${productDetail.id}"
              onclick="switchQuantity('reduction_${
                productDetail.id
              }')">-</button>
              <input
              type="number"
              min="1"
              oninput="getChangeQuantity()"
              onblur="blurQuantity()"
              class="input-quantity"
              id="inputQuantity"
              value="${prodQuantity}"
            />
            <button class="btn btn-quantity"
            id="increase_${productDetail.id}"
            onclick="switchQuantity('increase_${productDetail.id}')">+</button>
          </div>
          <button class="btn btn-add-cart ml-3"
          onclick="addToCart('add_${productDetail.id}')">
            <i class="fa fa-cart-plus mr-0 mr-md-2"></i>
            Add to cart
          </button>
        </div>
      </div>
    </div>
    `;
  document.getElementById("productDetail").innerHTML = htmlContent;
  imageZoom("myImage", "myResult");
  setStyleQuantity();
  getQuantityTotal();
};

mapProductDetail = (data, product) => {
  let newProduct = new Product(
    data.id,
    data.name,
    data.image,
    data.description,
    data.price,
    data.inventory,
    data.rating,
    data.type
  );
  product = { ...newProduct, quantity: prodQuantity };
};

ratingStar = () => {
  let htmlRating = "";
  if (+productDetail.rating >= 5) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
  `;
  } else if (+productDetail.rating > 4) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fa fa-star-half-alt enable"></i>
  `;
  } else if (+productDetail.rating === 4) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else if (+productDetail.rating > 3) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fa fa-star-half-alt enable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else if (+productDetail.rating === 3) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else if (+productDetail.rating > 2) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fa fa-star-half-alt enable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else if (+productDetail.rating === 2) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star enable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else if (+productDetail.rating > 1) {
    htmlRating = `
    <i class="fas fa-star enable"></i>
    <i class="fa fa-star-half-alt enable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else if (+productDetail.rating === 1) {
    htmlRating = `
    <i class="fa fa-star-half-alt enable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else if (+productDetail.rating > 0) {
    htmlRating = `
    <i class="fa fa-star-half-alt enable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
    <i class="fas fa-star disable"></i>
  `;
  } else {
    htmlRating = `
  <i class="fas fa-star disable"></i>
  <i class="fas fa-star disable"></i>
  <i class="fas fa-star disable"></i>
  <i class="fas fa-star disable"></i>
  <i class="fas fa-star disable"></i>
  `;
  }
  return htmlRating;
};

fetchProductDetail();

let productsCart = [];

fetchCart = () => {
  const localProductsCart = localStorage.getItem("productsCart");
  if (localProductsCart) {
    mapCart(JSON.parse(localProductsCart), productsCart);
  }
};

mapCart = (data, arr) => {
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

fetchCart();

// Add to cart
addToCart = (idButton) => {
  const idProduct = idButton.split("_")[1];
  const product = findById(idProduct, productList);

  prodQuantity = +document.getElementById("inputQuantity").value;

  let localProductsCart = localStorage.getItem("productsCart");
  if (localProductsCart) {
    productsCart = JSON.parse(localProductsCart);
    for (const i in productsCart) {
      if (productsCart[i].id === idProduct) {
        productsCart[i].quantity += prodQuantity;
        localStorage.setItem("productsCart", JSON.stringify(productsCart));
        getQuantityTotal();

        swal({
          title: "Item has been added to your shopping cart",
          text: "",
          icon: "../assets/images/check-circle.png",
          button: false,
          timer: 3000,
        });
        return;
      }
    }
  }
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
  newProduct = { ...newProduct, quantity: prodQuantity };
  productsCart.push(newProduct);
  saveCart(newProduct);
  getQuantityTotal();

  swal({
    title: "Item has been added to your shopping cart",
    text: "",
    icon: "../assets/images/check-circle.png",
    button: false,
    timer: 3000,
  });
};

saveCart = (product) => {
  let localProductsCart = localStorage.getItem("productsCart");
  if (localProductsCart) {
    productsCart = JSON.parse(localProductsCart);
    productsCart.push(product);
  }
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
};

getQuantityTotal = () => {
  let quantityTotal = 0;
  for (const product of productsCart) {
    quantityTotal += product.quantity;
  }
  document.getElementById("cartCount").innerHTML = `${quantityTotal}`;

  if (productsCart.length !== 0) {
    document.getElementById("cartCount").style.display = "inline";
  } else {
    document.getElementById("cartCount").style.display = "none";
  }
};

switchQuantity = (idButton) => {
  if (idButton === `reduction_${productDetail.id}`) {
    prodQuantity--;

    renderDetails();
  }
  if (idButton === `increase_${productDetail.id}`) {
    prodQuantity++;

    renderDetails();
  }
};

setStyleQuantity = () => {
  if (+document.getElementById("inputQuantity").value <= 1) {
    document.getElementById(`reduction_${productDetail.id}`).disabled = true;
    document.getElementById(
      `reduction_${productDetail.id}`
    ).style.backgroundColor = "#e9ecef";
  }

  if (
    +document.getElementById("inputQuantity").value >= +productDetail.inventory
  ) {
    document.getElementById(`increase_${productDetail.id}`).disabled = true;
    document.getElementById(
      `increase_${productDetail.id}`
    ).style.backgroundColor = "#e9ecef";
  }
};

getChangeQuantity = () => {
  let inputQuantity = +document.getElementById("inputQuantity").value;

  if (inputQuantity <= 1) {
    document.getElementById(`reduction_${productDetail.id}`).disabled = true;
    document.getElementById(
      `reduction_${productDetail.id}`
    ).style.backgroundColor = "#e9ecef";
  } else {
    document.getElementById(`reduction_${productDetail.id}`).disabled = false;
    document.getElementById(
      `reduction_${productDetail.id}`
    ).style.backgroundColor = "#dbdada";
  }

  if (inputQuantity >= productDetail.inventory) {
    document.getElementById("inputQuantity").value = productDetail.inventory;
    document.getElementById(`increase_${productDetail.id}`).disabled = true;
    document.getElementById(
      `increase_${productDetail.id}`
    ).style.backgroundColor = "#e9ecef";
  } else {
    document.getElementById(`increase_${productDetail.id}`).disabled = false;
    document.getElementById(
      `increase_${productDetail.id}`
    ).style.backgroundColor = "#dbdada";
  }

  document.getElementById("inputQuantity").validity.valid ||
    (document.getElementById("inputQuantity").value = "");
};

blurQuantity = () => {
  let inputQuantity = +document.getElementById("inputQuantity").value;
  if (inputQuantity <= 0) {
    document.getElementById("inputQuantity").value = prodQuantity;
  }
};

findById = (id, data) => {
  for (let product of data) {
    if (product.id === id) {
      return product;
    }
  }
};

let productList = [];

fetchProductList = () => {
  axios({
    url: `https://5f54430fe5de110016d51eb9.mockapi.io/api/products`,
    method: "GET",
    data: null,
  })
    .then((res) => {
      mapData(res.data, productList);
    })
    .catch((err) => {
      console.log(err);
    });
};

mapData = (data, arr) => {
  for (let product of data) {
    const newProduct = new Product(
      product.id,
      product.name,
      product.image,
      product.description,
      product.price,
      product.inventory,
      product.rating,
      product.type
    );
    arr.push(newProduct);
  }
};

fetchProductList();
