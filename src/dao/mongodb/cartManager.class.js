import mongoose from "mongoose";
import cartsModel from "./models/cart.model.js";

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');
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
    async updateProduct(id, updateCart){
        let result = await cartsModel.updateOne({_id : id}, {$set: updateCart});
        return result
    }
    async deleteProduct(id){
        let result = await cartsModel.deleteOne({_id : id});
        return result
    }
}