/**
 *
 */

var mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('../utils')
  , config = require('../config/config')
  , TiffinSupplier = require('../models/TiffinboxSuppliers')
  , User = require('../models/User');


module.exports = function(app) {
  
  var user = {};

    user.create = function(req, res, next){
      console.log(req.query.dabbawalaId);
    var isTiffinSupplierMember= false;
    var user = new User(req.body);
    //user.set('name', req.body.firstName + ' ' + req.body.lastName);
    user.set('fullname', req.body.firstName + ' ' + req.body.lastName);
    user.set('password', req.body.password);

    user.confirmationToken = util.getRandomToken();

    user.createdAt =
    user.updatedAt =
    user.confirmationTokenSentAt = new Date();
    
    user.loginIps.push(req.ip);

    if(req.query.dabbawalaId){
        console.log('tiffinboxSupplier id is'+ req.query.dabbawalaId);
        isTiffinSupplierMember= true;
        user.tiffinboxSupplier= req.query.dabbawalaId;
    }

    user.save(function(err, user){
    if (err) { return next(err)};

        if(user){

          if(isTiffinSupplierMember){
            TiffinSupplier.findById(req.query.dabbawalaId,
              function(err,tiffinboxSupplier){
                tiffinboxSupplier.team.push(user._id);
                tiffinboxSupplier.save(function(err,tiffinboxSupplier){
                  console.log('dabbawala updated with team'+tiffinboxSupplier.team);
                    // Store
                    //localStorage.setItem("tiffinboxSupplierId", tiffinboxSupplier._id)
                    // Retrieve localStorage.getItem(tiffinboxSupplierId);
              });
            });
          }

          var params = {
            to: user.email,
            message: config.email.message.buildConfirmationMessage(user.email, user.confirmationToken),
            subject: config.email.subject.confirmationEmail
          };
          app.monq.sendEmail(params, function(err){
            if(err) { return next(err);};
          });

          req.flash('info', {msg: config.messages.confirmationMailSent});
          return res.json(user);
        }
        else {
          return res.status(500).json({error: 'Unable to add user!'});
        }
        
    });
  };

  user.update = function (req, res, next){
    console.log('in update api user');
    console.log(req.params.id);
    if(req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body,
      function(err,user){
        if(!err){
          console.log(user);
          return res.json(user);
        } else {
          return next(err);
        }
      });
    }  
  };

  user.delete = function (req, res, next){
    console.log('in delete user api'+req.params.id);
    if(req.params.id){
      console.log("ok");
      User.findById(
        req.params.id,
        function(err,user){
          if(!err){
            console.log(user);
            
            if(user){
              user.remove();
              res.json(user);
            }
          }
      });
    }  
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


  user.startFbAuthentication = function(req, res, next){
    passport.authenticate('facebook', {
      scope:['email', 'read_stream', 'publish_actions'],
      profileFields: ['email', 'picture']
    })(req, res, next);
  };

  user.onFbAuthenticationComplete = function(req, res, next){
    passport.authenticate('facebook', function(err, user, info) {
      if (err) { return next(err);}
      if (!user) {
        return res.status(500).json({error: 'User not found!'});
      }
      return req.logIn(user, function(err) {
        if (err) { return next(err);}

        if(info != null) {
          return res.redirect(info.redirectTo);
        }        
      });
    })(req, res, next);
  };

  user.logout = function(req, res){
    req.logout();
    req.flash('info', {msg: config.messages.signOut});
    return res.json({msg: config.messages.signOut});
  };

  user.forgotPassword = function(req, res, next) {
     var query = {email: req.body.email};
     User.findOne(query, function (err, user) {
      if (err) {next(err); }
      if (user) {
        var resetToken = util.getRandomToken();
        
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenSentAt = user.updatedAt = new Date();

        user.save(function(err){
          if(err) { return next(err)};

          var params = {
            to: user.email,
            message: config.email.message.buildResetPasswordMessage(user.email, user.resetPasswordToken),
            subject: config.email.subject.resetPasswordEmail
          };
          app.monq.sendEmail(params, function(err){
            if(err) { return next(err);}
          });
          return res.json({msg: config.messages.resetPswdMailSent});
        });      
      } else {
        return res.status(500).json({error: config.messages.emailNotRegistered});
      };
    });
  };

  user.renderResetPasswordPage = function(req, res, next) {
    var query = {
      email: req.query.email,
      resetPasswordToken: req.query.token
    };

    User.findOne(query, function (err, user) {
      if(err) { return next(err)};

      if(user) {
        req.flash('info', [req.query.token, req.query.email])
        return res.redirect('/users/resetPasswordPage?token='+user.resetPasswordToken+'&email=' + user.email);
      } else {
        return res.status(500).json({error: config.messages.invalidTokenEmail});
      };
    });
  };

  user.resetPassword = function(req, res, next) {
    var newPassword = req.body.newPassword
    , query = {email: req.body.email, resetPasswordToken: req.body.token};

    User.findOne(query, function (err, user) {
        if (user) {
          user.set('password', newPassword);
          user.resetPasswordToken = null;
          user.updatedAt = new Date();

          user.save(function(err){
            if(err) { next(err); }
            req.flash(req.flash('info', {msg: config.messages.pswdResetSuccessfully}));
            return res.redirect('/users/user#signin');
          });
        } else{
          return res.status(500).json({error: config.messages.invalidTokenEmail});
        };
    });
  };
  return user;
};
