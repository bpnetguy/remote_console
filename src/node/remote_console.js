/**
 * Created with IntelliJ IDEA.
 * User: bphan
 * Date: 4/13/13
 * Time: 11:58 AM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

io.set("log level", 3);

app.configure(function(){
    app.use(express.static(__dirname + '/..'));
    app.use(function(req, res, next) {
      res.contentType('application/json');
      next();
    });
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret', key: 'express.sid'}));
//    app.use(function (req, res, next) {
//        console.log('Hello, your session id is ' + req.sessionID);
//        next();
//    });
});

var routes  = require('./routes');



var socket  = require('./socket');
io.sockets.on('connection', socket.socketConnection);

app.get('/jsconsole/listClient', socket.listClients);
app.post('/jsconsole/command', socket.command);
app.post('/cli', routes.cli);

server.listen(process.env.PORT || 3000);






console.log('Listening on port ' + (process.env.PORT || 3000));