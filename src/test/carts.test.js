import chai from 'chai';
import supertest from 'supertest';



const expect = chai.expect;
const requester = supertest('http://localhost:8080')


describe('test', () => {
    describe('test carts', () => {
        it('Get /api/carts/:pid debe traer la informacion de un producto', async () => {
            let id = '651ad85a3251a8ef0669bea9';
            const result = await requester
                .get(`/api/carts/${id}`)
            console.log(result.statusCode, result._body);
            let body = result._body
            expect(result.statusCode).to.be.equal(200)
            expect(body.cart).to.have.property('_id')
        })
    })
})