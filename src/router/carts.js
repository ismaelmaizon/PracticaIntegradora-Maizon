import { Router} from "express";
import fs from 'fs';
import cartsModel from "../models/cart.model.js";
import mongoose from "mongoose";



const router = Router();
const path = './src/file/carts.json';

const environment = async ()=>{

    //const info = await fs.promises.readFile(path, 'utf-8')
    //const cartsRes = JSON.parse(info);
    //console.log(productsRes); 
    await mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority')
    //products.push(productsRes)
    //console.log('***************************************************************');
    //console.log(products);
    //await cartsModel.insertMany(cartsRes)
    let response = await cartsModel.find()
    //let response1 = await productsModel.find().explain('executionStats')//first query
    //let response = await userModel.find({first_name: 'Celia'}).explain('executionStats')//first query
    console.log(response);
    //console.log(response1);
    console.log('listo')
}

environment()

router.get('/',  async (req, res) => {
    
    const carts = await cartsModel.find()
    
    res.send(carts)
})

router.get('/:cid',  async (req, res) => {

    const cid = req.params.cid
    const cart = await cartsModel.find({_id: cid})
    
    res.send(cart)
})


router.post('/', async (req, res) => {
    const cart = req.body
    await cartsModel.insertMany(cart)

    res.send({status: 'success'})
})

/*
router.post('/:cid/product/:pid',  async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    console.log(idCart);
    console.log(idProduct);

    if (fs.existsSync(path) && fs.existsSync(pathProducts )) {

        const data = await fs.promises.readFile(pathProducts, 'utf-8')
        const products = JSON.parse(data);
        const info = await fs.promises.readFile(path, 'utf-8')
        const carts = JSON.parse(info);
        console.log(carts);
        let producto = {
            "product" : 0,
            "quantity" : 1
        }
        console.log('antes: ');
        console.log(carts);
        carts.map((cart) => {
            if (cart.id === parseInt(idCart)) {
                let exists = true;
                cart.products.map((prod) => {

                    if (prod.product === parseInt(idProduct)) {
                        exists = false;
                        prod.quantity = prod.quantity + 1;
                        
                    }   

                })
                if (exists) {
                    producto.product = parseInt(idProduct)
                    producto.quantity = 1
                    cart.products.push(producto) 
                }
            }
        })
        console.log('despues: ');
        console.log(carts);
        console.log(carts[1].products);
        
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t')); 
        res.send({status: 'success'})
        
    }else {
        const carts = [
        {
            "id" : 1,
            "products" : []
        }
        
        ]
        res.send({status: 'no se encontro archivo json, intente de nuevo'}) 
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
    }

} )

*/
export default router;