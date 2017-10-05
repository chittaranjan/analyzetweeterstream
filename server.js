var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var exphbs = require('express-handlebars'),
mongoose = require('mongoose'),
routes = require('./routes'),
streamHandler = require('./utils/StreamHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/analyzedtweets');

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire it up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

//Twitter Stream
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
  StreamHandler(tweet, io);
});
