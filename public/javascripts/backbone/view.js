var app = app || {};

(function () {
  'use strict';

   Backbone.View.prototype.close = function () {
    
    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.$el.empty();
  };


app.LandingView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('landing-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });
app.CreateUserView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('create-user-template').innerHTML
        ),
        events: {
            'submit .create-user-form': 'saveUser'
        },

        initialize: function() {
        
        },
        render: function () {

          this.$el.html( this.tpl());
        },
         saveUser: function (ev) {
          var userDetails = $(ev.currentTarget).serializeObject();
          var user = new app.User();
          user.save(userDetails, {
            success: function(user){
              app.router.navigate('signin',{trigger: true});
            },
            error: function (model, response) {
              if(response.responseJSON.error.name === 'MongoError') {
                document.getElementById('register-error-message').innerHTML = 'Email you entered is already registered with the application!';
              }
            }
          });
          return false;
        }

    });


app.SignInView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('login-user-template').innerHTML
        ),
        events: {
            'submit .login-user-form': 'login',
          'click #sign-in-with-fb': 'loginFb'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },
          login: function(ev) {
          var loginDetails = $(ev.currentTarget).serializeObject();
          var userLogin = new app.UserLogin();
          userLogin.save(loginDetails, {
            success: function(user){
              window.localStorage.setItem('id', user.attributes._id);
              
              if(user.attributes.role === 'admin') {
                app.router.navigate('adminDashboard', {trigger: true});
              } else {
                app.router.navigate('home', {trigger: true});  
              }
              
            },
            error: function (model, response) {
              if(_.isString(response.responseJSON.error)) {
                document.getElementById('error-message').innerHTML = response.responseJSON.error;
              }              
            }
          });
          return false;
        }

    });

 app.ForgotPasswordView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('forgotPassword-template').innerHTML
        ),
        events: {
             'submit .forgetPassword-user-form': 'saveUser'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },
         saveUser: function (ev) {
          var forgetPasswordDetails = $(ev.currentTarget).serializeObject();
          var userForgotPassword = new app.UserForgotPassword();
          userForgotPassword.save(forgetPasswordDetails, {
            success: function(){
              app.router.navigate('signin',{trigger: true});
            },
            error: function(model, response){
              if(_.isString(response.responseJSON.error)) {
                document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              }      
            }
          });
          return false;
        }

    });
       


app.HomepageView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('homepage-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });

app.AdminDashboardView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('admin-dashboard-template').innerHTML
        ),
        events: {
          'submit .create-dabbawala-form':'saveDabbawala'
             
        },

        initialize: function() {
        app.View = this;
        

          // this.dabbawala = new app.addTiffinBoxSupplier();
          // this.listenTo( this.dabbawala, 'sync', this.render,this);
          // this.dabbawala.fetch();
        },
        render: function () {

          var that = this;
          that.$el.html( that.tpl());

          // var that = this;
          // that.$el.html( that.tpl({
          // dabbawalaList: that.dabbawala.toJSON()

          // }));
        },
        saveDabbawala:function(ev){
          var dabbawalaDetails = $(ev.currentTarget).serializeObject();
          var dabbawala = new app.addTiffinBoxSupplier();
          dabbawala.save(dabbawalaDetails, {
            success: function(dbw){
              if(app.View)
               app.View.close();

        
              console.log('dabbawala saved:  '+dbw.name);
              app.router.navigate('addTeam',{trigger: true});
            },
            error: function(model, response){
              if(_.isString(response.responseJSON.error)) {
                
                //document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              }      
            }
          });
          return false;
        }
         
    });

