
var express        = require('express');
var router         = express.Router();
var userRoutes     = require('./user');
var sessionRoutes  = require('./session');
var homeRoutes     = require('./home');
var fashionRoutes  = require('./fashion');
var categoryRoutes = require('./category');
var roleRoutes     = require('./role');
var sizeRoutes     = require('./size');
var cartRoutes     = require('./cart');
var payRoutes      = require('./pay');
var ordersRoutes   = require('./orders');
var blogRoutes   = require('./blog');

var multer = require('multer');
var upload = multer({dest:'uploads/'});
var blogupload = multer({dest:'bloguploads/'});

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

router.get('/',                   homeRoutes.index);
router.get('/about',              homeRoutes.about);
router.get('/term',              homeRoutes.term);
router.get('/contact',            homeRoutes.contact);
router.post('/mailer',            homeRoutes.mailer);
router.get('/category/:category', homeRoutes.categories);

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
 * @fashion routes
*/
router.get('/admin/fashions',              fashionRoutes.index);
router.get('/admin/fashion/item/:id',      fashionRoutes.single);
router.get('/fashion/item/:id',            fashionRoutes.item);
router.get('/admin/fashion/create',        fashionRoutes.new);
router.post('/admin/fashion/add',          upload.single('upload'),  fashionRoutes.add);
router.get('/admin/fashion/edit/:id',      fashionRoutes.edit);
router.post('/admin/fashion/update',       fashionRoutes.update);
router.post('/admin/fashion/image/update', upload.single('upload'),  fashionRoutes.updateimage);
router.get('/admin/fashion/delete/:id',    fashionRoutes.delete);
//router.get('/fashion/cart',          fashionRoutes.cart);

/*
 * @cart routes
 */
router.get('/fashion/checkout',                 cartRoutes.new);
router.get('/add-to-cart/:fashion_id/:size_id', cartRoutes.addtocart);
router.get('/remove-from-cart/:size_id',        cartRoutes.removeonefromcart);
router.get('/add-qty-to-cart/:size_id',         cartRoutes.addqtytocart);
router.get('/remove-object/:size_id',           cartRoutes.removecartobject);
router.get('/session/cart/delete',              cartRoutes.deletecart);

/*
 * @category Routes
 */
router.get('/admin/category/index',      categoryRoutes.index);
router.get('/admin/category/create',     categoryRoutes.new);
router.get('/admin/categories',          categoryRoutes.get);
router.post('/admin/category/add',       categoryRoutes.add);
router.get('/admin/category/delete/:id', categoryRoutes.delete);

/*
 * @size Routes
 */
router.get('/admin/fashion/size/:fashion_id', sizeRoutes.index);
router.get('/admin/size/create/:id',          sizeRoutes.new);
router.get('/admin/sizes',                    sizeRoutes.get);
router.post('/admin/size/add',                sizeRoutes.add);
router.get('/admin/size/edit/:id',            sizeRoutes.edit);
router.post('/admin/size/update',             sizeRoutes.update);

router.get('/fashion/cart/create/:id',   cartRoutes.new);
router.post('/fashion/cart/add',         cartRoutes.add);
router.get('/fashion/cart/:id',          cartRoutes.item);
router.get('/fashion/pay/:id',           cartRoutes.pay);

/*
 * @Paypal routes
 */
router.get('/payment/:id', payRoutes.payment);
router.get('/paypal/:id',  payRoutes.paypal);
router.post('/paynow/:id', payRoutes.paypal);
router.get('/success/:id', payRoutes.success);
router.get('/cancel/:id',  payRoutes.cancel);


/*
 * @order routes
 */
router.get('/pay/:id',       ordersRoutes.order);
router.post('/billing',      ordersRoutes.billing);
router.get('/new',           ordersRoutes.index);
router.get('/sold',          ordersRoutes.sold);
router.get('/awaiting',      ordersRoutes.awaiting);
router.get('/admin/product', ordersRoutes.product);
router.get('/orders/post',   ordersRoutes.postorder);

/*
 * @blog routes
 */
router.get('/blog',                     blogRoutes.blog);
router.get('/blog_single',              blogRoutes.blog_single);
router.get('/admin/blog/index',         blogRoutes.index);
router.get('/admin/blog/create',        blogRoutes.new);
router.get('/admin/blogs',              blogRoutes.get);
router.get('/blog/item/:id',            blogRoutes.item);
router.post('/admin/blog/add',          blogupload.single('upload'),  blogRoutes.add);
router.get('/admin/blog/edit/:id',      blogRoutes.edit);
router.post('/admin/blog/update',       blogRoutes.update);
router.post('/admin/blog/image/update', blogupload.single('upload'),  blogRoutes.updateimage);
router.get('/admin/blog/delete/:id',    blogRoutes.delete);

/*
 * @Role routes
 */
router.get('/admin/assign/:username/:role', roleRoutes.assign);
router.get('/admin/role/:role',             roleRoutes.create);

module.exports=router;
