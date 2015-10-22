'use strict';

// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser'); // get body-parser
const morgan = require('morgan'); // used to see requests
const mongoose = require('mongoose');
const config = require('./config/config');

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
switch (process.env.NODE_ENV){
    case 'build':
        app.use(express.static('./build'));
        break;
    default:
        app.use(express.static('./public'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        break;
}

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
let apiRoutes = require('./routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
switch (process.env.NODE_ENV){
    case 'build':
        app.get('*', function(req, res) {
            res.sendFile('build/index.html', { root: './'});
        });

        break;
    default:
        app.get('*', function(req, res) {
            res.sendFile('public/index.html', { root: './'});
        });

        break;
}

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
