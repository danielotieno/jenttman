var express = require('express');
var app = express();
var util = require('util'); 
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var connect = require('connect');
var qs = require('query-string');
var url = require('url');
var base64url = require('base64url');

var upload = multer({ dest: 'uploads/' });
var bcrypt = require('bcryptjs');
var expressvalidator = require('express-validator');