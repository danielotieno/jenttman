var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');
var crypto     = require('crypto');
var Schema     = mongoose.Schema;
var Role       = require('./role.js');

var UserSchema = Schema({
    username: { type: String, index: true },
    password: { type: String },
    fname: { type: String },
    lname: { type: String },
    email:    { type: String },
    role:     [{type: Schema.Types.ObjectId, ref:Role }]
});


module.exports.createUser = function(newUser,callback){
  bcrypt.genSalt(10,function(err,salt){
    if(err) throw err;
    bcrypt.hash(newUser.local.password,salt,function(err,hash){
      newUser.local.password = hash;
      newUser.local.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, callback);
};

