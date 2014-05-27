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
  
	//console.log('in ispresnt helper'+array);
	//console.log(value);

  for(var i = 0 ; i < array.length; i++) {
  	if(array[i] == value) {
    //  console.log('matched');
  		return true;
  	}
  };

  //console.log('match not found!');
  return false;
});



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
// Handlebars.registerHelper("getMenu",function(arr,menuId,options) {
//     if(options.inverse && !arr.length)
//         return options.inverse(this);
//       //console.log('in countIndex:'+arr.length-1);
//       for(var i=0;i<arr.length;i++){
//         if{menuId===arr[i]._id}
//           return options.fn(arr[i]);
//       }

//     return false;

    
// });

Handlebars.registerHelper("findMenuDate",function(arrDays,arrMenu,ts,mealType,v,options) {
  console.log('in findMenuDate helper');

  var today = new Date();
  today.setDate(today.getDate()+v);
  var today1 = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  
  for(var i = 0; i< arrDays.length;i++){
    var d = new Date(arrDays[i].date);
    d = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    if(d== today1){
      for(var j = 0; j < arrMenu.length; j++){
        var day = arrDays[i];
        
        if(day[mealType].menuId==arrMenu[j]._id){
          console.log('matched'+arrMenu[j].ingredients);
          var x = arrMenu[j].ingredients;
          //console.log(String(x).split(","));
          var arr = String(x).split(',');
          for (var l=0;l < arr.length; l++){
            console.log('value:'+arr[l]);
            console.log(ts);
          }
          var out= "<div class=''>";
          out+="<form class=''><input class='pull-right ckMenuId' type='checkbox' id='"+ arrDays[i]._id +"' value='"+arrDays[i]._id+"' data-date='" + arrDays[i].date + "' data-mealtype='" + mealType + "''></form>";
          out+="<p>Menu:"+arrMenu[j].name+"</p>";
          out+= "<p> Items: <ol>";
          for(var l=0;l < arr.length; l++){
           // if(i<arr.length){
              out+="<li>"+arr[l]+"</li>";
            //}
           // else{
            //out+="<br>";
           // }
          }
            out+="</ol></p>";
          //out+= "<p>Items:"+arrMenu[j].ingredients+"</p>";
          out+="<p>Price:"+ arrMenu[j].fullPrice+"</p>";
          
          out+="</div>";

          //return out;
          return options.fn({menu:arrMenu[j],date:today1,ts:ts});
          //return new Handlebars.SafeString(out);

        }
      }  
    }
  }
});
Handlebars.registerHelper('dateFormate', function(date) {
  
  console.log('in dateFormate helper');
  var d = new Date(date);
    d = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    console.log(d);
    return d;
});

Handlebars.registerHelper('menuDet', function(arr, id, options) {
  
  console.log('in menuDet helper');
  for(var i=0;i<arr.length;i++){
    if(id===arr[i]._id)
      return options.fn(arr[i]);
  }

  
});