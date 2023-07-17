import express from "express";

import { __filename, __dirname } from '../utils.js';
import { obtenerListaDeProductos, guardarProducto } from "../services/productUtils.js";

const realtimeRouter = express.Router();

realtimeRouter.get('/realtimeproducts', (req, res) => {
  const products = obtenerListaDeProductos();

  res.render('realtimeproducts', { products });
});

realtimeRouter.post('/realtimeproducts', (req, res) => {
  const name  = req.body.name;
 
  // Guardar el producto en el JSON
  guardarProducto({ name });

  // Obtener la lista actualizada de productos
  const products = obtenerListaDeProductos();

  // Emitir el evento a través del socket
  //socket.emit('nuevoProducto', { products });

  // Renderizar la vista con los productos actualizados
  res.render('realtimeproducts', { products });
});

export default realtimeRouter;



