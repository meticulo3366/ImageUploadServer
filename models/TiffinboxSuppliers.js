
/**
 * Tiffinboxsuppliers model
 */

var bcrypt = require('bcrypt-nodejs')
  , mongoose = require('mongoose');

var tiffinboxsuppliersSchema = mongoose.Schema({
  team: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }], 

  name: {
    type: String,
    unique: true,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  address: {
    vicinity: String,
    city: String,
    state: String,
    zipCode: Number
  },

 contactNumber: {
    type: Number,
    required: true
  },

  distributionAreas: [String],

  category: [{
    type: String,
    enum: ['veg', 'nonveg', 'jain', 'gujrati']
  }], 

  mealType: [{
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks']
  }],

   orderType:[{
    type: String,
    enum: ['daily', 'weekly', 'monthly']
  }],

  menu: [{
   name: String,

   category: [{
    type: String,
    enum: ['veg', 'nonveg', 'jain', 'gujrati']
   }],

   mealType: [{
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks']
   }],

   description: String,
   ingredients: [String],
   fullPrice: Number,
   discountedPrice: Number
  }],

 

  price: {
    monthly: {
      breakfast: Number,
      lunch: Number,
      dinner: Number
    },
    weekly: {
      breakfast: Number,
      lunch: Number,
      dinner: Number
    }
   //Daily price is going to be picked up from menu.fullPrice or menu.discountedPrice
  }
});



module.exports = mongoose.model('Tiffinboxsuppliers', tiffinboxsuppliersSchema);
