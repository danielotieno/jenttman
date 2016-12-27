var User          = require('../models/user');

module.exports    = {
  new : function(req, res){
    res.render('users/new', {
        message : req.flash('signupMessage'),
        title   : "Sign Up"
    });
  },

  create : function(req, res){
   /* User.findOne({ 'user.local.email' : User.local.email }, function(err, user) {
      if(err) return(err);*/
      var user             =  new User();
      user.local.fname =  req.body.fname;
      user.local.lname   =  req.body.lname;
      user.local.username  =  req.body.username;
      user.local.phonenumber     =  req.body.phonenumber;
      user.local.email     =  req.body.email;
      user.local.password  =  req.body.password;

      User.getUserByUsername({username: req.body.username}, function(err, foundUser, done){
        var message = 'That username is already taken';
        if(err) throw err;

        if(foundUser){
          res.render('users/new', {
            message: message
          });
        } else {
          console.log('You have no register errors');
          User.createUser(user,function(err, user){
            if (err) throw err;

            req.login(user, function(err){
              if (!err){
                console.log(user);
                res.redirect('/');
                //res.send(user);
              } else{
                console.log("there was an error ", err);
              }
            });
          });
        }
      });
    }
  }
  //}