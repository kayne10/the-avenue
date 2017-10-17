var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'The Warm Up' });
});

router.get('/login', function(req, res, next){
  res.render('loginView', {
    title: 'The Warm up - Admin Panel'
  })
});

router.get('/signup', function(req, res, next){
  res.render('signupView', {
    title: 'The Warm up - Admin Panel'
  })
});

//POST REQUESTS AND RESPONSES
router.post('/signup', passport.authenticate('local-signup', {
  failureRedirect: '/admin/signup',
  failureFlash: true
}), function(req, res, next) {
  res.redirect('/admin');
});

module.exports = router;
