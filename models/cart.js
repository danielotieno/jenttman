/*
 * cart schema to pick order from customers
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');
var Fashion = require('./fashion.js');

var CartSchema =  Schema( {
  user_id  : [{type: Schema.Types.ObjectId, ref:User }],
  Items_id:  [{type: Schema.Types.ObjectId, ref:Fashion }]
});

module.exports = mongoose.model('Cart', CartSchema);


