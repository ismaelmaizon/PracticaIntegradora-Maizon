import express  from "express";
import mongoose from "mongoose";
import __dirnmae from "./utils.js";

import ProductManager from "./dao/mongodb/productManager.class.js";

import routerProducts from "./router/products.js";
import routerCarts from './router/carts.js';
import viewsRouter from './router/views.js';
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";

import {Server} from 'socket.io';
import messagesModel from "./dao/mongodb/models/messages.model.js.js";


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));



// config de platillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)



const httpServer = app.listen( 8080, () => {console.log('servidor escuchando');})


const io = new Server (httpServer)

const mensajes = []


io.on('connection', async (socket) => {
    console.log('conectado: ' + socket.id);
    

    socket.on('message', async(data) => {
        mensajes.push(data);

        const environment = async ()=>{

            //console.log(productsRes); 
            await mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority')
            //products.push(productsRes)
            //console.log('***************************************************************');
            //console.log(products);
            //await messagesModel.insertMany(mensajes)
            //let response = await messagesModel.find()
            //let response1 = await productsModel.find().explain('executionStats')//first query
            //let response = await userModel.find({first_name: 'Celia'}).explain('executionStats')//first query
            //console.log(response);
            //console.log(response1);
            console.log('listo')
         
        }
        
        environment()
        console.log(data);
        console.log(mensajes);
        //await messagesModel.insertMany(mensaje)


        io.emit( 'imprimir', mensajes );

    })

    // ingreso nuevo usuario
    socket.on('authenticatedUser', (data) => { 
        console.log('se conecto:' + data);
        socket.broadcast.emit( 'ingreso', data);

    })

})