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

  delete : function(req, res){
    //route should delete category according to id
    Size.findOne({_id:req.params.id}, function(err, size){
      if(err) res.send(err);
      if(size){
        size.remove(function(err){
          if(err) res.send(err);
          res.redirect('/admin/size/index');
        });
      }else{
        res.send("can't delete category not in the system");
      }
    });
  },

  add: function(req, res){
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

};
