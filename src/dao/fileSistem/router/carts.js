import { Router} from "express";
import fs from 'fs';



const router = Router();
const path = '../file/carts.json';

const pathProducts = '../file/products.json';

router.get('/:cid',  async (req, res) => {
    
    if (fs.existsSync(path)) {
        const id = req.params.cid
        const info = await fs.promises.readFile(path, 'utf-8')
        const carts = JSON.parse(info);
        const cartId = carts.find((pr) => pr.id == id)
        console.log(cartId);
        if (cartId != undefined) {
            res.send(cartId)
        }else {
            res.send({status: 'el archivo con ese ID no se encontro'})

        }
    }else {
        res.send({status: 'el archivo no tiene informacion'})
    }
})


router.post('/', async (req, res) => {
    if ( fs.existsSync(path)) {
        console.log();
        const info = await fs.promises.readFile(path, 'utf-8')
        const carts = JSON.parse(info);
        if ( carts.length === 0  ) {
            carts.push({
                "id" : 1,
                "products" : []
            })
        }else {
            carts.push({
                "id" : parseInt(carts[carts.length - 1].id + 1),
                "products" : []
            })
        }

        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
        res.send({status: 'creacion de carrito'})

    }else{
        await fs.promises.writeFile(path, JSON.stringify([], null, '\t'));
        res.send({status: 'intente de nuevo'})
    }
})


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


export default router;