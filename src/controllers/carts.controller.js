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
    async addProductToCartController(cid, pid){
        const result = await this.cartController.addProductToCartService(cid, pid)
        return result
    }
    // actualizar carrito
    async updateCartController(cid, products){
        if(!cid){
            return { error:'id de carrito esta vacio' }
        }
        const result = await this.cartController.updateCartService(cid, products)
        return result
    }

    // actualizar cantidad de producto en el carrito
    async updateQuantityProductController(cid, pid, quantity){
        if(!cid){
            return { error:'id de carrito esta vacio' }
        }
        if(!pid){
            return { error:'id de producto esta vacio' }
        }
        const result = await this.cartController.updateQuantityProductService(cid, pid, quantity)
        return result
    }

    // eliminar un producto del carrito
    async deleteProductFromCartController(cid, pid){
        if(!cid){
            return { error:'id de carrito esta vacio' }
        }
        if(!pid){
            return { error:'id de producto esta vacio' }
        }
        const result = await this.cartController.deleteProductFromCartService(cid, pid)
        return result;
        
    }
    // eliminar todos los productos del carrito
    async deleteAllProductsFromCartController(cid){
        if(!cid){
            return { error:'id de carrito esta vacio' }
        }
        const result = await this.cartController.deleteAllProductsFromCartService(cid)
        return result;
    }
    // finalizar el proceso de compra
    async weekendShoppingController(req, res){
        const result = await this.cartController.weekendShoppingService(req, res);
        return result;
    }

}
