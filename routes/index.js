var express = require('express');
var router = express.Router();

//var Fashion = require('./fashion');
var Home = require('./home');
//var Session = require('./session');
//var User = require('./users');

/*
 * INDEX PAGE ROUTES
 */

router.get('/',    Home.index);

module.exports = router;

