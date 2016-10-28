var serviceLib = require('./service'), service = serviceLib.service;

var db = [];

var app = new service('app-test');

app.start(8000, db);
