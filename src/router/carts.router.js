import { Router} from "express";
import CartManager from "../dao/mongodb/cartMongo.dao.js";
import CartController from "../controllers/carts.controller.js";
import { passportCall } from "../utils.js";
import sessionController from "../controllers/session.controller.js";



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
    const cid = req.params.cid
    const cart = await cartController.getCartControllerById(cid);
    res.send(cart)
})

// agregar un producto al carrito
router.post('/:cid/product/:pid',  async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    console.log(idCart);
    console.log(idProduct);
    await cartController.addProductToCartController(idCart, idProduct)
    res.send({status: 'success'})        
})

// actualizar carrito
router.put('/:cid',  async (req, res) => {
    const idCart = req.params.cid;
    const products = req.body
    console.log(idCart);
    console.log(products);
    await cartController.updateCartController(idCart, products)
    res.send({status: 'success'})        
})

// actualizar cantidad de producto en el carrito
router.put('/:cid/product/:pid',  async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const quantity = req.body
    await cartController.updateQuantityProductController(idCart, idProduct, quantity.quantity);
    res.send({status: 'success'})        
})

// eliminar un producto del carrito
router.delete('/:cid/product/:pid', async(req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid
    await cartController.deleteProductFromCartController(idCart, idProduct)
    res.send({status: 'success'})
} )

// eliminar todos los productos del carrito
router.delete('/:cid', async(req, res) => {
    const idCart = req.params.cid;
    await cartController.deleteAllProductsFromCartController(idCart)
    res.send({status: 'success'})
} )



// finalizar el proceso de compra
router.get('/:cid/purchase', passportCall('jwt'), async( req, res )=>{
    const user = sessionController.current(req, res)
    console.log(user);
    await cartController.weekendShoppingController(req)
})

export default router;

