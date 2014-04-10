
/**
 * 
 */

var config = require('../config/config')
  , secret = require('../config/secret')
  , sendgrid = require('sendgrid')(secret.sendgrid.username, secret.sendgrid.password);



module.exports = function(app) {

  if ('development' == app.get('env')) {
    app.monq = require('monq')(config.development.monqDbUrl); 
  } else {
    app.monq = require('monq')(config.production.monqDbUrl); 
  }
 
  app.queue = app.monq.queue('email');

  /**
   * Global method to send an email
   */
  app.monq.sendEmail = function(params, cb) {
    app.queue.enqueue('email', params, function(err, json)
      { 
        if (err) return next(err); 
      });
  };

  var worker = app.monq.worker(['email']);

  worker.register({
    email: function(params, cb){
      try{
        sendgrid.send({
          to: params.to,
          from: config.email.from,
          subject: params.subject,
          text: params.message 
        }, function(err, json) {
          if (err) { return cb(err)};
          return cb(null, json); 
        });
      } catch (err) {
        return cb(err);
      }        
    }
  });

  worker.start();
  return app.monq;
};
  