
/*
 * Routes for rendering home index page
 */
var User = require('../models/user');
var Size= require('../models/size');
var Fashion= require('../models/fashion')
var Category = require('../models/category');
var Cart= require('../models/cart')
var Sesscart = require('../models/sesscart');

module.exports = {

  new : function(req, res){
    if(!req.session.cart){
      return res.render('pages/checkout', {products:null, totalPrice:'0'});
    }
    var cart = new Sesscart(req.session.cart);
    console.log(cart.generateArray());
    res.render('pages/checkout', {products:cart.generateArray(), totalPrice:cart.totalPrice});
  },

  addtocart: function(req, res, next){
    var size_id = req.params.size_id;
    var fashion_id = req.params.fashion_id;
    var sesscart = new Sesscart(req.session.cart? req.session.cart : {items:{}});

    Size.findById(size_id, function(err, size){
      if(err) return err;

      Fashion.findOne({_id:size.fashion}, function(err, fashion){
        if(err) return err;
        console.log(size._id+ " " +fashion.price);

        sesscart.add(size._id, size.name, fashion.price, fashion._id, fashion.name, fashion.photo);
        req.session.cart = sesscart;
        console.log(req.session.cart);
        res.redirect('/fashion/item/'+fashion_id);
      });
    });
  },

  addqtytocart : function(req, res, next){
    var size_id = req.params.size_id;
    var sesscart = new Sesscart(req.session.cart);

    Size.findById(size_id, function(err, size){
      if(err) return(err);

      Fashion.findOne({_id:size.fashion}, function(err, fashion){
        if(err) return(err);

        console.log(size._id+ " " +fashion.price);
        sesscart.addqty(size._id, fashion.price);
        req.session.cart = sesscart;
        res.redirect('/fashion/checkout');
      });
    });
  },

  removeonefromcart: function(req, res, next){
    var size_id = req.params.size_id;
    var sesscart = new Sesscart(req.session.cart);
    Size.findById(size_id, function(err, size){
      if(err) return err;

      Fashion.findOne({_id:size.fashion}, function(err, fashion){
        if(err) return err;
        console.log(size._id+ " " +fashion.price);
        sesscart.remove(size._id, fashion.price);
        req.session.cart = sesscart;
        res.redirect('/fashion/checkout');
      });
    });
  },

  removecartobject: function(req, res, next){
    var size_id = req.params.size_id;
    var sesscart = new Sesscart(req.session.cart);

    sesscart.removeobject(size_id);
    req.session.cart = sesscart;
    res.redirect('/fashion/checkout');
  },

  add: function(req, res){
    Fashion.findOne({_id :req.body.id}, function(err, foundFashion){
      if(err) res.send(err);

      if(foundFashion){
        console.log(foundFashion);
        cart.quantity = req.body.quantity;
        cart.size     = foundFashion._id;
        cart.fashion  = foundFashion._id;

        cart.save(function(err, cart){
          if(err) res.send(err);

          console.log("cart added successfully");
          res.redirect('/pages/cart')

        });
      }
      else{
        res.send("fashion does not exist so fuck off dude");
      }

    });
  },

  //serves normal users to view various sizes of clothes in the db
  item : function(req, res){
    Fashion.findOne({_id:req.params.id}, function(err, fashion){
      if(err) res.send(err);

      if(fashion){
        Size.find({fashion:fashion._id}, function(err, sizes){
          if(err) res.send(err);
          if(sizes){
            res.render('pages/cart',{
              fashion:fashion,
              sizes:sizes
            });
          }else{
            res.send("looks like you dont have any sizes in the database");
          }
        });
      }else{
        res.send("please call system admin to confirm some petty issues");
      }
    });
  },
  pay : function(req, res){
    Fashion.findOne({_id:req.params.id}, function(err, fashion){
      if(err) res.send(err);

      if(fashion){
        Size.find({fashion:fashion._id}, function(err, sizes){
          if(err) res.send(err);
          if(sizes){
            res.render('pages/pay',{
              fashion:fashion,
              sizes:sizes
            });
          }else{
            res.send("looks like you dont have any sizes in the database");
          }
        });
      }else{
        res.send("please call system admin to confirm some petty issues");
      }
    });
  },
};
