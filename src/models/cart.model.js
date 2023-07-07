import mongoose from "mongoose";


const cartsCollection = 'carts1';

const cartsSchema = mongoose.Schema(
    
    {
        products: Array 
    }
    
	
)


const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;