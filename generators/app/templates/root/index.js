var express = require('express');
var config = require('./app/config');
var app = express();

require('./app/main')(app, config);

app.listen(config.port, function () {
   console.log('Starting <%= options.appName %> ... ');
   console.log('Server listening on port ' + config.port);
});
