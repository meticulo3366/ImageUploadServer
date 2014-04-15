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
      'adminDashboard': 'adminDashboard',
      'profile': 'profile',
      'list': 'listSupplier',
      'checkout': 'Checkout',
      'orderProcess': 'orderProcess',
      'addTeam': 'AddTeam',
      'addMenu': 'AddMenu',
      'report': 'report',
      'addDabbawala': 'addDabbawala',
      'teamList': 'teamList',
      'menuList': 'menuList',
      'search': 'search',
      'delete/:id': 'delete' 
    }
  });  
})();
