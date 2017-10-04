var twit = require('twit');
var config = require('./TwitterConfig.js');

var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '#NobelPrize, #nobelprize',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // for more parameters, see: https://dev.twitter.com/rest/reference/get/search/tweets
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          console.log(data);
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log(err);
          console.log('Something went wrong while SEARCHING...');
        }
    });
};
retweet();
setInterval(retweet, 3000000);
