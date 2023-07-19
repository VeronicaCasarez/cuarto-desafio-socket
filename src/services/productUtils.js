import fs from 'fs';
import path from 'path';
import { __dirname } from '../utils.js';

export function obtenerListaDeProductos() {
  const filePath = path.join(__dirname, './products.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  return data;
}

export function guardarProducto({name,title,description,price,code,stock,thumbnail}){ 
  const filePath = path.join(__dirname, './products.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  data.push({
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


// Función para eliminar un producto por su código y retornar el array actualizado de productos
export function eliminarProducto(productCode) {
  let data = getProductsFromFile();

  // Filtrar los productos excluyendo el que tiene el código a eliminar
  data = data.filter((product) => product.code !== productCode);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

  // Retornar el array actualizado de productos
  return data;
}




