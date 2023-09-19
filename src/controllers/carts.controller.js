import cartServices from "../services/carts.services.js";


export default class cartController {
    constructor(){
        this.cartController = new cartServices
    }

    // creando carrito
    async addCartController(cart){
        const result = await this.cartController.addCartService(cart);
        return result;
    }

    // ver un carrito
    async getCartControllerById(req){
        const result = await this.cartController.getCartServiceById(req)
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/carts${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/carts${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/carts${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;
    }

    // agregar un producto al carrito
    async addProductToCartController(req){
        const result = await this.cartController.addProductToCartService(req)
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/carts${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/carts${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/carts${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;
    }
    // actualizar carrito
    async updateCartController(req){
        const result = await this.cartController.updateCartService(req)
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/carts${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/carts${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/carts${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;
    }

    // actualizar cantidad de producto en el carrito
    async updateQuantityProductController(req){
        const result = await this.cartController.updateQuantityProductService(req)
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/carts${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/carts${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/carts${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;
    }

    // eliminar un producto del carrito
    async deleteProductFromCartController(req){
        const result = await this.cartController.deleteProductFromCartService(req)
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/carts${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/carts${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/carts${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;
    }
    // eliminar todos los productos del carrito
    async deleteAllProductsFromCartController(req){
        const result = await this.cartController.deleteAllProductsFromCartService(req)
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/carts${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/carts${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/carts${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }
        return result;
    }
    // finalizar el proceso de compra
    async weekendShoppingController(req, res){
        const result = await this.cartController.weekendShoppingService(req, res);
        /*
        if (result.statusCode === 200){
            req.logger.debug(`${req.method} en api/carts${req.url} -- status: 200 -- ${new Date().toLocaleTimeString()}`);
        }else if (result.statusCode == 404) {
            req.logger.info(`${req.method} en api/carts${req.url} -- status: 404  -- ${new Date().toLocaleTimeString()}`);
        }else{
            req.logger.error(`${req.method} en api/carts${req.url} -- status: 500 -- ${new Date().toLocaleTimeString()}`);
        }*/
        return result;
    }

}
