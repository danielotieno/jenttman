/*
 * cart schema to pick order from customers
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');
var Size = require('./size.js');
var Fashion = require('./fashion');

var CartSchema =  Schema( {
  user_id : [{type: Schema.Types.ObjectId, ref:User }],
  Item_id : [{type:Schema.Types.ObjectId, ref:Fashion}],
});

module.exports = mongoose.model('Cart', CartSchema);


