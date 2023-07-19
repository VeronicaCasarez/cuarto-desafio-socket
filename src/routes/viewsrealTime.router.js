import express from "express";
import { __filename, __dirname } from '../utils.js';
import { obtenerListaDeProductos, guardarProducto } from "../services/productUtils.js";

const realtimeRouter = express.Router();

realtimeRouter.get('/', (req, res) => {
  const products = obtenerListaDeProductos();

  res.render('realtimeproducts', { products });
});


export default realtimeRouter;



