var User = require('../models/user');
var Category = require('../models/category');

module.exports = {
  new : function(req, res){
    res.render('admin/category');
  },

  get : function(req, res){
    Category.find({}, function(err, categories){
      if(err) res.send(err);
      res.send(categories);
    });
  },

  add : function(req, res){
    Category.findOne({name:req.body.category}, function(err, foundCategory){
      if(err) res.send(err);
      if(foundCategory) res.send("category already exists idiot");
      else{
        var category = new Category();
        category.name = req.body.category;

        category.save(function(err, category){
          if(err) res.send(err);
          
          res.flash('message', 'Category saved successfully');
          res.redirect('/admin/index/add');
        });
      }
    });
  }
};
