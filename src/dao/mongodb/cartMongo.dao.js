import mongoose from "mongoose";
import cartsModel from "./models/cart.model.js";
import ProductManager from "./productMongo.dao.js";
import TicketMananger from "./ticketMongo.dao.js";

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');
    
    productManager = new ProductManager;
    ticketMananger = new TicketMananger;
    
    // creando carrito
    async addCart(cart){
        let result = await cartsModel.create(cart);
        return result
    }
    //ver todos los carrito
    async getCarts(){
        let result = await cartsModel.find();
        return result
    }
    //ver un carrito
    async getCartById(req){
        const cid = req.params.cid
        try {
            const cart = await cartsModel.findOne({ _id: cid }).populate('products.product');
            if (!cart) {
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Cart not found", // un mensaje de error apropiado
                    cart: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Cart found", // un mensaje de éxito apropiado
                cart: cart, // el carrito encontrado
            };
        } catch (error) {
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }

    // agregar un producto al carrito
    async addProductToCart(req){
        let response = {}
        try{
            const product = await this.productManager.getProductById(req);
            const cart = await this.getCartById(req);
            console.log(product.product);
            console.log(cart.cart);
            let productos = cart.cart.products
            console.log(productos.length);
            let exist = false;
        
            if (productos.length === 0) {
                console.log('primer if');
                cart.products.push({ product: product});
                cart.save();
            }else{
                console.log('else');
                cart.cart.products.map((product) => {
                    console.log(product.product._id);
                    if (product.product._id == req.params.pid) {
                        product.quiantity++; 
                        console.log(product.quiantity);
                        exist = true;
                    }
                })
                if (exist) {
                    console.log(cart.cart.products);
                    await cartsModel.updateOne( {_id : req.params.cid}, {$set: { products : cart.products }} )
                    cart.cart.save()
                }else{
                    cart.cart.products.push({ product: product.product});
                    cart.cart.save();
                }
                
            }
            response.statusCode = 200
            response.message = 'producto agregado'
            return response;
        }catch (err) {
            console.error(err); // Imprime el error en la consola para depuración
            response.statusCode = 500
            response.message = 'internal server error'
        }
    }
    
    // actualizar carrito
    async updateCart(req){
        const products = req.body
        try {
            const cart = await cartsModel.findOne({ _id: req.params.cid }).populate('products.product');
            if (!cart) {
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Cart not found", // un mensaje de error apropiado
                    cart: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            cart.products = products;
            console.log(cart);
            await cart.save();
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Cart actualizado", // un mensaje de éxito apropiado
                cart: cart, // el carrito encontrado
            };
        } catch (error) {
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }
    
    // actualizar cantidad de producto en el carrito
    async updateQuantityProduct(req){
        const quantity = req.body
        console.log(quantity.quantity);
        let exist = false;
        try{
            const cart = await this.getCartById(req);
            if (!cart) {
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Cart not found", // un mensaje de error apropiado
                    cart: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            cart.cart.products.map((product) => {
                if (product.product._id == req.params.pid) {
                    product.quiantity = quantity.quantity; 
                    console.log(product.quiantity);
                    exist = true;
                }
            })
            if (exist) {
                await cartsModel.updateOne( {_id : req.params.cid}, {$set: { products : cart.cart.products }} )
                cart.cart.save()
                return {
                    statusCode: 200, // o el código de estado que desees para "éxito"
                    message: "Cart actualizado", // un mensaje de éxito apropiado
                    cart: cart, // el carrito encontrado
                };
            }

        }catch(error){
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }}

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
        let amount = 0
        const user = req.user
        const idCart = req.params.cid
        const cart = await this.getCartById(idCart)  
        /*      
        console.log('weekendShopping');
        console.log(cart.products);
        console.log(user);*/
        cart.products.map( async (c) =>{
            let stock = c.product.stock
            let idProd = c.id            
            if (stock < c.quiantity){
                await this.deleteProductFromCart(idCart, idProd)
                
            }else{
                amount = amount + (c.product.price * c.quiantity)
                let prod = await this.productManager.getProductById(c.product.id);
                /*
                console.log('product');
                console.log(prod.title);
                console.log(prod.stock);*/
                let newStock = prod.stock - c.quiantity
                /*
                console.log('newstock');
                console.log(newStock);
                */
                prod = {
                    "title" : prod.title,
                    "description": prod.description,
                    "code": prod.code,
                    "price": prod.price,
                    "status": prod.status,
                    "stock": newStock,
                    "category": prod.category
                }
                await this.productManager.updateProduct(c.product.id, prod);
                
            }
        })
        await cart.save();
        const data = new Date().toLocaleTimeString
        /*
        console.log(cart);
        console.log(data);
        */
       console.log(amount);
        const ticket = {
            "code": '000000012',
            "fecha": data,
            "products": cart.products,
            "amount": amount,
            "purchaser": user.email
        }

        await this.ticketMananger.addTk(ticket);
        await this.deleteAllProductsFromCart(idCart); // luego de crear el TK se procede a eliminar los productos del carrito para que este quede liberado

    }
}

