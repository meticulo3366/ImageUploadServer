
/**
*
*/

module.exports = {
  development: {
    siteUrl: 'http://localhost:3000',
    dbUrl: 'mongodb://localhost/boilerplate_development',
    monqDbUrl: 'mongodb://localhost/queue_development'
  },
  production: {
    dbUrl: 'mongodb://localhost/boilerplate_production',
    monqDbUrl: 'mongodb://localhost/queue_production'
  },
  email: {
    from: 'enter_valid_email',
    subject: {
      confirmationEmail: 'Account Confirmation Email',
      resetPasswordEmail: 'Reset Password Instructions',
    },
    message:{
      buildConfirmationMessage: function(email, token) {
        return 'Please click the link to confirm your account : http://localhost:3000/users/confirm?token='+token+'&email='+email;
      },

      buildResetPasswordMessage: function(email, token) {
        return 'Please click on link to reset your password : http://localhost:3000/users/resetPassword?token='+token+'&email='+email;
      }
    }
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
