import { Router} from "express";
import fs from 'fs';
import productsModel from "../models/product.model.js";
import mongoose from "mongoose";



const router = Router();
const path = './src/file/products.json';


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
    console.log(response);
    //console.log(response1);
    console.log('listo')
 
}

environment()


router.get('/',  async (req, res) => {
   // if (fs.existsSync(path)) {
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

   // }else {
   //     res.send({status: 'el archivo no tiene informacion'})
   // }
})

router.get('/:pid',  async (req, res) => {
//if (fs.existsSync(path)) {
   /* const id = req.params.pid
    const info = await productsModel.find()
    const products = JSON.parse(info);
    const product = products.find((pr) => pr.id == id)*/
    const id = req.params.pid
    const product = await productsModel.find( { _id : id } )
    if (product != undefined) {
        res.send(product)
    }else {
        res.send({status: 'el archivo con ese ID no se encontro'})
    }
//}else {
//    res.send({status: 'el archivo no tiene informacion'})
//}
})

router.post('/',  async (req, res) => {
    const product = req.body;
    await productsModel.insertMany(product)
    console.log(product);
    res.send({status: 'se cargo el product'})

} )


// router.put('/:pid', async(req, res) => {
//     const product = req.body;
//     const pid = parseInt(req.params.pid);
//     console.log(pid);
//     let variable = false;

//     if (fs.existsSync(path)) {
//         const info = await fs.promises.readFile(path, 'utf-8')
//         const products = JSON.parse(info);

//         products.map((p) =>{
//             if (p.id === pid) {
//                 variable = true;

//                 p.title = product.title
//                 p.description = product.description
//                 p.code = product.code
//                 p.price = product.price
//                 p.status = product.status
//                 p.stock = product.stock
//                 p.category = product.category
//             }
//         })

//         if(variable) {
//             console.log(products);
//             await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
//             res.send({status: 'success'});
//         }else {
//             res.send({status: 'no se encontro producto con ese ID'});
//         }


//     }else {
//         res.send({status: 'no se encontro archivo json, intente de nuevo'}) 
//     }
// })


// router.delete('/:pid', async(req, res) => {
//     const pid = parseInt(req.params.pid);
//     console.log(pid);
//     let variable = false;

//     if (fs.existsSync(path)) {
//         const info = await fs.promises.readFile(path, 'utf-8')
//         const products = JSON.parse(info);
        
//         products.map((p) =>{
//             if (p.id === pid) {
//                 variable = true;
//             }
//         })

//         if(variable) {
//             console.log(products);
//             products.splice(pid - 1, 1);
//             console.log('eliminacion ****');
//             console.log(products);
//             await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
//             res.send({status: 'success'});
//         }else {
//             res.send({status: 'no se encontro producto con ese ID'});
//         }
        
//     }else {
//         res.send({status: 'no se encontro archivo json, intente de nuevo'}) 
//     }
// }
// )

export default router;