app.AdminReportView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('admin-right-navbar-report-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });

app.ProfileView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('profile-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });


  app.ListSupplierView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('list-template').innerHTML
        ),
        events: {
             'click .chekout': 'checkout'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },

        checkout: function(ev){
           app.router.navigate('checkout', {trigger: true});
        }
         
    });

  app.CheckoutView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('checkout-template').innerHTML
        ),
        events: {
             'click .addToCart': 'processorder'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },
        processorder:function(ev){
          app.router.navigate('orderProcess', {trigger: true});
        }
         
    });
   app.OrderProcessView =Backbone.View.extend({
      el:'.page',
       tpl: Handlebars.compile(
          document.getElementById('order-detail-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });




app.NavbarView =Backbone.View.extend({
      el:'.navigation',
       tpl: Handlebars.compile(
          document.getElementById('navbar-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });

app.FullNavbarView =Backbone.View.extend({
      el:'.navigation',
       tpl: Handlebars.compile(
          document.getElementById('full-navbar-template').innerHTML
        ),
        events: {
             'click .logout': 'logoutUser'
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        },
        logoutUser: function() {
      var userLogout = new app.Logout();
      userLogout.fetch({
        success: function() {
          app.router.navigate('signin', {trigger: true});
        },
        error: function(model, response) {
       
        }
      });
      return false;
    }
         
    });


app.AddTeamView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('add-team-template').innerHTML
        ),
        events: {
             'submit .create-team-form':'saveTeam'
        },

        initialize: function() {
         app.View= this;

          this.dabbawala = new app.addTiffinBoxSupplier();
          this.listenTo( this.dabbawala, 'sync', this.render,this);
          this.dabbawala.fetch();

        },
        render: function () {
          // var that = this;
          // that.$el.html( that.tpl());
          var that = this;
          that.$el.html( that.tpl({
          dabbawalaList: that.dabbawala.toJSON()

          }));
        },

        saveTeam:function(ev){
          console.log('in saveTeam');
          var menuDetails = $(ev.currentTarget).serializeObject();
         
          var team = new app.addTiffinBoxSupplierTeam();
         
          team.save(menuDetails, {
            success: function(){
                if(app.View)
                app.View.close();
              
                console.log('in saveTeam sucess');
                app.router.navigate('addMenu',{trigger: true});
            },
            error: function(model, response){
              console.log('in saveteam error');
              // if(_.isString(response.responseJSON.error)) {
                
              //   //document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              // }      
            }
          });
          return false;
        } 
         
    });

app.AddMenuView =Backbone.View.extend({
      el:'.admin-content',
       tpl: Handlebars.compile(
          document.getElementById('add-menu-template').innerHTML
        ),
        events: {
            'submit .create-menu-form':'saveMenu'  
        },

        initialize: function() {
         app.View= this;

          this.dabbawala = new app.addTiffinBoxSupplier();
          this.listenTo( this.dabbawala, 'sync', this.render,this);
          this.dabbawala.fetch();

        },
        render: function () {
          // var that = this;
          // that.$el.html( that.tpl());
          var that = this;
          that.$el.html( that.tpl({
          dabbawalaList: that.dabbawala.toJSON()

          }));
        },
        saveMenu:function(ev){
          console.log('in saveMenu');
          var menuDetails = $(ev.currentTarget).serializeObject();
          var menu = new app.addTiffinBoxSupplierMenu();
          menu.save(menuDetails, {
            success: function(){
               if(app.View)
               app.View.close();

              console.log('in saveMenu sucess');
              app.router.navigate('addMenu',{trigger: true});
            },
            error: function(model, response){
              console.log('in savemenu error');
              console.log('errr in saving menu');
              // if(_.isString(response.responseJSON.error)) {
                
              //   //document.getElementById('forgot-password-error').innerHTML = response.responseJSON.error;
              // }      
            }
          });
          return false;
        } 
    });
app.AdminNavbarView =Backbone.View.extend({
      el:'.admin-navbar',
       tpl: Handlebars.compile(
          document.getElementById('admin-navbar-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });
app.AdminRightNavbarDabbawalaView =Backbone.View.extend({
      el:'.admin-right-navbar',
       tpl: Handlebars.compile(
          document.getElementById('admin-right-navbar-dabbawala-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });

app.AdminRightNavbarReportView =Backbone.View.extend({
      el:'.admin-right-navbar',
       tpl: Handlebars.compile(
          document.getElementById('admin-right-navbar-report-template').innerHTML
        ),
        events: {
             
        },

        initialize: function() {
        
        },
        render: function () {
          var that = this;
          that.$el.html( that.tpl());
        }
         
    });






})();