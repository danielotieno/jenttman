var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');

var CartSchema =  Schema( {
  user_id  : [{type: Schema.Types.ObjectId, ref:User }],
  Items


