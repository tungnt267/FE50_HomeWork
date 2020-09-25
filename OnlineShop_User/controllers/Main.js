/**
 * @author Thanh Tung
 *
 * App: Online Shopping
 */

let productList = [];
let currentPage = 1;

// Fetch Products List
fetchProductList = () => {
  axios({
    url: `https://5f54430fe5de110016d51eb9.mockapi.io/api/products`,
    method: "GET",
    data: null,
  })
    .then((res) => {
      mapData(res.data, productList);
      renderProductList();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Map Data
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

// Render Products List
renderProductList = (data) => {
  data = data || productList;
  let htmlContent = "";

  if (productList.length === 0) {
    document.getElementById("navPagination").style.display = "none";
  } else {
    document.getElementById("navPagination").style.display = "flex";
  }
  if (data.length === 0 && data !== productList) {
    document.getElementById("navPagination").style.display = "none";
    const txtSearch = document.getElementById("txtSearch").value;
    if (txtSearch.trim().length === 0) {
      htmlContent = "";
    } else {
      htmlContent = `
      <div class="col-12 mt-5">
          <div class="text-center">
            <h4>No results for ${txtSearch}.</h4>
            <p>Try checking your spelling or use more general terms</p>
          </div>
      </div>
    `;
    }
  } else {
    document.getElementById("navPagination").style.display = "flex";
  }

  // Pagination
  paginationProduct(data);

  const perPage = +document.getElementById("perPage").value;
  let startOfPage = (currentPage - 1) * perPage;
  let endOfPage = currentPage * perPage;
  if (data.length < endOfPage) {
    endOfPage = data.length;
  }

  // Render Product List
  for (let i = startOfPage; i < endOfPage; i++) {
    htmlContent += `
        <div class="col-md-6 col-lg-4 mb-3">
            <div class="product__item card">
              <a href="./detail.html?id=${data[i].id}">    
              <img
                class="card-img-top"
                src="${data[i].image}"
                />
              </a>
              <div class="card-body">
                <h6 class="mb-0 mt-3">ID: ${data[i].id}</h6>
                <a class="product_link" href="./detail.html?id=${data[i].id}">    
                  <h4 class="card-title product__name my-1">${data[i].name}</h4>
                </a>
                <div class="product__price">
                    <span>$${data[i].price}</span>
                </div>
                <a 
                  href="./detail.html?id=${data[i].id}"
                  class="btn btn-detail"
                  id="btnDetail">
                    <i class="fa fa-search-plus"></i>
                    <p>Details</p>
                </a>
                <button class="btn btn-add-cart"
                  onclick="addToCart('add_${data[i].id}')">
                    <i class="fa fa-cart-plus mr-2"></i>
                    Add to cart
                </button>
              </div>
            </div>
        </div>
    `;
  }
  document.getElementById("productList").innerHTML = htmlContent;

  getQuantityTotal();
};

// Pagination
paginationProduct = (data) => {
  let numOfPage = Math.ceil(
    data.length / +document.getElementById("perPage").value
  );
  let htmlPagination = `
    <li class="page-item page-prev" id="liPrev">
      <button class="page-link page-switch" type=button id="goStart"
        onclick="switchPage('goStart')">
        <i class="fa fa-angle-double-left"></i>
      </button>
    </li>
    <li class="page-item page-prev" id="liPrev">
      <button class="page-link page-switch" type=button id="prevPage"
        onclick="switchPage('prevPage')">
        <i class="fa fa-angle-left"></i>
      </button>
    </li>
    <li class="page-item active">
      <button class="page-link page-current border-none" type=button"
        id="page_${currentPage}"
        onclick="switchPage('page_${currentPage}')">
        ${currentPage}<span class="sr-only">(current)</span>
      </button>
    </li>
    <li class="number-of-page">
      <span>of ${numOfPage}</span>
    </li>
    <li class="page-item page-next" id="liNext">
      <button class="page-link page-switch" type=button id="nextPage"
        onclick="switchPage('nextPage')">
        <i class="fa fa-angle-right"></i>
      </button>
    </li>
    <li class="page-item page-next" id="liNext">
      <button class="page-link page-switch" type=button id="goEnd"
        onclick="switchPage('goEnd')">
        <i class="fa fa-angle-double-right"></i>
      </button>
    </li>
  `;
  document.getElementById("ulPagination").innerHTML = htmlPagination;

  // Set style for pagination
  if (currentPage === 1) {
    document.getElementById("prevPage").disabled = true;
    document.getElementById("prevPage").style.backgroundColor = "#e9ecef";
    document.getElementById("goStart").disabled = true;
    document.getElementById("goStart").style.backgroundColor = "#e9ecef";
  }
  if (currentPage === numOfPage) {
    document.getElementById("nextPage").disabled = true;
    document.getElementById("nextPage").style.backgroundColor = "#e9ecef";
    document.getElementById("goEnd").disabled = true;
    document.getElementById("goEnd").style.backgroundColor = "#e9ecef";
  }
};

// Switch Page
switchPage = (idButton) => {
  if (idButton === "prevPage") {
    currentPage--;
    renderProductList();
  }
  if (idButton === "nextPage") {
    currentPage++;
    renderProductList();
  }
  if (idButton === "goStart") {
    currentPage = 1;
    renderProductList();
  }
  if (idButton === "goEnd") {
    currentPage = Math.ceil(
      productList.length / +document.getElementById("perPage").value
    );
    renderProductList();
  }
  if (idButton === `page_${currentPage}`) {
    renderProductList();
  }
};

// Switch Number Of Item Per Page
switchItemPage = () => {
  productList = [];
  currentPage = 1;
  fetchProductList();
};

// Find product name
findProduct = () => {
  currentPage = 1;
  let result = [];
  // Input: keyword
  let keyword = document.getElementById("txtSearch").value;

  for (let product of productList) {
    // Convert keyword
    const id = nonAccentVietnamese(product.id);
    const productName = nonAccentVietnamese(product.name);

    if (id === keyword) {
      result.push(product);
      break;
    }

    keyword = nonAccentVietnamese(keyword).trim();
    if (productName.indexOf(keyword) !== -1) {
      result.push(product);
    }
  }
  renderProductList(result);
};

// Converting standard Vietnamese Characters to non-accent ones
nonAccentVietnamese = (str) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

// Sort by name
sortProductName = (type) => {
  if (type === 1) {
    // Up
    productList.sort((a, b) => {
      if (
        nonAccentVietnamese(a.name.toLowerCase()) <
        nonAccentVietnamese(b.name.toLowerCase())
      )
        return -1;
      if (
        nonAccentVietnamese(a.name.toLowerCase()) >
        nonAccentVietnamese(b.name.toLowerCase())
      )
        return 1;
      return 0;
    });
  } else {
    // Down
    productList.sort((a, b) => {
      if (
        nonAccentVietnamese(a.name.toLowerCase()) >
        nonAccentVietnamese(b.name.toLowerCase())
      )
        return -1;
      if (
        nonAccentVietnamese(a.name.toLowerCase()) <
        nonAccentVietnamese(b.name.toLowerCase())
      )
        return 1;
      return 0;
    });
  }
};

// Sort by price
sortProductPrice = (type) => {
  if (type === 1) {
    // Up
    productList.sort((a, b) => +a.price.toLowerCase() - +b.price.toLowerCase());
  } else {
    // Down
    productList.sort((a, b) => +b.price.toLowerCase() - +a.price.toLowerCase());
  }
};

// Sort
showSortIcon = () => {
  const sortBy = document.getElementById("sortBy").value.toLowerCase();

  if (sortBy === "name") {
    renderProductList(sortProductName(1));
    document.getElementById("sortUp").style.visibility = "visible";
    document.getElementById("sortUp").style.display = "inline";
    document.getElementById("sortDown").style.display = "none";

    // Sort name up
    document.getElementById("sortUp").addEventListener("click", () => {
      document.getElementById("sortUp").style.display = "none";
      document.getElementById("sortDown").style.display = "inline";
      document.getElementById("sortDown").style.visibility = "visible";
      renderProductList(sortProductName(-1));
    });

    // Sort name down
    document.getElementById("sortDown").addEventListener("click", () => {
      document.getElementById("sortDown").style.display = "none";
      document.getElementById("sortUp").style.display = "inline";
      document.getElementById("sortUp").style.visibility = "visible";
      renderProductList(sortProductName(1));
    });
  } else if (sortBy === "price") {
    renderProductList(sortProductPrice(1));
    document.getElementById("sortUp").style.visibility = "visible";
    document.getElementById("sortUp").style.display = "inline";
    document.getElementById("sortDown").style.display = "none";

    // Sort price up
    document.getElementById("sortUp").addEventListener("click", () => {
      document.getElementById("sortUp").style.display = "none";
      document.getElementById("sortDown").style.display = "inline";
      document.getElementById("sortDown").style.visibility = "visible";
      renderProductList(sortProductPrice(-1));
    });

    // Sort price down
    document.getElementById("sortDown").addEventListener("click", () => {
      document.getElementById("sortDown").style.display = "none";
      document.getElementById("sortUp").style.display = "inline";
      document.getElementById("sortUp").style.visibility = "visible";
      renderProductList(sortProductPrice(1));
    });
  } else {
    document.getElementById("sortUp").style.visibility = "hidden";
    document.getElementById("sortDown").style.visibility = "hidden";
    productList = [];
    fetchProductList();
  }
};

fetchProductList();

let productsCart = [];

// Fetch Products Cart In LocalStorage
fetchCart = () => {
  const localProductsCart = localStorage.getItem("productsCart");
  if (localProductsCart) {
    mapCart(JSON.parse(localProductsCart), productsCart);
  }
};

// Map Products Cart
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

  let prodQuantity = 1;

  let localProductsCart = localStorage.getItem("productsCart");
  if (localProductsCart) {
    productsCart = JSON.parse(localProductsCart);
    for (const i in productsCart) {
      if (productsCart[i].id === idProduct) {
        prodQuantity = productsCart[i].quantity + 1;
        productsCart[i].quantity = prodQuantity;
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

// Save Products Cart
saveCart = (product) => {
  let localProductsCart = localStorage.getItem("productsCart");
  if (localProductsCart) {
    productsCart = JSON.parse(localProductsCart);
    productsCart.push(product);
  }
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
};

// Calc And Show Quantity Total
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

// Find Product By ID
findById = (idProduct, data) => {
  for (let product of data) {
    if (product.id === idProduct) {
      return product;
    }
  }
};

// Add Class Box Shadow
addBoxShadow = () => {
  document.getElementById("productSearch").classList.add("box-shadow-search");
};

// Remove Class Box Shadow
removeBoxShadow = () => {
  document
    .getElementById("productSearch")
    .classList.remove("box-shadow-search");
};
