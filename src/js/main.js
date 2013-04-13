require.config({
  baseUrl: "./js",

  paths : {
    "backbone":"libs/backbone/backbone",
    "underscore":"libs/underscore/underscore",
    "pubsub": 'libs/jquery/jquery.pubsub'
  },
  shim: {
      'pubsub': {
          deps: ['jquery']
      }
  }

});
require(["jquery", 'app'], function($, app) {
    $(function() {
        app.initialize();
    });
});
