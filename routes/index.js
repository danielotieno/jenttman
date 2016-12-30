
var express= require('express');
var router=express.Router();
var userRoutes    =  require('./user');
var sessionRoutes =  require('./session');
var homeRoutes    =  require('./home');


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

router.get('/', homeRoutes.index);

/*
 * @user routes
*/
router.get('/register',           userRoutes.new);
router.post('/signup',    userRoutes.create);

/*
 * @session routes 
*/
router.get('/login',           sessionRoutes.new);
router.post('/login', sessionRoutes.create);
router.get('/logout',          sessionRoutes.delete);
router.post('/usercreate',     sessionRoutes.usercreate); 
module.exports=router;
