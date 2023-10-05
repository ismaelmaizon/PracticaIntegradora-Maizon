import express  from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import __dirnmae from "./utils.js";

import ProductManager from "./dao/mongodb/productMongo.dao.js";
import MessagesMananger from "./dao/mongodb/messagesMananger.class.js";

import routerProducts from "./router/products.router.js";
import routerCarts from './router/carts.router.js';
import viewsRouter from './router/views.router.js';
import sessionRouter from "./router/session.router.js";
import loggerRouter from "./router/loggerTest.router.js";
import user from "./router/user.router.js";
import mails from "./helpers/mail.js";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";

import {Server} from 'socket.io';
//import messagesModel from "./dao/mongodb/models/messages.model.js.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassportJWT } from "./config/jwt.passport.js";
import { initializePassportLocal } from "./config/local.passport.js";

import { proceso } from "./config/config.js";
import { addLogger } from "../logger.config.js";
import { rolesMiddlewareUser } from "./router/middlewares/roles.middlewares.js";

//document
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";


const app = express();

// conexion con base de datos
const connection = mongoose.connect(
    "mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority",
    //{ useNewUrlParser: true, useUnifiedTopology: true } 
);



app.use(express.json()); //Esta línea de código agrega un middleware a la aplicación para procesar datos en formato JSON. El middleware express.json() analiza el cuerpo de las solicitudes entrantes con formato JSON y los convierte en objetos JavaScript accesibles a través de req.body. Esto es útil cuando se envían datos JSON en las solicitudes POST o PUT desde un cliente al servidor.
app.use(express.urlencoded({extended:true})); //Esta línea de código agrega otro middleware para procesar datos de formularios enviados a través de solicitudes POST. El middleware express.urlencoded() analiza el cuerpo de las solicitudes entrantes con datos codificados en URL y los convierte en un objeto JavaScript accesible a través de req.body. El parámetro {extended: true} permite que el middleware analice datos complejos, como arrays y objetos anidados, en los datos codificados en URL.
app.use(express.static(__dirname+'/public')); //Esta línea de código agrega un middleware que sirve archivos estáticos desde un directorio específico en el servidor. En este caso, está configurado para servir archivos estáticos desde el directorio "public" en la ubicación del archivo actual (__dirname es una variable que representa la ruta del directorio actual). Esto es útil para servir archivos CSS, imágenes, scripts y otros recursos estáticos en la aplicación web.


app.use(cookieParser());
initializePassportJWT();
initializePassportLocal();
app.use(passport.initialize())
// Entorno de desarrollo
proceso();


// middleware de logger
app.use(addLogger)

// este scrip sirve para conectar las sesiones con nuestra base de datos
app.use(
    session({
        store: new MongoStore({
        mongoUrl:"mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority",
        // ttl: 20,  (time to live) tiempo de expracion de la session
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


//servidor
const httpServer = app.listen( process.env.PORT, () => {console.log('servidor escuchando');})

const io = new Server (httpServer)

io.on('connection', async (socket) => {
    
    let mensajes = []    
    let productManager = new ProductManager
    let messagesMananger = new MessagesMananger
    
    console.log('conectado: ' + socket.id);
    //let productManager = new ProductManager

    //socket.emit('update-productos', await productManager.getProduct())
    
    socket.on('message', passport.authenticate('jwt', {session: false}), rolesMiddlewareUser, async(data) => {
        mensajes.push(data);

        console.log(data);
        console.log(mensajes);
        await messagesMananger.addmessage(client);
        io.emit( 'imprimir', mensajes );

    })

    // ingreso nuevo usuario
    socket.on('authenticatedUser', passport.authenticate('jwt', {session: false}), rolesMiddlewareUser, (data) => { 
        console.log('se conecto:' + data);
        socket.broadcast.emit( 'ingreso', data);

    })

    let prod = await productManager.getProduct(20, 1, 1);
    console.log(prod);
    socket.emit('productos', prod.docs)
    
})

//document

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'documentacion Proyecto',
            description: 'documentacion de prueba del proyecto final de Coder'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const spec = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))


// rutas
app.use('/', viewsRouter);
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions',sessionRouter)
app.use('/api/loggerTest',loggerRouter)
app.use('/api/mail', mails)
app.use('/api/users', user)