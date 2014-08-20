var mongoose = require('mongoose')
  , Image = require('../models/Image')
  , User = require('../models/User');


  var fs = require("fs");

module.exports = function(app) {
  
  var image = {};

  image.savePicture = function(req, res, next){
    User.findById(req.params.id, function(err, user){
	
      if(err){return next(err); };
        
      if(user) {

	//create image object
        image = new Image();
        image.member = req.params.id;
        image.img.data = req.body.data;
        image.path = 'images/'+image._id+'.jpg';
        image.img.contentType = req.body.contentType;
	image.msg = req.body.msg || 'I love Solar Strand';
        image.save(function(err, image2){
          if (err) { return next(err)};

          if(image2){
		        var buff = new Buffer(image2.img.data.replace(/^data:image2\/(png|gif|jpeg);base64,/,''), 'base64');
			var imageNAME = '/home/ubuntu/ImageUploadServer/public/images/'+image2._id+'.jpg';
	                fs.writeFile(imageNAME, buff, function (err) {
			    if (err) { return next(err);
			    }else{console.log(imageNAME);}
			});
            return res.json(image2);
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

  image.approved = function(req,res,next){
	Image
	.find({})
        .where('status').equals('Approved')
	.select('path msg')
	.exec( function(err,images){
	      if (err){
	        throw err;
	      } else{
	        res.json(images);
	      };
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
