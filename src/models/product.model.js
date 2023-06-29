import mongoose from "mongoose";


const productsCollection = 'products1';

const productsSchema = mongoose.Schema(
    {
		title: { type: String, index : true },
		description: String,
		code: String,
		price: Number,
		status: { type : Boolean, default : true },
		stock: Number,
		category: Number
	}
)


const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;