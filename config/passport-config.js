
/**
*
*/

var passport = require('passport')
, localStrategy = require('passport-local').Strategy
, facebookStrategy = require('passport-facebook').Strategy
, User = require('../models/User')
, bcrypt = require('bcrypt-nodejs')
, util = require('../utils')
, secret = require('./secret');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new localStrategy({usernameField: 'email'}, function(username, password, done) {
  process.nextTick(function(){
    User.findOne({email: username}, function(err, user) {
      if(err){
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Email : ' + username + 'is not registered with the application'});
      }
      else{
        var passwordMatch = bcrypt.compareSync(password, user.hash);
        if (passwordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid email or password.' });
        }
      }
    });

  });	
}));

passport.use(new facebookStrategy
  (secret.facebook, 
  function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function(){

      var query = User.findOne({'facebook.profileId': profile.id});
      query.exec(function(err, existingUser){
        if(err) {return done(err);};
        
        if(existingUser){          
          existingUser.increaseSignInCount();
          existingUser.updateFbAccessToken();
          existingUser.addSignInIp(req.ip, function(err){
            if (err) { return done(err)};
          });  

          return done(null, existingUser, {redirectTo: '/users/user#home'});
        }else{

          var user = new User();
          var facebook = user.facebook;
          user.set('fullname', 
            profile.name.givenName + ' ' + profile.name.familyName);

          facebook.profileId = profile.id;
          facebook.displayName = profile.displayName;
          facebook.givenName = profile.name.givenName;
          facebook.familyName = profile.name.familyName;
          facebook.accessToken = accessToken;
          facebook.photo = profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          
          facebook.emailId =
          user.email = 
          profile.emails[0].value;
          
          user.signInCount = user.signInCount + 1;
          user.loginIps.push(req.ip);
          user.createdAt = user.updatedAt = new Date();
          user.save(function(err){ 
          if(err) { return done(err);} 
            return done(null, user, {redirectTo: '/users/user#profile'}); 
          });
        }
     });
  });
}));

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()){
    next(); 
  } else {
    res.redirect('/users/user#signin');
  }
};


exports.ensureAdmin = function(req, res, next) {
  
  if(req.user && req.user.role === 'admin')
      next();
  else
      res.json(403, {error: 'Forbidden'});
};