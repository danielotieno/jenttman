var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var User             = require('../models/user');

module.exports       = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      if(err) done(err);
      done(null, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  function(req, email, password, done){
    console.log(email);
    User.getUserByUsername({ "username": email }, function(err, user){
      if (err) return done(err);

      if (!user) {
          console.log("can't find user with email ", email); 
          return done(null, false, req.flash('message', ' No user has been found'));
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw(err);

        if (isMatch) {
          return done(null, user);
        }else{
          return done(null, false, req.flash('message', 'Oops! wrong password'));
        }
      });
    });
  }));
}

