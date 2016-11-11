var exp = require('chai').expect;
var supertest = require('supertest');
var serviceLib = require('../service'), service = serviceLib.service;

var serviceName = 'basic-service-test';

var sut = new service(serviceName, []);

describe('micro-service', function() {

  var host = 'http://localhost:8000';
  var request = supertest(host);

  beforeEach(function() {
    sut.start(8000);
  });
  
  afterEach(function() {
    sut.stop();
  });

  it('returns 200 on /status', function(done) {
    request.get('/status').expect(200, done);
  });

  it('/status returns json', function(done) {
    request.get('/status')
    .expect('Content-Type', /application\/json/).end(done);
  });

  it('/status returns name of the service', function(done) {
    request.get('/status')
      .expect(200)
      .expect({name: serviceName})
      .end(done);
  });

  it('/services returns empty list of registered services', function(done) {
    request.get('/services')
      .expect(200)
      .expect({})
      .end(done);
  });

  it('/services returns list of registered services', function(done) {
    request
      .post('/register')
      .type('form')
      .send({name: 'test-service', ip: 3001 })
      .end((res, req) => {
        request.get('/services')
          .expect(200)
          .expect(
            {name: 'test-service', ip: 3001 }
          )
          .end(done);
      });
  });

  it('getServices returns empty list', function(done) {
    var actual = sut.getServices();
    exp(actual).to.have.length(1);
    done();
  });

  it('/register adds service to list and returns 200', function(done) {
    request
      .post('/register')
      .type('form')
      .send({name: 'test-service', ip: 3001 })
      .expect(200)
      .end((err, res) => {
        exp(sut.getServices()).to.have.length(2);
        done();
      });
  });
});
