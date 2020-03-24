require('dotenv').config()
const mongoose = require('mongoose')

//mongodb connection
var mongoDB = process.env.MONGO_DB_KEY;
console.log('mongo url is ', mongoDB)
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error: "));

module.exports = db;