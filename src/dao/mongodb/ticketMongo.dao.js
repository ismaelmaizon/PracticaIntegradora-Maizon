import mongoose from "mongoose";
import CartController from "../../controllers/carts.controller.js";

export default class TicketMananger {

    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');

    cartController = new CartController;

    async createTicket(cart){
    
        }
    }

