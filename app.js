var express = require('express');
var http = require('http');

var app = express();

// all environments
app.set('port', 3000);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
