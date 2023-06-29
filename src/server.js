import express  from "express";
//import handlebars from "express-handlebars";
import __dirnmae from "./utils.js";
import routerProducts from "./router/products.js"
import routerCarts from './router/carts.js';


const app = express();


// app.engine('handlebars', handlebars.engine())
// app.set('views', __dirnmae + '/views');
// app.set('view engine','handlebars');


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


app.listen( 8080, () => {
    console.log('servidor escuchando');
})