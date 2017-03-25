var User          = require('../models/user');
var Role          = require('../models/role');

module.exports    = {
  new : function(req, res){
    var message=req.flash('message');
    console.log(message);
    var errors='';
    res.render('pages/register', {
        errors:errors,
        message : req.flash('message'),
        title   : "Sign Up",
    });
  },

  create : function(req, res){
   Role.findOne({ name:'customer'}, function(err, role){
     if(err) return(err);

      req.checkBody('fname','First name is required').notEmpty();
      req.checkBody('lname','Last name is required').notEmpty();
      req.checkBody('email','Email is required').notEmpty();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password2','Please you need to confirm your password').notEmpty();
      req.checkBody('password2', 'The passwords do not match').equals(req.body.password);
      req.checkBody('email','Email is invalid').isEmail();

      var errors = req.validationErrors();
      if(errors){
       res.render('pages/register',{
          errors:errors,
          title:'Sign up',
          message: req.flash('signupMess')
        });
      }

      var user      = new User();
      user.fname    = req.body.fname;
      user.lname    = req.body.lname;
      user.email    = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;
      //user.role     = role._id;

      User.getUserByUsername({username: req.body.username}, function(err, foundUser, done){
        var message = 'That Username is already taken';
        var errors  = '';
        if(err) throw err;

        if(foundUser){
          req.flash('message', 'Username already exists ');
          console.log(req.flash('message'));
          res.redirect('/register');
        } else {
          console.log('You have no register errors');
          User.createUser(user,function(err, user){
            if (err) throw err;

            req.login(user, function(err){
              if (!err){
                console.log(user);
                res.redirect('/');
              } else{
                console.log("There was an error i", err);
              }
            });
          });
        }
      });
    });
  }
 }
