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

var Resource = app.resource = restful.model('contact', mongoose.Schema({
        _id: Number,
        contactName: String, 
        displayName: String,
        voipNum: String,
        skypeNum: String
    }))
    .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/contact'); //collections Name

module.exports = app;