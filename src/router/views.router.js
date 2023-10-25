import { Router } from "express"; 
import passport from "passport";
import userModel from "../dao/mongodb/models/Users.model.js";
import productsModel from "../dao/mongodb/models/product.model.js";
const routes = Router();

routes.get('/chat', (req, res) => {
    let r = req.body
    console.log(r);
    res.render('index')
});

//LOGIN
routes.get('/register', (req, res) => {
    res.render('register');
})

routes.get('/login', (req, res) => {
    res.render('login');
})

// 
routes.get('/products', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const userEmail = req.session.user
    console.log(userEmail);
    console.log(userEmail.email);
    let user = await userModel.findOne({email: userEmail.email})
    console.log(user);
    let products = await productsModel.find();
    console.log(products);

    if (user.role == 'admin') {
        res.render('products-template', {
            productos: products
        })
    }else {
        res.render('profile', {
            user: req.session.user
        });
    }
})

routes.get('/resetPassword',(req,res)=>{
    res.render('resetPassword');
})



export default routes;