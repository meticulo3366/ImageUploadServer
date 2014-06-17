var mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('../utils')
  , config = require('../config/config')
  , TiffinSupplier = require('../models/TiffinboxSuppliers')
  , Order = require('../models/Order')
  , User = require('../models/User');


module.exports = function(app) {
  
  var order = {};

  order.addToOrder = function(req, res, next){
    console.log('in addToOrder api');
    console.log(req.body);
    var objOrder= req.body.order;
    console.log(objOrder);
    var order = new Order(objOrder);
    
    order.save(function(err,order){
      if(err){return next(err);};
      if(order){
        console.log('order'+order);
        //console.log('cart'+cart.orderDetails);

        return res.json(order);
      }
    });
   
	
  };

   return order;
};