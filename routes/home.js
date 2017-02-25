
/*
 * Routes for rendering home index page
 */

var Fashion = require('../models/fashion.js');
var Category = require('../models/category.js');

module.exports = {
  index : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);

      res.render('pages/index',{
          fashion : fashion
      });
    });
  },

  categories : function(req, res){
    Category.findOne({name:req.params.category}, function(err, foundCategory){
    console.log(req.params.category);
        if(err) res.send(err);
        if(foundCategory){
            console.log(foundCategory);
            Fashion.find({category:foundCategory._id}, function(err, fashion){
                console.log(fashion);
                res.render('pages/categories',{
                    fashion : fashion
                });
            });
        }else{
            res.send("no category was found");
        }
    });
  }
};
