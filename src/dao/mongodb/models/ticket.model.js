import mongoose from "mongoose";



const ticketCollection = 'ticket1'

const data = new Date()

const ticketSchema = mongoose.Schema(
    {   
        code: String,
        fecha: { type: Array, data},
        products: {
                    type: [
                            {
                                product: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "products1",
                                }
                            }
                        ]
                    },
        amount: Number,
        purchaser: String
    }
)


const ticketModel = mongoose.model( ticketCollection, ticketSchema)


export default ticketModel;



