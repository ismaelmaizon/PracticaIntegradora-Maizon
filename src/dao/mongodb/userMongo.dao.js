import userModel from "./models/Users.model.js";

export default class UsersManager {
    
    //crear usuario
    async createUser(user){
        let result = await userModel.create(user)
        return result
    };
    //ver usuarios
    async getUsers(){
        let result = await userModel.find()
        return result
    }
    //ver un usuario
    async getUser(id){
        let result = await userModel.findOne({ _id: id })
        return result
    }

    // agregar document
    async postDocumento(id, user){
        let result = await userModel.updateOne({ _id: id}, {$set: user})
        return result
    }


    //actualizar usuario
    async updateUser(id, user){
        try{
            let result = await userModel.updateOne({ _id: id}, {$set: user})
            return  {
                statusCode: 200,
                message: 'usuario paso a premium',
                response: result
            }

        }catch(error){}       
    }
    //eliminar usuario
    async deleteUser(id){
        let result = await userModel.deleteOne({ _id: id })
        return result
    }



}