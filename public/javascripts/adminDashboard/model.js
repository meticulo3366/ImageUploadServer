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
      return '/calendar/menuDate/' + this.get('dabbawalaId');
    }
    
  });

  app.CartCollection = Backbone.Model.extend({
    url:function() {
      if(this.get('id')){
        if(this.get('singlecartid')){
          return '/cart/addtocart/' + this.get('id')+'/'+this.get('singlecartid');
        }
        else
      return '/cart/addtocart/' + this.get('id');
      }
      else{
        return '/cart/addtocart/';
      }
    }  

  });

  // app.Order = Backbone.Model.extend({
  //   url:function() {
  //     alert('in model');
  //     return '/order/addToOrder';
  //   }  

  // });

  // app.Order = Backbone.Model.extend({
  //   url: '/order'
  // });


  app.Logout = Backbone.Model.extend({
    url: '/admin/logout'
  });

})();