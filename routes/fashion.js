/*
 * Routes to deal with posting fashion to database and finding a specific fashion
 */

var Fashion = require('../models/fashion.js');
var User    = require('../models/user.js');

module.exports = {
  index : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.render('admin/index',{
          fashion:fashion
      });
    });
  },

  single : function(req, res){
    Fashion.findOne({_id:req.param.id}, function(err, fashion){
      if(err) res.send(err);
      res.render('user/item', {
        fashion:fashion
      });
    });
  },

  new : function(req, res){
    res.render('admin/new');
  },

  add : function(req, res){
    User.find({username:req.user.username}, function(err, user){
      if(err) res.send(err);

      var fashion = new Fashion();
      fashion.name = req.body.name;
      fashion.stock = req.body.stock;
      fashion.category = req.body.category;
      fashion.brand = req.body.brand;
      fashion.sizes = req.body.size;
      fashion.description = req.body.desc;
      fashion.user = user._id;
    
      console.log("event at this stage", event);

      fashion.save(function(err, fashion){
        if(err) res.send(err);

        res.redirect('/admin/index');
      });
    });
  },

  update : function(req, res){
    Fashion.findOne({_id: req.params.id}, function(err, fashion){
      if(err) res.send(err);

      var fashion = new Fashion();
      if(res.body.stock) fashion.stock = req.body.stock;
      if(req.body.desc) fashion.description = req.body.desc;
      if(req.body.brand) fashion.brand = req.body.brand;

      fashion.update(function(err){
        if(err) res.send(err);
        res.redirect('/admin/index');
      });
    });
  }
};
