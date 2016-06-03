var express = require('express');
var router = express.Router();

module.exports = function(app){
   app.use('/api', router);
}

router.get('/apptitle', function(req, res) {
   jsonfile.readFile(file, function(err, obj) {
      if(err == null){
         var t = { title: obj.name, ver: obj.version}
         res.send(t);
      }
   })
});

router.get('/testdata', function(req, res) {
   var data = {
      name: 'Mr. Robot',
      location: 'Internet'
   }
   res.send(data);
});

router.get('/error', function(req, res) {
   var data = {
      code: '101',
      mesage: 'This is a dummy error message'
   }
   res.status(500);
   res.send(data);
});
