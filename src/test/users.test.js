import chai from 'chai';
import supertest from 'supertest';



const expect = chai.expect;
const requester = supertest('http://localhost:8080')


describe('test', () => {
    describe('test users', () => {
        it('Get /api/users/:uid debe traer la informacion de un producto', async () => {
            let id = '6501bbb1918152f7ff375779';
            const result = await requester
                .get(`/api/users/${id}`)
            console.log(result.statusCode, result._body);
            let body = result._body
            expect(result.statusCode).to.be.equal(200)
            expect(body).to.have.property('_id')
            expect(result.ok).to.be.ok
        })
    })
})