'use strict';

const User       = require('../models/user');
const config     = require('../config/config');
const expressJwt = require('express-jwt');
const co         = require('co');

module.exports = function(app, express) {
    let router = express.Router();

    // route to generate sample user
    router.post('/sample', co.wrap(function*(req, res) {
        let user = yield User.findOne({username: 'chris'});

        if (!user) {
            user = new User();

            user.name = 'Chris';
            user.username = 'chris';
        }

        user.password = 'supersecret';

        yield user.save();

        return res.json({ message: 'Sample user created!' });
    }));

    router.use('/authenticate', require('./authenticate')(app, express, config));

    router.use(expressJwt({
        secret: config.secret,
    }));

    // test route to make sure everything is working
    // accessed at GET http://localhost:8080/api
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    router.use('/users', require('./user')(app, express));

    // api endpoint to get user information
    router.get('/me', function(req, res) {
        res.send(req.user);
    });

    return router;
};
