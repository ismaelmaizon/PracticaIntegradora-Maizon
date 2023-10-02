import { Router } from "express";
import nodemailer from "nodemailer";
import userModel from "../dao/mongodb/models/Users.model.js";
import jwt  from "jsonwebtoken";

const router = Router();

const generateResetPasswordToken = (userEmail) => {
    const token = jwt.sign({ userEmail }, 'coderSecret', { expiresIn: '1m' }); // El token expira en 1 hora
    return token;
};

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "ismael.maizon1234@gmail.com",
    pass: "ostqktqhmyibrcmk",
  },
});

router.get("/sendMail", async (req, res) => {

    const emailUser = req.body.email;
    console.log(emailUser);
    const user = await userModel.findOne({ email: emailUser})
    if(!user){
        res.status(404).send({ message: "usuario no encontrado "});
    }else{
        const resetPasswordToken = generateResetPasswordToken(emailUser);
        const resetPasswordLink = `http://localhost:8080/resetPassword?token=${resetPasswordToken}`;
        let result = await transport.sendMail({
            from: "ismael.maizon1234@gmail.com",
            to: "ismael.maizon1234@gmail.com",
            subject: "correo test",
            html: `
            <div style='color:blue'>
                <h1>test</h1>
                <h2>Cabiar contraseña</h2>
                <h3> hacer click en el siguiente link para poder cambiar tu contraseña</h3>
                <a href="${resetPasswordLink}">${resetPasswordLink}</a>
            </div>`,
            attachments: []
        });
        res.send(result);
    }

});


export default router