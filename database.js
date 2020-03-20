const mongoose = require('mongoose')

//mongodb connection
var mongoDB = 'mongodb://127.0.0.1/coronadb';
mongoose.connect(mongoDB, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error: "));

module.exports = db;