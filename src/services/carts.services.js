import CartDao from '../dao/mongodb/cartMongo.dao.js'
import ProductDao from '../dao/mongodb/productMongo.dao.js'



export default class cartServices {
    constructor(){
        this.cartDao = new CartDao;
        this.productDao = new ProductDao;

    }

    // creando carrito
    async addCartService(cart){
        const result = await this.cartDao.addCart(cart)
        return result;
    }

    // ver un carrito
    async getCartServiceById(req){
        const result = await this.cartDao.getCartById(req);
        return result
    }

    // agregar un producto al carrito
    async addProductToCartService(req){
        let response = {}
        const result = await this.cartDao.getCartById(req);
        const result1 = await this.productDao.getProductById(req);
        if(result.statusCode == 404 || result1.statusCode == 404) {
            response.statusCode = 404
            response.message = 'id card o id product no existe'
            return response;
        }
        //console.log(result.statusCode);
        //console.log(result1.statusCode);
        if(result.statusCode == 500 || result1.statusCode == 500) {
            response.statusCode = 500
            response.message = 'Internal server error'
            return response;
        }
        const result2 = await this.cartDao.addProductToCart(req)
        response = result2
        return response
    }

    // actualizar carrito
    async updateCartService(req){
        const result = await this.cartDao.updateCart(req)
        return result;
    }


    // actualizar cantidad de producto en el carrito
    async updateQuantityProductService(req){
        let response = {}
        const result = await this.cartDao.getCartById(req);
        const result1 = await this.productDao.getProductById(req);
        if(result.statusCode == 404 || result1.statusCode == 404) {
            response.statusCode = 404
            response.message = 'id card o id product no existe'
            return response;
        }
        //console.log(result.statusCode);
        //console.log(result1.statusCode);
        if(result.statusCode == 500 || result1.statusCode == 500) {
            response.statusCode = 500
            response.message = 'Internal server error'
            return response;
        }
        const result2 = await this.cartDao.updateQuantityProduct(req);
        return result2;
    }

    // eliminar un producto del carrito
    async deleteProductFromCartService(cid, pid){
        const result = await this.cartDao.deleteProductFromCart(cid, pid);
        return result;
    }
    // eliminar todos los productos del carrito
    async deleteAllProductsFromCartService(cid){
        const result = await this.cartDao.deleteAllProductsFromCart(cid);
        return result;
    }

    async weekendShoppingService(req, res){
        const result = await this.cartDao.weekendShopping(req, res);
        return result;
    }
}