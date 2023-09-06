import mongoose from "mongoose";
import cartsModel from "./models/cart.model.js";
import ProductManager from "./productMongo.dao.js";
import TicketModel from "./models/ticket.model.js";

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');
    
    productManager = new ProductManager;
    
    // creando carrito
    async addCart(cart){
        let result = await cartsModel.create(cart);
        return result
    }
    async getCarts(){
        let result = await cartsModel.find();
        return result
    }
    //ver un carrito
    async getCartById(id){
        let result = await cartsModel.findOne({_id : id}).populate('products.product'); ;
        return result
    }
    //solo para usar al agregar al carrito   
    /*
    async getCartById(id){
        let result = await cartsModel.findOne({_id : id}).populate('products.product'); ;
        return result
    }    */

    // agregar un producto al carrito
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
                console.log(product.product._id);
                if (product.product._id == pid) {
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

        }
        return;
    }

    // actualizar carrito
    async updateCart(cid, products){
        const cart = await this.getCartById(cid);
        console.log(cart);
        cart.products = products;
        await cart.save();
        return;
    }

    // actualizar cantidad de producto en el carrito
    async updateQuantityProduct(cid, pid, quantity){
        const cart = await this.getCartById(cid);
        console.log(quantity);
        let exist = false;
        cart.products.map((product) => {

            if (product.product._id == pid) {
                product.quiantity = quantity; 
                console.log(product.quiantity);
                exist = true;
            }

        })
        if (exist) {
            await cartsModel.updateOne( {_id : cid}, {$set: { products : cart.products }} )
        }


        return;
    }

    // eliminar un producto del carrito
    async deleteProductFromCart(cid, pid){
        const cart = await this.getCartById(cid);
        console.log(cid);
        console.log(pid);
        cart.products.pull(pid);
        await cart.save();
        return;
    }
    // eliminar todos los productos del carrito
    async deleteAllProductsFromCart(cid){
        const cart = await this.getCartById(cid);
        console.log(cid);
        cart.products = [];
        await cart.save();
        return;
    }


    // finalizar el proceso de compra
    async weekendShopping(req, res){
        const user = req.user
        const idCart = req.params.cid
        const cart = await this.getCartById(idCart)
        console.log('weekendShopping');
        console.log(cart.products);
        console.log(user);
    }
}

