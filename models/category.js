var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var CategorySchema = Schema({
  name:{type:String},
  User: [{type : Schema.Types.ObjectId, ref:User }]
});

module.exports = mongoose.model('Category', CategorySchema);
