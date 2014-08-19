

var app = app || {};

app.usr_flag= false;


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

    render: function () {
      var that = this;
      that.$el.html( that.tpl());
    },

    login: function(ev) {
      var loginDetails = $(ev.currentTarget).serializeObject();
      var userLogin = new app.UserLogin();
      userLogin.save(loginDetails, {
        success: function(user){            
          if(user.attributes.role === 'user') {
            window.localStorage.setItem('userId',user.attributes._id);
            window.location='/user';
          } else{
            window.location='/admin';
          }  
        },
      });
      return false;
    }
  });

  app.FullNavbarView =Backbone.View.extend({
    el:'.navigation',
    
    tpl: Handlebars.compile(
      document.getElementById('full-navbar-template').innerHTML
    ),

    render: function () {
      var that = this;
      that.$el.html( that.tpl());
    }          
  });
})();