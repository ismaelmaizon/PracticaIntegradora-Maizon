import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import passport from "passport";
import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "ismael.maizon1234@gmail.com",
      pass: "ostqktqhmyibrcmk",
    },
});

export const EliminacionUser = async (email) => {
    let result = await transport.sendMail({
        from: "ismael.maizon1234@gmail.com",
        to: `${email}`,
        subject: "correo test",
        html: `
        <div style='color:blue'>
            <h1>test</h1>
            <h2>Eliminacion usuario</h2>
            <h3> te informamos que su usuario se elimino por inactividad</h3>
        </div>`,
        attachments: []
    });

    return result
}


//funcion fecha de login  o register
export const FechaDeHoy= () => {
    const fechaHoy = new Date();
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1; // Los meses se cuentan desde 0, por lo que sumamos 1.
    const año = fechaHoy.getFullYear(); // Los meses se cuentan desde 0, por lo que sumamos 1.
  
    // Formatea la fecha como una cadena "dd/mm/aaaa" (puedes ajustar el formato según tus preferencias).
    const fechaFormateada = `${dia}-${mes}-${año}`;
  
    return fechaFormateada;
}



//Manejo de errores con passport
export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({ error:info.messages?info.messages:info.toString() });
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

// middleware de aurotizacion segun el rol
export const authorization = (role) => {
    return async ( req, res, next ) => {
        if (!req.user) return res.status(401).send({error: 'Unauthorized'})
        if (req.user.role != role) return res.status(403).send({error: 'No permissions'})
        next()
    }
}

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default __dirname;