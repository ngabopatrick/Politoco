import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect();


describe('POST political parties', () => {
    it('It should POST a political parties', (done) => {
        chai.request(app)
            .post('/api/v1/parties')
            .send({
                partyName: 'Democrats',
                hqAddress: 'DC',
            })
            .end((error, res) => {
                res.should.have.status(201);
                res.body.should.be.an('object');
                done();
            });
    });
});

describe('GET all political parties', () => {
    it('It should display all parties', (done) => {
        chai.request(app)
            .get('/api/v1/parties')
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('GET specific Political party', () => {
	it('it should show specific political party', (done) => {
		chai.request(app)
		.get('/api/v1/parties/1')

		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});
});

describe('UPDATE specific party', () => {
    it('it should update specific party', (done) => {
        chai.request(app)
            .patch('/api/v1/parties/1')
            .send({
                partyName: "Democrats"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('Delete specific party', () => {
    it('it should delete a specific party', (done) => {
        chai.request(app)
            .delete('/api/v1/parties/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});