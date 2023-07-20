const socket = io();

socket.on('connection', () => {
  console.log('Cliente conectado');

  // Enviar un mensaje al servidor
  socket.emit('mensaje', 'nuevo cliente conectado');
});


document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();


  const productId = document.getElementById("productId").value;
  const productName = document.getElementById("productName").value;
  const productTitle = document.getElementById("productTitle").value;
  const productDescription = document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").value;
  const productCode = document.getElementById("productCode").value;
  const productStock = document.getElementById("productStock").value;
  const productThumbnail = document.getElementById("productThumbnail").value;


  console.log(
    "Nuevo producto agregado:",
    productId,
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
    id:productId,
    name: productName,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    code:productCode,
    stock:productStock,
    thumbnail: productThumbnail,
  });

  // Limpiar el campo del formulario
  document.getElementById("productId").value = "";
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
      <p>Id: ${product.id}</p>
      <p>Título: ${product.title}</p>
      <p>Descripción: ${product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Código: ${product.code}</p>
      <p>Stock: ${product.stock}</p>
      <p>Thumbnail: ${product.thumbnail}</p>
      <button type="button" class="btnEliminar" data-id="${product.id}">Eliminar Producto</button>
    `;


   productList.appendChild(div);


 });


}


const deleteButton = document.querySelectorAll(".btnEliminar")
deleteButton.forEach(button => {
    button.addEventListener("click", () => {
        const id = parseInt(button.id)
        const productId = {
            id: id
        }
        //envio el socket para recibirlo en el servidor
        socket.emit('eliminarProducto', productId)
        //fuerzo el refresh para que se actualice la lista. 
        location.reload()
    })
})






