var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var FashionSchema = Schema({
  name : {type:String, index:true},
  stock: {type:Number},
  category: {type: String},
  brands: {type: String},
  description:{ type:String},
  sizes:{type:String}
});

module.exports = mongoose.model('Fashion', FashionSchema);
