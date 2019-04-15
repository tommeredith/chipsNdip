var path = require('path');
var express = require('express');

var app = express();

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 2222);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
