import chai from 'chai';
import supertest from 'supertest';



const expect = chai.expect;
const requester = supertest('http://localhost:8080')


describe('test', () => {
    describe('test productos', () => {
        it('Get /api/products/:pid debe traer la informacion de un producto', async () => {
            let id = '649dcbddced4931906e71ed5';
            const result = await requester
                .get(`/api/products/${id}`)
            console.log(result.statusCode, result._body);
            let body = result._body
            expect(result.statusCode).to.be.equal(200)
            expect(body.product).to.have.property('_id')
            expect(result.ok).to.be.ok
        })
        it('Get /api/products/:pid debe traer la informacion de un producto', async () => {
            let id = '649dcbddced4931906e71ed5';
            const result = await requester
                .get(`/api/products/${id}`)
            console.log(result.statusCode, result._body);
            let body = result._body
            expect(result.statusCode).to.be.equal(200)
            expect(body.product).to.have.property('_id')
            expect(result.ok).to.be.ok
        })
        it('Get /api/products/:pid debe traer la informacion de un producto', async () => {
            let id = '649dcbddced4931906e71ed5';
            const result = await requester
                .get(`/api/products/${id}`)
            console.log(result.statusCode, result._body);
            let body = result._body
            expect(result.statusCode).to.be.equal(200)
            expect(body.product).to.have.property('_id')
            expect(result.ok).to.be.ok
        })
    })
})