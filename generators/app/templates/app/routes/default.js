/*jshint esversion: 6 */

import express from 'express';
var router = express.Router();

router.get('/help', function(req, res) {
   res.render('help');
});

router.get('/about', function(req, res) {
   res.render('about');
});

export default function defaultRouter(app){
   app.use('/', router);
}
