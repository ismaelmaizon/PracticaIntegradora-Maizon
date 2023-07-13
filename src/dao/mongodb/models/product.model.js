import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;