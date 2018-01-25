var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Warm Up' });
});

router.get('/episodes', function(req, res, next) {
  res.render('EpisodesView', { title: 'The Warm Up - Episodes' });
});

router.get('/blog', function(req, res, next) {
  res.render('BlogView', { title: 'The Warm Up - Blog' });
});

router.get('/multimedia', function(req, res, next) {
  res.render('MultimediaView', { title: 'The Warm Up - Multimedia' });
});


module.exports = router;
