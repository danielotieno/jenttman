
/*
 * Routes for rendering home index page
 */

var Fashion    = require('../models/fashion.js');
var Category   = require('../models/category.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var env = process.env.NODE_ENV || 'development'; 
var secrets = require('../config/setting.js');

var transporter = nodemailer.createTransport(smtpTransport({
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

  contact : function(req, res){
      res.render('pages/contact')
  },

  mailer : function(req, res, next){
    req.checkBody('names','Please fill in your names for processing').notEmpty();
    req.checkBody('email','Email is required for sending of mail').notEmpty();
    req.checkBody('subject','Fill in the subject of the message').notEmpty();
    req.checkBody('message','Cant leave the message field empty').notEmpty();

    var errors = req.validationErrors();
    if(errors){
     res.render('pages/contact',{
        errors:errors,
      });
    }

    var mailOptions = {
      to : 'hafswasalim@hotmail.com',
      subject : 'Email from client jenntman contact us form',
      text : 'This is an email from one of your clients from contact us form\n'+
        req.body.names + ' with email '+req.body.email+' subject being\n\n'+
        req.body.subject+' and message : ' + req.body.message +'\n\n'
    };
    transporter.sendMail(mailOptions, function(err,info){
      if(err) return next(err);
      return res.send("mail sent successfully");
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
