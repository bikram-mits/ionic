var express = require('express');
var app = express();
var server = require('http').Server(app);

var mongoose = require('mongoose');
var morgan = require('morgan'); //logs requrests to the console
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); //simulate Delete and put


// configuration ======
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

mongoose.connect('mongodb://localhost/notification');

app.use(express.static(__dirname + 'public'));  // set static location /public/img-/img
app.use(morgan('dev')); // logs every request to console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse appliccation json
app.use(bodyParser({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(allowCrossDomain);

// listen start app with node app.js
require('./route.js')(app);
server.listen(3000);
var io = require('socket.io')(server);
require('./socket.js')(io);
console.log("App listening on port 3000");


