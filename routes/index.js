var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Warm Up' });
});

router.get('/podcasts', function(req, res, next) {
  res.render('PodcastsView', { title: 'The Warm Up' });
});

router.get('/pop-culture', function(req, res, next) {
  res.render('PopCultureView', { title: 'The Warm Up' });
});

router.get('/music', function(req, res, next) {
  res.render('MusicView', { title: 'The Warm Up' });
});

router.get('/about', function(req, res, next) {
  res.render('AboutView', { title: 'The Warm Up' });
});

module.exports = router;
