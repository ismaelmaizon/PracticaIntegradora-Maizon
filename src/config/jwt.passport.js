import passport from "passport";
import jwt from 'passport-jwt';



const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


export const initializePassportJWT = () => {
    passport.use(
        'jwt', 
        new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret'}, // " 'coderSecret' " FIRMA DEL TOKEN
    async(jwt_Payload, done) => {
        try{
            return done(null, jwt_Payload)
        }catch(e){
            return done(e)
        }
    }))
}


const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['coderCookie']; // " 'coderCookie' " NOMBRE DE LA COOKIE QUE ESTAMOS GUARDANDO
    }
    return token;
}