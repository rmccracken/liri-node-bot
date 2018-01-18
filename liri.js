// .env file setup with git ignore so we can store our API key's
let dotenv = require("dotenv").config();
// calls info from keys.js
let apiKeysObject = require("./keys.js")
let twitter = require("twitter");
let spotify = require("node-spotify-api");
let request = require('request');
let inquirer = require("inquirer");
let fs = require("fs");

startApp();
    //  I want to eventually come back and add recurrsion to this which is the point of the "exit-app"
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
            tweetLookup();
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
                movieLookup(movie);
            });
            
        } else if (results.app === "do-what-it-says"){
            pullTextDoc();
        } else {
            console.log("Have a good day!");
            writeResults("User exited program\r\n");
        }
    })
}
// searhces twitter for userinfo. you could also switch so the user could input the twitter username as well via the OMDB and Spotify method that is on here.
let tweetLookup = () => {
    writeResults(" User searched tweets\r\n");
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
    setTimeout(() => {startApp()}, 1000);

}
// Searches Spotify for song info
let songLookup = (song) => {
    writeResults(" User searched song: " + song + "\r\n");
    let rockItOut = new spotify(apiKeysObject.spotify);
    rockItOut.search({ type: 'track', query: song }, (err, data) => {
  
        if (err) {
         return console.log('Error occurred: ' + err);
        }
            let track = data.tracks.items[0].name;
            let artist = data.tracks.items[0].album.artists[0].name;
            let album = data.tracks.items[0].album.name;
            let songURL = data.tracks.items[0].album.artists[0].external_urls.spotify;
            
            console.log("----------------------")
            console.log("Artist: " + artist);
            console.log("Album: " + album);
            console.log("Listen here: " + songURL);
    });
    setTimeout(() => {startApp()}, 1000);

}
// searches OMDB for movie info
let movieLookup = (movie) => {
    writeResults(" User searched movie: " + movie + "\r\n");
    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

    request(queryUrl, function(error, response, body) {

      if (error) {
        console.log('Error occurred: ' + error);
      }
      else if (JSON.parse(body).Title === undefined){
        console.log("That is not a movie");
      }
        else{
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rated: " + JSON.parse(body).Rated);
        console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country of Origin : " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Staring: " + JSON.parse(body).Actors);

      }
    });
    setTimeout(() => {startApp()}, 1000);
}
// pulls optin and title from text doc
let pullTextDoc = () => {
        writeResults(" User picked the default search.\r\n");
    fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
    return console.log(error);
  }
    
  var dataArr = data.split(",");

    if (dataArr[0] === "spotify-this-song"){
        songLookup(dataArr[1]);
    }
    });
}

let writeResults = (results) => {
    console.log(results);
    let now = new Date();
    fs.appendFile('log.txt',now + results , (err, data) => {
        if (err) {
            return console.log(err);
        }
    });
}   