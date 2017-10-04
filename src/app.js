var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function() {
  console.log("Listening on port 3000");
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/callback', function (req, res) {
  res.sendfile(__dirname + '/callbackurl.html');
});
