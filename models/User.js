
/**
 * User model
 */

var bcrypt = require('bcrypt-nodejs')
  , mongoose = require('mongoose');
  
var userSchema = mongoose.Schema({
  name: {
    first: {
    	type:String,
    	required: true,
    },  
    last: {
    	type: String,
    	required: true,
    }  
  },
  
  salt: {
    type: String,
    required: true,
  },
   hash: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },
   
  facebook:{
    profileId: String,
    displayName: String,
    givenName: String,
    familyName: String,
    emailId: String,
    photo: String,
    accessToken: String
  },
  role: {
    type: String,
    default: 'user',

  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  signInCount: {
    type: Number,
    default: 0
  },
  loginIps: []
});

// virtuals
userSchema
.virtual('password')
.set(function(password) {
  this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, this.salt);
});



userSchema
.virtual('fullname')
.get(function () {
  return this.name.first + ' ' + this.name.last;
})
.set(function (fullname) {
   var split = fullname.split(' ')
    , first = split[0]
    , last = split[1];

  this.set('name.first', first);
  this.set('name.last', last);
});

//methods
userSchema.methods = {
  increaseSignInCount: function increaseSignInCount (callback) {
    this.signInCount += 1;
    return;
  },

  updateFbAccessToken: function updateFbAccessToken (accessToken, callback) {
    this.facebook.accessToken = accessToken;
    this.updatedAt = new Date();
    return;
  },

  addSignInIp: function addSignInIp (loginIp, callback) {
    if(this.loginIps.length == 5){
      this.loginIps.pop();
      this.loginIps.push(loginIp);
    } else {
      this.loginIps.push(loginIp);
    };
    this.updatedAt = new Date();
    return this.save(callback);
  }
};


var User = mongoose.model('User', userSchema);

User.find({role: "admin"}, function(err, users) {

  if(err) { console.log(err); return err;}

  if(users.length>0) {
    return;
  } else {

    var user = new User();
    user.role = "admin";
    user.email = "mr.zeke.dean@gmail.com";
    user.contactNumber=9173929018;
    user.set('password', "12345z");
    user.set('fullname', "Super Admin");

    user.save(function(err) {
      if(err) {
       console.log(err);
        return err;
      }

      return;
    })
  };
});

module.exports = User;
