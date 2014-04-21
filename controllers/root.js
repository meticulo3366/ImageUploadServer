
/*
 * GET home page.
 */


// exports.signUp = function(req, res) {
// 	res.render('signUp.html', { message: req.flash('info') });
// };

module.exports = function(app) {
  var root = {};

  root.landing = function(req, res){
    return res.render('users/users');
  };

  root.user = function(req, res) {
    return res.render('users/users');
  };

  root.homepage = function(req, res) {
    return res.render('users/homepage');
  }

  root.resetPassword = function(req, res) {
    return res.render('users/resetPassword');
  };

  root.userProfile = function(req, res) {
    return res.render('users/userProfile');
  };

  root.adminDashboard = function(req, res) {
    return res.render('users/users#adminDashboard');
  };


  return root;
};
