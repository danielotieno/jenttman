var User = require('../models/user');
var Size= require('../models/size');

module.exports = {
  index : function(req, res){
    Size.find({}, function(err, size){
      if(err) res.send(err);
      res.render('admin/size',{
          size:size
      });
    });
  },
  new : function(req, res){
    res.render('admin/size');
  },

  get : function(req, res){
    Size.find({}, function(err, size){
      if(err) res.send(err);
      res.send(size);
    });
  },

  add : function(req, res){
    Size.findOne({name:req.body.size}, function(err, foundSize){
      if(err) res.send(err);
      if(foundSize) res.send("Size already exists idiot");
      else{
        var size = new Size();
        size.name = req.body.name;
        size.stock = req.body.stock;

        size.save(function(err, size){
          if(err) res.send(err);
          
          //res.flash('message', 'size saved successfully');
          res.redirect('/admin/another');
        });
      }
    });
  }
};
