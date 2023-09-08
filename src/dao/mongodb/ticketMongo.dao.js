import mongoose from "mongoose";
import ticketModel from "./models/ticket.model.js";


export default class TicketMananger {

    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');

    // creando ticket
    async addTk(tk){
        let result = await ticketModel.create(tk);
        return result
    }

    async addTk(){
        let result = await ticketModel.find()
        return result
    }
}

