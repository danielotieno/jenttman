var User          = require('../models/user');
var Role          = require('../models/role');
module.exports    = {
  new : function(req, res){
    var message='';
    res.render('pages/register', {
        message : req.flash('signupMessage'),
        title   : "Sign Up"
    });
  },

  create : function(req, res){
   Role.findOne({ name:req.body.role}, function(err, role){
      if(err) return(err);

      req.checkBody('fname','First name is required').notEmpty();
      req.checkBody('lname','Last name is required').notEmpty();
      req.checkBody('email','Email is required').notEmpty();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password2','Please you need to confirm your password').notEmpty();
      req.checkBody('password', 'The passwords do not match').isEqual('password2');
      req.checkBody('email','Email is invalid').isEmail();

      var errors = req.validationErrors();
      if(errors){
        res.redirect('/register');
      }

      var fname=req.body.fname;
      var lname=req.body.lname;
      var email=req.body.email;
      var username=req.body.username;
      var password=req.body.password;
      var password2=req.body.password2;
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
    });
  }
 }
