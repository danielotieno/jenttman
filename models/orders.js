var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var User     = require('./user');

var Schema = new Schema({
  user : {type: Schema.Types.ObjectId, ref:'User'},
  cart : {type: Object, required:true},
});

module.exports = mongoose.model('Order', Schema);
