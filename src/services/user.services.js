import UserDao from "../dao/mongodb/userMongo.dao.js"

export default class UsersServices {

    constructor(){
        this.userDao = new UserDao();
    }
    
    //crear usuario
    async createUser(req){
        let result = this.userDao.createUser(user);
        return result
    };
    //ver usuarios
    async getUsers(){
        let result = this.userDao.getUsers();
        return result
    }
    //ver usuario
    async getUser(req){
        const id = req.params.uid
        let result = this.userDao.getUser()
        return result
    }
    //actualizar usuario premium
    async updateUser(req){
        const id = req.params.uid
        console.log(id);
        const user = await this.userDao.getUser(id)
        console.log(user);
        if ( user.role === 'user'){
            user.role = 'premium'
        }
        let result = this.userDao.updateUser(id, user)
        return  result
    }
    //eliminar usuario
    async deleteUser(req){
        const id = req.params.uid
        let result = this.userDao.deleteUser(id)
        return result
    }
}