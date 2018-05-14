var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var conn = mongoose.connection;
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var upload = multer({ storage: storage }).single('homeImg');

var Upload = require('../models/Upload');


// Get main admin dashboard
router.get('/', checkAuthentication,function(req, res, next) {
  res.send('This is the page route handler for home IMAGES');
});


//upload home img
router.post('/img', function(req, res){
  upload(req, res, function(err) {
    if (err) {throw err}
    var newImg = new Upload();
    newImg.filename = req.file.filename;
    newImg.originalname = req.file.originalname;
    newImg.path = req.file.path;
    newImg.save();
    res.redirect('/admin');
  });
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
