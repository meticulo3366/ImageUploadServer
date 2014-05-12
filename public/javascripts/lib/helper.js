Handlebars.registerHelper('isSelected', function(context, value) {
  //console.log(context);
  //console.log(value)
  if(context == value){
    //console.log('matched');
    return true;
  }
    
  else
    return false;
});


Handlebars.registerHelper('isPresent', function(array, value) {
  
	//console.log(array);
	//console.log(value);

  for(var i = 0 ; i < array.length; i++) {
  	if(array[i] == value) {
      //console.log('matched');
  		return true;
  	}
  };

  //console.log('match not found!');
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

Handlebars.registerHelper("countIndex",function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);
      //console.log('in countIndex:'+arr.length-1);

    return arr.length;

    
});

Handlebars.registerHelper("findMenuDate",function(arrDays,arrMenu,mealType,v,options) {
  console.log('in findMenuDate helper');
  //console.log('----------------------------');
  //var day = arrDays[0];
  //console.log('-------kkkkk--------------------')
  //console.log(day[mealType].menuId);
  //console.log('---------kkkkkkk-----------------')
  //console.log('days lenth: '+arrDays.length);
  //console.log('menu lenth:'+arrMenu.length);
  var today = new Date();
  today.setDate(today.getDate()+v);
  var today1 = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  
  for(var i = 0; i< arrDays.length;i++){
    var d = new Date(arrDays[i].date);
    d = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    if(d== today1){
      for(var j = 0; j < arrMenu.length; j++){
        var day = arrDays[i];
        console.log('---------------------------')
        console.log(day[mealType].menuId);
        console.log('--------------------------');
        if(day[mealType].menuId==arrMenu[j]._id){
          console.log('matched'+arrMenu[j].ingredients);
          //return {itmes: arrMenu[j].ingredients, price: arrMenu[j].fullPrice};
          return options.fn(arrMenu[j]);

        }
      }  
    }
  }
});