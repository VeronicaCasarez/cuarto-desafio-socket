const socket = io();

socket.on('connection', () => {
  console.log('Cliente conectado');

  // Enviar un mensaje al servidor
  socket.emit('mensaje', 'nuevo cliente conectado');
});


document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const productName = document.getElementById('productName').value;

  // Enviar el producto al servidor a través del socket
  socket.emit('agregarProducto', { name: productName });

  // Limpiar el campo del formulario
  document.getElementById('productName').value = '';
});

socket.on('nuevoProducto', (data) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  data.products.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = product.name;
    productList.appendChild(li);
  });
});



