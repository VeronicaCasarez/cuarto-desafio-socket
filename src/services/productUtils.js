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
export function eliminarProducto (id) {
  const filePath = path.join(__dirname, './products.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(fileContent)

  const index = data.findIndex(product => product.id === id)
  data.splice(index, 1)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}



