'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();

require('./config/mongoose_db_config');
app.use(bodyParser.json());

const PORT = 3000;
app.set('port', process.env.PORT || PORT);

var route =  require('./routes/index');

route.route(app);
var server = app.listen(app.get('port'), function() {
    console.log('Server started. Listen on port ' + server.address().port);
});
