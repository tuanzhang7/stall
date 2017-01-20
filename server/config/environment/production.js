'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || '0.0.0.0',

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI
    || process.env.MONGOHQ_URL
    || process.env.MONGODB_URL
    + process.env.OPENSHIFT_APP_NAME
    || process.env.OPENSHIFT_MONGODB_DB_URL
    + process.env.OPENSHIFT_APP_NAME
    || 'mongodb://localhost/stall'
  },
  seedDB: true,
  //recaptcha
  recaptchaSecret: '6Ld7oSATAAAAABSVRDm31ilHwgBGrcyhxeWTrrhu',
  recaptchaSiteKey: '6Ld7oSATAAAAAPZbDnU_m5x-jmFEQoKgxIXFIWmy'
};
