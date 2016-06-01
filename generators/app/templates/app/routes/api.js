var express = require('express');
var router = express.Router();

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

module.exports = router;
