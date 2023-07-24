import { Router} from "express";
import ProductManager from "../dao/mongodb/productManager.class.js";


const router = Router();
const path = './src/file/products.json';

// para imprimrir lo que escriben

let productManager = new ProductManager


router.get('/',  async (req, res) => {
    const limite = Number(req.query.limit)
    const page = Number(req.query.page)
    const sort = Number(req.query.sort)
    const filtro = req.query.filtro
    const filValor = req.query.filValor

    console.log('con limit ***************************************');
    console.log(limite);
    const products = await productManager.getProduct(limite, page, sort, filtro, filValor);
    console.log(products);
    res.send({products})
})

router.get('/:pid',  async (req, res) => {

    const id = req.params.pid
    const product = await productManager.getProductById(id)
    if (product != undefined) {
        res.send(product)
    }else {
        res.send({status: 'el archivo con ese ID no se encontro'})
    }

})

router.post('/',  async (req, res) => {
    const product = req.body;
    await productManager.addProduct(product)
    console.log(product);
    res.send({status: 'se cargo el product'})

} )


router.put('/:pid', async(req, res) => {
    const product = req.body;
    const pid = req.params.pid;
    await productManager.updateProduct(pid, product) 
    
    res.send({status: 'success'});

})


router.delete('/:pid', async(req, res) => {
    const pid = req.params.pid;
    console.log(pid);

    await productManager.deleteProduct(pid)
    res.send({status: 'elemento eliminado'});
    
})

export default router;