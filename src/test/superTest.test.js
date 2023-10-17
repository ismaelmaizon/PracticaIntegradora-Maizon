import chai from 'chai';
import supertest from 'supertest';



const expect = chai.expect;
const requester = supertest('http://localhost:8080')


describe('test adoptme', () => {
    describe('test productos', () => {
        it('Get /api/products/:pid debe traer la informacion de un producto', async () => {
            let id = '649dcbddced4931906e71ed5';
            const {statusCode, message, product} = await requester
                .get(`/api/products/${id}`)
            console.log(statusCode, message, product);
            expect(statusCode).to.be.equal(200)
        })
    })
    describe('test usuarios', () => {})
})