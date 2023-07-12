import mongoose from "mongoose";
import cartsModel from "./models/cart.model.js";
import ProductManager from "./productManager.class.js";

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');
    
    productManager = new ProductManager;
    
    async addCart(cart){
        let result = await cartsModel.create(cart);
        return result
    }
    async getCarts(){
        let result = await cartsModel.find();
        return result
    }
    async getCartById(id){
        let result = await cartsModel.findOne({_id : id}).populate('products.product'); ;
        return result
    }    
    async addProductToCart(cid, pid){
        const product = await this.productManager.getProductById(pid);
        const cart = await this.getCartById(cid);
        console.log(cart.products);
        let productos = cart.products
        console.log(productos.length);
        let exist = false;
        
        if (productos.length === 0) {
            console.log('primer if');
            cart.products.push({ product: product});
            cart.save();
        }else{
            
            console.log('else');
            cart.products.map((product) => {
                if (product.product == pid) {
                    product.quiantity++; 
                    console.log(product.quiantity);
                    exist = true;
                }
            })

            if (exist) {
                await cartsModel.updateOne( {_id : cid}, {$set: { products : cart.products }} )
            }else{
                cart.products.push({ product: product});
                cart.save();
            }

        return;
    }
    }
    /*
    async deleteProduct(id){
        let result = await cartsModel.deleteOne({_id : id});
        return result
    }*/
}

