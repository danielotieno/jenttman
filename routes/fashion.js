/*
 * Routes to deal with posting fashion to database and finding a specific fashion
 */

var Fashion  = require('../models/fashion');
var User     = require('../models/user');
var Category = require('../models/category');
var Size     = require('../models/size');

module.exports = {
  index : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.render('admin/dashboard',{
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
    Category.findOne({name:req.body.category}, function(err, foundCategory){    
      if(err) res.send(err);
      if(foundCategory){
        User.findOne({username:req.body.username}, function(err, foundUser){
          if(err) res.send(err);

          console.log(foundCategory);
          //console.log(user);

          var fashion      = new Fashion();
          fashion.name     = req.body.name;
          fashion.stock = req.body.stock;
          fashion.category = foundCategory._id;
          fashion.brand    = req.body.brand;
          fashion.size = req.body.size;
          fashion.desc = req.body.desc;
          fashion.slug  = req.params.slug;
          fashion.user     = req.body._id;
        
          console.log("fashion at this stage", fashion);
         
          fashion.save(function(err, fashion){
            if(err) res.send(err);

            res.redirect('/admin/fashions');
          });
        });
      }
      else{
        res.send("Category does not exist in db and I believe you are better than this");
      }
    });
  },

  addsize: function(req, res){
    Fashion.findOne({name :req.body.fashion}, function(err, foundFashion){
      if(err) res.send(err);

      if(foundFashion){

        var Size = new Size();
        size.name = req.body.name;
        size.stock = req.body.stock;
        size.fashion = foundFashion._id;

        size.save(function(err, size){
          if(err) res.send(err);

          res.send("size added successfully");
        });
      }
      else{
        res.send("fashion does not exist so fuck off dude");
      }

    });
  },

   delete : function(req, res){
      Fashion.remove({  
      }, function(err, fashions) {
        if (err)
          res.send(err);
        console.log('fashion delete');
       res.redirect('/admin/fashions');
      });
    },

    edit : function(req, res){
      Fashion.findOne({ slug : req.params.slug },function (err, fashion){
        if(err) return err;
        var message = '';
        res.render('admin/edit', {
            title   : "update",
            page    : "fashion"
        });
      });
    },


  update : function(req, res, next){
    Fashion.findOne({slug : req.body.slug}, function(err, fashion){
     
      if(err) return next(err);
      if(req.body.name) fashion.name = req.body.name;
      if(req.body.stock) fashion.stock = req.body.stock;
      //if(req.body.category) fashion.category = foundCategory._id;
      if(req.body.size) fashion.size = req.body.size;
      if(req.body.desc) fashion.desc = req.body.desc;
      if(req.body.brand) fashion.brand = req.body.brand;

      console.log("fashion up", fashion);
      
      fashion.save(function(err, fashion){
        if(err) return next(err);
        res.redirect('/admin/fashions');
      });
    });
  }
};
