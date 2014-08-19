var app = app || {};

(function () {
	'use strict';

  app.Logout = Backbone.Model.extend({
    url: '/admin/logout'
  });

  app.ApproveImage = Backbone.Model.extend({ 
    url: function() {
      return '/picture/'+this.get('imageid')+'/approve';
    }
  });

  app.RejectImage = Backbone.Model.extend({
    url: function() {
      return '/picture/'+this.get('imageid')+'/reject';
    }
  });

})();