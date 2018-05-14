var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var validator = require('express-validator');

// Load config files
var config = require('./config/main');
var dbUrl = config.database;

//db options
let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };
//connect to mongo
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('connected', function() {
  console.log('mongoDB is connected');
});


//Load passport middleware
require('./config/passport');

var index = require('./routes/index');
var adminRoutes = require('./routes/admin');
var postHomeImg = require('./routes/homeImg');
var postMultiImg = require('./routes/multimediaImg');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(session({
  secret: 'hhsssaaddjklsdf97sasert43g',
  saveUninitialized: true,
	resave: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// load passport strategies
// const localSignupStrategy = require('./config/passport/local-signup');
// const localLoginStrategy = require('./config/passport/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// load static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', adminRoutes);
app.use('/home', postHomeImg);
app.use('/multimedia', postMultiImg);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
