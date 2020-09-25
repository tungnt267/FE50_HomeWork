/**
 * @author Thanh Tung
 */

const linkAPI = `https://5f54430fe5de110016d51eb9.mockapi.io/api/products`;
let productList = [];
let currentPage = 1;

// Fetch Data
fetchProductList = () => {
  axios({
    url: linkAPI,
    method: "GET",
    data: null,
  })
    .then((res) => {
      mapData(res.data);
      renderProductList();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Render Data
renderProductList = (data) => {
  data = data || productList;
  let htmlContent = "";

  if (productList.length === 0) {
    document.getElementById("pageSection").style.display = "none";
  } else {
    document.getElementById("pageSection").style.display = "block";
  }

  if (data.length === 0 && data !== productList) {
    document.getElementById("pageSection").style.display = "none";
    const txtSearch = document.getElementById("txtSearch").value;
    if (txtSearch.trim().length === 0) {
      htmlContent = "";
    } else {
      htmlContent = `
        <tr>
          <td class="text-center pt-5" colspan="8">
            <h4>No results for ${txtSearch}.</h4>
            <p>Try checking your spelling or use more general terms</p>
          </td>
        </tr>
    `;
    }
  } else {
    document.getElementById("pageSection").style.display = "block";
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
      <tr>
        <td class="product-img">
          <img
            class="product-img"
            src="${data[i].image}"
          />
        </td>
        <td>${data[i].id}</td>
        <td class="td-capital">${data[i].name}</td>
        <td>${data[i].description}</td>
        <td>$${data[i].price}</td>
        <td>${data[i].inventory}</td>
        <td class="product-type td-capital">${data[i].type}</td>
        <td>
          <div class="btn-config">
            <button class="btn btn-danger rounded-circle mr-1" 
              onclick="deleteProduct('${data[i].id}')">
              <i class="fa fa-trash"></i>
            </button>
            <button class="btn btn-info rounded-circle
              id="edit_${data[i].id}"
              onclick="editProduct('${data[i].id}')"
              data-target="#myModal"
              data-toggle="modal">
              <i class="fa fa-pencil"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }
  document.getElementById("tbodyList").innerHTML = htmlContent;
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

// Modal Handling
document.getElementById("btnAddNew").addEventListener("click", () => {
  document.getElementById("modalTitle").innerHTML = "Add New Product";
  document.getElementById("btnHandle").innerHTML = `
      <button type="button" class="btn btn-success"
      onclick="addProduct()">Add Product</button>
      `;
  document.getElementById("btnReset").click();
  clearErrorMessage();
});

// Add New Product
addProduct = () => {
  const id = document.getElementById("idProduct").value;
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const inventory = document.getElementById("inventory").value;
  const rating = document.getElementById("rating").value;
  const type = document.getElementById("type").value;

  // Validation Form
  let isValid = true;
  isValid &= checkRequired(id, "idError") && checkExistsId(id);
  isValid &= checkRequired(name, "nameError");
  isValid &= checkRequired(image, "imageError");
  isValid &= checkRequired(description, "desError");
  isValid &= checkRequired(price, "priceError");
  isValid &= checkRequired(inventory, "invError");
  isValid &=
    checkRequired(rating, "ratingError") && checkRating(rating, "ratingError");
  isValid &= checkRequired(type, "typeError");

  if (isValid) {
    const newProduct = new Product(
      id,
      name,
      image,
      description,
      price,
      inventory,
      rating,
      type
    );

    axios({
      url: linkAPI,
      method: "POST",
      data: newProduct,
    })
      .then((res) => {
        productList = [];
        fetchProductList();
        document.getElementById("btnClose").click();
        document.getElementById("btnReset").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Clear Error Message
clearErrorMessage = () => {
  const spMessage = document.getElementsByClassName("sp-message");
  for (const message of spMessage) {
    message.innerHTML = "";
  }
  document.getElementById("idProduct").removeAttribute("disabled");
};

// Delete Product
deleteProduct = (id) => {
  axios({
    url: linkAPI + `/${id}`,
    method: "DELETE",
    data: null,
  })
    .then((res) => {
      productList = [];
      fetchProductList();
    })
    .catch((err) => {
      console.log(err);
    });
};
// Edit Product
editProduct = (id) => {
  clearErrorMessage();
  // Modal Handling
  document.getElementById("modalTitle").innerHTML = "Edit Product";
  document.getElementById("btnHandle").innerHTML = `
      <button type="button" class="btn btn-success"
      onclick="updateProduct('${id}')">Save Product</button>
      `;

  axios({
    url: linkAPI + `/${id}`,
    method: "GET",
    data: null,
  })
    .then((res) => {
      document.getElementById("idProduct").value = res.data.id;
      document.getElementById("name").value = res.data.name;
      document.getElementById("image").value = res.data.image;
      document.getElementById("description").value = res.data.description;
      document.getElementById("price").value = res.data.price;
      document.getElementById("inventory").value = res.data.inventory;
      document.getElementById("rating").value = res.data.rating;
      document.getElementById("type").value = res.data.type;

      document.getElementById("idProduct").setAttribute("disabled", true);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update Product
updateProduct = (id) => {
  const idProduct = document.getElementById("idProduct").value;
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const inventory = document.getElementById("inventory").value;
  const rating = document.getElementById("rating").value;
  const type = document.getElementById("type").value;

  // Validation Form
  let isValid = true;
  isValid &= checkRequired(id, "idError");
  isValid &= checkRequired(name, "nameError");
  isValid &= checkRequired(image, "imageError");
  isValid &= checkRequired(description, "desError");
  isValid &= checkRequired(price, "priceError");
  isValid &= checkRequired(inventory, "invError");
  isValid &=
    checkRequired(rating, "ratingError") && checkRating(rating, "ratingError");
  isValid &= checkRequired(type, "typeError");
  if (isValid) {
    const newProduct = new Product(
      idProduct,
      name,
      image,
      description,
      price,
      inventory,
      rating,
      type
    );

    axios({
      url: linkAPI + `/${id}`,
      method: "PUT",
      data: newProduct,
    })
      .then((res) => {
        productList = [];
        fetchProductList();
        document.getElementById("btnClose").click();
        document.getElementById("btnReset").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Find product
findProduct = () => {
  currentPage = 1;
  let result = [];
  // Input: keyword
  let keyword = document.getElementById("txtSearch").value;

  for (let product of productList) {
    // Convert keyword
    keyword = nonAccentVietnamese(keyword).trim();

    const id = nonAccentVietnamese(product.id);
    const productName = nonAccentVietnamese(product.name);
    const description = nonAccentVietnamese(product.description);
    const price = "$" + nonAccentVietnamese(product.price);
    const inventory = nonAccentVietnamese(product.inventory);
    const type = nonAccentVietnamese(product.type);

    if (
      id.indexOf(keyword) !== -1 ||
      productName.indexOf(keyword) !== -1 ||
      description.indexOf(keyword) !== -1 ||
      price.indexOf(keyword) !== -1 ||
      inventory.indexOf(keyword) !== -1 ||
      type.indexOf(keyword) !== -1
    ) {
      result.push(product);
    }
  }
  if (result.length === 0) {
    document.getElementById("ulPagination").style.display = "none";
  } else {
    document.getElementById("ulPagination").style.display = "flex";
  }
  renderProductList(result);
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

// Sort name up
document.getElementById("sortNameUp").addEventListener("click", () => {
  document.getElementById("sortNameUp").style.display = "none";
  document.getElementById("sortNameDown").style.display = "inline";
  renderProductList(sortProductName(1));
});

// Sort name down
document.getElementById("sortNameDown").addEventListener("click", () => {
  document.getElementById("sortNameDown").style.display = "none";
  document.getElementById("sortNameUp").style.display = "inline";
  renderProductList(sortProductName(-1));
});

// Sort price up
document.getElementById("sortPriceUp").addEventListener("click", () => {
  document.getElementById("sortPriceUp").style.display = "none";
  document.getElementById("sortPriceDown").style.display = "inline";
  renderProductList(sortProductPrice(1));
});

// Sort price down
document.getElementById("sortPriceDown").addEventListener("click", () => {
  document.getElementById("sortPriceDown").style.display = "none";
  document.getElementById("sortPriceUp").style.display = "inline";
  renderProductList(sortProductPrice(-1));
});

// Map Data
mapData = (data) => {
  for (let product of data) {
    const newProduct = new Product(
      product.id,
      product.name,
      product.image,
      product.description,
      product.price,
      product.inventory,
      product.rating,
      product.type,
      product.prefArray
    );
    productList.push(newProduct);
  }
};

// Find Product By ID
findById = (id) => {
  for (let product of productList) {
    if (product.id === id) {
      return product;
    }
  }
};

// Find Position Of Product By ID
findPosition = (id) => {
  for (let i in productList) {
    if (productList[i].id === id) {
      return i;
    }
  }
  return -1;
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

fetchProductList();

// ------------VALIDATION------------
checkRequired = (value, errorId) => {
  if (value) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  }
  document.getElementById(errorId).innerHTML = "*This field is required";
  return false;
};

checkExistsId = (id) => {
  const index = findPosition(id, productList);
  if (index === -1) {
    document.getElementById("idError").innerHTML = "";
    return true;
  }
  document.getElementById("idError").innerHTML = "*ID already exists";
  return false;
};

checkRating = (value, errorId) => {
  if (+value <= 5.0 && +value >= 0.0) {
    return true;
  }
  document.getElementById(errorId).innerHTML =
    "*Invalid Rating! Please enter number in the range 0.0-5.0";
  return false;
};
