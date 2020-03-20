//this should be the express server
var express = require('express');
var app = express();

// const db = require('./database');
const path = require('path');

var port = 8000;

app.listen(port, function() {
    console.log('app started');
});
  

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
});