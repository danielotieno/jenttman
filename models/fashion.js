var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var User       = require('./user');
var Category   = require('./category');

var FashionSchema = Schema({
  name : {type:String, index:true},
  stock: {type:Number},
  category: [{type: Schema.Types.ObjectId, ref:Category}],
  brands: {type: String},
  description:{ type:String},
  sizes:{type:String},
  user: [{type:Schema.Types.ObjectId, ref:User}]
});

module.exports = mongoose.model('Fashion', FashionSchema);
