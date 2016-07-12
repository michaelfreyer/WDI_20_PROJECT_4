var express     =   require('express');
var bodyParser  =   require('body-parser');
var env         =   require('./config/environment.js')

var app         =   express();

var routes      = require('./config/routes');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(env.port, console.log("We are up and running..."));