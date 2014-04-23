Handlebars.registerHelper('isChecked', function(context, options) {
  return ($(".context").is(':checked')) ? options.fn : options.inverse;
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
