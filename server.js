var express = require('express');
var app = express();
var path = require('path');
var util = require('util');
var mongodb =  require('mongodb');
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var engine = require('ejs-mate');
var ejs = require('ejs');
var qs = require('query-string');
var url = require('url');
var base64url = require('base64url');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongostore = require('connect-mongo')(session);
var bcrypt = require('bcryptjs');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');

var env = process.env.NODE_ENV || 'development';


require('dotenv').config({silent: true})

var db = require('./config/setting');
mongoose.connect(db.getDB(env));

require('./config/passport.js')(passport);

// set static folder
app.use(express.static(__dirname + '/assets'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/uploads', express.static('uploads'));

app.use(session({
  resave    : true,
  saveUninitialized:true,
  secret  :db.getSecret(env),
  store   : new mongostore({ url :db.getDB(env), autoReconnect:true})
}));

//Create EJS Engine view
app.set('view engine', 'html');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(passport.initialize());

app.use(passport.session());

//body-parser and cokie-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(morgan('dev'));


app.use(flash());

app.use(function(req,res,next){
  res.locals.user   = req.user;
  res.locals.message = req.flash();
  next();
});


var routes = require('./routes/index.js');
app.use(routes);

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
  console.log("connected to mongo ", db.getDB(env));
  console.log('Hurray am running on port ' + app.get('port'))
});
