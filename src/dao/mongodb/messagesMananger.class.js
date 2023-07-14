import mongoose from "mongoose";
import messagesModel from "./models/messages.model.js";




export default class MessagesMananger {
    connection = mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority');

    async addmessage(message) {
        try {
          console.log(message);
          let message1 = {
            'user' : message.user,
            'message' : message.message
          }
          let result = await messagesModel.create(message1);
          return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

}