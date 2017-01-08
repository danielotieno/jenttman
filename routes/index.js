
var express= require('express');
var router=express.Router();
var userRoutes    =  require('./user');
var sessionRoutes =  require('./session');
var homeRoutes    =  require('./home');
var fashionRoutes    =  require('./fashion');
var categoryRoutes   = require('./category');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if(req.isAuthenticated()){
    if(req.user.role == 'admin'){
      return next();
    }
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
router.get('/user/item',             fashionRoutes.single);
//router.get('/admin/new',             fashionRoutes.new);
router.post('/admin/create',      fashionRoutes.add);
router.get('/admin/create',      fashionRoutes.new);
router.post('/admin/update',   fashionRoutes.update);
router.get('/admin/index/delete',    fashionRoutes.delete);

/*
 * @category Routes
 */
router.get('/admin/categoty/new',       categoryRoutes.new);
router.get('/admin/categoty',       categoryRoutes.get);
router.post('admin/category/add',        categoryRoutes.add);

module.exports=router;
