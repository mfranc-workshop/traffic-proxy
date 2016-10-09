var express = require('express');


exports.service = function(serviceName) {
	var app = express();

	app.get('/status', function(req, res) {
	  res
		.status(200)
		.json({
				name: serviceName
			});
	});

  this.start = function(port) {
    this.server = app.listen(port, function() {});
  };

  this.stop = function() {
    this.server.close();
  };

  return this;
};
