import UsersServices from "../services/user.services";

export default class UsersController {

    constructor(){
        this.userServices = new UsersServices();
    }
    
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
    //ver usuario
    async getUsers(id){
        let result = await userModel.findOne({ _id: id })
        return result
    }
    //actualizar usuario
    async updateUser(id, user){
        let result = await userModel.updateOne({ _id: id}, {$set: user})
        return  result
    }
    //eliminar usuario
    async deleteUser(id){
        let result = await userModel.deleteOne({ _id: id })
        return result
    }
}