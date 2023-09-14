import mongoose from "mongoose";
import productsModel from "./models/product.model.js";

export default class ProductManager {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');

    // ver productos
    async getProduct(limit = 10, page = 1, sort = 0, filtro = null, filValor = null){
        let whereOption = {}
        // por si no tiene filtrado
        if( filtro != '' && filValor != '' ){
            whereOption = {[filtro] : filValor }
        }
        try{
            let result = await productsModel.paginate(
                whereOption, 
                {limit: limit, page: page, sort: {price: sort}})
            if (!result){
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Products not found", // un mensaje de error apropiado
                    result: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Products found", // un mensaje de éxito apropiado
                product: result, // el carrito encontrado
            };
        }catch(error){
            console.log(error);
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }

    // ver un producto
    async getProductById(req){
        let id = req.params.pid
        try{
            let result = await productsModel.findOne({_id : id});
            if (!result){
                //req.logger.info(`${req.method} en api/products${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Product not found", // un mensaje de error apropiado
                    result: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            //req.logger.debug(`${req.method} en api/products${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Cart found", // un mensaje de éxito apropiado
                product: result, // el carrito encontrado
            };
        }catch(error){
            console.log(error);
            //req.logger.error(`${req.method} en api/products${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }

    // añadir producto
    async addProduct(product){
        console.log(product);
        let response = {}
        try{
            let result = await productsModel.create(product);
            response.statusCode = 200;
            response.message = 'objeto credo';
            response.result = result
            return response
        }catch(error){
            console.log(error);
        } 
    }


    // actualizar producto
    async updateProduct(id, updateProduct){
        console.log(updateProduct);
        let result = await productsModel.updateOne({_id : id}, {$set: updateProduct});
        return result
    }

    // eliminar producto
    async deleteProduct(id){
        let result = await productsModel.deleteOne({_id : id});
        return result
    }
}


