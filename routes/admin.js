var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var UPLOAD_PATH = path.resolve(__dirname, '../public/images')
var upload = multer({
  dest: 'images/',
  limits: {fileSize: 1000000, files: 5}
})

var Article = require('../models/Article');
var Upload = require('../models/Upload');
var controller = require('../controllers/ArticleController');


// Get main admin dashboard
router.get('/', checkAuthentication,function(req, res, next) {
  Article.find({}, function(err, articles) {
    if (err) {throw err}

    Upload.find({}, function(err, images){
      if (err) {throw err}
      res.render('admin', {
        title: 'The Warm Up - Admin Center',
        articles: articles,
        images: images
      });
    });
  });
});

// API controller actions
router.get('/article/new', checkAuthentication,function(req, res, next){
  res.render('NewArticle', {title: 'The Warm Up - New Article'});
});

// new blog post
router.post('/article/new', checkAuthentication, upload.any(),function(req, res, next){
  const now = Date.now();
  const image = req.files.map((file) => {
    return {
      imgPath: file.path
    }
  })
  console.log(image);
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
    imgPath: image.imgPath,
    dateSent: new Date(now).toLocaleDateString()
  })
  newArticle.save();
  res.redirect('/admin');
});

// view post by ID for update request
router.get('/article/update/:id', checkAuthentication,function(req, res, next){
  const articleId = req.params.id;
  Article.findById(articleId, function(err, data){
    if (err) {
      throw err;
    }
    res.render('EditArticle', {article:data});
  });
});

// blog POST update
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

// delete blog post by ID
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

//upload home img
router.post('/home/file', checkAuthentication, upload.any(),function(req, res, next){
  const images = req.files.map((file) => {
    return {
      filename: file.filename,
      originalname: file.originalname,
      path: file.path
    }
  })
  Upload.insertMany(images, (err, result) => {
    if (err) return res.sendStatus(404)
    res.json(result)
  })
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
