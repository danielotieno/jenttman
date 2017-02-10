
/*
 * Routes for rendering home index page
 */
var User = require('../models/user');
var Size= require('../models/size');
var Fashion= require('../models/fashion')
var Category = require('../models/category');

module.exports = {
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
