
module.exports = [
  {
    'environment': 'development',
    'url'       : 'mongodb://localhost/jenttman',
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'production',
    'url'       : process.env.MONGODB_URI,
    'secret'    : 'anystringoftext'
  }
];

