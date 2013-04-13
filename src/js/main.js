require.config({
  baseUrl: "js",
  paths : {
    "backbone":"libs/backbone/backbone",
    "underscore":"libs/underscore/underscore"
  }

});
require(["jquery", 'app'], function($, app) {
    $(function() {
        app.initialize();
    });
});
