var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Upload = require('../models/Upload');

/* GET home page. */


// DOES NOT DISPLAY PHOTOS CORRECTLY!!!!!
// TRY RENDERING HOME IMAGES ONLY and NEWEST BLOG POST
router.get('/', function(req, res, next) {
  Upload.find({}, function(err, images){
    if (err) {throw err}
    res.render('index', {
      title: 'The Warm Up',
      images: images
    });
  });
});

router.get('/episodes', function(req, res, next) {
  res.render('EpisodesView', { title: 'The Warm Up - Episodes' });
});

router.get('/blog', function(req, res, next) {
  Article.find({}, function(err, data){
    if (err) {
      throw err;
    }
    res.render('BlogView', { title: 'The Warm Up - Blog', articles: data });
  });
});

router.get('/blog/:title', function(req, res, next) {
  const articleTitle = req.params.title;
  Article.findOne({title: articleTitle}, function(err, data){
    if (err) {
      throw err;
    }
    res.render('BlogArticleView', {article: data})
  });
});

router.get('/multimedia', function(req, res, next) {
  res.render('MultimediaView', { title: 'The Warm Up - Multimedia' });
});


module.exports = router;
