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

 app.checkoutTiffinboxSupplier = Backbone.Collection.extend({
    initialize: function(options) {
      this.options = options;
    },
    url:function() {
      return '/tiffinBoxSupplier/checkout?query=' + this.options.query;
    }

  });

 app.GetMenuDate = Backbone.Collection.extend({
    initialize: function(options) {
      this.options = options;
    },
    url:function() {
      return '/tiffinBoxSupplier/menuDate?menuDate=' + this.options.menuDate;
    }

  });


  app.SearchFilterResult = Backbone.Collection.extend({
    initialize: function(options ,search) {
      this.options = options;
      this.search=search;     
    },
    url:function() {
      return '/tiffinBoxSupplier/filter?query=' + this.options+'&search='+this.search;
    }

  });

/* app.SearchFilterResult = Backbone.Collection.extend({
    url: '/tiffinBoxSupplier/filter' 
    
  });
 */
  

})();

















