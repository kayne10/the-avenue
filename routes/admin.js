var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var Article = require('../models/Article');


// Get main admin dashboard
router.get('/', checkAuthentication,function(req, res, next) {
  Article.find({}, function(err, articles) {
    if (err) {throw err}
    res.render('admin', {
      title: 'The Warm Up - Admin Center',
      articles: articles
    });
  });
});

// API controller actions
router.get('/article/new', checkAuthentication,function(req, res, next){
  res.render('NewArticle', {title: 'The Warm Up - New Article'});
});
router.post('/article/new', checkAuthentication,function(req, res, next){
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
    dateSent: Date.now()
  })
  newArticle.save();
  res.json(newArticle);
});

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
