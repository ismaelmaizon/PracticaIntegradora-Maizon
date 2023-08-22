import { Router } from "express"; 
import passport from "passport";
import userModel from "../dao/mongodb/models/Users.model.js";

const routes = Router();


routes.get('/chat', (req, res) => {
    let r = req.body
    console.log(r);
    res.render('index')
});


routes.get('/products', (req, res) => {

    // si el usuario no tiene rol de admin no puede ver los productos
    const user = req.session.user
    console.log('prueba');
    console.log(user);
    console.log(user.role);

    if (user.role === 'admin') {
        res.render('products', {
            user: req.session.user
        })
    }else {
        res.render('profile', {
            user: req.session.user
        });
    }
});


//LOGIN
routes.get('/register', (req, res) => {
    res.render('register');
})

routes.get('/login', (req, res) => {
    res.render('login');
})

// 
routes.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    /*
    res.render('profile', {
        user: req.user
    });
    */
    const userEmail = req.user
    console.log(userEmail);
    console.log(userEmail.email);
    let user = await userModel.findOne({email: userEmail.email})
    console.log(user.role);

    if (user.role == 'admin') {
        res.render('products', {
            user: req.user
        })
    }else {
        res.render('profile', {
            user: req.user
        });
    }
})

routes.get('/resetPassword',(req,res)=>{
    res.render('resetPassword');
})



export default routes;