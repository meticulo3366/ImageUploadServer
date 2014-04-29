 var app = app || {};

(function () {
	'use strict';
	

  app.TiffinBoxSuppliers = Backbone.Collection.extend({
    url: function(){
      return '/tiffinBoxSupplier';
    }
  });
  
 app.searchTiffinboxSupplier = Backbone.Collection.extend({
    initialize: function(options) {
      this.options = options;
    },
    url:function() {
      return '/tiffinBoxSupplier/search?query=' + this.options.query;
    }
<<<<<<< HEAD
  });

 app.SearchFilterResult = Backbone.Collection.extend({
    url: '/tiffinBoxSupplier/filter' 
    
  });
 
  
=======

  });
 app.SearchFilterResult=Backbone.Collection.extend({
  url:'/tiffinBoxSupplier/filter'
 });
>>>>>>> 51214c569bf9106072dda0723e86541832b5faa8

})();

















