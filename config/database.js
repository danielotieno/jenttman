/*
 * FOR THIS TO WORK YOU MUST ALLOW LESS SECURE APPS IN YOUR GMAIL SETTINGS TO ACCESS
 * YOUR EMAIL ACCOUNT. JUST DONT PUSH IT TO GITHUB SO MAKE SURE YOU GITIGNORE
 */
module.exports = [
  {
    'environment': 'development',
    'url'       : 'mongodb://localhost/jenttman',
    'secret'    : 'anystringoftext',
    'email'       : 'YOUR EMAIL ADDRESS',
    'password'    : 'YOUR EMAIL ADDRESS PASSWORD'
  },

  {
    'environment': 'production',
    'url'       : process.env.MONGOLAB_URI,
    'secret'    : 'anystringoftext',
    'email'       : process.env.USEREMAIL,
    'password'    : process.env.USERPASSWORD

  }
];

