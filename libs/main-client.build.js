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
    namespace:"socketClient",
    out: '../build/main-built.js',
    wrap: false,
//    optimize: "none",
    paths:{
        "socketio":'libs/socket.io'
    },
    shim:{
        'socketio':{
            exports:'io'
        }
    }
}
