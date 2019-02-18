import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import chaiThing from 'chai-things';
const should = chai.should();
chai.use(chaiHttp);
chai.use(chaiThing);

const expect = chai.expect();


describe('POST political office', () => {
    it('It should POST a political office', (done) => {
        const office = {
            officeName: 'Omboudsman',
            officeType: 'Legislative',
        };
        chai.request(app)
            .post('/api/v1/offices')
            .send(office)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('status');               
                done();
            });
    });
});
describe('GET all government offices', () => {
    it('It should display all offices', (done) => {
        chai.request(app)
            .get('/api/v1/offices')
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('GET specific office', () => {
    it('it should show specific office', (done) => {

        chai.request(app)
            .get('/api/v1/offices/1')
          
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.an('array');       
                done();
            });
    });
});

describe('UPDATE specific office', () => {
    it('it should update specific office', (done) => {
        chai.request(app)
            .patch('/api/v1/offices/1')
            .send({
                officeName: "Presidency"
                officeType:
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('Delete specific office', () => {
    it('it should delete a specific office', (done) => {
        chai.request(app)
            .delete('/api/v1/offices/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});