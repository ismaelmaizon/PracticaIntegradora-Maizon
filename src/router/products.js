import { Router} from "express";
import fs from 'fs';
import productsModel from "../dao/mongodb/models/product.model.js";
import mongoose from "mongoose";



const router = Router();
const path = './src/file/products.json';

/*
const environment = async ()=>{

    const info = await fs.promises.readFile(path, 'utf-8')
    const productsRes = JSON.parse(info);
    //console.log(productsRes); 
    await mongoose.connect('mongodb+srv://ismaelmaizon1234:Qbroncon18@cluster0.6inkifa.mongodb.net/?retryWrites=true&w=majority')
    //products.push(productsRes)
    //console.log('***************************************************************');
    //console.log(products);
    //await productsModel.insertMany(productsRes)
    let response = await productsModel.find()
    //let response1 = await productsModel.find().explain('executionStats')//first query
    //let response = await userModel.find({first_name: 'Celia'}).explain('executionStats')//first query
    //console.log(response);
    //console.log(response1);
    console.log('listo')
 
}

environment()
*/

router.get('/',  async (req, res) => {
    const limite = req.query.limit
    console.log('con limit ***************************************');
    console.log(limite);
    const products = await productsModel.find()
    console.log(products);
    //const products = JSON.parse(info);
    if (limite === undefined) {
        res.send({products})
    } else {
        const productsLimit = []
        products.map( pr => {
            if (pr.id <= limite) { productsLimit.push(pr) }
        } )
        console.log(productsLimit);
        res.send({productsLimit})
    }

})

router.get('/:pid',  async (req, res) => {

    const id = req.params.pid
    const product = await productsModel.find( { _id : id } )
    if (product != undefined) {
        res.send(product)
    }else {
        res.send({status: 'el archivo con ese ID no se encontro'})
    }

})

router.post('/',  async (req, res) => {
    const product = req.body;
    await productsModel.insertMany(product)
    console.log(product);
    res.send({status: 'se cargo el product'})

} )


router.put('/:pid', async(req, res) => {
    const product = req.body;
    const pid = req.params.pid;
    let variable = false;

    await productsModel.updateOne({"_id": pid}, 
    {$set : { 
        "title": product.title, 
        "description": product.description,
        "code": product.code,
        "price": product.price,
        "status": product.status,
        "stock": product.stock,
        "category": product.category 
    } } )    
    
    res.send({status: 'success'});

})


router.delete('/:pid', async(req, res) => {
    const pid = req.params.pid;
    console.log(pid);

    await productsModel.deleteOne({"_id": pid})
    res.send({status: 'elemento eliminado'});
    
})

export default router;