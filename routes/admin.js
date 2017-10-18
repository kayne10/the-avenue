var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');


// Get main admin dashboard
router.get('/', checkAuthentication,function(req, res, next) {
  res.render('admin', { title: 'The Warm Up' });
});

// API controller actions



// LOGIM AND SIGNUP AUTH
router.get('/login', function(req, res, next){
  res.render('loginView', {
    title: 'The Warm up - Admin Panel',
    error: req.flash('error')
  })
});

router.get('/signup', function(req, res, next){
  res.render('signupView', {
    title: 'The Warm up - Admin Panel',
    error: req.flash('error')
  })
});

//POST REQUESTS AND RESPONSES
router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/admin/signup',
  failureFlash: true
}), function(req, res, next) {
  res.redirect('/admin');
});

router.post('/login', function(req, res, next){
  passport.authenticate('local.login', {failureFlash: true}, function(err, user, info) {
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) {
      req.flash('error','Sorry, there was an incorrect username or password.');
      return res.redirect('/admin/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
      return res.redirect('/admin');
    });
  })(req, res, next);
});

//Logout
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});


module.exports = router;

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true
        next();
    } else{
        res.redirect("/admin/login");
    }
}
