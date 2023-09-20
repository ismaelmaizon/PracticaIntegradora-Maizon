import mongoose from "mongoose";
import cartsModel from "./models/cart.model.js";
import ProductManager from "./productMongo.dao.js";
import TicketMananger from "./ticketMongo.dao.js";

function generarCodigoNumerico() {
    const longitud = 6; // Número de dígitos en el código
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
      const digito = Math.floor(Math.random() * 10); // Genera un número aleatorio entre 0 y 9
    codigo += digito;
    }
    return codigo;
}



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
        let id = req.params.pid
        try{
            const product = await this.productManager.getProductById(id);
            const cart = await this.getCartById(req);
            console.log(product.product);
            console.log(cart.cart);
            let productos = cart.cart.products
            console.log(productos.length);
            let exist = false;
            
            if (productos.length === 0) {
                console.log('primer if');
                cart.cart.products.push({ product: product.product});
                cart.cart.save();
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
            //console.error(err); // Imprime el error en la consola para depuración
            response.statusCode = 500
            response.message = 'internal server error'
            response.error = err
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
    async deleteProductFromCart(req, idProduct){
        try{
            const cart = await this.getCartById(req); // el req contiene el id del cart
            if(!cart){
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Cart not found", // un mensaje de error apropiado
                    cart: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                }; 
            }
            cart.products.pull(idProduct);
            await cart.save();
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Cart found", // un mensaje de éxito apropiado
                cart: cart, // el carrito encontrado
            };
        }catch(error){
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }
    
    // eliminar todos los productos del carrito
    async deleteAllProductsFromCart(req){
        console.log(req.params.cid);
        try{
            const cart = await this.getCartById(req);
            if(!cart){
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Cart not found", // un mensaje de error apropiado
                    cart: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                }; 
            }
            console.log(cart);
            cart.cart.products = [];
            await cart.cart.save();
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Cart found", // un mensaje de éxito apropiado
                cart: cart, // el carrito encontrado
            };
        }catch(error){
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }


    // finalizar el proceso de compra
    async weekendShopping(req, res){
        let amount = 0
        const user = req.user
        try{
            const cart = await this.getCartById(req)
            if(!cart){
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Cart not found", // un mensaje de error apropiado
                    cart: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                }; 
            }
            cart.cart.products.map( async (c) =>{
                let stock = c.product.stock
                let idProd = c.id            
                if (stock < c.quiantity){
                    await this.deleteProductFromCart(req, idProd)
                }else{
                    amount = amount + (c.product.price * c.quiantity)
                    let prod = await this.productManager.getProductById(c.product.id);
                    let newStock = prod.product.stock - c.quiantity
                    prod.product = {
                        "title" : prod.product.title,
                        "description": prod.product.description,
                        "code": prod.product.code,
                        "price": prod.product.price,
                        "status": prod.product.status,
                        "stock": newStock,
                        "category": prod.product.category
                    }
                    await this.productManager.updateProduct(c.product.id, prod.product);
                    
                    console.log(prod.product);
                }
            })
            await cart.cart.save();
            const data = new Date().toLocaleTimeString();
            console.log(cart.cart.products);
            console.log(data);
            console.log(amount);
            const codigoAleatorio = generarCodigoNumerico();
            const ticket = {
                "code": codigoAleatorio,
                "fecha": data,
                "products": cart.cart.products,
                "amount": amount,
                "purchaser": user.email
            }
            console.log(ticket);
            
            let tk = await this.ticketMananger.addTk(ticket);
            await this.deleteAllProductsFromCart(req); // luego de crear el TK se procede a eliminar los productos del carrito para que este quede liberado
            return tk;
        }catch(error){
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }
}

