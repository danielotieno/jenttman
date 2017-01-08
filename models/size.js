var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Fashion = require('./fashion');

var SizeSchema = Schema({
  name:{type:String},
  stock:{type:Number},
  fashion:[{type:Schema.Types.ObjectId, ref:Fashion}]
});

module.exports = mongoose.model('Size', SizeSchema);
