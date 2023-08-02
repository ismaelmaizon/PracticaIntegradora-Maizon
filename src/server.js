import express  from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import __dirnmae from "./utils.js";


import ProductManager from "./dao/mongodb/productManager.class.js";
import MessagesMananger from "./dao/mongodb/messagesMananger.class.js";


import routerProducts from "./router/products.router.js";
import routerCarts from './router/carts.router.js';
import viewsRouter from './router/views.router.js';
import sessionRouter from "./router/session.router.js";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";

import {Server} from 'socket.io';
//import messagesModel from "./dao/mongodb/models/messages.model.js.js";




import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassportJWT } from "./config/jwt.passport.js";
import { initializePassportLocal } from "./config/local.passport.js";




const app = express();
const connection = mongoose.connect(
    "mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority",
);



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));


app.use(cookieParser());
initializePassportJWT();
initializePassportLocal();
app.use(passport.initialize())


app.use(
    session({
      store: new MongoStore({
        mongoUrl:
          "mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority",
      }),
      secret: "mongoSecret",
      resave: true,
      saveUninitialized: false,
    })
);

// config de platillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


// rutas
app.use('/', viewsRouter);
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', sessionRouter)


//servidor
const httpServer = app.listen( 8080, () => {console.log('servidor escuchando');})


const io = new Server (httpServer)

const mensajes = []



const productManager = new ProductManager
const messagesMananger = new MessagesMananger

let client = {
    "users" : "isma@1234",
    "message" : "hola"
}


io.on('connection', async (socket) => {
    console.log('conectado: ' + socket.id);
    //let productManager = new ProductManager

    //socket.emit('update-productos', await productManager.getProduct())
    
    socket.on('message', async(data) => {
        mensajes.push(data);

        console.log(data);
        console.log(mensajes);
        await messagesMananger.addmessage(client);
        io.emit( 'imprimir', mensajes );

    })

    // ingreso nuevo usuario
    socket.on('authenticatedUser', (data) => { 
        console.log('se conecto:' + data);
        socket.broadcast.emit( 'ingreso', data);

    })

    let prod = await productManager.getProduct(20, 1, 1);
    console.log(prod);
    socket.emit('productos', prod.docs)
    
})