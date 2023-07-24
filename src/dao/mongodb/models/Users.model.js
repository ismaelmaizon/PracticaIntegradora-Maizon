import mongoose from 'mongoose'

const collection = 'users1'

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age: Number,
    password: String,
    rol: String
})

const userModel = mongoose.model(collection, schema)
export default userModel;