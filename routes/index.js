var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Avenue' });
});

router.get('/podcasts', function(req, res, next) {
  res.render('PodcastsView', { title: 'The Avenue' });
});

router.get('/pop-culture', function(req, res, next) {
  res.render('PopCultureView', { title: 'The Avenue' });
});

router.get('/music', function(req, res, next) {
  res.render('MusicView', { title: 'The Avenue' });
});

router.get('/about', function(req, res, next) {
  res.render('AboutView', { title: 'The Avenue' });
});

module.exports = router;
