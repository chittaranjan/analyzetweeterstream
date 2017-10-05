// Use Streams API for interacting with a USER
// set up a user stream

var twit = require('twit');
var config = require('./TwitterConfig.js');

var Twitter = new twit(config);


//
//  filter the twitter public stream by the word and location.
//
var stream = Twitter.stream('statuses/filter', {
   track: 'narendramodi'
  })

stream.on('tweet', function (tweet) {
  if (tweet) {
    console.log('---------------------------------------------------------------------');
    console.log("Tweet:"+ tweet.text);
    if (tweet.user) {
      console.log("Posted By:" + tweet.user.name);
    }
  }
  console.log('----------------------------------------------------------------------');
})
