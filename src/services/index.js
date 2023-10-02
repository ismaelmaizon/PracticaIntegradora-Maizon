import CartManager from "../dao/mongodb/cartMongo.dao.js";
import ProductManager from "../dao/mongodb/productMongo.dao.js";


import ProductRepository from "../repository/porductRepository.js";
import CartRepository from "../repository/cartRepository.js";


export const cartServices = new CartRepository(new CartManager());
export const productServices = new ProductRepository(new ProductManager());