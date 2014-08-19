var app = app || {};

(function () {
	'use strict';

app.Logout = Backbone.Model.extend({
    url: '/admin/logout'
  });

app.SaveImage = Backbone.Model.extend({
  url: function() {
    return '/picture/'+window.localStorage.getItem('userId');
  }
});

})();