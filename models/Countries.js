var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ModelSchema = new Schema({
    name: String,
    confirmed: Number,
})



// Compile model from schema
var Countries = mongoose.model('Countries', ModelSchema );

module.exports =  Countries;
