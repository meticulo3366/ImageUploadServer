/**
 *
 */

var mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('../utils')
  , config = require('../config/config')
  , User = require('../models/User')
  , TiffinboxSupplier = require('../models/TiffinboxSuppliers');

module.exports = function(app) {
  
  var tiffinboxSupplier = {};

    tiffinboxSupplier.create = function(req, res, next){
    var tiffinboxSupplier = new TiffinboxSupplier(req.body);
   
    
    tiffinboxSupplier.save(function(err, tiffinboxSupplier){
        if (err) { return next(err)};
        if(tiffinboxSupplier) {
          console.log('dabbawala saved'+tiffinboxSupplier);
          // var params = {
          //   to: user.email,
          //   message: config.email.message.buildConfirmationMessage(user.email, user.confirmationToken),
          //   subject: config.email.subject.confirmationEmail
          // };
          // app.monq.sendEmail(params, function(err){
          //   if(err) { return next(err);};
          // });

          // req.flash('info', {msg: config.messages.confirmationMailSent});
          return res.json(tiffinboxSupplier);
        }
        else {
          return res.status(500).json({error: 'Unable to add TiffinboxSupplier!'});
        }
        
    });
  };

  tiffinboxSupplier.index = function(req, res, next){
    TiffinboxSupplier.find({},function(err,dabbawalaList){
    if (!err){
      res.json(dabbawalaList);
    }
  });
  };

  tiffinboxSupplier.show = function(req,res){
    console.log('in show api'+req.params.id);
  if(req.params.id){
    console.log('true');
    TiffinboxSupplier.findById(req.params.id,
      function(err,tiffinboxSupplier){
        console.log('in function');
        if(!err){
          console.log('in !err if');
          res.json(tiffinboxSupplier);
        }
        else{
          console.log(err);
          return res.status(500).json({error: 'Page Note Found!'});
        }
      });
  }
};

  tiffinboxSupplier.addMenu = function(req, res, next){
    console.log('in Menu api'+req.body.dbw);
    TiffinboxSupplier.findOne(
      {name:req.body.dbw},
      function(err,tiffinboxSupplier){
        if(err){return next(err)}
        if(tiffinboxSupplier){
          var split= req.body.ingredients.split(',');

          console.log(split);
          tiffinboxSupplier.menu.push(
            {

              name:req.body.name,
              category: req.body.category,
              mealType: req.body.mealType,
              description: req.body.description,
              ingredients:split,
              fullPrice: req.body.fullPrice,
              discountedPrice: req.body.discountedPrice
          });

         

      

          tiffinboxSupplier.save(function(err,tiffinboxSupplier){
            if(err){

            }
            else{
              console.log('dabbawala menu saved'+ tiffinboxSupplier.menu);
              res.json(tiffinboxSupplier);
            }

          });
        }  

      });


  };

  tiffinboxSupplier.getTeam = function(req, res, next) {
    console.log('in get team api');
    //req.params.id - tiffinBoxSupplierId
    TiffinboxSupplier.findById(req.params.id)
      .populate('team')
      .exec(function(err, tiffinBoxSupplier) {

        if(err) { return next(err); };

        if(tiffinBoxSupplier) {
          console.log('team'+tiffinboxSupplier);
          return res.json(tiffinBoxSupplier);
        } else {
          return res.json(404, {error: 'Tiffin box supplier not found!'});
        }

      });
  };
 

 

tiffinboxSupplier.getMenu = function(req, res, next) {
    console.log('in get Menu api');
    //req.params.id - tiffinBoxSupplierId
    TiffinboxSupplier.findById(req.params.id)
      .exec(function(err, tiffinBoxSupplier) {

        if(err) { return next(err); };

        if(tiffinBoxSupplier) {
          console.log('menu'+tiffinboxSupplier.menu);
          return res.json(tiffinBoxSupplier);
        } else {
          return res.json(404, {error: 'Tiffin box supplier not found!'});
        }

      });
  };

  tiffinboxSupplier.search = function (req, res, next) {

    var regex = { $regex: new RegExp(req.query.query, 'i')};
    console.log('in search'+req.query.query);
    var query = {$or: [
      {name: regex}
      ,{ditributionAreas: {$in: [regex]}}
      ,{category: {$in: [regex]}}
      ,{mealType: {$in: [regex]}}
      ]};

      console.log(query);

    TiffinboxSupplier.find(query, function(err, tiffinBoxSuppliers) {

      if(err) { return next(err); };
      console.log(tiffinBoxSuppliers);
      console.log('result'+tiffinBoxSuppliers);
      res.json(tiffinBoxSuppliers);
    });
  };

tiffinboxSupplier.delete = function (req, res, next) {
    if(req.params.id){
    console.log("ok");
    TiffinboxSupplier.findById(req.params.id,
      function(err,tiffinBoxSupplier){
        if(!err){
          tiffinBoxSupplier.remove();
             res.json(tiffinBoxSupplier);
          }
      });
  }
   
  };
  

 
  return tiffinboxSupplier;
};

