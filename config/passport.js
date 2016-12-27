var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var User             = require('../app/models/user');

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

  function serializeClient(req, res, next) {
    if (req.query.permanent === 'true') {
      db.client.updateOrCreate({
          user: req.user
      }, function(err, client) {
        if (err) {
          return next(err);
        }
        // we store information needed in req.user
        req.user.clientId = client.id;
        next();
      });
    } else {
      next();
    }
  }

  const db = {
    updateOrCreate: function(user, cb){
      // db dummy, we just cb the user
      cb(null, user);
    }
  };

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, 
function(req, email, password, done){
  User.findOne({ "local.email": email }, function(err, user){
    /* 
       there's an error trying to look for user 
       maybe database connection or something else 
       */
    if (err) return done(err);

    /* 
       we are able to access the database but the 
       user we're looking for is not in our database 
       */
    if (!user) {
        console.log("can't find user with email ", email); 
        return done(null, false, req.flash('message', ' No user has been found'));
    }

    /* 
       we found the user who wants to acces our system 
       but for some reason, password provided is wrong 
       */
    if (!user.comparePassword) {
        return done(null, false, req.flash('message', 'Oops! wrong password'));
    }

    /* 
       all is well, we found the user and all the information 
       provided is correct 
       */
    return done(null, user);
  });
}));
