import mongoose from "mongoose";


const messagesCollection = 'messages1';

const messagesSchema = mongoose.Schema(
    {
        messages : Array
    }
)


const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;