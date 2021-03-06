
/**
*
*/

module.exports = {
  development: {
    siteUrl: 'http://54.86.100.143',
    dbUrl: 'mongodb://localhost:27017/solarstrand',
    
    monqDbUrl: 'mongodb://localhost:27017/queue_development'
  },
  production: {
    dbUrl: 'mongodb://localhost/solarstrand',
    monqDbUrl: 'mongodb://localhost/queue_production'
  },
  
  messages: {
    confirmationMailSent: 'Confirmation email has been sent to your ID!',
    accountConfirmed: 'Your account has been confirmed!',
    accountAlreadyConfirmed: 'Your account has been already confirmed!',
    invalidTokenEmail: 'Invalid token or email!',
    signOut: 'You have successfully signed out!',
    resetPswdMailSent: 'Reset Password Instruction sent to Your Email!',
    emailNotRegistered: 'Email entered is not registered with the application!',
    pswdResetSuccessfully: 'Your password has been reset successfully!',
    userNotFound: 'User Not Found!',
  }   
};
