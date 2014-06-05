
/**
 *
 */

module.exports = function(app){
  var userController = require('./controllers/user') (app)
   , rootController = require('./controllers/root') (app)
   , dabbawalaController = require('./controllers/tiffinSupplier') (app)
   , cartController = require('./controllers/cart') (app)
   , orderController = require('./controllers/order') (app)
   , calendarController = require('./controllers/calendar') (app)
   , passportConfig = require('./config/passport-config.js');   

  app.get('/', rootController.landing);
  app.get('/users/user', rootController.user);
  app.get('/admin'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , rootController.adminDashboard)


  app.get('/users/confirm', userController.confirmEmail);
  app.get('/users/resetPassword', userController.renderResetPasswordPage);
  app.get('/users/resetPasswordPage', rootController.resetPassword);
  
  app.get('/users/profile', passportConfig.isAuthenticated, rootController.userProfile);
  app.get('/users/homepage', passportConfig.isAuthenticated, rootController.homepage);
  
  //app.post('/users/create', userController.create1);
  app.post('/users/authenticate', userController.authenticate);
  app.get('/users/fbauth', userController.startFbAuthentication);
  app.get('/users/fbAuthenticationComplete', userController.onFbAuthenticationComplete);
  app.post('/users/forgotPassword', userController.forgotPassword);
  app.post('/users/resetPassword', userController.resetPassword)
  app.get('/users/logout', userController.logout);

  
  app.post('/users'
    , passportConfig.isAuthenticated
    ,userController.create);
  app.put('/users/:id'
    , passportConfig.isAuthenticated
    ,userController.update);
  app.delete('/users/:id'
    , passportConfig.isAuthenticated
    ,userController.delete);

  app.post('/tiffinBoxSupplier'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.create);
  app.put('/tiffinBoxSupplier/:id'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.update);


  app.get('/tiffinBoxSupplier/search',dabbawalaController.search);
  app.get('/tiffinBoxSupplier/checkout',dabbawalaController.checkout);
  app.get('/tiffinBoxSupplier/filter',dabbawalaController.filter)
  app.get('/tiffinBoxSupplier', dabbawalaController.index);
  app.get('/tiffinBoxSupplier/:id', dabbawalaController.show);

  // app.post('/tiffinBoxSupplier/menuDate/:dabbawalaId'
  //  ,dabbawalaController.assignMenuDate);
  // app.get('/tiffinBoxSupplier/menuDate'
  //  ,dabbawalaController.getMenuDate);


  app.delete('/tiffinBoxSupplier/:id'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.delete);
  
  app.post('/tiffinBoxSupplierMenu'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.addMenu);

  app.put('/tiffinBoxSupplierMenu/:dabbawalaId/:menuId'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.updateMenu);

  app.post('/tiffinBoxSupplierMenu/:dabbawalaId/:menuId'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.deleteMenu);

  
  //app.get('/tiffinBoxSupplierMenu/:id',dabbawalaController.getMenu);
  // app.get('/tiffinBoxSupplier/:id/getTeam'
  //   , passportConfig.isAuthenticated
  //   , passportConfig.ensureAdmin
  //   , dabbawalaController.getTeam);


app.post('/calendar/menuDate/:dabbawalaId'
   ,calendarController.assignMenuDate);
app.get('/calendar/menuDate'
   ,calendarController.getMenuDate);

  app.post('/cart/addtocart',
    cartController.addToCart);
  app.get('/cart/addtocart/:id',
    cartController.getToCart);
   app.put('/cart/addtocart/:id/:singlecartid',
    cartController.deleteToCart);
  app.put('/cart/addtocart/:id',
    cartController.updateToCart);
  // app.get('/cart/addtocart'
  //  ,cartController.getToCart);


  
};
