var express = require('express');
var app = express();

var path = require('path');
var util = require('util');
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var qs = require('query-string');
var url = require('url');
var base64url = require('base64url');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongostore = require('connect-mongo')(session);

var bcrypt = require('bcryptjs');
var expressvalidator = require('express-validator');

//var db = require('./config/database.js');
//mongoose.connect(db.url);

// set static folder
app.use(express.static(__dirname + '/assets'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/uploads', express.static('uploads'));



//Create EJS Engine view
app.set('view engine', 'ejs');


//body-parser and cokie-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));




app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function()
{
	console.log('Hurray am running on port ' + app.get('port'))
	});
