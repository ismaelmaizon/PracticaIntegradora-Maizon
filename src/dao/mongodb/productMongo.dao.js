import productsModel from "./models/product.model.js";
import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "ismael.maizon1234@gmail.com",
      pass: "ostqktqhmyibrcmk",
    },
});

export default class ProductManager {

    // ver productos
    async getProduct(limit = 10, page = 1, sort = 0, filtro = null, filValor = null){
        let whereOption = {}
        // por si no tiene filtrado
        if( filtro != '' && filValor != '' ){
            whereOption = {[filtro] : filValor }
        }
        try{
            let result = await productsModel.paginate(
                whereOption, 
                {limit: limit, page: page, sort: {price: sort}})
            if (!result){
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Products not found", // un mensaje de error apropiado
                    result: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Products found", // un mensaje de éxito apropiado
                product: result, // el carrito encontrado
            };
        }catch(error){
            console.log(error);
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }

    // ver un producto
    async getProductById(pid){
        let id = pid
        try{
            let result = await productsModel.findOne({_id : id});
            if (!result){
                return {
                    statusCode: 404, // o el código de estado que desees para "no encontrado"
                    message: "Product not found", // un mensaje de error apropiado
                    product: null, // opcional: puedes incluir el carrito encontrado o null si no se encuentra
                };
            }
            return {
                statusCode: 200, // o el código de estado que desees para "éxito"
                message: "Product found", // un mensaje de éxito apropiado
                product: result, // el carrito encontrado
            };
        }catch(error){
            console.log(error);
            return {
                statusCode: 500, // o el código de estado que desees para "error del servidor"
                message: "Internal server error", // un mensaje de error de servidor apropiado
                error: error, // opcional: puedes incluir el objeto de error si es relevante
            };
        }
    }

    // añadir producto
    async addProduct(req){
        let response = {}
        const newProduct = req.body;
        if(req.user.role === 'premium'){
            newProduct.owner = req.user.email
        }
        console.log(newProduct);
        try{
            let result = await productsModel.create(newProduct);
            response.statusCode = 200;
            response.message = 'objeto credo';
            response.result = result
            return response
        }catch(error){
            console.log(error);
            response.statusCode = 500;
            response.message = 'objeto no credo';
            response.result = null
            return response
        } 
    }


    // actualizar producto
    async updateProduct(id, updateProduct){
        console.log(updateProduct);
        let response = {}
        try{
            let result = await productsModel.updateOne({_id : id}, {$set: updateProduct});
            response.statusCode = 200;
            response.message = 'producto actualizado';
            response.result = result
            return response
        }catch(error){
            console.log(error);
            response.statusCode = 500;
            response.message = 'objeto no actualizado';
            response.result = null
            return response
        }
    }

    // eliminar producto
    async deleteProduct(req){
        const pid = req.params.pid;
        let response = {}
        try{
            let product = await this.getProductById(pid)
            let usuario = product.product.owner
            if (product.owner != 'admin'){
                await transport.sendMail({
                    from: "ismael.maizon1234@gmail.com",
                    to: `${usuario}`,
                    subject: "correo test",
                    html: `
                    <div style='color:blue'>
                        <h1>test</h1>
                        <h2>Eliminacion de tu porducto</h2>
                        <h3> te informamos que se elimino tu prodcto </h3>
                    </div>`,
                    attachments: []
                });
                let result1 = await productsModel.deleteOne({_id : pid});
                response.statusCode = 200;
                response.message = 'producto eliminado';
                response.result = result1
                return response
            }
            let result = await productsModel.deleteOne({_id : pid});
            response.statusCode = 200;
            response.message = 'producto eliminado';
            response.result = result
            return response
        }catch(error){
            console.log(error);
            response.statusCode = 500;
            response.message = 'internal server error';
            response.result = null
            return response
        }
    }
}


