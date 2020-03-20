var mongoose = require('mongoose');

var StatusSchema = new mongoose.Schema({
    date: Date,
    confirmed: Number,
    isolated: Number,
    quarantined: Number,
    deaths: Number,
    siruta: Number,
    solved: Number,
})
var ModelSchema = new mongoose.Schema({
    name: String,
    confirmed: Number,
    isolated: Number,
    quarantined: Number,
    deaths: Number,
    siruta: Number,
    solved: Number,
    updated: Date,
    population: Number,
    statuses: [StatusSchema] 
})

// Compile model from schema
var Countries = mongoose.model('Counties', ModelSchema );

module.exports =  Countries;
