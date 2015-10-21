const User       = require('../models/user');
const config     = require('../../config');
const expressJwt = require('express-jwt');

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

    apiRouter.use('/authenticate', require('./authenticate')(app, express, config));

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
