
/**
*
*/
var crypto = require('crypto');

exports.getRandomToken = function(){
	return crypto.randomBytes(48).toString('hex');

};

exports.isMember = function(members, id) {
  for(var i = 0; i < members.length; i++) {
    if(members[i].member == id) {
      return true;
    }
  }
  return false;
}