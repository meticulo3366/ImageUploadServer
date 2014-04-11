var app = app || {};

$(function () {
	'use strict';
	
  var navbarView = new app.NavbarView();
  var fullnavbarView = new app.FullNavbarView();
  var adminnavbarView = new app.AdminNavbarView();
  var adminrightnavbarView = new app.AdminRightNavbarDabbawalaView();
  var adminRightNavbarReportView =new app.AdminRightNavbarReportView();
  
	app.router = new app.Router();

  app.router.on('route:landing',function () {
    var landing = new app.LandingView();
    landing.render();
    navbarView.render();
  });

	app.router.on('route:createUser',function () {
    var createUserView = new app.CreateUserView();
    createUserView.render();
    navbarView.render();
  });
  
  app.router.on('route:signIn',function () {
    var signInView = new app.SignInView();
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

  app.router.on('route:adminDashboard', function() {
    var adminDashboardView = new app.AdminDashboardView();
    adminDashboardView.render();
    fullnavbarView.render();
    adminnavbarView.render();
    adminrightnavbarView.render();

  });

  app.router.on('route:report', function() {
    var add = new app.AdminReportView();
    add.render();
    fullnavbarView.render();
    adminnavbarView.render();
    adminRightNavbarReportView.render();

  });
  
  app.router.on('route:profile',function () {
    var profile = new app.ProfileView();
    profile.render();
    fullnavbarView.render();
  });

  app.router.on('route:listSupplier',function () {
      var list = new app.ListSupplierView();
      list.render();
      fullnavbarView.render();
    });
  app.router.on('route:Checkout',function () {
      var checkout = new app.CheckoutView();
      checkout.render();
      fullnavbarView.render();
    });
  app.router.on('route:orderProcess',function () {
      var order = new app.OrderProcessView();
      order.render();
      fullnavbarView.render();
    });
  
  app.router.on('route:AddTeam',function () {
      var add = new app.AddTeamView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      adminrightnavbarView.render();
      });
    app.router.on('route:AddMenu',function () {
      var add = new app.AddMenuView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      adminrightnavbarView.render();
      });

    app.router.on('route:dabbawalaList',function () {
      var add = new app.DabbawalaListView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      adminrightnavbarView.render();
      });

  Backbone.history.start();
});
