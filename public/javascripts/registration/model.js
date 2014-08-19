var app = app || {};

(function () {
	'use strict';

  app.User = Backbone.Model.extend({
    url: '/users'
  });
  
  app.UserLogin = Backbone.Model.extend({
    url: '/users/authenticate'
  });

})();