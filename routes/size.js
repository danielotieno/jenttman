var User = require('../models/user');
var Size= require('../models/size');
var Fashion= require('../models/fashion')

module.exports = {
  index : function(req, res){
    Size.find({fashion:req.params.fashion_id}, function(err, size){
      if(err) res.send(err);
      res.render('admin/size/index',{
          size:size
      });
    });
  },
  new : function(req, res){
    res.render('admin/size/new',{
      id:req.params.id
    });
  },

  get : function(req, res){
    Size.find({}, function(err, size){
      if(err) res.send(err);
      res.send(size);
    });
  },

  add: function(req, res){
    Fashion.findOne({_id :req.body.id}, function(err, foundFashion){
      if(err) res.send(err);

      if(foundFashion){
        console.log(foundFashion);

        var size = new Size();
        size.name = req.body.name;
        size.stock = req.body.stock;
        size.fashion = foundFashion._id;

        size.save(function(err, size){
          if(err) res.send(err);

          console.log("size added successfully");
          res.redirect('/admin/size/index')
 
        });
      }
      else{
        res.send("fashion does not exist so fuck off dude");
      }

    });
  },

  edit : function(req, res){
    Size.findOne({ _id : req.params.id },function (err, size){
      if(err) return err;
      var message = '';
      res.render('admin/size/edit', {
          title   : "update",
          size : size
      });
    });
  },

  update : function(req, res, next){
    Size.findOne({_id : req.body.sizeid}, function(err, size){
     
      if(err) return next(err);
      if(req.body.name) size.name   = req.body.name;
      if(req.body.desc) size.stock   = req.body.stock;

      size.save(function(err, size){
        if(err) return next(err);
        res.redirect('/admin/size/index');
      });
    });
  }

};
