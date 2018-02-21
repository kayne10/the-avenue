var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var Grid = require("gridfs-stream");
var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var upload = multer({ storage: storage }).single('blogImg');

var Article = require('../models/Article');
var Upload = require('../models/Upload');
var controller = require('../controllers/ArticleController');


// Get main admin dashboard
router.get('/', checkAuthentication,function(req, res, next) {
  Article.find({}, function(err, articles) {
    if (err) {throw err}

    Upload.find({}, function(err, images){
      if (err) {throw err}
      var mmImgs = [];
      var homeImgs = [];
      for (var i=0; i < images.length; i++){
        if(images[i].filename.includes('multi')) {
          mmImgs.push(images[i]);
        } else {
          homeImgs.push(images[i]);
        }
      }
      res.render('admin', {
        title: 'The Warm Up - Admin Center',
        articles: articles,
        homeImgs: homeImgs,
        mmImgs: mmImgs
      });
    });
  });
});

// API controller actions
router.get('/article/new', checkAuthentication,function(req, res, next){
  res.render('NewArticle', {title: 'The Warm Up - New Article'});
});

// new blog post
// Not saving file to disk correctly!!!!!!
router.post('/article/new', checkAuthentication,function(req, res){
  upload(req, res, function(err) {
    if (err) {
       return err;
    }
    console.log(req.file);
    var newArticle = new Article();
    newArticle.title = req.body.title;
    newArticle.author = req.body.author;
    newArticle.category = req.body.category;
    newArticle.imgPath = req.file.path;
    newArticle.imgFileName = req.file.filename;
    newArticle.imgOGName = req.file.originalname;
    newArticle.content = req.body.content;
    newArticle.save();
    res.redirect('/admin');
  });
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
router.post('/home/img', function(req, res){
  upload(req, res, function(err) {
    if (err) {throw err}
    var newImg = new Upload();
    newImg.filename = req.file.filename;
    newImg.originalname = req.file.originalname;
    newImg.path = req.file.path;
    newImg.save();
    res.json({
      user: req.user,
      uploadedFile: req.file,
      savedFile: newImg
    });
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
