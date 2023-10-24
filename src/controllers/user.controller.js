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

    // agregar document
    async postDocumento(req){
        console.log(req.file);
        if(req.file.originalname == 'autorizacion.jpg' || req.file.originalname == 'autorizacion.pdf'){
            req.file.fieldname = 'autorizacion'
        }else if (req.file.originalname == 'domicilio.jpg' || req.file.originalname == 'domicilio.pdf') {
                req.file.fieldname = 'domicilio'
        }else if (req.file.originalname == 'estadocuenta.jpg' || req.file.originalname == 'estadocuenta.pdf'){
                req.file.fieldname = 'estadocuenta'
        }else{
            return { status: 400, message: 'documentacion mal cargada' }
        }
        let result = this.userServices.postDocumento(req)
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
    //eliminar usuarios por inactividad
    async deleteInactividad(){
        let result = this.userServices.deleteInactividad()
        return result
    }
}