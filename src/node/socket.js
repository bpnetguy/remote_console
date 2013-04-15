
var clientList = {};
var clients = {};
var clientManager = undefined;
var commandResponseHandler = {};

function getValueFromCookie(headers, key) {
    var cookies = [];
    headers.cookie && headers.cookie.split(';').forEach(function( cookie ) {
       var parts = cookie.split('=');
       cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
     });
    return cookies[key];

}
var socketConnection = function (client) {
//	client.emit('connect', {});

    clientManager = client.manager;
    var handshaken = client.manager.handshaken[client.id];

    var expressSid = getValueFromCookie(handshaken.headers, "express.sid") ;

	client.on('join', function(data) {
		console.log(data.name + ": JOINED!!!!!!");
        clients[expressSid] = client;
		clientList[expressSid] = {"sessionid": client.id, "name": data.name, "address": handshaken.address, "headers":handshaken.headers };
	});

    client.on('command', function(data) {
        commandResponseHandler[expressSid].send(data);
        delete commandResponseHandler[expressSid];
    })
};
var command = function command(request, res, next) {
    var body = '';
    request.on('data', function(data) {
        body += data;
    });
    request.on('end', function() {
        var jsonBody = JSON.parse(body);
        commandResponseHandler[jsonBody.clientId] = res;
        clients[jsonBody.clientId].emit("command", jsonBody);
//        res.send('servername: ' + request.hostname + " Body " + body);
    });
};

var listClients = function listClients(request, res, next) {
    var clientArray = [];
    if(clientManager) {
        var clientHandShakenKey = Object.keys(clientManager.handshaken);
        for(var i =0; i < clientHandShakenKey.length;i++){
            var key = clientHandShakenKey[i];
            var expressSid = getValueFromCookie(clientManager.handshaken[key].headers, "express.sid");
            var name = "No Name";
            if(clientList[expressSid]){
                name = clientList[expressSid].name;
            }
            clientList[expressSid] = {
                    "id": expressSid,
                    "sessionid": key,
                    "name": name,
                    "address": clientManager.handshaken[key].address,
                    "headers":clientManager.handshaken[key].headers };
            clientArray.push(clientList[expressSid]);
        }
    }
    res.send(JSON.stringify(clientArray));
};


exports.socketConnection = socketConnection;
//exports.status = undefined;
exports.command = command;
exports.listClients = listClients;
