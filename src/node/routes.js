
var exec = require('child_process').exec;


exports.cli = function(req, res){
    console.log(req.headers);
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {

        console.log(body);
        var jsonBody = JSON.parse(body);
        exec(jsonBody.command, function(error,stdout, stderr) {
            jsonBody.stdout = stdout;
            jsonBody.id=1;
            res.send(JSON.stringify(jsonBody));

        });

    });

};