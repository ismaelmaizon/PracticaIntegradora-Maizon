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
        let result = await cartsModel.findOne({_id : id});
        return result
    }
    async updateProductToCart(cid, product){
        let result = await cartsModel.updateOne({_id : cid}, {$set : {
        'product': product }
        })
        return;
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
        }else{
            console.log('else');
            productos.map((pr) => {
                console.log(pr.product);
                if (pr.product == pid) {
                    console.log('elif');
                    console.log(pr.quantity);
                    console.log(pr.quiantity);
                    console.log(pr);
                    pr.quantity++;
                    pr.quiantity++;
                    exist = true;
                    this.updateProductToCart(cid, pr.product);
                }
            })
            console.log(!!exist);
            if (!exist) {
                console.log('segundo if');
                cart.products.push({ product: product});
            }
        }

        //cart.save();
        
        return;
    }
    /*
    async deleteProduct(id){
        let result = await cartsModel.deleteOne({_id : id});
        return result
    }*/
}