
var exec = require('child_process').exec;


exports.cli = function(req, res){
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var jsonBody = JSON.parse(body);
        exec(jsonBody.command, function(error,stdout, stderr) {
            jsonBody.stdout = stdout;
            jsonBody.id=1;
            res.send(JSON.stringify(jsonBody));

        });

    });

};