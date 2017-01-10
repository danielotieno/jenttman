/*
 * Fill in fashions that the website has in stock
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var User     = require('./user');
var Category = require('./category');
var Size     = require('./size');

var FashionSchema = Schema({
  name:     {type:String, index:true},
  category: [{type: Schema.Types.ObjectId, ref:Category}],
  brand:   {type: String},
  slug  : {type : String, default : ""},
  desc:     { type:String},
  user:     [{type:Schema.Types.ObjectId, ref:User}]
});

module.exports = mongoose.model('Fashion', FashionSchema);
