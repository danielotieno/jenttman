
module.exports = [
  {
    'environment': 'development',
    'url'       : 'mongodb://localhost/jenttman',
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'production',
    'url'       : process.env.MONGOLAB_URI,
    'secret'    : 'anystringoftext'
  }
];

