var envs       =  require('./database');

module.exports = {

  getDB : function(environment){
    for(i=0; i < envs.length; i++){
      return(envs[i].environment === environment)? (envs[i].url):process.env.MONGOLAB_URI;
    }
  },
  
  getSecret : function(environment){

    var defaultSecret =  'anystringoftext';

    for(i=0; i < envs.length; i++){
      return (envs[i].environment === environment)? (envs[i].secret) : defaultSecret;
    }
  },

  getEmail : function(environment){

    for(i=0; i< envs.length; i++){
      return(envs[i].environment === environment)? (envs[i].email) : process.env.USEREMAIL;
    }
  },
  getPassword: function(environment){
    for(i=0; i<envs.length; i++){
      return(envs[i].environment === environment)? (envs[i].password) : process.env.USERPASSWORD;
    }
  }
};
