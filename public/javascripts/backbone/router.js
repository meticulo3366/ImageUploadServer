var app = app || {};

(function () {

	'use strict';
  app.Router = Backbone.Router.extend({
    routes: {
      '': 'landing',
      'new': 'createUser',
      'signin': 'signIn',
      'forgotpassword': 'forgotPassword',
      'home': 'home',
      //'adminDashboard': 'adminDashboard',
      'profile': 'profile',
      'list': 'listSupplier',
      'checkout': 'Checkout',
      'orderProcess': 'orderProcess',
      'search': 'search',
      'getOrder/:id':'getOrder',
      'userAccount/:id':'userAccount'
    }
  });  
})();
