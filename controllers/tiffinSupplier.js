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

    TiffinboxSupplier.findById(req.params.id)
      .populate('team')
      .exec(function(err, tiffinBoxSupplier) {
        if(err) { return next(err); };
        if(tiffinBoxSupplier) {
          console.log('Fetched Record:'+tiffinboxSupplier);
          console.log(tiffinboxSupplier);
          return res.json(tiffinBoxSupplier);
        } else {
          return res.json(404, {error: 'Tiffin box supplier not found!'});
        }
    });
  };

  tiffinboxSupplier.addMenu = function(req, res, next){
    console.log('in Menu api'+req.query.dabbawalaId);
    TiffinboxSupplier.findById(
      req.query.dabbawalaId,
      function(err,tiffinboxSupplier){
        if(err){return next(err)}
        if(tiffinboxSupplier){
          tiffinboxSupplier.menu.push(req.body);

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

  // tiffinboxSupplier.getTeam = function(req, res, next) {
  //   console.log('in get team api');
  //   //req.params.id - tiffinBoxSupplierId
  //   TiffinboxSupplier.findById(req.params.id)
  //     .populate('team')
  //     .exec(function(err, tiffinBoxSupplier) {

  //       if(err) { return next(err); };

  //       if(tiffinBoxSupplier) {
  //         console.log('team'+tiffinboxSupplier);
  //         return res.json(tiffinBoxSupplier);
  //       } else {
  //         return res.json(404, {error: 'Tiffin box supplier not found!'});
  //       }

  //     });
  // };
 

 

  // tiffinboxSupplier.getMenu = function(req, res, next) {
  //     console.log('in get Menu api');
  //     //req.params.id - tiffinBoxSupplierId
  //     TiffinboxSupplier.findById(req.params.id)
  //       .exec(function(err, tiffinBoxSupplier) {

  //         if(err) { return next(err); };

  //         if(tiffinBoxSupplier) {
  //           console.log('menu'+tiffinboxSupplier.menu);
  //           return res.json(tiffinBoxSupplier);
  //         } else {
  //           return res.json(404, {error: 'Tiffin box supplier not found!'});
  //         }

  //       });
  //   };

  tiffinboxSupplier.search = function (req, res, next) {

    var regex = new RegExp(req.query.query, 'i');
    //console.log('in search'+req.query.query);
    var query = {$or: [
      {name: { $regex: regex}}
      ,{distributionAreas: {$in: [regex]}}
      ,{category: {$in: [regex]}}
      ,{mealType: {$in: [regex]}}
      ,{orderType: {$in: [regex]}}
      ]};

      //console.log(query);

    TiffinboxSupplier.find(query, function(err, tiffinBoxSuppliers) {

      if(err) { return next(err); };
      //console.log(tiffinBoxSuppliers);
      res.json(tiffinBoxSuppliers);
    });
  };

<<<<<<< HEAD
tiffinboxSupplier.filter=function(req,res,next){
  console.log('In Filter function Server');
  console.log(req.body);
  res.json({name:NAme});
}
 
=======
>>>>>>> 51214c569bf9106072dda0723e86541832b5faa8

  tiffinboxSupplier.filter=function(req,res,next){
    console.log('In Filter function Server');
    console.log(req.body);
    res.json({name:NAme});
  };
 
  tiffinboxSupplier.delete = function (req, res, next) {
    if(req.params.id){
      console.log("ok");
      TiffinboxSupplier.findById(
        req.params.id,
        function(err,tiffinBoxSupplier){
          if(!err){
            tiffinBoxSupplier.remove();
            res.json(tiffinBoxSupplier);
          }
      });
    }  
  };

  tiffinboxSupplier.update = function (req, res, next) {
    console.log("in update api"+req.params.id);
    if(req.params.id){
      console.log("in update api");
      TiffinboxSupplier.findByIdAndUpdate(req.params.id, req.body,
        function(err,tiffinBoxSupplier){
          if(!err){
            console.log(tiffinBoxSupplier);
            return res.json(tiffinBoxSupplier);
          } else {
            return next(err);
          }
        });
    }  
  };

  tiffinboxSupplier.updateMenu= function(req,res, next){
    console.log('in updateMenu api');
    console.log('dabbawalaId:'+req.params.dabbawalaId);
    console.log('menuId : '+req.params.menuId);
    TiffinboxSupplier.findById(
      req.params.dabbawalaId,
      function(err,tiffinboxSupplier){
        if(err){return next(err)}
        if(tiffinboxSupplier){
          var menuId = req.params.menuId;
          console.log(tiffinboxSupplier.menu.length);
          for( var i= 0; i < tiffinboxSupplier.menu.length; i++){
            console.log('in for');
            if(tiffinboxSupplier.menu[i].id === menuId){
              console.log('matched');
              tiffinboxSupplier.menu[i].id= menuId;
              tiffinboxSupplier.menu[i].name=req.body.name;
              tiffinboxSupplier.menu[i].ingredients =req.body.ingredients;
              tiffinboxSupplier.menu[i].description=req.body.description;
              tiffinboxSupplier.menu[i].category=req.body.category;
              tiffinboxSupplier.menu[i].mealType=req.body.mealType;
              tiffinboxSupplier.menu[i].fullPrice=req.body.fullPrice;
              tiffinboxSupplier.menu[i].discountedPrice=req.body.discountedPrice;
              console.log(tiffinboxSupplier.menu[i]);
              break;
            }
          }

          tiffinboxSupplier.save(function(err,tiffinboxSupplier){
            if(err){
              return next(err);
            }
            else{
              console.log('dabbawala menu saved'+ tiffinboxSupplier.menu);
              res.json(tiffinboxSupplier);
            }
          });
        }  
    });
  };
  
  tiffinboxSupplier.deleteMenu = function(req, res, next){
    console.log('in deleteMenu api');
  };

 
  return tiffinboxSupplier;
};

