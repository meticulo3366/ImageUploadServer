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

// Handlebars.registerHelper('@first', function(array,first) {
  
//   console.log(array);
//   console.log(value);

//   for(var i = 0 ; i < array.length; i++) {
//     if(i == 0) {
//       console.log('first');
//       ;
//     }
//   };

//   console.log('match not found!');
//   return false;
// });

Handlebars.registerHelper("foreach",function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function(item,index) {
        item.$index = index;
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
    }).join('');
});
