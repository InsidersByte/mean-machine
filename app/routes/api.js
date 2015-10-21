var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
const expressJwt = require('express-jwt');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // route to generate sample user
    apiRouter.post('/sample', function(req, res) {

        // look for the user named chris
        User.findOne({ 'username': 'chris' }, function(err, user) {

            // if there is no chris user, create one
            if (!user) {
                var sampleUser = new User();

                sampleUser.name = 'Chris';
                sampleUser.username = 'chris';
                sampleUser.password = 'supersecret';

                sampleUser.save(function(err) {
                    if (err) {
                        return res.send(err);
                    }

                    // return a message
                    res.json({ message: 'Sample user created!' });
                });
            } else {
                console.log(user);

                // if there is a chris, update his password
                user.password = 'supersecret';

                user.save(function(err) {
                    if (err) {
                        return res.send(err);
                    }

                    // return a message
                    res.json({ message: 'Sample user created!' });
                });
            }

        });

    });

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    apiRouter.post('/authenticate', function(req, res) {

        // find the user
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err, user) {

            if (err) throw err;

            // no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {

                // check if password matches
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });

    apiRouter.use(expressJwt({
        secret: config.secret,
    }));

    // test route to make sure everything is working
    // accessed at GET http://localhost:8080/api
    apiRouter.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    apiRouter.use('/users', require('./user')(app, express));

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return apiRouter;
};
