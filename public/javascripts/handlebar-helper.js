
Handlebars.registerHelper('imagesExist', function(images, type, options) {
  var isExist = false;
  var count = 0;
  for(var i = 0; i < images.length;i++){
    if(type === "In Progress"){
    	if(images[i].status === "In Progress"){        
	      count = count+1;
	      isExist = true;
	    };
    };

    if(type === "Approved"){
    	if(images[i].status === "Approved"){
	      isExist = true;
	      count = count + 1;
	    };
    };
  };

  if(isExist){
    return options.fn({images:images,count:count});
  }else{
    return options.inverse(this);
  };
});

Handlebars.registerHelper('imagesList', function(images, type, options) {
  var loop = '';
  for(var i = 0; i < images.length;i++){
    
    if(type === "In Progress"){
    	if(images[i].status === "In Progress")       
      	loop += options.fn({image:images[i]});
    };

    if(type === "Approved"){
    	if(images[i].status === "Approved")  
      	loop += options.fn({image:images[i]});
    };
  };
  if(loop == ""){
    return options.inverse(this);
  };
  return loop;
});

