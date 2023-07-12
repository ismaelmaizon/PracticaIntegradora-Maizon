import mongoose from "mongoose";


const cartsCollection = 'carts1';

const cartsSchema = mongoose.Schema(
    
    {
        products: {
            type: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                    },
                    quiantity: { type: Number, default: 1}
                },
            ],
        },
    }
    
)


const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;


/*
products: {
    type: [
        {
            product: {
                type: mongoose.SchemaTypes.Types.ObjectId,
                ref: "products"
            },
        },
    ],
},
*/