var app = app || {};

(function () {
	'use strict';
	app.User = Backbone.Model.extend({

    urlRoot: function(){
      if(this.get('dabbawalaId'))
        return '/users/?dabbawalaId=' + this.get('dabbawalaId');
      else
        return '/users';  
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

  app.TiffinBoxSupplier = Backbone.Model.extend({
    urlRoot: '/tiffinBoxSupplier'
  });

 

  app.addTiffinBoxSupplierMenu = Backbone.Model.extend({
     url: function() {
      if(this.get('dabbawalaId')) {
        if(this.get('menuId')){
          return '/tiffinBoxSupplierMenu/' + this.get('dabbawalaId')+'/'+ this.get('menuId');
        }
        else{
          return  '/tiffinBoxSupplierMenu/?dabbawalaId=' + this.get('dabbawalaId');  
        } 
      } else {
        return '/tiffinBoxSupplierMenu';  
      };
    }
    
  });

  app.AssignMenuDate = Backbone.Model.extend({
     url: function() {
      console.log('In Model'+this.get('dabbawalaId'));
      return '/tiffinBoxSupplier/menuDate/' + this.get('dabbawalaId');
    }
    
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