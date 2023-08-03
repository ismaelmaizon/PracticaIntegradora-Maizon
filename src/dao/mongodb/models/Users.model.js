import mongoose from 'mongoose'

const collection = 'users1'

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{type: String, unique: true},
    age: Number,
    password: String,
    rol: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts1'
    },
    role: { type: String, default: 'user'}
})

const userModel = mongoose.model(collection, schema)
export default userModel;