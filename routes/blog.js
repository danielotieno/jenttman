var User     = require('../models/user');
var Blog     = require('../models/blog');
var cloudinary = require('cloudinary');

module.exports = {
  index : function(req, res){
      //route should assist viewing and getting blog in the db and displaying in template form
    Blog.find({}, function(err, blog){
      if(err) res.send(err);
      res.render('admin/blog/index',{
          blog:blog
      });
    });
  },

  blog : function(req, res){
     Blog.find({}, function(err, blog){
      if(err) res.send(err);
      res.render('pages/blog',{
        blog:blog
      });
     });
  },

  blog_single : function(req, res){
     Blog.find({}, function(err, blog){
      if(err) res.send(err);
      res.render('pages/blog_single',{
        blog:blog
      });
     });
  },
  
  new : function(req, res){
    //route should give template to add blog to db
    res.render('admin/blog/new');
  },

  item : function(req, res){
    Blog.findOne({_id:req.params.id}, function(err, blog){
      if(err) res.send(err);
            res.render('pages/blog_single',{
              blog:blog
            });
        });
  },

  get : function(req, res){
    //route should send blogs to front page
    Blog.find({}, function(err, blogs){
      if(err) res.send(err);
      res.send(blogs);
    });
  },

  delete : function(req, res){
    //route should delete category according to id
    Blog.findOne({_id:req.params.id}, function(err, blog){
      if(err) res.send(err);
      if(blog){
        blog.remove(function(err){
          if(err) res.send(err);
          res.redirect('/admin/blog/index');
        });
      }else{
        res.send("can't delete blog not in the system");
      }
    });
  },

   edit : function(req, res){
      Blog.findOne({ _id : req.params.id },function (err, blog){
        if(err) return err;
        var message = '';
        res.render('admin/blog/edit', {
            title   : "update",
            blog    : blog
        });
      });
    },


  update : function(req, res, next){
   Blog.findOne({_id : req.body.blogid}, function(err, blog){
     
      if(err) return next(err);
      if(req.body.title) blog.name     = req.body.name;
      if(req.body.content) blog.desc   = req.body.desc;

      blog.save(function(err, blog){
        if(err) return next(err);
        res.redirect('/admin/blog/index');
      });
    });
  },

  updateimage : function(req, res, next){
    Blog.findOne({_id:req.body.blogid}, function(err, blog){
      console.log(req.file);
      if(err) return next(err);

      cloudinary.uploader.upload(req.file.path, function(result){
        blog.photo = result.url;

        blog.save(function(err, blog){
          if(err) return next(err);
          res.redirect('/admin/blog/index');
        });
      });
    });
  },

  add : function(req, res){
    //route for adding category to database which first checks to avoid duplication
    Blog.findOne({name:req.body.title}, function(err, foundBlog){
      if(err) res.send(err);
      if(foundBlog){
        res.send("blog already exists");
        console.log(foundBlog);
      }
      else{
        var blog     = new Blog();
        blog.title   = req.body.title;
        blog.content = req.body.content;
        //blog.photo   = result.url;
        
        blog.save(function(err, blog){
          if(err) res.send(err);

          //res.flash('message', 'Category saved successfully');
          res.redirect('/admin/blog/index');
        });
      }
    });
  }
};
