var app = app || {};

$(function () {
	'use strict';
	
  var navbarView = new app.NavbarView();
  var fullnavbarView = new app.FullNavbarView();
	app.router = new app.Router();

  app.router.on('route:landing',function () {
    var landing = new app.LandingView();
    $('.admin-navbar').hide();
    $('.admin-content').hide();
    $('.page').show();
    landing.render();
    navbarView.render();
  });

	app.router.on('route:createUser',function () {
    var createUserView = new app.CreateUserView();
    $('.admin-navbar').hide();
    $('.admin-content').hide();
    $('.page').show();
    createUserView.render();
    navbarView.render();
  });
  app.router.on('route:signIn',function () {
    var signInView = new app.SignInView();
    $('.admin-navbar').hide();
    $('.admin-content').hide();
    $('.page').show();
    signInView.render();
    navbarView.render();
  });

  app.router.on('route:forgotPassword',function () {
    var forgetPasswordView = new app.ForgotPasswordView();
    forgetPasswordView.render();
    navbarView.render();
  });

  app.router.on('route:home',function () {
    var homepage = new app.HomepageView();
    homepage.render();
    fullnavbarView.render();
  });

  


  app.router.on('route:listSupplier',function () {
      var list = new app.ListSupplierView();
      $('.admin-navbar').hide();
      $('.admin-content').hide();
      $('.page').show();
      list.render();
      navbarView.render();
    });
  app.router.on('route:Checkout',function () {
      var checkout = new app.CheckoutView();
      $('.admin-navbar').hide();
      $('.admin-content').hide();
      $('.page').show();
      checkout.render();
      navbarView.render();
    });
  app.router.on('route:orderProcess',function () {
      var order = new app.OrderProcessView();
      $('.admin-navbar').hide();
      $('.admin-content').hide();
      $('.page').show();
      order.render();
      navbarView.render();

    });
  

     app.router.on('route:search',function () {
      var add = new app.SearchListView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });

     app.router.on('route:getOrder',function (id) {
      var add = new app.getOrderView();
      $('.admin-navbar').hide();
      $('.admin-content').hide();
      //$('.page').show();
      add.render({id:id});
      //navbarView.render();
      });
    
     app.router.on('route:userAccount',function (id) {
      var add = new app.userAccountView();
      $('.admin-navbar').hide();
      $('.admin-content').hide();
      add.render({id:id});

      //navbarView.render();
      });
     


  Backbone.history.start();
});
