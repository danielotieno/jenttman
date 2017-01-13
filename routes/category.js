var User     = require('../models/user');
var Category = require('../models/category');

module.exports = {
  index : function(req, res){
      //route should assist viewing and getting categories in the db and displaying in template form
    Category.find({}, function(err, category){
      if(err) res.send(err);
      res.render('admin/category/index',{
          category:category
      });
    });
  },

  new : function(req, res){
    //route should give template to add categories to db
    res.render('admin/category/new');
  },

  get : function(req, res){
    //route should send categories to front page
    Category.find({}, function(err, categories){
      if(err) res.send(err);
      res.send(categories);
    });
  },

  delete : function(req, res){
    //route should delete category according to id
    Category.findOne({_id:req.params.id}, function(err, category){
      if(err) res.send(err);
      if(category){
        category.remove(function(err){
          if(err) res.send(err);
          res.redirect('/admin/category/index');
        });
      }else{
        res.send("can't delete category not in the system");
      }
    });
  },

  add : function(req, res){
    //route for adding category to database which first checks to avoid duplication
    Category.findOne({name:req.body.category}, function(err, foundCategory){
      if(err) res.send(err);
      if(foundCategory){ 
        res.send("category already exists idiot");
        console.log(foundCategory);
      }
      else{
        var category = new Category();
        category.name = req.body.category;

        category.save(function(err, category){
          if(err) res.send(err);
          
          //res.flash('message', 'Category saved successfully');
          res.redirect('/admin/category/index');
        });
      }
    });
  }
};
