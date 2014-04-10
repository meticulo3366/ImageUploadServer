var app = app || {};

(function () {
	'use strict';
	app.User = Backbone.Model.extend({
    url: '/users'
  });

  app.addTiffinBoxSupplier = Backbone.Model.extend({
    url: '/admin/tiffinBoxSupplier'
  });

 


  app.addTiffinBoxSupplierMenu = Backbone.Model.extend({
    url: '/admin/tiffinBoxSupplierMenu'
  });
  app.addTiffinBoxSupplierTeam = Backbone.Model.extend({
      url: '/admin/tiffinBoxSupplierTeam'
    });


  app.UserLogin = Backbone.Model.extend({
    url: '/users/authenticate'
  });

  app.FacebookLogin = Backbone.Model.extend({
    url: '/users/fbauth'
  });

  app.UserForgotPassword = Backbone.Model.extend({
    url: '/users/forgotPassword'
  });

  app.UserResetPassword = Backbone.Model.extend({
    url: '/users/resetPassword'
  });

  app.Logout = Backbone.Model.extend({
    url: '/users/logout'
  });

})();