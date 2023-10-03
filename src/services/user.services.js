import UserDao from "../dao/mongodb/userMongo.dao.js"

export default class UsersServices {

    constructor(){
        this.userDao = new UserDao();
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