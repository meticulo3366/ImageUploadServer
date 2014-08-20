var mongoose = require('mongoose');
var User = require('./User.js');

var imageSchema = mongoose.Schema({
  img: { 
    data: String, 
    contentType: String 
  },
  path: String,
  msg: String,
  status: {
    type: String,
    enum: ['In Progress', 'Approved', 'Rejected'],
    default : 'In Progress'
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Image', imageSchema);
