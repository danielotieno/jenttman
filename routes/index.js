
var express= require('express');
var router=express.Router();
var userRoutes    =  require('./user');
var sessionRoutes =  require('./session');
var homeRoutes    =  require('./home');
var fashionRoutes    =  require('./fashion');

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
router.post('/signup',            userRoutes.create);

/*
 * @session routes 
*/
router.get('/login',           sessionRoutes.new);
router.post('/login',          sessionRoutes.create);
router.get('/logout',          sessionRoutes.delete);

/*
 * @session routes 
*/
router.get('/admin/index',           fashionRoutes.index);
router.get('/user/item',           fashionRoutes.single);
router.get('/admin/new',           fashionRoutes.new);
router.get('/admin/index/add',           fashionRoutes.add);
router.get('/admin/index/update',           fashionRoutes.update);
router.get('/admin/index/delete',           fashionRoutes.delete);
module.exports=router;
