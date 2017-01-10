
var express        = require('express');
var router         = express.Router();
var userRoutes     = require('./user');
var sessionRoutes  = require('./session');
var homeRoutes     = require('./home');
var fashionRoutes  = require('./fashion');
var categoryRoutes = require('./category');
var roleRoutes     = require('./role');

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
 * @fashionroutes 
*/
router.get('/admin/fashions',        fashionRoutes.index);
router.get('/user/item',          fashionRoutes.single);
router.get('/admin/create',      fashionRoutes.new);
router.post('/admin/fashions',       fashionRoutes.add);
router.post('/admin/update',      fashionRoutes.update);
router.get('/admin/index/edit',   fashionRoutes.edit);
router.get('/admin/delete', fashionRoutes.delete);
router.post('/admin/another',      fashionRoutes.addsize);

/*
 * @category Routes
 */
router.get('/admin/add', categoryRoutes.index);
router.get('/admin/new',     categoryRoutes.new);
router.post('admin/add', categoryRoutes.add);

/*
 * @size Routes
 */
router.get('/admin/another', sizeRoutes.index);
router.get('/admin/newer', sizeRoutes.new);
//router.get('/admin/categoty',     categoryRoutes.get);
router.post('/admin/another', sizeRoutes.add);



/*
 * @Role routes
 */
router.get('/admin/assign/:username/:role', roleRoutes.assign);
router.get('/admin/role/:role',             roleRoutes.create);
module.exports=router;
