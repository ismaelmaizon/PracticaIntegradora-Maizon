import { Router} from "express";
import ProductController from "../controllers/products.controller.js";
import passport from "passport";
import { rolesMiddlewareAdmin, rolesMiddlewareAdminAndPremium } from "./middlewares/roles.middlewares.js";


const router = Router();
const path = './src/file/products.json';

// para imprimrir lo que escriben

let productController = new ProductController

// ver products
router.get('/', passport.authenticate('jwt', {session: false}),  async (req, res) => {
    const result = await productController.getProductController(req)
    console.log(result);
    req.logger.http(`${req.method} en /api/products${req.url} -- ${new Date().toLocaleTimeString()}`);
    res.send(result)
})

// ver un product
router.get('/:pid',  async (req, res) => {
    const product = await productController.getProductControllerById(req)
    res.send(product)
})


// añadiendo product
router.post('/', passport.authenticate('jwt', {session: false}), rolesMiddlewareAdminAndPremium ,async (req, res) => {
    let result = await productController.createProductController(req)
    res.send(result)
} )

// actualizar product
router.put('/:pid',passport.authenticate('jwt', {session: false}), rolesMiddlewareAdminAndPremium, async(req, res) => {
    let result = await productController.updateProductControllerById(req)
    res.send(result);

})

// eliminar product
router.delete('/:pid',passport.authenticate('jwt', {session: false}), rolesMiddlewareAdminAndPremium, async(req, res) => {
    let result = await productController.deleteProductControllerById(req)
    res.send(result);
    
})

export default router;