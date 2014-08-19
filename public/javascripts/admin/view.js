

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

  app.AdminDashboardView =Backbone.View.extend({
    el:'.page',

    tpl: Handlebars.compile(
      document.getElementById('all-images-template').innerHTML
    ),

    events: {
      'click .reject-img': 'rejectImg',
      'click .approve-img': 'approveImg'
    },

    image : null,

    initialize: function() {
      var that=this;
      this.image = new app.GetImages();
      this.listenTo(this.image, 'sync', this.render, this);
      this.image.fetch({
        success: function () {
        },
        error: function (modal,response) {
          if(!IsJsonString(response.responseText)){
            window.localStorage.clear();
            window.location = "/users/user#signin";
          };
        }
      });
    },

    approveImg: function(ev){
      var imageid = $(ev.currentTarget).data("imgid");

      var approveImage = new app.ApproveImage({imageid:imageid});
      approveImage.save({}, {
        success: function () {
          var admindashboard = new app.AdminDashboardView();
        },
        error: function (model, response) {
          console.log(response);
        }
      });

      return false;
    },

    rejectImg: function(ev){
      var imageid = $(ev.currentTarget).data("imgid");

      var rejectImage = new app.RejectImage({imageid:imageid});
      rejectImage.save({}, {
        success: function () {
          var admindashboard = new app.AdminDashboardView();
        },
        error: function (model, response) {
          console.log(response);
        }
      });

      return false;
    },

    render: function () {
      this.$el.html( this.tpl({
        image: this.image.toJSON()
      }));
      this.trigger('render');
    }
  });


    app.NavbarView =Backbone.View.extend({
      el:'.navigation',
       tpl: Handlebars.compile(
          document.getElementById('navbar-template').innerHTML
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
              window.location= '/';
            },
            error: function(model, response) {
              console.log('logout error');
            }
          });
          return false;
        }          
    });

})();