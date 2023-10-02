import { Router } from "express";
import userModel from "../dao/mongodb/models/Users.model.js";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { passportCall, validatePassword } from "../utils.js";
import sessionController from "../controllers/session.controller.js";


const router = Router();

// Registrarse
router.post("/register", passport.authenticate('register', {session: false}), async (req, res) => {
  res.send({ status: "success", message: "usuario  registrado" });
});

//Loguearse
router.post("/login", passport.authenticate('login', {session: false}), async (req, res) => {
  
  const userRec = req.body;
  console.log('2222222222222222');
  console.log(userRec)
  
  const user = await userModel.findOne({ email: userRec.email, password: userRec.password });
  console.log(user)
  if(user == null) {
    res.send({ message: 'clave o usuario incorrecto'})
  }else{
  req.session.user = {
    name: user.first_name + user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
  };
  let email = user.email
  let role = user.role
  let password = user.password
  console.log('***********');
  console.log(req.session);
  
  let token = jwt.sign({email, password, role }, 'coderSecret', {expiresIn: "24h"}); // " 'coderSecret' " FIRMA DEL TOKEN
  res.cookie('coderCookie', token, {httpOnly: true}).send({ status: "success"})} // "{httpOnly: false}" al estar en false nos permite poder ver la cookie en consola
  // " 'coderCookie' " NOMBRE DE LA COOKIE QUE ESTAMOS GUARDANDO

});

router.get("/current", passportCall('jwt'), async (req, res) => { 
  try {
    sessionController.current(req, res) // el " req" tiene informacion del usuario que se guardo en el "jwt_Payload" enviado desde passportCall('jwt')
  }catch(err){console.log(err )}
});
  

// resetear contraseña
router.post("/resetPassword", async (req, res) => {
  const token = req.query.token;
  // Verificar el token
  jwt.verify(token, 'coderSecret', (err) => {
    let result = {message: 'Token inválido o expirado', link: 'diriguese a localhost:8080/api/mail/sendMail'}
    if (err) {
      return res.status(401).send(result);
    }
    // El token es válido, ahora puedes mostrar la página para cambiar la contraseña
  })
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete Values" });
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user)
    return res.status(404).send({ status: "error", error: "Not user found" });
  //const newHashedPassword = createHash(password);
  if ( password == user.password ) {
    console.log("la nueva clave no puede ser igual a la anterior");
    return res.status(404).send({ status: "error", error: "la nueva clave no puede ser igual a la anterior" });
  }
  await userModel.updateOne(
    { _id: user._id },
    { $set: { password: password } }
  );
  res.status(200).send({ status: "success", message: "Contraseña restaurada" });
});


// Deslogeo
router.get("/logout", (req,res) => {
  req.session.destroy( err => {
    if (!err) res.send('logout ok')
    else res.send({status: "error", body: err})
  });
})


// acceso con github
// esta configuración 'passport.authenticate('github', {scope: 'user:email'})' es por defecto
router.get('/github',
      passport.authenticate('github', {scope: 'user:email'}),
      (req, res) => {}
)
// el callback le estamos indicando que use el proceso de autenticacion de github, el failureRedirect lo que hace es que en caso de que
// falle el acceso o la autenticacion, github redireccionara a /Loging
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async ( req, res) => {
  console.log('exito');
  req.session.user = req.user
  console.log(req.session.user);
  res.redirect('/products') // esta ruta muestra perfil y productos
} )

// la direccion '/' es la direccion de la pagina raiz que es la que nos da infortmaicon del perfil

export default router