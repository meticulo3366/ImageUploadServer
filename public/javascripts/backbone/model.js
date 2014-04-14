var app = app || {};

(function () {
	'use strict';
	app.User = Backbone.Model.extend({

    url: function() {
      if(this.get('dabbawalaId')) {
        return '/users?dabbawalaId=' + this.get('dabbawalaId');    
      } else {
        return '/users';  
      };
    }
  });

  app.addTiffinBoxSupplier = Backbone.Collection.extend({
    url: function(){
      return '/admin/tiffinBoxSupplier'
    };
  });

  app.addTiffinBoxSupplier = Backbone.Model.extend({
     url: function() {
      if(this.get('id')) {
        return '/admin/tiffinBoxSupplier/' + this.get('id');    
      } else {
        return '/admin/tiffinBoxSupplier/';  
      };
    }
  });

  app.TiffinboxSupplier = Backbone.Model.extend({
    url:function() {
      return '/tiffinBoxSupplier/' + this.get('id') + '/getTeam';
    }
  })


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