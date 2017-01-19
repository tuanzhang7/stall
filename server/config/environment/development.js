'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/stall'
    //uri: 'mongodb://stalluser:1qazxsW@@ds117189.mlab.com:17189/stall'
  },

  // Seed database on startup
  seedDB: true

};
