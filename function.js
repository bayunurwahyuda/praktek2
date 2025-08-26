let autoincrement = 1;
let productArray = [];
let editingindex = null;//untuk menyimpen index yang sedang di edit
const productTable = document.getElementById("productTable");

document.getElementById("kodeproduk").value = "MD-0" + autoincrement;

function saveFrom() {
  const kodeproduk = "MD-0" + autoincrement++;
  const nameProduk = document.getElementById("nameProduk").value;
  const harga = document.getElementById("itemPrice").value;
  const packaging = document.getElementById("itemPackaging").value;
  const itemCategory = document.getElementById("itemCategory").value;
  const itemImageUrl = document.getElementById("itemImageUrl").value;
  const stokawal = document.getElementById("stokawal").value;

  productArray.push({
    kodeproduk,
    nameProduk,
    harga,
    packaging,
    itemCategory,
    itemImageUrl,
    stokawal: Number(stokawal),
  });

  renderTable();
  document.getElementById("kodeproduk").value = "MD-0" + autoincrement;
}

function renderTable() {
  const tablebody = productTable.getElementsByTagName("tbody")[0];
  let rownumber = 1;
  tablebody.innerHTML = "";

  productArray.forEach((product) => {
    const row = tablebody.insertRow();
    row.innerHTML = `
      <tr id="${product.kodeproduk}">
        <td>${rownumber++}</td>
        <td>${product.kodeproduk}</td>
        <td>${product.nameProduk}</td>
        <td>${product.harga}</td>
        <td>${product.packaging}</td>
        <td>${product.itemCategory}</td>
        <td><img src="${product.itemImageUrl}" alt="Product Image" style="width: 100px; height: auto;"></td>
        <td>${product.stokawal}</td>
        <td>
          <button class="edit" onclick="editProduct('${product.kodeproduk}')">Edit</button>
          <button class="delete" onclick="deleteProduct('${product.kodeproduk}')">Delete</button>
        </td>
      </tr>
    `;

    tablebody.appendChild(row);

    if (product.stokawal < 5) {
      row.cells[7].classList.add("low-stock");
    }
  });
}

function deleteProduct(kodeproduk) {
  if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    productArray = productArray.filter(
      (product) => product.kodeproduk !== kodeproduk
    );
    renderTable();
  }
}

function editProduct(kodeproduk) {
  const product = productArray.find((product) => product.kodeproduk === kodeproduk);

  if (product) {
    const newNama = prompt("Masukkan nama produk baru:", product.nameProduk || "");
    const newHarga = prompt("Masukkan harga produk baru:", product.harga || "");

    if (newNama !== null) product.nameProduk = newNama;
    if (newHarga !== null) product.harga = parseFloat(newHarga);

    renderTable();
  } else {
    alert("Produk tidak ditemukan!");
  }
}

const inputImageUrl = document.getElementById("itemImageUrl");
const displayImage = document.getElementById("displayImage");

inputImageUrl.addEventListener("input", function () {
  const url = inputImageUrl.value;

  if (url && (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png") || url.endsWith(".gif"))) {
    displayImage.src = url;
    displayImage.style.display = "block";
  } else {
    displayImage.style.display = "none";
  }
});
