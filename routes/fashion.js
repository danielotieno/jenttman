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
    res.render('admin/index');
  },

  add : function(req, res){
    User.findOne({username:req.body.username}, function(err, user){
      if(err) res.send(err);

      var fashion = new Fashion();
      fashion.name = req.body.name;
      fashion.stock = req.body.stock;
      fashion.category = req.body.category;
      fashion.brand = req.body.brand;
      fashion.size = req.body.size;
      fashion.desc = req.body.desc;
     // fashion.user = req.body._id;
    
      console.log("fashion at this stage", fashion);

     
      fashion.save(function(err, fashion){
        if(err) res.send(err);

        res.redirect('/admin/create');
      });
    });
  },

   delete : function(req, res){
      Fashion.remove({
          slug : req.params.slug 
      }, function(err, events) {
        if (err)
          res.send(err);
        console.log('fashion delete');
       res.redirect('/admin/index/delete');
      });
    },

  update : function(req, res, next){
    Fashion.findOne({_id: req.params.id}, function(err, fashion){
      if(err) res.send(err);

      var fashion = new Fashion();
      if(res.body.name) fashion.name = req.body.name;
      //if(res.body.stock) fashion.stock = req.body.stock;
      if(res.body.category) fashion.category = req.body.category;
      if(res.body.size) fashion.size = req.body.size;
      if(req.body.desc) fashion.description = req.body.desc;
      if(req.body.brand) fashion.brand = req.body.brand;

      fashion.update(function(err){
        if(err) res.send(err);
        res.redirect('/admin/update');
      });
    });
  }
};
