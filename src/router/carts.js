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
    //console.log(response);
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


router.post('/:cid/product/:pid',  async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    console.log(idCart);
    console.log(idProduct);


    const cartProducts = await cartsModel.find({'_id': idCart});
    let exists = true;

    let prod = {  
        'product' : idProduct,
        'quantity' : 1
    }
    cartProducts.map((i) => {
        console.log(i);
        //console.log(i.id);
        //console.log(i.products);
    })
    console.log(cartProducts[0].id);
    console.log(cartProducts[0].products);

    // REVISAR LA PRIMERA CONDICION DADO QUE NUNCA INGRESA AL IF
    // PERO FUNCIONA APARENTEMENTE BIEN SIN LA PRIMERA CONDICION
    
    if (cartProducts[0].products === []) {
        cartProducts[0].products.push(prod);
        console.log('porst pushh');
        console.log(cartProducts[0].products);
        
        await cartsModel.updateOne({'_id': idCart}, {$set: {
            'products': cartProducts.products 
        }})
        res.send({status: 'prodcuto nuevo agregado'})
    }else {
        console.log('dentro del else');
        
        cartProducts[0].products.map((prod) => {
        
            if (prod.product === idProduct) {
                exists = false;
                prod.quantity++;
            }
    
        })

        if(exists){
            console.log('actualizando product');
            cartProducts[0].products.push(prod);
            await cartsModel.updateOne({'_id': idCart}, {$set: {
                'products': cartProducts[0].products 
            }})
            res.send({status: 'prodcuto nuevo agregado'})
        }else {
            await cartsModel.updateOne({'_id': idCart}, {$set: {
                'products': cartProducts[0].products 
            }})
            res.send({status: 'prodcuto actualizado'})
        }
        
    }

    
    

    
    /*
    carts.map((cart) => {
        if (cart.id === idCart) {
            let exists = true;
            let products = await cartsModel.find({'_id': idCart})
        }
    })
    */
        
})


export default router;