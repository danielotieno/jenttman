
/*
 * Routes for rendering home index page
 */

var Fashion    = require('../models/fashion.js');
var Category   = require('../models/category.js');
var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
var env = process.env.NODE_ENV || 'development'; 
var secrets = require('../config/setting.js');

var transporter = nodemailer.createTransport(({
  service : "Gmail",
  auth : {
    user : secrets.getEmail(env),
    pass : secrets.getPassword(env)
  }
}));

module.exports = {
  index : function(req, res){
    Fashion.find({'trending':'true'}, function(err, fashion){
      if(err) res.send(err);

      res.render('pages/index',{
          fashion : fashion
      });
    });
  },

  about : function(req, res){
      res.render('pages/about')
  },

  contact : function(req, res){
      res.render('pages/contact')
  },


  mailer : function(req, res, next){
    req.checkBody('firstname','Please fill in your names for processing').notEmpty();
    req.checkBody('surname','Please fill in your names for processing').notEmpty();
    req.checkBody('email','Email is required for sending of mail').notEmpty();
    req.checkBody('phone','Phone number is required').notEmpty();
    req.checkBody('message','Cant leave the message field empty').notEmpty();

    var errors = req.validationErrors();
    if(errors){
     res.render('pages/contact',{
        errors:errors,
      });
    }

    var mailOptions = {
      to : 'hafswasalim@hotmail.com',
      subject : req.body.firstname +' '+req.body.surname,
      text : 'message from contact form of website viewer with email:'+req.body.email+', phone number'+req.body.phone+' and message: ' + req.body.message +'\n\n'
    };
    transporter.sendMail(mailOptions, function(err,info){
      if(err) return next(err);
      return res.send("mail sent successfully");
    });
  },

  categories : function(req, res){
    Category.findOne({name:req.params.category}, function(err, foundCategory){
      if(err) res.send(err);
      if(foundCategory){
          console.log(foundCategory);
          Fashion.find({category:foundCategory._id}, function(err, fashion){
            res.render('pages/categories',{
                fashion : fashion
            });
          });
      }else{
        res.render('pages/categories',{
          fashion:''
        });
      }
    });
  }
};
