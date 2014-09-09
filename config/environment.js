/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    zimbra: {
      soap: {
        adminUrl: 'https://localhost:7071/service/admin',
    	  userUrl: 'http://localhost:7070/service'
    	},
    	admin: {
    	  user: 'admin',
    	  pass: 'test123'
    	}
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
  }

  if (environment === 'test') {
    ENV.baseURL = '/'; // Testem prefers this...
  }

  if (environment === 'production') {

  }

  return ENV;
};
