import ProductServices from "../services/products.services.js";

export default class ProductController {
    constructor() {
        this.productServices = new ProductServices(); 
    }

    // añadir product
    async createProductController( product ) {
        const result = await this.productServices.createProductService(product);
        return result;

    }

    // ver products
    async getProductController( req ) {
        const result = await this.productServices.getProductService(req);
        return result;
    }

    // ver un product
    async getProductControllerById( id) {
        if (!id){
            return {error : 'id vacio'};
        }
        const result = await this.productServices.getProductServiceById(id);
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