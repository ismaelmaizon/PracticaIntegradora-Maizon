import ProductDao from '../dao/mongodb/productMongo.dao.js'


export default class ProductServices {

    constructor() {
        this.productDao = new ProductDao();
    }

    // añadir product
    async createProductService( product ) {
        const result = await this.productDao.addProduct( product );
        return result;
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
    async getProductServiceById( id, product ) {
        const result = await this.productDao.getProductById( id, product );
        if ( !result ) {
            return { error: 'Product not exist'};
        }
        return result;
    }    

    // actualizar producto
    async updateProductServiceById(id, updateProduct){
        const result = await this.productDao.getProductById(id)
        if ( !result ) {
            return { error: 'Product not exist'};
        }
        await this.productDao.updateProduct(id, updateProduct);
        return;

    }

    // eliminar producto
    async deleteProductServicesById(id){
        console.log(id);
        const result = await this.productDao.getProductById(id)
        if ( !result ) {
            return { error: 'Product not exist'};
        }
        result = await this.productDao.deleteProduct(id)
        return result
    }
}