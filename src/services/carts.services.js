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
        let id = req.params.pid
        const result = await this.cartDao.getCartById(req);
        const result1 = await this.productDao.getProductById(id);
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
        let id = req.params.pid
        const result = await this.cartDao.getCartById(req);
        const result1 = await this.productDao.getProductById(id);
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
    async deleteProductFromCartService(req){
        const idProduct = req.params.pid
        const result = await this.cartDao.deleteProductFromCart(req, idProduct);
        return result;
    }
    // eliminar todos los productos del carrito
    async deleteAllProductsFromCartService(req){
        const result = await this.cartDao.deleteAllProductsFromCart(req);
        return result;
    }

    async weekendShoppingService(req, res){
        const result = await this.cartDao.weekendShopping(req, res);
        return result;
    }
}