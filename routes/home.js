/*
 * Routes for rendering home index page
 */

var Fashion = require('../models/fashion.js');

module.exports = {
  index : function(req, res){
    Fashion.find({}, function(err, fashion){
      if(err) res.send(err);
      res.render('pages/index',{
          fashion : fashion
      });
    });
  }
};
