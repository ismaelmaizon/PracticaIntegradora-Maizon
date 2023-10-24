import userModel from "./models/Users.model.js";
import { EliminacionUser } from "../../utils.js";

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
    //eliminar un usuario
    async deleteUser(id){
        let result = await userModel.deleteOne({ _id: id })
        return result
    }

    //eliminar usuarios por inactividad
    async deleteInactividad(){
        const fechaHoy = new Date();
        const diaHoy = fechaHoy.getDate();
        const mesHoy = fechaHoy.getMonth() + 1;
        const anoHoy = fechaHoy.getFullYear();
        let response = {};

        let users = await this.getUsers();
        users.map((user)=>{
            const [ dia, mes, ano ] = user.last_connection.split('-')
            console.log(user.last_connection);
            console.log('pasado a int');
            console.log(parseInt(dia));
            console.log(parseInt(mes));
            console.log(parseInt(ano));
            if ( anoHoy != parseInt(ano) ){
                this.deleteUser(user.id)
                let result = EliminacionUser(user.email)
            }else if ( mesHoy != parseInt(mes) ){
                this.deleteUser(user.id)
                let result = EliminacionUser(user.email)
            }else if ( diaHoy - dia > 2 ){
                this.deleteUser(user.id)
                let result = EliminacionUser(user.email)
            }
        })
        response.statusCode = 200;
        response.message = 'usuarios eliminados por inactividad, fueron notificados';
        response.result = users

        return response
        
    }


}