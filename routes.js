
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

  app.post('/admin/tiffinBoxSupplier'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.create);
  app.get('/admin/tiffinBoxSupplier', dabbawalaController.index);
  app.get('/admin/tiffinBoxSupplier/:id', dabbawalaController.show);
  app.delete('/admin/tiffinBoxSupplier/:id'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.delete);
  app.get('/tiffinBoxSupplier/search',dabbawalaController.search);
  app.post('/admin/tiffinBoxSupplierMenu'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.addMenu);
  app.get('/admin/tiffinBoxSupplierMenu/:id',dabbawalaController.getMenu);
  app.get('/tiffinBoxSupplier/:id/getTeam'
    , passportConfig.isAuthenticated
    , passportConfig.ensureAdmin
    , dabbawalaController.getTeam);
  
};
