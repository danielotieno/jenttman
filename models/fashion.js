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
  brand:    {type: String},
  price:    {type: String},
  photo:    {type:String},
  desc:     { type:String},
  user:     [{type:Schema.Types.ObjectId, ref:User}]
});

FashionSchema.methods.getFashionByName = function(name, callback){
  var query = {'name': name};
  Fashion.findOne(query,callback);
};

FashionSchema.methods.slugify =  function(text) {
  return text.toString().toLowerCase()
  .replace(/\s+/g, '-')        // Replace spaces with -
  .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
  .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  .replace(/^-+/, '')          // Trim - from start of text
  .replace(/-+$/, '');         // Trim - from end of text
}; 

module.exports = mongoose.model('Fashion', FashionSchema);
