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


module.exports =  StatusSchema;
