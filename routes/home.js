var express= require('express');
var router=express.Router();

module.exports = {
  index : function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.render('index',{
          title  : 'Home'
      });
    });
  }
};
