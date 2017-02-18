
/*
 * Routes for rendering home index page
 */
var User = require('../models/user');
var Size= require('../models/size');
var Fashion= require('../models/fashion')
var Category = require('../models/category');
var Cart= require('../models/cart')

module.exports = {

  new : function(req, res){
    res.render('pages/checkout');
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
