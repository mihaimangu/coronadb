//this should be the express server
var express = require('express');
var app = express();
var fs = require('fs')
const db = require('./database');
const path = require('path');

var port = 60500;

app.listen(port, function() {
    console.log(`app started on port ${port} `);
});

app.set('view engine', 'ejs')
  
const Counties = require('./models/Counties');

app.use(express.static(__dirname + '/public'));

const getOneCounty = () =>{
    console.log('getting one county')
    const one = Counties.find().sort({confirmed: -1}).limit(1).exec().then(data => console.log(data));
};

app.get('/aggregate', function(request, response){

    // getOneCounty();

    Counties.find().sort({deaths: 1, confirmed: -1}).limit(50).exec().then(counties => {
        console.log('found data for counties', counties);
        response.render(path.join(__dirname + '/x.ejs'), {
            counties: counties
        });
    });

    // var counties = [];
    // response.render(path.join(__dirname + '/x.ejs'), {
    //     counties: counties
    // });

    
});

app.get('/', function(request, response){

    // getOneCounty();
    
    response.render(path.join(__dirname + '/aggregate.ejs'), {
        counties: []
    });

    // Counties.aggregate(
    //     [{
    //         $group:{
    //             _id:null, 
    //             totalConfirmed: { $sum: {$multiply: ['$quarantined', 1]} },
    //             count:{$sum:1}
    //         }
    //     }]
    // ).then(counties => {
    //     console.log('aggregating all the data', counties);
    //     response.render(path.join(__dirname + '/aggregate.ejs'), {
    //         counties: counties
    //     });
    // });

    // var counties = [];
    // response.render(path.join(__dirname + '/x.ejs'), {
    //     counties: counties
    // });

    
});