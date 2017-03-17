/*
 * Category schema to fill the categories that the website is selling
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var BlogSchema = Schema({
  title  :{type:String},
  photo  :{type:String},
  content:{type:String},
  timestamps   :{type:Date},
  User   :[{type : Schema.Types.ObjectId, ref:User }]
});

module.exports = mongoose.model('Blog', BlogSchema);
