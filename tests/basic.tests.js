var supertest = require('supertest');
var serviceLib = require('../service'), service = serviceLib.service;

jest.unmock('supertest');

var serviceName = 'basic-service-test';

var now = (done) => (err, res) => err ? done.fail(err) : done();

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
    request.get('/status')
    .expect(200)
    .end(now(done));
  });

  it('/status returns json', function(done) {
    request.get('/status')
    .expect('Content-Type', /application\/json/)
    .end(now(done));
  });

  it('/status returns name of the service', function(done) {
    request.get('/status')
      .expect({name: serviceName})
      .end(now(done));
  });

  it('/services returns empty list of registered services', function(done) {
    request.get('/services')
      .expect([])
      .end(now(done));
  });

  it('/services returns list of registered services', function(done) {
    request
      .post('/register')
      .type('json')
      .send({name: 'test-service', ip: 3001 })
      .end(() => {
        request
          .post('/register')
          .type('json')
          .send({name: 'test-service1', ip: 3002 })
          .end(() => {
            request.get('/services')
              .expect([{name: 'test-service', ip: 3001 },
                       {name: 'test-service1', ip: 3002 }])
              .end(now(done));
          })
      });
  });
});
