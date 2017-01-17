'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/stall'
    //uri: 'mongodb://fuser:fuser@ds021182.mlab.com:21182/stall'
  },

  // Seed database on startup
  seedDB: false

};
