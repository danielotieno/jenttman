var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var User       = require('./user');

var FashionSchema = Schema({
  name : {type:String, index:true},
  stock: {type:Number},
  category: {type: String},
  brand: {type: String},
  desc:{ type:String},
  size:{type:String},
  user: [{type:Schema.Types.ObjectId, ref:User}]
});

module.exports = mongoose.model('Fashion', FashionSchema);
