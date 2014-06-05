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

  cart.addToCart = function(req, res, next){
    console.log('in addToCart api');
    console.log(req.body);
    var cart = new Cart(req.body);
    //cart.orderDetails = req.body;
    cart.save(function(err,cart){
      if(err){return next(err);};
      if(cart){
        console.log('cart'+cart);
        console.log('cart'+cart.orderDetails);

        return res.json(cart);
      }
    });
   
	
  };

  cart.getToCart = function(req, res, next){
    console.log('in getToCart api'+req.params.id);
    var populateQuery = [{path:'orderDetails.tiffinboxSupplier', select:'name'}];
    Cart.findById(req.params.id)
      .populate('orderDetails.tiffinboxSupplier')
      //.populate('orderDetails.menuId')
      //.populate('populateQuery')
      .exec(function(err, cart) {
        if(err) { return next(err); };
        if(cart) {
          console.log('Fetched Record:'+cart);
          //console.log(tiffinBoxSupplier);
          return res.json(cart);
        } else {
          return res.json(404, {error: 'Tiffin box supplier not found!'});
        }
    });
  };

cart.deleteToCart = function(req, res, next){
    console.log('in deleteToCart api'+req.params.id);
    console.log(req.body);
    Cart.findById(req.params.id,function(err,cart){
      if(err){return next(err);}
      console.log('length'+cart.orderDetails.length);
      if (cart){
        cart.orderDetails.pull({_id:req.params.singlecartid});
        // console.log('deleted:'+cart);
        // return res.json(cart);
        cart.save(function(err,cart){
          if(err){return next(err);}
          if(cart){
            console.log('after delete:'+cart);
            return res.json(cart);
          }
        })
      }
       else {
          return res.json(404, {error: 'page not found!'});
        }
      
    });


    
  };
  
  cart.updateToCart = function(req, res, next){
    console.log('in updateToCart api'+req.params.id);
    console.log(req.body);
    // Cart.findById(req.params.id,function(err,cart){
    //   if(err){return next(err);}
    //   console.log('length'+cart.orderDetails.length);
    //   if (cart){
    //     cart.orderDetails.pull({_id:req.params.singlecartid});
    //     // console.log('deleted:'+cart);
    //     // return res.json(cart);
    //     cart.save(function(err,cart){
    //       if(err){return next(err);}
    //       if(cart){
    //         console.log('after delete:'+cart);
    //         return res.json(cart);
    //       }
    //     })
    //   }
    //    else {
    //       return res.json(404, {error: 'page not found!'});
    //     }
      
    // });




    Cart.findById(req.params.id, function(err,cart){
      console.log('kk');
      if(err){return next(err);}
      if(cart){
        console.log(req.body.updateDetails);
        var updateDetails = req.body.updateDetails;
        console.log('length'+updateDetails.length);
        for (var i = 0; i< cart.orderDetails.length; i++){
          console.log(cart.orderDetails[i]._id);
          for(var j= 0; j<updateDetails.length; j++){
            console.log(updateDetails[j].dayId);
            if(updateDetails[j].dayId==cart.orderDetails[i]._id){
              cart.orderDetails[i].deliveryAddress=updateDetails[j].deliveryAddress;
              console.log(cart.orderDetails[i].deliveryAddress);
            }
          }
        }
        cart.save(function(err, cart){
          if (err) {return next(err);};
          if(cart){
            console.log('updated cart'+cart);
            return res.json(cart);
          }
        });
      }
    });

  };

   return cart;
};
