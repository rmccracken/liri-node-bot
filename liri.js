let apiKeysObject = require("dotenv").config();
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
                    song = "Mr. Nobody";
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
    // let params = {screen_name: "mccrackenGoose"};

    client.get("statuses/user_timeline", (error, tweets, response) => {
        if (!error){
            console.log(tweets);
        }
        for (var i = 0; i < tweets.statuses.length; i++) {
            console.log(tweets.statuses[i].created_at.substring(0, 19) + tweets.statuses[i].text);
        }
    });
    console.log("Display tweets here");
}

let songLookup = () => {
    console.log("Display songs Here");
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
  console.log(dataArr);
    if (dataArr[0] === "songInfo"){
        songInfo(dataArr[1]);
    }

});

}