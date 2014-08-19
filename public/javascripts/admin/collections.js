 var app = app || {};

(function () {
	'use strict';
	
	app.GetImages = Backbone.Collection.extend({
    url: function() {
      return '/picture';
    }
  });
})();