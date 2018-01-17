let dotenv = require("dotenv").config();
let apiKeysObject = require("./keys.js")
let twitter = require("twitter");
let spotify = require("node-spotify-api");
let request = require('request');
let inquirer = require("inquirer");
let fs = require("fs");

startApp();
    
function startApp() {
    inquirer.prompt([
    {
        type: "list",
        name: "app",
        message: "Make a selection",
        choices: [
            "my-tweets",
            'spotify-this-song',
            'movie-info',
            'do-what-it-says',
            'exit-app'
        ]
    }
    ]).then((results) => {
        if (results.app === "my-tweets") {
            TweetLookup();
        } else if (results.app === "spotify-this-song"){
            inquirer.prompt([
            {
                type: "input",
                name: "song",
                message: "Give me a Song title."
            }
            ]).then((results) => {
                let song = results.song;
                if (song === "") {
                    song = "I don't care";
                    }   
                songLookup(song);
            });
        } else if (results.app === "movie-info"){
            inquirer.prompt([
            {
                type: "input",
                name: "movie",
                message: "Give me a the name of a movie."
            }
            ]).then((results) => {
                let movie = results.movie;
                    if (movie === "") {
                    movie = "Mr. Nobody";
                    }   
                movieLookup();
            });
            
        } else if (results.app === "do-what-it-says"){
            pullTextDoc();
        } else {
            console.log("Have a good day!");
        }
    })
}

let TweetLookup = () => {
    let client = new twitter(apiKeysObject.twitter);
    let params = {screen_name: "mccrackenGoose", count: 20};

    client.get("statuses/user_timeline", (error, tweets, response) => {
        if (!error){
        }
        for (var i = 0; i < 20 ; i++) {
            console.log("------mcccrackenGoose Past Tweets " + [i + 1] + " -----")
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }
    });

}

let songLookup = (song) => {
    let rockItOut = new spotify(apiKeysObject.spotify);
    rockItOut.search({ type: 'track', query: song }, (err, data) => {
  
        if (err) {
         return console.log('Error occurred: ' + err);
        }
            let track = data.tracks.items[0].name;
            let artist = data.tracks.items[0].album.artists[0].name;
            let album = data.tracks.items[0].album.name;
            let songURL = data.tracks.items[0].album.artists[0].external_urls.spotify;
            
            console.log("You selected: " + song);
            console.log("----------------------")
            console.log("Artist: " + artist + "\nAlbum: " + album + "\nListen here: " + songURL);
});
}
let movieLookup = () => {
    console.log("Display Movies Here");
}

let pullTextDoc = () => {
    fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
    
  var dataArr = data.split(",");
  // console.log(dataArr);
    if (dataArr[0] === "spotify-this-song"){
        songLookup(dataArr[1]);
    }
    else 
        console.log("what is this")
});

}