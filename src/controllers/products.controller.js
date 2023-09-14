import ProductServices from "../services/products.services.js";

export default class ProductController {
    constructor() {
        this.productServices = new ProductServices(); 
    }

    // ver products
    async getProductController(req ) {
        const result = await this.productServices.getProductService(req);
        return result;
    }

    // ver un product
    async getProductControllerById(req) {
        const result = await this.productServices.getProductServiceById(req);
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/products${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/products${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/products${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);

        }
        return result;
    }  
    
    // añadir product
    async createProductController( product ) {
        const result = await this.productServices.createProductService(product);
        return result;

    }

    // actualizar product
    async updateProductControllerById(id, updateProduct) {
        if ( !id ) {
            return { error: 'id vacio'};
        }
        const result = await this.productServices.updateProductServiceById(id, updateProduct);
        return result;
    }

    // eliminar producto
    async deleteProductControllerById(id){
        
        if ( !id ) {
            return { error: 'id vacio'};
        }
        const result = await this.productServices.deleteProductServicesById(id);
        return result
    }
}