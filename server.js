var bodyParser = require('body-parser'),
    express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    routes = require('./routes');

var serverLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {flags: 'a'});

var app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', {stream: serverLogStream}));
app.set('view engine', 'pug');

routes(app, require('./server.json'));

app.listen(process.env.PORT || 1337);