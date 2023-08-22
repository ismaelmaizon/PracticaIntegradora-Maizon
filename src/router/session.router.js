import { request, Router } from "express";
import userModel from "../dao/mongodb/models/Users.model.js";
import passport from "passport";
import jwt from 'jsonwebtoken';

const router = Router();

// Registrarse
router.post("/register", passport.authenticate('register', {session: false}) , async (req, res) => {
  /*
  ya no necesitamos este codigo

  const { first_name, last_name, email, age, password, rol = "usuario"} = req.body;
  const exist = await userModel.findOne({ email });

  if (exist)
    return res
      .status(400)
      .send({ status: "error", message: "usuario ya registrado" });

  let result = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password,
    rol
  });*/

  res.send({ status: "success", message: "usuario  registrado" });
});

//Loguearse
router.post("/login",passport.authenticate('login', {session: false}) , async (req, res) => {
  
  //ya no necesitamos este codigo

  const { email, password } = req.body;
  console.log(email, password)
  const user = await userModel.findOne({ email: email, password: password });
  console.log(user)
  if (!user) return res.redirect('/api/login')
  req.session.user = {
    name: user.first_name + user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
  };

  let token = jwt.sign({email: req.body.email}, 'coderSecret', {expiresIn: "24h"});
  res.cookie('coderCookie', token, {httpOnly: true}).send({ status: "success", message: req.session.user }) //esta parte "message: req.session.user" es necesario enviar para poder hacer la validacion del rol 

});


router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

// resetear contraseña
router.post("/restartPassword", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete Values" });
  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(404).send({ status: "error", error: "Not user found" });
  const newHashedPassword = createHash(password);
  await userModel.updateOne(
    { _id: user._id },
    { $set: { password: newHashedPassword } }
  );
  res.send({ status: "success", message: "Contraseña restaurada" });
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