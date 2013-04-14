
var clientList = {};
var clientManager;

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
//        clientManager[expressSid] = client;
		clientList[expressSid] = {"sessionid": client.id, "name": data.name, "address": handshaken.address, "headers":handshaken.headers };
	});
};
var evalCommand = function evalCommand(request, res, next) {
    var body = '';
    request.on('data', function(data) {
        body += data;
    });
    request.on('end', function() {
        res.send('servername: ' + request.hostname + " Body " + body);
        clientList['clientuser'].emit('eval', JSON.parse(body));
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
exports.eval = evalCommand;
exports.listClients = listClients;
