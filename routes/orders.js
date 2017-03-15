/*
 * Routes to deal with posting fashion to database and finding a specific fashion
 */

var Fashion  = require('../models/fashion');
var User     = require('../models/user');
var Category = require('../models/category');
var Size     = require('../models/size');
var Cart= require('../models/cart')
var Sesscart = require('../models/sesscart');
var Order     = require('../models/orders');

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
          console.log(req.body);
          if(err) res.send(err);

          var user      = new User();
          user.fname    = req.body.fname;
          user.lname    = req.body.lname;
          user.companyname    = req.body.companyname;
          user.email   = req.body.email;
          user.country    = req.body.country;
          user.address= req.body.address;
          user.town= req.body.town;
          user.county= req.body.county;
          user.postalcode  = req.body.postalcode;

          console.log("orders at this stage", user);
          req.session.email = req.body.email;

          user.save(function(err, user){
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

  postorder : function(req, res, next){
    var cart = req.session.cart;
    console.log(cart);
    var order = new Order();
    order.cart = cart;

    order.save(function(err, order){
      if(err) return err;
      req.flash('message', 'successfully bought items');
      req.session.cart = null;
      res.redirect('/');
    });
  }

};
