import { Router } from "express"; 
import passport from "passport";

const routes = Router();


routes.get('/chat', (req, res) => {
    let r = req.body
    console.log(r);
    res.render('index')
});


routes.get('/products', (req, res) => {

    // si el usuario no tiene rol de admin no puede ver los productos
    const user = req.session.user

    if (user.rol === 'admin') {
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
routes.get('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    res.render('profile', {
        user: req.user
    });
})

routes.get('/resetPassword',(req,res)=>{
    res.render('resetPassword');
})



export default routes;