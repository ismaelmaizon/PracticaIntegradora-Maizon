import { Router } from "express"; 

const routes = Router();


routes.get('/', (req, res) => {
    res.render('index')
});


routes.get('/products', (req, res) => {
    res.render('products')
});


export default routes;