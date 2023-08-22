import userModel from "../dao/mongodb/models/Users.model.js";
import passport from "passport";
//import local from 'passport-local';
import { createHash } from "../utils.js"; 
import { validatePassword } from "../utils.js";
import GithubStrategy from "passport-github2";



//const localStrategy = local.Strategy



export const initializePassportLocal = () => {
/*
    // ESTRATEGIA DE REGISTRO

    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async(req, username, password, done) => {
            const { first_name, last_name, age, email} = req.body;
            try {   
                let user = await userModel.findOne({email: username})
                if(user) {
                    console.log('user already exists');
                    return done(null, false)

                }

                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: createHash(password)
                }
                const result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('error al registrar usuairo')
            }
            } ))
    

    // ESTRATEGIA DE LOGIN
    passport.use('login', new localStrategy({usernameField: 'email'}, 
    async (username, password, done) => {
        console.log(username);
        console.log(password);
        try{
            const user = await userModel.findOne({ email: username })
            if(!user){
                console.log('usuario no existe');
                return done(null, false)
            }
            if(validatePassword(password, user)){
                return done('invalid password', null)
            }
            console.log(user);
            return done(null, user)
        } catch (e) {console.error(e);}
    }
    ))        
*/
    // ESTRATEGIA GITHUB 

    passport.use(
        'github',
        new GithubStrategy(
            {
            //authorizationURL: 'http://localhost:8080',
            //tokenURL: 'https://www.example.com/oauth2/token',
            clientID: "Iv1.d7ef585c76e9cbe0", 
            clientSecret:"827e04171048103cd3088a321b58dce192088177", 
            callbackURL: "http://localhost:8080/api/sessions/githubcallback"
            }),
        async (accessToken, refreshToken, profile, done)=>{
            try {
                let user = await this.userModel.findOne({email: profile._json.email});
                if(!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: 'test last name',
                        age: Number,
                        email: profile._json.email,
                        password: '1234'
                    }
                    let result = await this.userModel.create(newUser);
                    done(null, result);
                    
                }else{
                    done(null,false)
                }
            } catch(error){
                console.log(error);
            }
        }
    )

    // funciones


    // esto es para poder rellenar mis sesiones
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    // deserializar la sesion, esto passsport lo hacer solo
    passport.deserializeUser(async(id, done)=>{
        let user = await userModel.findById(id);
        done(null, user);
    })
};