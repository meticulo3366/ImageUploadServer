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

 
  app.addTiffinBoxSupplier = Backbone.Model.extend({
     url: function() {
      if(this.get('id')) {
        return '/tiffinBoxSupplier/' + this.get('id');    
      } else {
        return '/tiffinBoxSupplier/';  
      };
    }
  });

 

  app.addTiffinBoxSupplierMenu = Backbone.Model.extend({
    url: '/tiffinBoxSupplierMenu'
  });
  // app.TiffinboxSupplier = Backbone.Model.extend({
  //   url:function() {
  //     return '/tiffinBoxSupplier/' + this.get('id') + '/getTeam';
  //   }
  // });



  // app.TiffinboxSupplier = Backbone.Model.extend({
  //  url: function() {
  //     if(this.get('id')) {
  //       return '/tiffinBoxSupplier/' + this.get('id');    
  //     } else {
  //       return '/tiffinBoxSupplier/';  
  //     };
  //   }
  // })


  // app.addTiffinBoxSupplierTeam = Backbone.Model.extend({
  //     url: '/tiffinBoxSupplierTeam'
  //   });

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