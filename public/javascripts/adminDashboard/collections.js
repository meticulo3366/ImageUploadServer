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
 app.GetMenuDate = Backbone.Collection.extend({
    initialize: function(options) {
      this.options = options;
    },
    url:function() {
      return '/calendar/menuDate?menuDate=' + this.options.menuDate;
    }

  });

app.CartCollections = Backbone.Collection.extend({
    initialize: function(options) {
      this.options = options;
    },
    url:function() {
      if(this.options.query)
      return '/cart/addtocart?query=' + this.options.query;
    else
      return 'cart/addtocart';
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

















