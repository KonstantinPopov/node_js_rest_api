'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();

app.use(bodyParser.json());

const PORT = 3000;
app.set('port', process.env.PORT || PORT);

var route =  require('./routes/index_var');

route.route(app);

var server = app.listen(app.get('port'), function() {
    console.log('Server started. Listen on port ' + server.address().port);
});
