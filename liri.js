// System messages start with ###

// Grab command and input
var command = String(process.argv[2]);
var input = String(process.argv.slice(3).join(" "));

// console.log(command);
// console.log(input);

liri(command, input);

function liri(command, input) {

  // Create if/then scenario for commands
  switch (command) {

    case "my-tweets": 

      displayTweets(input);
      break;

    case "spotify-this":

      // Set default song
      if (input == "") {
        console.log("### You did not enter a song. Check out this one: ");
        input = "i took a pill in ibiza";
      };

      spotifyThis(input);
      break;

    case "movie-this":

      // Set default movie
      if (input == "") {
        console.log("### You did not enter a movie. Check out this one: ");
        input = "dirty dancing";
      };

      movieThis(input);
      break;

    case "do-what-it-says":

      doRandom();
      break;

    default:
      console.log("Command not valid!");
  }
}

function displayTweets(handle) {

  // Setting keys and secrets to process.env
  // an object containing the user environment

  var keys = require('./keys.js');

  process.env.TWITTER_CONSUMER_KEY = 
    keys.twitterKeys.consumer_key;
  process.env.TWITTER_CONSUMER_SECRET = 
    keys.twitterKeys.consumer_secret;
  process.env.TWITTER_ACCESS_TOKEN_KEY = 
    keys.twitterKeys.access_token_key;
  process.env.TWITTER_ACCESS_TOKEN_SECRET = 
    keys.twitterKeys.access_token_secret;
  
  var Twitter = require('twitter');
  
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  if (handle == null) {
    console.log("### No handle was entered.");
  } else {

    var params = {screen_name: handle};

    client.get(
      'statuses/user_timeline', params, 
      function(error, tweets, response) {
        if (!error) {

          console.log("");
          console.log("LATEST TWEETS FROM @" + handle);
          console.log("");

          for (var i = 0; i < 5; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            console.log("");
          } 
        } else {
          console.log("### There was an error in retrieving your tweets.");
        }
      });

    log("my-tweets", handle);
  }

}

function spotifyThis(song) {
  
  var spotify = require('spotify');

  spotify.search({
    type: 'track',
    query: song
  }, function(err, data) {
    if ( err ) {
        console.log("### There was an error in looking up this song.");
        return;
    }
 
    // Do something with 'data' 
    console.log(" ");
    console.log("SONG: " + data.tracks.items[0].name);
    console.log("ARTIST: " + data.tracks.items[0].artists[0].name);
    console.log("ALBUM: " + data.tracks.items[0].album.name);
    console.log(" ");
    console.log("PREVIEW THIS SONG: " + data.tracks.items[0].preview_url);
    console.log(" ");
  });

  log("spotify-this", song);

}

function movieThis(movie) {

  var request = require('request');

  request('http://www.omdbapi.com/?t=' + movie + 
    '&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {

      if (!error && response.statusCode == 200) {

        var data = JSON.parse(body);

        console.log(" ");
        console.log("TITLE: " + data.Title);
        console.log("YEAR: " + data.Year);
        console.log("COUNTRIES RELEASED: " + data.Country);
        console.log("LANGUAGES: " + data.Language);
        console.log("PLOT: " + data.Plot);
        console.log("---");
        console.log("IMDB RATING: " + data.imdbRating);
        console.log("TOMATOES RATING: " + data.tomatoRating);
        console.log(" ");

      } else {
        console.log("### There was an error in looking up this movie.");
      }
    });

  log("movie-this", movie);

}

function doRandom() {

  var fs = require('fs');

  fs.readFile("random.txt", "utf8", function(err, data) {

    if ( err ) {
      console.log("### There was an error in reading the file.");
      return;
    }

    var dataArray = data.split(',');
    // console.log(dataArray);

    liri(dataArray[0],dataArray[1]);
  
  });

}

function log(command, input) {

  var fs = require('fs');

  fs.appendFile("log.txt", command + "," + input + ",", function(err){
    if(err){
      console.log("### There was an error in writing the file.");
    }
    else {
      console.log("### Your command was logged.");
    }
  });

}