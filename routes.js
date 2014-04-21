
/**
 *
 */

module.exports = function(app){
  var userController = require('./controllers/user') (app)
   , rootController = require('./controllers/root') (app)
   , dabbawalaController = require('./controllers/tiffinSupplier') (app)
   , passportConfig = require('./config/passport-config.js');   

  app.get('/', rootController.landing);
  app.get('/users/user', rootController.user);
  app.get('/adminDashboard'
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

  app.post('/users',userController.create);

  app.post('/tiffinBoxSupplier'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.create);
  app.put('/tiffinBoxSupplier'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.update);
  app.get('/tiffinBoxSupplier/search',dabbawalaController.search);
  app.post('/tiffinBoxSupplier/filter',dabbawalaController.filter)
  app.get('/tiffinBoxSupplier', dabbawalaController.index);
  app.get('/tiffinBoxSupplier/:id', dabbawalaController.show);
  app.delete('/tiffinBoxSupplier/:id'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.delete);
  
  app.post('/tiffinBoxSupplierMenu'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.addMenu);
  //app.get('/tiffinBoxSupplierMenu/:id',dabbawalaController.getMenu);
  // app.get('/tiffinBoxSupplier/:id/getTeam'
  //   , passportConfig.isAuthenticated
  //   , passportConfig.ensureAdmin
  //   , dabbawalaController.getTeam);
};
