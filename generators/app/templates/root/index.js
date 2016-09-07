import express from 'express';
import config from './app/config';
var app = express();

require('./app/main')(app, config);

app.listen(config.port, function () {
   console.log('Starting test2 ... ');
   console.log('Server listening on port ' + config.port);
});
