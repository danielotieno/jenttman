var express = require('express');
var app = express();
var User = require('../models/user');
var Size= require('../models/size');
var Fashion= require('../models/fashion')
var Category = require('../models/category');
var Cart= require('../models/cart')
var Sesscart = require('../models/sesscart');
var paypal = require('paypal-rest-sdk');

// paypal auth configuration
var config = {
  "port" : 8080,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AQKi8w-8SeDj83pKHI17iHQQzE1zd4Ye_TY7pQyZQ8m9bbCph2Uf5dJSKXNE4mUVkOUTmfTQnJw1L7s-",  // your paypal application client id
    "client_secret" : "EJWBOPOI_UOnQxhbAUUEVWV3pJ6f8bv_jwZbusRd6eGSP3aLwKYBe9vp7oRWLNcC_qHgU0r7BVyITDQn" // your paypal application secret id
  }
}
 
paypal.configure(config.api);
 
// Page will display after payment has beed transfered successfully

module.exports = {
 /* index : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      var cart = new Sesscart(req.session.cart);
      res.render('pages/pay',{
          fashion : fashion,
          products:cart.generateArray(),
          totalPrice:cart.totalPrice
      });
    });
  },*/

  payment : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      var cart = new Sesscart(req.session.cart);
      console.log(req.session.email);
      User.findOne({email:req.session.email}, function(err, user){
        if(err) return(err);
        res.render('pages/payment',{
          user:user,
          fashion : fashion,
          products:cart.generateArray(),
          totalPrice:cart.totalPrice
        });
      });
    });
  },


  paypal : function(req, res){
      // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": app.locals.baseurl+"/success",
    "cancel_url": app.locals.baseurl+"/cancel"
  },
  "transactions": [{
    "amount": {
      "total":parseInt(req.body.amount),
      "currency":  req.body.currency
    },
    "description": req.body.description
  }]
};
 
  paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }
      res.redirect(redirectUrl);
    }
  }
});
  },

  success : function(req, res){
    res.send("Payment transfered successfully.");
  },
 
  cancel : function(req, res){
    res.send("Payment canceled successfully.");
 }
};
 

