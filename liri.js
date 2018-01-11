var apiKeysObject = require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
var request = require('request');
var fs = require("fs");

var argument = process.argv;
var inputTwo = process.argv[3];


var nodeArgv = process.argv;
var command = process.argv[2];

var inputOne = "";
//allows for multi-word titles to be searched
for (var i = 3; i < argument.length; i++) {
    if (i > 3 && i < argument.length) {
        x = x + "+" + argument[i];
    } else {
        inputOne = inputOne + argument[i];
    }
}

switch (inputOne) {
    case "my-tweets":
        TweetLookup();
        break;

    case "spotify-this-song":
        songLookup();
        break;

    case "movie-this":
        movieLookup();
        break;

    case "do-what-it-says":
        pullTextDoc();
        break;

    default:
        console.log('Please pick one: my-tweets, spotify-this-song, movie-this, do-what-it-says');
        break;
}
