let apiKeysObject = require("dotenv").config();
let twitter = require("twitter");
let spotify = require("node-spotify-api");
let request = require('request');
let inquirer = require("inquirer");
let fs = require("fs");

startApp();
    
let startApp = () => {
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
                songLookup(song);
            })
            songLookup();
        } else if (results.app === "movie-info"){
            movieLookup();
        } else if (results.app === "do-what-it-says"){
            pullTextDoc();
        } else {
            console.log("Have a good day!");
        }
    })
}
