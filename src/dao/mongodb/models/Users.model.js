import mongoose from 'mongoose'
import { FechaDeHoy } from '../../../utils.js'

const collection = 'users1'
/*
function FechaDeHoy() {
    const fechaHoy = new Date();
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1; // Los meses se cuentan desde 0, por lo que sumamos 1.
    const año = fechaHoy.getFullYear();
  
    // Formatea la fecha como una cadena "dd/mm/aaaa" (puedes ajustar el formato según tus preferencias).
    const fechaFormateada = `${dia}/${mes}/${año}`;
  
    return fechaFormateada;
}
  
// Llama a la función para obtener la fecha de hoy.
const fechaHoy = FechaDeHoy();
*/

let fechaHoy = FechaDeHoy();

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{type: String, unique: true},
    age: Number,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts1'
    },
    role: { type: String, default: 'user'},
    document: {
        type: [
                {
                    name: String,
                    reference: String
                }
            ]
        },
    last_connection: { type: String, default: fechaHoy }
})

const userModel = mongoose.model(collection, schema)
export default userModel;