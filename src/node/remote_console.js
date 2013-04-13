/**
 * Created with IntelliJ IDEA.
 * User: bphan
 * Date: 4/13/13
 * Time: 11:58 AM
 * To change this template use File | Settings | File Templates.
 */

var express = require("express");
var app = express();

app.configure(function(){
    app.use(express.static(__dirname + '/..'));
    app.use(function(req, res, next) {
      res.contentType('application/json');
      next();
    });
});

var routes  = require('./routes');



// Authenticator
/*
app.use(express.basicAuth(function(user, pass, callback) {
 var result = (user === 'testUser' && pass === 'testPass');
 callback(null , result);
}));
*/

app.post('/cli', routes.cli);
app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));