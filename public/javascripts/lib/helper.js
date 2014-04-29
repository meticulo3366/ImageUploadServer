Handlebars.registerHelper('isSelected', function(context, value) {
  console.log(context);
  console.log(value)
  if(context == value){
    console.log('matched');
    return true;
  }
    
  else
    return false;
});


Handlebars.registerHelper('isPresent', function(array, value) {
  
	console.log(array);
	console.log(value);

  for(var i = 0 ; i < array.length; i++) {
  	if(array[i] == value) {
      console.log('matched');
  		return true;
  	}
  };

  console.log('match not found!');
  return false;
});
