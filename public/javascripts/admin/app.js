var app = app || {};

$(function () {
	'use strict';
	
 	var navbarView = new app.NavbarView();
    navbarView.render();
	app.router = new app.Router();
	
  app.router.on('route:admindashboard',function () {
    var admindashboard = new app.AdminDashboardView();
  });

  Backbone.history.start();
});
