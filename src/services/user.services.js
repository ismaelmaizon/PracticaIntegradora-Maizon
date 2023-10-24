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
    //ver un usuario
    async getUser(req){
        const id = req.params.uid
        let result = this.userDao.getUser(id)
        return result
    }

    // agregar document
    async postDocumento(req){
        const doc = [] 
        const id = req.params.uid
        console.log(id);
        const user = await this.userDao.getUser(id)
        console.log(user);
        const file = req.file
        const objet = { name: file.fieldname, reference: file.path }
        user.document.push(objet)
        let result = this.userDao.postDocumento(id, user)
        return result
    }

    //actualizar usuario premium
    async updateUser(req){
        const id = req.params.uid
        let documentacionCargada = false
        console.log(id);
        const user = await this.userDao.getUser(id)
        const autorizacion = user.document.find( e => e.name == 'autorizacion' )
        const domicilio = user.document.find( e => e.name == 'domicilio' )
        const estadocuenta = user.document.find( e => e.name == 'estadocuenta' )
        if( autorizacion && domicilio && estadocuenta ) {
            documentacionCargada = true
        }
        console.log(user);
        console.log(documentacionCargada);
        if ( documentacionCargada ){
            user.role = 'premium'
        }else{
            return { statusCode: 401, messages: 'el usuario no ha terminado de cargar su documentacion' }
        }
        let result = this.userDao.updateUser(id, user)
        return result
    }
    //eliminar usuario
    async deleteUser(req){
        const id = req.params.uid
        let result = this.userDao.deleteUser(id)
        return result
    }

    //eliminar usuarios por inactividad
    async deleteInactividad(){
        let result = this.userDao.deleteInactividad()
        return result
    }
}