import ProductDao from '../dao/mongodb/productMongo.dao.js'


export default class ProductServices {

    constructor() {
        this.productDao = new ProductDao();
    }

    // ver products
    async getProductService( req ) {
        //limit = 10, page = 1, sort = 0, filtro = null, filValor = null
        let limit = req.query.limit
        let page = req.query.page
        let sort = req.query.sort
        let filtro = req.query.filtro
        let filValor = req.query.filValor
        const result = this.productDao.getProduct( limit, page, sort, filtro, filValor);
        return result;
    }

    // ver un product
    async getProductServiceById( req) {
        let id = req.params.pid
        const result = await this.productDao.getProductById(id);
        return result;
    }    
    // añadir product
    async createProductService( req ) {
        const result = await this.productDao.addProduct( req );
        return result;
    }


    // actualizar producto
    async updateProductServiceById(req){
        const product = req.body;
        const pid = req.params.pid;
        let response = {}
        try{
            let result = await this.productDao.getProductById(req)// se pasa en este caso el req dado que la funcion getproductById recibe un req y luego obtiene el ID
            console.log(result);
            if(result == 404){
                response.statusCode = 404
                response.message = 'producto no encontrado'
                response.product = null
                return response
            }else{
                let result1 = await this.productDao.updateProduct(pid, product);
                return result1;
            }
        }catch(error){
            console.log(error);
            response.statusCode = 500
            response.message = 'internal server error'
            response.product = null
            return response
        }
    }

    // eliminar producto
    async deleteProductServicesById(req){
        let id = req.params.pid
        let response = {}
        try{
            let result = await this.productDao.getProductById(id)// se pasa en este caso el req dado que la funcion getproductById recibe un req y luego obtiene el ID
            console.log(result);
            if(result.statusCode == 404){
                response.statusCode = 404
                response.message = 'producto no encontrado'
                response.product = null
                return response
            }else{
                if( result.product.owner === req.user.role || result.product.owner === req.user.email ){
                    let result1 = await this.productDao.deleteProduct(req)
                    return result1;
                }else{
                    response.statusCode = 404
                    response.message = 'no tiene permisos para eliminar el producto'
                    response.product = null
                    return response
                }
            }
        }catch(error){
            console.log(error);
            response.statusCode = 500
            response.message = 'internal server error'
            response.product = null
            return response
        }
    }
}


/*if( result.product.owner === 'admin' || result.product.owner === req.user.email ){
                    let result1 = await this.productDao.deleteProduct(req)
                    return result1;
                }else{
                    response.statusCode = 404
                    response.message = 'no tiene permisos para eliminar el producto'
                    response.product = null
                    return response
                }*/ 