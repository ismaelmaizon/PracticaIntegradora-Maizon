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
    async createProductController(req) {
        const result = await this.productServices.createProductService(req);
        if (result.statusCode === 200){
            req.logger.http(`${req.method} en api/products${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/products${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;

    }

    // actualizar product
    async updateProductControllerById(req) {
        const result = await this.productServices.updateProductServiceById(req);
        if (result.statusCode == 200){
            req.logger.debug(`${req.method} en api/products${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/products${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/products${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;
    }

    // eliminar producto
    async deleteProductControllerById(req){
        const result = await this.productServices.deleteProductServicesById(req);
        if (result.statusCode == 200){
            req.logger.debug(`${req.method} en api/products${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/products${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/products${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result
    }
}