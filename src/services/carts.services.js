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
    async getCartServiceById(id){
        const result = await this.cartDao.getCartById(id);
        if(!result){
            return { error:'not exist cart' }
        }
        return result
    }

    // agregar un producto al carrito
    async addProductToCartService(cid, pid){
        const result = await this.cartDao.getCartById(cid);
        const result1 = await this.productDao.getProductById(pid);
        if (!result) {
            return { error:'carrito al que hace referencia not exist'}
        };
        if (!result1) {
            return { error:'ese producto not exist'}
        };

        const result2 = await this.cartDao.addProductToCart(cid, pid)
        return result2;
    }

    // actualizar carrito
    async updateCartService(cid, products){
        const result = await this.cartDao.getCartById(cid);
        if (!result) {
            return { error:'carrito al que hace referencia not exist'}
        };
        if (products.length === 0){
            return { error:'no estas agregando informacion'}
        }
        const result2 = await this.cartDao.updateCart(cid, products)
        return result2;
    }


    // actualizar cantidad de producto en el carrito
    async updateQuantityProductService(cid, pid, quantity){
        if (quantity === undefined){
            return { error:'catidad mal cargada'}
        }
        const result = await this.cartDao.updateQuantityProduct(cid, pid, quantity);
        return result;
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