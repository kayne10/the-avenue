var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Upload = require('../models/Upload');

/* GET home page. */


// TRY NEWEST BLOG POST
router.get('/', function(req, res, next) {
  var newestPost = Article.find().sort({_id:-1}).limit(1);
  Upload.find({}, function(err, images){
    if (err) {throw err}
    var homeSlider = [];
    images.forEach(function(image){
      if (image.filename.includes('home')) {
        homeSlider.push(image);
      }
    })
    res.render('comingSoon', {
      title: 'The Warm Up',
      images: homeSlider,
      post: newestPost
    });
  })
});

router.get('/episodes', function(req, res, next) {
  res.render('EpisodesView', { title: 'The Warm Up - Episodes' });
});

router.get('/blog', function(req, res, next) {
  const articles = Article.find().sort({_id:-1})
  if (articles.length === 0) {
    res.render('BlogView', {title: 'The Warm Up - Blog', errMessage: 'Sorry, there are no new posts up at the moment.'})
  }
  res.render('BlogView', {title: 'The Warm Up - Blog', articles: articles})
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
  Upload.find({}, function(err, images){
    if (err) {throw err}
    var multimediaSlider = [];
    images.forEach(function(image){
      if (image.filename.includes('multi')) {
        multimediaSlider.push(image);
      }
    })
    res.render('MultimediaView', { title: 'The Warm Up - Multimedia', images:multimediaSlider });
  });
});


module.exports = router;
