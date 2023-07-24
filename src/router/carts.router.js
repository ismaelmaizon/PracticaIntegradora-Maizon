import { Router} from "express";
import CartManager from "../dao/mongodb/cartManager.class.js";



const router = Router();

let cartManager = new CartManager

router.get('/',  async (req, res) => {
    const carts = await cartManager.getCarts();
    res.send(carts)
})

router.get('/:cid',  async (req, res) => {

    const cid = req.params.cid
    const cart = await cartManager.getCartById({_id: cid})
    res.send(cart)
})


router.post('/', async (req, res) => {
    const cart = req.body
    await cartManager.addCart(cart)

    res.send({status: 'success'})
})


router.post('/:cid/product/:pid',  async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    console.log(idCart);
    console.log(idProduct);
    await cartManager.addProductToCart(idCart, idProduct)
    res.send({status: 'success'})        
})

router.put('/:cid',  async (req, res) => {
    const idCart = req.params.cid;
    const products = req.body
    console.log(idCart);
    console.log(products);
    await cartManager.updateCart(idCart, products)
    res.send({status: 'success'})        
})

router.put('/:cid/product/:pid',  async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const quantity = req.body
    await cartManager.updateQuantityProduct(idCart, idProduct, quantity.quantity);
    res.send({status: 'success'})        
})


router.delete('/:cid/product/:pid', async(req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid
    await cartManager.deleteProductFromCart(idCart, idProduct)
    res.send({status: 'success'})
} )

router.delete('/:cid', async(req, res) => {
    const idCart = req.params.cid;
    await cartManager.deleteAllProductsFromCart(idCart)
    res.send({status: 'success'})
} )


export default router;

