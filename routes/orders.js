/*
 * Routes to deal with posting fashion to database and finding a specific fashion
 */

var Fashion  = require('../models/fashion');
var User     = require('../models/user');
var Category = require('../models/category');
var Size     = require('../models/size');

module.exports = {
  //route to view template with fashions already in the system
  index : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.render('admin/order/new',{
          fashion:fashion
      });
    });
  },

  //route to get all fashion in the database to the browser
  sold : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.render('admin/order/sold');
    });
  },

  awaiting : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.render('admin/order/awaiting');
    });
  },


  product : function(req, res){
    Fashion.aggregate([{
      $lookup:
      {
        from:'categories',
        localField:'category',
        foreignField:'_id',
        as:'categoryname'
      }
    }], function(err, fashion){
      if(err) res.send(err);
      console.log(fashion.categoryname);
      //res.send(fashion);
      res.render('admin/product',{
          fashion:fashion
      });
    });
  },

};
