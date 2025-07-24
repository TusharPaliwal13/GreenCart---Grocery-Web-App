import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct } from '../controllers/productController.js'; // or wherever your addProduct is defined


const sellerRouter = express.Router();

sellerRouter.post('/login' , sellerLogin);
sellerRouter.get('/is-auth', authSeller , isSellerAuth); 
sellerRouter.get('/logout', sellerLogout);


export default sellerRouter;