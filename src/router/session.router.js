import { Router } from "express";
import userModel from "../dao/mongodb/models/Users.model.js";
import passport from "passport";
import jwt from 'jsonwebtoken';

const router = Router();

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

router.post("/login",passport.authenticate('login', {session: false}) , async (req, res) => {
  /*  
  ya no necesitamos este codigo

  const { email, password } = req.body;
  console.log(email, password)
  const user = await userModel.findOne({ email: email, password: password });
  console.log(user)
  if (!user) return res.redirect('/api/login')
  req.session.user = {
    name: user.first_name + user.last_name,
    email: user.email,
    age: user.age,
    rol: user.rol,
  };
  res.send({ status: "success", message: req.session.user });*/

  let token = jwt.sign({email: req.body.email}, 'coderSecret', {expiresIn: "24h"});
  res.cookie('coderCookie', token, {httpOnly: true}).send({status: 'success'})

});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

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



router.get("/logout", (req,res) => {
  req.session.destroy( err => {
    if (!err) res.send('logout ok')
    else res.send({status: "error", body: err})
  });
})

export default router