var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'The Warm Up' });
});

router.get('/login', function(req, res, next){
  res.render('LoginView', {title: 'The Warm up - Admin Panel'})
});

//POST REQUESTS AND RESPONSES


module.exports = router;
