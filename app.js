// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const Linksapi = require('./server/REST/linkApi');
const Contactsapi = require('./server/REST/ContactApi');

const app = express();

// Parsers for POST data
Linksapi.use(bodyParser.json());
Linksapi.use(bodyParser.urlencoded({ extended: false }));

// Parsers for POST data
Contactsapi.use(bodyParser.json());
Contactsapi.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/LinkApi', Linksapi);
app.use('/ContactApi', Contactsapi);

/*app.get('/abcd', (req, res) => {
    res.send({ text: "hi there this is sent" });
});*/
// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
