
/**
 *
*/


var express = require('express')
, flash = require('connect-flash')
, http = require('http')
, path = require('path')
, app = express()
, mongoose = require('mongoose')
, config = require('./config/config')
, engines = require('consolidate')
, passportConfig = require('./config/passport-config')
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, User = require('./models/User');


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  mongoose.connect(config.development.dbUrl);
}else{
  mongoose.connect(config.production.dbUrl);
}

// all environments
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('html', require('ejs').renderFile); 
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser() );
  app.use(express.session({ secret: 'some secret' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res) {
    return res.status(404).json('404 Not found!');
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log('Error : ' + err);
    return res.json({error: err});
  });
});

/**
 * requiring Custom written modules
 */

app.monq = require('./config/monq')(app);
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
