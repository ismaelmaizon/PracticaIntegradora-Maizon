import mongoose from "mongoose";


const messagesCollection = 'messages1';

const messagesSchema = mongoose.Schema(
    {
        messages :{ type : [{
            users : String,
            message : String
        }]}
    }
)


const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;