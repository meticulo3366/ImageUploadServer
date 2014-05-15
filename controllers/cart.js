var mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('../utils')
  , config = require('../config/config')
  , TiffinSupplier = require('../models/TiffinboxSuppliers')
  , Cart = require('../models/Cart')
  , TiffinCalendar = require('../models/TiffinCalendar')
  , User = require('../models/User');


module.exports = function(app) {
  
  var cart = {};

  cart.processOrder = function(req, res, next){
    console.log('in orderProcess api');
    console.log(req.query.query);
    var query1= req.query.query;
    var arr = query1.split(',');
    console.log(arr.length);
    console.log(arr);
    var myarr= JSON.parse(arr);
    console.log(myarr);
    // var query = {$or: [
    //  {days:{breakfast:{menuId: {$in: myarr}}
    //   ,lunch:{menuId: {$in: myarr}}
    //   ,dinner:{menuId: {$in: myarr}}}
    //   //{days.breakfast.menuId:{$in: myarr},days.dinner.menuId:{$in: myarr}}
    //   }]};

 

	    // TiffinCalendar.find({days:{_id:{ $in: myarr}}}) 
	    // .populate('tiffinboxSupplier')
	    // .exec(function(err,tiffinBoxSuppliers){
	    //   if(err) { return next(err);
	    //   };
	    //   if(tiffinBoxSuppliers){
	    //     console.log('result:'+tiffinBoxSuppliers);
	    //     var cart = new Cart();
	    //     cart.TiffinCalendar= tiffinBoxSuppliers.
	    //     //res.json(tiffinBoxSuppliers);
	    //   }
	    //   else{
	    //     console.log('error: record not found!');
	    //   }
	    // });
	
  };


   return cart;
};
