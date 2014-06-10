var mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('../utils')
  , config = require('../config/config')
  , TiffinSupplier = require('../models/TiffinboxSuppliers')
  , TiffinCalendar = require('../models/TiffinCalendar')
  , User = require('../models/User');


module.exports = function(app) {
  
  var calendar = {};


  calendar.getMenuDate = function (req, res,next) {
  	console.log('in getMenuDate apidddddd');
    console.log(req.query.menuDate);
    var query= req.query.menuDate;
    var arr = query.split(',');
    //console.log(arr);
    //var myarr= JSON.parse(arr);
    //console.log(myarr);
    TiffinCalendar.find({tiffinboxSupplier: {$in: arr}}) 
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


  calendar.assignMenuDate = function(req, res, next){
    console.log('in assignMenuDate api');
    console.log('dabbawalaId:'+req.params.dabbawalaId);
    
    TiffinCalendar.findOne({tiffinboxSupplier:req.params.dabbawalaId},
      function(err,result){
        if (err) { return next(err);};
        if(result){
          result.tiffinboxSupplier= req.params.dabbawalaId;
          console.log('date::'+req.body);
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

  return calendar;
};