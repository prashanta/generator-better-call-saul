/*jshint esversion: 6 */

import path from 'path';
import express from 'express';
import exphbs  from 'express-handlebars';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import {api, defaultRouter} from './routes';

export default function main (app, config) {
   var env = process.env.NODE_ENV || 'development';
   app.locals.ENV = env;
   app.locals.ENV_DEVELOPMENT = env == 'development';

   app.set('views', path.join(config.root, 'app', 'views'));
   app.engine('handlebars', exphbs({
      defaultLayout: 'main',
      layoutsDir: path.join('app', 'views', 'layouts'),
      partialsDir: path.join('app', 'views', 'partials')
   }));
   app.set('view engine', 'handlebars');

   app.use(favicon(config.root + '/public/img/favicon.ico'));
   app.use(morgan('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(express.static(config.root + '/public'));

   // Register all routes in app/routes folder
   api(app);
   defaultRouter(app);

   app.use(function (req, res, next) {
      var err = new Error('Not found : ' + req.path);
      err.status = 404;
      next(err);
   });

   if(app.get('env') === 'development'){
      app.use(function (err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
         });
      });
   }

   app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: err.message,
         error: {},
         title: 'error'
      });
   });
}
