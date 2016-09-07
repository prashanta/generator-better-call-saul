/*jshint esversion: 6 */

import express from 'express';
var router = express.Router();

router.get('/testdata', function(req, res) {
   var data = {
      name: 'Mr. Robot',
      location: 'Internet'
   };
   res.send(data);
});

router.get('/error', function(req, res) {
   var data = {
      code: '101',
      mesage: 'This is a dummy error message'
   };
   res.status(500);
   res.send(data);
});

export default function api(app){
   app.use('/api', router);
}
