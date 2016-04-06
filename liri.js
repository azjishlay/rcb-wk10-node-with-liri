// Create if/then scenario for commands
switch (process.argv[2]) {

  case "my-tweets": 
    displayTweets(process.argv[3]);
    break;

  case "spotify-this-song":
    // spotify(process.argv[3]);
    break;
  case "movie-this":
    // movie(process.argv[3]);
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
    console.log("No handle was entered.");
  } else {

    var params = {screen_name: handle};

    client.get(
      'statuses/user_timeline', params, 
      function(error, tweets, response) {
        if (!error) {

          console.log("");
          console.log("Latest tweets from @" + handle);
          console.log("");

          for (var i = 0; i < 5; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            console.log("");
          } 
        } else {
          console.log('There was an error in retrieving your tweets.');
        }
      });
  }

}

function spotify(song) {
  
}