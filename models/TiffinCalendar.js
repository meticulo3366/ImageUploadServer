
/**
 * TiffinCalendarSchema model
 */

var bcrypt = require('bcrypt-nodejs')
  , mongoose = require('mongoose')
  , Tiffinboxsupplier = require('./TiffinboxSuppliers');

var tiffincalendarSchema = mongoose.Schema({
   tiffinboxSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tiffinboxsupplier'  
  },

  days: [{
    date: Date,
    breakfast: {
      menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TiffinboxSupplier.menu' // will have to check if this works
      }
    } ,

    lunch: { 
     menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TiffinboxSupplier.menu'
      }
     },

    dinner:{
     menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TiffinboxSupplier.menu'
      }
    }
  }]
});


module.exports = mongoose.model('TiffinCalendar', tiffincalendarSchema);
