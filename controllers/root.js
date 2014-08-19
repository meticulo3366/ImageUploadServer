
/*
 * GET home page.
 */

module.exports = function(app) {
  var root = {};

  root.landing = function(req, res){
    return res.render('users/users');
  };

  root.userDashboard = function(req, res){
    return res.render('users/userImage');
  };
  root.adminDashboard = function(req, res){
    return res.render('admin');
  };
  return root;
};
