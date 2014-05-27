/**
 *
 */

var config = require('./config');

module.exports = {
  sendgrid: {
      username: 'raeesaa',
      password: 'OldPassword123'
  },

  facebook: {
    clientID: '660882143975455',
    clientSecret: '04673568ac4ea25888eb19c68d48137f',
    callbackURL: config.development.siteUrl + '/users/fbAuthenticationComplete',
    passReqToCallback: true
  }
};