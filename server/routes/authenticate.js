'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = function(app, express, config) {
    let router = express.Router();

    router.post('/', function(req, res) {
        // find the user
        User.findOne({
            username: req.body.username,
        }).select('name username password salt').exec(function(err, user) {
            if (err) {
                throw err;
            }

            // no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.',
                });
            } else if (user) {
                // check if password matches
                let validPassword = user.comparePassword(req.body.password);

                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.',
                    });
                } else {
                    // if user is found and password is right
                    // create a token
                    let token = jwt.sign({
                        name: user.name,
                        username: user.username,
                    }, config.secret, {
                        expiresIn: 86400, // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                    });
                }
            }
        });
    });

    return router;
};
