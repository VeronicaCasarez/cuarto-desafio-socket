import express from "express";
import { __filename, __dirname } from '../utils.js';
import { obtenerListaDeProductos } from '../services/productUtils.js';

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    const products = obtenerListaDeProductos();

    res.render('home', { products });
  });

export default productsRouter;
