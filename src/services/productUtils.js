import fs from 'fs';
import path from 'path';
import { __dirname } from '../utils.js';

export function obtenerListaDeProductos() {
  const filePath = path.join(__dirname, './products.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  return data;
}

export function guardarProducto({id,name,title,description,price,code,stock,thumbnail}){ 
  const filePath = path.join(__dirname, './products.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  data.push({
    id:id,
    name: name,
    title: title,
    description: description,
    price: price,   
    code:code,
    stock:stock,   
    thumbnail: thumbnail,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}


// Función para eliminar un producto 
export function eliminarProducto(id) {
  console.log('Eliminar producto con ID:', id); // Verifica que el ID se haya recibido correctamente

  const filePath = path.join(__dirname, './products.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  // Buscar el índice del producto en el array por su ID
  const productoIndex = data.findIndex(product => product.id === id);

  if (productoIndex !== -1) {
    data.splice(productoIndex, 1); // Elimina el producto del array usando el índice
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Producto eliminado correctamente.');
  } else {
    console.log('Producto no encontrado en el array.');
  }
}
