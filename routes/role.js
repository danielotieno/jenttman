var User = require('../models/user');
var Role = require('../models/role');

module.exports = {
  create : function(req, res){
    Role.findOne({name:req.params.role}, function(err, foundRole){
      if(err) res.send(err);
      if(foundRole){ 
        res.end("role already exists");
      }else{
        var role = new Role({
          'name':req.params.role
        });
        role.save(function(err, role){
          if(err) res.send(err);
          res.send(role);
        });
      }
    });
  },

  assign : function(req, res){
    User.findOne({username: req.params.username}, function(err, foundUser){
      if(err) res.send(err);
      if(foundUser){
        console.log(foundUser);
        Role.findOne({role: req.params.role}, function(err, foundRole){
          if(err) res.send(err);
          if(foundRole){
            var user = new User({
              role : foundRole._id
            });
            user.Update(function(err, user){
              if(err) return(err);
              res.send("User role updated successfully");
            });
          }
        })
      }else{
        res.send("User kind of doesn't exist in our system");
      }
    });
  }
}

