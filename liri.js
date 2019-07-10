require("dotenv").config();

var axios = require('axios');
var spotify = require('node-spotify-api');
var fs = require('fs');
var os = require('os');
var moment = require('moment');
var keys = require('./keys');


// omdb api key f820deb6

var category = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");

switch(category) {

    case 'movie':
        getMovie();
        //console.log('movies!')
        break;
        
    case 'concert':
        getConcert();
        //console.log('concerts!')
        break;

    case 'song':
        //getSong();
        console.log('music!')
        break;

    default: break;
}


function getMovie() {

    var link = "https://www.omdbapi.com/?t=" + userSearch + "&apikey=trilogy"
    
    axios.get(link).then( (res) => {

        var all = res.data;
        var title = all.Title;
        var year = all.Released;
        var genre = all.Genre;
        var actors = all.Actors;
        var time = all.Runtime;
        var plot = all.Plot;

        console.log(`Title: ${title}`);
        console.log(`Released on: ${year}`);
        console.log(`Genre: ${genre}`);
        console.log(`Actors: ${actors}`);
        console.log(`Runtime: ${time}`);
        console.log(`Plot: ${plot}`);

    }).catch(function(err){
        console.log(err);
    })
}

function getConcert() {

    var link = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"

    axios.get(link).then( (res) => {

        var all = res.data;

        if (all.length == 0) {
            return console.log("There are no upcoming concerts");
        }

        for (e in all) {
            console.log(`Venue: ${all[e].venue.name}`);
            console.log(`Where: ${all[e].venue.city}, ${all[e].venue.region}, ${all[e].venue.country}`);
            console.log(`When: ${moment(all[e].datetime).format('MM-DD-YYYY')}`);
            console.log('');
        }
    }).catch(function(err) {
        console.log(err);
    })
}
/*
function getSong() {

}
*/

