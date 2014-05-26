
/**
 * Cart  model
 */

var bcrypt = require('bcrypt-nodejs')
  , mongoose = require('mongoose')
  , User = require('./User')
  , Tiffinboxsupplier = require('./TiffinboxSuppliers');
var cartSchema = mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  orderDetails:[{

    tiffinboxSupplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tiffinboxsupplier'
    },

    menuId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Tiffinboxsupplier.menu'
    },

    date: Date,
    mealAt: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snacks']
    },
    price: Number, //Daily will come from menu.price, monthly and weekly will come from dabbawala.price  

    deliveryAddress:{
      type: String
    }
  }],

  contactNumber: {
    type: Number
    
  },

  orderDate: Date,
  orderTotal: Number,
  discount: Number,
  coupon: String
});



module.exports = mongoose.model('Cart', cartSchema);
