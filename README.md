express-backbone-boilerplate
===============

## Setting up project on development machine:

Assuming that you have nodejs and mongodb already installed and running, following are the steps for setting up the project:

1. Clone the repository:
	```
	$ git clone https://github.com/sqrinfotech/express-backbone-boilerplate.git
	```

2. cd to the cloned directory and run following command:
	```
	$ npm install
	```
   This will install all the dependencies.

3. Now run the server by typing following command :

	In case you have nodemon installed,
	```
	$ nodemon app.js
	```
	otherwise,
	```
	$ node app.js
	```
Server will now start running at port 3000. Finally visit [http://localhost:3000/](http://localhost:3000/).

##Configuration:

1. This boilerplate uses [sendgrid](http://sendgrid.com/) for sending email. Therefore one needs to create sendgrid account(if he already does not have one). Sendgrid credentials needs to be added in `config/secret.js` file:

	```

	sendgrid: {
      username: 'SENDGRID_USERNAME',
      password: 'SENDGRID_PASSWORD'
 	}

	```

2. To enable facebook authentication, one must first create an app at [Facebook Developers](https://developers.facebook.com/). Detailed steps for creating facebook application and obtaining `App ID` and `App Secret` are explained [here](https://github.com/sqrinfotech/express-backbone-boilerplate/blob/master/create-facebook-application-to-get-appId-and-appSecret.md). `App ID` and `App Secret` thus obtained need to be added in `config/secret.js` file:

  ```
    facebook: {
        clientID: 'FACEBOOK_APP_ID',
        clientSecret: 'FACEBOOK_APP_SECRET',
        callbackURL: config.development.siteUrl + '/users/fbAuthenticationComplete',
        passReqToCallback: true
    }
  ```
  
3. Enter a valid email address in `from` field of `email` object in `config/config.js` file.
    
  ```
    email: {
        from: 'EMAIL_ADDRESS',
        /**
        * Other fields
        */
      }
  ```