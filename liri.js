// System messages start with ###

// Grab command and input
var command = String(process.argv[2]);
var input = String(process.argv.slice(3).join(" "));

// console.log(command);
// console.log(input);

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
    }

    spotifyThis(input);
    break;

  case "movie-this":
    movieThis(input);
    break;

  case "do-what-it-says":
    // doRandom();
    break;

  default:
    console.log("Command not valid!");
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

}