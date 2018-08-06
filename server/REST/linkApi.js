var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(methodOverride());

mongoose.connect('mongodb://localhost:27017/Notebook');

var Resource = app.resource = restful.model('link', mongoose.Schema({
        _id: Number,
        link: String,
        description: String,
        tooltipText: String,
        displayText: String
    }))
    .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/link'); //collections Name

module.exports = app;
