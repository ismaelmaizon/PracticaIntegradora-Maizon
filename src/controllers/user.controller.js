import UsersServices from "../services/user.services.js";

export default class UsersController {

    constructor(){
        this.userServices = new UsersServices();
    }
    
    //crear usuario
    async createUser(req){
        let result = this.userServices.createUser(req)
        return result
    };
    //ver usuarios
    async getUsers(){
        let result = this.userServices.getUsers()
        return result
    }
    //ver un usuario
    async getUser(req){
        let result = this.userServices.getUser(req)
        return result
    }
    //actualizar usuario premium
    async updateUser(req){
        let result = this.userServices.updateUser(req)        
        return  result
    }
    //eliminar usuario
    async deleteUser(req){
        let result = this.userServices.deleteUser(req)
        return result
    }
}