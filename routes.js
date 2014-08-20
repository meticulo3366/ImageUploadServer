
/**
 *
 */

module.exports = function(app){
  var userController = require('./controllers/user') (app)
   , rootController = require('./controllers/root') (app)
   , imageController = require('./controllers/images') (app)
   , passportConfig = require('./config/passport-config.js');   

  app.get('/', rootController.landing);
  app.get('/admin/logout', userController.logout);
  app.get('/users/loggedIn',userController.userLoggedIn);
  app.post('/users/authenticate', userController.authenticate);
 
  app.post('/users'
    ,userController.create);

  app.get('/user'
    , passportConfig.isAuthenticated
    ,rootController.userDashboard);
  app.get('/admin'
    , passportConfig.isAuthenticated
    ,rootController.adminDashboard);

  app.post('/picture/:id',imageController.savePicture);
  app.get('/picture',imageController.index);
  app.get('/approvedpictures', imageController.approved);
  app.post('/picture/:id/approve',imageController.approveImage);
  app.post('/picture/:id/reject',imageController.rejectImage);

};
