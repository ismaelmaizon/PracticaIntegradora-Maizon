import { Router} from "express";
import fs from 'fs';


const router = Router();
const path = '../file/products.json';


router.get('/',  async (req, res) => {
    if (fs.existsSync(path)) {
        const limite = req.query.limit
        const info = await fs.promises.readFile(path, 'utf-8')
        const products = JSON.parse(info);
        if (limite === undefined) {
            res.send({products})
        } else {
            const productsLimit = []
            products.map( pr => {
                if (pr.id <= limite) { productsLimit.push(pr) }
            } )
            res.send({productsLimit})
        }

    }else {
        res.send({status: 'el archivo no tiene informacion'})
    }
})

router.get('/:pid',  async (req, res) => {
    if (fs.existsSync(path)) {
        const id = req.params.pid
        const info = await fs.promises.readFile(path, 'utf-8')
        const products = JSON.parse(info);
        const product = products.find((pr) => pr.id == id)
        if (product != undefined) {
            res.send(product)
        }else {
            res.send({status: 'el archivo con ese ID no se encontro'})
        }
    }else {
        res.send({status: 'el archivo no tiene informacion'})
    }
})

router.post('/',  async (req, res) => {
    const product = req.body;

    if (fs.existsSync(path)) {
        const info = await fs.promises.readFile(path, 'utf-8')
        const products = JSON.parse(info);
        // console.log(products);
        if (products.length === 0) {
            product.id = 1
            products.push(product);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t')) 
            console.log(products);
            res.send({status: 'success'});
        } else {
            product.id = products[products.length - 1].id + 1
            products.push(product);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))    
            res.send({status: 'success'});
        }
    }else {
        const products = []
        res.send({status: 'no se encontro archivo json, intente de nuevo'}) 
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
    }

} )


router.put('/:pid', async(req, res) => {
    const product = req.body;
    const pid = parseInt(req.params.pid);
    console.log(pid);
    let variable = false;

    if (fs.existsSync(path)) {
        const info = await fs.promises.readFile(path, 'utf-8')
        const products = JSON.parse(info);

        products.map((p) =>{
            if (p.id === pid) {
                variable = true;

                p.title = product.title
                p.description = product.description
                p.code = product.code
                p.price = product.price
                p.status = product.status
                p.stock = product.stock
                p.category = product.category
            }
        })

        if(variable) {
            console.log(products);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            res.send({status: 'success'});
        }else {
            res.send({status: 'no se encontro producto con ese ID'});
        }


    }else {
        res.send({status: 'no se encontro archivo json, intente de nuevo'}) 
    }
})


router.delete('/:pid', async(req, res) => {
    const pid = parseInt(req.params.pid);
    console.log(pid);
    let variable = false;

    if (fs.existsSync(path)) {
        const info = await fs.promises.readFile(path, 'utf-8')
        const products = JSON.parse(info);
        
        products.map((p) =>{
            if (p.id === pid) {
                variable = true;
            }
        })

        if(variable) {
            console.log(products);
            products.splice(pid - 1, 1);
            console.log('eliminacion ****');
            console.log(products);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            res.send({status: 'success'});
        }else {
            res.send({status: 'no se encontro producto con ese ID'});
        }
        
    }else {
        res.send({status: 'no se encontro archivo json, intente de nuevo'}) 
    }
}
)

export default router;