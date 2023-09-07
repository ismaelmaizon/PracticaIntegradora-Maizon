import mongoose from "mongoose";
import productsModel from "./models/product.model.js";

export default class ProductManager {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');

    // añadir producto
    async addProduct(product){
        console.log(product);
        let result = await productsModel.create(product);
        return result
    }

    // ver productos
    async getProduct(limit = 10, page = 1, sort = 0, filtro = null, filValor = null){
        let whereOption = {}
        // por si no tiene filtrado
        if( filtro != '' && filValor != '' ){
            whereOption = {[filtro] : filValor }
        }

        let result = await productsModel.paginate(
            whereOption, 
            {limit: limit, page: page, sort: {price: sort}})
        return result
    }

    // ver un producto
    async getProductById(id){
        let result = await productsModel.findOne({_id : id});
        return result
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


