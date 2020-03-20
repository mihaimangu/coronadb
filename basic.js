const https = require('https');
const axios = require('axios');
const mongoose = require('mongoose')
const process = require('process')
const db = require('./database');


const arcgisUrl = "https://services7.arcgis.com/";
const path = "I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query";


//calling mongoose
const Countries = require('./models/Countries');
const Counties = require('./models/Counties');

// const one = Countries.findOne().exec().then(data => console.log(data));


const getCounties = () => {
    const params = {
        f: "json",
        where: "1=1",
        returnGeometry: true,
        spatialRel: "esriSpatialRelIntersects",
        maxAllowableOffset: 4891,
        geometry: '{"xmin":2504688.542846475,"ymin":5009377.085698651,"xmax":5009377.0856948495,"ymax":7514065.628547028,"spatialReference":{"wkid":102100,"latestWkid":3857}}',
        inSR: 102100,
        outFields: "*",
        outSR: 102100,
        resultType: "tile",
    
    }
    
    
    //calling axios
    if(true){
        axios({
            url: arcgisUrl + path,
            params: params,  
        })
        .then((response) => {
            if(response.data.features){
                const features = response.data.features;
                features.map((feature, index) => {
                    if(true){
                        if(feature && feature.attributes){
                            const attributes = feature.attributes;
                            console.log(attributes)

                            insertCountyIntoDb(attributes);

                        } else {
                            console.log('County does not have any attributes');
                        }


                    }
                    
                })
            } else {
                console.log('features attribute not found in api call')
            }
        })
    }
}

function insertCountyIntoDb(county){

    const entry = new Counties({
        _id: new mongoose.Types.ObjectId(),
        name: county.Judete,
        confirmed: county.Cazuri_confirmate,
        isolated: county.Persoane_izolate,
        quarantined: county.Persoane_in_carantina,
        deaths: county.Persoane_decedate,
        region: county.Regiune_dezvoltare,
        siruta: county.SIRUTA_judet,
        solved: county.Persoane_vindecate,
        popultion: county.Populate,
        updated: new Date()
    })


    Counties.findOne({name: county.Judete}, (err, response) => {

        const isAlreadyHere = response ? true : false;

        if(!isAlreadyHere){
            entry.save();
            console.log(`inserting new county into the database ${county.Judete}`);

        } else {
            // console.log(`County is already registered in the database with the name ${county.Judete}`)

            const demoData = {
                date: new Date(),
                confirmed: county.Cazuri_confirmate,
                isolated: county.Persoane_izolate,
                quarantined: county.Persoane_in_carantina,
                deaths: county.Persoane_decedate,
            };

            const query = Counties.findOne({name: county.Judete}).findOne().update({
                updated: new Date,
                $push: {statuses: demoData}
            })

            query.exec((err, response) => {
                if(err){console.log('error while updating', error)} else {
                    console.log(`updated the county ${county.Judete} with a new entry`, response)
                };
            })
        }
    })
   
}


var myArgs = process.argv.slice(2);
if(myArgs[0] == 'get-counties-from-db'){
    // console.log('process argv 0 ', myArgs[0])
    // console.log('counties')
}

if(myArgs[0] == 'get-counties-from-outside'){
    // console.log('process argv 0 ', myArgs[0])
    // console.log('counties')
    getCounties();
}