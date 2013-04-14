
var clientList = {};

var socketConnection = function (client) {
	client.emit('connect', {});
	client.on('join', function(data) {
		console.log(data.name + ": JOINED!!!!!!");
		clientList[data.name] = client;
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
    res.send(JSON.stringify({clients: keys(clientList)}));
};


exports.socketConnection = socketConnection;
//exports.status = undefined;
exports.eval = evalCommand;
exports.listClients = listClients;
