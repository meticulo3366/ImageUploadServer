var app = app || {};

(function () {

	'use strict';
  app.Router = Backbone.Router.extend({
    routes: {
      '': 'list'
    }
  });  
})();
