import express from 'express';
import { createProduct, deleteProduct, getProducts } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.get('/', getProducts)
productRouter.post('/', createProduct);
productRouter.delete('/:productID', deleteProduct);

export default productRouter;