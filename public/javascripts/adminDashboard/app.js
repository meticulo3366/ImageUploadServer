var app = app || {};

$(function () {
	'use strict';
	
  //var navbarView = new app.NavbarView();
  var fullnavbarView = new app.FullNavbarView();
  var adminnavbarView = new app.AdminNavbarView();
  var adminrightnavbarView = new app.AdminRightNavbarDabbawalaView();
  var adminRightNavbarReportView =new app.AdminRightNavbarReportView();
  
	app.router = new app.Router();

  app.router.on('route:adminDashboard', function() {

    var adminDashboardView = new app.AdminDashboardView();
    adminDashboardView.render();
    fullnavbarView.render();
    adminnavbarView.render();
    //adminrightnavbarView.render();

  });

  app.router.on('route:report', function() {
    var add = new app.AdminReportView();
    add.render();
    fullnavbarView.render();
    adminnavbarView.render();
    adminRightNavbarReportView.render();

  });
  

  app.router.on('route:AddTeam',function () {
      var add = new app.AddTeamView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
    app.router.on('route:AddMenu',function () {
      var add = new app.AddMenuView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });

    app.router.on('route:addDabbawala',function () {
      var add = new app.addDabbawalaView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      adminrightnavbarView.render();
      });

    app.router.on('route:teamList',function () {
      var add = new app.TeamListView();
      //add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      adminrightnavbarView.render();
      });

    app.router.on('route:menuList',function () {
      var add = new app.MenuListView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      adminrightnavbarView.render();
      });

     app.router.on('route:search',function () {
      var add = new app.SearchListView();
      add.render();
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
     app.router.on('route:delete',function (id) {
      var add = new app.DeleteDabbawalaView();
      add.render({id:id});
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
     app.router.on('route:edit',function (id) {
      var add = new app.EditDabbawalaView();
      add.render({id:id});
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
     app.router.on('route:editMenu',function (id) {
      var add = new app.EditMenuView();
      add.render({id:id});
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
     app.router.on('route:editTeam',function (id) {
      var add = new app.EditTeamView();
      add.render({id:id});
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
     app.router.on('route:deleteMenu',function (id) {
      var add = new app.DeleteMenuView();
      add.render({id:id});
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
     app.router.on('route:deleteTeam',function (id) {
      var add = new app.DeleteTeamView();
      add.render({id:id});
      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
      });
    app.router.on('route:menuDate',function (id) {
      var add = new app.MenuDateView();
      add.render({id:id});

      fullnavbarView.render();
      adminnavbarView.render();
      //adminrightnavbarView.render();
    });


  Backbone.history.start();
});
