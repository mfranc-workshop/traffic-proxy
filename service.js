var express = require('express');
var bodyParser = require('body-parser');

exports.service = function(serviceName, db) {

	var app = express();
  var jsonParser = bodyParser.json();

  app.use(jsonParser);

	app.get('/status', function(req, res) {
	  res
		.status(200)
		.json({
				name: serviceName
			});
	});

	app.get('/services', function(req, res) {
	  res
		.status(200)
		.json(db);
	});

	app.post('/register', function(req, res) {
    var body = req.body;
    db.push(body);
	  res.status(200)
    .send();
	});

  this.start = function(port) {
    this.server = app.listen(port, function() {});
  };

  this.stop = function() {
    this.server.close();
  };

  this.getServices = function() {
    return db; 
  };

  return this;
};
