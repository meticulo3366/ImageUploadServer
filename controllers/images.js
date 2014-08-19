var mongoose = require('mongoose')
  , Image = require('../models/Image')
  , User = require('../models/User');


  var fs = require("fs");

module.exports = function(app) {
  
  var image = {};

  image.savePicture = function(req, res, next){
	console.log(req);
	console.log(req.params);
    User.findById(req.params.id, function(err, user){
	
      if(err){return next(err); };
        
      if(user) {
        //var filePath = "/home/ubuntu/IMAGES/"+req.params.id+".jpg";
        //fs.writeFile(filePath, new Buffer(req.body.data, "base64").toString(), function(err) {});

        image = new Image();
        image.member = req.params.id;
        image.img.data = req.body.data;
        //image.img.data = filePath;
        image.img.contentType = req.body.contentType;

        image.save(function(err, image){
          if (err) { return next(err)};

          if(image){
            return res.json(image);
          }
          else {
            return res.status(500).json({error: 'Unable to add image!'});
          }; 
        });

      };
    });
  };

  image.approveImage = function(req, res, next){
    Image.findById(req.params.id, function(err, image){
      if(err){return next(err); };
        
      if(image) {
        image.status = "Approved";
        image.save(function(err, image){
          if (err) { return next(err)};

          if(image){
            return res.json(image);
          }
          else {
            return res.status(500).json({error: 'Unable to approve image!'});
          }; 
        });

      };
    });
  };

  image.rejectImage = function(req, res, next){
    Image.findById(req.params.id, function(err, image){
      if(err){return next(err); };
        
      if(image){
        image.remove(function (err, product) {
 	  	  if (err) { 
			return res.status(500).json({error:'unable to remove image'}); 
	          } else {
	            	return res.status(200).json({ok:'image removed'});
	          };

	  });
      }
      
    });
  };

  image.index = function(req, res, next){

    Image.find({},function(err,images){
      if (err){
        throw err;
      } else{
        res.json(images);
      };
    });
  };

  return image;
};
