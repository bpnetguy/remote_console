/**
 * Created with IntelliJ IDEA.
 * User: bphan
 * Date: 4/13/13
 * Time: 8:30 PM
 * To change this template use File | Settings | File Templates.
 */
require.config({
  baseUrl: "./js",

  paths : {
    "backbone":"libs/backbone/backbone",
    "underscore":"libs/underscore/underscore",
    "pubsub": 'libs/jquery/jquery.pubsub',
    "socketio": 'libs/socket.io'
  },
  shim: {
      'pubsub': {
          deps: ['jquery']
      },
      'socketio': {
          exports: 'io'
      }
  }

});
require(["jquery", 'socketio'], function($) {
    $(function() {
        var socket = io.connect();
          socket.on('connect', function (data) {
            console.log(data);
            socket.emit('join', { my: 'data' });
          });    });
});
