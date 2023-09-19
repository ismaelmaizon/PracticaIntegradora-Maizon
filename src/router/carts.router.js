import { Router} from "express";
import CartManager from "../dao/mongodb/cartMongo.dao.js";
import CartController from "../controllers/carts.controller.js";
import { passportCall } from "../utils.js";
import { rolesMiddlewareUser } from "./middlewares/roles.middlewares.js";
import passport from "passport";



const router = Router();

let cartManager = new CartManager
let cartController = new CartController

// creando carrito
router.post('/', async (req, res) => {
    const cart = req.body
    await cartController.addCartController(cart);
    res.send({status: 'carrito creado'})
})

router.get('/',  async (req, res) => {
    const carts = await cartManager.getCarts();
    res.send(carts)
})


// ver un carrito
router.get('/:cid',  async (req, res) => {
    const result = await cartController.getCartControllerById(req);
    res.send(result)
})

// agregar un producto al carrito
router.post('/:cid/product/:pid', passport.authenticate('jwt', {session: false}), rolesMiddlewareUser, async (req, res) => {
    let result =  await cartController.addProductToCartController(req)
    console.log(result);
    res.send(result)        
})

// actualizar carrito
router.put('/:cid',  async (req, res) => {
    let result = await cartController.updateCartController(req)
    res.send(result)        
})

// actualizar cantidad de producto en el carrito
router.put('/:cid/product/:pid',  async (req, res) => {
    let result = await cartController.updateQuantityProductController(req);
    res.send(result)        
})

// eliminar un producto del carrito
router.delete('/:cid/product/:pid', passport.authenticate('jwt', {session: false}), rolesMiddlewareUser,  async(req, res) => {
    let result = await cartController.deleteProductFromCartController(req)
    res.send(result)
} )

// eliminar todos los productos del carrito
router.delete('/:cid', async(req, res) => {
    const idCart = req.params.cid;
    let result = await cartController.deleteAllProductsFromCartController(req);
    res.send(result)
} )



// finalizar el proceso de compra
router.get('/:cid/purchase', passportCall('jwt'), async( req, res )=>{
    let result = await cartController.weekendShoppingController(req, res)
    res.send(result)
})

export default router;

