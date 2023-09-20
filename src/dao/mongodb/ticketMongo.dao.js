import mongoose from "mongoose";
import ticketModel from "./models/ticket.model.js";


export default class TicketMananger {

    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');

    // creando ticket
    async addTk(tk){
        try{
            let result = await ticketModel.create(tk);
            if(!result){
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "problema al crear TK", // un mensaje de error apropiado
                    result: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            return {
                statusCode: 200, // o el código de estado que desees para "no encontrado"
                message: "se creo TK", // un mensaje de error apropiado
                result: result, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
            };
        }catch(error){
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
        
    }
}

