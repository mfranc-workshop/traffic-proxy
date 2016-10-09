
var assert = require('chai').assert;
var supertest = require('supertest');
var serviceLib = require('../service'), service = serviceLib.service;

var serviceName = 'basic-service-test';

var sut = new service(serviceName);

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

  it('returns json', function(done) {
    request.get('/status').expect('Content-Type', /application\/json/).end(done);
  });

  it('returns name of the service', function(done) {
    request.get('/status').expect({name: serviceName}).end(done);
  });
});
