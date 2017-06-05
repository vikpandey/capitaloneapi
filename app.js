var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
//var MongoClient = require('mongodb').MongoClient;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// Mongoose connection

var url = 'mongodb://vikas:abcd1234@ds111262.mlab.com:11262/capitalone';
mongoose.connect(url);
var db1 = mongoose.connection;
//mongoose.connection();
db1.on('error', console.error.bind(console, 'connection error:'));
db1.once('open', function callback() {
  console.log("Initializing mongoose......");
});

// MongoDB store to store the session information of users
var collection = 'session';
var mongoStore = new MongoDBStore({
  uri : url,
  collection : collection,
  autoReconnect : true
});

// Catch mongoStore connection error
mongoStore.on('error', function (error) {
  assert.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
  });
});





app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.raw({extended : true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.static(__dirname));
//app.use(flash());

var routes = require('./routes/index');
var users = require('./routes/users');


app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
