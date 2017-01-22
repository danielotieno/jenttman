var User = require('../models/user');
var Size= require('../models/size');
var Fashion= require('../models/fashion')

module.exports = {
  index : function(req, res){
    Size.find({}, function(err, size){
      if(err) res.send(err);
      res.render('admin/size/index',{
          size:size
      });
    });
  },
  new : function(req, res){
    res.render('admin/size/new');
  },

  get : function(req, res){
    Size.find({}, function(err, size){
      if(err) res.send(err);
      res.send(size);
    });
  },

  add: function(req, res){
    Fashion.findOne({n_id :req.body.id}, function(err, foundFashion){
      if(err) res.send(err);

      if(foundFashion){

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

};
