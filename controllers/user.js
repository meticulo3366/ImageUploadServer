/**
 *
 */

var mongoose = require('mongoose')
  , MongoDb = require("mongodb")
  , passport = require('passport')
  , util = require('../utils')
  , bcrypt = require('bcrypt-nodejs')
  , config = require('../config/config')
  , User = require('../models/User');


module.exports = function(app) {
  var user = {};

    user.create = function(req, res, next){
    var user = new User(req.body);
    user.set('fullname', req.body.firstName + ' ' + req.body.lastName);
    user.set('password', req.body.password);

    user.confirmationToken = util.getRandomToken();

    user.createdAt =
    user.updatedAt =
    user.confirmationTokenSentAt = new Date();
    
    user.loginIps.push(req.ip);

    user.save(function(err, user){
    if (err) { return next(err)};
      if(user){
        return res.json(user);
      }
      else {
        return res.status(500).json({error: 'Unable to add user!'});
      }
        
    });
  };

  user.userLoggedIn= function(req, res, next){
    if(req.user) {
      return res.json({message: true, user: req.user});
    } else {
      return res.json({message: false});
    };
  };


  user.confirmEmail = function(req, res, next){
    var query = {
      email: req.query.email,
      confirmationToken: req.query.token
    };

    User.findOne(query, function (err, user) {
      if (err) {next(err);}
      if (user) {
        user.confirmationToken = null;
        user.confirmationTokenSentAt = null;
        user.updatedAt = user.confirmationAt = new Date();

        user.save(function(err){
          if(err) {next(err); }
       
          req.flash('info', {msg: config.messages.accountConfirmed});
          return res.redirect('/users/user#signin');
        });        
      }else{
        req.flash('info', {msg: config.messages.invalidTokenEmail});
        return res.redirect('/users/user#signin'); 
      }
    });
  };

  user.authenticate = function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err)};

      if (!user) {
        res.status(500).json({error: info.message});
      } else {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          user.increaseSignInCount();
          user.addSignInIp(req.ip, function(err){
            if (err) return next(err);
          });
          return res.json(user);       
        });
      };
    })(req, res, next);
  };

  user.logout = function(req, res){
    req.logout();
    req.flash('info', {msg: config.messages.signOut});
    return res.json({msg: config.messages.signOut});
  };
  return user;
};
