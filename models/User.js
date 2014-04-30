
/**
 * User model
 */

var bcrypt = require('bcrypt-nodejs')
  , mongoose = require('mongoose')
  , Tiffinboxsupplier = require('./TiffinboxSuppliers');

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
   contactNumber: {
    type: Number,
    required: true
  },
  tiffinboxSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tiffinboxsupplier'
  },
  address:[{
      vicinity:String,
      city:String,
      state:String,
      zipCode:String
    }],
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
    default: 'consumer',

  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  confirmationToken: String,
  confirmationTokenSentAt: {
    type:Date
  },
  confirmationAt: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordTokenSentAt: {
    type: Date
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

userSchema.post('remove', function(user) {

  if(user.tiffinboxSupplier) {
    Tiffinboxsupplier.findById(user.tiffinboxSupplier, function(err, tiffinboxSupplier) {
      if(err) {return err;};

      if(tiffinboxSupplier){
        tiffinboxSupplier.team.pull(user.id);
        tiffinboxSupplier.save(function(err) {
          if(err) { return err;};
          console.log('Tiffinboxsupplier updated!');
        });
      };
    });
  };
});

var User = mongoose.model('User', userSchema);

User.find({role: "admin"}, function(err, users) {

  if(err) { console.log(err); return err;}

  if(users.length>0) {
    return;
  } else {

    var user = new User();
    user.role = "admin";
    user.email = "admin@sqrinfotech.com";
    user.contactNumber=9879879798;
    user.set('password', "admin123");
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