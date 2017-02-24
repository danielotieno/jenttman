/*
 * Routes to deal with posting fashion to database and finding a specific fashion
 */

var Fashion  = require('../models/fashion');
var User     = require('../models/user');
var Category = require('../models/category');
var Size     = require('../models/size');
var Cart= require('../models/cart')
var Sesscart = require('../models/sesscart');
var Orders     = require('../models/orders');

module.exports = {
  //route to view template with fashions already in the system

order : function(req, res){
    Fashion.find({}, function(err, Fashion){
      if(err) res.send(err);
      var cart = new Sesscart(req.session.cart);
      res.render('pages/billing',{
          products:cart.generateArray(),
          totalPrice:cart.totalPrice
      });
    });
  },

  billing : function(req, res,next){
        User.findOne({username:req.body.username}, function(err, foundUser){
          if(err) res.send(err);

          var orders      = new Orders();
          orders.fname    = req.body.fname;
          orders.lname    = req.body.lname;
          orders.companyname    = req.body.companyname;
          orders.email   = req.body.email;
          orders.country    = req.body.country;
          orders.address= req.body.address;
          orders.town= req.body.town;
          orders.county= req.body.county;
          orders.postalcode  = req.body.postalcode;

          console.log("orders at this stage", orders);
         
          orders.save(function(err, orders){
            if(err) res.send(err);

            res.redirect('/payment/:id');
          });
        });
    
  },


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
