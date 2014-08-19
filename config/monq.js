
/**
 * 
 */

var config = require('../config/config');



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

  return app.monq;
};
  