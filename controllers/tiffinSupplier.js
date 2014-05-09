/**
 *
 */

var mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('../utils')
  , config = require('../config/config')
  , User = require('../models/User')
  , TiffinCalendar = require('../models/TiffinCalendar')
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
          console.log('Fetched Record:');
          //console.log(tiffinBoxSupplier);
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

  tiffinboxSupplier.assignMenuDate = function(req, res, next){
    console.log('in assignMenuDate api');
    console.log('dabbawalaId:'+req.params.dabbawalaId);
    // var menuDate = new TiffinCalendar();
    // menuDate.tiffinboxSupplier= req.params.dabbawalaId;
    // menuDate.days.push(req.body);
    // menuDate.save(function(err,menuDate){
    //   if (err) {return next(err);};
    //   if (menuDate) {
    //     console.log('date is assignet to menu');
    //     res.json(menuDate);
    //   };
    // });
  TiffinCalendar.findOne({tiffinboxSupplier:req.params.dabbawalaId},function(err,result){
    if (err) { return next(err);};
    if(result){
      result.tiffinboxSupplier= req.params.dabbawalaId;
      result.days.push(req.body);
      result.save(function(err,menuDate){
        if (err) {return next(err);};
        if (menuDate) {
          console.log('date is assignet to menu--after first record');
          res.json(menuDate);
        };
      });
    }
    else{
      var menuDate = new TiffinCalendar();
      menuDate.tiffinboxSupplier= req.params.dabbawalaId;
      menuDate.days.push(req.body);
      menuDate.save(function(err,menuDate){
        if (err) {return next(err);};
        if (menuDate) {
        console.log('date is assignet to menu--this is first Record');
        res.json(menuDate);
      };
    });
    }
  });

    
  };



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
      console.log('Search result:'+tiffinBoxSuppliers);

      res.json(tiffinBoxSuppliers);
    });
  };

  tiffinboxSupplier.checkout = function (req, res, next) {
    console.log('in checkout api');
    console.log(req.query.query);
    var query= req.query.query;
    var arr = query.split(',');
    console.log(arr.length);
    console.log(arr);
    var myarr= JSON.parse(arr);
    console.log(myarr);

    var ts=[];
   /* for (var i = 0; i< myarr.length;  i++) {
      console.log(i);*/
      TiffinboxSupplier.find({_id: {$in: myarr}}, function(err,tiffinBoxSuppliers){
        if(err) { return next(err); };
        //console.log(i);
       //ts.push(tiffinBoxSuppliers);
       /* if( i === (myarr.length-1)) {
          console.log('Passing response to client!');
          res.json(ts);
        };
        console.log(tiffinBoxSuppliers);*/
        res.json(tiffinBoxSuppliers);
      });
    //};  
  };

tiffinboxSupplier.getMenuDate = function (req, res,next) {
    console.log('in getMenuDate api');
    console.log(req.query.menuDate);
    var query= req.query.menuDate;
    var arr = query.split(',');
    console.log(arr.length);
    console.log(arr);
    var myarr= JSON.parse(arr);
    console.log(myarr);

    var ts=[];
    TiffinCalendar.find({tiffinboxSupplier: {$in: myarr}}) 
    .populate('tiffinboxSupplier')
    .exec(function(err,tiffinBoxSuppliers){
      if(err) { return next(err);
      };
      if(tiffinBoxSuppliers){
        console.log('result:'+tiffinBoxSuppliers);
        res.json(tiffinBoxSuppliers);
      }
      else{
        console.log('error: record not found!');
      }
    });
};


tiffinboxSupplier.filter = function(req,res,next){
  
  var filterValue=req.query.query;
  var filterval=JSON.parse(filterValue);
  var regex = new RegExp(req.query.search, 'i');

  console.log(req.query.query);
  console.log(filterval);

  var cat= filterval.category;
  var meal=filterval.mealType;
  var order=filterval.orderType;

  console.log(cat);
  console.log(meal);
  console.log(order);

  var que=[];
  if( typeof cat=='object'){
    que.push({category:{ $all :cat}});
  }
  else if ( typeof cat=='string'){
    que.push({category:{$all: cat}});
    }
  if(typeof meal=='object'){   
    que.push({mealType:{ $all :meal}});
  }
  else if(typeof meal=='string'){
    que.push({mealType:{$all: meal}});
  }
  if(typeof order=='object'){ 
    que.push({orderType:{ $all :order}});
  }
  else if(typeof order=='string'){   
   que.push({orderType:{$all: order}});
  }

  console.log('---------------------------');
  console.log(typeof order);
  console.log(typeof meal);
  console.log('---------------------------');

  console.log(typeof order == 'string');
  console.log(typeof meal == 'object'); 
  console.log("que:");
  console.log(que);

   var query={$and:
                [{$or: 
                  [{name: { $regex: regex}}
                  ,{distributionAreas: {$in: [regex]}}
                  ,{category: {$in: [regex]}}
                  ,{mealType: {$in: [regex]}}
                  ,{orderType: {$in: [regex]}}]
                }, {$and: que}] 
              };

console.log(query);
TiffinboxSupplier.find(query, function(err, tiffinboxSupplier) {

      if(err) { return next(err); };
      console.log(tiffinboxSupplier.length);
      res.json(tiffinboxSupplier);
    });
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
    console.log('dabbawalaId:'+req.params.dabbawalaId);
    console.log('menuId : '+req.params.menuId);
    TiffinboxSupplier.findById(
      req.params.dabbawalaId,
      function(err,tiffinboxSupplier){
        if(err){return next(err)}
        if(tiffinboxSupplier){
          var menuId = req.params.menuId;
          tiffinboxSupplier.menu.pull({_id: menuId});

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

 
  return tiffinboxSupplier;
};

