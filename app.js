var serviceLib = require('./service'), service = serviceLib.service;

var db = [];

var app = new service('traffic-proxy', db);

app.start(8100);
