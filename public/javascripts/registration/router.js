var app = app || {};

(function () {

	'use strict';
  app.Router = Backbone.Router.extend({
    routes: {
      '': 'landing',
      'new': 'createUser',
      'signin': 'signIn'
    }
  });  
})();
