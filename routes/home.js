
/*
 * Routes for rendering home index page
 */

var Fashion    = require('../models/fashion.js');
var Category   = require('../models/category.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var secrets = require('../config/secret.js');
var config = require('../config/client-secret.js');
var xouath2 = require('xoauth2');

/*var transporter = nodemailer.createTransport(smtpTransport({
  service : "Gmail",
  xouath2 : {
    user : secrets.username,
    pass : secrets.password,
    clientId : config.client_id,
    clientSecret : config.client_secret,
    refreshToken : '1/7SIJEjPYGlqA71nw9_THVhdDENYFNIk9WTnERvoXpANthlqnwVnm0xD0hHJa_yle'
  }
}));
*/

module.exports = {
  index : function(req, res){
    Fashion.find({}, function(err, fashion){
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
   /* var mailOptions = {
      from : 'yourdaddy@gmail.com ',
      to : 'bmirauri@gmail.com',
      subject : 'testing out nodemailer',
      text : 'just hoping it works out properly'
    };
    transporter.sendMail(mailOptions, function(err,info){
      if(err) return next(err);
      return res.send("mail sent successfully");
    });
    */
    res.send("Node mail sender under configuration");
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
