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
    async getCartControllerById(id){
        if(!id){
            return { error:'id esta vacio' }
        }
        const result = await this.cartController.getCartServiceById(id)
        return result
    }

    // agregar un producto al carrito
    async addProductToCartController(cid, pid){
        if(!cid){
            return { error:'id de carrito esta vacio' }
        }
        if(!pid){
            return { error:'id de producto esta vacio' }
        }
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
    async weekendShoppingController(req){
        const idCart = req.params.cid;
        console.log(idCart);
        const result = await this.cartController.weekendShoppingService(idCart);
        return result;
    }

}
