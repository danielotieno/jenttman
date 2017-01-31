/*
 * Routes to deal with posting fashion to database and finding a specific fashion
 */

var Fashion  = require('../models/fashion');
var User     = require('../models/user');
var Category = require('../models/category');
var Size     = require('../models/size');

module.exports = {
  //route to view template with fashions already in the system
  /*index : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.render('admin/index',{
          fashion:fashion
      });
    });
  },*/

  index : function(req, res){
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
      res.render('admin/index',{
          fashion:fashion
      });
    });
  },
  //route to get all fashion in the database to the browser
  get : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.send(fashion);
    });
  },

  //serves both admin and normal user, view description of specific fashion
  single : function(req, res){
    Fashion.findOne({_id:req.params.id}, function(err, fashion){
      if(err) res.send(err);
      res.render('admin/fashion/item', {
        fashion:fashion
      });
    });
  },

  new : function(req, res){
    Category.find({}, function(err, category){
      if(err) res.send(err);
      res.render('admin/fashion/new',{
        category:category
      });
    });
  },

  add : function(req, res,next){
    Category.findOne({name:req.body.category}, function(err, foundCategory){    
      if(err) res.send(err);
      if(foundCategory){
        User.findOne({username:req.body.username}, function(err, foundUser){
          if(err) res.send(err);

          console.log(foundCategory);
          //console.log(user);

          var fashion      = new Fashion();
          fashion.name     = req.body.name;
          fashion.category = foundCategory._id;
          fashion.brand    = req.body.brand;
          fashion.desc = req.body.desc;
          fashion.photo = req.file.path;
          //fashion.slug  = req.params.slug;
          //fashion.user     = req.body._id;
        
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
    Fashion.findOne({_id:req.params.id}, function(err, fashion){
      if(err) res.send(err);

      if(fashion){
        fashion.remove({}, function(err, fashions) {
          if (err) res.send(err);
            console.log('fashion delete');
            res.redirect('/admin/fashions');
          });
        }else{
          res.send("sms the guy that made the system and tell him his an idiot");
        }
    });
  },

    edit : function(req, res){
      Fashion.findOne({ _id : req.params.id },function (err, fashion){
        if(err) return err;
        var message = '';
        res.render('admin/fashion/edit', {
            title   : "update",
            fashion : fashion
        });
      });
    },


  update : function(req, res, next){
    Fashion.findOne({_id : req.body.fashionid}, function(err, fashion){
     
      if(err) return next(err);
      if(req.body.name) fashion.name   = req.body.name;
      if(req.body.desc) fashion.desc   = req.body.desc;
      if(req.body.brand) fashion.brand = req.body.brand;

      fashion.save(function(err, fashion){
        if(err) return next(err);
        res.redirect('/admin/fashions');
      });
    });
  }
};
