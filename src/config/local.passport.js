import userModel from "../dao/mongodb/models/Users.model.js";
import passport from "passport";
import local from 'passport-local';
import { createHash } from "../utils.js"; 
import { validatePassword } from "../utils.js";



const localStrategy = local.Strategy



export const initializePassportLocal = () => {

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
            return done(null, user)
        } catch (e) {console.error(e);}
    }
    ))        

};