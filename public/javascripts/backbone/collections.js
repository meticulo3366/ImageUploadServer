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

  });



  app.SearchFilterResult = Backbone.Collection.extend({
    initialize: function(options ,search) {
      this.options = options;
      this.search=search;
      //console.log(this.search);
      
    },
    url:function() {
      //console.log('in function'+this.options);
      
      return '/tiffinBoxSupplier/filter?query=' + this.options+'&search='+this.search;
    }

  });

/* app.SearchFilterResult = Backbone.Collection.extend({
    url: '/tiffinBoxSupplier/filter' 
    
  });
 */
  

})();

















