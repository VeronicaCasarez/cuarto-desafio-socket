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





