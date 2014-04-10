/**
 *
 */

var mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('../utils')
  , config = require('../config/config')
  , User = require('../models/User')
  , Dabbawala = require('../models/TiffinboxSuppliers');

module.exports = function(app) {
  
  var dabbawala = {};

    dabbawala.create = function(req, res, next){
    var user = new Dabbawala(req.body);
    // user.name= req.body.name;
    // user.email= req.body.email;
    // user.address= req.body.address;
    // user.contactNumber= req.body.contactNumber;
    // user.distributionAreas= req.body.distributionAreas;
    // user.category= req.body.category;
    // user.mealType= req.body.mealType;
    user.save(function(err, user){
        if (err) { return next(err)};
        if(user) {
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

  dabbawala.read = function(req, res, next){
    Dabbawala.find({},function(err,dabbawalaList){
    if (!err){
      // res.render('user-list.ejs',{students:students});
      res.json(dabbawalaList);
    }
  });
  };

  dabbawala.createMenu = function(req, res, next){
    console.log('in Menu api'+req.body.dbw);
    Dabbawala.findOne(
      {name:req.body.dbw},
      function(err,dabbawala){
        if(err){return next(err)}
        if(dabbawala){
          dabbawala.menu.push(
            {
              name:req.body.name,
              category: req.body.category,
              mealType: req.body.mealType,
              description: req.body.description,
              ingredients: req.body.ingredients,
              fullPrice: req.body.fullPrice,
              discountedPrice: req.body.discountedPrice
          });

          dabbawala.save(function(err,dabbawala){
            if(err){

            }
            else{
              console.log('dabbawala menu saved'+ dabbawala);
              res.json(dabbawala);
            }

          });
        }  

      });


  };

  dabbawala.createTeam = function(req, res, next){
    console.log('in createTeam api:'+req.body.dbw);
    Dabbawala.findOne(
      {name:req.body.dbw},
      function(err,dabbawala){
        if(err){return next(err)}
        if(dabbawala){ 
          var user = new User(req.body);
          user.set('fullname', req.body.firstName + ' ' + req.body.lastName);
          user.set('password', req.body.password);
          user.tiffinboxSupplier= dabbawala._id;
          user.save(function(err, user){
            if (err) { return next(err)};
                if(user) {
                  console.log('team is saved'+user);
                  dabbawala.team.push(user._id);
                  dabbawala.save(function(err,dbw){
                    if(!err){
                      console.log('dabbawala updated with team'+dabbawala);
                    }
                  });
                  return res.json(user); 
                }
                else {
                  return res.status(500).json({error: 'Unable to add user!'});
                }
                
            }); 
        }  

      }
    );


  };


 
  return dabbawala;
};



