import mongoose from "mongoose";
import productsModel from "./models/product.model.js";

export default class ProductManager {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');
    async addProduct(product){
        let result = await productsModel.create(product);
        return result
    }
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
    async getProductById(id){
        let result = await productsModel.findOne({_id : id});
        return result
    }
    async updateProduct(id, updateProduct){
        let result = await productsModel.updateOne({_id : id}, {$set: updateProduct});
        return result
    }
    async deleteProduct(id){
        let result = await productsModel.deleteOne({_id : id});
        return result
    }
}


