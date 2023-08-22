import passport from "passport";
import jwt from 'passport-jwt';



const JWTStrategy = jwt.Strategy
const extractJWT = jwt.ExtractJwt


export const initializePassportJWT = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret'
    }, 
    async(jwtPayload, done) => {
        try{
            return done(null, jwtPayload)
        }catch(e){
            return done(e)
        }
    }))
}


const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['coderCookie'];
    }
    return token;
}