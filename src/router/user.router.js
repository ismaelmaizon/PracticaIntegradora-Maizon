import { Router } from "express";
import UsersController from "../controllers/user.controller.js";
import { uploader } from "../multer.js";
import { rolesMiddlewareAdmin } from "./middlewares/roles.middlewares.js";


const router = Router();
const userController = new UsersController();


//crear usuario
router.post('/', async(req, res) => {
    let result = await userController.createUser(req)
    res.send(result)
})


//ver usuarios
router.get('/', rolesMiddlewareAdmin, async(req, res) =>{
    let result = await userController.getUsers();
    res.send(result)
})

// ver un usuario
router.get('/:uid', rolesMiddlewareAdmin ,async(req, res) =>{
    console.log(req.params.uid);
    let result = await userController.getUser(req);
    console.log(result);
    res.send(result)
})

// agregar document
router.post('/:uid/document', uploader.single() ,async(req, res) =>{
    let result = await userController.postDocumento(req)
    res.send(result)
})


//actualizar usuario premium
router.put('/premium/:uid', async(req, res) =>{
    let result = await userController.updateUser(req)
    res.send(result)
})


 //eliminar usuario
router.delete('/:uid', rolesMiddlewareAdmin ,  async(req, res)=>{
    let result = await userController.deleteUser(req);
    res.send(result)
})

//eliminar usuarios por inactividad
router.delete('/', rolesMiddlewareAdmin, async(req, res) => {
    let result = await userController.deleteInactividad()
    res.send(result)
})

export default router
