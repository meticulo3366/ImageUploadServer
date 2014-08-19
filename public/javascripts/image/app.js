var app = app || {};

$(function () {
	'use strict';
	
 	var navbarView = new app.NavbarView();
 	navbarView.render();
	app.router = new app.Router();

  app.router.on('route:list',function () {
    var add = new app.UserImagesView();
    add.render();
  });
  Backbone.history.start();
});
