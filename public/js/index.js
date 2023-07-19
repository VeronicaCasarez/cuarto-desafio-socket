const socket = io();

socket.on('connection', () => {
  console.log('Cliente conectado');

  // Enviar un mensaje al servidor
  socket.emit('mensaje', 'nuevo cliente conectado');
});


document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
 
  const productName = document.getElementById("productName").value;
  const productTitle = document.getElementById("productTitle").value;
  const productDescription = document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").value;
  const productCode = document.getElementById("productCode").value;
  const productStock = document.getElementById("productStock").value;
  const productThumbnail = document.getElementById("productThumbnail").value;

  console.log(
    "Nuevo producto agregado:",
    productName,
    productTitle,
    productDescription,
    productPrice,
    productCode,
    productStock,    
    productThumbnail
  );

   // Enviar el producto al servidor a través del socket
   socket.emit("agregarProducto", {
    name: productName,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    code:productCode,
    stock:productStock,
    thumbnail: productThumbnail,
  });

  // Limpiar el campo del formulario
  document.getElementById("productName").value = "";
  document.getElementById("productTitle").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productCode").value = "";
  document.getElementById("productStock").value = "";
  document.getElementById("productThumbnail").value = "";

  location.reload();
});
// Obtener la lista de productos inicial desde el servidor
socket.on("initialProductList", (productList) => {
  updateProductList(productList);
});



// Actualizar la lista de productos
function updateProductList(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Título: ${product.title}</p>
      <p>Descripción: ${product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Código: ${product.code}</p>
      <p>Stock: ${product.stock}</p>
      <p>Thumbnail: ${product.thumbnail}</p>
      <button type="button" class="btnEliminar" data-code="${product.code}">Eliminar Producto</button>
    `;

    

   productList.appendChild(div);
 });

//Agregar el evento de click al botón de eliminación
let btnEliminar = document.querySelectorAll(".btnEliminar");
btnEliminar.addEventListener("click", (event) => {
  const productCode = event.target.getAttribute("data-code");
  console.log(productCode)
  eliminarProducto(productCode);
});
}

function eliminarProducto(productCode) {

 socket.emit("eliminarProducto", +productCode);
}


