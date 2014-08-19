var app = app || {};

$(function () {
	'use strict';
	
  var fullnavbarView = new app.FullNavbarView();
  fullnavbarView.render();
	app.router = new app.Router();

  app.router.on('route:landing',function () {
    var landing = new app.LandingView();
    $('.admin-navbar').hide();
    $('.admin-content').hide();
    $('.page').show();
    landing.render();
  });

	app.router.on('route:createUser',function () {
    var createUserView = new app.CreateUserView();
    createUserView.render();
  });
  app.router.on('route:signIn',function () {
    var signInView = new app.SignInView();
    signInView.render();
  });

  app.router.on('route:list',function () {
    var add = new app.UserImagesView();
    add.render();
  });

  Backbone.history.start();
});
