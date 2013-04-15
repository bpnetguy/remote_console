/**
 * Created with IntelliJ IDEA.
 * User: bphan
 * Date: 4/14/13
 * Time: 10:22 PM
 * To change this template use File | Settings | File Templates.
 */

{
    baseUrl: '../src/js',
    name: 'almond.js',
    include: ['main-client'],
    insertRequire: ['main-client'],
    out: 'main-built.js',
    wrap: false,
//    optimize: "none",
    paths:{
        "backbone":"libs/backbone/backbone",
        "underscore":"libs/underscore/underscore",
        "pubsub":'libs/jquery/jquery.pubsub',
        "socketio":'libs/socket.io',
	    "jquery":"libs/require/require-jquery"
    },
    shim:{
        'pubsub':{
            deps:['jquery', 'socketio']
        },
        'main-client': {
            deps:['socketio']
        },
        'socketio':{
            exports:'io'
        }
    }
}
