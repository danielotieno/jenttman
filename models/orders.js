/*
 * Fill in fashions that the website has in stock
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var User     = require('./user');
var Category = require('./category');
var Size     = require('./size');
var Sesscart = require('./sesscart');
var Fashion  = require('./fashion')

var OrderSchema = Schema({
  fname:       {type:String, index:true},
  lname:       {type: String},
  companyname: {type: String},
  email:       {type: String},
  country:     {type:String},
  address:     {type:String},
  town:        {type:String},
  county:      {type:String},
  postalcode:  {type: Number},
  fashion:[{type:Schema.Types.ObjectId, ref:Fashion}],
  user:     [{type:Schema.Types.ObjectId, ref:User}]
});

OrderSchema.methods.getOrderByEmail = function(email, callback){
  var query = {'email': email};
  Order.findOne(query,callback);
};

OrderSchema.methods.slugify =  function(text) {
  return text.toString().toLowerCase()
  .replace(/\s+/g, '-')        // Replace spaces with -
  .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
  .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  .replace(/^-+/, '')          // Trim - from start of text
  .replace(/-+$/, '');         // Trim - from end of text
}; 

module.exports = mongoose.model('Order', OrderSchema);
