/*
 * Routes for rendering home index page
 */

var Fashion = require('../models/fashion.js');

module.exports = {
  index : function(req, res){
    Fashion.find({}, function(err, Fashion){
      if(err) res.send(err);
      res.render('index',{
          fashion : fashion
      });
    });
  }
};
