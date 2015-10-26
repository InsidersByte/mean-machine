'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const co = require('co');

module.exports = function(app, express, config) {
    let router = express.Router();

    router.post('/', co.wrap(function*(req, res) {
        // find the user
        let user = yield User
            .findOne({
                username: req.body.username,
            })
            .select('name username password salt')
            .exec();

        // no user with that username was found
        if (!user) {
            return res.json({
                success: false,
                message: 'Authentication failed. User not found.',
            });
        }

        // check if password matches
        let validPassword = user.comparePassword(req.body.password);

        if (!validPassword) {
            return res.json({
                success: false,
                message: 'Authentication failed. Wrong password.',
            });
        }

        // if user is found and password is right
        // create a token
        let token = jwt.sign({
            name: user.name,
            username: user.username,
        }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });

        // return the information including token as JSON
        return res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
        });
    }));

    return router;
};
