var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var Article = require('../models/Article');
var controller = require('../controllers/ArticleController');


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
  const now = Date.now();
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
    dateSent: new Date(now).toLocaleDateString()
  })
  newArticle.save();
  res.redirect('/admin');
});

// DOES NOT RENDER ARTICLE OBJECT TO CLIENT
router.get('/article/update/:id', checkAuthentication,function(req, res, next){
  const articleId = req.params.id;
  Article.findById(articleId, function(err, data){
    if (err) {
      throw err;
    }
    res.render('EditArticle', {article:data});
  });
});
// DOES NOT WORK
router.post('/article/update/:id', checkAuthentication,function(req, res, next){
  const articleId = req.params.id;
  controller.update(articleId, req.body)
    .then(function(result) {
      res.redirect('/admin');
    })
    .catch(function(err){
      res.json({
        confirmation: 'FAIL',
        message: err
      })
    })
});

router.get('/article/delete/:id', checkAuthentication,function(req, res, next){
  const articleId = req.params.id;
  Article.deleteOne({ _id: articleId}, function(err){
    if (!err) {
      res.redirect('/admin');
    } else {
      res.send({'error':'Article did not delete'});
    }
  });
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
