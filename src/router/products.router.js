import { Router} from "express";
import ProductManager from "../dao/mongodb/productMongo.dao.js";
import ProductController from "../controllers/products.controller.js";
import passport from "passport";
import { rolesMiddlewareAdmin } from "./middlewares/roles.middlewares.js";


const router = Router();
const path = './src/file/products.json';

// para imprimrir lo que escriben

let productManager = new ProductManager
let productController = new ProductController

// ver products
router.get('/', passport.authenticate('jwt', {session: false}), rolesMiddlewareAdmin,  async (req, res) => {
    const result = await productController.getProductController(req)
    console.log(result);
    req.logger.http(`${req.method} en /api/products${req.url} -- ${new Date().toLocaleTimeString()}`);
    res.send({result})
})

// ver un product
router.get('/:pid',  async (req, res) => {
    const product = await productController.getProductControllerById(req)
    res.send(product)
})


// añadiendo product
router.post('/', passport.authenticate('jwt', {session: false}), rolesMiddlewareAdmin ,async (req, res) => {
    const newProduct = req.body;
    let result = await productController.createProductController(newProduct)
    console.log(newProduct);
    res.send(result)
} )

// actualizar product
router.put('/:pid',passport.authenticate('jwt', {session: false}), rolesMiddlewareAdmin, async(req, res) => {
    const product = req.body;
    const pid = req.params.pid;
    await productController.updateProductControllerById(pid, product)
    
    res.send({status: 'success'});

})

// eliminar product
router.delete('/:pid',passport.authenticate('jwt', {session: false}), rolesMiddlewareAdmin, async(req, res) => {
    const pid = req.params.pid;
    console.log(pid);

    await productController.updateProductControllerById(pid)
    res.send({status: 'elemento eliminado'});
    
})

export default router;