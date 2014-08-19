

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

  app.UserImagesView =Backbone.View.extend({
    el:'.page',

    tpl: Handlebars.compile(
      document.getElementById('images-list-template').innerHTML
    ),

    image : null,

    events: {
      'change input[type=file]': 'uploadImage',
      'submit .upload-picture-form': 'saveImage'
    },

    uploadImage: function(ev) {
      var that = this;
      var file = document.getElementById('uploadImage').files[0];
      var dataURLReader = new FileReader();

      dataURLReader.onload = function(event) {
        var dataURL = event.target.result;
        that.data = dataURL;
        that.contentType = dataURL.split(",")[0].split(":")[1].split(";")[0];
      };
      dataURLReader.readAsDataURL(file);
      return false;
    },

    saveImage: function(ev){
      var imageDetails ={};
      imageDetails.data = this.data;
      imageDetails.contentType = this.contentType;

      var saveImage = new app.SaveImage();
      saveImage.save(imageDetails, {
        success: function () {
          $('#error-message').append('<p class="msg">Images saves successfully</p>');
          $('#error-message').show();
        },
        error: function (model, response) {
          console.log(response);
        }
      });

      return false;
    },

    render: function () {
      this.$el.html( this.tpl());
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
            }
          });
          return false;
        }          
    });

})();